import { addMapParkingSpotLayerClickEvents } from './mapClick'

export function mapLoad() {
  const map = window.map
  // 显示经纬度
  addGraticuleSource()
  addGraticuleLayer()
  // 添加预设圆点素材
  addColorPoint()
  // 添加红色动态点素材
  if (map.hasImage('pulsing-dot'))
    map.removeImage('pulsing-dot')
  map.addImage('pulsing-dot', pulsingDot(100), { pixelRatio: 2 })
  // 监听是否折叠
  watchEffect(() => {
    map.easeTo({
      padding: {
        left: storeMapLeftCollapsed.value ? 0 : 300,
        bottom: 0,
        right: 0,
        top: 0,
      },
      duration: 500, // In ms. This matches the CSS transition duration property.
    })
  })
  // 添加天气图层
  WEATHER_LIST.forEach((item) => {
    const visibility = storeMapWeatherLayerEnable.value.includes(item.value) ? 'visible' : 'none'
    map.addLayer({
      id: `${item.value}-tiles`,
      type: 'raster',
      source: {
        type: 'raster',
        tiles: [item.tiles],
        tileSize: 256,
      },
      paint: {
        'raster-fade-duration': 0,
      },
      layout: {
        visibility,
      },
    })
  })
  // 点击事件
  map.on('mouseup', (e) => {
    console.log(e)
  })
  addMapParkingSpotLayerClickEvents()
}
