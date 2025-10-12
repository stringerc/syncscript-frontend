/**
 * Security Page
 * Details about our security practices and commitment
 */

import Link from 'next/link'
import { Shield, Lock, Key, Eye, AlertTriangle, CheckCircle, Server, FileText } from 'lucide-react'

export const metadata = {
  title: 'Security - SyncScript',
  description: 'How we keep your data safe and secure',
}

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Security at SyncScript
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Your trust is our top priority. Here&apos;s how we protect your data.
          </p>
        </div>

        {/* Security Status Banner */}
        <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <h2 className="text-xl font-bold text-green-900 dark:text-green-100">
                  Zero Known Vulnerabilities
                </h2>
                <p className="text-green-700 dark:text-green-300">
                  Last security audit: October 12, 2025 • All dependencies up-to-date
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">100%</div>
              <div className="text-sm text-green-700 dark:text-green-300">Secure</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 prose prose-blue dark:prose-invert max-w-none">
          
          {/* Our Commitment */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Our Security Commitment</h2>
            <p>
              At SyncScript, security isn&apos;t an afterthought—it&apos;s built into every layer 
              of our platform. We use industry-leading practices to protect your data, maintain 
              privacy, and ensure service reliability.
            </p>
          </section>

          {/* Infrastructure Security */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Server className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold m-0">Infrastructure Security</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  🔒 Encryption Everywhere
                </h3>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li><strong>In Transit:</strong> All data encrypted with TLS 1.3 (HTTPS)</li>
                  <li><strong>At Rest:</strong> Database encryption with AES-256</li>
                  <li><strong>Passwords:</strong> Hashed with bcrypt (never stored in plain text)</li>
                  <li><strong>Sessions:</strong> Encrypted, HTTP-only, secure cookies</li>
                </ul>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
                  🏢 Enterprise-Grade Hosting
                </h3>
                <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
                  <li><strong>Provider:</strong> Vercel (SOC 2 Type II certified)</li>
                  <li><strong>CDN:</strong> Global edge network for performance & security</li>
                  <li><strong>DDoS Protection:</strong> Automatic mitigation at edge</li>
                  <li><strong>Uptime:</strong> 99.99% SLA with automatic failover</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Application Security */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold m-0">Application Security</h2>
            </div>

            <h3 className="text-xl font-semibold mb-3">Security Headers</h3>
            <p>We implement 7 security headers to protect against common attacks:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded p-3">
                <div className="font-mono text-xs text-gray-700 dark:text-gray-300">Content-Security-Policy</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Prevents XSS attacks</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded p-3">
                <div className="font-mono text-xs text-gray-700 dark:text-gray-300">X-Frame-Options</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Prevents clickjacking</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded p-3">
                <div className="font-mono text-xs text-gray-700 dark:text-gray-300">X-Content-Type-Options</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Prevents MIME sniffing</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded p-3">
                <div className="font-mono text-xs text-gray-700 dark:text-gray-300">Strict-Transport-Security</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Forces HTTPS</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded p-3">
                <div className="font-mono text-xs text-gray-700 dark:text-gray-300">Permissions-Policy</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Limits browser features</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded p-3">
                <div className="font-mono text-xs text-gray-700 dark:text-gray-300">Referrer-Policy</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Controls referrer info</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded p-3">
                <div className="font-mono text-xs text-gray-700 dark:text-gray-300">X-DNS-Prefetch-Control</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Prevents DNS leaks</div>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-3 mt-6">Input Validation & Sanitization</h3>
            <ul>
              <li>All user input validated on client and server</li>
              <li>SQL injection prevention through parameterized queries</li>
              <li>XSS prevention through output encoding</li>
              <li>CSRF protection with secure tokens</li>
            </ul>
          </section>

          {/* Authentication */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Key className="w-6 h-6 text-orange-600" />
              <h2 className="text-2xl font-bold m-0">Authentication & Access Control</h2>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-2">
                Powered by Auth0
              </h3>
              <p className="text-sm text-orange-800 dark:text-orange-200 mb-2">
                We use Auth0, an industry-leading identity platform trusted by thousands of companies.
              </p>
              <ul className="text-sm text-orange-700 dark:text-orange-300 space-y-1">
                <li>✅ Multi-factor authentication (MFA) available</li>
                <li>✅ OAuth 2.0 / OpenID Connect standards</li>
                <li>✅ Secure password policies enforced</li>
                <li>✅ Brute force protection built-in</li>
                <li>✅ Session management with automatic expiry</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold mb-3">Role-Based Access Control (RBAC)</h3>
            <ul>
              <li>Users can only access their own data</li>
              <li>Team features have granular permissions</li>
              <li>API keys scoped to specific resources</li>
              <li>Admin actions require additional verification</li>
            </ul>
          </section>

          {/* Data Protection */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-bold m-0">Data Protection & Privacy</h2>
            </div>

            <h3 className="text-xl font-semibold mb-3">What We Collect</h3>
            <ul>
              <li><strong>Account Data:</strong> Email, name (encrypted)</li>
              <li><strong>Usage Data:</strong> Tasks, projects, notes (encrypted)</li>
              <li><strong>Analytics:</strong> Page views, feature usage (anonymized)</li>
              <li><strong>We DON&apos;T collect:</strong> Credit cards, SSN, sensitive personal data</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-4">Data Isolation</h3>
            <ul>
              <li>Each user&apos;s data is logically separated</li>
              <li>Database queries scoped to authenticated user</li>
              <li>No cross-user data access possible</li>
              <li>Regular audits to verify isolation</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-4">Data Retention</h3>
            <ul>
              <li><strong>Active accounts:</strong> Data retained while account active</li>
              <li><strong>Deleted accounts:</strong> Permanent deletion within 30 days</li>
              <li><strong>Backups:</strong> Encrypted, retained for 90 days</li>
              <li><strong>Logs:</strong> Security logs retained for 90 days</li>
            </ul>
          </section>

          {/* Monitoring & Response */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold m-0">Monitoring & Incident Response</h2>
            </div>

            <h3 className="text-xl font-semibold mb-3">24/7 Monitoring</h3>
            <ul>
              <li>Automated security scanning (daily)</li>
              <li>Real-time error tracking and alerting</li>
              <li>Performance monitoring (Core Web Vitals)</li>
              <li>Uptime monitoring with instant alerts</li>
              <li>Suspicious activity detection</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-4">Incident Response Plan</h3>
            <p>If a security incident occurs, we:</p>
            <ol>
              <li>Detect and contain the issue immediately</li>
              <li>Assess impact and affected users</li>
              <li>Notify affected users within 72 hours (GDPR)</li>
              <li>Implement fixes and preventive measures</li>
              <li>Publish transparent post-mortem</li>
            </ol>
          </section>

          {/* Compliance */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-gray-600" />
              <h2 className="text-2xl font-bold m-0">Compliance & Certifications</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">🇪🇺 GDPR Compliant</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Full compliance with EU General Data Protection Regulation
                </p>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">🇺🇸 CCPA Compliant</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  California Consumer Privacy Act requirements met
                </p>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">🔐 SOC 2 Type II</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Infrastructure hosted on SOC 2 certified platform
                </p>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">🛡️ OWASP Top 10</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Protected against all OWASP Top 10 vulnerabilities
                </p>
              </div>
            </div>
          </section>

          {/* Security Best Practices */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Your Security Responsibilities</h2>
            <p>While we handle security at the platform level, you can help by:</p>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 my-4">
              <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                ✅ Best Practices
              </h3>
              <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
                <li>✓ Use a strong, unique password (12+ characters, mixed case, numbers, symbols)</li>
                <li>✓ Enable multi-factor authentication (MFA)</li>
                <li>✓ Keep your email secure (it&apos;s your recovery method)</li>
                <li>✓ Log out on shared/public computers</li>
                <li>✓ Don&apos;t share your password with anyone</li>
                <li>✓ Review active sessions regularly</li>
                <li>✓ Report suspicious activity immediately</li>
              </ul>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-2">
                ⚠️ What NOT to Do
              </h3>
              <ul className="text-sm text-red-800 dark:text-red-200 space-y-1">
                <li>✗ Share your password with others</li>
                <li>✗ Use the same password on multiple sites</li>
                <li>✗ Click suspicious links in emails</li>
                <li>✗ Save password in browser on public computers</li>
                <li>✗ Ignore security warnings</li>
              </ul>
            </div>
          </section>

          {/* Vulnerability Disclosure */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Responsible Disclosure</h2>
            <p>
              We welcome security researchers to report vulnerabilities responsibly. If you discover 
              a security issue:
            </p>
            <ol>
              <li>Email us at <a href="mailto:security@syncscript.app" className="text-blue-600 hover:underline">security@syncscript.app</a></li>
              <li>Provide detailed steps to reproduce</li>
              <li>Give us reasonable time to fix (90 days)</li>
              <li>Don&apos;t publicly disclose until we&apos;ve patched</li>
            </ol>
            <p className="mt-3">
              We&apos;ll acknowledge receipt within 24 hours and keep you updated on our progress.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Bug Bounty:</strong> While we don&apos;t currently offer a formal bug bounty program, 
                we deeply appreciate responsible disclosure and will recognize contributors publicly (with permission).
              </p>
            </div>
          </section>

          {/* Regular Audits */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Regular Security Audits</h2>
            <ul>
              <li><strong>Dependency audits:</strong> Daily automated scans (npm audit)</li>
              <li><strong>Code reviews:</strong> All code changes reviewed before deployment</li>
              <li><strong>Penetration testing:</strong> Quarterly third-party tests</li>
              <li><strong>Compliance audits:</strong> Annual GDPR/CCPA reviews</li>
            </ul>

            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Latest Audit:</strong> October 12, 2025<br/>
                <strong>Result:</strong> Zero critical or high-severity vulnerabilities<br/>
                <strong>Dependencies:</strong> All up-to-date, zero known CVEs
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Questions About Security?</h2>
            <p>We&apos;re transparent about our security practices. Contact us:</p>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mt-4">
              <p className="mb-2"><strong>Security Team:</strong> security@syncscript.app</p>
              <p className="mb-2"><strong>General Support:</strong> support@syncscript.app</p>
              <p className="mb-2"><strong>Privacy Officer:</strong> dpo@syncscript.app</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                Response time: Security issues within 24 hours
              </p>
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

