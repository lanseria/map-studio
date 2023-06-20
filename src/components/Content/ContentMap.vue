<script lang="ts" setup>
import type { LngLatLike } from 'mapbox-gl'
import mapboxgl from 'mapbox-gl'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import MapboxLanguage from '@mapbox/mapbox-gl-language'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

import DrawLineString from '~/composables/draw/linestring'
import drawStyles from '~/composables/draw/styles'
import RadiusMode from '~/composables/draw/RadiusMode'
import { pushMapDrawFeatures } from '~/composables/draw/mode'

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
  // map.scrollZoom.setWheelZoomRate(1)
  // map.scrollZoom.setZoomRate(1)
  map.addControl(new MapboxLanguage({ defaultLanguage: 'zh-Hans' }))
  window.map = map

  const draw = new MapboxDraw({
    displayControlsDefault: false,
    userProperties: true,
    modes: {
      ...MapboxDraw.modes,
      draw_line_string: DrawLineString,
      draw_radius: RadiusMode,
    },
    styles: drawStyles,
  })
  window.draw = draw

  map.addControl(new mapboxgl.NavigationControl())
  map.addControl(
    new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl,
      countries: 'CN',
      types: 'poi,district,place',
      language: 'zh-hans',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      worldview: 'cn',
    })
    , 'top-left',
  )
  map.addControl(draw)
  map.on('load', () => {
    setTimeout(() => {
      globalIsMapboxLoad.value = true
    }, 500)
    map!.resize()
  })
  map.on('style.load', () => {
    console.warn('style.load')
    mapLoad()
    // reloadSourceLayer()
    //
    // reloadImportLayer()
  })
  map.on('draw.create', (e) => {
    pushMapDrawFeatures(e.features[0])
    draw.deleteAll()
  })
})
</script>

<template>
  <div class="h-full w-full relative">
    <div ref="mapContainer" class="h-full w-full relative" />
    <div
      v-if="globalIsMapboxLoad"
      class="text-[var(--color-neutral-10)] absolute left-0 bottom-1/2 px-1 py-4 bg-white dark:bg-black cursor-pointer  z-10"
      @click="handleContentSideCollapsed()"
    >
      <div v-if="!storeContentSideCollapsed" class="i-carbon:caret-right" />
      <div v-else class="i-carbon:caret-left" />
    </div>
  </div>
</template>
