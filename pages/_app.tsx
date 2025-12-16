import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Providers } from '../src/lib/providers';
import { RubeProvider } from '../src/contexts/RubeContext';
import { Toaster } from 'react-hot-toast';
import '../src/styles/globals.css';
import '../src/styles/dashboard.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Providers>
        <RubeProvider>
          <Component {...pageProps} />
          <Toaster position="top-right" />
        </RubeProvider>
      </Providers>
    </UserProvider>
  );
}

