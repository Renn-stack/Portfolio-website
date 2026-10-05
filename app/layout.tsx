import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { MotionProvider } from "@/components/ui/MotionProvider";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Renata Ponce — Inventor",
  description:
    "Renata Ponce is an independent inventor working at the intersection of technology, AI, accessibility, audio and human perception.",
  openGraph: {
    title: "Renata Ponce — Inventor",
    description: "I don’t want to adapt existing technology. I want to invent what comes next.",
    type: "website",
    images: [{ url: "/images/hero-desktop.webp", width: 2688, height: 1520, alt: "Renata Ponce in her lab" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Renata Ponce — Inventor",
    description: "I don’t want to adapt existing technology. I want to invent what comes next.",
    images: ["/images/hero-desktop.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#060708",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <a
          href="#main"
          className="meta fixed left-4 top-4 z-[100] -translate-y-24 bg-fg px-4 py-3 text-ink transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
