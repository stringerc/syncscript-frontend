'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { rubeService, RubeApp } from '../services/rubeService';

interface RubeContextType {
  apps: RubeApp[];
  loading: boolean;
  error: string | null;
  refreshApps: () => Promise<void>;
  isConnected: (toolkit: string) => boolean;
}

const RubeContext = createContext<RubeContextType | undefined>(undefined);

export function RubeProvider({ children }: { children: ReactNode }) {
  const [apps, setApps] = useState<RubeApp[]>([]);
  const [loading, setLoading] = useState(false); // Start as false to avoid loading screen
  const [error, setError] = useState<string | null>(null);

  const refreshApps = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get all apps from the service
      const allApps = rubeService.getApps();
      
      // Update connection status based on user's stored tokens
      const userConnectedApps = rubeService.getUserConnectedApps();
      
      const updatedApps = allApps.map(app => {
        return {
          ...app,
          connected: userConnectedApps.includes(app.toolkit)
        };
      });
      
      setApps(updatedApps);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load apps');
    } finally {
      setLoading(false);
    }
  };

  const isConnected = (toolkit: string): boolean => {
    const app = apps.find(app => app.toolkit === toolkit);
    return app?.connected || false;
  };

  useEffect(() => {
    refreshApps();
  }, []);

  const value: RubeContextType = {
    apps,
    loading,
    error,
    refreshApps,
    isConnected
  };

  return (
    <RubeContext.Provider value={value}>
      {children}
    </RubeContext.Provider>
  );
}

export function useRube() {
  const context = useContext(RubeContext);
  if (context === undefined) {
    throw new Error('useRube must be used within a RubeProvider');
  }
  return context;
}
