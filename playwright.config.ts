import { defineConfig, devices } from '@playwright/test';

/**
 * VIRE PASS A: Automated Visual Sweep Configuration
 * 
 * Comprehensive visual testing across:
 * - Multiple browsers (Chromium, WebKit, Firefox)
 * - Multiple viewports (mobile → ultra-wide)
 * - Multiple themes (light/dark/high-contrast)
 * - Multiple zoom levels (67% → 200%)
 * - Multiple states (empty/loading/success/error)
 */

export default defineConfig({
  testDir: './tests/visual',
  
  // Run tests in parallel for speed
  fullyParallel: true,
  
  // Fail build on CI if you accidentally left test.only
  forbidOnly: !!process.env.CI,
  
  // Retry failed tests on CI
  retries: process.env.CI ? 2 : 0,
  
  // Run tests in parallel
  workers: process.env.CI ? 1 : undefined,
  
  // Reporter configuration
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/visual-report.json' }],
    ['list']
  ],
  
  use: {
    // Base URL
    baseURL: process.env.TEST_URL || 'http://localhost:3000',
    
    // Screenshot on failure
    screenshot: 'only-on-failure',
    
    // Video on first retry
    video: 'retain-on-failure',
    
    // Trace on first retry
    trace: 'on-first-retry',
    
    // Timeout
    actionTimeout: 10000,
  },

  // Browser projects
  projects: [
    // ===== DESKTOP: Chromium =====
    {
      name: 'chromium-desktop-1920',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
        deviceScaleFactor: 1,
      },
    },
    {
      name: 'chromium-desktop-1920-2x',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
        deviceScaleFactor: 2, // Retina
      },
    },
    {
      name: 'chromium-desktop-1440',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: 'chromium-desktop-1280',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 800 },
      },
    },
    
    // ===== DESKTOP: Firefox =====
    {
      name: 'firefox-desktop-1920',
      use: { 
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 },
      },
    },
    
    // ===== DESKTOP: WebKit (Safari) =====
    {
      name: 'webkit-desktop-1440',
      use: { 
        ...devices['Desktop Safari'],
        viewport: { width: 1440, height: 900 },
      },
    },
    
    // ===== TABLET =====
    {
      name: 'ipad-pro',
      use: { ...devices['iPad Pro'] },
    },
    {
      name: 'ipad-landscape',
      use: { 
        ...devices['iPad Pro landscape']
      },
    },
    {
      name: 'tablet-1024',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1024, height: 768 },
      },
    },
    
    // ===== MOBILE: iOS =====
    {
      name: 'iphone-14-pro',
      use: { ...devices['iPhone 14 Pro'] },
    },
    {
      name: 'iphone-14-pro-landscape',
      use: { ...devices['iPhone 14 Pro landscape'] },
    },
    {
      name: 'iphone-se',
      use: { ...devices['iPhone SE'] },
    },
    
    // ===== MOBILE: Android =====
    {
      name: 'pixel-7',
      use: { ...devices['Pixel 7'] },
    },
    {
      name: 'galaxy-s9',
      use: { ...devices['Galaxy S9+'] },
    },
    
    // ===== MOBILE: Small Screens =====
    {
      name: 'mobile-320',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 320, height: 568 },
        isMobile: true,
        hasTouch: true,
      },
    },
    {
      name: 'mobile-360',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 360, height: 640 },
        isMobile: true,
        hasTouch: true,
      },
    },
    {
      name: 'mobile-375',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 375, height: 667 },
        isMobile: true,
        hasTouch: true,
        deviceScaleFactor: 2,
      },
    },
    {
      name: 'mobile-414',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 414, height: 896 },
        isMobile: true,
        hasTouch: true,
        deviceScaleFactor: 3,
      },
    },
  ],
  
  // Web server for local development
  webServer: process.env.CI ? undefined : {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});

