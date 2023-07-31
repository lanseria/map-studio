<script lang="ts" setup>
import { storeMapVideoVisible } from '~/composables'

function play() {
  const map = window.map
  storeMapVideoPlaying.value = !storeMapVideoPlaying.value

  if (storeMapVideoPlaying.value)
    map.getSource('video').play()

  else
    map.getSource('video').pause()
}
watch(() => storeMapVideoVisible.value, () => {
  window.map.setLayoutProperty(
    MAP_DATA_STORM_FORECAST_PANGU_VIDEO_LAYER,
    'visibility',
    storeMapVideoVisible.value ? 'visible' : 'none',
  )
})
</script>

<template>
  <MapBoxWrap>
    <template #title>
      视频时间线
    </template>
    <div>
      <div class="flex justify-between items-center">
        <div>
          是否展示图层:
        </div>
        <ASwitch v-model="storeMapVideoVisible" />
      </div>
      <div class="flex justify-between items-center mt-10px">
        <div>
          控制播放:
        </div>
        <AButton type="primary" @click="play">
          <template #icon>
            <icon-play-arrow-fill v-if="!storeMapVideoPlaying" />
            <icon-pause v-else />
          </template>
        </AButton>
      </div>
    </div>
  </MapBoxWrap>
</template>
