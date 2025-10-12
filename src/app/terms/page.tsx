/**
 * Terms of Service Page
 * Legal agreement for using SyncScript
 */

import Link from 'next/link'
import { FileText, AlertCircle, CheckCircle, XCircle, Scale } from 'lucide-react'

export const metadata = {
  title: 'Terms of Service - SyncScript',
  description: 'Legal terms and conditions for using SyncScript',
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <FileText className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Last updated: October 12, 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 prose prose-blue dark:prose-invert max-w-none">
          
          {/* Agreement to Terms */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Scale className="w-6 h-6" />
              1. Agreement to Terms
            </h2>
            <p>
              By accessing or using SyncScript (&quot;the Service&quot;), you agree to be bound by these 
              Terms of Service (&quot;Terms&quot;). If you disagree with any part of these terms, you may not 
              access the Service.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
              <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
                📋 Important: Please read these terms carefully before using SyncScript.
              </p>
            </div>
          </section>

          {/* Use of Service */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Use of the Service</h2>
            
            <h3 className="text-xl font-semibold mb-3">2.1 Eligibility</h3>
            <p>You must be at least 13 years old to use SyncScript. By using the Service, you represent that you meet this requirement.</p>

            <h3 className="text-xl font-semibold mb-3 mt-4">2.2 Account Registration</h3>
            <ul>
              <li>You must provide accurate, current, and complete information</li>
              <li>You are responsible for maintaining the security of your account</li>
              <li>You are responsible for all activities under your account</li>
              <li>You must notify us immediately of any unauthorized use</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-4">2.3 Acceptable Use</h3>
            <p>You agree NOT to:</p>
            <ul>
              <li>Use the Service for any illegal purpose</li>
              <li>Violate any laws in your jurisdiction</li>
              <li>Infringe on intellectual property rights</li>
              <li>Transmit viruses, malware, or harmful code</li>
              <li>Attempt to gain unauthorized access to the Service</li>
              <li>Interfere with or disrupt the Service</li>
              <li>Use the Service to harass, abuse, or harm others</li>
              <li>Scrape or data mine the Service</li>
              <li>Resell or commercialize the Service without permission</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. Intellectual Property</h2>
            
            <h3 className="text-xl font-semibold mb-3">3.1 Our Rights</h3>
            <p>
              The Service and its original content, features, and functionality are owned by SyncScript 
              and are protected by international copyright, trademark, and other intellectual property laws.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-4">3.2 Your Rights</h3>
            <p>You retain all rights to the content you create in SyncScript:</p>
            <ul>
              <li>Your tasks, projects, and notes belong to you</li>
              <li>You can export your data at any time</li>
              <li>You grant us a license to process your data to provide the Service</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-4">3.3 License to Use</h3>
            <p>
              We grant you a limited, non-exclusive, non-transferable license to use the Service for 
              personal or internal business purposes.
            </p>
          </section>

          {/* Payment Terms */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Payment & Billing</h2>
            
            <h3 className="text-xl font-semibold mb-3">4.1 Free Trial</h3>
            <ul>
              <li>14-day free trial for all new users</li>
              <li>No credit card required for trial</li>
              <li>Cancel anytime during trial with no charges</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-4">4.2 Paid Subscriptions</h3>
            <ul>
              <li>Billed monthly or annually based on your selection</li>
              <li>Automatic renewal unless canceled</li>
              <li>Price changes with 30 days notice</li>
              <li>Refunds at our discretion (contact support)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-4">4.3 Cancellation</h3>
            <p>
              You can cancel your subscription at any time. Cancellation takes effect at the end of 
              your current billing period. No partial refunds for unused time.
            </p>
          </section>

          {/* Service Availability */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Service Availability</h2>
            
            <h3 className="text-xl font-semibold mb-3">5.1 Uptime</h3>
            <p>
              We strive for 99.9% uptime but do not guarantee uninterrupted access. The Service may 
              be unavailable due to maintenance, updates, or circumstances beyond our control.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-4">5.2 Modifications</h3>
            <p>We reserve the right to:</p>
            <ul>
              <li>Modify or discontinue features (with notice)</li>
              <li>Update the Service at any time</li>
              <li>Change pricing with 30 days notice</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-4">5.3 Data Backup</h3>
            <p>
              We maintain regular backups, but you are responsible for maintaining your own backup 
              copies of critical data. We recommend regular exports.
            </p>
          </section>

          {/* Disclaimers */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="w-6 h-6" />
              6. Disclaimers & Limitations
            </h2>
            
            <h3 className="text-xl font-semibold mb-3">6.1 No Warranties</h3>
            <p>
              THE SERVICE IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, 
              INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, 
              AND NON-INFRINGEMENT.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-4">6.2 Limitation of Liability</h3>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, SYNCSCRIPT SHALL NOT BE LIABLE FOR ANY INDIRECT, 
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Maximum liability: Amount paid by you in the 12 months prior to the claim.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-4">6.3 AI Features Disclaimer</h3>
            <p>
              AI-powered features (suggestions, predictions, insights) are provided for assistance only. 
              We do not guarantee accuracy. You are responsible for your own decisions.
            </p>
          </section>

          {/* Termination */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">7. Termination</h2>
            
            <h3 className="text-xl font-semibold mb-3">7.1 By You</h3>
            <p>You may terminate your account at any time through Settings → Delete Account.</p>

            <h3 className="text-xl font-semibold mb-3 mt-4">7.2 By Us</h3>
            <p>We may terminate or suspend your account immediately if you:</p>
            <ul>
              <li>Violate these Terms</li>
              <li>Engage in fraudulent activity</li>
              <li>Fail to pay (for paid accounts)</li>
              <li>Cause security or legal risk</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-4">7.3 Effect of Termination</h3>
            <p>Upon termination:</p>
            <ul>
              <li>Your access to the Service ends immediately</li>
              <li>Your data will be deleted within 30 days (see Privacy Policy)</li>
              <li>Some provisions of these Terms survive termination</li>
            </ul>
          </section>

          {/* Governing Law */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">8. Governing Law & Disputes</h2>
            
            <h3 className="text-xl font-semibold mb-3">8.1 Governing Law</h3>
            <p>
              These Terms are governed by the laws of [Your Jurisdiction], without regard to conflict 
              of law provisions.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-4">8.2 Dispute Resolution</h3>
            <p>
              Any disputes will be resolved through binding arbitration, except where prohibited by law. 
              You waive the right to participate in class action lawsuits.
            </p>
          </section>

          {/* Miscellaneous */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">9. Miscellaneous</h2>
            
            <ul>
              <li><strong>Entire Agreement:</strong> These Terms constitute the entire agreement between you and SyncScript</li>
              <li><strong>Severability:</strong> If any provision is found invalid, the rest remains in effect</li>
              <li><strong>No Waiver:</strong> Our failure to enforce any right does not waive that right</li>
              <li><strong>Assignment:</strong> You may not assign these Terms; we may assign to affiliates</li>
              <li><strong>Force Majeure:</strong> We are not liable for delays due to circumstances beyond our control</li>
            </ul>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">10. Questions?</h2>
            <p>
              If you have questions about these Terms, contact us at:
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mt-4">
              <p><strong>Email:</strong> legal@syncscript.app</p>
              <p><strong>Support:</strong> support@syncscript.app</p>
            </div>
          </section>

        </div>

        {/* Acceptance */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-6 text-center">
          <p className="font-semibold mb-2">
            ✅ By using SyncScript, you acknowledge that you have read and agree to these Terms.
          </p>
          <p className="text-sm text-blue-100">
            Last updated: October 12, 2025 • Version 1.0
          </p>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 mx-3">
            Privacy Policy
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

