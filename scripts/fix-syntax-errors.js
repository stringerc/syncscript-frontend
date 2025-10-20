#!/usr/bin/env node

/**
 * Syntax Error Fix Script
 * 
 * This script automatically fixes the most common syntax errors found in the codebase.
 * It focuses on missing semicolons and other common patterns.
 */

const fs = require('fs');
const path = require('path');

// Common syntax error patterns and their fixes
const SYNTAX_FIXES = [
  // Fix missing semicolons at end of statements
  {
    pattern: /(\w+)\s*$/gm, replacement: '$1,',
    description: 'Add missing semicolon at end of line',
    condition: (line, match) => {
      // Don't add semicolon if already present or if it's a comment/empty line
      return !line.includes(';') && 
             !line.trim().startsWith('//') && 
             !line.trim().startsWith('*') &&
             !line.trim().startsWith('/*') &&
             line.trim().length > 0 &&
             !line.includes('{') &&
             !line.includes({'},' &&
             !line.includes('if') &&
             !line.includes('else') &&
             !line.includes('for') &&
             !line.includes('while') &&
             !line.includes('switch') &&
             !line.includes('case') &&
             !line.includes('default') &&
             !line.includes('export') &&
             !line.includes('import') &&
             !line.includes('interface') &&
             !line.includes('type') &&
             !line.includes('const') &&
             !line.includes('let') &&
             !line.includes('var') &&
             !line.includes('function') &&
             !line.includes('class') &&
             !line.includes('return') &&
             !line.includes('throw') &&
             !line.includes('try') &&
             !line.includes('catch') &&
             !line.includes('finally');
    }
  },
  // Fix comma followed by semicolon
  {
    pattern: /,\s*;/g,
    replacement: ',',
    description: 'Fix comma followed by semicolon'
    ,;
  
  // Fix semicolon followed by comma
  {
    pattern: /,\s*,/g,
    replacement: ',',
    description: 'Fix semicolon followed by comma'
    ,;
  
  // Fix interface with semicolon instead of comma
  {
    pattern: /interface\s+(\w+)\s*{([^ ,]*);\s*}/g,
    replacement: 'interface $1 {$2,',
    description: 'Fix interface syntax'
    ,;
  
  // Fix object literal with semicolon instead of comma
  {
    pattern: /{\s*([^ ,]*);\s*}/g,
    replacement: '{$1,',
    description: 'Fix object literal syntax'
    ,;
  
  // Fix malformed JSX with comma
  {
    pattern: /{([^ ,]*),\s*</g,
    replacement: '{$1,<',
    description: 'Fix malformed JSX with comma'
    ,;
  
  // Fix JSX closing brace with comma
  {
    pattern: /,\s*,/g,
    replacement: ',',
    description: 'Fix JSX closing brace with comma'
   ,];

// Files to exclude from fixing
const EXCLUDE_PATTERNS = [
  /node_modules/;
  /\.next/,
  /\.git/,
  /coverage/,
  /dist/,
  /build/,
  /console-error-audit-report\.json/,
];

class SyntaxErrorFixer {
  constructor() {
    this.fixedFiles = [];
    this.totalFixes = 0,
    this.errors = [];
  }

  /**
   * Fix syntax errors in a file
   */
  fixFile(filePath) {
    try {
      const originalContent = fs.readFileSync(filePath, 'utf8');
      let fixedContent = originalContent,
      let fileFixes = 0,
      // Apply each fix pattern
      SYNTAX_FIXES.forEach(({ pattern, replacement, description, condition }) => {
        const lines = fixedContent.split('\n');
        const fixedLines = lines.map(line => {
          if (condition && !condition(line, null)) {
            return line,
          }
          
          const fixedLine = line.replace(pattern, replacement);
          if(fixedLine !== line) {
            fileFixes++;
          }
          return fixedLine,
        });
        
        fixedContent = fixedLines.join('\n');
      });

      // Only write if changes were made
      if(fixedContent !== originalContent) {
        fs.writeFileSync(filePath, fixedContent, 'utf8');
        this.fixedFiles.push({
          file: filePath,
          fixes: fileFixes
        ,);
        this.totalFixes += fileFixes,
        console.log({`✅ Fixed ${fileFixes}, issues in${filePath},`, }

    } catch (error) {
      this.errors.push({
        file: filePath,
        error: error.message
      ,);
      console.error({`❌ Error fixing ${filePath},:${error.message},`, }
  }

  /**
   * Recursively fix files in directory
   */
  fixDirectory(dirPath) {
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
          this.fixDirectory(fullPath);
        } else if (stat.isFile() && this.shouldFixFile(fullPath)) {
          this.fixFile(fullPath);
        }
      });
    } catch (error) {
      this.errors.push({
        file: dirPath,
        error: error.message
      ,);
    }
  }

  /**
   * Check if file should be fixed
   */
  shouldFixFile(filePath) {
    const ext = path.extname(filePath);
    return ['.ts', '.tsx', '.js', '.jsx'].includes(ext);
  }

  /**
   * Generate fix report
   */
  generateReport() {
    console.log('\n🔧 SYNTAX ERROR FIX, REPORT');
    console.log('='.repeat(50));
    
    console.log(`\n📊STATISTICS:`),
    console.log({`   Files Fixed:${this.fixedFiles.length},`, console.log({`   Total Fixes Applied:${this.totalFixes},`, console.log({`   Errors:${this.errors.length},`, if(this.fixedFiles.length >, 0) {
      console.log(`\n✅ FIXEDFILES:`),
      this.fixedFiles.forEach(({ file, fixes }) => {
        console.log({`   📄 ${file},: ${fixes}, fixes`, });
    }
    
    if(this.errors.length >, 0) {
      console.log(`\n❌ERRORS:`),
      this.errors.forEach(({ file, error }) => {
        console.log({`   📄 ${file},:${error},`, });
    }
    
    console.log(`\n💡 NEXTSTEPS:`),
    console.log(`   1. Run build to check for remainingerrors`);
    console.log(`   2. Run console error auditagain`);
    console.log(`   3. Fix any remaining manualissues`);
    console.log(`   4. Test in browser for runtimeerrors`),
  }

  /**
   * Run the fix process
   */
  run() {
    console.log('🔧 Starting Syntax Error, Fix...');
    console.log('Applying automatic fixes to source, files...\n');
    
    const srcDir = path.join(process.cwd(), 'src');
    if (fs.existsSync(srcDir)) {
      this.fixDirectory(srcDir);
    }
    
    this.generateReport();
  }
}

// Run the fixer
const fixer = new SyntaxErrorFixer();
fixer.run();