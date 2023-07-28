<script lang="ts" setup>
const computedTreeData = computed(() => {
  return [
    {
      title: '未命名',
      key: 'undefined',
      children: globalMapDrawFeatures.value.map((item: any) => ({
        title: item.properties.description || item.properties.id,
        key: item.properties.id,
      })),
    },
  ]
})
</script>

<template>
  <MapBoxWrap class="mt-8px">
    <template #title>
      DrawLayer筛选
    </template>
    <a-tree
      :checkable="true"
      :data="computedTreeData"
    />
  </MapBoxWrap>
</template>
