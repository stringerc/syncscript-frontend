/**
 * Changelog Page
 * Track all updates, features, and improvements to SyncScript
 */

import Link from 'next/link'
import { Rocket, Zap, Shield, FileText, Star, TrendingUp } from 'lucide-react'

export const metadata = {
  title: 'Changelog - SyncScript',
  description: 'Track all updates, features, and improvements to SyncScript',
}

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Rocket className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Changelog
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Track every improvement, feature, and fix we ship
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-12">
          
          {/* v1.0.0 - Launch */}
          <div className="relative pl-8 border-l-4 border-blue-600">
            <div className="absolute -left-3 top-0 w-6 h-6 bg-blue-600 rounded-full border-4 border-gray-50 dark:border-gray-900"></div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    v1.0.0 - The Legend Begins 🎉
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    October 12, 2025
                  </p>
                </div>
                <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-full">
                  MAJOR RELEASE
                </span>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4">
                The official launch of SyncScript! After 15+ hours of development, we&apos;re proud to release 
                a production-ready platform with 100 features, legendary quality frameworks, and complete 
                professional infrastructure.
              </p>

              {/* Core Features */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Core Features (100 Total)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 text-sm mb-1">
                      ⚡ Energy System
                    </h4>
                    <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1">
                      <li>• 5-level energy tracking</li>
                      <li>• Energy-based task matching</li>
                      <li>• Auto-recalibration learning</li>
                      <li>• Pattern recognition</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                    <h4 className="font-semibold text-purple-900 dark:text-purple-100 text-sm mb-1">
                      🧠 AI & Automation
                    </h4>
                    <ul className="text-xs text-purple-800 dark:text-purple-200 space-y-1">
                      <li>• Smart task suggestions</li>
                      <li>• AI explainability</li>
                      <li>• Recurring tasks</li>
                      <li>• Smart scheduling</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                    <h4 className="font-semibold text-green-900 dark:text-green-100 text-sm mb-1">
                      💰 Budget Intelligence
                    </h4>
                    <ul className="text-xs text-green-800 dark:text-green-200 space-y-1">
                      <li>• Budget categories</li>
                      <li>• Budget fit scoring</li>
                      <li>• Savings goals</li>
                      <li>• Spending insights</li>
                    </ul>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3">
                    <h4 className="font-semibold text-orange-900 dark:text-orange-100 text-sm mb-1">
                      🎮 Gamification
                    </h4>
                    <ul className="text-xs text-orange-800 dark:text-orange-200 space-y-1">
                      <li>• Points & achievements</li>
                      <li>• Streak tracking</li>
                      <li>• Emblem system</li>
                      <li>• Daily challenges</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Infrastructure */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  Infrastructure & Security
                </h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span><strong>Zero vulnerabilities</strong> - Clean npm audit, all dependencies up-to-date</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span><strong>7 security headers</strong> - CSP, HSTS, XFO, and more</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span><strong>Auth0 authentication</strong> - Enterprise-grade security</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span><strong>End-to-end encryption</strong> - TLS 1.3 + AES-256</span>
                  </li>
                </ul>
              </div>

              {/* Analytics */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                  Analytics & Monitoring
                </h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500">✓</span>
                    <span><strong>Vercel Analytics</strong> - Real-time page views and custom events</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500">✓</span>
                    <span><strong>Core Web Vitals</strong> - LCP, INP, CLS monitoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500">✓</span>
                    <span><strong>8+ custom events</strong> - Task creation, completion, energy updates, AI acceptance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500">✓</span>
                    <span><strong>Error tracking</strong> - JavaScript errors and unhandled rejections</span>
                  </li>
                </ul>
              </div>

              {/* Documentation */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-500" />
                  Documentation & Support
                </h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">✓</span>
                    <span><strong>18 professional documents</strong> - 12,000+ lines of documentation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">✓</span>
                    <span><strong>Legendary audit framework</strong> - Systematic quality gates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">✓</span>
                    <span><strong>Help center</strong> - 30+ FAQs across 8 categories</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">✓</span>
                    <span><strong>Complete legal suite</strong> - Privacy Policy, Terms, Cookie Policy</span>
                  </li>
                </ul>
              </div>

              {/* Pages */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  Pages & Marketing
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded p-2">
                    <span className="text-gray-700 dark:text-gray-300">✓ Homepage</span>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded p-2">
                    <span className="text-gray-700 dark:text-gray-300">✓ Dashboard</span>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded p-2">
                    <span className="text-gray-700 dark:text-gray-300">✓ Features</span>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded p-2">
                    <span className="text-gray-700 dark:text-gray-300">✓ Privacy Policy</span>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded p-2">
                    <span className="text-gray-700 dark:text-gray-300">✓ Terms of Service</span>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded p-2">
                    <span className="text-gray-700 dark:text-gray-300">✓ Cookie Policy</span>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded p-2">
                    <span className="text-gray-700 dark:text-gray-300">✓ Help Center</span>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded p-2">
                    <span className="text-gray-700 dark:text-gray-300">✓ Security</span>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded p-2">
                    <span className="text-gray-700 dark:text-gray-300">✓ Contact</span>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded p-2">
                    <span className="text-gray-700 dark:text-gray-300">✓ About</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-4">
                <h4 className="font-bold mb-2">Launch Stats</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
                  <div>
                    <div className="text-2xl font-bold">100</div>
                    <div className="text-blue-100">Features</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">10</div>
                    <div className="text-blue-100">Pages</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">18</div>
                    <div className="text-blue-100">Documents</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">0</div>
                    <div className="text-blue-100">Vulnerabilities</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Coming Soon */}
          <div className="relative pl-8 border-l-4 border-gray-300 dark:border-gray-700">
            <div className="absolute -left-3 top-0 w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full border-4 border-gray-50 dark:border-gray-900"></div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Coming Soon 🚀
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Based on user feedback and analytics
                  </p>
                </div>
                <span className="px-3 py-1 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-full">
                  ROADMAP
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Backend Integration</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Full database persistence and real-time sync
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Mobile App</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Native iOS and Android applications
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Advanced Integrations</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Connect with your favorite tools (Slack, Calendar, etc.)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Team Features</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Enhanced collaboration and shared workspaces
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Subscribe to Updates */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-6">
            Want to know about new features and updates? Follow our progress!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Subscribe to Updates
            </Link>
            <a 
              href="https://github.com/syncscript"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
            >
              Follow on GitHub
            </a>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <Link href="/features" className="hover:text-blue-600 dark:hover:text-blue-400 mx-3">
            All Features
          </Link>
          <Link href="/help" className="hover:text-blue-600 dark:hover:text-blue-400 mx-3">
            Help Center
          </Link>
          <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 mx-3">
            Contact Us
          </Link>
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 mx-3">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

