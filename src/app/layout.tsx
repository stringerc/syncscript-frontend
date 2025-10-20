import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { RubeProvider } from '../contexts/RubeContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SyncScript - AI-Powered Productivity Platform',
  description: 'Transform your productivity with AI-driven task management, smart scheduling, and seamless team collaboration.',
  keywords: 'productivity, AI, task management, team collaboration, scheduling',
  authors: [{ name: 'SyncScript Team' }],
  creator: 'SyncScript',
  publisher: 'SyncScript',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://syncscript.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'SyncScript - AI-Powered Productivity Platform',
    description: 'Transform your productivity with AI-driven task management, smart scheduling, and seamless team collaboration.',
    url: 'https://syncscript.com',
    siteName: 'SyncScript',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SyncScript - AI-Powered Productivity Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SyncScript - AI-Powered Productivity Platform',
    description: 'Transform your productivity with AI-driven task management, smart scheduling, and seamless team collaboration.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  themeColor: '#1e2128',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'SyncScript'
  },
  icons: {
    icon: '/icons/icon-192x192.svg',
    apple: '/icons/icon-192x192.svg'
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full antialiased`}>
        <RubeProvider>
          {children}
        </RubeProvider>
      </body>
    </html>
  );
}
