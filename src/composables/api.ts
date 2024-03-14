import axios from 'axios'

export function fetchParkingSpotCount() {
  return axios.request({
    url: '/parking-spot/count.json',
  })
}

export function fetchParkingSpot(label: string, extra: string) {
  return axios.request({
    url: `/parking-spot/${extra}/${label}.geojson`,
  })
}
