import mapboxgl from 'mapbox-gl'
import { LineStringTypeEnum, PointTypeEnum, PolygonTypeEnum } from '../constant'
import type { MyFeature } from '../types'

export function handleSetPolygon(type: PolygonTypeEnum = PolygonTypeEnum.面) {
  // 设置完立即显示其当前要素属性
  // activeTab.value = 'edit'
  globalCurrentProperties.value = {
    ...{
      'fill-color': INIT_POLYGON_FILL_COLOR,
      'fill-opacity': 0.8,
      'line-color': INIT_POLYGON_LINE_COLOR,
      'line-width': 2,
      'line-opacity': 1,
      'description': '',
      'text-color': INIT_POINT_TEXT_FILL_COLOR,
      'text-size': INIT_POINT_TEXT_SIZE,
    },
    type,
  }

  const draw = window.draw
  draw.changeMode('draw_polygon')
}
export function handleSetRadius(type: PolygonTypeEnum = PolygonTypeEnum.面) {
  // 设置完立即显示其当前要素属性
  // activeTab.value = 'edit'
  globalCurrentProperties.value = {
    ...{
      'fill-color': INIT_POLYGON_FILL_COLOR,
      'fill-opacity': 0.8,
      'line-color': INIT_POLYGON_LINE_COLOR,
      'line-width': 2,
      'line-opacity': 1,
      'description': '',
      'text-color': INIT_POINT_TEXT_FILL_COLOR,
      'text-size': INIT_POINT_TEXT_SIZE,
    },
    type,
  }

  const draw = window.draw
  draw.changeMode('draw_radius')
}

export function handleSetLineString(type: LineStringTypeEnum = LineStringTypeEnum.线) {
  // 设置完立即显示其当前要素属性
  // activeTab.value = 'edit'
  globalCurrentProperties.value = {
    ...{
      'line-color': INIT_LINE_COLOR,
      'line-width': 6,
      'line-opacity': 1,
      'line-cap': 'round',
      'line-join': 'round',
      'description': '',
      'text-color': INIT_POINT_TEXT_FILL_COLOR,
      'text-size': INIT_POINT_TEXT_SIZE,
    },
    type,
  }
  const draw = window.draw
  draw.changeMode('draw_line_string')
}

export function handleSetPoint(type: PointTypeEnum = PointTypeEnum.点) {
  // 设置完立即显示其当前要素属性
  // activeTab.value = 'edit'

  globalCurrentProperties.value = {
    // 加载对应的Icon
    'icon-image': DOT_IMAGE_NAME,
    'icon-size': 0.2,
    'type': type,
    'description': '',
    'text-color': INIT_POINT_TEXT_FILL_COLOR,
    'text-size': INIT_POINT_TEXT_SIZE,
  }
  window.draw.changeMode('draw_point')
}

/**
 * push进入数据
 * @param polygon
 */
export function pushMapDrawFeatures(feature: MyFeature) {
  const centerPoint = turf.center(feature)
  globalCurrentProperties.value = {
    ...globalCurrentProperties.value,
    center: centerPoint.geometry.coordinates,
    id: nanoid(),
    sessionId: globalSessionId.value,
    videoId: globalVideoId.value,
    createdStr: globalAllSessions.value?.find(item => item.id === globalSessionId.value)?.videoList.find(item => item.aid === globalVideoId.value)?.createdStr,
  }
  feature.properties = {
    ...globalCurrentProperties.value,
  }
  // TODO: filter type

  storeMapDrawFeatures.value.push(feature)
  storeMapDrawLayerCheckedKeys.value.push(globalCurrentProperties.value.id)
  globalDrawMode.value = ''
}

const popup = new mapboxgl.Popup({
  anchor: 'bottom-left',
  closeButton: false,
  closeOnClick: true,
  className: 'LayerPopup',
})

function handleFeatureHover(e: any) {
  const map = window.map
  const description = e.features[0].properties.description
  const { geometry } = e.features[0]
  if (globalDrawMove.value) {
    map.getCanvas().style.cursor = 'move'
    return
  }
  if (description) {
    //
    if (geometry.type === 'Point') {
      const coordinates = geometry.coordinates.slice()
      map.getCanvas().style.cursor = 'pointer'
      popup.setLngLat(coordinates).setHTML(description).addTo(map)
    }
  }
}

function handleFeatureHoverLeave(_e: any) {
  const map = window.map
  map.getCanvas().style.cursor = ''
  popup.remove()
}
function handleFeatureMouseDown(e: any) {
  const map = window.map
  function onMove(e: any) {
    const coords = e.lngLat

    // Set a UI indicator for dragging.
    map.getCanvas().style.cursor = 'grabbing'

    // prevent this popup from opening when the original click was on a marker
    // console.log(e)
    const [feature] = e.features
    // Update the Point feature in `geojson` coordinates
    // and call setData to the source layer `point` on it.
    feature.geometry.coordinates = [coords.lng, coords.lat]
    // geojson.features[0].geometry.coordinates = [coords.lng, coords.lat]
    map.getSource(MAP_DRAW_SOURCE).setData(e.features)
  }

  function onUp(e: any) {
    const coords = e.lngLat

    // Print the coordinates of where the point had
    // finished being dragged to on the map.
    coordinates.style.display = 'block'
    coordinates.innerHTML = `Longitude: ${coords.lng}<br />Latitude: ${coords.lat}`
    map.getCanvas().style.cursor = ''

    // Unbind mouse/touch events
    map.off('mousemove', onMove)
    map.off('touchmove', onMove)
  }
  if (globalDrawMove.value) {
    e.preventDefault()
    map.getCanvas().style.cursor = 'grab'
    map.on('mousemove', onMove)
    map.once('mouseup', onUp)
  }
}

function handleFeatureClick(e: any) {
  if (!globalDrawEdit.value) {
    handleFeatureHover(e)
    return
  }
  // prevent this popup from opening when the original click was on a marker
  const el = e.originalEvent.target
  // console.log(e)
  const [feature] = e.features
  // console.warn(feature)
  const draw = window.draw
  const mode = draw.getMode()
  if (mode === 'draw_line_string' || mode === 'draw_polygon' || mode === 'draw_point')
    return
  if (el.nodeName !== 'CANVAS')
    return
  // 设置完立即显示其当前要素属性
  globalCurrentProperties.value = {
    ...feature.properties,
  }
  globalMapDrawFeatureModalVisible.value = true
}

export function addSource() {
  const map = window.map
  const source: any = map.getSource(MAP_DRAW_SOURCE)
  const computedMapFeatures = storeMapDrawFeatures.value.filter((item) => {
    return storeMapDrawLayerCheckedKeys.value.includes(item.properties!.id)
  })
  // 判断source
  if (source) {
    source.setData(
      turf.featureCollection([
        ...computedMapFeatures,
      ]),
    )
  }
  else {
    map.addSource(MAP_DRAW_SOURCE, {
      type: 'geojson',
      data: turf.featureCollection([
        ...computedMapFeatures,
      ]),
    })
  }
}

export function drawPolygon() {
  const map = window.map
  const source: any = map.getSource(MAP_DRAW_SOURCE)
  if (!source)
    return
  if (map.getLayer(MAP_DRAW_LAYER_POLYGON_FILL))
    map.removeLayer(MAP_DRAW_LAYER_POLYGON_FILL)
  if (map.getLayer(MAP_DRAW_LAYER_POLYGON_OUTLINE))
    map.removeLayer(MAP_DRAW_LAYER_POLYGON_OUTLINE)

  map.addLayer({
    id: MAP_DRAW_LAYER_POLYGON_FILL,
    type: 'fill',
    source: MAP_DRAW_SOURCE, // reference the data source
    layout: {},
    paint: {
      'fill-color': ['coalesce', ['get', 'fill-color'], '#000'],
      'fill-opacity': ['coalesce', ['get', 'fill-opacity'], 0.3],
    },
    filter: ['==', ['geometry-type'], 'Polygon'],
  })
  // Add a black outline around the polygon.
  map.addLayer({
    id: MAP_DRAW_LAYER_POLYGON_OUTLINE,
    type: 'line',
    source: MAP_DRAW_SOURCE,
    layout: {},
    paint: {
      'line-color': ['coalesce', ['get', 'line-color'], '#000'],
      'line-width': ['coalesce', ['get', 'line-width'], 2],
      'line-opacity': ['coalesce', ['get', 'line-opacity'], 1],
    },
    filter: ['==', ['geometry-type'], 'Polygon'],
  })

  map.on('click', MAP_DRAW_LAYER_POLYGON_FILL, handleFeatureClick)
  map.on('click', MAP_DRAW_LAYER_POLYGON_OUTLINE, handleFeatureClick)
}

export function drawLine() {
  const map = window.map
  const source: any = map.getSource(MAP_DRAW_SOURCE)
  if (!source)
    return
  if (map.getLayer(MAP_DRAW_LAYER_STRINGLINE))
    map.removeLayer(MAP_DRAW_LAYER_STRINGLINE)

  map.addLayer({
    id: MAP_DRAW_LAYER_STRINGLINE,
    type: 'line',
    source: MAP_DRAW_SOURCE,
    layout: {
      'line-cap': ['coalesce', ['get', 'line-cap'], 'round'],
      'line-join': ['coalesce', ['get', 'line-cap'], 'round'],
    },
    paint: {
      'line-color': ['coalesce', ['get', 'line-color'], '#000'],
      'line-width': ['coalesce', ['get', 'line-width'], 2],
      'line-opacity': ['coalesce', ['get', 'line-opacity'], 1],
    },
    filter: ['==', ['geometry-type'], 'LineString'],
  })

  map.on('click', MAP_DRAW_LAYER_STRINGLINE, handleFeatureClick)
  map.on('mouseenter', MAP_DRAW_LAYER_STRINGLINE, handleFeatureHover)
  map.on('mouseleave', MAP_DRAW_LAYER_STRINGLINE, handleFeatureHoverLeave)
}
export function drawPoint() {
  const map = window.map
  const source: any = map.getSource(MAP_DRAW_SOURCE)
  if (!source)
    return
  if (map.getLayer(MAP_DRAW_LAYER_POINT))
    map.removeLayer(MAP_DRAW_LAYER_POINT)
  map.addLayer({
    id: MAP_DRAW_LAYER_POINT,
    type: 'symbol',
    source: MAP_DRAW_SOURCE,
    layout: {
      'text-field': ['get', 'description'],
      'icon-image': ['get', 'icon-image'],
      'icon-size': ['coalesce', ['get', 'icon-size'], 1],
      'text-size': ['get', 'text-size'],
      'text-offset': [0, 1.5],
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
    ],
  })

  map.on('click', MAP_DRAW_LAYER_POINT, handleFeatureClick)
  map.on('touchend', MAP_DRAW_LAYER_POINT, handleFeatureClick)
  map.on('mouseenter', MAP_DRAW_LAYER_POINT, handleFeatureHover)
  map.on('mouseleave', MAP_DRAW_LAYER_POINT, handleFeatureHoverLeave)
  // map.on('mousedown', MAP_DRAW_LAYER_POINT, handleFeatureMouseDown)
}

export function reloadMapDrawLayer() {
  addSource()
  drawPolygon()
  drawLine()
  drawPoint()
}
