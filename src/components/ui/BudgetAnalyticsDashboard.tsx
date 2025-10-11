/**
 * Budget Analytics Dashboard
 * Feature #26: Deep insights into spending patterns
 * 
 * Tracks budget adherence, savings, and spending by category
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { loadComfortBands, BUDGET_CATEGORIES } from '../../utils/budgetComfortBands';
import { loadSavingsGoals, getGoalProgress } from '../../utils/savingsGoals';

interface BudgetAnalyticsDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BudgetAnalyticsDashboard({
  isOpen,
  onClose
}: BudgetAnalyticsDashboardProps) {
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');
  
  // Mock spending data - in production, fetch from backend
  const mockSpending = {
    dining: 240,
    entertainment: 180,
    shopping: 320,
    travel: 150,
    wellness: 90,
    experiences: 120
  };
  
  const totalSpending = Object.values(mockSpending).reduce((sum, val) => sum + val, 0);
  
  const comfortBands = loadComfortBands();
  const goals = loadSavingsGoals();
  
  // Calculate under-budget rate
  const underBudgetCount = Object.entries(mockSpending).filter(([category, amount]) => {
    const band = comfortBands[category];
    if (!band) return true;
    return amount <= band.max;
  }).length;
  
  const underBudgetRate = Math.round((underBudgetCount / Object.keys(mockSpending).length) * 100);
  
  // Calculate total savings goal progress
  const totalSavingsProgress = goals.length > 0
    ? goals.reduce((sum, goal) => sum + getGoalProgress(goal).percentage, 0) / goals.length
    : 0;
  
  if (!isOpen) return null;
  
  return (
    <div
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
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'white',
          borderRadius: '24px',
          maxWidth: '900px',
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
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '8px'
              }}>
                💰 Budget Analytics
              </h2>
              <p style={{ fontSize: '16px', color: '#6B7280', margin: 0 }}>
                Track your spending and savings progress
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
            >
              ×
            </button>
          </div>
          
          {/* Period Selector */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            {(['week', 'month', 'year'] as const).map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                style={{
                  padding: '10px 24px',
                  background: period === p ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' : '#F9FAFB',
                  color: period === p ? 'white' : '#4B5563',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '32px' }}>
          {/* Key Metrics */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            marginBottom: '32px'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
              padding: '24px',
              borderRadius: '16px',
              border: '2px solid #A7F3D0'
            }}>
              <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '8px', fontWeight: '600' }}>
                Total Spending ({period})
              </div>
              <div style={{ fontSize: '36px', fontWeight: '800', color: '#10B981' }}>
                ${totalSpending}
              </div>
            </div>
            
            <div style={{
              background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
              padding: '24px',
              borderRadius: '16px',
              border: '2px solid #BFDBFE'
            }}>
              <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '8px', fontWeight: '600' }}>
                Under-Budget Rate
              </div>
              <div style={{ fontSize: '36px', fontWeight: '800', color: '#3B82F6' }}>
                {underBudgetRate}%
              </div>
            </div>
            
            <div style={{
              background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
              padding: '24px',
              borderRadius: '16px',
              border: '2px solid #FCD34D'
            }}>
              <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '8px', fontWeight: '600' }}>
                Savings Progress
              </div>
              <div style={{ fontSize: '36px', fontWeight: '800', color: '#F59E0B' }}>
                {Math.round(totalSavingsProgress)}%
              </div>
            </div>
          </div>

          {/* Spending by Category */}
          <div style={{
            background: '#F9FAFB',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '32px'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#1F2937',
              marginBottom: '20px'
            }}>
              📊 Spending by Category
            </h3>
            
            {Object.entries(mockSpending)
              .sort((a, b) => b[1] - a[1])
              .map(([categoryId, amount]) => {
                const category = BUDGET_CATEGORIES.find(c => c.id === categoryId);
                const band = comfortBands[categoryId];
                const percentage = (amount / totalSpending) * 100;
                const withinBudget = band ? amount <= band.max : true;
                
                return (
                  <div
                    key={categoryId}
                    style={{
                      background: 'white',
                      padding: '16px',
                      borderRadius: '12px',
                      marginBottom: '12px',
                      border: `2px solid ${withinBudget ? '#10B981' : '#EF4444'}20`
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '24px' }}>{category?.icon || '💰'}</span>
                        <div>
                          <div style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937' }}>
                            {category?.name || categoryId}
                          </div>
                          <div style={{ fontSize: '13px', color: '#6B7280' }}>
                            {percentage.toFixed(0)}% of total spending
                          </div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{
                          fontSize: '20px',
                          fontWeight: '700',
                          color: withinBudget ? '#10B981' : '#EF4444'
                        }}>
                          ${amount}
                        </div>
                        {band && (
                          <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
                            Max: ${band.max}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Progress bar */}
                    <div style={{
                      width: '100%',
                      height: '6px',
                      background: '#E5E7EB',
                      borderRadius: '3px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${Math.min(100, percentage * 2)}%`,
                        height: '100%',
                        background: withinBudget ? '#10B981' : '#EF4444',
                        transition: 'width 0.5s ease'
                      }} />
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Recommendations */}
          <div style={{
            background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
            borderRadius: '16px',
            padding: '24px',
            border: '2px solid #BFDBFE'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#1F2937',
              marginBottom: '16px'
            }}>
              💡 Budget Recommendations
            </h3>
            
            {underBudgetRate >= 80 ? (
              <p style={{ fontSize: '15px', color: '#10B981', fontWeight: '600' }}>
                🎉 Excellent! You&apos;re staying within budget {underBudgetRate}% of the time!
              </p>
            ) : (
              <div>
                <p style={{ fontSize: '15px', color: '#F59E0B', fontWeight: '600', marginBottom: '12px' }}>
                  ⚠️ You&apos;re over budget {100 - underBudgetRate}% of the time
                </p>
                <ul style={{ fontSize: '14px', color: '#6B7280', paddingLeft: '20px', lineHeight: '1.8' }}>
                  <li>Consider tightening comfort bands for top spending categories</li>
                  <li>Review savings goals to stay motivated</li>
                  <li>Check budget fit stars before committing to expenses</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

