import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import ServiceWorker from "./serviceWorker";
import "./globals.css";
import Head from "next/head";

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
        className={`${outfit.variable} ${geistSans.variable} ${geistMono.variable} antialiased bg-primary-100`}
      >
        <div className="items-center justify-items-center min-h-screen p-8 gap-16 sm:p-18 font-[family-name:var(--font-outfit)]">
          <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            {children}
          </main>
        </div>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
      </body>

      <ServiceWorker />
    </html>
  );
}
