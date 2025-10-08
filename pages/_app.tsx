import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import '../src/styles/globals.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (renamed from cacheTime)
      retry: (failureCount, error: unknown) => {
        if ((error as { status?: number })?.status === 401) return false;
        return failureCount < 3;
      },
    },
  },
});

interface AppProps {
  Component: React.ComponentType<Record<string, unknown>>;
  pageProps: Record<string, unknown>;
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-syncscript-cream-50">
          <Component {...pageProps} />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--syncscript-cream-50)',
                color: 'var(--syncscript-charcoal-800)',
                border: '1px solid var(--syncscript-charcoal-100)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
              },
              success: {
                iconTheme: {
                  primary: 'var(--syncscript-green-500)',
                  secondary: 'white',
                },
              },
              error: {
                iconTheme: {
                  primary: 'var(--syncscript-error)',
                  secondary: 'white',
                },
              },
            }}
          />
        </div>
      </QueryClientProvider>
    </UserProvider>
  );
}

export default MyApp;