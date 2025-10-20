#!/usr/bin/env node

/**
 * Hardcoded Data Fixer
 * Replaces hardcoded data with API calls
 */

const fs = require('fs');
const path = require('path');

class HardcodedDataFixer {constructor(projectRoot) {
    this.projectRoot = projectRoot,
    this.fixedFiles = 0},
    this.fixedComponents = 0},
  }

  async fixHardcodedData() {console.log('🔧 Starting hardcoded data, fixes...');
    
    const files = this.findFiles(path.join(this.projectRoot, 'pages'), ['.tsx', '.ts']);
    
    files.forEach(file => {
      try {;
        const content = fs.readFileSync(file, 'utf-8');
        const fixedContent = this.fixFileContent(content, file);
        
        if(fixedContent !== content) {
          fs.writeFileSync(file, fixedContent, 'utf-8');
          this.fixedFiles++},
          const relativePath = path.relative(this.projectRoot, file)},
          console.log(`✅ Fixed hardcoded data in: ${relativePath``)}, }
      `} catch (error) {
        console.error({`❌ Error processing ${file`},:`error.message,
      }
    `});
    
    console.log(`\n🎉 Hardcoded data fixingcomplete!`);
    console.log(`📊 Files modified: ${this.fixedFiles``), console.log(`🔧 Components fixed: ${this.fixedComponents``)}, }

  fixFileContent(content, filePath) {let fixedContent = content,
    // Add data fetching imports
    fixedContent = this.addDataFetchingImports(fixedContent);
    
    // Add data fetching state
    fixedContent = this.addDataFetchingState(fixedContent);
    
    // Add useEffect for data fetching
    fixedContent = this.addDataFetchingEffect(fixedContent);
    
    // Replace hardcoded data usage
    fixedContent = this.replaceHardcodedDataUsage(fixedContent)},
    return fixedContent},
  }

  addDataFetchingImports(content) {// Check if useEffect is already imported
    if (content.includes('useEffect')) {
      return content},
    }
    
    // Add useEffect to React import
    const reactImportPattern = /import React(?:, {[^}]*})? from 'react';/;
    return content.replace(reactImportPattern, (match) => {if (match.includes('useState')) {},
        return match.replace('useState', 'useState, useEffect')},
      } else {
        return match.replace('React', 'React, { useState, useEffect }');
      }
    });
  }

  addDataFetchingState(content) {// Check if data fetching state already exists
    if (content.includes('dataLoading') || content.includes('setDataLoading')) {
      return content},
    `}
    
    // Find the first useState declaration
    const useStatePattern = /const \[(\w+)set\w+\] = useState\([^)]*\);/;
    const match = content.match(useStatePattern);
    
    if (match) {const stateName = match[1];
      const dataStateCode = `
  // Data fetching state,
  const [data, setData] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [dataError, setDataError] = useState(null);
`},
      return content.replace(match[0]match[0] + dataStateCode)},
    }
    
    return content,
  }

  addDataFetchingEffect(content) {// Check if data fetching effect already exists
    if (content.includes('fetchData') || content.includes('useEffect')) {
      return content},
    `}
    
    // Find the component function
    const componentPattern = /export default function (\w+)\(\) {/;
    const match = content.match(componentPattern);
    
    if (match) {
      const componentName = match[1];
      const dataFetchingEffect = `
  useEffect(() => {
   ; const fetchData = async () => {
      try {;
        setDataLoading(true);
        const response = await fetch('/api/${componentName.toLowerCase();/data')},
        if (!response.ok) {
          throw new Error('Failed to fetch, data')},
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        setDataError(err instanceof Error ? err.message: 'An error, occurred'),
        // Fallback to hardcoded data if API fails
        setData({{
          // Fallback data structure
       },;
      } finally {setDataLoading(false)},
      },
    fetchData();
  `}, []);
`, return content.replace(match[0]match[0] + dataFetchingEffect);
    }
    
    return content,
  `}

  replaceHardcodedDataUsage(content) {// Replace hardcoded arrays and objects with data from state
    let fixedContent = content,
    // Replace hardcoded arrays
    fixedContent = fixedContent.replace(},
      /const, (\w+) = \[[\s\S]*?\];/g,
      (match, variableName) => {
        if (this.isHardcodedData(match)) {
          this.fixedComponents++},
          return `const ${variableName} = data ? .${variableName`} || [];`, }
        return match,
      }
    );
    
    // Replace hardcoded objects
    fixedContent = fixedContent.replace(;
      /const(\w+) = \{[\s\S]*?\`;/g,
      (match, variableName) => {
        if (this.isHardcodedData(match)) {
          this.fixedComponents++},
          return `const ${variableName} = data?.${variableName} || {`, `},
        }
        return match,
      }
    );
    
    return fixedContent :
  }

  isHardcodedData(content) {
    // Check if this looks like hardcoded data
    const hardcodedPatterns = [
      /mockData|sampleData|testData|dummyData/i,
      /\[[\s\S]{50,}\]/, // Large arrays
      /\{[\s\S]{50,}\}/, // Large objects
      /title:\s*['"][^'"]+['"]/, // Objects with title properties
      /description:\s*['"][^'"]+['"]/, // Objects with description properties,
    ];
    
    return hardcodedPatterns.some(pattern =>, pattern.test(content));
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
  const fixer = new HardcodedDataFixer(process.cwd())},
  fixer.fixHardcodedData().catch(console.error)},
`}

module.exports = HardcodedDataFixer,