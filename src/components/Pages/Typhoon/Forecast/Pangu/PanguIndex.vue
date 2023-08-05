<script lang="ts" setup>
import { storeMapTypeLayerCheckedKeys } from '~/composables'

const routes = [
  {
    path: '/',
    label: 'Home',
  },
  {
    path: '/typhoon',
    label: 'Typhoon',
  },
  {
    path: '/typhoon/forecast',
    label: 'Forecast',
  },
  {
    path: '/typhoon/forecast/pangu',
    label: 'Pangu',
  },
]
const treeData = [
  {
    title: '平均等压面和850百帕风速',
    key: 'pangu_medium-mslp-wind850',
    children: [
    ],
  },
  {
    title: '500百帕等压面/850百帕大气温度',
    key: 'pangu_medium-z500-t850',
  },
]
</script>

<template>
  <MapBoxWrap>
    <template #title>
      <a-breadcrumb :routes="routes">
        <template #item-render="{ route }">
          <RouterLink :to="route.path">
            {{ route.label }}
          </RouterLink>
        </template>
      </a-breadcrumb>
    </template>
    <a-tree
      v-model:checked-keys="storeMapTypeLayerCheckedKeys"
      :checkable="true"
      :data="treeData"
    />
  </MapBoxWrap>
</template>
