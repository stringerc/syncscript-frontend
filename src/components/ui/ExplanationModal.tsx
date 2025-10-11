/**
 * ExplanationModal Component
 * WP-PERS-01: AI Explainability
 * 
 * Shows "Why this?" explanation for AI suggestions
 * Goal: Increase acceptance from 40% to 60% (+20pp)
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExplanationReason, TaskExplanation, formatConfidence, getConfidenceColor } from '../../utils/aiExplainability';

interface ExplanationModalProps {
  explanation: TaskExplanation | null;
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  onDismiss: () => void;
}

export default function ExplanationModal({
  explanation,
  isOpen,
  onClose,
  onAccept,
  onDismiss
}: ExplanationModalProps) {
  if (!isOpen || !explanation) return null;
  
  const confidenceLabel = formatConfidence(explanation.confidence);
  const confidenceColor = getConfidenceColor(explanation.confidence);
  
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
          backdropFilter: 'blur(4px)'
        }}
      >
        <motion.div
          className="explanation-modal"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: 'white',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '520px',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#1F2937',
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <span style={{ fontSize: '28px' }}>💡</span>
              Why we suggested this
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#6B7280',
              margin: 0
            }}>
              {explanation.taskTitle}
            </p>
          </div>
          
          {/* Confidence Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: `${confidenceColor}15`,
            padding: '8px 16px',
            borderRadius: '8px',
            marginBottom: '24px'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: confidenceColor
            }} />
            <span style={{
              fontSize: '14px',
              fontWeight: '600',
              color: confidenceColor
            }}>
              {confidenceLabel} Confidence ({explanation.confidence}%)
            </span>
          </div>
          
          {/* Reasons List */}
          <div style={{ marginBottom: '24px' }}>
            {explanation.reasons.map((reason, index) => (
              <motion.div
                key={reason.type}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '16px',
                  background: '#F9FAFB',
                  borderRadius: '12px',
                  marginBottom: '12px',
                  border: '1px solid #E5E7EB'
                }}
              >
                {/* Icon */}
                <div style={{
                  fontSize: '24px',
                  flexShrink: 0,
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {reason.icon}
                </div>
                
                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#1F2937',
                    marginBottom: '4px'
                  }}>
                    {reason.title}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#6B7280',
                    lineHeight: '1.5'
                  }}>
                    {reason.description}
                  </div>
                </div>
                
                {/* Score indicator */}
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: `rgba(74, 144, 226, ${reason.score * 0.2})`,
                  border: `2px solid rgba(74, 144, 226, ${reason.score})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '700',
                  color: '#4A90E2',
                  flexShrink: 0
                }}>
                  {Math.round(reason.score * 100)}
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* No Reasons Fallback */}
          {explanation.reasons.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '32px',
              color: '#9CA3AF'
            }}>
              <p style={{ fontSize: '16px', margin: 0 }}>
                This task appeared in your suggestions based on general relevance.
              </p>
            </div>
          )}
          
          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '12px',
            marginTop: '24px'
          }}>
            <button
              onClick={onDismiss}
              style={{
                flex: 1,
                padding: '14px 24px',
                background: '#F3F4F6',
                color: '#4B5563',
                border: 'none',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                minHeight: '48px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#E5E7EB';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#F3F4F6';
              }}
            >
              Got It
            </button>
            
            <button
              onClick={onAccept}
              style={{
                flex: 1,
                padding: '14px 24px',
                background: 'linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 4px 12px rgba(74, 144, 226, 0.3)',
                minHeight: '48px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(74, 144, 226, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(74, 144, 226, 0.3)';
              }}
            >
              Accept Task ✅
            </button>
          </div>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#F3F4F6',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              color: '#6B7280',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#E5E7EB';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#F3F4F6';
            }}
            aria-label="Close explanation"
          >
            ×
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

