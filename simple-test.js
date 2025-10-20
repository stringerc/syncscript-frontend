#!/usr/bin/env node

/**
 * Simple Login Test Script for SyncScript
 * Tests basic functionality without complex selectors
 */

const puppeteer = require('puppeteer');

const TEST_URL = 'https://syncscript-frontend-9md7tk9gq-christopher-stringers-projects.vercel.app/login';

async function simpleTest() {
  console.log('🚀 Starting Simple SyncScript Test...');
  
  let browser;
  let page;
  
  try {
    browser = await puppeteer.launch({ 
      headless: true, // Run headless for reliability
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    page = await browser.newPage();
    
    // Navigate to login page
    console.log('📱 Navigating to login page...');
    await page.goto(TEST_URL, { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Wait for page to load
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Get page info
    const title = await page.title();
    console.log(`📄 Page title: ${title}`);
    
    const url = page.url();
    console.log(`🌐 Current URL: ${url}`);
    
    // Check for any console errors
    const consoleMessages = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleMessages.push(msg.text());
      }
    });
    
    // Wait a bit more to catch any delayed errors
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Check for loading spinners
    const loadingElements = await page.$$eval('[class*="animate-spin"]', els => els.length);
    console.log(`⏳ Loading spinners found: ${loadingElements}`);
    
    // Check for buttons
    const allButtons = await page.$$eval('button', buttons => 
      buttons.map(btn => ({
        text: btn.textContent?.trim() || '',
        disabled: btn.disabled,
        className: btn.className
      }))
    );
    
    console.log(`🔘 Total buttons found: ${allButtons.length}`);
    allButtons.forEach((btn, i) => {
      console.log(`   Button ${i + 1}: "${btn.text}" (disabled: ${btn.disabled})`);
    });
    
    // Look for Google-related buttons
    const googleButtons = allButtons.filter(btn => 
      btn.text.toLowerCase().includes('google') || 
      btn.className.toLowerCase().includes('google')
    );
    
    console.log(`🔍 Google-related buttons: ${googleButtons.length}`);
    
    // Check for errors
    if (consoleMessages.length > 0) {
      console.log('❌ Console errors found:');
      consoleMessages.forEach(error => console.log(`   ${error}`));
    } else {
      console.log('✅ No console errors detected');
    }
    
    // Take screenshot for verification
    await page.screenshot({ path: 'simple-test-result.png', fullPage: true });
    console.log('📸 Screenshot saved as simple-test-result.png');
    
    // Success criteria
    const hasNoErrors = consoleMessages.length === 0;
    const hasButtons = allButtons.length > 0;
    const isNotLoading = loadingElements === 0;
    
    console.log('\n🎯 TEST RESULTS:');
    console.log(`✅ No console errors: ${hasNoErrors}`);
    console.log(`✅ Page has buttons: ${hasButtons}`);
    console.log(`✅ Not stuck loading: ${isNotLoading}`);
    console.log(`✅ Page loaded: ${title.includes('SyncScript') || title.includes('Login')}`);
    
    const overallSuccess = hasNoErrors && hasButtons && isNotLoading;
    
    return {
      success: overallSuccess,
      hasNoErrors,
      hasButtons,
      isNotLoading,
      buttonCount: allButtons.length,
      googleButtons: googleButtons.length,
      consoleErrors: consoleMessages.length
    };
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
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
  simpleTest()
    .then(result => {
      console.log('\n🏁 Final Result:', result);
      process.exit(result.success ? 0 : 1);
    })
    .catch(error => {
      console.error('💥 Test script error:', error);
      process.exit(1);
    });
}

module.exports = { simpleTest };
