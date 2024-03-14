import type { Feature, LineString, Point, Polygon } from '@turf/turf'

export type MyGeometry = Polygon | Point | LineString
export type MyFeature = Feature<MyGeometry, any>

export interface GeoLocation {
  accuracy: number
  altitude: number | null
  altitudeAccuracy: number | null
  heading: number | null
  latitude: number
  longitude: number
  speed: number | null
  locatedAt: number
}

export interface StormDataProperties {
  centerlat: string
  centerlng: string
  endtime: string
  enname: string
  isactive: string
  name: string
  starttime: string
  tfid: string
  warnlevel: string
}
export interface TyphoonData {
  enname: string
  lat: string
  lng: string
  movedirection: string
  movespeed: string
  name: string
  power: string
  pressure: string
  radius7: null
  radius10: null
  speed: string
  strong: string
  tfid: string
  time: string
  timeformate: string
}
export interface StormData {
  ckposition: null
  forecast: { [key: string]: any }[]
  jl: null
  lat: string
  lng: string
  movedirection: string
  movespeed: string
  power: string
  pressure: string
  radius7: string
  radius10: string
  radius12: string
  speed: string
  strong: string
  time: string
}

export interface GeoJsonStormFeature {
  type: 'Feature'
  properties: { [key: string]: any }
  geometry: {
    type: 'Point'
    coordinates: number[]
  }
}

export interface ParkingSpotPointProps {
  id: string
  /**
   * 描述
   */
  desc: string
  /**
   * 免费颜色
   */
  color: string
  /**
   * 类型
   */
  type: string
  /**
   * 类型颜色
   */
  typeColor: string
  /**
   * 免费/收费
   */
  isFree: string
  /**
   * 是否节假日免费
   */
  holiday: boolean
  marker: string
  /**
   * 前几个小时免费
   */
  freeHours: string
  /**
   * 社交链接
   */
  link: string
}

export interface ParkingSpotCurrent {
  coordinates: number[]
  properties?: ParkingSpotPointProps
}
