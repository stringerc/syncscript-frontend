/**
 * Announce messages to screen readers
 * Uses ARIA live region for accessibility
 */

export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
  if (typeof window === 'undefined') return;
  
  const liveRegion = document.getElementById('aria-live-region');
  if (!liveRegion) {
    console.warn('ARIA live region not found. Add id="aria-live-region" to your app.');
    return;
  }
  
  // Update the live region's aria-live attribute
  liveRegion.setAttribute('aria-live', priority);
  
  // Clear and set new message
  liveRegion.textContent = '';
  
  // Use setTimeout to ensure screen readers pick up the change
  setTimeout(() => {
    liveRegion.textContent = message;
  }, 100);
  
  // Clear after 5 seconds to avoid confusion
  setTimeout(() => {
    liveRegion.textContent = '';
  }, 5000);
}

/**
 * Announce an error to screen readers (assertive - interrupts)
 */
export function announceError(message: string) {
  announceToScreenReader(`Error: ${message}`, 'assertive');
}

/**
 * Announce success to screen readers (polite - waits for pause)
 */
export function announceSuccess(message: string) {
  announceToScreenReader(`Success: ${message}`, 'polite');
}

/**
 * Announce loading state
 */
export function announceLoading(message: string = 'Loading...') {
  announceToScreenReader(message, 'polite');
}

/**
 * Announce loaded state
 */
export function announceLoaded(message: string = 'Content loaded') {
  announceToScreenReader(message, 'polite');
}

