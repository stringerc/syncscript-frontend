/**
 * Privacy Policy Page
 * BLOCKER #9: GDPR/CCPA Compliance
 */

import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: 'var(--space-8) var(--space-4)',
      fontFamily: 'var(--font-sans)',
      lineHeight: 'var(--leading-relaxed)'
    }}>
      <Link href="/" style={{ 
        color: 'var(--color-primary-500)',
        textDecoration: 'none',
        marginBottom: 'var(--space-4)',
        display: 'inline-block'
      }}>
        ← Back to Home
      </Link>
      
      <h1 style={{ fontSize: 'var(--text-4xl)', marginBottom: 'var(--space-4)', fontWeight: 'var(--font-bold)' }}>
        Privacy Policy
      </h1>
      
      <p style={{ color: 'var(--color-neutral-600)', marginBottom: 'var(--space-8)' }}>
        Last updated: October 11, 2025
      </p>

      <section style={{ marginBottom: 'var(--space-6)' }}>
        <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-3)', fontWeight: 'var(--font-semibold)' }}>
          1. Information We Collect
        </h2>
        <p style={{ marginBottom: 'var(--space-3)' }}>
          We collect information that you provide directly to us, including:
        </p>
        <ul style={{ paddingLeft: 'var(--space-6)', marginBottom: 'var(--space-3)' }}>
          <li>Account information (email, name)</li>
          <li>Tasks and projects you create</li>
          <li>Energy levels you log</li>
          <li>Usage patterns and preferences</li>
        </ul>
      </section>

      <section style={{ marginBottom: 'var(--space-6)' }}>
        <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-3)', fontWeight: 'var(--font-semibold)' }}>
          2. How We Use Your Information
        </h2>
        <p style={{ marginBottom: 'var(--space-3)' }}>
          We use your information to:
        </p>
        <ul style={{ paddingLeft: 'var(--space-6)', marginBottom: 'var(--space-3)' }}>
          <li>Provide personalized task recommendations</li>
          <li>Generate AI-powered insights</li>
          <li>Improve our service</li>
          <li>Send you notifications (if enabled)</li>
        </ul>
      </section>

      <section style={{ marginBottom: 'var(--space-6)' }}>
        <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-3)', fontWeight: 'var(--font-semibold)' }}>
          3. Your Rights (GDPR/CCPA)
        </h2>
        <p style={{ marginBottom: 'var(--space-3)' }}>
          You have the right to:
        </p>
        <ul style={{ paddingLeft: 'var(--space-6)', marginBottom: 'var(--space-3)' }}>
          <li><strong>Access your data:</strong> Request a copy of all your data</li>
          <li><strong>Correct your data:</strong> Update inaccurate information</li>
          <li><strong>Delete your data:</strong> Request complete account deletion</li>
          <li><strong>Export your data:</strong> Download your data in JSON format</li>
          <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
        </ul>
      </section>

      <section style={{ marginBottom: 'var(--space-6)' }}>
        <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-3)', fontWeight: 'var(--font-semibold)' }}>
          4. Data Security
        </h2>
        <p style={{ marginBottom: 'var(--space-3)' }}>
          We protect your data with industry-standard security measures:
        </p>
        <ul style={{ paddingLeft: 'var(--space-6)', marginBottom: 'var(--space-3)' }}>
          <li>Encrypted data transmission (HTTPS/TLS)</li>
          <li>Secure authentication (Auth0)</li>
          <li>Regular security audits</li>
          <li>Access controls and logging</li>
        </ul>
      </section>

      <section style={{ marginBottom: 'var(--space-6)' }}>
        <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-3)', fontWeight: 'var(--font-semibold)' }}>
          5. Cookies
        </h2>
        <p style={{ marginBottom: 'var(--space-3)' }}>
          We use cookies for:
        </p>
        <ul style={{ paddingLeft: 'var(--space-6)', marginBottom: 'var(--space-3)' }}>
          <li><strong>Essential:</strong> Authentication and security (required)</li>
          <li><strong>Analytics:</strong> Understanding usage patterns (optional)</li>
          <li><strong>Preferences:</strong> Remembering your settings (optional)</li>
        </ul>
        <p>
          You can manage cookie preferences in your browser settings or in the app Settings.
        </p>
      </section>

      <section style={{ marginBottom: 'var(--space-6)' }}>
        <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-3)', fontWeight: 'var(--font-semibold)' }}>
          6. Contact Us
        </h2>
        <p>
          For privacy concerns or to exercise your rights, contact us at:{' '}
          <a href="mailto:privacy@syncscript.com" style={{ color: 'var(--color-primary-600)' }} rel="noopener noreferrer">
            privacy@syncscript.com
          </a>
        </p>
      </section>

      <div style={{
        background: 'var(--color-neutral-100)',
        padding: 'var(--space-4)',
        borderRadius: 'var(--radius-lg)',
        marginTop: 'var(--space-8)'
      }}>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)' }}>
          This privacy policy is compliant with GDPR (EU) and CCPA (California) regulations.
          Last reviewed: October 11, 2025
        </p>
      </div>
    </div>
  );
}
