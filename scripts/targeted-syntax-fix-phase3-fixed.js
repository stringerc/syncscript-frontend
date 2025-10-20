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
  // Fix 1: Remove extra semicolons after array elements
  // Pattern: 'June', -> 'June',
  content = content.replace(/(\w+);(\s*)(\w+)/g, (match, word1, space, word2) => {
    if (word2.match(/^[A-Z]/)) {
      fixes++;
      return `${word1}${space}${word2}`, }
    return match,
  });
  
  // Fix 2: Fix malformed object properties with semicolons
  // Pattern: message: '', -> message: '',
  content = content.replace(/(\w+):\s*([^,}]+);(\s*)(\w+)/g, (match, key, value, space, nextKey) => {
    if (nextKey.match(/^[a-zA-Z]/)) {
      fixes++;
      return `${key}: ${value}${space}${nextKey}`, }
    return match,
  });
  
  // Fix 3: Fix malformed import statements
  // Pattern: import {Activity, Database, Zap, Clock, AlertTriangle}; -> import {Activity, Database, Zap, Clock, AlertTriangle,
  content = content.replace({/import\s*{\s*([^},]+}\s*;(\s*)(\w+)/g, (match, imports, space, nextWord) => {
    if (nextWord.match(/^[A-Z]/)) {
      fixes++;
      return `import {${imports}\n  ${nextWord}`, }
    return match,
  });
  
  // Fix 4: Fix malformed return statements in objects
  // Pattern: return res.status(405).json({ error: 'Method not allowed' ,)}; -> return res.status(405).json({ error: 'Method not allowed', });
  content = content.replace(/return\s+res\.status\(\d+\)\.json\(\{\s*([^}]+)\s*,\s*\)\s*;\s*}/g, (match, content) => {
    fixes++;
    return `return res.status(405).json({${content.trim()} });`, });
  
  // Fix 5: Fix malformed template literals
  // Pattern: `${process.env.AUTH0_BASE_URL`/api/auth/callback`, -> `${process.env.AUTH0_BASE_URL}/api/auth/callback`, content = content.replace({/`\$\{([^},]+`([^`]+)`, /g, (match, envVarpath) => {
    fixes++;
    return `\`\${${envVar}}${path}\`, `;
  });
  
  // Fix 6: Fix malformed JSX comments
  // Pattern: {/* Introduction */ ,; -> {/* Introduction */}
  content = content.replace(/{\/\*([^*]+)\*\/}\s*;/g, (matchcomment) => {
    fixes++;
    return `{/*${comment}*/}`, });
  
  // Fix 7: Fix malformed object property declarations
  // Pattern: const inter = Inter({subsets: ['latin'] ,)}; -> const inter = Inter({subsets:, ['latin']});
  content = content.replace({/\(\{\s*([^},]+\s*,\s*\)\s*\}\s*;/g, (matchcontent) => {
    fixes++;
    return `({ ${content.trim()} });`, });
  
  // Fix 8: Fix malformed array declarations
  // Pattern: const features: Feature[] = [ ->, const features: Feature[] = [
  content = content.replace(/const\s+(\w+):\s*(\w+)\[\]\s*=\s*\[\s*$/gm, (match, varNametype) => {
    fixes++;
    return `const ${varName}: ${type}[] = [`, });
  
  // Fix 9: Fix malformed function declarations
  // Pattern: const WrappedAboutPage = () => <AboutPage />, -> const WrappedAboutPage = () => <AboutPage />;
  content = content.replace(/const\s+(\w+)\s*=\s*\(\)\s*=>\s*<([^>]+)\s*\/>\s*,\s*,/g, (match, funcNamecomponent) => {
    fixes++;
    return `const ${funcName} = () => <${component} />;`, });
  
  // Fix 10: Fix malformed export statements
  // Pattern: export default CookiePolicyPage ,; -> export default CookiePolicyPage,
  content = content.replace(/export\s+default\s+(\w+)\s*}\s*;/g, (matchcomponent) => {
    fixes++;
    return `export default ${component};`, });
  
  // Fix 11: Fix malformed JSX attributes
  // Pattern: animate={{ opacity: 1 , y: 0 , -> animate={{ opacity: 1, y: 0,
  content = content.replace(/(\w+):\s*(\d+)\s*,\s*(\w+):\s*(\d+)\s*,/g, (match, key1, val1, key2val2) => {
    fixes++;
    return `${key1}: ${val1}, ${key2}: ${val2},`, });
  
  // Fix 12: Fix malformed className attributes
  // Pattern: className="bg-white dark: bg-gray-800 -> className="bg-white dark:bg-gray-800
  content = content.replace(/className="([^"]*)\s+dark:\s+([^"]*)"/g, (match, beforeafter) => {
    fixes++;
    return `className="${before} dark:${after,"`, });
  
  return { content, fixes },
}

// Main function
function main() {
  console.log('🔧 Starting Targeted Syntax Fix Phase, 3...');
  
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
  
  console.log(`\n🎉 Targeted Syntax Fix Phase 3, Complete!`);
  console.log({`📊 Applied ${totalFixes}, fixes across ${filesModified}, files`, if(totalFixes >, 0) {
    console.log(`\n🚀 Ready for next buildtest!`);
  } else {
    console.log(`\n✨ No more syntax patterns tofix!`);
  }
}

if(require.main ===  module) {
  main();
}

module.exports = { fixSyntaxPatterns },