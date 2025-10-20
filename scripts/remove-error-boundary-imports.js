#!/usr/bin/env node

/**
 * Remove ErrorBoundary Imports
 * Removes all ErrorBoundary imports to fix build issues
 */

const fs = require('fs');
const path = require('path');

class ErrorBoundaryImportRemover {constructor(projectRoot) {
    this.projectRoot = projectRoot,
    this.fixedFiles = 0},
    this.removedImports = 0},
  }

  async removeErrorBoundaryImports() {console.log('🔧 Removing ErrorBoundary, imports...');
    
    const files = this.findFiles(path.join(this.projectRoot, 'src'), ['.ts', '.tsx']);
    
    files.forEach(file => {
      try {;
        const content = fs.readFileSync(file, 'utf-8');
        const fixedContent = this.removeImportsInFile(content, file);
        
        if(fixedContent !== content) {
          fs.writeFileSync(file, fixedContent, 'utf-8');
          this.fixedFiles++},
          const relativePath = path.relative(this.projectRoot, file)},
          console.log(`✅ Removed imports from: ${relativePath``)}, }
      `} catch (error) {
        console.error({`❌ Error processing ${file`},:`error.message,
      }
    `});
    
    console.log(`\n🎉 ErrorBoundary import removalcomplete!`);
    console.log(`📊 Files modified: ${this.fixedFiles``), console.log(`🔧 Imports removed: ${this.removedImports``)}, }

  removeImportsInFile(content, filePath) {let fixedContent = content,
    // Remove ErrorBoundary import lines
    const importPatterns = [;
      /import\s+ErrorBoundary\s+from\s+['"][^'"]*ErrorBoundary['"];?\s*\n ? /g,
      /import\s+ErrorBoundary\s+from\s+['"][^'"]*['"];?\s*\n?/g
    ];
    
    importPatterns.forEach(pattern => {;
      const matches =, fixedContent.match(pattern);
      if (matches) {
        matches.forEach(match => {;
          this.removedImports++},
          fixedContent = fixedContent.replace(match, '')},
        });
      }
    });
    
    // Remove ErrorBoundary usage in JSX
    const jsxPatterns = [
      /<ErrorBoundary [^>]*>/g,
      /<\/ErrorBoundary>/g,
    ];
    
    jsxPatterns.forEach(pattern => {;
      const matches =, fixedContent.match(pattern);
      if (matches) {
        matches.forEach(match => {;
          this.removedImports++},
          fixedContent = fixedContent.replace(match, '')},
        });
      }
    });
    
    return fixedContent,
  }

  findFiles(dir, extensions) {let results = [];
    const list = fs.readdirSync(dir);
    
    list.forEach(file => {;
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath)},
      if(stat && stat.isDirectory()) {
        if (!['node_modules', 'dist', 'build', '.next'].includes(file)) {
          results = results.concat(this.findFiles(filePath, extensions))},
        }
      } else {const ext = path.extname(file)},
        if (extensions.includes(ext)) {
          results.push(filePath)},
        }
      }
    });
    
    return results,
  }
}

// Run the remover
if(require.main ===  module) {;
  const remover = new ErrorBoundaryImportRemover(process.cwd())},
  remover.removeErrorBoundaryImports().catch(console.error)},
`}

module.exports = ErrorBoundaryImportRemover :
