import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/MobileAppPromo.css';

interface MobileAppPromoProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileAppPromo: React.FC<MobileAppPromoProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="mobile-app-overlay" onClick={onClose}>
      <motion.div
        className="mobile-app-modal"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mobile-app-content">
          <span className="app-icon">📱</span>
          <h2>Mobile App Coming Soon!</h2>
          <p>Native iOS and Android apps are in development</p>

          <div className="features-preview">
            <div className="feature-item">
              <span>✓</span> Push notifications
            </div>
            <div className="feature-item">
              <span>✓</span> Offline mode
            </div>
            <div className="feature-item">
              <span>✓</span> Native widgets
            </div>
            <div className="feature-item">
              <span>✓</span> Voice commands
            </div>
          </div>

          <div className="notify-section">
            <p>Get notified when we launch:</p>
            <div className="notify-form">
              <input type="email" placeholder="your@email.com" />
              <button className="btn btn-primary">Notify Me!</button>
            </div>
          </div>

          <div className="pwa-section">
            <h4>💡 Meanwhile, install our PWA!</h4>
            <p>Add SyncScript to your home screen for a native-like experience</p>
            <button className="btn btn-outline">📲 Install PWA</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MobileAppPromo;
