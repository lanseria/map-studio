<script lang="ts" setup>
function onChange(val: any) {
  storeMapStyle.value = val
  const map = window.map
  const style = MAPBOX_STYLE_LIST.find(it => it.name === storeMapStyle.value)
  if (style) {
    const url = style.style
    map.setStyle(url)
    setMapPointImg(globalMapPointUrl.value)
    globalGeojsonExecute()
  }
}
</script>

<template>
  <a-radio-group :model-value="storeMapStyle" @change="onChange">
    <a-radio v-for="item in MAPBOX_STYLE_LIST" :key="item.name" :value="item.name">
      <template #radio="{ checked }">
        <a-tag :checked="checked" checkable color="blue">
          {{ item.name }}
        </a-tag>
      </template>
    </a-radio>
  </a-radio-group>
</template>
