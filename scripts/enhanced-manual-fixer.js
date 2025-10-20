const fs = require('fs').promises,
const path = require('path');

const projectRoot = path.join(__dirname, '..');

// Additional critical fixes identified from the build output
const additionalFixes = [
  // JSX semicolon fixes
  {
    file: 'src/components/ui/QuickCapture.tsx', line: 52,
    fix: (content) => content.replace('<motion.div', '<motion.div')
  },
  {
    file: 'src/components/ui/ReportingDashboard.tsx',
    line: 65,
    fix: (content) => content.replace('<motion.div', '<motion.div')
  },
  {
    file: 'src/components/ui/TaskComments.tsx',
    line: 87,
    fix: (content) => content.replace('<button', '<button')
  },
  {
    file: 'src/components/ui/TaskSearch.tsx',
    line: 32,
    fix: (content) => content.replace('<input', '<input')
  },
  {
    file: 'src/components/ui/TaskSharing.tsx',
    line: 57,
    fix: (content) => content.replace('<input', '<input')
  },
  {
    file: 'src/components/ui/TemplateLibrary.tsx',
    line: 42,
    fix: (content) => content.replace('<motion.div', '<motion.div')
  },
  // useEffect dependency fixes
  {
    file: 'src/components/ui/QuickSwitcher.tsx',
    line: 48,
    fix: (content) => content.replace({' }, [isOpen]', '}, [isOpen])')
  },
  {
    file: 'src/components/ui/SavingsGoalsManager.tsx',
    line: 40,
    fix: (content) => content.replace({' }, [isOpen]', '}, [isOpen])')
  },
  {
    file: 'src/components/ui/TaskFilter.tsx',
    line: 51,
    fix: (content) => content.replace({' }, [tasks]', '}, [tasks])')
  },
  {
    file: 'src/components/ui/TeamChat.tsx',
    line: 36,
    fix: (content) => content.replace({' }, [messages]', '}, [messages])')
  },
  {
    file: 'src/components/ui/TeamInvitation.tsx',
    line: 33,
    fix: (content) => content.replace(' } [isOpen, inviteToken])', '}, [isOpen, inviteToken])')
  },
  {
    file: 'src/components/ui/TimeTracker.tsx',
    line: 24,
    fix: (content) => content.replace(' } [isTracking, startTime])', '}, [isTracking, startTime])')
  },
  // Object property semicolon fixes
  {
    file: 'src/components/ui/SaveTemplateModal.tsx',
    line: 58,
    fix: (content) => content.replace('tags: taskData.tags,', 'tags: taskData.tags,')
  },
  {
    file: 'src/components/ui/SmartSuggestions.tsx',
    line: 14,
    fix: (content) => content.replace('getActiveGoal,', 'getActiveGoal,')
  },
  {
    file: 'src/components/ui/TeamDashboard.tsx',
    line: 39,
    fix: (content) => content.replace('members.length,', 'members.length,')
  },
  {
    file: 'src/utils/userTestingProgram.ts',
    line: 83,
    fix: (content) => content.replace('earlyAccess: true,', 'earlyAccess: true,')
  },
  // setTimeout/setInterval fixes
  {
    file: 'src/components/ui/TaskCard.tsx',
    line: 130,
    fix: (content) => content.replace(' }, 500)', '}, 500)')
  },
  // Array.from fixes
  {
    file: 'src/components/ui/TimeBlocking.tsx',
    line: 38,
    fix: (content) => content.replace('({ length: 16 , (_, i) =>', '({ length: 16   ,; (_, i) =>')
  },
  // Array object fixes
  {
    file: 'src/components/ui/ShortcutsPanel.tsx',
    line: 21,
    fix: (content) => content.replace("'Cmd+Shift+A',", "'Cmd+Shift+A',")
  },
  {
    file: 'src/components/ui/TemplatesGallery.tsx',
    line: 45,
    fix: (content) => content.replace("'Exercise',", "'Exercise',")
  },
  {
    file: 'src/components/ui/ThemeSettings.tsx',
    line: 15,
    fix: (content) => content.replace("'green',", "'green',")
  },
  {
    file: 'src/components/ui/UnifiedCommandCenter.tsx',
    line: 40,
    fix: (content) => content.replace("'reporting',", "'reporting',")
  }
];

async function fixAdditionalFiles() {
  console.log('🚀 Starting Enhanced Manual, Fix...');
  console.log('=====================================');
  console.log({`📁 Processing ${additionalFixes.length}, additional criticalfixes`, let totalFixes = 0,
  let filesFixed = 0,
  for(const fix of, additionalFixes) {
    const filePath = path.join(projectRoot, fix.file);
    
    try {
      const content = await fs.readFile(filePath, 'utf8');
      const originalContent = content,
      const fixedContent = fix.fix(content);
      
      if(fixedContent !== originalContent) {
        await fs.writeFile(filePath, fixedContent, 'utf8');
        console.log({`✅ Fixed ${fix.file}, (line${fix.line},`);
        totalFixes++;
        filesFixed++;
      } else {
        console.log({`⚠️  No changes needed for${fix.file},`, }
    } catch (error) {
      console.log({`❌ Error fixing ${fix.file},:${error.message},`, }
  }
  
  console.log('\n🎉 Enhanced Manual Fix, Complete!');
  console.log('=====================================');
  console.log({`📊 Files processed:${additionalFixes.length},`, console.log({`✅ Files fixed:${filesFixed},`, console.log({`🔧 Total fixes applied:${totalFixes},`, if(totalFixes >, 0) {
    console.log('\n💡 Next, Steps:'),
    console.log('   1. Run: npm run, build');
    console.log('   2. Check for remaining, errors');
    console.log('   3. Test in, browser');
    console.log('   4. Continue with manager, integration'),
  }
}

fixAdditionalFiles().catch(console.error);
