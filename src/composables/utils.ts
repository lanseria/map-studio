import type { GeoJsonStormFeature, GeoLocation, StormData } from './types'

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

export function convertStormDataToGeoJson(data: StormData): GeoJsonStormFeature {
  const coordinates = [Number(data.lng), Number(data.lat)]
  const properties = {
    movedirection: data.movedirection,
    movespeed: data.movespeed,
    power: data.power,
    pressure: data.pressure,
    radius7: data.radius7,
    radius10: data.radius10,
    radius12: data.radius12,
    speed: data.speed,
    strong: data.strong,
    time: data.time,
  }
  return {
    type: 'Feature',
    properties,
    geometry: {
      type: 'Point',
      coordinates,
    },
  }
}
