<script lang="ts" setup>
const route = useRoute()
const router = useRouter()
const treeData = [
  {
    title: '🅿️停车场',
    key: 'parking',
  },
  {
    title: '地震',
    key: 'earthquake',
  },
]
function handleSelect(e: any) {
  router.push(`/${e[0]}${route.hash}`)
}
</script>

<template>
  <MapBoxWrap>
    <template #title>
      Search Features/查询要素
    </template>
    <a-tree
      :data="treeData"
      @select="handleSelect"
    />
  </MapBoxWrap>
</template>
