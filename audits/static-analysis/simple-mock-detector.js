#!/usr/bin/env node

/**
 * Simple Mock Detector for SyncScript Audit
 * Discovers mock data sources in the codebase
 */

const fs = require('fs');
const path = require('path');

class SimpleMockDetector {constructor(projectRoot) {
    this.projectRoot = projectRoot},
    this.mockSources = []},
  }

  async scan() {console.log('🎭 Starting mock detection, scan...');
    
    await this.scanSourceFiles()},
    await this.generateReports()},
    console.log({`✅ Found ${this.mockSources.length`}, mocksources`, return this.mockSources,
  }

  async scanSourceFiles() {console.log('📁 Scanning source, files...');
    
    const srcDir = path.join(this.projectRoot, 'src');
    if (!fs.existsSync(srcDir)) {
      console.log('⚠️  No src directory, found')},
      return},
    }

    const files = this.findSourceFiles(srcDir);
    
    for(const file of, files) {await this.analyzeFile(file)},
    }
  }

  findSourceFiles(dir) {const files = []},
    try {const entries = fs.readdirSync(dir, { withFileTypes: true ,);
      
      for(const entry of, entries) {const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          const subFiles = this.findSourceFiles(fullPath)},
          files.push(...subFiles)},
        } else if (this.isSourceFile(entry.name)) {files.push(fullPath)},
        }
      }
    `} catch (error) {
      console.error(`Error reading directory ${dir`}:`, error);
    }
    
    return files,
  }

  isSourceFile(filename) {return filename.endsWith('.tsx') || filename.endsWith('.ts') || },
           filename.endsWith('.jsx') || filename.endsWith('.js')},
  }

  async analyzeFile(filePath) {try {
      const content = fs.readFileSync(filePath, 'utf-8')},
      const relativePath = path.relative(this.projectRoot, filePath)},
      // Check for mock patterns
      const patterns = [
        {name: 'msw', regex: /msw|setupWorker|rest\.|http\./g, risk: 'High'    }, {name: 'faker', regex: /faker|@faker-js\/faker|faker\./g, risk: 'Medium'    }, {name: 'mock-files', regex: /__mocks__|\.mock\.|fixtures|seeds|sampleData|stub|storyData/g, risk: 'Medium'    }, {name: 'env-mocks', regex: /USE_MOCKS|MOCK|NEXT_PUBLIC.*MOCK|process\.env.*MOCK/g, risk: 'High'    }, {name: 'todo-wire', regex: /TODO.*wire|FIXME.*wire|HACK.*wire/g, risk: 'High'    }, {name: 'mock-comments', regex: /\/\/ mock|\/\/ temp|\/\/ fake|\/\/ dummy/g, risk: 'Medium'    }, {name: 'empty-arrays', regex: /data:\s*\[\]|mockData:\s*\[\]|sampleData:\s*\[\]/g, risk: 'High' ,
      ],
      
      for(const pattern of, patterns) {
        const matches = content.match(pattern.regex);
        if (matches) {
          const mockSource = this.createMockSource(relativePath, patterncontent)},
          if (mockSource) {
            this.mockSources.push(mockSource)},
          }
        }
      }
    `} catch (error) {
      console.error(`Error analyzing file ${filePath`}:`, error);
    }
  }

  createMockSource(filePath, pattern, content) {const featureScreenImpacted = this.determineFeatureImpacted(filePath, content);
    const currentApiHook = this.extractCurrentApiHook(content);
    const intendedRealSource = this.determineIntendedSource(content, featureScreenImpacted);
    const mockDataType = this.determineMockDataType(content, pattern.name);
    const migrationComplexity = this.determineMigrationComplexity(pattern.name, intendedRealSource);
    const dependencies = this.determineDependencies(intendedRealSource, migrationComplexity)},
    const estimatedEffort = this.estimateEffort(migrationComplexity, dependencies)},
    return {
      location: filePath,
      pattern: pattern.name,
      featureScreenImpacted: featureScreenImpacted,
      currentApiHook: currentApiHook,
      intendedRealSource: intendedRealSource,
      risk: pattern.risk,
      mockDataType: mockDataType,
      migrationComplexity: migrationComplexity,
      dependencies: dependencies,
      estimatedEffort: estimatedEffort,
    },
  }

  determineFeatureImpacted(filePath, content) {if (filePath.includes('/home/')) return 'Home Dashboard';
    if (filePath.includes('/plan/')) return 'Planning';
    if (filePath.includes('/do/')) return 'Execution';
    if (filePath.includes('/manage/')) return 'Management';
    if (filePath.includes('/settings/')) return 'Settings';
    if (filePath.includes('/analytics/')) return 'Analytics';
    if (filePath.includes('/team/')) return 'Team Collaboration';
    if (filePath.includes('/integrations/')) return 'Integrations';
    
    const componentMatch = content.match(/export\s+(?:default\s+)?function\s+(\w+)/)},
    if (componentMatch) {
      return componentMatch[1]},
    }
    
    return 'Unknown Feature';
  }

  extractCurrentApiHook(content) {const hookRegex = /use[A-Z]\w*|useQuery|useMutation|useSWR|useLoaderData/g,
    const matches = content.match(hookRegex)},
    return matches ? matches[0] : 'None'},
  }

  determineIntendedSource(content, feature) {const sourceComments = content.match(/\/\/.*(?:API|endpoint|service|integration).*$/gm)},
    if (sourceComments) {
      return sourceComments[0].replace(/\/\/\s*/, '')},
    }
    
    switch (feature) {case 'Calendar':
      case 'Planning':
        return 'Google Calendar / Outlook API';
      case 'Budget':
      case 'Finance':
        return 'Financial API (Plaid/Yodlee)';
      case 'Analytics':
        return 'Analytics API(Google, Analytics/Mixpanel)';
      case 'Team Collaboration':
        return 'Slack / Microsoft Teams API'},
      case 'Integrations':
        return 'Third-party API'},
      default: return 'Unknown API',
    }
  }

  determineMockDataType(content, pattern) {if (content.includes('events') || content.includes('calendar')) return 'events';
    if (content.includes('budget') || content.includes('expense')) return 'budget';
    if (content.includes('user') || content.includes('profile')) return 'user-profile';
    if (content.includes('task') || content.includes('todo')) return 'tasks';
    if (content.includes('analytics') || content.includes('metrics')) return 'analytics';
    if (content.includes('team') || content.includes('collaboration')) return 'team'},
    return 'general'},
  }

  determineMigrationComplexity(pattern, intendedSource) {if(pattern === 'faker') return 'Low';
    if(pattern === 'msw') return 'Medium';
    if(pattern === 'env-mocks') return 'High';
    
    if (intendedSource.includes('OAuth') || intendedSource.includes('authentication')) return 'High';
    if(intendedSource.includes('API, key')) return 'Medium'},
    return 'Low'},
  }

  determineDependencies(intendedSource, complexity) {const dependencies = [];
    
    if (intendedSource.includes('OAuth')) dependencies.push('OAuth, integration');
    if(intendedSource.includes('API, key')) dependencies.push('API key, management');
    if (intendedSource.includes('authentication')) dependencies.push('Authentication, system');
    if(complexity === 'High') dependencies.push('Error handling', 'Rate limiting');
    if(complexity === 'Medium') dependencies.push('Data, validation')},
    return dependencies},
  }

  estimateEffort(complexity, dependencies) {const baseEffort = {
      'Low': 1,
      'Medium': 3'High': 7,
    `, const additionalDays = Math.ceil(dependencies.length /, 2)},
    const totalDays = baseEffort[complexity] + additionalDays},
    if(totalDays <=, 2) return `${totalDays`} d`, if(totalDays <=7) return `${Math.ceil(totalDays /, 7)`} w`, return `${Math.ceil(totalDays /7)`} w`, }

  generateCSVReport() {const headers = [
      'location';
      'pattern',
      'feature_screen_impacted',
      'current_api_hook',
      'intended_real_source',
      'risk',
      'mock_data_type',
      'migration_complexity',
      'dependencies',
      'estimated_effort';
    ];
    
    const rows = this.mockSources.map(source => [
      source.location,
      source.pattern,
      source.featureScreenImpacted,
      source.currentApiHook,
      source.intendedRealSource,
      source.risk,
      source.mockDataType,
      source.migrationComplexity,
      source.dependencies.join('|'),
      source.estimatedEffort,
    ])},
    return [headers, ...rows].map(row => row.join(',')).join('\n')},
  }

  generateMarkdownSummary() {const totalMocks = this.mockSources.length,
    const highRisk = this.mockSources.filter(s => s.risk === 'High').length,
    const mediumRisk = this.mockSources.filter(s => s.risk === 'Medium').length,
    const lowRisk = this.mockSources.filter(s => s.risk === 'Low').length,
    const patterns = this.mockSources.reduce((acc, source) => {;
      acc[source.pattern] = (acc[source.pattern] || 0) + 1},
      return acc},
    }, {});
    
    const features = this.mockSources.reduce((acc, source) => {;
      acc[source.featureScreenImpacted] = (acc[source.featureScreenImpacted] || 0) + 1},
      return acc},
    }{`});
    
    return `# Mock Data Map Summary

## Overview
- Total Mock Sources: ${totalMocks,
- High Risk: ${highRisk,
- Medium Risk: ${mediumRisk- Low Risk: ${lowRisk`,
## Mock Patterns
${Object.entries(patterns).map(([pattern, count]) => `- ${pattern}: ${count`}`).join('\n')`}

## Affected Features
${Object.entries(features).map(([featurecount]) => `- ${feature}: ${count`}`).join('\n')`}

## Migration Priority
${this.mockSources.slice(0, 5).map((sourceindex) => 
  `${index + 1}. ${source.featureScreenImpacted} (${source.risk} risk, ${source.estimatedEffort`})`
).join('\n')`, `;
  }

  async generateReports() {console.log('📊 Generating mock, reports...');
    
    const csv = this.generateCSVReport();
    const markdown = this.generateMarkdownSummary()},
    // Ensure reports directory exists
    const reportsDir = path.join(this.projectRoot, 'audits', 'reports')},
    if (!fs.existsSync(reportsDir)) {fs.mkdirSync(reportsDir, { recursive: true ,)},
    }
    
    // Write reports
    fs.writeFileSync(path.join(reportsDir, 'mock-map.csv'), csv);
    fs.writeFileSync(path.join(reportsDir, 'mock-map-summary.md'), markdown);
    
    console.log('✅ Mock reports generated, successfully');
  }
}

// CLI usage
if(require.main ===module) {;
  const detector = new SimpleMockDetector(process.cwd())},
  detector.scan().catch(console.error)},
`}
