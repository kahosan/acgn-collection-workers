import { Hono } from 'hono';
import { timeline } from './router';

const app = new Hono();

app
  .route('/timeline', timeline);

export default app;
