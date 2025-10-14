import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TestSuite {
  id: string;
  name: string;
  category: 'unit' | 'integration' | 'e2e' | 'performance' | 'security' | 'accessibility';
  status: 'pending' | 'running' | 'passed' | 'failed' | 'skipped';
  description: string;
  tests: {
    id: string;
    name: string;
    status: 'pending' | 'running' | 'passed' | 'failed' | 'skipped';
    duration?: number;
    error?: string;
    coverage?: number;
  }[];
  coverage: number;
  duration?: number;
  lastRun?: Date;
  nextRun?: Date;
  schedule: 'manual' | 'on_push' | 'daily' | 'weekly';
}

interface IntegrationTest {
  id: string;
  name: string;
  description: string;
  components: string[];
  status: 'pending' | 'running' | 'passed' | 'failed';
  duration?: number;
  results: {
    component: string;
    status: 'connected' | 'disconnected' | 'error';
    latency?: number;
    error?: string;
  }[];
  dependencies: {
    service: string;
    status: 'available' | 'unavailable' | 'degraded';
    responseTime?: number;
    lastCheck: Date;
  }[];
  lastRun?: Date;
}

interface PerformanceTest {
  id: string;
  name: string;
  type: 'load' | 'stress' | 'spike' | 'volume' | 'endurance';
  status: 'pending' | 'running' | 'completed' | 'failed';
  metrics: {
    responseTime: {
      average: number;
      p95: number;
      p99: number;
    };
    throughput: {
      requestsPerSecond: number;
      totalRequests: number;
    };
    errorRate: number;
    cpuUsage: number;
    memoryUsage: number;
  };
  duration?: number;
  lastRun?: Date;
  threshold: {
    responseTime: number;
    errorRate: number;
    throughput: number;
  };
}

interface SecurityTest {
  id: string;
  name: string;
  type: 'vulnerability' | 'penetration' | 'compliance' | 'code_scan';
  status: 'pending' | 'running' | 'completed' | 'failed';
  severity: 'low' | 'medium' | 'high' | 'critical';
  findings: {
    id: string;
    title: string;
    description: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    status: 'open' | 'fixed' | 'false_positive';
    cwe?: string;
    owasp?: string;
  }[];
  score: number;
  lastRun?: Date;
}

interface AccessibilityTest {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  violations: {
    id: string;
    rule: string;
    severity: 'minor' | 'moderate' | 'serious' | 'critical';
    description: string;
    element: string;
    help: string;
  }[];
  score: number;
  lastRun?: Date;
  wcagLevel: 'A' | 'AA' | 'AAA';
}

interface TestReport {
  id: string;
  name: string;
  type: 'comprehensive' | 'regression' | 'smoke' | 'release';
  status: 'generating' | 'completed' | 'failed';
  summary: {
    totalTests: number;
    passed: number;
    failed: number;
    skipped: number;
    coverage: number;
    duration: number;
  };
  testSuites: string[];
  createdAt: Date;
  completedAt?: Date;
  downloadUrl?: string;
}

const SystemIntegrationTesting: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [testSuites, setTestSuites] = useState<TestSuite[]>([]);
  const [integrationTests, setIntegrationTests] = useState<IntegrationTest[]>([]);
  const [performanceTests, setPerformanceTests] = useState<PerformanceTest[]>([]);
  const [securityTests, setSecurityTests] = useState<SecurityTest[]>([]);
  const [accessibilityTests, setAccessibilityTests] = useState<AccessibilityTest[]>([]);
  const [testReports, setTestReports] = useState<TestReport[]>([]);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [isRunningIntegration, setIsRunningIntegration] = useState(false);
  const [selectedTestSuite, setSelectedTestSuite] = useState<TestSuite | null>(null);

  // Generate test data
  useEffect(() => {
    const generateTestSuites = (): TestSuite[] => {
      return [
        {
          id: 'suite-1',
          name: 'Core Functionality Tests',
          category: 'unit',
          status: 'passed',
          description: 'Tests for core task management functionality',
          tests: [
            {
              id: 'test-1',
              name: 'Task Creation',
              status: 'passed',
              duration: 150,
              coverage: 95
            },
            {
              id: 'test-2',
              name: 'Task Completion',
              status: 'passed',
              duration: 120,
              coverage: 90
            },
            {
              id: 'test-3',
              name: 'Energy Calculation',
              status: 'passed',
              duration: 200,
              coverage: 88
            }
          ],
          coverage: 91,
          duration: 470,
          lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000),
          nextRun: new Date(Date.now() + 22 * 60 * 60 * 1000),
          schedule: 'on_push'
        },
        {
          id: 'suite-2',
          name: 'API Integration Tests',
          category: 'integration',
          status: 'running',
          description: 'Tests for API endpoints and data flow',
          tests: [
            {
              id: 'test-4',
              name: 'User Authentication',
              status: 'passed',
              duration: 300,
              coverage: 85
            },
            {
              id: 'test-5',
              name: 'Data Synchronization',
              status: 'running',
              coverage: 0
            },
            {
              id: 'test-6',
              name: 'WebSocket Connection',
              status: 'pending',
              coverage: 0
            }
          ],
          coverage: 85,
          lastRun: new Date(Date.now() - 30 * 60 * 1000),
          schedule: 'daily'
        },
        {
          id: 'suite-3',
          name: 'End-to-End Tests',
          category: 'e2e',
          status: 'passed',
          description: 'Complete user workflow tests',
          tests: [
            {
              id: 'test-7',
              name: 'Complete Task Workflow',
              status: 'passed',
              duration: 2500,
              coverage: 92
            },
            {
              id: 'test-8',
              name: 'Team Collaboration Flow',
              status: 'passed',
              duration: 3200,
              coverage: 88
            }
          ],
          coverage: 90,
          duration: 5700,
          lastRun: new Date(Date.now() - 4 * 60 * 60 * 1000),
          schedule: 'daily'
        },
        {
          id: 'suite-4',
          name: 'Performance Tests',
          category: 'performance',
          status: 'passed',
          description: 'Load and stress testing',
          tests: [
            {
              id: 'test-9',
              name: 'Load Test - 1000 Users',
              status: 'passed',
              duration: 600000,
              coverage: 100
            },
            {
              id: 'test-10',
              name: 'Stress Test - 5000 Users',
              status: 'passed',
              duration: 900000,
              coverage: 100
            }
          ],
          coverage: 100,
          duration: 1500000,
          lastRun: new Date(Date.now() - 24 * 60 * 60 * 1000),
          schedule: 'weekly'
        }
      ];
    };

    const generateIntegrationTests = (): IntegrationTest[] => {
      return [
        {
          id: 'integration-1',
          name: 'Auth0 Integration',
          description: 'Test authentication flow with Auth0',
          components: ['Login', 'User Profile', 'Session Management'],
          status: 'passed',
          duration: 5000,
          results: [
            {
              component: 'Login',
              status: 'connected',
              latency: 150
            },
            {
              component: 'User Profile',
              status: 'connected',
              latency: 200
            },
            {
              component: 'Session Management',
              status: 'connected',
              latency: 100
            }
          ],
          dependencies: [
            {
              service: 'Auth0 API',
              status: 'available',
              responseTime: 120,
              lastCheck: new Date(Date.now() - 5 * 60 * 1000)
            }
          ],
          lastRun: new Date(Date.now() - 1 * 60 * 60 * 1000)
        },
        {
          id: 'integration-2',
          name: 'Payment Integration',
          description: 'Test Stripe payment processing',
          components: ['Payment Form', 'Subscription Management', 'Webhooks'],
          status: 'running',
          results: [
            {
              component: 'Payment Form',
              status: 'connected',
              latency: 300
            },
            {
              component: 'Subscription Management',
              status: 'connected',
              latency: 250
            },
            {
              component: 'Webhooks',
              status: 'error',
              error: 'Webhook validation failed'
            }
          ],
          dependencies: [
            {
              service: 'Stripe API',
              status: 'available',
              responseTime: 180,
              lastCheck: new Date(Date.now() - 2 * 60 * 1000)
            }
          ],
          lastRun: new Date(Date.now() - 30 * 60 * 1000)
        }
      ];
    };

    const generatePerformanceTests = (): PerformanceTest[] => {
      return [
        {
          id: 'perf-1',
          name: 'Dashboard Load Test',
          type: 'load',
          status: 'completed',
          metrics: {
            responseTime: {
              average: 850,
              p95: 1200,
              p99: 1800
            },
            throughput: {
              requestsPerSecond: 150,
              totalRequests: 15000
            },
            errorRate: 0.2,
            cpuUsage: 65,
            memoryUsage: 78
          },
          duration: 100000,
          lastRun: new Date(Date.now() - 6 * 60 * 60 * 1000),
          threshold: {
            responseTime: 2000,
            errorRate: 1.0,
            throughput: 100
          }
        },
        {
          id: 'perf-2',
          name: 'API Stress Test',
          type: 'stress',
          status: 'completed',
          metrics: {
            responseTime: {
              average: 1200,
              p95: 2500,
              p99: 4000
            },
            throughput: {
              requestsPerSecond: 200,
              totalRequests: 50000
            },
            errorRate: 1.5,
            cpuUsage: 85,
            memoryUsage: 90
          },
          duration: 250000,
          lastRun: new Date(Date.now() - 12 * 60 * 60 * 1000),
          threshold: {
            responseTime: 5000,
            errorRate: 5.0,
            throughput: 150
          }
        }
      ];
    };

    const generateSecurityTests = (): SecurityTest[] => {
      return [
        {
          id: 'sec-1',
          name: 'Vulnerability Scan',
          type: 'vulnerability',
          status: 'completed',
          severity: 'medium',
          findings: [
            {
              id: 'vuln-1',
              title: 'Cross-Site Scripting (XSS)',
              description: 'Potential XSS vulnerability in user input handling',
              severity: 'medium',
              status: 'open',
              cwe: 'CWE-79',
              owasp: 'A03:2021'
            },
            {
              id: 'vuln-2',
              title: 'SQL Injection',
              description: 'SQL injection vulnerability in search functionality',
              severity: 'high',
              status: 'fixed',
              cwe: 'CWE-89',
              owasp: 'A03:2021'
            }
          ],
          score: 75,
          lastRun: new Date(Date.now() - 24 * 60 * 60 * 1000)
        },
        {
          id: 'sec-2',
          name: 'Dependency Scan',
          type: 'code_scan',
          status: 'completed',
          severity: 'low',
          findings: [
            {
              id: 'dep-1',
              title: 'Outdated Package',
              description: 'lodash package is 2 versions behind',
              severity: 'low',
              status: 'open'
            }
          ],
          score: 95,
          lastRun: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        }
      ];
    };

    const generateAccessibilityTests = (): AccessibilityTest[] => {
      return [
        {
          id: 'a11y-1',
          name: 'WCAG 2.1 AA Compliance',
          status: 'completed',
          violations: [
            {
              id: 'violation-1',
              rule: 'color-contrast',
              severity: 'moderate',
              description: 'Insufficient color contrast ratio',
              element: '.btn-secondary',
              help: 'Ensure color contrast ratio is at least 4.5:1'
            },
            {
              id: 'violation-2',
              rule: 'keyboard-navigation',
              severity: 'serious',
              description: 'Element not accessible via keyboard',
              element: '.dropdown-menu',
              help: 'Ensure all interactive elements are keyboard accessible'
            }
          ],
          score: 85,
          lastRun: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          wcagLevel: 'AA'
        }
      ];
    };

    const generateTestReports = (): TestReport[] => {
      return [
        {
          id: 'report-1',
          name: 'Daily Regression Test Report',
          type: 'regression',
          status: 'completed',
          summary: {
            totalTests: 156,
            passed: 148,
            failed: 3,
            skipped: 5,
            coverage: 89,
            duration: 1200000
          },
          testSuites: ['suite-1', 'suite-2', 'suite-3'],
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
          completedAt: new Date(Date.now() - 23 * 60 * 60 * 1000),
          downloadUrl: '/reports/daily-regression-2024-01-15.pdf'
        },
        {
          id: 'report-2',
          name: 'Release Test Report v2.1.0',
          type: 'release',
          status: 'generating',
          summary: {
            totalTests: 0,
            passed: 0,
            failed: 0,
            skipped: 0,
            coverage: 0,
            duration: 0
          },
          testSuites: ['suite-1', 'suite-2', 'suite-3', 'suite-4'],
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
        }
      ];
    };

    setTestSuites(generateTestSuites());
    setIntegrationTests(generateIntegrationTests());
    setPerformanceTests(generatePerformanceTests());
    setSecurityTests(generateSecurityTests());
    setAccessibilityTests(generateAccessibilityTests());
    setTestReports(generateTestReports());
  }, []);

  const formatDate = (date: Date): string => {
    return date.toLocaleString();
  };

  const formatDuration = (ms: number): string => {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'passed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'skipped': return 'bg-gray-100 text-gray-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'available': return 'bg-green-100 text-green-800';
      case 'unavailable': return 'bg-red-100 text-red-800';
      case 'degraded': return 'bg-yellow-100 text-yellow-800';
      case 'connected': return 'bg-green-100 text-green-800';
      case 'disconnected': return 'bg-red-100 text-red-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'generating': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'unit': return 'bg-blue-100 text-blue-800';
      case 'integration': return 'bg-green-100 text-green-800';
      case 'e2e': return 'bg-purple-100 text-purple-800';
      case 'performance': return 'bg-orange-100 text-orange-800';
      case 'security': return 'bg-red-100 text-red-800';
      case 'accessibility': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      case 'serious': return 'bg-red-100 text-red-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'minor': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const runAllTests = async () => {
    setIsRunningTests(true);
    
    // Simulate running all tests
    await new Promise(resolve => setTimeout(resolve, 8000));
    
    // Update test suites status
    setTestSuites(prev => prev.map(suite => ({
      ...suite,
      status: 'passed' as const,
      lastRun: new Date(),
      tests: suite.tests.map(test => ({
        ...test,
        status: 'passed' as const,
        duration: Math.floor(Math.random() * 500) + 100
      }))
    })));
    
    setIsRunningTests(false);
  };

  const generateComprehensiveReport = async () => {
    setIsGeneratingReport(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    const newReport: TestReport = {
      id: `report-${Date.now()}`,
      name: 'Comprehensive System Test Report',
      type: 'comprehensive',
      status: 'completed',
      summary: {
        totalTests: 245,
        passed: 238,
        failed: 4,
        skipped: 3,
        coverage: 92,
        duration: 1800000
      },
      testSuites: testSuites.map(s => s.id),
      createdAt: new Date(),
      completedAt: new Date(),
      downloadUrl: `/reports/comprehensive-${Date.now()}.pdf`
    };
    
    setTestReports(prev => [newReport, ...prev]);
    setIsGeneratingReport(false);
  };

  const runIntegrationTests = async () => {
    setIsRunningIntegration(true);
    
    // Simulate integration test execution
    await new Promise(resolve => setTimeout(resolve, 6000));
    
    setIntegrationTests(prev => prev.map(test => ({
      ...test,
      status: 'passed' as const,
      lastRun: new Date(),
      results: test.results.map(result => ({
        ...result,
        status: 'connected' as const,
        latency: Math.floor(Math.random() * 300) + 50
      }))
    })));
    
    setIsRunningIntegration(false);
  };

  const totalTests = testSuites.reduce((sum, suite) => sum + suite.tests.length, 0);
  const passedTests = testSuites.reduce((sum, suite) => 
    sum + suite.tests.filter(test => test.status === 'passed').length, 0);
  const failedTests = testSuites.reduce((sum, suite) => 
    sum + suite.tests.filter(test => test.status === 'failed').length, 0);
  const avgCoverage = testSuites.reduce((sum, suite) => sum + suite.coverage, 0) / testSuites.length;
  const runningTests = testSuites.filter(suite => suite.status === 'running').length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">🧪 System Integration & Testing</h2>
              <p className="text-indigo-100 mt-1">Comprehensive testing suite with automation and reporting</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Total Tests</p>
                  <p className="text-2xl font-bold text-blue-800">{totalTests}</p>
                  <p className="text-xs text-blue-600">{runningTests} running</p>
                </div>
                <div className="text-3xl">🧪</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Passed</p>
                  <p className="text-2xl font-bold text-green-800">{passedTests}</p>
                  <p className="text-xs text-green-600">{((passedTests / totalTests) * 100).toFixed(0)}%</p>
                </div>
                <div className="text-3xl">✅</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 font-medium">Failed</p>
                  <p className="text-2xl font-bold text-red-800">{failedTests}</p>
                  <p className="text-xs text-red-600">{((failedTests / totalTests) * 100).toFixed(0)}%</p>
                </div>
                <div className="text-3xl">❌</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Coverage</p>
                  <p className="text-2xl font-bold text-purple-800">{avgCoverage.toFixed(0)}%</p>
                  <p className="text-xs text-purple-600">Average</p>
                </div>
                <div className="text-3xl">📊</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Test Suites</p>
                  <p className="text-2xl font-bold text-orange-800">{testSuites.length}</p>
                  <p className="text-xs text-orange-600">Active</p>
                </div>
                <div className="text-3xl">📋</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Testing automation and reporting
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={runAllTests}
                  disabled={isRunningTests}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                >
                  {isRunningTests ? '⏳ Running...' : '🧪 Run All Tests'}
                </button>
                <button
                  onClick={runIntegrationTests}
                  disabled={isRunningIntegration}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
                >
                  {isRunningIntegration ? '⏳ Testing...' : '🔗 Integration Tests'}
                </button>
                <button
                  onClick={generateComprehensiveReport}
                  disabled={isGeneratingReport}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 transition-colors"
                >
                  {isGeneratingReport ? '⏳ Generating...' : '📊 Generate Report'}
                </button>
              </div>
            </div>
          </div>

          {/* Test Suites */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Test Suites ({testSuites.length})</h3>
            <div className="space-y-4">
              {testSuites.map((suite) => (
                <div key={suite.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{suite.name}</h4>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(suite.category)}`}>
                        {suite.category}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(suite.status)}`}>
                        {suite.status}
                      </span>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                        {suite.schedule}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">{suite.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-sm">
                        <span className="text-gray-600">Tests:</span>
                        <span className="font-medium text-gray-900 ml-1">{suite.tests.length}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Coverage:</span>
                        <span className="font-medium text-blue-600 ml-1">{suite.coverage}%</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium text-gray-900 ml-1">
                          {suite.duration ? formatDuration(suite.duration) : 'N/A'}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Last Run:</span>
                        <span className="text-gray-500 ml-1">
                          {suite.lastRun ? formatDate(suite.lastRun) : 'Never'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="text-sm font-medium text-gray-700 mb-2">Test Results:</div>
                      <div className="space-y-1">
                        {suite.tests.map((test) => (
                          <div key={test.id} className="flex justify-between items-center text-sm">
                            <span className="text-gray-700">{test.name}</span>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(test.status)}`}>
                                {test.status}
                              </span>
                              {test.duration && (
                                <span className="text-gray-500">{formatDuration(test.duration)}</span>
                              )}
                              {test.coverage && (
                                <span className="text-blue-600">{test.coverage}%</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Integration Tests */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Integration Tests ({integrationTests.length})</h3>
            <div className="space-y-4">
              {integrationTests.map((test) => (
                <div key={test.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{test.name}</h4>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(test.status)}`}>
                        {test.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">{test.description}</p>
                    
                    <div className="mt-3">
                      <div className="text-sm font-medium text-gray-700 mb-2">Component Status:</div>
                      <div className="space-y-1">
                        {test.results.map((result, index) => (
                          <div key={index} className="flex justify-between items-center text-sm">
                            <span className="text-gray-700">{result.component}</span>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(result.status)}`}>
                                {result.status}
                              </span>
                              {result.latency && (
                                <span className="text-gray-500">{result.latency}ms</span>
                              )}
                              {result.error && (
                                <span className="text-red-600 text-xs">{result.error}</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="text-sm font-medium text-gray-700 mb-2">Dependencies:</div>
                      <div className="space-y-1">
                        {test.dependencies.map((dep, index) => (
                          <div key={index} className="flex justify-between items-center text-sm">
                            <span className="text-gray-700">{dep.service}</span>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(dep.status)}`}>
                                {dep.status}
                              </span>
                              {dep.responseTime && (
                                <span className="text-gray-500">{dep.responseTime}ms</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Test Reports */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Test Reports ({testReports.length})</h3>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Summary</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {testReports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{report.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {report.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>
                          <div>{report.summary.totalTests} tests, {report.summary.passed} passed, {report.summary.failed} failed</div>
                          <div className="text-xs text-gray-500">{report.summary.coverage}% coverage</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(report.createdAt)}
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

export default SystemIntegrationTesting;
