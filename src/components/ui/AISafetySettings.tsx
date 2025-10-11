/**
 * AI Safety & Preferences Settings
 * 60-DAY ENHANCEMENT #3: AI Safety Controls
 */

import React, { useState } from 'react';

interface AISafetySettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AISafetySettings({ isOpen, onClose }: AISafetySettingsProps) {
  const [aiEnabled, setAiEnabled] = useState(true);
  const [suggestions, setSuggestions] = useState(true);
  const [coaching, setCoaching] = useState(true);
  const [autoSchedule, setAutoSchedule] = useState(false);
  const [frequency, setFrequency] = useState(5);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="ai-safety-title"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 'var(--z-modal)',
        padding: 'var(--space-4)'
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'white',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-6)',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
          <h2 id="ai-safety-title" style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)' }}>
            🤖 AI Safety & Preferences
          </h2>
          <button
            onClick={onClose}
            aria-label="Close AI settings"
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              padding: 'var(--space-2)',
              minWidth: '44px',
              minHeight: '44px'
            }}
          >
            ×
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {/* Master AI Toggle */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={aiEnabled}
                onChange={(e) => setAiEnabled(e.target.checked)}
                style={{ width: '20px', height: '20px' }}
              />
              <div>
                <div style={{ fontWeight: 'var(--font-semibold)' }}>Enable AI Features</div>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)' }}>
                  Turn off all AI-powered suggestions and automation
                </div>
              </div>
            </label>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--color-neutral-200)' }} />

          {/* Individual AI Features */}
          <div style={{ opacity: aiEnabled ? 1 : 0.5, pointerEvents: aiEnabled ? 'auto' : 'none' }}>
            <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-4)' }}>
              AI Feature Controls
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={suggestions}
                  onChange={(e) => setSuggestions(e.target.checked)}
                  style={{ width: '20px', height: '20px' }}
                />
                <span>AI Task Suggestions</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={coaching}
                  onChange={(e) => setCoaching(e.target.checked)}
                  style={{ width: '20px', height: '20px' }}
                />
                <span>AI Coaching Tips</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={autoSchedule}
                  onChange={(e) => setAutoSchedule(e.target.checked)}
                  style={{ width: '20px', height: '20px' }}
                />
                <span>Auto-Scheduling (Experimental)</span>
              </label>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--color-neutral-200)' }} />

          {/* Suggestion Frequency */}
          <div style={{ opacity: aiEnabled && suggestions ? 1 : 0.5, pointerEvents: aiEnabled && suggestions ? 'auto' : 'none' }}>
            <label style={{ display: 'block', marginBottom: 'var(--space-3)' }}>
              <div style={{ fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-2)' }}>
                Daily Suggestion Limit
              </div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', marginBottom: 'var(--space-3)' }}>
                Maximum AI suggestions per day: {frequency}
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={frequency}
                onChange={(e) => setFrequency(parseInt(e.target.value))}
                style={{ width: '100%' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', marginTop: 'var(--space-1)' }}>
                <span>1 (minimal)</span>
                <span>10 (maximum)</span>
              </div>
            </label>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--color-neutral-200)' }} />

          {/* Transparency */}
          <div>
            <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-semibold)', marginBottom: 'var(--space-3)' }}>
              AI Transparency
            </h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', marginBottom: 'var(--space-4)' }}>
              We use AI to analyze your task patterns and energy levels to provide personalized suggestions.
              All AI processing respects your privacy - your data is never shared with third parties.
            </p>
            <button
              style={{
                background: 'var(--color-neutral-100)',
                border: '1px solid var(--color-neutral-300)',
                padding: 'var(--space-3) var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                cursor: 'pointer',
                fontWeight: 'var(--font-medium)',
                width: '100%'
              }}
              onClick={() => {
                if (confirm('This will reset all AI learning and start fresh. Continue?')) {
                  localStorage.removeItem('ai_preferences');
                  alert('AI learning reset successfully!');
                }
              }}
            >
              🔄 Reset AI Learning
            </button>
          </div>

          {/* Save Button */}
          <button
            onClick={() => {
              localStorage.setItem('ai_preferences', JSON.stringify({
                enabled: aiEnabled,
                suggestions,
                coaching,
                autoSchedule,
                frequency
              }));
              alert('AI preferences saved!');
              onClose();
            }}
            style={{
              background: 'var(--color-primary-500)',
              color: 'white',
              padding: '14px 24px',
              borderRadius: 'var(--radius-lg)',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'var(--font-semibold)',
              width: '100%',
              marginTop: 'var(--space-4)'
            }}
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}

