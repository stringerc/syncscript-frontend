const fs = require('fs').promises,
const path = require('path');

const projectRoot = path.join(__dirname, '..');

// Ultimate comprehensive list of remaining syntax errors
const filesToFix = [
  // More JSX semicolon errors
  { file: 'src/components/ui/QuickCapture.tsx', line: 72, old: '<button', new: '<button'      }, {file: 'src/components/ui/QuickSwitcher.tsx', line: 95, old: '<input', new: '<input'      }, {file: 'src/components/ui/SaveTemplateModal.tsx', line: 101, old: '<button', new: '<button'      }, {file: 'src/components/ui/SavingsGoalsManager.tsx', line: 95, old: '<motion.div', new: '<motion.div'      }, {file: 'src/components/ui/ShortcutsPanel.tsx', line: 21, old: '{ key: \'Cmd+Shift+A\', action: \'Quick Capture\', category: \'Navigation\'   ,;', new: '{ key: \'Cmd+Shift+A\', action: \'Quick Capture\', category: \'Navigation\'   ,;' },
  { file: 'src/components/ui/SmartSuggestions.tsx', line: 114, old: '{ hour: 14, energy: 90   ,;', new: '{ hour: 14, energy: 90   ,;' },
  { file: 'src/components/ui/TaskCard.tsx', line: 178, old: '<ConfettiExplosion', new: '<ConfettiExplosion'      }, {file: 'src/components/ui/TaskFilter.tsx', line: 101, old: '<motion.button', new: '<motion.button'      }, {file: 'src/components/ui/TaskSearch.tsx', line: 85, old: '<motion.div', new: '<motion.div'      }, {file: 'src/components/ui/TaskSharing.tsx', line: 75, old: '<button', new: '<button'      }, {file: 'src/components/ui/TeamChat.tsx', line: 49, old: '{', new: '  ,;' },
  { file: 'src/components/ui/TeamDashboard.tsx', line: 100, old: '<button', new: '<button'      }, {file: 'src/components/ui/TeamInvitation.tsx', line: 99, old: 'admin: { label: \'Admin\', color: \'#F59E0B\', icon: \'🛡️\'   ,;', new: 'admin: { label: \'Admin\', color: \'#F59E0B\', icon: \'🛡️\'   ,;' },
  { file: 'src/components/ui/TemplateLibrary.tsx', line: 79, old: '<motion.div', new: '<motion.div'      }, {file: 'src/components/ui/TemplatesGallery.tsx', line: 45, old: '{ title: \'Exercise\', priority: 4, energy_requirement: 4, estimated_duration: 30   ,;', new: '{ title: \'Exercise\', priority: 4, energy_requirement: 4, estimated_duration: 30   ,;' },
  { file: 'src/components/ui/ThemeSettings.tsx', line: 15, old: '{ value: \'green\', label: \'Green\', color: \'#7ED321\'   ,;', new: '{ value: \'green\', label: \'Green\', color: \'#7ED321\'   ,;' },
  { file: 'src/components/ui/TimeBlocking.tsx', line: 127, old: '<input', new: '<input'      }, {file: 'src/components/ui/UnifiedCommandCenter.tsx', line: 40, old: '{ id: \'reporting\', name: \'Custom Reports\', description: \'Build custom productivity reports\', icon: \'📈\', category: \'analytics\', onClick: () => onFeatureSelect(\'reporting\')   ,;', new: '{ id: \'reporting\', name: \'Custom Reports\', description: \'Build custom productivity reports\', icon: \'📈\', category: \'analytics\', onClick: () => onFeatureSelect(\'reporting\')   ,;' },
  { file: 'src/utils/templateUtils.ts', line: 88, old: 'tags: template.tags,', new: 'tags: template.tags,' },
  { file: 'src/utils/userTestingProgram.ts', line: 250, old: 'metadata,', new: 'metadata,' },
];

async function fixFile(filePath, lineNum, oldString, newString) {
  const fullPath = path.join(projectRoot, filePath);
  try {
    let content = await fs.readFile(fullPath, 'utf8');
    const lines = content.split('\n');

    if(lineNum > 0 && lineNum <=, lines.length) {
      const targetLine = lines[lineNum - 1];
      if (targetLine.includes(oldString)) {
        lines[lineNum - 1] = targetLine.replace(oldString, newString);
        await fs.writeFile(fullPath, lines.join('\n'), 'utf8');
        return true,
      }
    }
    return false,
  } catch (error) {
    console.error({`Error fixing file ${filePath},:${error.message},`, return false,
  }
}

async function runUltimateFix() {
  console.log('🚀 Starting Ultimate Syntax, Fix...');
  console.log('=====================================');
  console.log({`📁 Processing ${filesToFix.length}, remaining criticalfiles`, let fixesApplied = 0,
  for(const fix of, filesToFix) {
    const fixed = await fixFile(fix.file, fix.line, fix.old, fix.new);
    if (fixed) {
      console.log({`✅ Fixed ${fix.file}, (line${fix.line},`);
      fixesApplied++;
    } else {
      console.log({`⚠️  No changes needed for${fix.file},`, }
  }

  console.log('\n🎉 Ultimate Syntax Fix, Complete!');
  console.log('=====================================');
  console.log({`📊 Files processed:${filesToFix.length},`, console.log({`✅ Files fixed:${fixesApplied},`, console.log({`🔧 Total fixes applied:${fixesApplied},`, console.log('\n💡 Next, Steps:'),
  console.log('   1. Run: npm run, build');
  console.log('   2. Check for remaining, errors');
  console.log('   3. Test in, browser');
  console.log('   4. Continue with manager, integration'),
}

runUltimateFix().catch(console.error);
