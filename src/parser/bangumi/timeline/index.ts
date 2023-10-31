import { load } from 'cheerio';

import { fetchHTML } from './common';

import type { TimelinePayload, Timeline, TimelineItem } from '~/types/timeline';

export async function parser(body: TimelinePayload) {
  const html = await fetchHTML(body).then(r => r.text());

  const timeline: Timeline = [];
  const $ = load(html);
  $('.Header').each((_, el) => {
    const date = $(el).text();
    const $ul = $(el).next('ul');

    const items: TimelineItem[] = [];

    let avatar = '';

    $ul.find('li').each((_, li) => {
      const $info = $(li).find(body.userId ? '.info_full' : '.info');
      const $text = $info.contents()
        .filter(function () {
          return this.nodeType === 3 && this.parent === $info[0];
        });
      const $reply = $info.find('a.tml_comment');

      const action = {
        type: $text.eq(0).text().trim(),
        desc: $text.eq(1).text().trim()
      };
      if (action.desc === '、') {
        action.desc = $text.last().text().trim();

        if (
          ['好友', '小组'].some(text => $text.text().includes(text))
          && !action.desc
        )
          action.desc = $text.eq($text.length - 4).text().trim();

        // 收藏了多个人物的情况
        if (!action.desc) {
          action.desc = $text
            .eq($text.length - 3)
            .text()
            .trim();
        }
      }

      const $avatar = $(li).find('.avatarNeue');
      if ($avatar.length > 0) avatar = $($avatar).css('background-image')?.match(/url\('(.+)'\)/)?.at(1) ?? '';
      const $user = $info.find('> a:not(.rr)')
        .filter((_, a) => a.attribs.href.includes('/user/'))
        .get(0);
      const user = {
        name: $($user).text().trim(),
        href: $($user).attr('href') ?? '',
        avatar: avatar.replace('//', 'https://')
      };

      const contents: Array<Record<'name' | 'url', string>> = [];
      $info.find('> a').each((i, a) => {
        const text = $(a).text().trim();
        const href = $(a).attr('href');
        if (text && href) {
          if (
            (
              i === 0
              || (['all', 'relation', ''].every(type => body.type !== type) && href.includes('/user/'))
              || user.name === text
            )
            && !body.userId
          ) return;

          contents.push({
            name: text,
            url: href
          });
        }
      });

      const reply = {
        content: $(li).find('.status').text().trim(),
        text: $reply.text().trim(),
        href: $reply.attr('href') ?? ''
      };

      items.push({
        user,
        time: $info.find('.date')
          .text()
          .trim()
          .split('·')
          .filter(item => !(item.includes('回复') || item.includes('web')))
          .join('·'),
        reply,
        action,
        contents
      });
    });

    timeline.push({
      date,
      items
    });
  });

  return timeline;
}
