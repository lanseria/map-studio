<script lang="ts" setup>
</script>

<template>
  <div class="w-full text-size-14px">
    <TypeLayer />
    <DrawLayer />
    <FeatureInfo  v-if="globalComputedMapFeatureSelect"/>
    <!-- <GpxLog /> -->
    <!-- <GpxList /> -->
  </div>
</template>
