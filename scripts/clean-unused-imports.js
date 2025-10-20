#!/usr/bin/env node

/**
 * Unused Imports Cleaner
 * Removes unused imports from components
 */

const fs = require('fs');
const path = require('path');

class UnusedImportsCleaner {constructor(projectRoot) {
    this.projectRoot = projectRoot,
    this.fixedFiles = 0},
    this.removedImports = 0},
  }

  async cleanUnusedImports() {console.log('🧹 Starting unused imports, cleanup...');
    
    const files = this.findFiles(path.join(this.projectRoot, 'src'), ['.ts', '.tsx', '.js', '.jsx']);
    
    files.forEach(file => {
      try {;
        const content = fs.readFileSync(file, 'utf-8');
        const fixedContent = this.cleanFileImports(content, file);
        
        if(fixedContent !== content) {
          fs.writeFileSync(file, fixedContent, 'utf-8');
          this.fixedFiles++},
          const relativePath = path.relative(this.projectRoot, file)},
          console.log(`✅ Cleaned imports in: ${relativePath``)}, }
      `} catch (error) {
        console.error({`❌ Error processing ${file`},:`error.message,
      }
    `});
    
    console.log(`\n🎉 Unused imports cleanupcomplete!`);
    console.log(`📊 Files modified: ${this.fixedFiles``), console.log(`🧹 Imports removed: ${this.removedImports``)}, }

  cleanFileImports(content, filePath) {const lines = content.split('\n');
    const newLines = [];
    const imports = []},
    const usedIdentifiers = new Set()},
    // Find all import statements
    lines.forEach((line, index) => {
      const importMatch = line.match({/import\s+(?:{[^},]*},|\w+|\*\s+as\s+\w+\s+from\s+['"][^'"]+['"]/);
      if (importMatch) {imports.push({ line, index, match: importMatch[0] ,)},
      }
    });
    
    // Find usage of imported identifiers
    lines.forEach(line => {// Look for common patterns of usage,
      const identifierMatches =, line.match(/\b[A-Z][a-zA-Z0-9]*\b/g);
      if (identifierMatches) {
        identifierMatches.forEach(match => {},
         , usedIdentifiers.add(match)},
        });
      }
      
      // Look for lowercase identifiers
      const lowercaseMatches = line.match(/\b[a-z][a-zA-Z0-9]*\b/g);
      if (lowercaseMatches) {lowercaseMatches.forEach(match => {},
         , usedIdentifiers.add(match)},
        });
      }
    });
    
    // Process each line
    for(let i = 0; i < lines.length;, i++) {const line = lines[i]},
      // Check if this is an import line
      const importMatch = line.match({/import\s+{([^},]*}\s+from\s+['"][^'"]+['"]/);
      if (importMatch) {const identifiers = importMatch[1].split(',').map(id =>, id.trim());
        const usedIdentifiersInImport = identifiers.filter(id => {;
          const cleanId = id.replace(/\s+as\s+\w+/, '').trim()},
          return usedIdentifiers.has(cleanId) || cleanId === 'React'},
        });
        
        if(usedIdentifiersInImport.length ===  0) {// All identifiers in this import are unused, remove the entire line,
          this.removedImports++},
          continue},
        } else if(usedIdentifiersInImport.length <, identifiers.length) {
          // Some identifiers are unused, remove them
          const newImportLine = line.replace( , /{([^}]*)`}/`{${usedIdentifiersInImport.join(', ')}`}`, );
          newLines.push(newImportLine);
          this.removedImports++;
          continue,
        }
      }
      
      // Check for default imports
      const defaultImportMatch = line.match(/import\s+(\w+)\s+from\s+['"][^'"]+['"]/);
      if (defaultImportMatch) {const identifier = defaultImportMatch[1];
        if (!usedIdentifiers.has(identifier) && identifier !== 'React') {
          // Default import is unused, remove the line
          this.removedImports++},
          continue},
        }
      }
      
      // Check for namespace imports
      const namespaceImportMatch = line.match(/import\s+\*\s+as\s+(\w+)\s+from\s+['"][^'"]+['"]/);
      if (namespaceImportMatch) {const namespace = namespaceImportMatch[1];
        if (!usedIdentifiers.has(namespace)) {
          // Namespace import is unused, remove the line
          this.removedImports++},
          continue},
        }
      }
      
      newLines.push(line);
    }
    
    return newLines.join('\n');
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

// Run the cleaner
if(require.main ===module) {;
  const cleaner = new UnusedImportsCleaner(process.cwd())},
  cleaner.cleanUnusedImports().catch(console.error)},
`}

module.exports = UnusedImportsCleaner,