import dayjs from 'dayjs'

export const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN

console.warn('renderer constant: ', MAPBOX_TOKEN)

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

export const MAP_DRAW_SOURCE = 'MAP_DRAW_SOURCE'
export const MAP_DRAW_LAYER_POLYGON_FILL = 'MAP_DRAW_LAYER_POLYGON_FILL'
export const MAP_DRAW_LAYER_POLYGON_OUTLINE = 'MAP_DRAW_LAYER_POLYGON_OUTLINE'
export const MAP_DRAW_LAYER_STRINGLINE = 'MAP_DRAW_LAYER_STRINGLINE'
export const MAP_DRAW_LAYER_POINT = 'MAP_DRAW_LAYER_POINT'

export const MAP_DATA_SOURCE = 'MAP_DATA_SOURCE'
export const MAP_DATA_LAYER_POINT = 'MAP_DATA_LAYER_POINT'

export const MAP_DATA_TYPE = [
  {
    label: '户外旅行UP主',
    value: 'travel_example',
  },
]

export const MAP_DATA_LIST = [
  {
    type: 'travel_example',
    label: '徐云流浪中国',
    value: '/xuyun-data',
    issue: 'incoming+data1355712-xuyun-data-114561-d4uz7cegv0krtvsns2ipla067-issue@mg.jihulab.com',
  },
  {
    type: 'travel_example',
    label: '十三要和拳头',
    value: '/shisanyaoshitou-data',
    issue: 'incoming+data1355712-shisanyaoshitou-data-116130-d4uz7cegv0krtvsns2ipla067-issue@mg.jihulab.com',
  },
]

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

export const PANGU_LAYER_IMG_LIST = [
  {
    name: 'pangu_medium-mslp-wind850_2023-07-21_00',
    url: 'https://charts.ecmwf.int/content/20230726111133-b5ec88bd7e02257bae6b969fcd20c0f6524b4e94.png',
  },
  {
    name: 'pangu_medium-mslp-wind850_2023-07-24_12',
    url: 'https://charts.ecmwf.int/content/20230726111720-2384f1a756fb40b38ba4cffbee250a047c7a32f0.png',
  },
  {
    name: 'pangu_medium-mslp-wind850_2023-07-26_00',
    url: 'https://charts.ecmwf.int/content/20230726105341-e7ea554d28b4f7ffb733bda4dc7d110dbbbae30f.png',
  },
]
