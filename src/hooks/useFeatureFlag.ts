/**
 * useFeatureFlag Hook
 * IAOB Infrastructure Component
 */

import { useEffect, useState } from 'react';
import { posthog } from '@/lib/posthog';
import { FeatureFlag, defaultFlags } from '@/lib/featureFlags';

export function useFeatureFlag(flag: FeatureFlag): boolean {
  const [isEnabled, setIsEnabled] = useState(defaultFlags[flag]);

  useEffect(() => {
    if (typeof window !== 'undefined' && posthog) {
      const enabled = posthog.isFeatureEnabled(flag);
      setIsEnabled(enabled ?? defaultFlags[flag]);

      // Listen for real-time flag updates
      posthog.onFeatureFlags(() => {
        const updated = posthog.isFeatureEnabled(flag);
        setIsEnabled(updated ?? defaultFlags[flag]);
      });
    }
  }, [flag]);

  return isEnabled;
}

