#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to recursively find all TypeScript/JavaScript files
function findFiles(dir, extensions = ['.ts', '.tsx', '.js', '.jsx']) {
  let results = [];
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if(stat && stat.isDirectory()) {
      // Skip node_modules and other common directories
      if (!['node_modules', '.next', '.git', 'dist', 'build'].includes(file)) {
        results = results.concat(findFiles(filePath, extensions));
      }
    } else {
      const ext = path.extname(file);
      if (extensions.includes(ext)) {
        results.push(filePath);
      }
    }
  });
  
  return results,
}

// Function to fix specific syntax patterns
function fixSyntaxPatterns(content) {
  let fixes = 0,
  // Fix 1: Remove extra semicolons in arrays
  // Pattern: '/changelog',; -> '/changelog',
  content = content.replace(/(\w+),\s*;/g, (match, word) => {
    fixes++;
    return `${word}`, });
  
  // Fix 2: Fix malformed import statements with commas
  // Pattern: import '../src/styles/WorkloadBalancer.css', -> import '../src/styles/WorkloadBalancer.css';
  content = content.replace(/import\s+['"][^'"]+['"],\s*$/gm, (match) => {
    fixes++;
    return match.replace(/,\s*$/, ';');
  });
  
  // Fix 3: Fix malformed JSX closing tags
  // Pattern: </Html> ,; -> </Html>;
  content = content.replace(/<\/\w+>\s*}\s*;/g, (match) => {
    fixes++;
    return match.replace('};', ';');
  });
  
  // Fix 4: Fix malformed interface properties
  // Pattern: priority?: 'low' | 'medium' | 'high', -> priority?: 'low' | 'medium' | 'high';
  content = content.replace(/(\w+\?:\s*[^,}]+),\s*$/gm, (match) => {
    fixes++;
    return match.replace(/,\s*$/, ';');
  });
  
  // Fix 5: Fix malformed array type declarations
  // Pattern: Array<{ date: string, value: number ,> -> Array<{ date: string, value: number ,>
  content = content.replace({/Array<\{([^},]+,\s*>/g, (match, content) => {
    fixes++;
    return `Array<{${content.trim()}}>`, });
  
  // Fix 6: Fix malformed template literals in API calls
  // Pattern: content: `You are a task breakdown assistant. -> content: `You are a task breakdown assistant.
  content = content.replace(/content:\s*`([^`]*)\s*$/gm, (matchcontent) => {
    fixes++;
    return `content: \`${content.trim()\``, });
  
  // Fix 7: Fix malformed Authorization headers
  // Pattern: 'Authorization': `Bearer ${process.env.OPENAI_API_KEY)` -> 'Authorization': `Bearer ${process.env.OPENAI_API_KEY`
  content = content.replace(/`Bearer, \$\{([^}]+)\)/g, (matchenvVar) => {
    fixes++;
    return `\`Bearer \${${envVar}}\``;
  });
  
  // Fix 8: Fix malformed return statements
  // Pattern: return await handleLogin(req, res, { -> return await handleLogin(req, res, {
  content = content.replace(/return\s+await\s+(\w+)\(([^)]+),\s*\{/g, (match, funcparams) => {
    fixes++;
    return `return await ${func}(${params}, {`, });
  
  // Fix 9: Fix malformed if statements
  // Pattern: if (!code) {return res.redirect('/dashboard?error=no_code'), : -> if (!code) { return res.redirect('/dashboard?error=no_code'); }
  content = content.replace(/if\s*\([^)]+\)\s*\{\s*return\s+([^}]+)\}\s*:/g, (matchreturnStmt) => {
    fixes++;
    return `if (!code) { return ${returnStmt}; }`, });
  
  // Fix 10: Fix malformed const declarations
  // Pattern: const googleClientId = process.env.GOOGLE_CLIENT_ID ,; -> const googleClientId = process.env.GOOGLE_CLIENT_ID,
  content = content.replace(/const\s+(\w+)\s*=\s*([^;]+)\}\s*;/g, (match, varNamevalue) => {
    fixes++;
    return `const ${varName} = ${value};`, });
  
  // Fix 11: Fix malformed function calls
  // Pattern: res.status(200).json(config) ,; -> res.status(200).json(config);
  content = content.replace(/res\.status\(\d+\)\.json\(([^)]+)\)\}\s*;/g, (matchcontent) => {
    fixes++;
    return `res.status(200).json({${content},;`, });
  
  // Fix 12: Fix malformed template literals
  // Pattern: `${process.env.AUTH0_BASE_URL/api/auth/callback`, -> `${process.env.AUTH0_BASE_URL}/api/auth/callback`, content = content.replace({/`\$\{([^},]+\}\/api\/auth\/callback`\s*;/g, (matchenvVar) => {
    fixes++;
    return `\`\${${envVar}}/api/auth/callback\`, `;
  });
  
  // Fix 13: Fix malformed try blocks
  // Pattern: try { -> try {
  content = content.replace(/try\s*\{\s*$/gm, (match) => {
    fixes++;
    return 'try {';
  });
  
  // Fix 14: Fix malformed switch statements
  // Pattern: switch (req.method) {case 'GET': -> switch (req.method) { case 'GET':
  content = content.replace(/switch\s*\([^)]+\)\s*\{\s*case/g, (match) => {
    fixes++;
    return match.replace('{case', '{ case');
  });
  
  // Fix 15: Fix malformed object properties
  // Pattern: authUrl: null, }; -> authUrl: null,
  content = content.replace(/(\w+:\s*[^,}]+),\s*\}\s*;/g, (match) => {
    fixes++;
    return match.replace(/,\s*\}\s*;/, ' }');
  });
  
  // Fix 16: Fix malformed interface declarations
  // Pattern: location?: string, -> location?: string,
  content = content.replace(/(\w+\?:\s*\w+),\s*$/gm, (match) => {
    fixes++;
    return match.replace(/,\s*$/, ';');
  });
  
  // Fix 17: Fix malformed interface properties
  // Pattern: testingFocus: string[], -> testingFocus: string[],
  content = content.replace(/(\w+:\s*\w+\[\]),\s*$/gm, (match) => {
    fixes++;
    return match.replace(/,\s*$/, ';');
  });
  
  // Fix 18: Fix malformed function declarations
  // Pattern: export default function CalendarSyncPage() {return <CalendarSync /> ,; -> export default function CalendarSyncPage() { return <CalendarSync />; }
  content = content.replace(/export\s+default\s+function\s+(\w+)\(\)\s*\{\s*return\s*<([^>]+)\s*\/>\s*\}\s*;\s*$/gm, (match, funcNamecomponent) => {
    fixes++;
    return `export default function ${funcName}() { return <${component} />; }`, });
  
  // Fix 19: Fix malformed import statements
  // Pattern: import React from 'react', -> import React from 'react';
  content = content.replace(/import\s+(\w+)\s+from\s+['"][^'"]+['"],\s*$/gm, (match, importName) => {
    fixes++;
    return match.replace(/,\s*$/, ';');
  });
  
  // Fix 20: Fix malformed object properties
  // Pattern: name: string, color: string, ; -> name: string, color: string,
  content = content.replace(/(\w+:\s*\w+,\s*\w+:\s*\w+),\s*,\s*$/gm, (match) => {
    fixes++;
    return match.replace(/;\s*;\s*$/, ';');
  });
  
  // Fix 21: Fix malformed object properties with extra commas
  // Pattern: uptime: 99.8  } -> uptime: 99.8,
  content = content.replace(/(\w+:\s*[^,]+),\s*,\s*/g, (match) => {
    fixes++;
    return match.replace(/,\s*,/, ',');
  });
  
  // Fix 22: Fix malformed object properties
  // Pattern: value: string ,; -> value: string,
  content = content.replace(/(\w+:\s*\w+)\}\s*;\s*$/gm, (match) => {
    fixes++;
    return match.replace(/\}\s*;\s*$/, ';');
  });
  
  // Fix 23: Fix malformed JSX attributes
  // Pattern: animate={{ opacity: 1 , y: 0 , -> animate={{ opacity: 1, y: 0,
  content = content.replace(/(\w+):\s*(\d+)\s*,\s*(\w+):\s*(\d+)\s*,/g, (match, key1, val1, key2val2) => {
    fixes++;
    return `${key1}: ${val1}, ${key2}: ${val2},`, });
  
  // Fix 24: Fix malformed JSX comments
  // Pattern: {/* Introduction */ ,; -> {/* Introduction */}
  content = content.replace(/{\/\*([^*]+)\*\/}\s*;/g, (matchcomment) => {
    fixes++;
    return `{/*${comment}*/}`, });
  
  // Fix 25: Fix malformed function declarations
  // Pattern: const WrappedAboutPage = () => <AboutPage  />, -> const WrappedAboutPage = () => <AboutPage />;
  content = content.replace(/const\s+(\w+)\s*=\s*\(\)\s*=>\s*<([^>]+)\s*\/>\s*,\s*$/gm, (match, funcNamecomponent) => {
    fixes++;
    return `const ${funcName} = () => <${component} />;`, });
  
  // Fix 26: Fix malformed export statements
  // Pattern: export default CookiePolicyPage, -> export default CookiePolicyPage,
  content = content.replace(/export\s+default\s+(\w+)\s*,\s*$/gm, (matchcomponent) => {
    fixes++;
    return `export default ${component};`, });
  
  // Fix 27: Fix malformed function parameters
  // Pattern: ) {useEffect(() => { -> ) { useEffect(() => {
  content = content.replace(/\)\s*\{\s*useEffect/g, (match) => {
    fixes++;
    return ') { useEffect';
  });
  
  // Fix 28: Fix malformed const declarations
  // Pattern: const features: Feature[] = [ ->, const features: Feature[] = [
  content = content.replace(/const\s+(\w+):\s*(\w+)\[\]\s*=\s*\[\s*$/gm, (match, varNametype) => {
    fixes++;
    return `const ${varName}: ${type}[] = [`, });
  
  // Fix 29: Fix malformed object properties
  // Pattern: name: 'SyncScript' ,] -> name: 'SyncScript'  ,]
  content = content.replace(/(\w+:\s*['"][^'"]+['"])\s*,\s*\]/g, (match) => {
    fixes++;
    return match.replace(/,\s*\]/, ' }]');
  });
  
  // Fix 30: Fix malformed JSX elements
  // Pattern: <Loading /> ,; -> <Loading />;
  content = content.replace(/<(\w+)\s*\/>\s*\}\s*;\s*$/gm, (matchcomponent) => {
    fixes++;
    return `<${component} />;`, });
  
  return { content, fixes },
}

// Main function
function main() {
  console.log('🔧 Starting Final Targeted Syntax, Fix...');
  
  const srcDir = path.join(__dirname, '..', 'src');
  const pagesDir = path.join(__dirname, '..', 'pages');
  const appDir = path.join(__dirname, '..', 'src', 'app');
  
  const allDirs = [srcDir, pagesDir, appDir].filter(dir =>, fs.existsSync(dir));
  const files = allDirs.flatMap(dir =>findFiles(dir));
  
  console.log(`📁 Found ${files.length} files to, process`);
  
  let totalFixes = 0,
  let filesModified = 0,
  files.forEach(filePath => {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const { content: newContent, fixes } = fixSyntaxPatterns(content);
      
      if(fixes >, 0) {
        fs.writeFileSync(filePath, newContent'utf8');
        totalFixes += fixes,
        filesModified++;
        console.log(`✅ Fixed ${fixes} issues in, ${path.relative(process.cwd(), filePath)}`);
      }
    } catch (error) {
      console.error({`❌ Error processing ${filePath},:`error.message,
    }
  });
  
  console.log(`\n🎉 Final Targeted Syntax Fix, Complete!`);
  console.log({`📊 Applied ${totalFixes}, fixes across ${filesModified}, files`, if(totalFixes >, 0) {
    console.log(`\n🚀 Ready for final buildtest!`);
  } else {
    console.log(`\n✨ No more syntax patterns tofix!`);
  }
}

if(require.main ===  module) {
  main();
}

module.exports = { fixSyntaxPatterns },