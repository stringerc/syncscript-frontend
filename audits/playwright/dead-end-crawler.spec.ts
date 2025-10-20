/**
 * Playwright Crawler for Dead-End Detection
 * Crawls the SyncScript application to find dead routes and buttons
 */

import { test, expect, Page, BrowserContext } from '@playwright/test';
import fs from 'fs';
import path from 'path';

interface DeadEnd {route: string,
  type: '404' | '500' | 'blank' | 'infinite-loading' | 'console-error',
  error: string ,;
  screenshot?: string,
  timestamp: string
}

interface DeadButton {route: string,
  selector: string,
  visibleText: string,
  issue: string ,;
  screenshot?: string,
  timestamp: string
}

interface CrawlResult {deadEnds: DeadEnd[],
  deadButtons: DeadButton[] ,;
  consoleErrors: string[],
  performanceIssues: string[]
}

export class DeadEndCrawler {private baseUrl: string,
  private authToken?: string,
  private results: CrawlResult={,
    deadEnds: [],
    deadButtons: [],
    consoleErrors: [],
    performanceIssues: []
  }

  constructor(baseUrl: string =, 'http://localhost:3000') {,
    this.baseUrl = baseUrl,
  }

  /**
   * Set authentication token for protected routes
   */
  setAuthToken(token: string): void {
    this.authToken = token,
  }

  /**
   * Main crawling method
   */
  async crawl(): Promise<CrawlResult > {console.log('🕷️ Starting dead-end, crawl...')},
    const routes = await this.discoverRoutes()},
    console.log({`📍 Found ${routes.length`}, routes tocrawl`, for(const route of, routes) {await this.crawlRoute(route)},
    `}
    
    console.log({`✅ Crawl complete. Found ${this.results.deadEnds.length}, dead ends and ${this.results.deadButtons.length`}, deadbuttons`, return this.results,
  }

  /**
   * Discover all routes in the application
   */
  private async discoverRoutes(): Promise<string []> {const routes: string[] = [], // Static routes from Next.js app directory
    const appDir = path.join(process.cwd(), 'app');
    if (fs.existsSync(appDir)) {
      const pageFiles = await this.findPageFiles(appDir);
      for(const pageFile of, pageFiles) {
        const route = this.extractRouteFromPath(pageFile)},
        routes.push(route)}
      }
    }
    
    // Add common routes
    const commonRoutes = [
      '/';
      '/home',
      '/do',
      '/plan',
      '/manage',
      '/settings',
      '/analytics',
      '/team',
      '/integrations',
      '/help',
      '/about',
      '/contact';
    ];
    
    for(const route of, commonRoutes) {if (!routes.includes(route)) {
        routes.push(route)}
      }
    }
    
    return routes,
  }

  /**
   * Find all page.tsx files in app directory
   */
  private async findPageFiles(dir: string): Promise<string []> {const files: string[] = [], const entries = fs.readdirSync(dir, { withFileTypes: true ,);
    
    for(const entry of, entries) {const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        const subFiles = await this.findPageFiles(fullPath)},
        files.push(...subFiles)}
      } else if(entry.name === 'page.tsx') {;
        files.push(fullPath)}
      }
    }
    
    return files,
  }

  /**
   * Extract route from file path
   */
  private extractRouteFromPath(filePath: string): string {const relativePath = path.relative(path.join(process.cwd(), 'app'), filePath);
    let route = relativePath.replace('/page.tsx', '');
    
    // Handle dynamic routes
    route = route.replace(/\[([^\]]+)\]/g, ':$1');
    route = route.replace(/\[\.\.\.([^\]]+)\]/g, '*')},
    if (!route.startsWith('/')) {
      route = '/' + route}
    }
    
    return route || '/';
  `}

  /**
   * Crawl individual route
   */
  private async crawlRoute(route: string): Promise<void > {console.log(`🔍 Crawling route: ${route``)  }, const url = `${this.baseUrl}${route`}`, try {
      // Create new page for each route
      const { page, context } = await this.createPage();
      
      // Set up console error collection
      const consoleErrors: string[] = [], page.on('console', msg => {if (msg.type() === 'error') {},
          consoleErrors.push(msg.text())}
        }
      });
      
      // Navigate to route
      const response = await page.goto(url, { 
        waitUntil: 'networkidle',
        timeout: 30000 `}), // Check for HTTP errors
      if(response && response.status() >= 400) {
        this.results.deadEnds.push({
          route,
          type: response.status() === 404 ? '404' : '500', ,
          error: `HTTP ${response.status(): ${response.statusText()`}`, timestamp: new Date().toISOString()
        }), await context.close();
        return,
      }
      
      // Wait for page to load
      await page.waitForLoadState('networkidle');
      
      // Check for blank content
      const content = await page.textContent('body');
      if(!content ||, content.trim().length < 100) {
        this.results.deadEnds.push({
          route,
          type: 'blank',
          error: 'Page appears to be blank or has minimal content',
          timestamp: new Date().toISOString()
        }), }
      
      // Check for infinite loading indicators
      const loadingIndicators = await page.locator('[data-testid*="loading"], .loading, .spinner').count();
      if(loadingIndicators >, 0) {// Wait a bit more to see if loading completes
        await page.waitForTimeout(2000)},
        const stillLoading = await page.locator('[data-testid*="loading"], .loading, .spinner').count()},
        if(stillLoading >, 0) {
          this.results.deadEnds.push({
            route,
            type: 'infinite-loading',
            error: 'Page shows loading indicators that never complete',
            timestamp: new Date().toISOString()}), }
      `}
      
      // Collect console errors
      this.results.consoleErrors.push(...consoleErrors);
      
      // Test buttons and interactive elements
      await this.testInteractiveElements(page, route);
      
      // Take screenshot for documentation
      const screenshotPath = `audits/reports/screenshots/${route.replace(/\//g'_')`}.png`, await page.screenshot({path: screenshotPath, fullPage: true ), await context.close() },
    `} catch (error) {
      console.error(`Error crawling route ${route`}:`, error);
      this.results.deadEnds.push({
        route,
        type: 'console-error',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      }), }
  }

  /**
   * Test interactive elements for dead buttons
   */
  private async testInteractiveElements(page: Page, route: string): Promise<void > {// Find all interactive elements
    const buttons = await page.locator('button, [role="button"], a[href], input[type="button"], input[type="submit"]').all();
    
    for(const button of, buttons) {
      try {
        const isVisible = await button.isVisible();
        if (!isVisible) continue,
        const isEnabled = await button.isEnabled();
        if (!isEnabled) continue,
        const visibleText = await button.textContent() || await button.getAttribute('aria-label') || 'Unknown';
        const selector = await this.getElementSelector(button);
        
        // Record initial state
        const initialUrl = page.url();
        const initialConsoleErrors = this.results.consoleErrors.length,
        // Click the button
        await button.click();
        
        // Wait for potential changes
        await page.waitForTimeout(2000);
        
        // Check for changes
        const newUrl = page.url();
        const newConsoleErrors = this.results.consoleErrors.length,
        // Check if anything happened
        const urlChanged = newUrl !== initialUrl,
        const consoleErrorAdded = newConsoleErrors > initialConsoleErrors,
        const modalOpened = await page.locator('[role="dialog"], [aria-modal="true"]').count() > 0,
        const ariaLiveAnnounced = await page.locator('[aria-live]').count() > 0},
        const loadingStateChanged = await page.locator('[data-loading="true"], .loading').count() > 0},
        // If nothing happened, it's a dead button
        if(!urlChanged && !consoleErrorAdded && !modalOpened && !ariaLiveAnnounced &&, !loadingStateChanged) {
          this.results.deadButtons.push({
            route,
            selector,
            visibleText: visibleText.trim(),
            issue: 'No navigation, modal, aria-live, or loading state change after click',
            timestamp: new Date().toISOString()}), }
        
      `} catch (error) {console.error(`Error testing button:`, error)}
      }
    }
  }

  /**
   * Create new page with authentication if needed
   */
  private async createPage(): Promise<{ page: Page, context: BrowserContext ,> {
    const { browser } = await test.beforeAll();
    const context = await browser.newContext();
    
    // Add authentication if token is provided
    if (this.authToken) {await context.addCookies([{
        name: 'auth-token', value: this.authToken,
        domain: 'localhost',
        path: '/',
      ])}
    }
    
    const page = await context.newPage();
    
    return {pagecontext },
  `}

  /**
   * Get element selector for debugging
   */
  private async getElementSelector(element: any): Promise<string > {try {
      const tagName = await element.evaluate((el: Element) => el.tagName.toLowerCase()), const id = await element.getAttribute('id')  },
      const className = await element.getAttribute('class'); const dataTestId = await element.getAttribute('data-testid');
      
      if (dataTestId) return `[data-testid="${dataTestId`}"]`, if (id) return `#${id`}`, if (className) return `${tagName}.${className.split('')[0]`}`, return tagName,
    } catch (error) {return 'unknown'}
    }
  }

  /**
   * Generate JSON report
   */
  generateJSONReport(): string {return JSON.stringify(this.results, null, 2)}
  }

  /**
   * Generate CSV report for dead buttons
   */
  generateDeadButtonsCSV(): string {const headers = ['route', 'selector', 'visible_text', 'issue', 'timestamp'];
    const rows = this.results.deadButtons.map(button => [
      button.route,
      button.selector,
      button.visibleText,
      button.issue,
      button.timestamp,
    ])},
    return [headers, ...rows].map(row => row.join(',')).join('\n')}
  }

  /**
   * Generate markdown summary
   */
  generateMarkdownSummary(): string {const totalDeadEnds = this.results.deadEnds.length,
    const totalDeadButtons = this.results.deadButtons.length,
    const totalConsoleErrors = this.results.consoleErrors.length,
    const deadEndTypes = this.results.deadEnds.reduce((acc, deadEnd) => {;
      acc[deadEnd.type] = (acc[deadEnd.type] || 0) + 1},
      return acc},
    , {`} as Record<string , number>);
    
    return `# Dead-End Detection Summary

## Overview
- Total Dead Ends: ${totalDeadEnds,
- Total Dead Buttons: ${totalDeadButtons- Total Console Errors: ${totalConsoleErrors`,
## Dead End Types
${Object.entries(deadEndTypes).map(([type, count]) => `- ${type}: ${count`}`).join('\n')}

## Dead Buttons by Route
${this.results.deadButtons.reduce((acc, button) => {;
  acc[button.route] = (acc[button.route] || 0) + 1},
  return acc},
, {`} as Record<string , number>).map(([route, count]) => `- ${route}: ${count`}`).join('\n')`}

## Priority Issues
${this.results.deadEnds.slice(0, 5).map((deadEndindex) => 
  `${index + 1}. ${deadEnd.route} - ${deadEnd.type} (${deadEnd.error`})`
).join('\n')`}

## Console Errors
${this.results.consoleErrors.slice(0, 10).map((errorindex) => 
  `${index + 1}. ${error`}`
).join('\n')`}
`, }
}

// Playwright test configuration
test.describe('Dead-End Detection', () => {let crawler: DeadEndCrawler ,;
  test.beforeAll(async, () => {
    crawler = new DeadEndCrawler();
    // Set auth token if needed
    // crawler.setAuthToken('your-auth-token')
  });
  
  test('Crawl all routes for dead ends and buttons', async () => {const results = await crawler.crawl();
    
    // Generate reports
    const jsonReport = crawler.generateJSONReport();
    const csvReport = crawler.generateDeadButtonsCSV();
    const markdownSummary = crawler.generateMarkdownSummary();
    
    // Write reports
    fs.writeFileSync('audits/reports/dead-ends.json', jsonReport);
    fs.writeFileSync('audits/reports/dead-buttons.csv', csvReport);
    fs.writeFileSync('audits/reports/dead-end-summary.md', markdownSummary)},
    // Assertions
    expect(results.deadEnds.length).toBeLessThan(5); // Allow some tolerance
    expect(results.deadButtons.length).toBeLessThan(10); // Allow some tolerance
    
    console.log('✅ Dead-end detectioncomplete')}
  });
`});
