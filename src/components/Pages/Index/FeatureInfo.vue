<script lang="ts" setup>
import { globalCurrentProperties } from '~/composables'
</script>

<template>
  <MapBoxWrap class="mt-8px">
    <template #title>
      Feature Info/要素信息
    </template>
    <div class="mt-8px rounded-8px bg-gray-100 px-8px py-8px text-size-12px">
      <div class="grid grid-cols-3 gap-4px">
        <div class="col-span-1">
          ID
        </div>
        <div class="col-span-2">
          <a-typography-paragraph>
            {{ globalCurrentProperties.id }}
          </a-typography-paragraph>
        </div>
        <div class="col-span-1">
          名称
        </div>
        <div class="col-span-2">
          <a-typography-paragraph
            v-model:editText="globalCurrentProperties.description"
            editable
          >
            {{ globalCurrentProperties.description }}
          </a-typography-paragraph>
        </div>
      </div>
    </div>
  </MapBoxWrap>
</template>
