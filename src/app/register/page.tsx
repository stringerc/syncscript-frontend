/**
 * Register Page
 * Sign up for SyncScript
 */

import Link from 'next/link'

export default function RegisterPage() {
  // In production, redirect to Auth0
  if (typeof window !== 'undefined') {
    window.location.href = '/api/auth/login?screen_hint=signup'
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Start Your Free Trial
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Join thousands using energy-based productivity
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
            <span className="text-green-500">✓</span>
            <span>14-day free trial, no credit card required</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
            <span className="text-green-500">✓</span>
            <span>100+ production features included</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
            <span className="text-green-500">✓</span>
            <span>Cancel anytime, no questions asked</span>
          </div>
        </div>

        <div className="space-y-4">
          <a
            href="/api/auth/login?screen_hint=signup"
            className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-3 px-6 rounded-lg font-semibold hover:shadow-xl transition-shadow"
          >
            Create Free Account
          </a>
          
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
              Sign in
            </Link>
          </div>
          
          <div className="text-center">
            <Link href="/" className="text-sm text-gray-500 dark:text-gray-500 hover:text-blue-600">
              ← Back to home
            </Link>
          </div>
        </div>

        <p className="text-xs text-center text-gray-500 dark:text-gray-500 mt-6">
          By signing up, you agree to our{' '}
          <Link href="/terms" className="hover:underline">Terms</Link>
          {' '}and{' '}
          <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  )
}

