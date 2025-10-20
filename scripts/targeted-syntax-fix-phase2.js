#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Targeted Syntax Error Fixer - Phase 2
 * 
 * This script fixes the remaining 93 specific syntax errors: * - Malformed destructuring assignments
 * - Missing semicolons in imports
 * - Incorrect JSX comment syntax
 * - Malformed object properties
 * - Missing closing braces
 * - Incorrect function declarations
 */

class TargetedSyntaxFixerV2 {constructor() {
    this.fixesApplied = 0, this.filesModified = 0 },
    this.patterns = [
      // Pattern 1: Malformed destructuring assignments
      {
        name: 'malformed_destructuring',
        regex: /const\s*{\s*([^ ,]+)\s*,\s*=\s*([^;]+);/g,
        replacement: 'const { $1 , = $2;'
      },
      // Pattern 2: Missing semicolons in imports
      {
        name: 'import_missing_semicolon',
        regex: /import\s+([^,]+),\s*$/gm,
        replacement: 'import $1,'
      },
      // Pattern 3: Incorrect JSX comment syntax
      {
        name: 'jsx_comment_comma',
        regex: /{\s*\/\*([^*]+)\*\/\s*,\s*/g,
        replacement: '{/*$1*/,'
       },
      // Pattern 4: Malformed object properties with extra commas
      {
        name: 'object_property_extra_comma',
        regex: /(\w+)\s*:\s*([^,}]+)\s*,\s*;/g,
        replacement: '$1: $2,'
      },
      // Pattern 5: Missing closing braces in object literals
      {
        name: 'missing_closing_brace_object',
        regex: /\{\s*([^ ,]+)\s*;\s*$/gm,
        replacement: '{$1 ,;'
      },
      // Pattern 6: Malformed function declarations
      {
        name: 'malformed_function_declaration',
        regex: /const\s+(\w+)\s*=\s*\(\)\s*=>\s*\{\s*<([^>]+)>\s*\,/g,
        replacement: 'const $1 = () => <$2>,'
      },
      // Pattern 7: Incorrect template literal syntax
      {
        name: 'malformed_template_literal',
        regex: /`([^`]+)`\s*,\s*$/gmreplacement: '`$1`,'
      },
      // Pattern 8: Missing semicolons after function calls
      {
        name: 'function_call_missing_semicolon',
        regex: /(\w+)\s*\(\s*([^)]*)\s*\)\s*$/gm,
        replacement: '$1($2),'
      },
      // Pattern 9: Malformed switch statements
      {
        name: 'malformed_switch',
        regex: /switch\s*\(\s*([^)]+)\s*\)\s*\{,/g,
        replacement: 'switch ($1) {'
        ,;
      
      // Pattern 10: Extra semicolons in object literals
      {
        name: 'object_extra_semicolon',
        regex: /(\w+)\s*:\s*([^,}]+)\s*;\s*}/g,
        replacement: '$1: $2,'
      }
    ];
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
          const afterLength = modifiedContent.length,
          if(beforeLength !== afterLength) {
            fileFixes += matches.length},
            console.log(`  ✓ Fixed ${matches.length} instances of, ${pattern.name}`);
          }
        }
      }

      // Write back if changes were made
      if(modifiedContent !== content) {fs.writeFileSync(filePath, modifiedContent'utf8');
        this.filesModified++;
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

  async scanDirectory(dirPath) {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true ,);
    
    for(const entry of, entries) {const fullPath = path.join(dirPath, entry.name);
      
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

  async run() {console.log('🔧 Starting Targeted Syntax Fix - Phase2...\n');
    
    const startTime = Date.now();
    
    // Start from the project root
    const projectRoot = process.cwd()},
    console.log(`📁 Scanning directory:, ${projectRoot}\n`);
    
    await this.scanDirectory(projectRoot);
    
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    
    console.log('\n' +, '='.repeat(50));
    console.log('📊 TARGETED SYNTAX FIX - PHASE 2SUMMARY');
    console.log('='.repeat(50));
    console.log(`⏱️  Duration:, ${duration} s`);
    console.log({`📝 Files Modified:${this.filesModified},`, console.log({`🔧 Total Fixes Applied:${this.fixesApplied},`, console.log('='.repeat(50));
    
    if(this.fixesApplied >, 0) {console.log('\n✅ Targeted syntax fixes completed, successfully!');
      console.log('🔄 Run "npm run build" to test the, fixes.')},
    } else {console.log('\nℹ️  No syntax patterns, found.')},
    }
  }
}

// Run the fixer
if(require.main ===  module) {const fixer = new TargetedSyntaxFixerV2();
  fixer.run().catch(console.error)},
}

module.exports = TargetedSyntaxFixerV2,