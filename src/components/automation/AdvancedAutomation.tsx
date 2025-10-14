import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AutomationRule {
  id: string;
  name: string;
  description: string;
  trigger: {
    type: 'schedule' | 'event' | 'condition' | 'webhook' | 'manual';
    condition: string;
    frequency?: string;
    time?: string;
  };
  actions: {
    type: 'notification' | 'task' | 'email' | 'webhook' | 'data' | 'integration';
    config: any;
  }[];
  status: 'active' | 'inactive' | 'paused' | 'error';
  lastRun?: Date;
  nextRun?: Date;
  executionCount: number;
  successRate: number;
  createdAt: Date;
  tags: string[];
}

interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: 'productivity' | 'communication' | 'data' | 'integration' | 'monitoring';
  triggers: string[];
  actions: string[];
  complexity: 'simple' | 'intermediate' | 'advanced';
  estimatedTime: string;
  popularity: number;
  useCases: string[];
  createdAt: Date;
}

interface SmartTrigger {
  id: string;
  name: string;
  type: 'ai' | 'pattern' | 'behavior' | 'context';
  description: string;
  conditions: {
    field: string;
    operator: string;
    value: any;
  }[];
  confidence: number;
  isActive: boolean;
  lastTriggered?: Date;
  triggerCount: number;
  accuracy: number;
}

interface AutomationExecution {
  id: string;
  ruleId: string;
  ruleName: string;
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  startTime: Date;
  endTime?: Date;
  duration?: number;
  actions: {
    id: string;
    type: string;
    status: 'pending' | 'running' | 'completed' | 'failed';
    result?: any;
    error?: string;
  }[];
  logs: {
    timestamp: Date;
    level: 'info' | 'warning' | 'error';
    message: string;
  }[];
}

const AdvancedAutomation: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [automationRules, setAutomationRules] = useState<AutomationRule[]>([]);
  const [workflowTemplates, setWorkflowTemplates] = useState<WorkflowTemplate[]>([]);
  const [smartTriggers, setSmartTriggers] = useState<SmartTrigger[]>([]);
  const [automationExecutions, setAutomationExecutions] = useState<AutomationExecution[]>([]);
  const [isCreatingRule, setIsCreatingRule] = useState(false);
  const [isCreatingTemplate, setIsCreatingTemplate] = useState(false);
  const [isTestingRule, setIsTestingRule] = useState(false);
  const [selectedRule, setSelectedRule] = useState<AutomationRule | null>(null);

  // Generate automation data
  useEffect(() => {
    const generateAutomationRules = (): AutomationRule[] => {
      return [
        {
          id: 'rule-1',
          name: 'Daily Standup Reminder',
          description: 'Automatically send daily standup reminders to team members',
          trigger: {
            type: 'schedule',
            condition: 'Every weekday at 9:00 AM',
            frequency: 'daily',
            time: '09:00'
          },
          actions: [
            {
              type: 'notification',
              config: { message: 'Time for daily standup!', channel: 'slack' }
            },
            {
              type: 'email',
              config: { template: 'standup-reminder', recipients: 'team' }
            }
          ],
          status: 'active',
          lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000),
          nextRun: new Date(Date.now() + 22 * 60 * 60 * 1000),
          executionCount: 45,
          successRate: 0.98,
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          tags: ['standup', 'reminder', 'team']
        },
        {
          id: 'rule-2',
          name: 'High Priority Task Alert',
          description: 'Send immediate alerts when high priority tasks are created',
          trigger: {
            type: 'event',
            condition: 'Task created with priority = high'
          },
          actions: [
            {
              type: 'notification',
              config: { message: 'High priority task created!', urgency: 'high' }
            },
            {
              type: 'webhook',
              config: { url: 'https://hooks.slack.com/...', data: 'task-data' }
            }
          ],
          status: 'active',
          lastRun: new Date(Date.now() - 30 * 60 * 1000),
          executionCount: 12,
          successRate: 1.0,
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          tags: ['priority', 'alert', 'task']
        },
        {
          id: 'rule-3',
          name: 'Energy Level Optimization',
          description: 'Automatically suggest tasks based on current energy level',
          trigger: {
            type: 'condition',
            condition: 'Energy level changes'
          },
          actions: [
            {
              type: 'task',
              config: { action: 'suggest', basedOn: 'energy-level' }
            },
            {
              type: 'notification',
              config: { message: 'Task suggestions updated based on your energy!', type: 'suggestion' }
            }
          ],
          status: 'active',
          lastRun: new Date(Date.now() - 15 * 60 * 1000),
          executionCount: 28,
          successRate: 0.89,
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          tags: ['energy', 'optimization', 'ai']
        },
        {
          id: 'rule-4',
          name: 'Weekly Report Generation',
          description: 'Generate and send weekly productivity reports',
          trigger: {
            type: 'schedule',
            condition: 'Every Friday at 5:00 PM',
            frequency: 'weekly',
            time: '17:00'
          },
          actions: [
            {
              type: 'data',
              config: { action: 'generate-report', type: 'weekly' }
            },
            {
              type: 'email',
              config: { template: 'weekly-report', recipients: 'manager' }
            }
          ],
          status: 'paused',
          lastRun: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          executionCount: 8,
          successRate: 0.95,
          createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
          tags: ['report', 'weekly', 'productivity']
        }
      ];
    };

    const generateWorkflowTemplates = (): WorkflowTemplate[] => {
      return [
        {
          id: 'template-1',
          name: 'Project Kickoff Automation',
          description: 'Automate project setup, team notifications, and initial task creation',
          category: 'productivity',
          triggers: ['Project created', 'Team assigned'],
          actions: ['Create tasks', 'Send notifications', 'Setup calendar'],
          complexity: 'intermediate',
          estimatedTime: '15 minutes',
          popularity: 95,
          useCases: ['New project setup', 'Team onboarding', 'Project initialization'],
          createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
        },
        {
          id: 'template-2',
          name: 'Deadline Alert System',
          description: 'Smart deadline monitoring with escalating notifications',
          category: 'monitoring',
          triggers: ['Task deadline approaching', 'Project milestone'],
          actions: ['Send alerts', 'Update priority', 'Notify stakeholders'],
          complexity: 'simple',
          estimatedTime: '5 minutes',
          popularity: 88,
          useCases: ['Deadline management', 'Project tracking', 'Risk mitigation'],
          createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)
        },
        {
          id: 'template-3',
          name: 'AI-Powered Task Assignment',
          description: 'Intelligent task assignment based on skills, workload, and preferences',
          category: 'integration',
          triggers: ['New task created', 'Team member available'],
          actions: ['Analyze skills', 'Check workload', 'Assign task', 'Send notification'],
          complexity: 'advanced',
          estimatedTime: '30 minutes',
          popularity: 76,
          useCases: ['Resource optimization', 'Workload balancing', 'Skill matching'],
          createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
        },
        {
          id: 'template-4',
          name: 'Meeting Follow-up Automation',
          description: 'Automatically create action items and send follow-up emails after meetings',
          category: 'communication',
          triggers: ['Meeting ended', 'Calendar event completed'],
          actions: ['Extract action items', 'Create tasks', 'Send follow-up email'],
          complexity: 'intermediate',
          estimatedTime: '20 minutes',
          popularity: 82,
          useCases: ['Meeting efficiency', 'Action item tracking', 'Follow-up management'],
          createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
        }
      ];
    };

    const generateSmartTriggers = (): SmartTrigger[] => {
      return [
        {
          id: 'trigger-1',
          name: 'Productivity Pattern Recognition',
          type: 'ai',
          description: 'Detects optimal work patterns and suggests schedule adjustments',
          conditions: [
            { field: 'productivity_score', operator: '>', value: 0.8 },
            { field: 'time_of_day', operator: '=', value: 'morning' }
          ],
          confidence: 0.92,
          isActive: true,
          lastTriggered: new Date(Date.now() - 1 * 60 * 60 * 1000),
          triggerCount: 15,
          accuracy: 0.89
        },
        {
          id: 'trigger-2',
          name: 'Energy Level Predictor',
          type: 'pattern',
          description: 'Predicts energy dips and suggests break times',
          conditions: [
            { field: 'energy_level', operator: '<', value: 5 },
            { field: 'work_duration', operator: '>', value: 90 }
          ],
          confidence: 0.87,
          isActive: true,
          lastTriggered: new Date(Date.now() - 30 * 60 * 1000),
          triggerCount: 23,
          accuracy: 0.85
        },
        {
          id: 'trigger-3',
          name: 'Context-Aware Task Suggestions',
          type: 'context',
          description: 'Suggests tasks based on current context and available time',
          conditions: [
            { field: 'available_time', operator: '>', value: 30 },
            { field: 'context', operator: '=', value: 'focused' }
          ],
          confidence: 0.78,
          isActive: true,
          lastTriggered: new Date(Date.now() - 45 * 60 * 1000),
          triggerCount: 8,
          accuracy: 0.82
        }
      ];
    };

    const generateAutomationExecutions = (): AutomationExecution[] => {
      return [
        {
          id: 'exec-1',
          ruleId: 'rule-1',
          ruleName: 'Daily Standup Reminder',
          status: 'completed',
          startTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
          endTime: new Date(Date.now() - 2 * 60 * 60 * 1000 + 30 * 1000),
          duration: 30,
          actions: [
            {
              id: 'action-1',
              type: 'notification',
              status: 'completed',
              result: { sent: true, recipients: 5 }
            },
            {
              id: 'action-2',
              type: 'email',
              status: 'completed',
              result: { sent: true, recipients: 5 }
            }
          ],
          logs: [
            {
              timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
              level: 'info',
              message: 'Rule execution started'
            },
            {
              timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 15 * 1000),
              level: 'info',
              message: 'Notifications sent successfully'
            },
            {
              timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 30 * 1000),
              level: 'info',
              message: 'Rule execution completed'
            }
          ]
        },
        {
          id: 'exec-2',
          ruleId: 'rule-2',
          ruleName: 'High Priority Task Alert',
          status: 'completed',
          startTime: new Date(Date.now() - 30 * 60 * 1000),
          endTime: new Date(Date.now() - 30 * 60 * 1000 + 5 * 1000),
          duration: 5,
          actions: [
            {
              id: 'action-3',
              type: 'notification',
              status: 'completed',
              result: { sent: true, urgency: 'high' }
            },
            {
              id: 'action-4',
              type: 'webhook',
              status: 'completed',
              result: { status: 200, response: 'OK' }
            }
          ],
          logs: [
            {
              timestamp: new Date(Date.now() - 30 * 60 * 1000),
              level: 'info',
              message: 'High priority task detected'
            },
            {
              timestamp: new Date(Date.now() - 30 * 60 * 1000 + 5 * 1000),
              level: 'info',
              message: 'Alert sent successfully'
            }
          ]
        }
      ];
    };

    setAutomationRules(generateAutomationRules());
    setWorkflowTemplates(generateWorkflowTemplates());
    setSmartTriggers(generateSmartTriggers());
    setAutomationExecutions(generateAutomationExecutions());
  }, []);

  const formatDate = (date: Date): string => {
    return date.toLocaleString();
  };

  const formatDuration = (ms: number): string => {
    const seconds = Math.floor(ms / 1000);
    return `${seconds}s`;
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getComplexityColor = (complexity: string): string => {
    switch (complexity) {
      case 'simple': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string): string => {
    switch (type) {
      case 'ai': return 'bg-purple-100 text-purple-800';
      case 'pattern': return 'bg-blue-100 text-blue-800';
      case 'behavior': return 'bg-green-100 text-green-800';
      case 'context': return 'bg-orange-100 text-orange-800';
      case 'schedule': return 'bg-blue-100 text-blue-800';
      case 'event': return 'bg-green-100 text-green-800';
      case 'condition': return 'bg-yellow-100 text-yellow-800';
      case 'webhook': return 'bg-purple-100 text-purple-800';
      case 'manual': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'productivity': return 'bg-blue-100 text-blue-800';
      case 'communication': return 'bg-green-100 text-green-800';
      case 'data': return 'bg-purple-100 text-purple-800';
      case 'integration': return 'bg-orange-100 text-orange-800';
      case 'monitoring': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const createAutomationRule = async () => {
    setIsCreatingRule(true);
    
    // Simulate creating automation rule
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const newRule: AutomationRule = {
      id: `rule-${Date.now()}`,
      name: 'AI-Generated Rule',
      description: 'Automatically created rule based on your patterns and preferences',
      trigger: {
        type: 'condition',
        condition: 'Custom condition detected'
      },
      actions: [
        {
          type: 'notification',
          config: { message: 'Custom action executed' }
        }
      ],
      status: 'active',
      executionCount: 0,
      successRate: 1.0,
      createdAt: new Date(),
      tags: ['ai-generated', 'custom']
    };
    
    setAutomationRules(prev => [newRule, ...prev]);
    setIsCreatingRule(false);
  };

  const createWorkflowTemplate = async () => {
    setIsCreatingTemplate(true);
    
    // Simulate creating workflow template
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const newTemplate: WorkflowTemplate = {
      id: `template-${Date.now()}`,
      name: 'Custom Workflow Template',
      description: 'AI-generated workflow template based on your usage patterns',
      category: 'productivity',
      triggers: ['Custom trigger'],
      actions: ['Custom action'],
      complexity: 'intermediate',
      estimatedTime: '10 minutes',
      popularity: 0,
      useCases: ['Custom use case'],
      createdAt: new Date()
    };
    
    setWorkflowTemplates(prev => [newTemplate, ...prev]);
    setIsCreatingTemplate(false);
  };

  const testRule = async (ruleId: string) => {
    setIsTestingRule(true);
    
    // Simulate testing rule
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newExecution: AutomationExecution = {
      id: `exec-${Date.now()}`,
      ruleId: ruleId,
      ruleName: automationRules.find(r => r.id === ruleId)?.name || 'Unknown Rule',
      status: 'completed',
      startTime: new Date(),
      endTime: new Date(Date.now() + 2 * 1000),
      duration: 2000,
      actions: [
        {
          id: `action-${Date.now()}`,
          type: 'test',
          status: 'completed',
          result: { test: 'successful' }
        }
      ],
      logs: [
        {
          timestamp: new Date(),
          level: 'info',
          message: 'Test execution started'
        },
        {
          timestamp: new Date(Date.now() + 2 * 1000),
          level: 'info',
          message: 'Test execution completed successfully'
        }
      ]
    };
    
    setAutomationExecutions(prev => [newExecution, ...prev]);
    setIsTestingRule(false);
  };

  const totalRules = automationRules.length;
  const activeRules = automationRules.filter(r => r.status === 'active').length;
  const totalExecutions = automationExecutions.length;
  const successfulExecutions = automationExecutions.filter(e => e.status === 'completed').length;
  const avgSuccessRate = automationRules.reduce((sum, r) => sum + r.successRate, 0) / automationRules.length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">🤖 Advanced Automation</h2>
              <p className="text-orange-100 mt-1">Workflow automation, smart triggers, and AI-powered automation</p>
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
          {/* Automation Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Automation Rules</p>
                  <p className="text-2xl font-bold text-orange-800">{totalRules}</p>
                  <p className="text-xs text-orange-600">{activeRules} active</p>
                </div>
                <div className="text-3xl">⚙️</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Success Rate</p>
                  <p className="text-2xl font-bold text-green-800">{(avgSuccessRate * 100).toFixed(0)}%</p>
                  <p className="text-xs text-green-600">Average</p>
                </div>
                <div className="text-3xl">📈</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Executions</p>
                  <p className="text-2xl font-bold text-blue-800">{totalExecutions}</p>
                  <p className="text-xs text-blue-600">{successfulExecutions} successful</p>
                </div>
                <div className="text-3xl">🚀</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Templates</p>
                  <p className="text-2xl font-bold text-purple-800">{workflowTemplates.length}</p>
                  <p className="text-xs text-purple-600">Available</p>
                </div>
                <div className="text-3xl">📋</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-teal-600 font-medium">Smart Triggers</p>
                  <p className="text-2xl font-bold text-teal-800">{smartTriggers.length}</p>
                  <p className="text-xs text-teal-600">AI-powered</p>
                </div>
                <div className="text-3xl">🧠</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Automation management
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={createAutomationRule}
                  disabled={isCreatingRule}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 transition-colors"
                >
                  {isCreatingRule ? '⏳ Creating...' : '⚙️ Create Rule'}
                </button>
                <button
                  onClick={createWorkflowTemplate}
                  disabled={isCreatingTemplate}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 transition-colors"
                >
                  {isCreatingTemplate ? '⏳ Creating...' : '📋 New Template'}
                </button>
              </div>
            </div>
          </div>

          {/* Automation Rules */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Automation Rules ({automationRules.length})</h3>
            <div className="space-y-4">
              {automationRules.map((rule) => (
                <div key={rule.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{rule.name}</h4>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(rule.status)}`}>
                        {rule.status}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(rule.trigger.type)}`}>
                        {rule.trigger.type}
                      </span>
                      <button
                        onClick={() => testRule(rule.id)}
                        disabled={isTestingRule}
                        className="px-2 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                      >
                        Test
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">{rule.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-sm">
                        <span className="text-gray-600">Trigger:</span>
                        <span className="font-medium text-gray-900 ml-1">{rule.trigger.condition}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Executions:</span>
                        <span className="font-medium text-gray-900 ml-1">{rule.executionCount}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Success Rate:</span>
                        <span className="font-medium text-green-600 ml-1">{(rule.successRate * 100).toFixed(0)}%</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Actions:</span>
                        <span className="font-medium text-gray-900 ml-1">{rule.actions.length}</span>
                      </div>
                    </div>
                    
                    {rule.lastRun && (
                      <div className="text-sm">
                        <span className="text-gray-600">Last Run:</span>
                        <span className="text-gray-500 ml-1">{formatDate(rule.lastRun)}</span>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-1 mt-2">
                      {rule.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Workflow Templates */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Workflow Templates ({workflowTemplates.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {workflowTemplates.map((template) => (
                <div key={template.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{template.name}</h4>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(template.category)}`}>
                        {template.category}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getComplexityColor(template.complexity)}`}>
                        {template.complexity}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">{template.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-sm">
                        <span className="text-gray-600">Time:</span>
                        <span className="font-medium text-gray-900 ml-1">{template.estimatedTime}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Popularity:</span>
                        <span className="font-medium text-gray-900 ml-1">{template.popularity}%</span>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="text-sm font-medium text-gray-700 mb-1">Use Cases:</div>
                      <div className="flex flex-wrap gap-1">
                        {template.useCases.map((useCase, index) => (
                          <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                            {useCase}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Smart Triggers */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Smart Triggers ({smartTriggers.length})</h3>
            <div className="space-y-4">
              {smartTriggers.map((trigger) => (
                <div key={trigger.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{trigger.name}</h4>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(trigger.type)}`}>
                        {trigger.type}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${trigger.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {trigger.isActive ? 'active' : 'inactive'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">{trigger.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-sm">
                        <span className="text-gray-600">Confidence:</span>
                        <span className="font-medium text-blue-600 ml-1">{(trigger.confidence * 100).toFixed(0)}%</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Accuracy:</span>
                        <span className="font-medium text-green-600 ml-1">{(trigger.accuracy * 100).toFixed(0)}%</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Triggers:</span>
                        <span className="font-medium text-gray-900 ml-1">{trigger.triggerCount}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Conditions:</span>
                        <span className="font-medium text-gray-900 ml-1">{trigger.conditions.length}</span>
                      </div>
                    </div>
                    
                    {trigger.lastTriggered && (
                      <div className="text-sm">
                        <span className="text-gray-600">Last Triggered:</span>
                        <span className="text-gray-500 ml-1">{formatDate(trigger.lastTriggered)}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Executions */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Recent Executions ({automationExecutions.length})</h3>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rule</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {automationExecutions.map((execution) => (
                    <tr key={execution.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{execution.ruleName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(execution.status)}`}>
                          {execution.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {execution.duration ? formatDuration(execution.duration) : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {execution.actions.length}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(execution.startTime)}
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

export default AdvancedAutomation;
