'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SmartTooltipProps {
  content: string | React.ReactNode
  children: React.ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right' | 'auto'
  delay?: number
  className?: string
}

export default function SmartTooltip({
  content,
  children,
  position = 'auto',
  delay = 300,
  className = ''
}: SmartTooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [calculatedPosition, setCalculatedPosition] = useState<'top' | 'bottom' | 'left' | 'right'>('top')
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    const padding = 8

    if (position === 'auto') {
      // Smart positioning to avoid viewport edges
      const spaceTop = triggerRect.top
      const spaceBottom = viewportHeight - triggerRect.bottom
      const spaceLeft = triggerRect.left
      const spaceRight = viewportWidth - triggerRect.right

      // Prefer top/bottom over left/right
      if (spaceTop >= tooltipRect.height + padding) {
        setCalculatedPosition('top')
      } else if (spaceBottom >= tooltipRect.height + padding) {
        setCalculatedPosition('bottom')
      } else if (spaceRight >= tooltipRect.width + padding) {
        setCalculatedPosition('right')
      } else if (spaceLeft >= tooltipRect.width + padding) {
        setCalculatedPosition('left')
      } else {
        // Default to top if nothing fits
        setCalculatedPosition('top')
      }
    } else {
      setCalculatedPosition(position)
    }

    // Calculate coordinates
    let x = 0
    let y = 0

    switch (calculatedPosition) {
      case 'top':
        x = triggerRect.left + triggerRect.width / 2
        y = triggerRect.top - padding
        break
      case 'bottom':
        x = triggerRect.left + triggerRect.width / 2
        y = triggerRect.bottom + padding
        break
      case 'left':
        x = triggerRect.left - padding
        y = triggerRect.top + triggerRect.height / 2
        break
      case 'right':
        x = triggerRect.right + padding
        y = triggerRect.top + triggerRect.height / 2
        break
    }

    setCoords({ x, y })
  }

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true)
      setTimeout(calculatePosition, 0)
    }, delay)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setIsVisible(false)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const getTooltipStyle = () => {
    const baseStyle: React.CSSProperties = {
      position: 'fixed',
      zIndex: 1700 // From z-index system
    }

    switch (calculatedPosition) {
      case 'top':
        return {
          ...baseStyle,
          left: `${coords.x}px`,
          top: `${coords.y}px`,
          transform: 'translate(-50%, -100%)'
        }
      case 'bottom':
        return {
          ...baseStyle,
          left: `${coords.x}px`,
          top: `${coords.y}px`,
          transform: 'translate(-50%, 0)'
        }
      case 'left':
        return {
          ...baseStyle,
          left: `${coords.x}px`,
          top: `${coords.y}px`,
          transform: 'translate(-100%, -50%)'
        }
      case 'right':
        return {
          ...baseStyle,
          left: `${coords.x}px`,
          top: `${coords.y}px`,
          transform: 'translate(0, -50%)'
        }
    }
  }

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        className={`inline-block ${className}`}
      >
        {children}
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={tooltipRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={getTooltipStyle()}
            className="tooltip pointer-events-none"
            role="tooltip"
          >
            <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-3 py-2 rounded-lg text-sm font-medium shadow-lg max-w-xs">
              {content}
              {/* Arrow */}
              <div
                className={`absolute w-2 h-2 bg-gray-900 dark:bg-gray-100 transform rotate-45 ${
                  calculatedPosition === 'top' ? 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2' :
                  calculatedPosition === 'bottom' ? 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2' :
                  calculatedPosition === 'left' ? 'right-0 top-1/2 -translate-y-1/2 translate-x-1/2' :
                  'left-0 top-1/2 -translate-y-1/2 -translate-x-1/2'
                }`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

