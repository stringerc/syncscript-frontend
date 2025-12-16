import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { RubeProvider } from '../src/contexts/RubeContext';
import { Toaster } from 'react-hot-toast';
import '../src/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            retry: (failureCount, error: any) => {
              if (error?.status && error.status >= 400 && error.status < 500) {
                return false;
              }
              return failureCount < 2;
            },
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
            refetchOnWindowFocus: false,
          },
          mutations: {
            retry: false,
          },
        },
      })
  );

  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <RubeProvider>
          <Component {...pageProps} />
          <Toaster position="top-right" />
        </RubeProvider>
      </QueryClientProvider>
    </UserProvider>
  );
}

