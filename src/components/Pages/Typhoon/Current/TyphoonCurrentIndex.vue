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
    path: '/typhoon/current',
    label: 'Current',
  },
]
function handleToggoleVisible(id: string) {
  const map = window.map
  const MAP_DATA_STORM_LINE_LAYER = `storm-line-layer${id}`
  const MAP_DATA_STORM_POINT_LAYER = `storm-points-layer${id}`
  const visibility = !storeStormDataListCheckedKeys.value[id]
  map.setLayoutProperty(
    MAP_DATA_STORM_LINE_LAYER,
    'visibility',
    visibility ? 'visible' : 'none',
  )
  map.setLayoutProperty(
    MAP_DATA_STORM_POINT_LAYER,
    'visibility',
    visibility ? 'visible' : 'none',
  )
  storeStormDataListCheckedKeys.value[id] = visibility
}
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
      <div v-for="item in storeStormDataList" :key="item.tfid" @click="handleToggoleVisible(item.tfid)">
        <div
          class="w-50px h-50px rounded flex justify-center items-center hover:bg-blue-5" :class="
            storeStormDataListCheckedKeys[item.tfid] ? 'bg-blue' : 'bg-gray'"
        >
          <div class="i-mingcute-typhoon-fill text-size-30px bg-white" />
        </div>
        <div class="text-center">
          {{ item.name }}
        </div>
      </div>
    </div>
  </MapBoxWrap>
</template>
