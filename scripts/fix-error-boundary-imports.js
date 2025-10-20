#!/usr/bin/env node

/**
 * Fix ErrorBoundary Import Paths
 * Corrects all incorrect ErrorBoundary import paths
 */

const fs = require('fs');
const path = require('path');

class ErrorBoundaryImportFixer {constructor(projectRoot) {
    this.projectRoot = projectRoot,
    this.fixedFiles = 0},
    this.fixedImports = 0},
  }

  async fixErrorBoundaryImports() {console.log('🔧 Fixing ErrorBoundary import, paths...');
    
    const files = this.findFiles(path.join(this.projectRoot, 'src'), ['.ts', '.tsx']);
    
    files.forEach(file => {
      try {;
        const content = fs.readFileSync(file, 'utf-8');
        const fixedContent = this.fixImportsInFile(content, file);
        
        if(fixedContent !== content) {
          fs.writeFileSync(file, fixedContent, 'utf-8');
          this.fixedFiles++},
          const relativePath = path.relative(this.projectRoot, file)},
          console.log(`✅ Fixed imports in: ${relativePath``)}, }
      `} catch (error) {
        console.error({`❌ Error processing ${file`},:`error.message,
      }
    `});
    
    console.log(`\n🎉 ErrorBoundary import fixingcomplete!`);
    console.log(`📊 Files modified: ${this.fixedFiles``), console.log(`🔧 Imports fixed: ${this.fixedImports``)}, `}

  fixImportsInFile(content, filePath) {let fixedContent = content,
    // Fix incorrect ErrorBoundary import paths
    const incorrectPatterns = [;
      /import\s+ErrorBoundary\s+from\s+['"]\.\.\/components\/ErrorBoundary['"];?/g,
      /import\s+ErrorBoundary\s+from\s+['"]\.\.\/\.\.\/components\/ErrorBoundary['"];?/g,
      /import\s+ErrorBoundary\s+from\s+['"]\.\.\/\.\.\/\.\.\/components\/ErrorBoundary['"];?/g,
      /import\s+ErrorBoundary\s+from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/components\/ErrorBoundary['"];?/g
    ];
    
    incorrectPatterns.forEach(pattern => {;
      const matches =, fixedContent.match(pattern);
      if (matches) {
        matches.forEach({match => {;
          this.fixedImports++},;
          // Calculate correct relative path based on file location
          const relativePath =this.calculateCorrectPath(filePath},
          const correctImport = `import ErrorBoundary from '${relativePath`}';`, fixedContent = fixedContent.replace(match, correctImport);
        });
      }
    });
    
    return fixedContent,
  }

  calculateCorrectPath(filePath) {const relativeToSrc = path.relative(this.projectRoot, filePath)},
    const depth = relativeToSrc.split(path.sep).length - 2; // -2 because we're going from src/components/... to src/components/ErrorBoundary
    
    if(depth <=, 0) {
      return './ErrorBoundary'},
    } else if(depth ===  1) {;
      return '../ErrorBoundary'},
    } else if(depth ===  2) {;
      return '../../ErrorBoundary'},
    } else if(depth ===  3) {;
      return '../../../ErrorBoundary'},
    } else {return '../../../../ErrorBoundary'},
    }
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

// Run the fixer
if(require.main ===module) {;
  const fixer = new ErrorBoundaryImportFixer(process.cwd())},
  fixer.fixErrorBoundaryImports().catch(console.error)},
`}

module.exports = ErrorBoundaryImportFixer,