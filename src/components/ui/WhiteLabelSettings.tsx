import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import '../../styles/WhiteLabelSettings.css';

interface BrandingConfig {
  companyName: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  customDomain: string;
  favicon: string;
  welcomeMessage: string;
}

interface WhiteLabelSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const WhiteLabelSettings: React.FC<WhiteLabelSettingsProps> = ({ isOpen, onClose }) => {
  const [config, setConfig] = useState<BrandingConfig>({
    companyName: 'Your Company',
    logo: '',
    primaryColor: '#3B82F6',
    secondaryColor: '#8B5CF6',
    customDomain: '',
    favicon: '',
    welcomeMessage: 'Welcome to your productivity platform'
  });

  const handleSave = () => {
    // Save white-label configuration
    localStorage.setItem('whiteLabelConfig', JSON.stringify(config));
    toast.success('✅ Branding updated!');
    onClose();
  };

  const handleApplyBranding = () => {
    // Apply branding to document
    document.documentElement.style.setProperty('--primary-color', config.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', config.secondaryColor);
    document.title = config.companyName;
    toast.success('🎨 Branding applied!');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="white-label-overlay" onClick={onClose}>
          <motion.div
            className="white-label-modal"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="white-label-header">
              <div>
                <h2>🏢 White-Label Settings</h2>
                <p>Customize SyncScript with your branding</p>
              </div>
              <button className="close-btn" onClick={onClose}>×</button>
            </div>

            <div className="white-label-content">
              <div className="enterprise-badge">
                <span className="badge-icon">👑</span>
                <span>Enterprise Feature</span>
              </div>

              <div className="config-section">
                <h3>Company Information</h3>
                
                <div className="form-field">
                  <label>Company Name</label>
                  <input
                    type="text"
                    value={config.companyName}
                    onChange={(e) => setConfig({ ...config, companyName: e.target.value })}
                    placeholder="Your Company Name"
                  />
                </div>

                <div className="form-field">
                  <label>Custom Domain</label>
                  <input
                    type="text"
                    value={config.customDomain}
                    onChange={(e) => setConfig({ ...config, customDomain: e.target.value })}
                    placeholder="productivity.yourcompany.com"
                  />
                </div>

                <div className="form-field">
                  <label>Welcome Message</label>
                  <textarea
                    value={config.welcomeMessage}
                    onChange={(e) => setConfig({ ...config, welcomeMessage: e.target.value })}
                    rows={3}
                    placeholder="Welcome message for your users..."
                  />
                </div>
              </div>

              <div className="config-section">
                <h3>Brand Colors</h3>
                
                <div className="colors-grid">
                  <div className="form-field">
                    <label>Primary Color</label>
                    <div className="color-picker">
                      <input
                        type="color"
                        value={config.primaryColor}
                        onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                      />
                      <input
                        type="text"
                        value={config.primaryColor}
                        onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                        placeholder="#3B82F6"
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label>Secondary Color</label>
                    <div className="color-picker">
                      <input
                        type="color"
                        value={config.secondaryColor}
                        onChange={(e) => setConfig({ ...config, secondaryColor: e.target.value })}
                      />
                      <input
                        type="text"
                        value={config.secondaryColor}
                        onChange={(e) => setConfig({ ...config, secondaryColor: e.target.value })}
                        placeholder="#8B5CF6"
                      />
                    </div>
                  </div>
                </div>

                <button className="btn btn-outline" onClick={handleApplyBranding}>
                  👁️ Preview Branding
                </button>
              </div>

              <div className="config-section">
                <h3>Assets</h3>
                <div className="upload-section">
                  <div className="upload-field">
                    <label>Logo</label>
                    <button className="btn btn-outline btn-sm">📤 Upload Logo</button>
                  </div>
                  <div className="upload-field">
                    <label>Favicon</label>
                    <button className="btn btn-outline btn-sm">📤 Upload Favicon</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="white-label-footer">
              <div className="pricing-note">
                💼 White-label available on Enterprise plan
              </div>
              <div className="footer-actions">
                <button className="btn btn-ghost" onClick={onClose}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  💾 Save Configuration
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WhiteLabelSettings;
