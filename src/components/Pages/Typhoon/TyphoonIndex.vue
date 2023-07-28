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
        <div class="w-50px h-50px bg-amber rounded flex justify-center items-center hover:bg-amber-5">
          <div class="i-mingcute-typhoon-fill text-size-30px bg-white" />
        </div>
        台风预测
      </div>
      <div @click="() => $router.push({ path: '/typhoon/current' })">
        <div class="w-50px h-50px bg-blue rounded flex justify-center items-center hover:bg-blue-5">
          <div class="i-mingcute-typhoon-line text-size-30px bg-white" />
        </div>
        当前台风
      </div>
    </div>
  </MapBoxWrap>
</template>
