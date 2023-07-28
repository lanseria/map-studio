import type { GeoJsonStormFeature, GeoLocation, StormData, StormDataProperties } from './types'

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
export function getColorByName(name: string): string {
  if (name === '202305')
    return 'red'

  else if (name === '202306')
    return 'blue'

  else
    return 'black'
}
export function convertStormDataToGeoJson(data: StormData, props: StormDataProperties): GeoJsonStormFeature {
  const coordinates = [Number(data.lng), Number(data.lat)]
  const properties = {
    movedirection: data.movedirection,
    movespeed: data.movespeed,
    power: data.power,
    lat: data.lat,
    lng: data.lng,
    pressure: data.pressure,
    radius7: data.radius7,
    radius10: data.radius10,
    radius12: data.radius12,
    speed: data.speed,
    strong: data.strong,
    time: data.time,
    color: getColorByName(props.tfid),
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
