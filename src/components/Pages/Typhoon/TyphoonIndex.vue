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
    <div class="grid grid-cols-3 items-center justify-items-center">
      <div @click="() => $router.push({ path: '/typhoon/forecast' })">
        <div class="h-50px w-50px flex items-center justify-center rounded bg-amber hover:bg-amber-5">
          <div class="i-mingcute-typhoon-fill bg-white text-size-30px" />
        </div>
        台风预测
      </div>
      <div @click="() => $router.push({ path: '/typhoon/current' })">
        <div class="h-50px w-50px flex items-center justify-center rounded bg-blue hover:bg-blue-5">
          <div class="i-mingcute-typhoon-line bg-white text-size-30px" />
        </div>
        当前台风
      </div>
    </div>
  </MapBoxWrap>
</template>
