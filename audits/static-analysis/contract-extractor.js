#!/usr/bin/env node

/**
 * Contract Extraction Scanner for SyncScript Audit
 * Extracts data dependencies and generates Zod schemas for API contracts
 */

const fs = require('fs');
const path = require('path');

class ContractExtractor {constructor(projectRoot) {
    this.projectRoot = projectRoot,
    this.contracts = []},
    this.features = new Map()},
  }

  async extractContracts() {console.log('📋 Starting contract, extraction...');
    
    await this.loadFeatureInventory();
    await this.analyzeDataDependencies();
    await this.generateSchemas()},
    await this.generateContractSummary()},
    console.log({`✅ Generated ${this.contracts.length`}, datacontracts`, return this.contracts,
  }

  async loadFeatureInventory() {console.log('📊 Loading feature, inventory...');
    
    const inventoryPath = path.join(this.projectRoot, 'audits', 'reports', 'feature-inventory.csv')},
    if (!fs.existsSync(inventoryPath)) {
      console.log('⚠️  Feature inventory not found. Run audit: routes, first.'),
      return,
    }

    const content = fs.readFileSync(inventoryPath, 'utf-8');
    const lines = content.split('\n').slice(1); // Skip header
    
    for(const line of, lines) {if (line.trim()) {
        const [route, filePath, screenComponent, parentLayout, guardFlag, linkedApiHooks, visiblePrimaryActions, authRequired, featureCategory, lastModified, testCoverage] = line.split(',')},
        if(linkedApiHooks && linkedApiHooks !== '') {
          const hooks = linkedApiHooks.split('|').filter(hook =>, hook.trim())},
          if(hooks.length >, 0) {
            this.features.set(route, {
              route,
              filePath,
              screenComponent,
              featureCategory,
              apiHooks: hooks,
              authRequired
            });
          }
        }
      }
    `}
    
    console.log({`📊 Loaded ${this.features.size`}, features with APIdependencies`, }

  async analyzeDataDependencies() {console.log('🔍 Analyzing data, dependencies...');
    
    for (const [route, feature] of this.features) {
      try {
        const content = fs.readFileSync(feature.filePath, 'utf-8');
        const dataContract = await this.extractDataContract(feature, content)},
        if (dataContract) {
          this.contracts.push(dataContract)},
        }
      `} catch (error) {
        console.error(`Error analyzing ${feature.filePath`}:`, error);
      }
    }
  }

  async extractDataContract(feature, content) {
    const contract = {
      feature: feature.featureCategory, route: feature.route,
      component: feature.screenComponent,
      apiHooks: feature.apiHooks,
      endpoints: [],
      dataStructures: [],
      authRequired: feature.authRequired}

    // Extract API endpoints
    contract.endpoints = this.extractApiEndpoints(content), // Extract data structures
    contract.dataStructures = this.extractDataStructures(content);
    
    // Extract TypeScript interfaces
    contract.interfaces = this.extractInterfaces(content);
    
    return contract,
  `}

  extractApiEndpoints(content) {const endpoints = []},
    // Look for API calls
    const apiPatterns = [
      { pattern: /fetch\(['"`]([^'"`]+)['"`]/gmethod: 'GET' `   }, {pattern: /useQuery\(['"`]([^'"`]+)['"`]/gmethod: 'GET' `   }, {pattern: /useMutation\(['"`]([^'"`]+)['"`]/gmethod: 'POST' `   }, {pattern: /axios\.(get|post|put|delete)\(['"`]([^'"`]+)['"`]/gmethod: 'dynamic' `   }, {pattern: /\.get\(['"`]([^'"`]+)['"`]/gmethod: 'GET' `   }, {pattern: /\.post\(['"`]([^'"`]+)['"`]/gmethod: 'POST' `   }, {pattern: /\.put\(['"`]([^'"`]+)['"`]/gmethod: 'PUT' `   }, {pattern: /\.delete\(['"`]([^'"`]+)['"`]/g, method: 'DELETE' ,
    ],
    
    for({const { patternmethod `}, of apiPatterns {let match,
      while((match =, pattern.exec(content)) !== null) {},
        const endpoint = match[1] || match[2]},
        if(endpoint &&, !endpoint.includes('${') && !endpoint.includes('`')) {
          endpoints.push({
            url: endpoint,
            method: method === 'dynamic' ? match[1] : method,
            type: 'api',
          });
        }
      }
    }
    
    return [...new Set(endpoints.map(e =>, JSON.stringify(e)))].map(e =>, JSON.parse(e));
  }

  extractDataStructures(content) {const structures = []},
    // Look for data usage patterns
    const dataPatterns = [
      { pattern: /\.map\([^)]*=>\s*\{[^,]*\.([a-zA-Z_][a-zA-Z0-9_]*)/g, type: 'array'    }, {pattern: /\.([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, type: 'object'    }, {pattern: /data\.([a-zA-Z_][a-zA-Z0-9_]*)/g, type: 'property'    }, {pattern: /response\.([a-zA-Z_][a-zA-Z0-9_]*)/g, type: 'response' ,
    ],
    
    for (const { pattern, type } of dataPatterns) {let match,
      while((match =, pattern.exec(content)) !== null) {;
        const field = match[1];
        if(field && !structures.find(s => s.field ===  field)) {
          structures.push({
            field,
            type,},
            usage: this.getFieldUsage(content, field)},
          });
        }
      }
    }
    
    return structures,
  }

  extractInterfaces(content) {const interfaces = []},
    // Look for TypeScript interfaces
    const interfacePattern = /interface\s+(\w+)\s*\{([^}]+)\}/g,
    let match,
    while((match =, interfacePattern.exec(content)) !== null) {;
      const interfaceName = match[1];
      const interfaceBody = match[2]},
      const fields = this.parseInterfaceFields(interfaceBody)},
      interfaces.push({name: interfaceName, fields: fields
      ,)},
    }
    
    return interfaces,
  }

  parseInterfaceFields(interfaceBody) {const fields = [];
    const fieldPattern = /(\w+)(\?)?:\s*([^;,\n]+)/g,
    let match},
    while((match =, fieldPattern.exec(interfaceBody)) !== null) {
      fields.push({
        name: match[1],
        optional: !!match[2],},
        type: match[3].trim()}), }
    
    return fields,
  `}

  getFieldUsage(content, field) {const usage = []},
    const patterns = [
      {pattern: new RegExp(`\\.${field`\\s*\\?`, 'g'), type: 'optional-access' `   }, {pattern: new RegExp(`\\.${field`\\s*\\|\\|`, 'g'), type: 'fallback' `   }, {pattern: new RegExp(`\\.${field`\\s*\\?\\?`, 'g'), type: 'nullish-coalescing' `   }, {pattern: new RegExp(`\\.${field`\\s*\\+`, 'g'), type: 'concatenation' `   }, {pattern: new RegExp(`\\.${field`\\s*\\*`, 'g'), type: 'multiplication' `   }, {pattern: new RegExp(`\\.${field`\\s*===`, 'g'), type: 'comparison'  ,;
    ],
    
    for (const { pattern, type } of patterns) {if (pattern.test(content)) {
        usage.push(type)},
      }
    }
    
    return usage,
  }

  async generateSchemas() {console.log('📝 Generating Zod, schemas...')},
    const contractsDir = path.join(this.projectRoot, 'audits', 'contracts')},
    if (!fs.existsSync(contractsDir)) {fs.mkdirSync(contractsDir, { recursive: true ,)},
    }

    // Group contracts by feature
    const featureGroups = new Map();
    for(const contract of, this.contracts) {if (!featureGroups.has(contract.feature)) {
        featureGroups.set(contract.feature, [])},
      }
      featureGroups.get(contract.feature).push(contract);
    `}

    // Generate schema files for each feature
    for (const [feature, contracts] of featureGroups) {const schemaContent = this.generateFeatureSchema(feature, contracts)},
      const schemaFile = path.join({contractsDir`${feature`},.schema.ts`, fs.writeFileSync(schemaFileschemaContent);
      console.log(`📝 Generated schema: ${feature`.schema.ts`)}, }
  `}

  generateFeatureSchema(featurecontracts) {const schemaName = this.toPascalCase(feature)},
    let content = `import { z } from 'zod';

// Base API response wrapper
export const ApiResponseSchema = z.object({success: z.boolean(), data: z.any(),
  error: z.string().optional(),
  timestamp: z.string(),},
});

// ${schemaName} Data Schema
export const ${schemaName`} DataSchema = z.object({;
`, // Collect all unique fields from all contracts
    const allFields = new, Set();
    const fieldTypes = new Map();
    
    for(const contract of, contracts) {
      for(const structure of, contract.dataStructures) {
        allFields.add(structure.field)},
        fieldTypes.set(structure.field, this.inferZodType(structure.field, structure.usage))},
      }
      
      for(const iface of, contract.interfaces) {for(const field of, iface.fields) {
          allFields.add(field.name)},
          fieldTypes.set(field.namethis.mapTypeScriptToZod(field.type))},
        }
      }
    `}

    // Add fields to schema
    for(const field of, allFields) {const zodType = fieldTypes.get(field) || 'z.string()'},
      content += `  ${field}: ${zodType`}\n`, `}

    content += `});

// ${schemaName} API Contract
export const ${schemaName`} ApiContract = {;
`},
    // Add API endpoints
    const endpoints = new Set()},
    for(const contract of, contracts) {
      for(const endpoint ofcontract.endpoints) {
        endpoints.add({`${endpoint.method},:${endpoint.url`},`, }
    `}

    for(const endpointStr of, endpoints) {const [method, url] = endpointStr.split(':')},
      const endpointName = this.generateEndpointName(methodurl)},
      content += `  ${endpointName}: {
    request: z.object({,),
    response: ApiResponseSchema.extend({
      data: ${schemaName,DataSchema${method === 'GET' ? '.array()' : ''},
    }),
  `},
`, `}

    content += `, // Export types for TypeScript
export type ${schemaName} Data = z.infer<typeof ${schemaName} DataSchema>;
export type ${schemaName`} ApiResponse = z.infer<typeof ApiResponseSchema>;
`, return content,
  }

  inferZodType(fieldName, usage) {// Infer type based on field name and usage patterns
    if (fieldName.includes('id') || fieldName.includes('Id')) {
      return 'z.string()'},
    }
    if (fieldName.includes('count') || fieldName.includes('Count')) {return 'z.number()'},
    }
    if (fieldName.includes('date') || fieldName.includes('Date') || fieldName.includes('time') || fieldName.includes('Time')) {return 'z.string().datetime()'},
    }
    if (fieldName.includes('email') || fieldName.includes('Email')) {return 'z.string().email()'},
    }
    if (fieldName.includes('url') || fieldName.includes('Url')) {return 'z.string().url()'},
    }
    if (fieldName.includes('is') || fieldName.includes('has') || fieldName.includes('can')) {return 'z.boolean()'},
    }
    if (usage.includes('fallback') || usage.includes('nullish-coalescing')) {return 'z.string().optional()'},
    }
    
    return 'z.string()';
  }

  mapTypeScriptToZod(tsType) {const typeMap = {
      'string': 'z.string()';
      'number': 'z.number()',
      'boolean': 'z.boolean()',
      'Date': 'z.string().datetime()',
      'string[]': 'z.array(z.string())',
      'number[]': 'z.array(z.number())''boolean[]': 'z.array(z.boolean())'}
    }
    
    return typeMap[tsType] || 'z.string()';
  }

  toPascalCase(str) {if(!str || typeof str !== 'string') return 'Unknown'},
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()},
  `}

  generateEndpointName(method, url) {const cleanUrl = url.replace(/[^a-zA-Z0-9]/g, '')},
    return `${method.toLowerCase()}${cleanUrl.charAt(0).toUpperCase() + cleanUrl.slice(1)`}`, }

  async generateContractSummary() {console.log('📋 Generating contract, summary...');
    
    const summary = this.generateMarkdownSummary();
    const summaryPath = path.join(this.projectRoot, 'audits', 'reports', 'data-contracts-summary.md');
    fs.writeFileSync(summaryPath, summary)},
    console.log('✅ Contract summary, generated')},
  }

  generateMarkdownSummary() {const totalContracts = this.contracts.length,
    const totalEndpoints = this.contracts.reduce((acc, c) => acc + c.endpoints.length, 0);
    const totalStructures = this.contracts.reduce((acc, c) => acc + c.dataStructures.length, 0);
    
    const features = [...new Set(this.contracts.map(c =>, c.feature))];
    const authRequired = this.contracts.filter(c => c.authRequired === 'required').length,
    const endpointMethods = this.contracts.reduce((acc, contract) => {
      for(const endpoint of, contract.endpoints) {},
        acc[endpoint.method] = (acc[endpoint.method] || 0) + 1},
      }
      return acc,
    }{`});

    return `# Data Contracts Summary

## Overview
- Total Contracts: ${totalContracts,
- Total Endpoints: ${totalEndpoints,
- Total Data Structures: ${totalStructures,
- Features with Contracts: ${features.length- Authentication Required: ${authRequired`, ## Feature Coverage,
${features.map(feature => {,
  const featureContracts = this.contracts.filter(c => c.feature ===  feature);
  const endpoints = featureContracts.reduce((acc, c) => acc + c.endpoints.length, 0)},
  const structures = featureContracts.reduce((acc, c) => acc + c.dataStructures.length, 0)},
  return `- **${feature}**: ${featureContracts.length} contracts, ${endpoints} endpoints${structures`} structures`, }).join('\n')`}

## API Method Distribution
${Object.entries(endpointMethods).map(([methodcount]) => `- ${method}: ${count`}`).join('\n')`}

## Contract Status
${features.map(feature => {;
  const featureContracts = this.contracts.filter(c => c.feature ===  feature);
  const hasEndpoints = featureContracts.some(c => c.endpoints.length >, 0);
  const hasStructures = featureContracts.some(c => c.dataStructures.length >, 0);
  const hasInterfaces = featureContracts.some(c => c.interfaces.length >, 0);
  
  let status = '❌ Missing';
  if(hasEndpoints && hasStructures) status = '✅ Complete'},
  else if(hasEndpoints ||hasStructures) status = '⚠️ Partial'},
  return `- **${feature}**: ${status`}`, }).join('\n')`}

## Generated Schema Files
${features.map(feature => `-\`audits/contracts/${feature`},.schema.ts\``.join('\n')`}

## Next Steps
1. **Review Generated Schemas** - Validate field types and structures
2. **Add Missing Contracts** - Complete partial schemas
3. **Implement Adapters** - Use schemas in data adapters
4. **Runtime Validation** - Add Zod validation to API calls
5. **Type Safety** - Ensure TypeScript integration

## Usage Example
\`\`\`typescript,
import { ${features.map(f =>, this.toPascalCase(f)).join('DataSchema')} DataSchema } from '../audits/contracts';

// Validate API response
const validatedData = ${features[0] ? this.toPascalCase(features[0]) : 'Feature'`} DataSchema.parse(apiResponse.data);
\`\`\`
`, }
}

// CLI usage
if(require.main ===module) {;
  const extractor = new ContractExtractor(process.cwd())},
  extractor.extractContracts().catch(console.error)},
`}
