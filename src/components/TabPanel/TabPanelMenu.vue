<script setup lang="ts">
const tabCollapse = ref(false)
const activeKey = ref('1')
function onTabCollapse() {
  tabCollapse.value = !tabCollapse.value
  nextTick(() => {
    window.map.resize()
  })
}
function handleAbout() {
  globalAboutModalVisible.value = true
}
function handleRefresh() {
  location.reload()
}
function handleWeixinMiniApp() {
  globalWeixinMiniAppModalVisible.value = true
}
function handleJoinUs() {
  globalJoinUsModalVisible.value = true
}
watchEffect(() => {
  if (activeKey.value === '2') {
    handleMapDrawEdit()
  }
  else {
    handleMapExitDrawEdit()
    handleMapDrawMove(false)
  }
})
</script>

<template>
  <a-tabs v-model:active-key="activeKey" type="card" size="large">
    <template #extra>
      <a-button type="text" @click="onTabCollapse">
        <template #icon>
          <icon-up v-if="!tabCollapse" />
          <icon-down v-else />
        </template>
        {{ tabCollapse ? '展开' : '收起' }}
      </a-button>
    </template>
    <a-tab-pane key="1" title="数据编辑">
      <div v-show="!tabCollapse" class="mb-5 mx-5 flex">
        <!-- <a-dropdown>
          <TabPanelIconBtn class="mr-5" show-down>
            <template #icon>
              <div class="text-size-40px i-gis-geojson-file" />
            </template>
            默认数据
          </TabPanelIconBtn>

          <template #content>
            <a-doption>
              加载数据
            </a-doption>
            <a-doption>编辑数据</a-doption>
            <a-doption>重置数据</a-doption>
          </template>
        </a-dropdown>

        <a-dropdown>
          <TabPanelIconBtn class="mr-5" show-down>
            <template #icon>
              <div class="text-size-40px i-gis-kml-file" />
            </template>
            KML数据
          </TabPanelIconBtn>

          <template #content>
            <a-doption>
              加载至本地
            </a-doption>
            <a-doption>
              加载至Studio
            </a-doption>
            <a-doption>
              KML转化Geojson
            </a-doption>
          </template>
        </a-dropdown>

        <a-dropdown>
          <TabPanelIconBtn class="mr-5" show-down>
            <template #icon>
              <div class="text-size-40px i-gis-shape-file" />
            </template>
            TIF数据
          </TabPanelIconBtn>

          <template #content>
            <a-doption>
              加载至Studio
            </a-doption>
          </template>
        </a-dropdown> -->

        <TabPanelIconBtn class="mr-5" @click="handleMultipleMarker">
          <template #icon>
            <div class="text-size-40px i-mdi-map-marker-multiple" />
          </template>
          查看点位
        </TabPanelIconBtn>
        <a-dropdown>
          <TabPanelIconBtn class="mr-5" show-down>
            <template #icon>
              <div class="text-size-40px i-mdi-map-marker-distance" />
            </template>
            计算路程
          </TabPanelIconBtn>

          <template #content>
            <a-doption @click="handleComputeDistance">
              计算路程(仅导入中的数据)
            </a-doption>
            <a-doption @click="handleComputeDistanceInEdit">
              计算路程(包含编辑中的数据)
            </a-doption>
            <a-doption @click="handleExportComputeDistance">
              导出路程(geojson)
            </a-doption>
          </template>
        </a-dropdown>

        <!-- <TabPanelIconBtn class="mr-5" @click="handleShowDistance">
          <template #icon>
            <div class="text-size-40px i-mdi-vector-line" />
          </template>
          查看路程
        </TabPanelIconBtn> -->

        <TabPanelIconBtn class="mr-5" @click="handleSendIssueUseEmail">
          <template #icon>
            <div class="text-size-40px i-carbon-mail-reply" />
          </template>
          发送邮件
        </TabPanelIconBtn>

        <TabPanelIconBtn class="mr-5" @click="handleWeixinMiniApp">
          <template #icon>
            <div class="text-size-40px i-icon-park-outline-weixin-mini-app" />
          </template>
          微信小程序
        </TabPanelIconBtn>

        <TabPanelIconBtn class="mr-5" @click="handleJoinUs">
          <template #icon>
            <div class="text-size-40px i-ant-design-qq-circle-filled" />
          </template>
          加入QQ频道
        </TabPanelIconBtn>
      </div>
    </a-tab-pane>
    <a-tab-pane key="2" title="绘制/编辑">
      <div v-show="!tabCollapse" class="mb-5 mx-5 flex">
        <TabPanelIconBtn class="mr-5" @click="handleSelectGlobalDrawMode('draw_point')">
          <template #icon>
            <div class="text-size-40px i-gis-point" :class="{ 'bg-red': globalDrawMode === 'draw_point' }" />
          </template>
          点
        </TabPanelIconBtn>

        <TabPanelIconBtn class="mr-5" @click="handleSelectGlobalDrawMode('draw_line_string')">
          <template #icon>
            <div class="text-size-40px i-gis-polyline-pt" :class="{ 'bg-red': globalDrawMode === 'draw_line_string' }" />
          </template>
          线
        </TabPanelIconBtn>

        <TabPanelIconBtn class="mr-5" @click="handleSelectGlobalDrawMode('draw_polygon')">
          <template #icon>
            <div class="text-size-40px i-gis-polygon-pt" :class="{ 'bg-red': globalDrawMode === 'draw_polygon' }" />
          </template>
          面
        </TabPanelIconBtn>

        <TabPanelIconBtn class="mr-5" @click="handleSelectGlobalDrawMode('draw_radius')">
          <template #icon>
            <div class="text-size-40px i-gis-circle-o" :class="{ 'bg-red': globalDrawMode === 'draw_radius' }" />
          </template>
          圆
        </TabPanelIconBtn>

        <TabPanelIconBtn class="mr-5" @click="handleMapDrawMove(!globalDrawMove)">
          <template #icon>
            <div class="text-size-40px i-carbon-move" :class="{ 'bg-red': globalDrawMove }" />
          </template>
          移动
        </TabPanelIconBtn>
      </div>
    </a-tab-pane>
    <a-tab-pane key="3" title="帮助">
      <div v-show="!tabCollapse" class="mb-5 mx-5 flex">
        <TabPanelIconBtn class="mr-5">
          <template #icon>
            <div class="text-size-40px i-carbon-settings" />
          </template>
          设置
        </TabPanelIconBtn>

        <TabPanelIconBtn class="mr-5" @click="handleRefresh">
          <template #icon>
            <div class="text-size-40px i-carbon-rotate-360" />
          </template>
          刷新页面
        </TabPanelIconBtn>
        <TabPanelIconBtn class="mr-5" @click="() => toggleDark()">
          <template #icon>
            <div class="text-size-40px dark:i-carbon-moon i-carbon-sun" />
          </template>
          主题
        </TabPanelIconBtn>
        <TabPanelIconBtn class="mr-5" @click="handleAbout">
          <template #icon>
            <div class="text-size-40px i-carbon-warning" />
          </template>
          关于
        </TabPanelIconBtn>
      </div>
    </a-tab-pane>
  </a-tabs>
</template>
