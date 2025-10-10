import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { parseNaturalLanguageToTask, AITaskSuggestion } from '../../utils/aiHelper';

interface AIQuickCreateProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (task: AITaskSuggestion) => void;
}

const AIQuickCreate: React.FC<AIQuickCreateProps> = ({ isOpen, onClose, onCreateTask }) => {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [parsedTask, setParsedTask] = useState<AITaskSuggestion | null>(null);

  const handleParse = async () => {
    if (!input.trim()) {
      toast.error('Please enter a task description');
      return;
    }

    setIsProcessing(true);

    try {
      const task = await parseNaturalLanguageToTask(input);
      setParsedTask(task);
      toast.success('Task parsed by AI!');
    } catch (error) {
      console.error('Error parsing task:', error);
      toast.error('Failed to parse task. Try being more specific!');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCreate = () => {
    if (!parsedTask) return;
    
    onCreateTask(parsedTask);
    toast.success('Task created!');
    setInput('');
    setParsedTask(null);
    onClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleParse();
    }
  };

  const examples = [
    "Call Sarah tomorrow at 2pm about Q4 planning",
    "Write blog post about productivity by Friday",
    "Review code PRs this afternoon",
    "Buy groceries after work",
    "Prepare presentation for Monday meeting"
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="ai-modal-overlay" onClick={onClose}>
          <motion.div
            className="ai-modal"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="ai-modal-header">
              <div className="ai-header-content">
                <span className="ai-icon">🤖</span>
                <div>
                  <h2 className="ai-title">AI Task Creator</h2>
                  <p className="ai-subtitle">Describe your task in plain English</p>
                </div>
              </div>
              <button className="ai-close-btn" onClick={onClose}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Input Section */}
            <div className="ai-modal-content">
              <div className="ai-input-section">
                <label className="ai-label">What do you need to do?</label>
                <textarea
                  className="ai-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="E.g., 'Schedule dentist appointment next Tuesday at 3pm' or 'Finish project proposal by end of week'"
                  rows={4}
                  disabled={isProcessing}
                />
                <p className="ai-hint">💡 Press Cmd+Enter (Mac) or Ctrl+Enter (Windows) to parse</p>
              </div>

              {/* Examples */}
              {!parsedTask && (
                <div className="ai-examples">
                  <h4>Try these examples:</h4>
                  <div className="examples-list">
                    {examples.map((example, idx) => (
                      <button
                        key={idx}
                        className="example-btn"
                        onClick={() => setInput(example)}
                      >
                        <span className="example-icon">💬</span>
                        <span>{example}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Parsed Task Preview */}
              {parsedTask && (
                <motion.div
                  className="parsed-task-preview"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <h4>AI Parsed Task:</h4>
                  <div className="preview-card">
                    <div className="preview-field">
                      <label>Title:</label>
                      <span>{parsedTask.title}</span>
                    </div>
                    {parsedTask.description && (
                      <div className="preview-field">
                        <label>Description:</label>
                        <span>{parsedTask.description}</span>
                      </div>
                    )}
                    <div className="preview-meta">
                      <span className="meta-badge priority-{parsedTask.priority}">
                        Priority: {parsedTask.priority}/5
                      </span>
                      <span className="meta-badge">
                        Energy: {parsedTask.energy_requirement}/5
                      </span>
                      {parsedTask.estimated_duration && (
                        <span className="meta-badge">
                          ~{parsedTask.estimated_duration}min
                        </span>
                      )}
                    </div>
                    {parsedTask.tags && parsedTask.tags.length > 0 && (
                      <div className="preview-tags">
                        {parsedTask.tags.map(tag => (
                          <span key={tag.id} className="tag-badge" style={{ backgroundColor: tag.color }}>
                            {tag.label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Actions */}
              <div className="ai-actions">
                {!parsedTask ? (
                  <>
                    <button className="btn btn-ghost" onClick={onClose}>
                      Cancel
                    </button>
                    <button 
                      className="btn btn-primary"
                      onClick={handleParse}
                      disabled={!input.trim() || isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <span className="btn-spinner"></span>
                          <span>AI is thinking...</span>
                        </>
                      ) : (
                        <>
                          <span>🤖</span>
                          <span>Parse with AI</span>
                        </>
                      )}
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      className="btn btn-ghost" 
                      onClick={() => setParsedTask(null)}
                    >
                      ← Try Again
                    </button>
                    <button 
                      className="btn btn-primary"
                      onClick={handleCreate}
                    >
                      <span>✅</span>
                      <span>Create Task</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AIQuickCreate;
