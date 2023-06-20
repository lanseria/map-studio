import type { Feature, LineString, Point, Polygon } from '@turf/turf'

export type MyGeometry = Polygon | Point | LineString
export type MyFeature = Feature<MyGeometry, any>
