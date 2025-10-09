import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, ThemeMode, AccentColor, FontSize, Density } from '../../contexts/ThemeContext';

interface ThemeSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const ThemeSettings: React.FC<ThemeSettingsProps> = ({ isOpen, onClose }) => {
  const { theme, setMode, setAccentColor, setFontSize, setDensity, resetTheme } = useTheme();

  const accentColors: { value: AccentColor; label: string; color: string }[] = [
    { value: 'blue', label: 'Blue', color: '#4A90E2' },
    { value: 'green', label: 'Green', color: '#7ED321' },
    { value: 'orange', label: 'Orange', color: '#F5A623' },
    { value: 'purple', label: 'Purple', color: '#8B5CF6' },
    { value: 'pink', label: 'Pink', color: '#EC4899' },
    { value: 'teal', label: 'Teal', color: '#14B8A6' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="theme-settings-modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: '#FFFDF7',
              borderRadius: '16px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              maxWidth: '600px',
              width: '90vw',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 10000,
              border: '1px solid #E5E7EB'
            }}
          >
            {/* Header */}
            <div 
              className="modal-header"
              style={{
                flexShrink: 0,
                padding: '24px 24px 16px',
                marginTop: '6px',
                borderBottom: '1px solid #E5E7EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <h2 
                className="modal-title"
                style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  background: 'linear-gradient(135deg, #4A90E2 0%, #7ED321 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  margin: 0
                }}
              >
                🎨 Theme Settings
              </h2>
              <button 
                className="modal-close-btn" 
                onClick={onClose}
                style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  border: '1px solid #E5E7EB',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  padding: 0
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Content */}
            <div 
              className="modal-content"
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '24px',
                scrollbarWidth: 'thin',
                scrollbarColor: '#D1D5DB transparent'
              }}
            >
              {/* Theme Mode */}
              <div className="theme-section">
                <h3 className="theme-section-title">Mode</h3>
                <div className="theme-options">
                  <button
                    className={`theme-option ${theme.mode === 'light' ? 'active' : ''}`}
                    onClick={() => setMode('light')}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="5"/>
                      <line x1="12" y1="1" x2="12" y2="3"/>
                      <line x1="12" y1="21" x2="12" y2="23"/>
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                      <line x1="1" y1="12" x2="3" y2="12"/>
                      <line x1="21" y1="12" x2="23" y2="12"/>
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                    </svg>
                    <span>Light</span>
                  </button>
                  <button
                    className={`theme-option ${theme.mode === 'dark' ? 'active' : ''}`}
                    onClick={() => setMode('dark')}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                    </svg>
                    <span>Dark</span>
                  </button>
                </div>
              </div>

              {/* Accent Color */}
              <div className="theme-section">
                <h3 className="theme-section-title">Accent Color</h3>
                <div className="color-grid">
                  {accentColors.map((color) => (
                    <button
                      key={color.value}
                      className={`color-option ${theme.accentColor === color.value ? 'active' : ''}`}
                      onClick={() => setAccentColor(color.value)}
                      style={{ background: color.color }}
                      title={color.label}
                    >
                      {theme.accentColor === color.value && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20,6 9,17 4,12"/>
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size */}
              <div className="theme-section">
                <h3 className="theme-section-title">Font Size</h3>
                <div className="theme-options">
                  <button
                    className={`theme-option ${theme.fontSize === 'small' ? 'active' : ''}`}
                    onClick={() => setFontSize('small')}
                  >
                    <span style={{ fontSize: '12px' }}>Aa</span>
                    <span>Small</span>
                  </button>
                  <button
                    className={`theme-option ${theme.fontSize === 'medium' ? 'active' : ''}`}
                    onClick={() => setFontSize('medium')}
                  >
                    <span style={{ fontSize: '16px' }}>Aa</span>
                    <span>Medium</span>
                  </button>
                  <button
                    className={`theme-option ${theme.fontSize === 'large' ? 'active' : ''}`}
                    onClick={() => setFontSize('large')}
                  >
                    <span style={{ fontSize: '20px' }}>Aa</span>
                    <span>Large</span>
                  </button>
                </div>
              </div>

              {/* Density */}
              <div className="theme-section">
                <h3 className="theme-section-title">Layout Density</h3>
                <div className="theme-options">
                  <button
                    className={`theme-option ${theme.density === 'comfortable' ? 'active' : ''}`}
                    onClick={() => setDensity('comfortable')}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <line x1="3" y1="9" x2="21" y2="9"/>
                      <line x1="9" y1="21" x2="9" y2="9"/>
                    </svg>
                    <span>Comfortable</span>
                  </button>
                  <button
                    className={`theme-option ${theme.density === 'compact' ? 'active' : ''}`}
                    onClick={() => setDensity('compact')}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <line x1="3" y1="8" x2="21" y2="8"/>
                      <line x1="3" y1="13" x2="21" y2="13"/>
                      <line x1="3" y1="18" x2="21" y2="18"/>
                    </svg>
                    <span>Compact</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div 
              className="modal-footer"
              style={{
                flexShrink: 0,
                padding: '16px 24px',
                borderTop: '1px solid #E5E7EB',
                background: '#FFFDF7'
              }}
            >
              <div 
                className="theme-actions"
                style={{
                  display: 'flex',
                  gap: '12px',
                  justifyContent: 'flex-end'
                }}
              >
                <button className="btn btn-ghost" onClick={resetTheme}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="1,4 1,10 7,10"/>
                    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
                  </svg>
                  Reset to Default
                </button>
                <button className="btn btn-primary" onClick={onClose}>
                  Done
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ThemeSettings;

