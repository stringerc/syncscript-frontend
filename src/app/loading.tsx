/**
 * Global Loading State
 * Shown during page transitions
 */

import { LoadingSpinner } from '@/components/LoadingSpinner'

export default function Loading() {
  return <LoadingSpinner fullScreen text="Loading..." size="xl" />
}

