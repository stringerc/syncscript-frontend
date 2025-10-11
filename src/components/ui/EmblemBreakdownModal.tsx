/**
 * EmblemBreakdownModal Component
 * WP-ENG-02: Emblem Transparency
 * 
 * Shows breakdown of emblem charge calculation
 * Goal: Increase engagement from 48% to 60% DAU
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EmblemBreakdown, getEmblemLevel, getEmblemLevelTitle } from '../../utils/emblemCalculation';

interface EmblemBreakdownModalProps {
  breakdown: EmblemBreakdown | null;
  totalEmblemCharge: number; // User's total accumulated charge
  isOpen: boolean;
  onClose: () => void;
}

export default function EmblemBreakdownModal({
  breakdown,
  totalEmblemCharge,
  isOpen,
  onClose
}: EmblemBreakdownModalProps) {
  if (!isOpen || !breakdown) return null;
  
  const levelInfo = getEmblemLevel(totalEmblemCharge + breakdown.total);
  const levelTitle = getEmblemLevelTitle(levelInfo.level);
  
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
          background: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(8px)'
        }}
      >
        <motion.div
          className="emblem-breakdown-modal"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: 'linear-gradient(135deg, #1F2937 0%, #111827 100%)',
            borderRadius: '20px',
            padding: '40px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto',
            boxShadow: '0 25px 80px rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: '32px', textAlign: 'center' }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              style={{
                fontSize: '64px',
                marginBottom: '16px'
              }}
            >
              ⚡
            </motion.div>
            <h3 style={{
              fontSize: '28px',
              fontWeight: '800',
              color: 'white',
              marginBottom: '8px'
            }}>
              Emblem Charge Breakdown
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#9CA3AF',
              margin: 0
            }}>
              Here's how you earned <span style={{ color: '#F5A623', fontWeight: '700' }}>+{breakdown.total}⚡</span>
            </p>
          </div>
          
          {/* Breakdown Items */}
          <div style={{ marginBottom: '32px' }}>
            {/* Base Charge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ color: 'white', fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
                    🎯 Base Charge
                  </div>
                  <div style={{ color: '#9CA3AF', fontSize: '13px' }}>
                    {breakdown.explanation.base}
                  </div>
                </div>
                <div style={{
                  color: '#F5A623',
                  fontSize: '24px',
                  fontWeight: '800'
                }}>
                  +{breakdown.base}⚡
                </div>
              </div>
            </motion.div>
            
            {/* Energy Match Bonus */}
            {breakdown.energyMatchBonus > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                style={{
                  background: 'rgba(126, 211, 33, 0.1)',
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '12px',
                  border: '1px solid rgba(126, 211, 33, 0.3)'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ color: '#7ED321', fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
                      ⚡ Energy Match Bonus
                    </div>
                    <div style={{ color: '#9CA3AF', fontSize: '13px' }}>
                      {breakdown.explanation.energyMatch}
                    </div>
                  </div>
                  <div style={{
                    color: '#7ED321',
                    fontSize: '24px',
                    fontWeight: '800'
                  }}>
                    +{breakdown.energyMatchBonus}⚡
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Perfect Match Bonus */}
            {breakdown.perfectMatchBonus > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 }}
                style={{
                  background: 'rgba(139, 92, 246, 0.1)',
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '12px',
                  border: '1px solid rgba(139, 92, 246, 0.3)'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ color: '#8B5CF6', fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
                      🎯 Perfect Energy Match!
                    </div>
                    <div style={{ color: '#9CA3AF', fontSize: '13px' }}>
                      {breakdown.explanation.perfectMatch}
                    </div>
                  </div>
                  <div style={{
                    color: '#8B5CF6',
                    fontSize: '24px',
                    fontWeight: '800'
                  }}>
                    +{breakdown.perfectMatchBonus}⚡
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Streak Bonus */}
            {breakdown.streakBonus > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                style={{
                  background: 'rgba(251, 146, 60, 0.1)',
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '12px',
                  border: '1px solid rgba(251, 146, 60, 0.3)'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ color: '#FB923C', fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
                      🔥 Streak Bonus
                    </div>
                    <div style={{ color: '#9CA3AF', fontSize: '13px' }}>
                      {breakdown.explanation.streak}
                    </div>
                  </div>
                  <div style={{
                    color: '#FB923C',
                    fontSize: '24px',
                    fontWeight: '800'
                  }}>
                    +{breakdown.streakBonus}⚡
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Total */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              style={{
                background: 'linear-gradient(135deg, #F5A623 0%, #F57C00 100%)',
                borderRadius: '12px',
                padding: '24px',
                marginTop: '20px'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ color: 'white', fontSize: '20px', fontWeight: '700' }}>
                  Total Charge
                </div>
                <div style={{
                  color: 'white',
                  fontSize: '36px',
                  fontWeight: '900'
                }}>
                  +{breakdown.total}⚡
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Level Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '24px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px'
            }}>
              <div>
                <div style={{ color: 'white', fontSize: '18px', fontWeight: '700' }}>
                  Emblem Level {levelInfo.level}: {levelTitle}
                </div>
                <div style={{ color: '#9CA3AF', fontSize: '14px', marginTop: '4px' }}>
                  {levelInfo.current}/{levelInfo.next}⚡ ({Math.round(levelInfo.progress)}%)
                </div>
              </div>
              <div style={{
                color: '#F5A623',
                fontSize: '14px',
                fontWeight: '700'
              }}>
                {levelInfo.next - levelInfo.current}⚡ to Level {levelInfo.level + 1}
              </div>
            </div>
            
            {/* Progress Bar */}
            <div style={{
              width: '100%',
              height: '12px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '6px',
              overflow: 'hidden'
            }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${levelInfo.progress}%` }}
                transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #F5A623 0%, #F57C00 100%)',
                  borderRadius: '6px'
                }}
              />
            </div>
          </motion.div>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              width: '100%',
              padding: '16px',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
          >
            Got It! ✨
          </button>
          
          {/* Pro Tip */}
          <p style={{
            textAlign: 'center',
            color: '#9CA3AF',
            fontSize: '13px',
            marginTop: '16px',
            fontStyle: 'italic'
          }}>
            💡 Pro tip: Match your energy to tasks for maximum charge!
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

