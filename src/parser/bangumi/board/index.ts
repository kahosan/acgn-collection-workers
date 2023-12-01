import { load } from 'cheerio';

import { host } from '../constans';
import { fetcher } from '~/lib/fetcher';

import type { Board } from '~/types/bangumi/board';

export async function parser(subjectId: string) {
  const html = await fetcher<string>(`${host}/subject/${subjectId}/board`);

  const $ = load(html);
  const board: Board = [];

  const $boards = $('.topic_list').find('tbody');

  $boards.children().each((_, el) => {
    const $board = $(el);

    const $td1 = $board.find('td:nth-child(1)');
    const id = $td1.find('a').attr('href')?.split('/').pop() ?? '0';
    const title = $td1.find('a').text();

    const $td2 = $board.find('td:nth-child(2)');
    const user = {
      href: $td2.find('a').attr('href') ?? '',
      name: $td2.find('a').text()
    };

    const $td3 = $board.find('td:nth-child(3)');
    const replies = $td3.find('small').text().split(' ').at(0) ?? '0';

    const $td4 = $board.find('td:nth-child(4)');
    const time = $td4.find('small').text();

    board.push({
      id: Number.parseInt(id, 10),
      title,
      user,
      replies: Number.parseInt(replies, 10),
      time
    });
  });

  return board;
}
