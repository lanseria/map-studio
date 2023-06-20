<script lang="ts" setup>
import { globalJoinUsModalVisible } from '~/composables'
</script>

<template>
  <a-modal v-model:visible="globalJoinUsModalVisible" :footer="false">
    <template #title>
      加入讨论
    </template>
    <ASpace direction="vertical" align="center" class="w-full">
      <AImage src="https://img.js.design/assets/img/6469b648319c55b8864232d9.jpg#cf09e6e0e71eedbd514c52d58e3b776f" />
    </ASpace>
  </a-modal>
</template>

<style lang="css" scoped>
.link-text {
  @apply text-blue cursor-pointer mr-2 hover:text-blue-6;
}
</style>
