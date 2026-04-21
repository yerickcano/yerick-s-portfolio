import nodemailer from 'nodemailer';
import { parse } from 'csv-parse/sync';
import { readFileSync, appendFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const CSV_PATH = join(__dirname, '../hotels_whatsapp.csv');
const LOG_PATH = join(__dirname, 'sent_log.csv');

interface HotelRow {
  name: string;
  email: string;
  website: string;
  region: string;
}

function loadSentEmails(): Set<string> {
  if (!existsSync(LOG_PATH)) return new Set();
  return new Set(
    readFileSync(LOG_PATH, 'utf-8')
      .split('\n')
      .filter(Boolean)
      .map((line) => line.split(',')[0].trim())
  );
}

function markSent(email: string, name: string): void {
  appendFileSync(LOG_PATH, `${email},"${name}",${new Date().toISOString()}\n`);
}

function buildHtml(hotel: HotelRow): string {
  const hasWebsite = !!hotel.website?.trim();
  const websiteLink = `<a href="${hotel.website}">${hotel.website}</a>`;

  const intro = hasWebsite
    ? `<p>Revisé ${websiteLink} y creo que hay oportunidades concretas para mejorar la experiencia de sus visitantes, aumentar las reservas directas y mejorar procesos internos.</p>`
    : `<p>Noté que ${hotel.name} aún no cuenta con sitio web propio &mdash; hoy en día la mayoría de turistas buscan opciones en línea antes de reservar. Puedo ayudarles a tener presencia web profesional rápidamente.</p>`;

  const list = hasWebsite
    ? [
        '<li>Rediseño moderno y rápido (móvil primero)</li>',
        '<li>SEO para aparecer en búsquedas de turistas</li>',
        '<li>Formularios de reserva y contacto</li>',
        '<li><strong>Automatización de mensajes de WhatsApp e Instagram</strong></li>',
        '<li><strong>Organización y automatización de procesos internos (reservas, inventario, reportes)</strong></li>',
        '<li>Soporte y mantenimiento continuo</li>',
      ]
    : [
        '<li><strong>Diseño web moderno y rápido (móvil primero)</strong></li>',
        '<li>SEO para aparecer en búsquedas de turistas</li>',
        '<li><strong>Formularios de reserva y contacto</strong></li>',
        '<li>Automatización de mensajes de WhatsApp e Instagram</li>',
        '<li>Organización y automatización de procesos internos (reservas, inventario, reportes)</li>',
        '<li>Soporte y mantenimiento continuo</li>',
      ];

  const cta = hasWebsite
    ? `<p>Pueden ver mi trabajo en: <a href="https://www.yerick.me" style="color:#0066cc;">www.yerick.me</a></p>`
    : `<p>Le comparto un ejemplo de lo que podríamos hacer: <a href="https://tourism-online.vercel.app" style="color:#0066cc;">tourism-online.vercel.app</a></p>`;

  return [
    '<!DOCTYPE html>',
    '<html lang="es">',
    '<head>',
    '<meta charset="UTF-8">',
    '<meta name="viewport" content="width=device-width,initial-scale=1.0">',
    '</head>',
    '<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:16px;color:#222;line-height:1.6;">',
    `<p>Hola equipo de <strong>${hotel.name}</strong>,</p>`,
    '<p>Mi nombre es Yerick Cano, soy Ingeniero de Software con experiencia en sitios modernos para hoteles y negocios turísticos en Costa Rica.</p>',
    intro,
    '<p>Lo que ofrezco:</p>',
    '<ul>',
    ...list,
    '</ul>',
    '<p>¿Tienen unos minutos para una llamada corta esta semana?</p>',
    cta,
    '<p style="margin-top:32px;">Saludos,<br>',
    '<strong>Yerick Cano García</strong><br>',
    '<span style="color:#555;">Software Engineer | Web Developer</span><br>',
    '<span style="color:#555;">San José, Costa Rica</span><br>',
    '<a href="https://wa.me/50687571891" style="color:#0066cc;">WhatsApp: +506 8757-1891</a><br>',
    '<a href="https://www.yerick.me" style="color:#0066cc;">www.yerick.me</a></p>',
    '<hr style="border:none;border-top:1px solid #eee;margin-top:32px;">',
    '<p style="font-size:11px;color:#999;">Si no desea recibir más correos de mi parte, responda con "no gracias" y lo eliminaré de mi lista de inmediato.</p>',
    '</body>',
    '</html>',
  ].join('\n');
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomDelayMs(minMinutes: number, maxMinutes: number): number {
  return (Math.random() * (maxMinutes - minMinutes) + minMinutes) * 60_000;
}

async function main() {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.error('Missing SMTP_USER or SMTP_PASSWORD in .env');
    process.exit(1);
  }

  const raw = readFileSync(CSV_PATH, 'utf-8');
  const rows = parse(raw, { columns: true, skip_empty_lines: true }) as HotelRow[];

  const withEmail = rows.filter((r) => r.email?.trim());
  const sentEmails = loadSentEmails();
  const pending = withEmail.filter((r) => !sentEmails.has(r.email.trim()));

  console.log(`Hotels with email : ${withEmail.length}`);
  console.log(`Already sent      : ${sentEmails.size}`);
  console.log(`Pending           : ${pending.length}`);

  if (pending.length === 0) {
    console.log('Nothing left to send.');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  for (let i = 0; i < pending.length; i++) {
    const hotel = pending[i];
    const email = hotel.email.trim();

    console.log(`\n[${i + 1}/${pending.length}] → ${hotel.name} <${email}>`);

    try {
      await transporter.sendMail({
        from: `Yerick Cano <${process.env.SMTP_USER}>`,
        to: email,
        subject: `Una idea para ${hotel.name}`,
        html: buildHtml(hotel),
      });
      markSent(email, hotel.name);
      console.log(`  ✓ Sent`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`  ✗ Failed: ${message}`);
    }

    if (i < pending.length - 1) {
      const delay = randomDelayMs(5, 10);
      const minutes = (delay / 60_000).toFixed(1);
      console.log(`  Waiting ${minutes} min before next email...`);
      await sleep(delay);
    }
  }

  console.log('\nAll done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
