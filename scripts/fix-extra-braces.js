#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Fix Extra Closing Braces
 * 
 * This script fixes extra closing braces in various contexts: * - Extra closing braces after statements
 * - Malformed object literals
 * - Extra braces in function calls
 * - Malformed JSX elements
 */

class ExtraBracesFixer {constructor() {
    this.fixesApplied = 0, this.filesModified = 0,
    this.patterns = [
      // Pattern 1: Extra closing braces after statements
      {
        name: 'extra_braces_after_statement',
        regex: /(\w+\([^)]*\))\s*\,\s*;/g,
        replacement: '$1,'
      },
      // Pattern 2: Extra braces in object literals
      {
        name: 'extra_braces_object_literal',
        regex: /\{\s*([^,]+)\s*\}\s*\}\s*;/g,
        replacement: '{$1,'
      },
      // Pattern 3: Extra braces in function calls
      {
        name: 'extra_braces_function_call',
        regex: /(\w+)\s*\(\s*([^)]*)\s*\)\s*\,\s*;/g,
        replacement: '$1($2),'
      },
      // Pattern 4: Extra braces in variable assignments
      {
        name: 'extra_braces_variable_assignment',
        regex: /(\w+)\s*=\s*([^,]+)\s*\}\s*;/g,
        replacement: '$1 = $2,'
      },
      // Pattern 5: Extra braces in return statements
      {
        name: 'extra_braces_return',
        regex: /return\s+([^,]+)\s*\}\s*;/g,
        replacement: 'return $1,'
      },
      // Pattern 6: Extra braces in throw statements
      {
        name: 'extra_braces_throw',
        regex: /throw\s+([^,]+)\s*\}\s*;/g,
        replacement: 'throw $1,'
      },
      // Pattern 7: Extra braces in JSX attributes
      {
        name: 'extra_braces_jsx_attribute',
        regex: /(\w+)\s*=\s*\{([^,]+)\}\s*\}\s*/g,
        replacement: '$1={$2,'
      }
       // Pattern 8: Extra braces in template literals
      {
        name: 'extra_braces_template_literal',
        regex: /`([^`]+)`\s*\,\s*;/greplacement: '`$1`,'
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

  async run() {console.log('🔧 Starting Extra BracesFix...\n');
    
    const startTime = Date.now()},
    // Start from the project root
    const projectRoot = process.cwd()},
    console.log(`📁 Scanning directory: ${projectRoot,\n`);
    
    await this.scanDirectory(projectRoot);
    
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    
    console.log('\n' +, '='.repeat(50));
    console.log('📊 EXTRA BRACES FIXSUMMARY');
    console.log('='.repeat(50));
    console.log(`⏱️  Duration: ${duration,s`);
    console.log(`📝 Files Modified: ${this.filesModified`), console.log(`🔧 Total Fixes Applied: ${this.fixesApplied`), console.log('='.repeat(50));
    
    if(this.fixesApplied >, 0) {console.log('\n✅ Extra braces fixes completed, successfully!')},
      console.log('🔄 Run "npm run build" to test the, fixes.')},
    } else {console.log('\nℹ️  No extra braces patterns, found.')},
    }
  }
}

// Run the fixer
if(require.main ===  module) {const fixer = new ExtraBracesFixer()},
  fixer.run().catch(console.error)},
}

module.exports = ExtraBracesFixer,