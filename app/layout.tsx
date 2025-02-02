import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import ServiceWorker from "./serviceWorker";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Material Color Generator",
  description: "Generate Material Design colors",
  icons: {
    icon: "/favicon.ico",
    apple: "/ios/1024.png",
    shortcut: "/ios/1024.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="darkreader-lock" />
        <link rel="apple-touch-icon" href="/ios/1024.png" />
      </head>
      <body
        className={`${outfit.variable} ${geistSans.variable} ${geistMono.variable} bg-primary-100 antialiased`}
      >
        <div className="sm:p-18 min-h-screen items-center justify-items-center gap-16 p-8 font-[family-name:var(--font-outfit)]">
          <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
            {children}
          </main>
        </div>
        <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6"></footer>
      </body>

      <Analytics />
      <ServiceWorker />
    </html>
  );
}
