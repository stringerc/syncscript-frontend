/**
 * Chaos Test: Slow Backend (5s latency)
 * IAOB Infrastructure - Resilience Testing
 */

import { test, expect } from '@playwright/test';

test.describe('Chaos: Slow Backend Responses', () => {
  test('Dashboard handles slow backend gracefully', async ({ page, context }) => {
    // Add 5-second delay to all API calls
    await context.route('**/syncscript-backend*.onrender.com/**', async route => {
      await new Promise(resolve => setTimeout(resolve, 5000));
      await route.continue();
    });
    
    await page.goto('/dashboard');
    
    // Should show loading state
    const loading = page.locator('[class*="loading"], [class*="skeleton"], [class*="spinner"]');
    await expect(loading).toBeVisible({ timeout: 1000 });
    
    // Should eventually load or timeout gracefully
    await page.waitForTimeout(12000);
    
    // Check for timeout message or loaded state
    const hasContent = await page.locator('h1, [class*="title"]').isVisible();
    const hasError = await page.locator('[class*="toast"]').isVisible();
    
    expect(hasContent || hasError).toBe(true);
    
    console.log('✅ Slow backend handled gracefully!');
  });
});

