<script lang="ts" setup>
import type { TreeNodeData } from '@arco-design/web-vue'
import type { Feature, Point } from '@turf/turf'
import { center } from '@turf/turf'
import type { LngLatLike } from 'mapbox-gl'
import { fetchParkingSpot, fetchParkingSpotCount } from '~/composables/api'
import type { ParkingSpotPointProps } from '~/composables/types'

const treeData = ref([] as TreeNodeData[])
const filterForm = ref<Partial<ParkingSpotPointProps>>({
  desc: '',
  isFree: '免费',
  freeMinutes: '',
})
const filterData = computed(() => {
  return globalParkingSpotGeo.value.features.filter((item: Feature<Point, ParkingSpotPointProps>) => {
    if (item.properties.isFree === filterForm.value.isFree) {
      if (filterForm.value.isFree === '收费') {
        if (filterForm.value.freeMinutes) {
          if (item.properties.freeMinutes === filterForm.value.freeMinutes)
            return true
          else
            return false
        }
        else {
          return true
        }
      }
      else {
        return true
      }
    }
    return false
  }).filter((item: Feature<Point, ParkingSpotPointProps>) => {
    if (filterForm.value.desc === '')
      return true

    else
      return item.properties.desc.includes(filterForm.value.desc!)
  })
})
async function fetchData() {
  const { data } = await fetchParkingSpotCount()
  treeData.value = data
}
async function handleSelect(node: any) {
  if (node.extra) {
    const { data } = await fetchParkingSpot(node.label, node.extra)
    globalParkingSpotGeo.value = data
    addParkingSpotSource(PARKING_SPOT_SOURCE_NAME, data)
    addParkingSpotLayer()
    const centerPoint = center(data)

    storeMapLeftCollapsed.value = true
    setTimeout(() => {
      window.map.flyTo({
        center: centerPoint.geometry.coordinates as LngLatLike,
        zoom: 10,
        speed: 2,
      })
    }, 200)
  }
}
function handleFlyTo(item: Feature<Point, ParkingSpotPointProps>) {
  window.map.flyTo({
    center: item.geometry.coordinates as LngLatLike,
    zoom: 16,
    speed: 2,
  })
  globalParkingSpotCurrent.value.coordinates = item.geometry.coordinates
  globalParkingSpotCurrent.value.properties = item.properties
}
onMounted(() => {
  if (globalParkingSpotGeo.value.features.length !== 0) {
    addParkingSpotSource(PARKING_SPOT_SOURCE_NAME, globalParkingSpotGeo.value)
    addParkingSpotLayer()
  }
  fetchData()
})
onBeforeUnmount(() => {
  clearParkingSpotSource(PARKING_SPOT_SOURCE_NAME)
})
</script>

<template>
  <div class="w-full flex flex-col gap-10px">
    <MapBoxWrap>
      <template #title>
        Parking Spot/🅿️停车场
      </template>
      <ATree size="small" block-node :data="treeData" action-on-node-click="expand" :field-names="{ title: 'label', key: 'value' }">
        <template #title="nodeData">
          <div @click="handleSelect(nodeData)">
            {{ nodeData.label }}<span>({{ nodeData.count }})</span>
          </div>
        </template>
      </ATree>
    </MapBoxWrap>

    <MapBoxWrap>
      <template #title>
        Filter Data/筛选数据
      </template>
      <AForm auto-label-width size="small" :model="filterForm">
        <AFormItem label="搜索">
          <AInput v-model="filterForm.desc" placeholder="请输入关键词" />
        </AFormItem>
        <AFormItem label="免费/收费">
          <ASelect v-model="filterForm.isFree" placeholder="请选择">
            <AOption value="免费">
              免费
            </AOption>
            <AOption value="收费">
              收费
            </AOption>
          </ASelect>
        </AFormItem>
        <AFormItem v-if="filterForm.isFree === '收费'" label="免费分钟">
          <ASelect v-model="filterForm.freeMinutes" placeholder="请选择10/15/30/60/120">
            <AOption value="10">
              10分钟
            </AOption>
            <AOption value="15">
              15分钟
            </AOption>
            <AOption value="30">
              30分钟
            </AOption>
            <AOption value="60">
              60分钟
            </AOption>
            <AOption value="120">
              120分钟
            </AOption>
          </ASelect>
        </AFormItem>
      </AForm>
    </MapBoxWrap>

    <MapBoxWrap>
      <template #title>
        Data List/数据列表({{ filterData.length }})
      </template>
      <div class="max-h-200px overflow-y-scroll">
        <div v-if="filterData.length === 0">
          No Data/暂无数据
        </div>
        <div v-for="item in filterData" :key="item.properties.id">
          <a class="ms-link-text" @click="handleFlyTo(item)">{{ item.properties.desc }}</a>
        </div>
      </div>
    </MapBoxWrap>
  </div>
</template>
