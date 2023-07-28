import { Message } from '@arco-design/web-vue'
import type { GeoJsonStormFeature, StormData } from './types'
import { drawTyphoonLineAndPoints } from './map/mapLayer'

export function handleFetchDistance(coordinates: [number, number][]) {
  //
  const points = coordinates.map(item => item.map(i => (+i).toFixed(6)).join())
  if (!points)
    return
  const pointsStr = points.join(';')
  const msgRtn = Message.info({
    content: '获取路线中',
    duration: -1,
  })
  const { data, onFetchResponse } = useFetch(`https://router.project-osrm.org/route/v1/driving/${pointsStr}?overview=full&geometries=geojson`).get().json()
  onFetchResponse(() => {
    updateDistanceSourceLayer(data.value.routes[0].geometry.coordinates)
    storeMapRulerRouteLineString.value = data.value.routes[0].geometry.coordinates
    Message.success({
      content: '路线生成成功',
      duration: 1000,
    })
    msgRtn.close()
  })
}

export function handleFetchCurrentStormData() {
  const { data, onFetchResponse } = useFetch('https://typhoon.slt.zj.gov.cn/Api/TyhoonActivity').get().json()
  onFetchResponse(() => {
    console.warn('handleFetchCurrentStormData')
    storeStormDataList.value = data.value
    storeStormDataList.value.forEach((item) => {
      handleFetchStormDataByNumber(item.tfid)
      if (storeStormDataListCheckedKeys.value[item.tfid] === undefined)
        storeStormDataListCheckedKeys.value[item.tfid] = true
    })
  })
}

export function handleFetchStormDataByNumber(num = '202305') {
  const { data, onFetchResponse } = useFetch(`https://typhoon.slt.zj.gov.cn/Api/TyphoonInfo/${num}`).get().json()
  onFetchResponse(() => {
    console.warn(`handleFetchStormDataByNumber${num}`)
    const mapLayerStormDataList: GeoJsonStormFeature[] = data.value.points.map((item: StormData) => {
      return convertStormDataToGeoJson(item, data.value)
    })
    drawTyphoonLineAndPoints(mapLayerStormDataList, num)
  })
}
