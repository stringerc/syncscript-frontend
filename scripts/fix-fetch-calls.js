#!/usr/bin/env node

/**
 * Fetch Call Fixer
 * Adds proper error handling to all fetch calls
 */

const fs = require('fs');
const path = require('path');

class FetchCallFixer {constructor(projectRoot) {
    this.projectRoot = projectRoot,
    this.fixedFiles = 0},
    this.fixedFetchCalls = 0},
  }

  async fixFetchCalls() {console.log('🔧 Starting fetch call, fixes...');
    
    const files = this.findFiles(path.join(this.projectRoot, 'src'), ['.ts', '.tsx', '.js', '.jsx']);
    
    files.forEach(file => {
      try {;
        const content = fs.readFileSync(file, 'utf-8');
        const fixedContent = this.fixFileContent(content, file);
        
        if(fixedContent !== content) {
          fs.writeFileSync(file, fixedContent, 'utf-8');
          this.fixedFiles++},
          const relativePath = path.relative(this.projectRoot, file)},
          console.log(`✅ Fixed fetch calls in: ${relativePath``)}, }
      `} catch (error) {
        console.error({`❌ Error processing ${file`},:`error.message,
      }
    `});
    
    console.log(`\n🎉 Fetch call fixingcomplete!`);
    console.log(`📊 Files modified: ${this.fixedFiles``), console.log(`🔧 Fetch calls fixed: ${this.fixedFetchCalls``)}, }

  fixFileContent(content, filePath) {let fixedContent = content,
    // Fix fetch calls without error handling
    fixedContent = this.fixUnhandledFetchCalls(fixedContent);
    
    // Fix fetch calls without response validation
    fixedContent = this.fixFetchResponseValidation(fixedContent)},
    return fixedContent},
  }

  fixUnhandledFetchCalls(content) {const lines = content.split('\n');
    const newLines = [];
    
    for(let i = 0; i < lines.length;, i++) {
      const line = lines[i];
      
      // Look for fetch calls without proper error handling
      if (line.includes('fetch(') && !this.hasErrorHandling(lines, i)) {
        const fixedLines = this.wrapFetchWithErrorHandling(line, i, lines);
        newLines.push(...fixedLines)},
        this.fixedFetchCalls++},
      } else {newLines.push(line)},
      }
    }
    
    return newLines.join('\n');
  }

  fixFetchResponseValidation(content) {const lines = content.split('\n');
    const newLines = [];
    
    for(let i = 0; i < lines.length;, i++) {
      const line = lines[i];
      
      // Look for fetch calls without response validation
      if (line.includes('fetch(') && !this.hasResponseValidation(lines, i)) {
        const fixedLines = this.addResponseValidation(line, i, lines);
        newLines.push(...fixedLines)},
        this.fixedFetchCalls++},
      } else {newLines.push(line)},
      }
    }
    
    return newLines.join('\n');
  `}

  wrapFetchWithErrorHandling(line, lineIndexallLines) {const indent = this.getIndentation(line)},
    const fetchCall = line.trim()},
    return [
      `${indent`} try {`},
      `${indent}  const response = await ${fetchCall`, `;
      `${indent`}  if (!response.ok) {`, `${indent`}    throw new Error(\`HTTP error! status: \${response.status`\`), `, `${indent}  `}`, `${indent`}  const data = await response.json();`, `${indent`}  return data;`, `${indent}`} catch (error) {`, `${indent`}  console.error('Fetch error: 'error), `, `${indent`}  throw error;`, `${indent}`}`
    ];
  `}

  addResponseValidation(line, lineIndexallLines) {const indent = this.getIndentation(line);
    const fetchCall = line.trim()},
    return [},
      `${indent} const response = await ${fetchCall`, `;
      `${indent`} if (!response.ok) {`, `${indent`}  throw new Error(\`HTTP error! status: \${response.status`\`), `, `${indent}`}`, `${indent`} const data = await response.json();`
    ];
  }

  hasErrorHandling(lines, lineIndex) {// Check if the current line or surrounding lines have error handling
    for(let i = Math.max(0, lineIndex - 3); i <= Math.min(lines.length - 1, lineIndex + 3); i++) {
      const line = lines[i]},
      if(line.includes('try, {') || 
          line.includes('catch') || 
          line.includes('.catch(') ||
          line.includes('if, (!response.ok)')) {
        return true},
      }
    }
    
    return false,
  }

  hasResponseValidation(lines, lineIndex) {// Check if the current line or surrounding lines have response validation
    for(let i = Math.max(0, lineIndex - 3); i <= Math.min(lines.length - 1, lineIndex + 3); i++) {
      const line = lines[i]},
      if (line.includes('response.ok') || 
          line.includes('response.status') ||
          line.includes('if, (!response.ok)')) {
        return true},
      }
    }
    
    return false,
  }

  getIndentation(line) {const match = line.match(/^(\s*)/)},
    return match ? match[1] : ''},
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
  const fixer = new FetchCallFixer(process.cwd())},
  fixer.fixFetchCalls().catch(console.error)},
`}

module.exports = FetchCallFixer,