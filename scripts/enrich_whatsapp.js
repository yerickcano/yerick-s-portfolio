// enrich_whatsapp.js
// Usage: node enrich_whatsapp.js hotels_enriched.csv
// Output: hotels_whatsapp.csv

const https = require('https');
const http = require('http');
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

// ── Fetch ────────────────────────────────────────────────────────────────────

function fetchPage(url, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 5) return reject(new Error('too many redirects'));
    const lib = url.startsWith('https') ? https : http;
    const req = lib.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; research-bot/1.0)',
        'Accept': 'text/html'
      }
    }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const next = res.headers.location.startsWith('http')
          ? res.headers.location
          : new URL(res.headers.location, url).href;
        res.resume();
        return fetchPage(next, redirectCount + 1).then(resolve).catch(reject);
      }
      if (res.statusCode >= 400) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve(body));
    });
    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

// ── Extract WhatsApp / mobile ────────────────────────────────────────────────

// CR mobile: 8 digits starting with 6, 7, or 8 (optionally preceded by +506 or 506)
const CR_MOBILE_RE = /(?:\+?506\s?)?([678]\d{7})/g;

function extractWaMe(html) {
  const match = html.match(/href=["']https?:\/\/wa\.me\/(\d+)["']/i);
  if (match) return match[1];
  // also catch wa.me without protocol
  const match2 = html.match(/href=["']wa\.me\/(\d+)["']/i);
  return match2 ? match2[1] : '';
}

function extractMobile(html) {
  // Collect all tel: hrefs
  const telRe = /href=["']tel:([^"']+)["']/gi;
  let m;
  while ((m = telRe.exec(html)) !== null) {
    const raw = m[1].replace(/[\s\-().]/g, '');
    // Try to find a CR mobile within the raw string
    const inner = raw.match(/(?:(?:\+?506)?([678]\d{7}))/);
    if (inner) return inner[1];
  }
  return '';
}

function extractWhatsApp(html) {
  const whatsapp = extractWaMe(html);
  const mobile = extractMobile(html);
  return { whatsapp, mobile };
}

// ── Build contact page URL ───────────────────────────────────────────────────

function contactUrl(base) {
  try {
    const u = new URL(base);
    // try /contacto first (more common in CR), then /contact
    return [
      `${u.protocol}//${u.host}/contacto`,
      `${u.protocol}//${u.host}/contact`
    ];
  } catch {
    return [];
  }
}

// ── Sleep ────────────────────────────────────────────────────────────────────

const sleep = ms => new Promise(r => setTimeout(r, ms));

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const inputFile = process.argv[2] || 'hotels_enriched.csv';
  const raw = fs.readFileSync(inputFile, 'utf8');
  const hotels = parseCSV(raw);
  console.log(`Loaded ${hotels.length} rows from ${inputFile}`);

  const results = [];
  let countWa = 0;
  let countMobile = 0;

  for (let i = 0; i < hotels.length; i++) {
    const hotel = { ...hotels[i], whatsapp: '', mobile: '' };
    const siteUrl = hotel.website;

    process.stdout.write(`[${i + 1}/${hotels.length}] ${hotel.name} ... `);

    if (!siteUrl) {
      console.log('SKIP (no website)');
      results.push(hotel);
      continue;
    }

    let found = { whatsapp: '', mobile: '' };

    try {
      // 1. Try homepage
      const homeHtml = await fetchPage(siteUrl);
      found = extractWhatsApp(homeHtml);

      // 2. If nothing found, try contact pages
      if (!found.whatsapp && !found.mobile) {
        const candidates = contactUrl(siteUrl);
        for (const cu of candidates) {
          try {
            const contactHtml = await fetchPage(cu);
            found = extractWhatsApp(contactHtml);
            if (found.whatsapp || found.mobile) break;
          } catch {
            // contact page doesn't exist, skip silently
          }
        }
      }

      hotel.whatsapp = found.whatsapp;
      hotel.mobile = found.mobile;

      if (found.whatsapp) countWa++;
      if (found.mobile) countMobile++;

      console.log(`OK — wa:${found.whatsapp || '—'} mobile:${found.mobile || '—'}`);
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
    }

    results.push(hotel);

    if (i < hotels.length - 1) await sleep(2000);
  }

  const outFile = inputFile.replace(/\.csv$/i, '').replace(/_enriched$/, '') + '_whatsapp.csv';
  fs.writeFileSync(outFile, toCSV(results), 'utf8');

  console.log(`\nDone. Saved ${results.length} rows to ${outFile}`);
  console.log(`\nSummary:`);
  console.log(`  WhatsApp links : ${countWa}`);
  console.log(`  Mobile numbers : ${countMobile}`);
}

main().catch(err => { console.error(err); process.exit(1); });
