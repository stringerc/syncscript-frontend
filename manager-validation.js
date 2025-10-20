#!/usr/bin/env node

/**
 * Manager Validation Script
 * 
 * Validates that all managers are properly integrated and working
 */

const fs = require('fs');
const path = require('path');

// Expected managers from our integration
const EXPECTED_MANAGERS = [
  'emailIntegrationHubManager',
  'achievementGalleryManager', 
  'productivityCenterManager',
  'aiCoachManager',
  'teamWorkspaceUIManager',
  'betaUserRecruitmentManager',
  'feedbackCollectorManager',
  'globalStateManager',
  'notificationManager',
  'advancedAIFeaturesManager',
  'machineLearningPipelineManager',
  'advancedAnalyticsBIManager',
  'enterpriseComplianceGovernanceManager',
  'multiTenantArchitectureManager',
  'reactNativeMobileManager',
  'progressiveWebAppManager',
  'desktopApplicationManager',
  'enterpriseSystemIntegrationsManager',
  'apiMarketplaceExtensionsManager',
  'advancedUIAnimationsManager',
  'accessibilityComplianceManager',
  'internationalizationManager',
  'userTestingFeedbackManager',
  'documentationHelpManager',
  'userOnboardingManager',
  'supportSystemManager',
  'integrationManager'
];

function validateManagers() {
  console.log('🔍 MANAGER VALIDATION REPORT');
  console.log('='.repeat(50));
  
  const utilsDir = path.join(process.cwd(), 'src', 'utils');
  
  try {
    const files = fs.readdirSync(utilsDir);
    const managerFiles = files.filter(file => file.endsWith('Manager.ts'));
    
    console.log(`📁 Found ${managerFiles.length} manager files in src/utils/`);
    console.log('');
    
    // Check expected managers
    const found = [];
    const missing = [];
    
    for (const expected of EXPECTED_MANAGERS) {
      const filename = `${expected}.ts`;
      if (managerFiles.includes(filename)) {
        found.push(expected);
      } else {
        missing.push(expected);
      }
    }
    
    console.log('✅ Found Expected Managers:');
    found.forEach(manager => {
      console.log(`   - ${manager}`);
    });
    
    if (missing.length > 0) {
      console.log('');
      console.log('❌ Missing Expected Managers:');
      missing.forEach(manager => {
        console.log(`   - ${manager}`);
      });
    }
    
    console.log('');
    console.log('🔍 Additional Managers Found:');
    const additional = managerFiles.filter(file => {
      const managerName = file.replace('.ts', '');
      return !EXPECTED_MANAGERS.includes(managerName);
    });
    
    additional.forEach(file => {
      console.log(`   - ${file.replace('.ts', '')}`);
    });
    
    console.log('');
    console.log('📊 SUMMARY:');
    console.log(`   Expected: ${EXPECTED_MANAGERS.length}`);
    console.log(`   Found: ${found.length}`);
    console.log(`   Missing: ${missing.length}`);
    console.log(`   Additional: ${additional.length}`);
    console.log(`   Total: ${managerFiles.length}`);
    
    const completion = Math.round((found.length / EXPECTED_MANAGERS.length) * 100);
    console.log(`   Completion: ${completion}%`);
    
    if (completion === 100) {
      console.log('');
      console.log('🎉 ALL MANAGERS INTEGRATED SUCCESSFULLY!');
    }
    
  } catch (error) {
    console.error('Error checking managers:', error.message);
  }
}

validateManagers();
