/**
 * Enterprise Sales Acceleration Manager
 * 
 * Comprehensive utility for managing enterprise deals, sales activities, pipeline,
 * sales team performance, forecasts, processes, and analytics for enterprise customer acquisition.
 */

export interface EnterpriseDeal {
  id: string;
  company: string;
  contactPerson: string;
  email: string;
  phone: string;
  title: string;
  dealValue: number;
  currency: string;
  status: 'prospect' | 'qualified' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';
  probability: number;
  expectedCloseDate: string;
  actualCloseDate?: string;
  salesRep: string;
  source: string;
  industry: string;
  companySize: string;
  notes: string;
  activities: SalesActivity[];
  createdAt: string;
  updatedAt: string;
}

export interface SalesActivity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'demo' | 'proposal' | 'follow_up';
  subject: string;
  description: string;
  date: string;
  duration?: number;
  outcome: 'positive' | 'neutral' | 'negative';
  nextAction?: string;
  createdAt: string;
}

export interface SalesPipeline {
  id: string;
  name: string;
  stages: PipelineStage[];
  totalValue: number;
  currency: string;
  createdAt: string;
}

export interface PipelineStage {
  id: string;
  name: string;
  deals: EnterpriseDeal[];
  value: number;
  probability: number;
  averageDays: number;
}

export interface SalesTeamMember {
  id: string;
  name: string;
  role: 'sales_manager' | 'account_executive' | 'business_development' | 'sales_engineer' | 'sales_director';
  email: string;
  phone: string;
  territory: string;
  quota: number;
  currency: string;
  performance: SalesPerformance;
  status: 'active' | 'inactive' | 'on_leave';
  joinDate: string;
}

export interface SalesPerformance {
  dealsClosed: number;
  revenue: number;
  quotaAchievement: number;
  averageDealSize: number;
  salesCycleLength: number;
  conversionRate: number;
  activitiesCompleted: number;
}

export interface SalesForecast {
  id: string;
  period: string;
  forecastType: 'monthly' | 'quarterly' | 'yearly';
  targetRevenue: number;
  projectedRevenue: number;
  currency: string;
  confidence: number;
  deals: string[];
  assumptions: string[];
  createdAt: string;
}

export interface SalesProcess {
  id: string;
  name: string;
  stages: ProcessStage[];
  averageDuration: number;
  successRate: number;
  createdAt: string;
}

export interface ProcessStage {
  id: string;
  name: string;
  description: string;
  duration: number;
  requiredActivities: string[];
  successCriteria: string[];
}

export interface SalesAnalytics {
  totalRevenue: number;
  monthlyRecurringRevenue: number;
  averageDealSize: number;
  salesCycleLength: number;
  conversionRate: number;
  winRate: number;
  quotaAchievement: number;
  pipelineVelocity: number;
}

export class EnterpriseSalesAccelerationManager {
  private enterpriseDeals: EnterpriseDeal[] = [];
  private salesActivities: SalesActivity[] = [];
  private salesPipeline: SalesPipeline[] = [];
  private salesTeam: SalesTeamMember[] = [];
  private salesForecasts: SalesForecast[] = [];
  private salesProcesses: SalesProcess[] = [];
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
      console.error('Failed to initialize Enterprise Sales Acceleration Manager:', error);
    }
  }

  // Enterprise Deal Management
  async addEnterpriseDeal(dealData: Omit<EnterpriseDeal, 'id' | 'createdAt' | 'updatedAt' | 'activities'>): Promise<EnterpriseDeal> {
    await this.initialize();

    const newDeal: EnterpriseDeal = {
      ...dealData,
      id: this.generateId(),
      activities: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.enterpriseDeals.push(newDeal);
    await this.saveData();
    return newDeal;
  }

  async updateEnterpriseDeal(dealId: string, updates: Partial<EnterpriseDeal>): Promise<EnterpriseDeal | null> {
    await this.initialize();

    const dealIndex = this.enterpriseDeals.findIndex(deal => deal.id === dealId);
    if (dealIndex === -1) return null;

    this.enterpriseDeals[dealIndex] = { 
      ...this.enterpriseDeals[dealIndex], 
      ...updates, 
      updatedAt: new Date().toISOString() 
    };
    await this.saveData();
    return this.enterpriseDeals[dealIndex];
  }

  async closeDeal(dealId: string, won: boolean): Promise<EnterpriseDeal | null> {
    await this.initialize();

    const deal = this.enterpriseDeals.find(d => d.id === dealId);
    if (!deal) return null;

    deal.status = won ? 'closed_won' : 'closed_lost';
    deal.actualCloseDate = new Date().toISOString();
    deal.updatedAt = new Date().toISOString();

    await this.saveData();
    return deal;
  }

  async getAllEnterpriseDeals(): Promise<EnterpriseDeal[]> {
    await this.initialize();
    return [...this.enterpriseDeals];
  }

  async getEnterpriseDealsByStatus(status: EnterpriseDeal['status']): Promise<EnterpriseDeal[]> {
    await this.initialize();
    return this.enterpriseDeals.filter(deal => deal.status === status);
  }

  async getEnterpriseDealsBySalesRep(salesRep: string): Promise<EnterpriseDeal[]> {
    await this.initialize();
    return this.enterpriseDeals.filter(deal => 
      deal.salesRep.toLowerCase().includes(salesRep.toLowerCase())
    );
  }

  async getEnterpriseDealsByIndustry(industry: string): Promise<EnterpriseDeal[]> {
    await this.initialize();
    return this.enterpriseDeals.filter(deal => 
      deal.industry.toLowerCase().includes(industry.toLowerCase())
    );
  }

  // Sales Activity Management
  async addSalesActivity(activityData: Omit<SalesActivity, 'id' | 'createdAt'>): Promise<SalesActivity> {
    await this.initialize();

    const newActivity: SalesActivity = {
      ...activityData,
      id: this.generateId(),
      createdAt: new Date().toISOString()
    };

    this.salesActivities.push(newActivity);
    await this.saveData();
    return newActivity;
  }

  async addActivityToDeal(dealId: string, activityData: Omit<SalesActivity, 'id' | 'createdAt'>): Promise<SalesActivity | null> {
    await this.initialize();

    const deal = this.enterpriseDeals.find(d => d.id === dealId);
    if (!deal) return null;

    const newActivity: SalesActivity = {
      ...activityData,
      id: this.generateId(),
      createdAt: new Date().toISOString()
    };

    deal.activities.push(newActivity);
    this.salesActivities.push(newActivity);
    await this.saveData();
    return newActivity;
  }

  async getAllSalesActivities(): Promise<SalesActivity[]> {
    await this.initialize();
    return [...this.salesActivities];
  }

  async getSalesActivitiesByType(type: SalesActivity['type']): Promise<SalesActivity[]> {
    await this.initialize();
    return this.salesActivities.filter(activity => activity.type === type);
  }

  async getSalesActivitiesByOutcome(outcome: SalesActivity['outcome']): Promise<SalesActivity[]> {
    await this.initialize();
    return this.salesActivities.filter(activity => activity.outcome === outcome);
  }

  // Sales Pipeline Management
  async createSalesPipeline(pipelineData: Omit<SalesPipeline, 'id' | 'createdAt'>): Promise<SalesPipeline> {
    await this.initialize();

    const newPipeline: SalesPipeline = {
      ...pipelineData,
      id: this.generateId(),
      createdAt: new Date().toISOString()
    };

    this.salesPipeline.push(newPipeline);
    await this.saveData();
    return newPipeline;
  }

  async updateSalesPipeline(pipelineId: string, updates: Partial<SalesPipeline>): Promise<SalesPipeline | null> {
    await this.initialize();

    const pipelineIndex = this.salesPipeline.findIndex(pipeline => pipeline.id === pipelineId);
    if (pipelineIndex === -1) return null;

    this.salesPipeline[pipelineIndex] = { ...this.salesPipeline[pipelineIndex], ...updates };
    await this.saveData();
    return this.salesPipeline[pipelineIndex];
  }

  async addDealToPipeline(pipelineId: string, stageId: string, dealId: string): Promise<boolean> {
    await this.initialize();

    const pipeline = this.salesPipeline.find(p => p.id === pipelineId);
    if (!pipeline) return false;

    const stage = pipeline.stages.find(s => s.id === stageId);
    if (!stage) return false;

    const deal = this.enterpriseDeals.find(d => d.id === dealId);
    if (!deal) return false;

    stage.deals.push(deal);
    stage.value += deal.dealValue;
    
    // Recalculate total pipeline value
    pipeline.totalValue = pipeline.stages.reduce((sum, s) => sum + s.value, 0);

    await this.saveData();
    return true;
  }

  async moveDealBetweenStages(pipelineId: string, fromStageId: string, toStageId: string, dealId: string): Promise<boolean> {
    await this.initialize();

    const pipeline = this.salesPipeline.find(p => p.id === pipelineId);
    if (!pipeline) return false;

    const fromStage = pipeline.stages.find(s => s.id === fromStageId);
    const toStage = pipeline.stages.find(s => s.id === toStageId);
    
    if (!fromStage || !toStage) return false;

    const dealIndex = fromStage.deals.findIndex(d => d.id === dealId);
    if (dealIndex === -1) return false;

    const deal = fromStage.deals.splice(dealIndex, 1)[0];
    toStage.deals.push(deal);

    // Update stage values
    fromStage.value -= deal.dealValue;
    toStage.value += deal.dealValue;

    // Update deal status based on stage
    deal.status = this.getStatusFromStageName(toStage.name);
    deal.updatedAt = new Date().toISOString();

    // Recalculate total pipeline value
    pipeline.totalValue = pipeline.stages.reduce((sum, s) => sum + s.value, 0);

    await this.saveData();
    return true;
  }

  private getStatusFromStageName(stageName: string): EnterpriseDeal['status'] {
    switch (stageName.toLowerCase()) {
      case 'prospect': return 'prospect';
      case 'qualified': return 'qualified';
      case 'proposal': return 'proposal';
      case 'negotiation': return 'negotiation';
      case 'closed won': return 'closed_won';
      default: return 'prospect';
    }
  }

  async getAllSalesPipelines(): Promise<SalesPipeline[]> {
    await this.initialize();
    return [...this.salesPipeline];
  }

  // Sales Team Management
  async addSalesTeamMember(memberData: Omit<SalesTeamMember, 'id' | 'joinDate'>): Promise<SalesTeamMember> {
    await this.initialize();

    const newMember: SalesTeamMember = {
      ...memberData,
      id: this.generateId(),
      joinDate: new Date().toISOString()
    };

    this.salesTeam.push(newMember);
    await this.saveData();
    return newMember;
  }

  async updateSalesTeamMember(memberId: string, updates: Partial<SalesTeamMember>): Promise<SalesTeamMember | null> {
    await this.initialize();

    const memberIndex = this.salesTeam.findIndex(member => member.id === memberId);
    if (memberIndex === -1) return null;

    this.salesTeam[memberIndex] = { ...this.salesTeam[memberIndex], ...updates };
    await this.saveData();
    return this.salesTeam[memberIndex];
  }

  async updateSalesPerformance(memberId: string, performance: Partial<SalesPerformance>): Promise<SalesTeamMember | null> {
    await this.initialize();

    const member = this.salesTeam.find(m => m.id === memberId);
    if (!member) return null;

    member.performance = { ...member.performance, ...performance };
    
    // Calculate quota achievement
    if (member.quota > 0) {
      member.performance.quotaAchievement = (member.performance.revenue / member.quota) * 100;
    }

    await this.saveData();
    return member;
  }

  async getAllSalesTeamMembers(): Promise<SalesTeamMember[]> {
    await this.initialize();
    return [...this.salesTeam];
  }

  async getSalesTeamMembersByRole(role: SalesTeamMember['role']): Promise<SalesTeamMember[]> {
    await this.initialize();
    return this.salesTeam.filter(member => member.role === role);
  }

  async getActiveSalesTeamMembers(): Promise<SalesTeamMember[]> {
    await this.initialize();
    return this.salesTeam.filter(member => member.status === 'active');
  }

  // Sales Forecast Management
  async addSalesForecast(forecastData: Omit<SalesForecast, 'id' | 'createdAt'>): Promise<SalesForecast> {
    await this.initialize();

    const newForecast: SalesForecast = {
      ...forecastData,
      id: this.generateId(),
      createdAt: new Date().toISOString()
    };

    this.salesForecasts.push(newForecast);
    await this.saveData();
    return newForecast;
  }

  async updateSalesForecast(forecastId: string, updates: Partial<SalesForecast>): Promise<SalesForecast | null> {
    await this.initialize();

    const forecastIndex = this.salesForecasts.findIndex(forecast => forecast.id === forecastId);
    if (forecastIndex === -1) return null;

    this.salesForecasts[forecastIndex] = { ...this.salesForecasts[forecastIndex], ...updates };
    await this.saveData();
    return this.salesForecasts[forecastIndex];
  }

  async getAllSalesForecasts(): Promise<SalesForecast[]> {
    await this.initialize();
    return [...this.salesForecasts];
  }

  async getSalesForecastsByType(type: SalesForecast['forecastType']): Promise<SalesForecast[]> {
    await this.initialize();
    return this.salesForecasts.filter(forecast => forecast.forecastType === type);
  }

  // Sales Process Management
  async addSalesProcess(processData: Omit<SalesProcess, 'id' | 'createdAt'>): Promise<SalesProcess> {
    await this.initialize();

    const newProcess: SalesProcess = {
      ...processData,
      id: this.generateId(),
      createdAt: new Date().toISOString()
    };

    this.salesProcesses.push(newProcess);
    await this.saveData();
    return newProcess;
  }

  async updateSalesProcess(processId: string, updates: Partial<SalesProcess>): Promise<SalesProcess | null> {
    await this.initialize();

    const processIndex = this.salesProcesses.findIndex(process => process.id === processId);
    if (processIndex === -1) return null;

    this.salesProcesses[processIndex] = { ...this.salesProcesses[processIndex], ...updates };
    await this.saveData();
    return this.salesProcesses[processIndex];
  }

  async getAllSalesProcesses(): Promise<SalesProcess[]> {
    await this.initialize();
    return [...this.salesProcesses];
  }

  // Analytics and Metrics
  async getSalesAnalytics(): Promise<SalesAnalytics> {
    await this.initialize();

    const totalRevenue = this.salesTeam.reduce((sum, member) => sum + member.performance.revenue, 0);
    const monthlyRecurringRevenue = this.calculateMRR();
    const averageDealSize = this.enterpriseDeals.length > 0 
      ? this.enterpriseDeals.reduce((sum, deal) => sum + deal.dealValue, 0) / this.enterpriseDeals.length 
      : 0;
    
    const salesCycleLength = this.salesTeam.length > 0 
      ? this.salesTeam.reduce((sum, member) => sum + member.performance.salesCycleLength, 0) / this.salesTeam.length 
      : 0;

    const conversionRate = this.salesTeam.length > 0 
      ? this.salesTeam.reduce((sum, member) => sum + member.performance.conversionRate, 0) / this.salesTeam.length 
      : 0;

    const winRate = this.enterpriseDeals.length > 0 
      ? (this.enterpriseDeals.filter(d => d.status === 'closed_won').length / this.enterpriseDeals.length) * 100 
      : 0;

    const quotaAchievement = this.salesTeam.length > 0 
      ? this.salesTeam.reduce((sum, member) => sum + member.performance.quotaAchievement, 0) / this.salesTeam.length 
      : 0;

    const pipelineVelocity = this.salesPipeline.reduce((sum, pipeline) => sum + pipeline.totalValue, 0);

    return {
      totalRevenue,
      monthlyRecurringRevenue,
      averageDealSize,
      salesCycleLength,
      conversionRate,
      winRate,
      quotaAchievement,
      pipelineVelocity
    };
  }

  private calculateMRR(): number {
    // Simplified MRR calculation based on closed deals
    const closedDeals = this.enterpriseDeals.filter(deal => deal.status === 'closed_won');
    return closedDeals.reduce((sum, deal) => sum + (deal.dealValue / 12), 0); // Assuming annual contracts
  }

  async getDealStatusDistribution(): Promise<Record<string, number>> {
    await this.initialize();

    return this.enterpriseDeals.reduce((acc, deal) => {
      acc[deal.status] = (acc[deal.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  async getSalesTeamPerformance(): Promise<{
    topPerformers: SalesTeamMember[];
    averageQuotaAchievement: number;
    totalTeamRevenue: number;
    averageDealSize: number;
  }> {
    await this.initialize();

    const topPerformers = [...this.salesTeam]
      .sort((a, b) => b.performance.quotaAchievement - a.performance.quotaAchievement)
      .slice(0, 5);

    const averageQuotaAchievement = this.salesTeam.length > 0 
      ? this.salesTeam.reduce((sum, member) => sum + member.performance.quotaAchievement, 0) / this.salesTeam.length 
      : 0;

    const totalTeamRevenue = this.salesTeam.reduce((sum, member) => sum + member.performance.revenue, 0);

    const averageDealSize = this.salesTeam.length > 0 
      ? this.salesTeam.reduce((sum, member) => sum + member.performance.averageDealSize, 0) / this.salesTeam.length 
      : 0;

    return {
      topPerformers,
      averageQuotaAchievement,
      totalTeamRevenue,
      averageDealSize
    };
  }

  async getPipelineAnalytics(): Promise<{
    totalPipelineValue: number;
    weightedPipelineValue: number;
    stageValues: Record<string, number>;
    averageDealSize: number;
  }> {
    await this.initialize();

    let totalPipelineValue = 0;
    let weightedPipelineValue = 0;
    const stageValues: Record<string, number> = {};

    this.salesPipeline.forEach(pipeline => {
      pipeline.stages.forEach(stage => {
        totalPipelineValue += stage.value;
        weightedPipelineValue += stage.value * (stage.probability / 100);
        stageValues[stage.name] = (stageValues[stage.name] || 0) + stage.value;
      });
    });

    const averageDealSize = this.enterpriseDeals.length > 0 
      ? this.enterpriseDeals.reduce((sum, deal) => sum + deal.dealValue, 0) / this.enterpriseDeals.length 
      : 0;

    return {
      totalPipelineValue,
      weightedPipelineValue,
      stageValues,
      averageDealSize
    };
  }

  // Data Management
  private async loadData(): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
      const savedDeals = localStorage.getItem('syncscript_enterprise_deals');
      const savedActivities = localStorage.getItem('syncscript_sales_activities');
      const savedPipeline = localStorage.getItem('syncscript_sales_pipeline');
      const savedTeam = localStorage.getItem('syncscript_sales_team');
      const savedForecasts = localStorage.getItem('syncscript_sales_forecasts');
      const savedProcesses = localStorage.getItem('syncscript_sales_processes');

      if (savedDeals) this.enterpriseDeals = JSON.parse(savedDeals);
      if (savedActivities) this.salesActivities = JSON.parse(savedActivities);
      if (savedPipeline) this.salesPipeline = JSON.parse(savedPipeline);
      if (savedTeam) this.salesTeam = JSON.parse(savedTeam);
      if (savedForecasts) this.salesForecasts = JSON.parse(savedForecasts);
      if (savedProcesses) this.salesProcesses = JSON.parse(savedProcesses);
    } catch (error) {
      console.error('Failed to load enterprise sales data:', error);
    }
  }

  private async saveData(): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem('syncscript_enterprise_deals', JSON.stringify(this.enterpriseDeals));
      localStorage.setItem('syncscript_sales_activities', JSON.stringify(this.salesActivities));
      localStorage.setItem('syncscript_sales_pipeline', JSON.stringify(this.salesPipeline));
      localStorage.setItem('syncscript_sales_team', JSON.stringify(this.salesTeam));
      localStorage.setItem('syncscript_sales_forecasts', JSON.stringify(this.salesForecasts));
      localStorage.setItem('syncscript_sales_processes', JSON.stringify(this.salesProcesses));
    } catch (error) {
      console.error('Failed to save enterprise sales data:', error);
    }
  }

  private generateId(): string {
    return `sales_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Export/Import
  async exportData(): Promise<{
    enterpriseDeals: EnterpriseDeal[];
    salesActivities: SalesActivity[];
    salesPipeline: SalesPipeline[];
    salesTeam: SalesTeamMember[];
    salesForecasts: SalesForecast[];
    salesProcesses: SalesProcess[];
    salesAnalytics: SalesAnalytics;
  }> {
    await this.initialize();

    const salesAnalytics = await this.getSalesAnalytics();

    return {
      enterpriseDeals: this.enterpriseDeals,
      salesActivities: this.salesActivities,
      salesPipeline: this.salesPipeline,
      salesTeam: this.salesTeam,
      salesForecasts: this.salesForecasts,
      salesProcesses: this.salesProcesses,
      salesAnalytics
    };
  }

  async importData(data: {
    enterpriseDeals: EnterpriseDeal[];
    salesActivities: SalesActivity[];
    salesPipeline: SalesPipeline[];
    salesTeam: SalesTeamMember[];
    salesForecasts: SalesForecast[];
    salesProcesses: SalesProcess[];
  }): Promise<void> {
    await this.initialize();

    this.enterpriseDeals = data.enterpriseDeals;
    this.salesActivities = data.salesActivities;
    this.salesPipeline = data.salesPipeline;
    this.salesTeam = data.salesTeam;
    this.salesForecasts = data.salesForecasts;
    this.salesProcesses = data.salesProcesses;
    await this.saveData();
  }

  // Cleanup
  async clearAllData(): Promise<void> {
    if (typeof window === 'undefined') return;

    this.enterpriseDeals = [];
    this.salesActivities = [];
    this.salesPipeline = [];
    this.salesTeam = [];
    this.salesForecasts = [];
    this.salesProcesses = [];

    localStorage.removeItem('syncscript_enterprise_deals');
    localStorage.removeItem('syncscript_sales_activities');
    localStorage.removeItem('syncscript_sales_pipeline');
    localStorage.removeItem('syncscript_sales_team');
    localStorage.removeItem('syncscript_sales_forecasts');
    localStorage.removeItem('syncscript_sales_processes');
  }
}

// Singleton instance
let enterpriseSalesAccelerationManager: EnterpriseSalesAccelerationManager | null = null;

export const getEnterpriseSalesAccelerationManager = (): EnterpriseSalesAccelerationManager => {
  if (!enterpriseSalesAccelerationManager) {
    enterpriseSalesAccelerationManager = new EnterpriseSalesAccelerationManager();
  }
  return enterpriseSalesAccelerationManager;
};

export default EnterpriseSalesAccelerationManager;
