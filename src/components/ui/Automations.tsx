import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import '../../styles/Automations.css';

interface AutomationRule {
  id: string;
  name: string;
  description: string;
  trigger: {
    type: 'task_created' | 'task_completed' | 'tag_added' | 'due_date_soon' | 'priority_changed';
    condition?: string;
  };
  action: {
    type: 'add_tag' | 'set_priority' | 'assign_project' | 'send_notification' | 'create_subtask';
    value: string;
  };
  enabled: boolean;
}

interface AutomationsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Automations: React.FC<AutomationsProps> = ({ isOpen, onClose }) => {
  const [rules, setRules] = useState<AutomationRule[]>([
    {
      id: '1',
      name: 'Auto-prioritize urgent tasks',
      description: 'When a task is due within 1 day, set priority to 5',
      trigger: { type: 'due_date_soon', condition: '1 day' },
      action: { type: 'set_priority', value: '5' },
      enabled: true
    },
    {
      id: '2',
      name: 'Tag completed high-energy tasks',
      description: 'When completing a high-energy task, add "accomplished" tag',
      trigger: { type: 'task_completed' },
      action: { type: 'add_tag', value: 'accomplished' },
      enabled: true
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleToggleRule = (ruleId: string) => {
    setRules(rules.map(rule =>
      rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
    ));
    toast.success('Automation updated!');
  };

  const handleDeleteRule = (ruleId: string) => {
    setRules(rules.filter(r => r.id !== ruleId));
    toast.success('Automation deleted!');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="automations-overlay" onClick={onClose}>
          <motion.div
            className="automations-modal"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="automations-header">
              <div>
                <h2>🤖 Custom Automations</h2>
                <p>Create if-then rules to automate your workflow</p>
              </div>
              <button className="close-btn" onClick={onClose}>×</button>
            </div>

            <div className="automations-content">
              <div className="automations-list">
                {rules.map(rule => (
                  <div key={rule.id} className="automation-card">
                    <div className="automation-header">
                      <div className="automation-info">
                        <h3>{rule.name}</h3>
                        <p>{rule.description}</p>
                      </div>
                      <label className="automation-toggle">
                        <input
                          type="checkbox"
                          checked={rule.enabled}
                          onChange={() => handleToggleRule(rule.id)}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>

                    <div className="automation-logic">
                      <div className="logic-part trigger">
                        <span className="logic-label">WHEN</span>
                        <span className="logic-value">{rule.trigger.type.replace(/_/g, ' ')}</span>
                        {rule.trigger.condition && (
                          <span className="logic-condition">({rule.trigger.condition})</span>
                        )}
                      </div>

                      <span className="logic-arrow">→</span>

                      <div className="logic-part action">
                        <span className="logic-label">THEN</span>
                        <span className="logic-value">{rule.action.type.replace(/_/g, ' ')}</span>
                        <span className="logic-condition">&ldquo;{rule.action.value}&rdquo;</span>
                      </div>
                    </div>

                    <button
                      className="delete-automation-btn"
                      onClick={() => handleDeleteRule(rule.id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                ))}
              </div>

              <button
                className="add-automation-btn"
                onClick={() => setShowCreateForm(true)}
              >
                <span>➕</span>
                <span>Create Automation</span>
              </button>

              {showCreateForm && (
                <motion.div
                  className="create-automation-form"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                >
                  <p>🚧 Automation builder coming soon!</p>
                  <p>Visual if-then rule creator with:</p>
                  <ul>
                    <li>Trigger selection</li>
                    <li>Condition builder</li>
                    <li>Action configuration</li>
                    <li>Test automation</li>
                  </ul>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Automations;
