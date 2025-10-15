/**
 * Advanced Workflow Automation Manager
 * 
 * Comprehensive utility for managing complex business process automation,
 * workflow orchestration, step management, trigger systems, execution tracking,
 * template management, and analytics for enterprise workflow automation.
 */

export interface WorkflowStep {
  id: string;
  name: string;
  type: 'trigger' | 'action' | 'condition' | 'delay' | 'notification' | 'integration';
  description: string;
  config: Record<string, any>;
  position: { x: number; y: number };
  connections: string[];
  enabled: boolean;
  timeout: number;
  retries: number;
  errorHandling: 'continue' | 'stop' | 'retry';
  dependencies: string[];
}

export interface WorkflowTrigger {
  id: string;
  name: string;
  type: 'schedule' | 'event' | 'webhook' | 'manual' | 'api' | 'file' | 'database';
  config: Record<string, any>;
  enabled: boolean;
  conditions?: {
    field: string;
    operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than';
    value: any;
  }[];
  lastTriggered?: Date;
  nextTrigger?: Date;
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  status: 'running' | 'completed' | 'failed' | 'cancelled' | 'paused';
  startTime: Date;
  endTime: Date | null;
  duration: number;
  stepsExecuted: number;
  totalSteps: number;
  errorMessage: string | null;
  data: Record<string, any>;
  triggeredBy: string;
  context: {
    userId?: string;
    sessionId?: string;
    requestId?: string;
    environment?: string;
  };
  logs: {
    timestamp: Date;
    level: 'info' | 'warning' | 'error' | 'debug';
    message: string;
    data?: any;
  }[];
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'draft' | 'error' | 'paused';
  version: number;
  steps: WorkflowStep[];
  triggers: WorkflowTrigger[];
  executions: WorkflowExecution[];
  createdAt: Date;
  lastModified: Date;
  createdBy: string;
  tags: string[];
  category: 'productivity' | 'marketing' | 'sales' | 'support' | 'hr' | 'finance' | 'development' | 'maintenance';
  priority: 'low' | 'medium' | 'high' | 'critical';
  permissions: {
    execute: string[];
    edit: string[];
    view: string[];
  };
  settings: {
    maxConcurrentExecutions: number;
    timeoutMinutes: number;
    retryAttempts: number;
    errorNotification: boolean;
    successNotification: boolean;
  };
  metrics: {
    totalExecutions: number;
    successRate: number;
    averageDuration: number;
    lastExecution: Date | null;
  };
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: 'productivity' | 'marketing' | 'sales' | 'support' | 'hr' | 'finance' | 'development' | 'maintenance';
  complexity: 'simple' | 'intermediate' | 'advanced';
  estimatedTime: number;
  steps: Partial<WorkflowStep>[];
  triggers: Partial<WorkflowTrigger>[];
  usage: number;
  rating: number;
  createdBy: string;
  isPublic: boolean;
  tags: string[];
  variables: {
    name: string;
    type: 'string' | 'number' | 'boolean' | 'object' | 'array';
    description: string;
    required: boolean;
    defaultValue?: any;
  }[];
}

export interface WorkflowIntegration {
  id: string;
  name: string;
  provider: string;
  type: 'api' | 'webhook' | 'database' | 'file' | 'email' | 'sms' | 'chat';
  config: Record<string, any>;
  status: 'connected' | 'disconnected' | 'error';
  lastTested: Date;
  capabilities: string[];
  documentation: string;
}

export interface WorkflowAnalytics {
  workflowId: string;
  period: 'day' | 'week' | 'month' | 'quarter' | 'year';
  executions: {
    total: number;
    successful: number;
    failed: number;
    cancelled: number;
  };
  performance: {
    averageDuration: number;
    minDuration: number;
    maxDuration: number;
    p95Duration: number;
  };
  errors: {
    total: number;
    byType: Record<string, number>;
    byStep: Record<string, number>;
  };
  trends: {
    executionCount: number[];
    successRate: number[];
    averageDuration: number[];
    timestamps: Date[];
  };
}

export interface WorkflowCondition {
  id: string;
  name: string;
  type: 'data' | 'time' | 'system' | 'external';
  expression: string;
  operator: 'AND' | 'OR';
  conditions: {
    field: string;
    operator: 'equals' | 'not_equals' | 'contains' | 'starts_with' | 'ends_with' | 'greater_than' | 'less_than' | 'in' | 'not_in';
    value: any;
  }[];
}

export class AdvancedWorkflowAutomationManager {
  private workflows: Workflow[] = [];
  private templates: WorkflowTemplate[] = [];
  private executions: WorkflowExecution[] = [];
  private integrations: WorkflowIntegration[] = [];
  private conditions: WorkflowCondition[] = [];
  private isInitialized = false;

  constructor() {
    this.initialize();
  }

  private async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      await this.loadData();
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize Advanced Workflow Automation Manager:', error);
    }
  }

  // Workflow Management
  async createWorkflow(workflowData: Omit<Workflow, 'id' | 'createdAt' | 'lastModified' | 'version' | 'executions' | 'metrics'>): Promise<Workflow> {
    await this.initialize();

    const newWorkflow: Workflow = {
      ...workflowData,
      id: this.generateId(),
      version: 1,
      createdAt: new Date(),
      lastModified: new Date(),
      executions: [],
      metrics: {
        totalExecutions: 0,
        successRate: 0,
        averageDuration: 0,
        lastExecution: null
      }
    };

    this.workflows.push(newWorkflow);
    await this.saveData();
    return newWorkflow;
  }

  async updateWorkflow(workflowId: string, updates: Partial<Workflow>): Promise<Workflow | null> {
    await this.initialize();

    const workflowIndex = this.workflows.findIndex(workflow => workflow.id === workflowId);
    if (workflowIndex === -1) return null;

    const currentWorkflow = this.workflows[workflowIndex];
    this.workflows[workflowIndex] = {
      ...currentWorkflow,
      ...updates,
      version: currentWorkflow.version + 1,
      lastModified: new Date()
    };

    await this.saveData();
    return this.workflows[workflowIndex];
  }

  async deleteWorkflow(workflowId: string): Promise<boolean> {
    await this.initialize();

    const workflowIndex = this.workflows.findIndex(workflow => workflow.id === workflowId);
    if (workflowIndex === -1) return false;

    this.workflows.splice(workflowIndex, 1);
    
    // Remove related executions
    this.executions = this.executions.filter(execution => execution.workflowId !== workflowId);
    
    await this.saveData();
    return true;
  }

  async getAllWorkflows(): Promise<Workflow[]> {
    await this.initialize();
    return [...this.workflows];
  }

  async getWorkflowById(workflowId: string): Promise<Workflow | null> {
    await this.initialize();
    return this.workflows.find(workflow => workflow.id === workflowId) || null;
  }

  async getWorkflowsByStatus(status: string): Promise<Workflow[]> {
    await this.initialize();
    return this.workflows.filter(workflow => workflow.status === status);
  }

  async getWorkflowsByCategory(category: string): Promise<Workflow[]> {
    await this.initialize();
    return this.workflows.filter(workflow => workflow.category === category);
  }

  // Workflow Step Management
  async addWorkflowStep(workflowId: string, stepData: Omit<WorkflowStep, 'id'>): Promise<WorkflowStep | null> {
    await this.initialize();

    const workflow = await this.getWorkflowById(workflowId);
    if (!workflow) return null;

    const newStep: WorkflowStep = {
      ...stepData,
      id: this.generateId()
    };

    workflow.steps.push(newStep);
    workflow.lastModified = new Date();
    workflow.version++;

    await this.saveData();
    return newStep;
  }

  async updateWorkflowStep(workflowId: string, stepId: string, updates: Partial<WorkflowStep>): Promise<WorkflowStep | null> {
    await this.initialize();

    const workflow = await this.getWorkflowById(workflowId);
    if (!workflow) return null;

    const stepIndex = workflow.steps.findIndex(step => step.id === stepId);
    if (stepIndex === -1) return null;

    workflow.steps[stepIndex] = { ...workflow.steps[stepIndex], ...updates };
    workflow.lastModified = new Date();
    workflow.version++;

    await this.saveData();
    return workflow.steps[stepIndex];
  }

  async deleteWorkflowStep(workflowId: string, stepId: string): Promise<boolean> {
    await this.initialize();

    const workflow = await this.getWorkflowById(workflowId);
    if (!workflow) return false;

    const stepIndex = workflow.steps.findIndex(step => step.id === stepId);
    if (stepIndex === -1) return false;

    workflow.steps.splice(stepIndex, 1);
    workflow.lastModified = new Date();
    workflow.version++;

    await this.saveData();
    return true;
  }

  // Workflow Trigger Management
  async addWorkflowTrigger(workflowId: string, triggerData: Omit<WorkflowTrigger, 'id'>): Promise<WorkflowTrigger | null> {
    await this.initialize();

    const workflow = await this.getWorkflowById(workflowId);
    if (!workflow) return null;

    const newTrigger: WorkflowTrigger = {
      ...triggerData,
      id: this.generateId()
    };

    workflow.triggers.push(newTrigger);
    workflow.lastModified = new Date();
    workflow.version++;

    await this.saveData();
    return newTrigger;
  }

  async updateWorkflowTrigger(workflowId: string, triggerId: string, updates: Partial<WorkflowTrigger>): Promise<WorkflowTrigger | null> {
    await this.initialize();

    const workflow = await this.getWorkflowById(workflowId);
    if (!workflow) return null;

    const triggerIndex = workflow.triggers.findIndex(trigger => trigger.id === triggerId);
    if (triggerIndex === -1) return null;

    workflow.triggers[triggerIndex] = { ...workflow.triggers[triggerIndex], ...updates };
    workflow.lastModified = new Date();
    workflow.version++;

    await this.saveData();
    return workflow.triggers[triggerIndex];
  }

  async deleteWorkflowTrigger(workflowId: string, triggerId: string): Promise<boolean> {
    await this.initialize();

    const workflow = await this.getWorkflowById(workflowId);
    if (!workflow) return false;

    const triggerIndex = workflow.triggers.findIndex(trigger => trigger.id === triggerId);
    if (triggerIndex === -1) return false;

    workflow.triggers.splice(triggerIndex, 1);
    workflow.lastModified = new Date();
    workflow.version++;

    await this.saveData();
    return true;
  }

  // Workflow Execution Management
  async startWorkflowExecution(workflowId: string, context: any, triggeredBy: string = 'system'): Promise<WorkflowExecution> {
    await this.initialize();

    const workflow = await this.getWorkflowById(workflowId);
    if (!workflow) {
      throw new Error(`Workflow ${workflowId} not found`);
    }

    const execution: WorkflowExecution = {
      id: this.generateId(),
      workflowId,
      status: 'running',
      startTime: new Date(),
      endTime: null,
      duration: 0,
      stepsExecuted: 0,
      totalSteps: workflow.steps.length,
      errorMessage: null,
      data: { input: context },
      triggeredBy,
      context: {
        userId: context.userId,
        sessionId: context.sessionId,
        requestId: context.requestId,
        environment: context.environment || 'production'
      },
      logs: [{
        timestamp: new Date(),
        level: 'info',
        message: `Workflow execution started by ${triggeredBy}`
      }]
    };

    this.executions.push(execution);
    
    // Add execution to workflow
    workflow.executions.push(execution);
    workflow.lastModified = new Date();
    
    await this.saveData();
    return execution;
  }

  async updateWorkflowExecution(executionId: string, updates: Partial<WorkflowExecution>): Promise<WorkflowExecution | null> {
    await this.initialize();

    const executionIndex = this.executions.findIndex(execution => execution.id === executionId);
    if (executionIndex === -1) return null;

    this.executions[executionIndex] = { ...this.executions[executionIndex], ...updates };
    
    // Update workflow metrics if execution is completed
    if (updates.status === 'completed' || updates.status === 'failed') {
      this.executions[executionIndex].endTime = new Date();
      this.executions[executionIndex].duration = this.executions[executionIndex].endTime.getTime() - this.executions[executionIndex].startTime.getTime();
      
      await this.updateWorkflowMetrics(this.executions[executionIndex].workflowId);
    }

    await this.saveData();
    return this.executions[executionIndex];
  }

  async getAllExecutions(): Promise<WorkflowExecution[]> {
    await this.initialize();
    return [...this.executions];
  }

  async getExecutionsByWorkflow(workflowId: string): Promise<WorkflowExecution[]> {
    await this.initialize();
    return this.executions.filter(execution => execution.workflowId === workflowId);
  }

  async getExecutionsByStatus(status: string): Promise<WorkflowExecution[]> {
    await this.initialize();
    return this.executions.filter(execution => execution.status === status);
  }

  // Workflow Template Management
  async createTemplate(templateData: Omit<WorkflowTemplate, 'id' | 'usage' | 'rating'>): Promise<WorkflowTemplate> {
    await this.initialize();

    const newTemplate: WorkflowTemplate = {
      ...templateData,
      id: this.generateId(),
      usage: 0,
      rating: 0
    };

    this.templates.push(newTemplate);
    await this.saveData();
    return newTemplate;
  }

  async getAllTemplates(): Promise<WorkflowTemplate[]> {
    await this.initialize();
    return [...this.templates];
  }

  async getTemplatesByCategory(category: string): Promise<WorkflowTemplate[]> {
    await this.initialize();
    return this.templates.filter(template => template.category === category);
  }

  async useTemplate(templateId: string, userId: string): Promise<Workflow | null> {
    await this.initialize();

    const template = this.templates.find(t => t.id === templateId);
    if (!template) return null;

    // Increment usage
    template.usage++;
    
    // Create workflow from template
    const workflow = await this.createWorkflow({
      name: `${template.name} (${new Date().toISOString().split('T')[0]})`,
      description: template.description,
      status: 'draft',
      steps: template.steps.map(step => ({
        ...step,
        id: this.generateId(),
        name: step.name || 'Unnamed Step',
        type: step.type || 'action',
        description: step.description || '',
        config: step.config || {},
        position: step.position || { x: 0, y: 0 },
        connections: step.connections || [],
        enabled: step.enabled !== undefined ? step.enabled : true,
        timeout: step.timeout || 300,
        retries: step.retries || 0,
        errorHandling: step.errorHandling || 'continue',
        dependencies: step.dependencies || []
      })) as WorkflowStep[],
      triggers: template.triggers.map(trigger => ({
        ...trigger,
        id: this.generateId(),
        name: trigger.name || 'Unnamed Trigger',
        type: trigger.type || 'manual',
        config: trigger.config || {},
        enabled: trigger.enabled !== undefined ? trigger.enabled : true
      })) as WorkflowTrigger[],
      createdBy: userId,
      tags: [...template.tags],
      category: template.category,
      priority: 'medium',
      permissions: {
        execute: [userId],
        edit: [userId],
        view: []
      },
      settings: {
        maxConcurrentExecutions: 5,
        timeoutMinutes: 30,
        retryAttempts: 3,
        errorNotification: true,
        successNotification: false
      }
    });

    await this.saveData();
    return workflow;
  }

  // Analytics and Metrics
  async getWorkflowAnalytics(workflowId: string, period: 'day' | 'week' | 'month' | 'quarter' | 'year' = 'month'): Promise<WorkflowAnalytics | null> {
    await this.initialize();

    const workflow = await this.getWorkflowById(workflowId);
    if (!workflow) return null;

    const executions = this.executions.filter(execution => execution.workflowId === workflowId);
    const periodStart = this.getPeriodStart(new Date(), period);
    const periodExecutions = executions.filter(execution => execution.startTime >= periodStart);

    const analytics: WorkflowAnalytics = {
      workflowId,
      period,
      executions: {
        total: periodExecutions.length,
        successful: periodExecutions.filter(e => e.status === 'completed').length,
        failed: periodExecutions.filter(e => e.status === 'failed').length,
        cancelled: periodExecutions.filter(e => e.status === 'cancelled').length
      },
      performance: {
        averageDuration: this.calculateAverage(periodExecutions.map(e => e.duration)),
        minDuration: Math.min(...periodExecutions.map(e => e.duration)),
        maxDuration: Math.max(...periodExecutions.map(e => e.duration)),
        p95Duration: this.calculatePercentile(periodExecutions.map(e => e.duration), 95)
      },
      errors: {
        total: periodExecutions.filter(e => e.status === 'failed').length,
        byType: {},
        byStep: {}
      },
      trends: {
        executionCount: [],
        successRate: [],
        averageDuration: [],
        timestamps: []
      }
    };

    return analytics;
  }

  async getWorkflowAutomationSummary(): Promise<{
    totalWorkflows: number;
    activeWorkflows: number;
    totalExecutions: number;
    successfulExecutions: number;
    failedExecutions: number;
    runningExecutions: number;
    totalTemplates: number;
    totalIntegrations: number;
    averageSuccessRate: number;
    averageExecutionTime: number;
    workflowsByCategory: Record<string, number>;
    executionsByStatus: Record<string, number>;
  }> {
    await this.initialize();

    const totalWorkflows = this.workflows.length;
    const activeWorkflows = this.workflows.filter(w => w.status === 'active').length;
    const totalExecutions = this.executions.length;
    const successfulExecutions = this.executions.filter(e => e.status === 'completed').length;
    const failedExecutions = this.executions.filter(e => e.status === 'failed').length;
    const runningExecutions = this.executions.filter(e => e.status === 'running').length;
    const totalTemplates = this.templates.length;
    const totalIntegrations = this.integrations.length;

    const averageSuccessRate = totalExecutions > 0 ? (successfulExecutions / totalExecutions) * 100 : 0;
    const averageExecutionTime = totalExecutions > 0 ? this.executions.reduce((sum, e) => sum + e.duration, 0) / totalExecutions : 0;

    const workflowsByCategory: Record<string, number> = {};
    this.workflows.forEach(workflow => {
      workflowsByCategory[workflow.category] = (workflowsByCategory[workflow.category] || 0) + 1;
    });

    const executionsByStatus: Record<string, number> = {};
    this.executions.forEach(execution => {
      executionsByStatus[execution.status] = (executionsByStatus[execution.status] || 0) + 1;
    });

    return {
      totalWorkflows,
      activeWorkflows,
      totalExecutions,
      successfulExecutions,
      failedExecutions,
      runningExecutions,
      totalTemplates,
      totalIntegrations,
      averageSuccessRate,
      averageExecutionTime,
      workflowsByCategory,
      executionsByStatus
    };
  }

  // Private Helper Methods
  private async updateWorkflowMetrics(workflowId: string): Promise<void> {
    const workflow = await this.getWorkflowById(workflowId);
    if (!workflow) return;

    const executions = this.executions.filter(e => e.workflowId === workflowId);
    const completedExecutions = executions.filter(e => e.status === 'completed');

    workflow.metrics = {
      totalExecutions: executions.length,
      successRate: executions.length > 0 ? (completedExecutions.length / executions.length) * 100 : 0,
      averageDuration: completedExecutions.length > 0 
        ? completedExecutions.reduce((sum, e) => sum + e.duration, 0) / completedExecutions.length 
        : 0,
      lastExecution: executions.length > 0 ? executions[executions.length - 1].startTime : null
    };

    await this.saveData();
  }

  private getPeriodStart(date: Date, period: string): Date {
    const result = new Date(date);
    
    switch (period) {
      case 'day':
        result.setHours(0, 0, 0, 0);
        break;
      case 'week':
        result.setDate(result.getDate() - 7);
        break;
      case 'month':
        result.setMonth(result.getMonth() - 1);
        break;
      case 'quarter':
        result.setMonth(result.getMonth() - 3);
        break;
      case 'year':
        result.setFullYear(result.getFullYear() - 1);
        break;
    }
    
    return result;
  }

  private calculateAverage(numbers: number[]): number {
    return numbers.length > 0 ? numbers.reduce((sum, num) => sum + num, 0) / numbers.length : 0;
  }

  private calculatePercentile(numbers: number[], percentile: number): number {
    if (numbers.length === 0) return 0;
    
    const sorted = [...numbers].sort((a, b) => a - b);
    const index = Math.ceil((percentile / 100) * sorted.length) - 1;
    return sorted[Math.max(0, Math.min(index, sorted.length - 1))];
  }

  // Data Management
  private async loadData(): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
      const savedWorkflows = localStorage.getItem('syncscript_workflows');
      const savedTemplates = localStorage.getItem('syncscript_workflow_templates');
      const savedExecutions = localStorage.getItem('syncscript_workflow_executions');
      const savedIntegrations = localStorage.getItem('syncscript_workflow_integrations');
      const savedConditions = localStorage.getItem('syncscript_workflow_conditions');

      if (savedWorkflows) this.workflows = JSON.parse(savedWorkflows);
      if (savedTemplates) this.templates = JSON.parse(savedTemplates);
      if (savedExecutions) this.executions = JSON.parse(savedExecutions);
      if (savedIntegrations) this.integrations = JSON.parse(savedIntegrations);
      if (savedConditions) this.conditions = JSON.parse(savedConditions);
    } catch (error) {
      console.error('Failed to load workflow automation data:', error);
    }
  }

  private async saveData(): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem('syncscript_workflows', JSON.stringify(this.workflows));
      localStorage.setItem('syncscript_workflow_templates', JSON.stringify(this.templates));
      localStorage.setItem('syncscript_workflow_executions', JSON.stringify(this.executions));
      localStorage.setItem('syncscript_workflow_integrations', JSON.stringify(this.integrations));
      localStorage.setItem('syncscript_workflow_conditions', JSON.stringify(this.conditions));
    } catch (error) {
      console.error('Failed to save workflow automation data:', error);
    }
  }

  private generateId(): string {
    return `workflow_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Singleton instance
let advancedWorkflowAutomationManager: AdvancedWorkflowAutomationManager | null = null;

export const getAdvancedWorkflowAutomationManager = (): AdvancedWorkflowAutomationManager => {
  if (!advancedWorkflowAutomationManager) {
    advancedWorkflowAutomationManager = new AdvancedWorkflowAutomationManager();
  }
  return advancedWorkflowAutomationManager;
};

export default AdvancedWorkflowAutomationManager;
