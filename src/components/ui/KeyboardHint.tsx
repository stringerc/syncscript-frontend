import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KeyboardHint: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hint Trigger Button */}
      <motion.button
        className="keyboard-hint-trigger"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Keyboard Shortcuts"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h8M6 16h12"/>
        </svg>
      </motion.button>

      {/* Shortcuts Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="keyboard-shortcuts-panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="shortcuts-header">
              <h3 className="shortcuts-title">⌨️ Keyboard Shortcuts</h3>
              <button
                className="shortcuts-close"
                onClick={() => setIsOpen(false)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <div className="shortcuts-list">
              <div className="shortcut-group">
                <h4 className="shortcut-group-title">Actions</h4>
                <div className="shortcut-item">
                  <kbd className="shortcut-key">N</kbd>
                  <span className="shortcut-desc">Create new task</span>
                </div>
                <div className="shortcut-item">
                  <kbd className="shortcut-key">P</kbd>
                  <span className="shortcut-desc">Create new project</span>
                </div>
              </div>

              <div className="shortcut-group">
                <h4 className="shortcut-group-title">Navigation</h4>
                <div className="shortcut-item">
                  <kbd className="shortcut-key">/</kbd>
                  <span className="shortcut-desc">Focus search bar</span>
                </div>
                <div className="shortcut-item">
                  <kbd className="shortcut-key">ESC</kbd>
                  <span className="shortcut-desc">Close modals</span>
                </div>
              </div>

              <div className="shortcut-group">
                <h4 className="shortcut-group-title">Energy</h4>
                <div className="shortcut-item">
                  <kbd className="shortcut-key">1-5</kbd>
                  <span className="shortcut-desc">Quick energy selection</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default KeyboardHint;

