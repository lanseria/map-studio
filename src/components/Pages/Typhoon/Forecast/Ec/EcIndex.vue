<script lang="ts" setup>
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
    path: '/typhoon/forecast/ec',
    label: 'ECWMF',
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
    <div>开发中</div>
  </MapBoxWrap>
</template>
