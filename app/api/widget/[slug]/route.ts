import type { NextRequest } from 'next/server';

const API_URL = process.env.TALKBALT_API_URL ?? 'http://localhost:8001';

// The widget runs on businesses' own websites, so this answers any origin. It only returns what the
// public page already shows.
const CORS = { 'access-control-allow-origin': '*', 'access-control-allow-methods': 'GET', 'cache-control': 'public, max-age=60' };

/** The widget's look for a business: its name, logo, button text, colour and side. */
export async function GET(_req: NextRequest, ctx: RouteContext<'/api/widget/[slug]'>) {
  const { slug } = await ctx.params;
  try {
    const res = await fetch(`${API_URL}/api/public/${encodeURIComponent(slug)}`, { cache: 'no-store' });
    if (!res.ok) return Response.json({ detail: 'Not found' }, { status: res.status, headers: CORS });
    const b = await res.json();
    return Response.json(
      {
        name: b.name,
        logo_url: b.logo_url,
        label: b.widget_label,
        color: b.widget_color,
        position: b.widget_position,
        calls_enabled: b.calls_enabled,
      },
      { headers: CORS },
    );
  } catch {
    return Response.json({ detail: 'Unavailable' }, { status: 502, headers: CORS });
  }
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}
