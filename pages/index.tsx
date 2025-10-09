import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import LandingPage from './landing';

export default function Home() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-syncscript-cream-50">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p style={{ 
            fontSize: '18px', 
            color: 'var(--syncscript-charcoal-600)', 
            margin: '0',
            transform: 'none',
            animation: 'none'
          }}>Loading SyncScript...</p>
        </div>
      </div>
    );
  }

  return <LandingPage />;
}