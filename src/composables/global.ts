export * as turf from '@turf/turf'
export { nanoid } from 'nanoid'

export const globalIsMapboxLoad = ref(false)
export const globalSettingModalVisible = ref(false)
export const globalAboutModalVisible = ref(false)
export const globalWeixinMiniAppModalVisible = ref(false)
export const globalJoinUsModalVisible = ref(false)

export const globalMapCenter = ref(INIT_POINT)
