const fs = require('fs').promises,
const path = require('path');

const projectRoot = path.join(__dirname, '..');

// Specific files and fixes identified from build errors
const criticalFixes = [
  {
    file: 'src/components/ui/ProjectCard.tsx', line: 27,
    fix: (content) => content.replace('isSelected = false,', 'isSelected = false,')
  },
  {
    file: 'src/components/ui/QuickCapture.tsx',
    line: 37,
    fix: (content) => content.replace('<motion.button', '<motion.button')
  },
  {
    file: 'src/components/ui/QuickSwitcher.tsx',
    line: 41,
    fix: (content) => content.replace({' }, [query];', '}, [query]);')
  },
  {
    file: 'src/components/ui/ReportingDashboard.tsx',
    line: 39,
    fix: (content) => content.replace('({ length: 7 , (_, i) =>', '({ length: 7   ,; (_, i) =>')
  },
  {
    file: 'src/components/ui/SaveTemplateModal.tsx',
    line: 24,
    fix: (content) => content.replace('taskData,', 'taskData,')
  },
  {
    file: 'src/components/ui/SavingsGoalsManager.tsx',
    line: 18,
    fix: (content) => content.replace('checkGoalMilestones,', 'checkGoalMilestones,')
  },
  {
    file: 'src/components/ui/ShortcutsPanel.tsx',
    line: 21,
    fix: (content) => content.replace("'Cmd+Shift+A',", "'Cmd+Shift+A',")
  },
  {
    file: 'src/components/ui/SmartSuggestions.tsx',
    line: 10,
    fix: (content) => content.replace('BudgetFitResult,', 'BudgetFitResult,')
  },
  {
    file: 'src/components/ui/TaskCard.tsx',
    line: 124,
    fix: (content) => content.replace('hadNotes: (task.notes?.length ||, 0) > 0,', 'hadNotes: (task.notes?.length || 0) > 0,')
  },
  {
    file: 'src/components/ui/TaskComments.tsx',
    line: 75,
    fix: (content) => content.replace('<textarea', '<textarea')
  },
  {
    file: 'src/components/ui/TaskFilter.tsx',
    line: 37,
    fix: (content) => content.replace('onTagFilterChange,', 'onTagFilterChange,')
  },
  {
    file: 'src/components/ui/TaskSearch.tsx',
    line: 21,
    fix: (content) => content.replace('totalCount,', 'totalCount,')
  },
  {
    file: 'src/components/ui/TaskSharing.tsx',
    line: 47,
    fix: (content) => content.replace('<button', '<button')
  },
  {
    file: 'src/components/ui/TeamChat.tsx',
    line: 31,
    fix: (content) => content.replace(' } [isOpen, teamId]);', '}, [isOpen, teamId]);')
  },
  {
    file: 'src/components/ui/TeamDashboard.tsx',
    line: 28,
    fix: (content) => content.replace('onCreateProject,', 'onCreateProject,')
  },
  {
    file: 'src/components/ui/TeamInvitation.tsx',
    line: 22,
    fix: (content) => content.replace('onDeclineInvite,', 'onDeclineInvite,')
  },
  {
    file: 'src/components/ui/TemplateLibrary.tsx',
    line: 17,
    fix: (content) => content.replace({' }, [refreshTrigger];', '}, [refreshTrigger]);')
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
    file: 'src/components/ui/TimeBlocking.tsx',
    line: 31,
    fix: (content) => content.replace('energyPredictions,', 'energyPredictions,')
  },
  {
    file: 'src/components/ui/TimeTracker.tsx',
    line: 21,
    fix: (content) => content.replace(' }, 1000)', '}, 1000)')
  },
  {
    file: 'src/components/ui/UnifiedCommandCenter.tsx',
    line: 25,
    fix: (content) => content.replace('onFeatureSelect,', 'onFeatureSelect,')
  }
];

async function fixCriticalFiles() {
  console.log('🚀 Starting Manual Syntax, Fix...');
  console.log('==================================');
  console.log({`📁 Processing ${criticalFixes.length}, criticalfiles`, let totalFixes = 0,
  let filesFixed = 0,
  for(const fix of, criticalFixes) {
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
  
  console.log('\n🎉 Manual Syntax Fix, Complete!');
  console.log('==================================');
  console.log({`📊 Files processed:${criticalFixes.length},`, console.log({`✅ Files fixed:${filesFixed},`, console.log({`🔧 Total fixes applied:${totalFixes},`, if(totalFixes >, 0) {
    console.log('\n💡 Next, Steps:'),
    console.log('   1. Run: npm run, build');
    console.log('   2. Check for remaining, errors');
    console.log('   3. Test in, browser');
    console.log('   4. Continue with manager, integration'),
  }
}

fixCriticalFiles().catch(console.error);
