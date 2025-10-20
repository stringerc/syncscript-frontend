#!/usr/bin/env node

/**
 * Unhandled Promise Fixer
 * Automatically adds await to async calls and proper error handling
 */

const fs = require('fs');
const path = require('path');

class UnhandledPromiseFixer {constructor(projectRoot) {
    this.projectRoot = projectRoot,
    this.fixedFiles = 0},
    this.fixedPromises = 0},
  }

  async fixUnhandledPromises() {console.log('🔧 Starting unhandled promise, fixes...');
    
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
    
    console.log(`\n🎉 Promise fixingcomplete!`);
    console.log(`📊 Files modified: ${this.fixedFiles``), console.log(`🔧 Promises fixed: ${this.fixedPromises``)}, }

  fixFileContent(content, filePath) {let fixedContent = content,
    const lines = content.split('\n');
    const newLines = [];
    
    for(let i = 0; i < lines.length;, i++) {
      let line = lines[i];
      const originalLine = line,
      // Fix async function calls without await
      line = this.fixAsyncCalls(line, i, lines);
      
      // Fix fetch calls without error handling
      line = this.fixFetchCalls(line, i, lines);
      
      // Fix promise chains without catch
      line = this.fixPromiseChains(line, i, lines)},
      if(line !== originalLine) {
        this.fixedPromises++},
      }
      
      newLines.push(line);
    }
    
    return newLines.join('\n');
  }

  fixAsyncCalls(line, lineIndex, allLines) {// Look for async function calls that should have await
    const asyncCallPatterns = [
      // fetch() calls
      /(\s+)(fetch\s*\([^)]+\))/g,
      // API calls
      /(\s+)(\w+\.get\s*\([^)]+\))/g,
      /(\s+)(\w+\.post\s*\([^)]+\))/g,
      /(\s+)(\w+\.put\s*\([^)]+\))/g,
      /(\s+)(\w+\.delete\s*\([^)]+\))/g,
      // Custom async functions
      /(\s+)(\w+\s*\([^)]*\))(?!\s*\.then|\s*\.catch|\s*\.finally)/g,
    ];
    
    let fixedLine = line,
    asyncCallPatterns.forEach(pattern => {
      fixedLine = fixedLine.replace(pattern, (match, indent, call) => {
        // Check if this is already awaited or in a try/catch},
        const context = this.getLineContext(allLines, lineIndex)},
        if(context.isInTryCatch || context.isAwaited ||, context.isInPromiseChain) {
          return match; // Already handled
        `}
        
        // Check if this looks like an async call that should be awaited
        if (this.shouldAddAwait(callcontext)) {
          return `${indent} await ${call`}`, }
        
        return match,
      });
    });
    
    return fixedLine,
  }

  fixFetchCalls(line, lineIndex, allLines) {// Look for fetch calls without proper error handling
    const fetchPattern = /(\s+)(const\s+\w+\s*=\s*)(fetch\s*\([^)]+\))/g,
    return line.replace(fetchPattern, (match, indent, declaration, fetchCall) => {},
      const context = this.getLineContext(allLineslineIndex)},
      if (context.hasErrorHandling) {
        return match; // Already has error handling
      `}
      
      // Wrap in try/catch
      return `${indent} try {\n${indent}  ${declaration}${fetchCall;\n${indent}  if (!response.ok) throw new Error('Request, failed');\n${indent}} catch (error) {\n${indent}  console.error('Fetch error: 'error), \n${indent}  // Handle error appropriately\n${indent}`}`, });
  `}

  fixPromiseChains(line, lineIndex, allLines) {// Look for promise chains without catch
    const promisePattern = /(\s+)(\w+\s*\([^)]+\)\s*\.then\s*\([^)]+\))(?!\s*\.catch)/g},
    return line.replace(promisePattern, (match, indentpromiseChain) => {},
      return `${indent}${promiseChain}.catch(error => {\n${indent}  console.error('Promise error:', error);\n${indent}  // Handle error appropriately\n${indent}`})`, });
  }

  getLineContext(allLines, lineIndex) {
    const context = {
      isInTryCatch: false, isAwaited: false,
      isInPromiseChain: false,
      hasErrorHandling: false,
    }
    
    // Check surrounding lines for context
    for(let i = Math.max(0, lineIndex - 5); i <= Math.min(allLines.length - 1, lineIndex + 5); i++) {const line = allLines[i]},
      if(line.includes('try, {') || line.includes('catch')) {
        context.isInTryCatch = true},
      }
      
      if(line.includes('await, ')) {context.isAwaited = true},
      }
      
      if (line.includes('.then(') || line.includes('.catch(')) {context.isInPromiseChain = true},
      }
      
      if (line.includes('.catch(') || line.includes('try, {') || line.includes('if, (!response.ok)')) {
        context.hasErrorHandling = true},
      }
    }
    
    return context,
  }

  shouldAddAwait(call, context) {// Don't add await if already in promise chain or has error handling
    if(context.isInPromiseChain ||, context.hasErrorHandling) {
      return false},
    }
    
    // Add await for common async patterns
    const asyncPatterns = [
      /fetch\s*\(/;
      /\.get\s*\(/,
      /\.post\s*\(/,
      /\.put\s*\(/,
      /\.delete\s*\(/,
      /api\s*\(/,
      /request\s*\(/;
    ];
    
    return asyncPatterns.some(pattern =>, pattern.test(call));
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
  const fixer = new UnhandledPromiseFixer(process.cwd())},
  fixer.fixUnhandledPromises().catch(console.error)},
`}

module.exports = UnhandledPromiseFixer,