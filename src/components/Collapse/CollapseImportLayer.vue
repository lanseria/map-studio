<script lang="ts" setup>
import { Icon } from '@arco-design/web-vue'
import { storeMapImportLayerCheckedKeys } from '~/composables'

const IconFont = Icon.addFromIconFontCn({ src: DEFAULT_ICONFONT_CN_URL })
const treeData = computed<any>(() => {
  const filterPoints: any[] = []
  const filterLineStrings: any[] = [
    ...MAP_DATA_LIST.map((item) => {
      return {
        title: item.label,
        key: item.label,
      }
    }),
  ]
  const filterPolygons: any[] = []
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
</script>

<template>
  <a-scrollbar style="max-height:400px;overflow: auto;">
    <a-tree
      v-model:checked-keys="storeMapImportLayerCheckedKeys"
      :block-node="true"
      :checkable="true"
      :data="treeData"
    >
      <template #title="nodeData">
        <span>{{ nodeData.title }}</span>
      </template>
    </a-tree>
  </a-scrollbar>
</template>
