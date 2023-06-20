<script lang="ts" setup>
import { globalSessionId, storeMapDataValue, storeMapTypeValue } from '~/composables'

// function handleClick(item: any) {
//   globalSessionId.value = item.id
// }
const sessionOptions = computed(() => {
  return globalAllSessions.value?.map((item: any) => {
    return {
      label: item.title,
      value: item.id,
    }
  })
})

const computedMapDataValue = computed(() => {
  return MAP_DATA_LIST.filter(item => item.type === storeMapTypeValue.value)
})
</script>

<template>
  <a-scrollbar style="max-height:400px;overflow: auto;">
    <a-form :model="{}" auto-label-width layout="horizontal">
      <a-form-item label="数据类型">
        <a-select v-model:model-value="storeMapTypeValue" :options="MAP_DATA_TYPE" />
      </a-form-item>
      <a-form-item label="数据源">
        <a-select v-model:model-value="storeMapDataValue" :options="computedMapDataValue" />
      </a-form-item>
      <a-form-item v-if="storeMapTypeValue === 'travel_example'" label="路线">
        <a-select v-model:model-value="globalSessionId" :options="sessionOptions" />
      </a-form-item>
    </a-form>
  </a-scrollbar>
</template>
