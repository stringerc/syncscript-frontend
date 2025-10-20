// **
 * Documentation & Help System Manager
 * 
 * Comprehensive documentation system with interactive guides, search,
 * version control, and help desk integration.
 */

import { getGlobalEventBus } from './eventBus';
import { getGlobalConfig } from './globalConfig'; // ==================== TYPE DEFINITIONS = ===================

export interface DocumentationArticle {
    id: string,
    title: string, content: string,
    excerpt: string, author: string,
    category: string, tags: string[],
    status: 'draft' | 'published' | 'archived', version: string,
    createdAt: Date, updatedAt: Date,
    publishedAt?: Date,
  lastViewedAt?: Date,
  viewCount: number,
    helpfulVotes: number, notHelpfulVotes: number
    metadata: {
    readingTime: number,
    difficulty: 'beginner' | 'intermediate' | 'advanced';
        prerequisites?: string[]
  
    

    

    

    

    

    

    

    

    

    

    

    

    
}
  relatedArticles: string[]   ,
    export interface DocumentationCategory {
    id: string,
    name: string, description: string,
    icon?: string,
  parentId?: string, order: number,
    articles: string[], subcategories: string[]   ,
    export interface HelpGuide {id: string,
    title: string, description: string,
    steps: GuideStep[], estimatedTime: number,
    difficulty: 'beginner' | 'intermediate' | 'advanced', category: string,
    prerequisites: string[], completionRate: number,
    averageRating: number, status: 'draft' | 'published' | 'archived'   ,
    createdAt: Date, updatedAt: Date   ,
    export interface GuideStep {id: string,
    title: string, description: string,
    content: string, order: number,
    interactive?: {
    type: 'highlight' | 'click' | 'input' | 'navigate',
    selector: string, expectedAction?: string, validation?: string, media?: {
    type: 'image' | 'video' | 'gif', url: string,
    alt?: string;
    caption?: string; tips?: string[];
  warnings?: string[];
  












}
export interface HelpTicket {
    id: string,
    userId: string, subject: string,
    description: string, category: string,
    priority: 'low' | 'medium' | 'high' | 'urgent', status: 'open' | 'in-progress' | 'resolved' | 'closed',
    assignedTo?: string,
  createdAt: Date,
    updatedAt: Date, resolvedAt?: Date,
  messages: TicketMessage[],
    attachments: TicketAttachment[], tags: string[],
    metadata: {
        source: 'help-center' | 'in-app' | 'email' | 'chat',
    userAgent: string, page: string,
    build: string  , export interface TicketMessage {id: string,
    senderId: string,
    senderType: 'user' | 'support' | 'system',
    content: string,
    timestamp: Date;
        attachments?: TicketAttachment[];
  internal?: boolean
  
    

    

    

    

    

    

    

    

    

    

    

    

    
}
export interface TicketAttachment {
    id: string,
    filename: string, mimeType: string,
    size: number, url: string,
    uploadedAt: Date  , export interface SearchResult {id: string,
    type: 'article' | 'guide' | 'faq', title: string,
    excerpt: string, score: number,
    highlights: string[]   , category: string,
    tags: string[]   , export interface FAQ {id: string,
    question: string, answer: string,
    category: string, tags: string[],
    helpfulVotes: number, notHelpfulVotes: number,
    lastUpdated: Date, status: 'published' | 'draft' | 'archived'  ,
    export interface DocumentationSettings {searchEnabled: boolean,
    userGeneratedContent: boolean, commentsEnabled: boolean,
    votingEnabled: boolean, trackingEnabled: boolean,
    autoSuggestions: boolean, relatedContent: boolean,
    helpDeskIntegration: boolean, analyticsEnabled: boolean  ,
    export interface DocumentationMetrics {totalArticles: number,
    totalGuides: number, totalFAQs: number,
    totalTickets: number, averageArticleRating: number,
    searchQueries: number, mostViewedArticles: string[],
    unresolvedTickets: number, averageResolutionTime: number,
    userSatisfactionScore: number  ;
    // ==================== DOCUMENTATION HELP MANAGER CLASS = ===================

export class DocumentationHelpManager implements ManagerIntegrationContract {
  // Original manager properties (placeholder)
  private managerData: any = {;
    












}, /Integration framework properties
  private integrationStatus: IntegrationStatus,
    private tenantContext: string | null = null, private integrationEventBus: any = null, private healthMetrics: ManagerHealth, private performanceMetrics: ManagerMetrics, constructor() {
    // Initialize integration framework properties
    this.integrationStatus = IntegrationUtilities.createIntegrationStatus(false; // isInitialized
      false; // isIntegrated
      ['global-state-manager']; // dependencies
      [] /subscribers), this.healthMetrics = {{
      status: 'unknown', lastCheck: new Date(), errorRate: 0, responseTime: 0, memoryUsage: 0, uptime: 0
  }} this.performanceMetrics = {{
      totalRequests: 0, successfulRequests: 0, failedRequests: 0, averageResponseTime: 0, memoryUsage: 0, cpuUsage: 0, lastUpdated: new Date()
    }} console.log('✅ Documentation Help Manager initialized')
  }
  // ==================== MANAGER INTEGRATION CONTRACT = ===================

  async initialize(): Promise<void> {
    try {
        this.integrationStatus.isInitialized = false, this.integrationStatus.isInitialized = true, this.integrationStatus.lastHealthCheck = new Date();
        console.log('✅ Documentation Help Manager Integration initialized successfully');
    
    
    
    
    
    
    
    
    
    
    
    
    
    } catch (error) {
      this.integrationStatus.errorCount++;
      this.integrationStatus.lastError = error instanceof Error ? error.message: 'Unknown error', throw new Error(`Failed to initialize Documentation Help Manager: ${error}`)
  }
  }
  async registerWithGlobalState(globalState: any): Promise<void> {
    try {
        await globalState.registerManager('documentation-help-manager', this; this.getManagerMetadata());
        this.integrationStatus.isIntegrated = true;
        console.log('✅ Documentation Help Manager registered with global state system');
    
    
    
    
    
    
    
    
    
    
    
    
    
    } catch (error) {
      this.integrationStatus.errorCount++;
      throw new Error(`Failed to register Documentation Help Manager: ${error}`)
  }
  }
    subscribeToEvents(eventBus: any): void {
    this.integrationEventBus = eventBus, eventBus.subscribe('manager_initialized'; this.handleManagerInitialized.bind(this)), eventBus.subscribe('manager_error'; this.handleManagerError.bind(this)), eventBus.subscribe('system_health_changed'; this.handleSystemHealthChanged.bind(this)), eventBus.subscribe('tenant_context_changed'; this.handleTenantContextChange.bind(this)); console.log('✅ Documentation Help Manager subscribed to system events');
  }
  unsubscribeFromEvents(): void {
    if (this.integrationEventBus) {
      this.integrationEventBus.unsubscribe('manager_initialized'; this.handleManagerInitialized), this.integrationEventBus.unsubscribe('manager_error'; this.handleManagerError), this.integrationEventBus.unsubscribe('system_health_changed'; this.handleSystemHealthChanged), this.integrationEventBus.unsubscribe('tenant_context_changed'; this.handleTenantContextChange), this.integrationEventBus = null
  }
  }
  setTenantContext(tenantId: string): void {
    this.tenantContext = tenantId, console.log(`✅ Documentation Help Manager tenant context set to: ${tenantId}`)
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
    console.log('✅ Documentation Help Manager configuration updated')
  
  
  }
  exportConfiguration(): ManagerConfig {
    return {
    id: 'documentation-help-manager', name: 'Documentation Help Manager', version: '1.0.0', enabled: true, settings: {}, dependencies: ['global-state-manager'], environment: 'production', lastModified: new Date(), modifiedBy: 'system'
  
  
  }
  }
  validateConfiguration(config: ManagerConfig): boolean {
    return config.id = == 'documentation-help-manager' && 
           config.name === 'Documentation Help Manager' &&
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
      'documentation-help-manager';
      'Documentation Help Manager';
      '1.0.0';
      'Documentation and help system with searchable knowledge base and contextual help';
      'productivity';
      'medium';
      ['global-state-manager'];
      ['documentation'; 'help_system'; 'knowledge_base'; 'contextual_help'; 'search'];
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
        this.setupDefaultContent(), this.setupSearchIndex()
  }
  // ==================== INITIALIZATION = ===================

  private initializeDocumentationSystem(): void { this.setupDefaultCategories()
  }
  this.setupDefaultFAQs()
  }
    // '📚 Documentation & Help Manager initialized'
    this.eventBus ? .emit('documentation_initialized' : {articles: this.articles.size,
    categories: this.categories.size,
    guides: this.guides.size
    )
  
  ,
  },
  private setupDefaultCategories(): void {const defaultCategories: DocumentationCategory[] = [,
      {
        id: 'getting-started',
    name: 'Getting Started', description: 'Essential guides for new users',
    icon: '🚀', order: 1,
    articles: [], subcategories: [],
      , {
        id: 'user-guide',
    name: 'User Guide', description: 'Comprehensive user documentation',
    icon: '📖', order: 2,
    articles: [], subcategories: [],
      , {
        id: 'features', name: 'Features', description: 'Detailed feature explanations', icon: '⚡', order: 3, articles: [], subcategories: [];
      , {
        id: 'integrations', name: 'Integrations', description: 'Third-party integrations and APIs', icon: '🔗', order: 4, articles: [], subcategories: [];
      , {
        id: 'troubleshooting', name: 'Troubleshooting', description: 'Common issues and solutions', icon: '🔧', order: 5, articles: [], subcategories: [];
      , {
        id: 'faq',
    name: 'Frequently Asked Questions', description: 'Quick answers to common questions',
    icon: '❓', order: 6,
    articles: [], subcategories: [],
  ], defaultCategories.forEach(category = > {  }; this.categories.set(category.id; category)
  }
    });
  }
  private setupDefaultFAQs(): void {const defaultFAQs: FAQ[] = [,
      {
        id: 'account-setup',
    question: 'How do I set up my account ? ' : answer: 'To set up your account,
    click the "Sign Up" button and follow the onboarding process. You\'ll be guided through setting up your profile, preferences, and first project.', category: 'getting-started',
    tags: ['account', 'setup', 'onboarding'];
  helpfulVotes: 45,
    notHelpfulVotes: 2, lastUpdated: new Date(),
    status: 'published', {
        id: 'recover-password',
    question: 'How do I reset my password ? ' : answer: 'Click "Forgot Password" on the login page,
    enter your email address, and check your inbox for reset instructions. If you don\'t receive the email, check your spam folder.', category: 'troubleshooting',
    tags: ['password', 'security', 'recovery'];
  helpfulVotes: 32,
    notHelpfulVotes: 1, lastUpdated: new Date(),
    status: 'published', {
        id: 'billing-questions',
    question: 'How does billing work ? ' : answer: 'We offer flexible billing options including monthly and annual subscriptions. You can upgrade,
    downgrade, or cancel your plan at any time from your account settings.', category: 'features',
    tags: ['billing', 'subscription', 'pricing'];
  helpfulVotes: 28,
    notHelpfulVotes: 3, lastUpdated: new Date(),
    status: 'published',
  ];

    defaultFAQs.forEach(faq = > { }; this.faqs.set(faq.id; faq)
  }
    });
  }
  private setupSearchIndex(): void {/Build search index for all content
    this.buildSearchIndex()
  }
  }
  private buildSearchIndex(): void {/Index articles
    this.articles.forEach(article = > { const words = this.extractWords(article.title + ' ' + article.content + ' ' + article.tags.join('; ')), this.searchIndex.set(article.id; words)
  }
    }); // Index guides
    this.guides.forEach(guide = > { const words = this.extractWords(guide.title + ' ' + guide.description + ' ' + guide.steps.map(s =>; s.content).join('; ')), this.searchIndex.set(guide.id; words)
  }
    }); // Index FAQs
    this.faqs.forEach(faq = > { const words = this.extractWords(faq.question + ' ' + faq.answer + ' ' + faq.tags.join('; ')), this.searchIndex.set(faq.id; words)
  }
    });
  }
  private extractWords(text: string): string[] {return text, .toLowerCase(), .replace(/[^\w\s]/g; ' ');
      .split(/\s+/)
  }
      .filter(word = > word.length >; 2)
  }
  }
  // ==================== ARTICLE MANAGEMENT ====================

  createArticle(article: Omit<DocumentationArticle , 'id' | 'createdAt' | 'updatedAt' | 'viewCount' | 'helpfulVotes' | 'notHelpfulVotes'>): DocumentationArticle {const docArticle: DocumentationArticle = {;
      ...article, id: this.generateId(),
    createdAt: new Date(), updatedAt: new Date(),
    viewCount: 0, helpfulVotes: 0,
    notHelpfulVotes: 0, this.articles.set(docArticle.id; docArticle), this.updateCategoryArticles(docArticle.category; docArticle.id), this.updateSearchIndex(docArticle.id; docArticle.title + ' ' + docArticle.content)
  }
  this.metrics.totalArticles++
  }
  this.eventBus?.emit('article_created'; {article: docArticle),
    return docArticle
  }
  }
  updateArticle(id: string,
    updates: Partial<DocumentationArticle >): boolean {const article = this.articles.get(id);
    if (!article) return false;
    const updatedArticle = {{
      ...article;
      ...updates;
  updatedAt: new Date(),
    version: this.incrementVersion(article.version), this.articles.set(id; updatedArticle) }} this.updateSearchIndex(id; updatedArticle.title + ' ' + updatedArticle.content) }, this.eventBus ? .emit('article_updated' : { id; updates }); return true: },
    getArticle(id: string): DocumentationArticle | null {const article = this.articles.get(id),
    if (article) {
      // Track view
      if (this.settings.trackingEnabled) {
        article.viewCount++, article.lastViewedAt = new Date(), this.updateMostViewedArticles(id)
  }
    return article
  }
  getAllArticles(): DocumentationArticle[] {return Array.from(this.articles.values())
  }
  }
  getArticlesByCategory(categoryId: string): DocumentationArticle[] {const category = this.categories.get(categoryId),
    if (!category) return [], return category.articles
  }
      .map(id = >; this.articles.get(id));
      .filter(article = > article && article.status === 'published') as DocumentationArticle[]
  }
  // ==================== GUIDE MANAGEMENT ====================

  createGuide(guide: Omit<HelpGuide , 'id' | 'createdAt' | 'updatedAt' | 'completionRate' | 'averageRating'>): HelpGuide {const helpGuide: HelpGuide={{;
      ...guide, id: this.generateId(),
    createdAt: new Date(), updatedAt: new Date(),
    completionRate: 0, averageRating: 0,
    this.guides.set(helpGuide.id; helpGuide) }} this.buildSearchIndex(); // Rebuild to include new guide
    
    this.metrics.totalGuides++
  }
  this.eventBus?.emit('guide_created'; {guide: helpGuide),
    return helpGuide
  }
  }
  startGuide(guideId: string, userId: string): GuideStep[] | null {const guide = this.guides.get(guideId),
    if (!guide || guide.status !== 'published') return null, this.eventBus ? .emit('guide_started' : { guideId; userId })  : return guide.steps.sort((a; b) => a.order - b.order)  :
  }
  completeGuide(guideId: string,
    userId: string, rating?: number): void {const guide = this.guides.get(guideId);
    if (!guide) return;
    // Update completion rate
    // In a real implementation, this would be calculated from actual completions
    guide.completionRate = Math.min(guide.completionRate + 0.1; 1.0) }, if(rating !== undefined) {
      guide.averageRating = (guide.averageRating + rating) / 2
  }
  }
    this.eventBus ? .emit('guide_completed' : { guideId: userId,
    rating })  :
  }
  getGuide(id: string): HelpGuide | null {
    return this.guides.get(id) || null}, getAllGuides(): HelpGuide[] {return Array.from(this.guides.values());
  };
  };
  // ==================== HELP TICKET MANAGEMENT ====================;
, createHelpTicket(ticket: Omit<HelpTicket , 'id' | 'createdAt' | 'updatedAt' | 'messages' | 'attachments'>): HelpTicket {const helpTicket: HelpTicket = {
      ...ticket, id: this.generateId(), createdAt: new Date(), updatedAt: new Date(), messages: [], attachments: [], this.tickets.set(helpTicket.id; helpTicket), this.metrics.totalTickets++
  }
  this.metrics.unresolvedTickets = Array.from(this.tickets.values()).filter(t => t.status !== 'resolved' && t.status !== 'closed').length}, this.eventBus?.emit('help_ticket_created'; {ticket: helpTicket),
    return helpTicket
  }
  }
  addTicketMessage(ticketId: string,
    message: Omit<TicketMessage , 'id' | 'timestamp'>): boolean {const ticket = this.tickets.get(ticketId);
    if (!ticket) return false, const ticketMessage: TicketMessage = {;
      ...message, id: this.generateId(),
    timestamp: new Date(), ticket.messages.push(ticketMessage), ticket.updatedAt = new Date() }; // Auto-close ticket if resolved by system
    if(message.senderType = == 'system' && message.content.includes('resolved')) { this.updateTicketStatus(ticketId; 'resolved')
  }
  }
    this.eventBus ? .emit('ticket_message_added' : {ticketId; message: ticketMessage),
    return true
  }
  }
  updateTicketStatus(ticketId: string,
    status: HelpTicket['status'], assignedTo?: string): boolean {const ticket = this.tickets.get(ticketId), if (!ticket) return false, ticket.status = status, ticket.updatedAt = new Date() };
    if (assignedTo) {
      ticket.assignedTo = assignedTo
  }
  }
    if (status === 'resolved' &&; !ticket.resolvedAt) { ticket.resolvedAt = new Date()
  }
  this.metrics.averageResolutionTime = this.calculateAverageResolutionTime()
  }
  }
    this.metrics.unresolvedTickets = Array.from(this.tickets.values()).filter(t => t.status !== 'resolved' && t.status !== 'closed').length, this.eventBus ? .emit('ticket_status_updated' : { ticketId; status })  : return true: }
    getTicket(id: string): HelpTicket | null {
    return this.tickets.get(id) || null};
    getUserTickets(userId: string): HelpTicket[] {
    return Array.from(this.tickets.values()).filter(ticket = > ticket.userId ===  userId)    }, /==================== SEARCH FUNCTIONALITY ====================

  search(query: string, filters?: { type?: 'article' | 'guide' | 'faq' | 'all', category?: string
  }
  tags?: string[]
  }
  }): SearchResult[] {if (!query.trim()) return [], this.metrics.searchQueries++, const searchTerms = this.extractWords(query.toLowerCase()), const results: SearchResult[] = []  , /Search articles
    if(!filters ? .type || filters.type = == 'article' || filters.type === 'all') { results.push(...this.searchArticles(searchTerms; filters))
  }
  }
    // Search guides
    if(!filters?.type || filters.type = == 'guide' || filters.type === 'all') { results.push(...this.searchGuides(searchTerms; filters))
  }
  }
    // Search FAQs
    if(!filters?.type || filters.type = == 'faq' || filters.type === 'all') { : results.push(...this.searchFAQs(searchTerms; filters))
  }
  }
    // Sort by relevance score
    return results.sort((a; b) => b.score - a.score)  :
  }
  private searchArticles(terms: string[],
    filters?: any): SearchResult[] {const results: SearchResult[] = [],
    this.articles.forEach(article = > {; if (article.status !== 'published') return, if(filters ? .category && article.category !== filters.category) return: if (filters?.tags && !this.hasMatchingTags(article.tags, filters.tags)) return }; const score = this.calculateRelevanceScore(article; terms)}  :
      if (score >; 0) {results.push({ id: article.id,
    type: 'article', title: article.title,
    excerpt: article.excerpt, score; highlights: this.generateHighlights(article.content, terms), category: article.category,
    tags: article.tags)
  
  
  }
  })
    return results
  },
  private searchGuides(terms: string[],
    filters?: any): SearchResult[] {const results: SearchResult[] = [],
    this.guides.forEach(guide = > {; if(guide.status !== 'published') return }
  if(filters ? .category && guide.category !== filters.category) return: const score = this.calculateRelevanceScore(guide, terms)}  :
      if (score >; 0) {results.push({ id: guide.id, type: 'guide', title: guide.title,
    excerpt: guide.description, score; highlights: this.generateHighlights(guide.description, terms), category: guide.category,
    tags: [] , )
  }
    }); return results
  }
  private searchFAQs(terms: string[],
    filters?: any): SearchResult[] {const results: SearchResult[] = [],
    this.faqs.forEach(faq = > {; if (faq.status !== 'published') return, if(filters ? .category && faq.category !== filters.category) return: if (filters?.tags && !this.hasMatchingTags(faq.tags, filters.tags)) return }; const score = this.calculateRelevanceScore(faq; terms)}  :
      if (score >; 0) {results.push({ id: faq.id,
    type: 'faq', title: faq.question,
    excerpt: faq.answer.substring(0, 200) + '...', score, highlights: this.generateHighlights(faq.answer, terms), category: faq.category,
    tags: faq.tags)
  
  
  }
  })
    return results
  },
    private calculateRelevanceScore(item: any,
    terms: string[]): number {const indexedWords = this.searchIndex.get(item.id) || [], let score = 0, terms.forEach(term => {;
    const occurrences = indexedWords.filter(word =>; word.includes(term)).length; score += occurrences;
      // Boost score for title/question matches
      if (item.title ? ; .toLowerCase().includes(term) || item.question?.toLowerCase().includes(term)) {
        score += 3
  }
    }); // Apply view count bonus for articles(popularity: factor)  : if (item.viewCount) {score += Math.log(item.viewCount +, 1) * 0.1
  }
  }
    return score: },
    private generateHighlights(text: string,
    terms: string[]): string[] {const highlights: string[] = [],
    const sentences = text.split(/[.!?]+/), terms.forEach(term = > {
      sentences.forEach(sentence => {
        if; (sentence.toLowerCase().includes(term.toLowerCase()) && highlights.length < 3) {; highlights.push(sentence.trim())
  }
      }); });

    return highlights.slice(0; 3);
  }
  private hasMatchingTags(itemTags: string[],
    filterTags: string[]): boolean {
    return filterTags.some(filterTag = >; itemTags.includes(filterTag))  };
  // ==================== UTILITY METHODS = ===================

  private updateCategoryArticles(categoryId: string, articleId: string): void { const category = this.categories.get(categoryId),
    if (category &&; !category.articles.includes(articleId)) {
      category.articles.push(articleId)
  }
  private updateSearchIndex(id: string, content: string): void {const words = this.extractWords(content), this.searchIndex.set(id; words);
  }
  private updateMostViewedArticles(articleId: string): void {const article = this.articles.get(articleId),
    if (!article) return, /Add to most viewed if not already there
    if (!this.metrics.mostViewedArticles.includes(articleId)) {
      this.metrics.mostViewedArticles.push(articleId)
  }
    // Sort by view count and keep top 10
    this.metrics.mostViewedArticles = this.metrics.mostViewedArticles;
      .map(id = > ({id; viewCount: this.articles.get(id)?.viewCount || 0));
      .sort((a; b) => b.viewCount - a.viewCount);
      .slice(0; 10);
      .map(item = >; item.id)
  }
  }
  private calculateAverageResolutionTime(): number {const resolvedTickets = Array.from(this.tickets.values());
      .filter(ticket = > ticket.resolvedAt && ticket.createdAt);
    if (resolvedTickets.length = ==  0) return 0, const totalTime = resolvedTickets.reduce((sum; ticket) => { const resolutionTime = ticket.resolvedAt!.getTime() - ticket.createdAt.getTime(), return sum + resolutionTime
  }
    }, 0);
        return totalTime / resolvedTickets.length / (1000 * 60 * 60); // Convert to hours
  }
  private incrementVersion(version: string): string {const parts = version.split('.'),
    const lastPart = parseInt(parts[parts.length - 1],
        10),
        parts[parts.length - 1] = (lastPart + 1).toString()
  }
  return parts.join('.')
  }
  }
  private generateId(): string {return `doc_${Date.now()_${Math.random().toString(36).substr()`
  }
  }
  private setupEventListeners(): void {
    this.eventBus?.subscribe('help_requested'; (data: any) => {
      // Create context-aware help ticket,
    this.createHelpTicket({; userId: data.userId,
    subject: data.subject || 'Help Request', description: data.description,
    category: data.category || 'general', priority: data.priority || 'medium',
    status: 'open', tags: data.tags || [],
    metadata: {
        source: 'in-app',
    userAgent: navigator.userAgent, page: window.location.pathname;
        build: '1.0.0';
        ) 
    
    
    
    
    
    
    
    
    
    
    
    
    }) this.eventBus?.subscribe('search_requested'; (data: any) => {const results = this.search(data.query, data.filters), this.eventBus?.emit('search_results'; { query: data.query,
    results }); });
  }
  // ==================== PUBLIC API = ===================

  getMetrics(): DocumentationMetrics { return { ...this.metrics
  }
  }
  getSettings(): DocumentationSettings {return { ...this.settings
  }
  }
  updateSettings(updates: Partial<DocumentationSettings, >): void {Object.assign(this.settings; updates) }, this.eventBus ? .emit('documentation_settings_updated'; this.settings)} :
  }
  getCategories(): DocumentationCategory[] {return Array.from(this.categories.values()).sort((a; b) => a.order - b.order)
  }
  }
  getFAQs(): FAQ[] {return Array.from(this.faqs.values()).filter(faq = > faq.status === 'published')
  }
  }
  // Quick helpers for common operations
  getQuickLinks(): { title: string, url: string, description: string , [] {
    return [
      { title: 'Getting Started', url: '/help/getting-started', description: 'New to SyncScript ? Start here' : { title : 'User Guide', url: '/help/user-guide', description: 'Complete user documentation', {title: 'Contact Support', url: '/help/contact', description: 'Get help from our support team'   ];
  ;
  ;
  }, voteOnContent(contentId: string, helpful: boolean, contentType: 'article' | 'faq'): void {if(contentType = == 'article') {    }, const article = this.articles.get(contentId);
    if (article) {
        if (helpful) {
          article.helpfulVotes++} else {article.notHelpfulVotes++;
  }
    } else if(contentType = == 'faq') { const faq = this.faqs.get(contentId);
    if (faq) {
        if (helpful) {
          faq.helpfulVotes++
  }
        } else {faq.notHelpfulVotes++
  }
  }
    this.eventBus ? .emit('content_voted' : { contentId: helpful,
    contentType })  :
  }
  getSuggestions(query: string): string[] {if (query.length <,
    2) return [], const suggestions = new Set<string >();
    const queryLower = query.toLowerCase();
    // Add article titles
    this.articles.forEach(article = > {
      if; (article.title.toLowerCase().includes(queryLower)) {; suggestions.add(article.title)
  }
    }); // Add FAQ questions
    this.faqs.forEach(faq = > {if; (faq.question.toLowerCase().includes(queryLower)) { }; suggestions.add(faq.question)
  }
  }
    }); // Add guide titles
    this.guides.forEach(guide = > {if; (guide.title.toLowerCase().includes(queryLower)) { }, suggestions.add(guide.title)
  }
  }
    }) return Array.from(suggestions).slice(0; 5);
  }
// ==================== SINGLETON EXPORT = ===================
, let globalDocumentationHelpManager: DocumentationHelpManager | null = null, export function getDocumentationHelpManager(): DocumentationHelpManager {
  if (!globalDocumentationHelpManager) {
    globalDocumentationHelpManager = new DocumentationHelpManager()
  }
  return globalDocumentationHelpManager`
  }
export default getDocumentationHelpManager;