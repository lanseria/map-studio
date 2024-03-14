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
    <div class="grid grid-cols-3 items-center justify-center justify-items-center">
      <div v-for="item in WEATHER_MODEL_LIST" :key="item.value" class="flex flex-col cursor-pointer items-center" @click="() => $router.push({ path: `/typhoon/forecast/${item.value}` })">
        <a-avatar :style="{ backgroundColor: item.color }">
          {{ item.value }}
        </a-avatar>
        <div class="text-center">
          {{ item.label }}
        </div>
      </div>
    </div>
  </MapBoxWrap>
</template>
