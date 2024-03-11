import { cloneDeep, isEmpty } from 'lodash-es'
import { center } from '@turf/turf'
import { nanoid } from 'nanoid'
import { handleSetLineString, handleSetPoint, handleSetPolygon, reloadMapDrawLayer } from './draw/mode'
import type { MyFeature } from './types'

export const globalIsMapboxLoad = ref(false)
export const globalSettingModalVisible = ref(false)
export const globalWeixinMiniAppModalVisible = ref(false)
export const globalJoinUsModalVisible = ref(false)
export const globalMapDrawEnable = ref(false)
export const globalMapDrawEdit = ref(false)
export const globalMapPhotoLoading = ref(false)
export const globalMapPhotoPlaying = ref(false)

export const globalMapTrailGPXGeoJson = ref({})
export const globalMapTrailGPXGeoJsonProperties = ref(initGpxProperties())
export const globalMapDrawMode = ref('')
export const globalCurrentProperties = ref<any>({})
export const globalMapDrawFeatures = ref<MyFeature[]>([])

export const globalStorePanguPhotosKeys = ref<string[]>([])

export const globalStorePanguPhotosKeysCurrent = ref<string>('')

export const globalComputedMapFeatureSelect = computed(() => {
  return !isEmpty(globalCurrentProperties.value)
})
/**
 * 1 new ready to start
 * 2 start trail gpx
 * 3 finish trail gpx
 */
export const globalTrailGpxStatus = ref('1')

export function globalHandleStartTrailGpx() {
  if (globalTrailGpxStatus.value === '1') {
    storeMapTrailGPXPoints.value = []
    globalTrailGpxStatus.value = '2'
  }
}

export function globalHandleStopTrailGpx() {
  if (globalTrailGpxStatus.value === '2')
    globalTrailGpxStatus.value = '3'
}

export function globalHandleSaveTrailGpx() {
  if (globalTrailGpxStatus.value === '3') {
    //
    globalMapTrailGPXGeoJson.value = convertToGeoJSON(storeMapTrailGPXPoints.value, globalMapTrailGPXGeoJsonProperties.value)
    storeMapTrailGPXLines.value.push(globalMapTrailGPXGeoJson.value)
    globalTrailGpxStatus.value = '1'
    updateTrailGpxSourceLayer()
  }
}

export const globalMapCenter = ref(INIT_POINT)

export const globalMapRulerCoordinates = ref([])

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
 * @param polygon
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
