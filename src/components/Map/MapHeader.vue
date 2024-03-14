<script lang="ts" setup>
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
    class="absolute left-1/2 top-8px z-1 h-32px w-300px flex items-center justify-between rounded-lg bg-white shadow-md -translate-x-1/2"
  >
    <div class="ml-8px flex cursor-pointer items-center" @click="$router.push('/')">
      <img class="h-24px w-24px" src="/512.png" alt="logo">
      <div class="ml-8px font-bold">
        Map Studio
      </div>
    </div>
    <div class="mr-8px flex items-center">
      <div class="ml-8px cursor-pointer" :class="globalMapDrawEnable ? 'bg-green' : ''" @click="globalHandleMapDrawToggle()">
        Draw
      </div>
      <div class="ml-8px cursor-pointer" @click="handleAbout()">
        About
      </div>
      <div class="ml-8px cursor-pointer text-pink font-bold hover:text-pink-3" @click="gotoDonate">
        Donate 💗
      </div>
    </div>
    <div v-if="globalMapDrawEnable" class="absolute left-0 right-0 top-36px flex justify-center gap-4px">
      <div class="draw-btn" @click="globalHandleSelectDrawMode('draw_point')">
        <div class="i-gis-point" :class="{ 'bg-green': globalMapDrawMode === 'draw_point' }" />
      </div>
      <div class="draw-btn" @click="globalHandleSelectDrawMode('draw_line_string')">
        <div class="i-gis-polyline-pt" :class="{ 'bg-green': globalMapDrawMode === 'draw_line_string' }" />
      </div>
      <div class="draw-btn" @click="globalHandleSelectDrawMode('draw_polygon')">
        <div class="i-gis-polygon-pt" :class="{ 'bg-green': globalMapDrawMode === 'draw_polygon' }" />
      </div>
    </div>
    <ModalAbout ref="ModalAboutRef" />
  </div>
</template>

<style lang="css" scoped>
.draw-btn {
  @apply cursor-pointer rounded bg-white p-6px shadow-lg text-size-16px;
}
</style>
