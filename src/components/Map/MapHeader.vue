<script lang="ts" setup>
const ModalGpxRef = shallowRef()
const ModalAboutRef = shallowRef()
function gotoDonate() {
  open('https://afdian.net/a/lanseria')
}
function handleAbout() {
  ModalAboutRef.value.open()
}
</script>

<template>
  <div
    class="
    h-32px
    w-300px
    bg-white
    absolute
    top-8px
    left-1/2
    -translate-x-1/2
    z-1
    rounded-lg
    shadow-md
    flex
    items-center
    justify-between"
  >
    <div class="flex items-center ml-8px">
      <img class="w-24px h-24px" src="/512.png" alt="logo">
      <div class="ml-8px font-bold">
        Map Studio
      </div>
    </div>
    <div class="flex items-center mr-8px">
      <div class="ml-8px cursor-pointer" :class="globalMapDrawEnable ? 'bg-green' : ''" @click="globalHandleMapDrawToggle()">
        Draw
      </div>
      <div class="ml-8px cursor-pointer" @click="handleAbout()">
        About
      </div>
      <div class="text-pink ml-8px font-bold cursor-pointer hover:text-pink-3" @click="gotoDonate">
        Donate 💗
      </div>
    </div>
    <div v-if="globalMapDrawEnable" class="absolute top-36px flex gap-4px right-0 left-0 justify-center">
      <div class="bg-white rounded p-6px shadow-lg cursor-pointer" @click="globalHandleSelectDrawMode('draw_point')">
        <div class="text-size-16px i-gis-point" :class="{ 'bg-green': globalMapDrawMode === 'draw_point' }" />
      </div>
      <div class="bg-white rounded p-6px shadow-lg cursor-pointer" @click="globalHandleSelectDrawMode('draw_line_string')">
        <div class="text-size-16px i-gis-polyline-pt" :class="{ 'bg-green': globalMapDrawMode === 'draw_line_string' }" />
      </div>
      <div class="bg-white rounded p-6px shadow-lg cursor-pointer" @click="globalHandleSelectDrawMode('draw_polygon')">
        <div class="text-size-16px i-gis-polygon-pt" :class="{ 'bg-green': globalMapDrawMode === 'draw_polygon' }" />
      </div>
    </div>
    <ModalGpx ref="ModalGpxRef"></ModalGpx>
    <ModalAbout ref="ModalAboutRef"></ModalAbout>
  </div>
</template>
