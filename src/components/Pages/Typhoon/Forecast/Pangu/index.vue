<script lang="ts" setup>
import { storeMapTypeLayerCheckedKeys } from '~/composables'

const treeData = [
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
        title: '2023-07-27_12_5号台风',
        key: 'pangu_medium-mslp-wind850_2023-07-27_12_5',
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
]
</script>

<template>
  <div class="w-full bg-white p-8px rounded-8px">
    <div class="text-center bg-gray-200 rounded-8px py-4px">
      类型筛选
    </div>
    <div class="text-size-12px bg-gray-100 rounded-8px py-8px mt-8px px-8px">
      <a-tree
        v-model:checked-keys="storeMapTypeLayerCheckedKeys"
        :checkable="true"
        :data="treeData"
      />
    </div>
  </div>
</template>
