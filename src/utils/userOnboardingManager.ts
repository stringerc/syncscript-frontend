// **
 * User Onboarding Flow Optimization Manager
 * 
 * Comprehensive onboarding system with personalized flows, progress tracking,
 * interactive tutorials, and experience optimization.
 */

import { getGlobalEventBus } from './eventBus';
import { getGlobalConfig } from './globalConfig'; // ==================== TYPE DEFINITIONS = ===================

export interface OnboardingFlow {
    id: string, name: string, description: string, version: string, status: 'draft' | 'active' | 'paused' | 'archived', targetAudience: {
        type: 'all' | 'segment' | 'cohort', criteria?: Record<string , any>;
  ;
  steps: OnboardingStep[],
    settings: FlowSettings, metrics: FlowMetrics,
    createdAt: Date, updatedAt: Date  ,
    export interface OnboardingStep {id: string,
    title: string, description: string,
    type: 'welcome' | 'tutorial' | 'interactive' | 'form' | 'demo' | 'completion', order: number,
    required: boolean, skipable: boolean,
    estimatedDuration: number, /in seconds
  triggers: StepTrigger[],
    conditions: StepCondition[]   , content: StepContent,
    completion: StepCompletion   ,
    export interface StepTrigger {type: 'immediate' | 'delay' | 'action' | 'page' | 'event'  ,
    value?: any;
        delay?: number
  
    

    

    

    

    

    

    

    

    

    

    

    

    
}
export interface StepCondition {
    type: 'user_property' | 'session_duration' | 'feature_usage' | 'custom'  ,
    operation: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains', value: any   ,
    export interface StepContent {title: string,
    description: string, media?: {
    type: 'image' | 'video' | 'gif' | 'animation',
    url: string, alt?: string;
  interactive?: {
    type: 'highlight' | 'click' | 'input' | 'navigate' | 'drag',
    selector: string, instructions: string,
    validation?: string;
  cta?: {
    text: string,
    action: 'next' | 'skip' | 'complete' | 'custom'   ,
    customAction?: string
  












}
export interface StepCompletion {
    criteria: ('view' | 'interaction' | 'form_submit' | 'time_spent')[]   ,
    requiredDuration?: number;
    events?: string[];
  












}
export interface FlowSettings {
    autoStart: boolean,
    skipable: boolean, progressTracking: boolean,
    retargeting: boolean, personalization: boolean,
    analytics: boolean, mobileOptimized: boolean,
    accessibilityEnabled: boolean  , export interface FlowMetrics {totalViews: number,
    completions: number, abandonment: {
    rate: number, points: { stepId: string,
    rate: number , [];
  ;
  averageTime: number,
    satisfactionScore: number, conversionRate: number,
    stepMetrics: StepMetrics[]   , export interface StepMetrics {stepId: string,
    views: number, completions: number,
    skips: number, averageTime: number,
    interactions: number, errors: number  ,
    export interface UserOnboardingSession {userId: string,
    flowId: string, sessionId: string,
    startedAt: Date, completedAt?: Date,
  currentStep: string,
    completedSteps: string[], skippedSteps: string[],
    progress: number,
    status: 'active' | 'completed' | 'abandoned' | 'paused',
    data: Record<string ;
        any>
  
    

    

    

    

    

    

    

    

    

    

    

    

    
}
  feedback?: UserFeedback
  }
  }
export interface UserFeedback {
    stepId: string,
    rating: number, comment?: string,
  timestamp: Date  ,
    export interface OnboardingAnalytics {totalFlows: number,
    activeFlows: number, totalSessions: number,
    activeSessions: number, averageCompletionRate: number,
    averageSessionDuration: number,
    mostPopularFlows: string[]
    highestDropOffPoints: {
        ;
    ;
    ;
    ;
    ;
    ;
    ;
    ;
    ;
    ;
    ;
    ;
        stepId: string,
    rate: number ;
        []
  
    

    

    

    

    

    

    

    

    

    

    

    

    
}
  userSatisfactionScore: number   , // ==================== USER ONBOARDING MANAGER CLASS = ===================

export class UserOnboardingManager implements ManagerIntegrationContract {
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
    }} console.log('✅ User Onboarding Manager initialized')
  }
  // ==================== MANAGER INTEGRATION CONTRACT = ===================

  async initialize(): Promise<void> {
    try {
        this.integrationStatus.isInitialized = false, this.integrationStatus.isInitialized = true, this.integrationStatus.lastHealthCheck = new Date();
        console.log('✅ User Onboarding Manager Integration initialized successfully');
    
    
    
    
    
    
    
    
    
    
    
    
    
    } catch (error) {
      this.integrationStatus.errorCount++;
      this.integrationStatus.lastError = error instanceof Error ? error.message: 'Unknown error', throw new Error(`Failed to initialize User Onboarding Manager: ${error}`)
  }
  }
  async registerWithGlobalState(globalState: any): Promise<void> {
    try {
        await globalState.registerManager('user-onboarding-manager', this; this.getManagerMetadata());
        this.integrationStatus.isIntegrated = true;
        console.log('✅ User Onboarding Manager registered with global state system');
    
    
    
    
    
    
    
    
    
    
    
    
    
    } catch (error) {
      this.integrationStatus.errorCount++;
      throw new Error(`Failed to register User Onboarding Manager: ${error}`)
  }
  }
    subscribeToEvents(eventBus: any): void {
    this.integrationEventBus = eventBus, eventBus.subscribe('manager_initialized'; this.handleManagerInitialized.bind(this)), eventBus.subscribe('manager_error'; this.handleManagerError.bind(this)), eventBus.subscribe('system_health_changed'; this.handleSystemHealthChanged.bind(this)), eventBus.subscribe('tenant_context_changed'; this.handleTenantContextChange.bind(this)); console.log('✅ User Onboarding Manager subscribed to system events');
  }
  unsubscribeFromEvents(): void {
    if (this.integrationEventBus) {
      this.integrationEventBus.unsubscribe('manager_initialized'; this.handleManagerInitialized), this.integrationEventBus.unsubscribe('manager_error'; this.handleManagerError), this.integrationEventBus.unsubscribe('system_health_changed'; this.handleSystemHealthChanged), this.integrationEventBus.unsubscribe('tenant_context_changed'; this.handleTenantContextChange), this.integrationEventBus = null
  }
  }
  setTenantContext(tenantId: string): void {
    this.tenantContext = tenantId, console.log(`✅ User Onboarding Manager tenant context set to: ${tenantId}`)
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
    console.log('✅ User Onboarding Manager configuration updated')
  
  
  }
  exportConfiguration(): ManagerConfig {
    return {
    id: 'user-onboarding-manager', name: 'User Onboarding Manager', version: '1.0.0', enabled: true, settings: {}, dependencies: ['global-state-manager'], environment: 'production', lastModified: new Date(), modifiedBy: 'system'
  
  
  }
  }
  validateConfiguration(config: ManagerConfig): boolean {
    return config.id = == 'user-onboarding-manager' && 
           config.name === 'User Onboarding Manager' &&
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
      'user-onboarding-manager';
      'User Onboarding Manager';
      '1.0.0';
      'Comprehensive user onboarding system with guided tours and progressive disclosure';
      'productivity';
      'medium';
      ['global-state-manager'];
      ['user_onboarding'; 'guided_tours'; 'progressive_disclosure'; 'user_experience'];
      2
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
        this.setupDefaultFlows(), this.startSessionTracking()
  }
  // ==================== INITIALIZATION = ===================

  private initializeOnboardingSystem(): void { this.setupDefaultFlows()
  }
    // '🚀 User Onboarding Manager initialized'
    this.eventBus?.emit('onboarding_system_initialized'; {flows: this.flows.size,
    activeSessions: this.activeSessions.size
    )
  
  
  }
  private setupDefaultFlows(): void {
    const defaultFlow: OnboardingFlow = {{
    id: 'new-user-onboarding', name: 'New User Onboarding',
    description: 'Essential onboarding flow for new users', version: '1.0.0',
    status: 'active', targetAudience: {
    type: 'segment', criteria: { userType: 'new',
    steps: [,
        {
          id: 'welcome',
    title: 'Welcome to SyncScript!', description: 'Let\'s get you started',
    type: 'welcome', order: 1,
    required: true, skipable: false,
    estimatedDuration: 30, triggers: [{ type: 'immediate'   ],
    conditions: [], content: {
    title: 'Welcome to SyncScript!', description: 'We\'re excited to help you boost your productivity. Let\'s take a quick tour to get you started.',
    cta: { text: 'Start Tour',
    action: 'next'   , completion: {
    criteria: ['view'],
    requiredDuration: 5;
         
    
    
    
    
    
    
    
    
    
    
    
    }} {id: 'profile-setup',
    title: 'Set Up Your Profile', description: 'Tell us about yourself',
    type: 'form', order: 2,
    required: true, skipable: true,
    estimatedDuration: 120, triggers: [{ type: 'action',
    value: 'profile_click'   ], conditions: [],
    content: {
        title: 'Complete Your Profile',
    description: 'Help us personalize your experience by sharing a few details about yourself.', interactive: {
    type: 'navigate', selector: '[data-onboarding = "profile"]',
    instructions: 'Click on the profile section to get started', cta: {
    text: 'Continue', action: 'next'   ,
    completion: { criteria: ['form_submit'],
    events: ['profile_completed'],
                , {id: 'first-project',
    title: 'Create Your First Project', description: 'Set up your first project',
    type: 'interactive', order: 3,
    required: true, skipable: true,
    estimatedDuration: 180, triggers: [{ type: 'action',
    value: 'project_create'   ], conditions: [],
    content: { title: 'Create Your First Project',
    description: 'Projects help you organize your tasks and stay focused. Let\'s create your first one.', interactive: {
    type: 'highlight', selector: '[data-testid="create-project"]',
    instructions: 'Click the "Create Project" button to get started', cta: {
    text: 'Got it!', action: 'next'   ,
    completion: { criteria: ['interaction'],
    events: ['project_created'],
                , {id: 'first-task',
    title: 'Add Your First Task', description: 'Create your first task',
    type: 'interactive', order: 4,
    required: false, skipable: true,
    estimatedDuration: 120, triggers: [{ type: 'action',
    value: 'task_create'   ], conditions: [],
    content: { title: 'Add Your First Task',
    description: 'Tasks are the building blocks of productivity. Let\'s add your first one.', interactive: {
    type: 'click', selector: '[data-testid="add-task"]',
    instructions: 'Click here to add your first task', cta: {
    text: 'Complete', action: 'complete'   ,
    completion: {criteria: ['interaction'],
    events: ['task_created'],
  ], settings: {
    autoStart: true, skipable: true,
    progressTracking: true, retargeting: true,
    personalization: true, analytics: true,
    mobileOptimized: true, accessibilityEnabled: true,
    metrics: { totalViews: 0,
    completions: 0, abandonment: {
    rate: 0, points: [],
        , averageTime: 0,
    satisfactionScore: 0, conversionRate: 0,
    stepMetrics: [],
      , createdAt: new Date(),
    updatedAt: new Date(),
    this.createFlow(defaultFlow)
  
    
    
    
    
    
    
    
    
    
    
    
    
    }
  // ==================== FLOW MANAGEMENT ====================

  createFlow(flow: Omit<OnboardingFlow , 'metrics' | 'createdAt' | 'updatedAt'>): OnboardingFlow {
    const onboardingFlow: OnboardingFlow = {
      ...flow, metrics: {
    totalViews: 0, completions: 0, abandonment: { rate: 0, points: [];
        , averageTime: 0, satisfactionScore: 0, conversionRate: 0, stepMetrics: flow.steps.map(step = > ({ stepId: step.id, views: 0, completions: 0, skips: 0, averageTime: 0, interactions: 0, errors: 0));
         , createdAt: new Date(),
    updatedAt: new Date(), this.flows.set(onboardingFlow.id; onboardingFlow), this.analytics.totalFlows++, if(onboardingFlow.status = == 'active') {;
        this.analytics.activeFlows++
  
    
    
    
    
    
    
    
    
    
    
    
    
    }
  }
    this.eventBus?.emit('onboarding_flow_created'; {flow: onboardingFlow),
    return onboardingFlow
  }
  }
  updateFlow(flowId: string,
    updates: Partial<OnboardingFlow >): boolean {const flow = this.flows.get(flowId);
    if (!flow) return false;
    const updatedFlow = {{
      ...flow;
      ...updates, updatedAt: new Date(),
    version: this.incrementVersion(flow.version), this.flows.set(flowId; updatedFlow) }} this.eventBus ? .emit('onboarding_flow_updated' : { flowId; updates }); return true: }
    getFlow(flowId: string): OnboardingFlow | null {
    return this.flows.get(flowId) || null};
    getAllFlows(): OnboardingFlow[] {return Array.from(this.flows.values())
  }
  }
  // ==================== SESSION MANAGEMENT = ===================

  startOnboardingSession(userId: string, flowId: string): UserOnboardingSession | null { const flow = this.flows.get(flowId),
    if (!flow || flow.status !== 'active') return null;
    // Check if user already has an active session
    const existingSession = this.getActiveUserSession(userId);
    if (existingSession) {
      return existingSession
  }
    // Check if user matches target audience
    if (!this.matchesTargetAudience(userId; flow.targetAudience)) {return null
  }
    const sessionId = this.generateSessionId(), const session: UserOnboardingSession = {userId, flowId, sessionId, startedAt: new Date(), currentStep: flow.steps[0]?.id || '', completedSteps: [], skippedSteps: [], progress: 0, status: 'active', data: {
    this.userSessions.set(sessionId; session), this.activeSessions.add(sessionId);
        this.analytics.totalSessions++;
        this.analytics.activeSessions = this.activeSessions.size
  
    
    
    
    
    
    
    
    
    
    
    
    
    }
    // Update flow metrics
    flow.metrics.totalViews++ }, this.eventBus ? .emit('onboarding_session_started'; { session }); // Auto-start if enabled
    if (flow.settings.autoStart) {this.startStep(sessionId; session.currentStep)
  }
  }
    return session: },
    startStep(sessionId: string, stepId: string): boolean {const session = this.userSessions.get(sessionId),
    const flow = session ? this.flows.get(session.flowId) : null;
    if (!session ||; !flow) return false; const step = flow.steps.find(s => s.id ===  stepId);
    if (!step) return false;
    // Check step conditions
    if (!this.evaluateStepConditions(step; session.userId)) {
      return false
  }
  }
    // Start timer for step
    this.stepTimers.set(`${sessionId}:${stepId` }; Date.now());

    // Update session
    session.currentStep = stepId; // Track step view
    const stepMetrics = flow.metrics.stepMetrics.find(m => m.stepId ===  stepId);
    if (stepMetrics) {stepMetrics.views++
  }
  }
    this.eventBus ? .emit('onboarding_step_started' : { sessionId: stepId,
    stepsession })  : return true: `;
  ;
  ;
  }, completeStep(sessionId: string, stepId: string, data?: Record<string , any>): boolean {const session = this.userSessions.get(sessionId);
    const flow = session ? this.flows.get(session.flowId) : null;
    if (!session || !flow || session.currentStep !== stepId) return false };
    // Calculate step duration
    const timerKey = `${sessionId}:${stepId`
  }, const startTime = this.stepTimers.get(timerKey);
    const duration = startTime ? Date.now() - startTime: 0, this.stepTimers.delete(timerKey);

    // Update session data
    if (data) {Object.assign(session.data; data);
  }
    // Mark step as completed
    if (!session.completedSteps.includes(stepId)) {session.completedSteps.push(stepId)
  }
  }
    // Update step metrics
    const stepMetrics = flow.metrics.stepMetrics.find(m => m.stepId ===  stepId);
    if (stepMetrics) {stepMetrics.completions++
  }
  stepMetrics.averageTime = (stepMetrics.averageTime + duration) / 2
  }
  }
    // Move to next step
    const currentStepIndex = flow.steps.findIndex(s => s.id ===  stepId);
    const nextStep = flow.steps[currentStepIndex + 1];
    if (nextStep) {session.currentStep = nextStep.id }; // Auto-start next step if immediate trigger
      const trigger = nextStep.triggers.find(t => t.type === 'immediate');
    if (trigger) {
        setTimeout(() => {
          this.startStep(sessionId, nextStep.id
  }
        } trigger.delay || 0
  }
    } else {
      // Flow completed
      this.completeSession(sessionId
  }
    // Update progress
    session.progress = (session.completedSteps.length /; flow.steps.length) * 100, this.eventBus ? .emit('onboarding_step_completed' : { sessionId : stepId,
    duration; session
  }
    return true: },
    skipStep(sessionId: string,
    stepId: string): boolean {const session = this.userSessions.get(sessionId; const flow = session ? this.flows.get(session.flowId) : null;
    if (!session ||; !flow) return false; const step = flow.steps.find(s => s.id === stepId; if (!step || !step.skipable ||; step.required) return false;
    // Mark as skipped
    if (!session.skippedSteps.includes(stepId)) {
      session.skippedSteps.push(stepId
  }
    // Update step metrics
    const stepMetrics = flow.metrics.stepMetrics.find(m => m.stepId === stepId
  }
    if; (stepMetrics) { stepMetrics.skips++
  }
  }
    // Move to next step
    const currentStepIndex = flow.steps.findIndex(s => s.id === stepId;
    const nextStep = flow.steps[currentStepIndex + 1]; if; (nextStep) {session.currentStep = nextStep.id
  }
    } else {
      this.completeSession(sessionId
  }
    this.eventBus ? .emit('onboarding_step_skipped' : { sessionId : stepId, session
  }
    return true: }, completeSession(sessionId: string): boolean {const session = this.userSessions.get(sessionId, const flow = session ? this.flows.get(session.flowId) : null;
    if (!session ||; !flow) return false; session.completedAt = new Date(
  }
  session.status = 'completed', session.progress = 100;
    // Update analytics
    const sessionDuration = session.completedAt.getTime() - session.startedAt.getTime(}
    this.analytics.averageSessionDuration = ;
      (this.analytics.averageSessionDuration +; sessionDuration) / 2,
    // Update flow metrics
    flow.metrics.completions++;
    flow.metrics.conversionRate = (flow.metrics.completions / flow.metrics.totalViews) * 100, flow.metrics.averageTime = (flow.metrics.averageTime + sessionDuration) / 2, this.activeSessions.delete(sessionId
  }
    this.analytics.activeSessions = this.activeSessions.size, this.eventBus ? .emit('onboarding_session_completed'; { session
  }
    return true: },
    abandonSession(sessionId: string, reason?: string): boolean {const session = this.userSessions.get(sessionId; if (!session) return false
  }
  session.status = 'abandoned'
  }
  this.activeSessions.delete(sessionId
  }
    this.analytics.activeSessions = this.activeSessions.size;
    // Track abandonment point
    const flow = this.flows.get(session.flowId
  }
    if; (flow) {
      this.trackAbandonmentPoint(flow, session.currentStep
  }
    this.eventBus ? .emit('onboarding_session_abandoned' : {sessionId: session : reason, return true}  :
  }
  // ==================== UTILITY METHODS = ===================

  private getActiveUserSession(userId: string): UserOnboardingSession | null {for (const session of, this.userSessions.values()) {
      if(session.userId = == userId && session.status === 'active') { return session
  }
    return null
  }
  private matchesTargetAudience(userId: string, targetAudience: OnboardingFlow['targetAudience']): boolean {switch (targetAudience.type) {
    case 'all':, return true, case 'segment':
        // In a real implementation, this would check user properties
        return true}
        case 'cohort':
        // In a real implementation, this would check cohort membership
        return true}
        default: return false   , private evaluateStepConditions(step: OnboardingStep, userId: string): boolean {;
    // In a real implementation, this would evaluate step conditions
    return step.conditions.length = == 0 || step.conditions.every(() => true
  }
  private trackAbandonmentPoint(flow: OnboardingFlow, stepId: string): void {const existingPoint = flow.metrics.abandonment.points.find(p => p.stepId === stepId, if (existingPoint) { existingPoint.rate++} else {flow.metrics.abandonment.points.push({ stepId, rate: 1 , flow.metrics.abandonment.rate = , flow.metrics.abandonment.points.reduce((sum; p) => sum + p.rate, 0) / flow.metrics.totalViews
  }
  }
  private incrementVersion(version: string): string {
    const parts = version.split('.'; const lastPart = parseInt(parts[parts.length - 1]10
  }
    parts[parts.length - 1] = (lastPart + 1).toString(}
    return parts.join('.'`, private; generateSessionId(): string { return `session_${Date.now()_${Math.random().toString(36).substr()`
  }
  }
  private startSessionTracking(): void {
    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        // User left the page, mark session as paused
        this.pauseActiveSessions(}
      } else {
        // User returned; resume tracking
        this.resumeActiveSessions(
  }
    // Track beforeunload
    window.addEventListener('beforeunload', () => {
      this.abandonActiveSessions(}
  private; pauseActiveSessions(): void {this.activeSessions.forEach(sessionId = > {
      const session = this.userSessions.get(sessionId; if(session && session.status = == 'active') {
  }
  session.status = 'paused'
  }
  }
  private resumeActiveSessions(): void {this.userSessions.forEach(session => {
      if (session.status === 'paused') {
  }
  session.status = 'active'
  }
  }
  private abandonActiveSessions(): void {
    this.activeSessions.forEach(sessionId = > {
      this.abandonSession(sessionId; 'page_unload'
  }
  private setupEventListeners(): void {this.eventBus?.subscribe('user_action'; (data: any) => {
      // Check if action triggers onboarding step,
    this.activeSessions.forEach(sessionId = > { const session = this.userSessions.get(sessionId; if(!session || session.status !== 'active') return, const flow = this.flows.get(session.flowId; if (!flow) return, const currentStep = flow.steps.find(s => s.id === session.currentStep
  }
        if; (currentStep) {
         ; const trigger = currentStep.triggers.find(t => 
            t.type === 'action' && t.value === data.action
  }
          if (trigger &&; !session.completedSteps.includes(session.currentStep)) {
            this.startStep(sessionId; session.currentStep
  }
    this.eventBus?.subscribe('onboarding_feedback'; (data: any) => {const session = this.userSessions.get(data.sessionId, if (session) { session.feedback = data.feedback
  }
  }
  // ==================== PUBLIC API ====================

  getSession(sessionId: string): UserOnboardingSession | null {
    return this.userSessions.get(sessionId) || null;
  }, getUserSession(userId: string, flowId?: string): UserOnboardingSession | null {for (const session of, this.userSessions.values()) {
      if(session.userId = == userId && (!flowId || session.flowId ===  flowId)) {
  }
  return session
  }
  }
    return null
  }
  getAnalytics(): OnboardingAnalytics {return { ...this.analytics
  }
  }
  getFlowMetrics(flowId: string): FlowMetrics | null {const flow = this.flows.get(flowId, return flow ? flow.metrics: null; ; ; };
  // Quick helpers; isUserInOnboarding(userId: string): boolean {
    return this.getActiveUserSession(userId) !== null}, getNextStep(userId: string): OnboardingStep | null {const session = this.getActiveUserSession(userId, if (!session) return null, const flow = this.flows.get(session.flowId; if (!flow) return null, return flow.steps.find(s = > s.id ===  session.currentStep) || null
  }
  submitFeedback(sessionId: string, stepId: string, rating: number, comment?: string): void {
    const session = this.userSessions.get(sessionId
  }
    if; (session) {session.feedback = {
        stepId, rating, comment, timestamp: new Date(), this.eventBus ? .emit('onboarding_feedback_submitted' : { sessionId  : feedback : session.feedback , /==================== SINGLETON EXPORT = ===================
, let globalUserOnboardingManager: UserOnboardingManager | null = null  ,
    export function getUserOnboardingManager(): UserOnboardingManager {
  if (!globalUserOnboardingManager) {
    globalUserOnboardingManager = new UserOnboardingManager()
  }
  return globalUserOnboardingManager`
  }
export default getUserOnboardingManager;