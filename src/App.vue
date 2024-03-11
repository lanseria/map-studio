<script setup lang="ts">
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn'

onMounted(() => {
  handleFetchCurrentStormData()
  handleFetchPanguPhotos()
  handleFetchStormDataUseWindy()
})
</script>

<template>
  <AConfigProvider
    :locale="zhCN"
  >
    <main class="font-sans!">
      <MapLayout>
        <RouterView />
      </MapLayout>
    </main>
  </AConfigProvider>
</template>
