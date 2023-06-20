<script lang="ts" setup>
import { globalAboutModalVisible } from '~/composables'
</script>

<template>
  <a-modal v-model:visible="globalAboutModalVisible" :footer="false">
    <template #title>
      关于
    </template>
    <ASpace direction="vertical" align="center" class="w-full">
      <MapLogo />
      <a-typography-text>
        技术栈
        <a
          class="link-text"
          href="https://mapbox.com"
          target="_blank"
          rel="noreferrer"
        >@Mapbox</a>
        <a
          class="link-text"
          href="https://vuejs.org"
          target="_blank"
          rel="noreferrer"
        >Vue3</a>
      </a-typography-text>
      <a-typography-text>
        Made by  <a
          class="link-text"
          href="https://github.com/lanseria"
          target="_blank"
          rel="noreferrer"
        >@Lanseria</a> <a
          class="link-text"
          href="https://space.bilibili.com/8487409"
          target="_blank"
          rel="noreferrer"
        >@爱吃包子的超</a>
      </a-typography-text>
      <a-typography-text>
        Data from: <a
          class="link-text"
          href="https://jihulab.com/data1355712"
          target="_blank"
          rel="noreferrer"
        >jihulab数据源</a>
      </a-typography-text>
    </ASpace>
  </a-modal>
</template>

<style lang="css" scoped>
.link-text {
  @apply text-blue cursor-pointer mr-2 hover:text-blue-6;
}
</style>
