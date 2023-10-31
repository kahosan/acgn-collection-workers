export type TimelineScope = 'friend' | 'all' | 'me';

/**
  * @description The label and value of TimelineType are as follows:
  * - 'all': 全站
  * - 'say': 吐槽
  * - 'subject': 收藏
  * - 'progress': 进度
  * - 'blog': 日志
  * - 'mono': 人物
  * - 'relation': 好友
  * - 'group': 小组
  * - 'wiki': 维基
  * - 'index': 目录
  */
export type TimelineType =
  | 'all'
  | 'say'
  | 'subject'
  | 'progress'
  | 'blog'
  | 'mono'
  | 'relation'
  | 'group'
  | 'wiki'
  | 'index'
  | '';

export interface TimelinePayload {
  userId?: string
  /**
    * @description The label and value of TimelineType are as follows:
    * - 'all': 全站
    * - 'say': 吐槽
    * - 'subject': 收藏
    * - 'progress': 进度
    * - 'blog': 日志
    * - 'mono': 人物
    * - 'relation': 好友
    * - 'group': 小组
    * - 'wiki': 维基
    * - 'index': 目录
    */
  type: TimelineType
  page: string
}

export type Timeline = Array<{
  date: string
  items: TimelineItem[]
}>;

export interface TimelineItem {
  user: {
    name: string
    href: string // 只有第一个 ul 中的 li 才有
    avatar: string
  }
  time: string
  reply: {
    content: string
    text: string
    href: string
  }
  action: {
    type: string
    desc: string
  }
  contents: Array<Record<'name' | 'url', string>>
}
