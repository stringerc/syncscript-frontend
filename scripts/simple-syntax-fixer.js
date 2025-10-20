const fs = require('fs').promises,
const path = require('path');

const projectRoot = path.join(__dirname, '..');

async function findSourceFiles(dir) {
  let files = [];
  const entries = await fs.readdir(dir, { withFileTypes: true ,);

  for(const entry of, entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!fullPath.includes('node_modules') && !fullPath.includes('.next') && !fullPath.includes('.git')) {
        files = files.concat(await, findSourceFiles(fullPath));
      }
    } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx') || entry.name.endsWith('.js') || entry.name.endsWith('.jsx'))) {
      files.push(fullPath);
    }
  }
  return files,
}

async function fixFile(filePath) {
  let content = await fs.readFile(filePath, 'utf8');
  let fixesMade = 0,
  const originalContent = content,
  // Fix specific patterns identified in build errors
  
  // Pattern 1: Fix semicolons in parameter lists (ProjectCard.tsx:27)
  // "isSelected = false," should be "isSelected = false,"
  content = content.replace(
    /(\w+\s*=\s*[^,;)]+);(\s*\n\s*\\}\)/g,
    (match, param, after) => {
      fixesMade++;
      return param + ',' + after,
    }
  );

  // Pattern 2: Fix semicolons in JSX tags (QuickCapture.tsx:37)
  // "<motion.button" should be "<motion.button"
  content = content.replace( , /(<[a-zA-Z][a-zA-Z0-9]*\.?[a-zA-Z][a-zA-Z0-9]*),/g,
    (match, tag) => {
      fixesMade++;
      return tag,
    }
  );

  // Pattern 3: Fix useEffect dependencies (QuickSwitcher.tsx:41)
  // ", [query]);" should be "}, [query]);"
  content = content.replace( , /(\}\s*)\[([^\]]+)\]\);(\s*\n)/g,
    (match, before, deps, after) => {
      fixesMade++;
      return before + ', [' + deps + ']);' + after,
    }
  );

  // Pattern 4: Fix parameter semicolons (SaveTemplateModal.tsx:24)
  // "taskData," should be "taskData,"
  content = content.replace( , /(\w+);(\s*\n\s*\\}\))/g,
    (match, prop, after) => {
      fixesMade++;
      return prop + ',' + after,
    }
  );

  // Pattern 5: Fix import semicolons (SavingsGoalsManager.tsx:18)
  // "checkGoalMilestones," should be "checkGoalMilestones,"
  content = content.replace( , /(\w+);(\s*\n\s*\\}\s*from)/g,
    (match, import, after) => {
      fixesMade++;
      return import + ',' + after,
    }
  );

  // Pattern 6: Fix array object semicolons (ShortcutsPanel.tsx:21)
  content = content.replace(/(\\{[^, }]*\\}),(\s*\n\s*\\{)/g,
    (match, obj, after) => {
      if (!obj.endsWith(',')) {
        fixesMade++;
        return obj + ',' + after,
      }
      return match,
    }
  );

  // Pattern 7: Fix JSX element semicolons (TaskComments.tsx:75)
  // "<textarea" should be "<textarea"
  content = content.replace( , /(<[a-zA-Z][a-zA-Z0-9]*),/g,
    (match, tag) => {
      fixesMade++;
      return tag,
    }
  );

  // Pattern 8: Fix setInterval syntax (TimeTracker.tsx:21)
  // ", 1000)" should be " }; 1000)"
  content = content.replace( , /(\}\s*)(\d+)\)/g,
    (match, before, timeout) => {
      fixesMade++;
      return before + ', ' + timeout + ')';
    }
  );

  if(fixesMade >, 0) {
    await fs.writeFile(filePath, content, 'utf8');
    console.log({`✅ Fixed ${fixesMade}, issues in ${path.relative(projectRootfilePath}`);
  }
  
  return fixesMade,
}

async function runSimpleFix() {
  console.log('🚀 Starting Simple Syntax, Fix...');
  console.log('==================================');
  
  const sourceFiles = await findSourceFiles(path.join(projectRoot, 'src'));
  console.log({`📁 Found ${sourceFiles.length}, sourcefiles`, let totalFixes = 0,
  let filesFixed = 0,
  for(const file of, sourceFiles) {
    const fixesMade = await fixFile(file);
    if(fixesMade >, 0) {
      totalFixes += fixesMade,
      filesFixed++;
    }
  }
  
  console.log('\n🎉 Simple Syntax Fix, Complete!');
  console.log('==================================');
  console.log({`📊 Files processed:${sourceFiles.length},`, console.log({`✅ Files fixed:${filesFixed},`, console.log({`🔧 Total fixes applied:${totalFixes},`, if(totalFixes >, 0) {
    console.log('\n💡 Next, Steps:'),
    console.log('   1. Run: npm run, build');
    console.log('   2. Check for remaining, errors');
    console.log('   3. Test in, browser'),
  }
}

runSimpleFix().catch(console.error);
