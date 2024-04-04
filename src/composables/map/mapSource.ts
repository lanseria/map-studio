import { featureCollection } from '@turf/turf'

export function addGraticuleSource() {
  const map = window.map
  // 显示经纬度
  map.addSource(GRATICULE_SOURCE_NAME, {
    type: 'geojson',
    data: GRATICULE as any,
  })
}

/**
 * 添加 parking spot source
 * @param sourceName
 * @param data
 */
export function addParkingSpotSource(sourceName: string, data: any) {
  const map = window.map
  const source: any = map.getSource(sourceName)
  // 判断 source
  if (source) {
    source.setData(data)
  }
  else {
    map.addSource(sourceName, {
      type: 'geojson',
      data,
      cluster: true,
      clusterMaxZoom: 12,
      clusterRadius: 25,
    })
  }
}
export function clearParkingSpotSource(sourceName: string) {
  const map = window.map
  const source: any = map.getSource(sourceName)
  // 判断 source
  if (source)
    source.setData(featureCollection([]))
}

/**
 * 添加 earth quake source
 * @param sourceName
 * @param data
 */
export function addEarthQuakeSource(sourceName: string, data: any) {
  const map = window.map
  const source: any = map.getSource(sourceName)
  // 判断 source
  if (source) {
    source.setData(data)
  }
  else {
    map.addSource(sourceName, {
      type: 'geojson',
      data,
      // cluster: true,
      // clusterMaxZoom: 12,
      // clusterRadius: 25,
    })
  }
}

export function clearEarthQuakeSource(sourceName: string) {
  const map = window.map
  const source: any = map.getSource(sourceName)
  // 判断 source
  if (source)
    source.setData(featureCollection([]))
}

/**
 * 添加 earth quake source
 * @param sourceName
 * @param data
 */
export function addPlateInterfaceSource(sourceName: string, data: any) {
  const map = window.map
  const source: any = map.getSource(sourceName)
  // 判断 source
  if (source) {
    source.setData(data)
  }
  else {
    map.addSource(sourceName, {
      type: 'geojson',
      data,
      // cluster: true,
      // clusterMaxZoom: 12,
      // clusterRadius: 25,
    })
  }
}
export function clearPlateInterfaceSource(sourceName: string) {
  const map = window.map
  const source: any = map.getSource(sourceName)
  // 判断 source
  if (source)
    source.setData(featureCollection([]))
}
