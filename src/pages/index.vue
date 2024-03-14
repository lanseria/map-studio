<script lang="ts" setup>
import type { LngLatLike } from 'mapbox-gl'

onMounted(() => {
  setTimeout(() => {
    window.map.flyTo({
      center: INIT_POINT as LngLatLike,
      zoom: INIT_ZOOM,
      duration: 1000,
    })
  })
})
</script>

<template>
  <div class="w-full text-size-14px">
    <TypeLayer />
    <DrawLayer />
    <FeatureInfo />
    <!-- <GpxLog /> -->
    <!-- <GpxList /> -->
  </div>
</template>
