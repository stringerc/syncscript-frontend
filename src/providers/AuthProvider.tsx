'use client';

// Auth0 temporarily disabled - return children directly
export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}