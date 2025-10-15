/**
 * Beta User Recruitment Manager
 * 
 * Comprehensive utility for managing beta user recruitment, testing, and feedback collection.
 * Handles user profiles, tier management, campaign tracking, feedback analysis, and incentive programs.
 */

export interface BetaUser {
  id: string;
  name: string;
  email: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  status: 'pending' | 'active' | 'inactive' | 'graduated';
  joinDate: string;
  lastActive: string;
  profile: UserProfile;
  incentives: Incentive[];
  feedback: Feedback[];
  metrics: UserMetrics;
}

export interface UserProfile {
  company: string;
  role: string;
  industry: string;
  experience: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  interests: string[];
  goals: string[];
  preferences: UserPreferences;
}

export interface UserPreferences {
  communicationFrequency: 'daily' | 'weekly' | 'monthly';
  preferredChannels: string[];
  timezone: string;
  language: string;
}

export interface Incentive {
  id: string;
  type: 'discount' | 'early_access' | 'exclusive_feature' | 'recognition' | 'monetary';
  title: string;
  description: string;
  value: number;
  currency: string;
  status: 'available' | 'claimed' | 'expired';
  claimedAt?: string;
  expiresAt: string;
}

export interface Feedback {
  id: string;
  type: 'bug_report' | 'feature_request' | 'usability' | 'performance' | 'general';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  status: 'submitted' | 'under_review' | 'in_progress' | 'resolved' | 'rejected';
  submittedAt: string;
  resolvedAt?: string;
  votes: number;
  comments: FeedbackComment[];
}

export interface FeedbackComment {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
  isOfficial: boolean;
}

export interface UserMetrics {
  sessionsCount: number;
  totalTimeSpent: number;
  featuresUsed: number;
  bugsReported: number;
  feedbackSubmitted: number;
  referralsMade: number;
  satisfactionScore: number;
}

export interface Campaign {
  id: string;
  name: string;
  type: 'email' | 'social' | 'referral' | 'content' | 'event' | 'partnership';
  status: 'planned' | 'active' | 'paused' | 'completed';
  targetAudience: string[];
  startDate: string;
  endDate?: string;
  budget: number;
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
  type: 'email' | 'social_post' | 'blog_post' | 'video' | 'infographic';
  title: string;
  content: string;
  status: 'draft' | 'review' | 'approved' | 'published';
  publishDate?: string;
}

export interface FeedbackAnalytics {
  totalFeedback: number;
  byType: Record<string, number>;
  byPriority: Record<string, number>;
  byStatus: Record<string, number>;
  averageResolutionTime: number;
  satisfactionScore: number;
  topIssues: string[];
}

export interface RecruitmentMetrics {
  totalUsers: number;
  activeUsers: number;
  conversionRate: number;
  retentionRate: number;
  averageSatisfaction: number;
  totalFeedback: number;
  resolvedFeedback: number;
  averageResolutionTime: number;
}

export class BetaUserRecruitmentManager {
  private betaUsers: BetaUser[] = [];
  private campaigns: Campaign[] = [];
  private feedbackAnalytics: FeedbackAnalytics | null = null;
  private isInitialized = false;

  constructor() {
    this.initialize();
  }

  private async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Load existing data from localStorage
      await this.loadData();
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize Beta User Recruitment Manager:', error);
    }
  }

  // User Management
  async addBetaUser(userData: Omit<BetaUser, 'id' | 'joinDate' | 'lastActive' | 'metrics'>): Promise<BetaUser> {
    await this.initialize();

    const newUser: BetaUser = {
      ...userData,
      id: this.generateId(),
      joinDate: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      metrics: {
        sessionsCount: 0,
        totalTimeSpent: 0,
        featuresUsed: 0,
        bugsReported: 0,
        feedbackSubmitted: 0,
        referralsMade: 0,
        satisfactionScore: 0
      }
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

  async getBetaUser(userId: string): Promise<BetaUser | null> {
    await this.initialize();
    return this.betaUsers.find(user => user.id === userId) || null;
  }

  async getAllBetaUsers(): Promise<BetaUser[]> {
    await this.initialize();
    return [...this.betaUsers];
  }

  async getBetaUsersByTier(tier: BetaUser['tier']): Promise<BetaUser[]> {
    await this.initialize();
    return this.betaUsers.filter(user => user.tier === tier);
  }

  async getBetaUsersByStatus(status: BetaUser['status']): Promise<BetaUser[]> {
    await this.initialize();
    return this.betaUsers.filter(user => user.status === status);
  }

  // Campaign Management
  async createCampaign(campaignData: Omit<Campaign, 'id' | 'metrics'>): Promise<Campaign> {
    await this.initialize();

    const newCampaign: Campaign = {
      ...campaignData,
      id: this.generateId(),
      metrics: {
        reach: 0,
        impressions: 0,
        clicks: 0,
        conversions: 0,
        cost: 0,
        roi: 0
      }
    };

    this.campaigns.push(newCampaign);
    await this.saveData();
    return newCampaign;
  }

  async updateCampaign(campaignId: string, updates: Partial<Campaign>): Promise<Campaign | null> {
    await this.initialize();

    const campaignIndex = this.campaigns.findIndex(campaign => campaign.id === campaignId);
    if (campaignIndex === -1) return null;

    this.campaigns[campaignIndex] = { ...this.campaigns[campaignIndex], ...updates };
    await this.saveData();
    return this.campaigns[campaignIndex];
  }

  async getAllCampaigns(): Promise<Campaign[]> {
    await this.initialize();
    return [...this.campaigns];
  }

  async getCampaignsByStatus(status: Campaign['status']): Promise<Campaign[]> {
    await this.initialize();
    return this.campaigns.filter(campaign => campaign.status === status);
  }

  // Feedback Management
  async submitFeedback(userId: string, feedbackData: Omit<Feedback, 'id' | 'submittedAt' | 'votes' | 'comments'>): Promise<Feedback> {
    await this.initialize();

    const newFeedback: Feedback = {
      ...feedbackData,
      id: this.generateId(),
      submittedAt: new Date().toISOString(),
      votes: 0,
      comments: []
    };

    const user = this.betaUsers.find(u => u.id === userId);
    if (user) {
      user.feedback.push(newFeedback);
      user.metrics.feedbackSubmitted++;
      await this.saveData();
    }

    return newFeedback;
  }

  async updateFeedbackStatus(feedbackId: string, status: Feedback['status']): Promise<Feedback | null> {
    await this.initialize();

    for (const user of this.betaUsers) {
      const feedback = user.feedback.find(f => f.id === feedbackId);
      if (feedback) {
        feedback.status = status;
        if (status === 'resolved') {
          feedback.resolvedAt = new Date().toISOString();
        }
        await this.saveData();
        return feedback;
      }
    }

    return null;
  }

  async getAllFeedback(): Promise<Feedback[]> {
    await this.initialize();
    return this.betaUsers.flatMap(user => user.feedback);
  }

  async getFeedbackByType(type: Feedback['type']): Promise<Feedback[]> {
    await this.initialize();
    return this.betaUsers.flatMap(user => user.feedback.filter(f => f.type === type));
  }

  async getFeedbackByPriority(priority: Feedback['priority']): Promise<Feedback[]> {
    await this.initialize();
    return this.betaUsers.flatMap(user => user.feedback.filter(f => f.priority === priority));
  }

  // Incentive Management
  async createIncentive(incentiveData: Omit<Incentive, 'id' | 'status'>): Promise<Incentive> {
    await this.initialize();

    const newIncentive: Incentive = {
      ...incentiveData,
      id: this.generateId(),
      status: 'available'
    };

    return newIncentive;
  }

  async claimIncentive(userId: string, incentiveId: string): Promise<boolean> {
    await this.initialize();

    const user = this.betaUsers.find(u => u.id === userId);
    if (!user) return false;

    const incentive = user.incentives.find(i => i.id === incentiveId);
    if (!incentive || incentive.status !== 'available') return false;

    incentive.status = 'claimed';
    incentive.claimedAt = new Date().toISOString();
    await this.saveData();
    return true;
  }

  async getAllIncentives(): Promise<Incentive[]> {
    await this.initialize();
    return this.betaUsers.flatMap(user => user.incentives);
  }

  // Analytics
  async getRecruitmentMetrics(): Promise<RecruitmentMetrics> {
    await this.initialize();

    const totalUsers = this.betaUsers.length;
    const activeUsers = this.betaUsers.filter(u => u.status === 'active').length;
    const totalFeedback = this.betaUsers.reduce((sum, user) => sum + user.feedback.length, 0);
    const resolvedFeedback = this.betaUsers.reduce((sum, user) => 
      sum + user.feedback.filter(f => f.status === 'resolved').length, 0
    );
    const averageSatisfaction = this.betaUsers.reduce((sum, user) => sum + user.metrics.satisfactionScore, 0) / totalUsers || 0;

    // Calculate average resolution time
    const resolvedFeedbacks = this.betaUsers.flatMap(user => 
      user.feedback.filter(f => f.status === 'resolved' && f.resolvedAt)
    );
    const averageResolutionTime = resolvedFeedbacks.length > 0 
      ? resolvedFeedbacks.reduce((sum, feedback) => {
          const submitted = new Date(feedback.submittedAt).getTime();
          const resolved = new Date(feedback.resolvedAt!).getTime();
          return sum + (resolved - submitted) / (1000 * 60 * 60 * 24); // days
        }, 0) / resolvedFeedbacks.length
      : 0;

    return {
      totalUsers,
      activeUsers,
      conversionRate: totalUsers > 0 ? (activeUsers / totalUsers) * 100 : 0,
      retentionRate: 85, // Mock data
      averageSatisfaction,
      totalFeedback,
      resolvedFeedback,
      averageResolutionTime
    };
  }

  async getFeedbackAnalytics(): Promise<FeedbackAnalytics> {
    await this.initialize();

    const allFeedback = this.betaUsers.flatMap(user => user.feedback);
    
    const byType = allFeedback.reduce((acc, feedback) => {
      acc[feedback.type] = (acc[feedback.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const byPriority = allFeedback.reduce((acc, feedback) => {
      acc[feedback.priority] = (acc[feedback.priority] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const byStatus = allFeedback.reduce((acc, feedback) => {
      acc[feedback.status] = (acc[feedback.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Calculate average resolution time
    const resolvedFeedbacks = allFeedback.filter(f => f.status === 'resolved' && f.resolvedAt);
    const averageResolutionTime = resolvedFeedbacks.length > 0 
      ? resolvedFeedbacks.reduce((sum, feedback) => {
          const submitted = new Date(feedback.submittedAt).getTime();
          const resolved = new Date(feedback.resolvedAt!).getTime();
          return sum + (resolved - submitted) / (1000 * 60 * 60 * 24); // days
        }, 0) / resolvedFeedbacks.length
      : 0;

    // Calculate satisfaction score
    const satisfactionScore = this.betaUsers.reduce((sum, user) => sum + user.metrics.satisfactionScore, 0) / this.betaUsers.length || 0;

    // Get top issues (most voted feedback)
    const topIssues = allFeedback
      .sort((a, b) => b.votes - a.votes)
      .slice(0, 5)
      .map(feedback => feedback.title);

    return {
      totalFeedback: allFeedback.length,
      byType,
      byPriority,
      byStatus,
      averageResolutionTime,
      satisfactionScore,
      topIssues
    };
  }

  // Campaign Analytics
  async getCampaignAnalytics(): Promise<{
    totalCampaigns: number;
    activeCampaigns: number;
    totalBudget: number;
    totalSpent: number;
    averageROI: number;
    totalConversions: number;
  }> {
    await this.initialize();

    const totalCampaigns = this.campaigns.length;
    const activeCampaigns = this.campaigns.filter(c => c.status === 'active').length;
    const totalBudget = this.campaigns.reduce((sum, c) => sum + c.budget, 0);
    const totalSpent = this.campaigns.reduce((sum, c) => sum + c.metrics.cost, 0);
    const averageROI = this.campaigns.length > 0 
      ? this.campaigns.reduce((sum, c) => sum + c.metrics.roi, 0) / this.campaigns.length 
      : 0;
    const totalConversions = this.campaigns.reduce((sum, c) => sum + c.metrics.conversions, 0);

    return {
      totalCampaigns,
      activeCampaigns,
      totalBudget,
      totalSpent,
      averageROI,
      totalConversions
    };
  }

  // User Engagement
  async updateUserActivity(userId: string, activity: {
    sessionCount?: number;
    timeSpent?: number;
    featuresUsed?: number;
    satisfactionScore?: number;
  }): Promise<void> {
    await this.initialize();

    const user = this.betaUsers.find(u => u.id === userId);
    if (!user) return;

    if (activity.sessionCount) user.metrics.sessionsCount += activity.sessionCount;
    if (activity.timeSpent) user.metrics.totalTimeSpent += activity.timeSpent;
    if (activity.featuresUsed) user.metrics.featuresUsed += activity.featuresUsed;
    if (activity.satisfactionScore) user.metrics.satisfactionScore = activity.satisfactionScore;

    user.lastActive = new Date().toISOString();
    await this.saveData();
  }

  // Tier Management
  async promoteUser(userId: string, newTier: BetaUser['tier']): Promise<boolean> {
    await this.initialize();

    const user = this.betaUsers.find(u => u.id === userId);
    if (!user) return false;

    user.tier = newTier;
    await this.saveData();
    return true;
  }

  async getTierDistribution(): Promise<Record<string, number>> {
    await this.initialize();

    return this.betaUsers.reduce((acc, user) => {
      acc[user.tier] = (acc[user.tier] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  // Data Management
  private async loadData(): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
      const savedUsers = localStorage.getItem('syncscript_beta_users');
      const savedCampaigns = localStorage.getItem('syncscript_campaigns');

      if (savedUsers) {
        this.betaUsers = JSON.parse(savedUsers);
      }

      if (savedCampaigns) {
        this.campaigns = JSON.parse(savedCampaigns);
      }
    } catch (error) {
      console.error('Failed to load beta user recruitment data:', error);
    }
  }

  private async saveData(): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem('syncscript_beta_users', JSON.stringify(this.betaUsers));
      localStorage.setItem('syncscript_campaigns', JSON.stringify(this.campaigns));
    } catch (error) {
      console.error('Failed to save beta user recruitment data:', error);
    }
  }

  private generateId(): string {
    return `beta_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Export/Import
  async exportData(): Promise<{
    betaUsers: BetaUser[];
    campaigns: Campaign[];
    feedbackAnalytics: FeedbackAnalytics;
  }> {
    await this.initialize();

    const feedbackAnalytics = await this.getFeedbackAnalytics();

    return {
      betaUsers: this.betaUsers,
      campaigns: this.campaigns,
      feedbackAnalytics
    };
  }

  async importData(data: {
    betaUsers: BetaUser[];
    campaigns: Campaign[];
  }): Promise<void> {
    await this.initialize();

    this.betaUsers = data.betaUsers;
    this.campaigns = data.campaigns;
    await this.saveData();
  }

  // Cleanup
  async clearAllData(): Promise<void> {
    if (typeof window === 'undefined') return;

    this.betaUsers = [];
    this.campaigns = [];
    this.feedbackAnalytics = null;

    localStorage.removeItem('syncscript_beta_users');
    localStorage.removeItem('syncscript_campaigns');
  }
}

// Singleton instance
let betaUserRecruitmentManager: BetaUserRecruitmentManager | null = null;

export const getBetaUserRecruitmentManager = (): BetaUserRecruitmentManager => {
  if (!betaUserRecruitmentManager) {
    betaUserRecruitmentManager = new BetaUserRecruitmentManager();
  }
  return betaUserRecruitmentManager;
};

export default BetaUserRecruitmentManager;
