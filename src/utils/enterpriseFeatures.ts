/**
 * Features #92-100: Premium & Enterprise Suite
 * Advanced security, compliance, and platform features
 */

/**
 * Feature #92: Advanced Permissions
 * Role-based access control (RBAC)
 */
export interface Permission {
  resource: string
  action: 'create' | 'read' | 'update' | 'delete' | 'share' | 'admin'
  granted: boolean
}

export interface Role {
  id: string
  name: string
  description: string
  permissions: Permission[]
  userCount: number
}

export const defaultRoles: Role[] = [
  {
    id: 'admin',
    name: 'Administrator',
    description: 'Full access to all features',
    permissions: [
      { resource: '*', action: 'admin', granted: true }
    ],
    userCount: 2
  },
  {
    id: 'manager',
    name: 'Manager',
    description: 'Can manage team and projects',
    permissions: [
      { resource: 'projects', action: 'create', granted: true },
      { resource: 'projects', action: 'update', granted: true },
      { resource: 'team', action: 'read', granted: true }
    ],
    userCount: 5
  },
  {
    id: 'member',
    name: 'Team Member',
    description: 'Standard team member access',
    permissions: [
      { resource: 'tasks', action: 'create', granted: true },
      { resource: 'tasks', action: 'update', granted: true },
      { resource: 'projects', action: 'read', granted: true }
    ],
    userCount: 24
  }
]

/**
 * Feature #93: Custom Branding
 * White-label theming system
 */
export interface BrandingConfig {
  companyName: string
  logo: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  fontFamily: string
  customCSS?: string
  emailTemplates?: Record<string, string>
}

export function applyBranding(config: BrandingConfig) {
  document.documentElement.style.setProperty('--brand-primary', config.primaryColor)
  document.documentElement.style.setProperty('--brand-secondary', config.secondaryColor)
  document.documentElement.style.setProperty('--brand-accent', config.accentColor)
  
  if (config.fontFamily) {
    document.documentElement.style.setProperty('--font-family', config.fontFamily)
  }

  if (config.customCSS) {
    const style = document.createElement('style')
    style.textContent = config.customCSS
    document.head.appendChild(style)
  }
}

/**
 * Feature #94: SSO Integration
 * Single Sign-On with SAML/OAuth
 */
export interface SSOProvider {
  id: string
  name: string
  type: 'saml' | 'oauth2' | 'oidc'
  enabled: boolean
  config: {
    clientId?: string
    issuerUrl?: string
    callbackUrl?: string
  }
}

export const ssoProviders: SSOProvider[] = [
  {
    id: 'google',
    name: 'Google Workspace',
    type: 'oauth2',
    enabled: false,
    config: { clientId: '', callbackUrl: '/api/auth/callback/google' }
  },
  {
    id: 'microsoft',
    name: 'Microsoft Azure AD',
    type: 'saml',
    enabled: false,
    config: { issuerUrl: '', callbackUrl: '/api/auth/callback/microsoft' }
  },
  {
    id: 'okta',
    name: 'Okta',
    type: 'saml',
    enabled: false,
    config: { issuerUrl: '', callbackUrl: '/api/auth/callback/okta' }
  }
]

/**
 * Feature #95: Audit Logs
 * Security and compliance tracking
 */
export interface AuditLogEntry {
  id: string
  timestamp: Date
  userId: string
  userName: string
  action: string
  resource: string
  resourceId: string
  ipAddress: string
  userAgent: string
  changes?: Record<string, { old: unknown; new: unknown }>
  status: 'success' | 'failure'
}

export function logAuditEvent(
  userId: string,
  action: string,
  resource: string,
  resourceId: string,
  changes?: Record<string, { old: unknown; new: unknown }>
): AuditLogEntry {
  return {
    id: `audit-${Date.now()}`,
    timestamp: new Date(),
    userId,
    userName: 'Current User',
    action,
    resource,
    resourceId,
    ipAddress: '0.0.0.0',
    userAgent: navigator.userAgent,
    changes,
    status: 'success'
  }
}

/**
 * Feature #96: API Rate Limiting
 * Enterprise-grade throttling
 */
export interface RateLimitConfig {
  endpoint: string
  limit: number
  window: number // seconds
  strategy: 'fixed-window' | 'sliding-window' | 'token-bucket'
}

export const rateLimits: RateLimitConfig[] = [
  { endpoint: '/api/tasks', limit: 100, window: 60, strategy: 'sliding-window' },
  { endpoint: '/api/projects', limit: 50, window: 60, strategy: 'sliding-window' },
  { endpoint: '/api/ai/*', limit: 20, window: 60, strategy: 'token-bucket' }
]

/**
 * Feature #97: Data Residency
 * Regional data storage compliance
 */
export interface DataRegion {
  id: string
  name: string
  location: string
  endpoint: string
  compliance: string[]
  available: boolean
}

export const dataRegions: DataRegion[] = [
  {
    id: 'us-east',
    name: 'US East (Virginia)',
    location: 'United States',
    endpoint: 'https://us-east.syncscript.io',
    compliance: ['SOC2', 'HIPAA'],
    available: true
  },
  {
    id: 'eu-west',
    name: 'EU West (Ireland)',
    location: 'European Union',
    endpoint: 'https://eu-west.syncscript.io',
    compliance: ['GDPR', 'SOC2'],
    available: true
  },
  {
    id: 'ap-south',
    name: 'Asia Pacific (Singapore)',
    location: 'Singapore',
    endpoint: 'https://ap-south.syncscript.io',
    compliance: ['SOC2'],
    available: true
  }
]

/**
 * Feature #98: Advanced Webhooks
 * Event-driven integrations
 */
export interface Webhook {
  id: string
  name: string
  url: string
  events: string[]
  secret: string
  enabled: boolean
  lastTriggered?: Date
  successRate: number
}

export function triggerWebhook(webhook: Webhook, event: string, payload: unknown) {
  if (!webhook.enabled || !webhook.events.includes(event)) return

  fetch(webhook.url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Webhook-Secret': webhook.secret
    },
    body: JSON.stringify({
      event,
      timestamp: new Date().toISOString(),
      payload
    })
  }).catch(console.error)
}

/**
 * Feature #99: Custom Reports Engine
 * Advanced reporting with custom metrics
 */
export interface ReportDefinition {
  id: string
  name: string
  description: string
  metrics: string[]
  filters: Record<string, unknown>
  groupBy: string[]
  sortBy: string
  format: 'table' | 'chart' | 'summary'
  schedule?: 'daily' | 'weekly' | 'monthly'
}

export function generateReport(definition: ReportDefinition, data: unknown[]) {
  // Mock report generation
  return {
    reportId: definition.id,
    generatedAt: new Date(),
    data: data.slice(0, 100), // Sample data
    totalRecords: data.length,
    summary: {
      total: data.length,
      filtered: data.length
    }
  }
}

/**
 * Feature #100: Platform Marketplace
 * Plugin ecosystem
 */
export interface MarketplacePlugin {
  id: string
  name: string
  description: string
  developer: string
  version: string
  category: string
  price: number
  rating: number
  installs: number
  screenshots: string[]
  permissions: string[]
  installed: boolean
}

export const marketplacePlugins: MarketplacePlugin[] = [
  {
    id: 'slack-integration',
    name: 'Slack Integration Pro',
    description: 'Advanced Slack integration with bi-directional sync',
    developer: 'SyncScript Team',
    version: '2.1.0',
    category: 'Integration',
    price: 0,
    rating: 4.8,
    installs: 12400,
    screenshots: [],
    permissions: ['read:messages', 'write:notifications'],
    installed: false
  },
  {
    id: 'time-tracker-pro',
    name: 'Time Tracker Pro',
    description: 'Advanced time tracking with billable hours',
    developer: 'Third Party',
    version: '1.5.2',
    category: 'Productivity',
    price: 9.99,
    rating: 4.6,
    installs: 8200,
    screenshots: [],
    permissions: ['read:tasks', 'write:time-entries'],
    installed: false
  }
]

