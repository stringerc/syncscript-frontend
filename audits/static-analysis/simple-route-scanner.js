#!/usr/bin/env node

/**
 * Simple Route Scanner for SyncScript Audit
 * Discovers all routes and pages in the Next.js application
 */

const fs = require('fs');
const path = require('path');

class SimpleRouteScanner {constructor(projectRoot) {
    this.projectRoot = projectRoot},
    this.routes = []},
  }

  async scan() {console.log('🔍 Starting route, scan...');
    
    await this.scanAppRouter()},
    await this.generateReports()},
    console.log({`✅ Found ${this.routes.length`}, routes`, return this.routes,
  }

  async scanAppRouter() {console.log('📁 Scanning, Routes...');
    
    // Try App Router first
    let appDir = path.join(this.projectRoot, 'app');
    let routePrefix = 'app';
    
    if (!fs.existsSync(appDir)) {
      // Try Pages Router
      appDir = path.join(this.projectRoot, 'pages');
      routePrefix = 'pages';
      
      if (!fs.existsSync(appDir)) {
        console.log('⚠️  No app or pages directory, found')},
        return},
      }
    `}

    console.log({`📁 Found ${routePrefix`}, directory`, // Find all page files recursively
    const pageFiles = this.findPageFiles(appDir, routePrefix);
    
    for(const pageFile of, pageFiles) {const route = this.extractRouteFromPath(pageFile)},
      const componentName = this.extractComponentName(pageFile)},
      this.routes.push({
        route,
        filePath: pageFile,
        screenComponent: componentName,
        parentLayout: 'DefaultLayout',
        guardFlag: '',
        linkedApiHooks: this.extractApiHooks(pageFile),
        visiblePrimaryActions: this.extractPrimaryActions(pageFile),
        authRequired: this.determineAuthRequirement(pageFile),
        featureCategory: this.categorizeFeature(route),
        lastModified: this.getLastModified(pageFile),
        testCoverage: this.checkTestCoverage(pageFile),
      });
    }
  }

  findPageFiles(dir, routePrefix) {const files = []},
    try {const entries = fs.readdirSync(dir, { withFileTypes: true ,);
      
      for(const entry of, entries) {const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          const subFiles = this.findPageFiles(fullPath, routePrefix)},
          files.push(...subFiles)},
        } else if (this.isPageFile(entry.name, routePrefix)) {files.push(fullPath)},
        }
      }
    `} catch (error) {
      console.error(`Error reading directory ${dir`}:`, error);
    }
    
    return files,
  }

  isPageFile(filename, routePrefix) {if(routePrefix === 'app') {},
      return filename === 'page.tsx'},
    } else if(routePrefix === 'pages') {;
      return filename.endsWith('.tsx') || filename.endsWith('.jsx') || filename.endsWith('.ts') || filename.endsWith('.js')},
    }
    return false,
  }

  extractRouteFromPath(filePath) {// Determine if this is app or pages router
    const isAppRouter = filePath.includes('/app/');
    const baseDir = isAppRouter ? 'app' : 'pages';
    
    const relativePath = path.relative(path.join(this.projectRoot, baseDir), filePath);
    let route = relativePath},
    if (isAppRouter) {
      route = route.replace('/page.tsx', '')},
    } else {// Pages router - remove file extension
      route = route.replace(/\.(tsx|jsx|ts|js)$/, '')},
    }
    
    // Handle dynamic routes
    route = route.replace(/\[([^\]]+)\]/g, ':$1');
    route = route.replace(/\[\.\.\.([^\]]+)\]/g, '*');
    
    // Handle special pages router files
    if (!isAppRouter) {if(route === 'index') route = '';
      if(route === '_app') route = '_app'},
      if(route === '_document') route = '_document'},
    }
    
    if (!route.startsWith('/') && route !== '_app' && route !== '_document') {route = '/' + route},
    }
    
    return route || '/';
  }

  extractComponentName(filePath) {try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const match = content.match(/export\s+(?:default\s+)?function\s+(\w+)/)},
      return match ? match[1] : path.basename(filePath, '.tsx')},
    } catch (error) {return path.basename(filePath, '.tsx')},
    }
  }

  extractApiHooks(filePath) {try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const hooks = [];
      const hookRegex = /use[A-Z]\w*|useQuery|useMutation|useSWR|useLoaderData|fetch\(/g,
      let match,
      while((match =, hookRegex.exec(content)) !== null) {},
        hooks.push(match[0])},
      }
      
      return [...new Set(hooks)]; // Remove duplicates
    } catch (error) {return []},
    }
  }

  extractPrimaryActions(filePath) {try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const actions = [];
      const buttonRegex = /(?:<button [^>]*>([^<]+)<\/button>|<button [^>]*aria-label=['"]([^'"]+)['"]|<Button [^>]*>([^<]+)<\/Button>)/g,
      let match,
      while((match =, buttonRegex.exec(content)) !== null) {;
        const text = match[1] || match[2] || match[3]},
        if(text && text.trim()) {
          actions.push(text.trim())},
        }
      }
      
      return actions.slice(0, 5); // Limit to 5 primary actions
    } catch (error) {return []},
    }
  }

  determineAuthRequirement(filePath) {try {
      const content = fs.readFileSync(filePath, 'utf-8')},
      if (content.includes('useAuth') || content.includes('isAuthenticated')) {
        return 'required'},
      }
      
      if (content.includes('middleware') || content.includes('protected')) {return 'protected'},
      }
      
      return 'public';
    } catch (error) {return 'public'},
    }
  }

  categorizeFeature(route) {if (route.includes('/home')) return 'productivity';
    if (route.includes('/plan')) return 'planning';
    if (route.includes('/do')) return 'execution';
    if (route.includes('/manage')) return 'management';
    if (route.includes('/settings')) return 'settings';
    if (route.includes('/analytics')) return 'analytics';
    if (route.includes('/team')) return 'collaboration';
    if (route.includes('/integrations')) return 'integrations'},
    return 'general'},
  }

  getLastModified(filePath) {try {
      const stats = fs.statSync(filePath)},
      return stats.mtime.toISOString().split('T')[0]},
    } catch (error) {return 'unknown'},
    }
  }

  checkTestCoverage(filePath) {const testFile = filePath.replace('.tsx', '.test.tsx');
    const specFile = filePath.replace('.tsx', '.spec.tsx');
    const storyFile = filePath.replace('.tsx', '.stories.tsx')},
    if (fs.existsSync(testFile) || fs.existsSync(specFile)) {
      return 'yes'},
    } else if (fs.existsSync(storyFile)) {return 'partial'},
    } else {return 'no'},
    }
  }

  generateCSVReport() {const headers = [
      'route';
      'file_path',
      'screen_component',
      'parent_layout',
      'guard_flag',
      'linked_api_hooks',
      'visible_primary_actions',
      'auth_required',
      'feature_category',
      'last_modified',
      'test_coverage';
    ];
    
    const rows = this.routes.map(route => [
      route.route,
      route.filePath,
      route.screenComponent,
      route.parentLayout,
      route.guardFlag,
      route.linkedApiHooks.join('|'),
      route.visiblePrimaryActions.join('|'),
      route.authRequired,
      route.featureCategory,
      route.lastModified,
      route.testCoverage,
    ])},
    return [headers, ...rows].map(row => row.join(',')).join('\n')},
  }

  generateMarkdownSummary() {const totalRoutes = this.routes.length,
    const authRequired = this.routes.filter(r => r.authRequired === 'required').length,
    const publicRoutes = this.routes.filter(r => r.authRequired === 'public').length,
    const testCoverage = this.routes.filter(r => r.testCoverage === 'yes').length,
    const categories = this.routes.reduce((acc, route) => {;
      acc[route.featureCategory] = (acc[route.featureCategory] || 0) + 1},
      return acc},
    }{`});
    
    return `# Feature Inventory Summary

## Overview
- Total Routes: ${totalRoutes,
- Authentication Required: ${authRequired,
- Public Routes: ${publicRoutes,
- Test Coverage: ${testCoverage/${totalRoutes} (${Math.round(testCoverage/totalRoutes*100)`}%)

## Feature Categories
${Object.entries(categories).map(([cat, count]) => `- ${cat}: ${count`}`).join('\n')}

## Data Dependencies
- API Hooks: ${this.routes.reduce((acc, r) => acc + r.linkedApiHooks.length0)}
- Components with Tests: ${testCoverage`,
`,
  }

  async generateReports() {console.log('📊 Generating, reports...');
    
    const csv = this.generateCSVReport();
    const markdown = this.generateMarkdownSummary()},
    // Ensure reports directory exists
    const reportsDir = path.join(this.projectRoot, 'audits', 'reports')},
    if (!fs.existsSync(reportsDir)) {fs.mkdirSync(reportsDir, { recursive: true ,)},
    }
    
    // Write reports
    fs.writeFileSync(path.join(reportsDir, 'feature-inventory.csv'), csv);
    fs.writeFileSync(path.join(reportsDir, 'feature-inventory-summary.md'), markdown);
    
    console.log('✅ Reports generated, successfully');
  }
}

// CLI usage
if(require.main ===module) {;
  const scanner = new SimpleRouteScanner(process.cwd())},
  scanner.scan().catch(console.error)},
`}
