<script lang="ts" setup>
import type { EaseToOptions } from 'mapbox-gl'

const index = ref(-1)
function handleTestFly() {
  const map = window.map
  function easing(t: number) {
    return t
  }
  if (currentViewFlight.value) {
    index.value = 0
    const cameraLocations = currentViewFlight.value.children.map(item => ({
      center: item.lookatCoord,
      zoom: item.zoom,
      bearing: item.bearing,
      pitch: item.pitch,
      duration: item.time,
    } satisfies EaseToOptions))
    const moveendHandler = () => {
      index.value++
      if (index.value === cameraLocations.length) {
        index.value = -1
        map.off('moveend', moveendHandler)
      }
      else {
        map.panTo(cameraLocations[index.value].center, {
          ...cameraLocations[index.value],
          easing,
        })
      }
    }
    map.easeTo(cameraLocations[index.value])
    map.on('moveend', moveendHandler)
  }
}
</script>

<template>
  <div>
    <div v-if="isEditViewFlight && currentViewFlight">
      <ASpace align="start">
        <a-typography-text>路线名称：</a-typography-text>
        <a-typography-paragraph
          v-model:editText="currentViewFlight.name"
          editable
        >
          {{ currentViewFlight?.name || '未命名路线' }}
        </a-typography-paragraph>
      </ASpace>
      <ASpace>
        <a-button type="primary" @click="handlePushViewFlightChildren">
          <template #icon>
            <IconPlus />
          </template>
          当前视角
        </a-button>
        <a-button type="outline" status="success" @click="handlePushViewFlightList">
          <template #icon>
            <IconSave />
          </template>
          保存此路线
        </a-button>
        <a-button type="dashed" status="danger" :disabled="index !== -1" @click="handleTestFly">
          <template #icon>
            <IconSend />
          </template>
          试飞
        </a-button>
      </ASpace>
      <ViewFlightPointCard v-for="(item, idx) in currentViewFlight.children" :key="idx" :animation-idx="index" :order="idx + 1" :item="item" />
    </div>
    <div v-else>
      <AButton type="text" @click="createViewFlightRoute">
        请创建视角飞行路线
      </AButton>
    </div>
  </div>
</template>
