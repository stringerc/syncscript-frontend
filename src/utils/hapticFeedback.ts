/**
 * Haptic Feedback System
 * Tactile feedback for mobile devices
 */

export type HapticType = 
  | 'light'        // Subtle tap
  | 'medium'       // Standard tap
  | 'heavy'        // Strong tap
  | 'success'      // Success pattern
  | 'warning'      // Warning pattern
  | 'error'        // Error pattern
  | 'selection'    // Selection change
  | 'impact'       // Impact collision

interface HapticConfig {
  enabled: boolean
  intensity: number // 0-1
}

class HapticFeedbackManager {
  private enabled: boolean = true
  private intensity: number = 1.0
  private isSupported: boolean = false

  constructor() {
    if (typeof window !== 'undefined') {
      // Check if Vibration API is supported
      this.isSupported = 'vibrate' in navigator

      // Load user preferences
      const stored = localStorage.getItem('haptic_feedback')
      if (stored) {
        const config: HapticConfig = JSON.parse(stored)
        this.enabled = config.enabled
        this.intensity = config.intensity
      }
    }
  }

  trigger(type: HapticType): void {
    if (!this.enabled || !this.isSupported) return

    const pattern = this.getPattern(type)
    
    try {
      navigator.vibrate(this.scalePattern(pattern))
    } catch (error) {
      console.error('Haptic feedback error:', error)
    }
  }

  private getPattern(type: HapticType): number | number[] {
    const patterns: Record<HapticType, number | number[]> = {
      light: 10,
      medium: 20,
      heavy: 40,
      success: [10, 50, 10, 50, 20],      // Double tap + sustain
      warning: [20, 100, 20],              // Tap, pause, tap
      error: [40, 100, 40, 100, 40],       // Triple strong tap
      selection: 5,                         // Very light
      impact: 30                            // Single strong tap
    }
    return patterns[type]
  }

  private scalePattern(pattern: number | number[]): number | number[] {
    if (typeof pattern === 'number') {
      return Math.round(pattern * this.intensity)
    }
    return pattern.map(duration => Math.round(duration * this.intensity))
  }

  enable(): void {
    this.enabled = true
    this.saveConfig()
  }

  disable(): void {
    this.enabled = false
    this.saveConfig()
  }

  setIntensity(intensity: number): void {
    this.intensity = Math.max(0, Math.min(1, intensity))
    this.saveConfig()
  }

  isHapticSupported(): boolean {
    return this.isSupported
  }

  getConfig(): HapticConfig {
    return {
      enabled: this.enabled,
      intensity: this.intensity
    }
  }

  private saveConfig(): void {
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem('haptic_feedback', JSON.stringify({
        enabled: this.enabled,
        intensity: this.intensity
      }))
    } catch (error) {
      console.error('Error saving haptic config:', error)
    }
  }
}

// Global instance
export const hapticFeedback = new HapticFeedbackManager()

// Convenience methods
export function hapticLight() { hapticFeedback.trigger('light') }
export function hapticMedium() { hapticFeedback.trigger('medium') }
export function hapticHeavy() { hapticFeedback.trigger('heavy') }
export function hapticSuccess() { hapticFeedback.trigger('success') }
export function hapticWarning() { hapticFeedback.trigger('warning') }
export function hapticError() { hapticFeedback.trigger('error') }
export function hapticSelection() { hapticFeedback.trigger('selection') }
export function hapticImpact() { hapticFeedback.trigger('impact') }

// Combined audio + haptic feedback
export async function provideFeedback(type: 'success' | 'error' | 'warning' | 'click'): Promise<void> {
  // Dynamic import to reduce bundle size
  const { soundEffects } = await import('./soundEffects')
  
  // Play sound
  soundEffects.play(type)
  
  // Trigger haptic
  hapticFeedback.trigger(type === 'click' ? 'light' : type)
}

