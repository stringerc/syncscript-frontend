import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface Feature {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  onClick: () => void;
  isNew?: boolean;
  isPro?: boolean;
}

interface UnifiedCommandCenterProps {
  isOpen: boolean;
  onClose: () => void;
  onFeatureSelect: (featureId: string) => void;
}

const UnifiedCommandCenter: React.FC<UnifiedCommandCenterProps> = ({ 
  isOpen, 
  onClose, 
  onFeatureSelect 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('feature_favorites');
      return saved ? JSON.parse(saved) : ['kanban', 'analytics', 'ai-coach'];
    }
    return ['kanban', 'analytics', 'ai-coach'];
  });

  const features: Feature[] = [
    // ANALYTICS & REPORTS
    { id: 'analytics', name: 'Advanced Analytics', description: 'Deep insights into your productivity', icon: '📊', category: 'analytics', onClick: () => onFeatureSelect('analytics') },
    { id: 'reporting', name: 'Custom Reports', description: 'Build custom productivity reports', icon: '📈', category: 'analytics', onClick: () => onFeatureSelect('reporting') },
    { id: 'export', name: 'Data Export', description: 'Export all your data (CSV/JSON)', icon: '💾', category: 'analytics', onClick: () => onFeatureSelect('export') },
    { id: 'energy-insights', name: 'Energy Insights', description: 'AI-powered energy analysis', icon: '⚡', category: 'analytics', onClick: () => onFeatureSelect('energy-insights') },
    
    // TASK VIEWS
    { id: 'kanban', name: 'Kanban Board', description: 'Drag-and-drop task board', icon: '📋', category: 'views', onClick: () => onFeatureSelect('kanban') },
    { id: 'gantt', name: 'Gantt Chart', description: 'Project timeline visualization', icon: '📊', category: 'views', onClick: () => onFeatureSelect('gantt') },
    { id: 'mind-map', name: 'Mind Map', description: 'Visual task relationships', icon: '🧠', category: 'views', onClick: () => onFeatureSelect('mind-map') },
    { id: 'matrix', name: 'Eisenhower Matrix', description: 'Urgency vs Importance grid', icon: '🎯', category: 'views', onClick: () => onFeatureSelect('matrix') },
    { id: 'calendar-view', name: 'Calendar View', description: 'See tasks on calendar', icon: '📅', category: 'views', onClick: () => onFeatureSelect('calendar-view') },
    { id: 'timeline', name: 'Timeline View', description: 'Chronological task view', icon: '⏱️', category: 'views', onClick: () => onFeatureSelect('timeline') },
    
    // AI-POWERED
    { id: 'ai-coach', name: 'AI Coach', description: 'Personal productivity coach', icon: '🤖', category: 'ai', onClick: () => onFeatureSelect('ai-coach'), isNew: true },
    { id: 'ai-task-gen', name: 'AI Task Creator', description: 'Natural language to tasks', icon: '✨', category: 'ai', onClick: () => onFeatureSelect('ai-task-gen') },
    { id: 'ai-breakdown', name: 'Task Breakdown', description: 'Break complex tasks into steps', icon: '🔨', category: 'ai', onClick: () => onFeatureSelect('ai-breakdown') },
    { id: 'workload-balancer', name: 'Workload Balancer', description: 'AI-driven task delegation', icon: '⚖️', category: 'ai', onClick: () => onFeatureSelect('workload-balancer') },
    { id: 'smart-suggestions', name: 'Smart Suggestions', description: 'AI task recommendations', icon: '💡', category: 'ai', onClick: () => onFeatureSelect('smart-suggestions') },
    { id: 'daily-planning', name: 'Daily Planning', description: 'AI-generated daily plan', icon: '🌅', category: 'ai', onClick: () => onFeatureSelect('daily-planning') },
    
    // FOCUS & TIME
    { id: 'focus-mode', name: 'Focus Mode', description: 'Pomodoro timer & tracking', icon: '🎯', category: 'focus', onClick: () => onFeatureSelect('focus-mode') },
    { id: 'pomodoro-plus', name: 'Pomodoro++', description: 'Advanced focus timer', icon: '🍅', category: 'focus', onClick: () => onFeatureSelect('pomodoro-plus') },
    { id: 'time-blocking', name: 'Time Blocking', description: 'Visual time scheduling', icon: '📅', category: 'focus', onClick: () => onFeatureSelect('time-blocking') },
    { id: 'time-tracking', name: 'Time Tracker', description: 'Track actual time spent', icon: '⏱️', category: 'focus', onClick: () => onFeatureSelect('time-tracking') },
    { id: 'focus-rooms', name: 'Focus Rooms', description: 'Virtual coworking spaces', icon: '🎵', category: 'focus', onClick: () => onFeatureSelect('focus-rooms') },
    
    // LEARNING & GROWTH
    { id: 'goals', name: 'Goal Tracker', description: 'Set and track personal goals', icon: '🎯', category: 'growth', onClick: () => onFeatureSelect('goals') },
    { id: 'habits', name: 'Habit Tracker', description: 'Build lasting habits', icon: '✅', category: 'growth', onClick: () => onFeatureSelect('habits') },
    { id: 'weekly-review', name: 'Weekly Review', description: 'Structured weekly reflection', icon: '📝', category: 'growth', onClick: () => onFeatureSelect('weekly-review') },
    { id: 'learning', name: 'Learning Center', description: 'Productivity courses', icon: '🎓', category: 'growth', onClick: () => onFeatureSelect('learning') },
    { id: 'achievements', name: 'Achievements', description: 'Unlock badges & rewards', icon: '🏆', category: 'growth', onClick: () => onFeatureSelect('achievements') },
    
    // TEAM & COLLABORATION
    { id: 'team-dashboard', name: 'Team Dashboard', description: 'Team productivity overview', icon: '👥', category: 'team', onClick: () => onFeatureSelect('team-dashboard') },
    { id: 'team-chat', name: 'Team Chat', description: 'Real-time messaging', icon: '💬', category: 'team', onClick: () => onFeatureSelect('team-chat') },
    { id: 'client-portal', name: 'Client Portal', description: 'Share with clients', icon: '👔', category: 'team', onClick: () => onFeatureSelect('client-portal') },
    { id: 'task-sharing', name: 'Task Sharing', description: 'Share tasks via link', icon: '🔗', category: 'team', onClick: () => onFeatureSelect('task-sharing') },
    { id: 'meeting-notes', name: 'Meeting Notes', description: 'AI meeting transcription', icon: '📝', category: 'team', onClick: () => onFeatureSelect('meeting-notes') },
    
    // SETTINGS & TOOLS
    { id: 'integrations', name: 'Integration Hub', description: 'Connect third-party apps', icon: '🔌', category: 'settings', onClick: () => onFeatureSelect('integrations') },
    { id: 'api-docs', name: 'API Documentation', description: 'Developer API docs', icon: '📚', category: 'settings', onClick: () => onFeatureSelect('api-docs'), isNew: true },
    { id: 'webhooks', name: 'Webhooks', description: 'Custom event webhooks', icon: '🔗', category: 'settings', onClick: () => onFeatureSelect('webhooks'), isNew: true },
    { id: 'automations', name: 'Automations', description: 'If-then rules', icon: '🤖', category: 'settings', onClick: () => onFeatureSelect('automations') },
    { id: 'themes', name: 'Theme Settings', description: 'Customize appearance', icon: '🎨', category: 'settings', onClick: () => onFeatureSelect('themes') },
    { id: 'white-label', name: 'White Label', description: 'Custom branding', icon: '🏢', category: 'settings', onClick: () => onFeatureSelect('white-label'), isPro: true },
    { id: 'budget', name: 'Budget Tracker', description: 'Project budget management', icon: '💰', category: 'settings', onClick: () => onFeatureSelect('budget') },
    
    // APPS & EXTENSIONS
    { id: 'mobile-app', name: 'Mobile Apps', description: 'iOS & Android apps', icon: '📱', category: 'apps', onClick: () => onFeatureSelect('mobile-app') },
    { id: 'desktop-app', name: 'Desktop Apps', description: 'Mac, Windows, Linux', icon: '💻', category: 'apps', onClick: () => onFeatureSelect('desktop-app') },
    { id: 'browser-extension', name: 'Browser Extension', description: 'Chrome, Firefox, Safari', icon: '🔖', category: 'apps', onClick: () => onFeatureSelect('browser-extension') },
    { id: 'voice-commands', name: 'Voice Commands', description: 'Voice-controlled actions', icon: '🎤', category: 'apps', onClick: () => onFeatureSelect('voice-commands') },
  ];

  const categories = [
    { id: 'all', name: 'All Features', icon: '✨', count: features.length },
    { id: 'analytics', name: 'Analytics & Reports', icon: '📊', count: features.filter(f => f.category === 'analytics').length },
    { id: 'views', name: 'Task Views', icon: '👁️', count: features.filter(f => f.category === 'views').length },
    { id: 'ai', name: 'AI-Powered', icon: '🤖', count: features.filter(f => f.category === 'ai').length },
    { id: 'focus', name: 'Focus & Time', icon: '⚡', count: features.filter(f => f.category === 'focus').length },
    { id: 'growth', name: 'Learning & Growth', icon: '🎓', count: features.filter(f => f.category === 'growth').length },
    { id: 'team', name: 'Team & Collaboration', icon: '👥', count: features.filter(f => f.category === 'team').length },
    { id: 'settings', name: 'Settings & Tools', icon: '⚙️', count: features.filter(f => f.category === 'settings').length },
    { id: 'apps', name: 'Apps & Extensions', icon: '📱', count: features.filter(f => f.category === 'apps').length },
  ];

  const filteredFeatures = useMemo(() => {
    let filtered = features;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(f => f.category === selectedCategory);
    }
    
    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(f => 
        f.name.toLowerCase().includes(query) ||
        f.description.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [features, selectedCategory, searchQuery]);

  const favoriteFeatures = features.filter(f => favorites.includes(f.id));

  const toggleFavorite = (featureId: string) => {
    const newFavorites = favorites.includes(featureId)
      ? favorites.filter(id => id !== featureId)
      : [...favorites, featureId];
    
    setFavorites(newFavorites);
    localStorage.setItem('feature_favorites', JSON.stringify(newFavorites));
    toast.success(favorites.includes(featureId) ? 'Removed from favorites' : '⭐ Added to favorites!');
  };

  const handleFeatureClick = (feature: Feature) => {
    feature.onClick();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="command-center-overlay" onClick={onClose}>
      <motion.div
        className="command-center-modal"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="command-center-header">
          <div>
            <h2 className="command-center-title">
              ✨ Feature Command Center
            </h2>
            <p className="command-center-subtitle">
              All {features.length} features at your fingertips
            </p>
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {/* Search Bar */}
        <div className="command-center-search">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search features... (try 'ai', 'team', 'analytics')"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
            className="search-input"
          />
          {searchQuery && (
            <button 
              className="clear-search"
              onClick={() => setSearchQuery('')}
            >
              ×
            </button>
          )}
        </div>

        {/* Categories */}
        <div className="command-center-categories">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span className="category-icon">{cat.icon}</span>
              <span className="category-name">{cat.name}</span>
              <span className="category-count">{cat.count}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="command-center-content">
          {/* Favorites Section */}
          {selectedCategory === 'all' && !searchQuery && favoriteFeatures.length > 0 && (
            <div className="favorites-section">
              <h3 className="section-title">⭐ Your Favorites</h3>
              <div className="features-grid favorites-grid">
                {favoriteFeatures.map(feature => (
                  <motion.div
                    key={feature.id}
                    className="feature-card favorite"
                    onClick={() => handleFeatureClick(feature)}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button
                      className="favorite-btn active"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(feature.id);
                      }}
                    >
                      ⭐
                    </button>
                    <div className="feature-icon">{feature.icon}</div>
                    <h4 className="feature-name">{feature.name}</h4>
                    <p className="feature-desc">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* All Features */}
          <div className="all-features-section">
            {selectedCategory !== 'all' && (
              <h3 className="section-title">
                {categories.find(c => c.id === selectedCategory)?.icon}{' '}
                {categories.find(c => c.id === selectedCategory)?.name}
              </h3>
            )}
            
            {filteredFeatures.length === 0 ? (
              <div className="no-results">
                <span className="no-results-icon">🔍</span>
                <p>No features found</p>
                <button 
                  className="btn btn-ghost"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="features-grid">
                {filteredFeatures.map(feature => (
                  <motion.div
                    key={feature.id}
                    className={`feature-card ${favorites.includes(feature.id) ? 'is-favorite' : ''}`}
                    onClick={() => handleFeatureClick(feature)}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    layout
                  >
                    <button
                      className={`favorite-btn ${favorites.includes(feature.id) ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(feature.id);
                      }}
                    >
                      {favorites.includes(feature.id) ? '⭐' : '☆'}
                    </button>
                    
                    {feature.isNew && (
                      <span className="feature-badge new">NEW</span>
                    )}
                    {feature.isPro && (
                      <span className="feature-badge pro">PRO</span>
                    )}
                    
                    <div className="feature-icon">{feature.icon}</div>
                    <h4 className="feature-name">{feature.name}</h4>
                    <p className="feature-desc">{feature.description}</p>
                    
                    <div className="feature-footer">
                      <span className="category-tag">
                        {categories.find(c => c.id === feature.category)?.name}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="command-center-footer">
          <div className="footer-hint">
            💡 <strong>Tip:</strong> Press <kbd>Cmd+K</kbd> anytime to search features
          </div>
          <div className="footer-stats">
            Showing {filteredFeatures.length} of {features.length} features
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UnifiedCommandCenter;
