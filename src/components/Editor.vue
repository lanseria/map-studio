<script setup lang="ts">
import * as monaco from 'monaco-editor'

const props = defineProps<{
  modelValue: string
}>()
const emit = defineEmits(['update:modelValue'])

let monacoEditor: monaco.editor.IStandaloneCodeEditor
const editContainer = shallowRef()
watch(
  () => props.modelValue,
  (value) => {
    // 防止改变编辑器内容时光标重定向
    if (value !== monacoEditor.getValue())
      monacoEditor.setValue(value)
  },
)

onMounted(() => {
  monacoEditor = monaco.editor.create(editContainer.value, {
    value: props.modelValue,
    readOnly: false,
    language: 'json',
    automaticLayout: true,
    theme: 'vs',
    selectOnLineNumbers: true,
  })
  // 监听值变化
  monacoEditor.onDidChangeModelContent(() => {
    emit('update:modelValue', monacoEditor.getValue())
  })
})
</script>

<template>
  <div ref="editContainer" class="code-editor" />
</template>

<style scoped>
.code-editor {
  width: 100%;
  min-height: 200px;
}
</style>
