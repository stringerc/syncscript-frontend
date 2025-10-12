/**
 * About Page
 * Learn about SyncScript's mission and story
 */

import Link from 'next/link'
import { Rocket, Target, Users, Heart, Zap, TrendingUp } from 'lucide-react'

export const metadata = {
  title: 'About SyncScript - Our Mission & Story',
  description: 'Learn about SyncScript and our mission to help you work with your energy, not against it',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Rocket className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-6">
            Work With Your Energy,<br />Not Against It
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            SyncScript is a productivity platform that recognizes your energy fluctuates—and helps 
            you match tasks to your current state for maximum effectiveness.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Mission */}
        <section className="mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Traditional productivity tools treat you like a machine—expecting consistent output 
              regardless of how you feel. But humans don&apos;t work that way.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              We built SyncScript on a simple truth: <strong>your energy varies throughout the day, 
              week, and month.</strong> When you&apos;re at peak energy, you can tackle complex problems. 
              When you&apos;re drained, even simple tasks feel overwhelming.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Our mission is to help you <strong>work smarter by working with your natural rhythms</strong>—not 
              fighting against them.
            </p>
          </div>
        </section>

        {/* The Problem */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">The Problem We Solve</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-red-900 dark:text-red-100 mb-3">
                ❌ Traditional Approach
              </h3>
              <ul className="space-y-2 text-red-800 dark:text-red-200">
                <li>• Same expectations every day</li>
                <li>• No consideration for energy</li>
                <li>• Feel guilty when "not productive"</li>
                <li>• Burnout from pushing through</li>
                <li>• One-size-fits-all prioritization</li>
              </ul>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-3">
                ✅ SyncScript Way
              </h3>
              <ul className="space-y-2 text-green-800 dark:text-green-200">
                <li>• Adapts to your energy levels</li>
                <li>• Suggests what matches your state</li>
                <li>• Work with your biology</li>
                <li>• Sustainable productivity</li>
                <li>• Personalized recommendations</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Core Principles */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Our Core Principles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
              <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Energy-First
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Match tasks to your current energy level for natural, sustainable productivity.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
              <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Human-Centered
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Designed for real humans with fluctuating energy, not productivity machines.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
              <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Evidence-Based
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Built on research about circadian rhythms, cognitive load, and energy management.
              </p>
            </div>
          </div>
        </section>

        {/* Features Highlight */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              What Makes Us Different
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">⚡</div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Energy Matching</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    AI suggests tasks that fit your current energy level
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">💰</div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Budget Intelligence</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Track costs and savings goals alongside your tasks
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">🧠</div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">AI Explainability</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Understand why tasks are suggested—full transparency
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">📊</div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Pattern Learning</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Learns your peak times and habits over time
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">🎮</div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Gamification</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Earn points, unlock achievements, build streaks
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-2xl">🔐</div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Privacy-First</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Your data is yours—never sold, always encrypted
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Story */}
        <section className="mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                SyncScript was born from a simple frustration: why do productivity tools expect 
                us to be robots?
              </p>
              <p>
                After years of fighting through low-energy days and feeling guilty about it, 
                we realized the problem wasn&apos;t us—it was the tools. They were designed for 
                consistent output, not human reality.
              </p>
              <p>
                So we built something different. A tool that asks: <em>&quot;What&apos;s your energy 
                like right now?&quot;</em> and then suggests tasks that actually fit.
              </p>
              <p>
                What started as a personal project has grown into a platform used by thousands 
                who are tired of fighting their biology and ready to work <em>with</em> it instead.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                🌟 Sustainability Over Speed
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                We believe in sustainable productivity that doesn&apos;t lead to burnout.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                🔍 Transparency Always
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                AI recommendations explained, pricing clear, data practices open.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                👥 Users First
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Your feedback shapes our roadmap. We build what you need, not what&apos;s trendy.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                🔒 Privacy Non-Negotiable
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Your data is yours. We never sell it, we always encrypt it, you control it.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-8">
            <h2 className="text-3xl font-bold mb-8 text-center">SyncScript by the Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">100+</div>
                <div className="text-blue-100">Features</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">0</div>
                <div className="text-blue-100">Security Vulnerabilities</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">99.9%</div>
                <div className="text-blue-100">Uptime</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-blue-100">Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* Join Us */}
        <section className="mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
            <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Join the Movement
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Thousands of people are already working smarter by syncing with their energy. 
              Ready to join them?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/api/auth/login"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold
                         py-3 px-8 rounded-lg hover:from-blue-700 hover:to-purple-700 transition"
              >
                Start Free Trial
              </Link>
              <Link 
                href="/features"
                className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold
                         py-3 px-8 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                Explore Features
              </Link>
            </div>
          </div>
        </section>

        {/* Footer Links */}
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 mx-3">
            Contact Us
          </Link>
          <Link href="/help" className="hover:text-blue-600 dark:hover:text-blue-400 mx-3">
            Help Center
          </Link>
          <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 mx-3">
            Privacy Policy
          </Link>
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 mx-3">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

