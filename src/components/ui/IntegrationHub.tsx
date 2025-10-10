import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import '../../styles/IntegrationHub.css';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  isConnected: boolean;
  config?: any;
}

interface IntegrationHubProps {
  isOpen: boolean;
  onClose: () => void;
}

const IntegrationHub: React.FC<IntegrationHubProps> = ({ isOpen, onClose }) => {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'slack',
      name: 'Slack',
      description: 'Send tasks and notifications to Slack channels',
      icon: '💬',
      category: 'communication',
      isConnected: false
    },
    {
      id: 'github',
      name: 'GitHub',
      description: 'Create tasks from GitHub issues and PRs',
      icon: '🐙',
      category: 'development',
      isConnected: false
    },
    {
      id: 'gmail',
      name: 'Gmail',
      description: 'Turn emails into tasks automatically',
      icon: '📧',
      category: 'communication',
      isConnected: false
    },
    {
      id: 'zapier',
      name: 'Zapier',
      description: 'Connect to 3000+ apps via Zapier',
      icon: '⚡',
      category: 'automation',
      isConnected: false
    },
    {
      id: 'notion',
      name: 'Notion',
      description: 'Sync tasks with Notion databases',
      icon: '📓',
      category: 'productivity',
      isConnected: false
    },
    {
      id: 'trello',
      name: 'Trello',
      description: 'Import Trello boards as projects',
      icon: '📋',
      category: 'productivity',
      isConnected: false
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'communication', 'development', 'productivity', 'automation'];

  const filteredIntegrations = selectedCategory === 'all'
    ? integrations
    : integrations.filter(i => i.category === selectedCategory);

  const handleConnect = (integrationId: string) => {
    // In production, trigger OAuth flow
    toast.info(`🔌 Connecting to ${integrations.find(i => i.id === integrationId)?.name}...`);
    
    setIntegrations(integrations.map(i =>
      i.id === integrationId ? { ...i, isConnected: !i.isConnected } : i
    ));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="integration-hub-overlay" onClick={onClose}>
          <motion.div
            className="integration-hub-modal"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="integration-hub-header">
              <div>
                <h2>🔌 Integration Hub</h2>
                <p>Connect SyncScript to your favorite tools</p>
              </div>
              <button className="close-btn" onClick={onClose}>×</button>
            </div>

            <div className="integration-hub-content">
              <div className="category-filter">
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`cat-btn ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>

              <div className="integrations-grid">
                {filteredIntegrations.map(integration => (
                  <div key={integration.id} className="integration-card">
                    <div className="integration-icon">{integration.icon}</div>
                    <h3 className="integration-name">{integration.name}</h3>
                    <p className="integration-description">{integration.description}</p>
                    <button
                      className={`connect-btn ${integration.isConnected ? 'connected' : ''}`}
                      onClick={() => handleConnect(integration.id)}
                    >
                      {integration.isConnected ? '✓ Connected' : '🔌 Connect'}
                    </button>
                  </div>
                ))}
              </div>

              <div className="api-section">
                <h4>🔧 Developer API</h4>
                <p>Build custom integrations with our API</p>
                <button className="btn btn-outline">
                  📚 View API Docs
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default IntegrationHub;
