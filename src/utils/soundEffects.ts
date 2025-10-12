/**
 * Sound Effects System
 * Subtle audio feedback for actions
 */

export type SoundType = 
  | 'success' 
  | 'error' 
  | 'warning' 
  | 'click' 
  | 'notification'
  | 'achievement'
  | 'levelUp'
  | 'complete'
  | 'delete'
  | 'send'
  | 'receive'
  | 'pop'
  | 'whoosh'

interface SoundConfig {
  enabled: boolean
  volume: number // 0-1
}

class SoundEffectsManager {
  private enabled: boolean = true
  private volume: number = 0.5
  private audioContext: AudioContext | null = null
  
  constructor() {
    if (typeof window !== 'undefined') {
      // Check user preference for sound
      const stored = localStorage.getItem('sound_effects')
      if (stored) {
        const config: SoundConfig = JSON.parse(stored)
        this.enabled = config.enabled
        this.volume = config.volume
      }
      
      // Initialize Web Audio API
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
        this.audioContext = new AudioContextClass()
      } catch (error) {
        console.warn('Web Audio API not supported')
      }
    }
  }

  play(sound: SoundType): void {
    if (!this.enabled || !this.audioContext) return

    try {
      const frequency = this.getFrequency(sound)
      const duration = this.getDuration(sound)
      
      this.playTone(frequency, duration, this.getWaveType(sound))
    } catch (error) {
      console.error('Error playing sound:', error)
    }
  }

  private playTone(frequency: number, duration: number, type: OscillatorType = 'sine'): void {
    if (!this.audioContext) return

    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    oscillator.type = type
    oscillator.frequency.value = frequency

    // Envelope (attack, sustain, release)
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(this.volume, this.audioContext.currentTime + 0.01) // Attack
    gainNode.gain.linearRampToValueAtTime(this.volume * 0.7, this.audioContext.currentTime + duration * 0.3) // Sustain
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration) // Release

    oscillator.start(this.audioContext.currentTime)
    oscillator.stop(this.audioContext.currentTime + duration)
  }

  private getFrequency(sound: SoundType): number {
    const frequencies: Record<SoundType, number> = {
      success: 880,      // A5 - cheerful
      error: 220,        // A3 - lower, concerning
      warning: 440,      // A4 - middle ground
      click: 1200,       // High, crisp
      notification: 660, // E5 - attention-getting
      achievement: 1320, // E6 - celebratory high
      levelUp: 988,      // B5 - triumphant
      complete: 784,     // G5 - satisfying
      delete: 330,       // E4 - lower confirmation
      send: 988,         // B5 - upward
      receive: 784,      // G5 - downward
      pop: 1760,         // A6 - sharp pop
      whoosh: 440        // A4 - sweep
    }
    return frequencies[sound]
  }

  private getDuration(sound: SoundType): number {
    const durations: Record<SoundType, number> = {
      success: 0.15,
      error: 0.2,
      warning: 0.15,
      click: 0.05,
      notification: 0.2,
      achievement: 0.3,
      levelUp: 0.4,
      complete: 0.2,
      delete: 0.1,
      send: 0.15,
      receive: 0.15,
      pop: 0.08,
      whoosh: 0.25
    }
    return durations[sound]
  }

  private getWaveType(sound: SoundType): OscillatorType {
    // Different wave types for different sounds
    const types: Record<SoundType, OscillatorType> = {
      success: 'sine',
      error: 'square',
      warning: 'triangle',
      click: 'sine',
      notification: 'sine',
      achievement: 'sine',
      levelUp: 'sine',
      complete: 'sine',
      delete: 'triangle',
      send: 'sine',
      receive: 'sine',
      pop: 'square',
      whoosh: 'sawtooth'
    }
    return types[sound]
  }

  enable(): void {
    this.enabled = true
    this.saveConfig()
  }

  disable(): void {
    this.enabled = false
    this.saveConfig()
  }

  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume))
    this.saveConfig()
  }

  getConfig(): SoundConfig {
    return {
      enabled: this.enabled,
      volume: this.volume
    }
  }

  private saveConfig(): void {
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem('sound_effects', JSON.stringify({
        enabled: this.enabled,
        volume: this.volume
      }))
    } catch (error) {
      console.error('Error saving sound config:', error)
    }
  }
}

// Global instance
export const soundEffects = new SoundEffectsManager()

// Convenience methods
export function playSuccess() { soundEffects.play('success') }
export function playError() { soundEffects.play('error') }
export function playWarning() { soundEffects.play('warning') }
export function playClick() { soundEffects.play('click') }
export function playNotification() { soundEffects.play('notification') }
export function playAchievement() { soundEffects.play('achievement') }
export function playLevelUp() { soundEffects.play('levelUp') }
export function playComplete() { soundEffects.play('complete') }
export function playDelete() { soundEffects.play('delete') }
export function playSend() { soundEffects.play('send') }
export function playReceive() { soundEffects.play('receive') }

