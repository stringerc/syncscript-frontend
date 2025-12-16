/**
 * Cross-Domain Authentication Utility
 * Handles authentication state sharing between syncscript.app and dashboard.syncscript.app
 */

export interface AuthState {
  user: {
    id: string;
    name: string;
    email: string;
    picture?: string;
    provider?: string;
  };
  token: string;
}

/**
 * Set authentication cookie that works across subdomains
 * Domain: .syncscript.app (accessible from both syncscript.app and dashboard.syncscript.app)
 */
export function setAuthCookie(user: AuthState['user'], token: string): void {
  if (typeof window === 'undefined') return;

  const authData = JSON.stringify({ user, token });
  const expires = new Date();
  expires.setDate(expires.getDate() + 7); // 7 days expiry

  // Set cookie with domain for cross-subdomain access
  document.cookie = `syncscript_auth=${encodeURIComponent(authData)}; expires=${expires.toUTCString()}; domain=.syncscript.app; path=/; SameSite=Lax; Secure`;
  
  // Also set for current domain (for localhost/development)
  const currentDomain = window.location.hostname;
  if (currentDomain === 'localhost' || currentDomain.includes('localhost')) {
    document.cookie = `syncscript_auth=${encodeURIComponent(authData)}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
  }

  // Also store in localStorage as backup
  localStorage.setItem('syncscript_user', JSON.stringify(user));
  localStorage.setItem('rube_token', token);
}

/**
 * Get authentication from cookie or localStorage
 */
export function getAuthFromCookie(): AuthState | null {
  if (typeof window === 'undefined') return null;

  try {
    // Try to get from cookie first
    const cookies = document.cookie.split(';');
    const authCookie = cookies.find(cookie => cookie.trim().startsWith('syncscript_auth='));
    
    if (authCookie) {
      const authData = JSON.parse(decodeURIComponent(authCookie.split('=')[1]));
      return authData;
    }

    // Fallback to localStorage
    const userStr = localStorage.getItem('syncscript_user');
    const token = localStorage.getItem('rube_token');
    
    if (userStr && token) {
      return {
        user: JSON.parse(userStr),
        token,
      };
    }

    return null;
  } catch (error) {
    console.error('Error reading auth cookie:', error);
    return null;
  }
}

/**
 * Clear authentication cookie and localStorage
 */
export function clearAuthCookie(): void {
  if (typeof window === 'undefined') return;

  // Clear cookie for all domains
  document.cookie = `syncscript_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.syncscript.app; path=/;`;
  document.cookie = `syncscript_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

  // Clear localStorage
  localStorage.removeItem('syncscript_user');
  localStorage.removeItem('rube_token');
}

/**
 * Get dashboard URL based on environment
 */
export function getDashboardUrl(): string {
  if (typeof window === 'undefined') return '/dashboard';
  
  const isProduction = window.location.hostname.includes('syncscript.app');
  const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname.includes('localhost');
  
  if (isProduction) {
    // Production: redirect to dashboard.syncscript.app
    const protocol = window.location.protocol;
    return `${protocol}//dashboard.syncscript.app`;
  } else if (isDevelopment) {
    // Development: check if we're on dashboard subdomain, otherwise redirect
    const hostname = window.location.hostname;
    if (hostname.startsWith('dashboard.')) {
      return '/dashboard';
    }
    // For development, we can use subdomain or direct path
    // Using direct path for simplicity in dev
    return '/dashboard';
  }
  
  // Fallback to relative path
  return '/dashboard';
}

/**
 * Check if we're on the dashboard domain/subdomain
 */
export function isDashboardDomain(): boolean {
  if (typeof window === 'undefined') return false;
  
  const hostname = window.location.hostname;
  return hostname.startsWith('dashboard.') || hostname.includes('dashboard');
}

/**
 * Check if we're on the landing page domain
 */
export function isLandingDomain(): boolean {
  if (typeof window === 'undefined') return false;
  
  const hostname = window.location.hostname;
  return !hostname.startsWith('dashboard.') && !hostname.includes('dashboard');
}

