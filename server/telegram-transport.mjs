import https from 'node:https';

// This VPS has IPv4 connectivity and no working IPv6 route.
export async function telegramFetch(url, options) {
  const request = new Request(url, options);
  const body = Buffer.from(await request.arrayBuffer());
  const headers = Object.fromEntries(request.headers);
  headers['content-length'] = String(body.length);

  return new Promise((resolve, reject) => {
    const upstream = https.request(request.url, {
      family: 4,
      method: request.method,
      headers,
      signal: request.signal,
    }, response => {
      const chunks = [];
      response.on('data', chunk => chunks.push(chunk));
      response.on('error', reject);
      response.on('end', () => resolve({
        ok: response.statusCode >= 200 && response.statusCode < 300,
        json: async () => JSON.parse(Buffer.concat(chunks).toString('utf8')),
      }));
    });
    upstream.on('error', reject);
    upstream.end(body);
  });
}
