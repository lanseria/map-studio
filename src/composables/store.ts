export const storeMapStyle = useStorage('storeMapStyle', 'Streets')

export const storeMapLeftCollapsed = useStorage('storeMapLeftCollapsed', true)

export const storeMapRulerRouteLineString = useStorage('storeMapRulerRouteLineString', [])

export const storeMapWeatherLayerEnable = useStorage<string[]>('storeMapWeatherLayerEnable', [])
