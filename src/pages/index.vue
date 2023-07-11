<script lang="ts" setup>
const { coords, locatedAt, error, resume, pause } = useGeolocation()
const LOCATION_POINT = 'location-point'
storeMapTrailGPXPoints.value = []
function pointByCoords(latitude: number, longitude: number) {
  return {
    type: 'Point',
    coordinates: [longitude, latitude],
  }
}
function locationChanged() {
  const map = window.map
  const pointSource: any = map.getSource(LOCATION_POINT)
  if (pointSource) {
    pointSource.setData(pointByCoords(coords.value.latitude, coords.value.longitude) as any)
  }
  else {
    map.addSource(LOCATION_POINT, {
      type: 'geojson',
      data: pointByCoords(coords.value.latitude, coords.value.longitude) as any,
    })

    map.addLayer({
      id: 'layer-with-pulsing-dot',
      source: LOCATION_POINT,
      type: 'symbol',
      layout: {
        'icon-image': 'pulsing-dot',
      },
    })
  }
}
watch(() => locatedAt.value, () => {
  locationChanged()
  storeMapTrailGPXPoints.value.push({
    accuracy: coords.value.accuracy,
    altitude: coords.value.altitude,
    altitudeAccuracy: coords.value.altitudeAccuracy,
    heading: coords.value.heading,
    latitude: coords.value.latitude,
    longitude: coords.value.longitude,
    speed: coords.value.speed,
    locatedAt: locatedAt.value,
  })
})
</script>

<template>
  <div class="w-full text-size-14px">
    <div class="w-full bg-white p-8px rounded-8px">
      <div class="text-center bg-gray-200 rounded-8px py-4px">
        要素筛选
      </div>
      <div class="text-size-12px bg-gray-100 rounded-8px py-8px mt-8px px-8px">
        <div class="grid grid-cols-3 gap-4px">
          <div class="col-span-1">
            数据类型
          </div>
          <div class="col-span-2">
            户外旅游UP主
          </div>
          <div class="col-span-1">
            数据源
          </div>
          <div class="col-span-2">
            徐云流浪中国
          </div>
          <div class="col-span-1">
            路线
          </div>
          <div class="col-span-2">
            最新路线
          </div>
          <div class="col-span-1">
            视频
          </div>
          <div class="col-span-2">
            中东流浪的我
          </div>
        </div>
      </div>
    </div>

    <div class="w-full bg-white p-8px rounded-8px mt-8px">
      <div class="text-center bg-gray-200 rounded-8px py-4px">
        要素信息
      </div>
      <div class="text-size-12px bg-gray-100 rounded-8px py-8px mt-8px px-8px">
        <div class="grid grid-cols-3 gap-4px">
          <div class="col-span-1">
            名称
          </div>
          <div class="col-span-2">
            昌东菜场停车位
          </div>
        </div>
      </div>
    </div>
    <div class="w-full bg-white p-8px rounded-8px mt-8px">
      <div class="text-center bg-gray-200 rounded-8px py-4px">
        GPX Trail 跟踪
      </div>

      <div class="text-size-12px bg-gray-100 rounded-8px py-8px mt-8px px-8px">
        <div class="grid grid-cols-3 gap-4px">
          <div class="col-span-1">
            纬度
          </div>
          <div class="col-span-2">
            {{ coords.latitude ?? '/' }}
          </div>
          <div class="col-span-1">
            经度
          </div>
          <div class="col-span-2">
            {{ coords.longitude ?? '/' }}
          </div>
          <div class="col-span-1">
            高度(米)
          </div>
          <div class="col-span-2">
            {{ coords.altitude ?? '/' }}
          </div>
          <div class="col-span-1">
            speed
          </div>
          <div class="col-span-2">
            {{ coords.speed ?? '/' }}
          </div>
          <div class="col-span-1">
            heading
          </div>
          <div class="col-span-2">
            {{ coords.heading ?? '/' }}
          </div>
          <div class="col-span-1">
            精度(位置)
          </div>
          <div class="col-span-2">
            {{ coords.accuracy ?? '/' }}
          </div>
          <div class="col-span-1">
            精度(高度)
          </div>
          <div class="col-span-2">
            {{ coords.altitudeAccuracy ?? '/' }}
          </div>
        </div>
        <div class="mt-10px flex justify-around">
          <AButton type="primary" status="warning" size="mini" @click="pause">
            Pause trail
          </AButton>
          <AButton type="primary" status="success" size="mini" @click="resume">
            Resume trail
          </AButton>
        </div>
      </div>
    </div>
  </div>
</template>
