
const https = require('https');

const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15',
];

export default function handler(req, res) {
  const destinationUrl = 'https://bytes.com';

  const options = {
    method: req.method,
    headers: {
      ...req.headers,
      'User-Agent': USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)],
      // Scrubbing headers
      'X-Forwarded-For': undefined,
      'X-Real-IP': undefined,
      'Via': undefined,
      'Referer': undefined,
      // The host header needs to be set to the destination
      host: new URL(destinationUrl).host,
    },
  };

  const proxyReq = https.request(destinationUrl + req.url.replace('/api/tunnel', ''), options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxyReq.on('error', (err) => {
    console.error('Proxy request error:', err);
    res.status(500).send('Proxy request error');
  });

  req.pipe(proxyReq, { end: true });
}
