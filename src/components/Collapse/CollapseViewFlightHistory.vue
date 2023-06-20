<script lang="ts" setup>
</script>

<template>
  <div>
    <div v-if="mapViewFlightList.length === 0">
      请创建视点飞行路线
    </div>
    <ViewFlightItem v-for="item in mapViewFlightList" :key="item.id" :item="item" />
  </div>
</template>
