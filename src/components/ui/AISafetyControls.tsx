/**
 * AI Safety Controls Component
 * Phase 2: User-controlled AI safety settings
 * 
 * Gives users full control over AI behavior and safety
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  SafetyPreferences,
  loadSafetyPreferences,
  saveSafetyPreferences,
  getSafetyLevelDescription,
  trackSafetyEvent
} from '../../utils/aiContentFilter';
import toast from 'react-hot-toast';

interface AISafetyControlsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AISafetyControls({ isOpen, onClose }: AISafetyControlsProps) {
  const [preferences, setPreferences] = useState<SafetyPreferences>(loadSafetyPreferences());
  const [hasChanges, setHasChanges] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      const loaded = loadSafetyPreferences();
      setPreferences(loaded);
      setHasChanges(false);
    }
  }, [isOpen]);
  
  const handleChange = (key: keyof SafetyPreferences, value: unknown) => {
    const newPrefs = { ...preferences, [key]: value };
    setPreferences(newPrefs);
    setHasChanges(true);
  };
  
  const handleSave = () => {
    saveSafetyPreferences(preferences);
    setHasChanges(false);
    
    trackSafetyEvent('settings_changed', {
      newSettings: preferences
    });
    
    toast.success('🛡️ AI Safety settings saved!', {
      duration: 3000
    });
  };
  
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
          maxWidth: '700px',
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
                color: '#1F2937',
                marginBottom: '8px'
              }}>
                🛡️ AI Safety Controls
              </h2>
              <p style={{
                fontSize: '16px',
                color: '#6B7280',
                margin: 0
              }}>
                Control how AI behaves and what content you see
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
        </div>

        {/* Content */}
        <div style={{ padding: '32px' }}>
          {/* Content Filter Level */}
          <div style={{ marginBottom: '32px' }}>
            <label style={{
              display: 'block',
              fontSize: '16px',
              fontWeight: '700',
              color: '#1F2937',
              marginBottom: '12px'
            }}>
              Content Filter Level
            </label>
            
            <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
              {(['strict', 'moderate', 'permissive'] as const).map(level => (
                <button
                  key={level}
                  onClick={() => handleChange('contentFilterLevel', level)}
                  style={{
                    flex: 1,
                    padding: '16px',
                    background: preferences.contentFilterLevel === level 
                      ? 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)'
                      : '#F9FAFB',
                    color: preferences.contentFilterLevel === level ? 'white' : '#4B5563',
                    border: preferences.contentFilterLevel === level ? 'none' : '1px solid #E5E7EB',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    textTransform: 'capitalize',
                    transition: 'all 0.2s'
                  }}
                >
                  {level}
                </button>
              ))}
            </div>
            
            <p style={{ fontSize: '13px', color: '#6B7280', fontStyle: 'italic' }}>
              {getSafetyLevelDescription(preferences.contentFilterLevel)}
            </p>
          </div>

          {/* Safety Toggles */}
          <div style={{
            background: '#F9FAFB',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '32px'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#1F2937',
              marginBottom: '20px'
            }}>
              Safety Preferences
            </h3>
            
            {/* Block Harmful Content */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <div>
                <div style={{ fontSize: '15px', fontWeight: '600', color: '#1F2937', marginBottom: '4px' }}>
                  Block Harmful Content
                </div>
                <div style={{ fontSize: '13px', color: '#6B7280' }}>
                  Prevent AI from generating harmful or dangerous content
                </div>
              </div>
              <label style={{ position: 'relative', display: 'inline-block', width: '56px', height: '32px' }}>
                <input
                  type="checkbox"
                  checked={preferences.blockHarmfulContent}
                  onChange={(e) => handleChange('blockHarmfulContent', e.target.checked)}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span style={{
                  position: 'absolute',
                  cursor: 'pointer',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: preferences.blockHarmfulContent ? '#10B981' : '#D1D5DB',
                  borderRadius: '16px',
                  transition: 'all 0.3s'
                }}>
                  <span style={{
                    position: 'absolute',
                    content: '',
                    height: '24px',
                    width: '24px',
                    left: preferences.blockHarmfulContent ? '28px' : '4px',
                    bottom: '4px',
                    background: 'white',
                    borderRadius: '50%',
                    transition: 'all 0.3s'
                  }} />
                </span>
              </label>
            </div>

            {/* Block Personal Questions */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <div>
                <div style={{ fontSize: '15px', fontWeight: '600', color: '#1F2937', marginBottom: '4px' }}>
                  Block Personal Questions
                </div>
                <div style={{ fontSize: '13px', color: '#6B7280' }}>
                  Prevent AI from requesting personal information
                </div>
              </div>
              <label style={{ position: 'relative', display: 'inline-block', width: '56px', height: '32px' }}>
                <input
                  type="checkbox"
                  checked={preferences.blockPersonalQuestions}
                  onChange={(e) => handleChange('blockPersonalQuestions', e.target.checked)}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span style={{
                  position: 'absolute',
                  cursor: 'pointer',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: preferences.blockPersonalQuestions ? '#10B981' : '#D1D5DB',
                  borderRadius: '16px',
                  transition: 'all 0.3s'
                }}>
                  <span style={{
                    position: 'absolute',
                    height: '24px',
                    width: '24px',
                    left: preferences.blockPersonalQuestions ? '28px' : '4px',
                    bottom: '4px',
                    background: 'white',
                    borderRadius: '50%',
                    transition: 'all 0.3s'
                  }} />
                </span>
              </label>
            </div>

            {/* Block Financial Advice */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <div>
                <div style={{ fontSize: '15px', fontWeight: '600', color: '#1F2937', marginBottom: '4px' }}>
                  Block Financial Advice
                </div>
                <div style={{ fontSize: '13px', color: '#6B7280' }}>
                  AI won&apos;t provide investment or financial advice
                </div>
              </div>
              <label style={{ position: 'relative', display: 'inline-block', width: '56px', height: '32px' }}>
                <input
                  type="checkbox"
                  checked={preferences.blockFinancialAdvice}
                  onChange={(e) => handleChange('blockFinancialAdvice', e.target.checked)}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span style={{
                  position: 'absolute',
                  cursor: 'pointer',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: preferences.blockFinancialAdvice ? '#10B981' : '#D1D5DB',
                  borderRadius: '16px',
                  transition: 'all 0.3s'
                }}>
                  <span style={{
                    position: 'absolute',
                    height: '24px',
                    width: '24px',
                    left: preferences.blockFinancialAdvice ? '28px' : '4px',
                    bottom: '4px',
                    background: 'white',
                    borderRadius: '50%',
                    transition: 'all 0.3s'
                  }} />
                </span>
              </label>
            </div>

            {/* Require Explainability */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontSize: '15px', fontWeight: '600', color: '#1F2937', marginBottom: '4px' }}>
                  Require Explainability
                </div>
                <div style={{ fontSize: '13px', color: '#6B7280' }}>
                  Always show &quot;Why this?&quot; reasoning for suggestions
                </div>
              </div>
              <label style={{ position: 'relative', display: 'inline-block', width: '56px', height: '32px' }}>
                <input
                  type="checkbox"
                  checked={preferences.requireExplainability}
                  onChange={(e) => handleChange('requireExplainability', e.target.checked)}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span style={{
                  position: 'absolute',
                  cursor: 'pointer',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: preferences.requireExplainability ? '#10B981' : '#D1D5DB',
                  borderRadius: '16px',
                  transition: 'all 0.3s'
                }}>
                  <span style={{
                    position: 'absolute',
                    height: '24px',
                    width: '24px',
                    left: preferences.requireExplainability ? '28px' : '4px',
                    bottom: '4px',
                    background: 'white',
                    borderRadius: '50%',
                    transition: 'all 0.3s'
                  }} />
                </span>
              </label>
            </div>
          </div>

          {/* Info Box */}
          <div style={{
            background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
            border: '2px solid #BFDBFE',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '24px'
          }}>
            <div style={{
              display: 'flex',
              gap: '12px',
              marginBottom: '12px'
            }}>
              <span style={{ fontSize: '24px' }}>ℹ️</span>
              <div>
                <h4 style={{
                  fontSize: '15px',
                  fontWeight: '700',
                  color: '#1F2937',
                  marginBottom: '8px'
                }}>
                  Your Safety, Your Control
                </h4>
                <p style={{ fontSize: '13px', color: '#4B5563', lineHeight: '1.6', margin: 0 }}>
                  These settings control how AI behaves in SyncScript. We believe in transparency and user control. 
                  Your preferences are stored locally and never shared.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Safety Info */}
          <div style={{
            padding: '20px',
            background: '#F9FAFB',
            borderRadius: '12px',
            marginBottom: '24px'
          }}>
            <h4 style={{
              fontSize: '15px',
              fontWeight: '700',
              color: '#1F2937',
              marginBottom: '12px'
            }}>
              🔒 Always Active:
            </h4>
            <ul style={{ fontSize: '13px', color: '#6B7280', lineHeight: '1.8', margin: 0, paddingLeft: '20px' }}>
              <li>Rate limiting (10 AI requests/minute)</li>
              <li>Automatic content moderation</li>
              <li>Data encryption at rest and in transit</li>
              <li>No AI training on your personal data</li>
              <li>Full audit logs for transparency</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '24px 32px',
          borderTop: '1px solid #E5E7EB',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '12px 24px',
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
          
          <button
            onClick={handleSave}
            disabled={!hasChanges}
            style={{
              padding: '12px 32px',
              background: hasChanges 
                ? 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)'
                : '#E5E7EB',
              color: hasChanges ? 'white' : '#9CA3AF',
              border: 'none',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: hasChanges ? 'pointer' : 'not-allowed',
              boxShadow: hasChanges ? '0 4px 12px rgba(102, 126, 234, 0.3)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            Save Changes
          </button>
        </div>
      </motion.div>
    </div>
  );
}

