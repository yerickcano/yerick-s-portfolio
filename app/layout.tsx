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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} scroll-smooth`}>
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
              image: "https://www.yerick.me/pfp.jpg",
              sameAs: [
                "https://github.com/yerickcano",
                "https://www.linkedin.com/in/yerickcano",
              ],
              address: {
                "@type": "PostalAddress",
                addressCountry: "CR",
                addressRegion: "Costa Rica",
              },
              email: "yerickcanogarcia@gmail.com",
              knowsAbout: [
                "React",
                "Next.js",
                "TypeScript",
                "Node.js",
                "PostgreSQL",
                "Full Stack Development",
              ],
              offers: {
                "@type": "Offer",
                description: "Freelance software development services",
                url: "https://www.yerick.me/#packages",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
