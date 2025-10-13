/**
 * Chaos Test: Backend Down
 * IAOB Infrastructure - Resilience Testing
 */

import { test, expect } from '@playwright/test';

test.describe('Chaos: Backend Completely Down', () => {
  test('Dashboard loads gracefully when backend unavailable', async ({ page, context }) => {
    // Block ALL backend API calls
    await context.route('**/syncscript-backend*.onrender.com/**', route => route.abort());
    
    // Navigate to dashboard
    await page.goto('/dashboard');
    
    // Wait for page to settle
    await page.waitForTimeout(2000);
    
    // Dashboard should still load
    await expect(page.locator('h1, [class*="title"]')).toBeVisible();
    
    // Should see error toast
    const toast = page.locator('[class*="toast"], [role="status"]');
    await expect(toast).toContainText(/backend.*offline|slow/i, { timeout: 5000 });
    
    // UI should be functional
    const addButton = page.locator('button:has-text("Add Task"), button:has-text("Create")').first();
    await expect(addButton).toBeVisible();
    
    // Can interact with UI
    await addButton.click();
    
    // Modal/form should open
    await expect(page.locator('input[name="title"], [placeholder*="task"]')).toBeVisible({ timeout: 3000 });
    
    console.log('✅ Dashboard survived backend outage - graceful degradation working!');
  });
});

