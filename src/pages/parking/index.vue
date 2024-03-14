<script lang="ts" setup>
import type { TreeNodeData } from '@arco-design/web-vue'
import { center } from '@turf/turf'
import { fetchParkingSpot, fetchParkingSpotCount } from '~/composables/api'

const treeData = ref([] as TreeNodeData[])
async function fetchData() {
  const { data } = await fetchParkingSpotCount()
  treeData.value = data
}
async function handleSelect(node: any) {
  if (node.extra) {
    const { data } = await fetchParkingSpot(node.label, node.extra)
    globalParkingSpotGeo.value = data
    addParkingSpotSource(PARKING_SPOT_SOURCE_NAME, data)
    addParkingSpotLayer()
    const centerPoint = center(data)
    window.map.flyTo({
      center: [centerPoint.geometry.coordinates[0], centerPoint.geometry.coordinates[1]],
      zoom: 15,
    })
    storeMapLeftCollapsed.value = true
  }
}
onMounted(() => {
  fetchData()
})
onBeforeUnmount(() => {
  clearParkingSpotSource(PARKING_SPOT_SOURCE_NAME)
})
</script>

<template>
  <MapBoxWrap>
    <template #title>
      🅿️停车场
    </template>
    <ATree block-node :data="treeData" action-on-node-click="expand" :field-names="{ title: 'label', key: 'value' }">
      <template #title="nodeData">
        <div @click="handleSelect(nodeData)">
          {{ nodeData.label }}<span>({{ nodeData.count }})</span>
        </div>
      </template>
    </ATree>
  </MapBoxWrap>
</template>
