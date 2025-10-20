// **
 * Manager Types
 * 
 * Shared type definitions for all manager integrations
 * and system-wide type consistency.
 */

// ==================== HEALTH & MONITORING TYPES = ===================

export interface ManagerHealth {
    status: 'healthy' | 'unhealthy' | 'unknown',
    lastCheck: Date, errorRate: number,
    responseTime: number, memoryUsage: number,
    uptime: number,
    details?: Record<string; any>;
  












}
export interface ManagerMetrics {
    totalRequests: number,
    successfulRequests: number, failedRequests: number,
    averageResponseTime: number, memoryUsage: number,
    cpuUsage: number, lastUpdated: Date,
    customMetrics?: Record<string;
    number>;
  












}
// ==================== CONFIGURATION TYPES = ===================

export interface ManagerConfig {
    id: string, name: string, version: string, enabled: boolean, settings: Record<string, any>, dependencies: string[], environment: 'development' | 'staging' | 'production', lastModified: Date,
    modifiedBy: string;
    ;
    ;
    ;
    ;
    ;
    










},
// ==================== TENANT TYPES = ===================;
, export interface TenantContext {
    tenantId: string, tenantName: string, plan: string, features: string[], limits: Record<string, number>;
    settings: Record<string,
    any>;
  












}
// ==================== EVENT TYPES = ===================

export interface ManagerEvent {
    id: string,
    type: string, source: string,
    timestamp: Date, data: any,
    tenantId?: string;
    userId?: string
  












}
export interface EventSubscription {
    id: string,
    eventType: string, callback: (event: ManagerEvent) => void,
    managerId: string,
    createdAt: Date;
    ;
    ;
    ;
    ;
    ;
    










},
// ==================== DEPENDENCY TYPES = ===================,
,
    export interface ManagerDependency {
    managerId: string,
    version: string, required: boolean,
    status: 'available' | 'unavailable' | 'error',
    lastCheck: Date
  
  
  












}
    export interface DependencyGraph {
  managerId: string, dependencies: ManagerDependency[], dependents: string[],
    tier: number;
    ;
    ;
    ;
    ;
    ;
    










},
// ==================== INTEGRATION TYPES = ===================;
, export interface IntegrationResult {
    success: boolean,
    error?: string;
    data?: any;
    timestamp: Date;
    ;
    ;
    ;
    ;
    











},
    export interface BatchOperation {
    id: string,
    operations: Operation[], status: 'pending' | 'running' | 'completed' | 'failed',
    results: IntegrationResult[],
    startedAt?: Date; completedAt?: Date;
  












}
export interface Operation {
    id: string,
    type: string, target: string,
    data: any,
    status: 'pending' | 'completed' | 'failed',
    result?: IntegrationResult;
  












}
// ==================== CACHE TYPES = ===================

export interface CacheEntry<T = any> {
  key: string,
    value: T, expiresAt: Date, tags: string[], size: number, createdAt: Date, lastAccessed: Date, accessCount: number
  
  
  }
export interface CacheConfig {
  maxSize: number, defaultTtl: number, cleanupInterval: number,
    compression: boolean;
    ;
    ;
    ;
    ;
    ;
    










},
// ==================== ERROR TYPES = ===================,
, export interface ManagerError extends Error {
  managerId: string, errorCode: string, severity: 'low' | 'medium' | 'high' | 'critical', context?: Record<string, any>, timestamp: Date, retryable: boolean
  
  
  }
export interface ErrorHandler {
  handle(error: ManagerError): Promise<void>,
    canHandle(error: ManagerError): boolean;
    ;
    ;
    ;
    ;
    










},
// ==================== VALIDATION TYPES = ===================,
,
    export interface ValidationRule {
    field: string,
    type: 'string' | 'number' | 'boolean' | 'array' | 'object', required: boolean,
    min?: number;
    max?: number;
    pattern?: string;
    custom?: (value: any) => boolean
  
  
  












}
    export interface ValidationResult {
  isValid: boolean,
    errors: ValidationError[],
    warnings: ValidationWarning[]
  
  
  












}
    export interface ValidationError {
  field: string,
    message: string,
    code: string,
    value?: any
  












}
export interface ValidationWarning {
    field: string,
    message: string,
    suggestion?: string
  












}
// ==================== PERFORMANCE TYPES = ===================

export interface PerformanceMetrics {
    responseTime: number,
    throughput: number, errorRate: number,
    availability: number,
    resourceUsage: ResourceUsage,
    timestamp: Date
  
  
  












}
export interface ResourceUsage {
  memory: number, cpu: number, disk: number,
    network: number;
    ;
    ;
    ;
    ;
    ;
    










},
// ==================== SECURITY TYPES = ===================,
,
export interface SecurityContext {
    userId?: string, tenantId?: string, permissions: string[], roles: string[],
    sessionId?: string;
    ipAddress?: string;
    userAgent?: string
  












}
export interface AuditLog {
    id: string,
    action: string, resource: string,
    userId?: string, tenantId?: string, timestamp: Date,
    success: boolean,
    details?: Record<string; any>;
  












}
// ==================== UTILITY TYPES ====================

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
  }
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// ==================== EXPORT = ===================

export default {
  ManagerHealth, ManagerMetrics, ManagerConfig, TenantContext, ManagerEvent, ManagerDependency, IntegrationResult, CacheEntry, ManagerError, ValidationResult, PerformanceMetrics, SecurityContext, AuditLog
