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
        <div style={{ textAlign: 'center', padding: '48px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '3px solid #e5e7eb',
            borderTop: '3px solid #4A90E2',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px auto'
          }}></div>
          <div style={{
            fontSize: '18px',
            color: '#4B5563',
            margin: '0',
            fontWeight: '500',
            transform: 'none !important',
            animation: 'none !important'
          }}>Loading SyncScript...</div>
        </div>
      </div>
    );
  }

  return <LandingPage />;
}