import { Message } from '@arco-design/web-vue'
import queryString from 'query-string'

export function handleExportComputeDistance() {
  const { data, onFetchResponse } = useFetch(`${storeMapDataValue.value}/geojson/track.geojson`).get().json()
  onFetchResponse(() => {
    // console.log(data.value.features)
    // console.log(turf.lineString(globalTempRouteMapCoordinates.value))
    let geojsonObj: any = {}
    if (globalVideoId.value === -1) {
      // console.log(globalTempRouteMapCoordinates.value)
      geojsonObj = turf.featureCollection([turf.lineString(globalTempRouteMapCoordinates.value)])
    }
    else { geojsonObj = turf.featureCollection([turf.lineString(globalTempRouteMapCoordinates.value), ...data.value.features]) }
    // console.log(geojsonObj)
    const combine = turf.combine(geojsonObj as any)
    // console.log(combine)
    combine.features[0].properties.collectedProperties = []
    const blob = new Blob([JSON.stringify(combine)], { type: 'text/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'track.geojson'
    document.body.appendChild(a)
    a.click()
  })
}

export function handleComputeDistanceInEdit() {
  //
  if (globalVideoId.value === -1) {
    Message.warning('仅支持单视频')
  }
  else {
    const points = _checkPoint(true)
    if (!points)
      return
    const pointsStr = points.join(';')
    const { data, onFetchResponse } = useFetch(`http://router.project-osrm.org/route/v1/driving/${pointsStr}?overview=full&geometries=geojson`).get().json()
    onFetchResponse(() => {
      updateDistanceSourceLayer(data.value.routes[0].geometry.coordinates)
      globalTempRouteMapCoordinates.value = data.value.routes[0].geometry.coordinates
    })
  }
}

export function handleComputeDistance() {
  const points = _checkPoint()
  if (!points)
    return
  const pointsStr = points.join(';')
  const { data, onFetchResponse } = useFetch(`http://router.project-osrm.org/route/v1/driving/${pointsStr}?overview=full&geometries=geojson`).get().json()
  onFetchResponse(() => {
    updateDistanceSourceLayer(data.value.routes[0].geometry.coordinates)
    globalTempRouteMapCoordinates.value = data.value.routes[0].geometry.coordinates
  })
}

export function handleShowDistance() {
  //
  const points = _checkPoint()
  if (!points)
    return

  const pointStrArr = points.map((item) => {
    return encodeURIComponent(item)
  })
  // console.log(pointStrArr)
  const query = queryString.stringify({
    point: pointStrArr,
  })
  const url = `https://graphhopper.com/maps/?${query}&profile=car&layer=OpenStreetMap`
  open(url)
}

function _checkPoint(ignore = false) {
  const pointList = globalComputedFilterMapFeatures.value.filter(item => item.geometry.type === 'Point')
  if (!ignore && pointList.length === 0) {
    Message.warning('没有路线, 无法计算距离')
    return false
  }

  let points: string[] = []
  if (ignore) {
    const first = globalGeojson.value?.features[globalGeojson.value?.features.length - 1]
    // console.log(first)
    if (!first) {
      Message.warning('起始点位不存在')
      return
    }
    const mapDrawPoints = storeMapDrawFeatures.value
      .filter(item => item.geometry.type === 'Point')
      .filter((item) => {
        if (item.properties?.videoId === globalVideoId.value)
          return true
        else
          return false
      })
    points = [first.geometry.coordinates.map(i => (+i).toFixed(6)).join(), ...mapDrawPoints.map(item => item.geometry.coordinates.map(i => (+i).toFixed(6)).join())]
    return points
  }
  else {
    const lastPointId = pointList[0].id
    const lastIdx = globalGeojson.value?.features.findIndex(item => item.id === lastPointId)

    // 某个视频
    if (globalVideoId.value !== -1) {
      if (!lastIdx) {
      //
        console.warn('lastIdx', lastIdx)
        return
      }
      console.warn('lastIdx', lastIdx)
      console.warn('globalGeojson', globalGeojson.value?.features.length)
      const startPoint = globalGeojson.value?.features[lastIdx - 1]
      if (!startPoint) {
        console.warn('startPoint', startPoint)
        return
      }
      console.warn('startPoint', startPoint)
      points = [startPoint, ...globalComputedFilterMapFeatures.value].filter(item => item.geometry.type === 'Point').map(item => item.geometry.coordinates.map(i => (+i).toFixed(6)).join())
    }
    else {
    // 全部视频
      points = globalGeojson.value!.features.map(item => item.geometry.coordinates.map(i => (+i).toFixed(6)).join())
    }
    return points
  }
}

export function handleSendIssueUseEmail() {
  const mapData = MAP_DATA_LIST.find(item => item.value === storeMapDataValue.value)
  const filterMapDrawFeatures = storeMapDrawFeatures.value.filter(item => item.properties?.sessionId === globalSessionId.value && item.properties?.videoId === globalVideoId.value)
  if (!mapData) {
    Message.warning('未选择数据,无法发送邮件')
    return
  }
  if (globalAllSessions.value) {
    if (!globalSessionId.value) {
      Message.warning('未选择路线,无法发送邮件')
      return
    }
    if (globalVideoId.value === -1) {
      Message.warning('未选择视频,无法发送邮件')
      return
    }
    if (filterMapDrawFeatures.length === 0) {
      Message.warning('未画图(当前路线),无法发送邮件')
      return
    }
    globalModalDrawDataUploadVisible.value = true
  }
}

export function handleMultipleMarker() {
  globalModalDataMultipleMarkerVisible.value = true
}
