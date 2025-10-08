'use client';

import { useAuth0 } from '@auth0/auth0-react';
import Image from 'next/image';

export function UserProfile() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="flex items-center gap-3">
      {user.picture && (
        <Image
          src={user.picture}
          alt={user.name || 'User'}
          width={40}
          height={40}
          className="rounded-full"
        />
      )}
      <div>
        <p className="font-semibold">{user.name}</p>
        <p className="text-sm text-gray-600">{user.email}</p>
      </div>
    </div>
  );
}
