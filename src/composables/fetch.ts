import { Message } from '@arco-design/web-vue'

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
  const { data, onFetchResponse } = useFetch(`http://router.project-osrm.org/route/v1/driving/${pointsStr}?overview=full&geometries=geojson`).get().json()
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
