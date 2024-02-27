import dayjs from 'dayjs'
import { handleFetchDistance } from '../fetch'
import { reloadPanguImagesLayer, reloadPanguVideo } from './mapLayer'

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
      data: GRATICULE as any
  });
  map.addLayer({
      id: 'graticule',
      type: 'line',
      source: 'graticule'
  });
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
    console.log(`${e.lngLat.lat},${e.lngLat.lng},${formattedDate},48,945`)
    copy(`${e.lngLat.lat},${e.lngLat.lng},${formattedDate},48,945`)
  })

  map.on('idle', (e) => {
    console.log('idle', e)
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
  // map.addSource('maine', {
  //   type: 'geojson',
  //   data: 'https://jihulab.com/data1355712/xuyun-data/-/raw/main/geojson/dongbeiLine.geojson',
  // })
  // map.addLayer({
  //   id: 'outline',
  //   type: 'line',
  //   source: 'maine',
  //   layout: {},
  //   paint: {
  //     'line-color': '#000',
  //     'line-width': 3,
  //   },
  // })

  reloadPanguImagesLayer()
  watchDebounced(() => storeMapTypeLayerCheckedKeys.value, () => {
    console.warn('storeMapTypeLayerCheckedKeys changed')
    reloadPanguImagesLayer()
  }, { debounce: 300, maxWait: 600 })

  watchDebounced(() => globalStorePanguPhotosKeys.value, () => {
    console.warn('globalStorePanguPhotosKeys changed')
    reloadPanguPhotosGifLayer()
  }, { debounce: 300, maxWait: 600 })

  reloadPanguVideo()
  // map.addLayer({
  //   id: 'radar-tiles',
  //   type: 'raster',
  //   source: {
  //     type: 'raster',
  //     tiles: [`https://b.sat.owm.io/maps/2.0/radar/{z}/{x}/{y}?appid=874718354841f0e0250b4b06a05a971e&day=${formattedDate}`], // radar
  //     tileSize: 256,
  //   },
  //   minzoom: 0,
  //   maxzoom: 22,
  // })
  // loadImg('DrawLineArrow', drawLineArrow, true)
  // loadImg('DrawLineArrow', '/draw-line-arrow.png', true)
  // mapLoadImages()

  // reloadMapDrawLayer()

  // MAP_DATA_LIST.forEach((item) => {
  //   reloadMapGpxLayer(item.label, item.value)
  //   // console.warn('mapLoad')
  //   setTimeout(() => {
  //     updateLineLayer()
  //   }, 1000)
  // })
  // reloadMapGpxLayer('lanseria.1yil1z4p', '#ffdcb6')
  // for (const key in mapCityTypeColorMap.value) {
  //   const color = mapCityTypeColorMap.value[key]
  //   const colorRgb = hexToRgb(color)
  //   if (map.hasImage(color))
  //     map.removeImage(color)
  //   map.addImage(color, createColorPoint(...colorRgb, 255))
  // }

  // setTimeout(() => {
  //   styleIsLoad.value = true
  //   reloadSourceLayer()
  //   reloadCityLayer()

  //   watchDebounced(() => filterCityList.value, () => {
  //     console.warn('filterCityList changed')
  //     reloadCityLayer()
  //   }, { debounce: 300, maxWait: 600 })
  // }, 2000)
}
