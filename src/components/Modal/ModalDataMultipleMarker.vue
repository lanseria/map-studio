<script lang="ts" setup>
import Editor from '../Editor.vue'

const filterMapDataMultipleMarkerFeatures = ref('')
const { copy, copied, isSupported } = useClipboard()
function handleOk() {
  globalModalDataMultipleMarkerVisible.value = false
}
function handleCancel() {
  globalModalDataMultipleMarkerVisible.value = false
}
watchEffect(() => {
  if (globalModalDataMultipleMarkerVisible.value)
    filterMapDataMultipleMarkerFeatures.value = JSON.stringify(globalGeojsonFeatures.value.filter(item => item.properties.sessionId === globalSessionId.value && item.properties.videoId === globalVideoId.value), null, 2)
  else
    filterMapDataMultipleMarkerFeatures.value = ''
})
</script>

<template>
  <a-modal :visible="globalModalDataMultipleMarkerVisible" :width="600" @ok="handleOk" @cancel="handleCancel">
    <template #title>
      提示
    </template>
    <div>
      <div class="mb-10px flex items-center justify-between">
        <div>
          可以复制此数据
        </div>
        <AButton v-if="isSupported" @click="copy(filterMapDataMultipleMarkerFeatures)">
          <!-- by default, `copied` will be reset in 1.5s -->
          <span v-if="!copied">Copy</span>
          <span v-else>Copied!</span>
        </AButton>
        <AButton v-else>
          Your browser does not support Clipboard API
        </AButton>
      </div>
      <Editor v-model="filterMapDataMultipleMarkerFeatures" class="h-400px" />
    </div>
  </a-modal>
</template>
