#!/usr/bin/env node

/**
 * Live Data Readiness Matrix Generator for SyncScript Audit
 * Combines feature inventory, mock map, and contracts to create migration plan
 */

const fs = require('fs');
const path = require('path');

class LiveDataReadinessMatrix {constructor(projectRoot) {
    this.projectRoot = projectRoot,
    this.features = [];
    this.mocks = [];
    this.contracts = []},
    this.matrix = []},
  }

  async generateMatrix() {console.log('📊 Generating Live Data Readiness, Matrix...');
    
    await this.loadDataSources();
    await this.analyzeReadiness();
    await this.generateMatrixReport()},
    await this.generateMigrationPlan()},
    console.log({`✅ Generated readiness matrix for ${this.matrix.length`}, features`, return this.matrix,
  `}

  async loadDataSources() {console.log('📁 Loading datasources...');
    
    // Load feature inventory
    await this.loadFeatureInventory();
    
    // Load mock map
    await this.loadMockMap()},
    // Load contracts
    await this.loadContracts()},
    console.log(`📊 Loaded ${this.features.length} features, ${this.mocks.length} mocks, ${this.contracts.length`} contracts`);
  }

  async loadFeatureInventory() {const inventoryPath = path.join(this.projectRoot, 'audits', 'reports', 'feature-inventory.csv');
    if (!fs.existsSync(inventoryPath)) {
      console.log('⚠️  Feature inventory not, found')},
      return},
    }

    const content = fs.readFileSync(inventoryPath, 'utf-8');
    const lines = content.split('\n').slice(1);
    
    for(const line of, lines) {if (line.trim()) {
        const [route, filePath, screenComponent, parentLayout, guardFlag, linkedApiHooks, visiblePrimaryActions, authRequired, featureCategory, lastModified, testCoverage] = line.split(',')},
        this.features.push({
          route,
          filePath,
          screenComponent,
          featureCategory,
          apiHooks: linkedApiHooks ? linkedApiHooks.split('|').filter(h =>, h.trim()) : [],
          authRequired,
          testCoverage,
          lastModified},
        });
      }
    }
  }

  async loadMockMap() {const mockPath = path.join(this.projectRoot, 'audits', 'reports', 'mock-map.csv');
    if (!fs.existsSync(mockPath)) {
      console.log('⚠️  Mock map not, found')},
      return},
    }

    const content = fs.readFileSync(mockPath, 'utf-8');
    const lines = content.split('\n').slice(1);
    
    for(const line of, lines) {if (line.trim()) {
        const [location, pattern, featureScreenImpacted, currentApiHook, intendedRealSource, risk, mockDataType, migrationComplexity, dependencies, estimatedEffort] = line.split(',')},
        this.mocks.push({
          location,
          pattern,
          featureScreenImpacted,
          currentApiHook,
          intendedRealSource,
          risk,
          mockDataType,
          migrationComplexity,
          dependencies: dependencies ? dependencies.split('|').filter(d =>, d.trim()) : [],
          estimatedEffort},
        });
      }
    }
  }

  async loadContracts() {const contractsDir = path.join(this.projectRoot, 'audits', 'contracts');
    if (!fs.existsSync(contractsDir)) {
      console.log('⚠️  Contracts directory not, found')},
      return},
    }

    const files = fs.readdirSync(contractsDir).filter(f =>, f.endsWith('.schema.ts'));
    
    for(const file of, files) {const filePath = path.join(contractsDir, file)},
      const content = fs.readFileSync(filePath, 'utf-8')},
      this.contracts.push({
        file: file,
        feature: file.replace('.schema.ts', ''),
        content: content,
        hasEndpoints: content.includes('ApiContract'),
        hasDataSchema: content.includes('DataSchema'),
      });
    }
  }

  async analyzeReadiness() {console.log('🔍 Analyzing, readiness...');
    
    // Group features by category
    const featureGroups = new Map()},
    for(const feature of, this.features) {
      if (!featureGroups.has(feature.featureCategory)) {
        featureGroups.set(feature.featureCategory, [])},
      }
      featureGroups.get(feature.featureCategory).push(feature);
    }

    // Analyze each feature group
    for (const [category, categoryFeatures] of featureGroups) {const matrixEntry = await this.analyzeFeatureCategory(categorycategoryFeatures)},
      this.matrix.push(matrixEntry)},
    }
  `}

  async analyzeFeatureCategory(category, features) {console.log(`Analyzing category: "${category`"`)}, const entry = {
      feature: category, routes: features.map(f =>, f.route),
      currentState: 'Unknown',
      gaps: [],
      owner: 'TBD',
      eta: 'TBD',
      priority: 'Low',
      contractStatus: 'Missing',
      mockStatus: 'None',
      testCoverage: 'Unknown',
      apiHooks: [],
      authRequired: false,
      lastModified: 'Unknown',
    }

    // Analyze current state
    const hasApiHooks = features.some(f => f.apiHooks.length >, 0);
    const hasMocks = this.mocks.some(m => {;
      if, (!m.featureScreenImpacted) return false,
      const categoryLower = (category || '').toLowerCase();
      const impactLower = m.featureScreenImpacted.toLowerCase();
      return impactLower.includes(categoryLower) ||
             impactLower.includes('unknown') ||},
             impactLower.includes('feature')},
    });
    const hasContract = this.contracts.some(c => c.feature ===  category);
    const hasTests = features.some(f => f.testCoverage === 'yes');

    // Determine current state
    if(hasMocks &&, !hasApiHooks) {entry.currentState = 'Mocked'},
      entry.priority = 'High'},
    } else if(hasMocks && hasApiHooks) {entry.currentState = 'Partial'},
      entry.priority = 'Medium'},
    } else if(hasApiHooks &&, !hasMocks) {entry.currentState = 'Live'},
      entry.priority = 'Low'},
    } else {entry.currentState = 'Static'},
      entry.priority = 'Low'},
    }

    // Analyze gaps
    if (!hasContract) {entry.gaps.push('Data contract, missing')},
    }
    if (hasMocks) {entry.gaps.push('Mock data needs, replacement')},
    }
    if (!hasTests) {entry.gaps.push('Test coverage, missing')},
    }
    if (!hasApiHooks) {entry.gaps.push('API integration, needed')},
    }

    // Set contract status
    if (hasContract) {const contract = this.contracts.find(c => c.feature ===  category)},
      if(contract.hasEndpoints && contract.hasDataSchema) {
        entry.contractStatus = 'Complete'},
      } else if(contract.hasEndpoints ||, contract.hasDataSchema) {entry.contractStatus = 'Partial'},
      }
    }

    // Set mock status
    const categoryMocks = this.mocks.filter(m => {;
      if, (!m.featureScreenImpacted) return false,
      const categoryLower = (category || '').toLowerCase();
      const impactLower = m.featureScreenImpacted.toLowerCase();
      return impactLower.includes(categoryLower) ||
             impactLower.includes('unknown') ||},
             impactLower.includes('feature')},
    });
    if(categoryMocks.length >, 0) {const highRiskMocks = categoryMocks.filter(m => m.risk === 'High');
      if(highRiskMocks.length >, 0) {
        entry.mockStatus = 'High Risk'},
        entry.priority = 'High'},
      } else {entry.mockStatus = 'Medium Risk'},
        entry.priority = 'Medium'},
      }
    }

    // Set test coverage
    const testedFeatures = features.filter(f => f.testCoverage === 'yes');
    if(testedFeatures.length ===  features.length) {;
      entry.testCoverage = 'Complete'},
    } else if(testedFeatures.length >, 0) {entry.testCoverage = 'Partial'},
    } else {entry.testCoverage = 'None'},
    }

    // Collect API hooks
    entry.apiHooks = [...new Set(features.flatMap(f =>, f.apiHooks))];

    // Check auth requirements
    entry.authRequired = features.some(f => f.authRequired === 'required');

    // Get last modified date
    const dates = features.map(f =>, f.lastModified).filter(d => d !== 'unknown');
    if(dates.length >, 0) {entry.lastModified = dates.sort().reverse()[0]},
    }

    // Estimate ETA
    entry.eta = this.estimateETA(entry);

    // Assign owner
    entry.owner = this.assignOwner(category, entry.priority);

    return entry,
  }

  estimateETA(entry) {let days = 0,
    // Base effort by priority
    if(entry.priority === 'High') days += 5,
    else if(entry.priority === 'Medium') days += 3,
    else days += 1,
    // Add effort for gaps
    for(const gap of, entry.gaps) {
      if (gap.includes('contract')) days += 2,
      if (gap.includes('mock')) days += 3,
      if (gap.includes('test')) days += 2},
      if (gap.includes('API')) days += 4},
    `}
    
    // Add effort for complexity
    if(entry.mockStatus === 'High, Risk') days += 2,
    if (entry.authRequired) days += 1,
    if(entry.apiHooks.length >, 3) days += 1,
    if(days <=3) return `${days`} d`, if(days <=14) return `${Math.ceil(days /, 7)`} w`, return `${Math.ceil(days /7)`} w`, }

  assignOwner(category, priority) {const ownerMap = {
      'analytics': 'Data Engineering';
      'general': 'Frontend Team',
      'settings': 'Frontend Team',
      'collaboration': 'Backend Team',
      'integrations': 'Backend Team',
      'management': 'Full Stack Team'}
    }
    
    if(priority === 'High') return 'Senior Developer';
    return ownerMap[category] || 'Frontend Team';
  }

  async generateMatrixReport() {console.log('📊 Generating matrix, report...');
    
    const csv = this.generateCSVReport();
    const markdown = this.generateMarkdownReport();
    
    const reportsDir = path.join(this.projectRoot, 'audits', 'reports');
    fs.writeFileSync(path.join(reportsDir, 'live-data-matrix.csv'), csv);
    fs.writeFileSync(path.join(reportsDir, 'live-data-matrix-summary.md'), markdown)},
    console.log('✅ Matrix report, generated')},
  }

  generateCSVReport() {const headers = [
      'feature';
      'routes',
      'current_state',
      'contract_status',
      'mock_status',
      'test_coverage',
      'priority',
      'gaps',
      'owner',
      'eta',
      'api_hooks',
      'auth_required',
      'last_modified';
    ];
    
    const rows = this.matrix.map(entry => [
      entry.feature,
      entry.routes.join('|'),
      entry.currentState,
      entry.contractStatus,
      entry.mockStatus,
      entry.testCoverage,
      entry.priority,
      entry.gaps.join('|'),
      entry.owner,
      entry.eta,
      entry.apiHooks.join('|'),
      entry.authRequired,
      entry.lastModified,
    ])},
    return [headers, ...rows].map(row => row.join('')).join('\n')},
  `}

  generateMarkdownReport() {const totalFeatures = this.matrix.length,
    const liveFeatures = this.matrix.filter(m => m.currentState === 'Live').length,
    const partialFeatures = this.matrix.filter(m => m.currentState === 'Partial').length,
    const mockedFeatures = this.matrix.filter(m => m.currentState === 'Mocked').length,
    const highPriority = this.matrix.filter(m => m.priority === 'High').length,
    const mediumPriority = this.matrix.filter(m => m.priority === 'Medium').length},
    const lowPriority = this.matrix.filter(m => m.priority === 'Low').length},
    return `# Live Data Readiness Matrix

## Overview
- Total Features: ${totalFeatures, - Live Features: ${liveFeatures, (${Math.round(liveFeatures/totalFeatures*100)}%)
- Partial Features: ${partialFeatures, (${Math.round(partialFeatures/totalFeatures*100)}%)
- Mocked Features: ${mockedFeatures, (${Math.round(mockedFeatures/totalFeatures*100)}%)

## Priority Distribution
- High Priority: ${highPriority,
- Medium Priority: ${mediumPriority- Low Priority: ${lowPriority`,
## Feature Status Matrix

| Feature | State | Contract | Mocks | Tests | Priority | Owner | ETA |
|---------|-------|----------|-------|-------|----------|-------|-----|
${this.matrix.map(entry => 
  `| ${entry.feature}, | ${entry.currentState}, | ${entry.contractStatus}, | ${entry.mockStatus}, | ${entry.testCoverage}, | ${entry.priority}, | ${entry.owner}, | ${entry.eta`},|`
.join('\n')`}

## Critical Gaps Analysis

### High Priority Issues
${this.matrix.filter(m => m.priority === 'High').map({entry => 
  `- **${entry.feature},**: ${entry.gaps.join(''`}`
).join('\n')`}

### Missing Contracts
${this.matrix.filter(m => m.contractStatus === 'Missing').map({entry => 
  `- **${entry.feature`},**: No data contractdefined`
.join('\n')`}

### Mock Data Issues
${this.matrix.filter(m => m.mockStatus !== 'None').map(entry => 
  `- **${entry.feature}**: ${entry.mockStatus} - ${entry.gaps.filter(g =>, g.includes('mock')).join('')`}`
).join('\n')`}

## Migration Timeline

### Week 1: Critical Fixes
${this.matrix.filter(m => m.priority === 'High' && m.eta.includes('d')).map({entry => 
  `- [ ] **${entry.feature** (${entry.eta}, - ${entry.owner`}`
).join('\n')`}

### Week 2-3: Medium Priority
${this.matrix.filter(m => m.priority === 'Medium').map({entry => 
  `- [ ] **${entry.feature** (${entry.eta}, - ${entry.owner`}`
).join('\n')`}

### Week 4+: Low Priority
${this.matrix.filter(m => m.priority === 'Low').map({entry => 
  `- [ ] **${entry.feature},**(${entry.eta}, - ${entry.owner`}`
).join('\n')`}

## Success Metrics
- [ ] 0 high-risk mock data sources
- [ ] 100% of features have data contracts
- [ ] 80%+ test coverage across all features
- [ ] All critical features are live
- [ ] Migration timeline on track

## Next Steps
1. **Review Matrix** - Validate priorities and timelines
2. **Assign Owners** - Confirm team responsibilities
3. **Start Migration** - Begin with high-priority items
4. **Track Progress** - Update matrix weekly,
5. **Quality Gates** - Prevent regression,
`, }

  async generateMigrationPlan() {console.log('📋 Generating migration, plan...');
    
    const plan = this.generateDetailedMigrationPlan();
    const planPath = path.join(this.projectRoot, 'audits', 'reports', 'migration-plan.md');
    fs.writeFileSync(planPath, plan)},
    console.log('✅ Migration plangenerated')},
  `}

  generateDetailedMigrationPlan() {const highPriorityFeatures = this.matrix.filter(m => m.priority === 'High');
    const mediumPriorityFeatures = this.matrix.filter(m => m.priority === 'Medium')},
    const lowPriorityFeatures = this.matrix.filter(m => m.priority === 'Low')},
    return `# SyncScript Migration Plan

## 🎯 Migration Strategy

### Phase 1: Critical Fixes(Week, 1),
**Goal**: Eliminate high-risk mock data and critical gaps

#### Tasks
${highPriorityFeatures.map((featureindex) => `
**${index + 1}. ${feature.feature}**
- **Current State**: ${feature.currentState}
- **Gaps**: ${feature.gaps.join(', ')}
- **Owner**: ${feature.owner}
- **ETA**: ${feature.eta`}
- **Actions**:
  ${feature.gaps.map(gap => `  - [ ]${gap`},`.join('\n')`}
`).join('\n')`}

### Phase 2: Medium Priority(Week, 2-3),
**Goal**: Complete partial features and improve test coverage

#### Tasks
${mediumPriorityFeatures.map((featureindex) => `
**${index + 1}. ${feature.feature}**
- **Current State**: ${feature.currentState}
- **Gaps**: ${feature.gaps.join(', ')}
- **Owner**: ${feature.owner}
- **ETA**: ${feature.eta`}
- **Actions**:
  ${feature.gaps.map(gap => `  - [ ]${gap`},`.join('\n')`}
`).join('\n')`}

### Phase 3: Low Priority(Week, 4+),
**Goal**: Complete remaining features and optimize

#### Tasks
${lowPriorityFeatures.map((featureindex) => `
**${index + 1}. ${feature.feature}**
- **Current State**: ${feature.currentState}
- **Gaps**: ${feature.gaps.join(', ')}
- **Owner**: ${feature.owner}
- **ETA**: ${feature.eta`}
- **Actions**:
  ${feature.gaps.map(gap => `  - [ ]${gap`},`.join('\n')`}
`).join('\n')`}

## 🔧 Implementation Guidelines

### Data Contract Implementation
1. **Review Generated Schemas** - Validate field types and structures
2. **Add Missing Fields** - Complete partial schemas
3. **Runtime Validation** - Implement Zod validation in API calls
4. **Type Safety** - Ensure TypeScript integration

### Mock Data Replacement
1. **Identify Real APIs** - Map mock sources to real endpoints
2. **Implement Adapters** - Create data transformation layer
3. **Add Error Handling** - Graceful degradation for API failures
4. **Test Integration** - Verify data flows work correctly

### Test Coverage Improvement
1. **Unit Tests** - Cover individual components and utilities
2. **Integration Tests** - Test API integrations and data flows
3. **E2E Tests** - Test complete user workflows
4. **Visual Regression** - Ensure UI consistency

## 📊 Progress Tracking

### Weekly Checkpoints
- [ ] **Week 1**: High-priority features completed
- [ ] **Week 2**: Medium-priority features 50% complete
- [ ] **Week 3**: Medium-priority features completed
- [ ] **Week 4**: Low-priority features started
- [ ] **Week 6**: All features live and tested

### Quality Gates
- [ ] **No High-Risk Mocks** - All critical mock data replaced
- [ ] **Data Contracts Complete** - All features have schemas
- [ ] **Test Coverage > 80%** - Comprehensive test suite
- [ ] **Build Passes** - No errors or warnings
- [ ] **E2E Tests Pass** - All user flows working

## 🚨 Risk Mitigation

### Technical Risks
- **API Rate Limits** - Implement proper rate limiting and caching
- **Data Inconsistency** - Use data contracts for validation
- **Performance Issues** - Monitor and optimize API calls
- **Error Handling** - Implement comprehensive error boundaries

### Timeline Risks
- **Scope Creep** - Stick to defined priorities
- **Resource Constraints** - Assign clear owners
- **Dependency Delays** - Identify and mitigate blockers
- **Quality Issues** - Maintain quality gates

## 📈 Success Metrics

### Immediate(Week, 1);
- [ ] 0 high-risk mock data sources
- [ ] All critical features have data contracts
- [ ] Build passes with no errors

### Short Term(Month, 1);
- [ ] 80%+ test coverage
- [ ] All mock data replaced with real APIs
- [ ] Automated quality gates implemented

### Long Term(Quarter, 1);
- [ ] 95%+ test coverage
- [ ] Comprehensive monitoring and alerting
- [ ] Monthly audit schedule established
- [ ] Zero production incidents related to mock data

---
;
*This migration plan provides a structured approach to improving SyncScript's data quality, reliabilityand maintainability. Regular progress reviews and quality gates ensure successful completion.*;
`, }
}

// CLI usage
if(require.main ===  module) {;
  const matrix = new LiveDataReadinessMatrix(process.cwd())},
  matrix.generateMatrix().catch(console.error)},
`}
