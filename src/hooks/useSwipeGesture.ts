/**
 * Swipe Gesture Hook
 * Enables swipe-to-close for mobile menus and modals
 */

import { useEffect, useRef, useState } from 'react'

interface SwipeGestureOptions {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  threshold?: number // Minimum distance for swipe (pixels)
  velocity?: number // Minimum velocity for swipe (pixels/ms)
}

export function useSwipeGesture(options: SwipeGestureOptions) {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    threshold = 50,
    velocity = 0.3
  } = options

  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null)

  const handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0]
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    }
  }

  const handleTouchEnd = (e: TouchEvent) => {
    if (!touchStartRef.current) return

    const touch = e.changedTouches[0]
    const deltaX = touch.clientX - touchStartRef.current.x
    const deltaY = touch.clientY - touchStartRef.current.y
    const deltaTime = Date.now() - touchStartRef.current.time
    const velocityX = Math.abs(deltaX) / deltaTime
    const velocityY = Math.abs(deltaY) / deltaTime

    // Determine swipe direction (prioritize the larger delta)
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (Math.abs(deltaX) >= threshold && velocityX >= velocity) {
        if (deltaX > 0 && onSwipeRight) {
          onSwipeRight()
        } else if (deltaX < 0 && onSwipeLeft) {
          onSwipeLeft()
        }
      }
    } else {
      // Vertical swipe
      if (Math.abs(deltaY) >= threshold && velocityY >= velocity) {
        if (deltaY > 0 && onSwipeDown) {
          onSwipeDown()
        } else if (deltaY < 0 && onSwipeUp) {
          onSwipeUp()
        }
      }
    }

    touchStartRef.current = null
  }

  return {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd
  }
}

// Hook for easier integration with React components
export function useSwipeToClose(onClose: () => void, direction: 'left' | 'right' | 'up' | 'down' = 'right') {
  const handlers = useSwipeGesture({
    onSwipeLeft: direction === 'left' ? onClose : undefined,
    onSwipeRight: direction === 'right' ? onClose : undefined,
    onSwipeUp: direction === 'up' ? onClose : undefined,
    onSwipeDown: direction === 'down' ? onClose : undefined
  })

  return handlers
}

