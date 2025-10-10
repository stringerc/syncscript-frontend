import React from 'react';
import { motion } from 'framer-motion';

interface DesktopAppPromoProps {
  isOpen: boolean;
  onClose: () => void;
}

const DesktopAppPromo: React.FC<DesktopAppPromoProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="desktop-app-overlay" onClick={onClose}>
      <motion.div
        className="desktop-app-modal"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="desktop-app-content">
          <span className="desktop-icon">💻</span>
          <h2>Desktop App Coming Soon!</h2>
          <p>Native Mac, Windows, and Linux apps in development</p>

          <div className="platforms-grid">
            <div className="platform-card">
              <span className="platform-icon">🍎</span>
              <span>macOS</span>
            </div>
            <div className="platform-card">
              <span className="platform-icon">🪟</span>
              <span>Windows</span>
            </div>
            <div className="platform-card">
              <span className="platform-icon">🐧</span>
              <span>Linux</span>
            </div>
          </div>

          <div className="features-list">
            <h4>Desktop Features:</h4>
            <ul>
              <li>✓ System tray integration</li>
              <li>✓ Global keyboard shortcuts</li>
              <li>✓ Offline-first sync</li>
              <li>✓ Native notifications</li>
              <li>✓ Auto-updates</li>
            </ul>
          </div>

          <button className="btn btn-primary" onClick={onClose}>
            Got It!
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DesktopAppPromo;
