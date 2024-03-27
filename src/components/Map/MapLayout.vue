<script lang="ts" setup>
import type { LngLatLike } from 'mapbox-gl'
import mapboxgl from 'mapbox-gl'
import MapboxLanguage from '@mapbox/mapbox-gl-language'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import 'mapbox-gl/dist/mapbox-gl.css'
// import MapboxDraw from '@mapbox/mapbox-gl-draw'
import ZoomControl from '~/composables/mapControl/ZoomControl/ZoomControl'
import StylesControl from '~/composables/mapControl/StylesControl/StylesControl'
import CompassControl from '~/composables/mapControl/CompassControl/CompassControl'
// import RulerControl from '~/composables/mapControl/RulerControl/RulerControl'
import LayersControl from '~/composables/mapControl/LayersControl/LayersControl'
// import DrawLineString from '~/composables/draw/linestring'
// import drawStyles from '~/composables/draw/styles'
// import RadiusMode from '~/composables/draw/RadiusMode'

mapboxgl.accessToken = MAPBOX_TOKEN
let map: mapboxgl.Map | null = null
const mapContainer = shallowRef()

onMounted(() => {
  globalIsMapboxLoad.value = false
  const style = MAPBOX_STYLE_LIST.find(it => it.styleName === storeMapStyle.value)
  map = new mapboxgl.Map({
    container: mapContainer.value,
    style: style?.styleUrl as any,
    center: globalMapCenter.value as LngLatLike,
    zoom: INIT_ZOOM,
    hash: true,
  })
  window.map = map

  // const draw = new MapboxDraw({
  //   displayControlsDefault: false,
  //   userProperties: true,
  //   modes: {
  //     ...MapboxDraw.modes,
  //     draw_line_string: DrawLineString,
  //     draw_radius: RadiusMode,
  //   },
  //   styles: drawStyles,
  // })
  // map.addControl(draw)
  // window.draw = draw
  // map.scrollZoom.setWheelZoomRate(1)
  // map.scrollZoom.setZoomRate(1)
  // geocoder
  const geocoder = new MapboxGeocoder({
    accessToken: MAPBOX_TOKEN,
    language: 'zh-CN', // 将语言设置为中文。
    countries: 'CN', // 将国家设置为中国。
    mapboxgl,
  })

  map.addControl(geocoder)
  //
  map.addControl(new MapboxLanguage({ defaultLanguage: 'zh-Hans' }))

  // map.addControl(new mapboxgl.NavigationControl())

  /* Zoom */
  map.addControl(new ZoomControl(), 'top-right')
  /* Compass */
  map.addControl(new CompassControl(), 'top-right')
  /* Style */
  map.addControl(new StylesControl({ }), 'bottom-right')
  /* Ruler */
  // map.addControl(new RulerControl(), 'top-right')
  /* Weather */
  map.addControl(new LayersControl({ }), 'bottom-right')

  map.on('load', () => {
    console.warn('[map.load]')
    map!.resize()
  })
  map.on('style.load', () => {
    console.warn('[style.load]')
    globalIsMapboxLoad.value = true
    mapLoad()
  })

  // map.on('draw.create', (e) => {
  //   console.warn('[draw.create]')
  //   pushMapDrawFeatures(e.features[0])
  //   draw.deleteAll()
  // })
})
function toggleLeftSidebar() {
  storeMapLeftCollapsed.value = !storeMapLeftCollapsed.value
}
</script>

<template>
  <div class="relative h-screen w-full">
    <div ref="mapContainer" class="map-container relative h-full w-full">
      <MapHeader />
      <MapParkingSpotInfo v-if="globalParkingSpotCurrent.properties" />
      <div class="absolute left-0 z-1 h-full w-300px flex items-center justify-center bg-light-50 bg-opacity-30 transition-transform duration-500" :class="`${storeMapLeftCollapsed ? 'collapsed' : ''}`">
        <div class="absolute h-[calc(100%-16px)] w-[calc(100%-12px)] flex rounded-lg bg-transparent">
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
.map-container > * {
  @apply font-sans;
}
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
  background: rgba(0, 0, 0, 0.2);
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
:global(.mapbox-control-styles button) {
  width: auto;
  display: flex;
  align-items: center;
  padding: 0 8px;
}
:global(.mapbox-control-layers button) {
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
