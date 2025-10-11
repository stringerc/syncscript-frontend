/**
 * ♿ ACCESSIBILITY UTILITIES
 * 
 * GERC Blocker #4: Accessibility Compliance
 * WCAG 2.2 AAA Target
 */

/**
 * Focus trap for modals
 * Keeps keyboard focus within modal and cycles through focusable elements
 */
export function useFocusTrap(containerRef: React.RefObject<HTMLElement>, isActive: boolean) {
  React.useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    // Focus first element when modal opens
    firstFocusable?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      // Trap focus within modal
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [isActive, containerRef]);
}

/**
 * Restore focus to previous element when modal closes
 */
export function useRestoreFocus(isOpen: boolean) {
  const previousFocus = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (isOpen) {
      previousFocus.current = document.activeElement as HTMLElement;
    } else if (previousFocus.current) {
      previousFocus.current.focus();
      previousFocus.current = null;
    }
  }, [isOpen]);
}

/**
 * Announce to screen readers
 */
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

/**
 * Generate unique ID for form elements
 */
let idCounter = 0;
export function useId(prefix: string = 'id'): string {
  const [id] = React.useState(() => `${prefix}-${++idCounter}`);
  return id;
}

/**
 * Handle Escape key to close modals
 */
export function useEscapeKey(callback: () => void, isActive: boolean = true) {
  React.useEffect(() => {
    if (!isActive) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        callback();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [callback, isActive]);
}

/**
 * Disable body scroll when modal is open
 */
export function useLockBodyScroll(lock: boolean) {
  React.useEffect(() => {
    if (lock) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [lock]);
}

/**
 * Check if element is visible to screen readers
 */
export function isVisibleToScreenReader(element: HTMLElement): boolean {
  return (
    element.offsetWidth > 0 &&
    element.offsetHeight > 0 &&
    window.getComputedStyle(element).visibility !== 'hidden' &&
    window.getComputedStyle(element).display !== 'none'
  );
}

/**
 * Get accessible label for energy level
 */
export function getEnergyAccessibleLabel(level: number): string {
  const labels = {
    1: 'Exhausted - Very low energy',
    2: 'Low energy',
    3: 'Medium energy',
    4: 'High energy',
    5: 'Peak energy - Feeling excellent'
  };
  return labels[level as keyof typeof labels] || 'Unknown energy level';
}

/**
 * Get accessible label for priority level
 */
export function getPriorityAccessibleLabel(priority: number): string {
  const labels = {
    1: 'Lowest priority',
    2: 'Low priority',
    3: 'Medium priority',
    4: 'High priority',
    5: 'Highest priority - Critical'
  };
  return labels[priority as keyof typeof labels] || 'Unknown priority';
}

/**
 * Format date for screen readers
 */
export function formatDateForScreenReader(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Check color contrast ratio (WCAG AAA = 7:1 for normal text)
 */
export function getContrastRatio(foreground: string, background: string): number {
  // Simplified contrast calculation
  // In production, use a proper color contrast library
  const getLuminance = (hex: string): number => {
    const rgb = parseInt(hex.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const l1 = getLuminance(foreground);
  const l2 = getLuminance(background);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * React import for hooks
 */
import React from 'react';

