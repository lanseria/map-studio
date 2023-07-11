export * as turf from '@turf/turf'
export { nanoid } from 'nanoid'

export const globalIsMapboxLoad = ref(false)
export const globalSettingModalVisible = ref(false)
export const globalAboutModalVisible = ref(false)
export const globalWeixinMiniAppModalVisible = ref(false)
export const globalJoinUsModalVisible = ref(false)

export const globalMapTrailGPXGeoJson = ref({})
export const globalMapTrailGPXGeoJsonProperties = ref(initGpxProperties())
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
    globalTrailGpxStatus.value = '1'
  }
}

export const globalMapCenter = ref(INIT_POINT)

export const globalMapRulerCoordinates = ref([])
