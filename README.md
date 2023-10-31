解决一些 API 获取不到的网页内容

base: `https://acgn-collection-workers.kahosan.workers.dev`

# Timeline

获取 Bangumi 的时间胶囊，可以解析「全站」和「自己」的数据，但登入视角的时间胶囊数据暂不支持

```http
GET /timeline?type=all&page=1
```

| Parameter | Type | Description | Required |
| :---: | :---: | :---: | :---: |
| `userId` | `string` | 可以是用户名也可以是 ID，不传递时返回全站数据 | `false` |
| `type` | `string` | 见下表 | `false` |
| `page` | `number` | 页码，全站的数据只有一页 | `false` |

| Type | Description |
| :---: | :---: |
| '' | 空字符串，对应 Bangumi 的默认页面 |
| `all` | 全站 |
| `say` | 吐槽 |
| `subject` | 收藏 |
| `progress` | 进度 |
| `blog` | 日志 |
| `mono` | 人物 |
| `relation` | 好友 |
| `group` | 小组 |
| `wiki` | 维基 |
| `index` | 目录 |

## Response

<details>

<summary>展开</summary>

```json
[
  {
    "date": "今天",
    "items": [
      {
        "user": {
          "name": "石烏漱",
          "href": "https://bgm.tv/user/807962",
          "avatar": "https://lain.bgm.tv/pic/user/l/000/80/79/807962.jpg?r=1698033896&hd=1"
        },
        "time": "36秒前 · mobile",
        "reply": {
          "content": "",
          "text": "",
          "href": ""
        },
        "action": {
          "type": "完成了",
          "desc": "4 of 12 话"
        },
        "contents": [
          {
            "name": "星屑テレパス",
            "url": "https://bgm.tv/subject/404115"
          }
        ]
      },
      {
        "user": {
          "name": "KuanChao",
          "href": "https://bgm.tv/user/494240",
          "avatar": "https://lain.bgm.tv/pic/user/l/icon.jpg"
        },
        "time": "39秒前 ",
        "reply": {
          "content": "",
          "text": "",
          "href": ""
        },
        "action": {
          "type": "读过",
          "desc": "第530话"
        },
        "contents": [
          {
            "name": "酒のほそ道",
            "url": "https://bgm.tv/subject/181113"
          }
        ]
      },
    ]
  }
]
```

</details>

<details>

<summary>类型定义</summary>

```ts
type Timeline = Array<{
  date: string
  items: TimelineItem[]
}>;

interface TimelineItem {
  user: {
    name: string
    href: string
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
```

</details>