import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CodeQualityMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  description: string;
  improvements: string[];
}

interface CodeIssue {
  id: string;
  type: 'error' | 'warning' | 'info' | 'suggestion';
  severity: 'high' | 'medium' | 'low';
  file: string;
  line: number;
  message: string;
  rule: string;
  fix: string;
  category: 'typescript' | 'react' | 'performance' | 'accessibility' | 'security';
}

interface RefactoringOpportunity {
  id: string;
  name: string;
  description: string;
  file: string;
  lines: number[];
  type: 'extract-component' | 'extract-hook' | 'simplify-logic' | 'optimize-performance' | 'improve-types';
  impact: 'high' | 'medium' | 'low';
  effort: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed' | 'skipped';
  benefits: string[];
  implementation: string[];
}

interface CodeStandard {
  id: string;
  name: string;
  description: string;
  category: 'naming' | 'structure' | 'performance' | 'security' | 'accessibility';
  compliance: number;
  violations: number;
  examples: {
    good: string;
    bad: string;
  };
}

const CodeQualityRefactoringSystem: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [metrics, setMetrics] = useState<CodeQualityMetric[]>([]);
  const [issues, setIssues] = useState<CodeIssue[]>([]);
  const [refactoringOpportunities, setRefactoringOpportunities] = useState<RefactoringOpportunity[]>([]);
  const [standards, setStandards] = useState<CodeStandard[]>([]);
  const [isAnalyzingCode, setIsAnalyzingCode] = useState(false);
  const [isRefactoring, setIsRefactoring] = useState(false);

  // Generate code quality data
  useEffect(() => {
    const generateMetrics = (): CodeQualityMetric[] => {
      return [
        {
          id: 'type-coverage',
          name: 'TypeScript Coverage',
          value: 87,
          target: 95,
          unit: '%',
          status: 'good',
          trend: 'up',
          description: 'Percentage of code with TypeScript types',
          improvements: [
            'Add explicit return types to functions',
            'Define interfaces for component props',
            'Use strict TypeScript configuration'
          ]
        },
        {
          id: 'test-coverage',
          name: 'Test Coverage',
          value: 72,
          target: 80,
          unit: '%',
          status: 'warning',
          trend: 'up',
          description: 'Percentage of code covered by tests',
          improvements: [
            'Add unit tests for utility functions',
            'Implement integration tests for components',
            'Add end-to-end tests for critical flows'
          ]
        },
        {
          id: 'complexity',
          name: 'Cyclomatic Complexity',
          value: 8.2,
          target: 5.0,
          unit: 'avg',
          status: 'warning',
          trend: 'down',
          description: 'Average complexity of functions',
          improvements: [
            'Break down complex functions into smaller ones',
            'Extract conditional logic into separate functions',
            'Use early returns to reduce nesting'
          ]
        },
        {
          id: 'duplication',
          name: 'Code Duplication',
          value: 3.1,
          target: 2.0,
          unit: '%',
          status: 'warning',
          trend: 'down',
          description: 'Percentage of duplicated code',
          improvements: [
            'Extract common logic into reusable functions',
            'Create shared utility modules',
            'Implement component composition patterns'
          ]
        },
        {
          id: 'maintainability',
          name: 'Maintainability Index',
          value: 78,
          target: 85,
          unit: 'score',
          status: 'good',
          trend: 'up',
          description: 'Overall code maintainability score',
          improvements: [
            'Improve code documentation',
            'Reduce function complexity',
            'Enhance error handling'
          ]
        },
        {
          id: 'security-issues',
          name: 'Security Issues',
          value: 2,
          target: 0,
          unit: 'count',
          status: 'warning',
          trend: 'down',
          description: 'Number of security vulnerabilities',
          improvements: [
            'Sanitize user inputs',
            'Implement proper authentication',
            'Use secure coding practices'
          ]
        }
      ];
    };

    const generateIssues = (): CodeIssue[] => {
      return [
        {
          id: 'issue-1',
          type: 'warning',
          severity: 'medium',
          file: 'src/components/dashboard.tsx',
          line: 245,
          message: 'Component has too many props (15 props)',
          rule: 'max-props',
          fix: 'Extract related props into an object or split component',
          category: 'react'
        },
        {
          id: 'issue-2',
          type: 'error',
          severity: 'high',
          file: 'src/utils/dataPersistence.ts',
          line: 89,
          message: 'Missing error handling for localStorage access',
          rule: 'error-handling',
          fix: 'Add try-catch block around localStorage operations',
          category: 'typescript'
        },
        {
          id: 'issue-3',
          type: 'suggestion',
          severity: 'low',
          file: 'src/components/ui/Button.tsx',
          line: 34,
          message: 'Consider using React.memo for performance',
          rule: 'performance',
          fix: 'Wrap component with React.memo',
          category: 'performance'
        },
        {
          id: 'issue-4',
          type: 'warning',
          severity: 'medium',
          file: 'src/components/analytics/Chart.tsx',
          line: 156,
          message: 'Missing alt text for images',
          rule: 'alt-text',
          fix: 'Add descriptive alt text to images',
          category: 'accessibility'
        },
        {
          id: 'issue-5',
          type: 'error',
          severity: 'high',
          file: 'src/api/auth.ts',
          line: 67,
          message: 'Potential XSS vulnerability in user input',
          rule: 'security',
          fix: 'Sanitize user input before processing',
          category: 'security'
        },
        {
          id: 'issue-6',
          type: 'info',
          severity: 'low',
          file: 'src/hooks/useAnalytics.ts',
          line: 23,
          message: 'Unused import detected',
          rule: 'unused-imports',
          fix: 'Remove unused import statement',
          category: 'typescript'
        }
      ];
    };

    const generateRefactoringOpportunities = (): RefactoringOpportunity[] => {
      return [
        {
          id: 'refactor-1',
          name: 'Extract Dashboard Header Component',
          description: 'The dashboard header has grown complex and should be extracted',
          file: 'src/components/dashboard.tsx',
          lines: [45, 89],
          type: 'extract-component',
          impact: 'high',
          effort: 'medium',
          status: 'pending',
          benefits: [
            'Improved maintainability',
            'Better testability',
            'Reusability across pages'
          ],
          implementation: [
            'Create DashboardHeader component',
            'Move header logic to new component',
            'Update imports and usage',
            'Add proper TypeScript types'
          ]
        },
        {
          id: 'refactor-2',
          name: 'Extract Analytics Hook',
          description: 'Analytics logic is scattered across components',
          file: 'src/components/analytics/',
          lines: [12, 45, 78],
          type: 'extract-hook',
          impact: 'high',
          effort: 'low',
          status: 'pending',
          benefits: [
            'Centralized analytics logic',
            'Easier testing and debugging',
            'Consistent analytics implementation'
          ],
          implementation: [
            'Create useAnalytics hook',
            'Move analytics logic to hook',
            'Update components to use hook',
            'Add error handling and loading states'
          ]
        },
        {
          id: 'refactor-3',
          name: 'Simplify Task Management Logic',
          description: 'Task management has complex nested conditions',
          file: 'src/utils/taskManager.ts',
          lines: [123, 189],
          type: 'simplify-logic',
          impact: 'medium',
          effort: 'medium',
          status: 'pending',
          benefits: [
            'Improved readability',
            'Easier maintenance',
            'Reduced complexity'
          ],
          implementation: [
            'Break down complex conditions',
            'Extract helper functions',
            'Use early returns',
            'Add comprehensive tests'
          ]
        },
        {
          id: 'refactor-4',
          name: 'Optimize Component Re-renders',
          description: 'Several components re-render unnecessarily',
          file: 'src/components/ui/',
          lines: [34, 67, 89],
          type: 'optimize-performance',
          impact: 'medium',
          effort: 'low',
          status: 'pending',
          benefits: [
            'Better performance',
            'Reduced CPU usage',
            'Improved user experience'
          ],
          implementation: [
            'Add React.memo to components',
            'Optimize useCallback and useMemo',
            'Review prop dependencies',
            'Implement proper key props'
          ]
        },
        {
          id: 'refactor-5',
          name: 'Improve TypeScript Types',
          description: 'Many components use any types or missing types',
          file: 'src/components/',
          lines: [23, 45, 67],
          type: 'improve-types',
          impact: 'medium',
          effort: 'high',
          status: 'pending',
          benefits: [
            'Better type safety',
            'Improved IDE support',
            'Reduced runtime errors'
          ],
          implementation: [
            'Define proper interfaces',
            'Replace any types',
            'Add generic types where needed',
            'Enable strict TypeScript mode'
          ]
        }
      ];
    };

    const generateStandards = (): CodeStandard[] => {
      return [
        {
          id: 'naming-conventions',
          name: 'Naming Conventions',
          description: 'Consistent naming for variables, functions, and components',
          category: 'naming',
          compliance: 92,
          violations: 8,
          examples: {
            good: 'const userProfile = getUserProfile();\nconst UserProfileComponent = () => {};',
            bad: 'const up = getUserProfile();\nconst userprofile = () => {};'
          }
        },
        {
          id: 'component-structure',
          name: 'Component Structure',
          description: 'Consistent component organization and structure',
          category: 'structure',
          compliance: 85,
          violations: 15,
          examples: {
            good: 'export const Component = ({ prop }: Props) => {\n  // hooks\n  // handlers\n  // render\n};',
            bad: 'export const Component = ({ prop }) => {\n  // mixed logic\n  return <div>...</div>;\n};'
          }
        },
        {
          id: 'performance-standards',
          name: 'Performance Standards',
          description: 'Performance optimization best practices',
          category: 'performance',
          compliance: 78,
          violations: 22,
          examples: {
            good: 'const MemoizedComponent = React.memo(({ data }) => {\n  return <div>{data}</div>;\n});',
            bad: 'const Component = ({ data }) => {\n  return <div>{data}</div>;\n};'
          }
        },
        {
          id: 'security-standards',
          name: 'Security Standards',
          description: 'Security best practices and vulnerability prevention',
          category: 'security',
          compliance: 88,
          violations: 12,
          examples: {
            good: 'const sanitizedInput = DOMPurify.sanitize(userInput);',
            bad: 'const html = `<div>${userInput}</div>`;'
          }
        },
        {
          id: 'accessibility-standards',
          name: 'Accessibility Standards',
          description: 'WCAG compliance and accessibility best practices',
          category: 'accessibility',
          compliance: 82,
          violations: 18,
          examples: {
            good: '<button aria-label="Close dialog" onClick={onClose}>×</button>',
            bad: '<div onClick={onClose}>×</div>'
          }
        }
      ];
    };

    setMetrics(generateMetrics());
    setIssues(generateIssues());
    setRefactoringOpportunities(generateRefactoringOpportunities());
    setStandards(generateStandards());
  }, []);

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string): string => {
    switch (type) {
      case 'error': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      case 'suggestion': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'typescript': return 'bg-blue-100 text-blue-800';
      case 'react': return 'bg-cyan-100 text-cyan-800';
      case 'performance': return 'bg-purple-100 text-purple-800';
      case 'accessibility': return 'bg-green-100 text-green-800';
      case 'security': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactColor = (impact: string): string => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEffortColor = (effort: string): string => {
    switch (effort) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRefactoringStatusColor = (status: string): string => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'skipped': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: string): string => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  };

  const getTrendColor = (trend: string): string => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const runCodeAnalysis = async () => {
    setIsAnalyzingCode(true);
    
    // Simulate code analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Update metrics with simulated improvements
    setMetrics(prev => prev.map(metric => ({
      ...metric,
      value: metric.value + (Math.random() * 5 - 2.5), // Small random change
      trend: Math.random() > 0.5 ? 'up' : 'down',
      status: metric.value >= metric.target ? 'excellent' : metric.status
    })));
    
    setIsAnalyzingCode(false);
  };

  const applyRefactoring = async (refactoringId: string) => {
    setIsRefactoring(true);
    
    // Simulate refactoring application
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setRefactoringOpportunities(prev => prev.map(refactor => 
      refactor.id === refactoringId 
        ? { ...refactor, status: 'completed' as const }
        : refactor
    ));
    
    setIsRefactoring(false);
  };

  const totalIssues = issues.length;
  const highSeverityIssues = issues.filter(i => i.severity === 'high').length;
  const completedRefactorings = refactoringOpportunities.filter(r => r.status === 'completed').length;
  const averageCompliance = standards.reduce((sum, s) => sum + s.compliance, 0) / standards.length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">🔧 Code Quality & Refactoring System</h2>
              <p className="text-green-100 mt-1">Code analysis, quality metrics, and refactoring opportunities</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 h-full overflow-y-auto">
          {/* Code Quality Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Type Coverage</p>
                  <p className="text-2xl font-bold text-blue-800">
                    {metrics.find(m => m.id === 'type-coverage')?.value || 0}%
                  </p>
                </div>
                <div className="text-3xl">📝</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Test Coverage</p>
                  <p className="text-2xl font-bold text-green-800">
                    {metrics.find(m => m.id === 'test-coverage')?.value || 0}%
                  </p>
                </div>
                <div className="text-3xl">🧪</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Issues</p>
                  <p className="text-2xl font-bold text-purple-800">{totalIssues}</p>
                </div>
                <div className="text-3xl">⚠️</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Refactorings</p>
                  <p className="text-2xl font-bold text-orange-800">{completedRefactorings}</p>
                </div>
                <div className="text-3xl">🔄</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 font-medium">Compliance</p>
                  <p className="text-2xl font-bold text-red-800">{averageCompliance.toFixed(0)}%</p>
                </div>
                <div className="text-3xl">✅</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Last analysis: {new Date().toLocaleString()}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={runCodeAnalysis}
                  disabled={isAnalyzingCode}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
                >
                  {isAnalyzingCode ? '⏳ Analyzing...' : '🔍 Run Analysis'}
                </button>
              </div>
            </div>
          </div>

          {/* Code Quality Metrics */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Code Quality Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {metrics.map((metric) => (
                <div key={metric.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{metric.name}</h4>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(metric.status)}`}>
                        {metric.status}
                      </span>
                      <span className="text-lg">{getTrendIcon(metric.trend)}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Current:</span>
                      <span className="font-medium text-gray-900">{metric.value} {metric.unit}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Target:</span>
                      <span className="font-medium text-blue-600">{metric.target} {metric.unit}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Trend:</span>
                      <span className={`font-medium ${getTrendColor(metric.trend)}`}>
                        {metric.trend}
                      </span>
                    </div>
                    
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            metric.value >= metric.target ? 'bg-green-500' : 'bg-yellow-500'
                          }`}
                          style={{ width: `${Math.min(100, (metric.value / metric.target) * 100)}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {((metric.value / metric.target) * 100).toFixed(0)}% of target
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="text-sm font-medium text-gray-700 mb-1">Improvements:</div>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {metric.improvements.map((improvement, index) => (
                          <li key={index}>• {improvement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Code Issues */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Code Issues ({totalIssues})</h3>
            <div className="space-y-4">
              {issues.map((issue) => (
                <div key={issue.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{issue.message}</h4>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(issue.type)}`}>
                        {issue.type}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(issue.severity)}`}>
                        {issue.severity}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(issue.category)}`}>
                        {issue.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">File:</span>
                      <span className="font-medium text-blue-600">{issue.file}:{issue.line}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Rule:</span>
                      <span className="font-medium text-gray-900">{issue.rule}</span>
                    </div>
                    
                    <div className="mt-3">
                      <div className="text-sm font-medium text-gray-700 mb-1">Fix:</div>
                      <div className="text-sm text-gray-600 bg-gray-100 p-2 rounded">
                        {issue.fix}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Refactoring Opportunities */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Refactoring Opportunities ({refactoringOpportunities.length})</h3>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Refactoring</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Effort</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {refactoringOpportunities.map((refactoring) => (
                    <tr key={refactoring.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{refactoring.name}</div>
                          <div className="text-sm text-gray-500">{refactoring.description}</div>
                          <div className="text-xs text-gray-400">{refactoring.file}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(refactoring.type)}`}>
                          {refactoring.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getImpactColor(refactoring.impact)}`}>
                          {refactoring.impact}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEffortColor(refactoring.effort)}`}>
                          {refactoring.effort}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRefactoringStatusColor(refactoring.status)}`}>
                          {refactoring.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => applyRefactoring(refactoring.id)}
                          disabled={isRefactoring || refactoring.status === 'completed'}
                          className="text-blue-600 hover:text-blue-900 disabled:opacity-50 transition-colors"
                        >
                          {isRefactoring ? 'Refactoring...' : 'Apply'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CodeQualityRefactoringSystem;
