/**
 * Cookie Policy Page
 * Explains cookie usage in compliance with GDPR/ePrivacy
 */

import Link from 'next/link'
import { Cookie, CheckCircle, XCircle, Settings } from 'lucide-react'

export const metadata = {
  title: 'Cookie Policy - SyncScript',
  description: 'How we use cookies and similar technologies',
}

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Cookie className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Cookie Policy
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Last updated: October 12, 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 prose prose-blue dark:prose-invert max-w-none">
          
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">What Are Cookies?</h2>
            <p>
              Cookies are small text files that are stored on your device when you visit a website. 
              They help websites remember your preferences, understand how you use the site, and 
              improve your experience.
            </p>
            <p>
              SyncScript uses cookies and similar technologies to provide essential functionality, 
              analyze usage, and improve our service.
            </p>
          </section>

          {/* Types of Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Types of Cookies We Use</h2>
            
            {/* Essential Cookies */}
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-2">
                    1. Essential Cookies (Required)
                  </h3>
                  <p className="text-green-800 dark:text-green-200 mb-2">
                    These cookies are necessary for the website to function and cannot be disabled.
                  </p>
                  <ul className="text-sm text-green-700 dark:text-green-300">
                    <li><strong>Authentication:</strong> Keep you logged in (auth0 cookies)</li>
                    <li><strong>Session management:</strong> Remember your session</li>
                    <li><strong>Security:</strong> Protect against CSRF attacks</li>
                    <li><strong>Cookie consent:</strong> Remember your cookie preferences</li>
                  </ul>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-3">
                    <strong>Duration:</strong> Session or 30 days<br/>
                    <strong>Legal Basis:</strong> Contractual necessity
                  </p>
                </div>
              </div>
            </div>

            {/* Preference Cookies */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-4">
              <div className="flex items-start gap-3">
                <Settings className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    2. Preference Cookies (Optional)
                  </h3>
                  <p className="text-blue-800 dark:text-blue-200 mb-2">
                    These cookies remember your choices to provide a personalized experience.
                  </p>
                  <ul className="text-sm text-blue-700 dark:text-blue-300">
                    <li><strong>Theme:</strong> Light/dark mode preference</li>
                    <li><strong>Language:</strong> Your preferred language</li>
                    <li><strong>Energy level:</strong> Your last energy setting</li>
                    <li><strong>Dashboard layout:</strong> Your preferred view</li>
                  </ul>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-3">
                    <strong>Duration:</strong> 1 year<br/>
                    <strong>Legal Basis:</strong> Consent (implied by continued use)
                  </p>
                </div>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6 mb-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-2">
                    3. Analytics Cookies (Optional)
                  </h3>
                  <p className="text-purple-800 dark:text-purple-200 mb-2">
                    These cookies help us understand how you use the service and improve it.
                  </p>
                  <ul className="text-sm text-purple-700 dark:text-purple-300">
                    <li><strong>Vercel Analytics:</strong> Page views, custom events</li>
                    <li><strong>Web Vitals:</strong> Performance metrics (LCP, INP, CLS)</li>
                    <li><strong>User flow:</strong> Navigation patterns</li>
                    <li><strong>Feature usage:</strong> Which features you use</li>
                  </ul>
                  <p className="text-xs text-purple-600 dark:text-purple-400 mt-3">
                    <strong>Duration:</strong> 25 months (regulatory requirement)<br/>
                    <strong>Legal Basis:</strong> Legitimate interest (can opt-out)<br/>
                    <strong>Privacy:</strong> No personal data, anonymized
                  </p>
                </div>
              </div>
            </div>

            {/* No Advertising Cookies */}
            <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <XCircle className="w-6 h-6 text-gray-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    4. Advertising Cookies (We DON&apos;T Use These)
                  </h3>
                  <p className="text-gray-800 dark:text-gray-200 mb-2">
                    ✅ We do NOT use cookies for advertising or tracking you across other websites.
                  </p>
                  <ul className="text-sm text-gray-700 dark:text-gray-300">
                    <li>❌ No third-party ad networks</li>
                    <li>❌ No cross-site tracking</li>
                    <li>❌ No behavioral profiling</li>
                    <li>❌ No data selling to advertisers</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Cookie Table */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Detailed Cookie List</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-2 font-semibold">Cookie Name</th>
                    <th className="text-left py-3 px-2 font-semibold">Purpose</th>
                    <th className="text-left py-3 px-2 font-semibold">Type</th>
                    <th className="text-left py-3 px-2 font-semibold">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-2 font-mono text-xs">auth0.*</td>
                    <td className="py-3 px-2">Authentication & session</td>
                    <td className="py-3 px-2">Essential</td>
                    <td className="py-3 px-2">Session</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-2 font-mono text-xs">_vercel_*</td>
                    <td className="py-3 px-2">Analytics & performance</td>
                    <td className="py-3 px-2">Analytics</td>
                    <td className="py-3 px-2">25 months</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-2 font-mono text-xs">theme</td>
                    <td className="py-3 px-2">Dark/light mode preference</td>
                    <td className="py-3 px-2">Preference</td>
                    <td className="py-3 px-2">1 year</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-2 font-mono text-xs">energy_level</td>
                    <td className="py-3 px-2">Remember energy setting</td>
                    <td className="py-3 px-2">Preference</td>
                    <td className="py-3 px-2">1 day</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <td className="py-3 px-2 font-mono text-xs">cookie_consent</td>
                    <td className="py-3 px-2">Track cookie preferences</td>
                    <td className="py-3 px-2">Essential</td>
                    <td className="py-3 px-2">1 year</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Third-Party Services */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
            
            <p>We use the following third-party services that may set cookies:</p>
            
            <h3 className="text-lg font-semibold mb-2 mt-4">Auth0 (Authentication)</h3>
            <ul>
              <li>Purpose: Secure user authentication</li>
              <li>Cookies: Session cookies, authentication tokens</li>
              <li>Privacy Policy: <a href="https://auth0.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">auth0.com/privacy</a></li>
            </ul>

            <h3 className="text-lg font-semibold mb-2 mt-4">Vercel Analytics</h3>
            <ul>
              <li>Purpose: Website analytics and performance monitoring</li>
              <li>Cookies: Analytics cookies (anonymized)</li>
              <li>Privacy: No personal data collected, GDPR compliant</li>
              <li>Privacy Policy: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">vercel.com/legal/privacy-policy</a></li>
            </ul>
          </section>

          {/* Managing Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Managing Your Cookie Preferences</h2>
            
            <h3 className="text-xl font-semibold mb-3">In SyncScript</h3>
            <ol>
              <li>Go to Settings → Privacy</li>
              <li>Toggle &quot;Analytics Cookies&quot; on/off</li>
              <li>Your preference is saved immediately</li>
            </ol>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Note: Essential cookies cannot be disabled as they&apos;re required for the service to function.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">In Your Browser</h3>
            <p>You can control cookies through your browser settings:</p>
            <ul>
              <li><strong>Chrome:</strong> Settings → Privacy → Cookies</li>
              <li><strong>Firefox:</strong> Settings → Privacy → Cookies and Site Data</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Cookies</li>
              <li><strong>Edge:</strong> Settings → Cookies and site permissions</li>
            </ul>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-4">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                ⚠️ <strong>Warning:</strong> Disabling all cookies will prevent you from using SyncScript, 
                as essential cookies are required for authentication and core functionality.
              </p>
            </div>
          </section>

          {/* Data Protection */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Your Privacy Rights</h2>
            
            <h3 className="text-xl font-semibold mb-3">Under GDPR (EU)</h3>
            <ul>
              <li>Right to access your cookie data</li>
              <li>Right to delete cookie data</li>
              <li>Right to object to analytics cookies</li>
              <li>Right to withdraw consent</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-4">Under CCPA (California)</h3>
            <ul>
              <li>Right to know what cookies are used</li>
              <li>Right to opt-out of analytics</li>
              <li>Right to non-discrimination</li>
            </ul>

            <p className="mt-4">
              To exercise these rights, contact us at <a href="mailto:privacy@syncscript.app" className="text-blue-600 hover:underline">privacy@syncscript.app</a>
            </p>
          </section>

          {/* Local Storage */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Local Storage & Similar Technologies</h2>
            <p>
              In addition to cookies, we use browser local storage to:
            </p>
            <ul>
              <li>Cache your tasks and projects for faster loading</li>
              <li>Remember your dashboard preferences</li>
              <li>Store temporary data while offline</li>
              <li>Save draft tasks before submission</li>
            </ul>
            <p className="mt-3">
              Local storage data stays on your device and is not transmitted to our servers unless 
              you explicitly save or sync your data.
            </p>
          </section>

          {/* Updates */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time. When we do:
            </p>
            <ul>
              <li>We&apos;ll update the &quot;Last updated&quot; date at the top</li>
              <li>We&apos;ll notify you via banner if changes are significant</li>
              <li>Your continued use constitutes acceptance</li>
            </ul>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Questions?</h2>
            <p>
              If you have questions about our cookie usage, contact us:
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mt-4">
              <p><strong>Email:</strong> privacy@syncscript.app</p>
              <p><strong>Data Protection Officer:</strong> dpo@syncscript.app</p>
            </div>
          </section>

        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 mx-3">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 mx-3">
            Terms of Service
          </Link>
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 mx-3">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

