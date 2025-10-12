/**
 * Productivity Tools
 * Features #41-45: Tagging, Search, Priority Matrix, Time Tracking, Pomodoro
 */

// ===== FEATURE #41: ADVANCED TAGGING =====

export interface Tag {
  id: string
  name: string
  color: string
  category?: string
  usageCount: number
  createdAt: Date
}

export const TAG_COLORS = [
  '#3B82F6', // blue
  '#10B981', // green
  '#F59E0B', // yellow
  '#EF4444', // red
  '#8B5CF6', // purple
  '#EC4899', // pink
  '#14B8A6', // teal
  '#F97316', // orange
]

export function createTag(name: string, color?: string, category?: string): Tag {
  return {
    id: `tag-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    name: name.trim().toLowerCase(),
    color: color || TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)],
    category,
    usageCount: 0,
    createdAt: new Date()
  }
}

export function getAllTags(): Tag[] {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem('tags')
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error loading tags:', error)
    return []
  }
}

export function saveTags(tags: Tag[]): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem('tags', JSON.stringify(tags))
  } catch (error) {
    console.error('Error saving tags:', error)
  }
}

export function addOrGetTag(name: string, color?: string): Tag {
  const tags = getAllTags()
  const normalizedName = name.trim().toLowerCase()
  
  // Check if tag exists
  const existing = tags.find(t => t.name === normalizedName)
  if (existing) {
    existing.usageCount++
    saveTags(tags)
    return existing
  }
  
  // Create new tag
  const newTag = createTag(normalizedName, color)
  tags.push(newTag)
  saveTags(tags)
  
  console.log(`🏷️ Tag created: ${name}`)
  return newTag
}

export function filterTasksByTags(tasks: Array<{tags?: string[]}>, tagIds: string[], matchAll: boolean = false): Array<{tags?: string[]}> {
  if (tagIds.length === 0) return tasks
  
  return tasks.filter(task => {
    if (!task.tags || task.tags.length === 0) return false
    
    if (matchAll) {
      // Must have ALL specified tags
      return tagIds.every(tagId => task.tags!.includes(tagId))
    } else {
      // Must have AT LEAST ONE of the specified tags
      return tagIds.some(tagId => task.tags!.includes(tagId))
    }
  })
}

export function getTagStatistics(): {
  total: number
  mostUsed: Tag[]
  byCategory: Record<string, number>
} {
  const tags = getAllTags()
  
  const byCategory: Record<string, number> = {}
  tags.forEach(tag => {
    const cat = tag.category || 'uncategorized'
    byCategory[cat] = (byCategory[cat] || 0) + 1
  })
  
  const mostUsed = [...tags]
    .sort((a, b) => b.usageCount - a.usageCount)
    .slice(0, 10)
  
  return {
    total: tags.length,
    mostUsed,
    byCategory
  }
}

// ===== FEATURE #42: FULL-TEXT SEARCH =====

export interface SearchResult {
  type: 'task' | 'project' | 'note' | 'goal'
  id: string
  title: string
  snippet: string
  score: number
  matches: string[]
}

export function searchAll(query: string, items: Array<{id: string; title?: string; description?: string; notes?: string; tags?: string[]; type?: string}>): SearchResult[] {
  if (!query || query.trim().length === 0) return []
  
  const terms = query.toLowerCase().split(' ').filter(t => t.length > 0)
  const results: SearchResult[] = []
  
  items.forEach(item => {
    const searchableText = `
      ${item.title || ''} 
      ${item.description || ''} 
      ${item.notes || ''} 
      ${(item.tags || []).join(' ')}
    `.toLowerCase()
    
    let score = 0
    const matches: string[] = []
    
    // Calculate relevance score
    terms.forEach(term => {
      // Exact title match: high score
      if ((item.title || '').toLowerCase().includes(term)) {
        score += 10
        matches.push('title')
      }
      
      // Description match: medium score
      if ((item.description || '').toLowerCase().includes(term)) {
        score += 5
        matches.push('description')
      }
      
      // Tag match: medium-high score
      if ((item.tags || []).some((tag: string) => tag.toLowerCase().includes(term))) {
        score += 7
        matches.push('tags')
      }
      
      // Content match: lower score
      if (searchableText.includes(term)) {
        score += 2
      }
    })
    
    if (score > 0) {
      // Generate snippet
      const snippet = generateSnippet(item, query)
      
      results.push({
        type: item.type || 'task',
        id: item.id,
        title: item.title || 'Untitled',
        snippet,
        score,
        matches: [...new Set(matches)]
      })
    }
  })
  
  return results.sort((a, b) => b.score - a.score)
}

function generateSnippet(item: {description?: string; notes?: string}, query: string): string {
  const text = item.description || item.notes || ''
  if (!text) return ''
  
  const lowerText = text.toLowerCase()
  const lowerQuery = query.toLowerCase()
  
  // Find position of query in text
  const index = lowerText.indexOf(lowerQuery)
  
  if (index === -1) {
    // Query not found, return first 100 chars
    return text.substring(0, 100) + (text.length > 100 ? '...' : '')
  }
  
  // Return text around the match
  const start = Math.max(0, index - 40)
  const end = Math.min(text.length, index + query.length + 60)
  
  let snippet = text.substring(start, end)
  if (start > 0) snippet = '...' + snippet
  if (end < text.length) snippet = snippet + '...'
  
  return snippet
}

export function highlightSearchTerms(text: string, query: string): string {
  if (!query) return text
  
  const terms = query.split(' ').filter(t => t.length > 0)
  let result = text
  
  terms.forEach(term => {
    const regex = new RegExp(`(${term})`, 'gi')
    result = result.replace(regex, '<mark>$1</mark>')
  })
  
  return result
}

// ===== FEATURE #43: PRIORITY MATRIX (Eisenhower Matrix) =====

export type MatrixQuadrant = 'urgent-important' | 'not-urgent-important' | 'urgent-not-important' | 'not-urgent-not-important'

export interface MatrixTask {
  id: string
  title: string
  quadrant: MatrixQuadrant
  isUrgent: boolean
  isImportant: boolean
}

export function categorizeTaskInMatrix(isUrgent: boolean, isImportant: boolean): {
  quadrant: MatrixQuadrant
  action: string
  color: string
  icon: string
} {
  if (isUrgent && isImportant) {
    return {
      quadrant: 'urgent-important',
      action: 'Do First - Crisis/Deadlines',
      color: '#EF4444', // red
      icon: '🔥'
    }
  }
  
  if (!isUrgent && isImportant) {
    return {
      quadrant: 'not-urgent-important',
      action: 'Schedule - Goals/Planning',
      color: '#3B82F6', // blue
      icon: '⭐'
    }
  }
  
  if (isUrgent && !isImportant) {
    return {
      quadrant: 'urgent-not-important',
      action: 'Delegate - Interruptions',
      color: '#F59E0B', // yellow
      icon: '👥'
    }
  }
  
  return {
    quadrant: 'not-urgent-not-important',
    action: 'Eliminate - Distractions',
    color: '#9CA3AF', // gray
    icon: '🗑️'
  }
}

export function organizeTasksInMatrix<T extends {isUrgent?: boolean; isImportant?: boolean}>(tasks: T[]): Record<MatrixQuadrant, T[]> {
  const matrix: Record<MatrixQuadrant, T[]> = {
    'urgent-important': [],
    'not-urgent-important': [],
    'urgent-not-important': [],
    'not-urgent-not-important': []
  }
  
  tasks.forEach(task => {
    const { quadrant } = categorizeTaskInMatrix(task.isUrgent || false, task.isImportant || false)
    matrix[quadrant].push(task)
  })
  
  return matrix
}

// ===== FEATURE #44: TIME TRACKING =====

export interface TimeEntry {
  id: string
  taskId: string
  startTime: Date
  endTime?: Date
  duration: number // seconds
  isRunning: boolean
  notes?: string
}

export class TimeTracker {
  private currentEntry: TimeEntry | null = null
  private interval: NodeJS.Timeout | null = null
  
  start(taskId: string, notes?: string): TimeEntry {
    if (this.currentEntry && this.currentEntry.isRunning) {
      this.stop()
    }
    
    this.currentEntry = {
      id: `time-${Date.now()}`,
      taskId,
      startTime: new Date(),
      duration: 0,
      isRunning: true,
      notes
    }
    
    // Update duration every second
    this.interval = setInterval(() => {
      if (this.currentEntry) {
        this.currentEntry.duration = Math.floor(
          (new Date().getTime() - this.currentEntry.startTime.getTime()) / 1000
        )
      }
    }, 1000)
    
    console.log(`⏱️ Time tracking started for task: ${taskId}`)
    return this.currentEntry
  }
  
  stop(): TimeEntry | null {
    if (!this.currentEntry || !this.currentEntry.isRunning) return null
    
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
    
    this.currentEntry.endTime = new Date()
    this.currentEntry.isRunning = false
    this.currentEntry.duration = Math.floor(
      (this.currentEntry.endTime.getTime() - this.currentEntry.startTime.getTime()) / 1000
    )
    
    // Save to history
    this.saveEntry(this.currentEntry)
    
    console.log(`⏱️ Time tracking stopped. Duration: ${this.formatDuration(this.currentEntry.duration)}`)
    
    const entry = this.currentEntry
    this.currentEntry = null
    return entry
  }
  
  getCurrentEntry(): TimeEntry | null {
    return this.currentEntry
  }
  
  formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`
    } else {
      return `${secs}s`
    }
  }
  
  private saveEntry(entry: TimeEntry): void {
    if (typeof window === 'undefined') return
    
    try {
      const history = this.getHistory()
      history.push(entry)
      localStorage.setItem('time_tracking_history', JSON.stringify(history))
    } catch (error) {
      console.error('Error saving time entry:', error)
    }
  }
  
  getHistory(): TimeEntry[] {
    if (typeof window === 'undefined') return []
    
    try {
      const stored = localStorage.getItem('time_tracking_history')
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Error loading time history:', error)
      return []
    }
  }
  
  getTotalTimeForTask(taskId: string): number {
    const history = this.getHistory()
    return history
      .filter(entry => entry.taskId === taskId)
      .reduce((total, entry) => total + entry.duration, 0)
  }
}

// ===== FEATURE #45: POMODORO TIMER =====

export type PomodoroPhase = 'work' | 'short-break' | 'long-break'

export interface PomodoroSettings {
  workDuration: number // minutes
  shortBreakDuration: number // minutes
  longBreakDuration: number // minutes
  pomodorosUntilLongBreak: number
}

export const DEFAULT_POMODORO_SETTINGS: PomodoroSettings = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  pomodorosUntilLongBreak: 4
}

export class PomodoroTimer {
  private settings: PomodoroSettings
  private currentPhase: PomodoroPhase = 'work'
  private timeRemaining: number = 0 // seconds
  private isRunning: boolean = false
  private interval: NodeJS.Timeout | null = null
  private completedPomodoros: number = 0
  private onTick?: (timeRemaining: number) => void
  private onComplete?: (phase: PomodoroPhase) => void
  
  constructor(settings?: Partial<PomodoroSettings>) {
    this.settings = { ...DEFAULT_POMODORO_SETTINGS, ...settings }
    this.timeRemaining = this.settings.workDuration * 60
  }
  
  start(onTick?: (time: number) => void, onComplete?: (phase: PomodoroPhase) => void): void {
    if (this.isRunning) return
    
    this.isRunning = true
    this.onTick = onTick
    this.onComplete = onComplete
    
    this.interval = setInterval(() => {
      this.timeRemaining--
      
      if (this.onTick) {
        this.onTick(this.timeRemaining)
      }
      
      if (this.timeRemaining <= 0) {
        this.complete()
      }
    }, 1000)
    
    console.log(`🍅 Pomodoro ${this.currentPhase} started`)
  }
  
  pause(): void {
    if (!this.isRunning) return
    
    this.isRunning = false
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
    
    console.log('⏸️ Pomodoro paused')
  }
  
  reset(): void {
    this.pause()
    this.timeRemaining = this.getDurationForPhase(this.currentPhase) * 60
    console.log('🔄 Pomodoro reset')
  }
  
  skip(): void {
    this.pause()
    this.complete()
  }
  
  private complete(): void {
    this.pause()
    
    const completedPhase = this.currentPhase
    
    if (this.currentPhase === 'work') {
      this.completedPomodoros++
      
      // Determine next break type
      if (this.completedPomodoros % this.settings.pomodorosUntilLongBreak === 0) {
        this.currentPhase = 'long-break'
      } else {
        this.currentPhase = 'short-break'
      }
    } else {
      // After any break, go back to work
      this.currentPhase = 'work'
    }
    
    this.timeRemaining = this.getDurationForPhase(this.currentPhase) * 60
    
    if (this.onComplete) {
      this.onComplete(completedPhase)
    }
    
    console.log(`✅ Pomodoro ${completedPhase} completed. Next: ${this.currentPhase}`)
  }
  
  private getDurationForPhase(phase: PomodoroPhase): number {
    switch (phase) {
      case 'work': return this.settings.workDuration
      case 'short-break': return this.settings.shortBreakDuration
      case 'long-break': return this.settings.longBreakDuration
    }
  }
  
  getTimeRemaining(): number {
    return this.timeRemaining
  }
  
  getCurrentPhase(): PomodoroPhase {
    return this.currentPhase
  }
  
  isActive(): boolean {
    return this.isRunning
  }
  
  getCompletedCount(): number {
    return this.completedPomodoros
  }
  
  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  
  getPhaseLabel(phase: PomodoroPhase): string {
    switch (phase) {
      case 'work': return '🍅 Focus Time'
      case 'short-break': return '☕ Short Break'
      case 'long-break': return '🌴 Long Break'
    }
  }
}

// Export singleton instance
export const globalTimeTracker = new TimeTracker()
export const globalPomodoroTimer = new PomodoroTimer()

