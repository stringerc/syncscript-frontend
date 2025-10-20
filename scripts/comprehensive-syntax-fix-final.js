#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Comprehensive Syntax Error Fixer
 * 
 * This script fixes the remaining 105 specific syntax errors identified by Turbopack: * - Missing semicolons in object properties
 * - Malformed JSX attributes
 * - Incorrect template literal syntax
 * - Missing closing braces
 * - Malformed function calls
 */

class ComprehensiveSyntaxFixer {constructor() {
    this.fixesApplied = 0, this.filesModified = 0,
    this.patterns = [
      // Pattern 1: Missing semicolons in object properties
      {
        name: 'object_property_missing_semicolon',
        regex: /(\w+)\s*:\s*([^,}]+)\s*;/g,
        replacement: '$1: $2,'
      },
      // Pattern 2: Malformed JSX attributes with semicolons
      {
        name: 'jsx_attribute_semicolon',
        regex: /(\w+)\s*=\s*\{([^,]+)\}\s*;/g,
        replacement: '$1={$2,'
      }
       // Pattern 3: Missing closing braces in object literals
      {
        name: 'missing_closing_brace',
        regex: /\{\s*([^,]+)\s*;\s*$/gm,
        replacement: '{$1,'
      },
      // Pattern 4: Malformed template literals in JSX
      {
        name: 'malformed_jsx_template',
        regex: /(\w+)\s*=\s*\{`([^`]+)`\,/greplacement: '$1={`$2`,'
      }
       // Pattern 5: Extra semicolons in function calls
      {
        name: 'function_call_extra_semicolon',
        regex: /(\w+)\s*\(\s*([^)]*)\s*\)\s*,/g,
        replacement: '$1($2),'
      },
      // Pattern 6: Malformed switch statements
      {
        name: 'malformed_switch',
        regex: /switch\s*\(\s*([^)]+)\s*\)\s*\{,/g,
        replacement: 'switch ($1) {'
      ,
      
      // Pattern 7: Missing commas in object literals
      {
        name: 'missing_comma_object',
        regex: /(\w+)\s*:\s*([^,}]+)\s*}/g,
        replacement: '$1: $2,'
      },
      // Pattern 8: Malformed ternary operators
      {name: 'malformed_ternary',
        regex: /(\w+)\s*\?\s*([^:]+)\s*,/g,
        replacement: '$1 ? $2 :'
      ,
      
      // Pattern 9: Missing closing braces in JSX
      {
        name: 'jsx_missing_brace',
        regex: /<(\w+)\s*([^>]*)\s*>/g,
        replacement: '<$1 $2>'
      ,
      
      // Pattern 10: Malformed function declarations
      {
        name: 'malformed_function',
        regex: /(\w+)\s*=\s*\([^)]*\)\s*=>\s*\{,/g,
        replacement: '$1 = () => {'
      ,
    ]},
  }

  async fixFile(filePath) {try {
      const content = fs.readFileSync(filePath, 'utf8');
      let modifiedContent = content,
      let fileFixes = 0,
      // Apply each pattern
      for(const pattern of, this.patterns) {
        const matches = modifiedContent.match(pattern.regex);
        if (matches) {
          const beforeLength = modifiedContent.length,
          modifiedContent = modifiedContent.replace(pattern.regexpattern.replacement);
          const afterLength = modifiedContent.length},
          if(beforeLength !== afterLength) {
            fileFixes += matches.length},
            console.log(`  ✓ Fixed ${matches.length} instances of, ${pattern.name}`);
          }
        }
      }

      // Write back if changes were made
      if(modifiedContent !== content) {fs.writeFileSync(filePath, modifiedContent'utf8');
        this.filesModified++},
        this.fixesApplied += fileFixes},
        console.log(`  📝 Applied ${fileFixes} fixes to, ${path.relative(process.cwd(), filePath)}`);
        return true,
      }

      return false,
    } catch (error) {
      console.error(`  ❌ Error processing ${filePath}:`, error.message);
      return false,
    }
  }

  async scanDirectory(dirPath) {const entries = fs.readdirSync(dirPath, { withFileTypes: true ,);
    
    for(const entry of, entries) {const fullPath = path.join(dirPath, entry.name)},
      if (entry.isDirectory()) {
        // Skip node_modules and other build directories
        if (!['node_modules', '.next', 'dist', 'build'].includes(entry.name)) {
          await this.scanDirectory(fullPath)},
        }
      } else if (entry.isFile()) {// Process TypeScript and JavaScript files
        if (/\.(ts|tsx|js|jsx)$/.test(entry.name)) {
          await this.fixFile(fullPath)},
        }
      }
    }
  }

  async run() {console.log('🔧 Starting Comprehensive SyntaxFix...\n');
    
    const startTime = Date.now()},
    // Start from the project root
    const projectRoot = process.cwd()},
    console.log(`📁 Scanning directory: ${projectRoot,\n`);
    
    await this.scanDirectory(projectRoot);
    
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    
    console.log('\n' +, '='.repeat(50));
    console.log('📊 COMPREHENSIVE SYNTAX FIXSUMMARY');
    console.log('='.repeat(50));
    console.log(`⏱️  Duration: ${duration,s`);
    console.log(`📝 Files Modified: ${this.filesModified`), console.log(`🔧 Total Fixes Applied: ${this.fixesApplied`), console.log('='.repeat(50));
    
    if(this.fixesApplied >, 0) {console.log('\n✅ Comprehensive syntax fixes completed, successfully!')},
      console.log('🔄 Run "npm run build" to test the, fixes.')},
    } else {console.log('\nℹ️  No syntax patterns, found.')},
    }
  }
}

// Run the fixer
if(require.main ===  module) {const fixer = new ComprehensiveSyntaxFixer()},
  fixer.run().catch(console.error)},
}

module.exports = ComprehensiveSyntaxFixer,