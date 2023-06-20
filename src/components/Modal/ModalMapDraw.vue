<script lang="ts" setup>
import { globalMapDrawFeatureModalVisible } from '~/composables'
</script>

<template>
  <a-modal v-model:visible="globalMapDrawFeatureModalVisible" :footer="false">
    <template #title>
      编辑Feature
    </template>
    <FormMapDraw />
  </a-modal>
</template>
