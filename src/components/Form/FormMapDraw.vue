<script lang="ts" setup>
// import { deleteMapFeature, updateMapFeature } from '~/composables'
import { Message } from '@arco-design/web-vue'
import { globalCurrentProperties } from '~/composables'
import { reloadMapDrawLayer } from '~/composables/draw/mode'

const isShowForm = computed(() => {
  return globalCurrentProperties.value !== null
})
function handleUpdate() {
  // 查询当前ID的feature
  const featureIdx = storeMapDrawFeatures.value.findIndex(item => item.properties!.id === globalCurrentProperties.value.id)
  if (featureIdx >= 0) {
    const polygon = storeMapDrawFeatures.value[featureIdx]
    // 所有属性重新赋值
    polygon.properties = {
      ...globalCurrentProperties.value,
    }
    storeMapDrawFeatures.value[featureIdx] = polygon
    // updateMapFeature(polygon)
    // Message
    Message.success('更新成功')
  }
  else { console.warn('找不到该geojson') }

  reloadMapDrawLayer()
  globalMapDrawFeatureModalVisible.value = false
}

function handleDelete() {
  //
  storeMapDrawFeatures.value = storeMapDrawFeatures.value.filter(item => item.properties!.id !== globalCurrentProperties.value.id)
  // deleteMapFeature(globalCurrentProperties.value.id)
  reloadMapDrawLayer()
  globalCurrentProperties.value = null
  Message.success('已删除')
}
</script>

<template>
  <div class="p-5">
    <a-form v-if="isShowForm" :model="globalCurrentProperties" layout="vertical">
      <!-- <a-form-item field="type" label="要素类型">
        <a-input disabled :model-value="TypeEnumMap[globalCurrentProperties.type as TypeEnum]" />
      </a-form-item> -->
      <a-form-item v-if="globalCurrentProperties.id" field="id" label="ID">
        <a-input disabled :model-value="globalCurrentProperties.id " />
      </a-form-item>
      <a-form-item v-if="globalCurrentProperties.radius" field="radius" label="半径(米)">
        <a-input-number v-model="globalCurrentProperties.radius" placeholder="请输入半径" mode="button" />
      </a-form-item>
      <a-form-item v-if="globalCurrentProperties['fill-color']" field="fill-color" label="填充颜色">
        <input v-model="(globalCurrentProperties['fill-color'])" type="color">
      </a-form-item>
      <a-form-item v-if="globalCurrentProperties['fill-opacity']" field="fill-opacity" label="填充透明度">
        <a-slider v-model="(globalCurrentProperties['fill-opacity'])" :style="{ display: 'flex' }" :min="0.1" :max="1" :step="0.1" show-input />
      </a-form-item>

      <a-form-item v-if="globalCurrentProperties['line-color']" field="line-color" label="线条颜色">
        <input v-model="(globalCurrentProperties['line-color'])" type="color">
      </a-form-item>
      <a-form-item v-if="globalCurrentProperties['line-opacity']" field="line-opacity" label="线条透明度">
        <a-slider v-model="(globalCurrentProperties['line-opacity'])" :style="{ display: 'flex' }" :min="0.1" :max="1" :step="0.1" show-input />
      </a-form-item>
      <a-form-item v-if="globalCurrentProperties['line-width']" field="line-width" label="线条宽度">
        <a-slider v-model="(globalCurrentProperties['line-width'])" :style="{ display: 'flex' }" :min="1" :max="10" :step="1" show-input />
      </a-form-item>

      <a-form-item field="icon-size" label="图标大小">
        <a-slider v-model="(globalCurrentProperties['icon-size'])" :style="{ display: 'flex' }" :min="0" :max="1" :step="0.1" show-input />
      </a-form-item>
      <a-form-item field="description" label="描述">
        <a-textarea
          v-model="globalCurrentProperties.description" :auto-size="{
            minRows: 2,
            maxRows: 5,
          }"
        />
      </a-form-item>
      <template v-if="globalCurrentProperties.type === PointTypeEnum.点">
        <a-form-item field="textColor" label="文字颜色">
          <input v-model="globalCurrentProperties['text-color']" type="color">
        </a-form-item>
        <a-form-item field="textSize" label="文字大小">
          <a-slider v-model="globalCurrentProperties['text-size']" :style="{ display: 'flex' }" :min="1" :max="SETTING_TEXT_MAXSIZE" :step="1" show-input />
        </a-form-item>
      </template>
      <a-form-item>
        <ASpace>
          <a-button type="primary" @click="handleUpdate()">
            更新
          </a-button>
          <a-button status="danger" @click="handleDelete()">
            移除
          </a-button>
        </ASpace>
      </a-form-item>
    </a-form>
    <div v-else>
      请选择元素
    </div>
  </div>
</template>
