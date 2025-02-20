import { Hono } from 'hono';
import { proxy } from 'hono/proxy';

export const next = new Hono();

next.all('/*', c => {
  const raw = new URL(c.req.url);

  const pathname = raw.pathname.replace(/^\/next/, '');
  const url = new URL(pathname, 'https://next.bgm.tv');
  url.search = raw.search;

  const headers = new Headers(c.req.raw.headers);
  headers.delete('cf-connecting-ip');

  return proxy(url, {
    ...c.req,
    headers
  });
});
