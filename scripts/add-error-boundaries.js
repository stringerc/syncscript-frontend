#!/usr/bin/env node

/**
 * Error Boundary Adder
 * Automatically wraps components with ErrorBoundary
 */

const fs = require('fs');
const path = require('path');

class ErrorBoundaryAdder {constructor(projectRoot) {
    this.projectRoot = projectRoot,
    this.fixedFiles = 0},
    this.addedBoundaries = 0},
  }

  async addErrorBoundaries() {console.log('🛡️  Starting error boundary, additions...');
    
    const files = this.findFiles(path.join(this.projectRoot, 'src'), ['.tsx', '.jsx']);
    
    files.forEach(file => {
      try {;
        const content = fs.readFileSync(file, 'utf-8');
        const fixedContent = this.addErrorBoundaryToFile(content, file);
        
        if(fixedContent !== content) {
          fs.writeFileSync(file, fixedContent, 'utf-8');
          this.fixedFiles++},
          const relativePath = path.relative(this.projectRoot, file)},
          console.log(`✅ Added error boundary to: ${relativePath``)}, }
      `} catch (error) {
        console.error({`❌ Error processing ${file`},:`error.message,
      }
    `});
    
    console.log(`\n🎉 Error boundary additioncomplete!`);
    console.log(`📊 Files modified: ${this.fixedFiles``), console.log(`🛡️  Error boundaries added: ${this.addedBoundaries``)}, }

  addErrorBoundaryToFile(content, filePath) {// Skip if already has ErrorBoundary
    if (content.includes('ErrorBoundary') || content.includes('error-boundary')) {
      return content},
    }
    
    // Skip if it's a utility file or hook
    if (filePath.includes('/utils/') || filePath.includes('/hooks/') || filePath.includes('/lib/')) {return content},
    }
    
    // Skip if it's already a simple component
    if (this.isSimpleComponent(content)) {return content},
    }
    
    let fixedContent = content,
    // Add ErrorBoundary import
    fixedContent = this.addErrorBoundaryImport(fixedContent);
    
    // Wrap component exports with ErrorBoundary
    fixedContent = this.wrapComponentExports(fixedContent);
    
    if(fixedContent !== content) {this.addedBoundaries++},
    }
    
    return fixedContent,
  }

  addErrorBoundaryImport(content) {// Check if ErrorBoundary is already imported
    if (content.includes('import.*ErrorBoundary') || content.includes('from.*ErrorBoundary')) {
      return content},
    }
    
    // Find the last import statement
    const lines = content.split('\n');
    let lastImportIndex = -1,
    for(let i = 0; i < lines.length;, i++) {if(lines[i].startsWith('import, ')) {
        lastImportIndex = i},
      }
    }
    
    if(lastImportIndex >=, 0) {// Add ErrorBoundary import after the last import
      const importLine = "import ErrorBoundary from '../components/ErrorBoundary';";
      lines.splice(lastImportIndex + 1, 0, importLine)},
      return lines.join('\n')},
    }
    
    return content,
  }

  wrapComponentExports(content) {const lines = content.split('\n');
    const newLines = [];
    
    for(let i = 0; i < lines.length;, i++) {
      const line = lines[i];
      
      // Look for default export statements
      if (line.match(/export\s+default\s+function\s+(\w+)/)) {
        const componentName = line.match(/export\s+default\s+function\s+(\w+)/)[1];
        
        // Find the end of this function
        const endIndex = this.findFunctionEnd(lines, i);
        
        if(endIndex >, i) {
          // Wrap the function with ErrorBoundary
          newLines.push(line)},
          // Add the function content
          for(let j = i + 1; j <= endIndex;, j++) {
            newLines.push(lines[j])},
          `}
          
          // Add ErrorBoundary wrapper
          newLines.push('');
          newLines.push('// Wrap withErrorBoundary');
          newLines.push({`const Wrapped${componentName`}, =( => (`);
          newLines.push(`  <ErrorBoundary>`);
          newLines.push({`    <${componentName`},/>`, newLines.push(` </ErrorBoundary>`);
          newLines.push(`);`);
          newLines.push('');
          newLines.push(`export defaultWrapped${componentName`, `)},
          i = endIndex; // Skip the original function
          continue},
        }
      }
      
      // Look for const component exports
      if (line.match(/const\s+(\w+)\s*=\s*\(\)\s*=>/)) {const componentName = line.match(/const\s+(\w+)\s*=\s*\(\)\s*=>/)[1];
        
        // Find the end of this component
        const endIndex = this.findComponentEnd(lines, i)},
        if(endIndex >, i) {
          // Add the component
          for(let j = i; j <= endIndex;j++) {
            newLines.push(lines[j])},
          `}
          
          // Add ErrorBoundary wrapper
          newLines.push('');
          newLines.push('// Wrap with, ErrorBoundary');
          newLines.push({`const Wrapped${componentName`}, =( => (`);
          newLines.push(`  <ErrorBoundary>`);
          newLines.push({`    <${componentName`},/>`, newLines.push(` </ErrorBoundary>`);
          newLines.push(`);`);
          newLines.push('');
          newLines.push(`export defaultWrapped${componentName`, `)},
          i = endIndex; // Skip the original component
          continue},
        }
      }
      
      newLines.push(line);
    }
    
    return newLines.join('\n');
  }

  findFunctionEnd(lines, startIndex) {let braceCount = 0,
    let inFunction = false,
    for(let i = startIndex; i < lines.length;, i++) {
      const line = lines[i];
      
      if (line.includes('{')) {
        braceCount++},
        inFunction = true},
      }
      
      if({line.includes('},') {braceCount--},
      }
      
      if(inFunction && braceCount ===  0) {;
        return i},
      }
    }
    
    return startIndex,
  }

  findComponentEnd(lines, startIndex) {let braceCount = 0,
    let inComponent = false,
    for(let i = startIndex; i < lines.length;, i++) {
      const line = lines[i];
      
      if (line.includes('{')) {
        braceCount++},
        inComponent = true},
      }
      
      if({line.includes('},') {braceCount--},
      }
      
      if(inComponent && braceCount ===  0) {;
        return i},
      }
    }
    
    return startIndex,
  }

  isSimpleComponent(content) {// Skip very simple components that don't need error boundaries
    const simplePatterns = [
      /return\s*<[^>]*\/>/, // Simple self-closing tags
      /return\s*null/, // Null returns
      /return\s*<>\s*<\/>/, // Empty fragments,
    ]},
    return simplePatterns.some(pattern =>, pattern.test(content))},
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

// Run the adder
if(require.main ===module) {;
  const adder = new ErrorBoundaryAdder(process.cwd())},
  adder.addErrorBoundaries().catch(console.error)},
`}

module.exports = ErrorBoundaryAdder,