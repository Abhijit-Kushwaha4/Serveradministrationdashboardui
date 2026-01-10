
const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

const adBlockList = [
  'doubleclick.net',
  'google-analytics.com',
  'googletagmanager.com',
  'googlesyndication.com',
  'adservice.google.com',
  'connect.facebook.net',
  'platform.twitter.com',
  'scorecardresearch.com',
  'cr-input.mxpnl.com',
];

const userAgents = {
  desktop: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
  iphone: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.5 Mobile/15E148 Safari/605.1',
  ipad: 'Mozilla/5.0 (iPad; CPU OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/103.0.5060.63 Mobile/15E148 Safari/605.1',
  googlebot: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
};

const rewriteUrls = (html, baseUrl) => {
  if (!html) return '';
  const base = new URL(baseUrl);
  const regex = /(src|href|action)=["'](\/[^/][^"']*)["']/g;
  return html.replace(regex, `$1="${base.origin}$2"`);
};

export default async function handler(req, res) {
  const { url, noScript, userAgent: uaKey = 'desktop' } = req.query;

  if (!url || !url.startsWith('http')) {
    return res.status(400).json({ error: 'Invalid URL provided.' });
  }

  let browser = null;

  try {
    browser = await puppeteer.launch({
      args: chrome.args,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
    });

    const page = await browser.newPage();

    await page.setRequestInterception(true);
    page.on('request', (request) => {
      const requestUrl = request.url();
      if (adBlockList.some(domain => requestUrl.includes(domain))) {
        request.abort();
      } else {
        request.continue();
      }
    });
    
    const userAgent = userAgents[uaKey] || userAgents.desktop;
    await page.setUserAgent(userAgent);

    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9',
    });

    await page.setJavaScriptEnabled(noScript !== 'true');

    const response = await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 20000,
    });

    const status = response.status();
    if (status >= 400) {
      throw new Error(`Upstream site returned status: ${status}`);
    }

    const pageTitle = await page.title();
    let html = await page.content();
    html = rewriteUrls(html, url);

    if (noScript === 'true') {
      html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
    }

    // --- DIAGNOSTIC FIX ---
    // 3. Aggressively strip security headers that prevent iframe rendering.
    res.removeHeader('X-Frame-Options');
    res.removeHeader('Content-Security-Policy');
    res.removeHeader('X-Content-Type-Options');
    // --- END FIX ---

    res.status(200).json({
      html,
      title: pageTitle,
      finalUrl: page.url(),
      headers: response.headers(),
      status: status
    });

  } catch (error) {
    console.error('[BROWSER_PROXY_ERROR]', error);
    res.status(500).json({ 
        error: 'Proxy failed to load the page.',
        message: error.message 
    });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
