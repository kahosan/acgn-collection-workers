import { parser } from '~/parser/bangumi/timeline';

import type { Handler } from 'hono';
import type { TimelinePayload } from '~/types/timeline';

export const handler: Handler = async (c) => {
  const { userId, type, page } = c.req.query<TimelinePayload>();

  try {
    const timeline = await parser({ userId, type, page });
    return c.json(timeline);
  } catch (e) {
    console.error(e);
    c.status(500);
    return c.json({ title: 'timeline parser failed', description: (e as Error).message });
  }
};
