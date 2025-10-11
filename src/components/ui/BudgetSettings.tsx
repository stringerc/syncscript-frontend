/**
 * BudgetSettings Component
 * WP-FIN-01: Complete Budget Comfort Bands Interface
 * 
 * Main settings page for managing budget comfort bands
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ComfortBandSlider from './ComfortBandSlider';
import {
  BUDGET_CATEGORIES,
  ComfortBand,
  UserBudgetPreferences,
  saveComfortBands,
  loadComfortBands,
  calculateBudgetFit,
  getStarDisplay
} from '../../utils/budgetComfortBands';
import toast from 'react-hot-toast';

interface BudgetSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BudgetSettings({ isOpen, onClose }: BudgetSettingsProps) {
  const [preferences, setPreferences] = useState<UserBudgetPreferences>({});
  const [selectedCategory, setSelectedCategory] = useState(BUDGET_CATEGORIES[0].id);
  const [testPrice, setTestPrice] = useState(35);
  
  useEffect(() => {
    if (isOpen) {
      const loaded = loadComfortBands();
      setPreferences(loaded);
      
      // Track analytics
      console.log('💰 Budget Settings Opened:', {
        has_existing_bands: Object.keys(loaded).length > 0,
        categories_set: Object.keys(loaded).length
      });
    }
  }, [isOpen]);
  
  const handleBandChange = (categoryId: string, band: ComfortBand) => {
    const newPreferences = {
      ...preferences,
      [categoryId]: band
    };
    
    setPreferences(newPreferences);
    saveComfortBands(newPreferences);
    
    toast.success(`${BUDGET_CATEGORIES.find(c => c.id === categoryId)?.name} budget updated!`, {
      icon: '💰',
      duration: 2000
    });
    
    console.log('💰 Comfort Band Updated:', {
      category: categoryId,
      band,
      timestamp: new Date().toISOString()
    });
  };
  
  const getCurrentBand = (categoryId: string): ComfortBand => {
    if (preferences[categoryId]) {
      return preferences[categoryId];
    }
    const category = BUDGET_CATEGORIES.find(c => c.id === categoryId);
    return category?.defaultBand || { min: 20, ideal: 50, max: 100 };
  };
  
  const selectedCategoryData = BUDGET_CATEGORIES.find(c => c.id === selectedCategory);
  const currentBand = getCurrentBand(selectedCategory);
  const testFit = calculateBudgetFit(testPrice, currentBand);
  
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
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
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
                  💰 Budget Comfort Bands
                </h2>
                <p style={{
                  fontSize: '16px',
                  color: '#6B7280',
                  margin: 0
                }}>
                  Set your spending comfort zones for smarter recommendations
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
                  color: '#6B7280',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#E5E7EB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#F3F4F6';
                }}
                aria-label="Close budget settings"
              >
                ×
              </button>
            </div>
          </div>
          
          {/* Content */}
          <div style={{ padding: '32px' }}>
            {/* Category Tabs */}
            <div style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '32px',
              flexWrap: 'wrap'
            }}>
              {BUDGET_CATEGORIES.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  style={{
                    padding: '12px 20px',
                    background: selectedCategory === category.id 
                      ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                      : '#F9FAFB',
                    color: selectedCategory === category.id ? 'white' : '#4B5563',
                    border: selectedCategory === category.id ? 'none' : '1px solid #E5E7EB',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <span>{category.icon}</span>
                  {category.name}
                  {preferences[category.id] && (
                    <span style={{
                      background: selectedCategory === category.id ? 'rgba(255,255,255,0.2)' : '#10B981',
                      color: selectedCategory === category.id ? 'white' : 'white',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: '700'
                    }}>
                      ✓
                    </span>
                  )}
                </button>
              ))}
            </div>
            
            {/* Selected Category Slider */}
            {selectedCategoryData && (
              <ComfortBandSlider
                category={selectedCategoryData}
                initialBand={currentBand}
                onChange={(band) => handleBandChange(selectedCategory, band)}
              />
            )}
            
            {/* Test Budget Fit */}
            <div style={{
              marginTop: '32px',
              padding: '24px',
              background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
              borderRadius: '16px',
              border: '1px solid #BFDBFE'
            }}>
              <h4 style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#1F2937',
                marginBottom: '16px'
              }}>
                🧪 Test Budget Fit
              </h4>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ flex: '1', minWidth: '200px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#4B5563',
                    marginBottom: '8px'
                  }}>
                    Test Price:
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    step="5"
                    value={testPrice}
                    onChange={(e) => setTestPrice(parseInt(e.target.value))}
                    style={{
                      width: '100%',
                      accentColor: '#10B981'
                    }}
                  />
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '4px',
                    fontSize: '12px',
                    color: '#6B7280'
                  }}>
                    <span>$0</span>
                    <span style={{ fontWeight: '700', color: '#1F2937', fontSize: '16px' }}>
                      ${testPrice}
                    </span>
                    <span>$200</span>
                  </div>
                </div>
                
                <div style={{
                  background: 'white',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '2px solid #10B981',
                  minWidth: '200px'
                }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>
                    {getStarDisplay(testFit.score)}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '700',
                    color: '#10B981',
                    marginBottom: '4px'
                  }}>
                    {testFit.rating.toUpperCase()} FIT
                  </div>
                  <div style={{ fontSize: '13px', color: '#6B7280' }}>
                    {testFit.message}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer Actions */}
          <div style={{
            padding: '24px 32px',
            borderTop: '1px solid #E5E7EB',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <p style={{
              fontSize: '13px',
              color: '#6B7280',
              margin: 0
            }}>
              💡 Changes save automatically
            </p>
            
            <button
              onClick={onClose}
              style={{
                padding: '12px 32px',
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(16, 185, 129, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
              }}
            >
              Done ✅
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

