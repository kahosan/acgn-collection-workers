import { Hono } from 'hono';
import { cors } from 'hono/cors';

import { handler as tl } from './handler/timeline';
import { handler as re } from './handler/reviews';
import { handler as br } from './handler/board';
import { handler as co } from './handler/comments';

const app = new Hono();

app
  .use('*', cors())
  .get('/timeline', tl)
  .get('/reviews', re)
  .get('/board', br)
  .get('/comments', co);

export default app;
