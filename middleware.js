export const config = { matcher: ['/tour-app', '/tour-app.html', '/tour-app/:path*'] };
const HASH = 'd9034aa6c1e6e018d02315a3f70e484010a689a449ecd21ccd087214819832ea';
async function sha(s) {
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');
}
export default async function middleware(req) {
  const h = req.headers.get('authorization') || '';
  if (h.startsWith('Basic ')) {
    try {
      const dec = atob(h.slice(6)); const pw = dec.slice(dec.indexOf(':') + 1);
      if ((await sha(pw)) === HASH) return;
    } catch (e) {}
  }
  return new Response('Password required', { status: 401, headers: { 'WWW-Authenticate': 'Basic realm="TM360 Tour App", charset="UTF-8"', 'Cache-Control': 'no-store' } });
}
