import { test, expect } from '@playwright/test';

/**
 * VIRE PASS A: Dashboard Visual Tests
 * 
 * Tests authenticated dashboard states and interactions
 */

test.describe('Dashboard - Visual Integrity', () => {
  
  // Note: These tests require authentication
  // For now, we'll test the login redirect
  
  test('Dashboard - Redirects to Login (Unauthenticated)', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Should redirect to login
    await page.waitForURL(/login|auth0/, { timeout: 5000 });
    
    await expect(page).toHaveScreenshot('dashboard-login-redirect.png', {
      fullPage: false,
    });
  });
  
  // TODO: Add authenticated tests once Auth0 test credentials are set up
  // These would include:
  // - Dashboard with tasks
  // - Empty dashboard state
  // - Loading states
  // - Modal open states
  // - Sidebar collapsed/expanded
  // - Different energy levels selected
});

