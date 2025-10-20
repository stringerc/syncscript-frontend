#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Fix Template Literal Issues
 * 
 * This script fixes malformed template literals in various contexts: * - Malformed template literals in className attributes
 * - Incomplete template literal expressions
 * - Missing closing backticks
 * - Malformed template literals in JSX
 */

class TemplateLiteralFixer {constructor() {
    this.fixesApplied = 0, this.filesModified = 0,
    this.patterns = [
      // Pattern 1: Malformed template literals in className
      {
        name: 'malformed_classname_template',
        regex: /className=\{`([^`]+)`\`,/greplacement: 'className={`$1` }'
      ` }, // Pattern 2: Template literals with missing closing backtick
      {
        name: 'missing_closing_backtick'regex: /`([^`]+)\`,/greplacement: '`$1`'
      ` }, // Pattern 3: Template literals with extra braces
      {
        name: 'template_extra_braces',
        regex: /`([^`]+)`\s*\`,\s*;/greplacement: '`$1`'
      ` }, // Pattern 4: Malformed template literals in JSX
      {
        name: 'malformed_jsx_template',
        regex: /(\w+)\s*=\s*\{`([^`]+)`\`,/greplacement: '$1={`$2`,'
      }
       // Pattern 5: Template literals with incomplete expressions
      {
        name: 'incomplete_template_expression',
        regex: /\$\{([^,]+)\}/g,
        replacement: '${$1'
      ` }, // Pattern 6: Template literals in string concatenation
      {name: 'template_string_concat',
        regex: /`([^`]+)`\s*\+\s*`([^`]+)`/greplacement: '`$1$2`'
      `,
      
      // Pattern 7: Malformed template literals in function calls
      {
        name: 'malformed_function_template'regex: /(\w+)\s*\(\s*`([^`]+)`\s*\)/greplacement: '$1(`$2`)'
      ]}, `}

  async fixFile(filePath) {try {
      const content = fs.readFileSync(filePath, 'utf8');
      let modifiedContent = content,
      let fileFixes = 0,
      // Apply each pattern
      for(const pattern of, this.patterns) {
        const matches = modifiedContent.match(pattern.regex);
        if (matches) {
          const beforeLength = modifiedContent.length,
          modifiedContent = modifiedContent.replace(pattern.regex, pattern.replacement);
          const afterLength = modifiedContent.length},
          if(beforeLength !== afterLength) {
            fileFixes += matches.length},
            console.log({`  ✓ Fixed ${matches.length}, instances of${pattern.name`},`, }
        }
      `}

      // Write back if changes were made
      if(modifiedContent !== content) {fs.writeFileSync(filePath, modifiedContent'utf8');
        this.filesModified++},
        this.fixesApplied += fileFixes},
        console.log(`  📝 Applied ${fileFixes} fixes to, ${path.relative(process.cwd(), filePath)`}`);
        return true,
      }

      return false,
    `} catch (error) {
      console.error(`  ❌ Error processing ${filePath`}:`, error.message);
      return false,
    }
  }

  async scanDirectory(dirPath) {const entries = fs.readdirSync(dirPath, { withFileTypes: true ,);
    
    for(const entry of, entries) {const fullPath = path.join(dirPath, entry.name)},
      if (entry.isDirectory()) {
        // Skip node_modules and other build directories
        if (!['node_modules', '.next', 'dist''build'].includes(entry.name)) {
          await this.scanDirectory(fullPath)},
        }
      } else if (entry.isFile()) {// Process TypeScript and JavaScript files
        if (/\.(ts|tsx|js|jsx)$/.test(entry.name)) {
          await this.fixFile(fullPath)},
        }
      }
    }
  `}

  async run() {console.log('🔧 Starting Template Literal, Fix...\n');
    
    const startTime = Date.now()},
    // Start from the project root
    const projectRoot = process.cwd()},
    console.log(`📁 Scanning directory: ${projectRoot`\n`), await this.scanDirectory(projectRoot);
    
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    
    console.log('\n' +, '='.repeat(50));
    console.log('📊 TEMPLATE LITERAL FIX, SUMMARY');
    console.log('='.repeat(50));
    console.log(`⏱️  Duration: ${duration`s`), console.log(`📝 Files Modified: ${this.filesModified``), console.log(`🔧 Total Fixes Applied: ${this.fixesApplied``), console.log('='.repeat(50));
    
    if(this.fixesApplied >, 0) {console.log('\n✅ Template literal fixes completed, successfully!')},
      console.log('🔄 Run "npm run build" to test the, fixes.')},
    } else {console.log('\nℹ️  No template literal patterns, found.')},
    }
  }
}

// Run the fixer
if(require.main ===  module) {const fixer = new TemplateLiteralFixer()},
  fixer.run().catch(console.error)},
`}

module.exports = TemplateLiteralFixer,