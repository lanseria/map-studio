<script lang="ts" setup>
import type { TreeNodeData } from '@arco-design/web-vue'
import { fetchParkingSpot, fetchParkingSpotCount } from '~/composables/api'

const treeData = ref([] as TreeNodeData[])
async function fetchData() {
  const { data } = await fetchParkingSpotCount()
  treeData.value = data
}
async function handleSelect(node: any) {
  if (node.extra) {
    // console.log(node.label, node.extra)
    const { data } = await fetchParkingSpot(node.label, node.extra)
    // console.log(data)
  }
}
onMounted(() => {
  fetchData()
})
</script>

<template>
  <MapBoxWrap>
    <template #title>
      🅿️停车场
    </template>
    <ATree block-node :data="treeData" :field-names="{ title: 'label', key: 'value' }">
      <template #title="nodeData">
        <div @click="handleSelect(nodeData)">
          {{ nodeData.label }}<span>({{ nodeData.count }})</span>
        </div>
      </template>
    </ATree>
  </MapBoxWrap>
</template>
