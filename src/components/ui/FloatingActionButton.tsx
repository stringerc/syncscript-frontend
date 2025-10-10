import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FloatingActionButtonProps {
  onQuickTask: () => void;
  onLogEnergy: () => void;
  onStartFocus: () => void;
  onViewAnalytics: () => void;
  onSearch: () => void;
  onOpenFeatures: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onQuickTask,
  onLogEnergy,
  onStartFocus,
  onViewAnalytics,
  onSearch,
  onOpenFeatures
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const actions = [
    { id: 'task', label: 'Quick Task', icon: '➕', color: '#4A90E2', onClick: onQuickTask },
    { id: 'energy', label: 'Log Energy', icon: '⚡', color: '#F59E0B', onClick: onLogEnergy },
    { id: 'focus', label: 'Start Focus', icon: '🎯', color: '#8B5CF6', onClick: onStartFocus },
    { id: 'analytics', label: 'Analytics', icon: '📊', color: '#10B981', onClick: onViewAnalytics },
    { id: 'search', label: 'Search', icon: '🔍', color: '#EC4899', onClick: onSearch },
    { id: 'features', label: 'All Features', icon: '✨', color: '#F59E0B', onClick: onOpenFeatures },
  ];

  const handleActionClick = (action: typeof actions[0]) => {
    action.onClick();
    setIsExpanded(false);
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fab-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>

      {/* FAB Container */}
      <div className="fab-container">
        {/* Action Buttons */}
        <AnimatePresence>
          {isExpanded && (
            <div className="fab-actions">
              {actions.map((action, index) => (
                <motion.button
                  key={action.id}
                  className="fab-action"
                  style={{ backgroundColor: action.color }}
                  initial={{ scale: 0, y: 0 }}
                  animate={{ 
                    scale: 1, 
                    y: -(index + 1) * 64,
                    transition: {
                      delay: index * 0.05,
                      type: 'spring',
                      stiffness: 400,
                      damping: 25
                    }
                  }}
                  exit={{ 
                    scale: 0, 
                    y: 0,
                    transition: {
                      delay: (actions.length - index - 1) * 0.03
                    }
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleActionClick(action)}
                >
                  <span className="fab-action-icon">{action.icon}</span>
                  <span className="fab-action-label">{action.label}</span>
                </motion.button>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Main FAB Button */}
        <motion.button
          className={`fab-main ${isExpanded ? 'expanded' : ''}`}
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ rotate: isExpanded ? 45 : 0 }}
        >
          <span className="fab-main-icon">✨</span>
        </motion.button>
      </div>
    </>
  );
};

export default FloatingActionButton;
