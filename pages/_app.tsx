import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '../src/contexts/ThemeContext';
import GlobalNavigation from '../src/components/ui/GlobalNavigation';
import Head from 'next/head';
import { initPostHog } from '../src/lib/posthog';
import { useEffect } from 'react';

// Initialize PostHog
if (typeof window !== 'undefined') {
  initPostHog();
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      cacheTime: 5 * 60 * 1000,
    },
  },
});

interface AppProps {
  Component: React.ComponentType<any>;
  pageProps: any;
}

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Initialize keyboard navigation detection
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    };

    const handleMouseDown = () => {
      document.body.classList.remove('keyboard-navigation');
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then((registration) => {
        console.log('SW registered: ', registration);
      }).catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#3B82F6" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className="min-h-screen bg-white dark:bg-gray-900">
            <GlobalNavigation />
            <main className="relative">
              <Component {...pageProps} />
            </main>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#4ade80',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 5000,
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </div>
        </ThemeProvider>
      </QueryClientProvider>
    </UserProvider>
  );
}