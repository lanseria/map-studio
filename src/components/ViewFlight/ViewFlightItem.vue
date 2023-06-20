<script lang="ts" setup>
import type { ViewFlight } from '~/composables'

defineProps<{
  item: ViewFlight
}>()

function handleEditSelf(item: ViewFlight) {
  isEditViewFlight.value = true
  currentViewFlight.value = { ...item }
}
function handleDeleteSelf(item: ViewFlight) {
  mapViewFlightList.value = mapViewFlightList.value.filter(it => it.id !== item.id)
}
</script>

<template>
  <div class="card bg-white dark:bg-black px-4 py-2 pt-6 relative">
    <div class="nanoid">
      ID: {{ item.id }}
    </div>
    <div class="route-name">
      飞行路线名称:  {{ item.name }}
    </div>

    <div class="view-count flex justify-between">
      <div>视点数量: {{ item.children.length }}</div>
      <ASpace>
        <a-popconfirm content="确认此路线覆盖当前路线?" @ok="handleEditSelf(item)">
          <a-button type="outline" size="mini">
            <template #icon>
              <icon-edit />
            </template>
            <template #default>
              编辑
            </template>
          </a-button>
        </a-popconfirm>

        <a-popconfirm content="确认删除此路线?" @ok="handleDeleteSelf(item)">
          <a-button type="outline" size="mini" status="danger">
            <template #icon>
              <icon-delete />
            </template>
            <template #default>
              删除
            </template>
          </a-button>
        </a-popconfirm>
      </ASpace>
    </div>
  </div>
</template>

<style lang="css" scoped>
.card {
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  display: block;
  text-align: start;
  width: 100%;
}

.nanoid {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.route-name {
  font-size: 16px;
  margin-bottom: 10px;
}

.view-count {
  font-size: 14px;
  margin-bottom: 10px;
}
</style>
