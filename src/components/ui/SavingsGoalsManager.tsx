/**
 * Savings Goals Manager
 * WP-FIN-03: Connects spending to life goals
 * 
 * Helps users see how staying within budget helps achieve dreams
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SavingsGoal,
  GOAL_TEMPLATES,
  loadSavingsGoals,
  addSavingsGoal,
  updateGoalProgress,
  deleteSavingsGoal,
  getGoalProgress,
  checkGoalMilestones
} from '../../utils/savingsGoals';
import toast from 'react-hot-toast';

interface SavingsGoalsManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SavingsGoalsManager({ isOpen, onClose }: SavingsGoalsManagerProps) {
  const [goals, setGoals] = useState<SavingsGoal[]>([]);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(GOAL_TEMPLATES[0]);
  const [customName, setCustomName] = useState('');
  const [customAmount, setCustomAmount] = useState(3000);
  const [customDeadline, setCustomDeadline] = useState('');
  
  useEffect(() => {
    if (isOpen) {
      const loaded = loadSavingsGoals();
      setGoals(loaded);
    }
  }, [isOpen]);
  
  const handleAddGoal = () => {
    const newGoal = addSavingsGoal({
      name: customName || selectedTemplate.name,
      icon: selectedTemplate.icon,
      targetAmount: customAmount,
      deadline: customDeadline || undefined,
      category: selectedTemplate.category,
      color: selectedTemplate.color
    });
    
    setGoals([...goals, newGoal]);
    setShowAddGoal(false);
    setCustomName('');
    setCustomAmount(3000);
    setCustomDeadline('');
    
    toast.success(`🎯 Goal created: ${newGoal.name}!`, {
      duration: 3000,
      icon: newGoal.icon
    });
  };
  
  const handleDeleteGoal = (goalId: string) => {
    const goal = goals.find(g => g.id === goalId);
    if (!goal) return;
    
    if (confirm(`Delete "${goal.name}" goal?`)) {
      deleteSavingsGoal(goalId);
      setGoals(goals.filter(g => g.id !== goalId));
      toast.success(`Goal deleted: ${goal.name}`);
    }
  };
  
  const handleAddProgress = (goalId: string, amount: number) => {
    const updatedGoal = updateGoalProgress(goalId, amount);
    if (!updatedGoal) return;
    
    // Check for milestones
    const milestone = checkGoalMilestones(goalId);
    if (milestone.message) {
      toast.success(milestone.message, { duration: 5000 });
    } else {
      toast.success(`💰 +$${amount} to ${updatedGoal.name}!`);
    }
    
    // Reload goals
    setGoals(loadSavingsGoals());
  };
  
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(4px)',
          padding: '20px'
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: 'white',
            borderRadius: '24px',
            maxWidth: '800px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 25px 80px rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* Header */}
          <div style={{
            padding: '32px',
            borderBottom: '1px solid #E5E7EB'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <h2 style={{
                  fontSize: '32px',
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '8px'
                }}>
                  🎯 Savings Goals
                </h2>
                <p style={{
                  fontSize: '16px',
                  color: '#6B7280',
                  margin: 0
                }}>
                  Connect your budget to your dreams
                </p>
              </div>
              
              <button
                onClick={onClose}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: '#F3F4F6',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  color: '#6B7280'
                }}
                aria-label="Close savings goals"
              >
                ×
              </button>
            </div>
          </div>
          
          {/* Content */}
          <div style={{ padding: '32px' }}>
            {/* Goals List */}
            {goals.length === 0 && !showAddGoal && (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                background: 'linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%)',
                borderRadius: '16px'
              }}>
                <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎯</div>
                <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1F2937', marginBottom: '8px' }}>
                  No Savings Goals Yet
                </h3>
                <p style={{ fontSize: '16px', color: '#6B7280', marginBottom: '24px' }}>
                  Set a goal to see how staying within budget helps you achieve your dreams!
                </p>
                <button
                  onClick={() => setShowAddGoal(true)}
                  style={{
                    padding: '14px 32px',
                    background: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(236, 72, 153, 0.3)'
                  }}
                >
                  Create Your First Goal 🚀
                </button>
              </div>
            )}
            
            {goals.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                    Your Goals ({goals.length})
                  </h3>
                  {!showAddGoal && (
                    <button
                      onClick={() => setShowAddGoal(true)}
                      style={{
                        padding: '10px 20px',
                        background: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      + Add Goal
                    </button>
                  )}
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {goals.map(goal => {
                    const progress = getGoalProgress(goal);
                    
                    return (
                      <div
                        key={goal.id}
                        style={{
                          background: 'white',
                          border: `2px solid ${goal.color}30`,
                          borderRadius: '16px',
                          padding: '24px',
                          position: 'relative'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontSize: '32px' }}>{goal.icon}</span>
                            <div>
                              <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#1F2937', margin: 0 }}>
                                {goal.name}
                              </h4>
                              <p style={{ fontSize: '14px', color: '#6B7280', margin: '4px 0 0 0' }}>
                                ${goal.currentAmount.toLocaleString()} of ${goal.targetAmount.toLocaleString()}
                              </p>
                            </div>
                          </div>
                          
                          <button
                            onClick={() => handleDeleteGoal(goal.id)}
                            style={{
                              padding: '6px 12px',
                              background: '#FEE2E2',
                              color: '#DC2626',
                              border: 'none',
                              borderRadius: '8px',
                              fontSize: '12px',
                              fontWeight: '600',
                              cursor: 'pointer'
                            }}
                          >
                            Delete
                          </button>
                        </div>
                        
                        {/* Progress Bar */}
                        <div style={{
                          width: '100%',
                          height: '12px',
                          background: '#E5E7EB',
                          borderRadius: '6px',
                          overflow: 'hidden',
                          marginBottom: '12px'
                        }}>
                          <div style={{
                            width: `${progress.percentage}%`,
                            height: '100%',
                            background: `linear-gradient(90deg, ${goal.color} 0%, ${goal.color}CC 100%)`,
                            transition: 'width 0.5s ease'
                          }} />
                        </div>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '14px', fontWeight: '600', color: goal.color }}>
                            {progress.percentage.toFixed(0)}% Complete
                          </span>
                          <span style={{ fontSize: '13px', color: '#6B7280' }}>
                            ${progress.remaining.toLocaleString()} remaining
                          </span>
                        </div>
                        
                        {/* Quick Add Progress */}
                        <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                          {[10, 25, 50, 100].map(amount => (
                            <button
                              key={amount}
                              onClick={() => handleAddProgress(goal.id, amount)}
                              style={{
                                flex: 1,
                                padding: '10px',
                                background: '#F9FAFB',
                                border: '1px solid #E5E7EB',
                                borderRadius: '8px',
                                fontSize: '13px',
                                fontWeight: '600',
                                color: '#4B5563',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = goal.color + '20';
                                e.currentTarget.style.borderColor = goal.color;
                                e.currentTarget.style.color = goal.color;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = '#F9FAFB';
                                e.currentTarget.style.borderColor = '#E5E7EB';
                                e.currentTarget.style.color = '#4B5563';
                              }}
                            >
                              +${amount}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Add Goal Form */}
            {showAddGoal && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: 'linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%)',
                  borderRadius: '16px',
                  padding: '24px',
                  marginTop: goals.length > 0 ? '24px' : 0
                }}
              >
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1F2937', marginBottom: '16px' }}>
                  Create New Goal
                </h3>
                
                {/* Template Selection */}
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#4B5563', marginBottom: '8px' }}>
                  Choose a template:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
                  {GOAL_TEMPLATES.map(template => (
                    <button
                      key={template.category}
                      onClick={() => setSelectedTemplate(template)}
                      style={{
                        padding: '16px',
                        background: selectedTemplate.category === template.category ? template.color + '20' : 'white',
                        border: `2px solid ${selectedTemplate.category === template.category ? template.color : '#E5E7EB'}`,
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        textAlign: 'center'
                      }}
                    >
                      <div style={{ fontSize: '32px', marginBottom: '8px' }}>{template.icon}</div>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: '#1F2937' }}>
                        {template.name}
                      </div>
                    </button>
                  ))}
                </div>
                
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#4B5563', marginBottom: '8px' }}>
                  Goal Name:
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder={selectedTemplate.name}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #E5E7EB',
                    borderRadius: '10px',
                    fontSize: '14px',
                    marginBottom: '16px'
                  }}
                />
                
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#4B5563', marginBottom: '8px' }}>
                  Target Amount: ${customAmount}
                </label>
                <input
                  type="range"
                  min="100"
                  max="50000"
                  step="100"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    marginBottom: '16px',
                    accentColor: selectedTemplate.color
                  }}
                />
                
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#4B5563', marginBottom: '8px' }}>
                  Deadline (optional):
                </label>
                <input
                  type="date"
                  value={customDeadline}
                  onChange={(e) => setCustomDeadline(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #E5E7EB',
                    borderRadius: '10px',
                    fontSize: '14px',
                    marginBottom: '20px'
                  }}
                />
                
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={handleAddGoal}
                    style={{
                      flex: 1,
                      padding: '14px',
                      background: `linear-gradient(135deg, ${selectedTemplate.color} 0%, ${selectedTemplate.color}CC 100%)`,
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      fontSize: '15px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      boxShadow: `0 4px 12px ${selectedTemplate.color}40`
                    }}
                  >
                    Create Goal 🎯
                  </button>
                  <button
                    onClick={() => setShowAddGoal(false)}
                    style={{
                      padding: '14px 24px',
                      background: 'white',
                      color: '#6B7280',
                      border: '1px solid #E5E7EB',
                      borderRadius: '10px',
                      fontSize: '15px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

