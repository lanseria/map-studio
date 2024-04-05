<script lang="ts" setup>
import { type FeatureCollection, featureCollection } from '@turf/turf'
import axios from 'axios'
import dayjs from 'dayjs'

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
      <div class="max-h-200px flex flex-col gap-10px overflow-y-scroll">
        <div v-if="earthquakeData.length === 0">
          No Data/暂无数据
        </div>
        <div
          v-for="item in earthquakeData" :key="item.id"
          class="relative flex gap-10px bg-white"
        >
          <div class="absolute top-0 text-8px leading-none">
            <!-- {{ item.properties!.alert }} -->
          </div>
          <div class="hidden bg-green bg-orange bg-red bg-yellow" />
          <div
            class="h-60px w-40px flex flex-none items-center justify-center text-white font-bold"
            :class="`bg-orange bg-${item.properties!.alert}`"
          >
            {{ item.properties!.mag }}
            <span>级</span>
          </div>
          <div>
            <div>
              <a class="ms-link-text" @click="handleFlyTo(item)">{{ item.properties!.place }}</a>
            </div>
            <div class="text-gray-5">
              {{ dayjs(item.properties!.time).format('YYYY-MM-DD HH:mm:ss') }}
            </div>
          </div>

          <div class="flex items-center justify-center">
            <a-trigger trigger="click" :unmount-on-close="false">
              <div class="i-carbon-information" />
              <template #content>
                <div class="w-400px flex flex-col gap-2 rounded bg-white p-2 shadow-2xl">
                  <p>alert: {{ item.properties!.alert }}</p>
                  <p>time: {{ dayjs(item.properties!.time).format('YYYY-MM-DD HH:mm:ss') }}</p>
                  <p>net(地震监测网络): {{ item.properties!.net }}</p>
                  <p>nst(地震位置的台站数): {{ item.properties!.nst }}</p>
                  <p>mmi(修正莫加利地震烈度): {{ item.properties!.mmi }}</p>
                  <p>mag: {{ item.properties!.mag }}</p>
                  <p>magType(测量地震震级的方法或标度类型): {{ item.properties!.magType }}</p>
                  <p>rms(地震数据的均方根值): {{ item.properties!.rms }}</p>
                  <p>cdi(社区互联网强度地图): {{ item.properties!.cdi }}</p>
                  <p>detail: {{ item.properties!.detail }}</p>
                  <p>dmin(震中距离的最小值): {{ item.properties!.dmin }}</p>
                  <p>felt(报告感受到地震的人数): {{ item.properties!.felt }}</p>
                  <p>gap(地震监测网络中的缺口角度): {{ item.properties!.gap }}</p>
                  <p>sig(地震事件的重要性指数): {{ item.properties!.sig }}</p>
                  <p>sources: {{ item.properties!.sources }}</p>
                  <p>tsunami(地震事件是否引发海啸): {{ item.properties!.tsunami }}</p>
                </div>
              </template>
            </a-trigger>
          </div>
        </div>
      </div>
    </MapBoxWrap>
  </div>
</template>
