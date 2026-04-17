# SEO Action Plan — yerick.me
**Generated:** 2026-04-16  
**Current Score:** 67 / 100  
**Target Score:** 85+ / 100

Items are ordered within each priority tier by estimated impact per effort.

---

## CRITICAL — Fix immediately (blocks impressions or breaks social sharing)

---

### C1. Create the missing OG image

**Problem:** `/og-image.jpg` is referenced in `og:image` and `twitter:images` but returns HTTP 404. Every link share on LinkedIn, WhatsApp, Twitter/X, Slack, and Discord shows a blank card.

**Fix:** Create a 1200×630 px image and save it to `/public/og-image.jpg`.

Suggested content: dark/white background with name, title, and location in large text, plus the CR red accent color from the brand. Can be designed in Figma, Canva, or generated programmatically.

After adding the file, verify at:
- https://www.yerick.me/og-image.jpg (direct URL — should return an image)
- https://developers.facebook.com/tools/debug/ (Facebook/LinkedIn scraper)
- https://cards-dev.twitter.com/validator (Twitter card preview)

**Files to change:** Add `public/og-image.jpg`

---

### C2. Add hreflang tags for ES and EN

**Problem:** The site defaults to Spanish and has a client-side EN toggle, but no `hreflang` tags are emitted. Google indexes only the Spanish version and will not serve English content to English-language searchers. This cuts off a large potential audience.

**Fix:** Add `alternates.languages` to the metadata in `app/layout.tsx`:

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://www.yerick.me"),
  title: "Yerick Cano | Full Stack Software Engineer · Costa Rica",
  description:
    "Full Stack Software Engineer based in Costa Rica. 4 years building products people actually use. Available for freelance projects.",
  alternates: {
    canonical: "https://www.yerick.me",
    languages: {
      "es": "https://www.yerick.me",
      "en": "https://www.yerick.me",
      "x-default": "https://www.yerick.me",
    },
  },
  // ... rest unchanged
};
```

This renders as:
```html
<link rel="alternate" hreflang="es" href="https://www.yerick.me" />
<link rel="alternate" hreflang="en" href="https://www.yerick.me" />
<link rel="alternate" hreflang="x-default" href="https://www.yerick.me" />
```

**Files to change:** `app/layout.tsx`

---

## HIGH — Fix within 1 week (significant ranking and visibility impact)

---

### H1. Include the job title in the H1 tag

**Problem:** The H1 in `Hero.tsx` is only `"Yerick Cano"`. The role `"Ingeniero de Software Full Stack"` / `"Full Stack Software Engineer"` is in a `<p>` tag above it. The H1 is the highest-weight on-page keyword signal — it currently only contains a proper noun that has no search volume.

**Fix:** Change the H1 content in `components/Hero.tsx` to include the role. The visual design can stay identical; only the HTML structure changes.

Current code (lines 34–43 in Hero.tsx):
```tsx
<motion.p ...>
  {h.role}
</motion.p>

<motion.h1 ...>
  Yerick
  <br />
  <span className="text-cr-red">Cano</span>
</motion.h1>
```

Replacement:
```tsx
<motion.h1 ...>
  Yerick{" "}
  <span className="text-cr-red">Cano</span>
  <span className="sr-only"> — {h.role}</span>
</motion.h1>
<motion.p ...
  className="text-cr-red font-semibold text-xs tracking-[0.2em] uppercase mb-5"
  aria-hidden="true"
>
  {h.role}
</motion.p>
```

This keeps the visual unchanged (the `<p>` stays visually where it is) while the H1 gains the keyword via a screen-reader-only span. Alternatively, combine fully:

```tsx
<motion.h1 ...>
  Yerick <span className="text-cr-red">Cano</span>
  <br />
  <span className="block text-2xl sm:text-3xl font-semibold text-gray-700 mt-2">
    {h.role}
  </span>
</motion.h1>
```

**Files to change:** `components/Hero.tsx`, `lib/i18n.ts` (no change needed there)

---

### H2. Add Schema.org Service/ItemList for the Packages section

**Problem:** The JSON-LD only has a `Person` type with a single `Offer`. Google cannot generate rich results (price cards, service snippets) for the five pricing tiers.

**Fix:** Add a second JSON-LD block in `app/layout.tsx` for the services. Paste this immediately after the existing `<script type="application/ld+json">` block:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Web Development Packages by Yerick Cano",
      "url": "https://www.yerick.me/#packages",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "Service",
            "name": "Professional Page",
            "description": "Single-page professional website. Your name, photo, services, and contact info. Live in 24–48 hours.",
            "provider": { "@type": "Person", "name": "Yerick Cano" },
            "offers": {
              "@type": "Offer",
              "price": "99",
              "priceCurrency": "USD",
              "priceSpecification": { "@type": "UnitPriceSpecification", "billingDuration": "P1Y", "description": "One-time payment" }
            }
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "Service",
            "name": "Digital Presence",
            "description": "Full website with Google indexing, contact form, WhatsApp integration, and custom domain. Delivered in 1–2 weeks.",
            "provider": { "@type": "Person", "name": "Yerick Cano" },
            "offers": {
              "@type": "Offer",
              "lowPrice": "199",
              "highPrice": "499",
              "priceCurrency": "USD"
            }
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@type": "Service",
            "name": "Business Growth",
            "description": "CMS-enabled site in Spanish and English, WhatsApp chatbot, automations, Google Analytics. Delivered in 3–5 weeks.",
            "provider": { "@type": "Person", "name": "Yerick Cano" },
            "offers": {
              "@type": "Offer",
              "lowPrice": "999",
              "highPrice": "1999",
              "priceCurrency": "USD"
            }
          }
        },
        {
          "@type": "ListItem",
          "position": 4,
          "item": {
            "@type": "Service",
            "name": "Web Application",
            "description": "Custom web app with authentication, admin panel, database, third-party integrations, and full documentation.",
            "provider": { "@type": "Person", "name": "Yerick Cano" },
            "offers": {
              "@type": "Offer",
              "lowPrice": "2999",
              "highPrice": "5999",
              "priceCurrency": "USD"
            }
          }
        },
        {
          "@type": "ListItem",
          "position": 5,
          "item": {
            "@type": "Service",
            "name": "Platform / Marketplace",
            "description": "Full marketplace with buyer/seller/admin roles, PWA, AI chatbot, real-time GPS, Sinpe Móvil payments.",
            "provider": { "@type": "Person", "name": "Yerick Cano" },
            "offers": {
              "@type": "Offer",
              "lowPrice": "6999",
              "highPrice": "15000",
              "priceCurrency": "USD"
            }
          }
        }
      ]
    }),
  }}
/>
```

**Files to change:** `app/layout.tsx`

---

### H3. Enrich the Person schema

**Problem:** The current `Person` JSON-LD is missing several properties that strengthen the knowledge graph entity: current employer, telephone, and work examples.

**Fix:** Update the existing Person JSON-LD in `app/layout.tsx`:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Yerick Cano",
  "jobTitle": "Full Stack Software Engineer",
  "url": "https://www.yerick.me",
  "image": {
    "@type": "ImageObject",
    "url": "https://www.yerick.me/pfp.jpg",
    "width": 288,
    "height": 288
  },
  "sameAs": [
    "https://github.com/yerickcano",
    "https://www.linkedin.com/in/yerickcano"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "CR",
    "addressRegion": "Limón, Costa Rica"
  },
  "email": "yerickcanogarcia@gmail.com",
  "telephone": "+50687571891",
  "worksFor": {
    "@type": "Organization",
    "name": "Fuller",
    "url": "https://fuller.express"
  },
  "knowsAbout": [
    "React", "Next.js", "TypeScript", "Node.js", "PostgreSQL",
    "Full Stack Development", "Web Application Development",
    "Software Architecture", "Marketplace Platforms"
  ],
  "hasOccupation": {
    "@type": "Occupation",
    "name": "Full Stack Software Engineer",
    "occupationLocation": {
      "@type": "Country",
      "name": "Costa Rica"
    },
    "estimatedSalary": {
      "@type": "MonetaryAmountDistribution",
      "currency": "USD",
      "percentile10": 99,
      "percentile90": 15000,
      "unitText": "PROJECT"
    }
  }
}
```

**Files to change:** `app/layout.tsx`

---

### H4. Add resource hints for Google Fonts and external domains

**Problem:** No `preconnect` hints for Google Fonts CDN. Also no `dns-prefetch` for frequently-linked external domains. This adds latency before the Inter font and external resources can be fetched.

**Fix:** Add `other` metadata to `layout.tsx` for link tags that Next.js doesn't handle automatically:

```typescript
// app/layout.tsx — inside the metadata export
export const metadata: Metadata = {
  // ... existing fields ...
  other: {
    // These render as <link> tags in <head>
  },
};
```

Since Next.js `Metadata` API doesn't expose arbitrary `<link>` tags cleanly, add these directly in the `<head>` via the layout's JSX:

```tsx
// app/layout.tsx — inside the <html> return
<html lang="es" className={`${inter.variable} scroll-smooth`}>
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link rel="dns-prefetch" href="https://wa.me" />
    <link rel="dns-prefetch" href="https://github.com" />
    <link rel="dns-prefetch" href="https://www.linkedin.com" />
  </head>
  <body className="antialiased">
    ...
  </body>
</html>
```

**Files to change:** `app/layout.tsx`

---

### H5. Add an H2 heading to the Skills section

**Problem:** `components/Skills.tsx` has no `<h2>` tag — the section heading is a `<p>` eyebrow element. This breaks the page outline and leaves the skills content disconnected from the document hierarchy.

**Fix:** In `components/Skills.tsx`, after the eyebrow `<p>`, add an H2:

Current (line 26–28):
```tsx
<p className="text-cr-red font-semibold text-xs tracking-[0.2em] uppercase mb-6">
  {sk.eyebrow}
</p>
```

Replace with:
```tsx
<p className="text-cr-red font-semibold text-xs tracking-[0.2em] uppercase mb-2">
  {sk.eyebrow}
</p>
<h2 className="text-2xl font-bold text-gray-900 mb-6 sr-only">{sk.heading}</h2>
```

Add to `lib/i18n.ts` under both `en.skills` and `es.skills`:
```typescript
// en
skills: {
  eyebrow: "Skills",
  heading: "Technical Skills",  // add this
  groupLabels: ["Frontend", "Backend", "Tools"],
},
// es
skills: {
  eyebrow: "Habilidades",
  heading: "Habilidades técnicas",  // add this
  groupLabels: ["Frontend", "Backend", "Herramientas"],
},
```

The `sr-only` class makes it invisible visually while present in the DOM outline.

**Files to change:** `components/Skills.tsx`, `lib/i18n.ts`

---

## MEDIUM — Fix within 1 month (optimisation and authority improvements)

---

### M1. Expand llms.txt with quantitative signals and project outcomes

**Problem:** The current `llms.txt` lists projects and services but lacks the outcome-driven facts that AI models cite when answering questions about developers or services.

**Fix:** Replace `/public/llms.txt` with the following enhanced version:

```markdown
# Yerick Cano — Full Stack Software Engineer
> Building software that creates real opportunities for people. Based in Costa Rica.
Last updated: 2026-04-16

## About
Full Stack Software Engineer with 4 years of professional experience.
Currently: Software Engineer at Fuller (Nov 2025–present), Limón, Costa Rica.
Previous: Software Engineer at Snowflake (2 yrs 6 mos, Feb 2023–Jul 2025), San José, Costa Rica.
Previous: Software Engineer at Mobilize.Net (8 mos, Jul 2022–Feb 2023), remote.
Specializes in: React, Next.js, TypeScript, Node.js, PostgreSQL, Tailwind CSS, Supabase, Vercel.
Speaks: Spanish (native), English (professional).

## Projects
- Fuller (https://fuller.express): Delivery platform for Costa Rica's Caribbean coast (Limón region). First delivery service in the region. Created a new local economy connecting restaurants, drivers, and customers. Built with React, TypeScript, Next.js, Vercel, Supabase, Railway.
- SnowConvert (https://docs.snowflake.com/en/migrations/snowconvert-docs/overview): Enterprise SQL migration tool for Snowflake. Used by companies worldwide to migrate SQL codebases to Snowflake SQL. Built at Snowflake/Mobilize.Net using JavaScript, React, TypeScript, SQL.
- BusCaribe (https://buscaribe.vercel.app): Modern bus schedule app for the Caribbean coast of Costa Rica. Rebuilt broken regional transit website from scratch. Reached 500 users on launch day. Built with Next.js.
- ProCard: Professional website template for accountants and service professionals. Private project.

## Services (https://www.yerick.me/#packages)
Freelance web development services. All packages are one-time fees unless noted.
- Professional Page: $99 — single-page site, 24–48 hour delivery
- Digital Presence: $199–$499 — full site with Google indexing, delivered in 1–2 weeks
- Business Growth: $999–$1,999 — CMS + chatbot + automation, delivered in 3–5 weeks
- Web Application: $2,999–$5,999 — custom app with auth, admin panel, database
- Platform/Marketplace: $6,999–$15,000+ — full marketplace with real-time features, AI, payments
Add-ons available: monthly maintenance ($80–$200/mo), AI chatbot upgrade ($600–$1,200), Sinpe Móvil integration ($400–$800).

## Contact
- GitHub: https://github.com/yerickcano
- LinkedIn: https://www.linkedin.com/in/yerickcano
- Email: yerickcanogarcia@gmail.com
- WhatsApp: https://wa.me/50687571891
- Website: https://www.yerick.me
```

**Files to change:** `public/llms.txt`

---

### M2. Update the meta description to match the Spanish-first page

**Problem:** The meta description is in English (`"Full Stack Software Engineer based in Costa Rica..."`) but the page renders in Spanish by default. Google may flag this as a language mismatch, especially since `<html lang="es">`.

**Option A — Keep English description (recommended for international reach):**
Change `<html lang="es">` to `<html lang="en">` and treat Spanish as the secondary language toggle. This aligns the HTML language with the meta description and makes the English version the canonical one indexed by Google.

**Option B — Add a Spanish meta description as the primary:**
```typescript
description: "Ingeniero de Software Full Stack en Costa Rica. 4 años construyendo productos que las personas realmente usan. Disponible para proyectos freelance.",
```

**Recommended:** Option A — change `lang="es"` to `lang="en"` in `layout.tsx` since the metadata and schema are all in English and Google Ads/search traffic for "freelance developer Costa Rica" is predominantly English-language.

**Files to change:** `app/layout.tsx` (change `lang="es"` to `lang="en"`)

---

### M3. Add WorkExample / CreativeWork schema for each project

**Problem:** The Projects section has no structured data. Adding `CreativeWork` or `WebApplication` schema enables richer Google results for individual project searches.

**Fix:** Add to `app/layout.tsx`:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Projects by Yerick Cano",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "WebApplication",
            "name": "Fuller",
            "url": "https://fuller.express",
            "description": "Delivery platform for Costa Rica's Caribbean coast. Created a new local economy connecting restaurants, drivers, and customers.",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web, iOS, Android",
            "author": { "@type": "Person", "name": "Yerick Cano" },
            "keywords": ["delivery", "Costa Rica", "Caribbean", "Limón", "marketplace"]
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "WebApplication",
            "name": "BusCaribe",
            "url": "https://buscaribe.vercel.app",
            "description": "Modern bus schedule app for the Caribbean coast of Costa Rica. Reached 500 users on launch day.",
            "applicationCategory": "TransportationApplication",
            "author": { "@type": "Person", "name": "Yerick Cano" },
            "keywords": ["bus schedule", "Costa Rica", "Caribbean", "public transit"]
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@type": "SoftwareApplication",
            "name": "SnowConvert",
            "url": "https://docs.snowflake.com/en/migrations/snowconvert-docs/overview",
            "description": "Enterprise SQL migration tool for Snowflake. Used worldwide to accelerate cloud data transformation.",
            "applicationCategory": "DeveloperApplication",
            "author": { "@type": "Organization", "name": "Snowflake" },
            "contributor": { "@type": "Person", "name": "Yerick Cano" }
          }
        }
      ]
    }),
  }}
/>
```

**Files to change:** `app/layout.tsx`

---

### M4. Reduce Framer Motion bundle size with LazyMotion

**Problem:** All components import from `framer-motion` directly, loading the full bundle even for animations that are only needed on scroll. This increases JavaScript parse time and can hurt LCP.

**Fix:** Wrap the app in `LazyMotion` with the `domAnimation` subset. In `app/providers.tsx`, add:

```tsx
import { LazyMotion, domAnimation } from "framer-motion";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <LangProvider>{children}</LangProvider>
    </LazyMotion>
  );
}
```

Then in each component, replace:
```tsx
import { motion } from "framer-motion";
```
with:
```tsx
import { m } from "framer-motion";
```
And replace all `<motion.div>` with `<m.div>`, `<motion.h1>` with `<m.h1>`, etc.

This reduces the Framer Motion JS payload by approximately 30KB gzipped.

**Files to change:** `app/providers.tsx`, all `components/*.tsx`

---

### M5. Add security headers to next.config.ts

**Problem:** No custom HTTP security headers are defined in `next.config.ts`. Vercel sets some defaults, but adding explicit headers improves security posture (and is a minor Google signal).

**Fix:** Add to `next.config.ts`:

```typescript
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};
```

**Files to change:** `next.config.ts`

---

### M6. Add project images to the Projects section

**Problem:** Project cards are text-only. No screenshots or thumbnails mean no Google Image Search traffic and weaker visual E-E-A-T.

**Fix:** Add a 600×400 px screenshot for Fuller and BusCaribe (both have live public URLs).

1. Capture screenshots of `fuller.express` and `buscaribe.vercel.app`.
2. Save as `/public/projects/fuller.jpg` and `/public/projects/buscaribe.jpg`.
3. In `components/Projects.tsx`, add to each `projectsMeta` entry an `image` field.
4. Render a Next.js `<Image>` in each card above the title, with alt text like `"Fuller delivery platform — Costa Rica Caribbean coast"`.

**Files to change:** `components/Projects.tsx`, add `/public/projects/*.jpg`

---

### M7. Add testimonials or a social proof section

**Problem:** No client testimonials, reviews, or endorsements exist anywhere on the page. This is the weakest E-E-A-T dimension.

**Fix:** Add a minimal testimonials section between Projects and Packages. Even 2–3 short quotes from past clients (obtained via WhatsApp/email) would significantly strengthen the Trust dimension. Include:
- Client name and role/company
- A 1–2 sentence quote about the engagement outcome
- A star rating (`AggregateRating` schema)

This also enables `AggregateRating` schema on the Person entity, which can trigger star snippets in search results.

**Files to change:** Add `components/Testimonials.tsx`, update `app/page.tsx`, `lib/i18n.ts`, `app/layout.tsx`

---

## LOW — Backlog (polish, minor improvements)

---

### L1. Remove unused scaffold files from /public

**Problem:** The Next.js scaffold created `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, and `window.svg` in `/public`. None are imported or used in any component. They add noise.

**Fix:** Delete these five files:
- `public/file.svg`
- `public/globe.svg`
- `public/next.svg`
- `public/vercel.svg`
- `public/window.svg`

**Files to change:** Delete listed files

---

### L2. Add a WebSite schema with SearchAction

**Problem:** No `WebSite` schema entity exists. This enables Google to display a site-specific search box in search results.

**Fix:** Add to `app/layout.tsx`:

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Yerick Cano — Portfolio",
  "url": "https://www.yerick.me",
  "author": {
    "@type": "Person",
    "name": "Yerick Cano"
  },
  "inLanguage": ["es", "en"]
}
```

**Files to change:** `app/layout.tsx`

---

### L3. Add a privacy policy page

**Problem:** The site collects contact intent (WhatsApp clicks, email clicks) and uses Vercel Analytics. Absence of a privacy policy is a minor trust signal gap, and some EU/GDPR-adjacent contexts require it.

**Fix:** Create `app/privacy/page.tsx` with a basic privacy policy. Add to sitemap.ts:

```typescript
{
  url: "https://www.yerick.me/privacy",
  lastModified: new Date("2026-04-16"),
  changeFrequency: "yearly" as const,
  priority: 0.3,
},
```

**Files to change:** Add `app/privacy/page.tsx`, update `app/sitemap.ts`

---

### L4. Implement dynamic HTML lang attribute

**Problem:** `<html lang="es">` is hardcoded. When a user switches to English via the toggle, the `lang` attribute stays as `"es"`, breaking accessibility for screen readers.

**Fix:** Move `lang` management to a client component that wraps `<html>`. This requires converting `app/layout.tsx` to use a dynamic lang attribute:

```tsx
// app/layout.tsx — change body wrapper
// Pass lang to providers and have providers update document.documentElement.lang
```

Or, simpler: in `context/LangContext.tsx`, add a `useEffect` to update the attribute:

```typescript
useEffect(() => {
  document.documentElement.lang = lang;
}, [lang]);
```

**Files to change:** `context/LangContext.tsx`

---

### L5. Add descriptive aria-labels to the WhatsApp package CTAs

**Problem:** All WhatsApp CTA buttons in `Packages.tsx` use the same label text `"Start on WhatsApp"` / `"Escribir por WhatsApp"`. Screen readers cannot distinguish between them.

**Fix:** In `components/Packages.tsx`, add `aria-label` to each CTA `<a>` tag:

```tsx
<a
  href={`https://wa.me/50687571891?text=...`}
  aria-label={`${pk.cta} — ${pkg.name}`}
  ...
>
```

**Files to change:** `components/Packages.tsx`

---

## Summary Table

| ID | Issue | Category | Effort | Impact |
|---|---|---|---|---|
| C1 | Add og-image.jpg | Images / Technical | 30 min | Critical |
| C2 | Add hreflang tags | Technical SEO | 15 min | Critical |
| H1 | Include role in H1 | On-Page SEO | 20 min | High |
| H2 | Add Service/ItemList schema | Schema | 45 min | High |
| H3 | Enrich Person schema | Schema | 20 min | High |
| H4 | Add preconnect hints | Performance | 10 min | High |
| H5 | Add H2 to Skills section | On-Page SEO | 15 min | High |
| M1 | Expand llms.txt | AI Readiness | 20 min | Medium |
| M2 | Align HTML lang with meta desc | Technical SEO | 5 min | Medium |
| M3 | Add CreativeWork project schema | Schema | 30 min | Medium |
| M4 | LazyMotion bundle reduction | Performance | 60 min | Medium |
| M5 | Add security headers | Technical SEO | 15 min | Medium |
| M6 | Add project screenshots | Images / Content | 60 min | Medium |
| M7 | Add testimonials section | Content / E-E-A-T | 120 min | Medium |
| L1 | Delete unused scaffold SVGs | Housekeeping | 5 min | Low |
| L2 | Add WebSite schema | Schema | 10 min | Low |
| L3 | Add privacy policy page | Technical / Trust | 30 min | Low |
| L4 | Dynamic HTML lang attribute | Accessibility | 15 min | Low |
| L5 | Descriptive aria-labels on CTAs | Accessibility | 10 min | Low |
