/**
 * Contact Page
 * Get in touch with the SyncScript team
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, MessageCircle, Send, CheckCircle, AlertCircle } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    try {
      // Simulate API call (replace with actual endpoint)
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // In production, send to your backend:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })

      setStatus('success')
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        type: 'general'
      })
    } catch (error) {
      setStatus('error')
      setErrorMessage('Failed to send message. Please try again or email us directly.')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Mail className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Have questions? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Send us a message
            </h2>

            {status === 'success' && (
              <div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-500 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-green-900 dark:text-green-100">
                      Message sent successfully!
                    </h3>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      We&apos;ll get back to you within 24-48 hours.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-500 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-red-900 dark:text-red-100">
                      Failed to send message
                    </h3>
                    <p className="text-sm text-red-700 dark:text-red-300">
                      {errorMessage}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>

              {/* Type */}
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message Type *
                </label>
                <select
                  id="type"
                  name="type"
                  required
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="billing">Billing Question</option>
                  <option value="feature">Feature Request</option>
                  <option value="bug">Bug Report</option>
                  <option value="security">Security Issue</option>
                  <option value="partnership">Partnership/Business</option>
                </select>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="How can we help?"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Tell us more..."
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Please provide as much detail as possible to help us assist you better.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold
                         py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 
                         transition disabled:opacity-50 disabled:cursor-not-allowed
                         flex items-center justify-center gap-2"
              >
                {status === 'sending' ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Email */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Email Us
                </h3>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">General:</p>
                  <a href="mailto:hello@syncscript.app" className="text-blue-600 hover:underline">
                    hello@syncscript.app
                  </a>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Support:</p>
                  <a href="mailto:support@syncscript.app" className="text-blue-600 hover:underline">
                    support@syncscript.app
                  </a>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Security:</p>
                  <a href="mailto:security@syncscript.app" className="text-blue-600 hover:underline">
                    security@syncscript.app
                  </a>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">
                  Fast Response
                </h3>
              </div>
              <p className="text-sm text-green-800 dark:text-green-200">
                We typically respond within 24-48 hours. Security issues are prioritized 
                and addressed within 24 hours.
              </p>
            </div>

            {/* Help Center */}
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <MessageCircle className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100">
                  Self-Service Help
                </h3>
              </div>
              <p className="text-sm text-purple-800 dark:text-purple-200 mb-3">
                Many questions are answered in our Help Center.
              </p>
              <Link 
                href="/help"
                className="text-sm text-purple-600 dark:text-purple-400 hover:underline font-medium"
              >
                Browse Help Center →
              </Link>
            </div>

            {/* Social (optional) */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Connect With Us
              </h3>
              <div className="space-y-3 text-sm">
                <a href="https://twitter.com/syncscript" target="_blank" rel="noopener noreferrer" 
                   className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600">
                  <span>🐦</span> Twitter
                </a>
                <a href="https://github.com/syncscript" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600">
                  <span>💻</span> GitHub
                </a>
                <a href="https://linkedin.com/company/syncscript" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600">
                  <span>💼</span> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-12 text-center text-sm text-gray-600 dark:text-gray-400">
          <Link href="/help" className="hover:text-blue-600 dark:hover:text-blue-400 mx-3">
            Help Center
          </Link>
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

