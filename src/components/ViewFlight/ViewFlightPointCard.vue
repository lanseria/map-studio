<script lang="ts" setup>
import type { LngLatLike } from 'mapbox-gl'
import mapboxgl from 'mapbox-gl'
import type { ViewFlightPoint } from '~/composables'

const props = defineProps<{
  item: ViewFlightPoint
  order: number
  animationIdx: number
}>()

const currentItem = ref<ViewFlightPoint>()
const popupVisibleVal = ref(false)
const timeInputNumberRef = ref()

function handleSetCamera(item: ViewFlightPoint) {
  const map = window.map
  const camera = map.getFreeCameraOptions()
  camera.position = mapboxgl.MercatorCoordinate.fromLngLat(
    item.cameraCoord,
    item.cameraAltitude,
  )
  camera.lookAtPoint(item.lookatCoord as LngLatLike)
  map.setFreeCameraOptions(camera)
}

function handleDeleteSelf() {
  currentViewFlight.value?.children.splice(props.order - 1, 1)
}
function show(item: ViewFlightPoint) {
  currentItem.value = { ...item }
  nextTick(() => {
    timeInputNumberRef.value.focus()
  })
}
function hide() {
  popupVisibleVal.value = false
  if (currentViewFlight.value && props.order > 0 && currentItem.value)
    currentViewFlight.value.children[props.order - 1].time = currentItem.value.time
}
</script>

<template>
  <div class="card px-10px bg-white dark:bg-black" :class="animationIdx + 1 === order ? 'bg-green-1' : 'bg-light-5'">
    <div class="flex items-center">
      <div class="number">
        #{{ order }}
      </div>
      <div class="content">
        <div class="info">
          <p>高度: {{ item.cameraAltitude.toFixed(2) }}米</p>
          <p>
            时间: {{ item.time }}ms
            <a-trigger v-model:popup-visible="popupVisibleVal" trigger="click" :unmount-on-close="false" @show="show(item)">
              <a-button type="text" size="mini">
                <template #icon>
                  <IconEdit />
                </template>
              </a-button>
              <template #content>
                <div v-if="currentItem" class="bg-white dark:bg-black shadow-md p-2">
                  <a-input-number
                    ref="timeInputNumberRef"
                    v-model="currentItem.time" class="w-100px mb-4" placeholder="请输入动画时间" :min="100" :max="10000"
                    @press-enter="hide"
                  />
                  <a-typography-paragraph type="secondary" spacing="close">
                    <span class="text-red-5 font-bold">*最大10000ms，最小100ms</span>
                    <span class="text-blue-5 font-bold">，回车保存</span>
                  </a-typography-paragraph>
                </div>
              </template>
            </a-trigger>
          </p>
        </div>
      </div>
    </div>
    <div class="operation ml-10px">
      <ASpace direction="vertical">
        <a-button type="outline" shape="round" size="small" @click="handleSetCamera(item)">
          <icon-double-up />
        </a-button>
        <a-button type="outline" status="danger" shape="round" size="small" @click="handleDeleteSelf()">
          <icon-delete />
        </a-button>
      </ASpace>
    </div>
  </div>
</template>

<style lang="css" scoped>
.card {
  width: 100%;
  height: 80px;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}

.number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgb(var(--arcoblue-6));
  color: white;
  font-size: 20px;
  text-align: center;
  line-height: 40px;
  margin-right: 10px;
}

.content {
  display: flex;
  flex-direction: column;
}

.info {
  font-size: 16px;
}
</style>
