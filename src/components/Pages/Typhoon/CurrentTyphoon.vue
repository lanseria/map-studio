<script lang="ts" setup>
import type { TyphoonData } from '~/composables/types'

function description(item: TyphoonData) {
  return `台风“${item.name}”，英文名为“${item.enname}”，目前位于北纬${item.lat}度、东经${item.lng}度，向${item.movedirection}方向移动，移速为每小时${item.movespeed}公里，中心风力达到每秒${item.speed}米，为${item.strong}级别，中心气压为${item.pressure}百帕，七级风圈半径和十级风圈半径均为null。最新台风编号为${item.tfid}，数据发布时间为${item.timeformate}。`
}
</script>

<template>
  <MapBoxWrap class="mt-8px">
    <template #title>
      当前台风
    </template>
    <a-list>
      <a-list-item v-for="item in storeStormDataList" :key="item.tfid">
        <a-list-item-meta
          :title="`${item.tfid}-${item.name}`"
          :description="description(item)"
        />
      </a-list-item>
    </a-list>
  </MapBoxWrap>
</template>
