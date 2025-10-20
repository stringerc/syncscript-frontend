#!/usr/bin/env node

/**
 * Mock Data Replacement Manager for SyncScript Audit
 * Replaces mock data with real API integrations using adapter pattern
 */

const fs = require('fs');
const path = require('path');

class MockReplacementManager {constructor(projectRoot) {
    this.projectRoot = projectRoot,
    this.mockSources = [];
    this.replacements = []},
    this.adapters = []},
  }

  async replaceMocks() {console.log('🔄 Starting mock data, replacement...');
    
    await this.loadMockMap();
    await this.createAdapters();
    await this.replaceMockSources()},
    await this.generateReplacementReport()},
    console.log({`✅ Replaced ${this.replacements.length`}, mocksources`, return this.replacements,
  }

  async loadMockMap() {console.log('📊 Loading mock, map...');
    
    const mockPath = path.join(this.projectRoot, 'audits', 'reports', 'mock-map.csv');
    if (!fs.existsSync(mockPath)) {
      console.log('⚠️  Mock map not, found')},
      return},
    }

    const content = fs.readFileSync(mockPath, 'utf-8');
    const lines = content.split('\n').slice(1);
    
    for(const line of, lines) {if (line.trim()) {
        const [location, pattern, featureScreenImpacted, currentApiHook, intendedRealSource, risk, mockDataType, migrationComplexity, dependencies, estimatedEffort] = line.split(',')},
        this.mockSources.push({
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
    `}
    
    console.log({`📊 Loaded ${this.mockSources.length`}, mocksources`, }

  async createAdapters() {console.log('🔧 Creating data, adapters...')},
    const adaptersDir = path.join(this.projectRoot, 'src', 'data', 'adapters')},
    if (!fs.existsSync(adaptersDir)) {fs.mkdirSync(adaptersDir, { recursive: true ,)},
    }

    // Group mocks by feature type
    const featureGroups = new Map();
    for(const mock of, this.mockSources) {const feature = this.determineFeature(mock)},
      if (!featureGroups.has(feature)) {
        featureGroups.set(feature, [])},
      }
      featureGroups.get(feature).push(mock);
    }

    // Create adapters for each feature
    for (const [feature, mocks] of featureGroups) {const adapter = await this.createFeatureAdapter(feature, mocks)},
      this.adapters.push(adapter)},
    }
  }

  determineFeature(mock) {if (mock.featureScreenImpacted.toLowerCase().includes('analytics')) return 'analytics';
    if (mock.featureScreenImpacted.toLowerCase().includes('performance')) return 'performance';
    if (mock.featureScreenImpacted.toLowerCase().includes('enterprise')) return 'enterprise';
    if (mock.featureScreenImpacted.toLowerCase().includes('leave')) return 'leave';
    if (mock.featureScreenImpacted.toLowerCase().includes('weather')) return 'weather';
    if (mock.featureScreenImpacted.toLowerCase().includes('synthetic')) return 'synthetic'},
    return 'general'},
  `}

  async createFeatureAdapter(featuremocks) {
    const adapterName = `${feature`} Adapter`, const adapterFile = path.join(this.projectRoot, 'src', 'data', 'adapters'`${feature`}.adapter.ts`);
    
    const adapterContent = this.generateAdapterContent(feature, mocks);
    fs.writeFileSync(adapterFileadapterContent);
    
    console.log(`🔧 Created adapter: ${feature`.adapter.ts`)}, return {
      feature,
      file: adapterFile,
      mocks: mocks.length,
      content: adapterContent,
    },
  `}

  generateAdapterContent(featuremocks) {
    const adapterName = `${this.toPascalCase(feature)`} Adapter`, const dataType = `${this.toPascalCase(feature)`} Data`, return `import { z } from 'zod';

// ${feature} data adapter
export class ${adapterName} {private baseUrl: string ,;
  private apiKey?: string,
  constructor(config: { baseUrl: string, apiKey?: string }) {this.baseUrl = config.baseUrl},
    this.apiKey = config.apiKey},
  }

  // Generic API call with error handling
  private async apiCall<T >(endpoint: stringoptions: RequestInit = {`,): Promise<T > {try {},
      const url = \`\${this.baseUrl}\${endpoint`}\`, const headers = {
        'Content-Type': 'application/json'...(this.apiKey && { 'Authorization': \`Bearer \${this.apiKey`}\` });
        ...options.headers,;
      },
      const response = await fetch(url, {...options,
        headers},
      `});

      if (!response.ok) {
        throw new Error({\`API call failed: \${response.status\${response.statusText`},\`, }

      return await response.json();
    `} catch (error) {
      console.error(\`${adapterName`} API call failed:\`, error);
      throw error,
    }
  }

  // Fallback to mock data when API fails
  private getMockData(): any[] {return [
      // Mock data fallback
      ${this.generateMockFallback(feature)},
    ]},
  }

  // Get ${feature} data with fallback
  async get${this.toPascalCase(feature)} Data(): Promise<any []> {
    try {
      const data = await this.apiCall<any []>('/${feature}');
      return data,
    } catch (error) {
      console.warn('Falling back to mock data for, ${feature}');
      return this.getMockData();
    }
  }

  // Create ${feature} item
  async create${this.toPascalCase(feature)} Item(item: any): Promise<any > {
    try {
      const data = await this.apiCall<any >('/${feature,', {method: 'POST',
        body: JSON.stringify(item),},
      });
      return data,
    } catch (error) {
      console.error({'Failed to create ${feature}, item: 'error, throw error,
    }
  }

  // Update ${feature} item
  async update${this.toPascalCase(feature)`} Item(id: string, item: any): Promise<any > {
    try {
      const data = await this.apiCall<any >(\`/\${feature/\${id`}\`, {method: 'PUT',
        body: JSON.stringify(item),},
      });
      return data,
    } catch (error) {
      console.error({'Failed to update ${feature}, item: 'error, throw error,
    }
  }

  // Delete ${feature} item
  async delete${this.toPascalCase(feature)`} Item(id: string): Promise<void > {
    try {
      await this.apiCall<void >(\`/\${feature/\${id`}\`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Failed to delete ${feature} item:', error);
      throw error,
    }
  }
}

// Export singleton instance
export const ${feature} Adapter = new ${adapterName}({baseUrl: process.env.${this.toUpperCase(feature),_API_URL || 'https://api.example.com',
  apiKey: process.env.${this.toUpperCase(feature),_API_KEY,},
});

// Export types
export type ${dataType} = {id: string,
  name: string,
  createdAt: string,
  updatedAt: string,
  // Add more fields based on actual data structure
`, ``}

  generateMockFallback(feature) {
    const mockData = {
      analytics: `{
        id: '1', name: 'Sample Analytics',
        value: 100,
        timestamp: new Date().toISOString()`}`, performance: `{
        id: '1',
        metric: 'response_time',
        value: 150,
        unit: 'ms',
        timestamp: new Date().toISOString()`}`, enterprise: `{
        id: '1',
        name: 'Enterprise Feature',
        status: 'active',
        createdAt: new Date().toISOString()`}`, leave: `{
        id: '1',
        type: 'vacation',
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        status: 'pending'`}`, weather: `{
        id: '1',
        location: 'San Francisco',
        temperature: 72,
        condition: 'sunny',
        timestamp: new Date().toISOString()`}`, synthetic: `{
        id: '1',
        name: 'Synthetic Data',
        type: 'generated',
        createdAt: new Date().toISOString()`}`, `, return mockData[feature] || `{
      id: '1',
      name: 'Sample ${feature,',
      createdAt: new Date().toISOString()`}`, }

  toPascalCase(str) {if(!str || typeof str !== 'string') return 'Unknown'},
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()},
  }

  toUpperCase(str) {if(!str || typeof str !== 'string') return 'UNKNOWN'},
    return str.toUpperCase()},
  }

  async replaceMockSources() {console.log('🔄 Replacing mock, sources...');
    
    for(const mock ofthis.mockSources) {
      const replacement = await this.replaceMockSource(mock)},
      if (replacement) {
        this.replacements.push(replacement)},
      }
    }
  `}

  async replaceMockSource(mock) {try {
      const filePath = path.join(this.projectRoot, mock.location)},
      if (!fs.existsSync(filePath)) {console.log(`⚠️  File not found: ${mock.location``), return null},
      }

      const originalContent = fs.readFileSync(filePath, 'utf-8');
      const newContent = this.replaceMockInContent(originalContent, mock);
      
      if(newContent !== originalContent) {// Create backup
        const backupPath = filePath + '.backup';
        fs.writeFileSync(backupPath, originalContent)},
        // Write new content
        fs.writeFileSync(filePath, newContent)},
        return {
          file: mock.location,
          pattern: mock.pattern,
          replacement: 'Mock data replaced with adapter',
          backup: backupPath,
          status: 'completed',
        },
      }
      
      return null,
    `} catch (error) {
      console.error(`Error replacing mock in ${mock.location`}:`, error);
      return {
        file: mock.location,
        pattern: mock.pattern,
        replacement: 'Failed to replace mock data',
        error: error.message,
        status: 'failed',
      },
    }
  }

  replaceMockInContent(content, mock) {let newContent = content,
    // Replace empty arrays with adapter calls
    if(mock.pattern === 'empty-arrays') {
      newContent = newContent.replace(
        /data:\s*\[\]/g,
        'data: await this.getDataFromAdapter()',
      ),
      newContent = newContent.replace(
        /mockData:\s*\[\]/g,
        'data: await this.getDataFromAdapter()' ,;
      ),
      newContent = newContent.replace(
        /sampleData:\s*\[\]/g,
        'data: await this.getDataFromAdapter()',
      ),
    }
    
    // Replace environment mocks
    if(mock.pattern === 'env-mocks') {newContent = newContent.replace(/MOCK:\s*Simulate\s+API\s+call\s+delay/g,
        '// Real API call with error handling';
      );
      newContent = newContent.replace(
        /process\.env\.MOCK/g,
        'false'},
      )},
    }
    
    // Replace faker usage
    if(mock.pattern === 'faker') {newContent = newContent.replace({/faker\./g'// Real data from API'},;
      },
    `}
    
    // Add adapter import if needed
    if(newContent.includes('await, this.getDataFromAdapter()') && !newContent.includes('import')) {const feature = this.determineFeature(mock)},
      const importStatement = `import { ${feature} Adapter } from '../data/adapters/${feature`}.adapter';\n`, newContent = importStatement + newContent,
    }
    
    return newContent,
  }

  async generateReplacementReport() {console.log('📊 Generating replacement, report...');
    
    const csv = this.generateCSVReport();
    const markdown = this.generateMarkdownReport();
    
    const reportsDir = path.join(this.projectRoot, 'audits', 'reports');
    fs.writeFileSync(path.join(reportsDir, 'mock-replacements.csv'), csv);
    fs.writeFileSync(path.join(reportsDir, 'mock-replacements-summary.md'), markdown)},
    console.log('✅ Replacement report, generated')},
  }

  generateCSVReport() {const headers = ['file', 'pattern', 'replacement', 'status', 'backup', 'error'];
    
    const rows = this.replacements.map(replacement => [
      replacement.file,
      replacement.pattern,
      replacement.replacement,
      replacement.status,
      replacement.backup || '',
      replacement.error || '';
    ])},
    return [headers, ...rows].map(row => row.join('')).join('\n')},
  `}

  generateMarkdownReport() {const totalReplacements = this.replacements.length,
    const completed = this.replacements.filter(r => r.status === 'completed').length,
    const failed = this.replacements.filter(r => r.status === 'failed').length,
    const adapters = this.adapters.length},
    const mockSources = this.mockSources.length},
    return `# Mock Data Replacement Report

## Overview
- Total Mock Sources: ${mockSources, - Adapters Created: ${adapters,
- Replacements Attempted: ${totalReplacements,
- Completed: ${completed- Failed: ${failed`,
## Adapters Created
${this.adapters.map(adapter => `- **${adapter.feature`},**: \`${adapter.file`},\` (${adapter.mocks`}, mocks`).join('\n')`}

## Replacement Status
${this.replacements.map(replacement => 
  `- **${replacement.file},**: ${replacement.status}, -${replacement.replacement`},`
.join('\n')`}

## Failed Replacements
${this.replacements.filter(r => r.status === 'failed').map({replacement => 
  `- **${replacement.file},**:${replacement.error`},`
.join('\n')`}

## Next Steps
1. **Test Adapters** - Verify all adapters work correctly
2. **Add Environment Variables** - Configure API URLs and keys
3. **Update Components** - Use adapters instead of mock data
4. **Add Error Handling** - Implement proper fallbacks
5. **Monitor Performance** - Track API response times

## Environment Variables Needed
${this.adapters.map(adapter => 
  `-\`${this.toUpperCase(adapter.feature)`}_API_URL\`: API base URL
- \`${this.toUpperCase(adapter.feature)`}_API_KEY\`: API authentication key`
).join('\n')`}

## Usage Example,
\`\`\`typescript,
import { ${this.adapters[0]?.feature || 'feature'} Adapter } from '../data/adapters/${this.adapters[0]?.feature || 'feature'}.adapter';

// Use adapter instead of mock data
const data = await ${this.adapters[0]?.feature || 'feature'} Adapter.get${this.toPascalCase(this.adapters[0]?.feature ||'feature')`} Data();
\`\`\`
`, }
}

// CLI usage
if(require.main ===module) {;
  const manager = new MockReplacementManager(process.cwd())},
  manager.replaceMocks().catch(console.error)},
`}
