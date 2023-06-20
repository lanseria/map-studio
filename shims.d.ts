declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
interface Window {
  map: mapboxgl.Map;
  draw: MapboxDraw;
}

declare module 'vue-matomo';

interface FormatSession {
  id: number
  title: string
  cover: string
  mid: number
  intro: string
  /**
   * 查看数
   */
  view: number
  /**
   * 弹幕数
   */
  danmaku: number
  /**
   * 评论数
   */
  reply: number
  /**
   * 收藏数
   */
  favorite: number
  /**
   * 投币数
   */
  coin: number
  /**
   * 分享数
   */
  share: number
  /**
   * 点赞数
   */
  like: number
  /**
   * 上传时间
   */
  mtime: number
  /**
   * 创建时间格式化
   */
  createdStr: string
  /**
   * 视频列表
   */
  videoList: FormatVideo[]
}

interface FormatVideo {
  bvid: string;
  aid: number;
  comment: number
  play: number
  pic: string
  description: string
  title: string
  review: number
  author: string
  mid: number
  created: number
  /**
  * 创建时间格式化
  */
  createdStr: string
}
