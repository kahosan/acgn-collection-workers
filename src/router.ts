import { Hono } from 'hono';
import { handler } from './handler/timeline';

export const timeline = new Hono();

timeline
  .get('/', handler);
