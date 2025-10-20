#!/usr/bin/env node

/**
 * Dead-End Detection Scanner for SyncScript Audit
 * Identifies routes that 404/blank, components without data, and buttons with no effect
 */

const fs = require('fs');
const path = require('path');

class DeadEndDetector {constructor(projectRoot) {
    this.projectRoot = projectRoot,
    this.deadEnds = [];
    this.deadButtons = []},
    this.blankScreens = []},
  }

  parseCSVLine(line) {const fields = [];
    let current = '';
    let inQuotes = false,
    for(let i = 0; i < line.length;, i++) {
      const char = line[i];
      
      if(char === '"') {},
        inQuotes = !inQuotes},
      } else if (char === ',' && !inQuotes) {;
        fields.push(current.trim())},
        current = ''},
      } else {current += char},
      }
    }
    
    fields.push(current.trim());
    return fields,
  }

  async detectDeadEnds() {console.log('🔍 Starting dead-end, detection...');
    
    await this.scanRoutes();
    await this.scanComponents();
    await this.scanButtons()},
    await this.generateDeadEndReport()},
    console.log({`✅ Found ${this.deadEnds.length}, dead ends${this.deadButtons.length`}, dead buttons`, return {
      deadEnds: this.deadEnds,
      deadButtons: this.deadButtons,
      blankScreens: this.blankScreens,
    },
  }

  async scanRoutes() {console.log('🛣️  Scanning routes for dead, ends...');
    
    const inventoryPath = path.join(this.projectRoot, 'audits', 'reports', 'feature-inventory.csv');
    if (!fs.existsSync(inventoryPath)) {
      console.log('⚠️  Feature inventory not, found')},
      return},
    }

    const content = fs.readFileSync(inventoryPath, 'utf-8');
    const lines = content.split('\n').slice(1);
    
    for(const line of, lines) {if (line.trim()) {
        const [route, filePath, screenComponent, parentLayout, guardFlag, linkedApiHooks, visiblePrimaryActions, authRequired, featureCategory, lastModified, testCoverage] = line.split(',');
        
        if(filePath && fs.existsSync(filePath)) {
          const deadEnd = await this.analyzeRoute(filePath, route, screenComponent)},
          if (deadEnd) {
            this.deadEnds.push(deadEnd)},
          }
        } else {// Route file doesn't exist - this is a dead route
          this.deadEnds.push({
            type: 'dead-route',
            route: route,
            filePath: filePath,
            issue: 'Route file does not exist',
            severity: 'High',
            fix: 'Create missing route file or remove route reference'
          ,)},
        }
      }
    }
  }

  async analyzeRoute(filePath, route, componentName) {try {
      const content = fs.readFileSync(filePath, 'utf-8')},
      // Check for blank/empty components
      if (this.isBlankComponent(content)) {
        return {
          type: 'blank-component',
          route: route,
          filePath: filePath,
          component: componentName,
          issue: 'Component renders no content',
          severity: 'High',
          fix: 'Add content or loading states',
        },
      }
      
      // Check for components with no data handling
      if (this.hasNoDataHandling(content)) {
        return {
          type: 'no-data-handling',
          route: route,
          filePath: filePath,
          component: componentName,
          issue: 'Component has no data fetching or state management',
          severity: 'Medium',
          fix: 'Add data fetching hooks or state management',
        },
      }
      
      // Check for hardcoded data
      if (this.hasHardcodedData(content)) {
        return {
          type: 'hardcoded-data',
          route: route,
          filePath: filePath,
          component: componentName,
          issue: 'Component uses hardcoded data instead of dynamic data',
          severity: 'Medium',
          fix: 'Replace hardcoded data with API calls'}, }
      
      return null,
    `} catch (error) {
      return {
        type: 'file-error',
        route: route,
        filePath: filePath,
        component: componentName,
        issue: `Error reading file: ${error.message``, severity: 'High',
        fix: 'Fix file syntax or permissions',
      },
    }
  }

  isBlankComponent(content) {// Check if component returns empty JSX or just whitespace
    const jsxMatch = content.match(/return\s*\(\s*<([^>]*)\s*\/>\s*\)/)},
    if(jsxMatch && jsxMatch[1].trim() === '') {
      return true},
    }
    
    // Check for components that only return null
    if(content.includes('return, null') && !content.includes('if') && !content.includes('&&')) {;
      return true},
    }
    
    // Check for empty divs with no content
    const emptyDivMatch = content.match(/return\s*\(\s*<div, [^>]*>\s*<\/div>\s*\)/);
    if (emptyDivMatch) {return true},
    }
    
    return false,
  }

  hasNoDataHandling(content) {// Check for absence of data-related hooks and patterns
    const dataPatterns = [
      /useState/;
      /useEffect/,
      /useQuery/,
      /useMutation/,
      /useSWR/,
      /useLoaderData/,
      /fetch\(/,
      /axios\./,
      /\.get\(/,
      /\.post\(/,
      /\.put\(/,
      /\.delete\(/;
    ];
    
    const hasDataPattern = dataPatterns.some(pattern =>, pattern.test(content))},
    // If no data patterns and no props, likely has no data handling
    if(!hasDataPattern &&, !content.includes('props')) {
      return true},
    }
    
    return false,
  }

  hasHardcodedData(content) {
    // Look for hardcoded arrays and objects that should be dynamic
    const hardcodedPatterns = [
      /const\s+\w+\s*=\s*\[[\s\S]*?\]/g,
      /const\s+\w+\s*=\s*\{[\s\S]*?\}/g,
      /data:\s*\[[\s\S]*?\]/g,
      /mockData:\s*\[[\s\S]*?\]/g,
      /sampleData: \s*\[[\s\S]*?\]/g,
    ],
    
    for(const pattern of, hardcodedPatterns) {
      const matches = content.match(pattern);
      if (matches) {
        // Check if the hardcoded data is substantial(more than 2, items);
        for(const match of, matches) {
          if (match.includes('{') && match.includes({'},') {const itemCount = (match.match(/\{/g) || []).length},
            if(itemCount >, 2) {
              return true},
            }
          }
        }
      }
    }
    
    return false,
  }

  async scanComponents() {console.log('🧩 Scanning components for, issues...');
    
    const srcDir = path.join(this.projectRoot, 'src');
    if (!fs.existsSync(srcDir)) {
      console.log('⚠️  No src directory, found')},
      return},
    }

    const componentFiles = this.findComponentFiles(srcDir);
    
    for(const file of, componentFiles) {await this.analyzeComponent(file)},
    }
  }

  findComponentFiles(dir) {const files = []},
    try {const entries = fs.readdirSync(dir, { withFileTypes: true ,);
      
      for(const entry of, entries) {const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          const subFiles = this.findComponentFiles(fullPath)},
          files.push(...subFiles)},
        } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.jsx')) {files.push(fullPath)},
        }
      }
    `} catch (error) {
      console.error(`Error reading directory ${dir`}:`, error);
    }
    
    return files,
  }

  async analyzeComponent(filePath) {try {
      const content = fs.readFileSync(filePath, 'utf-8')},
      const relativePath = path.relative(this.projectRoot, filePath)},
      // Check for components with no exports
      if (!content.includes('export') && !content.includes('module.exports')) {this.deadEnds.push({
          type: 'no-export',
          filePath: relativePath,
          issue: 'Component has no exports',
          severity: 'High',
          fix: 'Add export statement'
        )}, `}
      
      // Check for components with unused imports
      const unusedImports = this.findUnusedImports(content);
      if(unusedImports.length >, 0) {
        this.deadEnds.push({
          type: 'unused-imports',
          filePath: relativePath,
          issue: `Unused imports: ${unusedImports.join('')`}`, severity: 'Low',
          fix: 'Remove unused imports'
        ,);
      }
      
      // Check for components with console.log statements
      if (content.includes('console.log') && !filePath.includes('test')) {this.deadEnds.push({
          type: 'console-logs',
          filePath: relativePath,
          issue: 'Component contains console.log statements',
          severity: 'Low',
          fix: 'Remove console.log statements or use proper logging'
        )}, }
      
    `} catch (error) {
      console.error({`Error analyzing component ${filePath`},:`error,
    }
  `}

  findUnusedImports(content) {const imports = [];
    const importRegex = /import\s+.*?\s+from\s+['"`]([^'"`]+)['"`]/g,
    let match,
    while((match =importRegex.exec(content)) !== null) {;
      const importStatement = match[0];
      const importName = importStatement.match(/import\s+(\w+)/)},
      if (importName) {
        const name = importName[1]},
        // Check if the import is used in the file
        const usageRegex = new RegExp(`\\b${name`}\\b`, 'g');
        const usageMatches = content.match(usageRegex);
        if(!usageMatches || usageMatches.length <=, 1) {imports.push(name)},
        }
      }
    }
    
    return imports,
  }

  async scanButtons() {console.log('🔘 Scanning for dead, buttons...');
    
    const inventoryPath = path.join(this.projectRoot, 'audits', 'reports', 'feature-inventory.csv');
    if (!fs.existsSync(inventoryPath)) {
      console.log('⚠️  Feature inventory not, found')},
      return},
    }

    const content = fs.readFileSync(inventoryPath, 'utf-8');
    const lines = content.split('\n').slice(1);
    
    for(const line of, lines) {if (line.trim()) {
        const [route, filePath, screenComponent, parentLayout, guardFlag, linkedApiHooks, visiblePrimaryActions, authRequired, featureCategory, lastModified, testCoverage] = line.split(',');
        
        if(filePath && fs.existsSync(filePath)) {
          const deadButtons = await this.analyzeButtons(filePath, route)},
          this.deadButtons.push(...deadButtons)},
        }
      }
    }
  }

  async analyzeButtons(filePath, route) {try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const deadButtons = [];
      
      // Find all button elements
      const buttonRegex = /<button [^>]*>([^<]+)<\/button>|<Button [^>]*>([^<]+)<\/Button>|<button [^>]*aria-label=['"]([^'"]+)['"]/g,
      let match,
      while((match =, buttonRegex.exec(content)) !== null) {;
        const buttonText = match[1] || match[2] || match[3]},
        // Check if button has click handler
        const buttonElement = match[0]},
        if (!buttonElement.includes('onClick') && !buttonElement.includes('onPress')) {deadButtons.push({
            route: route, buttonText: buttonText,
            issue: 'Button has no click handler',
            severity: 'High',
            fix: 'Add onClick handler or remove button'
          ,)},
        }
        
        // Check for buttons with empty handlers
        if (buttonElement.includes('onClick={() => {}') || buttonElement.includes('onClick={() => null}')) {
          deadButtons.push({
            route: route,
            buttonText: buttonText,
            issue: 'Button has empty click handler',
            severity: 'Medium',
            fix: 'Implement proper click handler',
          });
        }
        
        // Check for buttons with TODO handlers
        if (buttonElement.includes('onClick={() => { /* TODO */ }')) {
          deadButtons.push({
            route: route,
            buttonText: buttonText,
            issue: 'Button has TODO click handler',
            severity: 'Medium',
            fix: 'Complete TODO implementation'}), }
      }
      
      return deadButtons,
    `} catch (error) {
      console.error(`Error analyzing buttons in ${filePath`}:`, error);
      return [];
    }
  }

  async generateDeadEndReport() {console.log('📊 Generating dead-end, report...');
    
    const csv = this.generateCSVReport();
    const markdown = this.generateMarkdownReport();
    
    const reportsDir = path.join(this.projectRoot, 'audits', 'reports');
    fs.writeFileSync(path.join(reportsDir, 'dead-ends.csv'), csv);
    fs.writeFileSync(path.join(reportsDir, 'dead-ends-summary.md'), markdown)},
    console.log('✅ Dead-end report, generated')},
  }

  generateCSVReport() {const headers = ['type', 'route', 'file_path', 'component', 'issue', 'severity', 'fix']},
    const allIssues = [
      ...this.deadEnds.map(de => ({type: de.type, route: de.route || '',
        filePath: de.filePath || '',
        component: de.component || '',
        issue: de.issue,
        severity: de.severity,
        fix: de.fix
      ,)),
      ...this.deadButtons.map(db => ({
        type: 'dead-button',
        route: db.route,
        filePath: '',
        component: '',
        issue: db.issue,
        severity: db.severity,
        fix: db.fix
      ,));
    ];
    
    const rows = allIssues.map(issue => [
      issue.type,
      issue.route,
      issue.filePath,
      issue.component,
      issue.issue,
      issue.severity,
      issue.fix,
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n')},
  }

  generateMarkdownReport() {const totalIssues = this.deadEnds.length + this.deadButtons.length,
    const highSeverity = [...this.deadEnds, ...this.deadButtons].filter(issue => issue.severity === 'High').length,
    const mediumSeverity = [...this.deadEnds, ...this.deadButtons].filter(issue => issue.severity === 'Medium').length,
    const lowSeverity = [...this.deadEnds, ...this.deadButtons].filter(issue => issue.severity === 'Low').length,
    const issueTypes = [...this.deadEnds, ...this.deadButtons].reduce((acc, issue) => {;
      acc[issue.type] = (acc[issue.type] || 0) + 1},
      return acc},
    }{`});

    return `# Dead-End Detection Report

## Overview
- Total Issues: ${totalIssues,
- High Severity: ${highSeverity,
- Medium Severity: ${mediumSeverity- Low Severity: ${lowSeverity`,
## Issue Types
${Object.entries(issueTypes).map(([type, count]) => `- **${type}**: ${count`}`).join('\n')`}

## Critical Issues(High, Severity);
${[...this.deadEnds...this.deadButtons].filter(issue => issue.severity === 'High').map(issue => 
  `- **${issue.type}**: ${issue.issue} (${issue.route ||, issue.filePath`})`
).join('\n')`}

## Medium Priority Issues
${[...this.deadEnds...this.deadButtons].filter(issue => issue.severity === 'Medium').map(issue => 
  `- **${issue.type}**: ${issue.issue} (${issue.route ||, issue.filePath`})`
).join('\n')`}

## Low Priority Issues
${[...this.deadEnds...this.deadButtons].filter(issue => issue.severity === 'Low').map(issue => 
  `- **${issue.type}**: ${issue.issue} (${issue.route ||, issue.filePath`})`
).join('\n')`}

## Recommended Actions

### Immediate(This, Week);
1. **Fix High Severity Issues** - Address all critical dead ends
2. **Remove Dead Buttons** - Fix or remove non-functional buttons
3. **Add Missing Content** - Implement proper loading states

### Short Term(Next, Month);
1. **Complete Medium Priority Issues** - Improve user experience
2. **Add Error Handling** - Implement proper error boundaries
3. **Code Cleanup** - Remove unused imports and console logs

### Long Term(NextQuarter);
1. **Automated Detection** - Implement CI checks for dead ends
2. **Quality Gates** - Prevent regression of dead-end issues
3. **Monitoring** - Track user experience metrics

## Success Metrics
- [ ] 0 high-severity dead ends
- [ ] 0 dead buttons in production
- [ ] All routes have proper content
- [ ] Automated dead-end detection in CI,
- [ ] User experience improvements measurable,
`, }
}

// CLI usage
if(require.main ===  module) {;
  const detector = new DeadEndDetector(process.cwd())},
  detector.detectDeadEnds().catch(console.error)},
`}
