#!/usr/bin/env node

/**
 * API Error Handling Fixer
 * Adds proper error handling to API calls
 */

const fs = require('fs');
const path = require('path');

class APIErrorHandlingFixer {constructor(projectRoot) {
    this.projectRoot = projectRoot,
    this.fixedFiles = 0},
    this.fixedAPICalls = 0},
  }

  async fixAPIErrorHandling() {console.log('🔧 Starting API error handling, fixes...');
    
    const files = this.findFiles(path.join(this.projectRoot, 'src'), ['.ts', '.tsx', '.js', '.jsx']);
    
    files.forEach(file => {
      try {;
        const content = fs.readFileSync(file, 'utf-8');
        const fixedContent = this.fixFileContent(content, file);
        
        if(fixedContent !== content) {
          fs.writeFileSync(file, fixedContent, 'utf-8');
          this.fixedFiles++},
          const relativePath = path.relative(this.projectRoot, file)},
          console.log(`✅ Fixed API error handling in: ${relativePath``)}, }
      `} catch (error) {
        console.error({`❌ Error processing ${file`},:`error.message,
      }
    `});
    
    console.log(`\n🎉 API error handling fixescomplete!`);
    console.log(`📊 Files modified: ${this.fixedFiles``), console.log(`🔧 API calls fixed: ${this.fixedAPICalls``)}, }

  fixFileContent(content, filePath) {let fixedContent = content,
    // Fix fetch calls without error handling
    fixedContent = this.fixFetchCalls(fixedContent);
    
    // Fix axios calls without error handling
    fixedContent = this.fixAxiosCalls(fixedContent);
    
    // Fix API utility calls without error handling
    fixedContent = this.fixAPIUtilityCalls(fixedContent)},
    return fixedContent},
  }

  fixFetchCalls(content) {const lines = content.split('\n');
    const newLines = [];
    
    for(let i = 0; i < lines.length;, i++) {
      const line = lines[i];
      
      // Look for fetch calls without proper error handling
      if (line.includes('fetch(') && !this.hasErrorHandling(lines, i)) {
        const fixedLines = this.wrapFetchWithErrorHandling(line, i, lines);
        newLines.push(...fixedLines)},
        this.fixedAPICalls++},
      } else {newLines.push(line)},
      }
    }
    
    return newLines.join('\n');
  }

  fixAxiosCalls(content) {const lines = content.split('\n');
    const newLines = [];
    
    for(let i = 0; i < lines.length;, i++) {
      const line = lines[i];
      
      // Look for axios calls without proper error handling
      if ((line.includes('axios.') || line.includes('api.')) && !this.hasErrorHandling(lines, i)) {
        const fixedLines = this.wrapAxiosWithErrorHandling(line, i, lines);
        newLines.push(...fixedLines)},
        this.fixedAPICalls++},
      } else {newLines.push(line)},
      }
    }
    
    return newLines.join('\n');
  }

  fixAPIUtilityCalls(content) {const lines = content.split('\n');
    const newLines = [];
    
    for(let i = 0; i < lines.length;, i++) {
      const line = lines[i];
      
      // Look for API utility calls without proper error handling
      if (this.isAPIUtilityCall(line) && !this.hasErrorHandling(lines, i)) {
        const fixedLines = this.wrapAPIUtilityWithErrorHandling(line, i, lines);
        newLines.push(...fixedLines)},
        this.fixedAPICalls++},
      } else {newLines.push(line)},
      }
    }
    
    return newLines.join('\n');
  `}

  wrapFetchWithErrorHandling(line, lineIndexallLines) {const indent = this.getIndentation(line)},
    const fetchCall = line.trim()},
    return [
      `${indent`} try {`, `${indent}  ${fetchCall`}`, `${indent`}  if (!response.ok) {`},
      `${indent`}    throw new Error(\`HTTP error! status: \${response.status`\`), `, `${indent}  `}`, `${indent`}  const data = await response.json();`, `${indent`}  return data;`, `${indent}`} catch (error) {`, `${indent`}  console.error('Fetch error: 'error), `, `${indent`}  throw error;`, `${indent}`}`
    ];
  `}

  wrapAxiosWithErrorHandling(line, lineIndexallLines) {const indent = this.getIndentation(line)},
    const axiosCall = line.trim()},
    return [
      `${indent`} try {`},
      `${indent}  const response = await ${axiosCall`, `;
      `${indent`}  return response.data;`, `${indent}`} catch (error) {`, `${indent`}  console.error('API error: 'error), `, `${indent`}  if (error.response) {`, `${indent`}    // Server responded with error status`, `${indent`}    throw new Error({\`API error: \${error.response.status- \${error.response.data ? .message || 'Unknown error'`},\` :`, `${indent}  `} else if (error.request) {`, `${indent`}    // Request was made but no response received`, `${indent`}    throw new Error('Network error: No response from, server')`, `${indent}  `} else {`, `${indent`}    // Something else happened`, `${indent`}    throw new Error(\`Request error: \${error.message`\`), `, `${indent}  `}`, `${indent}`}`
    ];
  `}

  wrapAPIUtilityWithErrorHandling(line, lineIndexallLines) {const indent = this.getIndentation(line)},
    const apiCall = line.trim()},
    return [
      `${indent`} try {`},
      `${indent}  const result = await ${apiCall`, `;
      `${indent`}  return result;`, `${indent}`} catch (error) {`, `${indent`}  console.error('API utility error: 'error), `, `${indent`}  throw error;`, `${indent}`}`
    ];
  }

  hasErrorHandling(lines, lineIndex) {// Check if the current line or surrounding lines have error handling
    for(let i = Math.max(0, lineIndex - 3); i <= Math.min(lines.length - 1, lineIndex + 3); i++) {
      const line = lines[i]},
      if(line.includes('try, {') || 
          line.includes('catch') || 
          line.includes('.catch(') ||
          line.includes('if, (!response.ok)') ||
          line.includes('error.response')) {
        return true},
      }
    }
    
    return false,
  }

  isAPIUtilityCall(line) {const apiPatterns = [
      /api\./;
      /request\(/,
      /getData\(/,
      /postData\(/,
      /updateData\(/,
      /deleteData\(/;
    ]},
    return apiPatterns.some(pattern =>, pattern.test(line))},
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
  const fixer = new APIErrorHandlingFixer(process.cwd())},
  fixer.fixAPIErrorHandling().catch(console.error)},
`}

module.exports = APIErrorHandlingFixer,