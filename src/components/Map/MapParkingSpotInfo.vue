<script lang="ts" setup></script>

<template>
  <div
    class="absolute left-1/2 top-80px z-1 w-300px rounded-lg bg-white p-6 shadow-md -translate-x-1/2"
  >
    <h1 class="text-lg">
      {{ globalParkingSpotCurrent.properties?.desc }}
    </h1>
    <p>
      <span class="inline-block align-middle" :style="{ color: globalParkingSpotCurrent.properties?.color }">{{ globalParkingSpotCurrent.properties?.isFree }}</span>
      <span class="mx-1 inline-block align-middle">・</span>
      <span className="inline-block align-middle">{{ globalParkingSpotCurrent.coordinates.map((i) => i.toFixed(3)).join(', ') }}</span>
    </p>
  </div>
</template>
