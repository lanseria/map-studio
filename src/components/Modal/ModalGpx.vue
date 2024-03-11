<script lang="ts" setup>
const ModalVisible = ref(false)

function handleOk() {
  globalHandleSaveTrailGpx()
}
function open() {
  ModalVisible.value = true
}

defineExpose({
  open
})
</script>
<template>

<a-modal v-model:visible="ModalVisible" width="300px" @ok="handleOk">
    <template #title>
      保存路线
    </template>

    <a-form :model="globalMapTrailGPXGeoJsonProperties" layout="vertical">
      <a-form-item field="name" label="命名">
        <a-input v-model="globalMapTrailGPXGeoJsonProperties.name" placeholder="命名" />
      </a-form-item>
      <a-form-item field="desc" label="描述">
        <a-input v-model="globalMapTrailGPXGeoJsonProperties.desc" placeholder="描述" />
      </a-form-item>
      <a-form-item field="type" label="类型">
        <a-input v-model="globalMapTrailGPXGeoJsonProperties.type" placeholder="类型" />
      </a-form-item>
      <a-form-item field="link" label="链接">
        <a-input v-model="globalMapTrailGPXGeoJsonProperties.link" placeholder="链接" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
