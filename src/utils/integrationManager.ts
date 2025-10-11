/**
 * Integration Manager
 * Phase 3: 90-Day Innovation - Feature 2
 * 
 * Centralized management for all third-party integrations
 */

export interface Integration {
  id: string;
  name: string;
  icon: string;
  description: string;
  status: 'connected' | 'disconnected' | 'error';
  category: 'productivity' | 'communication' | 'calendar' | 'development';
  features: string[];
  requiredScopes: string[];
  config?: { [key: string]: unknown };
  lastSync?: Date;
  errorMessage?: string;
}

export interface WebhookConfig {
  id: string;
  name: string;
  url: string;
  events: string[];
  secret: string;
  enabled: boolean;
  lastTriggered?: Date;
}

/**
 * Available integrations
 */
export const AVAILABLE_INTEGRATIONS: Omit<Integration, 'status' | 'config' | 'lastSync' | 'errorMessage'>[] = [
  {
    id: 'slack',
    name: 'Slack',
    icon: '💬',
    description: 'Send tasks to channels, get notifications, create tasks from messages',
    category: 'communication',
    features: [
      'Send tasks to Slack channels',
      'Create tasks from Slack messages',
      'Get completion notifications',
      'Team energy dashboard in Slack'
    ],
    requiredScopes: ['channels:read', 'channels:write', 'chat:write']
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: '🐙',
    description: 'Import issues as tasks, sync status, link commits to tasks',
    category: 'development',
    features: [
      'Import GitHub issues as tasks',
      'Sync task status with issues',
      'Link commits to tasks',
      'Auto-close tasks on PR merge'
    ],
    requiredScopes: ['repo', 'read:user']
  },
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    icon: '📅',
    description: 'Sync events with tasks, add leave-by times, show weather on events',
    category: 'calendar',
    features: [
      'Two-way calendar sync',
      'Add leave-by times to events',
      'Show weather on calendar',
      'Auto-create tasks from events'
    ],
    requiredScopes: ['calendar.readonly', 'calendar.events']
  },
  {
    id: 'zapier',
    name: 'Zapier',
    icon: '⚡',
    description: 'Connect to 5,000+ apps via Zapier workflows',
    category: 'productivity',
    features: [
      'Trigger zaps on task completion',
      'Create tasks from any app',
      'Send energy updates to other tools',
      'Webhook-based automation'
    ],
    requiredScopes: []
  },
  {
    id: 'notion',
    name: 'Notion',
    icon: '📝',
    description: 'Import/export tasks, sync databases, embed SyncScript views',
    category: 'productivity',
    features: [
      'Import Notion pages as tasks',
      'Export tasks to Notion',
      'Two-way database sync',
      'Embed SyncScript widgets in Notion'
    ],
    requiredScopes: ['read:page', 'write:page', 'read:database']
  }
];

/**
 * Load integrations from localStorage
 */
export function loadIntegrations(): Integration[] {
  if (typeof window === 'undefined') {
    return AVAILABLE_INTEGRATIONS.map(i => ({
      ...i,
      status: 'disconnected' as const
    }));
  }
  
  try {
    const stored = localStorage.getItem('integrations');
    if (!stored) {
      return AVAILABLE_INTEGRATIONS.map(i => ({
        ...i,
        status: 'disconnected' as const
      }));
    }
    
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading integrations:', error);
    return AVAILABLE_INTEGRATIONS.map(i => ({
      ...i,
      status: 'disconnected' as const
    }));
  }
}

/**
 * Save integrations
 */
export function saveIntegrations(integrations: Integration[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('integrations', JSON.stringify(integrations));
  } catch (error) {
    console.error('Error saving integrations:', error);
  }
}

/**
 * Connect integration (OAuth flow)
 */
export async function connectIntegration(
  integrationId: string,
  authCode?: string
): Promise<{ success: boolean; error?: string }> {
  // Mock OAuth flow
  // In production: Redirect to OAuth provider, handle callback
  
  console.log(`🔗 Connecting integration: ${integrationId}`);
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const integrations = loadIntegrations();
  const integration = integrations.find(i => i.id === integrationId);
  
  if (!integration) {
    return { success: false, error: 'Integration not found' };
  }
  
  integration.status = 'connected';
  integration.lastSync = new Date();
  integration.config = {
    connected_at: new Date().toISOString(),
    auth_token: 'mock_token_' + integrationId
  };
  
  saveIntegrations(integrations);
  
  return { success: true };
}

/**
 * Disconnect integration
 */
export function disconnectIntegration(integrationId: string): void {
  const integrations = loadIntegrations();
  const integration = integrations.find(i => i.id === integrationId);
  
  if (integration) {
    integration.status = 'disconnected';
    integration.config = undefined;
    integration.lastSync = undefined;
    saveIntegrations(integrations);
  }
}

/**
 * Get connected integrations
 */
export function getConnectedIntegrations(): Integration[] {
  return loadIntegrations().filter(i => i.status === 'connected');
}

/**
 * Manage webhooks
 */
export function loadWebhooks(): WebhookConfig[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem('webhooks');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    return [];
  }
}

export function saveWebhook(webhook: WebhookConfig): void {
  const webhooks = loadWebhooks();
  const existing = webhooks.findIndex(w => w.id === webhook.id);
  
  if (existing >= 0) {
    webhooks[existing] = webhook;
  } else {
    webhooks.push(webhook);
  }
  
  if (typeof window !== 'undefined') {
    localStorage.setItem('webhooks', JSON.stringify(webhooks));
  }
}

export function deleteWebhook(webhookId: string): void {
  const webhooks = loadWebhooks();
  const filtered = webhooks.filter(w => w.id !== webhookId);
  
  if (typeof window !== 'undefined') {
    localStorage.setItem('webhooks', JSON.stringify(filtered));
  }
}

// Export for testing
export const __test__ = {
  connectIntegration,
  getConnectedIntegrations
};

