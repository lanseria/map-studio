// 视点飞行
// 1. 视点飞行路线 nanoid 已创建，请将移动视角到对应位置
// 2. 默认排序1-5
// 3. 默认时间2s
// 4.

import type { MessageReturn } from '@arco-design/web-vue'
import { Message } from '@arco-design/web-vue'
import type { LngLat } from 'mapbox-gl'
import { nanoid } from 'nanoid'

export function initViewFlightForm(): ViewFlight {
  return {
    id: nanoid(),
    name: '',
    children: [],
  }
}
export interface ViewFlight {
  id: string
  name: string
  children: ViewFlightPoint[]
}

export interface ViewFlightPoint {
  cameraCoord: LngLat
  cameraAltitude: number
  lookatCoord: LngLat
  time: number
  zoom: number
  bearing: number
  pitch: number
}

export const isEditViewFlight = ref(false)
export const currentViewFlight = ref<ViewFlight | null>(null)
export const mapViewFlightList = useStorage<ViewFlight[]>('mapViewFlightList', [])
let viewFlightRouteMessageInstance: MessageReturn

function closeExit(_id: string | number) {
  isEditViewFlight.value = false
}

export function createViewFlightRoute() {
  // leftSideCollapsed.value = true
  if (!currentViewFlight.value)
    currentViewFlight.value = initViewFlightForm()

  isEditViewFlight.value = true
  // viewFlightRouteMessageInstance = Message.info({
  //   content: '编辑视点飞行中',
  //   duration: 0,
  //   closable: true,
  //   onClose: closeExit,
  // })
  // leftSideCollapseActiveKey.value = ['4']
}
watchEffect(() => {
  if (isEditViewFlight.value) {
    viewFlightRouteMessageInstance && viewFlightRouteMessageInstance.close()
    viewFlightRouteMessageInstance = Message.info({
      content: '编辑视点飞行中',
      duration: 0,
      closable: true,
      onClose: closeExit,
    })
  }
  else {
    viewFlightRouteMessageInstance && viewFlightRouteMessageInstance.close()
  }
})
export function exitCreateViewFlightRoute() {
  isEditViewFlight.value = false
}

export function handlePushViewFlightChildren() {
  //
  const opt = window.map.getFreeCameraOptions()
  const centerLngLat = window.map.getCenter()
  const zoom = window.map.getZoom()
  const bearing = window.map.getBearing()
  const pitch = window.map.getPitch()
  if (opt.position) {
    currentViewFlight.value?.children.push({
      cameraCoord: opt.position.toLngLat(),
      cameraAltitude: opt.position.toAltitude(),
      lookatCoord: centerLngLat,
      time: 2000,
      zoom,
      bearing,
      pitch,
    })
  }
}

export function handlePushViewFlightList() {
  const saveItem = mapViewFlightList.value.find(item => item.id === currentViewFlight.value?.id)
  if (saveItem)
    mapViewFlightList.value = mapViewFlightList.value.filter(item => item.id !== currentViewFlight.value?.id)

  currentViewFlight.value && mapViewFlightList.value.push(currentViewFlight.value)
  isEditViewFlight.value = false
  currentViewFlight.value = initViewFlightForm()
}
