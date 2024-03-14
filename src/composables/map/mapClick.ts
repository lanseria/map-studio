import type { Feature, Point } from '@turf/turf'
import type { ParkingSpotPointProps } from '../types'

export function addMapParkingSpotLayerClickEvents() {
  console.warn('[addMapParkingSpotLayerClickEvents]')
  const map = window.map
  map.on('click', PARKING_SPOT_LAYER_NAME, (e: any) => {
    console.warn(PARKING_SPOT_LAYER_NAME, e)
    if (!e.features)
      return
    const features = e.features as Feature<Point, ParkingSpotPointProps>[]
    const coordinates = features[0].geometry.coordinates.slice()
    const properties = features[0].properties

    globalParkingSpotCurrent.value = {
      coordinates,
      properties,
    }
  })

  map.on('click', PARKING_SPOT_CLUSTER_LAYER_NAME, (e: any) => {
    console.warn(PARKING_SPOT_CLUSTER_LAYER_NAME, e)
    const features = map.queryRenderedFeatures(e.point, {
      layers: [PARKING_SPOT_CLUSTER_LAYER_NAME],
    })
    if (!features.length)
      return
    const clusterId = features[0].properties!.cluster_id
    map
      .getSource(PARKING_SPOT_SOURCE_NAME)
      // eslint-disable-next-line ts/ban-ts-comment
      // @ts-expect-error
      .getClusterExpansionZoom(
        clusterId,
        (err: any, zoom: any) => {
          if (err)
            return

          map.easeTo({
            // eslint-disable-next-line ts/ban-ts-comment
            // @ts-expect-error
            center: features[0].geometry.coordinates,
            zoom,
          })
        },
      )
  })

  map.on('mouseenter', PARKING_SPOT_LAYER_NAME, () => {
    map.getCanvas().style.cursor = 'pointer'
  })

  map.on('mouseleave', PARKING_SPOT_LAYER_NAME, () => {
    map.getCanvas().style.cursor = ''
  })
}
