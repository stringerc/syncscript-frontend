/**
 * Login Page
 * Redirects to Auth0 login
 */

import Link from 'next/link'
import { redirect } from 'next/navigation'

export default function LoginPage() {
  // In production, redirect to Auth0
  if (typeof window !== 'undefined') {
    window.location.href = '/api/auth/login'
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Welcome Back
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sign in to access your SyncScript dashboard
          </p>
        </div>

        <div className="space-y-4">
          <a
            href="/api/auth/login"
            className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-3 px-6 rounded-lg font-semibold hover:shadow-xl transition-shadow"
          >
            Sign In with Auth0
          </a>
          
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
              Sign up free
            </Link>
          </div>
          
          <div className="text-center">
            <Link href="/" className="text-sm text-gray-500 dark:text-gray-500 hover:text-blue-600">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

