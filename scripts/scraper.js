// visitcostarica Hotel Scraper
// Usage: node scraper.js hotels.csv
// Input CSV must have columns: "Hotel Name" and "Hotel Link"
// Output: hotels_enriched.csv

const https = require('https');
const fs = require('fs');

// ── CSV helpers ──────────────────────────────────────────────────────────────

function parseCSV(text) {
  const lines = text.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  return lines.slice(1).map(line => {
    const cols = line.match(/(".*?"|[^,]+)(?=,|$)/g) || [];
    const row = {};
    headers.forEach((h, i) => {
      row[h] = (cols[i] || '').trim().replace(/^"|"$/g, '');
    });
    return row;
  });
}

function toCSV(rows) {
  if (!rows.length) return '';
  const headers = Object.keys(rows[0]);
  const escape = v => `"${String(v).replace(/"/g, '""')}"`;
  return [
    headers.join(','),
    ...rows.map(r => headers.map(h => escape(r[h] || '')).join(','))
  ].join('\n');
}

// ── Fetch a URL as text ──────────────────────────────────────────────────────

function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; research-bot/1.0)',
        'Accept-Language': 'es'
      }
    }, res => {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchPage(res.headers.location).then(resolve).catch(reject);
      }
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve(body));
    });
    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

// ── Extract fields from raw HTML ─────────────────────────────────────────────

function extractData(html) {
  // Phone — <a href="tel:...">
  const phoneMatch = html.match(/href="tel:([^"]+)"/);
  const phone = phoneMatch ? phoneMatch[1].trim() : '';

  // Email — <a href="mailto:...">
  const emailMatch = html.match(/href="mailto:([^"]+)"/);
  const email = emailMatch ? emailMatch[1].trim() : '';

  // Website — <a href="...">Página web</a>  (skip internal links)
  const webMatch = html.match(/href="(https?:\/\/[^"]+)"[^>]*>\s*(?:<[^>]+>\s*)*Página web/i);
  const website = webMatch ? webMatch[1].trim() : '';

  // Region — second <a> sibling after the tel: link in the same contact div
  const regionMatch = html.match(/href="tel:[^"]*"[^>]*>[^<]*<\/a>\s*<a[^>]*>([^<]+)<\/a>/i);
  const region = regionMatch ? regionMatch[1].trim() : '';

  return { phone, email, website, region };
}

// ── Sleep helper ─────────────────────────────────────────────────────────────

const sleep = ms => new Promise(r => setTimeout(r, ms));

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const inputFile = process.argv[2];
  if (!inputFile) {
    console.error('Usage: node scraper.js hotels.csv');
    process.exit(1);
  }

  const raw = fs.readFileSync(inputFile, 'utf8');
  const hotels = parseCSV(raw);
  console.log(`Loaded ${hotels.length} hotels from ${inputFile}`);

  // Detect column names flexibly
  const sample = hotels[0];
  const nameKey = Object.keys(sample).find(k => /name/i.test(k)) || Object.keys(sample)[0];
  const linkKey = Object.keys(sample).find(k => /link|url|href/i.test(k)) || Object.keys(sample)[1];
  console.log(`Using columns: name="${nameKey}", link="${linkKey}"`);

  const results = [];

  for (let i = 0; i < hotels.length; i++) {
    const hotel = hotels[i];
    const name = hotel[nameKey];
    let url = hotel[linkKey];

    // Ensure absolute URL
    if (url && !url.startsWith('http')) {
      url = 'https://es.visitcostarica.com' + (url.startsWith('/') ? '' : '/') + url;
    }

    process.stdout.write(`[${i + 1}/${hotels.length}] ${name} ... `);

    if (!url) {
      console.log('SKIP (no URL)');
      results.push({ name, url: '', phone: '', email: '', website: '', region: '', status: 'no_url' });
      continue;
    }

    try {
      const html = await fetchPage(url);
      const { phone, email, website, region } = extractData(html);
      console.log(`OK — phone:${phone || '—'} email:${email ? '✓' : '—'} web:${website ? '✓' : '—'} region:${region || '—'}`);
      results.push({ name, url, phone, email, website, region, status: 'ok' });
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
      results.push({ name, url, phone: '', email: '', website: '', region: '', status: 'error' });
    }

    // Polite delay — 1.5s between requests
    if (i < hotels.length - 1) await sleep(1500);
  }

  const outFile = inputFile.replace(/\.csv$/i, '_enriched.csv');
  fs.writeFileSync(outFile, toCSV(results), 'utf8');
  console.log(`\nDone. Saved ${results.length} rows to ${outFile}`);

  // Quick summary
  const ok = results.filter(r => r.status === 'ok').length;
  const withPhone = results.filter(r => r.phone).length;
  const withEmail = results.filter(r => r.email).length;
  const withWeb = results.filter(r => r.website).length;
  console.log(`\nSummary:`);
  console.log(`  Scraped OK : ${ok}/${hotels.length}`);
  console.log(`  Has phone  : ${withPhone}`);
  console.log(`  Has email  : ${withEmail}`);
  console.log(`  Has website: ${withWeb}`);
}

main().catch(err => { console.error(err); process.exit(1); });