<script lang="ts" setup>
function handleClose() {
  globalParkingSpotCurrent.value.properties = undefined
}
</script>

<template>
  <div
    class="absolute left-1/2 top-50px z-1 w-300px rounded-lg bg-white p-4 shadow-md -translate-x-1/2"
  >
    <div class="i-carbon:close absolute right-10px top-10px icon-btn" @click="handleClose()" />
    <h1 class="text-lg">
      {{ globalParkingSpotCurrent.properties?.desc }}
    </h1>
    <p>
      <span
        class="inline-block align-middle"
        :style="{ color: globalParkingSpotCurrent.properties?.color }"
      >{{ globalParkingSpotCurrent.properties?.isFree }}
      </span>
      <span class="mx-1 inline-block align-middle">・</span>
      <span className="inline-block align-middle">
        {{ globalParkingSpotCurrent.coordinates.map((i) => i.toFixed(3)).join(', ') }}
      </span>
    </p>
    <p>
      <span
        class="inline-block align-middle"
        :style="{ color: globalParkingSpotCurrent.properties?.typeColor }"
      >{{ globalParkingSpotCurrent.properties?.type }}
      </span>
      <template v-if="globalParkingSpotCurrent.properties?.isFree === '收费'">
        <span class="mx-1 inline-block align-middle">・</span>
        <span className="inline-block align-middle text-green">
          {{ globalParkingSpotCurrent.properties?.freeMinutes }} 分钟免费
        </span>
      </template>
    </p>
    <p>
      收费详情：<a class="parking-link-btn" :href="globalParkingSpotCurrent.properties?.link" target="_blank">去社交平台链接查看详情</a>
    </p>
    <p>
      贡献💗：<a class="parking-link-btn" :href="PARKING_SPOT_SUBMIT_LINK" target="_blank">提交我知道的停车场</a>
    </p>
    <div class="mb-2 mt-5 text-center">
      <a
        :href="`https://uri.amap.com/marker?position=${globalParkingSpotCurrent.coordinates_GCJ02.join(',')}&name=${globalParkingSpotCurrent.properties?.desc}`"
        target="_blank"
        rel="noreferrer"
        class="mx-1 border border-gray-200 rounded px-4 py-2 text-sm text-gray-600"
      >
        高德地图
      </a>
      <a
        :href="`http://api.map.baidu.com/marker?location=${globalParkingSpotCurrent.coordinates_BD09.slice().reverse().join(',')}&title=${globalParkingSpotCurrent.properties?.desc}&content=${AppName}&output=html`"
        target="_blank"
        rel="noreferrer"
        class="mx-1 border border-gray-200 rounded px-4 py-2 text-sm text-gray-600"
      >
        百度地图
      </a>
    </div>
    <!-- <p>
      关于：<a class="parking-link-btn">提交审核流程</a>
    </p> -->
  </div>
</template>

<style lang="css" scoped>
.parking-link-btn {
  @apply cursor-pointer text-blue-6 underline hover:text-blue-4;
}
</style>
