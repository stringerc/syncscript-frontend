import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface BudgetItem {
  id: string;
  taskId?: string;
  projectId?: string;
  description: string;
  amount: number;
  category: 'labor' | 'materials' | 'software' | 'other';
  date: string;
}

interface BudgetTrackerProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: Array<{ id: string; title: string; project_id?: string }>;
  projects: Array<{ id: string; name: string }>;
}

const BudgetTracker: React.FC<BudgetTrackerProps> = ({ isOpen, onClose, tasks, projects }) => {
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    description: '',
    amount: 0,
    category: 'labor' as BudgetItem['category'],
    taskId: '',
    projectId: ''
  });

  const handleAddItem = () => {
    if (!newItem.description || newItem.amount <= 0) {
      toast.error('Please fill all fields');
      return;
    }

    const item: BudgetItem = {
      id: Date.now().toString(),
      ...newItem,
      date: new Date().toISOString()
    };

    setBudgetItems([...budgetItems, item]);
    setNewItem({ description: '', amount: 0, category: 'labor', taskId: '', projectId: '' });
    setShowAddForm(false);
    toast.success('💰 Budget item added!');
  };

  const totalBudget = budgetItems.reduce((sum, item) => sum + item.amount, 0);
  const byCategory = budgetItems.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="budget-overlay" onClick={onClose}>
          <motion.div
            className="budget-modal"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="budget-header">
              <div>
                <h2>💰 Budget Tracking</h2>
                <p>Track costs and project budgets</p>
              </div>
              <button className="close-btn" onClick={onClose}>×</button>
            </div>

            <div className="budget-content">
              {/* Summary */}
              <div className="budget-summary">
                <div className="total-budget">
                  <div className="budget-label">Total Budget</div>
                  <div className="budget-value">${totalBudget.toLocaleString()}</div>
                </div>

                <div className="budget-breakdown">
                  {Object.entries(byCategory).map(([category, amount]) => (
                    <div key={category} className="category-item">
                      <span className="category-name">{category}</span>
                      <span className="category-amount">${amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Items List */}
              <div className="budget-items">
                <h4>Budget Items</h4>
                {budgetItems.length === 0 ? (
                  <div className="empty-budget">
                    <span className="empty-icon">💸</span>
                    <p>No budget items yet</p>
                  </div>
                ) : (
                  budgetItems.map(item => (
                    <div key={item.id} className="budget-item-card">
                      <div className="item-info">
                        <div className="item-description">{item.description}</div>
                        <div className="item-meta">
                          <span className="item-category">{item.category}</span>
                          {item.taskId && <span className="item-link">→ Task</span>}
                        </div>
                      </div>
                      <div className="item-amount">${item.amount.toLocaleString()}</div>
                    </div>
                  ))
                )}
              </div>

              {/* Add Form */}
              {showAddForm ? (
                <motion.div
                  className="add-budget-form"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                >
                  <div className="form-field">
                    <label>Description</label>
                    <input
                      type="text"
                      value={newItem.description}
                      onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                      placeholder="e.g., Developer hours, Software license..."
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <label>Amount ($)</label>
                      <input
                        type="number"
                        value={newItem.amount || ''}
                        onChange={(e) => setNewItem({ ...newItem, amount: parseFloat(e.target.value) || 0 })}
                        placeholder="0.00"
                      />
                    </div>

                    <div className="form-field">
                      <label>Category</label>
                      <select
                        value={newItem.category}
                        onChange={(e) => setNewItem({ ...newItem, category: e.target.value as BudgetItem['category'] })}
                      >
                        <option value="labor">💼 Labor</option>
                        <option value="materials">📦 Materials</option>
                        <option value="software">💻 Software</option>
                        <option value="other">📌 Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button className="btn btn-ghost" onClick={() => setShowAddForm(false)}>
                      Cancel
                    </button>
                    <button className="btn btn-primary" onClick={handleAddItem}>
                      💰 Add Item
                    </button>
                  </div>
                </motion.div>
              ) : (
                <button className="add-budget-btn" onClick={() => setShowAddForm(true)}>
                  ➕ Add Budget Item
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BudgetTracker;
