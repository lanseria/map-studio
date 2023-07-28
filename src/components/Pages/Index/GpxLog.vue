<script lang="ts" setup>
const { coords, locatedAt, error, resume, pause } = useGeolocation()

const LOCATION_POINT = 'location-point'
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
watch([() => locatedAt.value, () => globalIsMapboxLoad.value], () => {
  if (locatedAt.value && globalIsMapboxLoad.value) {
    locationChanged()
    if (globalTrailGpxStatus.value === '2') {
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
    }
  }
})
</script>

<template>
  <MapBoxWrap class="mt-8px">
    <template #title>
      GPX Trail Log
    </template>

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
        <div class="col-span-1">
          error
        </div>
        <div class="col-span-2">
          {{ error ?? '/' }}
        </div>
        <div class="col-span-1">
          trail points len
        </div>
        <div class="col-span-2">
          {{ storeMapTrailGPXPoints.length ?? '/' }}
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
  </MapBoxWrap>
</template>
