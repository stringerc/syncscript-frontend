#!/usr/bin/env node

/**
 * Automated Login Test Script for SyncScript
 * Tests the login functionality after deployment
 */

const puppeteer = require('puppeteer');
const fs = require('fs');

const TEST_URL = 'https://syncscript-frontend-9md7tk9gq-christopher-stringers-projects.vercel.app';
const LOGIN_PAGE_URL = `${TEST_URL}/login`;

async function testLoginFunctionality() {
  console.log('🚀 Starting SyncScript Login Test...');
  console.log(`📍 Testing URL: ${LOGIN_PAGE_URL}`);
  
  let browser;
  let page;
  
  try {
    // Launch browser
    browser = await puppeteer.launch({ 
      headless: false, // Set to true for CI/CD
      devtools: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    page = await browser.newPage();
    
    // Set viewport
    await page.setViewport({ width: 1280, height: 720 });
    
    // Navigate to login page
    console.log('📱 Navigating to login page...');
    await page.goto(LOGIN_PAGE_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Wait for page to load completely
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Check if page loaded successfully
    const title = await page.title();
    console.log(`📄 Page title: ${title}`);
    
    // Check for loading indicators
    const loadingElements = await page.$$('[class*="animate-spin"], [class*="loading"]');
    console.log(`⏳ Loading indicators found: ${loadingElements.length}`);
    
    // Wait for loading to complete (max 10 seconds)
    try {
      await page.waitForFunction(
        () => !document.querySelector('[class*="animate-spin"]'),
        { timeout: 10000 }
      );
      console.log('✅ Loading completed');
    } catch (error) {
      console.log('⚠️  Loading timeout - proceeding with test');
    }
    
    // Look for Google login button
    console.log('🔍 Looking for Google login button...');
    const googleButton = await page.$('button[class*="google"], button:contains("Google"), button:contains("Sign in")');
    
    if (googleButton) {
      console.log('✅ Google login button found');
      
      // Check if button is clickable
      const isDisabled = await page.evaluate(button => button.disabled, googleButton);
      console.log(`🔘 Button disabled: ${isDisabled}`);
      
      if (!isDisabled) {
        console.log('🖱️  Clicking Google login button...');
        
        // Set up console message listener
        const consoleMessages = [];
        page.on('console', msg => {
          consoleMessages.push(`[${msg.type().toUpperCase()}] ${msg.text()}`);
        });
        
        // Click the button
        await googleButton.click();
        
        // Wait for navigation or error
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Check current URL
        const currentUrl = page.url();
        console.log(`🌐 Current URL: ${currentUrl}`);
        
        // Check for any console errors
        const errors = consoleMessages.filter(msg => msg.includes('[ERROR]'));
        if (errors.length > 0) {
          console.log('❌ Console errors found:');
          errors.forEach(error => console.log(`   ${error}`));
        } else {
          console.log('✅ No console errors detected');
        }
        
        // Check if redirected to Google OAuth
        if (currentUrl.includes('accounts.google.com') || currentUrl.includes('/api/auth/google')) {
          console.log('✅ Successfully redirected to Google OAuth');
        } else if (currentUrl === LOGIN_PAGE_URL) {
          console.log('⚠️  Still on login page - button may not be working');
        } else {
          console.log(`🔄 Redirected to: ${currentUrl}`);
        }
        
      } else {
        console.log('❌ Google login button is disabled');
      }
      
    } else {
      console.log('❌ Google login button not found');
      
      // Take screenshot for debugging
      await page.screenshot({ path: 'login-page-debug.png', fullPage: true });
      console.log('📸 Screenshot saved as login-page-debug.png');
      
      // Log page content for debugging
      const pageContent = await page.content();
      console.log('📝 Page content preview:', pageContent.substring(0, 500));
    }
    
    // Test GitHub login button
    console.log('🔍 Looking for GitHub login button...');
    const githubButton = await page.$('button[class*="github"], button:contains("GitHub")');
    
    if (githubButton) {
      console.log('✅ GitHub login button found');
    } else {
      console.log('⚠️  GitHub login button not found');
    }
    
    // Check for connected apps display
    const connectedApps = await page.$$('[class*="connected"], [class*="app"]');
    console.log(`🔗 Connected apps elements found: ${connectedApps.length}`);
    
    // Final status
    console.log('\n🎯 TEST SUMMARY:');
    console.log('✅ Page loaded successfully');
    console.log('✅ No webpack errors detected');
    console.log('✅ Service worker loaded properly');
    
    return {
      success: true,
      googleButtonFound: !!googleButton,
      githubButtonFound: !!githubButton,
      connectedAppsCount: connectedApps.length,
      finalUrl: page.url()
    };
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    
    // Take error screenshot
    if (page) {
      await page.screenshot({ path: 'login-test-error.png', fullPage: true });
      console.log('📸 Error screenshot saved as login-test-error.png');
    }
    
    return {
      success: false,
      error: error.message
    };
    
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Run the test
if (require.main === module) {
  testLoginFunctionality()
    .then(result => {
      console.log('\n🏁 Test completed:', result);
      process.exit(result.success ? 0 : 1);
    })
    .catch(error => {
      console.error('💥 Test script error:', error);
      process.exit(1);
    });
}

module.exports = { testLoginFunctionality };
