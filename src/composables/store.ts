export const storeMapStyle = useStorage('storeMapStyle', 'Streets')

export const storeMapLeftCollapsed = useStorage('storeMapLeftCollapsed', true)

export const storeMapRulerRouteLineString = useStorage('storeMapRulerRouteLineString', [])

export const storeMapWeatherLayerEnable = useStorage<string[]>('storeMapWeatherLayerEnable', [])

export const storeMapTrailGPXPoints = useStorage<any[]>('storeMapTrailGPXPoints', [])

export const storeMapTrailGPXLines = useStorage<any[]>('storeMapTrailGPXLines', [])

export const storeMapTypeLayerCheckedKeys = useStorage<string[]>('storeMapTypeLayerCheckedKeys', [])

export function deleteTrailGPXLine(idx: number) {
  storeMapTrailGPXLines.value.splice(idx, 1)
}
