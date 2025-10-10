import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/ShortcutsPanel.css';

interface Shortcut {
  key: string;
  action: string;
  category: string;
}

interface ShortcutsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShortcutsPanel: React.FC<ShortcutsPanelProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');

  const shortcuts: Shortcut[] = [
    // Navigation
    { key: 'Cmd+K', action: 'Open Command Palette', category: 'Navigation' },
    { key: 'Cmd+Shift+A', action: 'Quick Capture', category: 'Navigation' },
    { key: '?', action: 'Show Keyboard Shortcuts', category: 'Navigation' },
    { key: 'Esc', action: 'Close Modal', category: 'Navigation' },
    
    // Actions
    { key: 'C', action: 'Create New Task', category: 'Actions' },
    { key: 'E', action: 'Log Energy', category: 'Actions' },
    { key: 'F', action: 'Start Focus Mode', category: 'Actions' },
    { key: 'V', action: 'Voice-to-Task', category: 'Actions' },
    { key: 'Cmd+Enter', action: 'Submit Form', category: 'Actions' },
    
    // Views
    { key: '1', action: 'List View', category: 'Views' },
    { key: '2', action: 'Kanban View', category: 'Views' },
    { key: '3', action: 'Calendar View', category: 'Views' },
    { key: '4', action: 'Analytics View', category: 'Views' },
    { key: '5', action: 'Eisenhower Matrix', category: 'Views' },
    
    // Task Management
    { key: 'Enter', action: 'Edit Task', category: 'Task Management' },
    { key: 'Space', action: 'Toggle Complete', category: 'Task Management' },
    { key: 'Del / Backspace', action: 'Delete Task', category: 'Task Management' },
    { key: 'P', action: 'Change Priority', category: 'Task Management' },
    
    // Search & Filter
    { key: 'Cmd+F', action: 'Advanced Search', category: 'Search' },
    { key: '/', action: 'Quick Search', category: 'Search' },
    { key: 'Cmd+Shift+F', action: 'Filter by Project', category: 'Search' },
    
    // Settings
    { key: 'T', action: 'Toggle Theme', category: 'Settings' },
    { key: ',', action: 'Open Settings', category: 'Settings' }
  ];

  const filteredShortcuts = shortcuts.filter(s =>
    search === '' ||
    s.action.toLowerCase().includes(search.toLowerCase()) ||
    s.key.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  );

  const groupedShortcuts = filteredShortcuts.reduce((acc, shortcut) => {
    if (!acc[shortcut.category]) {
      acc[shortcut.category] = [];
    }
    acc[shortcut.category].push(shortcut);
    return acc;
  }, {} as Record<string, Shortcut[]>);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="shortcuts-overlay" onClick={onClose}>
          <motion.div
            className="shortcuts-modal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="shortcuts-header">
              <h2>⌨️ Keyboard Shortcuts</h2>
              <p>Master SyncScript with these shortcuts</p>
              <button className="close-btn" onClick={onClose}>×</button>
            </div>

            <div className="shortcuts-content">
              <div className="shortcuts-search">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search shortcuts..."
                  className="search-input"
                  autoFocus
                />
              </div>

              <div className="shortcuts-list">
                {Object.entries(groupedShortcuts).map(([category, items]) => (
                  <div key={category} className="shortcut-group">
                    <h3 className="category-title">{category}</h3>
                    {items.map((shortcut, idx) => (
                      <div key={idx} className="shortcut-item">
                        <span className="shortcut-action">{shortcut.action}</span>
                        <kbd className="shortcut-key">{shortcut.key}</kbd>
                      </div>
                    ))}
                  </div>
                ))}

                {Object.keys(groupedShortcuts).length === 0 && (
                  <div className="no-results">
                    <span className="no-results-icon">🔍</span>
                    <p>No shortcuts found</p>
                  </div>
                )}
              </div>
            </div>

            <div className="shortcuts-footer">
              <p>💡 Tip: Press <kbd>?</kbd> anytime to open this panel</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ShortcutsPanel;
