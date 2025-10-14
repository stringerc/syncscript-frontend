/**
 * Webhook System Component
 * 
 * Real-time data synchronization and event handling
 * Includes webhook management, event tracking, and delivery monitoring
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Webhook {
  id: string;
  name: string;
  url: string;
  description: string;
  events: string[];
  status: 'active' | 'inactive' | 'error';
  secret: string;
  retryPolicy: {
    maxRetries: number;
    backoffMultiplier: number;
    timeout: number;
  };
  createdAt: string;
  lastTriggered?: string;
  deliveryStats: {
    total: number;
    successful: number;
    failed: number;
    pending: number;
  };
}

interface WebhookEvent {
  id: string;
  webhookId: string;
  eventType: string;
  payload: any;
  timestamp: string;
  status: 'pending' | 'delivered' | 'failed' | 'retrying';
  attempts: number;
  response?: {
    statusCode: number;
    headers: Record<string, string>;
    body: string;
  };
  error?: string;
}

interface WebhookSystemProps {
  onClose: () => void;
}

const WebhookSystem: React.FC<WebhookSystemProps> = ({ onClose }) => {
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);
  const [webhookEvents, setWebhookEvents] = useState<WebhookEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'webhooks' | 'events' | 'logs' | 'settings'>('webhooks');
  const [selectedWebhook, setSelectedWebhook] = useState<Webhook | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    loadWebhookData();
  }, []);

  const loadWebhookData = async () => {
    setIsLoading(true);
    
    try {
      // Mock webhooks data
      const mockWebhooks: Webhook[] = [
        {
          id: 'webhook-1',
          name: 'Slack Notifications',
          url: 'https://example.com/webhook/slack',
          description: 'Send task updates to Slack channels',
          events: ['task_created', 'task_updated', 'task_completed'],
          status: 'active',
          secret: 'whsec_***',
          retryPolicy: {
            maxRetries: 3,
            backoffMultiplier: 2,
            timeout: 5000
          },
          createdAt: '2024-01-01T00:00:00Z',
          lastTriggered: new Date(Date.now() - 300000).toISOString(),
          deliveryStats: {
            total: 1247,
            successful: 1198,
            failed: 49,
            pending: 0
          }
        },
        {
          id: 'webhook-2',
          name: 'Analytics Pipeline',
          url: 'https://analytics.example.com/webhook/syncscript',
          description: 'Send data to analytics platform for processing',
          events: ['energy_logged', 'project_created', 'user_activity'],
          status: 'active',
          secret: 'whsec_***',
          retryPolicy: {
            maxRetries: 5,
            backoffMultiplier: 1.5,
            timeout: 10000
          },
          createdAt: '2024-01-05T00:00:00Z',
          lastTriggered: new Date(Date.now() - 600000).toISOString(),
          deliveryStats: {
            total: 3456,
            successful: 3421,
            failed: 35,
            pending: 0
          }
        },
        {
          id: 'webhook-3',
          name: 'Backup Service',
          url: 'https://backup.example.com/sync',
          description: 'Backup important data to external service',
          events: ['task_deleted', 'project_archived'],
          status: 'error',
          secret: 'whsec_***',
          retryPolicy: {
            maxRetries: 3,
            backoffMultiplier: 2,
            timeout: 5000
          },
          createdAt: '2024-01-10T00:00:00Z',
          lastTriggered: new Date(Date.now() - 86400000).toISOString(),
          deliveryStats: {
            total: 89,
            successful: 45,
            failed: 44,
            pending: 0
          }
        }
      ];

      // Mock webhook events
      const mockEvents: WebhookEvent[] = [
        {
          id: 'event-1',
          webhookId: 'webhook-1',
          eventType: 'task_created',
          payload: {
            taskId: 'task-123',
            title: 'New Task',
            userId: 'user-456',
            timestamp: new Date().toISOString()
          },
          timestamp: new Date(Date.now() - 300000).toISOString(),
          status: 'delivered',
          attempts: 1,
          response: {
            statusCode: 200,
            headers: { 'content-type': 'application/json' },
            body: '{"ok": true}'
          }
        },
        {
          id: 'event-2',
          webhookId: 'webhook-2',
          eventType: 'energy_logged',
          payload: {
            userId: 'user-456',
            energyLevel: 8,
            timestamp: new Date().toISOString()
          },
          timestamp: new Date(Date.now() - 600000).toISOString(),
          status: 'delivered',
          attempts: 1,
          response: {
            statusCode: 200,
            headers: { 'content-type': 'application/json' },
            body: '{"success": true}'
          }
        },
        {
          id: 'event-3',
          webhookId: 'webhook-3',
          eventType: 'task_deleted',
          payload: {
            taskId: 'task-789',
            userId: 'user-456',
            timestamp: new Date().toISOString()
          },
          timestamp: new Date(Date.now() - 900000).toISOString(),
          status: 'failed',
          attempts: 3,
          error: 'Connection timeout'
        }
      ];

      setWebhooks(mockWebhooks);
      setWebhookEvents(mockEvents);
    } catch (error) {
      console.error('Failed to load webhook data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createWebhook = async (webhook: Omit<Webhook, 'id' | 'createdAt' | 'deliveryStats'>) => {
    setIsCreating(true);
    
    try {
      const newWebhook: Webhook = {
        ...webhook,
        id: `webhook_${Date.now()}`,
        createdAt: new Date().toISOString(),
        deliveryStats: {
          total: 0,
          successful: 0,
          failed: 0,
          pending: 0
        }
      };
      
      setWebhooks(prev => [...prev, newWebhook]);
    } catch (error) {
      console.error('Failed to create webhook:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const updateWebhook = async (webhookId: string, updates: Partial<Webhook>) => {
    try {
      setWebhooks(prev => prev.map(webhook => 
        webhook.id === webhookId ? { ...webhook, ...updates } : webhook
      ));
    } catch (error) {
      console.error('Failed to update webhook:', error);
    }
  };

  const deleteWebhook = async (webhookId: string) => {
    try {
      setWebhooks(prev => prev.filter(webhook => webhook.id !== webhookId));
      setWebhookEvents(prev => prev.filter(event => event.webhookId !== webhookId));
    } catch (error) {
      console.error('Failed to delete webhook:', error);
    }
  };

  const testWebhook = async (webhookId: string) => {
    try {
      const webhook = webhooks.find(w => w.id === webhookId);
      if (!webhook) return;
      
      const testEvent: WebhookEvent = {
        id: `test_${Date.now()}`,
        webhookId,
        eventType: 'test_event',
        payload: {
          message: 'This is a test webhook',
          timestamp: new Date().toISOString()
        },
        timestamp: new Date().toISOString(),
        status: 'pending',
        attempts: 0
      };
      
      setWebhookEvents(prev => [testEvent, ...prev]);
      
      // Simulate webhook delivery
      setTimeout(() => {
        setWebhookEvents(prev => prev.map(event => 
          event.id === testEvent.id 
            ? { ...event, status: 'delivered', attempts: 1 }
            : event
        ));
      }, 2000);
      
    } catch (error) {
      console.error('Failed to test webhook:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      case 'error': return 'text-red-600 bg-red-100';
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'failed': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'retrying': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'task_created': return '📝';
      case 'task_updated': return '✏️';
      case 'task_completed': return '✅';
      case 'task_deleted': return '🗑️';
      case 'project_created': return '📁';
      case 'project_archived': return '📦';
      case 'energy_logged': return '⚡';
      case 'user_activity': return '👤';
      case 'test_event': return '🧪';
      default: return '📄';
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading webhook system...</span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Webhook System</h2>
              <p className="text-green-100 mt-1">Real-time data synchronization and event handling</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-green-200 text-sm">Webhooks:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {webhooks.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-200 text-sm">Active:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {webhooks.filter(w => w.status === 'active').length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-200 text-sm">Events:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {webhookEvents.length}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'webhooks', name: 'Webhooks', icon: '🔗' },
              { id: 'events', name: 'Events', icon: '📊' },
              { id: 'logs', name: 'Logs', icon: '📋' },
              { id: 'settings', name: 'Settings', icon: '⚙️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all ${
                  selectedTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {selectedTab === 'webhooks' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Webhooks</h3>
                <button
                  onClick={() => {
                    createWebhook({
                      name: 'New Webhook',
                      url: 'https://example.com/webhook',
                      description: 'New webhook endpoint',
                      events: ['task_created'],
                      status: 'inactive',
                      secret: 'whsec_new',
                      retryPolicy: {
                        maxRetries: 3,
                        backoffMultiplier: 2,
                        timeout: 5000
                      }
                    });
                  }}
                  disabled={isCreating}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {isCreating ? 'Creating...' : 'Create Webhook'}
                </button>
              </div>
              
              <div className="space-y-4">
                {webhooks.map((webhook) => (
                  <motion.div
                    key={webhook.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{webhook.name}</h4>
                        <p className="text-sm text-gray-600">{webhook.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{webhook.url}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(webhook.status)}`}>
                          {webhook.status.toUpperCase()}
                        </span>
                        <button
                          onClick={() => testWebhook(webhook.id)}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all"
                        >
                          Test
                        </button>
                        <button
                          onClick={() => deleteWebhook(webhook.id)}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 transition-all"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Events:</span>
                        <span className="ml-2 text-gray-900">{webhook.events.join(', ')}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Last Triggered:</span>
                        <span className="ml-2 text-gray-900">
                          {webhook.lastTriggered ? new Date(webhook.lastTriggered).toLocaleString() : 'Never'}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Success Rate:</span>
                        <span className="ml-2 text-gray-900">
                          {webhook.deliveryStats.total > 0 
                            ? Math.round((webhook.deliveryStats.successful / webhook.deliveryStats.total) * 100)
                            : 0}%
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Total Deliveries:</span>
                        <span className="ml-2 text-gray-900">{webhook.deliveryStats.total}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'events' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Webhook Events</h3>
              
              <div className="space-y-3">
                {webhookEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-xl">{getEventIcon(event.eventType)}</span>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          {event.eventType.replace('_', ' ').toUpperCase()}
                        </div>
                        <div className="text-sm text-gray-600">
                          {new Date(event.timestamp).toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(event.status)}`}>
                          {event.status.toUpperCase()}
                        </span>
                        {event.attempts > 0 && (
                          <span className="text-xs text-gray-500">
                            {event.attempts} attempt{event.attempts !== 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded mb-2">
                      <div className="font-medium mb-1">Payload:</div>
                      <pre className="text-xs overflow-x-auto">
                        {JSON.stringify(event.payload, null, 2)}
                      </pre>
                    </div>
                    
                    {event.response && (
                      <div className="text-sm text-gray-700 bg-green-50 p-3 rounded mb-2">
                        <div className="font-medium mb-1">Response:</div>
                        <div className="text-xs">
                          <div>Status: {event.response.statusCode}</div>
                          <div>Body: {event.response.body}</div>
                        </div>
                      </div>
                    )}
                    
                    {event.error && (
                      <div className="text-sm text-gray-700 bg-red-50 p-3 rounded">
                        <div className="font-medium mb-1">Error:</div>
                        <div className="text-xs">{event.error}</div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'logs' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Webhook Logs</h3>
              
              <div className="space-y-4">
                {webhooks.map((webhook) => (
                  <div key={webhook.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-xl">🔗</span>
                      <div>
                        <h4 className="font-medium text-gray-900">{webhook.name}</h4>
                        <p className="text-sm text-gray-600">{webhook.url}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Total Events:</span>
                        <span className="ml-2 text-gray-900">{webhook.deliveryStats.total}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Successful:</span>
                        <span className="ml-2 text-green-600">{webhook.deliveryStats.successful}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Failed:</span>
                        <span className="ml-2 text-red-600">{webhook.deliveryStats.failed}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Pending:</span>
                        <span className="ml-2 text-yellow-600">{webhook.deliveryStats.pending}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Webhook Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">Global Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Enable Webhooks</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Retry Failed Deliveries</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Default Timeout</label>
                      <input
                        type="number"
                        defaultValue="5000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-4">Security Settings</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Require HTTPS</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Validate Signatures</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Rate Limit</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                        <option value="100">100 requests/hour</option>
                        <option value="500">500 requests/hour</option>
                        <option value="1000">1000 requests/hour</option>
                        <option value="unlimited">Unlimited</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Webhook System • {webhooks.filter(w => w.status === 'active').length} active • {webhookEvents.length} events
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                console.log('Exporting webhook data...');
              }}
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all"
            >
              Export Data
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WebhookSystem;
