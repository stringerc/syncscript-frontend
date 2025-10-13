import { test, expect } from '@playwright/test';

/**
 * VIRE PASS A: Comprehensive Visual Crawler
 * 
 * Systematically crawls ALL routes and captures screenshots
 * across multiple themes, states, and interactions
 */

const routes = [
  '/',
  '/features',
  '/login',
  '/register',
  '/about',
  '/contact',
  '/help',
  '/privacy',
  '/terms',
  '/cookies',
  '/security',
  '/changelog',
  '/calendar',
];

const themes = ['light', 'dark'] as const;
const viewports = [
  { name: 'mobile-sm', width: 320, height: 568 },
  { name: 'mobile-md', width: 375, height: 667 },
  { name: 'mobile-lg', width: 414, height: 896 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop-sm', width: 1024, height: 768 },
  { name: 'desktop-md', width: 1440, height: 900 },
  { name: 'desktop-lg', width: 1920, height: 1080 },
];

test.describe('Comprehensive Visual Crawler', () => {
  
  for (const route of routes) {
    for (const theme of themes) {
      test(`${route} - ${theme} mode - Desktop`, async ({ page }) => {
        // Set color scheme
        await page.emulateMedia({ colorScheme: theme });
        
        // Navigate to route
        await page.goto(route);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);
        
        // Capture screenshot
        const screenshotName = `${route.replace(/\//g, '_') || 'home'}-${theme}-desktop.png`;
        await expect(page).toHaveScreenshot(screenshotName, {
          fullPage: true,
          animations: 'disabled',
        });
      });
    }
  }
  
  // Mobile-specific tests for key pages
  const keyPages = ['/', '/features', '/login', '/dashboard'];
  
  for (const route of keyPages) {
    test(`${route} - Mobile 375px - Light`, async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(route);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);
      
      const screenshotName = `${route.replace(/\//g, '_') || 'home'}-mobile-375-light.png`;
      await expect(page).toHaveScreenshot(screenshotName, {
        fullPage: true,
        animations: 'disabled',
      });
    });
    
    test(`${route} - Mobile 375px - Dark`, async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.goto(route);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);
      
      const screenshotName = `${route.replace(/\//g, '_') || 'home'}-mobile-375-dark.png`;
      await expect(page).toHaveScreenshot(screenshotName, {
        fullPage: true,
        animations: 'disabled',
      });
    });
  }
});

test.describe('Interactive State Capture', () => {
  
  test('Homepage - Menu Open (Mobile)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Look for mobile menu button (if exists)
    const menuButton = page.locator('button[aria-label*="menu" i], button[aria-label*="navigation" i]').first();
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await page.waitForTimeout(500);
      
      await expect(page).toHaveScreenshot('homepage-mobile-menu-open.png');
    }
  });
  
  test('Features Page - Full Scroll', async ({ page }) => {
    await page.goto('/features');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    await expect(page).toHaveScreenshot('features-full.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });
});

test.describe('Typography Stress Tests', () => {
  
  test('Long Text Rendering', async ({ page }) => {
    await page.goto('/features');
    await page.waitForLoadState('networkidle');
    
    // Check that text doesn't overflow containers
    const textElements = await page.locator('p, h1, h2, h3, h4, span').all();
    
    for (const element of textElements.slice(0, 20)) { // Sample first 20
      const box = await element.boundingBox();
      if (box) {
        const parent = await element.evaluateHandle(el => el.parentElement);
        const parentBox = await parent.asElement()?.boundingBox();
        
        if (parentBox && box.width > parentBox.width) {
          const text = await element.textContent();
          console.warn(`Text overflow detected: "${text?.substring(0, 50)}..."`);
        }
      }
    }
  });
});

