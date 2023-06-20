<script lang="ts" setup>
const searchText = ref('')
const videoList = computed(() => {
  if (globalAllSessions.value) {
    const sessions = globalAllSessions.value.find((item: any) => item.id === globalSessionId.value)
    if (sessions)
      return sessions.videoList.filter((item: any) => item.title.includes(searchText.value))
    else
      return []
  }
  else {
    return []
  }
})
function handleClick(item: FormatVideo) {
  globalVideoId.value = item.aid
}
function handleClickReset() {
  globalVideoId.value = -1
}
function handlePlay(item: FormatVideo) {
  open(`https://www.bilibili.com/video/${item.bvid}`)
}
// function handleJump() {
//   open('https://graphhopper.com/maps/?point=36.634657%2C101.765811&point=36.280655%2C100.617785&point=36.315161%2C99.686093&point=36.795382%2C99.075579&point=36.933206%2C98.479484&point=37.351506%2C97.375158&point=37.431169%2C95.338793&point=37.367224%2C94.168815&point=39.022607%2C88.163424&point=41.716733%2C86.196723&profile=car&layer=OpenStreetMap')
// }
</script>

<template>
  <a-scrollbar style="height:400px;overflow: auto;">
    <a-input v-model:model-value="searchText" class="w-full mb-10px" placeholder="请输入关键词进行搜索" allow-clear />
    <div class="grid grid-cols-2 gap-20px">
      <div
        class="cursor-pointer flex rounded-lg p-5px border border-[var(--color-neutral-2)]"
        :class="globalVideoId !== -1 ? 'bg-[var(--color-neutral-2)]' : 'bg-[var(--color-neutral-4)]'"
        @click="handleClickReset()"
      >
        总路线
      </div>
      <div
        v-for="item in videoList" :key="item.aid" class="cursor-pointer flex rounded-lg p-5px border border-[var(--color-neutral-2)]"
        :class="globalVideoId !== item.aid ? 'bg-[var(--color-neutral-2)]' : 'bg-[var(--color-neutral-4)] '"
        @click="handleClick(item)" @dblclick="handlePlay(item)"
      >
        <div class="flex flex-col">
          <div class="text-12px">
            {{ item.title }}
          </div>
          <div title="发布时间" class="text-12px text-[var(--color-neutral-8)]">
            <icon-clock-circle />{{ item.createdStr }}
          </div>
        </div>
      </div>
    </div>
  </a-scrollbar>
</template>
