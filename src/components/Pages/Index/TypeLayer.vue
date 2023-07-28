<script lang="ts" setup>
const router = useRouter()
const treeData = [
  {
    title: '骑行',
    key: 'bicycle',
    children: [
      {
        title: '徐云流',
        key: 'bicycle/xuyun',
      },
    ],
  },
  {
    title: '停车场',
    key: 'parking',
    children: [
      {
        title: '舟山市',
        key: 'parking/zhoushan',
      },
    ],
  },
  {
    title: '卫星发射中心',
    key: 'satellite_launching_center',
  },
  {
    title: '台风',
    key: 'typhoon',
    children: [
      {
        title: '预测图',
        key: 'typhoon/forecast',
        children: [
          {
            title: '盘古大模型',
            key: 'typhoon/forecast/pangu',
          },
        ],
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
onMounted(() => {
  handleFetchStormDataByNumber('202305')
})
function handleSelect(e: any) {
  console.log(e)
  router.push(`/${e[0]}`)
}
</script>

<template>
  <div class="w-full bg-white p-8px rounded-8px">
    <div class="text-center bg-gray-200 rounded-8px py-4px">
      要素筛选
    </div>
    <div class="text-size-12px bg-gray-100 rounded-8px py-8px mt-8px px-8px">
      <a-tree
        :checkable="true"
        :data="computedTreeData"
        @select="handleSelect"
      />
    </div>
  </div>
</template>
