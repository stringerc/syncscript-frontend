/**
 * Intelligent Automation Engine Component
 * 
 * Workflow automation, smart notifications, and intelligent task management
 * Includes rule-based automation, smart triggers, and automated workflows
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AutomationRule {
  id: string;
  name: string;
  description: string;
  trigger: AutomationTrigger;
  conditions: AutomationCondition[];
  actions: AutomationAction[];
  status: 'active' | 'inactive' | 'error';
  lastExecuted?: string;
  executionCount: number;
  successRate: number;
}

interface AutomationTrigger {
  type: 'time' | 'event' | 'condition' | 'webhook' | 'schedule';
  config: Record<string, any>;
}

interface AutomationCondition {
  field: string;
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than' | 'between' | 'exists';
  value: any;
}

interface AutomationAction {
  type: 'create_task' | 'send_notification' | 'update_status' | 'schedule_meeting' | 'send_email' | 'webhook_call';
  config: Record<string, any>;
}

interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: 'productivity' | 'communication' | 'scheduling' | 'monitoring' | 'integration';
  triggers: string[];
  actions: string[];
  complexity: 'simple' | 'intermediate' | 'advanced';
  popularity: number;
}

interface IntelligentAutomationEngineProps {
  onClose: () => void;
}

const IntelligentAutomationEngine: React.FC<IntelligentAutomationEngineProps> = ({ onClose }) => {
  const [automationRules, setAutomationRules] = useState<AutomationRule[]>([]);
  const [workflowTemplates, setWorkflowTemplates] = useState<WorkflowTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'rules' | 'templates' | 'executions' | 'builder'>('rules');
  const [isCreatingRule, setIsCreatingRule] = useState(false);

  useEffect(() => {
    loadAutomationData();
  }, []);

  const loadAutomationData = async () => {
    setIsLoading(true);
    
    try {
      // Mock automation rules
      const mockRules: AutomationRule[] = [
        {
          id: 'rule-1',
          name: 'Morning Task Creation',
          description: 'Automatically create daily standup task every weekday at 9 AM',
          trigger: {
            type: 'schedule',
            config: { time: '09:00', days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'] }
          },
          conditions: [
            { field: 'day_of_week', operator: 'equals', value: 'weekday' }
          ],
          actions: [
            {
              type: 'create_task',
              config: {
                title: 'Daily Standup Meeting',
                description: 'Team synchronization and progress updates',
                priority: 3,
                category: 'Meetings'
              }
            }
          ],
          status: 'active',
          lastExecuted: new Date(Date.now() - 3600000).toISOString(),
          executionCount: 45,
          successRate: 0.98
        },
        {
          id: 'rule-2',
          name: 'High Priority Alert',
          description: 'Send notification when high priority task is created',
          trigger: {
            type: 'event',
            config: { event: 'task_created' }
          },
          conditions: [
            { field: 'task.priority', operator: 'greater_than', value: 4 }
          ],
          actions: [
            {
              type: 'send_notification',
              config: {
                message: 'High priority task created: {{task.title}}',
                channels: ['email', 'push', 'slack']
              }
            }
          ],
          status: 'active',
          lastExecuted: new Date(Date.now() - 1800000).toISOString(),
          executionCount: 12,
          successRate: 1.0
        },
        {
          id: 'rule-3',
          name: 'Energy Level Optimization',
          description: 'Suggest break when energy level drops below 3',
          trigger: {
            type: 'condition',
            config: { field: 'energy_level' }
          },
          conditions: [
            { field: 'energy_level', operator: 'less_than', value: 3 }
          ],
          actions: [
            {
              type: 'send_notification',
              config: {
                message: 'Your energy is low. Consider taking a break or switching to lighter tasks.',
                channels: ['push']
              }
            }
          ],
          status: 'active',
          lastExecuted: new Date(Date.now() - 900000).toISOString(),
          executionCount: 8,
          successRate: 0.88
        }
      ];

      // Mock workflow templates
      const mockTemplates: WorkflowTemplate[] = [
        {
          id: 'template-1',
          name: 'Daily Standup Automation',
          description: 'Automatically create and manage daily standup meetings',
          category: 'productivity',
          triggers: ['schedule', 'time'],
          actions: ['create_task', 'send_notification', 'schedule_meeting'],
          complexity: 'simple',
          popularity: 95
        },
        {
          id: 'template-2',
          name: 'Project Deadline Alert',
          description: 'Send alerts when project deadlines are approaching',
          category: 'monitoring',
          triggers: ['time', 'condition'],
          actions: ['send_notification', 'send_email', 'create_task'],
          complexity: 'intermediate',
          popularity: 87
        },
        {
          id: 'template-3',
          name: 'Slack Integration',
          description: 'Sync tasks and updates with Slack channels',
          category: 'integration',
          triggers: ['event', 'webhook'],
          actions: ['webhook_call', 'send_notification'],
          complexity: 'advanced',
          popularity: 72
        },
        {
          id: 'template-4',
          name: 'Email Follow-up',
          description: 'Automatically follow up on pending tasks via email',
          category: 'communication',
          triggers: ['time', 'condition'],
          actions: ['send_email', 'update_status'],
          complexity: 'intermediate',
          popularity: 68
        }
      ];

      setAutomationRules(mockRules);
      setWorkflowTemplates(mockTemplates);
    } catch (error) {
      console.error('Failed to load automation data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createAutomationRule = async (rule: Omit<AutomationRule, 'id' | 'executionCount' | 'successRate'>) => {
    setIsCreatingRule(true);
    
    try {
      const newRule: AutomationRule = {
        ...rule,
        id: `rule_${Date.now()}`,
        executionCount: 0,
        successRate: 1.0
      };
      
      setAutomationRules(prev => [...prev, newRule]);
    } catch (error) {
      console.error('Failed to create automation rule:', error);
    } finally {
      setIsCreatingRule(false);
    }
  };

  const toggleRuleStatus = async (ruleId: string) => {
    try {
      setAutomationRules(prev => prev.map(rule => 
        rule.id === ruleId 
          ? { ...rule, status: rule.status === 'active' ? 'inactive' : 'active' }
          : rule
      ));
    } catch (error) {
      console.error('Failed to toggle rule status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'simple': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'productivity': return '📊';
      case 'communication': return '💬';
      case 'scheduling': return '📅';
      case 'monitoring': return '👁️';
      case 'integration': return '🔗';
      default: return '⚙️';
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading automation engine...</span>
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
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Intelligent Automation Engine</h2>
              <p className="text-blue-100 mt-1">Workflow automation, smart notifications, and intelligent task management</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Rules:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {automationRules.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Active:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {automationRules.filter(r => r.status === 'active').length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Templates:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {workflowTemplates.length}
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
              { id: 'rules', name: 'Automation Rules', icon: '⚙️' },
              { id: 'templates', name: 'Templates', icon: '📋' },
              { id: 'executions', name: 'Executions', icon: '📊' },
              { id: 'builder', name: 'Rule Builder', icon: '🔧' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all ${
                  selectedTab === tab.id
                    ? 'border-blue-500 text-blue-600'
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
          {selectedTab === 'rules' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Automation Rules</h3>
                <button
                  onClick={() => {
                    createAutomationRule({
                      name: 'New Automation Rule',
                      description: 'Custom automation rule',
                      trigger: { type: 'time', config: {} },
                      conditions: [],
                      actions: [],
                      status: 'inactive'
                    });
                  }}
                  disabled={isCreatingRule}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isCreatingRule ? 'Creating...' : 'Create Rule'}
                </button>
              </div>
              
              <div className="space-y-4">
                {automationRules.map((rule) => (
                  <motion.div
                    key={rule.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{rule.name}</h4>
                        <p className="text-sm text-gray-600">{rule.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span>🔄 Executions: {rule.executionCount}</span>
                          <span>✅ Success Rate: {Math.round(rule.successRate * 100)}%</span>
                          <span>🕒 Last Run: {rule.lastExecuted ? new Date(rule.lastExecuted).toLocaleString() : 'Never'}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(rule.status)}`}>
                          {rule.status.toUpperCase()}
                        </span>
                        <button
                          onClick={() => toggleRuleStatus(rule.id)}
                          className={`px-3 py-1 rounded text-sm transition-all ${
                            rule.status === 'active' 
                              ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                          }`}
                        >
                          {rule.status === 'active' ? 'Disable' : 'Enable'}
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="font-medium text-gray-700 mb-1">Trigger:</div>
                        <div className="text-gray-600">{rule.trigger.type}</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-700 mb-1">Conditions:</div>
                        <div className="text-gray-600">{rule.conditions.length} condition{rule.conditions.length !== 1 ? 's' : ''}</div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-700 mb-1">Actions:</div>
                        <div className="text-gray-600">{rule.actions.length} action{rule.actions.length !== 1 ? 's' : ''}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'templates' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Workflow Templates</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {workflowTemplates.map((template) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-3xl">{getCategoryIcon(template.category)}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{template.name}</h4>
                        <p className="text-sm text-gray-600">{template.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Complexity:</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getComplexityColor(template.complexity)}`}>
                          {template.complexity.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Popularity:</span>
                        <span className="text-sm font-medium text-gray-900">{template.popularity}%</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-1">Triggers:</div>
                        <div className="text-xs text-gray-600">{template.triggers.join(', ')}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-1">Actions:</div>
                        <div className="text-xs text-gray-600">{template.actions.join(', ')}</div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center space-x-2">
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                        Use Template
                      </button>
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all">
                        Preview
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'executions' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Execution History</h3>
              
              <div className="space-y-4">
                {automationRules.map((rule) => (
                  <div key={rule.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">{rule.name}</h4>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(rule.status)}`}>
                        {rule.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Total Executions:</span>
                        <span className="ml-2 text-gray-900">{rule.executionCount}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Success Rate:</span>
                        <span className="ml-2 text-gray-900">{Math.round(rule.successRate * 100)}%</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Last Executed:</span>
                        <span className="ml-2 text-gray-900">
                          {rule.lastExecuted ? new Date(rule.lastExecuted).toLocaleString() : 'Never'}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Next Execution:</span>
                        <span className="ml-2 text-gray-900">
                          {rule.status === 'active' ? 'Scheduled' : 'Disabled'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'builder' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Rule Builder</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">Trigger Configuration</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Trigger Type</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option value="time">Time-based</option>
                        <option value="event">Event-based</option>
                        <option value="condition">Condition-based</option>
                        <option value="webhook">Webhook</option>
                        <option value="schedule">Schedule</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Configuration</label>
                      <textarea
                        rows={3}
                        placeholder='{"time": "09:00", "days": ["monday", "tuesday"]}'
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">Action Configuration</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Action Type</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option value="create_task">Create Task</option>
                        <option value="send_notification">Send Notification</option>
                        <option value="update_status">Update Status</option>
                        <option value="schedule_meeting">Schedule Meeting</option>
                        <option value="send_email">Send Email</option>
                        <option value="webhook_call">Webhook Call</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Action Configuration</label>
                      <textarea
                        rows={3}
                        placeholder='{"title": "Task Title", "priority": 3}'
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Create Automation Rule
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Intelligent Automation Engine • {automationRules.filter(r => r.status === 'active').length} active rules • {workflowTemplates.length} templates
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
                console.log('Exporting automation data...');
              }}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all"
            >
              Export Data
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default IntelligentAutomationEngine;
