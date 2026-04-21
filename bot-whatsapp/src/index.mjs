import 'dotenv/config';
import { createBot, createFlow, createProvider, MemoryDB, addKeyword, EVENTS } from '@builderbot/bot';
import { BaileysProvider } from '@builderbot/provider-baileys';
import { fetchLatestWaWebVersion } from 'baileys';

const PORT = Number(process.env.PORT ?? '3001');
const API_TOKEN = (process.env.BOT_API_TOKEN ?? '').trim();
const USE_PAIRING_CODE = process.env.BOT_USE_PAIRING_CODE === 'true';
const PHONE_NUMBER = process.env.BOT_PHONE_NUMBER?.trim();
const SESSION_NAME = (process.env.BOT_SESSION_NAME ?? 'fuller_bot').trim();
const EXPERIMENTAL_STORE = process.env.BOT_EXPERIMENTAL_STORE === 'true';
/** Session cleanup interval for provider temp files; 0 = disabled (recommended on Railway). */
const TIME_RELEASE_MS = Number.parseInt(process.env.BOT_TIME_RELEASE_MS ?? '0', 10);
const COUNTRY_CODE = (process.env.BOT_DEFAULT_COUNTRY_CODE ?? '506').replace(/\D/g, '') || '506';

/**
 * Baileys "Connection Failure" with status 405 often means the WA Web version tuple is stale.
 * - Optional override: BOT_WA_WEB_VERSION=2,3000,1027934701
 * - By default we call fetchLatestWaWebVersion() (reads web.whatsapp.com/sw.js) unless BOT_FETCH_WA_WEB_VERSION=false.
 */
function parseWaWebVersionFromEnv() {
  const raw = process.env.BOT_WA_WEB_VERSION?.trim();
  if (!raw) return undefined;
  const parts = raw.split(/[.,\s]+/).map((s) => Number.parseInt(s.trim(), 10));
  if (parts.length !== 3 || parts.some((n) => !Number.isFinite(n))) {
    console.warn('[bot-whatsapp] Ignoring BOT_WA_WEB_VERSION: expected three integers (e.g. 2,3000,1027934701)');
    return undefined;
  }
  return parts;
}

async function resolveWaWebVersion() {
  const fromEnv = parseWaWebVersionFromEnv();
  if (fromEnv) {
    console.log('[bot-whatsapp] Using BOT_WA_WEB_VERSION:', fromEnv.join(','));
    return fromEnv;
  }

  if (process.env.BOT_FETCH_WA_WEB_VERSION === 'false') {
    return undefined;
  }

  try {
    const { version, isLatest, error } = await fetchLatestWaWebVersion();
    if (isLatest && Array.isArray(version) && version.length === 3) {
      console.log('[bot-whatsapp] Using fetchLatestWaWebVersion():', version.join(','));
      return version;
    }
    console.warn(
      '[bot-whatsapp] fetchLatestWaWebVersion did not return a fresh tuple; BuilderBot default may fail with 405.',
      error?.message || error || ''
    );
  } catch (e) {
    console.warn('[bot-whatsapp] fetchLatestWaWebVersion failed; BuilderBot default may fail with 405.', e);
  }
  return undefined;
}

function normalizePhone(raw) {
  const digits = String(raw ?? '').replace(/\D/g, '');
  if (!digits) return null;
  if (digits.length === 8) return `${COUNTRY_CODE}${digits}`;
  if (digits.length < 8) return null;
  return digits;
}

function requireAuth(req) {
  if (!API_TOKEN) return true;
  const authHeader = req.headers?.authorization;
  const value = Array.isArray(authHeader) ? authHeader[0] : authHeader;
  if (!value) return false;
  return value === `Bearer ${API_TOKEN}`;
}

async function main() {
  if (USE_PAIRING_CODE && !PHONE_NUMBER) {
    throw new Error('BOT_PHONE_NUMBER is required when BOT_USE_PAIRING_CODE=true');
  }

  const flow = createFlow([
    addKeyword(EVENTS.WELCOME).addAction(async () => {
      // Bridge service: no conversational logic required.
    }),
  ]);

  const waVersion = await resolveWaWebVersion();

  const provider = createProvider(BaileysProvider, {
    name: SESSION_NAME,
    experimentalStore: EXPERIMENTAL_STORE,
    timeRelease: Number.isFinite(TIME_RELEASE_MS) && TIME_RELEASE_MS >= 0 ? TIME_RELEASE_MS : 0,
    ...(USE_PAIRING_CODE ? { usePairingCode: true, phoneNumber: PHONE_NUMBER } : {}),
    ...(waVersion ? { version: waVersion } : {}),
  });

  const { handleCtx, httpServer } = await createBot({
    flow,
    provider,
    database: new MemoryDB(),
  });

  // BuilderBot wires auth_failure to a handler that expects `{ instructions }`, but
  // @builderbot/provider-baileys emits a string[] — so logs show "ERROR AUTH" + "undefined".
  // Log the real lines for Railway/operators (connection closed, max retries, etc.).
  provider.on('auth_failure', (payload) => {
    const lines = Array.isArray(payload) ? payload : payload?.instructions;
    if (Array.isArray(lines) && lines.length) {
      console.error('[bot-whatsapp] WhatsApp auth/session error:\n', lines.join('\n'));
    } else if (payload != null) {
      console.error('[bot-whatsapp] WhatsApp auth/session error:', payload);
    }
  });

  provider.server.get('/health', (_, res) => {
    const sock = provider.vendor;
    const wid = sock?.user?.id;
    const connected = typeof wid === 'string' && wid.length > 0;
    const phone = connected ? String(wid).split(':')[0] : null;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        ok: true,
        whatsapp: {
          connected,
          ...(phone ? { phone } : {}),
        },
      })
    );
  });

  provider.server.post(
    '/v1/messages',
    handleCtx(async (bot, req, res) => {
      if (!requireAuth(req)) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'Unauthorized' }));
      }

      const body = req.body ?? {};
      const number = normalizePhone(body.number ?? '');
      const message = String(body.message ?? '').trim();

      if (!number || !message) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'Invalid payload: number and message are required' }));
      }

      try {
        const lookup = await provider.vendor.onWhatsApp(`${number}@s.whatsapp.net`);
        const exists = Array.isArray(lookup) && lookup[0]?.exists === true;
        if (!exists) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          return res.end(
            JSON.stringify({
              message: 'Target number is not registered on WhatsApp',
              number,
            })
          );
        }

        await bot.sendMessage(number, message, {});
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(
          JSON.stringify({
            ok: true,
            sentTo: number,
            normalized: number,
            jid: `${number}@s.whatsapp.net`,
          })
        );
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to send WhatsApp message';
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: errorMessage }));
      }
    })
  );

  httpServer(PORT);
  console.log(`bot-whatsapp listening on :${PORT}`);
}

main().catch((error) => {
  console.error('bot-whatsapp startup error:', error);
  process.exit(1);
});
