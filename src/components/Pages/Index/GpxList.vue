<script lang="ts" setup></script>

<template>
  <MapBoxWrap class="mt-8px">
    <template #title>
      GPX Trail List
    </template>

    <div v-for="(item, idx) in storeMapTrailGPXLines" :key="idx" class="mt-8px rounded-8px bg-gray-100 px-8px py-8px text-size-12px">
      <div class="grid grid-cols-3 gap-4px">
        <div class="col-span-1">
          名称
        </div>
        <div class="col-span-2">
          {{ item.properties.name }}
        </div>
        <div class="col-span-1">
          描述
        </div>
        <div class="col-span-2">
          {{ item.properties.desc }}
        </div>
        <div class="col-span-1">
          类型
        </div>
        <div class="col-span-2">
          {{ item.properties.type }}
        </div>
        <div class="col-span-1">
          链接
        </div>
        <div class="col-span-2">
          {{ item.properties.link }}
        </div>
        <div class="col-span-1">
          操作
        </div>
        <div class="col-span-2">
          <ASpace>
            <AButton type="primary" status="success" size="mini">
              上传
            </AButton>
            <AButton type="outline" status="danger" size="mini" @click="deleteTrailGPXLine(item)">
              删除
            </AButton>
          </ASpace>
        </div>
      </div>
    </div>
  </MapBoxWrap>
</template>
