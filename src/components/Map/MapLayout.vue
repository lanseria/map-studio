<script lang="ts" setup>
import type { LngLatLike } from 'mapbox-gl'
import mapboxgl from 'mapbox-gl'
import MapboxLanguage from '@mapbox/mapbox-gl-language'
import 'mapbox-gl/dist/mapbox-gl.css'
import ZoomControl from '~/composables/mapControl/ZoomControl/ZoomControl'
import StylesControl from '~/composables/mapControl/StylesControl/StylesControl'
import CompassControl from '~/composables/mapControl/CompassControl/CompassControl'
import RulerControl from '~/composables/mapControl/RulerControl/RulerControl'

mapboxgl.accessToken = MAPBOX_TOKEN
let map: mapboxgl.Map | null = null
const mapContainer = shallowRef()

onMounted(() => {
  globalIsMapboxLoad.value = false
  const style = MAPBOX_STYLE_LIST.find(it => it.name === storeMapStyle.value)
  map = new mapboxgl.Map({
    container: mapContainer.value,
    style: style?.style,
    center: globalMapCenter.value as LngLatLike,
    zoom: INIT_ZOOM,
    hash: true,
  })
  window.map = map
  // map.scrollZoom.setWheelZoomRate(1)
  // map.scrollZoom.setZoomRate(1)
  map.addControl(new MapboxLanguage({ defaultLanguage: 'zh-Hans' }))

  // map.addControl(new mapboxgl.NavigationControl())

  /* Zoom */
  map.addControl(new ZoomControl(), 'top-right')
  /* Compass */
  map.addControl(new CompassControl(), 'top-right')
  /* Style */
  map.addControl(new StylesControl({ }), 'bottom-right')
  /* Ruler */
  map.addControl(new RulerControl(), 'top-right')

  map.on('load', () => {
    setTimeout(() => {
      globalIsMapboxLoad.value = true
    }, 500)
    map!.resize()
  })
  map.on('style.load', () => {
    console.warn('style.load')
    mapLoad()
  })
})
function toggleLeftSidebar() {
  storeMapLeftCollapsed.value = !storeMapLeftCollapsed.value
}
</script>

<template>
  <div class="w-full h-screen relative">
    <div ref="mapContainer" class="w-full h-full relative">
      <div class="h-32px w-450px bg-white absolute top-12px left-1/2 -translate-x-1/2 z-1 rounded-lg shadow-md flex items-center justify-between">
        <div class="flex items-center ml-8px">
          <img class="w-24px h-24px" src="/512.png" alt="logo">
          <div class="ml-8px font-bold">
            Map Studio
          </div>
        </div>
        <div class="flex items-center mr-8px">
          <div class="ml-8px">
            Wiki
          </div>
          <div class="ml-8px">
            Help
          </div>
          <div class="ml-8px">
            About
          </div>
          <div class="text-pink ml-8px font-bold">
            Donate 💗
          </div>
        </div>
      </div>
      <div class="bg-light-50 bg-opacity-30 transition-transform duration-500 z-1 w-300px h-full absolute flex justify-center items-center left-0" :class="`${storeMapLeftCollapsed ? 'collapsed' : ''}`">
        <div class="w-[calc(100%-12px)] h-[calc(100%-12px)] bg-transparent rounded-lg absolute flex">
          <slot />
          <div class="sidebar-btn left" @click="toggleLeftSidebar()">
            <div :class="`${storeMapLeftCollapsed ? 'i-carbon-chevron-right' : 'i-carbon-chevron-left'}`" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
:global(.mapbox-control button) {
  display: flex;
  align-items: center;
  justify-content: center;
}
:global(.mapbox-control button svg) {
  width: 20px;
  height: 20px;
  fill: #505050;
}
:global(.mapbox-control button.-active) {
  background: rgba(0, 0, 0, 0.03);
}
:global(.mapbox-control button.-active svg) {
  fill: #4264fb;
}
:global(.mapbox-control button[disabled]) {
  pointer-events: none;
}
:global(.mapbox-control button[disabled] svg) {
  fill: rgba(0, 0, 0, 0.2);
}
:global(.mapbox-control-styles) {
  display: flex;
  overflow: hidden;
}
:global(.mapbox-control-styles button) {
  width: auto;
  display: flex;
  align-items: center;
  padding: 0 8px;
}
:global(.mapbox-control-styles button + button) {
  border: none;
}

.sidebar-btn {
  @apply absolute w-32px h-32px overflow-visible flex justify-center items-center bg-white text-gray-5 rounded-lg shadow-lg text-size-14px font-bold;
}

.sidebar-btn.left {
  @apply right--40px;
}

.sidebar-btn:hover {
  color: #0aa1cf;
  cursor: pointer;
}
.left-0.collapsed {
  transform: translateX(calc(5px - 300px));
}
</style>
