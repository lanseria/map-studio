/**
 * 添加经纬度网格
 */
export function addGraticuleLayer() {
  const map = window.map
  map.addLayer({
    id: GRATICULE_LAYER_NAME,
    type: 'line',
    source: GRATICULE_SOURCE_NAME,
    paint: {
      'line-color': '#000000', // 设置线条颜色，这里为黑色
      'line-opacity': 0.5, // 设置线条透明度，这里为0.5，即半透明
      'line-width': 1, // 设置线条宽度，这里为1个像素
      'line-dasharray': [2, 2], // 设置线条样式为虚线，每个虚线由2个单位的实线和2个单位的虚线组成
    },
  })
}

export function addParkingSpotLayer() {
  const map = window.map
  if (map.getLayer(PARKING_SPOT_CLUSTER_LAYER_NAME))
    map.removeLayer(PARKING_SPOT_CLUSTER_LAYER_NAME)
  map.addLayer({
    id: PARKING_SPOT_CLUSTER_LAYER_NAME,
    type: 'circle',
    source: PARKING_SPOT_SOURCE_NAME,
    filter: ['has', 'point_count'],
    paint: {
      'circle-color': '#d3cdc0',
      'circle-stroke-color': '#a59a83',
      'circle-stroke-width': 1,
      'circle-radius': 10,
    },
  })
  if (map.getLayer(PARKING_SPOT_CLUSTER_COUNT_LAYER_NAME))
    map.removeLayer(PARKING_SPOT_CLUSTER_COUNT_LAYER_NAME)
  map.addLayer({
    id: PARKING_SPOT_CLUSTER_COUNT_LAYER_NAME,
    type: 'symbol',
    source: PARKING_SPOT_SOURCE_NAME,
    filter: ['has', 'point_count'],
    layout: {
      'text-field': '{point_count_abbreviated}',
      'text-size': 12,
      'text-allow-overlap': true,
    },
    paint: {
      'text-color': 'white',
    },
  })
  if (map.getLayer(PARKING_SPOT_LAYER_NAME))
    map.removeLayer(PARKING_SPOT_LAYER_NAME)
  map.addLayer({
    id: PARKING_SPOT_LAYER_NAME,
    type: 'symbol',
    source: PARKING_SPOT_SOURCE_NAME,
    layout: {
      'icon-image': ['get', 'color'],
      'icon-size': 0.25,
      'text-field': ['get', 'desc'],
      'text-size': 12,
      'text-offset': [0, 0.5],
      'text-anchor': 'top',
      'icon-allow-overlap': true,
    },
    paint: {
      'text-color': '#7e6c56',
      'text-halo-color': '#fff',
      'text-halo-width': 1,
      'text-halo-blur': 0,
    },
  })
}

export function addEarthQuakeLayer() {
  const map = window.map
  // if (map.getLayer(EARTH_QUAKE_CLUSTER_LAYER_NAME))
  //   map.removeLayer(EARTH_QUAKE_CLUSTER_LAYER_NAME)
  // map.addLayer({
  //   id: EARTH_QUAKE_CLUSTER_LAYER_NAME,
  //   type: 'circle',
  //   source: EARTH_QUAKE_SOURCE_NAME,
  //   filter: ['has', 'point_count'],
  //   paint: {
  //     'circle-color': '#d3cdc0',
  //     'circle-stroke-color': '#a59a83',
  //     'circle-stroke-width': 1,
  //     'circle-radius': 10,
  //   },
  // })
  // if (map.getLayer(EARTH_QUAKE_CLUSTER_COUNT_LAYER_NAME))
  //   map.removeLayer(EARTH_QUAKE_CLUSTER_COUNT_LAYER_NAME)
  // map.addLayer({
  //   id: EARTH_QUAKE_CLUSTER_COUNT_LAYER_NAME,
  //   type: 'symbol',
  //   source: EARTH_QUAKE_SOURCE_NAME,
  //   filter: ['has', 'point_count'],
  //   layout: {
  //     'text-field': '{point_count_abbreviated}',
  //     'text-size': 12,
  //     'text-allow-overlap': true,
  //   },
  //   paint: {
  //     'text-color': 'white',
  //   },
  // })
  if (map.getLayer(EARTH_QUAKE_LAYER_NAME))
    map.removeLayer(EARTH_QUAKE_LAYER_NAME)
  map.addLayer({
    id: EARTH_QUAKE_LAYER_NAME,
    type: 'symbol',
    source: EARTH_QUAKE_SOURCE_NAME,
    layout: {
      'icon-image': ['get', 'color'],
      'icon-size': 0.5,
      'text-field': ['get', 'place'],
      'text-size': 12,
      'text-offset': [0, 1.2],
      'text-anchor': 'top',
      'icon-allow-overlap': true,
    },
    paint: {
      'text-color': '#7e6c56',
      'text-halo-color': '#fff',
      'text-halo-width': 1,
      'text-halo-blur': 0,
    },
  })
}

export function addPlateInterfaceLayer() {
  const map = window.map
  if (map.getLayer(PLATE_INTERFACE_LAYER_NAME))
    map.removeLayer(PLATE_INTERFACE_LAYER_NAME)
  map.addLayer({
    id: PLATE_INTERFACE_LAYER_NAME,
    type: 'line',
    source: PLATE_INTERFACE_SOURCE_NAME,
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
    paint: {
      'line-color': '#ff0000',
      'line-width': 2,
      'line-opacity': 0.8,
    },
  })
}
