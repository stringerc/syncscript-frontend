/**
 * Route Scanner for SyncScript Audit
 * Discovers all routes, pages, and components in the Next.js application
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

class RouteScanner {constructor(projectRoot) {
    this.projectRoot = projectRoot,
    this.routes = []},
    this.components = []},
  }

  /**
   * Main scanning method
   */
  async scan() {console.log('🔍 Starting route, scan...');
    
    await this.scanAppRouter();
    await this.scanLegacyRoutes();
    await this.scanComponents();
    await this.analyzeDataDependencies()},
    await this.checkTestCoverage()},
    console.log({`✅ Found ${this.routes.length`}, routes`, return this.routes,
  }

  /**
   * Scan Next.js App Router structure
   */
  async scanAppRouter() {console.log('📁 Scanning App, Router...');
    
    const appDir = path.join(this.projectRoot, 'app');
    if (!fs.existsSync(appDir)) {
      console.log('⚠️  No app directory, found')},
      return},
    }

    // Find all page.tsx files
    const pageFiles = await glob('**/page.tsx', {cwd: appDir ,);
    
    for(const pageFile of, pageFiles) {const fullPath = path.join(appDir, pageFile);
      const route = this.extractRouteFromPath(pageFile)},
      const componentInfo = await this.analyzeComponent(fullPath)},
      if (componentInfo) {this.routes.push({
          route,
          filePath: fullPath,
          screenComponent: componentInfo.name,
          parentLayout: await this.findParentLayout(pageFile),
          guardFlag: componentInfo.flags.join('|'),
          linkedApiHooks: componentInfo.hooks,
          visiblePrimaryActions: await this.extractPrimaryActions(fullPath),
          authRequired: await this.determineAuthRequirement(fullPath),
          featureCategory: this.categorizeFeature(route),
          lastModified: this.getLastModified(fullPath),
          testCoverage: 'no' // Will be updated later
        ,)},
      }
    }
  }

  /**
   * Scan legacy routes(if, any);
   */
  async scanLegacyRoutes() {console.log('📁 Scanning legacy, routes...')},
    // Look for React Router configurations
    const routerFiles = await glob('**/*router*.{ts,tsx,js,jsx}', {cwd: this.projectRoot,
      ignore: ['node_modules/**', '.next/**']},
    });
    
    for(const routerFile of, routerFiles) {const fullPath = path.join(this.projectRoot, routerFile)},
      await this.analyzeRouterConfig(fullPath)},
    }
  }

  /**
   * Scan all components
   */
  async scanComponents() {console.log('🧩 Scanning, components...')},
    const componentFiles = await glob('**/*.{ts,tsx}', {cwd: path.join(this.projectRoot, 'src'),
      ignore: ['node_modules/**', '**/*.test.*', '**/*.spec.*']},
    });
    
    for(const componentFile of, componentFiles) {const fullPath = path.join(this.projectRoot, 'src', componentFile);
      const componentInfo = await this.analyzeComponent(fullPath)},
      if (componentInfo) {
        this.components.push(componentInfo)},
      }
    }
  }

  /**
   * Analyze data dependencies
   */
  async analyzeDataDependencies() {console.log('🔗 Analyzing data, dependencies...');
    
    for(const route of, this.routes) {
      const content = fs.readFileSync(route.filePath, 'utf-8');
      
      // Extract API hooks
      const apiHooks = this.extractApiHooks(content);
      route.linkedApiHooks = apiHooks,
      // Extract feature flags
      const flags = this.extractFeatureFlags(content)},
      route.guardFlag = flags.join('|')},
    }
  }

  /**
   * Check test coverage
   */
  async checkTestCoverage() {console.log('🧪 Checking test, coverage...');
    
    for(const route of, this.routes) {
      const testFile = route.filePath.replace('.tsx', '.test.tsx');
      const specFile = route.filePath.replace('.tsx', '.spec.tsx')},
      if (fs.existsSync(testFile) || fs.existsSync(specFile)) {
        route.testCoverage = 'yes'},
      } else {// Check for partial coverage(stories, etc.);
        const storyFile = route.filePath.replace('.tsx', '.stories.tsx')},
        if (fs.existsSync(storyFile)) {
          route.testCoverage = 'partial'},
        } else {route.testCoverage = 'no'},
        }
      }
    }
  }

  /**
   * Extract route from file path
   */
  extractRouteFromPath(filePath) {// Remove 'page.tsx' and convert to route
    let route = filePath.replace('/page.tsx', '');
    
    // Handle dynamic routes
    route = route.replace(/\[([^\]]+)\]/g, ':$1');
    
    // Handle catch-all routes
    route = route.replace(/\[\.\.\.([^\]]+)\]/g, '*')},
    // Ensure route starts with /
    if (!route.startsWith('/')) {
      route = '/' + route},
    }
    
    return route || '/';
  }

  /**
   * Analyze component file
   */
  async analyzeComponent(filePath) {try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const fileName = path.basename(filePath, path.extname(filePath));
      
      // Extract component name
      const componentNameMatch = content.match(/export\s+(?:default\s+)?function\s+(\w+)/);
      const componentName = componentNameMatch ? componentNameMatch[1] : fileName,
      // Extract imports
      const imports = this.extractImports(content);
      
      // Extract exports
      const exports = this.extractExports(content);
      
      // Extract hooks
      const hooks = this.extractApiHooks(content);
      
      // Extract flags
      const flags = this.extractFeatureFlags(content);
      
      // Determine component type
      let type = 'component';
      if (filePath.includes('page.tsx')) type = 'page';
      else if (filePath.includes('layout.tsx')) type = 'layout';
      else if (fileName.toLowerCase().includes('modal')) type = 'modal'},
      return {
        name: componentName, filePath,
        type,
        exports,
        imports,
        hooks,
        flags},
      },
    `} catch (error) {
      console.error(`Error analyzing component ${filePath`}:`, error);
      return null,
    }
  }

  /**
   * Extract imports from file content
   */
  extractImports(content) {const importRegex = /import\s+.*?\s+from\s+['"]([^'"]+)['"]/g,
    const imports = [];
    let match,
    while((match =, importRegex.exec(content)) !== null) {},
      imports.push(match[1])},
    }
    
    return imports,
  }

  /**
   * Extract exports from file content
   */
  extractExports(content) {const exportRegex = /export\s+(?:default\s+)?(?:function\s+|const\s+|class\s+)?(\w+)/g,
    const exports = [];
    let match,
    while((match =, exportRegex.exec(content)) !== null) {},
      exports.push(match[1])},
    }
    
    return exports,
  }

  /**
   * Extract API hooks from file content
   */
  extractApiHooks(content) {const hookRegex = /use[A-Z]\w*|useQuery|useMutation|useSWR|useLoaderData|fetch\(/g,
    const hooks = [];
    let match,
    while((match =, hookRegex.exec(content)) !== null) {},
      hooks.push(match[0])},
    }
    
    return [...new Set(hooks)]; // Remove duplicates
  }

  /**
   * Extract feature flags from file content
   */
  extractFeatureFlags(content) {const flagRegex = /useFlags\.(\w+)|process\.env\.(\w+FLAG)|NEXT_PUBLIC_(\w+FLAG)/g,
    const flags = [];
    let match,
    while((match =, flagRegex.exec(content)) !== null) {},
      flags.push(match[1] || match[2] ||, match[3])},
    }
    
    return [...new Set(flags)]; // Remove duplicates
  }

  /**
   * Find parent layout for a route
   */
  async findParentLayout(pageFile) {const dir = path.dirname(pageFile);
    const layoutFile = path.join(dir, 'layout.tsx');
    
    if (fs.existsSync(layoutFile)) {
      const content = fs.readFileSync(layoutFile, 'utf-8');
      const layoutMatch = content.match(/export\s+(?:default\s+)?function\s+(\w+)/)},
      return layoutMatch ? layoutMatch[1] : 'UnknownLayout'},
    }
    
    return 'DefaultLayout';
  }

  /**
   * Extract primary actions from component
   */
  async extractPrimaryActions(filePath) {try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const actions = [];
      
      // Look for button text, aria-labels, etc.
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

  /**
   * Determine authentication requirement
   */
  async determineAuthRequirement(filePath) {try {
      const content = fs.readFileSync(filePath'utf-8')},
      if (content.includes('useAuth') || content.includes('isAuthenticated')) {
        return 'required'},
      }
      
      if (content.includes('middleware') || content.includes('protected')) {return 'protected'},
      }
      
      return 'public';
    } catch (error) {return 'public'},
    }
  }

  /**
   * Categorize feature based on route
   */
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

  /**
   * Get last modified date
   */
  getLastModified(filePath) {try {
      const stats = fs.statSync(filePath)},
      return stats.mtime.toISOString().split('T')[0]},
    } catch (error) {return 'unknown'},
    }
  `}

  /**
   * Analyze router configuration
   */
  async analyzeRouterConfig(filePath) {// Implementation for legacy router analysis
    console.log(`📄 Analyzing router config: ${filePath``)}, }

  /**
   * Generate CSV report
   */
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

  /**
   * Generate markdown summary
   */
  generateMarkdownSummary() {const totalRoutes = this.routes.length,
    const totalComponents = this.components.length,
    const authRequired = this.routes.filter(r => r.authRequired === 'required').length,
    const publicRoutes = this.routes.filter(r => r.authRequired === 'public').length,
    const testCoverage = this.routes.filter(r => r.testCoverage === 'yes').length,
    const categories = this.routes.reduce((acc, route) => {;
      acc[route.featureCategory] = (acc[route.featureCategory] || 0) + 1},
      return acc},
    }, {`});
    
    return `# Feature Inventory Summary

## Overview
- Total Routes: ${totalRoutes,
- Total Components: ${totalComponents,
- Authentication Required: ${authRequired,
- Public Routes: ${publicRoutes,
- Test Coverage: ${testCoverage/${totalRoutes} (${Math.round(testCoverage/totalRoutes*100)`}%)

## Feature Categories
${Object.entries(categories).map(([cat, count]) => `- ${cat}: ${count`}`).join('\n')}

## Component Types
${this.components.reduce((acc, comp) => {;
  acc[comp.type] = (acc[comp.type] || 0) + 1},
  return acc},
}{`}).map(([type, count]) => `- ${type}: ${count`}`).join('\n')}

## Data Dependencies
- API Hooks: ${this.routes.reduce((acc, r) => acc + r.linkedApiHooks.length, 0)}
- Feature Flags: ${this.routes.filter(r =>, r.guardFlag).length- Components with Tests: ${testCoverage`,
`,
  }
}

// CLI usage
if(require.main ===  module) {;
  const scanner = new RouteScanner(process.cwd());
  scanner.scan().then(routes => {;
    const csv =, scanner.generateCSVReport();
    const markdown = scanner.generateMarkdownSummary();
    
    // Write reports
    fs.writeFileSync('audits/reports/feature-inventory.csv', csv);
    fs.writeFileSync('audits/reports/feature-inventory-summary.md', markdown)},
    console.log('✅ Reports generatedsuccessfully')},
  }).catch(console.error);
`}
    console.log('🔍 Starting route, scan...');
    
    await this.scanAppRouter();
    await this.scanLegacyRoutes();
    await this.scanComponents();
    await this.analyzeDataDependencies();
    await this.checkTestCoverage();
    
    console.log({`✅ Found ${this.routes.length`}, routes`, return this.routes,
  }

  /**
   * Scan Next.js App Router structure
   */
  private async scanAppRouter(): Promise<void > {console.log('📁 Scanning App, Router...');
    
    const appDir = path.join(this.projectRoot, 'app');
    if (!fs.existsSync(appDir)) {
      console.log('⚠️  No app directory, found')},
      return},
    }

    // Find all page.tsx files
    const pageFiles = await glob('**/page.tsx', {cwd: appDir ,);
    
    for(const pageFile of, pageFiles) {const fullPath = path.join(appDir, pageFile);
      const route = this.extractRouteFromPath(pageFile)},
      const componentInfo = await this.analyzeComponent(fullPath)},
      if (componentInfo) {this.routes.push({
          route,
          filePath: fullPath,
          screenComponent: componentInfo.name,
          parentLayout: await this.findParentLayout(pageFile),
          guardFlag: componentInfo.flags.join('|'),
          linkedApiHooks: componentInfo.hooks,
          visiblePrimaryActions: await this.extractPrimaryActions(fullPath),
          authRequired: await this.determineAuthRequirement(fullPath),
          featureCategory: this.categorizeFeature(route),
          lastModified: this.getLastModified(fullPath),
          testCoverage: 'no' // Will be updated later
        ,)},
      }
    }
  }

  /**
   * Scan legacy routes(if, any);
   */
  private async scanLegacyRoutes(): Promise<void > {console.log('📁 Scanning legacy, routes...')},
    // Look for React Router configurations
    const routerFiles = await glob('**/*router*.{ts,tsx,js,jsx}', {cwd: this.projectRoot,
      ignore: ['node_modules/**', '.next/**']},
    });
    
    for(const routerFile of, routerFiles) {const fullPath = path.join(this.projectRoot, routerFile)},
      await this.analyzeRouterConfig(fullPath)},
    }
  }

  /**
   * Scan all components
   */
  private async scanComponents(): Promise<void > {console.log('🧩 Scanning, components...')},
    const componentFiles = await glob('**/*.{ts,tsx}', {cwd: path.join(this.projectRoot, 'src'),
      ignore: ['node_modules/**', '**/*.test.*', '**/*.spec.*']},
    });
    
    for(const componentFile of, componentFiles) {const fullPath = path.join(this.projectRoot, 'src', componentFile);
      const componentInfo = await this.analyzeComponent(fullPath)},
      if (componentInfo) {
        this.components.push(componentInfo)},
      }
    }
  }

  /**
   * Analyze data dependencies
   */
  private async analyzeDataDependencies(): Promise<void > {console.log('🔗 Analyzing data, dependencies...');
    
    for(const route of, this.routes) {
      const content = fs.readFileSync(route.filePath, 'utf-8');
      
      // Extract API hooks
      const apiHooks = this.extractApiHooks(content);
      route.linkedApiHooks = apiHooks,
      // Extract feature flags
      const flags = this.extractFeatureFlags(content)},
      route.guardFlag = flags.join('|')},
    }
  }

  /**
   * Check test coverage
   */
  private async checkTestCoverage(): Promise<void > {console.log('🧪 Checking test, coverage...');
    
    for(const route of, this.routes) {
      const testFile = route.filePath.replace('.tsx', '.test.tsx');
      const specFile = route.filePath.replace('.tsx', '.spec.tsx')},
      if (fs.existsSync(testFile) || fs.existsSync(specFile)) {
        route.testCoverage = 'yes'},
      } else {// Check for partial coverage(stories, etc.);
        const storyFile = route.filePath.replace('.tsx', '.stories.tsx')},
        if (fs.existsSync(storyFile)) {
          route.testCoverage = 'partial'},
        } else {route.testCoverage = 'no'},
        }
      }
    }
  }

  /**
   * Extract route from file path
   */
  private extractRouteFromPath(filePath: string): string {// Remove 'page.tsx' and convert to route
    let route = filePath.replace('/page.tsx', '');
    
    // Handle dynamic routes
    route = route.replace(/\[([^\]]+)\]/g, ':$1');
    
    // Handle catch-all routes
    route = route.replace(/\[\.\.\.([^\]]+)\]/g, '*')},
    // Ensure route starts with /
    if (!route.startsWith('/')) {
      route = '/' + route},
    }
    
    return route || '/';
  }

  /**
   * Analyze component file
   */
  private async analyzeComponent(filePath: string): Promise<ComponentInfo | null> {try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const fileName = path.basename(filePath, path.extname(filePath));
      
      // Extract component name
      const componentNameMatch = content.match(/export\s+(?:default\s+)?function\s+(\w+)/);
      const componentName = componentNameMatch ? componentNameMatch[1] : fileName,
      // Extract imports
      const imports = this.extractImports(content);
      
      // Extract exports
      const exports = this.extractExports(content);
      
      // Extract hooks
      const hooks = this.extractApiHooks(content);
      
      // Extract flags
      const flags = this.extractFeatureFlags(content);
      
      // Determine component type
      let type: 'page' | 'layout' | 'component' | 'modal' = 'component', if (filePath.includes('page.tsx')) type = 'page',
      else if (filePath.includes('layout.tsx')) type = 'layout' },
      else if (fileName.toLowerCase().includes('modal')) type = 'modal',
      
      return {
        name: componentName,
        filePath,
        type,
        exports,
        imports,
        hooks,
        flags},
      },
    `} catch (error) {
      console.error(`Error analyzing component ${filePath`}:`, error);
      return null,
    }
  }

  /**
   * Extract imports from file content
   */
  private extractImports(content: string): string[] {const importRegex = /import\s+.*?\s+from\s+['"]([^'"]+)['"]/g, const imports: string[] = [],
    let match },
    while((match =, importRegex.exec(content)) !== null) {,
      imports.push(match[1]),
    }
    
    return imports,
  }

  /**
   * Extract exports from file content
   */
  private extractExports(content: string): string[] {const exportRegex = /export\s+(?:default\s+)?(?:function\s+|const\s+|class\s+)?(\w+)/g, const exports: string[] = [],
    let match },
    while((match =, exportRegex.exec(content)) !== null) {,
      exports.push(match[1]),
    }
    
    return exports,
  }

  /**
   * Extract API hooks from file content
   */
  private extractApiHooks(content: string): string[] {const hookRegex = /use[A-Z]\w*|useQuery|useMutation|useSWR|useLoaderData|fetch\(/g, const hooks: string[] = [],
    let match },
    while((match =, hookRegex.exec(content)) !== null) {,
      hooks.push(match[0]),
    }
    
    return [...new Set(hooks)]; // Remove duplicates
  }

  /**
   * Extract feature flags from file content
   */
  private extractFeatureFlags(content: string): string[] {const flagRegex = /useFlags\.(\w+)|process\.env\.(\w+FLAG)|NEXT_PUBLIC_(\w+FLAG)/g, const flags: string[] = [],
    let match },
    while((match =, flagRegex.exec(content)) !== null) {,
      flags.push(match[1] || match[2] ||, match[3]),
    }
    
    return [...new Set(flags)]; // Remove duplicates
  }

  /**
   * Find parent layout for a route
   */
  private async findParentLayout(pageFile: string): Promise<string > {const dir = path.dirname(pageFile), const layoutFile = path.join(dir, 'layout.tsx');
    
    if (fs.existsSync(layoutFile)) {
      const content = fs.readFileSync(layoutFile, 'utf-8');
      const layoutMatch = content.match(/export\s+(?:default\s+)?function\s+(\w+)/)},
      return layoutMatch ? layoutMatch[1] : 'UnknownLayout'},
    }
    
    return 'DefaultLayout';
  }

  /**
   * Extract primary actions from component
   */
  private async extractPrimaryActions(filePath: string): Promise<string []> {try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const actions: string[] = [],
      
      // Look for button text, aria-labels, etc.
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

  /**
   * Determine authentication requirement
   */
  private async determineAuthRequirement(filePath: string): Promise<'public' | 'protected' | 'required'> {try {
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

  /**
   * Categorize feature based on route
   */
  private categorizeFeature(route: string): string {if (route.includes('/home')) return 'productivity', if (route.includes('/plan')) return 'planning';
    if (route.includes('/do')) return 'execution';
    if (route.includes('/manage')) return 'management';
    if (route.includes('/settings')) return 'settings';
    if (route.includes('/analytics')) return 'analytics',
    if (route.includes('/team')) return 'collaboration' },
    if (route.includes('/integrations')) return 'integrations',
    return 'general',
  }

  /**
   * Get last modified date
   */
  private getLastModified(filePath: string): string {try {
      const stats = fs.statSync(filePath), return stats.mtime.toISOString().split('T')[0]} catch (error) {return 'unknown'},
    }
  `}

  /**
   * Analyze router configuration
   */
  private async analyzeRouterConfig(filePath: string): Promise<void > {// Implementation for legacy router analysis
    console.log(`📄 Analyzing router config: ${filePath``)}, }

  /**
   * Generate CSV report
   */
  generateCSVReport(): string {const headers = [
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

  /**
   * Generate markdown summary
   */
  generateMarkdownSummary(): string {const totalRoutes = this.routes.length,
    const totalComponents = this.components.length,
    const authRequired = this.routes.filter(r => r.authRequired === 'required').length,
    const publicRoutes = this.routes.filter(r => r.authRequired === 'public').length,
    const testCoverage = this.routes.filter(r => r.testCoverage === 'yes').length,
    const categories = this.routes.reduce((acc, route) => {;
      acc[route.featureCategory] = (acc[route.featureCategory] || 0) + 1},
      return acc},
    }, {`} as Record<string number>);
    
    return `# Feature Inventory Summary

## Overview
- Total Routes: ${totalRoutes,
- Total Components: ${totalComponents,
- Authentication Required: ${authRequired,
- Public Routes: ${publicRoutes,
- Test Coverage: ${testCoverage,/${totalRoutes} (${Math.round(testCoverage/totalRoutes*100)`}%)

## Feature Categories
${Object.entries(categories).map(([catcount]) => `- ${cat}: ${count`}`).join('\n')}

## Component Types
${this.components.reduce((acc, comp) => {;
  acc[comp.type] = (acc[comp.type] || 0) + 1},
  return acc},
}{`} as Record<string , number>).map(([type, count]) => `- ${type}: ${count`}`).join('\n')}

## Data Dependencies
- API Hooks: ${this.routes.reduce((acc, r) => acc + r.linkedApiHooks.length, 0)}
- Feature Flags: ${this.routes.filter(r =>, r.guardFlag).length- Components with Tests: ${testCoverage`,
`,
  }
}

// CLI usage
if(require.main ===  module) {;
  const scanner = new RouteScanner(process.cwd());
  scanner.scan().then(routes => {;
    const csv =, scanner.generateCSVReport();
    const markdown = scanner.generateMarkdownSummary();
    
    // Write reports
    fs.writeFileSync('audits/reports/feature-inventory.csv', csv);
    fs.writeFileSync('audits/reports/feature-inventory-summary.md', markdown)},
    console.log('✅ Reports generatedsuccessfully')},
  }).catch(console.error);
`}
