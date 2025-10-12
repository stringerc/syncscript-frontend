/**
 * Power User Features
 * Features #46-50: Focus Mode, Quick Capture, Voice Input, Keyboard Shortcuts, Batch Operations
 */

// ===== FEATURE #46: FOCUS MODE =====

export interface FocusModeSettings {
  isActive: boolean
  hideNotifications: boolean
  hideSidebar: boolean
  hideCompletedTasks: boolean
  showOnlyPriority: boolean
  minPriority?: number
  zenMode: boolean // Extra minimal
  backgroundSound?: 'none' | 'rain' | 'cafe' | 'forest' | 'ocean'
  startTime?: Date
}

export class FocusMode {
  private settings: FocusModeSettings = {
    isActive: false,
    hideNotifications: true,
    hideSidebar: true,
    hideCompletedTasks: true,
    showOnlyPriority: false,
    zenMode: false,
    backgroundSound: 'none'
  }
  
  private originalBodyClass: string = ''
  
  activate(customSettings?: Partial<FocusModeSettings>): void {
    this.settings = {
      ...this.settings,
      ...customSettings,
      isActive: true,
      startTime: new Date()
    }
    
    // Apply UI changes
    this.applyFocusStyles()
    
    // Disable notifications
    if (this.settings.hideNotifications) {
      this.disableNotifications()
    }
    
    // Start background sound if selected
    if (this.settings.backgroundSound !== 'none') {
      this.playBackgroundSound(this.settings.backgroundSound!)
    }
    
    console.log('🎯 Focus Mode activated')
    this.saveFocusMode()
  }
  
  deactivate(): void {
    this.settings.isActive = false
    
    // Restore UI
    this.removeFocusStyles()
    
    // Re-enable notifications
    this.enableNotifications()
    
    // Stop background sound
    this.stopBackgroundSound()
    
    console.log('🎯 Focus Mode deactivated')
    this.saveFocusMode()
  }
  
  toggle(): void {
    if (this.settings.isActive) {
      this.deactivate()
    } else {
      this.activate()
    }
  }
  
  getSettings(): FocusModeSettings {
    return { ...this.settings }
  }
  
  updateSettings(updates: Partial<FocusModeSettings>): void {
    this.settings = { ...this.settings, ...updates }
    
    if (this.settings.isActive) {
      this.applyFocusStyles()
    }
    
    this.saveFocusMode()
  }
  
  private applyFocusStyles(): void {
    if (typeof document === 'undefined') return
    
    this.originalBodyClass = document.body.className
    document.body.classList.add('focus-mode')
    
    if (this.settings.zenMode) {
      document.body.classList.add('zen-mode')
    }
    
    // Hide elements based on settings
    if (this.settings.hideSidebar) {
      document.body.classList.add('hide-sidebar')
    }
  }
  
  private removeFocusStyles(): void {
    if (typeof document === 'undefined') return
    
    document.body.classList.remove('focus-mode', 'zen-mode', 'hide-sidebar')
  }
  
  private disableNotifications(): void {
    // Mock implementation - in real app, disable browser notifications
    console.log('🔕 Notifications disabled')
  }
  
  private enableNotifications(): void {
    console.log('🔔 Notifications enabled')
  }
  
  private playBackgroundSound(sound: string): void {
    console.log(`🎵 Playing ${sound} sound`)
    // In real app, would play audio
  }
  
  private stopBackgroundSound(): void {
    console.log('🔇 Background sound stopped')
  }
  
  private saveFocusMode(): void {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.setItem('focus_mode', JSON.stringify(this.settings))
    } catch (error) {
      console.error('Error saving focus mode:', error)
    }
  }
  
  loadFocusMode(): void {
    if (typeof window === 'undefined') return
    
    try {
      const stored = localStorage.getItem('focus_mode')
      if (stored) {
        this.settings = JSON.parse(stored)
        
        // Don't auto-activate on load
        this.settings.isActive = false
      }
    } catch (error) {
      console.error('Error loading focus mode:', error)
    }
  }
}

// ===== FEATURE #47: QUICK CAPTURE =====

export interface QuickCaptureEntry {
  text: string
  timestamp: Date
  processed: boolean
  convertedToTaskId?: string
}

export class QuickCapture {
  private entries: QuickCaptureEntry[] = []
  
  capture(text: string): QuickCaptureEntry {
    const entry: QuickCaptureEntry = {
      text: text.trim(),
      timestamp: new Date(),
      processed: false
    }
    
    this.entries.push(entry)
    this.saveEntries()
    
    console.log(`📝 Quick captured: "${text.substring(0, 30)}..."`)
    return entry
  }
  
  getUnprocessedEntries(): QuickCaptureEntry[] {
    this.loadEntries()
    return this.entries.filter(e => !e.processed)
  }
  
  getAllEntries(): QuickCaptureEntry[] {
    this.loadEntries()
    return [...this.entries]
  }
  
  markAsProcessed(entry: QuickCaptureEntry, taskId?: string): void {
    entry.processed = true
    if (taskId) {
      entry.convertedToTaskId = taskId
    }
    this.saveEntries()
  }
  
  deleteEntry(entry: QuickCaptureEntry): void {
    this.entries = this.entries.filter(e => e !== entry)
    this.saveEntries()
  }
  
  bulkProcess(entries: QuickCaptureEntry[]): void {
    entries.forEach(entry => {
      entry.processed = true
    })
    this.saveEntries()
    console.log(`✅ ${entries.length} quick captures processed`)
  }
  
  private saveEntries(): void {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.setItem('quick_capture', JSON.stringify(this.entries))
    } catch (error) {
      console.error('Error saving quick captures:', error)
    }
  }
  
  private loadEntries(): void {
    if (typeof window === 'undefined') return
    
    try {
      const stored = localStorage.getItem('quick_capture')
      if (stored) {
        this.entries = JSON.parse(stored)
      }
    } catch (error) {
      console.error('Error loading quick captures:', error)
    }
  }
}

// ===== FEATURE #48: VOICE INPUT =====

export class VoiceInput {
  private recognition: any = null
  private isListening: boolean = false
  private onResult?: (transcript: string, isFinal: boolean) => void
  private onError?: (error: string) => void
  
  constructor() {
    if (typeof window !== 'undefined') {
      // @ts-ignore - Web Speech API
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition()
        this.recognition.continuous = true
        this.recognition.interimResults = true
        this.recognition.lang = 'en-US'
        
        this.recognition.onresult = (event: any) => {
          let interimTranscript = ''
          let finalTranscript = ''
          
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript
            
            if (event.results[i].isFinal) {
              finalTranscript += transcript
            } else {
              interimTranscript += transcript
            }
          }
          
          if (this.onResult) {
            if (finalTranscript) {
              this.onResult(finalTranscript, true)
            } else {
              this.onResult(interimTranscript, false)
            }
          }
        }
        
        this.recognition.onerror = (event: any) => {
          console.error('Voice recognition error:', event.error)
          if (this.onError) {
            this.onError(event.error)
          }
          this.isListening = false
        }
        
        this.recognition.onend = () => {
          this.isListening = false
        }
      }
    }
  }
  
  isSupported(): boolean {
    return this.recognition !== null
  }
  
  start(
    onResult: (transcript: string, isFinal: boolean) => void,
    onError?: (error: string) => void
  ): void {
    if (!this.isSupported()) {
      onError?.('Voice input not supported in this browser')
      return
    }
    
    if (this.isListening) return
    
    this.onResult = onResult
    this.onError = onError
    
    try {
      this.recognition.start()
      this.isListening = true
      console.log('🎤 Voice input started')
    } catch (error) {
      console.error('Error starting voice input:', error)
      onError?.('Failed to start voice input')
    }
  }
  
  stop(): void {
    if (!this.isListening) return
    
    try {
      this.recognition.stop()
      this.isListening = false
      console.log('🎤 Voice input stopped')
    } catch (error) {
      console.error('Error stopping voice input:', error)
    }
  }
  
  toggle(
    onResult: (transcript: string, isFinal: boolean) => void,
    onError?: (error: string) => void
  ): void {
    if (this.isListening) {
      this.stop()
    } else {
      this.start(onResult, onError)
    }
  }
  
  isActive(): boolean {
    return this.isListening
  }
}

// ===== FEATURE #49: KEYBOARD SHORTCUTS =====

export interface KeyboardShortcut {
  key: string
  ctrl?: boolean
  alt?: boolean
  shift?: boolean
  meta?: boolean // Command on Mac
  description: string
  action: () => void
}

export const DEFAULT_SHORTCUTS: Omit<KeyboardShortcut, 'action'>[] = [
  { key: 'n', ctrl: true, description: 'New Task' },
  { key: 'f', ctrl: true, description: 'Search' },
  { key: 's', ctrl: true, description: 'Save' },
  { key: 'k', ctrl: true, description: 'Command Palette' },
  { key: '/', ctrl: true, description: 'Toggle Focus Mode' },
  { key: 'q', ctrl: true, description: 'Quick Capture' },
  { key: '1', ctrl: true, description: 'Priority 1 (High)' },
  { key: '2', ctrl: true, description: 'Priority 2' },
  { key: '3', ctrl: true, description: 'Priority 3' },
  { key: '4', ctrl: true, description: 'Priority 4' },
  { key: '5', ctrl: true, description: 'Priority 5 (Low)' },
  { key: 'Escape', description: 'Close Modal/Cancel' },
  { key: 'Enter', ctrl: true, description: 'Confirm/Submit' },
  { key: 'd', ctrl: true, description: 'Toggle Dark Mode' },
  { key: 'p', ctrl: true, shift: true, description: 'Start Pomodoro' },
  { key: 't', ctrl: true, shift: true, description: 'Start Time Tracking' },
  { key: 'a', ctrl: true, description: 'Select All' },
  { key: 'Delete', description: 'Delete Selected' },
]

export class KeyboardShortcutManager {
  private shortcuts: Map<string, KeyboardShortcut> = new Map()
  private isEnabled: boolean = true
  
  register(shortcut: KeyboardShortcut): void {
    const key = this.getShortcutKey(shortcut)
    this.shortcuts.set(key, shortcut)
    console.log(`⌨️ Shortcut registered: ${this.formatShortcut(shortcut)}`)
  }
  
  unregister(shortcut: Omit<KeyboardShortcut, 'action' | 'description'>): void {
    const key = this.getShortcutKey(shortcut)
    this.shortcuts.delete(key)
  }
  
  enable(): void {
    this.isEnabled = true
    console.log('⌨️ Keyboard shortcuts enabled')
  }
  
  disable(): void {
    this.isEnabled = false
    console.log('⌨️ Keyboard shortcuts disabled')
  }
  
  handleKeyDown(event: KeyboardEvent): boolean {
    if (!this.isEnabled) return false
    
    // Don't trigger shortcuts when typing in inputs
    const target = event.target as HTMLElement
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
      return false
    }
    
    const key = this.getEventKey(event)
    const shortcut = this.shortcuts.get(key)
    
    if (shortcut) {
      event.preventDefault()
      shortcut.action()
      return true
    }
    
    return false
  }
  
  getShortcutKey(shortcut: Omit<KeyboardShortcut, 'action' | 'description'>): string {
    const parts: string[] = []
    if (shortcut.ctrl) parts.push('ctrl')
    if (shortcut.alt) parts.push('alt')
    if (shortcut.shift) parts.push('shift')
    if (shortcut.meta) parts.push('meta')
    parts.push(shortcut.key.toLowerCase())
    return parts.join('+')
  }
  
  getEventKey(event: KeyboardEvent): string {
    const parts: string[] = []
    if (event.ctrlKey) parts.push('ctrl')
    if (event.altKey) parts.push('alt')
    if (event.shiftKey) parts.push('shift')
    if (event.metaKey) parts.push('meta')
    parts.push(event.key.toLowerCase())
    return parts.join('+')
  }
  
  formatShortcut(shortcut: Omit<KeyboardShortcut, 'action'>): string {
    const parts: string[] = []
    if (shortcut.meta) parts.push('⌘')
    if (shortcut.ctrl) parts.push('Ctrl')
    if (shortcut.alt) parts.push('Alt')
    if (shortcut.shift) parts.push('⇧')
    parts.push(shortcut.key.toUpperCase())
    return parts.join('+')
  }
  
  getAllShortcuts(): KeyboardShortcut[] {
    return Array.from(this.shortcuts.values())
  }
}

// ===== FEATURE #50: BATCH OPERATIONS =====

export interface BatchOperation {
  type: 'complete' | 'delete' | 'priority' | 'tag' | 'move' | 'schedule'
  itemIds: string[]
  params?: any
}

export class BatchOperations {
  executeOperation(operation: BatchOperation): { success: number; failed: number; errors: string[] } {
    const results = {
      success: 0,
      failed: 0,
      errors: [] as string[]
    }
    
    console.log(`🔄 Executing batch ${operation.type} on ${operation.itemIds.length} items`)
    
    operation.itemIds.forEach(id => {
      try {
        switch (operation.type) {
          case 'complete':
            this.completeItem(id)
            break
          case 'delete':
            this.deleteItem(id)
            break
          case 'priority':
            this.setPriority(id, operation.params.priority)
            break
          case 'tag':
            this.addTag(id, operation.params.tagId)
            break
          case 'move':
            this.moveItem(id, operation.params.destinationId)
            break
          case 'schedule':
            this.scheduleItem(id, operation.params.date)
            break
        }
        results.success++
      } catch (error) {
        results.failed++
        results.errors.push(`Failed to ${operation.type} item ${id}: ${error}`)
      }
    })
    
    console.log(`✅ Batch operation complete: ${results.success} success, ${results.failed} failed`)
    
    return results
  }
  
  private completeItem(id: string): void {
    // Mock implementation
    console.log(`✓ Completed: ${id}`)
  }
  
  private deleteItem(id: string): void {
    console.log(`🗑️ Deleted: ${id}`)
  }
  
  private setPriority(id: string, priority: number): void {
    console.log(`📊 Set priority ${priority}: ${id}`)
  }
  
  private addTag(id: string, tagId: string): void {
    console.log(`🏷️ Tagged: ${id} with ${tagId}`)
  }
  
  private moveItem(id: string, destinationId: string): void {
    console.log(`📁 Moved ${id} to ${destinationId}`)
  }
  
  private scheduleItem(id: string, date: Date): void {
    console.log(`📅 Scheduled ${id} for ${date.toLocaleDateString()}`)
  }
  
  // Multi-select helpers
  selectAll(items: any[]): string[] {
    return items.map(item => item.id)
  }
  
  selectNone(): string[] {
    return []
  }
  
  selectByFilter(items: any[], filterFn: (item: any) => boolean): string[] {
    return items.filter(filterFn).map(item => item.id)
  }
  
  toggleSelection(currentSelection: string[], itemId: string): string[] {
    if (currentSelection.includes(itemId)) {
      return currentSelection.filter(id => id !== itemId)
    } else {
      return [...currentSelection, itemId]
    }
  }
  
  selectRange(items: any[], startIndex: number, endIndex: number): string[] {
    const start = Math.min(startIndex, endIndex)
    const end = Math.max(startIndex, endIndex)
    return items.slice(start, end + 1).map(item => item.id)
  }
}

// Export singleton instances
export const globalFocusMode = new FocusMode()
export const globalQuickCapture = new QuickCapture()
export const globalVoiceInput = new VoiceInput()
export const globalKeyboardManager = new KeyboardShortcutManager()
export const globalBatchOperations = new BatchOperations()

