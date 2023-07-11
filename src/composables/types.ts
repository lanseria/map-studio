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
