import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.yerick.me"),
  title: "Yerick Cano | Full Stack Software Engineer · Costa Rica",
  description:
    "Full Stack Software Engineer based in Costa Rica. 4 years building products people actually use. Available for freelance projects.",
  keywords: [
    "software engineer",
    "full stack",
    "Costa Rica",
    "React",
    "Next.js",
    "TypeScript",
    "freelance developer",
    "web development",
  ],
  authors: [{ name: "Yerick Cano" }],
  alternates: {
    canonical: "https://www.yerick.me",
    languages: {
      es: "https://www.yerick.me",
      en: "https://www.yerick.me",
      "x-default": "https://www.yerick.me",
    },
  },
  openGraph: {
    title: "Yerick Cano | Full Stack Software Engineer",
    description:
      "Building software that creates real opportunities for people. Based in Costa Rica.",
    type: "website",
    url: "https://www.yerick.me",
    siteName: "Yerick Cano Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Yerick Cano — Full Stack Software Engineer",
      },
    ],
    locale: "es_CR",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yerick Cano | Full Stack Software Engineer",
    description:
      "Building software that creates real opportunities for people. Based in Costa Rica.",
    images: ["/og-image.jpg"],
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Yerick Cano",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://wa.me" />
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://www.linkedin.com" />
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Yerick Cano",
              jobTitle: "Full Stack Software Engineer",
              url: "https://www.yerick.me",
              image: {
                "@type": "ImageObject",
                url: "https://www.yerick.me/pfp.jpg",
                width: 288,
                height: 288,
              },
              sameAs: [
                "https://github.com/yerickcano",
                "https://www.linkedin.com/in/yerickcano",
              ],
              address: {
                "@type": "PostalAddress",
                addressCountry: "CR",
                addressRegion: "Limón, Costa Rica",
              },
              email: "yerickcanogarcia@gmail.com",
              telephone: "+50687571891",
              worksFor: {
                "@type": "Organization",
                name: "Fuller",
                url: "https://fuller.express",
              },
              knowsAbout: [
                "React",
                "Next.js",
                "TypeScript",
                "Node.js",
                "PostgreSQL",
                "Full Stack Development",
                "Web Application Development",
                "Software Architecture",
                "Marketplace Platforms",
              ],
              hasOccupation: {
                "@type": "Occupation",
                name: "Full Stack Software Engineer",
                occupationLocation: {
                  "@type": "Country",
                  name: "Costa Rica",
                },
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "Web Development Packages by Yerick Cano",
              url: "https://www.yerick.me/#packages",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  item: {
                    "@type": "Service",
                    name: "Professional Page",
                    description:
                      "Single-page professional website. Your name, photo, services, and contact info. Live in 24–48 hours.",
                    provider: { "@type": "Person", name: "Yerick Cano" },
                    offers: {
                      "@type": "Offer",
                      price: "99",
                      priceCurrency: "USD",
                    },
                  },
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  item: {
                    "@type": "Service",
                    name: "Digital Presence",
                    description:
                      "Full website with Google indexing, contact form, WhatsApp integration, and custom domain. Delivered in 1–2 weeks.",
                    provider: { "@type": "Person", name: "Yerick Cano" },
                    offers: {
                      "@type": "Offer",
                      lowPrice: "199",
                      highPrice: "499",
                      priceCurrency: "USD",
                    },
                  },
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  item: {
                    "@type": "Service",
                    name: "Business Growth",
                    description:
                      "CMS-enabled site in Spanish and English, WhatsApp chatbot, automations, Google Analytics. Delivered in 3–5 weeks.",
                    provider: { "@type": "Person", name: "Yerick Cano" },
                    offers: {
                      "@type": "Offer",
                      lowPrice: "999",
                      highPrice: "1999",
                      priceCurrency: "USD",
                    },
                  },
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  item: {
                    "@type": "Service",
                    name: "Web Application",
                    description:
                      "Custom web app with authentication, admin panel, database, third-party integrations, and full documentation.",
                    provider: { "@type": "Person", name: "Yerick Cano" },
                    offers: {
                      "@type": "Offer",
                      lowPrice: "2999",
                      highPrice: "5999",
                      priceCurrency: "USD",
                    },
                  },
                },
                {
                  "@type": "ListItem",
                  position: 5,
                  item: {
                    "@type": "Service",
                    name: "Platform / Marketplace",
                    description:
                      "Full marketplace with buyer/seller/admin roles, PWA, AI chatbot, real-time GPS, Sinpe Móvil payments.",
                    provider: { "@type": "Person", name: "Yerick Cano" },
                    offers: {
                      "@type": "Offer",
                      lowPrice: "6999",
                      highPrice: "15000",
                      priceCurrency: "USD",
                    },
                  },
                },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "Projects by Yerick Cano",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  item: {
                    "@type": "WebApplication",
                    name: "Fuller",
                    url: "https://fuller.express",
                    description:
                      "Delivery platform for Costa Rica's Caribbean coast. Created a new local economy connecting restaurants, drivers, and customers.",
                    applicationCategory: "BusinessApplication",
                    operatingSystem: "Web, iOS, Android",
                    author: { "@type": "Person", name: "Yerick Cano" },
                    keywords: [
                      "delivery",
                      "Costa Rica",
                      "Caribbean",
                      "Limón",
                      "marketplace",
                    ],
                  },
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  item: {
                    "@type": "WebApplication",
                    name: "BusCaribe",
                    url: "https://buscaribe.vercel.app",
                    description:
                      "Modern bus schedule app for the Caribbean coast of Costa Rica. Reached 500 users on launch day.",
                    applicationCategory: "TransportationApplication",
                    author: { "@type": "Person", name: "Yerick Cano" },
                    keywords: [
                      "bus schedule",
                      "Costa Rica",
                      "Caribbean",
                      "public transit",
                    ],
                  },
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  item: {
                    "@type": "SoftwareApplication",
                    name: "SnowConvert",
                    url: "https://docs.snowflake.com/en/migrations/snowconvert-docs/overview",
                    description:
                      "Enterprise SQL migration tool for Snowflake. Used worldwide to accelerate cloud data transformation.",
                    applicationCategory: "DeveloperApplication",
                    author: { "@type": "Organization", name: "Snowflake" },
                    contributor: { "@type": "Person", name: "Yerick Cano" },
                  },
                },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Yerick Cano — Portfolio",
              url: "https://www.yerick.me",
              author: { "@type": "Person", name: "Yerick Cano" },
              inLanguage: ["es", "en"],
            }),
          }}
        />
      </body>
    </html>
  );
}
