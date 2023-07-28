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
      {
        title: '当前台风',
        key: 'typhoon/current',
      },
    ],
  },
]
function handleSelect(e: any) {
  router.push(`/${e[0]}`)
}
</script>

<template>
  <MapBoxWrap>
    <template #title>
      要素筛选
    </template>
    <a-tree
      :data="treeData"
      @select="handleSelect"
    />
  </MapBoxWrap>
</template>
