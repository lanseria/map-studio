import { cloneDeep } from 'lodash-es'
import type { FeatureCollection, Point } from '@turf/turf'
import { center } from '@turf/turf'
import { nanoid } from 'nanoid'
import { handleSetLineString, handleSetPoint, handleSetPolygon, reloadMapDrawLayer } from './draw/mode'
import type { MyFeature, ParkingSpotCurrent, ParkingSpotPointProps } from './types'

export const globalIsMapboxLoad = ref(false)
export const globalSettingModalVisible = ref(false)
export const globalWeixinMiniAppModalVisible = ref(false)
export const globalJoinUsModalVisible = ref(false)
export const globalMapDrawEnable = ref(false)
export const globalMapDrawEdit = ref(false)

export const globalMapDrawMode = ref('')
export const globalCurrentProperties = ref<any>({})
export const globalMapDrawFeatures = ref<MyFeature[]>([])

export const globalMapCenter = ref(INIT_POINT)

export const globalParkingSpotGeo = ref<FeatureCollection<Point, ParkingSpotPointProps>>({
  type: 'FeatureCollection',
  features: [],
})

export const globalParkingSpotCurrent = ref<ParkingSpotCurrent>({
  coordinates: [],
  coordinates_GCJ02: [],
  coordinates_BD09: [],
  properties: undefined,
})

export function globalHandleMapDrawToggle(val?: boolean) {
  globalMapDrawEnable.value = val ?? !globalMapDrawEnable.value
}
export function globalHandleSelectDrawMode(val: string) {
  globalMapDrawMode.value = val
}

watchEffect(() => {
  if (globalMapDrawMode.value === 'draw_point')
    handleSetPoint()

  if (globalMapDrawMode.value === 'draw_line_string')
    handleSetLineString()

  if (globalMapDrawMode.value === 'draw_polygon')
    handleSetPolygon()
})

/**
 * 将点、线、面转化为geojson格式
 */
export function pushMapDrawFeatures(feature: MyFeature) {
  const centerPoint = center(feature)
  globalCurrentProperties.value = {
    ...globalCurrentProperties.value,
    center: centerPoint.geometry.coordinates,
    id: nanoid(),
  }
  feature.properties = cloneDeep(globalCurrentProperties.value)

  globalMapDrawFeatures.value.push(feature)
  globalMapDrawMode.value = ''
}

watchEffect(() => {
  console.warn('globalMapDrawFeatures changed')
  if (globalIsMapboxLoad.value) {
    console.warn('reloadMapDrawLayer')
    reloadMapDrawLayer()
  }
})
