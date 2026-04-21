import { makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } from 'baileys';
import qrcode from 'qrcode-terminal';
import { Boom } from '@hapi/boom';
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const CSV_FILE = process.env.OUTREACH_CSV ?? path.join(ROOT, 'puerto_viejo.csv');
const AUTH_DIR = path.join(ROOT, 'auth_info_outreach');
const LOG_FILE = path.join(ROOT, 'outreach_log.csv');
const DAILY_LIMIT = 50;
const DELAY_MIN_MS = 30 * 60 * 1000;
const DELAY_MAX_MS = 60 * 60 * 1000;

// ─── CSV ──────────────────────────────────────────────────────────────────────

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

function parseCSV(filePath) {
  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/).filter(Boolean);
  const headers = parseCSVLine(lines[0]).map(h => h.trim());
  return lines.slice(1).map(line => {
    const vals = parseCSVLine(line);
    return Object.fromEntries(headers.map((h, i) => [h, (vals[i] ?? '').trim()]));
  });
}

function appendLog(entry) {
  if (!fs.existsSync(LOG_FILE)) {
    fs.writeFileSync(LOG_FILE, 'name,mobile,message_version,status,timestamp\n', 'utf8');
  }
  const row = [entry.name, entry.mobile, entry.message_version, entry.status, entry.timestamp]
    .map(v => `"${String(v).replace(/"/g, '""')}"`)
    .join(',');
  fs.appendFileSync(LOG_FILE, row + '\n', 'utf8');
}

// ─── Leads ────────────────────────────────────────────────────────────────────

function buildMessage(lead) {
  const name = lead.name ?? '';
  if (!lead.website) {
    return {
      version: 'A',
      text: `Hola, mi nombre es Yerick. Me especializo en crear sitios web y automatización de mensajes para hospedajes en el Caribe costarricense — muchos negocios como ${name} están perdiendo reservas directas por no tener presencia web y por no dar abasto con los mensajes. Le comparto un ejemplo de lo que podríamos hacer: https://tourism-online.vercel.app ¿Le interesaría conversar?`,
    };
  }
  return {
    version: 'B',
    text: `Hola, mi nombre es Yerick. Me especializo en automatización de redes sociales para hospedajes en el Caribe — ¿le gustaría que en ${name} dejen de responder mensajes manualmente y se enfoquen en sus huéspedes? Le comparto mi trabajo: https://yerick.me ¿Le interesa conversar?`,
  };
}

function formatJID(raw) {
  const digits = String(raw).replace(/\D/g, '');
  const number = digits.length === 8 ? `506${digits}` : digits;
  return `${number}@s.whatsapp.net`;
}

// Returns deduplicated list of { number, jid } for a lead (whatsapp + mobile columns).
function getNumbers(lead) {
  const seen = new Set();
  const out = [];
  for (const raw of [lead.whatsapp, lead.mobile]) {
    if (!raw) continue;
    const digits = raw.replace(/\D/g, '');
    if (!digits) continue;
    const number = digits.length === 8 ? `506${digits}` : digits;
    if (seen.has(number)) continue;
    seen.add(number);
    out.push({ number, jid: `${number}@s.whatsapp.net` });
  }
  return out;
}

function todaySentCount() {
  if (!fs.existsSync(LOG_FILE)) return 0;
  const today = new Date().toISOString().slice(0, 10);
  return fs.readFileSync(LOG_FILE, 'utf8')
    .split('\n').slice(1).filter(Boolean)
    .filter(l => l.includes(today) && l.includes('"sent"')).length;
}

// ─── Prompt ───────────────────────────────────────────────────────────────────

function ask(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => rl.question(question, ans => { rl.close(); resolve(ans); }));
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ─── WhatsApp ─────────────────────────────────────────────────────────────────

async function connectWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);
  const { version } = await fetchLatestBaileysVersion();

  return new Promise((resolve, reject) => {
    function createSocket() {
      const sock = makeWASocket({
        version,
        auth: state,
        printQRInTerminal: false,
        browser: ['OutreachBot', 'Chrome', '1.0.0'],
      });

      sock.ev.on('creds.update', saveCreds);

      sock.ev.on('connection.update', ({ connection, lastDisconnect, qr }) => {
        if (qr) {
          console.log('\nScan this QR code with WhatsApp → Linked Devices:\n');
          qrcode.generate(qr, { small: true });
        }
        if (connection === 'open') {
          console.log('[outreach] WhatsApp connected.\n');
          resolve(sock);
        }
        if (connection === 'close') {
          const code = new Boom(lastDisconnect?.error)?.output?.statusCode;
          if (code === DisconnectReason.loggedOut) {
            reject(new Error('Logged out — delete auth_info_outreach and re-run.'));
          } else if (code === DisconnectReason.restartRequired || code === 515) {
            console.log('[outreach] Restarting connection...');
            createSocket();
          } else {
            reject(new Error(`Connection closed (${code})`));
          }
        }
      });
    }

    createSocket();
  });
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  if (!fs.existsSync(CSV_FILE)) {
    console.error(`[outreach] CSV not found: ${CSV_FILE}`);
    process.exit(1);
  }

  const rows = parseCSV(CSV_FILE).filter(r => r.whatsapp || r.mobile);
  if (!rows.length) {
    console.log('[outreach] No leads with a whatsapp or mobile number found.');
    process.exit(0);
  }

  // Expand each lead into individual sends (one per number), respecting daily limit.
  const leads = rows.map(r => ({ ...r, ...buildMessage(r) }));
  const alreadySent = todaySentCount();
  const remaining = DAILY_LIMIT - alreadySent;

  if (remaining <= 0) {
    console.log('[outreach] Daily limit of 50 messages already reached today. Exiting.');
    process.exit(0);
  }

  // Flat list of sends: { lead, number, jid }
  const allSends = [];
  for (const lead of leads) {
    for (const num of getNumbers(lead)) {
      allSends.push({ lead, ...num });
    }
  }
  const toSend = allSends.slice(0, remaining);

  console.log('\n=== Outreach Summary ===');
  console.log(`CSV            : ${CSV_FILE}`);
  console.log(`Total leads    : ${leads.length}`);
  console.log(`Total sends    : ${allSends.length} (leads × numbers)`);
  console.log(`Sent today     : ${alreadySent}`);
  console.log(`Will send      : ${toSend.length} (cap: ${DAILY_LIMIT}/day)`);
  console.log(`  Version A (no website) : ${toSend.filter(s => s.lead.version === 'A').length}`);
  console.log(`  Version B (has website): ${toSend.filter(s => s.lead.version === 'B').length}`);
  console.log('\nQueue:');
  toSend.forEach((s, i) =>
    console.log(`  ${String(i + 1).padStart(2)}. [${s.lead.version}] ${s.lead.name} — ${s.number}`)
  );
  console.log('\nDelay between sends: 30–60 min random');
  console.log('========================\n');

  const answer = await ask('Proceed? (Y/N): ');
  if (answer.trim().toLowerCase() !== 'y') {
    console.log('[outreach] Aborted.');
    process.exit(0);
  }

  console.log('\n[outreach] Connecting to WhatsApp...');
  const sock = await connectWhatsApp();

  let sent = 0;
  for (let i = 0; i < toSend.length; i++) {
    const { lead, number, jid } = toSend[i];
    const timestamp = new Date().toISOString();

    try {
      const lookup = await sock.onWhatsApp(jid);
      const exists = Array.isArray(lookup) && lookup[0]?.exists === true;

      if (!exists) {
        console.log(`[outreach] — Skipped ${lead.name} (${number}): not on WhatsApp`);
        appendLog({ name: lead.name, mobile: number, message_version: lead.version, status: 'not_on_wa', timestamp });
        continue;
      }

      await sock.sendMessage(jid, { text: lead.text });
      console.log(`[outreach] ✓ Sent to ${lead.name} (${number}) — Version ${lead.version}`);
      appendLog({ name: lead.name, mobile: number, message_version: lead.version, status: 'sent', timestamp });
      sent++;
    } catch (err) {
      console.error(`[outreach] ✗ Failed: ${lead.name} (${number}) —`, err.message);
      appendLog({ name: lead.name, mobile: number, message_version: lead.version, status: 'failed', timestamp });
    }

    if (alreadySent + sent >= DAILY_LIMIT) {
      console.log('\n[outreach] Daily limit reached (50). Stopping.');
      break;
    }

    if (i < toSend.length - 1) {
      const waitMs = Math.floor(Math.random() * (DELAY_MAX_MS - DELAY_MIN_MS + 1)) + DELAY_MIN_MS;
      const waitMin = Math.round(waitMs / 60000);
      console.log(`[outreach] Waiting ${waitMin} min before next message...`);
      await delay(waitMs);
    }
  }

  console.log(`\n[outreach] Done. Sent ${sent} message(s) this session.`);
  process.exit(0);
}

main().catch(err => {
  console.error('[outreach] Fatal:', err.message);
  process.exit(1);
});
