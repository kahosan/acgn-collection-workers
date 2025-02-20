import { parser } from '~/parser/bangumi/board';

import type { Handler } from 'hono';

export const handler: Handler = async c => {
  const { subjectId } = c.req.query();

  try {
    const reviews = await parser(subjectId);
    return c.json(reviews);
  } catch (e) {
    console.error(e);
    c.status(500);
    return c.json({ title: 'board parser failed', description: (e as Error).message });
  }
};
