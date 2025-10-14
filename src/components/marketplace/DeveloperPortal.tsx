/**
 * Developer Portal System Component
 * 
 * SDK, APIs, and developer tools
 * Includes API documentation, SDK downloads, and development resources
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface APIDocumentation {
  id: string;
  name: string;
  description: string;
  version: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  parameters: Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
    example: any;
  }>;
  response: {
    status: number;
    schema: any;
    example: any;
  };
  examples: Array<{
    language: string;
    code: string;
    description: string;
  }>;
  rateLimit: {
    requests: number;
    period: string;
  };
  authentication: string[];
}

interface SDKPackage {
  id: string;
  name: string;
  language: string;
  version: string;
  description: string;
  downloadUrl: string;
  installCommand: string;
  documentation: string;
  githubUrl: string;
  npmUrl?: string;
  pipUrl?: string;
  composerUrl?: string;
  features: string[];
  requirements: string[];
  lastUpdated: string;
  downloads: number;
  stars: number;
  issues: number;
}

interface DeveloperResource {
  id: string;
  title: string;
  description: string;
  type: 'tutorial' | 'guide' | 'example' | 'template' | 'video' | 'blog';
  category: 'getting-started' | 'api' | 'sdk' | 'integration' | 'advanced';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  author: string;
  url: string;
  tags: string[];
  createdAt: string;
  views: number;
  likes: number;
}

interface DeveloperTool {
  id: string;
  name: string;
  description: string;
  type: 'api-explorer' | 'code-generator' | 'testing' | 'debugging' | 'monitoring';
  url: string;
  features: string[];
  isFree: boolean;
  isBeta: boolean;
  lastUpdated: string;
}

interface DeveloperPortalProps {
  onClose: () => void;
}

const DeveloperPortal: React.FC<DeveloperPortalProps> = ({ onClose }) => {
  const [apiDocumentation, setAPIDocumentation] = useState<APIDocumentation[]>([]);
  const [sdkPackages, setSDKPackages] = useState<SDKPackage[]>([]);
  const [developerResources, setDeveloperResources] = useState<DeveloperResource[]>([]);
  const [developerTools, setDeveloperTools] = useState<DeveloperTool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'apis' | 'sdks' | 'resources' | 'tools'>('apis');
  const [selectedAPI, setSelectedAPI] = useState<string | null>(null);

  useEffect(() => {
    loadDeveloperData();
  }, []);

  const loadDeveloperData = async () => {
    setIsLoading(true);
    
    try {
      // Mock API documentation
      const mockAPIDocumentation: APIDocumentation[] = [
        {
          id: 'api-1',
          name: 'Tasks API',
          description: 'Manage tasks and task-related operations',
          version: 'v1',
          endpoint: '/api/v1/tasks',
          method: 'GET',
          parameters: [
            {
              name: 'limit',
              type: 'integer',
              required: false,
              description: 'Number of tasks to return',
              example: 10
            },
            {
              name: 'status',
              type: 'string',
              required: false,
              description: 'Filter by task status',
              example: 'completed'
            },
            {
              name: 'priority',
              type: 'integer',
              required: false,
              description: 'Filter by task priority (1-5)',
              example: 3
            }
          ],
          response: {
            status: 200,
            schema: {
              type: 'object',
              properties: {
                tasks: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      title: { type: 'string' },
                      status: { type: 'string' },
                      priority: { type: 'integer' }
                    }
                  }
                },
                total: { type: 'integer' },
                page: { type: 'integer' }
              }
            },
            example: {
              tasks: [
                {
                  id: 'task-1',
                  title: 'Complete project proposal',
                  status: 'in_progress',
                  priority: 3
                }
              ],
              total: 1,
              page: 1
            }
          },
          examples: [
            {
              language: 'JavaScript',
              code: `const response = await fetch('/api/v1/tasks?limit=10&status=completed', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});
const data = await response.json();`,
              description: 'Fetch completed tasks with limit'
            },
            {
              language: 'Python',
              code: `import requests

response = requests.get(
    'https://api.syncscript.com/v1/tasks',
    params={'limit': 10, 'status': 'completed'},
    headers={'Authorization': 'Bearer YOUR_API_KEY'}
)
data = response.json()`,
              description: 'Fetch completed tasks using Python'
            }
          ],
          rateLimit: {
            requests: 1000,
            period: 'hour'
          },
          authentication: ['Bearer Token', 'API Key']
        },
        {
          id: 'api-2',
          name: 'Analytics API',
          description: 'Access productivity analytics and insights',
          version: 'v1',
          endpoint: '/api/v1/analytics',
          method: 'GET',
          parameters: [
            {
              name: 'metric',
              type: 'string',
              required: true,
              description: 'Analytics metric to retrieve',
              example: 'productivity_score'
            },
            {
              name: 'period',
              type: 'string',
              required: false,
              description: 'Time period for analytics',
              example: '30d'
            }
          ],
          response: {
            status: 200,
            schema: {
              type: 'object',
              properties: {
                metric: { type: 'string' },
                value: { type: 'number' },
                trend: { type: 'string' },
                period: { type: 'string' }
              }
            },
            example: {
              metric: 'productivity_score',
              value: 87.5,
              trend: 'increasing',
              period: '30d'
            }
          },
          examples: [
            {
              language: 'JavaScript',
              code: `const response = await fetch('/api/v1/analytics?metric=productivity_score&period=30d', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});
const analytics = await response.json();`,
              description: 'Get productivity score for last 30 days'
            }
          ],
          rateLimit: {
            requests: 500,
            period: 'hour'
          },
          authentication: ['Bearer Token']
        }
      ];

      // Mock SDK packages
      const mockSDKPackages: SDKPackage[] = [
        {
          id: 'sdk-1',
          name: 'SyncScript JavaScript SDK',
          language: 'JavaScript',
          version: '2.1.0',
          description: 'Official JavaScript SDK for SyncScript API',
          downloadUrl: 'https://cdn.syncscript.com/sdk/js/syncscript-sdk-2.1.0.js',
          installCommand: 'npm install @syncscript/sdk',
          documentation: 'https://docs.syncscript.com/sdk/javascript',
          githubUrl: 'https://github.com/syncscript/sdk-javascript',
          npmUrl: 'https://www.npmjs.com/package/@syncscript/sdk',
          features: ['Task management', 'Analytics', 'Real-time updates', 'TypeScript support'],
          requirements: ['Node.js 14+', 'Modern browser'],
          lastUpdated: new Date(Date.now() - 86400000).toISOString(),
          downloads: 45678,
          stars: 1234,
          issues: 23
        },
        {
          id: 'sdk-2',
          name: 'SyncScript Python SDK',
          language: 'Python',
          version: '1.8.2',
          description: 'Official Python SDK for SyncScript API',
          downloadUrl: 'https://pypi.org/project/syncscript-sdk/',
          installCommand: 'pip install syncscript-sdk',
          documentation: 'https://docs.syncscript.com/sdk/python',
          githubUrl: 'https://github.com/syncscript/sdk-python',
          pipUrl: 'https://pypi.org/project/syncscript-sdk/',
          features: ['Task management', 'Analytics', 'Async support', 'Data analysis'],
          requirements: ['Python 3.7+', 'requests', 'asyncio'],
          lastUpdated: new Date(Date.now() - 172800000).toISOString(),
          downloads: 23456,
          stars: 892,
          issues: 15
        },
        {
          id: 'sdk-3',
          name: 'SyncScript PHP SDK',
          language: 'PHP',
          version: '1.5.3',
          description: 'Official PHP SDK for SyncScript API',
          downloadUrl: 'https://packagist.org/packages/syncscript/sdk',
          installCommand: 'composer require syncscript/sdk',
          documentation: 'https://docs.syncscript.com/sdk/php',
          githubUrl: 'https://github.com/syncscript/sdk-php',
          composerUrl: 'https://packagist.org/packages/syncscript/sdk',
          features: ['Task management', 'Analytics', 'Laravel integration', 'PSR compliance'],
          requirements: ['PHP 7.4+', 'Composer', 'Guzzle HTTP'],
          lastUpdated: new Date(Date.now() - 259200000).toISOString(),
          downloads: 12345,
          stars: 567,
          issues: 8
        }
      ];

      // Mock developer resources
      const mockDeveloperResources: DeveloperResource[] = [
        {
          id: 'resource-1',
          title: 'Getting Started with SyncScript API',
          description: 'Complete guide to start building with SyncScript API',
          type: 'tutorial',
          category: 'getting-started',
          difficulty: 'beginner',
          duration: '15 minutes',
          author: 'SyncScript Team',
          url: 'https://docs.syncscript.com/tutorials/getting-started',
          tags: ['api', 'authentication', 'first-steps'],
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          views: 12345,
          likes: 234
        },
        {
          id: 'resource-2',
          title: 'Building a Task Management App',
          description: 'Step-by-step guide to build a task management application',
          type: 'guide',
          category: 'integration',
          difficulty: 'intermediate',
          duration: '45 minutes',
          author: 'John Developer',
          url: 'https://docs.syncscript.com/guides/task-management-app',
          tags: ['tasks', 'integration', 'web-app'],
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          views: 8923,
          likes: 156
        },
        {
          id: 'resource-3',
          title: 'Advanced Analytics Integration',
          description: 'Deep dive into analytics API and data visualization',
          type: 'example',
          category: 'advanced',
          difficulty: 'advanced',
          duration: '60 minutes',
          author: 'DataViz Solutions',
          url: 'https://docs.syncscript.com/examples/advanced-analytics',
          tags: ['analytics', 'data-visualization', 'advanced'],
          createdAt: new Date(Date.now() - 259200000).toISOString(),
          views: 5678,
          likes: 89
        }
      ];

      // Mock developer tools
      const mockDeveloperTools: DeveloperTool[] = [
        {
          id: 'tool-1',
          name: 'API Explorer',
          description: 'Interactive API explorer to test endpoints',
          type: 'api-explorer',
          url: 'https://explorer.syncscript.com',
          features: ['Interactive testing', 'Request/response examples', 'Authentication testing'],
          isFree: true,
          isBeta: false,
          lastUpdated: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: 'tool-2',
          name: 'Code Generator',
          description: 'Generate code snippets for any API endpoint',
          type: 'code-generator',
          url: 'https://generator.syncscript.com',
          features: ['Multi-language support', 'Custom templates', 'Export options'],
          isFree: true,
          isBeta: true,
          lastUpdated: new Date(Date.now() - 172800000).toISOString()
        },
        {
          id: 'tool-3',
          name: 'API Testing Suite',
          description: 'Comprehensive testing tools for API development',
          type: 'testing',
          url: 'https://testing.syncscript.com',
          features: ['Unit testing', 'Integration testing', 'Performance testing'],
          isFree: false,
          isBeta: false,
          lastUpdated: new Date(Date.now() - 259200000).toISOString()
        }
      ];

      setAPIDocumentation(mockAPIDocumentation);
      setSDKPackages(mockSDKPackages);
      setDeveloperResources(mockDeveloperResources);
      setDeveloperTools(mockDeveloperTools);
    } catch (error) {
      console.error('Failed to load developer data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getLanguageIcon = (language: string) => {
    switch (language) {
      case 'JavaScript': return '🟨';
      case 'Python': return '🐍';
      case 'PHP': return '🐘';
      case 'Java': return '☕';
      case 'C#': return '🔷';
      case 'Go': return '🐹';
      case 'Ruby': return '💎';
      default: return '📄';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'tutorial': return '📚';
      case 'guide': return '📖';
      case 'example': return '💡';
      case 'template': return '📋';
      case 'video': return '🎥';
      case 'blog': return '📝';
      case 'api-explorer': return '🔍';
      case 'code-generator': return '⚙️';
      case 'testing': return '🧪';
      case 'debugging': return '🐛';
      case 'monitoring': return '📊';
      default: return '📄';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'text-green-600 bg-green-100';
      case 'POST': return 'text-blue-600 bg-blue-100';
      case 'PUT': return 'text-yellow-600 bg-yellow-100';
      case 'DELETE': return 'text-red-600 bg-red-100';
      case 'PATCH': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading developer portal...</span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Developer Portal</h2>
              <p className="text-green-100 mt-1">SDK, APIs, and developer tools</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-green-200 text-sm">APIs:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {apiDocumentation.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-200 text-sm">SDKs:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {sdkPackages.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-200 text-sm">Resources:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {developerResources.length}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'apis', name: 'API Documentation', icon: '📚' },
              { id: 'sdks', name: 'SDK Packages', icon: '📦' },
              { id: 'resources', name: 'Resources', icon: '📖' },
              { id: 'tools', name: 'Developer Tools', icon: '🛠️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all ${
                  selectedTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {selectedTab === 'apis' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">API Documentation</h3>
              
              <div className="space-y-4">
                {apiDocumentation.map((api) => (
                  <motion.div
                    key={api.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{api.name}</h4>
                        <p className="text-sm text-gray-600">{api.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getMethodColor(api.method)}`}>
                          {api.method}
                        </span>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          {api.version}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">Endpoint:</div>
                      <div className="text-sm text-gray-600 font-mono bg-gray-100 p-2 rounded">
                        {api.endpoint}
                      </div>
                      
                      <div className="text-sm font-medium text-gray-700">Parameters:</div>
                      <div className="space-y-1">
                        {api.parameters.map((param, index) => (
                          <div key={index} className="text-sm text-gray-600">
                            <span className="font-medium">{param.name}</span>
                            <span className="text-gray-500"> ({param.type})</span>
                            {param.required && <span className="text-red-600 ml-1">*</span>}
                            <span className="text-gray-500"> - {param.description}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="text-sm font-medium text-gray-700">Rate Limit:</div>
                      <div className="text-sm text-gray-600">
                        {api.rateLimit.requests} requests per {api.rateLimit.period}
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedAPI(selectedAPI === api.id ? null : api.id)}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all"
                      >
                        {selectedAPI === api.id ? 'Hide Examples' : 'View Examples'}
                      </button>
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all">
                        Test API
                      </button>
                    </div>
                    
                    {selectedAPI === api.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 space-y-4"
                      >
                        <div className="text-sm font-medium text-gray-700">Code Examples:</div>
                        {api.examples.map((example, index) => (
                          <div key={index} className="space-y-2">
                            <div className="text-sm font-medium text-gray-700">{example.language}</div>
                            <div className="text-sm text-gray-600 bg-gray-100 p-3 rounded font-mono">
                              {example.code}
                            </div>
                            <div className="text-sm text-gray-600">{example.description}</div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'sdks' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">SDK Packages</h3>
              
              <div className="space-y-4">
                {sdkPackages.map((sdk) => (
                  <motion.div
                    key={sdk.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-4 mb-3">
                      <span className="text-3xl">{getLanguageIcon(sdk.language)}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{sdk.name}</h4>
                        <p className="text-sm text-gray-600">{sdk.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          v{sdk.version}
                        </span>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                          {sdk.downloads.toLocaleString()} downloads
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">Installation:</div>
                      <div className="text-sm text-gray-600 font-mono bg-gray-100 p-2 rounded">
                        {sdk.installCommand}
                      </div>
                      
                      <div className="text-sm font-medium text-gray-700">Features:</div>
                      <div className="flex flex-wrap gap-1">
                        {sdk.features.map((feature, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {feature}
                          </span>
                        ))}
                      </div>
                      
                      <div className="text-sm font-medium text-gray-700">Requirements:</div>
                      <div className="flex flex-wrap gap-1">
                        {sdk.requirements.map((req, index) => (
                          <span key={index} className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                        Download
                      </button>
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all">
                        Documentation
                      </button>
                      <button className="px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200 transition-all">
                        GitHub
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'resources' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Developer Resources</h3>
              
              <div className="space-y-4">
                {developerResources.map((resource) => (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-4 mb-3">
                      <span className="text-3xl">{getTypeIcon(resource.type)}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{resource.title}</h4>
                        <p className="text-sm text-gray-600">{resource.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}>
                          {resource.difficulty.toUpperCase()}
                        </span>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          {resource.duration}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">Author:</div>
                      <div className="text-sm text-gray-600">{resource.author}</div>
                      
                      <div className="text-sm font-medium text-gray-700">Tags:</div>
                      <div className="flex flex-wrap gap-1">
                        {resource.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Views:</span>
                          <span className="ml-2 text-gray-900">{resource.views.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Likes:</span>
                          <span className="ml-2 text-gray-900">{resource.likes}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                        Read More
                      </button>
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all">
                        Bookmark
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'tools' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Developer Tools</h3>
              
              <div className="space-y-4">
                {developerTools.map((tool) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-4 mb-3">
                      <span className="text-3xl">{getTypeIcon(tool.type)}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{tool.name}</h4>
                        <p className="text-sm text-gray-600">{tool.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          tool.isFree ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
                        }`}>
                          {tool.isFree ? 'FREE' : 'PAID'}
                        </span>
                        {tool.isBeta && (
                          <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                            BETA
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">Features:</div>
                      <div className="flex flex-wrap gap-1">
                        {tool.features.map((feature, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {feature}
                          </span>
                        ))}
                      </div>
                      
                      <div className="text-sm font-medium text-gray-700">URL:</div>
                      <div className="text-sm text-gray-600 font-mono bg-gray-100 p-2 rounded">
                        {tool.url}
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                        Open Tool
                      </button>
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all">
                        Documentation
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Developer Portal • {apiDocumentation.length} APIs • {sdkPackages.length} SDKs • {developerResources.length} resources
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                console.log('Exporting developer portal data...');
              }}
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 transition-all"
            >
              Export Data
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DeveloperPortal;
