import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import '../../styles/QuickCapture.css';

interface QuickCaptureProps {
  onCreateTask: (task: { title: string; description?: string }) => void;
}

const QuickCapture: React.FC<QuickCaptureProps> = ({ onCreateTask }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [captureMode, setCaptureMode] = useState<'text' | 'voice'>('text');

  const handleQuickCreate = () => {
    if (!title.trim()) {
      toast.error('Please enter a task');
      return;
    }

    onCreateTask({ title });
    setTitle('');
    setIsOpen(false);
    toast.success('✅ Task created!');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleQuickCreate();
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        className="quick-capture-fab"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Quick Capture (Cmd+Shift+A)"
      >
        <span className="fab-icon">⚡</span>
      </motion.button>

      {/* Quick Capture Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            <div className="quick-capture-overlay" onClick={() => setIsOpen(false)} />
            <motion.div
              className="quick-capture-modal"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="quick-capture-header">
                <h3>⚡ Quick Capture</h3>
                <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
              </div>

              <div className="quick-capture-content">
                <div className="capture-mode-toggle">
                  <button
                    className={`mode-btn ${captureMode === 'text' ? 'active' : ''}`}
                    onClick={() => setCaptureMode('text')}
                  >
                    ✍️ Text
                  </button>
                  <button
                    className={`mode-btn ${captureMode === 'voice' ? 'active' : ''}`}
                    onClick={() => setCaptureMode('voice')}
                  >
                    🎤 Voice
                  </button>
                </div>

                {captureMode === 'text' && (
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="What needs to be done?"
                    className="quick-input"
                    autoFocus
                  />
                )}

                <div className="quick-actions">
                  <button className="btn btn-ghost" onClick={() => setIsOpen(false)}>
                    Cancel
                  </button>
                  <button className="btn btn-primary" onClick={handleQuickCreate}>
                    <span>⚡</span>
                    <span>Create</span>
                  </button>
                </div>

                <div className="quick-hint">
                  Press <kbd>Cmd+Enter</kbd> to create • <kbd>Esc</kbd> to close
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default QuickCapture;
