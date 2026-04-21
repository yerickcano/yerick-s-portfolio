# bot-whatsapp

Servicio puente de WhatsApp (BuilderBot + Baileys) para enviar mensajes desde tu app en Vercel.

## Qué hace

- Mantiene una sesión **live** de WhatsApp Web (Baileys).
- Expone endpoint HTTP:
  - `GET /health` → `ok` + `whatsapp.connected` / `whatsapp.phone` cuando Baileys está enlazado (útil en Railway).
  - `POST /v1/messages` → envía un texto a un número.
- Valida que el número exista en WhatsApp (si `BOT_VALIDATE_WHATSAPP_NUMBER=true`).
- Protege el endpoint con token Bearer (`BOT_API_TOKEN`).

## Variables de entorno

**Deploy (Railway + Vercel):** guía paso a paso con bloques listos para pegar en **[SETUP-ENV.md](./SETUP-ENV.md)** (token con `openssl`, volumen, variables de la app).

**Local:** copia `.env.example` a `.env`:

```bash
cp .env.example .env
```

Variables:

- `PORT` (default `3001`)
- `BOT_API_TOKEN` (**obligatorio en producción**)
- `BOT_USE_PAIRING_CODE` (`true|false`)
- `BOT_PHONE_NUMBER` (si `BOT_USE_PAIRING_CODE=true`)
- `BOT_EXPERIMENTAL_STORE` (`true|false`)
- `BOT_TIME_RELEASE_MS` — `0` por defecto (sin limpieza periódica en carpeta de sesión; recomendado en Railway). Valores > 0 activan un timer del proveedor.
- `BOT_VALIDATE_WHATSAPP_NUMBER` (`true|false`, default `true`)

## Ejecutar local (sin Docker)

```bash
yarn install
yarn dev
```

## Ejecutar con Docker Compose

```bash
docker compose up --build
```

La primera vez verás QR/pairing en logs. Mantén volumen `./fuller_bot_sessions` (o el nombre de sesión que configures) para persistir sesión.

## Probar endpoint

```bash
curl -X POST http://localhost:3001/v1/messages \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer change-this-token" \
  -d '{"number":"50688887777","message":"Nuevo Pedido"}'
```

## Contrato del endpoint

El bot **no** conoce tipos de notificación: solo reenvía `message` a `number`. La app (Vercel) compone el texto; **cambiar copy o añadir avisos no obliga a redesplegar este contenedor** mientras se use el mismo `POST` con JSON.

### Request

`POST /v1/messages`

```json
{
  "number": "50688887777",
  "message": "Nuevo Pedido"
}
```

### Response OK

```json
{
  "ok": true,
  "sentTo": "50688887777",
  "normalized": "50688887777",
  "jid": "50688887777@s.whatsapp.net"
}
```

### Errores comunes

- `401` token inválido/ausente
- `400` payload inválido (`number` o `message`)
- `404` número no existe en WhatsApp
- `500` error al enviar

## Deploy barato recomendado

### Railway (paso a paso)

Este repo es monorepo: el servicio vive en la carpeta **`bot-whatsapp/`**. La imagen Docker usa **`yarn run start`** (sin `--watch`).

1. **Cuenta y proyecto**  
   Entra en [Railway](https://railway.app), crea un proyecto y elige **Deploy from GitHub repo** (o conecta el repo si aún no está vinculado).

2. **Nuevo servicio desde el mismo repo**  
   Añade un servicio y selecciona **el mismo repositorio**. En **Settings → Source** (o al crear el servicio), define **Root Directory** = `bot-whatsapp`. Así el build usa el `Dockerfile` de esa carpeta.

3. **Build**  
   En **Settings → Build**, confirma que el modo sea **Dockerfile** (Railway suele detectarlo). El `Dockerfile` instala `git` (y certificados TLS) en la imagen base slim, copia `.yarnrc` (necesario para **Yarn Classic** con dependencias `sharp` / `@img/sharp-*`), luego `yarn install --frozen-lockfile` y copia `src/` a la imagen (necesario para `node src/index.mjs`). Sin `git`, Yarn puede fallar al resolver dependencias que vienen de repositorios remotos; sin `.yarnrc` y los paquetes nativos de **sharp** para Linux, el contenedor puede arrancar y fallar al cargar `sharp`.

4. **Variables de entorno**  
   En **Variables**, añade al menos:

   | Variable | Notas |
   |----------|--------|
   | `BOT_API_TOKEN` | Obligatorio en producción: mismo valor que pondrás en Vercel como `WHATSAPP_PROVIDER_API_KEY` (Bearer). Genera un token largo aleatorio. |
   | `BOT_USE_PAIRING_CODE` | `false` para QR en logs, `true` para código de emparejamiento (requiere `BOT_PHONE_NUMBER`). |
   | `BOT_PHONE_NUMBER` | Solo si pairing: ej. `50688887777` (solo dígitos + código país). |
   | `BOT_SESSION_NAME` | Opcional; default `fuller_bot`. La carpeta de sesión será `<nombre>_sessions`. |

   Opcionales: `BOT_EXPERIMENTAL_STORE`, `BOT_TIME_RELEASE_MS`, `BOT_DEFAULT_COUNTRY_CODE`.  
   **`PORT`:** Railway la inyecta sola; no hace falta definirla salvo que quieras forzar otro puerto (el código ya usa `process.env.PORT`).

5. **Volumen persistente (imprescindible)**  
   Sin disco persistente, cada redeploy te pedirá de nuevo QR/pairing. En el servicio: **Settings → Volumes** → **Add volume**.  
   - **Mount path:** `/app/fuller_bot_sessions` (si usas `BOT_SESSION_NAME=fuller_bot`; si cambias el nombre, usa `/app/<BOT_SESSION_NAME>_sessions`).  
   Eso coincide con el volumen del `docker-compose` local (`fuller_bot_sessions` en la raíz del servicio → en la imagen queda bajo `/app`).

6. **Primera conexión WhatsApp**  
   Despliega y abre **Deployments → View logs**. Con `BOT_USE_PAIRING_CODE=false`, escanea el **QR** cuando aparezca. Con `true`, sigue el flujo de código en pantalla/logs. Una vez guardada la sesión en el volumen, los reinicios no deberían pedir QR de nuevo.

7. **Dominio público**  
   En **Settings → Networking → Generate domain** (o custom domain). Anota la URL HTTPS, por ejemplo `https://tu-servicio.up.railway.app`.

8. **Conectar la app (Vercel u otro)**  
   En el proyecto Next.js:

   - `WHATSAPP_NOTIFICATIONS_ENABLED=true`  
   - `WHATSAPP_PROVIDER_BASE_URL=https://tu-servicio.up.railway.app` (sin barra final)  
   - `WHATSAPP_PROVIDER_API_KEY=<mismo BOT_API_TOKEN>`  
   - `WHATSAPP_PROVIDER_MESSAGE_PATH` solo si cambias la ruta (default `/v1/messages`).

9. **Comprobar**  
   `curl https://tu-servicio.up.railway.app/health` → `ok` y, si ya vinculaste WhatsApp, `whatsapp.connected: true` y `whatsapp.phone`.  
   Luego `POST /v1/messages` con `Authorization: Bearer …` y body de prueba (ver sección “Probar endpoint”).

**Notas:** Mantén **una sola instancia** para esta sesión de Baileys; escalar horizontalmente con la misma sesión no está soportado. Si el plan duerme el servicio, los envíos fallarán hasta que vuelva a estar arriba.

#### La sesión “se cae” o pide QR otra vez

- **Volumen** en `/app/fuller_bot_sessions` (sin él, cada deploy = sesión nueva).
- **Una sola réplica** (dos instancias compiten y WhatsApp desconecta una).
- **No desvincular** el dispositivo en WhatsApp → Dispositivos vinculados.
- **`BOT_TIME_RELEASE_MS=0`** en Railway (por defecto en código; si tenías `10800000`, cámbialo a `0`).
- **`GET /health`:** si `whatsapp.connected` es `false` tras vincular, el socket no está arriba (revisa logs / redeploy).

### Logs: `ERROR AUTH` (Baileys / WhatsApp)

Ese mensaje **no** es el token `BOT_API_TOKEN` de la API HTTP. Indica que **Baileys no pudo mantener la sesión de WhatsApp** (cierre de conexión “crítico”, demasiados reintentos, excepción al iniciar, etc.).

En versiones recientes del bot, **justo debajo** deberías ver líneas que empiezan por `[bot-whatsapp] WhatsApp auth/session error:` con el **motivo real** (antes BuilderBot mostraba `undefined` por un desajuste entre el proveedor y el handler).

**Qué hacer:**

1. **Volumen**  
   Confirma que el volumen está montado en **`/app/fuller_bot_sessions`** (o `/app/<BOT_SESSION_NAME>_sessions` si cambiaste el nombre). Sin volumen persistente, cada arranque empieza “en frío” y WhatsApp pide login otra vez.

2. **Primera vinculación**  
   Con `BOT_USE_PAIRING_CODE=false`, abre los **logs en vivo** y busca **`ACTION REQUIRED`** / instrucciones de **QR**; también puedes abrir en el navegador la raíz del servicio (`GET /`) para ver **`fuller_bot.qr.png`** cuando exista (la imagen se genera en `/app`). Escanea con WhatsApp → Dispositivos vinculados.  
   Con `BOT_USE_PAIRING_CODE=true`, define `BOT_PHONE_NUMBER` y acepta la notificación en el móvil; el **código de emparejamiento** sale en logs.

3. **Si el error menciona “Critical connection error” o códigos de desconexión**  
   Revisa **`baileys.log`** dentro del contenedor (`/app/baileys.log`): el proveedor lo escribe ahí. Muchas veces basta con **borrar la carpeta de sesión en el volumen** y volver a vincular (sesión corrupta, logout desde el teléfono, o conflicto por dos instancias).

4. **No pongas `NODE_ENV=test` en Railway**  
   BuilderBot silencia casi todos los logs en test, incluido el texto útil del error.

5. **Orden de logs en Railway**  
   A veces mezcla líneas de **dos despliegues** (ves “listening” y luego “Starting Container”); filtra por el deployment más reciente o por `[bot-whatsapp]`.

Hasta que Baileys quede autenticado, `POST /v1/messages` puede fallar aunque `/health` responda bien.

#### `Status code: 405` + `Connection Failure`

Es un fallo **al abrir el socket con los servidores de WhatsApp**, no de tu API HTTP. Suele pasar cuando la **versión de WhatsApp Web** (tupla) que usa el socket **no coincide** con la que exige Meta ([issues en Baileys](https://github.com/WhiskeySockets/Baileys/issues?q=405+Connection+Failure)).

**Comportamiento actual del bot:** al arrancar intenta **`fetchLatestWaWebVersion()`** (Baileys lee `https://web.whatsapp.com/sw.js` y construye `[2, 3000, client_revision]`). En logs verás `Using fetchLatestWaWebVersion(): …`. Requiere que el contenedor pueda hacer **HTTPS saliente** a `web.whatsapp.com`.

**Si sigue fallando (en orden):**

1. Revisa que Railway **no bloquee** tráfico saliente a `web.whatsapp.com` (poco habitual).

2. En **Variables**, fuerza tupla manual: **`BOT_WA_WEB_VERSION=2,3000,<revisión>`** — la revisión la sacan issues/recientes de Baileys.

3. Opcional: **`BOT_FETCH_WA_WEB_VERSION=false`** solo si quieres la versión embebida en BuilderBot (no recomendado).

4. **Borra la sesión en el volumen** y **redeploy** si cambiaste de versión y la sesión quedó inconsistente.

5. **Una sola réplica** y red estable.

### Otras plataformas (resumen)

- **Render:** Docker + disco persistente para la sesión (free tier con sleep no recomendado para Baileys).
- **Fly.io:** Docker + volume persistente; buen equilibrio precio/rendimiento.

## Opciones baratas (resumen rápido)

- **Railway**: muy simple para arrancar; costo bajo para 1 instancia pequeña.
- **Render**: también fácil; free tier suele dormir instancias (no recomendado para Baileys), usar plan pago básico.
- **Fly.io**: excelente costo/rendimiento con volume persistente; algo más técnico de configurar.
- **VPS (Hetzner/Contabo)**: normalmente lo más barato a largo plazo si administras servidor.

> Importante: el bot debe estar **siempre encendido**. Vercel no sirve para este proceso live de Baileys.
