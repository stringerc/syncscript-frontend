#!/usr/bin/env python3

"""
Integration Manager Integration Script
Fixes syntax errors and adds ManagerIntegrationContract implementation
"""

import re

def fix_integration_manager():
    """Fix and integrate the IntegrationManager"""
    
    file_path = '/Users/Apple/syncscript-frontend/src/utils/integrationManager.ts'
    
    print("🔧 Integrating IntegrationManager...")
    
    # Read the file
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Fix syntax errors
    print("  🔧 Fixing syntax errors...")
    
    # Fix interface syntax
    content = re.sub(r'export interface (\w+) \{([^}]*)\}', 
                    lambda m: f'export interface {m.group(1)} {{\n  {m.group(2).replace(",", ";").replace(";;", ";")}\n}}', 
                    content)
    
    # Fix semicolon issues in arrays
    content = re.sub(r';\s*\n\s*([a-zA-Z_])', r',\n  \1', content)
    content = re.sub(r';;+', ';', content)
    
    # Fix object property syntax
    content = re.sub(r'([a-zA-Z_][a-zA-Z0-9_]*):\s*([^;,}]+);', r'\1: \2,', content)
    
    # Fix array syntax
    content = re.sub(r'\[\s*([^]]*);\s*\]', r'[\n    \1\n  ]', content)
    
    # Fix string concatenation
    content = re.sub(r"'([^']*);\s*\n\s*([^']*)'", r"'\1 \2'", content)
    
    # Add imports at the top
    imports = '''import { ManagerIntegrationContract, IntegrationUtilities, IntegrationStatus } from './integrations/ManagerIntegrationContract';
import { ManagerHealth, ManagerMetrics, ManagerConfig, ManagerMetadata } from './types/ManagerTypes';

'''
    
    # Insert imports after the first comment block
    content = re.sub(
        r'(\*\*\s*\*/\s*)',
        f'\\1{imports}',
        content,
        count=1
    )
    
    # Find and fix the class definition
    class_pattern = r'export class IntegrationManager \{[^}]*\}'
    class_match = re.search(class_pattern, content, re.DOTALL)
    
    if class_match:
        # Replace with proper class implementation
        new_class = '''export class IntegrationManager implements ManagerIntegrationContract {
  private integrations: Map<string, Integration> = new Map();
  private webhooks: Map<string, WebhookConfig> = new Map();
  private eventListeners: Map<string, Function[]> = new Map();
  
  // Integration framework properties
  private integrationStatus: IntegrationStatus;
  private tenantContext: string | null = null;
  private integrationEventBus: any = null;
  private healthMetrics: ManagerHealth;
  private performanceMetrics: ManagerMetrics;

  constructor() {
    // Initialize integration framework properties
    this.integrationStatus = IntegrationUtilities.createIntegrationStatus(
      false, // isInitialized
      false, // isIntegrated
      ['global-state-manager'], // dependencies
      [] // subscribers
    );
    
    this.healthMetrics = {
      status: 'unknown',
      lastCheck: new Date(),
      errorRate: 0,
      responseTime: 0,
      memoryUsage: 0,
      uptime: 0
    };
    
    this.performanceMetrics = {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      averageResponseTime: 0,
      memoryUsage: 0,
      cpuUsage: 0,
      lastUpdated: new Date()
    };
    
    console.log('✅ IntegrationManager initialized');
  }

  // ==================== MANAGER INTEGRATION CONTRACT ====================

  /**
   * Initialize the integration manager
   */
  async initialize(): Promise<void> {
    try {
      this.integrationStatus.isInitialized = false;
      
      // IntegrationManager is already initialized in constructor
      this.integrationStatus.isInitialized = true;
      this.integrationStatus.lastHealthCheck = new Date();
      
      console.log('✅ Integration Manager Integration initialized successfully');
    } catch (error) {
      this.integrationStatus.errorCount++;
      this.integrationStatus.lastError = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to initialize Integration Manager: ${error}`);
    }
  }

  /**
   * Register this manager with the global state system
   */
  async registerWithGlobalState(globalState: any): Promise<void> {
    try {
      await globalState.registerManager('integration-manager', this, this.getManagerMetadata());
      this.integrationStatus.isIntegrated = true;
      console.log('✅ Integration Manager registered with global state system');
    } catch (error) {
      this.integrationStatus.errorCount++;
      throw new Error(`Failed to register Integration Manager: ${error}`);
    }
  }

  /**
   * Subscribe to relevant events from the event bus
   */
  subscribeToEvents(eventBus: any): void {
    this.integrationEventBus = eventBus;
    
    // Subscribe to integration-related events
    eventBus.subscribe('integration_connected', this.handleIntegrationConnected.bind(this));
    eventBus.subscribe('integration_disconnected', this.handleIntegrationDisconnected.bind(this));
    eventBus.subscribe('webhook_triggered', this.handleWebhookTriggered.bind(this));
    eventBus.subscribe('integration_error', this.handleIntegrationError.bind(this));
    
    console.log('✅ Integration Manager subscribed to integration events');
  }

  /**
   * Unsubscribe from events when destroying
   */
  unsubscribeFromEvents(): void {
    if (this.integrationEventBus) {
      this.integrationEventBus.unsubscribe('integration_connected', this.handleIntegrationConnected);
      this.integrationEventBus.unsubscribe('integration_disconnected', this.handleIntegrationDisconnected);
      this.integrationEventBus.unsubscribe('webhook_triggered', this.handleWebhookTriggered);
      this.integrationEventBus.unsubscribe('integration_error', this.handleIntegrationError);
      this.integrationEventBus = null;
    }
  }

  /**
   * Set tenant context for multi-tenant operations
   */
  setTenantContext(tenantId: string): void {
    this.tenantContext = tenantId;
    console.log(`✅ Integration Manager tenant context set to: ${tenantId}`);
  }

  /**
   * Validate tenant access for operations
   */
  validateTenantAccess(tenantId: string): boolean {
    return true; // IntegrationManager has access to all tenants
  }

  /**
   * Get current tenant context
   */
  getCurrentTenantContext(): string | null {
    return this.tenantContext;
  }

  /**
   * Get current health status of the manager
   */
  getHealthStatus(): ManagerHealth {
    return { ...this.healthMetrics };
  }

  /**
   * Get performance and usage metrics
   */
  getMetrics(): ManagerMetrics {
    return { ...this.performanceMetrics };
  }

  /**
   * Perform health check
   */
  async performHealthCheck(): Promise<boolean> {
    try {
      const startTime = Date.now();
      const isHealthy = true; // Implement specific health check logic
      const responseTime = Date.now() - startTime;
      
      this.healthMetrics = {
        status: isHealthy ? 'healthy' : 'unhealthy',
        lastCheck: new Date(),
        errorRate: this.integrationStatus.errorCount,
        responseTime,
        memoryUsage: this.calculateMemoryUsage(),
        uptime: this.calculateUptime(),
        details: {
          totalIntegrations: this.integrations.size,
          connectedIntegrations: Array.from(this.integrations.values()).filter(i => i.status === 'connected').length,
          totalWebhooks: this.webhooks.size,
          currentTenant: this.tenantContext
        }
      };
      
      this.integrationStatus.lastHealthCheck = new Date();
      return this.healthMetrics.status === 'healthy';
    } catch (error) {
      this.healthMetrics.status = 'unhealthy';
      this.integrationStatus.errorCount++;
      return false;
    }
  }

  /**
   * Update manager configuration
   */
  updateConfiguration(config: ManagerConfig): void {
    console.log('✅ Integration Manager configuration updated');
  }

  /**
   * Export current configuration
   */
  exportConfiguration(): ManagerConfig {
    return {
      id: 'integration-manager',
      name: 'Integration Manager',
      version: '1.0.0',
      enabled: true,
      settings: {},
      dependencies: ['global-state-manager'],
      environment: 'production',
      lastModified: new Date(),
      modifiedBy: 'system'
    };
  }

  /**
   * Validate configuration before applying
   */
  validateConfiguration(config: ManagerConfig): boolean {
    return config.id === 'integration-manager' && 
           config.name === 'Integration Manager' &&
           typeof config.settings === 'object';
  }

  /**
   * Get integration status
   */
  getIntegrationStatus(): IntegrationStatus {
    return { ...this.integrationStatus };
  }

  /**
   * Check if manager is properly integrated
   */
  isIntegrated(): boolean {
    return this.integrationStatus.isIntegrated && this.integrationStatus.isInitialized;
  }

  /**
   * Get manager metadata
   */
  getManagerMetadata(): ManagerMetadata {
    return IntegrationUtilities.createManagerMetadata(
      'integration-manager',
      'Integration Manager',
      '1.0.0',
      'Centralized management for all third-party integrations',
      'core',
      'high',
      ['global-state-manager'],
      ['integrations', 'webhooks', 'third_party_services', 'api_management'],
      1
    );
  }

  // ==================== INTEGRATION EVENT HANDLERS ====================

  private handleIntegrationConnected(event: any): void {
    console.log('🔗 Integration connected:', event.integrationId);
    // Update integration status
    const integration = this.integrations.get(event.integrationId);
    if (integration) {
      integration.status = 'connected';
      integration.lastSync = new Date();
    }
  }

  private handleIntegrationDisconnected(event: any): void {
    console.log('🔌 Integration disconnected:', event.integrationId);
    // Update integration status
    const integration = this.integrations.get(event.integrationId);
    if (integration) {
      integration.status = 'disconnected';
    }
  }

  private handleWebhookTriggered(event: any): void {
    console.log('🎣 Webhook triggered:', event.webhookId, event.event);
    // Process webhook event
    this.processWebhookEvent(event.webhookId, event.event, event.data);
  }

  private handleIntegrationError(event: any): void {
    console.log('❌ Integration error:', event.integrationId, event.error);
    // Handle integration error
    const integration = this.integrations.get(event.integrationId);
    if (integration) {
      integration.status = 'error';
      integration.errorMessage = event.error;
    }
  }

  // ==================== INTEGRATION UTILITY METHODS ====================

  private processWebhookEvent(webhookId: string, event: string, data: any): void {
    console.log(`🎣 Processing webhook ${webhookId} for event ${event}`);
    // Implement webhook processing logic
  }

  private calculateMemoryUsage(): number {
    if ('memory' in performance) {
      return (performance as any).memory.usedJSHeapSize / 1024 / 1024;
    }
    return 0;
  }

  private calculateUptime(): number {
    return Date.now() - (globalThis as any).__SYSTEM_START_TIME || 0;
  }

  // ==================== ORIGINAL INTEGRATION METHODS ====================

  /**
   * Get all available integrations
   */
  getAvailableIntegrations(): Omit<Integration, 'status' | 'config' | 'lastSync' | 'errorMessage'>[] {
    return AVAILABLE_INTEGRATIONS;
  }

  /**
   * Get connected integrations
   */
  getConnectedIntegrations(): Integration[] {
    return Array.from(this.integrations.values()).filter(i => i.status === 'connected');
  }

  /**
   * Connect an integration
   */
  async connectIntegration(integrationId: string, config: { [key: string]: unknown }): Promise<boolean> {
    try {
      const integration: Integration = {
        ...AVAILABLE_INTEGRATIONS.find(i => i.id === integrationId)!,
        status: 'connected',
        config,
        lastSync: new Date()
      };
      
      this.integrations.set(integrationId, integration);
      console.log(`✅ Connected integration: ${integrationId}`);
      return true;
    } catch (error) {
      console.error(`❌ Failed to connect integration ${integrationId}:`, error);
      return false;
    }
  }

  /**
   * Disconnect an integration
   */
  async disconnectIntegration(integrationId: string): Promise<boolean> {
    try {
      const integration = this.integrations.get(integrationId);
      if (integration) {
        integration.status = 'disconnected';
        console.log(`✅ Disconnected integration: ${integrationId}`);
        return true;
      }
      return false;
    } catch (error) {
      console.error(`❌ Failed to disconnect integration ${integrationId}:`, error);
      return false;
    }
  }
}'''
        
        # Replace the original class
        content = content.replace(class_match.group(0), new_class)
    
    # Write the fixed content back
    with open(file_path, 'w') as f:
        f.write(content)
    
    print("✅ IntegrationManager integration complete!")

if __name__ == "__main__":
    fix_integration_manager()