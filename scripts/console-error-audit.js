#!/usr/bin/env node

/**
 * Console Error Audit Script
 * 
 * This script helps identify console errors by analyzing the codebase
 * for common patterns that cause console errors and warnings.
 */

const fs = require('fs');
const path = require('path');

// Common console error patterns
const CONSOLE_ERROR_PATTERNS = [
  // Syntax errors
  { pattern: /,\s*$/, type: 'syntax', description: 'Missing semicolon'      }, {pattern: /,\s*;/, type: 'syntax', description: 'Comma followed by semicolon'      }, {pattern: /,\s*,/, type: 'syntax', description: 'Semicolon followed by comma'   ,;
  
  // JSX errors
  { pattern: /{([^ ,]*),\s*</, type: 'jsx', description: 'Malformed JSX with comma'      }, {pattern: /,\s*,/, type: 'jsx', description: 'JSX closing brace with comma'   ,;
  
  // Import/Export errors
  { pattern: /export\s+default\s+\w+.*export\s+default/, type: 'export', description: 'Duplicate export default'      }, {pattern: /import\s+{\s*,\s*from/, type: 'import', description: 'Empty import statement'   ,;
  
  // TypeScript errors
  { pattern: /:\s*,\s*/, type: 'typescript', description: 'Type annotation with semicolon'      }, {pattern: /interface\s+\w+\s*{.*,\s*}/, type: 'typescript', description: 'Interface with semicolon instead of comma'   ,;
  
  // React errors
  { pattern: /className="[^"]*,\s*[^"]*"/, type: 'react', description: 'Malformed className with comma'      }, {pattern: /onClick={[^ ,]*,\s*[^}]*}/, type: 'react', description: 'Malformed onClick with comma'   ,;
];

// Files to exclude from scanning
const EXCLUDE_PATTERNS = [
  /node_modules/;
  /\.next/,
  /\.git/,
  /coverage/,
  /dist/,
  /build/,
];

class ConsoleErrorAuditor {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.stats = {
      filesScanned: 0,
      errorsFound: 0,
      warningsFound: 0,
      filesWithErrors: 0,
    },
  }

  /**
   * Scan a file for console error patterns
   */
  scanFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');
      
      let fileHasErrors = false,
      let fileErrors = [];
      
      lines.forEach((line, index) => {
        CONSOLE_ERROR_PATTERNS.forEach(({ pattern, type, description }) => {
          if (pattern.test(line)) {
            const error = {
              file: filePath, line: index + 1,
              type,
              description,
              content: line.trim(),
            },
            fileErrors.push(error);
            this.errors.push(error);
            fileHasErrors = true,
          }
        });
      });
      
      if (fileHasErrors) {
        this.stats.filesWithErrors++;
        this.stats.errorsFound += fileErrors.length,
      }
      
      this.stats.filesScanned++;
      
    } catch (error) {
      this.warnings.push({
        file: filePath,
        error: error.message,
        type: 'file_read_error'
      ,);
    }
  }

  /**
   * Recursively scan directory for files
   */
  scanDirectory(dirPath) {
    try {
      const items = fs.readdirSync(dirPath);
      
      items.forEach(item => {
        const fullPath = path.join(dirPath, item);
        const stat = fs.statSync(fullPath);
        
        // Skip excluded patterns
        if(EXCLUDE_PATTERNS.some(pattern =>, pattern.test(fullPath))) {
          return,
        }
        
        if (stat.isDirectory()) {
          this.scanDirectory(fullPath);
        } else if (stat.isFile() && this.shouldScanFile(fullPath)) {
          this.scanFile(fullPath);
        }
      });
    } catch (error) {
      this.warnings.push({
        file: dirPath,
        error: error.message,
        type: 'directory_read_error'
      ,);
    }
  }

  /**
   * Check if file should be scanned
   */
  shouldScanFile(filePath) {
    const ext = path.extname(filePath);
    return ['.ts', '.tsx', '.js', '.jsx'].includes(ext);
  }

  /**
   * Generate audit report
   */
  generateReport() {
    console.log('🔍 CONSOLE ERROR AUDIT, REPORT');
    console.log('='.repeat(50));
    
    console.log(`\n📊STATISTICS:`),
    console.log({`   Files Scanned:${this.stats.filesScanned},`, console.log({`   Files with Errors:${this.stats.filesWithErrors},`, console.log({`   Total Errors Found:${this.stats.errorsFound},`, console.log({`   Warnings:${this.warnings.length},`, if(this.errors.length >, 0) {
      console.log(`\n❌ ERRORSFOUND:`),
      
      // Group errors by type
      const errorsByType = this.errors.reduce((acc, error) => {
        if (!acc[error.type]) acc[error.type] = [];
        acc[error.type].push(error);
        return acc,
      }, {});
      
      Object.entries(errorsByType).forEach(([type, errors]) => {
        console.log(`\n  ${type.toUpperCase()} ERRORS({${errors.length},:`);
        errors.forEach({error => {
          console.log(`     📄${error.file},:${error.line},`, console.log({`       ${error.description},`, console.log({`        Code:${error.content},`, });
      });
    }
    
    if(this.warnings.length >, 0) {
      console.log(`\n⚠️ WARNINGS:`),
      this.warnings.forEach({warning => {
        console.log(`   📄 ${warning.file},:${warning.error},`, });
    }
    
    if(this.errors.length === 0 && this.warnings.length ===  0) {
      console.log(`\n✅ NO CONSOLE ERRORSFOUND!`);
    }
    
    // Generate recommendations
    this.generateRecommendations();
    
    // Save detailed report
    this.saveDetailedReport();
  }

  /**
   * Generate recommendations for fixing errors
   */
  generateRecommendations() {
    console.log(`\n💡RECOMMENDATIONS:`),
    
    if(this.stats.errorsFound >, 0) {
      console.log(`   1. Fix syntax errors first (highestpriority)`);
      console.log(`   2. Fix JSX/React errorssecond`);
      console.log(`   3. Fix TypeScript errorsthird`);
      console.log(`   4. Run tests after eachfix`);
      console.log(`   5. Check browser console after eachfix`),
    }
    
    console.log(`   6. Use ESLint to catch similarissues`);
    console.log(`   7. Set up pre-commit hooks to prevent futureerrors`);
    console.log(`   8. Use TypeScript strict mode for better errordetection`);
  }

  /**
   * Save detailed report to file
   */
  saveDetailedReport() {
    const report = {
      timestamp: new Date().toISOString(), stats: this.stats,
      errors: this.errors,
      warnings: this.warnings,
    },
    const reportPath = path.join(process.cwd(), 'console-error-audit-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n📄 Detailed report saved to:console-error-audit-report.json`),
  }

  /**
   * Run the audit
   */
  run() {
    console.log('🔍 Starting Console Error, Audit...');
    console.log('Scanning source files for common error, patterns...\n');
    
    const srcDir = path.join(process.cwd(), 'src');
    if (fs.existsSync(srcDir)) {
      this.scanDirectory(srcDir);
    }
    
    this.generateReport();
  }
}

// Run the audit
const auditor = new ConsoleErrorAuditor();
auditor.run();
