/**
 * API v2 Release Component
 * 
 * Provides comprehensive API v2 documentation and developer tools
 * Includes endpoints, authentication, rate limiting, and SDKs
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ApiEndpoint {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
  category: 'tasks' | 'projects' | 'users' | 'analytics' | 'integrations' | 'webhooks';
  authentication: 'bearer' | 'api-key' | 'oauth' | 'none';
  rateLimit: string;
  parameters: ApiParameter[];
  responses: ApiResponse[];
  examples: ApiExample[];
}

interface ApiParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
  example: any;
}

interface ApiResponse {
  status: number;
  description: string;
  schema: any;
}

interface ApiExample {
  language: 'javascript' | 'python' | 'curl' | 'php' | 'ruby';
  code: string;
  description: string;
}

interface ApiV2ReleaseProps {
  userId: string;
  onClose: () => void;
}

const API_ENDPOINTS: ApiEndpoint[] = [
  {
    id: 'get-tasks',
    method: 'GET',
    path: '/api/v2/tasks',
    description: 'Retrieve all tasks for the authenticated user',
    category: 'tasks',
    authentication: 'bearer',
    rateLimit: '100 requests/minute',
    parameters: [
      { name: 'status', type: 'string', required: false, description: 'Filter by task status', example: 'completed' },
      { name: 'priority', type: 'integer', required: false, description: 'Filter by priority level (1-5)', example: 3 },
      { name: 'limit', type: 'integer', required: false, description: 'Number of tasks to return', example: 50 }
    ],
    responses: [
      { status: 200, description: 'Successfully retrieved tasks', schema: { tasks: [], total: 0 } },
      { status: 401, description: 'Unauthorized', schema: { error: 'Invalid token' } }
    ],
    examples: [
      {
        language: 'javascript',
        code: `const response = await fetch('/api/v2/tasks', {
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
  }
});
const data = await response.json();`,
        description: 'Fetch tasks using JavaScript'
      },
      {
        language: 'curl',
        code: `curl -X GET "https://api.syncscript.app/v2/tasks" \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json"`,
        description: 'Fetch tasks using cURL'
      }
    ]
  },
  {
    id: 'create-task',
    method: 'POST',
    path: '/api/v2/tasks',
    description: 'Create a new task',
    category: 'tasks',
    authentication: 'bearer',
    rateLimit: '60 requests/minute',
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Task title', example: 'Complete project proposal' },
      { name: 'description', type: 'string', required: false, description: 'Task description', example: 'Draft and review the Q1 project proposal' },
      { name: 'priority', type: 'integer', required: true, description: 'Priority level (1-5)', example: 4 },
      { name: 'due_date', type: 'string', required: false, description: 'Due date (ISO 8601)', example: '2024-03-15T10:00:00Z' }
    ],
    responses: [
      { status: 201, description: 'Task created successfully', schema: { task: {}, id: 'task_123' } },
      { status: 400, description: 'Invalid input', schema: { error: 'Validation failed' } }
    ],
    examples: [
      {
        language: 'javascript',
        code: `const response = await fetch('/api/v2/tasks', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Complete project proposal',
    priority: 4,
    due_date: '2024-03-15T10:00:00Z'
  })
});`,
        description: 'Create a new task'
      }
    ]
  },
  {
    id: 'get-analytics',
    method: 'GET',
    path: '/api/v2/analytics/productivity',
    description: 'Get productivity analytics and insights',
    category: 'analytics',
    authentication: 'bearer',
    rateLimit: '30 requests/minute',
    parameters: [
      { name: 'period', type: 'string', required: false, description: 'Time period for analytics', example: 'week' },
      { name: 'metrics', type: 'array', required: false, description: 'Specific metrics to include', example: ['tasks_completed', 'energy_levels'] }
    ],
    responses: [
      { status: 200, description: 'Analytics data retrieved', schema: { analytics: {}, insights: [] } }
    ],
    examples: [
      {
        language: 'python',
        code: `import requests

response = requests.get(
    'https://api.syncscript.app/v2/analytics/productivity',
    headers={'Authorization': 'Bearer YOUR_TOKEN'},
    params={'period': 'month', 'metrics': ['tasks_completed', 'energy_levels']}
)
data = response.json()`,
        description: 'Fetch productivity analytics using Python'
      }
    ]
  },
  {
    id: 'webhook-create',
    method: 'POST',
    path: '/api/v2/webhooks',
    description: 'Create a new webhook endpoint',
    category: 'webhooks',
    authentication: 'bearer',
    rateLimit: '20 requests/minute',
    parameters: [
      { name: 'url', type: 'string', required: true, description: 'Webhook URL', example: 'https://your-app.com/webhooks/syncscript' },
      { name: 'events', type: 'array', required: true, description: 'Events to subscribe to', example: ['task.created', 'task.completed'] },
      { name: 'secret', type: 'string', required: false, description: 'Webhook secret for verification', example: 'your_webhook_secret' }
    ],
    responses: [
      { status: 201, description: 'Webhook created successfully', schema: { webhook: { id: 'webhook_123' } } }
    ],
    examples: [
      {
        language: 'javascript',
        code: `const response = await fetch('/api/v2/webhooks', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    url: 'https://your-app.com/webhooks/syncscript',
    events: ['task.created', 'task.completed'],
    secret: 'your_webhook_secret'
  })
});`,
        description: 'Create a webhook subscription'
      }
    ]
  }
];

const API_FEATURES = [
  {
    id: 'authentication',
    name: 'Authentication',
    description: 'Multiple authentication methods including OAuth 2.0, API keys, and bearer tokens',
    icon: '🔐',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'rate-limiting',
    name: 'Rate Limiting',
    description: 'Intelligent rate limiting with tiered limits based on plan and usage patterns',
    icon: '⚡',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'webhooks',
    name: 'Webhooks',
    description: 'Real-time event notifications via secure webhook endpoints',
    icon: '🔗',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'sdks',
    name: 'SDKs',
    description: 'Official SDKs for JavaScript, Python, PHP, Ruby, and more',
    icon: '📚',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'documentation',
    name: 'Documentation',
    description: 'Comprehensive API documentation with interactive examples',
    icon: '📖',
    color: 'from-indigo-500 to-blue-500'
  },
  {
    id: 'sandbox',
    name: 'Sandbox',
    description: 'Test environment for development and integration testing',
    icon: '🧪',
    color: 'from-yellow-500 to-orange-500'
  }
];

const ApiV2Release: React.FC<ApiV2ReleaseProps> = ({ userId, onClose }) => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedExample, setSelectedExample] = useState<ApiExample | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [isGeneratingKey, setIsGeneratingKey] = useState(false);

  const filteredEndpoints = API_ENDPOINTS.filter(endpoint => 
    selectedCategory === 'all' || endpoint.category === selectedCategory
  );

  const categories = [
    { id: 'all', name: 'All Endpoints', count: API_ENDPOINTS.length },
    { id: 'tasks', name: 'Tasks', count: API_ENDPOINTS.filter(e => e.category === 'tasks').length },
    { id: 'projects', name: 'Projects', count: API_ENDPOINTS.filter(e => e.category === 'projects').length },
    { id: 'users', name: 'Users', count: API_ENDPOINTS.filter(e => e.category === 'users').length },
    { id: 'analytics', name: 'Analytics', count: API_ENDPOINTS.filter(e => e.category === 'analytics').length },
    { id: 'webhooks', name: 'Webhooks', count: API_ENDPOINTS.filter(e => e.category === 'webhooks').length }
  ];

  const handleGenerateApiKey = async () => {
    setIsGeneratingKey(true);
    
    try {
      // Simulate API key generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      setApiKey(`ss_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`);
    } catch (error) {
      console.error('Failed to generate API key:', error);
    } finally {
      setIsGeneratingKey(false);
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-green-100 text-green-800';
      case 'POST': return 'bg-blue-100 text-blue-800';
      case 'PUT': return 'bg-yellow-100 text-yellow-800';
      case 'DELETE': return 'bg-red-100 text-red-800';
      case 'PATCH': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">SyncScript API v2</h2>
              <p className="text-indigo-100 mt-1">Comprehensive developer API and tools</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-indigo-200 text-sm">Endpoints:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {API_ENDPOINTS.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-indigo-200 text-sm">Version:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    v2.0.0
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

        {/* Content */}
        <div className="flex h-[60vh]">
          {/* Sidebar */}
          <div className="w-1/3 border-r border-gray-200 p-6 overflow-y-auto">
            {/* API Features */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">API Features</h3>
              <div className="space-y-3">
                {API_FEATURES.map((feature) => (
                  <div key={feature.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center text-sm`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">{feature.name}</h4>
                      <p className="text-xs text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* API Key Management */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">API Key</h3>
              <div className="space-y-3">
                {!apiKey ? (
                  <button
                    onClick={handleGenerateApiKey}
                    disabled={isGeneratingKey}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {isGeneratingKey ? 'Generating...' : 'Generate API Key'}
                  </button>
                ) : (
                  <div className="space-y-2">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="text-xs text-gray-600 mb-1">Your API Key:</div>
                      <div className="font-mono text-sm text-gray-900 break-all">{apiKey}</div>
                    </div>
                    <button
                      onClick={() => navigator.clipboard.writeText(apiKey)}
                      className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-all text-sm"
                    >
                      Copy to Clipboard
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Endpoints</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      selectedCategory === category.id
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {selectedEndpoint ? (
              /* Endpoint Detail View */
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`px-2 py-1 rounded text-sm font-medium ${getMethodColor(selectedEndpoint.method)}`}>
                        {selectedEndpoint.method}
                      </span>
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                        {selectedEndpoint.path}
                      </code>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">{selectedEndpoint.description}</h2>
                  </div>
                  <button
                    onClick={() => setSelectedEndpoint(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Parameters */}
                {selectedEndpoint.parameters.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Parameters</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="space-y-3">
                        {selectedEndpoint.parameters.map((param, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <code className="bg-white px-2 py-1 rounded text-sm font-mono">
                                  {param.name}
                                </code>
                                <span className="text-sm text-gray-600">{param.type}</span>
                                {param.required && (
                                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                                    Required
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mb-1">{param.description}</p>
                              <div className="text-xs text-gray-500">
                                Example: <code className="bg-white px-1 py-0.5 rounded">{JSON.stringify(param.example)}</code>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Examples */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Code Examples</h3>
                  <div className="space-y-4">
                    {selectedEndpoint.examples.map((example, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg">
                        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900">{example.language}</span>
                            <button
                              onClick={() => navigator.clipboard.writeText(example.code)}
                              className="text-gray-400 hover:text-gray-600 text-sm"
                            >
                              Copy
                            </button>
                          </div>
                          <p className="text-sm text-gray-600">{example.description}</p>
                        </div>
                        <pre className="p-4 bg-gray-900 text-gray-100 text-sm overflow-x-auto">
                          <code>{example.code}</code>
                        </pre>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Endpoints List View */
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {selectedCategory === 'all' ? 'All Endpoints' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Endpoints`}
                </h3>
                <div className="space-y-3">
                  {filteredEndpoints.map((endpoint) => (
                    <motion.div
                      key={endpoint.id}
                      whileHover={{ scale: 1.01 }}
                      onClick={() => setSelectedEndpoint(endpoint)}
                      className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`px-2 py-1 rounded text-sm font-medium ${getMethodColor(endpoint.method)}`}>
                          {endpoint.method}
                        </span>
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                          {endpoint.path}
                        </code>
                        <span className="text-xs text-gray-500">{endpoint.rateLimit}</span>
                      </div>
                      <p className="text-gray-700">{endpoint.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            API v2.0.0 • {filteredEndpoints.length} endpoint{filteredEndpoints.length !== 1 ? 's' : ''}
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
                // TODO: Open full API documentation
                window.open('https://docs.syncscript.app/api/v2', '_blank');
              }}
              className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
            >
              Full Documentation
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ApiV2Release;
