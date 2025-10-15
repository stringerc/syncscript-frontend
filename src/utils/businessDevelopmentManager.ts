/**
 * Business Development Manager
 * 
 * Comprehensive utility for managing pricing tiers, enterprise deals, strategic partnerships,
 * revenue models, sales pipeline, and business metrics for revenue scaling and business growth.
 */

export interface PricingTier {
  id: string;
  name: string;
  type: 'free' | 'starter' | 'professional' | 'enterprise' | 'custom';
  price: number;
  currency: string;
  billingCycle: 'monthly' | 'yearly';
  features: string[];
  limits: Record<string, number>;
  isPopular: boolean;
  createdAt: string;
}

export interface EnterpriseDeal {
  id: string;
  company: string;
  contactPerson: string;
  email: string;
  phone: string;
  dealValue: number;
  currency: string;
  status: 'prospect' | 'qualified' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';
  probability: number;
  expectedCloseDate: string;
  actualCloseDate?: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface StrategicPartnership {
  id: string;
  partnerName: string;
  partnerType: 'technology' | 'channel' | 'integration' | 'reseller' | 'strategic';
  status: 'exploring' | 'negotiating' | 'active' | 'paused' | 'terminated';
  dealValue: number;
  currency: string;
  startDate: string;
  endDate?: string;
  contactPerson: string;
  email: string;
  description: string;
  benefits: string[];
  createdAt: string;
}

export interface RevenueModel {
  id: string;
  name: string;
  type: 'subscription' | 'usage_based' | 'freemium' | 'enterprise' | 'marketplace';
  description: string;
  targetMarket: string[];
  pricingStrategy: string;
  expectedRevenue: number;
  actualRevenue: number;
  growthRate: number;
  isActive: boolean;
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
}

export interface BusinessMetrics {
  totalRevenue: number;
  monthlyRecurringRevenue: number;
  annualRecurringRevenue: number;
  customerAcquisitionCost: number;
  customerLifetimeValue: number;
  churnRate: number;
  growthRate: number;
  averageDealSize: number;
  salesCycleLength: number;
  conversionRate: number;
}

export class BusinessDevelopmentManager {
  private pricingTiers: PricingTier[] = [];
  private enterpriseDeals: EnterpriseDeal[] = [];
  private strategicPartnerships: StrategicPartnership[] = [];
  private revenueModels: RevenueModel[] = [];
  private salesPipeline: SalesPipeline[] = [];
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
      console.error('Failed to initialize Business Development Manager:', error);
    }
  }

  // Pricing Tier Management
  async addPricingTier(tierData: Omit<PricingTier, 'id' | 'createdAt'>): Promise<PricingTier> {
    await this.initialize();

    const newTier: PricingTier = {
      ...tierData,
      id: this.generateId(),
      createdAt: new Date().toISOString()
    };

    this.pricingTiers.push(newTier);
    await this.saveData();
    return newTier;
  }

  async updatePricingTier(tierId: string, updates: Partial<PricingTier>): Promise<PricingTier | null> {
    await this.initialize();

    const tierIndex = this.pricingTiers.findIndex(tier => tier.id === tierId);
    if (tierIndex === -1) return null;

    this.pricingTiers[tierIndex] = { ...this.pricingTiers[tierIndex], ...updates };
    await this.saveData();
    return this.pricingTiers[tierIndex];
  }

  async getAllPricingTiers(): Promise<PricingTier[]> {
    await this.initialize();
    return [...this.pricingTiers];
  }

  async getPricingTierByType(type: PricingTier['type']): Promise<PricingTier | null> {
    await this.initialize();
    return this.pricingTiers.find(tier => tier.type === type) || null;
  }

  async getPopularPricingTier(): Promise<PricingTier | null> {
    await this.initialize();
    return this.pricingTiers.find(tier => tier.isPopular) || null;
  }

  // Enterprise Deal Management
  async addEnterpriseDeal(dealData: Omit<EnterpriseDeal, 'id' | 'createdAt' | 'updatedAt'>): Promise<EnterpriseDeal> {
    await this.initialize();

    const newDeal: EnterpriseDeal = {
      ...dealData,
      id: this.generateId(),
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

  async getAllEnterpriseDeals(): Promise<EnterpriseDeal[]> {
    await this.initialize();
    return [...this.enterpriseDeals];
  }

  async getEnterpriseDealsByStatus(status: EnterpriseDeal['status']): Promise<EnterpriseDeal[]> {
    await this.initialize();
    return this.enterpriseDeals.filter(deal => deal.status === status);
  }

  async getEnterpriseDealsByCompany(company: string): Promise<EnterpriseDeal[]> {
    await this.initialize();
    return this.enterpriseDeals.filter(deal => 
      deal.company.toLowerCase().includes(company.toLowerCase())
    );
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

  // Strategic Partnership Management
  async addStrategicPartnership(partnershipData: Omit<StrategicPartnership, 'id' | 'createdAt'>): Promise<StrategicPartnership> {
    await this.initialize();

    const newPartnership: StrategicPartnership = {
      ...partnershipData,
      id: this.generateId(),
      createdAt: new Date().toISOString()
    };

    this.strategicPartnerships.push(newPartnership);
    await this.saveData();
    return newPartnership;
  }

  async updateStrategicPartnership(partnershipId: string, updates: Partial<StrategicPartnership>): Promise<StrategicPartnership | null> {
    await this.initialize();

    const partnershipIndex = this.strategicPartnerships.findIndex(partnership => partnership.id === partnershipId);
    if (partnershipIndex === -1) return null;

    this.strategicPartnerships[partnershipIndex] = { ...this.strategicPartnerships[partnershipIndex], ...updates };
    await this.saveData();
    return this.strategicPartnerships[partnershipIndex];
  }

  async getAllStrategicPartnerships(): Promise<StrategicPartnership[]> {
    await this.initialize();
    return [...this.strategicPartnerships];
  }

  async getStrategicPartnershipsByStatus(status: StrategicPartnership['status']): Promise<StrategicPartnership[]> {
    await this.initialize();
    return this.strategicPartnerships.filter(partnership => partnership.status === status);
  }

  async getStrategicPartnershipsByType(type: StrategicPartnership['partnerType']): Promise<StrategicPartnership[]> {
    await this.initialize();
    return this.strategicPartnerships.filter(partnership => partnership.partnerType === type);
  }

  // Revenue Model Management
  async addRevenueModel(modelData: Omit<RevenueModel, 'id' | 'createdAt'>): Promise<RevenueModel> {
    await this.initialize();

    const newModel: RevenueModel = {
      ...modelData,
      id: this.generateId(),
      createdAt: new Date().toISOString()
    };

    this.revenueModels.push(newModel);
    await this.saveData();
    return newModel;
  }

  async updateRevenueModel(modelId: string, updates: Partial<RevenueModel>): Promise<RevenueModel | null> {
    await this.initialize();

    const modelIndex = this.revenueModels.findIndex(model => model.id === modelId);
    if (modelIndex === -1) return null;

    this.revenueModels[modelIndex] = { ...this.revenueModels[modelIndex], ...updates };
    await this.saveData();
    return this.revenueModels[modelIndex];
  }

  async getAllRevenueModels(): Promise<RevenueModel[]> {
    await this.initialize();
    return [...this.revenueModels];
  }

  async getActiveRevenueModels(): Promise<RevenueModel[]> {
    await this.initialize();
    return this.revenueModels.filter(model => model.isActive);
  }

  async updateRevenueMetrics(modelId: string, actualRevenue: number): Promise<RevenueModel | null> {
    await this.initialize();

    const model = this.revenueModels.find(m => m.id === modelId);
    if (!model) return null;

    model.actualRevenue = actualRevenue;
    
    // Calculate growth rate
    if (model.expectedRevenue > 0) {
      model.growthRate = ((actualRevenue - model.expectedRevenue) / model.expectedRevenue) * 100;
    }

    await this.saveData();
    return model;
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

  async getAllSalesPipelines(): Promise<SalesPipeline[]> {
    await this.initialize();
    return [...this.salesPipeline];
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

  // Business Metrics and Analytics
  async getBusinessMetrics(): Promise<BusinessMetrics> {
    await this.initialize();

    const totalRevenue = this.revenueModels.reduce((sum, model) => sum + model.actualRevenue, 0);
    const monthlyRecurringRevenue = this.calculateMRR();
    const annualRecurringRevenue = monthlyRecurringRevenue * 12;
    
    const customerAcquisitionCost = 150; // Mock data
    const customerLifetimeValue = 2500; // Mock data
    const churnRate = 5.2; // Mock data
    const growthRate = this.revenueModels.reduce((sum, model) => sum + model.growthRate, 0) / this.revenueModels.length || 0;
    
    const averageDealSize = this.enterpriseDeals.length > 0 
      ? this.enterpriseDeals.reduce((sum, deal) => sum + deal.dealValue, 0) / this.enterpriseDeals.length 
      : 0;
    
    const salesCycleLength = 45; // Mock data
    const conversionRate = 12.5; // Mock data

    return {
      totalRevenue,
      monthlyRecurringRevenue,
      annualRecurringRevenue,
      customerAcquisitionCost,
      customerLifetimeValue,
      churnRate,
      growthRate,
      averageDealSize,
      salesCycleLength,
      conversionRate
    };
  }

  private calculateMRR(): number {
    // Simplified MRR calculation based on pricing tiers
    const monthlyTiers = this.pricingTiers.filter(tier => tier.billingCycle === 'monthly');
    const yearlyTiers = this.pricingTiers.filter(tier => tier.billingCycle === 'yearly');
    
    let mrr = 0;
    
    // Add monthly subscriptions
    monthlyTiers.forEach(tier => {
      mrr += tier.price * 100; // Assume 100 customers per tier
    });
    
    // Add yearly subscriptions converted to monthly
    yearlyTiers.forEach(tier => {
      mrr += (tier.price / 12) * 50; // Assume 50 customers per tier
    });
    
    return mrr;
  }

  async getDealStatusDistribution(): Promise<Record<string, number>> {
    await this.initialize();

    return this.enterpriseDeals.reduce((acc, deal) => {
      acc[deal.status] = (acc[deal.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  async getPartnershipStatusDistribution(): Promise<Record<string, number>> {
    await this.initialize();

    return this.strategicPartnerships.reduce((acc, partnership) => {
      acc[partnership.status] = (acc[partnership.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  async getRevenueByModel(): Promise<Record<string, { expected: number; actual: number; growthRate: number }>> {
    await this.initialize();

    return this.revenueModels.reduce((acc, model) => {
      acc[model.name] = {
        expected: model.expectedRevenue,
        actual: model.actualRevenue,
        growthRate: model.growthRate
      };
      return acc;
    }, {} as Record<string, { expected: number; actual: number; growthRate: number }>);
  }

  async getPipelineValue(): Promise<{
    totalValue: number;
    weightedValue: number;
    stageValues: Record<string, number>;
  }> {
    await this.initialize();

    let totalValue = 0;
    let weightedValue = 0;
    const stageValues: Record<string, number> = {};

    this.salesPipeline.forEach(pipeline => {
      pipeline.stages.forEach(stage => {
        totalValue += stage.value;
        weightedValue += stage.value * (stage.probability / 100);
        stageValues[stage.name] = (stageValues[stage.name] || 0) + stage.value;
      });
    });

    return {
      totalValue,
      weightedValue,
      stageValues
    };
  }

  // Data Management
  private async loadData(): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
      const savedPricingTiers = localStorage.getItem('syncscript_pricing_tiers');
      const savedEnterpriseDeals = localStorage.getItem('syncscript_enterprise_deals');
      const savedPartnerships = localStorage.getItem('syncscript_strategic_partnerships');
      const savedRevenueModels = localStorage.getItem('syncscript_revenue_models');
      const savedSalesPipeline = localStorage.getItem('syncscript_sales_pipeline');

      if (savedPricingTiers) this.pricingTiers = JSON.parse(savedPricingTiers);
      if (savedEnterpriseDeals) this.enterpriseDeals = JSON.parse(savedEnterpriseDeals);
      if (savedPartnerships) this.strategicPartnerships = JSON.parse(savedPartnerships);
      if (savedRevenueModels) this.revenueModels = JSON.parse(savedRevenueModels);
      if (savedSalesPipeline) this.salesPipeline = JSON.parse(savedSalesPipeline);
    } catch (error) {
      console.error('Failed to load business development data:', error);
    }
  }

  private async saveData(): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem('syncscript_pricing_tiers', JSON.stringify(this.pricingTiers));
      localStorage.setItem('syncscript_enterprise_deals', JSON.stringify(this.enterpriseDeals));
      localStorage.setItem('syncscript_strategic_partnerships', JSON.stringify(this.strategicPartnerships));
      localStorage.setItem('syncscript_revenue_models', JSON.stringify(this.revenueModels));
      localStorage.setItem('syncscript_sales_pipeline', JSON.stringify(this.salesPipeline));
    } catch (error) {
      console.error('Failed to save business development data:', error);
    }
  }

  private generateId(): string {
    return `business_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Export/Import
  async exportData(): Promise<{
    pricingTiers: PricingTier[];
    enterpriseDeals: EnterpriseDeal[];
    strategicPartnerships: StrategicPartnership[];
    revenueModels: RevenueModel[];
    salesPipeline: SalesPipeline[];
    businessMetrics: BusinessMetrics;
  }> {
    await this.initialize();

    const businessMetrics = await this.getBusinessMetrics();

    return {
      pricingTiers: this.pricingTiers,
      enterpriseDeals: this.enterpriseDeals,
      strategicPartnerships: this.strategicPartnerships,
      revenueModels: this.revenueModels,
      salesPipeline: this.salesPipeline,
      businessMetrics
    };
  }

  async importData(data: {
    pricingTiers: PricingTier[];
    enterpriseDeals: EnterpriseDeal[];
    strategicPartnerships: StrategicPartnership[];
    revenueModels: RevenueModel[];
    salesPipeline: SalesPipeline[];
  }): Promise<void> {
    await this.initialize();

    this.pricingTiers = data.pricingTiers;
    this.enterpriseDeals = data.enterpriseDeals;
    this.strategicPartnerships = data.strategicPartnerships;
    this.revenueModels = data.revenueModels;
    this.salesPipeline = data.salesPipeline;
    await this.saveData();
  }

  // Cleanup
  async clearAllData(): Promise<void> {
    if (typeof window === 'undefined') return;

    this.pricingTiers = [];
    this.enterpriseDeals = [];
    this.strategicPartnerships = [];
    this.revenueModels = [];
    this.salesPipeline = [];

    localStorage.removeItem('syncscript_pricing_tiers');
    localStorage.removeItem('syncscript_enterprise_deals');
    localStorage.removeItem('syncscript_strategic_partnerships');
    localStorage.removeItem('syncscript_revenue_models');
    localStorage.removeItem('syncscript_sales_pipeline');
  }
}

// Singleton instance
let businessDevelopmentManager: BusinessDevelopmentManager | null = null;

export const getBusinessDevelopmentManager = (): BusinessDevelopmentManager => {
  if (!businessDevelopmentManager) {
    businessDevelopmentManager = new BusinessDevelopmentManager();
  }
  return businessDevelopmentManager;
};

export default BusinessDevelopmentManager;
