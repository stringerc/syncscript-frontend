/**
 * Privacy Policy Page
 * GDPR & CCPA Compliant
 */

import Link from 'next/link'
import { Shield, Lock, Eye, Database, UserX, FileText } from 'lucide-react'

export const metadata = {
  title: 'Privacy Policy - SyncScript',
  description: 'How we collect, use, and protect your data',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Last updated: October 12, 2025
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            We take your privacy seriously. This policy explains how we collect, use, and protect your data.
          </p>
        </div>

        {/* Quick Links */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-8">
          <h2 className="font-bold text-gray-900 dark:text-white mb-4">Quick Links</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <a href="#data-collection" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
              What We Collect
            </a>
            <a href="#data-use" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
              How We Use Data
            </a>
            <a href="#data-sharing" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
              Data Sharing
            </a>
            <a href="#your-rights" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
              Your Rights
            </a>
            <a href="#cookies" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
              Cookies
            </a>
            <a href="#contact" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
              Contact Us
            </a>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 prose prose-blue dark:prose-invert max-w-none">
          
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p>
              SyncScript (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
              when you use our productivity platform.
            </p>
            <p>
              By using SyncScript, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          {/* Data Collection */}
          <section id="data-collection" className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Database className="w-6 h-6" />
              2. Information We Collect
            </h2>
            
            <h3 className="text-xl font-semibold mb-3">2.1 Information You Provide</h3>
            <ul>
              <li><strong>Account Information:</strong> Email, name, password (encrypted)</li>
              <li><strong>Profile Data:</strong> Energy levels, productivity preferences, work patterns</li>
              <li><strong>Task Data:</strong> Tasks, projects, notes, budgets, time estimates</li>
              <li><strong>Team Data:</strong> Team memberships, shared workspaces (if applicable)</li>
              <li><strong>Payment Information:</strong> Processed by our payment provider (not stored by us)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-4">2.2 Information Collected Automatically</h3>
            <ul>
              <li><strong>Usage Data:</strong> Features used, pages viewed, actions taken</li>
              <li><strong>Device Information:</strong> Browser type, OS, device type, screen size</li>
              <li><strong>Performance Data:</strong> Page load times, error rates, Core Web Vitals</li>
              <li><strong>Analytics Data:</strong> Session duration, feature adoption, engagement metrics</li>
              <li><strong>Cookies:</strong> Session cookies, preference cookies, analytics cookies</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-4">2.3 Optional Context Data</h3>
            <ul>
              <li><strong>Location:</strong> City-level only (for weather, traffic) - requires consent</li>
              <li><strong>Calendar:</strong> Events you choose to sync - requires authorization</li>
              <li><strong>Integrations:</strong> Data from connected services (with your permission)</li>
            </ul>
          </section>

          {/* Data Use */}
          <section id="data-use" className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Eye className="w-6 h-6" />
              3. How We Use Your Information
            </h2>
            
            <p>We use your information to:</p>
            <ul>
              <li><strong>Provide the Service:</strong> Enable core functionality, task management, AI features</li>
              <li><strong>Personalization:</strong> Energy-based suggestions, budget recommendations, smart scheduling</li>
              <li><strong>Improve the Service:</strong> Analyze usage, fix bugs, optimize performance</li>
              <li><strong>Communication:</strong> Service updates, feature announcements, support responses</li>
              <li><strong>Security:</strong> Prevent fraud, detect abuse, protect accounts</li>
              <li><strong>Compliance:</strong> Meet legal obligations, enforce terms of service</li>
            </ul>

            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-4">
              <p className="text-sm font-semibold text-green-900 dark:text-green-100">
                ✅ We DO NOT sell your data to third parties
              </p>
              <p className="text-sm text-green-800 dark:text-green-200">
                ✅ We DO NOT use your task content for AI training without consent
              </p>
            </div>
          </section>

          {/* Data Sharing */}
          <section id="data-sharing" className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Information Sharing & Disclosure</h2>
            
            <p>We may share your information with:</p>
            
            <h3 className="text-xl font-semibold mb-3">4.1 Service Providers</h3>
            <ul>
              <li><strong>Authentication:</strong> Auth0 (identity management)</li>
              <li><strong>Hosting:</strong> Vercel (infrastructure)</li>
              <li><strong>Analytics:</strong> Vercel Analytics (usage metrics)</li>
              <li><strong>Payments:</strong> Stripe (payment processing)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-4">4.2 Legal Requirements</h3>
            <p>We may disclose your information if required by law, court order, or government request.</p>

            <h3 className="text-xl font-semibold mb-3 mt-4">4.3 Business Transfers</h3>
            <p>
              If SyncScript is acquired or merged, your information may be transferred to the new entity. 
              We will notify you via email before any transfer.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-4">4.4 With Your Consent</h3>
            <p>We may share data with third parties when you explicitly authorize us to do so.</p>
          </section>

          {/* Data Security */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Lock className="w-6 h-6" />
              5. Data Security
            </h2>
            
            <p>We implement industry-standard security measures:</p>
            <ul>
              <li><strong>Encryption:</strong> Data encrypted in transit (HTTPS/TLS) and at rest</li>
              <li><strong>Authentication:</strong> Secure Auth0 integration with industry best practices</li>
              <li><strong>Access Control:</strong> Role-based permissions, least-privilege principle</li>
              <li><strong>Monitoring:</strong> Continuous security monitoring and incident response</li>
              <li><strong>Audits:</strong> Regular security audits and penetration testing</li>
            </ul>

            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
              While we strive to protect your information, no method of transmission over the internet 
              or electronic storage is 100% secure. We cannot guarantee absolute security.
            </p>
          </section>

          {/* Your Rights */}
          <section id="your-rights" className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <UserX className="w-6 h-6" />
              6. Your Rights & Choices
            </h2>
            
            <h3 className="text-xl font-semibold mb-3">6.1 Access & Portability</h3>
            <p>You have the right to access and export your data at any time.</p>
            <ul>
              <li>View all your data in your account settings</li>
              <li>Export your data in JSON or CSV format</li>
              <li>Request a complete data package (email us)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-4">6.2 Correction & Update</h3>
            <p>You can update your information anytime through your account settings.</p>

            <h3 className="text-xl font-semibold mb-3 mt-4">6.3 Deletion (Right to Be Forgotten)</h3>
            <p>You can delete your account and all associated data:</p>
            <ul>
              <li>Go to Settings → Account → Delete Account</li>
              <li>All data permanently deleted within 30 days</li>
              <li>Some data retained for legal/security purposes (logs, transactions)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-4">6.4 Opt-Out</h3>
            <ul>
              <li><strong>Marketing Emails:</strong> Unsubscribe link in every email</li>
              <li><strong>Analytics:</strong> Disable in Settings → Privacy</li>
              <li><strong>Personalization:</strong> Turn off AI features in Settings</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-4">6.5 California Privacy Rights (CCPA)</h3>
            <p>California residents have additional rights:</p>
            <ul>
              <li>Right to know what data we collect</li>
              <li>Right to request deletion</li>
              <li>Right to opt-out of data sales (we don&apos;t sell data)</li>
              <li>Right to non-discrimination</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-4">6.6 EU Privacy Rights (GDPR)</h3>
            <p>EU residents have additional rights:</p>
            <ul>
              <li>Right to access, rectify, and delete data</li>
              <li>Right to data portability</li>
              <li>Right to restrict or object to processing</li>
              <li>Right to withdraw consent</li>
              <li>Right to lodge a complaint with supervisory authority</li>
            </ul>
          </section>

          {/* Cookies */}
          <section id="cookies" className="mb-8">
            <h2 className="text-2xl font-bold mb-4">7. Cookies & Tracking</h2>
            
            <h3 className="text-xl font-semibold mb-3">7.1 What Cookies We Use</h3>
            <ul>
              <li><strong>Essential Cookies:</strong> Required for authentication and core functionality</li>
              <li><strong>Preference Cookies:</strong> Remember your settings (theme, language)</li>
              <li><strong>Analytics Cookies:</strong> Understand how you use the service</li>
              <li><strong>No Advertising Cookies:</strong> We don&apos;t use tracking for ads</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-4">7.2 Managing Cookies</h3>
            <p>You can control cookies through:</p>
            <ul>
              <li>Your browser settings (block third-party cookies)</li>
              <li>Our cookie preferences center (coming soon)</li>
              <li>Opt-out of analytics in Settings</li>
            </ul>
          </section>

          {/* Data Retention */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Database className="w-6 h-6" />
              8. Data Retention
            </h2>
            
            <ul>
              <li><strong>Active Accounts:</strong> Data retained as long as account is active</li>
              <li><strong>Deleted Accounts:</strong> Data deleted within 30 days of deletion request</li>
              <li><strong>Analytics Data:</strong> Retained for 25 months (regulatory requirement)</li>
              <li><strong>Security Logs:</strong> Retained for 90 days</li>
              <li><strong>Legal Hold:</strong> Some data may be retained longer if legally required</li>
            </ul>
          </section>

          {/* International Transfers */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">9. International Data Transfers</h2>
            <p>
              Your information may be transferred to and maintained on servers located outside your country. 
              By using SyncScript, you consent to such transfers. We ensure appropriate safeguards are in place.
            </p>
          </section>

          {/* Children's Privacy */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">10. Children&apos;s Privacy</h2>
            <p>
              SyncScript is not intended for children under 13 years of age. We do not knowingly collect 
              information from children. If you believe we have collected information from a child, please 
              contact us immediately.
            </p>
          </section>

          {/* Changes to Policy */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by:
            </p>
            <ul>
              <li>Posting the new policy on this page</li>
              <li>Updating the &quot;Last updated&quot; date</li>
              <li>Sending an email notification for material changes</li>
            </ul>
            <p>
              Changes become effective immediately upon posting. Your continued use constitutes acceptance.
            </p>
          </section>

          {/* Contact */}
          <section id="contact" className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6" />
              12. Contact Us
            </h2>
            <p>
              If you have questions about this Privacy Policy or want to exercise your rights, contact us:
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mt-4">
              <p className="mb-2"><strong>Email:</strong> privacy@syncscript.app</p>
              <p className="mb-2"><strong>Mail:</strong> SyncScript Privacy Team, [Your Address]</p>
              <p className="mb-2"><strong>Data Protection Officer:</strong> dpo@syncscript.app</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                We will respond to all requests within 30 days.
              </p>
            </div>
          </section>

          {/* Data Inventory */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">13. Data Inventory</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-2">Data Type</th>
                    <th className="text-left py-2">Purpose</th>
                    <th className="text-left py-2">Legal Basis</th>
                    <th className="text-left py-2">Retention</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-2">Account Info</td>
                    <td className="py-2">Authentication</td>
                    <td className="py-2">Contract</td>
                    <td className="py-2">Until deletion</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-2">Task Data</td>
                    <td className="py-2">Core Service</td>
                    <td className="py-2">Contract</td>
                    <td className="py-2">Until deletion</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-2">Energy Levels</td>
                    <td className="py-2">Personalization</td>
                    <td className="py-2">Consent</td>
                    <td className="py-2">Until deletion</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-2">Usage Analytics</td>
                    <td className="py-2">Product Improvement</td>
                    <td className="py-2">Legitimate Interest</td>
                    <td className="py-2">25 months</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-2">Location (opt-in)</td>
                    <td className="py-2">Weather/Traffic</td>
                    <td className="py-2">Consent</td>
                    <td className="py-2">Session only</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 mx-3">
            Terms of Service
          </Link>
          <Link href="/cookies" className="hover:text-blue-600 dark:hover:text-blue-400 mx-3">
            Cookie Policy
          </Link>
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 mx-3">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

