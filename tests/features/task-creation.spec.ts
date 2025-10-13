/**
 * LFIP Feature Test: Task Creation
 * Tests all states, interactions, and edge cases
 */

import { test, expect } from '@playwright/test';

test.describe('Feature: Task Creation', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
    // Assume user is logged in
  });

  // STATE 1: Empty State
  test('Shows empty state when no tasks exist', async ({ page }) => {
    const emptyState = page.locator('[class*="empty"]');
    await expect(emptyState).toBeVisible();
    await expect(emptyState).toContainText(/no tasks/i);
  });

  // STATE 2: Loading State
  test('Shows loading state while creating task', async ({ page }) => {
    await page.click('button:has-text("Add Task")');
    await page.fill('input[name="title"]', 'Test Task');
    
    const createButton = page.locator('button:has-text("Create")');
    await createButton.click();
    
    // Should show loading indicator
    const loading = page.locator('[class*="loading"], [class*="spinner"]');
    await expect(loading).toBeVisible({ timeout: 1000 });
  });

  // STATE 3: Success State
  test('Creates task successfully with all fields', async ({ page }) => {
    await page.click('button:has-text("Add Task")');
    
    await page.fill('input[name="title"]', 'Complete quarterly report');
    await page.fill('textarea[name="description"]', 'Detailed analysis of Q4 performance');
    await page.selectOption('select[name="priority"]', '2');
    await page.selectOption('select[name="energy_level"]', '4');
    
    await page.click('button:has-text("Create")');
    
    // Should see success toast
    const toast = page.locator('[class*="toast"]');
    await expect(toast).toContainText(/created|success/i, { timeout: 3000 });
    
    // Task should appear in list
    const taskCard = page.locator('[class*="task"]').filter({ hasText: 'Complete quarterly report' });
    await expect(taskCard).toBeVisible();
  });

  // STATE 4: Error State - Validation
  test('Shows validation error for empty title', async ({ page }) => {
    await page.click('button:has-text("Add Task")');
    
    // Leave title empty
    await page.selectOption('select[name="priority"]', '2');
    await page.click('button:has-text("Create")');
    
    // Should see validation error
    const error = page.locator('[class*="error"]').filter({ hasText: /title.*required/i });
    await expect(error).toBeVisible();
  });

  // EDGE CASE: Long Title (500 chars)
  test('Handles extremely long title gracefully', async ({ page }) => {
    await page.click('button:has-text("Add Task")');
    
    const longTitle = 'A'.repeat(500);
    await page.fill('input[name="title"]', longTitle);
    await page.selectOption('select[name="priority"]', '1');
    await page.selectOption('select[name="energy_level"]', '1');
    
    await page.click('button:has-text("Create")');
    
    // Should create successfully
    const toast = page.locator('[class*="toast"]');
    await expect(toast).toContainText(/created|success/i, { timeout: 3000 });
    
    // Title should be truncated in UI with ellipsis
    const taskCard = page.locator('[class*="task"]').first();
    await expect(taskCard).toBeVisible();
  });

  // EDGE CASE: Special Characters
  test('Handles special characters in title', async ({ page }) => {
    await page.click('button:has-text("Add Task")');
    
    await page.fill('input[name="title"]', 'Fix "bug" in <component> & deploy');
    await page.click('button:has-text("Create")');
    
    const toast = page.locator('[class*="toast"]');
    await expect(toast).toContainText(/created/i, { timeout: 3000 });
  });

  // EDGE CASE: Emoji in Title
  test('Handles emoji in task title', async ({ page }) => {
    await page.click('button:has-text("Add Task")');
    
    await page.fill('input[name="title"]', '🚀 Launch new feature 🎉');
    await page.click('button:has-text("Create")');
    
    const taskCard = page.locator('[class*="task"]').filter({ hasText: '🚀 Launch new feature 🎉' });
    await expect(taskCard).toBeVisible();
  });

  // INTERACTION: Keyboard Navigation
  test('Can create task using only keyboard', async ({ page }) => {
    // Tab to "Add Task" button
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    
    // Fill form with keyboard
    await page.keyboard.type('Keyboard-created task');
    await page.keyboard.press('Tab'); // Move to priority
    await page.keyboard.press('ArrowDown'); // Select priority 2
    await page.keyboard.press('Tab'); // Move to energy
    await page.keyboard.press('ArrowDown'); // Select energy 2
    
    // Submit
    await page.keyboard.press('Enter');
    
    // Verify success
    const taskCard = page.locator('[class*="task"]').filter({ hasText: 'Keyboard-created task' });
    await expect(taskCard).toBeVisible();
  });

  // INTEGRATION: Offline Mode
  test('Works offline with localStorage fallback', async ({ page, context }) => {
    // Go offline
    await context.setOffline(true);
    
    await page.click('button:has-text("Add Task")');
    await page.fill('input[name="title"]', 'Offline task');
    await page.click('button:has-text("Create")');
    
    // Should work with localStorage
    const taskCard = page.locator('[class*="task"]').filter({ hasText: 'Offline task' });
    await expect(taskCard).toBeVisible();
    
    // Reload page - task should persist
    await page.reload();
    await expect(taskCard).toBeVisible();
  });
});

