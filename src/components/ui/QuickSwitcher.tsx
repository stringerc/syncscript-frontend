import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  keywords: string[];
  action: () => void;
}

interface QuickSwitcherProps {
  isOpen: boolean;
  onClose: () => void;
  actions: QuickAction[];
}

const QuickSwitcher: React.FC<QuickSwitcherProps> = ({ isOpen, onClose, actions }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter actions based on query
  const filteredActions = query.trim()
    ? actions.filter(action => {
        const searchTerm = query.toLowerCase();
        return (
          action.title.toLowerCase().includes(searchTerm) ||
          action.description.toLowerCase().includes(searchTerm) ||
          action.keywords.some(kw => kw.toLowerCase().includes(searchTerm)) ||
          action.category.toLowerCase().includes(searchTerm)
        );
      })
    : actions.slice(0, 8); // Show top 8 when no query

  // Reset selection when filtered results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, filteredActions.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredActions[selectedIndex]) {
          filteredActions[selectedIndex].action();
          onClose();
          setQuery('');
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        setQuery('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredActions, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="quick-switcher-overlay" onClick={onClose}>
        <motion.div
          className="quick-switcher-modal"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input */}
          <div className="quick-switcher-search">
            <span className="search-icon">🔍</span>
            <input
              ref={inputRef}
              type="text"
              placeholder="Type to search features, tasks, or actions..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="quick-switcher-input"
            />
            <kbd className="keyboard-hint">ESC</kbd>
          </div>

          {/* Results */}
          <div className="quick-switcher-results">
            {filteredActions.length === 0 ? (
              <div className="no-results">
                <span className="no-results-icon">🔍</span>
                <p>No matching features found</p>
                <small>Try searching for &quot;task&quot;, &quot;ai&quot;, or &quot;team&quot;</small>
              </div>
            ) : (
              filteredActions.map((action, index) => (
                <motion.div
                  key={action.id}
                  className={`quick-switcher-item ${index === selectedIndex ? 'selected' : ''}`}
                  onClick={() => {
                    action.action();
                    onClose();
                    setQuery('');
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  whileHover={{ backgroundColor: 'rgba(74, 144, 226, 0.05)' }}
                >
                  <div className="item-icon">{action.icon}</div>
                  <div className="item-content">
                    <div className="item-title">{action.title}</div>
                    <div className="item-description">{action.description}</div>
                  </div>
                  <div className="item-category">{action.category}</div>
                  {index === selectedIndex && (
                    <kbd className="enter-hint">⏎</kbd>
                  )}
                </motion.div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="quick-switcher-footer">
            <div className="footer-hints">
              <span><kbd>↑</kbd> <kbd>↓</kbd> Navigate</span>
              <span><kbd>⏎</kbd> Select</span>
              <span><kbd>ESC</kbd> Close</span>
            </div>
            <div className="footer-info">
              {filteredActions.length} of {actions.length} features
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default QuickSwitcher;
