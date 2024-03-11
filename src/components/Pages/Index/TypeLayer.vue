<script lang="ts" setup>
const route = useRoute()
const router = useRouter()
const treeData = [
  {
    title: '停车场',
    key: 'parking',
  },
]
function handleSelect(e: any) {
  router.push(`/${e[0]}${route.hash}`)
}
</script>

<template>
  <MapBoxWrap>
    <template #title>
      Features/要素
    </template>
    <a-tree
      :data="treeData"
      @select="handleSelect"
    />
  </MapBoxWrap>
</template>
