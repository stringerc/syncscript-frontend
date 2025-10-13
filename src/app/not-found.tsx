/**
 * 404 Not Found Page
 * Simple static 404 - no dynamic features
 */

import Link from 'next/link'

export default function NotFound() {
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
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
            Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-xl transition-shadow"
          >
            🏠 Go Home
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow"
          >
            ← Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}

