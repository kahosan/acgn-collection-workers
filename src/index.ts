import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { timeline } from './router';

const app = new Hono();

app
  .use('*', cors())
  .route('/timeline', timeline);

export default app;
