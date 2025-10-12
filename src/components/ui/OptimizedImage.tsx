'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  blur?: boolean
  fallback?: string
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  blur = true,
  fallback = '/images/placeholder.png'
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading placeholder */}
      {isLoading && blur && (
        <div className="absolute inset-0 skeleton animate-pulse bg-gray-200 dark:bg-gray-700" />
      )}

      {/* Actual image */}
      {!hasError ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={className}
            priority={priority}
            onLoadingComplete={() => setIsLoading(false)}
            onError={() => {
              setHasError(true)
              setIsLoading(false)
            }}
            style={{ objectFit: 'cover' }}
          />
        </motion.div>
      ) : (
        /* Error fallback */
        <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400">
          <div className="text-center">
            <div className="text-4xl mb-2">🖼️</div>
            <div className="text-sm">Image unavailable</div>
          </div>
        </div>
      )}
    </div>
  )
}

// Avatar with loading state
export function OptimizedAvatar({
  src,
  alt,
  size = 40,
  fallbackText
}: {
  src?: string
  alt: string
  size?: number
  fallbackText?: string
}) {
  const [hasError, setHasError] = useState(false)

  if (!src || hasError) {
    return (
      <div
        className="rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold"
        style={{ width: size, height: size, fontSize: size / 2.5 }}
      >
        {fallbackText || alt.charAt(0).toUpperCase()}
      </div>
    )
  }

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="rounded-full"
        onError={() => setHasError(true)}
      />
    </div>
  )
}

