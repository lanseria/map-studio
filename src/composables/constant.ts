import dayjs from 'dayjs'
import type { MyFeature } from './types'

export const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN

export const DEFAULT_ICONFONT_CN_URL = '//at.alicdn.com/t/c/font_3827842_wufq09bulno.js'

export const MAPBOX_STYLE_LIST = [
  {
    label: '街道',
    styleName: 'Streets',
    styleUrl: 'mapbox://styles/lanseria/clhluh3n100kq01r87c9deet0',
  },
  {
    label: '简白',
    styleName: 'Monochrome',
    styleUrl: 'mapbox://styles/lanseria/cldwdod87000e01pcn2ezak1n',
  },
  {
    label: '卫星',
    styleName: 'Satellite Streets',
    styleUrl: 'mapbox://styles/lanseria/cldecwoux001t01pk90yx1jj3',
  },
  {
    label: '户外',
    styleName: 'Outdoors',
    styleUrl: 'mapbox://styles/lanseria/cljhxduex000701p74upy4dge',
  },
  {
    label: '黑夜',
    styleName: 'Navigation',
    styleUrl: 'mapbox://styles/lanseria/cljno22rw00g401qwgerpdhb7',
  },
  {
    label: '天气',
    styleName: 'Weather',
    styleUrl: 'mapbox://styles/lanseria/cljpa0eny00qx01pm0cxka7xo',
  },
  {
    label: '羊皮',
    styleName: 'Ypz',
    styleUrl: {
      name: 'Ypz',
      version: 8,
      sources: {
        'raster-tiles': {
          type: 'raster',
          tiles: [
            'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg',
          ],
          tileSize: 256,
          attribution:
      'Map tiles by <a target="_top" rel="noopener" href="http://stamen.com">Stamen Design</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a target="_top" rel="noopener" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>',
        },
      },
      layers: [
        {
          id: 'simple-tiles',
          type: 'raster',
          source: 'raster-tiles',
          minzoom: 0,
          maxzoom: 22,
        },
      ],
    },
  },
]

export const INIT_POINT = [108.84, 31.06]
export const INIT_ZOOM = 3.5
export const WEATHER_TOKEN = '874718354841f0e0250b4b06a05a971e'

export enum PointTypeEnum {
  点 = 'InitPoint',
}

export const PointTypeEnumMap = {
  [PointTypeEnum.点]: '点',
}

export enum LineStringTypeEnum {
  线 = 'InitLineString',
}

export const LineStringTypeEnumMap = {
  [LineStringTypeEnum.线]: '线',
}

export enum PolygonTypeEnum {
  面 = 'InitPolygon',
}

export const PolygonTypeEnumMap = {
  [PolygonTypeEnum.面]: '面',
}

export const DOT_IMAGE_NAME = 'draw-point'

export const FILL_PREFIX = 'fill-'
export const LINE_PREFIX = 'line-'
export const CIRCLE_PREFIX = 'circle-'
export const SYMBOL_PREFIX = 'symbol-'

export const SETTING_TEXT_MAXSIZE = 30
export const SETTING_SYMBOL_MAXSIZE = 1

export const INIT_POLYGON_FILL_COLOR = '#e88b4d'
export const INIT_POLYGON_LINE_COLOR = '#e0be28'
export const INIT_POLYGON_OPACITY = 0.5

export const INIT_LINE_COLOR = '#ee6b3b'

export const INIT_POINT_SYMBOL_SIZE = 0.1
export const INIT_POINT_COLOR = '#71717a'
export const INIT_POINT_TEXT_FILL_COLOR = '#7e6c56'
export const INIT_POINT_TEXT_HALO_COLOR = '#ffffff'
export const INIT_POINT_TEXT_SIZE = 12

export const INIT_LINE_OPACITY = 0.8

export const INIT_RASTER_OPACITY = 0.5
// Draw图层
export const MAP_DRAW_SOURCE = 'MAP_DRAW_SOURCE'
export const MAP_DRAW_LAYER_POLYGON_FILL = 'MAP_DRAW_LAYER_POLYGON_FILL'
export const MAP_DRAW_LAYER_POLYGON_OUTLINE = 'MAP_DRAW_LAYER_POLYGON_OUTLINE'
export const MAP_DRAW_LAYER_STRINGLINE = 'MAP_DRAW_LAYER_STRINGLINE'
export const MAP_DRAW_LAYER_POINT = 'MAP_DRAW_LAYER_POINT'

// 气象图层
const now = new Date()
const utcDate = new Date(now.getTime() + now.getTimezoneOffset() * 60000)
const formattedDate = dayjs(utcDate).subtract(1, 'hour').format('YYYY-MM-DDTHH:00')

export const WEATHER_LIST = [
  {
    name: '云层',
    value: 'cloud',
    tiles: `https://c.sat.owm.io/vane/2.0/weather/CL/{z}/{x}/{y}?appid=${WEATHER_TOKEN}`,
  },
  {
    name: '气压',
    value: 'pressure',
    tiles: `https://a.sat.owm.io/vane/2.0/weather/APM/{z}/{x}/{y}?appid=${WEATHER_TOKEN}`,
  },
  {
    name: '温度',
    value: 'TA2',
    tiles: `https://c.sat.owm.io/vane/2.0/weather/TA2/{z}/{x}/{y}?appid=${WEATHER_TOKEN}`,
  },
  {
    name: '风速',
    value: 'WS10',
    tiles: `https://c.sat.owm.io/vane/2.0/weather/WS10/{z}/{x}/{y}?appid=${WEATHER_TOKEN}`,
  },
  {
    name: '雷达',
    value: 'radar',
    tiles: `https://b.sat.owm.io/maps/2.0/radar/{z}/{x}/{y}?appid=${WEATHER_TOKEN}&day=${formattedDate}`,
  },
]
// 经纬度
export const GRATICULE = {
  type: 'FeatureCollection',
  features: [] as MyFeature[],
}

export const GRATICULE_SOURCE_NAME = 'graticule_source'
export const GRATICULE_LAYER_NAME = 'graticule_layer'

for (let lng = -170; lng <= 180; lng += 10) {
  GRATICULE.features.push({
    type: 'Feature',
    geometry: { type: 'LineString', coordinates: [[lng, -90], [lng, 90]] },
    properties: { value: lng },
  })
}
for (let lat = -80; lat <= 80; lat += 10) {
  GRATICULE.features.push({
    type: 'Feature',
    geometry: { type: 'LineString', coordinates: [[-180, lat], [180, lat]] },
    properties: { value: lat },
  })
}
// 停车场图层
export const PARKING_SPOT_SOURCE_NAME = 'parking_spot_source'
export const PARKING_SPOT_LAYER_NAME = 'parking_spot_layer'
export const PARKING_SPOT_CLUSTER_LAYER_NAME = 'parking_spot_cluster_layer'
export const PARKING_SPOT_CLUSTER_COUNT_LAYER_NAME = 'parking_spot_cluster_count_layer'

export const PARKING_SPOT_SUBMIT_LINK = 'https://enjqkboeqf.feishu.cn/share/base/form/shrcnoe95aMXAUGejzSvvEW9O2b?prefill_%E5%AE%A1%E6%A0%B8%E7%8A%B6%E6%80%81=%E5%AE%A1%E6%A0%B8%E4%B8%AD&hide_%E5%AE%A1%E6%A0%B8%E7%8A%B6%E6%80%81=1&prefill_%E6%98%A5%E8%8A%82%E5%85%8D%E8%B4%B9=%E5%90%A6'
