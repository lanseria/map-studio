import dayjs from 'dayjs'
import { handleFetchDistance } from '../fetch'

function loadImg(name: string, url: string, sdf = false) {
  const map = window.map
  if (map.hasImage(name))
    return

  map.loadImage(url, (error, image) => {
    if (error)
      throw error
    image && map.addImage(name, image, { sdf })
  })
}
export function setMapPointImg(url: string) {
  console.warn('setMapPointImg')
  const map = window.map
  const name = 'map-point'
  if (map.hasImage(name))
    map.removeImage(name)
  loadImg('map-point', url)
}

export function mapLoad() {
  const map = window.map
  map.addSource('graticule', {
    type: 'geojson',
    data: GRATICULE as any,
  })
  map.addLayer({
    id: 'graticule',
    type: 'line',
    source: 'graticule',
    paint: {
      'line-color': '#000000', // 设置线条颜色，这里为黑色
      'line-opacity': 0.5, // 设置线条透明度，这里为0.5，即半透明
      'line-width': 1, // 设置线条宽度，这里为1个像素
      'line-dasharray': [2, 2], // 设置线条样式为虚线，每个虚线由2个单位的实线和2个单位的虚线组成
    },
  })
  if (map.hasImage('pulsing-dot'))
    map.removeImage('pulsing-dot')
  map.addImage('pulsing-dot', pulsingDot(100), { pixelRatio: 2 })
  map.on('ruler.on', () => {
    globalMapRulerCoordinates.value = []
  })
  map.on('ruler.off', () => {
    handleFetchDistance(globalMapRulerCoordinates.value)
  })
  map.on('ruler.change', (params) => {
    globalMapRulerCoordinates.value = params.coordinates
  })
  const { copy } = useClipboard()
  map.on('click', (e) => {
    const formattedDate = dayjs(+globalStorePanguPhotosKeysCurrent.value * 1000).format('YYYY-MM-DD,HH:mm:00')
    console.warn(`${e.lngLat.lat},${e.lngLat.lng},${formattedDate},48,945`)
    copy(`${e.lngLat.lat},${e.lngLat.lng},${formattedDate},48,945`)
  })

  map.on('idle', (e) => {
    console.warn('idle', e)
    globalMapPhotoLoading.value = false
    if (globalMapPhotoPlaying.value)
      nextPhoto()
  })
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

  watchDebounced(() => globalStorePanguPhotosKeys.value, () => {
    console.warn('globalStorePanguPhotosKeys changed')
    reloadPanguPhotosGifLayer()
  }, { debounce: 300, maxWait: 600 })
}
