/**
 * Marketing & Launch Preparation Manager
 * 
 * Comprehensive utility for managing marketing assets, launch campaigns, content calendar,
 * press kit, and launch metrics for go-to-market strategy execution.
 */

export interface MarketingAsset {
  id: string;
  name: string;
  type: 'logo' | 'banner' | 'social_post' | 'email_template' | 'press_release' | 'video' | 'infographic';
  status: 'draft' | 'review' | 'approved' | 'published';
  url: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export interface LaunchCampaign {
  id: string;
  name: string;
  type: 'product_hunt' | 'social_media' | 'email' | 'pr' | 'influencer' | 'content';
  status: 'planned' | 'active' | 'paused' | 'completed';
  startDate: string;
  endDate?: string;
  budget: number;
  targetAudience: string[];
  metrics: CampaignMetrics;
  content: CampaignContent[];
}

export interface CampaignMetrics {
  reach: number;
  impressions: number;
  clicks: number;
  conversions: number;
  cost: number;
  roi: number;
}

export interface CampaignContent {
  id: string;
  type: 'post' | 'email' | 'video' | 'article' | 'ad';
  title: string;
  content: string;
  platform: string;
  status: 'draft' | 'scheduled' | 'published';
  publishDate?: string;
}

export interface ContentCalendar {
  id: string;
  title: string;
  type: 'blog_post' | 'social_media' | 'email' | 'video' | 'webinar';
  status: 'planned' | 'in_progress' | 'published';
  publishDate: string;
  platform: string;
  tags: string[];
}

export interface PressKit {
  id: string;
  title: string;
  type: 'press_release' | 'media_kit' | 'fact_sheet' | 'biography';
  status: 'draft' | 'review' | 'approved' | 'distributed';
  content: string;
  attachments: string[];
  createdAt: string;
}

export interface LaunchMetrics {
  totalReach: number;
  totalImpressions: number;
  totalClicks: number;
  totalConversions: number;
  totalCost: number;
  averageROI: number;
  engagementRate: number;
  conversionRate: number;
}

export class MarketingLaunchPreparationManager {
  private marketingAssets: MarketingAsset[] = [];
  private launchCampaigns: LaunchCampaign[] = [];
  private contentCalendar: ContentCalendar[] = [];
  private pressKit: PressKit[] = [];
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
      console.error('Failed to initialize Marketing Launch Preparation Manager:', error);
    }
  }

  // Marketing Assets Management
  async addMarketingAsset(assetData: Omit<MarketingAsset, 'id' | 'createdAt' | 'updatedAt'>): Promise<MarketingAsset> {
    await this.initialize();

    const newAsset: MarketingAsset = {
      ...assetData,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.marketingAssets.push(newAsset);
    await this.saveData();
    return newAsset;
  }

  async updateMarketingAsset(assetId: string, updates: Partial<MarketingAsset>): Promise<MarketingAsset | null> {
    await this.initialize();

    const assetIndex = this.marketingAssets.findIndex(asset => asset.id === assetId);
    if (assetIndex === -1) return null;

    this.marketingAssets[assetIndex] = { 
      ...this.marketingAssets[assetIndex], 
      ...updates, 
      updatedAt: new Date().toISOString() 
    };
    await this.saveData();
    return this.marketingAssets[assetIndex];
  }

  async getAllMarketingAssets(): Promise<MarketingAsset[]> {
    await this.initialize();
    return [...this.marketingAssets];
  }

  async getMarketingAssetsByType(type: MarketingAsset['type']): Promise<MarketingAsset[]> {
    await this.initialize();
    return this.marketingAssets.filter(asset => asset.type === type);
  }

  async getMarketingAssetsByStatus(status: MarketingAsset['status']): Promise<MarketingAsset[]> {
    await this.initialize();
    return this.marketingAssets.filter(asset => asset.status === status);
  }

  // Launch Campaign Management
  async createLaunchCampaign(campaignData: Omit<LaunchCampaign, 'id' | 'metrics' | 'content'>): Promise<LaunchCampaign> {
    await this.initialize();

    const newCampaign: LaunchCampaign = {
      ...campaignData,
      id: this.generateId(),
      metrics: {
        reach: 0,
        impressions: 0,
        clicks: 0,
        conversions: 0,
        cost: 0,
        roi: 0
      },
      content: []
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

  async addCampaignContent(campaignId: string, contentData: Omit<CampaignContent, 'id'>): Promise<CampaignContent | null> {
    await this.initialize();

    const campaign = this.launchCampaigns.find(c => c.id === campaignId);
    if (!campaign) return null;

    const newContent: CampaignContent = {
      ...contentData,
      id: this.generateId()
    };

    campaign.content.push(newContent);
    await this.saveData();
    return newContent;
  }

  async updateCampaignMetrics(campaignId: string, metrics: Partial<CampaignMetrics>): Promise<LaunchCampaign | null> {
    await this.initialize();

    const campaign = this.launchCampaigns.find(c => c.id === campaignId);
    if (!campaign) return null;

    campaign.metrics = { ...campaign.metrics, ...metrics };
    
    // Calculate ROI
    if (campaign.metrics.cost > 0) {
      campaign.metrics.roi = ((campaign.metrics.conversions * 100) / campaign.metrics.cost) * 100;
    }

    await this.saveData();
    return campaign;
  }

  async getAllLaunchCampaigns(): Promise<LaunchCampaign[]> {
    await this.initialize();
    return [...this.launchCampaigns];
  }

  async getLaunchCampaignsByStatus(status: LaunchCampaign['status']): Promise<LaunchCampaign[]> {
    await this.initialize();
    return this.launchCampaigns.filter(campaign => campaign.status === status);
  }

  // Content Calendar Management
  async addContentCalendarItem(itemData: Omit<ContentCalendar, 'id'>): Promise<ContentCalendar> {
    await this.initialize();

    const newItem: ContentCalendar = {
      ...itemData,
      id: this.generateId()
    };

    this.contentCalendar.push(newItem);
    await this.saveData();
    return newItem;
  }

  async updateContentCalendarItem(itemId: string, updates: Partial<ContentCalendar>): Promise<ContentCalendar | null> {
    await this.initialize();

    const itemIndex = this.contentCalendar.findIndex(item => item.id === itemId);
    if (itemIndex === -1) return null;

    this.contentCalendar[itemIndex] = { ...this.contentCalendar[itemIndex], ...updates };
    await this.saveData();
    return this.contentCalendar[itemIndex];
  }

  async getAllContentCalendarItems(): Promise<ContentCalendar[]> {
    await this.initialize();
    return [...this.contentCalendar];
  }

  async getContentCalendarByStatus(status: ContentCalendar['status']): Promise<ContentCalendar[]> {
    await this.initialize();
    return this.contentCalendar.filter(item => item.status === status);
  }

  async getUpcomingContent(days: number = 7): Promise<ContentCalendar[]> {
    await this.initialize();

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + days);

    return this.contentCalendar.filter(item => {
      const publishDate = new Date(item.publishDate);
      return publishDate <= futureDate && item.status !== 'published';
    });
  }

  // Press Kit Management
  async addPressKitItem(itemData: Omit<PressKit, 'id' | 'createdAt'>): Promise<PressKit> {
    await this.initialize();

    const newItem: PressKit = {
      ...itemData,
      id: this.generateId(),
      createdAt: new Date().toISOString()
    };

    this.pressKit.push(newItem);
    await this.saveData();
    return newItem;
  }

  async updatePressKitItem(itemId: string, updates: Partial<PressKit>): Promise<PressKit | null> {
    await this.initialize();

    const itemIndex = this.pressKit.findIndex(item => item.id === itemId);
    if (itemIndex === -1) return null;

    this.pressKit[itemIndex] = { ...this.pressKit[itemIndex], ...updates };
    await this.saveData();
    return this.pressKit[itemIndex];
  }

  async getAllPressKitItems(): Promise<PressKit[]> {
    await this.initialize();
    return [...this.pressKit];
  }

  async getPressKitByType(type: PressKit['type']): Promise<PressKit[]> {
    await this.initialize();
    return this.pressKit.filter(item => item.type === type);
  }

  // Analytics and Metrics
  async getLaunchMetrics(): Promise<LaunchMetrics> {
    await this.initialize();

    const totalReach = this.launchCampaigns.reduce((sum, campaign) => sum + campaign.metrics.reach, 0);
    const totalImpressions = this.launchCampaigns.reduce((sum, campaign) => sum + campaign.metrics.impressions, 0);
    const totalClicks = this.launchCampaigns.reduce((sum, campaign) => sum + campaign.metrics.clicks, 0);
    const totalConversions = this.launchCampaigns.reduce((sum, campaign) => sum + campaign.metrics.conversions, 0);
    const totalCost = this.launchCampaigns.reduce((sum, campaign) => sum + campaign.metrics.cost, 0);
    
    const averageROI = this.launchCampaigns.length > 0 
      ? this.launchCampaigns.reduce((sum, campaign) => sum + campaign.metrics.roi, 0) / this.launchCampaigns.length 
      : 0;

    const engagementRate = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
    const conversionRate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;

    return {
      totalReach,
      totalImpressions,
      totalClicks,
      totalConversions,
      totalCost,
      averageROI,
      engagementRate,
      conversionRate
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

  async getAssetStatusDistribution(): Promise<Record<string, number>> {
    await this.initialize();

    return this.marketingAssets.reduce((acc, asset) => {
      acc[asset.status] = (acc[asset.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  async getContentCalendarDistribution(): Promise<Record<string, number>> {
    await this.initialize();

    return this.contentCalendar.reduce((acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  // Campaign Automation
  async scheduleCampaign(campaignId: string, startDate: string): Promise<boolean> {
    await this.initialize();

    const campaign = this.launchCampaigns.find(c => c.id === campaignId);
    if (!campaign) return false;

    campaign.startDate = startDate;
    campaign.status = 'planned';
    await this.saveData();
    return true;
  }

  async activateCampaign(campaignId: string): Promise<boolean> {
    await this.initialize();

    const campaign = this.launchCampaigns.find(c => c.id === campaignId);
    if (!campaign) return false;

    campaign.status = 'active';
    await this.saveData();
    return true;
  }

  async pauseCampaign(campaignId: string): Promise<boolean> {
    await this.initialize();

    const campaign = this.launchCampaigns.find(c => c.id === campaignId);
    if (!campaign) return false;

    campaign.status = 'paused';
    await this.saveData();
    return true;
  }

  async completeCampaign(campaignId: string): Promise<boolean> {
    await this.initialize();

    const campaign = this.launchCampaigns.find(c => c.id === campaignId);
    if (!campaign) return false;

    campaign.status = 'completed';
    campaign.endDate = new Date().toISOString();
    await this.saveData();
    return true;
  }

  // Data Management
  private async loadData(): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
      const savedAssets = localStorage.getItem('syncscript_marketing_assets');
      const savedCampaigns = localStorage.getItem('syncscript_launch_campaigns');
      const savedCalendar = localStorage.getItem('syncscript_content_calendar');
      const savedPressKit = localStorage.getItem('syncscript_press_kit');

      if (savedAssets) this.marketingAssets = JSON.parse(savedAssets);
      if (savedCampaigns) this.launchCampaigns = JSON.parse(savedCampaigns);
      if (savedCalendar) this.contentCalendar = JSON.parse(savedCalendar);
      if (savedPressKit) this.pressKit = JSON.parse(savedPressKit);
    } catch (error) {
      console.error('Failed to load marketing data:', error);
    }
  }

  private async saveData(): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem('syncscript_marketing_assets', JSON.stringify(this.marketingAssets));
      localStorage.setItem('syncscript_launch_campaigns', JSON.stringify(this.launchCampaigns));
      localStorage.setItem('syncscript_content_calendar', JSON.stringify(this.contentCalendar));
      localStorage.setItem('syncscript_press_kit', JSON.stringify(this.pressKit));
    } catch (error) {
      console.error('Failed to save marketing data:', error);
    }
  }

  private generateId(): string {
    return `marketing_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Export/Import
  async exportData(): Promise<{
    marketingAssets: MarketingAsset[];
    launchCampaigns: LaunchCampaign[];
    contentCalendar: ContentCalendar[];
    pressKit: PressKit[];
    launchMetrics: LaunchMetrics;
  }> {
    await this.initialize();

    const launchMetrics = await this.getLaunchMetrics();

    return {
      marketingAssets: this.marketingAssets,
      launchCampaigns: this.launchCampaigns,
      contentCalendar: this.contentCalendar,
      pressKit: this.pressKit,
      launchMetrics
    };
  }

  async importData(data: {
    marketingAssets: MarketingAsset[];
    launchCampaigns: LaunchCampaign[];
    contentCalendar: ContentCalendar[];
    pressKit: PressKit[];
  }): Promise<void> {
    await this.initialize();

    this.marketingAssets = data.marketingAssets;
    this.launchCampaigns = data.launchCampaigns;
    this.contentCalendar = data.contentCalendar;
    this.pressKit = data.pressKit;
    await this.saveData();
  }

  // Cleanup
  async clearAllData(): Promise<void> {
    if (typeof window === 'undefined') return;

    this.marketingAssets = [];
    this.launchCampaigns = [];
    this.contentCalendar = [];
    this.pressKit = [];

    localStorage.removeItem('syncscript_marketing_assets');
    localStorage.removeItem('syncscript_launch_campaigns');
    localStorage.removeItem('syncscript_content_calendar');
    localStorage.removeItem('syncscript_press_kit');
  }
}

// Singleton instance
let marketingLaunchPreparationManager: MarketingLaunchPreparationManager | null = null;

export const getMarketingLaunchPreparationManager = (): MarketingLaunchPreparationManager => {
  if (!marketingLaunchPreparationManager) {
    marketingLaunchPreparationManager = new MarketingLaunchPreparationManager();
  }
  return marketingLaunchPreparationManager;
};

export default MarketingLaunchPreparationManager;
