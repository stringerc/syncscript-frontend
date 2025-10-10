import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface Webhook {
  id: string;
  name: string;
  url: string;
  events: string[];
  secret: string;
  enabled: boolean;
  created_at: string;
}

interface WebhooksManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

const WebhooksManager: React.FC<WebhooksManagerProps> = ({ isOpen, onClose }) => {
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newWebhook, setNewWebhook] = useState({
    name: '',
    url: '',
    events: [] as string[]
  });

  const availableEvents = [
    'task.created',
    'task.updated',
    'task.completed',
    'task.deleted',
    'energy.logged',
    'project.created',
    'team.member_added'
  ];

  const handleAddWebhook = () => {
    if (!newWebhook.name || !newWebhook.url || newWebhook.events.length === 0) {
      toast.error('Please fill all fields');
      return;
    }

    const webhook: Webhook = {
      id: Date.now().toString(),
      ...newWebhook,
      secret: Math.random().toString(36).substr(2, 32),
      enabled: true,
      created_at: new Date().toISOString()
    };

    setWebhooks([...webhooks, webhook]);
    setNewWebhook({ name: '', url: '', events: [] });
    setShowAddForm(false);
    toast.success('🔗 Webhook created!');
  };

  const toggleEvent = (event: string) => {
    setNewWebhook(prev => ({
      ...prev,
      events: prev.events.includes(event)
        ? prev.events.filter(e => e !== event)
        : [...prev.events, event]
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="webhooks-overlay" onClick={onClose}>
          <motion.div
            className="webhooks-modal"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="webhooks-header">
              <div>
                <h2>🔗 Webhooks</h2>
                <p>Connect SyncScript to external services</p>
              </div>
              <button className="close-btn" onClick={onClose}>×</button>
            </div>

            <div className="webhooks-content">
              <div className="webhooks-list">
                {webhooks.map(webhook => (
                  <div key={webhook.id} className="webhook-card">
                    <div className="webhook-header">
                      <h3>{webhook.name}</h3>
                      <label className="webhook-toggle">
                        <input
                          type="checkbox"
                          checked={webhook.enabled}
                          onChange={() => {
                            setWebhooks(webhooks.map(w =>
                              w.id === webhook.id ? { ...w, enabled: !w.enabled } : w
                            ));
                          }}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>

                    <div className="webhook-url">
                      <code>{webhook.url}</code>
                    </div>

                    <div className="webhook-events">
                      {webhook.events.map(event => (
                        <span key={event} className="event-badge">{event}</span>
                      ))}
                    </div>

                    <div className="webhook-secret">
                      <label>Secret:</label>
                      <code>{webhook.secret}</code>
                      <button
                        className="copy-secret-btn"
                        onClick={() => {
                          navigator.clipboard.writeText(webhook.secret);
                          toast.success('🔑 Secret copied!');
                        }}
                      >
                        📋
                      </button>
                    </div>
                  </div>
                ))}

                {webhooks.length === 0 && !showAddForm && (
                  <div className="empty-webhooks">
                    <span className="empty-icon">🔗</span>
                    <p>No webhooks configured</p>
                  </div>
                )}
              </div>

              {showAddForm ? (
                <motion.div
                  className="add-webhook-form"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                >
                  <div className="form-field">
                    <label>Webhook Name</label>
                    <input
                      type="text"
                      value={newWebhook.name}
                      onChange={(e) => setNewWebhook({ ...newWebhook, name: e.target.value })}
                      placeholder="e.g., My App Webhook"
                    />
                  </div>

                  <div className="form-field">
                    <label>Endpoint URL</label>
                    <input
                      type="url"
                      value={newWebhook.url}
                      onChange={(e) => setNewWebhook({ ...newWebhook, url: e.target.value })}
                      placeholder="https://your-app.com/webhook"
                    />
                  </div>

                  <div className="form-field">
                    <label>Events to Subscribe</label>
                    <div className="events-grid">
                      {availableEvents.map(event => (
                        <label key={event} className="event-checkbox">
                          <input
                            type="checkbox"
                            checked={newWebhook.events.includes(event)}
                            onChange={() => toggleEvent(event)}
                          />
                          <span>{event}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="form-actions">
                    <button className="btn btn-ghost" onClick={() => setShowAddForm(false)}>
                      Cancel
                    </button>
                    <button className="btn btn-primary" onClick={handleAddWebhook}>
                      🔗 Create Webhook
                    </button>
                  </div>
                </motion.div>
              ) : (
                <button className="add-webhook-btn" onClick={() => setShowAddForm(true)}>
                  ➕ Add Webhook
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WebhooksManager;
