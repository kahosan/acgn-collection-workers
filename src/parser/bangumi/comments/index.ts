import { load } from 'cheerio';

import { host } from '../constans';
import { fetcher } from '~/lib/fetcher';

import type { Comments } from '~/types/bangumi/comments';

export async function parser(subjectId: string) {
  const html = await fetcher<string>(`${host}/subject/${subjectId}/comments`);

  const comments: Comments = [];
  const $ = load(html);

  const $comments = $('#comment_box');

  $comments.children().each((_, el) => {
    const $comment = $(el);

    const $user = $comment.find('a').first();
    const userAvatar = $user.find('span.avatarNeue').css('background-image')?.match(/url\('(.+)'\)/)?.at(1) ?? '';

    const $text = $comment.find('.text');
    const user = {
      href: $text.find('a').attr('href') ?? '',
      name: $text.find('a').text(),
      avatar: userAvatar
    };

    const published = $comment.find('small.grey').text();
    const comment = $comment.find('p.comment').text().replaceAll('\n', '');
    const stars = $comment.find('.starstop-s').find('span').attr('class')?.match(/stars(\d+)/)?.at(1);

    comments.push({
      user,
      published,
      comment,
      stars: stars ? Number.parseInt(stars, 10) : undefined
    });
  });

  return comments;
}
