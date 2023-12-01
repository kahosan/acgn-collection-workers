import { parser } from '~/parser/bangumi/comments';

import type { Handler } from 'hono';

export const handler: Handler = async (c) => {
  const { subjectId } = c.req.query();

  try {
    const comments = await parser(subjectId);
    return c.json(comments);
  } catch (e) {
    console.error(e);
    c.status(500);
    return c.json({ title: 'comments parser failed', description: (e as Error).message });
  }
};
