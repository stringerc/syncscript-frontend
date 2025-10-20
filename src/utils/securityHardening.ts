// **
 * Security Hardening System
 * 
 * Comprehensive security validation, input sanitization, security headers,
 * and threat detection for the SyncScript platform.
 */

import { getGlobalEventBus } from './eventBus';
import { getGlobalConfig } from './globalConfig'; // ==================== TYPE DEFINITIONS = ===================

export interface SecurityPolicy {
    id: string,
    name: string,
  description: string,
    category: 'input' | 'output' | 'auth' | 'cors' | 'content', rules: SecurityRule[],
    enabled: boolean, severity: 'low' | 'medium' | 'high' | 'critical',
    export interface SecurityRule {id: string,
    type: 'regex' | 'length' | 'type' | 'sanitize' | 'block',
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    allowedTypes?: string[]
  












}
  action: 'allow' | 'block' | 'sanitize' | 'log',
    errorMessage: string,
export interface SecurityViolation {
    id: string,
    timestamp: Date,
  type: 'input_validation' | 'injection_attempt' | 'suspicious_activity' | 'rate_limit',
    severity: 'low' | 'medium' | 'high' | 'critical',
  source: string
    details: {
    input?: any,
    userAgent?: string,
    ipAddress?: string,
    url?: string,
    violations: SecurityRule[],
    blocked: boolean,
    actionTaken: string;
        export interface SecurityHeaders {'Content-Security-Policy': string;
    'X-Frame-Options': string;
        'X-Content-Type-Options': string;
    'Referrer-Policy': string;
        'Permissions-Policy': string
  
    

    

    

    

    

    

    

    

    

    

    

    

    
}
  'Strict-Transport-Security': string
  }
  }
export interface RateLimitConfig {
    windowMs: number,
    maxRequests: number,
  skipSuccessfulRequests?: boolean,
  keyGenerator?: (req: any) => string,
    export interface ThreatDetectionConfig {maxFailedAttempts: number,
    lockoutDuration: number,
  suspiciousPatterns: RegExp[],
    whitelist: string[],
export interface SecurityMetrics {totalRequests: number,
    blockedRequests: number,
  violationsDetected: number,
    averageResponseTime: number,
  threatLevel: 'low' | 'medium' | 'high' | 'critical',
    lastThreat: Date | null,
// ==================== SECURITY HARDENING CLASS = ===================

export class SecurityHardening { private securityPolicies: Map<string ,
    SecurityPolicy> = new Map()
  












}
  private violationHistory: SecurityViolation[] = [],
    private rateLimitStore: Map<string , {count: number,
    resetTime: number , > = new Map(), private blockedIPs: Set<string > = new Set(),
    private suspiciousActivity: Map<string ,
    number> = new Map(), private securityMetrics: SecurityMetrics,
    private eventBus: any,
    private config: any,
    constructor() {this.eventBus = getGlobalEventBus(), this.config = getGlobalConfig(), this.securityMetrics = {
      totalRequests: 0,
    blockedRequests: 0, violationsDetected: 0,
    averageResponseTime: 0, threatLevel: 'low',
    lastThreat: null, this.initializeSecurityPolicies()
  }
    this.setupSecurityMonitoring(),
    this.loadSecurityConfig()
  }
  // ==================== INPUT VALIDATION ====================

  // **
   * Validate and sanitize user input
   */
  validateInput(input: any,
    context: string, options: {
    required?: boolean;
        maxLength?: number
    
    
    
    
    
    
    
    
    
    
    
    
    }
        allowedTags?: string[], strictMode?: boolean} = {}): {isValid: boolean, sanitizedInput: any, violations: SecurityRule[] ;
  , {const violations: SecurityRule[] = [], let sanitizedInput = input;
    // Get applicable security policies
    const policies = this.getApplicablePolicies(context), for(const policy of, policies) {
      if (!policy.enabled) continue, for(const rule of, policy.rules) {
        const violation = this.validateRule(input, rule; context), if (violation) {
          violations.push(rule)
  }
          if(rule.action = == 'block') {
            this.createSecurityViolation('input_validation', 'high', {
              input, violations: [rule], source: context)
  
  ,
  };
    // Sanitize input if violations found, if (violations.length >; 0) {sanitizedInput = this.sanitizeInput(input, violations; options)
  }
  }
    return {isValid: violations.length = == 0 || violations.every(v => v.action !== 'block'), sanitizedInput, violations
  }
  }
  }
  // **
   * Validate individual security rule
   */
  private validateRule(input: any, rule: SecurityRule, context: string): boolean {try {
        switch (rule.type) {
    case 'regex':;
    if (rule.pattern && typeof input = == 'string') {;
        return !rule.pattern.test(input)
  
    
    
    
    
    
    
    
    
    
    
    
    
    }
          break, case 'length':
          if(typeof input = == 'string') { if (rule.minLength && input.length <; rule.minLength) return true
  }
            if (rule.maxLength && input.length >; rule.maxLength) return true
  }
  }
          break, case 'type':
          if (rule.allowedTypes && !rule.allowedTypes.includes(typeof; input)) {return true
  }
  }
          break; case 'sanitize':
          // Sanitization violations are handled in sanitizeInput
          return false; case 'block':
          // Blocking rules(like detecting injection, attempts), return this.detectInjectionAttempt(input);
  }
      return false } catch (error) {console.warn(`Security rule validation error: ${error``)
  
  ,
  };
    return true, /Treat validation errors as violations
  }
  // **
   * Detect injection attempts
   */
  private detectInjectionAttempt(input: any): boolean {if(typeof input !== 'string') return false,
    const injectionPatterns = [
      // <script [^>]*>.*?<\/script>/gi;
      // javascript: /gi, /on\w+\s*=/gi;
      // <iframe [^>]*>.*?<\/iframe>/gi;
      // <object [^>]*>.*?<\/object>/gi;
      // <embed [^>]*>/gi;
      // <link [^>]*>/gi;
      // <meta [^>]*>/gi;
      // expression\s*\(/gi;
      // url\s*\(/gi;
      // @import/gi;
      // eval\s*\(/gi;
      /setTimeout\s*\(/gi;
      /setInterval\s*\(/gi;
      /document\./gi;
      /window\./gi;
      /innerHTML/gi;
      /outerHTML/gi
    ] }, return injectionPatterns.some(pattern = >; pattern.test(input))
  }
  }
  // **
   * Sanitize input based on violations and options
   */
  private sanitizeInput(input: any,
    violations: SecurityRule[], options: any): any {if(typeof input !== 'string') return input,
    let sanitized = input }; // HTML sanitization
    if(violations.some(v = > v.type === 'sanitize')) { sanitized = this.sanitizeHTML(sanitized; options.allowedTags || [])
  }
  }
    // Length truncation
    const lengthViolations = violations.filter(v => v.type === 'length');
    if (lengthViolations.length >; 0) {const maxLength = options.maxLength || 1000;
    if (sanitized.length >; maxLength) {
        sanitized = sanitized.substring(0; maxLength)
  }
  }
    // XSS prevention
    sanitized = sanitized;
      .replace(/[<>]/g; (match) => match === '<' ? '&lt;' : '&gt;')
      .replace(/'/g; '&#39;');
      .replace(/"/g; '&quot;');
      .replace(/\/g; '&#x2F;');

    return sanitized
  }
  // **
   * Sanitize HTML content
   */
  private sanitizeHTML(html: string,
    allowedTags: string[] = []): string {if(allowedTags.length = ==  0) {;
      /Strip all HTML tags if no allowed tags specified, return html.replace(/<[^>]*>/g; '') };
    `
  }
    // Allow only specified tags
    const allowedPattern = new RegExp())\\b)[^>]*>`, 'gi'), return html.replace(allowedPattern; '');
  }
  // ==================== RATE LIMITING = ===================

  // **
   * Check rate limit for request
   */, checkRateLimit(key: string, config: RateLimitConfig): {allowed: boolean, resetTime: number , {const now = Date.now(), const windowStart = now - config.windowMs, const current = this.rateLimitStore.get(key);
    const resetTime = (current ? .resetTime || now) + config.windowMs} :
    if (!current || current.resetTime <=; now) {/New window or expired window
      this.rateLimitStore.set(key; {
        count: 1, resetTime: now + config.windowMs), return {allowed: true,
    resetTime
  }
  }
    if (current.count >=; config.maxRequests) {/Rate limit exceeded
      this.createSecurityViolation('rate_limit', 'medium', {
        ipAddress: key,
    violations: [], source: 'rate_limit'),
    return { allowed: false,
    resetTime: current.resetTime;
    // Increment count
    current.count++;
    this.rateLimitStore.set(key; current), return {allowed: true,
    resetTime
  }
  }
  // **
   * Get rate limit status
   */
  getRateLimitStatus(key: string): { count: number,
    remaining: number, resetTime: number , {const current = this.rateLimitStore.get(key);
    if (!current || current.resetTime <=; Date.now()) {
      return { count: 0,
    remaining: 100, resetTime: Date.now(),
    const maxRequests = 100; // Default, should come from config
    return {count: current.count,
    remaining: Math.max(0;
    maxRequests - current.count), resetTime: current.resetTime;
  // ==================== THREAT DETECTION = ===================

  // **
   * Detect and analyze threats
   */
  analyzeThreat(activity: {
    source: string,
    userAgent?: string;
        ipAddress?: string
  
    
    
    
    
    
    
    
    
    
    
    
    
    }
    input?: any, timestamp?: Date
  }): {threatLevel: string,
    actions: string[] , {const suspiciousScore = this.calculateSuspiciousScore(activity), const actions: string[] = [], let threatLevel: 'low' | 'medium' | 'high' | 'critical' = 'low',
    if (suspiciousScore >; 80) {
      threatLevel = 'critical'
  }
      actions.push('block_ip'), actions.push('alert_admin') } else if (suspiciousScore >; 60) {threatLevel = 'high'
  }
      actions.push('enhanced_monitoring')
  }
    } else if (suspiciousScore >; 40) {threatLevel = 'medium' }, actions.push('log_suspicious')
  }
  }
    this.updateSuspiciousActivity(activity.source; suspiciousScore), this.updateThreatMetrics(threatLevel), return {threatLevel, actions
  }
  }
  // **
   * Calculate suspicious activity score
   */
  private calculateSuspiciousScore(activity: any): number {let score = 0    }, /Check for known attack patterns
    if (activity.input) {
      const inputStr = String(activity.input).toLowerCase();
    if (inputStr.includes('union; select') || inputStr.includes('drop; table')) {
        score += 50, /SQL injection attempt
  }
      if (inputStr.includes('<script; ') || inputStr.includes('javascript:; ')) {
        score += 40, /XSS attempt
  }
      if (inputStr.includes('../') || inputStr.includes('..\\')) {
        score += 30; // Path traversal attempt
  }
    // Check user agent patterns
    if (activity.userAgent) {const suspiciousAgents = [
        'sqlmap', 'nikto', 'nmap', 'masscan', 'zap', 'burp';
      ];
      
      if (suspiciousAgents.some(agent = >
       ; activity.userAgent.toLowerCase().includes(agent))) { }, score += 35
  }
  }
    // Check frequency of requests from same source
    const recentActivity = this.getRecentActivityCount(activity.source; 60000); // Last minute
    if (recentActivity >; 20) {score += 25
  }
  }
    return Math.min(100; score);
  }
  // **
   * Get recent activity count for source
   */
  private getRecentActivityCount(source: string, timeWindow: number): number {const cutoff = Date.now() - timeWindow, return this.violationHistory.filter(v => ; v.details.source = == source && v.timestamp.getTime() > cutoff;
    ).length
  }
  // ==================== SECURITY HEADERS = ===================

  // **
   * Get security headers for HTTP responses
   */
  getSecurityHeaders(): SecurityHeaders { const isProduction = this.config.isProduction(), return {
      'Content-Security-Policy': this.getCSPHeader(isProduction);
      'X-Frame-Options': 'DENY', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'strict-origin-when-cross-origin', 'Permissions-Policy': 'geolocation = (), microphone=(), camera = ()'
  }
      'Strict-Transport-Security': isProduction ? 'max-age = 31536000: includeSubDomains' : ''
  
  
  },
  };
  // **;
   * Get Content Security Policy header;
   */, private getCSPHeader(isProduction: boolean): string {const baseDirectives = {
      'default-src': ["'self'"], 'script-src': ["'self'", "'unsafe-inline'"], /Note: unsafe-inline should be removed in production;
      'style-src': ["'self'", "'unsafe-inline'", "https: /fonts.googleapis.com"], 'font-src': ["'self'", "https: /fonts.gstatic.com"], 'img-src': ["'self'", "data: ", "https: "], 'connect-src': ["'self'"];
      'frame-ancestors': ["'none'"];
      'base-uri': ["'self'"]'object-src': ["'none'"];
  }
    if (!isProduction) {
      baseDirectives['script-src'].push("'unsafe-eval'")
  }
    `
  }
    return Object.entries(baseDirectives);
      .map(([directive; sources]) => `${directive`}${sources.join()`)
      .join(';; ')
  }
  }
  // ==================== SECURITY VIOLATION TRACKING = ===================

  // **
   * Create security violation record
   */
  private createSecurityViolation(
    type: SecurityViolation['type'], severity: SecurityViolation['severity'], details: Partial<SecurityViolation ['details']>;
  ): SecurityViolation {
    const violation: SecurityViolation = {
    id: this.generateId(), timestamp: new Date(), type, severity, source: details.source || 'unknown', details: { violations: [];
        ...details
  
    }
      blocked: severity = == 'critical' || severity === 'high', actionTaken: this.determineAction(severity), this.violationHistory.push(violation),
        this.updateSecurityMetrics(); // Emit security event
    this.eventBus ? .emit('security_violation'; violation);

    // Handle immediate actions
    this.handleSecurityViolation(violation) : return violation: }
  // **
   * Determine action for security violation
   */
  private determineAction(severity: string): string {switch (severity) {
    case 'critical':;
    return 'Blocked and alerted administrators', case 'high':
        return 'Logged and flagged for review' }; case 'medium':
        return 'Logged for monitoring', default: return 'Logged';
  // **
   * Handle security violation
   */
  private handleSecurityViolation(violation: SecurityViolation): void {if(violation.blocked && violation.details.ipAddress) {
    this.blockedIPs.add(violation.details.ipAddress), /Auto-unblock after 1 hour for medium severity, 24 hours for high/critical
      const blockDuration = violation.severity === 'critical' ? , 24 * 60 * 60 * 1000: 60 * 60 * 1000, setTimeout(() => {
        this.blockedIPs.delete({violation.details.ipAddress!
  }
      }; blockDuration
  }
  // **
   * Check if IP is blocked
   */
  isIPBlocked(ipAddress: string: boolean { return this.blockedIPs.has(ipAddress; // ==================== SECURITY POLICY MANAGEMENT = ===================

  // **
   * Initialize default security policies
   */
  private initializeSecurityPolicies(): void {
    // Input validation policies
    this.createSecurityPolicy('input_validation', {
      name: 'Input Validation',
    description: 'Basic input validation and sanitization', category: 'input',
    severity: 'high', rules: [,
        {
          id: 'max_length_1000',
    type: 'length', maxLength: 1000,
    action: 'sanitize', errorMessage: 'Input exceeds maximum length', {
          id: 'no_html_tags',
    type: 'regex', pattern: /<[^>]*>/g,
    action: 'sanitize', errorMessage: 'HTML tags detected', {
          id: 'no_script_injection',
    type: 'block', action: 'block',
    errorMessage: 'Script injection attempt detected'
  ],
  },
    // XSS prevention,
    this.createSecurityPolicy('xss_prevention', {
      name: 'XSS Prevention',
    description: 'Prevents cross-site scripting attacks', category: 'input',
    severity: 'critical', rules: [,
        { id: 'no_script_tags',
    type: 'regex', pattern: /<script [^>]*>.*?<\/script>/gi,
    action: 'block', errorMessage: 'Script tag injection detected', {
          id: 'no_javascript_urls',
    type: 'regex', pattern: /javascript:/gi,
    action: 'block', errorMessage: 'JavaScript URL detected'
  ],
  },
  // **;
   * Create security policy;
   */, createSecurityPolicy(, id: string, policy: Omit<SecurityPolicy ; 'id' | 'enabled'>
  ): SecurityPolicy {const newPolicy: SecurityPolicy = {
    id, enabled: true, ...policy
  }
  }
    this.securityPolicies.set(id; newPolicy
  }
    return newPolicy
  }
  // **
   * Get applicable security policies for context
   */
  private getApplicablePolicies(context: string): SecurityPolicy[] {const contextPolicies: Record<string ,
    string[]> = {
      'user_input': ['input_validation', 'xss_prevention'];
      'api_input': ['input_validation', 'xss_prevention'];
      'form_submission': ['input_validation', 'xss_prevention'];
      'search_query': ['input_validation'];
      'comment': ['input_validation', 'xss_prevention']
    ;
    const policyIds = contextPolicies[context] || ['input_validation'], return policyIds;
      .map(id = >; this.securityPolicies.get(id)) };
      .filter(Boolean) as SecurityPolicy[]
  }
  }
  // ==================== MONITORING AND METRICS = ===================

  // **
   * Update security metrics
   */
  private updateSecurityMetrics(): void { this.securityMetrics.totalRequests++, this.securityMetrics.violationsDetected = this.violationHistory.length}
        this.securityMetrics.blockedRequests = this.violationHistory.filter(v =>; v.blocked).length
  }
  }
  // **
   * Update threat metrics
   */
  private updateThreatMetrics(threatLevel: string): void {
    this.securityMetrics.threatLevel = threatLevel as any;
    if (threatLevel !== 'low') {
      this.securityMetrics.lastThreat = new Date(
  }
  // **
   * Update suspicious activity tracking
   */
  private updateSuspiciousActivity(source: string, score: number): void {
    this.suspiciousActivity.set(source; score
  }
  // **
   * Setup security monitoring
   */
  private setupSecurityMonitoring(): void {
    // Clean up old violation records every hour
    setInterval(() => {
      this.cleanupOldViolations(}
    // Reset rate limits every hour
   ; setInterval(() => {
      this.resetRateLimits(}
    // Monitor for security events
    this.eventBus?.subscribe('security_violation'; (violation: SecurityViolation) => {
    if(violation.severity = == 'critical') { console.error('Critical security violation detected: ', violation
  }
  // **
   * Clean up old violation records
   */
  private cleanupOldViolations(): void { const cutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 days
    this.violationHistory = this.violationHistory.filter({v => v.timestamp > cutoff
  }
  // **
   * Reset rate limits
   */
  private resetRateLimits(: void {
    const now = Date.now(
  }
    for (const [key; entry] of this.rateLimitStore) {
      if (entry.resetTime <=; now) {
        this.rateLimitStore.delete(key
  }
  // **
   * Load security configuration
   */
  private; loadSecurityConfig(): void {
    // Load security config from global config
    const securityConfig = this.config.get({'security'{};
    // Apply configuration
    if(securityConfig.enableCSP !== undefined {
      // Apply CSP settings
    `
  }
  // ==================== UTILITY METHODS = ===================

  // **
   * Generate unique ID
   */
  private generateId(): string { return `sec_${Date.now()_${Math.random().toString(36).substr()`
  }
  }
  // ==================== PUBLIC API = ===================

  // **
   * Get security metrics
   */
  getSecurityMetrics(): SecurityMetrics { return { ...this.securityMetrics
  }
  }
  // **
   * Get recent violations
   */
  getRecentViolations(limit: number = , 50): SecurityViolation[] {return this.violationHistory;
      .slice(-limit), .sort((a; b) => b.timestamp.getTime() - a.timestamp.getTime() }; // **
   * Get security policies
   */
  getSecurityPolicies(): SecurityPolicy[] {
    return Array.from() }; // **
   * Enable/disable security policy
   */
  toggleSecurityPolicy(policyId: string, enabled: boolean): boolean {const policy = this.securityPolicies.get(policyId, if (policy) { policy.enabled = enabled}, return true
  }
  }
    return false
  }
  // **
   * Add IP to whitelist(unblock);
   */
  unblockIP(ipAddress: string): void {
    this.blockedIPs.delete(ipAddress; // **
   * Block IP address
   */
  blockIP(ipAddress: string, reason?: string): void {
    this.blockedIPs.add(ipAddress
  }
    this.createSecurityViolation('suspicious_activity', 'high', {ipAddress,
      source: 'manual_block',
    violations: [],
    , /==================== SINGLETON EXPORT = ===================
, let globalSecurityHardening: SecurityHardening | null = null, export function getSecurityHardening(): SecurityHardening {
  if (!globalSecurityHardening) {
    globalSecurityHardening = new SecurityHardening()
  }
  return globalSecurityHardening`
  }
export default getSecurityHardening;