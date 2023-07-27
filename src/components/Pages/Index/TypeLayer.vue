<script lang="ts" setup>
import { storeMapTypeLayerCheckedKeys } from '~/composables'

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
  {
    title: '台风',
    key: '0-3',
    children: [
      {
        title: '预测图',
        key: 'forecast',
        children: [
          {
            title: '盘古大模型',
            key: 'pangu',
            children: [
              {
                title: '平均等压面和850百帕风速',
                key: 'pangu_medium-mslp-wind850',
                children: [
                  {
                    title: '2023-07-21_00_5号台风',
                    key: 'pangu_medium-mslp-wind850_2023-07-21_00_5',
                  },
                  {
                    title: '2023-07-21_00_5号台风路径',
                    key: 'pangu_medium-mslp-wind850_2023-07-21_00_5_line',
                  },
                  {
                    title: '2023-07-24_12_5号台风',
                    key: 'pangu_medium-mslp-wind850_2023-07-24_12_5',
                  },
                  {
                    title: '2023-07-24_12_5号台风路径',
                    key: 'pangu_medium-mslp-wind850_2023-07-24_12_5_line',
                  },
                  {
                    title: '2023-07-26_00_5号台风',
                    key: 'pangu_medium-mslp-wind850_2023-07-26_00_5',
                  },
                  {
                    title: '2023-07-27_00_5号台风',
                    key: 'pangu_medium-mslp-wind850_2023-07-27_00_5',
                  },
                  {
                    title: '2023-07-26_00_6号台风',
                    key: 'pangu_medium-mslp-wind850_2023-07-26_00_6',
                  },
                  {
                    title: '2023-07-26_00_6号台风路径',
                    key: 'pangu_medium-mslp-wind850_2023-07-26_00_6_line',
                  },
                  {
                    title: '2023-07-27_00_6号台风',
                    key: 'pangu_medium-mslp-wind850_2023-07-27_00_6',
                  },
                  {
                    title: '2023-07-27_00_6号台风路径',
                    key: 'pangu_medium-mslp-wind850_2023-07-27_00_6_line',
                  },
                ],
              },
              {
                title: '500百帕等压面/850百帕大气温度',
                key: 'pangu_medium-z500-t850',
              },
            ],
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
</script>

<template>
  <div class="w-full bg-white p-8px rounded-8px">
    <div class="text-center bg-gray-200 rounded-8px py-4px">
      要素筛选
    </div>
    <div class="text-size-12px bg-gray-100 rounded-8px py-8px mt-8px px-8px">
      <a-tree
        v-model:checked-keys="storeMapTypeLayerCheckedKeys"
        :checkable="true"
        :data="computedTreeData"
      />
    </div>
  </div>
</template>
