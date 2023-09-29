import type { Position } from '@turf/turf'
import * as turf from '@turf/turf'
import mapboxgl from 'mapbox-gl'
import type { GeoJsonStormFeature } from '../types'

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
      'icon-image': 'draw-point',
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
    // console.log(visibility)
    const layerName = `${item.name}-images`
    if (map.getLayer(layerName)) {
      // console.log(1)
      map.setLayoutProperty(
        layerName,
        'visibility',
        visibility,
      )
    }
    else {
      // console.log(2)
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

export function drawTyphoonLineAndPoints(data: GeoJsonStormFeature[], id: string) {
  drawStormPointsLayer(data, id)
  drawStormLineLayer(data, id)
}

export function drawStormPointsLayer(data: GeoJsonStormFeature[], id: string) {
  console.warn(`drawStormPointsLayer${id}`)
  const map = window.map
  const MAP_DATA_STORM_POINT_SOURCE = `storm-data-point${id}`
  const MAP_DATA_STORM_POINT_LAYER = `storm-points-layer${id}`
  const source: any = map.getSource(MAP_DATA_STORM_POINT_SOURCE)
  // 判断source
  if (source) {
    source.setData({
      type: 'FeatureCollection',
      features: data, // 在之前的代码中创建的GeoJSON特征
    })
  }
  else {
    map.addSource(MAP_DATA_STORM_POINT_SOURCE, {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: data, // 在之前的代码中创建的GeoJSON特征
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
  map.on('click', MAP_DATA_STORM_POINT_LAYER, (e: any) => {
    function genDescription(item: any) {
      return `台风“${id}”，目前位于北纬${item.lat}度、东经${item.lng}度，向${item.movedirection}方向移动，移速为每小时${item.movespeed}公里，中心风力达到每秒${item.speed}米(${item.power}级)，为${item.strong}级别，中心气压为${item.pressure}百帕。数据发布时间为${item.time}。`
    }
    // Copy coordinates array.
    const coordinates = e.features![0].geometry.coordinates!.slice()
    const description = genDescription(e.features![0].properties)

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180)
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360

    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(description)
      .addTo(map)
  })
}

export function drawStormLineLayer(data: GeoJsonStormFeature[], id: string) {
  console.warn(`drawStormLineLayer${id}`)
  const map = window.map
  const MAP_DATA_STORM_LINE_SOURCE = `storm-data-line${id}`
  const MAP_DATA_STORM_LINE_LAYER = `storm-line-layer${id}`
  const source: any = map.getSource(MAP_DATA_STORM_LINE_SOURCE)
  if (data.length === 0) {
    console.warn('storm no data')
    return
  }
  const lineFeature = turf.lineString(data.map((feature) => {
    // console.log(feature.geometry.coordinates)
    return feature.geometry.coordinates
  }), {
    color: getColorByName(id),
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

function getPath() {
  // 21600
  console.log(globalStorePanguPhotosKeysCurrent.value)
  const idx = storePanguPhotos.value.findIndex(item => item.time === +globalStorePanguPhotosKeysCurrent.value)
  if (idx >= 0) {
    return storePanguPhotos.value[idx].url
  }
  else {
    if (+globalStorePanguPhotosKeysCurrent.value > +globalStorePanguPhotosKeys.value[globalStorePanguPhotosKeys.value.length - 1])
      globalStorePanguPhotosKeysCurrent.value = globalStorePanguPhotosKeys.value[0]
    if (+globalStorePanguPhotosKeysCurrent.value < +globalStorePanguPhotosKeys.value[0])
      globalStorePanguPhotosKeysCurrent.value = globalStorePanguPhotosKeys.value[globalStorePanguPhotosKeys.value.length - 1]

    const idx = storePanguPhotos.value.findIndex(item => item.time === +globalStorePanguPhotosKeysCurrent.value)
    return storePanguPhotos.value[idx].url
  }
}
export function startPhoto() {
  const map: any = window.map
  globalStorePanguPhotosKeysCurrent.value = globalStorePanguPhotosKeys.value[0]
  map.getSource(MAP_DATA_STORM_FORECAST_PANGU_GIF_SOURCE).updateImage({ url: getPath() })
  // globalMapPhotoLoading.value = true
}
export function prevPhoto() {
  const map: any = window.map
  globalStorePanguPhotosKeysCurrent.value = (+globalStorePanguPhotosKeysCurrent.value - 21600).toString()
  map.getSource(MAP_DATA_STORM_FORECAST_PANGU_GIF_SOURCE).updateImage({ url: getPath() })
  // globalMapPhotoLoading.value = true
}
export function nextPhoto() {
  const map: any = window.map
  globalStorePanguPhotosKeysCurrent.value = (+globalStorePanguPhotosKeysCurrent.value + 21600).toString()
  map.getSource(MAP_DATA_STORM_FORECAST_PANGU_GIF_SOURCE).updateImage({ url: getPath() })
  // globalMapPhotoLoading.value = true
}
export function endPhoto() {
  const map: any = window.map
  globalStorePanguPhotosKeysCurrent.value = globalStorePanguPhotosKeys.value[globalStorePanguPhotosKeys.value.length - 1]
  map.getSource(MAP_DATA_STORM_FORECAST_PANGU_GIF_SOURCE).updateImage({ url: getPath() })
  // globalMapPhotoLoading.value = true
}
export function reloadPanguPhotosGifLayer() {
  const map = window.map
  const source: any = map.getSource(MAP_DATA_STORM_FORECAST_PANGU_GIF_SOURCE)
  // 判断source
  if (!source) {
    map.addSource(MAP_DATA_STORM_FORECAST_PANGU_GIF_SOURCE, {
      type: 'image',
      url: getPath(),
      coordinates: [
        [72.7, 41.1],
        [170.7, 41.1],
        [170.7, -41.1],
        [72.7, -41.1],
      ],
    })
  }
  if (map.getLayer(MAP_DATA_STORM_FORECAST_PANGU_GIF_LAYER))
    map.removeLayer(MAP_DATA_STORM_FORECAST_PANGU_GIF_LAYER)
  map.addLayer({
    id: MAP_DATA_STORM_FORECAST_PANGU_GIF_LAYER,
    type: 'raster',
    source: MAP_DATA_STORM_FORECAST_PANGU_GIF_SOURCE,
    paint: {
      'raster-opacity': 0.5,
      'raster-fade-duration': 0,
    },
    layout: {
      visibility: storeMapPhotoPlayingVisible.value ? 'visible' : 'none',
    },
  })
}

export function reloadPanguVideo() {
  const map = window.map
  PANGU_VIDEO_LIST.forEach((item) => {
    const layerName = MAP_DATA_STORM_FORECAST_PANGU_VIDEO_LAYER
    const visibility = storeMapVideoVisible.value ? 'visible' : 'none'
    map.addSource('video', {
      type: 'video',
      urls: item.urls,
      coordinates: [
        [74, 34.5],
        [170, 34.5],
        [170, -18],
        [74, -18],
      ],
    })
    if (map.getLayer(layerName)) {
      // console.log(1)
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
        source: 'video',
        paint: {
          'raster-opacity': 0.7,
          'raster-fade-duration': 0,
        },
        layout: {
          visibility,
        },
      })
    }

    if (storeMapVideoPlaying.value)
      map.getSource('video').play()

    else
      map.getSource('video').pause()
  })
}

export function drawEcForecast() {

}
