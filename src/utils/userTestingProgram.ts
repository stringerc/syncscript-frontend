/**
 * User Testing Program System
 * Beta User Recruitment & Feedback Collection
 * 
 * Provides comprehensive user testing infrastructure for feature validation
 * Target: 100 beta users with structured feedback collection
 */

interface BetaUser {
  id: string;
  email: string;
  name: string;
  signupDate: string;
  tier: 'early-adopter' | 'power-user' | 'casual-user';
  testingFocus: string[];
  feedbackCount: number;
  lastActive: string;
  status: 'active' | 'inactive' | 'graduated';
}

interface FeedbackSubmission {
  id: string;
  userId: string;
  feature: string;
  rating: number; // 1-5
  feedback: string;
  suggestions: string[];
  timestamp: string;
  category: 'bug' | 'improvement' | 'feature-request' | 'general';
  priority: 'low' | 'medium' | 'high' | 'critical';
}

interface TestingSession {
  id: string;
  userId: string;
  feature: string;
  startTime: string;
  endTime?: string;
  actions: Array<{
    action: string;
    timestamp: string;
    metadata?: Record<string, any>;
  }>;
  completionRate: number;
  satisfaction: number;
}

interface BetaProgramConfig {
  maxUsers: number;
  currentUsers: number;
  features: string[];
  feedbackChannels: string[];
  rewards: {
    points: number;
    badges: string[];
    earlyAccess: boolean;
  };
}

class UserTestingProgram {
  private betaUsers: BetaUser[] = [];
  private feedbackSubmissions: FeedbackSubmission[] = [];
  private testingSessions: TestingSession[] = [];
  private config: BetaProgramConfig;

  constructor() {
    this.config = {
      maxUsers: 100,
      currentUsers: 0,
      features: [
        'morning-brief',
        'evening-brief',
        'ai-explainability',
        'emblem-transparency',
        'energy-recalibration',
        'analytics-dashboard',
        'budget-intelligence'
      ],
      feedbackChannels: ['in-app', 'email', 'survey'],
      rewards: {
        points: 1000,
        badges: ['Beta Tester', 'Early Adopter', 'Feature Pioneer'],
        earlyAccess: true
      }
    };
  }

  /**
   * Register a new beta user
   */
  async registerBetaUser(userData: {
    email: string;
    name: string;
    tier: 'early-adopter' | 'power-user' | 'casual-user';
    testingFocus: string[];
  }): Promise<{ success: boolean; userId?: string; message: string }> {
    try {
      // Check if we have capacity
      if (this.config.currentUsers >= this.config.maxUsers) {
        return {
          success: false,
          message: 'Beta program is full. Join our waitlist for future opportunities!'
        };
      }

      // Check if user already exists
      const existingUser = this.betaUsers.find(u => u.email === userData.email);
      if (existingUser) {
        return {
          success: false,
          message: 'You\'re already registered for the beta program!'
        };
      }

      // Create new beta user
      const newUser: BetaUser = {
        id: `beta_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        email: userData.email,
        name: userData.name,
        signupDate: new Date().toISOString(),
        tier: userData.tier,
        testingFocus: userData.testingFocus,
        feedbackCount: 0,
        lastActive: new Date().toISOString(),
        status: 'active'
      };

      this.betaUsers.push(newUser);
      this.config.currentUsers++;

      return {
        success: true,
        userId: newUser.id,
        message: 'Welcome to the SyncScript Beta Program! 🚀'
      };

    } catch (error) {
      console.error('Error registering beta user:', error);
      return {
        success: false,
        message: 'Failed to register for beta program. Please try again.'
      };
    }
  }

  /**
   * Submit feedback for a feature
   */
  async submitFeedback(feedbackData: {
    userId: string;
    feature: string;
    rating: number;
    feedback: string;
    suggestions: string[];
    category: 'bug' | 'improvement' | 'feature-request' | 'general';
    priority: 'low' | 'medium' | 'high' | 'critical';
  }): Promise<{ success: boolean; feedbackId?: string; message: string }> {
    try {
      // Validate user
      const user = this.betaUsers.find(u => u.id === feedbackData.userId);
      if (!user) {
        return {
          success: false,
          message: 'User not found in beta program'
        };
      }

      // Create feedback submission
      const submission: FeedbackSubmission = {
        id: `feedback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        userId: feedbackData.userId,
        feature: feedbackData.feature,
        rating: feedbackData.rating,
        feedback: feedbackData.feedback,
        suggestions: feedbackData.suggestions,
        timestamp: new Date().toISOString(),
        category: feedbackData.category,
        priority: feedbackData.priority
      };

      this.feedbackSubmissions.push(submission);
      user.feedbackCount++;
      user.lastActive = new Date().toISOString();

      return {
        success: true,
        feedbackId: submission.id,
        message: 'Thank you for your feedback! 🎉'
      };

    } catch (error) {
      console.error('Error submitting feedback:', error);
      return {
        success: false,
        message: 'Failed to submit feedback. Please try again.'
      };
    }
  }

  /**
   * Start a testing session
   */
  async startTestingSession(userId: string, feature: string): Promise<{ success: boolean; sessionId?: string; message: string }> {
    try {
      const user = this.betaUsers.find(u => u.id === userId);
      if (!user) {
        return {
          success: false,
          message: 'User not found in beta program'
        };
      }

      const session: TestingSession = {
        id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        userId,
        feature,
        startTime: new Date().toISOString(),
        actions: [],
        completionRate: 0,
        satisfaction: 0
      };

      this.testingSessions.push(session);
      user.lastActive = new Date().toISOString();

      return {
        success: true,
        sessionId: session.id,
        message: 'Testing session started! 🧪'
      };

    } catch (error) {
      console.error('Error starting testing session:', error);
      return {
        success: false,
        message: 'Failed to start testing session'
      };
    }
  }

  /**
   * Record an action during testing
   */
  async recordTestingAction(sessionId: string, action: string, metadata?: Record<string, any>): Promise<void> {
    const session = this.testingSessions.find(s => s.id === sessionId);
    if (session) {
      session.actions.push({
        action,
        timestamp: new Date().toISOString(),
        metadata
      });
    }
  }

  /**
   * End a testing session
   */
  async endTestingSession(sessionId: string, completionRate: number, satisfaction: number): Promise<void> {
    const session = this.testingSessions.find(s => s.id === sessionId);
    if (session) {
      session.endTime = new Date().toISOString();
      session.completionRate = completionRate;
      session.satisfaction = satisfaction;
    }
  }

  /**
   * Get beta program statistics
   */
  getBetaStats(): {
    totalUsers: number;
    activeUsers: number;
    totalFeedback: number;
    averageRating: number;
    topFeatures: Array<{ feature: string; feedbackCount: number; averageRating: number }>;
    userTiers: Record<string, number>;
  } {
    const activeUsers = this.betaUsers.filter(u => u.status === 'active').length;
    const totalFeedback = this.feedbackSubmissions.length;
    const averageRating = totalFeedback > 0 
      ? this.feedbackSubmissions.reduce((sum, f) => sum + f.rating, 0) / totalFeedback 
      : 0;

    // Top features by feedback count
    const featureStats = this.config.features.map(feature => {
      const featureFeedback = this.feedbackSubmissions.filter(f => f.feature === feature);
      return {
        feature,
        feedbackCount: featureFeedback.length,
        averageRating: featureFeedback.length > 0 
          ? featureFeedback.reduce((sum, f) => sum + f.rating, 0) / featureFeedback.length 
          : 0
      };
    }).sort((a, b) => b.feedbackCount - a.feedbackCount);

    // User tier distribution
    const userTiers = this.betaUsers.reduce((acc, user) => {
      acc[user.tier] = (acc[user.tier] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalUsers: this.config.currentUsers,
      activeUsers,
      totalFeedback,
      averageRating: Math.round(averageRating * 100) / 100,
      topFeatures: featureStats.slice(0, 5),
      userTiers
    };
  }

  /**
   * Get user's beta status
   */
  getBetaUserStatus(userId: string): {
    isBetaUser: boolean;
    tier?: string;
    feedbackCount: number;
    rewards: string[];
    testingFocus: string[];
  } {
    const user = this.betaUsers.find(u => u.id === userId);
    if (!user) {
      return {
        isBetaUser: false,
        feedbackCount: 0,
        rewards: [],
        testingFocus: []
      };
    }

    return {
      isBetaUser: true,
      tier: user.tier,
      feedbackCount: user.feedbackCount,
      rewards: this.config.rewards.badges,
      testingFocus: user.testingFocus
    };
  }

  /**
   * Get recent feedback for a feature
   */
  getRecentFeedback(feature: string, limit: number = 10): FeedbackSubmission[] {
    return this.feedbackSubmissions
      .filter(f => f.feature === feature)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }

  /**
   * Get feedback summary for a feature
   */
  getFeatureFeedbackSummary(feature: string): {
    totalFeedback: number;
    averageRating: number;
    categories: Record<string, number>;
    priorities: Record<string, number>;
    topSuggestions: string[];
  } {
    const featureFeedback = this.feedbackSubmissions.filter(f => f.feature === feature);
    
    const averageRating = featureFeedback.length > 0 
      ? featureFeedback.reduce((sum, f) => sum + f.rating, 0) / featureFeedback.length 
      : 0;

    const categories = featureFeedback.reduce((acc, f) => {
      acc[f.category] = (acc[f.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const priorities = featureFeedback.reduce((acc, f) => {
      acc[f.priority] = (acc[f.priority] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const allSuggestions = featureFeedback.flatMap(f => f.suggestions);
    const suggestionCounts = allSuggestions.reduce((acc, suggestion) => {
      acc[suggestion] = (acc[suggestion] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topSuggestions = Object.entries(suggestionCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([suggestion]) => suggestion);

    return {
      totalFeedback: featureFeedback.length,
      averageRating: Math.round(averageRating * 100) / 100,
      categories,
      priorities,
      topSuggestions
    };
  }
}

// Create singleton instance
export const userTestingProgram = new UserTestingProgram();

// Export types
export type { BetaUser, FeedbackSubmission, TestingSession, BetaProgramConfig };

// Export for testing
export const __test__ = {
  UserTestingProgram
};
