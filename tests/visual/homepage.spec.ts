import { test, expect } from '@playwright/test';

/**
 * VIRE PASS A: Homepage Visual Tests
 * 
 * Comprehensive visual regression testing for homepage
 * across all devices, themes, and states
 */

test.describe('Homepage - Visual Integrity', () => {
  
  // ===== LIGHT MODE =====
  test('Homepage - Light Mode - Above Fold', async ({ page }) => {
    await page.goto('/');
    
    // Wait for hydration and animations
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // Let animations settle
    
    // Take screenshot of above-the-fold content
    await expect(page).toHaveScreenshot('homepage-light-above-fold.png', {
      fullPage: false,
      animations: 'disabled',
    });
  });
  
  test('Homepage - Light Mode - Full Page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Full page screenshot
    await expect(page).toHaveScreenshot('homepage-light-full.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });
  
  // ===== DARK MODE =====
  test('Homepage - Dark Mode - Above Fold', async ({ page }) => {
    await page.goto('/');
    
    // Enable dark mode
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    await expect(page).toHaveScreenshot('homepage-dark-above-fold.png', {
      fullPage: false,
      animations: 'disabled',
    });
  });
  
  test('Homepage - Dark Mode - Full Page', async ({ page }) => {
    await page.goto('/');
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    await expect(page).toHaveScreenshot('homepage-dark-full.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });
  
  // ===== HOVER STATES =====
  test('Homepage - CTA Button Hover State', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Hover over "Start Free Trial" button
    const ctaButton = page.getByRole('link', { name: /start free trial/i });
    await ctaButton.hover();
    await page.waitForTimeout(300); // Wait for hover animation
    
    await expect(page).toHaveScreenshot('homepage-cta-hover.png', {
      fullPage: false,
    });
  });
  
  test('Homepage - Navigation Link Hover', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Hover over Features link
    const featuresLink = page.getByRole('link', { name: /features/i }).first();
    await featuresLink.hover();
    await page.waitForTimeout(300);
    
    await expect(page).toHaveScreenshot('homepage-nav-hover.png', {
      clip: { x: 0, y: 0, width: 1200, height: 100 },
    });
  });
  
  // ===== SCROLL STATES =====
  test('Homepage - Scroll Position Mid-Page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Scroll to features section
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('homepage-scroll-mid.png', {
      fullPage: false,
    });
  });
  
  test('Homepage - Scroll to Bottom', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('homepage-scroll-bottom.png', {
      fullPage: false,
    });
  });
  
  // ===== FOCUS STATES =====
  test('Homepage - Login Button Focus', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Tab to Login button
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.waitForTimeout(200);
    
    await expect(page).toHaveScreenshot('homepage-login-focus.png', {
      clip: { x: 0, y: 0, width: 1200, height: 100 },
    });
  });
  
  // ===== RESPONSIVE BREAKPOINTS =====
  test('Homepage - Mobile 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    await expect(page).toHaveScreenshot('homepage-mobile-375.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });
  
  test('Homepage - Tablet 768px', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    await expect(page).toHaveScreenshot('homepage-tablet-768.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });
  
  test('Homepage - Desktop 1440px', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    await expect(page).toHaveScreenshot('homepage-desktop-1440.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });
  
  // ===== ZOOM LEVELS =====
  test('Homepage - Zoom 150%', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Simulate browser zoom
    await page.evaluate(() => {
      document.body.style.zoom = '1.5';
    });
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('homepage-zoom-150.png', {
      fullPage: false,
    });
  });
  
  test('Homepage - Zoom 200%', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Simulate browser zoom
    await page.evaluate(() => {
      document.body.style.zoom = '2.0';
    });
    await page.waitForTimeout(500);
    
    await expect(page).toHaveScreenshot('homepage-zoom-200.png', {
      fullPage: false,
    });
  });
});

