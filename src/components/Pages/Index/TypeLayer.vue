<script lang="ts" setup>
const treeData = [
  {
    title: '骑行',
    key: '0-0',
    children: [
      {
        title: '徐云流',
        key: '0-0-1',
        children: [
          {
            title: '东北之行 ',
            key: '0-1-1-1',
          },
          {
            title: '重返川西 ',
            key: '0-1-1-2',
          },
        ],
      },
    ],
  },
  {
    title: '停车场',
    key: '0-1',
    children: [
      {
        title: '舟山市',
        key: '0-1-1',
      },
    ],
  },
  {
    title: '卫星发射中心',
    key: '0-2',
    children: [
      {
        title: '中国',
        key: '0-2-1',
      },
    ],
  },
]
const computedTreeData = computed(() => {
  return [
    ...treeData,
    {
      title: '未命名',
      key: 'undefined',
      children: globalMapDrawFeatures.value.map((item: any) => ({
        title: item.properties.description || item.properties.id,
        key: item.properties.id,
      })),
    },
  ]
})
const checkedKeys = ref([])
</script>

<template>
  <div class="w-full bg-white p-8px rounded-8px">
    <div class="text-center bg-gray-200 rounded-8px py-4px">
      要素筛选
    </div>
    <div class="text-size-12px bg-gray-100 rounded-8px py-8px mt-8px px-8px">
      <a-tree
        v-model:checked-keys="checkedKeys"
        :checkable="true"
        :data="computedTreeData"
      />
    </div>
  </div>
</template>
