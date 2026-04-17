# Full SEO Audit Report — yerick.me
**Audited:** 2026-04-16  
**Site:** https://www.yerick.me  
**Subject:** Yerick Cano — Full Stack Software Engineer, Costa Rica  
**Technology:** Next.js 16 + Tailwind CSS + Framer Motion, deployed on Vercel

---

## Overall SEO Health Score: 67 / 100

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 72 | 15.8 |
| Content Quality | 23% | 70 | 16.1 |
| On-Page SEO | 20% | 68 | 13.6 |
| Schema / Structured Data | 10% | 55 | 5.5 |
| Performance | 10% | 72 | 7.2 |
| AI Search Readiness | 10% | 60 | 6.0 |
| Images | 5% | 55 | 2.75 |
| **Total** | **100%** | — | **67 / 100** |

---

## Top 5 Critical Issues

1. **OG image is 404** — `/og-image.jpg` does not exist in `/public`. Every social share produces a broken preview card, directly hurting click-through from LinkedIn, WhatsApp, and Twitter.
2. **No hreflang tags** — The site renders in Spanish by default with a client-side ES/EN toggle, but zero `hreflang` alternate tags are emitted. Google treats it as a monolingual Spanish page and will not serve the English version to English-language searchers.
3. **Thin/absent structured data for services** — The JSON-LD only covers `Person`. There is no `Service`, `ItemList`, or `Offer` schema for the five pricing packages, leaving rich-result eligibility on the table.
4. **Single-URL sitemap** — The sitemap lists only the root URL with no section anchors and no `<image:image>` entries. Googlebot has no explicit signal for section content depth.
5. **No `<link rel="preconnect">` hints** — Google Fonts (Inter) and Vercel Analytics are loaded without preconnect hints, adding unnecessary DNS + TLS round-trip latency before the LCP element renders.

---

## Top 5 Quick Wins

1. Add `og-image.jpg` to `/public` (1200×630 px).
2. Add `hreflang` alternate tags in `layout.tsx` for `es` and `en`.
3. Add `ServiceList` JSON-LD block for the five packages.
4. Add `<link rel="preconnect" href="https://fonts.googleapis.com">` and `https://fonts.gstatic.com` to the `<head>`.
5. Expand `llms.txt` with quantitative authority signals (Snowflake tenure, BusCaribe user count, Fuller geography).

---

## 1. Technical SEO (Score: 72 / 100, Weight: 22%)

### 1.1 HTTPS
- **Pass.** The site is served over HTTPS at `https://www.yerick.me`. The canonical URL in `layout.tsx` correctly uses `https://www.yerick.me`.

### 1.2 robots.txt
- **Pass.** `robots.txt` is generated via `app/robots.ts` and returns:
  ```
  User-Agent: *
  Allow: /
  Sitemap: https://www.yerick.me/sitemap.xml
  ```
- No crawl blocks. No disallowed paths. Sitemap directive is present and correct.

### 1.3 Sitemap
- **Partial pass.** Sitemap at `/sitemap.xml` contains exactly one URL (`https://www.yerick.me`) with `changefreq: monthly` and `priority: 1`.
- **Issues:**
  - Only one entry. While the site is a SPA/single-page, section anchors (`#about`, `#projects`, `#packages`, `#experience`, `#contact`) are meaningful content destinations that Google can index as fragment URLs.
  - No `<image:image>` block for `pfp.jpg` or project images, so Google Images has no structured signal.
  - `lastModified: new Date()` sets the date dynamically on every build — this is correct behaviour but should be tied to actual content change dates for better crawl budget signalling.

### 1.4 Canonical Tag
- **Pass.** `alternates.canonical` is set to `https://www.yerick.me` in `layout.tsx`. Next.js renders this as `<link rel="canonical" href="https://www.yerick.me" />`.

### 1.5 Meta Tags (Title, Description, Keywords)
- **Title:** `"Yerick Cano | Full Stack Software Engineer · Costa Rica"` — 56 characters. Well within the 50–60 char sweet spot. Includes name, role, and geo-modifier. Pass.
- **Meta description:** `"Full Stack Software Engineer based in Costa Rica. 4 years building products people actually use. Available for freelance projects."` — 130 characters. Good length (under 160). Includes value proposition and CTA signal. Pass.
- **Keywords meta tag:** Present (`["software engineer", "full stack", "Costa Rica", "React", "Next.js", "TypeScript", "freelance developer", "web development"]`). Note: Google ignores this tag for ranking; it has no SEO value but causes no harm.

### 1.6 Open Graph Tags
- **Partial fail.** OG tags are configured in `layout.tsx`:
  - `og:title`, `og:description`, `og:type`, `og:url`, `og:siteName`, `og:locale`, `og:alternateLocale` — all present.
  - `og:image` points to `/og-image.jpg` which returns **HTTP 404**. This is a critical failure: all social shares will render with no preview image.

### 1.7 Twitter Card Tags
- **Partial fail.** `twitter:card`, `twitter:title`, `twitter:description` are set. `twitter:images` also points to the missing `/og-image.jpg`.

### 1.8 Language Declaration
- **Partial pass.** `<html lang="es">` is hardcoded in `layout.tsx`. The site has a client-side ES/EN toggle, but:
  - The `lang` attribute never updates when the user switches to English, so the document will always report as Spanish to screen readers and search engines.
  - No `hreflang` meta/link tags are emitted. Google cannot determine that an English version exists.

### 1.9 PWA / Manifest
- **Pass.** A Web App Manifest is generated via `app/manifest.ts` with proper `name`, `short_name`, `description`, `icons` (192×192 and 512×512), and `display: standalone`. PWA service worker is configured via `@ducanh2912/next-pwa`.

### 1.10 Security Headers
- Not auditable via static analysis alone; Vercel deployments typically add `X-Content-Type-Options`, `X-Frame-Options` by default. No custom `next.config.ts` headers block is present — adding `Strict-Transport-Security` and `Referrer-Policy` in `next.config.ts` would strengthen the security posture.

---

## 2. Content Quality (Score: 70 / 100, Weight: 23%)

### 2.1 E-E-A-T Signals

**Experience (demonstrated):**
- Timeline section lists four real work entries: Fuller (current, Nov 2025–), Snowflake (2 yrs 6 mos), Mobilize.Net (8 mos + 6 mos internship). Company names, roles, locations, and durations are all present. Strong.
- Projects include live URLs (fuller.express, buscaribe.vercel.app, docs.snowflake.com) — verifiable evidence of real work.

**Expertise:**
- Skills section groups 16 named technologies across Frontend/Backend/Tools. Reasonable depth.
- Missing: no formal education credential, no certifications, no GitHub repository count, no measurable impact metrics beyond BusCaribe's "500 users on day one."

**Authoritativeness:**
- LinkedIn and GitHub social profiles are linked. Good.
- No blog posts, no published articles, no external mentions or backlinks visible.
- No testimonials or client quotes anywhere on the page.

**Trustworthiness:**
- Real name, real email, real WhatsApp number displayed.
- Missing: no privacy policy, no terms of service (relevant given the transactional packages section).

### 2.2 Heading Structure
The site renders a single-page layout with the following heading hierarchy (Spanish default):

```
H1: Yerick Cano          (Hero)
H2: Quién soy            (About)
H2: Lo que he construido (Projects)
  H3: Fuller
  H3: SnowConvert
  H3: ProCard
  H3: BusCaribe
H2: Trabajemos juntos    (Packages)
  H3: [each package name]
H2: Trayectoria profesional (Timeline/Experience)
  H3: [each job role]
H2: Habilidades          (Skills — eyebrow only, no H2 rendered)
H2: Conectemos           (Contact)
```

**Issues:**
- The Skills section uses only a `<p>` eyebrow tag — no `<h2>` heading for this section. This section has no heading at all in the DOM, meaning its content is orphaned from the outline.
- The H1 is only the name "Yerick Cano" — the role "Ingeniero de Software Full Stack" is rendered as a `<p>` tag above it, not included in the H1. This is a missed keyword opportunity; the role qualifier should be in the H1.
- All H2 headings are pure Spanish on initial render. Googlebot crawls and indexes the server-rendered HTML, which is always Spanish (default lang is `es` via `useState`). English content only appears after client-side JS runs — Google sees Spanish.

### 2.3 Readability
- Bio text is clear, direct, and first-person. Reading level is accessible.
- Package descriptions are benefit-focused rather than feature-focused — good for conversion and for natural keyword variation.
- Content is bilingual (ES/EN) but the English version is invisible to crawlers.

### 2.4 Thin Content Risk
- The page has substantial content: hero, about, 4 projects with descriptions, 5 packages with full feature lists, 4 experience entries, 16 skills, contact section. Not thin.
- However, because all content is in a single SPA route with anchor navigation, Google indexes it as one page. The projects section could be individual pages to capture long-tail keywords like "Fuller delivery app Costa Rica" or "BusCaribe bus schedule Caribbean."

### 2.5 Duplicate Content
- No duplicate content detected. Single canonical URL with no www/non-www split (canonical enforces www).

---

## 3. On-Page SEO (Score: 68 / 100, Weight: 20%)

### 3.1 Title Tags
- **Pass.** Title `"Yerick Cano | Full Stack Software Engineer · Costa Rica"` is optimal.

### 3.2 Meta Description
- **Pass.** Description `"Full Stack Software Engineer based in Costa Rica. 4 years building products people actually use. Available for freelance projects."` is 130 characters, contains the primary keyword, experience signal, and intent signal ("Available for freelance"). However, it is in English while the default page render is Spanish — a minor mismatch Google may flag.

### 3.3 H1 Tag
- **Issue.** The H1 is `"Yerick Cano"` (just the name). The role label `"Full Stack Software Engineer"` (or `"Ingeniero de Software Full Stack"`) is in a `<p>` tag above it. Best practice is to include the role in the H1: `"Yerick Cano — Full Stack Software Engineer"`.

### 3.4 Internal Linking
- Navigation links (`#about`, `#projects`, `#packages`, `#experience`, `#contact`) are present as anchor links.
- No descriptive anchor text — all links use short labels ("About", "Projects" etc.) rather than keyword-rich text.
- No cross-linking between sections (e.g., Projects section doesn't link to Packages).
- External links to `fuller.express`, `docs.snowflake.com`, `buscaribe.vercel.app` all use `target="_blank" rel="noopener noreferrer"` — correct.

### 3.5 URL Structure
- Single-page with hash navigation. No deep URLs for individual sections, projects, or packages.
- This limits ranking potential for long-tail terms — each project and each service tier could rank independently with its own URL.

### 3.6 Image Optimization (On-Page aspect)
- `pfp.jpg` uses Next.js `<Image>` with `fill`, `priority`, `sizes="(max-width: 640px) 256px, 288px"` — good.
- Alt text: `"Yerick Cano — Full Stack Software Engineer"` — contains primary keyword. Pass.
- No images for project work, which weakens visual E-E-A-T and reduces image search visibility.

### 3.7 CTA Links
- "View Projects" → `#projects` anchor — good.
- "Get in touch" → `#contact` anchor — good.
- WhatsApp CTAs in packages use pre-filled message text via `wa.me` — good for conversion.

---

## 4. Schema / Structured Data (Score: 55 / 100, Weight: 10%)

### 4.1 Current Implementation
A `Person` JSON-LD block is present in `layout.tsx`:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Yerick Cano",
  "jobTitle": "Full Stack Software Engineer",
  "url": "https://www.yerick.me",
  "image": "https://www.yerick.me/pfp.jpg",
  "sameAs": [
    "https://github.com/yerickcano",
    "https://www.linkedin.com/in/yerickcano"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "CR",
    "addressRegion": "Costa Rica"
  },
  "email": "yerickcanogarcia@gmail.com",
  "knowsAbout": ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Full Stack Development"],
  "offers": {
    "@type": "Offer",
    "description": "Freelance software development services",
    "url": "https://www.yerick.me/#packages"
  }
}
```

**Issues with current schema:**
- `"offers"` is a single `Offer` object — should be an `ItemList` of individual `Service` or `Offer` items, each with `name`, `description`, and `price`.
- Missing `worksFor` property (current employer: Fuller).
- Missing `alumniOf` or education data.
- Missing `telephone` even though the WhatsApp number is publicly displayed.
- Missing `hasOccupation` for richer role detail.
- `"image"` points to `pfp.jpg` which is a `.jpg` — valid, but no `ImageObject` wrapper with `width`/`height`.

### 4.2 Missing Schema Types

| Schema Type | Opportunity | Priority |
|---|---|---|
| `ItemList` + `Service` (5 items) | Packages section pricing | High |
| `WebSite` with `SearchAction` | Site-level identity | Medium |
| `ProfessionalService` | Freelance services entity | Medium |
| `WorkExample` / `CreativeWork` | Each project (Fuller, BusCaribe, SnowConvert) | Medium |
| `BreadcrumbList` | Navigation anchors | Low |

---

## 5. Performance (Score: 72 / 100, Weight: 10%)

### 5.1 Image Optimization
- `pfp.jpg` is served via Next.js `<Image>` with `priority` flag and explicit `sizes` — Next.js will generate WebP/AVIF variants automatically. Pass.
- No other raster images on the page (projects section is text-only cards, no screenshots).

### 5.2 Font Loading
- Inter font is loaded from Google Fonts via `next/font/google` with `display: swap` — correct. This avoids FOIT (flash of invisible text).
- **Issue:** No `<link rel="preconnect" href="https://fonts.googleapis.com">` or `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` in `layout.tsx`. Next.js may inject these automatically, but they are not explicitly set in the metadata — worth verifying and adding explicitly.

### 5.3 Third-Party Scripts
- Vercel Analytics (`@vercel/analytics/next`) is loaded. This is lightweight and Vercel-native — minimal performance impact.
- No Google Tag Manager, HubSpot, Intercom, or other heavyweight trackers. Clean.

### 5.4 PWA / Caching
- `@ducanh2912/next-pwa` is configured with `cacheOnFrontEndNav: true` and `aggressiveFrontEndNavCaching: true`. Service worker will cache assets aggressively — good for repeat visits.

### 5.5 JavaScript Bundle
- Framer Motion is the heaviest client-side dependency. All components are `"use client"` with motion animations — this means the full Framer Motion bundle is loaded client-side. Consider using `LazyMotion` with `domAnimation` feature set to reduce bundle size by ~30KB gzipped.
- React Compiler is enabled (`reactCompiler: true` in `next.config.ts`) — this optimises render performance automatically.

### 5.6 Resource Hints
- No `<link rel="preconnect">` for Google Fonts CDN.
- No `<link rel="dns-prefetch">` for external domains (wa.me, github.com, linkedin.com).
- No `<link rel="preload">` for `pfp.jpg` (though the `priority` prop on `<Image>` should trigger this automatically in Next.js).

---

## 6. AI Search Readiness (Score: 60 / 100, Weight: 10%)

### 6.1 llms.txt
- **Present.** `/public/llms.txt` exists and is accessible at `https://www.yerick.me/llms.txt`. This is an above-average implementation — most portfolios do not have this file at all.
- **Content quality:** The file covers About, Projects, Services, and Contact. It is factually accurate and well-structured.
- **Issues:**
  - Missing quantitative authority signals: years at Snowflake (2 yrs 6 mos), number of enterprise clients served by SnowConvert, BusCaribe's 500-user launch milestone.
  - Missing technology depth: the file lists technologies but not architectural patterns (REST APIs, server-side rendering, database design, real-time systems).
  - No description of problem → solution → outcome format for projects — AI models cite sources that tell a complete story.
  - No publication/update date in the file — AI crawlers use recency signals.

### 6.2 Citability
- The page has concrete, verifiable claims: "500 users on day one" (BusCaribe), named employers (Snowflake, Fuller), live project URLs. These are citable facts.
- Missing: no third-party mentions, no press coverage, no blog posts that AI crawlers can cross-reference.
- The bilingual capability is not mentioned in `llms.txt` — this is a unique differentiator.

### 6.3 AI Crawler Access
- `robots.txt` allows all user-agents (`Allow: /`), so GPTBot, ClaudeBot, PerplexityBot, and others can crawl.
- No `llms-full.txt` for extended context — the current `llms.txt` is summary-level.

### 6.4 Brand Mention Signals
- GitHub profile (`@yerickcano`) links to the portfolio — bidirectional signal.
- LinkedIn profile (`in/yerickcano`) links to the portfolio.
- No blog, no dev.to/medium articles, no Stack Overflow activity, no conference talks — weak off-site authority footprint.

---

## 7. Images (Score: 55 / 100, Weight: 5%)

### 7.1 Profile Photo (pfp.jpg)
- **Pass.** Alt text: `"Yerick Cano — Full Stack Software Engineer"` — keyword-rich, descriptive.
- Served via Next.js `<Image>` with `fill`, `priority`, and correct `sizes`. Next.js handles WebP/AVIF conversion automatically.
- File is `pfp.jpg` in `/public` — 256×256 to 288×288 rendered size. If the source file is large, Next.js image optimisation will compress it. Acceptable.

### 7.2 OG Image
- **Critical fail.** `/og-image.jpg` referenced in `og:image` and `twitter:images` does **not exist** in `/public`. The URL returns HTTP 404.
- Impact: Every link share on LinkedIn, Twitter/X, WhatsApp Web, Slack, and Discord will show a broken/blank preview.

### 7.3 Project Images
- No project screenshots or thumbnails anywhere in the Projects section. Each project card is text-only.
- This is a missed opportunity for Google Image Search and for social sharing of individual projects.

### 7.4 Favicon
- `favicon.ico` exists in `/app/` — Next.js serves it automatically. Pass.
- PWA icons (192×192 and 512×512) are present in `/public/icons/`. Pass.

### 7.5 SVG Assets
- `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` are in `/public` — these appear to be Next.js default scaffold files that are not used in any component. They add clutter to the public directory with no benefit.

---

## Appendix: Files Reviewed

| File | Purpose |
|---|---|
| `app/layout.tsx` | Global metadata, JSON-LD schema, HTML lang, fonts |
| `app/page.tsx` | Page composition |
| `app/robots.ts` | robots.txt generation |
| `app/sitemap.ts` | sitemap.xml generation |
| `app/manifest.ts` | Web App Manifest |
| `components/Hero.tsx` | H1, primary CTA, profile image |
| `components/About.tsx` | H2, bio content, values |
| `components/Projects.tsx` | H2, H3s, project cards |
| `components/Packages.tsx` | H2, H3s, pricing cards |
| `components/Timeline.tsx` | H2, H3s, work history |
| `components/Skills.tsx` | Skills (no H2) |
| `components/Contact.tsx` | H2, contact links |
| `components/Navbar.tsx` | Navigation |
| `components/Footer.tsx` | Footer |
| `context/LangContext.tsx` | ES/EN language toggle |
| `lib/i18n.ts` | Full bilingual content strings |
| `public/llms.txt` | AI crawler context file |
| `next.config.ts` | Next.js config, PWA |
| `package.json` | Dependencies |
