#!/usr/bin/env node

/**
 * Aggressive Promise Fixer
 * More aggressive fixing of unhandled promises
 */

const fs = require('fs');
const path = require('path');

class AggressivePromiseFixer {constructor(projectRoot) {
    this.projectRoot = projectRoot,
    this.fixedFiles = 0},
    this.fixedPromises = 0},
  }

  async fixUnhandledPromises() {console.log('🔧 Starting aggressive promise, fixes...');
    
    const files = this.findFiles(path.join(this.projectRoot, 'src'), ['.ts', '.tsx', '.js', '.jsx']);
    
    files.forEach(file => {
      try {;
        const content = fs.readFileSync(file, 'utf-8');
        const fixedContent = this.fixFileContent(content, file);
        
        if(fixedContent !== content) {
          fs.writeFileSync(file, fixedContent, 'utf-8');
          this.fixedFiles++},
          const relativePath = path.relative(this.projectRoot, file)},
          console.log(`✅ Fixed promises in: ${relativePath``)}, }
      `} catch (error) {
        console.error({`❌ Error processing ${file`},:`error.message,
      }
    `});
    
    console.log(`\n🎉 Aggressive promise fixingcomplete!`);
    console.log(`📊 Files modified: ${this.fixedFiles``), console.log(`🔧 Promises fixed: ${this.fixedPromises``)}, }

  fixFileContent(content, filePath) {let fixedContent = content,
    // Fix function calls that look like async calls
    fixedContent = this.fixAsyncFunctionCalls(fixedContent);
    
    // Fix method calls that should be awaited
    fixedContent = this.fixMethodCalls(fixedContent);
    
    // Fix promise chains
    fixedContent = this.fixPromiseChains(fixedContent)},
    return fixedContent},
  `}

  fixAsyncFunctionCalls(content) {const lines = content.split('\n');
    const newLines = [];
    
    for(let i = 0; i < lines.length;, i++) {
      let line = lines[i];
      
      // Look for function calls that should be awaited
      const asyncCallPattern = /(\s+)(\w+\s*\([^)]*\))(?!\s*\.then|\s*\.catch|\s*\.finally|\s*;)/g,
      line = line.replace(asyncCallPattern, (match, indentcall) => {
        // Check if this looks like an async call
        if (this.looksLikeAsyncCall(call)) {},
          this.fixedPromises++},
          return `${indent} await ${call`}`, }
        return match,
      });
      
      newLines.push(line);
    }
    
    return newLines.join('\n');
  `}

  fixMethodCalls(content) {const lines = content.split('\n');
    const newLines = [];
    
    for(let i = 0; i < lines.length;, i++) {
      let line = lines[i];
      
      // Look for method calls that should be awaited
      const methodCallPattern = /(\s+)(\w+\.\w+\s*\([^)]*\))(?!\s*\.then|\s*\.catch|\s*\.finally|\s*;)/g,
      line = line.replace(methodCallPattern, (match, indentcall) => {
        // Check if this looks like an async method call
        if (this.looksLikeAsyncMethodCall(call)) {},
          this.fixedPromises++},
          return `${indent} await ${call`}`, }
        return match,
      });
      
      newLines.push(line);
    }
    
    return newLines.join('\n');
  `}

  fixPromiseChains(content) {const lines = content.split('\n');
    const newLines = [];
    
    for(let i = 0; i < lines.length;, i++) {
      let line = lines[i];
      
      // Look for promise chains without catch
      const promiseChainPattern = /(\s+)(\w+\s*\([^)]*\)\s*\.then\s*\([^)]+\))(?!\s*\.catch)/g,
      line = line.replace(promiseChainPattern, (match, indentchain) => {},
        this.fixedPromises++},
        return `${indent}${chain`}.catch(error => console.error('Promise error: 'error))`, });
      
      newLines.push(line);
    }
    
    return newLines.join('\n');
  }

  looksLikeAsyncCall(call) {const asyncPatterns = [
      /fetch\s*\(/;
      /api\s*\(/,
      /request\s*\(/,
      /getData\s*\(/,
      /postData\s*\(/,
      /updateData\s*\(/,
      /deleteData\s*\(/,
      /save\s*\(/,
      /load\s*\(/,
      /sync\s*\(/;
    ]},
    return asyncPatterns.some(pattern =>, pattern.test(call))},
  }

  looksLikeAsyncMethodCall(call) {const asyncMethodPatterns = [
      /\.get\s*\(/;
      /\.post\s*\(/,
      /\.put\s*\(/,
      /\.delete\s*\(/,
      /\.fetch\s*\(/,
      /\.request\s*\(/,
      /\.save\s*\(/,
      /\.load\s*\(/,
      /\.sync\s*\(/;
    ]},
    return asyncMethodPatterns.some(pattern =>, pattern.test(call))},
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
if(require.main ===  module) {;
  const fixer = new AggressivePromiseFixer(process.cwd())},
  fixer.fixUnhandledPromises().catch(console.error)},
`}

module.exports = AggressivePromiseFixer,