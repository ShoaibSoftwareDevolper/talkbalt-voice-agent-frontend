import type { NextRequest } from 'next/server';

// Server-only: the browser never talks to the API directly.
const API_URL = process.env.TALKBALT_API_URL ?? 'http://localhost:8001';

/**
 * Forwards /api/backend/* to the Talkbalt API at /api/*, with the browser's cookies, and passes
 * Set-Cookie back. Going through this same-origin route keeps the session cookie first-party.
 */
async function forward(req: NextRequest, ctx: RouteContext<'/api/backend/[...path]'>) {
  const { path } = await ctx.params;
  const headers = new Headers();
  for (const name of ['cookie', 'content-type', 'x-forwarded-for']) {
    const value = req.headers.get(name);
    if (value) headers.set(name, value);
  }
  const hasBody = req.method !== 'GET' && req.method !== 'HEAD';
  let res: Response;
  try {
    res = await fetch(`${API_URL}/api/${path.map(encodeURIComponent).join('/')}${req.nextUrl.search}`, {
      method: req.method,
      headers,
      body: hasBody ? await req.arrayBuffer() : undefined,
      cache: 'no-store',
      redirect: 'manual',
    });
  } catch {
    return Response.json({ detail: 'Could not reach the Talkbalt server. Is the API running?' }, { status: 502 });
  }
  const out = new Headers();
  const contentType = res.headers.get('content-type');
  if (contentType) out.set('content-type', contentType);
  for (const cookie of res.headers.getSetCookie()) out.append('set-cookie', cookie);
  return new Response(res.status === 204 ? null : res.body, { status: res.status, headers: out });
}

export { forward as GET, forward as POST, forward as PUT, forward as DELETE };
