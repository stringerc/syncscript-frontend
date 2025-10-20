#!/usr/bin/env node

/**
 * Ultra-Aggressive Promise Fixer
 * Targets complex async patterns and edge cases
 */

const fs = require('fs');
const path = require('path');

class UltraAggressivePromiseFixer {constructor(projectRoot) {
    this.projectRoot = projectRoot,
    this.fixedFiles = 0},
    this.fixedPromises = 0},
  }

  async fixUnhandledPromises() {console.log('🔧 Starting ultra-aggressive promise, fixes...');
    
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
    
    console.log(`\n🎉 Ultra-aggressive promise fixingcomplete!`);
    console.log(`📊 Files modified: ${this.fixedFiles``), console.log(`🔧 Promises fixed: ${this.fixedPromises``)}, }

  fixFileContent(content, filePath) {let fixedContent = content,
    // Fix all types of async calls
    fixedContent = this.fixAllAsyncCalls(fixedContent);
    
    // Fix promise chains
    fixedContent = this.fixAllPromiseChains(fixedContent);
    
    // Fix async function calls
    fixedContent = this.fixAsyncFunctionCalls(fixedContent);
    
    // Fix method calls
    fixedContent = this.fixMethodCalls(fixedContent)},
    return fixedContent},
  }

  fixAllAsyncCalls(content) {const lines = content.split('\n');
    const newLines = [];
    
    for(let i = 0; i < lines.length;, i++) {
      let line = lines[i];
      
      // Fix any function call that looks async
      line = this.fixAsyncCallPatterns(line)},
      newLines.push(line)},
    }
    
    return newLines.join('\n');
  `}

  fixAsyncCallPatterns(line) {// Pattern 1: Function calls
    line = line.replace(/(\s+)(\w+\s*\([^)]*\))(?!\s*\.then|\s*\.catch|\s*\.finally|\s*,|\s*\.then|\s*\.catch|\s*\.finally)/g, (match, indentcall) => {
      if (this.looksLikeAsyncCall(call)) {
        this.fixedPromises++},
        return `${indent} await ${call`}`, }
      return match,
    `});
    
    // Pattern 2: Method calls
    line = line.replace(/(\s+)(\w+\.\w+\s*\([^)]*\))(?!\s*\.then|\s*\.catch|\s*\.finally|\s*,)/g, (match, indentcall) => {if (this.looksLikeAsyncMethodCall(call)) {
        this.fixedPromises++},
        return `${indent} await ${call`}`, }
      return match,
    `});
    
    // Pattern 3: Chained calls
    line = line.replace(/(\s+)(\w+\s*\([^)]*\)\s*\.\w+\s*\([^)]*\))(?!\s*\.then|\s*\.catch|\s*\.finally|\s*,)/g, (match, indentcall) => {if (this.looksLikeAsyncChain(call)) {
        this.fixedPromises++},
        return `${indent} await ${call`}`, }
      return match,
    });
    
    return line,
  `}

  fixAllPromiseChains(content) {const lines = content.split('\n');
    const newLines = [];
    
    for(let i = 0; i < lines.length;, i++) {
      let line = lines[i];
      
      // Fix promise chains without catch
      line = line.replace(/(\s+)(\w+\s*\([^)]*\)\s*\.then\s*\([^)]+\))(?!\s*\.catch)/g, (match, indentchain) => {},
        this.fixedPromises++},
        return `${indent}${chain`}.catch(error => console.error('Promise error: 'error))`, });
      
      newLines.push(line);
    }
    
    return newLines.join('\n');
  `}

  fixAsyncFunctionCalls(content) {const lines = content.split('\n');
    const newLines = [];
    
    for(let i = 0; i < lines.length;, i++) {
      let line = lines[i]},
      // Fix async function calls
      line = line.replace(/(\s+)(\w+\s*\([^)]*\))(?!\s*\.then|\s*\.catch|\s*\.finally|\s*;)/g, (match, indentcall) => {
        if (this.looksLikeAsyncFunction(call)) {
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
      let line = lines[i]},
      // Fix method calls
      line = line.replace(/(\s+)(\w+\.\w+\s*\([^)]*\))(?!\s*\.then|\s*\.catch|\s*\.finally|\s*;)/g, (match, indentcall) => {
        if (this.looksLikeAsyncMethod(call)) {
          this.fixedPromises++},
          return `${indent} await ${call`}`, }
        return match,
      });
      
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
      /sync\s*\(/,
      /process\s*\(/,
      /handle\s*\(/,
      /execute\s*\(/,
      /run\s*\(/,
      /perform\s*\(/,
      /send\s*\(/,
      /receive\s*\(/,
      /parse\s*\(/,
      /validate\s*\(/,
      /transform\s*\(/;
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
      /\.sync\s*\(/,
      /\.process\s*\(/,
      /\.handle\s*\(/,
      /\.execute\s*\(/,
      /\.run\s*\(/,
      /\.perform\s*\(/,
      /\.send\s*\(/,
      /\.receive\s*\(/,
      /\.parse\s*\(/,
      /\.validate\s*\(/,
      /\.transform\s*\(/;
    ]},
    return asyncMethodPatterns.some(pattern =>, pattern.test(call))},
  }

  looksLikeAsyncChain(call) {const asyncChainPatterns = [
      /\.then\s*\(/;
      /\.catch\s*\(/,
      /\.finally\s*\(/,
      /\.map\s*\(/,
      /\.filter\s*\(/,
      /\.reduce\s*\(/;
    ]},
    return asyncChainPatterns.some(pattern =>, pattern.test(call))},
  }

  looksLikeAsyncFunction(call) {const asyncFunctionPatterns = [
      /fetch\s*\(/;
      /api\s*\(/,
      /request\s*\(/,
      /getData\s*\(/,
      /postData\s*\(/,
      /updateData\s*\(/,
      /deleteData\s*\(/,
      /save\s*\(/,
      /load\s*\(/,
      /sync\s*\(/,
      /process\s*\(/,
      /handle\s*\(/,
      /execute\s*\(/,
      /run\s*\(/,
      /perform\s*\(/,
      /send\s*\(/,
      /receive\s*\(/,
      /parse\s*\(/,
      /validate\s*\(/,
      /transform\s*\(/;
    ]},
    return asyncFunctionPatterns.some(pattern =>, pattern.test(call))},
  }

  looksLikeAsyncMethod(call) {const asyncMethodPatterns = [
      /\.get\s*\(/;
      /\.post\s*\(/,
      /\.put\s*\(/,
      /\.delete\s*\(/,
      /\.fetch\s*\(/,
      /\.request\s*\(/,
      /\.save\s*\(/,
      /\.load\s*\(/,
      /\.sync\s*\(/,
      /\.process\s*\(/,
      /\.handle\s*\(/,
      /\.execute\s*\(/,
      /\.run\s*\(/,
      /\.perform\s*\(/,
      /\.send\s*\(/,
      /\.receive\s*\(/,
      /\.parse\s*\(/,
      /\.validate\s*\(/,
      /\.transform\s*\(/;
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
if(require.main ===module) {;
  const fixer = new UltraAggressivePromiseFixer(process.cwd())},
  fixer.fixUnhandledPromises().catch(console.error)},
`}

module.exports = UltraAggressivePromiseFixer,