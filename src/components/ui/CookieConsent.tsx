/**
 * Cookie Consent Banner
 * BLOCKER #9: GDPR/CCPA Compliance
 */

import React, { useState, useEffect } from 'react';

interface CookieConsentProps {
  onAccept: () => void;
  onDecline: () => void;
}

export default function CookieConsent({ onAccept, onDecline }: CookieConsentProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setShow(false);
    onAccept();
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setShow(false);
    onDecline();
  };

  if (!show) return null;

  return (
    <div 
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-description"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'var(--color-neutral-0)',
        borderTop: '2px solid var(--color-neutral-200)',
        padding: 'var(--space-4)',
        boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.1)',
        zIndex: 'var(--z-notification)',
        animation: 'slideUp 300ms var(--ease-out)'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h3 id="cookie-banner-title" style={{ 
          fontSize: 'var(--text-lg)', 
          fontWeight: 'var(--font-semibold)',
          marginBottom: 'var(--space-2)'
        }}>
          🍪 We use cookies
        </h3>
        <p id="cookie-banner-description" style={{ 
          color: 'var(--color-neutral-600)',
          marginBottom: 'var(--space-4)',
          fontSize: 'var(--text-sm)'
        }}>
          We use cookies to improve your experience, analyze site usage, and personalize your productivity insights. 
          You can manage your preferences anytime in Settings.
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          <button
            onClick={handleAccept}
            style={{
              background: 'var(--color-primary-500)',
              color: 'white',
              padding: '12px 24px',
              borderRadius: 'var(--radius-lg)',
              border: 'none',
              fontWeight: 'var(--font-semibold)',
              cursor: 'pointer',
              minHeight: '44px'
            }}
          >
            Accept All
          </button>
          <button
            onClick={handleDecline}
            style={{
              background: 'transparent',
              color: 'var(--color-neutral-700)',
              padding: '12px 24px',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-neutral-300)',
              fontWeight: 'var(--font-medium)',
              cursor: 'pointer',
              minHeight: '44px'
            }}
          >
            Essential Only
          </button>
          <button
            onClick={() => window.open('/privacy', '_blank')}
            style={{
              background: 'transparent',
              color: 'var(--color-primary-600)',
              padding: '12px 24px',
              display: 'flex',
              alignItems: 'center',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'var(--font-medium)'
            }}
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

