/**
 * Discovery Tip Banner
 * WP-PAR-01: Shows contextual tips to help users discover features
 * 
 * Displays progressive feature discovery tips
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getNextTip,
  dismissTip,
  markFeatureDiscovered,
  DiscoveryTip
} from '../../utils/featureDiscovery';

export default function DiscoveryTipBanner() {
  const [currentTip, setCurrentTip] = useState<DiscoveryTip | null>(null);
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    // Load tip after a short delay
    const timer = setTimeout(() => {
      const tip = getNextTip();
      if (tip) {
        setCurrentTip(tip);
        setShow(true);
      }
    }, 3000); // 3 seconds after load
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleDismiss = () => {
    if (currentTip) {
      dismissTip(currentTip.id);
    }
    setShow(false);
  };
  
  const handleGotIt = () => {
    if (currentTip) {
      markFeatureDiscovered(currentTip.id);
      dismissTip(currentTip.id);
    }
    setShow(false);
  };
  
  if (!currentTip) return null;
  
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            maxWidth: '400px',
            background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 10px 40px rgba(102, 126, 234, 0.4)',
            zIndex: 999,
            color: 'white'
          }}
        >
          {/* Close Button */}
          <button
            onClick={handleDismiss}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'white',
              fontSize: '18px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            ×
          </button>
          
          {/* Icon */}
          <div style={{
            fontSize: '40px',
            marginBottom: '12px',
            textAlign: 'center'
          }}>
            {currentTip.icon}
          </div>
          
          {/* Content */}
          <h3 style={{
            fontSize: '18px',
            fontWeight: '700',
            marginBottom: '8px',
            color: 'white',
            textAlign: 'center'
          }}>
            {currentTip.title}
          </h3>
          
          <p style={{
            fontSize: '14px',
            lineHeight: '1.6',
            marginBottom: '16px',
            opacity: 0.95,
            textAlign: 'center'
          }}>
            {currentTip.description}
          </p>
          
          {/* Action Button */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px'
          }}>
            <button
              onClick={handleGotIt}
              style={{
                padding: '10px 24px',
                background: 'white',
                color: '#667EEA',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
              }}
            >
              Got it! ✨
            </button>
          </div>
          
          {/* Progress Indicator */}
          <div style={{
            marginTop: '16px',
            textAlign: 'center',
            fontSize: '11px',
            opacity: 0.8
          }}>
            💡 Feature Discovery Tip
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

