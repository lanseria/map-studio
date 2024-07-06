export const storeMapStyle = useStorage('storeMapStyle', 'NewStreets')

export const storeMapLeftCollapsed = useStorage('storeMapLeftCollapsed', false)

export const storeMapRulerRouteLineString = useStorage('storeMapRulerRouteLineString', [])

export const storeMapWeatherLayerEnable = useStorage<string[]>('storeMapWeatherLayerEnable', [])

export const storeMapTypeLayerCheckedKeys = useStorage<string[]>('storeMapTypeLayerCheckedKeys', [])
