/**
 * SyncScript SDK Component
 * 
 * Custom app development tools and SDK management
 * Includes SDK documentation, code examples, and development tools
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SDKPackage {
  id: string;
  name: string;
  description: string;
  version: string;
  language: 'javascript' | 'python' | 'java' | 'csharp' | 'go' | 'php';
  icon: string;
  downloads: number;
  lastUpdated: string;
  features: string[];
  documentation: string;
  examples: CodeExample[];
  status: 'stable' | 'beta' | 'alpha' | 'deprecated';
}

interface CodeExample {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
  category: 'authentication' | 'tasks' | 'projects' | 'analytics' | 'webhooks';
}

interface SDKProject {
  id: string;
  name: string;
  description: string;
  language: string;
  status: 'active' | 'paused' | 'completed' | 'error';
  createdAt: string;
  lastRun?: string;
  executions: number;
  code: string;
}

interface SyncScriptSDKProps {
  onClose: () => void;
}

const SyncScriptSDK: React.FC<SyncScriptSDKProps> = ({ onClose }) => {
  const [sdkPackages, setSdkPackages] = useState<SDKPackage[]>([]);
  const [sdkProjects, setSdkProjects] = useState<SDKProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'packages' | 'examples' | 'projects' | 'docs'>('packages');
  const [selectedPackage, setSelectedPackage] = useState<SDKPackage | null>(null);
  const [selectedExample, setSelectedExample] = useState<CodeExample | null>(null);

  useEffect(() => {
    loadSDKData();
  }, []);

  const loadSDKData = async () => {
    setIsLoading(true);
    
    try {
      // Mock SDK packages
      const mockPackages: SDKPackage[] = [
        {
          id: 'javascript-sdk',
          name: 'SyncScript JavaScript SDK',
          description: 'Official JavaScript SDK for SyncScript API',
          version: '2.1.0',
          language: 'javascript',
          icon: '🟨',
          downloads: 45620,
          lastUpdated: '2024-01-15',
          features: ['TypeScript support', 'Promise-based API', 'Automatic retries', 'Webhook handling'],
          documentation: 'https://docs.syncscript.com/javascript-sdk',
          examples: [
            {
              id: 'auth-js',
              title: 'Authentication',
              description: 'Authenticate with SyncScript API',
              language: 'javascript',
              code: `import { SyncScriptClient } from '@syncscript/sdk';

const client = new SyncScriptClient({
  apiKey: 'your-api-key',
  baseUrl: 'https://api.syncscript.com'
});

// Authenticate user
const user = await client.auth.login({
  email: 'user@example.com',
  password: 'password'
});`,
              category: 'authentication'
            },
            {
              id: 'tasks-js',
              title: 'Create Task',
              description: 'Create a new task',
              language: 'javascript',
              code: `// Create a new task
const task = await client.tasks.create({
  title: 'Complete project documentation',
  description: 'Write comprehensive API documentation',
  priority: 3,
  energyRequirement: 7,
  estimatedDuration: 120,
  category: 'development'
});

console.log('Task created:', task.id);`,
              category: 'tasks'
            }
          ],
          status: 'stable'
        },
        {
          id: 'python-sdk',
          name: 'SyncScript Python SDK',
          description: 'Official Python SDK for SyncScript API',
          version: '1.8.2',
          language: 'python',
          icon: '🐍',
          downloads: 23450,
          lastUpdated: '2024-01-12',
          features: ['Async support', 'Data classes', 'CLI tools', 'Jupyter integration'],
          documentation: 'https://docs.syncscript.com/python-sdk',
          examples: [
            {
              id: 'auth-py',
              title: 'Authentication',
              description: 'Authenticate with SyncScript API',
              language: 'python',
              code: `from syncscript import SyncScriptClient

client = SyncScriptClient(
    api_key='your-api-key',
    base_url='https://api.syncscript.com'
)

# Authenticate user
user = client.auth.login(
    email='user@example.com',
    password='password'
)`,
              category: 'authentication'
            }
          ],
          status: 'stable'
        },
        {
          id: 'java-sdk',
          name: 'SyncScript Java SDK',
          description: 'Official Java SDK for SyncScript API',
          version: '1.5.0',
          language: 'java',
          icon: '☕',
          downloads: 12340,
          lastUpdated: '2024-01-10',
          features: ['Spring Boot integration', 'Reactive streams', 'Maven/Gradle support', 'Enterprise features'],
          documentation: 'https://docs.syncscript.com/java-sdk',
          examples: [],
          status: 'beta'
        }
      ];

      // Mock SDK projects
      const mockProjects: SDKProject[] = [
        {
          id: 'project-1',
          name: 'Task Automation Bot',
          description: 'Automatically creates tasks based on calendar events',
          language: 'javascript',
          status: 'active',
          createdAt: '2024-01-01T00:00:00Z',
          lastRun: new Date(Date.now() - 3600000).toISOString(),
          executions: 45,
          code: `// Task Automation Bot
const { SyncScriptClient } = require('@syncscript/sdk');

const client = new SyncScriptClient({
  apiKey: process.env.SYNCSCRIPT_API_KEY
});

async function createTaskFromEvent(event) {
  const task = await client.tasks.create({
    title: event.title,
    description: \`Auto-generated from calendar event: \${event.description}\`,
    priority: 3,
    energyRequirement: 5,
    estimatedDuration: event.duration || 60,
    category: 'automation'
  });
  
  console.log('Created task:', task.id);
}`
        },
        {
          id: 'project-2',
          name: 'Energy Analytics Dashboard',
          description: 'Analyzes energy patterns and generates insights',
          language: 'python',
          status: 'active',
          createdAt: '2024-01-05T00:00:00Z',
          lastRun: new Date(Date.now() - 7200000).toISOString(),
          executions: 23,
          code: `# Energy Analytics Dashboard
from syncscript import SyncScriptClient
import pandas as pd
import matplotlib.pyplot as plt

client = SyncScriptClient(api_key='your-api-key')

def analyze_energy_patterns():
    # Fetch energy logs
    energy_logs = client.analytics.getEnergyLogs(period='30d')
    
    # Convert to DataFrame
    df = pd.DataFrame(energy_logs)
    
    # Analyze patterns
    avg_energy = df['energy_level'].mean()
    peak_hours = df.groupby(df['timestamp'].dt.hour)['energy_level'].mean()
    
    # Generate insights
    insights = {
        'average_energy': avg_energy,
        'peak_hour': peak_hours.idxmax(),
        'recommendations': generate_recommendations(df)
    }
    
    return insights`
        }
      ];

      setSdkPackages(mockPackages);
      setSdkProjects(mockProjects);
    } catch (error) {
      console.error('Failed to load SDK data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createProject = async (project: Omit<SDKProject, 'id' | 'createdAt' | 'executions'>) => {
    try {
      const newProject: SDKProject = {
        ...project,
        id: `project_${Date.now()}`,
        createdAt: new Date().toISOString(),
        executions: 0
      };
      
      setSdkProjects(prev => [...prev, newProject]);
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  const runProject = async (projectId: string) => {
    try {
      setSdkProjects(prev => prev.map(project => 
        project.id === projectId 
          ? { 
              ...project, 
              lastRun: new Date().toISOString(),
              executions: project.executions + 1
            }
          : project
      ));
    } catch (error) {
      console.error('Failed to run project:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable': return 'text-green-600 bg-green-100';
      case 'beta': return 'text-yellow-600 bg-yellow-100';
      case 'alpha': return 'text-blue-600 bg-blue-100';
      case 'deprecated': return 'text-red-600 bg-red-100';
      case 'active': return 'text-green-600 bg-green-100';
      case 'paused': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getLanguageIcon = (language: string) => {
    switch (language) {
      case 'javascript': return '🟨';
      case 'python': return '🐍';
      case 'java': return '☕';
      case 'csharp': return '🔷';
      case 'go': return '🐹';
      case 'php': return '🐘';
      default: return '💻';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'authentication': return '🔐';
      case 'tasks': return '📝';
      case 'projects': return '📁';
      case 'analytics': return '📊';
      case 'webhooks': return '🔗';
      default: return '📄';
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading SDK...</span>
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
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">SyncScript SDK</h2>
              <p className="text-orange-100 mt-1">Custom app development tools and SDK management</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-orange-200 text-sm">Packages:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {sdkPackages.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-orange-200 text-sm">Projects:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {sdkProjects.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-orange-200 text-sm">Downloads:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {sdkPackages.reduce((sum, pkg) => sum + pkg.downloads, 0).toLocaleString()}
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
              { id: 'packages', name: 'SDK Packages', icon: '📦' },
              { id: 'examples', name: 'Code Examples', icon: '💻' },
              { id: 'projects', name: 'Projects', icon: '🚀' },
              { id: 'docs', name: 'Documentation', icon: '📚' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all ${
                  selectedTab === tab.id
                    ? 'border-orange-500 text-orange-600'
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
          {selectedTab === 'packages' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">SDK Packages</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sdkPackages.map((pkg) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-3xl">{pkg.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{pkg.name}</h4>
                        <p className="text-sm text-gray-600">{pkg.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span>v{pkg.version}</span>
                          <span>📥 {pkg.downloads.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-2">Features:</div>
                        <div className="space-y-1">
                          {pkg.features.map((feature, index) => (
                            <div key={index} className="text-xs text-gray-600 flex items-center gap-1">
                              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(pkg.status)}`}>
                          {pkg.status.toUpperCase()}
                        </span>
                        <button
                          onClick={() => setSelectedPackage(pkg)}
                          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'examples' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Code Examples</h3>
              
              <div className="space-y-4">
                {sdkPackages.flatMap(pkg => pkg.examples).map((example) => (
                  <motion.div
                    key={example.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-xl">{getCategoryIcon(example.category)}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{example.title}</h4>
                        <p className="text-sm text-gray-600">{example.description}</p>
                        <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                          <span>{getLanguageIcon(example.language)} {example.language}</span>
                          <span>•</span>
                          <span>{example.category}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedExample(example)}
                        className="px-3 py-1 bg-orange-100 text-orange-700 rounded text-sm hover:bg-orange-200 transition-all"
                      >
                        View Code
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">SDK Projects</h3>
                <button
                  onClick={() => {
                    createProject({
                      name: 'New SDK Project',
                      description: 'Custom SDK project',
                      language: 'javascript',
                      status: 'active',
                      code: '// Your SDK code here'
                    });
                  }}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Create Project
                </button>
              </div>
              
              <div className="space-y-4">
                {sdkProjects.map((project) => (
                  <div key={project.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{getLanguageIcon(project.language)}</span>
                        <div>
                          <h4 className="font-medium text-gray-900">{project.name}</h4>
                          <p className="text-sm text-gray-600">{project.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(project.status)}`}>
                          {project.status.toUpperCase()}
                        </span>
                        <button
                          onClick={() => runProject(project.id)}
                          className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all"
                        >
                          Run
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Executions:</span>
                        <span className="ml-2 text-gray-900">{project.executions}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Last Run:</span>
                        <span className="ml-2 text-gray-900">
                          {project.lastRun ? new Date(project.lastRun).toLocaleString() : 'Never'}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Created:</span>
                        <span className="ml-2 text-gray-900">{new Date(project.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Language:</span>
                        <span className="ml-2 text-gray-900">{project.language}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'docs' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">SDK Documentation</h3>
              
              <div className="space-y-4">
                {sdkPackages.map((pkg) => (
                  <div key={pkg.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-2xl">{pkg.icon}</span>
                      <div>
                        <h4 className="font-medium text-gray-900">{pkg.name}</h4>
                        <p className="text-sm text-gray-600">{pkg.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Version:</span>
                          <span className="ml-2 text-gray-900">{pkg.version}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Language:</span>
                          <span className="ml-2 text-gray-900">{pkg.language}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Downloads:</span>
                          <span className="ml-2 text-gray-900">{pkg.downloads.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Last Updated:</span>
                          <span className="ml-2 text-gray-900">{pkg.lastUpdated}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <a
                          href={pkg.documentation}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors text-sm"
                        >
                          View Documentation
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Code Example Modal */}
        {selectedExample && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
            >
              <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedExample.title}</h3>
                  <p className="text-sm text-gray-600">{selectedExample.description}</p>
                </div>
                <button
                  onClick={() => setSelectedExample(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{selectedExample.code}</code>
                </pre>
              </div>
            </motion.div>
          </div>
        )}

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            SyncScript SDK • {sdkPackages.length} packages • {sdkProjects.length} projects
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
                console.log('Exporting SDK data...');
              }}
              className="px-6 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 transition-all"
            >
              Export Data
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SyncScriptSDK;
