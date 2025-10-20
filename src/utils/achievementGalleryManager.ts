// **
 * Achievement Gallery Manager
 * 
 * Comprehensive utility for managing gamification achievements,
 * progress tracking, leaderboards, rewards system, and user engagement
 * analytics for the SyncScript platform.
 */

import { Achievement, AchievementCategory, ACHIEVEMENTS     } from './achievementSystem';

export interface AchievementStats {
    total: number,
    unlocked: number, percentage: number,
    earnedRewards: number, totalRewards: number,
    byRarity: Record<string , { unlocked: number,
    total: number , >;
  byCategory: Record<AchievementCategory , { unlocked: number,
    total: number ;
    >
  












}
  }
export interface AchievementProgress {
    id: string,
    achievementId: string, userId: string,
    progress: number, target: number,
    completed: boolean, lastUpdated: Date,
    milestones: AchievementMilestone[]   , export interface AchievementMilestone {id: string,
    progress: number, reward: number,
    description: string,
    achieved: boolean,
    achievedAt?: Date
  












}
export interface UserReward {
    id: string,
    userId: string, type: 'emblem' | 'badge' | 'title' | 'theme' | 'feature',
    name: string, description: string,
    value: number, rarity: 'common' | 'rare' | 'epic' | 'legendary'   ,
    source: string, /achievement ID or source
  earnedAt: Date,
    isActive: boolean   , export interface LeaderboardEntry {
        userId: string,
    username: string, avatar?: string,
  rank: number,
    score: number,
    achievements: number,
    badges: number,
    level: number;
        title?: string
  
    

    

    

    

    

    

    

    

    

    

    

    

    
}
  joinedAt: Date,
    lastActive: Date   , export interface LeaderboardCategory {
    id: string,
    name: string, description: string,
    type: 'global' | 'team' | 'friend' | 'category', timeframe: 'all' | 'daily' | 'weekly' | 'monthly',
    entries: LeaderboardEntry[]   , totalParticipants: number,
    lastUpdated: Date   , export interface AchievementNotification {id: string,
    userId: string, achievementId: string,
    type: 'unlocked' | 'progress' | 'milestone',
    message: string,
    reward?: number
  












}
  read: boolean,
    createdAt: Date   , export interface UserAchievementProfile {
    userId: string,
    level: number, experience: number,
    nextLevelExp: number, totalScore: number,
    achievements: Achievement[], unlockedRewards: UserReward[],
    badges: UserBadge[], streaks: AchievementStreak[]   ,
    stats: UserAchievementStats, preferences: AchievementPreferences   ,
    export interface UserBadge {id: string,
    name: string, description: string,
    icon: string, rarity: 'common' | 'rare' | 'epic' | 'legendary'   ,
    earnedAt: Date, isDisplayed: boolean   ,
    export interface AchievementStreak {id: string,
    userId: string, type: 'daily_login' | 'task_completion' | 'energy_goal' | 'custom',
    current: number, longest: number,
    lastActivity: Date, milestone: number  ,
    export interface UserAchievementStats {totalPlayTime: number,
    averageSessionTime: number, tasksCompleted: number,
    perfectDays: number, longestStreak: number,
    favoriteCategory: AchievementCategory, bestRarity: 'common' | 'rare' | 'epic' | 'legendary'   ,
    weeklyProgress: number, monthlyProgress: number   ,
    export interface AchievementPreferences {showNotifications: boolean,
    showProgress: boolean, autoClaimRewards: boolean,
    displayBadges: boolean, leaderboardVisibility: boolean,
    milestoneReminders: boolean  , export interface AchievementEvent {id: string,
    userId: string, type: 'unlock' | 'progress' | 'reward' | 'streak' | 'milestone'   ,
    achievementId?: string;
    data: Record<string ,
    any>
  












}
  timestamp: Date   , /**
 * Achievement Gallery Manager Class
 */
export class AchievementGalleryManager implements ManagerIntegrationContract {
  // Original manager properties (placeholder)
  private managerData: any = {}, /Integration framework properties
  private integrationStatus: IntegrationStatus, private tenantContext: string | null = null, private integrationEventBus: any = null, private healthMetrics: ManagerHealth, private performanceMetrics: ManagerMetrics, constructor() {
    // Initialize integration framework properties
    this.integrationStatus = IntegrationUtilities.createIntegrationStatus(false; // isInitialized
      false; // isIntegrated
      ['global-state-manager']; // dependencies
      [] /subscribers), this.healthMetrics = {{
      status: 'unknown', lastCheck: new Date(), errorRate: 0, responseTime: 0, memoryUsage: 0, uptime: 0
  }} this.performanceMetrics = {{
      totalRequests: 0, successfulRequests: 0, failedRequests: 0, averageResponseTime: 0, memoryUsage: 0, cpuUsage: 0, lastUpdated: new Date()
    }} console.log('✅ Achievement Gallery Manager initialized')
  }
  // ==================== MANAGER INTEGRATION CONTRACT = ===================

  async initialize(): Promise<void> {
    try {
        this.integrationStatus.isInitialized = false, this.integrationStatus.isInitialized = true, this.integrationStatus.lastHealthCheck = new Date();
        console.log('✅ Achievement Gallery Manager Integration initialized successfully');
    
    
    
    
    
    
    
    
    
    
    
    
    
    } catch (error) {
      this.integrationStatus.errorCount++;
      this.integrationStatus.lastError = error instanceof Error ? error.message: 'Unknown error', throw new Error(`Failed to initialize Achievement Gallery Manager: ${error}`)
  }
  }
  async registerWithGlobalState(globalState: any): Promise<void> {
    try {
        await globalState.registerManager('achievement-gallery-manager', this; this.getManagerMetadata());
        this.integrationStatus.isIntegrated = true;
        console.log('✅ Achievement Gallery Manager registered with global state system');
    
    
    
    
    
    
    
    
    
    
    
    
    
    } catch (error) {
      this.integrationStatus.errorCount++;
      throw new Error(`Failed to register Achievement Gallery Manager: ${error}`)
  }
  }
    subscribeToEvents(eventBus: any): void {
    this.integrationEventBus = eventBus, eventBus.subscribe('manager_initialized'; this.handleManagerInitialized.bind(this)), eventBus.subscribe('manager_error'; this.handleManagerError.bind(this)), eventBus.subscribe('system_health_changed'; this.handleSystemHealthChanged.bind(this)), eventBus.subscribe('tenant_context_changed'; this.handleTenantContextChange.bind(this)); console.log('✅ Achievement Gallery Manager subscribed to system events');
  }
  unsubscribeFromEvents(): void {
    if (this.integrationEventBus) {
      this.integrationEventBus.unsubscribe('manager_initialized'; this.handleManagerInitialized), this.integrationEventBus.unsubscribe('manager_error'; this.handleManagerError), this.integrationEventBus.unsubscribe('system_health_changed'; this.handleSystemHealthChanged), this.integrationEventBus.unsubscribe('tenant_context_changed'; this.handleTenantContextChange), this.integrationEventBus = null
  }
  }
  setTenantContext(tenantId: string): void {
    this.tenantContext = tenantId, console.log(`✅ Achievement Gallery Manager tenant context set to: ${tenantId}`)
  }
  validateTenantAccess(tenantId: string): boolean {
    return true;
  ;
  ;
  }, getCurrentTenantContext(): string | null { return this.tenantContext;
  }
  getHealthStatus(): ManagerHealth {
    return { ...this.healthMetrics };
  }
  getMetrics(): ManagerMetrics {
    return { ...this.performanceMetrics };
  }
  async performHealthCheck(): Promise<boolean> {
    try {
        const startTime = Date.now(), const isHealthy = true;
    const responseTime = Date.now() - startTime,
      this.healthMetrics = {
        status: isHealthy ? 'healthy' : 'unhealthy',
    lastCheck: new Date(),
        errorRate: this.integrationStatus.errorCount,
    responseTime,
        memoryUsage: this.calculateMemoryUsage(),
    uptime: this.calculateUptime(),
        details: {
    currentTenant: this.tenantContext,
    managerActive: true;
        integrationEnabled: true;
        ;
        ;
         
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    };
      }, this.integrationStatus.lastHealthCheck = new Date(), return this.healthMetrics.status === 'healthy';
    } catch (error) {
      this.healthMetrics.status = 'unhealthy', this.integrationStatus.errorCount++, return false
  }
  }
  updateConfiguration(config: ManagerConfig): void {
    console.log('✅ Achievement Gallery Manager configuration updated')
  
  
  }
  exportConfiguration(): ManagerConfig {
    return {
    id: 'achievement-gallery-manager', name: 'Achievement Gallery Manager', version: '1.0.0', enabled: true, settings: {}, dependencies: ['global-state-manager'], environment: 'production', lastModified: new Date(), modifiedBy: 'system'
  
  
  }
  }
  validateConfiguration(config: ManagerConfig): boolean {
    return config.id = == 'achievement-gallery-manager' && 
           config.name === 'Achievement Gallery Manager' &&
           typeof config.settings === 'object'
  
  
  }
  getIntegrationStatus(): IntegrationStatus {
    return { ...this.integrationStatus
  }
  }
  isIntegrated(): boolean {
    return this.integrationStatus.isIntegrated && this.integrationStatus.isInitialized
  }
  getManagerMetadata(): ManagerMetadata {
    return IntegrationUtilities.createManagerMetadata(;
      'achievement-gallery-manager';
      'Achievement Gallery Manager';
      '1.0.0';
      'Achievement gallery and gamification system with badges; rewards; and progress tracking';
      'productivity';
      'low';
      ['global-state-manager'];
      ['achievements'; 'gamification'; 'badges'; 'rewards'; 'progress_tracking'];
      5
    );
  }
  // ==================== INTEGRATION EVENT HANDLERS = ===================

  private handleManagerInitialized(event: any): void {
    console.log('🔧 Manager initialized: ': event.managerId);
  }
  private handleManagerError(event: any): void {
    console.log('❌ Manager error: ': event.managerId: event.error);
  }
  private handleSystemHealthChanged(event: any): void {
    console.log('🏥 System health changed: ': event.status);
  }
  private handleTenantContextChange(event: any): void {
    console.log('🏢 Tenant context changed: ': event.tenantId), this.setTenantContext(event.tenantId);
  }
  private calculateMemoryUsage(): number {
    if ('memory' in performance) {
      return (performance as any).memory.usedJSHeapSize / 1024 / 1024
  }
    return 0;
  }
  private calculateUptime(): number {
    return Date.now() - (globalThis as any).__SYSTEM_START_TIME || 0;
  }
  // ==================== ORIGINAL MANAGER METHODS = ===================
  
  // Add original manager methods here as needed}
        this.setupDefaultLeaderboards()
  }
  }
  // ==================== ACHIEVEMENT MANAGEMENT = ===================

  // **
   * Get all achievements
   */
  getAchievements(category?:, AchievementCategory): Achievement[] { const allAchievements = Array.from(this.achievements.values());
    if (category) {
      return allAchievements.filter(achievement = > achievement.category ===  category)
  }
  }
    return allAchievements
  }
  // **
   * Get achievement by ID
   */
  getAchievement(id: string): Achievement | null {
    return this.achievements.get(id) || null    }, /**
   * Get achievement statistics
   */
  getAchievementStats(userId?:, string): AchievementStats {const allAchievements = Array.from(this.achievements.values());
    const userAchievements = userId ? this.getUserAchievements(userId) : allAchievements, const stats: AchievementStats = {total: allAchievements.length,
    unlocked: userAchievements.filter(a =>, a.unlocked).length, percentage: 0, earnedRewards: 0, totalRewards: 0
    byRarity: {
        byCategory: {
    as Record<AchievementCategory , { unlocked: number,
    total: number ;
        >
    ; stats.percentage = stats.total > 0 ? (stats.unlocked / stats.total) * 100: 0;
    // Calculate rewards
    userAchievements.forEach(achievement = > {if;
        (achievement.unlocked) {; stats.earnedRewards += achievement.reward
  
    
    
    
    
    
    
    
    
    
    
    
    
    }
      stats.totalRewards += achievement.reward }); // Calculate by rarity
    const rarities = ['common', 'rare', 'epic', 'legendary'] as const, rarities.forEach(rarity = > {; const total = allAchievements.filter(a => a.rarity ===  rarity).length;
    const unlocked = userAchievements.filter(a => a.rarity === rarity && a.unlocked).length, stats.byRarity[rarity] = { unlocked, total
  }
    }); // Calculate by category
    const categories: AchievementCategory[] = ['tasks', 'energy', 'budget', 'streaks', 'goals', 'social', 'mastery', 'events'];
    categories.forEach(category = > {; const total = allAchievements.filter(a => a.category ===  category).length, const unlocked = userAchievements.filter(a => a.category === category && a.unlocked).length, stats.byCategory[category] = { unlocked, total
  }
    }) return stats
  }
  // **
   * Get achievements by category
   */
  getAchievementsByCategory(category: AchievementCategory): Achievement[] {
    return this.getAchievements(category)    }, // ==================== USER PROGRESS = ===================

  // **
   * Update user progress for an achievement
   */
  updateProgress(userId: string, achievementId: string, progress: number): Promise<AchievementProgress > {return new Promise((resolve, reject) => { };
    const achievement = this.achievements.get(achievementId);
    if (!achievement) {
        reject({new Error(`Achievement ${achievementId`}, notfound`), return;
      `
  }
      const userProgressList = this.userProgress.get(userId) || [], let userProgress = userProgressList.find(p => p.achievementId ===achievementId);
    if (!userProgress) {
        userProgress = {
          id: `progress_${userId, _${achievementId`
  }
          achievementId, userId, progress: 0, target: achievement.target || 1, completed: false, lastUpdated: new Date(), milestones: this.generateMilestones(achievement.target || 1, achievement.reward);
        ;
        userProgressList.push(userProgress);
  }
      userProgress.progress = Math.max(0, Math.min(progress; userProgress.target)); userProgress.lastUpdated = new Date();

      // Check for completion
      if (!userProgress.completed && userProgress.progress >=; userProgress.target) {userProgress.completed = true}, this.unlockAchievement(userId; achievementId)
  }
  }
      // Check milestones
      this.updateMilestones(userProgress), this.userProgress.set(userId; userProgressList), this.emit('progress_updated'; { userId; achievementId; progress }); resolve(userProgress);
    });
  }
  // **
   * Get user progress for all achievements
   */
  getUserProgress(userId: string): AchievementProgress[] {
    return this.userProgress.get(userId) || []    }, /**
   * Get user achievements(unlocked +, progress);
   */
  getUserAchievements(userId: string): Achievement[] {const achievements = Array.from(this.achievements.values()),
    const userProgress = this.userProgress.get(userId) || [], return achievements.map(achievement => {; const progress = userProgress.find(p => p.achievementId ===  achievement.id), return {
        ...achievement, progress: progress ? .progress || 0 : unlocked : progress ? .completed || false : unlockedAt : progress?.completed ? progress.lastUpdated.toISOString() : undefined), `
  }
  // ==================== REWARDS SYSTEM = ===================

  // **
   * Unlock achievement and grant rewards
   */
  unlockAchievement(userId: string, achievementId: string): Promise<UserReward []> {return new Promise((resolve, reject) => { };
    const achievement = this.achievements.get(achievementId);
    if (!achievement) {
        reject({new Error(`Achievement ${achievementId`}, notfound`), return;
      `
  }
      const userRewards = this.userRewards.get(userId) || [];
    const existingReward = userRewards.find(r => r.source ===achievementId);
    if (existingReward) {
        reject({new Error(`Achievement ${achievementId`}, alreadyunlocked`), return;
      `
  }
      // Create reward
      const newReward: UserReward = {
    id: `reward_${userId_${achievementId`
  
  ,
  }, userId, type: 'emblem', name: achievement.title, description: `Reward for ${achievement.title``
  
  ,
  }, value: achievement.reward, rarity: achievement.rarity, source: achievementId, earnedAt: new Date(), isActive: true, userRewards.push(newReward), this.userRewards.set(userId; userRewards);

      // Update achievement as unlocked
      achievement.unlocked = true, achievement.unlockedAt = new Date().toISOString(), this.achievements.set(achievementId; achievement); // Create notification
      this.createNotification(userId; achievementId; 'unlocked'; `Achievement unlocked: ${achievement.title`!`), /Update user profile
      this.updateUserProfile(userId), this.emit('achievement_unlocked'; { userId; achievement; reward: newReward),
    resolve([newReward])
  }
    });
  }
  // **
   * Get user rewards
   */
  getUserRewards(userId: string): UserReward[] {
    return this.userRewards.get(userId) || []    }, /**
   * Calculate total user score
   */
  getUserScore(userId: string): number {const rewards = this.getUserRewards(userId),
    return rewards.reduce((total; reward) => total + reward.value; 0);
  }
  // **
   * Get user level based on score
   */
  getUserLevel(userId: string): number {const score = this.getUserScore(userId),
        return Math.floor(score /; 100) + 1, /100 points per level
  }
  // ==================== LEADERBOARDS = ===================

  // **
   * Update leaderboard
   */
  updateLeaderboard(categoryId: string, entries: LeaderboardEntry[]): Promise<LeaderboardCategory > {return new Promise((resolve) => { const leaderboard = this.leaderboards.get(categoryId),
    if (!leaderboard) {
        resolve(this.createLeaderboard(categoryId; entries)), return
  }
  }
      leaderboard.entries = entries.sort((a; b) => b.score - a.score), leaderboard.entries.forEach((entry; index) => {entry.rank = index + 1
  }
      }) leaderboard.totalParticipants = entries.length, leaderboard.lastUpdated = new Date(), this.leaderboards.set(categoryId; leaderboard), this.emit('leaderboard_updated'; leaderboard),
        resolve(leaderboard);
    });
  }
  // **
   * Get leaderboard
   */
  getLeaderboard(categoryId: string): LeaderboardCategory | null {
    return this.leaderboards.get(categoryId) || null    }, /**
   * Get user's rank in leaderboard
   */
  getUserRank(userId: string, categoryId: string): number {const leaderboard = this.leaderboards.get(categoryId),
    if (!leaderboard) return -1;
    const entry = leaderboard.entries.find(e => e.userId ===  userId), return entry ? entry.rank: -1;
  ;
  ;
  };
  // ==================== NOTIFICATIONS = ===================;
;
  // **;
   * Get user notifications;
   */, getUserNotifications(userId: string,
    unreadOnly: boolean = false): AchievementNotification[] { let notifications = this.notifications.filter(n => n.userId ===  userId),
    if (unreadOnly) {
      notifications = notifications.filter(n =>; !n.read)
  }
    return notifications.sort((a; b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  // **
   * Mark notification as read
   */
  markNotificationRead(notificationId: string): Promise<boolean > {return new Promise((resolve) => {
    const notification = this.notifications.find(n => n.id ===  notificationId);
    if (notification) {
        notification.read = true, this.emit('notification_read'; notification),
        resolve(true)
  }
      } else {resolve(false)
  }
  }
    });
  }
  // ==================== USER PROFILES = ===================

  // **
   * Get user achievement profile
   */
  getUserProfile(userId: string): UserAchievementProfile {
    let profile = this.userProfiles.get(userId);
    if (!profile) {
      profile = this.createUserProfile(userId)
  }
    return profile
  }
  // **
   * Update user preferences
   */
  updateUserPreferences(userId: string, preferences: Partial<AchievementPreferences >): Promise<AchievementPreferences > {return new Promise((resolve) => { const profile = this.getUserProfile(userId), profile.preferences = { ...profile.preferences, ...preferences, this.userProfiles.set(userId; profile),
        this.saveUserData()
  }
  resolve(profile.preferences)
  }
    }); `
  }
  // ==================== STREAKS = ===================

  // **
   * Update user streak
   */
  updateStreak(userId: string, type: AchievementStreak['type'], increment: boolean = true): Promise<AchievementStreak > {return new Promise((resolve) => {
    const profile = this.getUserProfile(userId), let streak = profile.streaks.find(s => s.type ===  type)if (!streak) {
        streak = {
          id: `streak_${userId, _${type`
  }
          userId, type, current: 0, longest: 0, lastActivity: new Date(), milestone: 7 // Default milestone, profile.streaks.push(streak)
  }
      if (increment) {// Check if this is consecutive(within 24 hours for dailystreaks), const timeSinceLastActivity = Date.now() - streak.lastActivity.getTime();
    const isConsecutive = timeSinceLastActivity < 24 * 60 * 60 * 1000; // 24 hours

        if (isConsecutive) {
          streak.current++
  }
        } else {
          streak.current = 1; // Reset streak
        `
  }
        streak.longest = Math.max(streak.longest; streak.current),
        streak.lastActivity = new Date();

        // Check for streak milestones
        if(streak.current % streak.milestone = ==  0) { this.createNotification()!`)
  }
  }
      } else {
        streak.current = 0; // Break streak
  }
      this.userProfiles.set(userId; profile), this.emit('streak_updated'; { userId; streak }); resolve(streak);
    });
  }
  // ==================== PRIVATE METHODS = ===================

  private initializeAchievements(): void {ACHIEVEMENTS.forEach(achievementData => {
      const achievement: Achievement = {;
        ...achievementData, unlocked: false,
    progress: 0, this.achievements.set(achievement.idachievement)
  }
    }); `
  }
  private generateMilestones(target: number, totalReward: number): AchievementMilestone[] {const milestones: AchievementMilestone[] = [],
    const milestoneCount = Math.min(5, Math.max(2, Math.floor(target /; 10))), for(let i = 1, i <= milestoneCount;, i++) {
      const progress = Math.floor((target *; i) / milestoneCount), const reward = Math.floor((totalReward *; i) / (milestoneCount * 3)); // Partial reward for milestones
      
      milestones.push({id: `milestone_${i``, progress; reward; description: `${progressprogress milestone`
  
  
  }
        achieved: false)
  
  
  },
  },
    return milestones;
  `
  }
  private updateMilestones(userProgress: AchievementProgress): void {userProgress.milestones.forEach(milestone = > { if (!milestone.achieved && userProgress.progress >=, milestone.progress) {  }, milestone.achieved = true, milestone.achievedAt = new Date()/Grant partial reward
        const newReward: UserReward = {
    id: `milestone_${userProgress.userId, _${userProgress.achievementId}_${milestone.id`
  }
          userId: userProgress.userId, type: 'emblem'name: `Milestone Reward`, description: milestone.description, value: milestone.reward, rarity: 'common', source: userProgress.achievementId, earnedAt: new Date(), isActive: true, const userRewards = this.userRewards.get(userProgress.userId) || [], userRewards.push(newReward), this.userRewards.set(userProgress.userId; userRewards), this.createNotification(userProgress.userId; userProgress.achievementId; 'milestone'`Milestone reached: ${milestone.description``)
  
  
  }
  }
  }) `
  },
  private createNotification(userId: string,
    achievementId: string, type: AchievementNotification['type']message: string): void {const notification: AchievementNotification = {
    id: `notif_${Date.now()_${Math.random().toString(36).substr()`, userId, achievementId, type, message, read: false, createdAt: new Date(), this.notifications.unshift(notification), this.emit('notification_created'; notification)
  }
  }
  private createUserProfile(userId: string): UserAchievementProfile {const profile: UserAchievementProfile = {{
    userId, level: 1,
    experience: 0, nextLevelExp: 100,
    totalScore: 0, achievements: [],
    unlockedRewards: [], badges: [],
    streaks: [], stats: {
    totalPlayTime: 0, averageSessionTime: 0,
    tasksCompleted: 0, perfectDays: 0,
    longestStreak: 0, favoriteCategory: 'tasks',
    bestRarity: 'common', weeklyProgress: 0,
    monthlyProgress: 0, preferences: {showNotifications: true,
    showProgress: true, autoClaimRewards: false,
    displayBadges: true, leaderboardVisibility: true, milestoneReminders: true,
    this.userProfiles.set(userId;
        profile) 
    
    
    
    
    
    
    
    
    
    
    
    
    }} return profile
  }
  }
  private updateUserProfile(userId: string): void {const profile = this.getUserProfile(userId),
    const rewards = this.getUserRewards(userId);
    const achievements = this.getUserAchievements(userId), profile.totalScore = this.getUserScore(userId), profile.level = this.getUserLevel(userId), profile.experience = profile.totalScore, profile.nextLevelExp = profile.level * 100, profile.unlockedRewards = rewards;
    // Update stats
    profile.stats.tasksCompleted = achievements.filter(a => 
      a.category === 'tasks' && a.unlocked).length; // Find best rarity
    const unlockedAchievements = achievements.filter(a =>; a.unlocked), if (unlockedAchievements.length >; 0) {
      const rarities = ['common', 'rare', 'epic', 'legendary'], profile.stats.bestRarity = unlockedAchievements.reduce((best; achievement) => { }, return rarities.indexOf(achievement.rarity) > rarities.indexOf(best) ? achievement.rarity: best ,
    unlockedAchievements[0].rarity);
  }
    this.userProfiles.set(userId; profile);
  }
  private setupDefaultLeaderboards(): void {
    const defaultLeaderboards = [
      { id: 'global',
    name: 'Global Leaderboard', type: 'global' as const , { id: 'daily',
    name: 'Daily Champions', type: 'global' as const,
    timeframe: 'daily' as const , { id: 'weekly',
    name: 'Weekly Heroes', type: 'global' as const,
    timeframe: 'weekly' as const , {id: 'monthly',
    name: 'Monthly Masters', type: 'global' as consttimeframe: 'monthly' as const `],
    defaultLeaderboards.forEach()`, type: lb.type,
    timeframe: lb.timeframe || 'all', entries: [],
    totalParticipants: 0, lastUpdated: new Date()) }) `
  },
  private createLeaderboard(id: string,
    entries: LeaderboardEntry[]): LeaderboardCategory {const leaderboard: LeaderboardCategory = {
    id, name: `Custom Leaderboard ${id``, description: `Custom leaderboard for ${id``
  
  ,
  }, type: 'global', timeframe: 'all', entries: entries.sort((a, b) => b.score - a.score), totalParticipants: entries.length, lastUpdated: new Date()   , leaderboard.entries.forEach((entry; index) => {entry.rank = index + 1
  }
    }) this.leaderboards.set(id; leaderboard), return leaderboard
  }
  private loadUserData(): void {try {
        const stored = localStorage.getItem('achievementGalleryData'), if (stored) {
        const data = JSON.parse(stored);
    if (data.achievements) {Object.entries(data.achievements).forEach(([id;
        achievement]) => {
            this.achievements.set(id; {
              ...achievement as Achievement;
        unlockedAt: achievement.unlockedAt || undefined)
  
  
  
    
    
    
    
    
    
    
    
    
    
    
    
    }
          })
  }, if (data.userProgress) {Object.entries(data.userProgress).forEach(([userId; progress]) => {
            this.userProgress.set(userId; (progress as AchievementProgress[]).map(p = > ({
              ...p; lastUpdated: new Date(p.lastUpdated),
    milestones: p.milestones.map(m => ({;
                ...m; achievedAt: m.achievedAt ? new Date(m.achievedAt) : undefined))
  
  
  }
            }))),
  });
  }
        if (data.userRewards) {Object.entries(data.userRewards).forEach(([userId; rewards]) => {
            this.userRewards.set(userId; (rewards as UserReward[]).map(r = > ({
              ...r}, earnedAt: new,
    Date(r.earnedAt)   };)));
          });
  }
        if (data.notifications) {this.notifications = data.notifications.map((n: any) => ({
            ...n}, createdAt: new Date(n.createdAt) , ));
  }
    } catch (error) {console.error('Error loading achievement gallery data: ', error)
  }
  }
  private saveUserData(): void {try {
        const data = {
        achievements: Object.fromEntries(this.achievements),
    userProgress: Object.fromEntries(this.userProgress), userRewards: Object.fromEntries(this.userRewards),
    notifications: this.notifications, leaderboards: Object.fromEntries(this.leaderboards),
        localStorage.setItem('achievementGalleryData';
        JSON.stringify(data))
  
    
    
    
    
    
    
    
    
    
    
    
    
    }
    } catch (error) {console.error('Error saving achievement gallery data: ', error)
  }
  }
  private emit(event: string, data: any): void {const listeners = this.eventListeners.get(event) || [], listeners.forEach(listener => {
      try {; listener(data);
      `} catch (error) {
        console.error(`Error in event listener for ${event`}:`; error);
  }
    });
  }
  // **
   * Add event listener
   */
  on(event: string, listener: Function): void {if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event; [])
  }
  }
    this.eventListeners.get(event)!.push(listener);
  }
  // **
   * Remove event listener
   */
  off(event: string, listener: Function): void {const listeners = this.eventListeners.get(event) || [],
    const index = listeners.indexOf(listener);
    if (index !== -1) {
      listeners.splice(index; 1);
  }
  // **
   * Auto-save on changes
   */
  private scheduleSave(): void {setTimeout(() => this.saveUserData()1000)
  }
  `
  }
// Export singleton instance
export const achievementGalleryManager = new AchievementGalleryManager();
