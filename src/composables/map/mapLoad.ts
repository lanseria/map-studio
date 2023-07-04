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
  map.on('ruler.on', () => {
    globalMapRulerCoordinates.value = []
  })
  map.on('ruler.off', () => {
    handleFetchDistance(globalMapRulerCoordinates.value)
  })
  map.on('ruler.change', (params) => {
    globalMapRulerCoordinates.value = params.coordinates
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
  const now = new Date()
  const utcYear = now.getUTCFullYear()
  const utcMonth = (now.getUTCMonth() + 1).toString().padStart(2, '0')
  const utcDate = now.getUTCDate().toString().padStart(2, '0')
  const utcHours = now.getUTCHours().toString().padStart(2, '0')
  // 转换为指定格式
  const utcDateString = `${utcYear}-${utcMonth}-${utcDate}T${utcHours}:00`

  map.addLayer({
    id: 'simple-tiles',
    type: 'raster',
    source: {
      type: 'raster',
      // tiles: ['https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=874718354841f0e0250b4b06a05a971e'],
      // tiles: ['https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=90f909b02bd0b42203c536dd57bbf1dc'],
      // tiles: ['https://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?appid=874718354841f0e0250b4b06a05a971e'],
      // tiles: ['https://c.sat.owm.io/vane/2.0/weather/CL/{z}/{x}/{y}?appid=874718354841f0e0250b4b06a05a971e'],//cloud
      // tiles: ['https://a.sat.owm.io/vane/2.0/weather/APM/{z}/{x}/{y}?appid=874718354841f0e0250b4b06a05a971e'], // pressure
      // tiles: ['https://c.sat.owm.io/vane/2.0/weather/TA2/{z}/{x}/{y}?appid=874718354841f0e0250b4b06a05a971e'], // TA2
      // tiles: ['https://c.sat.owm.io/vane/2.0/weather/WS10/{z}/{x}/{y}?appid=874718354841f0e0250b4b06a05a971e'], // WS10
      tiles: [`https://b.sat.owm.io/maps/2.0/radar/{z}/{x}/{y}?appid=874718354841f0e0250b4b06a05a971e&day=${utcDateString}`], // radar
      tileSize: 256,
    },
    minzoom: 0,
    maxzoom: 22,
  })
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
