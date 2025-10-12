/**
 * Help Center / FAQ Page
 * Comprehensive user documentation
 */

import Link from 'next/link'
import { HelpCircle, Zap, Calendar, Target, DollarSign, Users, Settings, Shield } from 'lucide-react'

export const metadata = {
  title: 'Help Center - SyncScript',
  description: 'Get help with SyncScript features and functionality',
}

export default function HelpCenterPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <HelpCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Help Center
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Everything you need to know about SyncScript
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <a href="#getting-started" className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition text-center">
            <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Getting Started</h3>
          </a>
          <a href="#energy-system" className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition text-center">
            <Zap className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Energy System</h3>
          </a>
          <a href="#budget-features" className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition text-center">
            <DollarSign className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Budget Features</h3>
          </a>
          <a href="#account-settings" className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition text-center">
            <Settings className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Account & Settings</h3>
          </a>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-8">
          
          {/* Getting Started */}
          <section id="getting-started" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Getting Started</h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  How do I create my first task?
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Creating a task is easy:
                </p>
                <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>Click the &quot;+ New Task&quot; button in the dashboard</li>
                  <li>Enter a title (required) and optional description</li>
                  <li>Set priority (1-5) and energy requirement (1-5)</li>
                  <li>Add optional due date, duration estimate, and tags</li>
                  <li>Click &quot;Create Task&quot; to save</li>
                </ol>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  What are the different priority levels?
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>⭐ <strong>Priority 1 (Low):</strong> Nice to have, no urgency</li>
                  <li>⭐⭐ <strong>Priority 2 (Medium-Low):</strong> Should do eventually</li>
                  <li>⭐⭐⭐ <strong>Priority 3 (Medium):</strong> Important, reasonable timeline</li>
                  <li>⭐⭐⭐⭐ <strong>Priority 4 (High):</strong> Urgent, needs attention soon</li>
                  <li>⭐⭐⭐⭐⭐ <strong>Priority 5 (Critical):</strong> Drop everything, do now</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  How do I organize tasks into projects?
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Projects help group related tasks:
                </p>
                <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>Click &quot;New Project&quot; in the sidebar</li>
                  <li>Give your project a name and optional description</li>
                  <li>Choose a color to identify it easily</li>
                  <li>When creating tasks, select the project from the dropdown</li>
                </ol>
              </div>
            </div>
          </section>

          {/* Energy System */}
          <section id="energy-system" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-8 h-8 text-green-600" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Energy System</h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  What is the energy system?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  SyncScript&apos;s energy system helps you match tasks to your current energy level. 
                  It recognizes that your energy fluctuates throughout the day, and suggests tasks 
                  that fit your current state. High-energy tasks for when you&apos;re energized, 
                  low-energy tasks for when you&apos;re tired.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  What do the energy levels mean?
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>⚡ <strong>Level 1 (Low):</strong> Drained, need rest - simple tasks only</li>
                  <li>⚡⚡ <strong>Level 2 (Medium-Low):</strong> Below average - routine tasks</li>
                  <li>⚡⚡⚡ <strong>Level 3 (Medium):</strong> Steady, balanced - most tasks</li>
                  <li>⚡⚡⚡⚡ <strong>Level 4 (High):</strong> Above average - challenging work</li>
                  <li>⚡⚡⚡⚡⚡ <strong>Level 5 (Peak):</strong> Maximum energy - hardest tasks</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  How do I update my energy level?
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  You can update your energy in two ways:
                </p>
                <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li><strong>Manual:</strong> Click the energy selector and choose your current level</li>
                  <li><strong>Automatic:</strong> Enable auto-recalibration in settings (learns your patterns)</li>
                </ol>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  What is energy matching?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  When your current energy matches a task&apos;s requirement (±1 level), you&apos;ll see a ⚡ indicator. 
                  Perfect matches get a green highlight. This helps you work with your energy, not against it.
                </p>
              </div>
            </div>
          </section>

          {/* Budget Features */}
          <section id="budget-features" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <DollarSign className="w-8 h-8 text-purple-600" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Budget Features</h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  How do budget categories work?
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Budget categories help you track spending across different areas:
                </p>
                <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>Go to Settings → Budget</li>
                  <li>Add categories (e.g., &quot;Marketing&quot;, &quot;Tools&quot;, &quot;Travel&quot;)</li>
                  <li>Set monthly limits for each category</li>
                  <li>When adding costs to tasks, select the category</li>
                  <li>See real-time budget tracking in your dashboard</li>
                </ol>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  What is Budget Fit Scoring?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Budget Fit shows how well a task fits your budget. It considers:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>🟢 <strong>Green (80-100):</strong> Well within budget</li>
                  <li>🟡 <strong>Yellow (60-79):</strong> Approaching limit</li>
                  <li>🟠 <strong>Orange (40-59):</strong> Getting tight</li>
                  <li>🔴 <strong>Red (0-39):</strong> Over budget or would exceed</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  How do savings goals work?
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Set savings goals to track progress toward financial targets:
                </p>
                <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>Go to Dashboard → Savings Goals</li>
                  <li>Create a goal (e.g., &quot;Emergency Fund: $10,000&quot;)</li>
                  <li>Set target date</li>
                  <li>Track progress as you save</li>
                  <li>See impact of tasks on your savings</li>
                </ol>
              </div>
            </div>
          </section>

          {/* AI & Automation */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">AI & Automation</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  What are Smart Suggestions?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Smart Suggestions analyze your tasks, energy, and patterns to recommend what to work on next. 
                  They consider your current energy, time available, priorities, and historical patterns.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Can I see why a task was suggested?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Yes! Click &quot;Why this task?&quot; on any suggestion to see the AI&apos;s reasoning, including:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>Energy match explanation</li>
                  <li>Priority and urgency factors</li>
                  <li>Pattern analysis (best times for similar tasks)</li>
                  <li>Confidence score</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  How do recurring tasks work?
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Set tasks to repeat automatically:
                </p>
                <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>When creating/editing a task, expand &quot;Recurrence&quot;</li>
                  <li>Choose frequency (daily, weekly, monthly)</li>
                  <li>Set interval (e.g., every 2 weeks)</li>
                  <li>Task auto-creates when completed</li>
                </ol>
              </div>
            </div>
          </section>

          {/* Account & Settings */}
          <section id="account-settings" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Settings className="w-8 h-8 text-orange-600" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Account & Settings</h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  How do I change my theme?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Go to Settings → Appearance → Theme. Choose from Light, Dark, or System (auto-switches based on OS).
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Can I export my data?
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Yes! You own your data and can export it anytime:
                </p>
                <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>Go to Settings → Data & Privacy</li>
                  <li>Click &quot;Export Data&quot;</li>
                  <li>Choose format (JSON or CSV)</li>
                  <li>Download includes all tasks, projects, notes</li>
                </ol>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  How do I delete my account?
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  To permanently delete your account:
                </p>
                <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>Go to Settings → Account</li>
                  <li>Scroll to &quot;Danger Zone&quot;</li>
                  <li>Click &quot;Delete Account&quot;</li>
                  <li>Confirm your decision</li>
                  <li>All data will be deleted within 30 days</li>
                </ol>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  How do I disable analytics?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Go to Settings → Privacy → Toggle &quot;Analytics&quot; off. This disables all usage tracking 
                  while keeping essential cookies for authentication.
                </p>
              </div>
            </div>
          </section>

          {/* Security & Privacy */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-red-600" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Security & Privacy</h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Is my data secure?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Yes! We use industry-standard security:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>🔒 HTTPS encryption for all data transmission</li>
                  <li>🔐 Data encrypted at rest in database</li>
                  <li>🔑 Auth0 authentication (enterprise-grade)</li>
                  <li>🛡️ Regular security audits</li>
                  <li>⚡ Zero known vulnerabilities</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Do you sell my data?
                </h3>
                <p className="text-gray-700 dark:text-gray-300 font-semibold">
                  No, never. We don&apos;t sell your data to anyone, ever.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  Your tasks, notes, and personal information are private. We only use anonymized, 
                  aggregated analytics to improve the product.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Are you GDPR/CCPA compliant?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Yes! We comply with GDPR (EU) and CCPA (California) regulations. You have full control 
                  over your data with rights to access, export, and delete.
                </p>
              </div>
            </div>
          </section>

          {/* Troubleshooting */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Troubleshooting</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Tasks not saving?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">Try these steps:</p>
                <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>Check your internet connection</li>
                  <li>Refresh the page (Cmd/Ctrl + R)</li>
                  <li>Clear browser cache and cookies</li>
                  <li>Try a different browser</li>
                  <li>Contact support if issue persists</li>
                </ol>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Can&apos;t log in?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">Common solutions:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>Verify email/password are correct</li>
                  <li>Check for typos in email address</li>
                  <li>Try &quot;Forgot Password&quot; to reset</li>
                  <li>Clear cookies and try again</li>
                  <li>Disable browser extensions temporarily</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Performance issues?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">To improve performance:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4">
                  <li>Archive completed tasks regularly</li>
                  <li>Close unused browser tabs</li>
                  <li>Disable animations (Settings → Accessibility)</li>
                  <li>Use latest browser version</li>
                  <li>Try incognito/private mode</li>
                </ul>
              </div>
            </div>
          </section>

        </div>

        {/* Contact Support */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
          <p className="mb-6">
            Can&apos;t find what you&apos;re looking for? Our support team is here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:support@syncscript.app"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Email Support
            </a>
            <Link 
              href="/contact"
              className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
            >
              Contact Form
            </Link>
          </div>
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

