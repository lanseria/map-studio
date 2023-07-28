<script lang="ts" setup>
import { endPhoto, nextPhoto, prevPhoto, startPhoto, storePanguTimelineValue } from '~/composables'

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
</script>

<template>
  <MapBoxWrap>
    <template #title>
      时间线
    </template>
    <div>
      <a-select
        v-model="storePanguTimelineValue" :options="PANGU_TIMELINE_IMG_LIST" :field-names="fieldNames"
      />
      <a-button-group class="mt-10px">
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
  </MapBoxWrap>
</template>
