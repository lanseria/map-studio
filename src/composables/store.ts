import type { TyphoonData } from './types'

export const storeMapStyle = useStorage('storeMapStyle', 'Streets')

export const storeMapLeftCollapsed = useStorage('storeMapLeftCollapsed', true)

export const storeMapRulerRouteLineString = useStorage('storeMapRulerRouteLineString', [])

export const storeMapWeatherLayerEnable = useStorage<string[]>('storeMapWeatherLayerEnable', [])

export const storeMapTrailGPXPoints = useStorage<any[]>('storeMapTrailGPXPoints', [])

export const storeMapTrailGPXLines = useStorage<any[]>('storeMapTrailGPXLines', [])

export const storeMapTypeLayerCheckedKeys = useStorage<string[]>('storeMapTypeLayerCheckedKeys', [])

export const storeStormDataList = useStorage<TyphoonData[]>('storeStormDataList', [])

export const storeStormDataListCheckedKeys = useStorage<Record<string, boolean>>('storeStormDataListCheckedKeys', {})

export const storePanguPhotos = useStorage<Record<string, string>>('storePanguPhotos', {})

export const storePanguTimelineValue = useStorage<string>('storePanguTimelineValue', PANGU_TIMELINE_IMG_LIST[PANGU_TIMELINE_IMG_LIST.length - 1].url)

watch(() => storePanguTimelineValue.value, () => {
  handleFetchPanguPhotos()
})
export function deleteTrailGPXLine(idx: number) {
  storeMapTrailGPXLines.value.splice(idx, 1)
}
