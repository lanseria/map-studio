<script lang="ts" setup>
import { type FeatureCollection, featureCollection } from '@turf/turf'
import axios from 'axios'

const latestEarthQuake = ref(featureCollection([]))
const filterForm = ref({
  minmagnitude: 6,
  starttime: '2024-03-28 00:00:00',
  endtime: '2024-04-04 23:59:59',
  orderby: 'time',
})
const { data: plateInterfaceData, onFetchResponse } = useFetch('/earth-quake/plate-boundaries-PlateInterface.geojson').json()
onFetchResponse(() => {
  addPlateInterfaceSource(PLATE_INTERFACE_SOURCE_NAME, plateInterfaceData.value)
  addPlateInterfaceLayer()
})
const earthquakeData = computed(() => {
  if (latestEarthQuake.value) {
    return (latestEarthQuake.value as FeatureCollection).features.map((item) => {
      // mag > 6 color is #C24740
      // 6 > mag color is #F3AE1A
      item.properties!.color
      = item.properties!.mag > 6 ? '#C24740' : '#F3AE1A'
      return item
    })
  }
  else { return [] }
})
async function fetchData() {
  const { data } = await axios.get('https://earthquake.usgs.gov/fdsnws/event/1/query.geojson', {
    params: filterForm.value,
  })
  latestEarthQuake.value = data
}
watch(earthquakeData, () => {
  if (earthquakeData.value.length > 0) {
    addEarthQuakeSource(EARTH_QUAKE_SOURCE_NAME, featureCollection(earthquakeData.value))
    addEarthQuakeLayer()
  }
})
watch(filterForm, () => {
  fetchData()
}, {
  deep: true,
})
function handleFlyTo(item: any) {
  window.map.panTo(item.geometry.coordinates)
}
onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="w-full flex flex-col gap-10px">
    <MapBoxWrap>
      <template #title>
        Earthquake/地震
      </template>
    </MapBoxWrap>

    <MapBoxWrap>
      <template #title>
        Filter Data/筛选数据
      </template>
      <AForm auto-label-width size="small" :model="filterForm">
        <AFormItem label="起始时间">
          <ADatePicker v-model="filterForm.starttime" show-time />
        </AFormItem>
        <AFormItem label="结束时间">
          <ADatePicker v-model="filterForm.endtime" show-time />
        </AFormItem>
        <AFormItem label="最小震级">
          <AInputNumber v-model="filterForm.minmagnitude" />
        </AFormItem>
      </AForm>
    </MapBoxWrap>

    <MapBoxWrap>
      <template #title>
        Data List/数据列表({{ earthquakeData.length }})
      </template>
      <div class="max-h-200px overflow-y-scroll">
        <div v-if="earthquakeData.length === 0">
          No Data/暂无数据
        </div>
        <div v-for="item in earthquakeData" :key="item.id">
          <a class="ms-link-text" @click="handleFlyTo(item)">{{ item.properties!.place }}</a>
        </div>
      </div>
    </MapBoxWrap>
  </div>
</template>
