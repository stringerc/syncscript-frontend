/**
 * Root Layout
 * Wraps entire app with providers
 */

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { ToastProvider } from '@/components/Toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SyncScript - Productivity That Actually Works',
  description: 'The only platform that considers your energy, budget, and context. AI-powered insights that make every decision easier.',
  keywords: ['productivity', 'task management', 'AI', 'budget tracking', 'energy management'],
  authors: [{ name: 'SyncScript' }],
  openGraph: {
    title: 'SyncScript - Productivity That Actually Works',
    description: 'AI-powered productivity with energy, budget, and context awareness',
    url: 'https://www.syncscript.app',
    siteName: 'SyncScript',
    images: [
      {
        url: 'https://www.syncscript.app/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SyncScript - Productivity That Actually Works',
    description: 'AI-powered productivity with energy, budget, and context awareness',
    images: ['https://www.syncscript.app/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ErrorBoundary>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}

