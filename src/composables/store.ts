import type { FeatureCollection, Position } from '@turf/turf'
import type { MyFeature, MyGeometry } from './types'

export const storeMapTypeValue = useStorage('storeMapTypeValue', 'travel_example')

export const storeMapDataValue = useStorage('storeMapDataValue', '/xuyun-data')
export const globalMapDataValueUrl = computed(() => {
  return `${storeMapDataValue.value}/json/allSessions.json`
})
export const globalMapDataGeojsonUrl = computed(() => {
  return `${storeMapDataValue.value}/geojson/allPoints.geojson`
})
export const globalMapPointUrl = computed(() => {
  return `${storeMapDataValue.value}/img/map-point.png`
})

export const { data: globalAllSessions, execute: globalMapDataExecute } = useFetch<FormatSession[]>(globalMapDataValueUrl).get().json<FormatSession[]>()

export const { data: globalGeojson, execute: globalGeojsonExecute } = useFetch<FeatureCollection<MyGeometry, any>>(globalMapDataGeojsonUrl).get().json<FeatureCollection<MyGeometry, any>>()
export const globalGeojsonFeatures = computed(() => {
  return globalGeojson.value?.features || []
})
export const globalSessionId = useStorage('globalSessionId', -1)

export const globalVideoId = useStorage('globalVideoId', -1)
export const globalComputedFilterMapFeatures = computed(() => {
  return ((globalGeojson.value?.features || []) as MyFeature[]).filter(
    (item) => {
      if (item.properties?.sessionId === globalSessionId.value)
        return true

      else return false
    },
  ).filter((item) => {
    if (globalVideoId.value === -1)
      return true
    else if (item.properties?.videoId === globalVideoId.value)
      return true
    else
      return false
  })
})
// watchEffect(() => {
//   console.log(globalComputedFilterMapFeatures.value)
// })

export const globalTempRouteMapCoordinates = ref<Position[]>([])

export const storeContentSideCollapseActiveKey = useStorage('storeContentSideCollapseActiveKey', ['1'])
export const storeContentSideCollapsed = useStorage('storeContentSideCollapsed', true)
export function handleContentSideCollapsed() {
  storeContentSideCollapsed.value = !storeContentSideCollapsed.value
  nextTick(() => {
    window.map.resize()
  })
}
export const storeMapStyle = useStorage('storeMapStyle', '街道地图')
export const storeMapDrawFeatures = useStorage('storeMapDrawFeatures', []) as Ref<MyFeature[]>
export const storeMapDrawLayerCheckedKeys = useStorage<string[]>('storeMapDrawLayerCheckedKeys', [])

export const storeMapImportLayerCheckedKeys
= useStorage<string[]>('storeMapImportLayerCheckedKeys', [...MAP_DATA_LIST.map(it => it.label)])
