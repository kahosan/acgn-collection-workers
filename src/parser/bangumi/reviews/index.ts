import { load } from 'cheerio';

import { host } from '../constans';
import { fetcher } from '~/lib/fetcher';

import type { Reviews } from '~/types/bangumi/reviews';

export async function parser(subjectId: string) {
  const html = await fetcher<string>(`${host}/subject/${subjectId}/reviews`);

  const reviews: Reviews = [];
  const $ = load(html);

  $('#entry_list').children().each((_, el) => {
    const $item = $(el);

    const $entry = $item.find('.entry');

    const $titleAnchor = $entry.find('.title').find('a');
    const id = $titleAnchor.attr('href')?.split('/').pop() ?? '';
    const title = $titleAnchor.text();

    const $time = $entry.find('div.time');
    const $user = $time.find('a');
    const user = {
      href: $user.attr('href') ?? '',
      avatar: $item.find('img').attr('src') ?? '',
      name: $user.text()
    };

    const time = $time.find('small.time').text();
    const count = $time.find('small.orange').text().replaceAll(/\(\+|\)/g, '');

    const content = $entry.find('.content').text().replace(/\(more\)$/, '').replaceAll('\n', '');

    reviews.push({
      id: Number.parseInt(id, 10),
      title,
      user,
      time,
      replies: Number.parseInt(count, 10),
      content
    });
  });

  return reviews;
}
