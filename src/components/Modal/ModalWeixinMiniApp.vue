<script lang="ts" setup>
import { globalWeixinMiniAppModalVisible } from '~/composables'
</script>

<template>
  <a-modal v-model:visible="globalWeixinMiniAppModalVisible" :footer="false">
    <template #title>
      微信小程序二维码
    </template>
    <ASpace direction="vertical" align="center" class="w-full">
      <AImage src="https://img.js.design/assets/img/64818f317200d496c7ab042e.jpg#115015aa316b865f5351ed1c362291ce" />
    </ASpace>
  </a-modal>
</template>

<style lang="css" scoped>
.link-text {
  @apply text-blue cursor-pointer mr-2 hover:text-blue-6;
}
</style>
