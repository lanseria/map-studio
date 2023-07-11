import type { GeoLocation } from './types'

export function initGpxProperties() {
  return {
    name: '',
    desc: '',
    type: '01',
    link: '',
  }
}
export function convertToGeoJSON(locations: GeoLocation[], properties: any = {}): any {
  const coordinates = locations.map(location => [location.longitude, location.latitude])

  const geoJSON = {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates,
    },
    properties,
  }

  return geoJSON
}
