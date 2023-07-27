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
