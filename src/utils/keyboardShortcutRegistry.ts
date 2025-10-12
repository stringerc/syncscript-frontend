/**
 * Keyboard Shortcut Registry (M10)
 * Prevents conflicts with browser defaults
 */

export interface KeyboardShortcut {
  id: string
  key: string
  ctrl?: boolean
  alt?: boolean
  shift?: boolean
  meta?: boolean
  description: string
  action: () => void
  enabled?: boolean
  conflictsWithBrowser?: boolean
}

// Browser shortcuts to avoid (platform-specific)
const BROWSER_SHORTCUTS = {
  // Universal shortcuts
  'ctrl+w': 'Close tab',
  'ctrl+t': 'New tab',
  'ctrl+n': 'New window',
  'ctrl+shift+n': 'New incognito window',
  'ctrl+tab': 'Next tab',
  'ctrl+shift+tab': 'Previous tab',
  'ctrl+r': 'Reload',
  'ctrl+shift+r': 'Hard reload',
  'ctrl+f': 'Find in page',
  'ctrl+p': 'Print',
  'ctrl+s': 'Save page',
  
  // macOS specific (using meta/cmd)
  'meta+w': 'Close tab',
  'meta+t': 'New tab',
  'meta+n': 'New window',
  'meta+shift+n': 'New incognito window',
  'meta+r': 'Reload',
  'meta+f': 'Find',
  'meta+p': 'Print',
  'meta+s': 'Save'
}

export class KeyboardShortcutRegistry {
  private shortcuts: Map<string, KeyboardShortcut> = new Map()
  private conflictWarnings: string[] = []

  register(shortcut: KeyboardShortcut): boolean {
    const key = this.getShortcutKey(shortcut)
    
    // Check for browser conflicts
    if (BROWSER_SHORTCUTS[key as keyof typeof BROWSER_SHORTCUTS]) {
      this.conflictWarnings.push(
        `Shortcut ${key} conflicts with browser action: ${BROWSER_SHORTCUTS[key as keyof typeof BROWSER_SHORTCUTS]}`
      )
      console.warn(`⚠️ Keyboard shortcut conflict detected: ${key}`)
      return false
    }

    // Check for existing shortcuts
    if (this.shortcuts.has(key)) {
      console.warn(`⚠️ Shortcut ${key} is already registered`)
      return false
    }

    this.shortcuts.set(key, shortcut)
    console.log(`⌨️ Registered shortcut: ${key} - ${shortcut.description}`)
    return true
  }

  unregister(shortcutId: string): void {
    for (const [key, shortcut] of this.shortcuts.entries()) {
      if (shortcut.id === shortcutId) {
        this.shortcuts.delete(key)
        break
      }
    }
  }

  handleKeyEvent(event: KeyboardEvent): boolean {
    // Don't trigger in input fields
    const target = event.target as HTMLElement
    if (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.isContentEditable
    ) {
      return false
    }

    const key = this.getEventKey(event)
    const shortcut = this.shortcuts.get(key)

    if (shortcut && shortcut.enabled !== false) {
      event.preventDefault()
      event.stopPropagation()
      shortcut.action()
      return true
    }

    return false
  }

  private getShortcutKey(shortcut: KeyboardShortcut): string {
    const parts: string[] = []
    if (shortcut.ctrl) parts.push('ctrl')
    if (shortcut.alt) parts.push('alt')
    if (shortcut.shift) parts.push('shift')
    if (shortcut.meta) parts.push('meta')
    parts.push(shortcut.key.toLowerCase())
    return parts.join('+')
  }

  private getEventKey(event: KeyboardEvent): string {
    const parts: string[] = []
    if (event.ctrlKey) parts.push('ctrl')
    if (event.altKey) parts.push('alt')
    if (event.shiftKey) parts.push('shift')
    if (event.metaKey) parts.push('meta')
    parts.push(event.key.toLowerCase())
    return parts.join('+')
  }

  getAllShortcuts(): KeyboardShortcut[] {
    return Array.from(this.shortcuts.values())
  }

  getConflicts(): string[] {
    return [...this.conflictWarnings]
  }

  clearConflicts(): void {
    this.conflictWarnings = []
  }
}

// Safe shortcuts that don't conflict with browsers
export const SAFE_SHORTCUTS = {
  // Use Alt/Option key for custom shortcuts
  'alt+n': 'New task',
  'alt+f': 'Filter',
  'alt+s': 'Search',
  'alt+1': 'Priority 1',
  'alt+2': 'Priority 2',
  'alt+3': 'Priority 3',
  
  // Function keys are safe
  'f2': 'Rename',
  'f5': 'Refresh data',
  
  // Single keys (when not in input)
  '?': 'Show shortcuts',
  '/': 'Focus search',
  'escape': 'Close modal',
  
  // Shift combinations
  'shift+enter': 'Quick submit',
  'shift+?': 'Help'
}

export const globalShortcutRegistry = new KeyboardShortcutRegistry()

