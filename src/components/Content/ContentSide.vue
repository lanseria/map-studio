<script lang="ts" setup>
import { storeContentSideCollapseActiveKey } from '~/composables'
</script>

<template>
  <a-collapse v-model:active-key="storeContentSideCollapseActiveKey" :bordered="false">
    <a-collapse-item key="0" header="地图样式选择">
      <CollapseStyleLayer />
    </a-collapse-item>
    <a-collapse-item key="1" header="筛选器">
      <CollapeFilter />
    </a-collapse-item>

    <a-collapse-item key="2" header="数据列表">
      <CollapeData />
    </a-collapse-item>

    <a-collapse-item key="3" header="标注图层">
      <CollapseDrawLayer />
    </a-collapse-item>

    <a-collapse-item key="4" header="公共图层">
      <CollapseCommonLayer />
    </a-collapse-item>

    <a-collapse-item key="5" header="导入图层">
      <!-- <CollapseImportLayer /> -->
    </a-collapse-item>

    <a-collapse-item key="6" header="编辑视点飞行路线">
      <CollapseViewFlight />
    </a-collapse-item>

    <a-collapse-item key="7" header="历史视点飞行路线">
      <CollapseViewFlightHistory />
    </a-collapse-item>
  </a-collapse>
</template>
