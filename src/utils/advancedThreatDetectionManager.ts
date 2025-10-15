/**
 * Advanced Threat Detection Manager
 * 
 * Comprehensive utility for managing enterprise security threat detection,
 * real-time monitoring, incident response, security analytics, threat intelligence,
 * and automated security response systems for enterprise-grade security operations.
 */

export interface ThreatEvent {
  id: string;
  timestamp: Date;
  type: 'suspicious_login' | 'brute_force' | 'data_breach' | 'malware' | 'phishing' | 'ddos' | 'injection' | 'xss' | 'insider_threat' | 'credential_stuffing' | 'privilege_escalation' | 'lateral_movement';
  severity: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  target: string;
  description: string;
  status: 'detected' | 'investigating' | 'mitigated' | 'resolved' | 'false_positive';
  riskScore: number;
  affectedUsers: number;
  autoResponse: boolean;
  confidence: number;
  classification: {
    category: string;
    subcategory: string;
    techniques: string[];
    indicators: string[];
  };
  context: {
    userAgent?: string;
    location?: string;
    sessionId?: string;
    requestId?: string;
    geolocation?: {
      country: string;
      region: string;
      city: string;
      coordinates: { lat: number; lng: number };
    };
  };
  remediation: {
    autoActions: string[];
    manualActions: string[];
    completed: boolean;
    completedBy?: string;
    completedAt?: Date;
  };
  attribution?: {
    actor: string;
    motivation: string;
    resources: string[];
    signature: string;
  };
}

export interface SecurityMetrics {
  totalThreats: number;
  activeThreats: number;
  mitigatedThreats: number;
  averageResponseTime: number;
  falsePositiveRate: number;
  securityScore: number;
  trendAnalysis: {
    threatsLast24h: number;
    threatsLastWeek: number;
    threatsLastMonth: number;
    trendDirection: 'increasing' | 'decreasing' | 'stable';
  };
  categoryBreakdown: {
    category: string;
    count: number;
    percentage: number;
  }[];
  geographyBreakdown: {
    country: string;
    count: number;
    riskLevel: 'low' | 'medium' | 'high';
  }[];
}

export interface ThreatPattern {
  id: string;
  name: string;
  pattern: string;
  description: string;
  frequency: number;
  lastDetected: Date;
  severity: 'low' | 'medium' | 'high' | 'critical';
  mitigation: string;
  detectionRule: {
    id: string;
    name: string;
    enabled: boolean;
    threshold: number;
    window: number;
  };
  indicators: string[];
  tactics: string[];
  techniques: string[];
  confidence: number;
  falsePositiveRate: number;
}

export interface SecurityRule {
  id: string;
  name: string;
  description: string;
  category: string;
  enabled: boolean;
  severity: 'low' | 'medium' | 'high' | 'critical';
  conditions: SecurityRuleCondition[];
  actions: SecurityRuleAction[];
  createdBy: string;
  createdAt: Date;
  lastModified: Date;
  version: number;
  performance: {
    triggered: number;
    falsePositives: number;
    averageExecutionTime: number;
  };
}

export interface SecurityRuleCondition {
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'regex' | 'greater_than' | 'less_than' | 'in' | 'not_in';
  value: any;
  logicalOperator?: 'AND' | 'OR';
}

export interface SecurityRuleAction {
  type: 'block' | 'alert' | 'quarantine' | 'lock' | 'notify' | 'log' | 'custom';
  parameters: Record<string, any>;
  delay?: number;
  escalation?: {
    condition: string;
    action: SecurityRuleAction;
  };
}

export interface ThreatIntelligence {
  id: string;
  source: string;
  type: 'ip' | 'domain' | 'hash' | 'email' | 'url';
  value: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  firstSeen: Date;
  lastSeen: Date;
  tags: string[];
  description: string;
  references: string[];
  indicators: {
    type: string;
    value: string;
    context: string;
  }[];
  attribution: {
    actor: string;
    motivation: string;
    resources: string[];
  };
}

export interface IncidentResponse {
  id: string;
  incidentId: string;
  threatEventId: string;
  status: 'open' | 'assigned' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignee?: string;
  assignedAt?: Date;
  description: string;
  timeline: IncidentTimeline[];
  actions: IncidentAction[];
  evidence: IncidentEvidence[];
  communication: IncidentCommunication[];
  resolution?: {
    summary: string;
    rootCause: string;
    prevention: string;
    resolvedAt: Date;
    resolvedBy: string;
  };
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IncidentTimeline {
  id: string;
  timestamp: Date;
  event: string;
  description: string;
  actor: string;
  metadata?: Record<string, any>;
}

export interface IncidentAction {
  id: string;
  action: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  assignedTo: string;
  dueDate?: Date;
  completedAt?: Date;
  outcome?: string;
}

export interface IncidentEvidence {
  id: string;
  type: 'log' | 'file' | 'screenshot' | 'network' | 'memory';
  name: string;
  description: string;
  hash?: string;
  size?: number;
  collectedBy: string;
  collectedAt: Date;
  chainOfCustody: {
    action: string;
    actor: string;
    timestamp: Date;
  }[];
}

export interface IncidentCommunication {
  id: string;
  type: 'email' | 'chat' | 'call' | 'meeting';
  subject: string;
  content: string;
  participants: string[];
  timestamp: Date;
  direction: 'inbound' | 'outbound';
}

export interface SecurityAlert {
  id: string;
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  category: string;
  source: string;
  timestamp: Date;
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
  resolved: boolean;
  resolvedBy?: string;
  resolvedAt?: Date;
  escalationLevel: number;
  autoGenerated: boolean;
  relatedThreats: string[];
  actions: SecurityAlertAction[];
}

export interface SecurityAlertAction {
  id: string;
  action: string;
  status: 'pending' | 'completed' | 'failed';
  timestamp: Date;
  actor: string;
  result?: string;
}

export interface ThreatHuntingQuery {
  id: string;
  name: string;
  description: string;
  query: string;
  queryLanguage: 'kql' | 'spl' | 'sql' | 'custom';
  tags: string[];
  author: string;
  createdAt: Date;
  lastRun?: Date;
  executionCount: number;
  successCount: number;
  results: {
    timestamp: Date;
    resultCount: number;
    executionTime: number;
    threatsFound: string[];
  }[];
}

export class AdvancedThreatDetectionManager {
  private threatEvents: ThreatEvent[] = [];
  private threatPatterns: ThreatPattern[] = [];
  private securityRules: SecurityRule[] = [];
  private threatIntelligence: ThreatIntelligence[] = [];
  private incidentResponses: IncidentResponse[] = [];
  private securityAlerts: SecurityAlert[] = [];
  private threatHuntingQueries: ThreatHuntingQuery[] = [];
  private isInitialized = false;
  private monitoringInterval?: NodeJS.Timeout;

  constructor() {
    this.initialize();
  }

  private async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      await this.loadData();
      this.initializeDefaultRules();
      this.startMonitoring();
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize Advanced Threat Detection Manager:', error);
    }
  }

  private initializeDefaultRules(): void {
    if (this.securityRules.length === 0) {
      this.securityRules = [
        {
          id: 'rule-brute-force',
          name: 'Brute Force Detection',
          description: 'Detects multiple failed login attempts',
          category: 'authentication',
          enabled: true,
          severity: 'high',
          conditions: [
            { field: 'event_type', operator: 'equals', value: 'login_failure' },
            { field: 'count', operator: 'greater_than', value: 5, logicalOperator: 'AND' }
          ],
          actions: [
            { type: 'block', parameters: { duration: 3600 } },
            { type: 'alert', parameters: { severity: 'high' } }
          ],
          createdBy: 'system',
          createdAt: new Date(),
          lastModified: new Date(),
          version: 1,
          performance: { triggered: 0, falsePositives: 0, averageExecutionTime: 0 }
        }
      ];
    }
  }

  // Threat Event Management
  async createThreatEvent(eventData: Omit<ThreatEvent, 'id' | 'timestamp' | 'remediation'>): Promise<ThreatEvent> {
    await this.initialize();

    const newThreat: ThreatEvent = {
      ...eventData,
      id: this.generateId(),
      timestamp: new Date(),
      remediation: {
        autoActions: [],
        manualActions: [],
        completed: false
      }
    };

    this.threatEvents.unshift(newThreat);
    
    // Trigger security rules
    await this.evaluateSecurityRules(newThreat);
    
    // Create incident response if critical
    if (newThreat.severity === 'critical') {
      await this.createIncidentResponse(newThreat);
    }

    await this.saveData();
    return newThreat;
  }

  async updateThreatEvent(threatId: string, updates: Partial<ThreatEvent>): Promise<ThreatEvent | null> {
    await this.initialize();

    const threatIndex = this.threatEvents.findIndex(threat => threat.id === threatId);
    if (threatIndex === -1) return null;

    this.threatEvents[threatIndex] = { ...this.threatEvents[threatIndex], ...updates };
    await this.saveData();
    return this.threatEvents[threatIndex];
  }

  async getAllThreatEvents(): Promise<ThreatEvent[]> {
    await this.initialize();
    return [...this.threatEvents];
  }

  async getThreatEventsBySeverity(severity: string): Promise<ThreatEvent[]> {
    await this.initialize();
    return this.threatEvents.filter(threat => threat.severity === severity);
  }

  async getThreatEventsByStatus(status: string): Promise<ThreatEvent[]> {
    await this.initialize();
    return this.threatEvents.filter(threat => threat.status === status);
  }

  async getActiveThreats(): Promise<ThreatEvent[]> {
    await this.initialize();
    return this.threatEvents.filter(threat => 
      threat.status === 'detected' || threat.status === 'investigating'
    );
  }

  // Threat Pattern Management
  async addThreatPattern(patternData: Omit<ThreatPattern, 'id' | 'lastDetected' | 'frequency'>): Promise<ThreatPattern> {
    await this.initialize();

    const newPattern: ThreatPattern = {
      ...patternData,
      id: this.generateId(),
      lastDetected: new Date(),
      frequency: 0
    };

    this.threatPatterns.push(newPattern);
    await this.saveData();
    return newPattern;
  }

  async updateThreatPattern(patternId: string, updates: Partial<ThreatPattern>): Promise<ThreatPattern | null> {
    await this.initialize();

    const patternIndex = this.threatPatterns.findIndex(pattern => pattern.id === patternId);
    if (patternIndex === -1) return null;

    this.threatPatterns[patternIndex] = { ...this.threatPatterns[patternIndex], ...updates };
    await this.saveData();
    return this.threatPatterns[patternIndex];
  }

  async getAllThreatPatterns(): Promise<ThreatPattern[]> {
    await this.initialize();
    return [...this.threatPatterns];
  }

  // Security Rule Management
  async createSecurityRule(ruleData: Omit<SecurityRule, 'id' | 'createdAt' | 'lastModified' | 'performance'>): Promise<SecurityRule> {
    await this.initialize();

    const newRule: SecurityRule = {
      ...ruleData,
      id: this.generateId(),
      createdAt: new Date(),
      lastModified: new Date(),
      performance: {
        triggered: 0,
        falsePositives: 0,
        averageExecutionTime: 0
      }
    };

    this.securityRules.push(newRule);
    await this.saveData();
    return newRule;
  }

  async updateSecurityRule(ruleId: string, updates: Partial<SecurityRule>): Promise<SecurityRule | null> {
    await this.initialize();

    const ruleIndex = this.securityRules.findIndex(rule => rule.id === ruleId);
    if (ruleIndex === -1) return null;

    this.securityRules[ruleIndex] = { 
      ...this.securityRules[ruleIndex], 
      ...updates,
      lastModified: new Date(),
      version: this.securityRules[ruleIndex].version + 1
    };
    await this.saveData();
    return this.securityRules[ruleIndex];
  }

  async getAllSecurityRules(): Promise<SecurityRule[]> {
    await this.initialize();
    return [...this.securityRules];
  }

  async getEnabledSecurityRules(): Promise<SecurityRule[]> {
    await this.initialize();
    return this.securityRules.filter(rule => rule.enabled);
  }

  // Incident Response Management
  async createIncidentResponse(threatEvent: ThreatEvent): Promise<IncidentResponse> {
    await this.initialize();

    const newIncident: IncidentResponse = {
      id: this.generateId(),
      incidentId: `INC-${Date.now()}`,
      threatEventId: threatEvent.id,
      status: 'open',
      priority: threatEvent.severity === 'critical' ? 'critical' : 
                threatEvent.severity === 'high' ? 'high' : 'medium',
      description: `Incident created for threat: ${threatEvent.description}`,
      timeline: [{
        id: this.generateId(),
        timestamp: new Date(),
        event: 'incident_created',
        description: 'Incident automatically created from threat detection',
        actor: 'system'
      }],
      actions: [],
      evidence: [],
      communication: [],
      createdBy: 'system',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.incidentResponses.unshift(newIncident);
    await this.saveData();
    return newIncident;
  }

  async updateIncidentResponse(incidentId: string, updates: Partial<IncidentResponse>): Promise<IncidentResponse | null> {
    await this.initialize();

    const incidentIndex = this.incidentResponses.findIndex(incident => incident.id === incidentId);
    if (incidentIndex === -1) return null;

    this.incidentResponses[incidentIndex] = { 
      ...this.incidentResponses[incidentIndex], 
      ...updates,
      updatedAt: new Date()
    };
    await this.saveData();
    return this.incidentResponses[incidentIndex];
  }

  async getAllIncidentResponses(): Promise<IncidentResponse[]> {
    await this.initialize();
    return [...this.incidentResponses];
  }

  // Security Alert Management
  async createSecurityAlert(alertData: Omit<SecurityAlert, 'id' | 'timestamp' | 'acknowledged' | 'resolved' | 'escalationLevel' | 'autoGenerated' | 'relatedThreats' | 'actions'>): Promise<SecurityAlert> {
    await this.initialize();

    const newAlert: SecurityAlert = {
      ...alertData,
      id: this.generateId(),
      timestamp: new Date(),
      acknowledged: false,
      resolved: false,
      escalationLevel: 0,
      autoGenerated: true,
      relatedThreats: [],
      actions: []
    };

    this.securityAlerts.unshift(newAlert);
    await this.saveData();
    return newAlert;
  }

  async acknowledgeAlert(alertId: string, acknowledgedBy: string): Promise<SecurityAlert | null> {
    await this.initialize();

    const alertIndex = this.securityAlerts.findIndex(alert => alert.id === alertId);
    if (alertIndex === -1) return null;

    this.securityAlerts[alertIndex].acknowledged = true;
    this.securityAlerts[alertIndex].acknowledgedBy = acknowledgedBy;
    this.securityAlerts[alertIndex].acknowledgedAt = new Date();
    
    await this.saveData();
    return this.securityAlerts[alertIndex];
  }

  // Threat Intelligence Management
  async addThreatIntelligence(intelData: Omit<ThreatIntelligence, 'id' | 'firstSeen' | 'lastSeen'>): Promise<ThreatIntelligence> {
    await this.initialize();

    const existingIntel = this.threatIntelligence.find(intel => 
      intel.type === intelData.type && intel.value === intelData.value
    );

    if (existingIntel) {
      existingIntel.lastSeen = new Date();
      existingIntel.confidence = Math.max(existingIntel.confidence, intelData.confidence);
      await this.saveData();
      return existingIntel;
    }

    const newIntel: ThreatIntelligence = {
      ...intelData,
      id: this.generateId(),
      firstSeen: new Date(),
      lastSeen: new Date()
    };

    this.threatIntelligence.push(newIntel);
    await this.saveData();
    return newIntel;
  }

  async getAllThreatIntelligence(): Promise<ThreatIntelligence[]> {
    await this.initialize();
    return [...this.threatIntelligence];
  }

  async searchThreatIntelligence(type: string, value: string): Promise<ThreatIntelligence[]> {
    await this.initialize();
    return this.threatIntelligence.filter(intel => 
      intel.type === type && intel.value.includes(value)
    );
  }

  // Monitoring and Detection
  private async evaluateSecurityRules(threatEvent: ThreatEvent): Promise<void> {
    const enabledRules = this.securityRules.filter(rule => rule.enabled);
    
    for (const rule of enabledRules) {
      const startTime = Date.now();
      
      try {
        let matches = true;
        for (const condition of rule.conditions) {
          if (!this.evaluateCondition(threatEvent, condition)) {
            matches = false;
            break;
          }
        }

        if (matches) {
          rule.performance.triggered++;
          
          // Execute rule actions
          for (const action of rule.actions) {
            await this.executeSecurityAction(action, threatEvent);
          }

          // Create alert if high severity
          if (rule.severity === 'high' || rule.severity === 'critical') {
            await this.createSecurityAlert({
              title: `Rule Triggered: ${rule.name}`,
              description: `Security rule "${rule.name}" was triggered by threat event`,
              severity: rule.severity === 'critical' ? 'critical' : 'error',
              category: 'rule_trigger',
              source: 'threat_detection'
            });
          }
        }
      } catch (error) {
        rule.performance.falsePositives++;
      }
      
      rule.performance.averageExecutionTime = 
        (rule.performance.averageExecutionTime + (Date.now() - startTime)) / 2;
    }
  }

  private evaluateCondition(threatEvent: ThreatEvent, condition: SecurityRuleCondition): boolean {
    // Simplified condition evaluation - in real implementation would be more complex
    const fieldValue = this.getFieldValue(threatEvent, condition.field);
    
    switch (condition.operator) {
      case 'equals':
        return fieldValue === condition.value;
      case 'not_equals':
        return fieldValue !== condition.value;
      case 'contains':
        return String(fieldValue).includes(String(condition.value));
      case 'greater_than':
        return Number(fieldValue) > Number(condition.value);
      case 'less_than':
        return Number(fieldValue) < Number(condition.value);
      default:
        return false;
    }
  }

  private getFieldValue(threatEvent: ThreatEvent, field: string): any {
    // Simplified field extraction - in real implementation would be more sophisticated
    switch (field) {
      case 'type':
        return threatEvent.type;
      case 'severity':
        return threatEvent.severity;
      case 'riskScore':
        return threatEvent.riskScore;
      case 'affectedUsers':
        return threatEvent.affectedUsers;
      default:
        return null;
    }
  }

  private async executeSecurityAction(action: SecurityRuleAction, threatEvent: ThreatEvent): Promise<void> {
    switch (action.type) {
      case 'alert':
        await this.createSecurityAlert({
          title: `Security Action: ${action.type}`,
          description: `Automated security action triggered by threat: ${threatEvent.description}`,
          severity: threatEvent.severity === 'critical' ? 'critical' : 'warning',
          category: 'automated_response',
          source: 'security_rule'
        });
        break;
      case 'log':
        console.log(`Security action logged: ${action.type} for threat ${threatEvent.id}`);
        break;
      default:
        console.log(`Unhandled security action: ${action.type}`);
    }
  }

  private startMonitoring(): void {
    // Simulate real-time threat monitoring
    this.monitoringInterval = setInterval(async () => {
      if (Math.random() > 0.85) { // 15% chance of new threat every interval
        const threatTypes: ThreatEvent['type'][] = [
          'suspicious_login', 'brute_force', 'malware', 'phishing'
        ];
        
        const newThreat: Omit<ThreatEvent, 'id' | 'timestamp' | 'remediation'> = {
          type: threatTypes[Math.floor(Math.random() * threatTypes.length)],
          severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as any,
          source: `IP: 192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          target: `User: user-${Math.floor(Math.random() * 1000)}`,
          description: 'Real-time threat detected by monitoring system',
          status: 'detected',
          riskScore: Math.floor(Math.random() * 100),
          affectedUsers: Math.floor(Math.random() * 100),
          autoResponse: Math.random() > 0.5,
          confidence: Math.random() * 100,
          classification: {
            category: 'network',
            subcategory: 'intrusion',
            techniques: ['T1001'],
            indicators: ['unusual_traffic']
          },
          context: {
            geolocation: {
              country: 'Unknown',
              region: 'Unknown',
              city: 'Unknown',
              coordinates: { lat: 0, lng: 0 }
            }
          }
        };

        await this.createThreatEvent(newThreat);
      }
    }, 10000); // Check every 10 seconds
  }

  // Analytics and Reporting
  async getSecurityMetrics(): Promise<SecurityMetrics> {
    await this.initialize();

    const now = new Date();
    const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const totalThreats = this.threatEvents.length;
    const activeThreats = this.threatEvents.filter(t => 
      t.status === 'detected' || t.status === 'investigating'
    ).length;
    const mitigatedThreats = this.threatEvents.filter(t => 
      t.status === 'mitigated' || t.status === 'resolved'
    ).length;

    const threatsLast24h = this.threatEvents.filter(t => t.timestamp >= last24h).length;
    const threatsLastWeek = this.threatEvents.filter(t => t.timestamp >= lastWeek).length;
    const threatsLastMonth = this.threatEvents.filter(t => t.timestamp >= lastMonth).length;

    const trendDirection = threatsLast24h > (threatsLastWeek / 7) ? 'increasing' : 
                          threatsLast24h < (threatsLastWeek / 7) ? 'decreasing' : 'stable';

    const falsePositiveRate = this.threatEvents.length > 0 
      ? (this.threatEvents.filter(t => t.status === 'false_positive').length / this.threatEvents.length) * 100 
      : 0;

    const securityScore = Math.max(0, 100 - (activeThreats * 10) - (falsePositiveRate * 2));

    // Category breakdown
    const categoryCounts = new Map<string, number>();
    this.threatEvents.forEach(threat => {
      const count = categoryCounts.get(threat.type) || 0;
      categoryCounts.set(threat.type, count + 1);
    });

    const categoryBreakdown = Array.from(categoryCounts.entries()).map(([category, count]) => ({
      category,
      count,
      percentage: (count / totalThreats) * 100
    }));

    return {
      totalThreats,
      activeThreats,
      mitigatedThreats,
      averageResponseTime: 45, // Mock data
      falsePositiveRate,
      securityScore,
      trendAnalysis: {
        threatsLast24h,
        threatsLastWeek,
        threatsLastMonth,
        trendDirection
      },
      categoryBreakdown,
      geographyBreakdown: [] // Would be populated from actual geolocation data
    };
  }

  async getThreatDetectionSummary(): Promise<{
    totalThreats: number;
    activeThreats: number;
    totalRules: number;
    enabledRules: number;
    totalIncidents: number;
    openIncidents: number;
    totalAlerts: number;
    unacknowledgedAlerts: number;
    threatIntelligenceEntries: number;
    averageResponseTime: number;
    falsePositiveRate: number;
    securityScore: number;
    last24hThreats: number;
  }> {
    await this.initialize();

    const now = new Date();
    const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const metrics = await this.getSecurityMetrics();

    return {
      totalThreats: this.threatEvents.length,
      activeThreats: metrics.activeThreats,
      totalRules: this.securityRules.length,
      enabledRules: this.securityRules.filter(r => r.enabled).length,
      totalIncidents: this.incidentResponses.length,
      openIncidents: this.incidentResponses.filter(i => i.status === 'open').length,
      totalAlerts: this.securityAlerts.length,
      unacknowledgedAlerts: this.securityAlerts.filter(a => !a.acknowledged).length,
      threatIntelligenceEntries: this.threatIntelligence.length,
      averageResponseTime: metrics.averageResponseTime,
      falsePositiveRate: metrics.falsePositiveRate,
      securityScore: metrics.securityScore,
      last24hThreats: metrics.trendAnalysis.threatsLast24h
    };
  }

  // Cleanup
  destroy(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
    }
  }

  // Data Management
  private async loadData(): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
      const savedThreats = localStorage.getItem('syncscript_threat_events');
      const savedPatterns = localStorage.getItem('syncscript_threat_patterns');
      const savedRules = localStorage.getItem('syncscript_security_rules');
      const savedIntelligence = localStorage.getItem('syncscript_threat_intelligence');
      const savedIncidents = localStorage.getItem('syncscript_incident_responses');
      const savedAlerts = localStorage.getItem('syncscript_security_alerts');

      if (savedThreats) this.threatEvents = JSON.parse(savedThreats);
      if (savedPatterns) this.threatPatterns = JSON.parse(savedPatterns);
      if (savedRules) this.securityRules = JSON.parse(savedRules);
      if (savedIntelligence) this.threatIntelligence = JSON.parse(savedIntelligence);
      if (savedIncidents) this.incidentResponses = JSON.parse(savedIncidents);
      if (savedAlerts) this.securityAlerts = JSON.parse(savedAlerts);
    } catch (error) {
      console.error('Failed to load threat detection data:', error);
    }
  }

  private async saveData(): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem('syncscript_threat_events', JSON.stringify(this.threatEvents));
      localStorage.setItem('syncscript_threat_patterns', JSON.stringify(this.threatPatterns));
      localStorage.setItem('syncscript_security_rules', JSON.stringify(this.securityRules));
      localStorage.setItem('syncscript_threat_intelligence', JSON.stringify(this.threatIntelligence));
      localStorage.setItem('syncscript_incident_responses', JSON.stringify(this.incidentResponses));
      localStorage.setItem('syncscript_security_alerts', JSON.stringify(this.securityAlerts));
    } catch (error) {
      console.error('Failed to save threat detection data:', error);
    }
  }

  private generateId(): string {
    return `threat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Singleton instance
let advancedThreatDetectionManager: AdvancedThreatDetectionManager | null = null;

export const getAdvancedThreatDetectionManager = (): AdvancedThreatDetectionManager => {
  if (!advancedThreatDetectionManager) {
    advancedThreatDetectionManager = new AdvancedThreatDetectionManager();
  }
  return advancedThreatDetectionManager;
};

export default AdvancedThreatDetectionManager;
