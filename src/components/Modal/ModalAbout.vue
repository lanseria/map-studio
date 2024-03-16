<script lang="ts" setup>
const ModalVisible = ref(false)

function open() {
  ModalVisible.value = true
}

defineExpose({
  open,
})
</script>

<template>
  <AModal v-model:visible="ModalVisible" :width="400" :footer="false">
    <template #title>
      关于
    </template>
    <ASpace direction="vertical" align="center" class="w-full">
      <MapLogo />
      <ATypographyText>
        技术栈
        <a
          class="ms-link-text"
          href="https://mapbox.com"
          target="_blank"
          rel="noreferrer"
        >@Mapbox</a>
        <a
          class="ms-link-text"
          href="https://vuejs.org"
          target="_blank"
          rel="noreferrer"
        >Vue3</a>
      </ATypographyText>
      <ATypographyText>
        Made by  <a
          class="ms-link-text"
          href="https://github.com/lanseria"
          target="_blank"
          rel="noreferrer"
        >@Lanseria</a> <a
          class="ms-link-text"
          href="https://space.bilibili.com/8487409"
          target="_blank"
          rel="noreferrer"
        >@爱吃包子的超</a>
      </ATypographyText>
      <ATypographyText>
        Data from: <a
          class="ms-link-text"
          href="https://jihulab.com/data1355712"
          target="_blank"
          rel="noreferrer"
        >jihulab数据源</a>
        <a
          class="ms-link-text"
          href="https://enjqkboeqf.feishu.cn/share/base/form/shrcnoe95aMXAUGejzSvvEW9O2b"
          target="_blank"
          rel="noreferrer"
        >飞书多维表格数据源[停车位]</a>
        <a
          class="ms-link-text"
          href="https://weibo.com/u/7897247016"
          target="_blank"
          rel="noreferrer"
        >舟山停车[微博]</a>
      </ATypographyText>
    </ASpace>
  </AModal>
</template>
