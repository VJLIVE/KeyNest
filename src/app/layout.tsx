import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/providers/Providers';

export const metadata: Metadata = {
  title: 'Keynest - Secure API Key Management',
  description: 'Generate, store, and manage API keys with enterprise-grade security. Built for developers who demand both simplicity and robust protection.',
  openGraph: {
    title: 'Keynest - Secure API Key Management',
    description: 'Generate, store, and manage API keys with enterprise-grade security.',
    url: 'https://key-nest-sigma.vercel.app',
    siteName: 'Keynest',
    images: [
      {
        url: 'https://key-nest-sigma.vercel.app/logo/PNG.png',
        width: 1200,
        height: 630,
        alt: 'Keynest Logo',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Keynest - Secure API Key Management',
    description: 'Generate, store, and manage API keys with enterprise-grade security.',
    images: ['https://key-nest-sigma.vercel.app/logo/PNG.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" type="image/svg+xml" href="/logo/logo.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <Providers> {/* ✅ Wrap everything in your Providers Client Component */}
          {children}
        </Providers>
      </body>
    </html>
  );
}
