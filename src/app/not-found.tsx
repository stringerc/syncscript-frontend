/**
 * 404 Not Found Page
 * Custom 404 error page
 */

'use client'

import Link from 'next/link'
import { Home, ArrowLeft, Search } from 'lucide-react'
import { Suspense } from 'react'

function NotFoundContent() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-xl transition-shadow"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow"
          >
            <ArrowLeft className="w-5 h-5" />
            Go to Dashboard
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="font-bold text-gray-900 dark:text-white mb-3">
            Popular Pages
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href="/features"
              className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <Search className="w-5 h-5 mx-auto mb-1 text-blue-600 dark:text-blue-400" />
              <div className="text-sm font-medium text-gray-900 dark:text-white">Features</div>
            </Link>
            <Link
              href="/#pricing"
              className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <Search className="w-5 h-5 mx-auto mb-1 text-blue-600 dark:text-blue-400" />
              <div className="text-sm font-medium text-gray-900 dark:text-white">Pricing</div>
            </Link>
            <Link
              href="/dashboard"
              className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <Search className="w-5 h-5 mx-auto mb-1 text-blue-600 dark:text-blue-400" />
              <div className="text-sm font-medium text-gray-900 dark:text-white">Dashboard</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function NotFound() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <NotFoundContent />
    </Suspense>
  )
}

