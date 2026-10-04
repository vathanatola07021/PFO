import type { Metadata, Viewport } from 'next';
import './portfolio.css';
import './splash.css';
import { profileData } from '@/data/portfolioData';

export const metadata: Metadata = {
  title: `${profileData.fullName} — ${profileData.roleTitle}`,
  description: `${profileData.fullName} — ${profileData.roleTitle}. High-performance systems, low-level infrastructure, and 3D web experiences.`,
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#070b14',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600&family=Syne:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
