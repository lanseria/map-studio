<script lang="ts" setup>
import { Icon, Message } from '@arco-design/web-vue'
import { storeMapDrawLayerCheckedKeys } from '~/composables'

const IconFont = Icon.addFromIconFontCn({ src: DEFAULT_ICONFONT_CN_URL })
const treeData = computed<any>(() => {
  const filterPoints = storeMapDrawFeatures.value
    .filter(item => item.geometry.type === 'Point')
    .filter((item) => {
      if (globalSessionId.value === -1)
        return true
      else if (item.properties?.sessionId === globalSessionId.value)
        return true
      else
        return false
    })
    .filter((item) => {
      if (globalVideoId.value === -1)
        return true
      else if (item.properties?.videoId === globalVideoId.value)
        return true
      else
        return false
    })
    .map(item => ({
      title: item.properties!.description || item.properties!.id,
      key: item.properties!.id,
      leaf: true,
    }))
  const filterLineStrings = storeMapDrawFeatures.value.filter(item => item.geometry.type === 'LineString' && item.properties?.sessionId === globalSessionId.value && item.properties?.videoId === globalVideoId.value).map(item => ({
    title: item.properties!.description || item.properties!.id,
    key: item.properties!.id,
    leaf: true,
  }))
  const filterPolygons = storeMapDrawFeatures.value.filter(item => item.geometry.type === 'Polygon' && item.properties?.sessionId === globalSessionId.value && item.properties?.videoId === globalVideoId.value).map(item => ({
    title: item.properties!.description || item.properties!.id,
    key: item.properties!.id,
    leaf: true,
  }))
  return [
    {
      title: '点',
      key: 'Point',
      leaf: false,
      icon: () => h(IconFont, { type: 'icon-dian' }),
      children: filterPoints,
    },
    {
      title: '线',
      key: 'LineString',
      leaf: false,
      icon: () => h(IconFont, { type: 'icon-xian' }),
      children: filterLineStrings,
    },
    {
      title: '面',
      key: 'Polygon',
      leaf: false,
      icon: () => h(IconFont, { type: 'icon-mian' }),
      children: filterPolygons,
    },
  ]
})

function handleDelete(node: any) {
  if (node.leaf) {
    storeMapDrawFeatures.value = storeMapDrawFeatures.value.filter(item => item.properties!.id !== node.key)
    Message.success('已删除')
  }
  else {
    storeMapDrawFeatures.value = []
    Message.success('已删除')
  }
}
function handleClickTreeItem(node: any) {
  const current = storeMapDrawFeatures.value.find(item => item.properties!.id === node.key)
  if (current) {
    globalCurrentProperties.value = {
      ...current.properties,
    }
    globalMapDrawFeatureModalVisible.value = true
  }
}
</script>

<template>
  <a-scrollbar style="max-height:400px;overflow: auto;">
    <a-tree
      v-model:checked-keys="storeMapDrawLayerCheckedKeys"
      :block-node="true"
      :checkable="true"
      :data="treeData"
    >
      <template #title="nodeData">
        <span @click="handleClickTreeItem(nodeData)">{{ nodeData.title }}</span>
      </template>
      <template #extra="nodeData">
        <span class="text-red-500">
          <a-popconfirm content="真的要删除此数据?" @ok="handleDelete(nodeData)">
            <IconDelete
              class="absolute right-8px text-size-12px top-10px"
            />
          </a-popconfirm>
        </span>
      </template>
    </a-tree>
  </a-scrollbar>
</template>
