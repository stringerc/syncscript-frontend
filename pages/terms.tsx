import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Service - SyncScript</title>
        <meta name="description" content="SyncScript Terms of Service" />
      </Head>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <Link href="/" style={{ color: '#4A90E2', textDecoration: 'none', marginBottom: '20px', display: 'inline-block' }}>
          ← Back to SyncScript
        </Link>

        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>Terms of Service</h1>
        <p style={{ color: '#666', marginBottom: '40px' }}>Last updated: October 9, 2025</p>

        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>1. Acceptance of Terms</h2>
          <p style={{ lineHeight: '1.6' }}>
            By accessing and using SyncScript (&ldquo;the Service&rdquo;), you agree to be bound by these Terms of Service. 
            If you do not agree to these terms, please do not use the Service.
          </p>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>2. Description of Service</h2>
          <p style={{ lineHeight: '1.6', marginBottom: '15px' }}>
            SyncScript is an energy-based productivity platform that helps you:
          </p>
          <ul style={{ lineHeight: '1.8', marginLeft: '20px' }}>
            <li>Manage tasks based on your energy levels</li>
            <li>Track productivity patterns and insights</li>
            <li>Collaborate with teams on shared projects</li>
            <li>Integrate with Google Calendar (when authorized)</li>
            <li>Access AI-powered task suggestions</li>
          </ul>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>3. User Accounts</h2>
          <p style={{ lineHeight: '1.6', marginBottom: '15px' }}>
            You are responsible for:
          </p>
          <ul style={{ lineHeight: '1.8', marginLeft: '20px' }}>
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>All activities that occur under your account</li>
            <li>Notifying us immediately of any unauthorized access</li>
            <li>Providing accurate and current information</li>
          </ul>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>4. Google Calendar Integration</h2>
          <p style={{ lineHeight: '1.6', marginBottom: '15px' }}>
            By connecting Google Calendar:
          </p>
          <ul style={{ lineHeight: '1.8', marginLeft: '20px' }}>
            <li>You grant SyncScript read-only access to your calendar events</li>
            <li>We will not modify your Google Calendar without explicit permission</li>
            <li>You can revoke access at any time through your Google Account settings</li>
            <li>Calendar data is used solely to enhance your productivity within SyncScript</li>
          </ul>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>5. Acceptable Use</h2>
          <p style={{ lineHeight: '1.6', marginBottom: '15px' }}>
            You agree NOT to:
          </p>
          <ul style={{ lineHeight: '1.8', marginLeft: '20px' }}>
            <li>Use the Service for any illegal purpose</li>
            <li>Attempt to gain unauthorized access to any part of the Service</li>
            <li>Upload malicious code or viruses</li>
            <li>Harass, abuse, or harm other users</li>
            <li>Scrape or extract data using automated means</li>
            <li>Reverse engineer or decompile the Service</li>
          </ul>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>6. Data Ownership</h2>
          <p style={{ lineHeight: '1.6' }}>
            You retain all rights to your data. We claim no ownership over your tasks, projects, or calendar information. 
            You can export or delete your data at any time.
          </p>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>7. Service Availability</h2>
          <p style={{ lineHeight: '1.6' }}>
            We strive for 99.9% uptime but do not guarantee uninterrupted access. The Service may be temporarily 
            unavailable due to maintenance, updates, or factors beyond our control.
          </p>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>8. Termination</h2>
          <p style={{ lineHeight: '1.6' }}>
            We reserve the right to suspend or terminate accounts that violate these terms. 
            You may terminate your account at any time by contacting us or using the account deletion feature.
          </p>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>9. Limitation of Liability</h2>
          <p style={{ lineHeight: '1.6' }}>
            SyncScript is provided &ldquo;as is&rdquo; without warranties. We are not liable for any damages arising from 
            your use of the Service, including but not limited to data loss, missed deadlines, or productivity impacts.
          </p>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>10. Changes to Terms</h2>
          <p style={{ lineHeight: '1.6' }}>
            We may update these Terms of Service. We&apos;ll notify users of significant changes via email or in-app notification. 
            Continued use after changes constitutes acceptance of new terms.
          </p>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>11. Contact</h2>
          <p style={{ lineHeight: '1.6' }}>
            For questions about these terms, contact us at:{' '}
            <a href="mailto:legal@syncscript.app" style={{ color: '#4A90E2' }}>legal@syncscript.app</a>
          </p>
        </section>

        <hr style={{ margin: '40px 0', borderColor: '#e5e7eb' }} />

        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>
            © 2025 SyncScript. All rights reserved.
          </p>
          <Link href="/privacy" style={{ color: '#4A90E2', marginRight: '20px' }}>Privacy Policy</Link>
          <Link href="/terms" style={{ color: '#4A90E2' }}>Terms of Service</Link>
        </div>
      </div>
    </>
  );
}
