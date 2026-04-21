# Variables de entorno: Railway (bot) y Vercel (app)

No puedes dejar el bot sin configurar en producción: al menos **`BOT_API_TOKEN`** y el **volumen de sesión**. La app Next necesita las variables `WHATSAPP_*` para llamar al bot.

---

## 1. Generar el token compartido (una sola vez)

En tu terminal (cualquier máquina):

```bash
openssl rand -hex 32
```

Copia el resultado. Ese valor será:

- En **Railway** → `BOT_API_TOKEN`
- En **Vercel** → `WHATSAPP_PROVIDER_API_KEY` (el mismo string)

---

## 2. Railway — dónde ponerlas

1. Abre el proyecto en [Railway](https://railway.app).
2. Entra al **servicio** del bot (no el de la web si tienes varios).
3. Pestaña **Variables** (o **Settings → Variables**).
4. Añade cada fila (nombre = valor). También puedes usar **RAW Editor** y pegar el bloque de abajo.

### Valores mínimos (recomendado para empezar con QR)

Sustituye `PEGA_AQUI_EL_TOKEN_OPENSSL` por el token del paso 1.

```env
BOT_API_TOKEN=PEGA_AQUI_EL_TOKEN_OPENSSL
BOT_USE_PAIRING_CODE=false
BOT_SESSION_NAME=fuller_bot
BOT_EXPERIMENTAL_STORE=true
BOT_TIME_RELEASE_MS=0
BOT_DEFAULT_COUNTRY_CODE=506
```

### Si prefieres código de emparejamiento (sin QR en pantalla)

```env
BOT_API_TOKEN=PEGA_AQUI_EL_TOKEN_OPENSSL
BOT_USE_PAIRING_CODE=true
BOT_PHONE_NUMBER=50688887777
BOT_SESSION_NAME=fuller_bot
BOT_EXPERIMENTAL_STORE=true
BOT_TIME_RELEASE_MS=0
BOT_DEFAULT_COUNTRY_CODE=506
```

(Cambia `50688887777` por el número del WhatsApp que vincularás, solo dígitos con código país.)

### Versión de WhatsApp Web (error 405 / Connection Failure)

Por defecto el bot ya intenta **obtener la versión actual** al arrancar (`fetchLatestWaWebVersion`). No hace falta variable salvo que falle la red o quieras fijarla a mano:

```env
# Opcional: desactivar la consulta a web.whatsapp.com (no recomendado)
# BOT_FETCH_WA_WEB_VERSION=false

# Opcional: tupla manual si Meta cambió y el fetch falla
# BOT_WA_WEB_VERSION=2,3000,1027934701
```

**No** hace falta definir `PORT`: Railway la asigna (por ejemplo 8080).

### Volumen (obligatorio para no perder la sesión)

En el mismo servicio: **Settings → Volumes → Add volume**

- **Mount path:** `/app/fuller_bot_sessions`

(Equivale a `BOT_SESSION_NAME=fuller_bot` → carpeta `fuller_bot_sessions`.)

Después de guardar variables y volumen: **Redeploy** el servicio.

---

## 3. Vincular WhatsApp

1. Abre **Deployments → último deploy → View logs**.
2. Con `BOT_USE_PAIRING_CODE=false`, busca el QR en logs o abre en el navegador:  
   `https://TU-DOMINIO-RAILWAY.up.railway.app/`  
   (sirve `fuller_bot.qr.png` cuando ya se generó).
3. WhatsApp en el móvil → **Dispositivos vinculados** → escanear.

---

## 4. Vercel (app Next.js) — notificaciones al crear pedido

En el proyecto de la web: **Settings → Environment Variables** (Production y Preview si quieres probar en preview).

Sustituye:

- `PEGA_TOKEN_IGUAL_QUE_RAILWAY` = el mismo token que `BOT_API_TOKEN`
- `https://tu-bot.up.railway.app` = la URL pública del servicio bot (**sin** `/` al final), la de **Networking → Generate domain**

```env
WHATSAPP_NOTIFICATIONS_ENABLED=true
WHATSAPP_PROVIDER_BASE_URL=https://tu-bot.up.railway.app
WHATSAPP_PROVIDER_MESSAGE_PATH=/v1/messages
WHATSAPP_PROVIDER_API_KEY=PEGA_TOKEN_IGUAL_QUE_RAILWAY
WHATSAPP_PROVIDER_TIMEOUT_MS=5000
```

Guarda y **Redeploy** la app en Vercel para que cargue las variables.

---

## 5. Comprobar

```bash
curl -s https://tu-bot.up.railway.app/health
```

Debe responder algo como `{"ok":true}`.

Prueba envío (mismo token que en Railway):

```bash
curl -s -X POST https://tu-bot.up.railway.app/v1/messages \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer PEGA_AQUI_EL_TOKEN_OPENSSL" \
  -d '{"number":"506XXXXXXXX","message":"Prueba FULLER"}'
```

---

## Resumen rápido

| Dónde | Variable | Debe coincidir con |
|-------|----------|-------------------|
| Railway | `BOT_API_TOKEN` | Vercel `WHATSAPP_PROVIDER_API_KEY` (mismo valor) |
| Vercel | `WHATSAPP_PROVIDER_BASE_URL` | URL HTTPS del servicio bot en Railway |

Más contexto: `README.md` en esta carpeta y `PROJECT.md` en la raíz del monorepo.
