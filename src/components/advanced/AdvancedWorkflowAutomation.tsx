import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WorkflowStep {
  id: string;
  name: string;
  type: 'trigger' | 'action' | 'condition' | 'delay' | 'notification' | 'integration';
  description: string;
  config: Record<string, any>;
  position: { x: number; y: number };
  connections: string[];
}

interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'draft' | 'error';
  steps: WorkflowStep[];
  triggers: WorkflowTrigger[];
  executions: WorkflowExecution[];
  createdAt: Date;
  lastModified: Date;
  createdBy: string;
  tags: string[];
}

interface WorkflowTrigger {
  id: string;
  name: string;
  type: 'schedule' | 'event' | 'webhook' | 'manual' | 'api';
  config: Record<string, any>;
  enabled: boolean;
}

interface WorkflowExecution {
  id: string;
  workflowId: string;
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  startTime: Date;
  endTime: Date | null;
  duration: number;
  stepsExecuted: number;
  totalSteps: number;
  errorMessage: string | null;
  data: Record<string, any>;
}

interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: 'productivity' | 'marketing' | 'sales' | 'support' | 'hr' | 'finance';
  complexity: 'simple' | 'intermediate' | 'advanced';
  estimatedTime: number;
  steps: Partial<WorkflowStep>[];
  usage: number;
  rating: number;
}

const AdvancedWorkflowAutomation: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [templates, setTemplates] = useState<WorkflowTemplate[]>([]);
  const [executions, setExecutions] = useState<WorkflowExecution[]>([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isCreatingWorkflow, setIsCreatingWorkflow] = useState(false);
  const [isExecutingWorkflow, setIsExecutingWorkflow] = useState(false);

  // Generate workflow data
  useEffect(() => {
    const generateWorkflows = (): Workflow[] => {
      const workflowData = [
        {
          name: 'Task Assignment Automation',
          description: 'Automatically assign tasks based on team member availability and skills',
          status: 'active' as const,
          tags: ['productivity', 'team-management'],
          createdBy: 'admin'
        },
        {
          name: 'Project Status Notifications',
          description: 'Send notifications when project milestones are reached or delayed',
          status: 'active' as const,
          tags: ['notifications', 'project-management'],
          createdBy: 'manager'
        },
        {
          name: 'Budget Alert System',
          description: 'Monitor budget usage and send alerts when thresholds are exceeded',
          status: 'active' as const,
          tags: ['finance', 'alerts'],
          createdBy: 'finance-team'
        },
        {
          name: 'Client Onboarding Flow',
          description: 'Automated client onboarding process with document collection',
          status: 'draft' as const,
          tags: ['onboarding', 'client-management'],
          createdBy: 'sales-team'
        },
        {
          name: 'Performance Review Automation',
          description: 'Schedule and manage employee performance reviews',
          status: 'inactive' as const,
          tags: ['hr', 'performance'],
          createdBy: 'hr-team'
        }
      ];

      return workflowData.map((workflow, index) => {
        const steps: WorkflowStep[] = [];
        const stepCount = Math.floor(Math.random() * 8) + 3;
        
        for (let i = 0; i < stepCount; i++) {
          const stepTypes: WorkflowStep['type'][] = ['trigger', 'action', 'condition', 'delay', 'notification', 'integration'];
          const stepType = stepTypes[Math.floor(Math.random() * stepTypes.length)];
          
          steps.push({
            id: `step-${index}-${i}`,
            name: `Step ${i + 1}`,
            type: stepType,
            description: `${stepType} step for ${workflow.name}`,
            config: { enabled: true, timeout: 300 },
            position: { x: i * 200, y: 100 },
            connections: i < stepCount - 1 ? [`step-${index}-${i + 1}`] : []
          });
        }

        const triggers: WorkflowTrigger[] = [
          {
            id: `trigger-${index}`,
            name: 'Schedule Trigger',
            type: 'schedule',
            config: { frequency: 'daily', time: '09:00' },
            enabled: true
          }
        ];

        const executions: WorkflowExecution[] = [];
        for (let i = 0; i < Math.floor(Math.random() * 20) + 5; i++) {
          const statuses: WorkflowExecution['status'][] = ['running', 'completed', 'failed', 'cancelled'];
          const status = statuses[Math.floor(Math.random() * statuses.length)];
          const startTime = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000);
          const endTime = status === 'running' ? null : new Date(startTime.getTime() + Math.random() * 3600000);
          const duration = endTime ? endTime.getTime() - startTime.getTime() : 0;

          executions.push({
            id: `execution-${index}-${i}`,
            workflowId: `workflow-${index}`,
            status,
            startTime,
            endTime,
            duration,
            stepsExecuted: Math.floor(Math.random() * steps.length),
            totalSteps: steps.length,
            errorMessage: status === 'failed' ? 'Connection timeout' : null,
            data: { input: 'test data', output: 'processed data' }
          });
        }

        return {
          id: `workflow-${index}`,
          ...workflow,
          steps,
          triggers,
          executions,
          createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
          lastModified: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
        };
      });
    };

    const generateTemplates = (): WorkflowTemplate[] => {
      const templateData = [
        {
          name: 'Email Marketing Campaign',
          description: 'Automated email marketing workflow with segmentation',
          category: 'marketing' as const,
          complexity: 'intermediate' as const,
          estimatedTime: 30,
          usage: 156,
          rating: 4.5
        },
        {
          name: 'Lead Qualification',
          description: 'Automatically qualify leads based on predefined criteria',
          category: 'sales' as const,
          complexity: 'advanced' as const,
          estimatedTime: 45,
          usage: 89,
          rating: 4.2
        },
        {
          name: 'Customer Support Ticket',
          description: 'Route and prioritize customer support tickets',
          category: 'support' as const,
          complexity: 'simple' as const,
          estimatedTime: 15,
          usage: 234,
          rating: 4.7
        },
        {
          name: 'Employee Onboarding',
          description: 'Complete employee onboarding process automation',
          category: 'hr' as const,
          complexity: 'advanced' as const,
          estimatedTime: 60,
          usage: 67,
          rating: 4.3
        },
        {
          name: 'Invoice Processing',
          description: 'Automated invoice processing and approval workflow',
          category: 'finance' as const,
          complexity: 'intermediate' as const,
          estimatedTime: 25,
          usage: 123,
          rating: 4.4
        },
        {
          name: 'Content Publishing',
          description: 'Automated content publishing across multiple channels',
          category: 'marketing' as const,
          complexity: 'intermediate' as const,
          estimatedTime: 20,
          usage: 178,
          rating: 4.6
        }
      ];

      return templateData.map((template, index) => ({
        id: `template-${index}`,
        ...template,
        steps: Array.from({ length: Math.floor(Math.random() * 6) + 3 }, (_, i) => ({
          id: `template-step-${i}`,
          name: `Template Step ${i + 1}`,
          type: 'action' as const,
          description: `Template step ${i + 1}`
        }))
      }));
    };

    const workflows = generateWorkflows();
    const templates = generateTemplates();
    
    setWorkflows(workflows);
    setTemplates(templates);
    setExecutions(workflows.flatMap(w => w.executions));
  }, []);

  const filteredWorkflows = workflows.filter(workflow => 
    (selectedWorkflow === 'all' || workflow.id === selectedWorkflow) &&
    (selectedStatus === 'all' || workflow.status === selectedStatus)
  );

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString();
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getExecutionStatusColor = (status: string): string => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'running': return 'bg-blue-100 text-blue-800';
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

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'productivity': return 'bg-blue-100 text-blue-800';
      case 'marketing': return 'bg-purple-100 text-purple-800';
      case 'sales': return 'bg-green-100 text-green-800';
      case 'support': return 'bg-orange-100 text-orange-800';
      case 'hr': return 'bg-pink-100 text-pink-800';
      case 'finance': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStepTypeIcon = (type: string): string => {
    switch (type) {
      case 'trigger': return '⚡';
      case 'action': return '🔧';
      case 'condition': return '❓';
      case 'delay': return '⏱️';
      case 'notification': return '📢';
      case 'integration': return '🔗';
      default: return '📋';
    }
  };

  const createWorkflow = async () => {
    setIsCreatingWorkflow(true);
    
    // Simulate workflow creation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newWorkflow: Workflow = {
      id: `workflow-${Date.now()}`,
      name: 'New Workflow',
      description: 'Custom workflow created from template',
      status: 'draft',
      steps: [],
      triggers: [],
      executions: [],
      createdAt: new Date(),
      lastModified: new Date(),
      createdBy: 'current-user',
      tags: ['custom']
    };

    setWorkflows(prev => [newWorkflow, ...prev]);
    setIsCreatingWorkflow(false);
  };

  const executeWorkflow = async (workflowId: string) => {
    setIsExecutingWorkflow(true);
    
    // Simulate workflow execution
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const workflow = workflows.find(w => w.id === workflowId);
    if (workflow) {
      const newExecution: WorkflowExecution = {
        id: `execution-${Date.now()}`,
        workflowId,
        status: 'completed',
        startTime: new Date(),
        endTime: new Date(),
        duration: 3000,
        stepsExecuted: workflow.steps.length,
        totalSteps: workflow.steps.length,
        errorMessage: null,
        data: { result: 'success' }
      };

      setExecutions(prev => [newExecution, ...prev]);
    }
    
    setIsExecutingWorkflow(false);
  };

  const toggleWorkflowStatus = (workflowId: string) => {
    setWorkflows(prev => prev.map(workflow => 
      workflow.id === workflowId 
        ? { 
            ...workflow, 
            status: workflow.status === 'active' ? 'inactive' : 'active',
            lastModified: new Date()
          }
        : workflow
    ));
  };

  const categories = [
    { key: 'all', label: 'All Categories', count: templates.length },
    { key: 'productivity', label: 'Productivity', count: templates.filter(t => t.category === 'productivity').length },
    { key: 'marketing', label: 'Marketing', count: templates.filter(t => t.category === 'marketing').length },
    { key: 'sales', label: 'Sales', count: templates.filter(t => t.category === 'sales').length },
    { key: 'support', label: 'Support', count: templates.filter(t => t.category === 'support').length },
    { key: 'hr', label: 'HR', count: templates.filter(t => t.category === 'hr').length },
    { key: 'finance', label: 'Finance', count: templates.filter(t => t.category === 'finance').length }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">⚙️ Advanced Workflow Automation</h2>
              <p className="text-purple-100 mt-1">Complex business process automation and orchestration</p>
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
          {/* Workflow Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Active Workflows</p>
                  <p className="text-2xl font-bold text-blue-800">
                    {workflows.filter(w => w.status === 'active').length}
                  </p>
                </div>
                <div className="text-3xl">⚙️</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Templates</p>
                  <p className="text-2xl font-bold text-green-800">{templates.length}</p>
                </div>
                <div className="text-3xl">📋</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Executions</p>
                  <p className="text-2xl font-bold text-purple-800">{executions.length}</p>
                </div>
                <div className="text-3xl">🚀</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Success Rate</p>
                  <p className="text-2xl font-bold text-orange-800">
                    {((executions.filter(e => e.status === 'completed').length / executions.length) * 100).toFixed(0)}%
                  </p>
                </div>
                <div className="text-3xl">✅</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 font-medium">Avg Duration</p>
                  <p className="text-2xl font-bold text-red-800">
                    {(executions.reduce((sum, e) => sum + e.duration, 0) / executions.length / 1000).toFixed(0)}s
                  </p>
                </div>
                <div className="text-3xl">⏱️</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Status:</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="draft">Draft</option>
                    <option value="error">Error</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Workflow:</label>
                  <select
                    value={selectedWorkflow}
                    onChange={(e) => setSelectedWorkflow(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="all">All Workflows</option>
                    {workflows.map(workflow => (
                      <option key={workflow.id} value={workflow.id}>
                        {workflow.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={createWorkflow}
                  disabled={isCreatingWorkflow}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 transition-colors"
                >
                  {isCreatingWorkflow ? '⏳ Creating...' : '➕ Create Workflow'}
                </button>
              </div>
            </div>
          </div>

          {/* Workflow Templates */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Workflow Templates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((template) => (
                <div key={template.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{template.name}</h4>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(template.category)}`}>
                      {template.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Complexity:</span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getComplexityColor(template.complexity)}`}>
                        {template.complexity}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium text-blue-600">{template.estimatedTime} min</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Usage:</span>
                      <span className="font-medium text-green-600">{template.usage} times</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Rating:</span>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900">{template.rating}/5</span>
                        <div className="ml-2 flex">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-xs ${i < Math.floor(template.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                              ⭐
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Workflows */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Workflows ({filteredWorkflows.length})</h3>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Workflow</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Steps</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Executions</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredWorkflows.map((workflow) => (
                    <tr key={workflow.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{workflow.name}</div>
                          <div className="text-sm text-gray-500">{workflow.description}</div>
                          <div className="text-xs text-gray-400">
                            {workflow.tags.map(tag => `#${tag}`).join(' ')}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(workflow.status)}`}>
                          {workflow.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {workflow.steps.length}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {workflow.executions.length}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(workflow.lastModified)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => executeWorkflow(workflow.id)}
                            disabled={isExecutingWorkflow}
                            className="text-blue-600 hover:text-blue-900 disabled:opacity-50 transition-colors"
                          >
                            {isExecutingWorkflow ? 'Running...' : 'Execute'}
                          </button>
                          <button
                            onClick={() => toggleWorkflowStatus(workflow.id)}
                            className={`transition-colors ${
                              workflow.status === 'active' 
                                ? 'text-red-600 hover:text-red-900' 
                                : 'text-green-600 hover:text-green-900'
                            }`}
                          >
                            {workflow.status === 'active' ? 'Disable' : 'Enable'}
                          </button>
                        </div>
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

export default AdvancedWorkflowAutomation;
