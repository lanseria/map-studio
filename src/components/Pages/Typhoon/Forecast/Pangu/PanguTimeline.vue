<script lang="ts" setup>
import { endPhoto, nextPhoto, prevPhoto, startPhoto, storeMapPhotoPlayingVisible, storePanguTimelineValue } from '~/composables'

const fieldNames = { value: 'url', label: 'label' }
function play() {
  if (!globalMapPhotoPlaying.value) {
    globalMapPhotoPlaying.value = true
    nextPhoto()
  }
  else {
    globalMapPhotoPlaying.value = false
  }
}
watch(() => storeMapPhotoPlayingVisible.value, () => {
  window.map.setLayoutProperty(
    MAP_DATA_STORM_FORECAST_PANGU_GIF_LAYER,
    'visibility',
    storeMapPhotoPlayingVisible.value ? 'visible' : 'none',
  )
})
</script>

<template>
  <MapBoxWrap>
    <template #title>
      时间线
    </template>
    <div>
      <div class="flex justify-center">
        <ASwitch v-model="storeMapPhotoPlayingVisible" />
      </div>
      <a-select
        v-model="storePanguTimelineValue" :options="PANGU_TIMELINE_IMG_LIST" :field-names="fieldNames"
      />
      <div class="mt-10px flex justify-center">
        <a-button-group>
          <a-button
            type="outline" :loading="
              globalMapPhotoLoading" @click="startPhoto"
          >
            <template #icon>
              <icon-skip-previous-fill />
            </template>
          </a-button>
          <a-button
            type="outline" :loading="
              globalMapPhotoLoading" @click="prevPhoto"
          >
            <template #icon>
              <icon-backward />
            </template>
          </a-button>
          <AButton type="primary" @click="play">
            <template #icon>
              <icon-play-arrow-fill v-if="!globalMapPhotoPlaying" />
              <icon-pause v-else />
            </template>
          </AButton>
          <a-button
            type="outline" :loading="
              globalMapPhotoLoading" @click="nextPhoto"
          >
            <template #icon>
              <icon-forward />
            </template>
          </a-button>
          <a-button
            type="outline" :loading="
              globalMapPhotoLoading" @click="endPhoto"
          >
            <template #icon>
              <icon-skip-next-fill />
            </template>
          </a-button>
        </a-button-group>
      </div>
    </div>
  </MapBoxWrap>
</template>
