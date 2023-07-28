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
]
onMounted(() => {
  handleFetchStormDataByNumber()
})
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
  </MapBoxWrap>
</template>
