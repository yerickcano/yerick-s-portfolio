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
  title: "Yerick Cano | Full Stack Software Engineer",
  description:
    "Full Stack Software Engineer with 4 years of experience building software that creates real opportunities for people. Based in Costa Rica.",
  keywords: [
    "software engineer",
    "full stack",
    "Costa Rica",
    "React",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Yerick Cano" }],
  openGraph: {
    title: "Yerick Cano | Full Stack Software Engineer",
    description:
      "Building software that creates real opportunities for people.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="antialiased">
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
