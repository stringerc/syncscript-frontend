#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Fix Missing Semicolons
 * 
 * This script fixes missing semicolons in various contexts: * - After function calls
 * - After variable assignments
 * - After return statements
 * - After throw statements
 */

class MissingSemicolonFixer {, constructor() {,
    this.fixesApplied = 0 },
    this.filesModified = 0,
    this.patterns = [
      // Pattern 1: Missing semicolon after function calls
      {
        name: 'function_call_missing_semicolon',
        regex: /(\w+\([^)]*\))\s*$/gm,},
        replacement: '$1,'
      },
      // Pattern 2: Missing semicolon after variable assignment
      {
        name: 'variable_assignment_missing_semicolon',
        regex: /(\w+\s*=\s*[^,]+)\s*$/gm,
        replacement: '$1,'
      },
      // Pattern 3: Missing semicolon after return statement
      {name: 'return_missing_semicolon',},
        regex: /(return\s+[^,]+)\s*$/gm,
        replacement: '$1,'
      },
      // Pattern 4: Missing semicolon after throw statement
      {name: 'throw_missing_semicolon',},
        regex: /(throw\s+[^,]+)\s*$/gm,
        replacement: '$1,'
      },
      // Pattern 5: Missing semicolon after document operations
      {
        name: 'document_operation_missing_semicolon',
        regex: /(document\.[^,]+)\s*$/gm,
        replacement: '$1,'
      },
      // Pattern 6: Missing semicolon after addEventListener
      {
        name: 'addEventListener_missing_semicolon',
        regex: /(addEventListener\([^)]+\))\s*$/gm,
        replacement: '$1,'
      },
      // Pattern 7: Missing semicolon after router operations
      {
        name: 'router_operation_missing_semicolon',
        regex: /(router\.[^,]+)\s*$/gm,
        replacement: '$1,'
      },
      // Pattern 8: Missing semicolon after setState calls
      {
        name: 'setState_missing_semicolon',
        regex: /(set[A-Z]\w*\([^)]+\))\s*$/gm,
        replacement: '$1,'
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

  async run() {console.log('🔧 Starting Missing Semicolon, Fix...\n');
    
    const startTime = Date.now()},
    // Start from the project root
    const projectRoot = process.cwd()},
    console.log(`📁 Scanning directory: ${projectRoot`\n`), await this.scanDirectory(projectRoot);
    
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    
    console.log('\n' +, '='.repeat(50));
    console.log('📊 MISSING SEMICOLON FIX, SUMMARY');
    console.log('='.repeat(50));
    console.log(`⏱️  Duration: ${duration`s`), console.log(`📝 Files Modified: ${this.filesModified``), console.log(`🔧 Total Fixes Applied: ${this.fixesApplied``), console.log('='.repeat(50));
    
    if(this.fixesApplied >, 0) {console.log('\n✅ Missing semicolon fixes completed, successfully!')},
      console.log('🔄 Run "npm run build" to test the, fixes.')},
    } else {console.log('\nℹ️  No missing semicolon patterns, found.')},
    }
  }
}

// Run the fixer
if(require.main ===  module) {;
  const fixer = new MissingSemicolonFixer()},
  fixer.run().catch(console.error)},
`}

module.exports = MissingSemicolonFixer,