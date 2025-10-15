/**
 * Market Validation Manager
 * 
 * Comprehensive utility for managing beta users, product-market fit metrics,
 * feedback tracking, user interviews, feature validations, and market insights.
 */

export interface BetaUser {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  industry: string;
  companySize: string;
  joinDate: string;
  status: 'active' | 'inactive' | 'churned' | 'onboarding';
  tier: 'free' | 'premium' | 'enterprise';
  usage: UserUsage;
  feedback: UserFeedback[];
  interviews: UserInterview[];
  createdAt: string;
}

export interface UserUsage {
  totalSessions: number;
  averageSessionDuration: number;
  featuresUsed: string[];
  lastActiveDate: string;
  weeklyActiveDays: number;
  monthlyActiveDays: number;
  coreFeaturesUsed: number;
  advancedFeaturesUsed: number;
}

export interface UserFeedback {
  id: string;
  type: 'bug_report' | 'feature_request' | 'improvement' | 'complaint' | 'praise';
  category: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  rating: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface UserInterview {
  id: string;
  type: 'discovery' | 'usability' | 'feedback' | 'exit';
  date: string;
  duration: number;
  interviewer: string;
  participants: string[];
  questions: InterviewQuestion[];
  insights: string[];
  painPoints: string[];
  suggestions: string[];
  satisfaction: number;
  createdAt: string;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface ProductMarketFitMetrics {
  id: string;
  period: string;
  npsScore: number;
  retentionRate: number;
  weeklyActiveUsers: number;
  monthlyActiveUsers: number;
  userSatisfactionScore: number;
  organicGrowthRate: number;
  referralRate: number;
  churnRate: number;
  engagementScore: number;
  featureAdoptionRate: number;
  createdAt: string;
}

export interface FeatureValidation {
  id: string;
  featureName: string;
  description: string;
  status: 'planned' | 'in_development' | 'testing' | 'released' | 'deprecated';
  validationMethod: 'user_interview' | 'survey' | 'a_b_test' | 'usage_analytics' | 'feedback_analysis';
  targetUsers: string[];
  successCriteria: string[];
  metrics: ValidationMetrics;
  results: ValidationResults;
  createdAt: string;
}

export interface ValidationMetrics {
  adoptionRate: number;
  usageFrequency: number;
  userSatisfaction: number;
  completionRate: number;
  errorRate: number;
  supportTickets: number;
}

export interface ValidationResults {
  validated: boolean;
  confidence: number;
  keyInsights: string[];
  recommendations: string[];
  nextSteps: string[];
  completionDate?: string;
}

export interface UserSegment {
  id: string;
  name: string;
  criteria: SegmentCriteria;
  userCount: number;
  characteristics: string[];
  painPoints: string[];
  needs: string[];
  satisfactionScore: number;
  retentionRate: number;
  createdAt: string;
}

export interface SegmentCriteria {
  industry: string[];
  companySize: string[];
  role: string[];
  usageLevel: string[];
  tenure: string[];
  geography: string[];
}

export interface MarketInsight {
  id: string;
  title: string;
  category: 'user_behavior' | 'market_trend' | 'competitor_analysis' | 'feature_demand' | 'pain_point';
  description: string;
  source: string;
  confidence: number;
  impact: 'low' | 'medium' | 'high';
  priority: 'low' | 'medium' | 'high';
  status: 'new' | 'validating' | 'validated' | 'implemented' | 'rejected';
  tags: string[];
  createdAt: string;
}

export interface ValidationCampaign {
  id: string;
  name: string;
  objective: string;
  targetSegment: string;
  method: 'survey' | 'interview' | 'focus_group' | 'beta_test' | 'a_b_test';
  participants: number;
  duration: number;
  status: 'planned' | 'active' | 'completed' | 'cancelled';
  results: CampaignResults;
  createdAt: string;
}

export interface CampaignResults {
  responseRate: number;
  completionRate: number;
  keyFindings: string[];
  recommendations: string[];
  satisfactionScore: number;
  completionDate?: string;
}

export class MarketValidationManager {
  private betaUsers: BetaUser[] = [];
  private pmfMetrics: ProductMarketFitMetrics[] = [];
  private featureValidations: FeatureValidation[] = [];
  private userSegments: UserSegment[] = [];
  private marketInsights: MarketInsight[] = [];
  private validationCampaigns: ValidationCampaign[] = [];
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
      console.error('Failed to initialize Market Validation Manager:', error);
    }
  }

  // Beta User Management
  async addBetaUser(userData: Omit<BetaUser, 'id' | 'createdAt' | 'feedback' | 'interviews'>): Promise<BetaUser> {
    await this.initialize();

    const newUser: BetaUser = {
      ...userData,
      id: this.generateId(),
      feedback: [],
      interviews: [],
      createdAt: new Date().toISOString()
    };

    this.betaUsers.push(newUser);
    await this.saveData();
    return newUser;
  }

  async updateBetaUser(userId: string, updates: Partial<BetaUser>): Promise<BetaUser | null> {
    await this.initialize();

    const userIndex = this.betaUsers.findIndex(user => user.id === userId);
    if (userIndex === -1) return null;

    this.betaUsers[userIndex] = { ...this.betaUsers[userIndex], ...updates };
    await this.saveData();
    return this.betaUsers[userIndex];
  }

  async getAllBetaUsers(): Promise<BetaUser[]> {
    await this.initialize();
    return [...this.betaUsers];
  }

  async getActiveBetaUsers(): Promise<BetaUser[]> {
    await this.initialize();
    return this.betaUsers.filter(user => user.status === 'active');
  }

  // User Feedback Management
  async addUserFeedback(userId: string, feedbackData: Omit<UserFeedback, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserFeedback | null> {
    await this.initialize();

    const user = this.betaUsers.find(u => u.id === userId);
    if (!user) return null;

    const newFeedback: UserFeedback = {
      ...feedbackData,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    user.feedback.push(newFeedback);
    await this.saveData();
    return newFeedback;
  }

  async getAllUserFeedback(): Promise<UserFeedback[]> {
    await this.initialize();
    const allFeedback: UserFeedback[] = [];
    this.betaUsers.forEach(user => {
      allFeedback.push(...user.feedback);
    });
    return allFeedback;
  }

  // Product-Market Fit Metrics Management
  async addPMFMetrics(metricsData: Omit<ProductMarketFitMetrics, 'id' | 'createdAt'>): Promise<ProductMarketFitMetrics> {
    await this.initialize();

    const newMetrics: ProductMarketFitMetrics = {
      ...metricsData,
      id: this.generateId(),
      createdAt: new Date().toISOString()
    };

    this.pmfMetrics.push(newMetrics);
    await this.saveData();
    return newMetrics;
  }

  async getAllPMFMetrics(): Promise<ProductMarketFitMetrics[]> {
    await this.initialize();
    return [...this.pmfMetrics];
  }

  // Feature Validation Management
  async addFeatureValidation(validationData: Omit<FeatureValidation, 'id' | 'createdAt'>): Promise<FeatureValidation> {
    await this.initialize();

    const newValidation: FeatureValidation = {
      ...validationData,
      id: this.generateId(),
      createdAt: new Date().toISOString()
    };

    this.featureValidations.push(newValidation);
    await this.saveData();
    return newValidation;
  }

  async getAllFeatureValidations(): Promise<FeatureValidation[]> {
    await this.initialize();
    return [...this.featureValidations];
  }

  // Analytics
  async getMarketValidationAnalytics(): Promise<{
    totalBetaUsers: number;
    activeBetaUsers: number;
    averageNpsScore: number;
    averageRetentionRate: number;
    averageSatisfactionScore: number;
    totalFeedbackItems: number;
    totalFeatureValidations: number;
  }> {
    await this.initialize();

    const totalBetaUsers = this.betaUsers.length;
    const activeBetaUsers = this.betaUsers.filter(user => user.status === 'active').length;
    
    const averageNpsScore = this.pmfMetrics.length > 0 
      ? this.pmfMetrics.reduce((sum, metrics) => sum + metrics.npsScore, 0) / this.pmfMetrics.length 
      : 0;
    
    const averageRetentionRate = this.pmfMetrics.length > 0 
      ? this.pmfMetrics.reduce((sum, metrics) => sum + metrics.retentionRate, 0) / this.pmfMetrics.length 
      : 0;
    
    const averageSatisfactionScore = this.pmfMetrics.length > 0 
      ? this.pmfMetrics.reduce((sum, metrics) => sum + metrics.userSatisfactionScore, 0) / this.pmfMetrics.length 
      : 0;

    const allFeedback = await this.getAllUserFeedback();
    const totalFeedbackItems = allFeedback.length;

    const totalFeatureValidations = this.featureValidations.length;

    return {
      totalBetaUsers,
      activeBetaUsers,
      averageNpsScore,
      averageRetentionRate,
      averageSatisfactionScore,
      totalFeedbackItems,
      totalFeatureValidations
    };
  }

  // Data Management
  private async loadData(): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
      const savedBetaUsers = localStorage.getItem('syncscript_beta_users');
      const savedPmfMetrics = localStorage.getItem('syncscript_pmf_metrics');
      const savedFeatureValidations = localStorage.getItem('syncscript_feature_validations');

      if (savedBetaUsers) this.betaUsers = JSON.parse(savedBetaUsers);
      if (savedPmfMetrics) this.pmfMetrics = JSON.parse(savedPmfMetrics);
      if (savedFeatureValidations) this.featureValidations = JSON.parse(savedFeatureValidations);
    } catch (error) {
      console.error('Failed to load market validation data:', error);
    }
  }

  private async saveData(): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem('syncscript_beta_users', JSON.stringify(this.betaUsers));
      localStorage.setItem('syncscript_pmf_metrics', JSON.stringify(this.pmfMetrics));
      localStorage.setItem('syncscript_feature_validations', JSON.stringify(this.featureValidations));
    } catch (error) {
      console.error('Failed to save market validation data:', error);
    }
  }

  private generateId(): string {
    return `market_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Singleton instance
let marketValidationManager: MarketValidationManager | null = null;

export const getMarketValidationManager = (): MarketValidationManager => {
  if (!marketValidationManager) {
    marketValidationManager = new MarketValidationManager();
  }
  return marketValidationManager;
};

export default MarketValidationManager;
