/**
 * Launch Execution & Market Entry Manager
 * 
 * Comprehensive utility for managing launch campaigns, milestones, market entry strategies,
 * launch team, risks, and metrics for successful market penetration and launch execution.
 */

export interface LaunchCampaign {
  id: string;
  name: string;
  type: 'product_launch' | 'market_entry' | 'feature_launch' | 'partnership_launch' | 'event_launch';
  status: 'planned' | 'active' | 'paused' | 'completed' | 'cancelled';
  startDate: string;
  endDate?: string;
  budget: number;
  currency: string;
  targetAudience: string[];
  channels: string[];
  metrics: LaunchMetrics;
  content: LaunchContent[];
  createdAt: string;
}

export interface LaunchMetrics {
  reach: number;
  impressions: number;
  clicks: number;
  conversions: number;
  signups: number;
  revenue: number;
  cost: number;
  roi: number;
  engagementRate: number;
  conversionRate: number;
}

export interface LaunchContent {
  id: string;
  type: 'announcement' | 'demo' | 'tutorial' | 'case_study' | 'press_release' | 'social_post';
  title: string;
  content: string;
  platform: string;
  status: 'draft' | 'review' | 'approved' | 'published';
  publishDate?: string;
  performance: ContentPerformance;
}

export interface ContentPerformance {
  views: number;
  likes: number;
  shares: number;
  comments: number;
  clicks: number;
}

export interface LaunchMilestone {
  id: string;
  name: string;
  description: string;
  type: 'pre_launch' | 'launch_day' | 'post_launch' | 'follow_up';
  status: 'pending' | 'in_progress' | 'completed' | 'delayed';
  dueDate: string;
  completedDate?: string;
  dependencies: string[];
  assignee: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: string;
}

export interface MarketEntryStrategy {
  id: string;
  name: string;
  targetMarket: string;
  region: string;
  strategy: 'direct_sales' | 'partnership' | 'channel' | 'online' | 'hybrid';
  status: 'research' | 'planning' | 'executing' | 'evaluating' | 'completed';
  budget: number;
  currency: string;
  timeline: string;
  successMetrics: string[];
  risks: string[];
  mitigation: string[];
  createdAt: string;
}

export interface LaunchTeam {
  id: string;
  name: string;
  role: 'project_manager' | 'marketing_manager' | 'product_manager' | 'developer' | 'designer' | 'analyst';
  email: string;
  phone: string;
  responsibilities: string[];
  availability: 'full_time' | 'part_time' | 'consultant';
  status: 'active' | 'inactive' | 'on_leave';
  joinDate: string;
}

export interface LaunchRisk {
  id: string;
  name: string;
  category: 'technical' | 'market' | 'competitive' | 'regulatory' | 'operational';
  probability: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  mitigation: string;
  owner: string;
  status: 'identified' | 'monitoring' | 'mitigating' | 'resolved';
  createdAt: string;
}

export class LaunchExecutionMarketEntryManager {
  private launchCampaigns: LaunchCampaign[] = [];
  private launchMilestones: LaunchMilestone[] = [];
  private marketEntryStrategies: MarketEntryStrategy[] = [];
  private launchTeam: LaunchTeam[] = [];
  private launchRisks: LaunchRisk[] = [];
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
      console.error('Failed to initialize Launch Execution Market Entry Manager:', error);
    }
  }

  // Launch Campaign Management
  async createLaunchCampaign(campaignData: Omit<LaunchCampaign, 'id' | 'metrics' | 'content' | 'createdAt'>): Promise<LaunchCampaign> {
    await this.initialize();

    const newCampaign: LaunchCampaign = {
      ...campaignData,
      id: this.generateId(),
      metrics: {
        reach: 0,
        impressions: 0,
        clicks: 0,
        conversions: 0,
        signups: 0,
        revenue: 0,
        cost: 0,
        roi: 0,
        engagementRate: 0,
        conversionRate: 0
      },
      content: [],
      createdAt: new Date().toISOString()
    };

    this.launchCampaigns.push(newCampaign);
    await this.saveData();
    return newCampaign;
  }

  async updateLaunchCampaign(campaignId: string, updates: Partial<LaunchCampaign>): Promise<LaunchCampaign | null> {
    await this.initialize();

    const campaignIndex = this.launchCampaigns.findIndex(campaign => campaign.id === campaignId);
    if (campaignIndex === -1) return null;

    this.launchCampaigns[campaignIndex] = { ...this.launchCampaigns[campaignIndex], ...updates };
    await this.saveData();
    return this.launchCampaigns[campaignIndex];
  }

  async updateCampaignMetrics(campaignId: string, metrics: Partial<LaunchMetrics>): Promise<LaunchCampaign | null> {
    await this.initialize();

    const campaign = this.launchCampaigns.find(c => c.id === campaignId);
    if (!campaign) return null;

    campaign.metrics = { ...campaign.metrics, ...metrics };
    
    // Calculate ROI
    if (campaign.metrics.cost > 0) {
      campaign.metrics.roi = ((campaign.metrics.revenue - campaign.metrics.cost) / campaign.metrics.cost) * 100;
    }

    // Calculate engagement rate
    if (campaign.metrics.impressions > 0) {
      campaign.metrics.engagementRate = (campaign.metrics.clicks / campaign.metrics.impressions) * 100;
    }

    // Calculate conversion rate
    if (campaign.metrics.clicks > 0) {
      campaign.metrics.conversionRate = (campaign.metrics.conversions / campaign.metrics.clicks) * 100;
    }

    await this.saveData();
    return campaign;
  }

  async addCampaignContent(campaignId: string, contentData: Omit<LaunchContent, 'id' | 'performance'>): Promise<LaunchContent | null> {
    await this.initialize();

    const campaign = this.launchCampaigns.find(c => c.id === campaignId);
    if (!campaign) return null;

    const newContent: LaunchContent = {
      ...contentData,
      id: this.generateId(),
      performance: {
        views: 0,
        likes: 0,
        shares: 0,
        comments: 0,
        clicks: 0
      }
    };

    campaign.content.push(newContent);
    await this.saveData();
    return newContent;
  }

  async getAllLaunchCampaigns(): Promise<LaunchCampaign[]> {
    await this.initialize();
    return [...this.launchCampaigns];
  }

  async getLaunchCampaignsByStatus(status: LaunchCampaign['status']): Promise<LaunchCampaign[]> {
    await this.initialize();
    return this.launchCampaigns.filter(campaign => campaign.status === status);
  }

  async getActiveLaunchCampaigns(): Promise<LaunchCampaign[]> {
    await this.initialize();
    return this.launchCampaigns.filter(campaign => campaign.status === 'active');
  }

  // Launch Milestone Management
  async addLaunchMilestone(milestoneData: Omit<LaunchMilestone, 'id' | 'createdAt'>): Promise<LaunchMilestone> {
    await this.initialize();

    const newMilestone: LaunchMilestone = {
      ...milestoneData,
      id: this.generateId(),
      createdAt: new Date().toISOString()
    };

    this.launchMilestones.push(newMilestone);
    await this.saveData();
    return newMilestone;
  }

  async updateLaunchMilestone(milestoneId: string, updates: Partial<LaunchMilestone>): Promise<LaunchMilestone | null> {
    await this.initialize();

    const milestoneIndex = this.launchMilestones.findIndex(milestone => milestone.id === milestoneId);
    if (milestoneIndex === -1) return null;

    this.launchMilestones[milestoneIndex] = { ...this.launchMilestones[milestoneIndex], ...updates };
    await this.saveData();
    return this.launchMilestones[milestoneIndex];
  }

  async completeMilestone(milestoneId: string): Promise<LaunchMilestone | null> {
    await this.initialize();

    const milestone = this.launchMilestones.find(m => m.id === milestoneId);
    if (!milestone) return null;

    milestone.status = 'completed';
    milestone.completedDate = new Date().toISOString();
    await this.saveData();
    return milestone;
  }

  async getAllLaunchMilestones(): Promise<LaunchMilestone[]> {
    await this.initialize();
    return [...this.launchMilestones];
  }

  async getLaunchMilestonesByStatus(status: LaunchMilestone['status']): Promise<LaunchMilestone[]> {
    await this.initialize();
    return this.launchMilestones.filter(milestone => milestone.status === status);
  }

  async getUpcomingMilestones(days: number = 7): Promise<LaunchMilestone[]> {
    await this.initialize();

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + days);

    return this.launchMilestones.filter(milestone => {
      const dueDate = new Date(milestone.dueDate);
      return dueDate <= futureDate && milestone.status !== 'completed';
    });
  }

  // Market Entry Strategy Management
  async addMarketEntryStrategy(strategyData: Omit<MarketEntryStrategy, 'id' | 'createdAt'>): Promise<MarketEntryStrategy> {
    await this.initialize();

    const newStrategy: MarketEntryStrategy = {
      ...strategyData,
      id: this.generateId(),
      createdAt: new Date().toISOString()
    };

    this.marketEntryStrategies.push(newStrategy);
    await this.saveData();
    return newStrategy;
  }

  async updateMarketEntryStrategy(strategyId: string, updates: Partial<MarketEntryStrategy>): Promise<MarketEntryStrategy | null> {
    await this.initialize();

    const strategyIndex = this.marketEntryStrategies.findIndex(strategy => strategy.id === strategyId);
    if (strategyIndex === -1) return null;

    this.marketEntryStrategies[strategyIndex] = { ...this.marketEntryStrategies[strategyIndex], ...updates };
    await this.saveData();
    return this.marketEntryStrategies[strategyIndex];
  }

  async getAllMarketEntryStrategies(): Promise<MarketEntryStrategy[]> {
    await this.initialize();
    return [...this.marketEntryStrategies];
  }

  async getMarketEntryStrategiesByStatus(status: MarketEntryStrategy['status']): Promise<MarketEntryStrategy[]> {
    await this.initialize();
    return this.marketEntryStrategies.filter(strategy => strategy.status === status);
  }

  async getMarketEntryStrategiesByRegion(region: string): Promise<MarketEntryStrategy[]> {
    await this.initialize();
    return this.marketEntryStrategies.filter(strategy => 
      strategy.region.toLowerCase().includes(region.toLowerCase())
    );
  }

  // Launch Team Management
  async addLaunchTeamMember(memberData: Omit<LaunchTeam, 'id' | 'joinDate'>): Promise<LaunchTeam> {
    await this.initialize();

    const newMember: LaunchTeam = {
      ...memberData,
      id: this.generateId(),
      joinDate: new Date().toISOString()
    };

    this.launchTeam.push(newMember);
    await this.saveData();
    return newMember;
  }

  async updateLaunchTeamMember(memberId: string, updates: Partial<LaunchTeam>): Promise<LaunchTeam | null> {
    await this.initialize();

    const memberIndex = this.launchTeam.findIndex(member => member.id === memberId);
    if (memberIndex === -1) return null;

    this.launchTeam[memberIndex] = { ...this.launchTeam[memberIndex], ...updates };
    await this.saveData();
    return this.launchTeam[memberIndex];
  }

  async getAllLaunchTeamMembers(): Promise<LaunchTeam[]> {
    await this.initialize();
    return [...this.launchTeam];
  }

  async getLaunchTeamMembersByRole(role: LaunchTeam['role']): Promise<LaunchTeam[]> {
    await this.initialize();
    return this.launchTeam.filter(member => member.role === role);
  }

  async getActiveLaunchTeamMembers(): Promise<LaunchTeam[]> {
    await this.initialize();
    return this.launchTeam.filter(member => member.status === 'active');
  }

  // Launch Risk Management
  async addLaunchRisk(riskData: Omit<LaunchRisk, 'id' | 'createdAt'>): Promise<LaunchRisk> {
    await this.initialize();

    const newRisk: LaunchRisk = {
      ...riskData,
      id: this.generateId(),
      createdAt: new Date().toISOString()
    };

    this.launchRisks.push(newRisk);
    await this.saveData();
    return newRisk;
  }

  async updateLaunchRisk(riskId: string, updates: Partial<LaunchRisk>): Promise<LaunchRisk | null> {
    await this.initialize();

    const riskIndex = this.launchRisks.findIndex(risk => risk.id === riskId);
    if (riskIndex === -1) return null;

    this.launchRisks[riskIndex] = { ...this.launchRisks[riskIndex], ...updates };
    await this.saveData();
    return this.launchRisks[riskIndex];
  }

  async resolveRisk(riskId: string): Promise<LaunchRisk | null> {
    await this.initialize();

    const risk = this.launchRisks.find(r => r.id === riskId);
    if (!risk) return null;

    risk.status = 'resolved';
    await this.saveData();
    return risk;
  }

  async getAllLaunchRisks(): Promise<LaunchRisk[]> {
    await this.initialize();
    return [...this.launchRisks];
  }

  async getLaunchRisksByCategory(category: LaunchRisk['category']): Promise<LaunchRisk[]> {
    await this.initialize();
    return this.launchRisks.filter(risk => risk.category === category);
  }

  async getHighPriorityRisks(): Promise<LaunchRisk[]> {
    await this.initialize();
    return this.launchRisks.filter(risk => 
      risk.probability === 'high' || risk.impact === 'critical' || risk.impact === 'high'
    );
  }

  // Analytics and Metrics
  async getOverallLaunchMetrics(): Promise<LaunchMetrics> {
    await this.initialize();

    const totalReach = this.launchCampaigns.reduce((sum, campaign) => sum + campaign.metrics.reach, 0);
    const totalImpressions = this.launchCampaigns.reduce((sum, campaign) => sum + campaign.metrics.impressions, 0);
    const totalClicks = this.launchCampaigns.reduce((sum, campaign) => sum + campaign.metrics.clicks, 0);
    const totalConversions = this.launchCampaigns.reduce((sum, campaign) => sum + campaign.metrics.conversions, 0);
    const totalSignups = this.launchCampaigns.reduce((sum, campaign) => sum + campaign.metrics.signups, 0);
    const totalRevenue = this.launchCampaigns.reduce((sum, campaign) => sum + campaign.metrics.revenue, 0);
    const totalCost = this.launchCampaigns.reduce((sum, campaign) => sum + campaign.metrics.cost, 0);
    
    const averageROI = this.launchCampaigns.length > 0 
      ? this.launchCampaigns.reduce((sum, campaign) => sum + campaign.metrics.roi, 0) / this.launchCampaigns.length 
      : 0;

    const averageEngagementRate = this.launchCampaigns.length > 0 
      ? this.launchCampaigns.reduce((sum, campaign) => sum + campaign.metrics.engagementRate, 0) / this.launchCampaigns.length 
      : 0;

    const averageConversionRate = this.launchCampaigns.length > 0 
      ? this.launchCampaigns.reduce((sum, campaign) => sum + campaign.metrics.conversionRate, 0) / this.launchCampaigns.length 
      : 0;

    return {
      reach: totalReach,
      impressions: totalImpressions,
      clicks: totalClicks,
      conversions: totalConversions,
      signups: totalSignups,
      revenue: totalRevenue,
      cost: totalCost,
      roi: averageROI,
      engagementRate: averageEngagementRate,
      conversionRate: averageConversionRate
    };
  }

  async getCampaignPerformance(): Promise<{
    topPerformingCampaigns: LaunchCampaign[];
    averageROI: number;
    totalBudget: number;
    totalSpent: number;
  }> {
    await this.initialize();

    const topPerformingCampaigns = [...this.launchCampaigns]
      .sort((a, b) => b.metrics.roi - a.metrics.roi)
      .slice(0, 5);

    const averageROI = this.launchCampaigns.length > 0 
      ? this.launchCampaigns.reduce((sum, campaign) => sum + campaign.metrics.roi, 0) / this.launchCampaigns.length 
      : 0;

    const totalBudget = this.launchCampaigns.reduce((sum, campaign) => sum + campaign.budget, 0);
    const totalSpent = this.launchCampaigns.reduce((sum, campaign) => sum + campaign.metrics.cost, 0);

    return {
      topPerformingCampaigns,
      averageROI,
      totalBudget,
      totalSpent
    };
  }

  async getMilestoneStatusDistribution(): Promise<Record<string, number>> {
    await this.initialize();

    return this.launchMilestones.reduce((acc, milestone) => {
      acc[milestone.status] = (acc[milestone.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  async getRiskDistribution(): Promise<{
    byCategory: Record<string, number>;
    byProbability: Record<string, number>;
    byImpact: Record<string, number>;
    byStatus: Record<string, number>;
  }> {
    await this.initialize();

    const byCategory = this.launchRisks.reduce((acc, risk) => {
      acc[risk.category] = (acc[risk.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const byProbability = this.launchRisks.reduce((acc, risk) => {
      acc[risk.probability] = (acc[risk.probability] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const byImpact = this.launchRisks.reduce((acc, risk) => {
      acc[risk.impact] = (acc[risk.impact] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const byStatus = this.launchRisks.reduce((acc, risk) => {
      acc[risk.status] = (acc[risk.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      byCategory,
      byProbability,
      byImpact,
      byStatus
    };
  }

  async getTeamDistribution(): Promise<{
    byRole: Record<string, number>;
    byStatus: Record<string, number>;
    byAvailability: Record<string, number>;
  }> {
    await this.initialize();

    const byRole = this.launchTeam.reduce((acc, member) => {
      acc[member.role] = (acc[member.role] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const byStatus = this.launchTeam.reduce((acc, member) => {
      acc[member.status] = (acc[member.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const byAvailability = this.launchTeam.reduce((acc, member) => {
      acc[member.availability] = (acc[member.availability] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      byRole,
      byStatus,
      byAvailability
    };
  }

  // Data Management
  private async loadData(): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
      const savedCampaigns = localStorage.getItem('syncscript_launch_campaigns');
      const savedMilestones = localStorage.getItem('syncscript_launch_milestones');
      const savedStrategies = localStorage.getItem('syncscript_market_entry_strategies');
      const savedTeam = localStorage.getItem('syncscript_launch_team');
      const savedRisks = localStorage.getItem('syncscript_launch_risks');

      if (savedCampaigns) this.launchCampaigns = JSON.parse(savedCampaigns);
      if (savedMilestones) this.launchMilestones = JSON.parse(savedMilestones);
      if (savedStrategies) this.marketEntryStrategies = JSON.parse(savedStrategies);
      if (savedTeam) this.launchTeam = JSON.parse(savedTeam);
      if (savedRisks) this.launchRisks = JSON.parse(savedRisks);
    } catch (error) {
      console.error('Failed to load launch execution data:', error);
    }
  }

  private async saveData(): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem('syncscript_launch_campaigns', JSON.stringify(this.launchCampaigns));
      localStorage.setItem('syncscript_launch_milestones', JSON.stringify(this.launchMilestones));
      localStorage.setItem('syncscript_market_entry_strategies', JSON.stringify(this.marketEntryStrategies));
      localStorage.setItem('syncscript_launch_team', JSON.stringify(this.launchTeam));
      localStorage.setItem('syncscript_launch_risks', JSON.stringify(this.launchRisks));
    } catch (error) {
      console.error('Failed to save launch execution data:', error);
    }
  }

  private generateId(): string {
    return `launch_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Export/Import
  async exportData(): Promise<{
    launchCampaigns: LaunchCampaign[];
    launchMilestones: LaunchMilestone[];
    marketEntryStrategies: MarketEntryStrategy[];
    launchTeam: LaunchTeam[];
    launchRisks: LaunchRisk[];
    overallMetrics: LaunchMetrics;
  }> {
    await this.initialize();

    const overallMetrics = await this.getOverallLaunchMetrics();

    return {
      launchCampaigns: this.launchCampaigns,
      launchMilestones: this.launchMilestones,
      marketEntryStrategies: this.marketEntryStrategies,
      launchTeam: this.launchTeam,
      launchRisks: this.launchRisks,
      overallMetrics
    };
  }

  async importData(data: {
    launchCampaigns: LaunchCampaign[];
    launchMilestones: LaunchMilestone[];
    marketEntryStrategies: MarketEntryStrategy[];
    launchTeam: LaunchTeam[];
    launchRisks: LaunchRisk[];
  }): Promise<void> {
    await this.initialize();

    this.launchCampaigns = data.launchCampaigns;
    this.launchMilestones = data.launchMilestones;
    this.marketEntryStrategies = data.marketEntryStrategies;
    this.launchTeam = data.launchTeam;
    this.launchRisks = data.launchRisks;
    await this.saveData();
  }

  // Cleanup
  async clearAllData(): Promise<void> {
    if (typeof window === 'undefined') return;

    this.launchCampaigns = [];
    this.launchMilestones = [];
    this.marketEntryStrategies = [];
    this.launchTeam = [];
    this.launchRisks = [];

    localStorage.removeItem('syncscript_launch_campaigns');
    localStorage.removeItem('syncscript_launch_milestones');
    localStorage.removeItem('syncscript_market_entry_strategies');
    localStorage.removeItem('syncscript_launch_team');
    localStorage.removeItem('syncscript_launch_risks');
  }
}

// Singleton instance
let launchExecutionMarketEntryManager: LaunchExecutionMarketEntryManager | null = null;

export const getLaunchExecutionMarketEntryManager = (): LaunchExecutionMarketEntryManager => {
  if (!launchExecutionMarketEntryManager) {
    launchExecutionMarketEntryManager = new LaunchExecutionMarketEntryManager();
  }
  return launchExecutionMarketEntryManager;
};

export default LaunchExecutionMarketEntryManager;
