import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - SyncScript</title>
        <meta name="description" content="SyncScript Privacy Policy" />
      </Head>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <Link href="/" style={{ color: '#4A90E2', textDecoration: 'none', marginBottom: '20px', display: 'inline-block' }}>
          ← Back to SyncScript
        </Link>

        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>Privacy Policy</h1>
        <p style={{ color: '#666', marginBottom: '40px' }}>Last updated: October 9, 2025</p>

        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>1. Information We Collect</h2>
          <p style={{ lineHeight: '1.6', marginBottom: '15px' }}>
            SyncScript collects and processes the following information:
          </p>
          <ul style={{ lineHeight: '1.8', marginLeft: '20px' }}>
            <li><strong>Account Information:</strong> Name, email address from Auth0 authentication</li>
            <li><strong>Productivity Data:</strong> Tasks, projects, energy levels, and completion records</li>
            <li><strong>Calendar Data:</strong> Events from your Google Calendar (when you choose to connect)</li>
            <li><strong>Usage Data:</strong> Feature usage, session duration, and interaction patterns</li>
          </ul>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>2. How We Use Your Information</h2>
          <p style={{ lineHeight: '1.6', marginBottom: '15px' }}>We use your information to:</p>
          <ul style={{ lineHeight: '1.8', marginLeft: '20px' }}>
            <li>Provide and improve SyncScript's productivity features</li>
            <li>Analyze energy patterns and provide intelligent task recommendations</li>
            <li>Sync calendar events with your tasks (only when you authorize)</li>
            <li>Enable team collaboration features</li>
            <li>Send notifications about tasks, deadlines, and achievements</li>
          </ul>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>3. Google Calendar Integration</h2>
          <p style={{ lineHeight: '1.6', marginBottom: '15px' }}>
            When you connect Google Calendar:
          </p>
          <ul style={{ lineHeight: '1.8', marginLeft: '20px' }}>
            <li>We request <strong>read-only access</strong> to your calendar events</li>
            <li>We <strong>never modify</strong> your Google Calendar without explicit permission</li>
            <li>Calendar data is used only to import events as tasks in SyncScript</li>
            <li>You can disconnect at any time, and we'll delete cached calendar data</li>
            <li>We don't share your calendar data with third parties</li>
          </ul>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>4. Data Storage and Security</h2>
          <p style={{ lineHeight: '1.6', marginBottom: '15px' }}>
            Your data is stored securely:
          </p>
          <ul style={{ lineHeight: '1.8', marginLeft: '20px' }}>
            <li><strong>Database:</strong> PostgreSQL hosted on Neon (encrypted at rest)</li>
            <li><strong>Authentication:</strong> Auth0 with industry-standard JWT tokens</li>
            <li><strong>API Communication:</strong> HTTPS encryption for all data transfer</li>
            <li><strong>Access Control:</strong> Role-based permissions for team features</li>
          </ul>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>5. Data Sharing</h2>
          <p style={{ lineHeight: '1.6', marginBottom: '15px' }}>
            We <strong>do not sell</strong> your personal data. We share data only:
          </p>
          <ul style={{ lineHeight: '1.8', marginLeft: '20px' }}>
            <li>With team members when you join a team workspace</li>
            <li>With service providers (Auth0, Neon, Render) to operate the service</li>
            <li>When required by law or to protect our rights</li>
          </ul>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>6. Your Rights</h2>
          <p style={{ lineHeight: '1.6', marginBottom: '15px' }}>You have the right to:</p>
          <ul style={{ lineHeight: '1.8', marginLeft: '20px' }}>
            <li>Access, update, or delete your personal data</li>
            <li>Export your data in a portable format</li>
            <li>Revoke Google Calendar access at any time</li>
            <li>Delete your account and all associated data</li>
            <li>Opt out of non-essential communications</li>
          </ul>
        </section>

        <section style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>7. Contact Us</h2>
          <p style={{ lineHeight: '1.6' }}>
            For privacy concerns or data requests, contact us at:{' '}
            <a href="mailto:privacy@syncscript.app" style={{ color: '#4A90E2' }}>privacy@syncscript.app</a>
          </p>
        </section>

        <hr style={{ margin: '40px 0', borderColor: '#e5e7eb' }} />

        <p style={{ color: '#666', fontSize: '14px', textAlign: 'center' }}>
          © 2025 SyncScript. All rights reserved.
        </p>
      </div>
    </>
  );
}
