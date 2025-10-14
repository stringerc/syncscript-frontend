import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TestSuite {
  id: string;
  name: string;
  description: string;
  type: 'unit' | 'integration' | 'e2e' | 'performance' | 'accessibility';
  status: 'passing' | 'failing' | 'pending' | 'skipped';
  duration: number;
  testCount: number;
  passCount: number;
  failCount: number;
  lastRun: Date;
  coverage: number;
  priority: 'critical' | 'high' | 'medium' | 'low';
}

interface TestCase {
  id: string;
  name: string;
  description: string;
  suiteId: string;
  status: 'pass' | 'fail' | 'pending' | 'skipped';
  duration: number;
  errorMessage?: string;
  stackTrace?: string;
  tags: string[];
  lastRun: Date;
}

interface TestRun {
  id: string;
  name: string;
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  startTime: Date;
  endTime?: Date;
  duration?: number;
  totalTests: number;
  passedTests: number;
  failedTests: number;
  skippedTests: number;
  coverage: number;
  environment: string;
  branch: string;
  commit: string;
}

interface ValidationRule {
  id: string;
  name: string;
  description: string;
  type: 'schema' | 'format' | 'range' | 'custom';
  status: 'active' | 'inactive' | 'testing';
  severity: 'error' | 'warning' | 'info';
  target: string;
  rule: string;
  lastValidated: Date;
  violations: number;
}

const TestingValidationSystem: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [testSuites, setTestSuites] = useState<TestSuite[]>([]);
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [testRuns, setTestRuns] = useState<TestRun[]>([]);
  const [validationRules, setValidationRules] = useState<ValidationRule[]>([]);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  // Generate testing data
  useEffect(() => {
    const generateTestSuites = (): TestSuite[] => {
      return [
        {
          id: 'suite-1',
          name: 'Dashboard Components',
          description: 'Unit tests for dashboard components and interactions',
          type: 'unit',
          status: 'passing',
          duration: 45,
          testCount: 25,
          passCount: 25,
          failCount: 0,
          lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000),
          coverage: 92.5,
          priority: 'critical'
        },
        {
          id: 'suite-2',
          name: 'API Integration',
          description: 'Integration tests for API endpoints and data flow',
          type: 'integration',
          status: 'passing',
          duration: 120,
          testCount: 18,
          passCount: 17,
          failCount: 1,
          lastRun: new Date(Date.now() - 1 * 60 * 60 * 1000),
          coverage: 88.3,
          priority: 'high'
        },
        {
          id: 'suite-3',
          name: 'User Workflows',
          description: 'End-to-end tests for complete user journeys',
          type: 'e2e',
          status: 'failing',
          duration: 300,
          testCount: 12,
          passCount: 10,
          failCount: 2,
          lastRun: new Date(Date.now() - 30 * 60 * 1000),
          coverage: 75.0,
          priority: 'high'
        },
        {
          id: 'suite-4',
          name: 'Performance Tests',
          description: 'Load testing and performance benchmarks',
          type: 'performance',
          status: 'passing',
          duration: 600,
          testCount: 8,
          passCount: 8,
          failCount: 0,
          lastRun: new Date(Date.now() - 4 * 60 * 60 * 1000),
          coverage: 65.2,
          priority: 'medium'
        },
        {
          id: 'suite-5',
          name: 'Accessibility Tests',
          description: 'WCAG compliance and accessibility validation',
          type: 'accessibility',
          status: 'passing',
          duration: 90,
          testCount: 15,
          passCount: 14,
          failCount: 1,
          lastRun: new Date(Date.now() - 3 * 60 * 60 * 1000),
          coverage: 82.1,
          priority: 'medium'
        }
      ];
    };

    const generateTestCases = (): TestCase[] => {
      const cases: TestCase[] = [];
      const suiteIds = ['suite-1', 'suite-2', 'suite-3', 'suite-4', 'suite-5'];
      const testNames = [
        'should render dashboard correctly',
        'should handle user authentication',
        'should validate form inputs',
        'should load data from API',
        'should handle error states',
        'should support keyboard navigation',
        'should meet performance benchmarks',
        'should be responsive on mobile',
        'should support screen readers',
        'should handle network failures'
      ];

      for (let i = 0; i < 50; i++) {
        const suiteId = suiteIds[Math.floor(Math.random() * suiteIds.length)];
        const testName = testNames[Math.floor(Math.random() * testNames.length)];
        const statuses: TestCase['status'][] = ['pass', 'fail', 'pending', 'skipped'];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const timestamp = new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000);

        cases.push({
          id: `test-${i}`,
          name: `${testName} (${i + 1})`,
          description: `Test case ${i + 1} for ${suiteId}`,
          suiteId,
          status,
          duration: Math.floor(Math.random() * 5000) + 100,
          errorMessage: status === 'fail' ? 'Assertion failed: Expected value to be truthy' : undefined,
          stackTrace: status === 'fail' ? 'Error: Assertion failed\n    at TestCase.run (test.js:123:45)' : undefined,
          tags: ['smoke', 'regression', 'critical'],
          lastRun: timestamp
        });
      }

      return cases;
    };

    const generateTestRuns = (): TestRun[] => {
      return [
        {
          id: 'run-1',
          name: 'Nightly Build Tests',
          status: 'completed',
          startTime: new Date(Date.now() - 6 * 60 * 60 * 1000),
          endTime: new Date(Date.now() - 5 * 60 * 60 * 1000),
          duration: 3600,
          totalTests: 78,
          passedTests: 74,
          failedTests: 4,
          skippedTests: 0,
          coverage: 85.2,
          environment: 'staging',
          branch: 'main',
          commit: 'abc123def'
        },
        {
          id: 'run-2',
          name: 'Feature Branch Tests',
          status: 'running',
          startTime: new Date(Date.now() - 30 * 60 * 1000),
          totalTests: 45,
          passedTests: 32,
          failedTests: 2,
          skippedTests: 11,
          coverage: 0,
          environment: 'development',
          branch: 'feature/new-dashboard',
          commit: 'def456ghi'
        },
        {
          id: 'run-3',
          name: 'Release Candidate Tests',
          status: 'completed',
          startTime: new Date(Date.now() - 12 * 60 * 60 * 1000),
          endTime: new Date(Date.now() - 11 * 60 * 60 * 1000),
          duration: 3600,
          totalTests: 95,
          passedTests: 95,
          failedTests: 0,
          skippedTests: 0,
          coverage: 91.8,
          environment: 'production',
          branch: 'release/v2.1.0',
          commit: 'ghi789jkl'
        }
      ];
    };

    const generateValidationRules = (): ValidationRule[] => {
      return [
        {
          id: 'rule-1',
          name: 'Email Format Validation',
          description: 'Validates email address format',
          type: 'format',
          status: 'active',
          severity: 'error',
          target: 'user.email',
          rule: '^[\\w\\.-]+@[\\w\\.-]+\\.[a-zA-Z]{2,}$',
          lastValidated: new Date(Date.now() - 1 * 60 * 60 * 1000),
          violations: 0
        },
        {
          id: 'rule-2',
          name: 'Password Strength',
          description: 'Validates password meets security requirements',
          type: 'custom',
          status: 'active',
          severity: 'error',
          target: 'user.password',
          rule: 'minLength:8,requireUppercase:true,requireNumbers:true',
          lastValidated: new Date(Date.now() - 2 * 60 * 60 * 1000),
          violations: 3
        },
        {
          id: 'rule-3',
          name: 'Task Title Length',
          description: 'Validates task title is within acceptable range',
          type: 'range',
          status: 'active',
          severity: 'warning',
          target: 'task.title',
          rule: 'min:1,max:200',
          lastValidated: new Date(Date.now() - 30 * 60 * 1000),
          violations: 1
        },
        {
          id: 'rule-4',
          name: 'Date Range Validation',
          description: 'Validates dates are in the future',
          type: 'custom',
          status: 'active',
          severity: 'error',
          target: 'task.dueDate',
          rule: 'futureDate:true',
          lastValidated: new Date(Date.now() - 45 * 60 * 1000),
          violations: 0
        },
        {
          id: 'rule-5',
          name: 'JSON Schema Validation',
          description: 'Validates API response structure',
          type: 'schema',
          status: 'active',
          severity: 'error',
          target: 'api.response',
          rule: '{"type":"object","required":["id","title","status"]}',
          lastValidated: new Date(Date.now() - 15 * 60 * 1000),
          violations: 0
        }
      ];
    };

    setTestSuites(generateTestSuites());
    setTestCases(generateTestCases());
    setTestRuns(generateTestRuns());
    setValidationRules(generateValidationRules());
  }, []);

  const formatDate = (date: Date): string => {
    return date.toLocaleString();
  };

  const formatDuration = (ms: number): string => {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    return `${(ms / 60000).toFixed(1)}m`;
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'passing': return 'bg-green-100 text-green-800';
      case 'failing': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'skipped': return 'bg-gray-100 text-gray-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'testing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string): string => {
    switch (type) {
      case 'unit': return 'bg-blue-100 text-blue-800';
      case 'integration': return 'bg-green-100 text-green-800';
      case 'e2e': return 'bg-purple-100 text-purple-800';
      case 'performance': return 'bg-orange-100 text-orange-800';
      case 'accessibility': return 'bg-pink-100 text-pink-800';
      case 'schema': return 'bg-blue-100 text-blue-800';
      case 'format': return 'bg-green-100 text-green-800';
      case 'range': return 'bg-yellow-100 text-yellow-800';
      case 'custom': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case 'error': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const runAllTests = async () => {
    setIsRunningTests(true);
    
    // Simulate test execution
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    setIsRunningTests(false);
  };

  const validateData = async () => {
    setIsValidating(true);
    
    // Simulate validation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsValidating(false);
  };

  const totalTests = testSuites.reduce((sum, suite) => sum + suite.testCount, 0);
  const totalPassed = testSuites.reduce((sum, suite) => sum + suite.passCount, 0);
  const totalFailed = testSuites.reduce((sum, suite) => sum + suite.failCount, 0);
  const avgCoverage = testSuites.reduce((sum, suite) => sum + suite.coverage, 0) / testSuites.length;
  const activeRules = validationRules.filter(rule => rule.status === 'active').length;
  const totalViolations = validationRules.reduce((sum, rule) => sum + rule.violations, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">🧪 Testing & Validation System</h2>
              <p className="text-blue-100 mt-1">Comprehensive testing, validation, and quality assurance</p>
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
          {/* Testing Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Total Tests</p>
                  <p className="text-2xl font-bold text-blue-800">{totalTests}</p>
                </div>
                <div className="text-3xl">🧪</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Passed</p>
                  <p className="text-2xl font-bold text-green-800">{totalPassed}</p>
                </div>
                <div className="text-3xl">✅</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 font-medium">Failed</p>
                  <p className="text-2xl font-bold text-red-800">{totalFailed}</p>
                </div>
                <div className="text-3xl">❌</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Coverage</p>
                  <p className="text-2xl font-bold text-purple-800">{avgCoverage.toFixed(1)}%</p>
                </div>
                <div className="text-3xl">📊</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Test Suites</p>
                  <p className="text-2xl font-bold text-orange-800">{testSuites.length}</p>
                </div>
                <div className="text-3xl">📁</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-pink-600 font-medium">Validation Rules</p>
                  <p className="text-2xl font-bold text-pink-800">{activeRules}</p>
                </div>
                <div className="text-3xl">🔍</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Last test run: {new Date().toLocaleString()}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={runAllTests}
                  disabled={isRunningTests}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                >
                  {isRunningTests ? '⏳ Running Tests...' : '🧪 Run All Tests'}
                </button>
                <button
                  onClick={validateData}
                  disabled={isValidating}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
                >
                  {isValidating ? '⏳ Validating...' : '🔍 Validate Data'}
                </button>
              </div>
            </div>
          </div>

          {/* Test Suites */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Test Suites ({testSuites.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {testSuites.map((suite) => (
                <div key={suite.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{suite.name}</h4>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(suite.status)}`}>
                        {suite.status}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(suite.type)}`}>
                        {suite.type}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tests:</span>
                      <span className="font-medium text-gray-900">{suite.testCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Passed:</span>
                      <span className="font-medium text-green-600">{suite.passCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Failed:</span>
                      <span className="font-medium text-red-600">{suite.failCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Coverage:</span>
                      <span className="font-medium text-blue-600">{suite.coverage}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium text-gray-900">{formatDuration(suite.duration * 1000)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Priority:</span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(suite.priority)}`}>
                        {suite.priority}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Last Run:</span>
                      <span className="text-gray-500">{formatDate(suite.lastRun)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Test Runs */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Test Runs ({testRuns.length})</h3>
            <div className="space-y-4">
              {testRuns.map((run) => (
                <div key={run.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{run.name}</h4>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(run.status)}`}>
                        {run.status}
                      </span>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                        {run.environment}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-sm">
                      <span className="text-gray-600">Total:</span>
                      <span className="font-medium text-gray-900 ml-1">{run.totalTests}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Passed:</span>
                      <span className="font-medium text-green-600 ml-1">{run.passedTests}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Failed:</span>
                      <span className="font-medium text-red-600 ml-1">{run.failedTests}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Skipped:</span>
                      <span className="font-medium text-gray-600 ml-1">{run.skippedTests}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-sm">
                      <span className="text-gray-600">Coverage:</span>
                      <span className="font-medium text-blue-600 ml-1">{run.coverage}%</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Branch:</span>
                      <span className="font-medium text-gray-900 ml-1">{run.branch}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Commit:</span>
                      <span className="font-medium text-gray-900 ml-1">{run.commit}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Started:</span>
                      <span className="text-gray-500 ml-1">{formatDate(run.startTime)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Validation Rules */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Validation Rules ({validationRules.length})</h3>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rule</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Violations</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Validated</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {validationRules.map((rule) => (
                    <tr key={rule.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{rule.name}</div>
                          <div className="text-sm text-gray-500">{rule.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(rule.type)}`}>
                          {rule.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(rule.status)}`}>
                          {rule.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(rule.severity)}`}>
                          {rule.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {rule.target}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className={`font-medium ${rule.violations > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {rule.violations}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(rule.lastValidated)}
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

export default TestingValidationSystem;
