/**
 * Customer Success & Retention Program Manager
 * 
 * Comprehensive utility for managing customer health dashboard, retention campaigns,
 * customer success workflows, health score calculation, success playbooks,
 * customer segmentation, churn prediction, onboarding optimization,
 * customer feedback management, success metrics tracking, and retention analytics.
 */

export interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  industry: string;
  companySize: string;
  joinDate: string;
  subscriptionTier: 'free' | 'premium' | 'enterprise';
  status: 'active' | 'at_risk' | 'churned' | 'onboarding';
  healthScore: number;
  lastActivity: string;
  totalSpend: number;
  lifetimeValue: number;
  churnRisk: 'low' | 'medium' | 'high' | 'critical';
  successManager: string;
  createdAt: string;
}

export interface CustomerHealth {
  id: string;
  customerId: string;
  overallScore: number;
  engagementScore: number;
  usageScore: number;
  supportScore: number;
  paymentScore: number;
  satisfactionScore: number;
  factors: HealthFactor[];
  trends: HealthTrend[];
  recommendations: string[];
  lastUpdated: string;
  createdAt: string;
}

export interface HealthFactor {
  name: string;
  weight: number;
  score: number;
  impact: 'positive' | 'negative' | 'neutral';
  description: string;
}

export interface HealthTrend {
  date: string;
  score: number;
  factors: string[];
}

export interface RetentionCampaign {
  id: string;
  name: string;
  description: string;
  type: 'onboarding' | 'engagement' | 'win_back' | 'expansion' | 'renewal';
  targetSegment: string;
  status: 'draft' | 'active' | 'paused' | 'completed' | 'cancelled';
  startDate: string;
  endDate?: string;
  channels: CampaignChannel[];
  metrics: CampaignMetrics;
  createdAt: string;
}

export interface CampaignChannel {
  type: 'email' | 'sms' | 'push' | 'in_app' | 'phone' | 'webinar';
  template: string;
  schedule: string;
  status: 'active' | 'paused' | 'completed';
}

export interface CampaignMetrics {
  totalSent: number;
  delivered: number;
  opened: number;
  clicked: number;
  converted: number;
  conversionRate: number;
  revenue: number;
}

export interface CustomerSuccessWorkflow {
  id: string;
  name: string;
  description: string;
  trigger: WorkflowTrigger;
  steps: WorkflowStep[];
  conditions: WorkflowCondition[];
  status: 'active' | 'paused' | 'draft';
  createdAt: string;
}

export interface WorkflowTrigger {
  type: 'event' | 'schedule' | 'condition' | 'manual';
  event?: string;
  schedule?: string;
  condition?: string;
}

export interface WorkflowStep {
  id: string;
  type: 'email' | 'task' | 'call' | 'meeting' | 'survey' | 'notification';
  title: string;
  description: string;
  assignee: string;
  dueDate?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'skipped';
}

export interface WorkflowCondition {
  field: string;
  operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains';
  value: string | number;
}

export interface SuccessPlaybook {
  id: string;
  name: string;
  description: string;
  category: 'onboarding' | 'adoption' | 'expansion' | 'renewal' | 'churn_prevention';
  steps: PlaybookStep[];
  metrics: PlaybookMetrics;
  isActive: boolean;
  createdAt: string;
}

export interface PlaybookStep {
  id: string;
  title: string;
  description: string;
  order: number;
  type: 'action' | 'checklist' | 'template' | 'resource';
  content: string;
  assignee: string;
  estimatedTime: number;
}

export interface PlaybookMetrics {
  usageCount: number;
  successRate: number;
  averageTime: number;
  satisfaction: number;
}

export interface CustomerSegment {
  id: string;
  name: string;
  description: string;
  criteria: SegmentCriteria;
  customerCount: number;
  averageHealthScore: number;
  churnRate: number;
  lifetimeValue: number;
  characteristics: string[];
  createdAt: string;
}

export interface SegmentCriteria {
  subscriptionTier?: string[];
  industry?: string[];
  companySize?: string[];
  healthScore?: { min: number; max: number };
  churnRisk?: string[];
  tenure?: { min: number; max: number };
}

export interface ChurnPrediction {
  id: string;
  customerId: string;
  churnProbability: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  factors: ChurnFactor[];
  recommendations: string[];
  predictedChurnDate?: string;
  confidence: number;
  lastUpdated: string;
}

export interface ChurnFactor {
  name: string;
  weight: number;
  impact: 'positive' | 'negative';
  description: string;
}

export interface OnboardingOptimization {
  id: string;
  stage: string;
  name: string;
  description: string;
  completionRate: number;
  averageTime: number;
  dropoffPoints: DropoffPoint[];
  improvements: Improvement[];
  metrics: OnboardingMetrics;
  createdAt: string;
}

export interface DropoffPoint {
  step: string;
  dropoffRate: number;
  reasons: string[];
}

export interface Improvement {
  name: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  effort: 'low' | 'medium' | 'high';
  status: 'planned' | 'in_progress' | 'completed';
}

export interface OnboardingMetrics {
  totalStarted: number;
  totalCompleted: number;
  completionRate: number;
  averageTimeToComplete: number;
  satisfactionScore: number;
}

export interface CustomerFeedback {
  id: string;
  customerId: string;
  type: 'survey' | 'interview' | 'support_ticket' | 'review' | 'nps';
  rating: number;
  comments: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  assignedTo: string;
  createdAt: string;
}

export interface SuccessMetrics {
  id: string;
  name: string;
  value: number;
  target: number;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
  category: 'retention' | 'expansion' | 'satisfaction' | 'adoption';
  description: string;
  lastUpdated: string;
}

export interface RetentionAnalytics {
  id: string;
  period: string;
  cohortRetention: CohortRetention[];
  churnAnalysis: ChurnAnalysis;
  retentionDrivers: RetentionDriver[];
  insights: string[];
  createdAt: string;
}

export interface CohortRetention {
  cohort: string;
  month1: number;
  month3: number;
  month6: number;
  month12: number;
}

export interface ChurnAnalysis {
  totalChurned: number;
  churnRate: number;
  reasons: ChurnReason[];
  trends: ChurnTrend[];
}

export interface ChurnReason {
  reason: string;
  count: number;
  percentage: number;
}

export interface ChurnTrend {
  date: string;
  churnRate: number;
  churnedCustomers: number;
}

export interface RetentionDriver {
  factor: string;
  impact: number;
  correlation: number;
  description: string;
}

export class CustomerSuccessManager {
  private customers: Customer[] = [];
  private customerHealth: CustomerHealth[] = [];
  private retentionCampaigns: RetentionCampaign[] = [];
  private successWorkflows: CustomerSuccessWorkflow[] = [];
  private successPlaybooks: SuccessPlaybook[] = [];
  private customerSegments: CustomerSegment[] = [];
  private churnPredictions: ChurnPrediction[] = [];
  private onboardingOptimization: OnboardingOptimization[] = [];
  private customerFeedback: CustomerFeedback[] = [];
  private successMetrics: SuccessMetrics[] = [];
  private retentionAnalytics: RetentionAnalytics[] = [];
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
      console.error('Failed to initialize Customer Success Manager:', error);
    }
  }

  // Customer Management
  async addCustomer(customerData: Omit<Customer, 'id' | 'createdAt'>): Promise<Customer> {
    await this.initialize();

    const newCustomer: Customer = {
      ...customerData,
      id: this.generateId(),
      createdAt: new Date().toISOString()
    };

    this.customers.push(newCustomer);
    await this.saveData();
    return newCustomer;
  }

  async updateCustomer(customerId: string, updates: Partial<Customer>): Promise<Customer | null> {
    await this.initialize();

    const customerIndex = this.customers.findIndex(customer => customer.id === customerId);
    if (customerIndex === -1) return null;

    this.customers[customerIndex] = { ...this.customers[customerIndex], ...updates };
    await this.saveData();
    return this.customers[customerIndex];
  }

  async getAllCustomers(): Promise<Customer[]> {
    await this.initialize();
    return [...this.customers];
  }

  async getCustomersByStatus(status: string): Promise<Customer[]> {
    await this.initialize();
    return this.customers.filter(customer => customer.status === status);
  }

  async getCustomersByChurnRisk(riskLevel: string): Promise<Customer[]> {
    await this.initialize();
    return this.customers.filter(customer => customer.churnRisk === riskLevel);
  }

  // Customer Health Management
  async addCustomerHealth(healthData: Omit<CustomerHealth, 'id' | 'createdAt' | 'lastUpdated'>): Promise<CustomerHealth> {
    await this.initialize();

    const newHealth: CustomerHealth = {
      ...healthData,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };

    this.customerHealth.push(newHealth);
    await this.saveData();
    return newHealth;
  }

  async updateCustomerHealth(healthId: string, updates: Partial<CustomerHealth>): Promise<CustomerHealth | null> {
    await this.initialize();

    const healthIndex = this.customerHealth.findIndex(health => health.id === healthId);
    if (healthIndex === -1) return null;

    this.customerHealth[healthIndex] = { 
      ...this.customerHealth[healthIndex], 
      ...updates,
      lastUpdated: new Date().toISOString()
    };
    await this.saveData();
    return this.customerHealth[healthIndex];
  }

  async getAllCustomerHealth(): Promise<CustomerHealth[]> {
    await this.initialize();
    return [...this.customerHealth];
  }

  async getCustomerHealthByScore(minScore: number, maxScore: number): Promise<CustomerHealth[]> {
    await this.initialize();
    return this.customerHealth.filter(health => health.overallScore >= minScore && health.overallScore <= maxScore);
  }

  // Retention Campaign Management
  async addRetentionCampaign(campaignData: Omit<RetentionCampaign, 'id' | 'createdAt'>): Promise<RetentionCampaign> {
    await this.initialize();

    const newCampaign: RetentionCampaign = {
      ...campaignData,
      id: this.generateId(),
      createdAt: new Date().toISOString()
    };

    this.retentionCampaigns.push(newCampaign);
    await this.saveData();
    return newCampaign;
  }

  async updateRetentionCampaign(campaignId: string, updates: Partial<RetentionCampaign>): Promise<RetentionCampaign | null> {
    await this.initialize();

    const campaignIndex = this.retentionCampaigns.findIndex(campaign => campaign.id === campaignId);
    if (campaignIndex === -1) return null;

    this.retentionCampaigns[campaignIndex] = { ...this.retentionCampaigns[campaignIndex], ...updates };
    await this.saveData();
    return this.retentionCampaigns[campaignIndex];
  }

  async getAllRetentionCampaigns(): Promise<RetentionCampaign[]> {
    await this.initialize();
    return [...this.retentionCampaigns];
  }

  async getActiveRetentionCampaigns(): Promise<RetentionCampaign[]> {
    await this.initialize();
    return this.retentionCampaigns.filter(campaign => campaign.status === 'active');
  }

  // Success Workflow Management
  async addSuccessWorkflow(workflowData: Omit<CustomerSuccessWorkflow, 'id' | 'createdAt'>): Promise<CustomerSuccessWorkflow> {
    await this.initialize();

    const newWorkflow: CustomerSuccessWorkflow = {
      ...workflowData,
      id: this.generateId(),
      createdAt: new Date().toISOString()
    };

    this.successWorkflows.push(newWorkflow);
    await this.saveData();
    return newWorkflow;
  }

  async getAllSuccessWorkflows(): Promise<CustomerSuccessWorkflow[]> {
    await this.initialize();
    return [...this.successWorkflows];
  }

  // Success Playbook Management
  async addSuccessPlaybook(playbookData: Omit<SuccessPlaybook, 'id' | 'createdAt'>): Promise<SuccessPlaybook> {
    await this.initialize();

    const newPlaybook: SuccessPlaybook = {
      ...playbookData,
      id: this.generateId(),
      createdAt: new Date().toISOString()
    };

    this.successPlaybooks.push(newPlaybook);
    await this.saveData();
    return newPlaybook;
  }

  async getAllSuccessPlaybooks(): Promise<SuccessPlaybook[]> {
    await this.initialize();
    return [...this.successPlaybooks];
  }

  // Customer Segmentation Management
  async addCustomerSegment(segmentData: Omit<CustomerSegment, 'id' | 'createdAt'>): Promise<CustomerSegment> {
    await this.initialize();

    const newSegment: CustomerSegment = {
      ...segmentData,
      id: this.generateId(),
      createdAt: new Date().toISOString()
    };

    this.customerSegments.push(newSegment);
    await this.saveData();
    return newSegment;
  }

  async getAllCustomerSegments(): Promise<CustomerSegment[]> {
    await this.initialize();
    return [...this.customerSegments];
  }

  // Churn Prediction Management
  async addChurnPrediction(predictionData: Omit<ChurnPrediction, 'id' | 'lastUpdated'>): Promise<ChurnPrediction> {
    await this.initialize();

    const newPrediction: ChurnPrediction = {
      ...predictionData,
      id: this.generateId(),
      lastUpdated: new Date().toISOString()
    };

    this.churnPredictions.push(newPrediction);
    await this.saveData();
    return newPrediction;
  }

  async getAllChurnPredictions(): Promise<ChurnPrediction[]> {
    await this.initialize();
    return [...this.churnPredictions];
  }

  async getHighRiskChurnPredictions(): Promise<ChurnPrediction[]> {
    await this.initialize();
    return this.churnPredictions.filter(prediction => prediction.riskLevel === 'high' || prediction.riskLevel === 'critical');
  }

  // Customer Feedback Management
  async addCustomerFeedback(feedbackData: Omit<CustomerFeedback, 'id' | 'createdAt'>): Promise<CustomerFeedback> {
    await this.initialize();

    const newFeedback: CustomerFeedback = {
      ...feedbackData,
      id: this.generateId(),
      createdAt: new Date().toISOString()
    };

    this.customerFeedback.push(newFeedback);
    await this.saveData();
    return newFeedback;
  }

  async getAllCustomerFeedback(): Promise<CustomerFeedback[]> {
    await this.initialize();
    return [...this.customerFeedback];
  }

  // Success Metrics Management
  async addSuccessMetrics(metricsData: Omit<SuccessMetrics, 'id' | 'lastUpdated'>): Promise<SuccessMetrics> {
    await this.initialize();

    const newMetrics: SuccessMetrics = {
      ...metricsData,
      id: this.generateId(),
      lastUpdated: new Date().toISOString()
    };

    this.successMetrics.push(newMetrics);
    await this.saveData();
    return newMetrics;
  }

  async updateSuccessMetrics(metricsId: string, updates: Partial<SuccessMetrics>): Promise<SuccessMetrics | null> {
    await this.initialize();

    const metricsIndex = this.successMetrics.findIndex(metrics => metrics.id === metricsId);
    if (metricsIndex === -1) return null;

    this.successMetrics[metricsIndex] = { 
      ...this.successMetrics[metricsIndex], 
      ...updates,
      lastUpdated: new Date().toISOString()
    };
    await this.saveData();
    return this.successMetrics[metricsIndex];
  }

  async getAllSuccessMetrics(): Promise<SuccessMetrics[]> {
    await this.initialize();
    return [...this.successMetrics];
  }

  // Analytics
  async getCustomerSuccessSummary(): Promise<{
    totalCustomers: number;
    activeCustomers: number;
    atRiskCustomers: number;
    churnedCustomers: number;
    averageHealthScore: number;
    totalCampaigns: number;
    activeCampaigns: number;
    totalWorkflows: number;
    totalPlaybooks: number;
    totalSegments: number;
    highRiskChurn: number;
    totalFeedback: number;
    averageSatisfaction: number;
  }> {
    await this.initialize();

    const totalCustomers = this.customers.length;
    const activeCustomers = this.customers.filter(customer => customer.status === 'active').length;
    const atRiskCustomers = this.customers.filter(customer => customer.status === 'at_risk').length;
    const churnedCustomers = this.customers.filter(customer => customer.status === 'churned').length;
    
    const averageHealthScore = this.customerHealth.length > 0 
      ? this.customerHealth.reduce((sum, health) => sum + health.overallScore, 0) / this.customerHealth.length 
      : 0;

    const totalCampaigns = this.retentionCampaigns.length;
    const activeCampaigns = this.retentionCampaigns.filter(campaign => campaign.status === 'active').length;
    const totalWorkflows = this.successWorkflows.length;
    const totalPlaybooks = this.successPlaybooks.length;
    const totalSegments = this.customerSegments.length;
    const highRiskChurn = this.churnPredictions.filter(prediction => prediction.riskLevel === 'high' || prediction.riskLevel === 'critical').length;
    const totalFeedback = this.customerFeedback.length;
    
    const averageSatisfaction = this.customerFeedback.length > 0 
      ? this.customerFeedback.reduce((sum, feedback) => sum + feedback.rating, 0) / this.customerFeedback.length 
      : 0;

    return {
      totalCustomers,
      activeCustomers,
      atRiskCustomers,
      churnedCustomers,
      averageHealthScore,
      totalCampaigns,
      activeCampaigns,
      totalWorkflows,
      totalPlaybooks,
      totalSegments,
      highRiskChurn,
      totalFeedback,
      averageSatisfaction
    };
  }

  // Data Management
  private async loadData(): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
      const savedCustomers = localStorage.getItem('syncscript_customers');
      const savedCustomerHealth = localStorage.getItem('syncscript_customer_health');
      const savedRetentionCampaigns = localStorage.getItem('syncscript_retention_campaigns');
      const savedSuccessWorkflows = localStorage.getItem('syncscript_success_workflows');
      const savedSuccessPlaybooks = localStorage.getItem('syncscript_success_playbooks');
      const savedCustomerSegments = localStorage.getItem('syncscript_customer_segments');
      const savedChurnPredictions = localStorage.getItem('syncscript_churn_predictions');
      const savedOnboardingOptimization = localStorage.getItem('syncscript_onboarding_optimization');
      const savedCustomerFeedback = localStorage.getItem('syncscript_customer_feedback');
      const savedSuccessMetrics = localStorage.getItem('syncscript_success_metrics');
      const savedRetentionAnalytics = localStorage.getItem('syncscript_retention_analytics');

      if (savedCustomers) this.customers = JSON.parse(savedCustomers);
      if (savedCustomerHealth) this.customerHealth = JSON.parse(savedCustomerHealth);
      if (savedRetentionCampaigns) this.retentionCampaigns = JSON.parse(savedRetentionCampaigns);
      if (savedSuccessWorkflows) this.successWorkflows = JSON.parse(savedSuccessWorkflows);
      if (savedSuccessPlaybooks) this.successPlaybooks = JSON.parse(savedSuccessPlaybooks);
      if (savedCustomerSegments) this.customerSegments = JSON.parse(savedCustomerSegments);
      if (savedChurnPredictions) this.churnPredictions = JSON.parse(savedChurnPredictions);
      if (savedOnboardingOptimization) this.onboardingOptimization = JSON.parse(savedOnboardingOptimization);
      if (savedCustomerFeedback) this.customerFeedback = JSON.parse(savedCustomerFeedback);
      if (savedSuccessMetrics) this.successMetrics = JSON.parse(savedSuccessMetrics);
      if (savedRetentionAnalytics) this.retentionAnalytics = JSON.parse(savedRetentionAnalytics);
    } catch (error) {
      console.error('Failed to load customer success data:', error);
    }
  }

  private async saveData(): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem('syncscript_customers', JSON.stringify(this.customers));
      localStorage.setItem('syncscript_customer_health', JSON.stringify(this.customerHealth));
      localStorage.setItem('syncscript_retention_campaigns', JSON.stringify(this.retentionCampaigns));
      localStorage.setItem('syncscript_success_workflows', JSON.stringify(this.successWorkflows));
      localStorage.setItem('syncscript_success_playbooks', JSON.stringify(this.successPlaybooks));
      localStorage.setItem('syncscript_customer_segments', JSON.stringify(this.customerSegments));
      localStorage.setItem('syncscript_churn_predictions', JSON.stringify(this.churnPredictions));
      localStorage.setItem('syncscript_onboarding_optimization', JSON.stringify(this.onboardingOptimization));
      localStorage.setItem('syncscript_customer_feedback', JSON.stringify(this.customerFeedback));
      localStorage.setItem('syncscript_success_metrics', JSON.stringify(this.successMetrics));
      localStorage.setItem('syncscript_retention_analytics', JSON.stringify(this.retentionAnalytics));
    } catch (error) {
      console.error('Failed to save customer success data:', error);
    }
  }

  private generateId(): string {
    return `customer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Singleton instance
let customerSuccessManager: CustomerSuccessManager | null = null;

export const getCustomerSuccessManager = (): CustomerSuccessManager => {
  if (!customerSuccessManager) {
    customerSuccessManager = new CustomerSuccessManager();
  }
  return customerSuccessManager;
};

export default CustomerSuccessManager;