import type { Position } from '@turf/turf'
import * as turf from '@turf/turf'

export function addSource() {
  const map = window.map
  const source: any = map.getSource(MAP_DATA_SOURCE)
  const filterMapFeatures = globalComputedFilterMapFeatures.value
  // 判断source
  if (source) {
    source.setData(
      turf.featureCollection(filterMapFeatures),
    )
  }
  else {
    map.addSource(MAP_DATA_SOURCE, {
      type: 'geojson',
      data: turf.featureCollection(filterMapFeatures),
    })
  }
}

export function drawPoint() {
  const map = window.map
  const source: any = map.getSource(MAP_DATA_SOURCE)
  if (!source)
    return
  if (map.getLayer(MAP_DATA_LAYER_POINT))
    map.removeLayer(MAP_DATA_LAYER_POINT)
  map.addLayer({
    id: MAP_DATA_LAYER_POINT,
    type: 'symbol',
    source: MAP_DATA_SOURCE,
    layout: {
      'text-field': ['get', 'description'],
      'icon-image': 'map-point',
      'icon-size': 0.1,
      'text-size': ['get', 'text-size'],
      'text-offset': [0, 0.5],
      'text-anchor': 'top',
      'icon-allow-overlap': true,
    },
    paint: {
      'text-color': ['get', 'text-color'],
      'text-halo-color': INIT_POINT_TEXT_HALO_COLOR,
      'text-halo-width': 1,
      'text-halo-blur': 0,
    },
    filter: ['all',
      ['==', ['geometry-type'], 'Point'],
      ['==', ['get', 'sessionId'], globalSessionId.value],
    ],
  })
}

export function reloadDataSourceLayer() {
  addSource()
  drawPoint()
}

export async function updateLineLayer() {
  const map = window.map
  const arr = [-1, 0, 1, 0]
  MAP_DATA_LIST.forEach((item) => {
    // console.warn(storeMapImportLayerCheckedKeys.value)
    const visibility = storeMapImportLayerCheckedKeys.value.includes(item.label)
    // console.warn('visibility', visibility)
    const sourceId = `source-${item.label}`
    const layerId = `layer-${item.label}`
    arr.forEach((x, i) => {
      const lineLayerId = `${LINE_PREFIX}${layerId}-${i}`
      if (map.getLayer(lineLayerId))
        map.removeLayer(lineLayerId)
      map.addLayer({
        id: lineLayerId,
        type: 'line',
        source: sourceId,
        layout: {
          'line-cap': i === 3 ? 'butt' : 'square',
          'visibility': visibility ? 'visible' : 'none',
        },
        paint: {
          'line-color': i === 3 ? ['get', 'color'] : 'white',
          'line-width': i === 3 ? 6 : 3,
          'line-offset': x * 3,
        },
      })
    })
  })
}

export function reloadMapGpxLayer(label: string, value: string) {
  const map = window.map
  const sourceId = `source-${label}`
  if (!map.getSource(sourceId)) {
    map.addSource(sourceId, {
      type: 'geojson',
      data: `${value}/geojson/allLine.geojson`,
    })
  }
}

export function updateDistanceSourceLayer(data: Position[]) {
  const geojsonObj = turf.featureCollection([turf.lineString(data)])
  const map = window.map
  const sourceId = 'source-distance'
  const lineLayerId = 'layer-distance'
  if (!map.getSource(sourceId)) {
    map.addSource(sourceId, {
      type: 'geojson',
      data: geojsonObj,
    })
  }
  else {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    map.getSource(sourceId).setData(geojsonObj)
  }
  if (map.getLayer(lineLayerId))
    map.removeLayer(lineLayerId)
  map.addLayer({
    id: lineLayerId,
    type: 'line',
    source: sourceId,
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
    },
    paint: {
      'line-color': '#888',
      'line-width': 3,
      'line-opacity': 0.8,
      'line-dasharray': [1, 2], // 设置虚线样式，第一个值表示实线长度，第二个值表示虚线长度
    },
  })
}

export function updateTrailGpxSourceLayer() {
  // const geojsonObj = turf.featureCollection([turf.lineString(data)])
  const map = window.map
  const sourceId = 'source-trail-gpx'
  const lineLayerId = 'layer-trail-gpx'
  if (!map.getSource(sourceId)) {
    map.addSource(sourceId, {
      type: 'geojson',
      data: globalMapTrailGPXGeoJson.value as any,
    })
  }
  else {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    map.getSource(sourceId).setData(geojsonObj)
  }
  if (map.getLayer(lineLayerId))
    map.removeLayer(lineLayerId)
  map.addLayer({
    id: lineLayerId,
    type: 'line',
    source: sourceId,
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
    },
    paint: {
      'line-color': '#333',
      'line-width': 3,
      'line-opacity': 0.8,
      'line-dasharray': [1, 2], // 设置虚线样式，第一个值表示实线长度，第二个值表示虚线长度
    },
  })
}

export function reloadPanguImagesLayer() {
  const map = window.map
  PANGU_LAYER_IMG_LIST.forEach((item) => {
    const visibility = storeMapTypeLayerCheckedKeys.value.includes(item.name) ? 'visible' : 'none'
    const layerName = `${item.name}-images`
    if (map.getLayer(layerName)) {
      map.setLayoutProperty(
        layerName,
        'visibility',
        visibility,
      )
    }
    else {
      map.addLayer({
        id: layerName,
        type: 'raster',
        source: {
          type: 'image',
          url: item.url,
          coordinates: [
            [72.5, 41.5],
            [171, 41.5],
            [171, -42.5],
            [72.5, -42.5],
          ],
        },
        paint: {
          'raster-opacity': 0.5,
          'raster-fade-duration': 0,
        },
        layout: {
          visibility,
        },
      })
    }
  })
}

export function reloadCurrentStormPointsLayer() {
  console.warn('reloadCurrentStormPointsLayer')
  const map = window.map
  const MAP_DATA_STORM_POINT_SOURCE = 'storm-data-point'
  const MAP_DATA_STORM_POINT_LAYER = 'storm-points-layer'
  const source: any = map.getSource(MAP_DATA_STORM_POINT_SOURCE)
  // 判断source
  if (source) {
    source.setData({
      type: 'FeatureCollection',
      features: storeMapLayerStormDataList.value, // 在之前的代码中创建的GeoJSON特征
    })
  }
  else {
    map.addSource(MAP_DATA_STORM_POINT_SOURCE, {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: storeMapLayerStormDataList.value, // 在之前的代码中创建的GeoJSON特征
      },
    })
  }
  if (map.getLayer(MAP_DATA_STORM_POINT_LAYER))
    map.removeLayer(MAP_DATA_STORM_POINT_LAYER)
  map.addLayer({
    id: MAP_DATA_STORM_POINT_LAYER,
    type: 'circle',
    source: MAP_DATA_STORM_POINT_SOURCE,
    paint: {
      'circle-radius': 5,
      'circle-color': ['get', 'color'],
    },
  })
}

export function reloadCurrentStormLineLayer() {
  console.warn('reloadCurrentStormLineLayer')
  const map = window.map
  const MAP_DATA_STORM_LINE_SOURCE = 'storm-data-line'
  const MAP_DATA_STORM_LINE_LAYER = 'storm-line-layer'
  const source: any = map.getSource(MAP_DATA_STORM_LINE_SOURCE)
  if (storeMapLayerStormDataList.value.length === 0) {
    console.warn('storm no data')
    return
  }
  const lineFeature = turf.lineString(storeMapLayerStormDataList.value.map((feature) => {
    // console.log(feature.geometry.coordinates)
    return feature.geometry.coordinates
  }), {
    color: 'red',
  })
  // 判断source
  if (source) {
    source.setData({
      type: 'FeatureCollection',
      features: [lineFeature], // 在之前的代码中创建的GeoJSON特征
    })
  }
  else {
    map.addSource(MAP_DATA_STORM_LINE_SOURCE, {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [lineFeature], // 在之前的代码中创建的GeoJSON特征
      },
    })
  }
  // 将点连接成线
  if (map.getLayer(MAP_DATA_STORM_LINE_LAYER))
    map.removeLayer(MAP_DATA_STORM_LINE_LAYER)
  map.addLayer({
    id: MAP_DATA_STORM_LINE_LAYER,
    type: 'line',
    source: MAP_DATA_STORM_LINE_SOURCE,
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
    },
    paint: {
      'line-color': ['get', 'color'],
      'line-width': 2,
    },
  })
}
