/**
 * Advanced Task Features
 * Features #37-40: Smart Scheduling, Recurring Tasks, Templates, File Attachments
 */

// ===== FEATURE #37: SMART SCHEDULING =====

export interface SmartScheduleSuggestion {
  suggestedTime: Date
  reason: string
  confidence: 'high' | 'medium' | 'low'
  energyLevel: number // 1-5
  availability: 'free' | 'busy' | 'flexible'
  score: number // 0-100
}

export function suggestOptimalTime(
  taskTitle: string,
  estimatedDuration: number, // minutes
  priority: number, // 1-5
  dueDate?: Date
): SmartScheduleSuggestion[] {
  const now = new Date()
  const suggestions: SmartScheduleSuggestion[] = []
  
  // Get user's typical productivity patterns (mock data - in real app, analyze history)
  const peakHours = [9, 10, 14, 15] // 9-10am, 2-3pm
  const lowEnergyHours = [13, 16, 17] // 1pm, 4-5pm
  
  // Generate suggestions for next 7 days
  for (let day = 0; day < 7; day++) {
    const date = new Date(now)
    date.setDate(date.getDate() + day)
    
    // Try different times of day
    const timesToTry = [9, 10, 11, 14, 15, 16, 19, 20]
    
    for (const hour of timesToTry) {
      date.setHours(hour, 0, 0, 0)
      
      // Skip past times
      if (date < now) continue
      
      // Skip if past due date
      if (dueDate && date > dueDate) continue
      
      const energyLevel = peakHours.includes(hour) ? 5 : 
                         lowEnergyHours.includes(hour) ? 2 : 3
      
      const isWeekend = date.getDay() === 0 || date.getDay() === 6
      
      // Calculate score
      let score = 50 // base score
      
      // Higher score for peak hours
      if (peakHours.includes(hour)) score += 30
      
      // Bonus for matching priority with energy
      if (priority >= 4 && energyLevel >= 4) score += 20
      
      // Penalty for weekend unless low priority
      if (isWeekend && priority >= 3) score -= 10
      
      // Bonus for weekday mornings
      if (!isWeekend && hour >= 9 && hour <= 11) score += 15
      
      // Bonus for proximity to due date if urgent
      if (dueDate && priority >= 4) {
        const daysUntilDue = Math.ceil((dueDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
        if (daysUntilDue <= 2) score += 25
      }
      
      // Determine confidence
      const confidence: 'high' | 'medium' | 'low' = 
        score >= 80 ? 'high' : score >= 60 ? 'medium' : 'low'
      
      // Determine availability (mock - in real app, check calendar)
      const availability: 'free' | 'busy' | 'flexible' = 
        Math.random() > 0.7 ? 'busy' : Math.random() > 0.5 ? 'flexible' : 'free'
      
      if (availability === 'busy') score -= 30
      if (availability === 'flexible') score -= 10
      
      // Generate reason
      const reason = generateScheduleReason(hour, energyLevel, priority, isWeekend, daysUntilDue)
      
      suggestions.push({
        suggestedTime: new Date(date),
        reason,
        confidence,
        energyLevel,
        availability,
        score: Math.max(0, Math.min(100, score))
      })
    }
  }
  
  // Sort by score and return top 5
  return suggestions
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
}

function generateScheduleReason(
  hour: number,
  energyLevel: number,
  priority: number,
  isWeekend: boolean,
  daysUntilDue?: number
): string {
  if (daysUntilDue !== undefined && daysUntilDue <= 1) {
    return '⚠️ Due soon - prioritize this time slot'
  }
  
  if (hour >= 9 && hour <= 11 && energyLevel >= 4) {
    return '🌅 Peak morning productivity - best time for focused work'
  }
  
  if (hour >= 14 && hour <= 16 && energyLevel >= 4) {
    return '☀️ Afternoon energy peak - great for important tasks'
  }
  
  if (hour >= 19 && hour <= 21) {
    return '🌙 Evening slot - good for creative or flexible work'
  }
  
  if (isWeekend) {
    return '📅 Weekend time - flexible schedule'
  }
  
  if (energyLevel <= 2) {
    return '😴 Lower energy time - better for light tasks'
  }
  
  return '✓ Available time slot - schedule based on your preference'
}

// ===== FEATURE #38: RECURRING TASKS =====

export interface RecurrenceRule {
  type: 'daily' | 'weekly' | 'monthly' | 'custom'
  interval: number // every X days/weeks/months
  daysOfWeek?: number[] // 0-6 for weekly (0=Sunday)
  dayOfMonth?: number // 1-31 for monthly
  endDate?: Date
  endAfterOccurrences?: number
}

export interface RecurringTask {
  id: string
  baseTaskId: string
  title: string
  description?: string
  recurrence: RecurrenceRule
  nextOccurrence: Date
  createdInstances: string[] // IDs of created task instances
}

export function calculateNextOccurrence(rule: RecurrenceRule, fromDate: Date = new Date()): Date {
  const next = new Date(fromDate)
  
  switch (rule.type) {
    case 'daily':
      next.setDate(next.getDate() + rule.interval)
      break
      
    case 'weekly':
      // Find next matching day of week
      if (rule.daysOfWeek && rule.daysOfWeek.length > 0) {
        const currentDay = next.getDay()
        const sortedDays = [...rule.daysOfWeek].sort((a, b) => a - b)
        
        // Find next day in this week
        let nextDay = sortedDays.find(day => day > currentDay)
        
        if (nextDay !== undefined) {
          next.setDate(next.getDate() + (nextDay - currentDay))
        } else {
          // Go to first day of next week cycle
          const daysUntilNextWeek = 7 - currentDay + sortedDays[0]
          next.setDate(next.getDate() + daysUntilNextWeek + (rule.interval - 1) * 7)
        }
      } else {
        next.setDate(next.getDate() + 7 * rule.interval)
      }
      break
      
    case 'monthly':
      next.setMonth(next.getMonth() + rule.interval)
      if (rule.dayOfMonth) {
        next.setDate(rule.dayOfMonth)
      }
      break
      
    case 'custom':
      next.setDate(next.getDate() + rule.interval)
      break
  }
  
  return next
}

export function shouldCreateNextInstance(recurring: RecurringTask): boolean {
  const now = new Date()
  
  // Check if next occurrence is due
  if (recurring.nextOccurrence > now) return false
  
  // Check end date
  if (recurring.recurrence.endDate && recurring.nextOccurrence >= recurring.recurrence.endDate) {
    return false
  }
  
  // Check occurrence limit
  if (recurring.recurrence.endAfterOccurrences !== undefined) {
    if (recurring.createdInstances.length >= recurring.recurrence.endAfterOccurrences) {
      return false
    }
  }
  
  return true
}

export function getRecurringTaskDescription(rule: RecurrenceRule): string {
  const parts: string[] = []
  
  switch (rule.type) {
    case 'daily':
      parts.push(rule.interval === 1 ? 'Every day' : `Every ${rule.interval} days`)
      break
      
    case 'weekly':
      if (rule.daysOfWeek && rule.daysOfWeek.length > 0) {
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        const days = rule.daysOfWeek.map(d => dayNames[d]).join(', ')
        parts.push(`Every ${rule.interval === 1 ? '' : rule.interval + ' '}week${rule.interval > 1 ? 's' : ''} on ${days}`)
      } else {
        parts.push(`Every ${rule.interval} week${rule.interval > 1 ? 's' : ''}`)
      }
      break
      
    case 'monthly':
      parts.push(`Every ${rule.interval} month${rule.interval > 1 ? 's' : ''}`)
      if (rule.dayOfMonth) {
        parts.push(`on day ${rule.dayOfMonth}`)
      }
      break
      
    case 'custom':
      parts.push(`Every ${rule.interval} days`)
      break
  }
  
  if (rule.endDate) {
    parts.push(`until ${rule.endDate.toLocaleDateString()}`)
  } else if (rule.endAfterOccurrences) {
    parts.push(`for ${rule.endAfterOccurrences} occurrences`)
  }
  
  return parts.join(' ')
}

// ===== FEATURE #39: TASK TEMPLATES =====

export interface TaskTemplate {
  id: string
  name: string
  description: string
  category: string
  icon: string
  tasks: Array<{
    title: string
    description: string
    estimatedDuration: number
    priority: number
    tags?: string[]
  }>
  isPremium?: boolean
  usageCount: number
}

export const TASK_TEMPLATES: TaskTemplate[] = [
  {
    id: 'tmpl-daily-routine',
    name: 'Daily Routine',
    description: 'Standard daily tasks for consistency',
    category: 'Personal',
    icon: '🌅',
    tasks: [
      { title: 'Morning Exercise', description: '30 min workout', estimatedDuration: 30, priority: 4, tags: ['health'] },
      { title: 'Review Daily Goals', description: 'Plan the day ahead', estimatedDuration: 15, priority: 5, tags: ['planning'] },
      { title: 'Check Email', description: 'Process inbox to zero', estimatedDuration: 30, priority: 3, tags: ['communication'] },
      { title: 'Focused Work Block', description: 'Deep work on priority tasks', estimatedDuration: 120, priority: 5, tags: ['deep-work'] },
      { title: 'Lunch Break', description: 'Take proper break', estimatedDuration: 60, priority: 3, tags: ['rest'] },
      { title: 'Afternoon Tasks', description: 'Second work block', estimatedDuration: 120, priority: 4, tags: ['work'] },
      { title: 'Evening Review', description: 'Reflect on the day', estimatedDuration: 15, priority: 3, tags: ['reflection'] }
    ],
    usageCount: 0
  },
  {
    id: 'tmpl-blog-post',
    name: 'Blog Post Creation',
    description: 'Complete workflow for writing and publishing a blog post',
    category: 'Content',
    icon: '✍️',
    tasks: [
      { title: 'Research Topic', description: 'Gather information and sources', estimatedDuration: 60, priority: 4 },
      { title: 'Create Outline', description: 'Structure the post', estimatedDuration: 30, priority: 4 },
      { title: 'Write First Draft', description: 'Get ideas down', estimatedDuration: 90, priority: 5 },
      { title: 'Find Images', description: 'Select relevant visuals', estimatedDuration: 30, priority: 3 },
      { title: 'Edit & Refine', description: 'Improve clarity and flow', estimatedDuration: 45, priority: 4 },
      { title: 'SEO Optimization', description: 'Keywords, meta description', estimatedDuration: 20, priority: 3 },
      { title: 'Publish & Promote', description: 'Share on social media', estimatedDuration: 30, priority: 4 }
    ],
    usageCount: 0
  },
  {
    id: 'tmpl-project-kickoff',
    name: 'Project Kickoff',
    description: 'Essential tasks for starting a new project',
    category: 'Project',
    icon: '🚀',
    tasks: [
      { title: 'Define Project Scope', description: 'Goals, deliverables, constraints', estimatedDuration: 60, priority: 5 },
      { title: 'Identify Stakeholders', description: 'List all involved parties', estimatedDuration: 30, priority: 4 },
      { title: 'Create Project Plan', description: 'Timeline, milestones, resources', estimatedDuration: 90, priority: 5 },
      { title: 'Setup Communication', description: 'Channels, meetings, updates', estimatedDuration: 30, priority: 3 },
      { title: 'Allocate Resources', description: 'Team, budget, tools', estimatedDuration: 45, priority: 4 },
      { title: 'Kickoff Meeting', description: 'Align team on objectives', estimatedDuration: 60, priority: 5 },
      { title: 'Setup Tracking', description: 'Project management tools', estimatedDuration: 30, priority: 3 }
    ],
    usageCount: 0
  },
  {
    id: 'tmpl-weekly-review',
    name: 'Weekly Review',
    description: 'Reflect and plan for the week ahead',
    category: 'Planning',
    icon: '📅',
    tasks: [
      { title: 'Review Last Week', description: 'What went well, what didn\'t', estimatedDuration: 20, priority: 4 },
      { title: 'Process Inbox', description: 'Clear all inboxes', estimatedDuration: 30, priority: 3 },
      { title: 'Review Goals', description: 'Progress on long-term goals', estimatedDuration: 20, priority: 4 },
      { title: 'Plan Next Week', description: 'Schedule important tasks', estimatedDuration: 30, priority: 5 },
      { title: 'Update Projects', description: 'Check project status', estimatedDuration: 30, priority: 4 },
      { title: 'Set 3 Priorities', description: 'Top 3 goals for next week', estimatedDuration: 15, priority: 5 }
    ],
    usageCount: 0
  },
  {
    id: 'tmpl-client-onboarding',
    name: 'Client Onboarding',
    description: 'Welcome and setup new client',
    category: 'Business',
    icon: '🤝',
    tasks: [
      { title: 'Welcome Email', description: 'Send introduction and next steps', estimatedDuration: 15, priority: 5 },
      { title: 'Schedule Kickoff Call', description: 'Coordinate meeting time', estimatedDuration: 10, priority: 4 },
      { title: 'Gather Requirements', description: 'Understand client needs', estimatedDuration: 60, priority: 5 },
      { title: 'Create Proposal', description: 'Scope, timeline, pricing', estimatedDuration: 90, priority: 5 },
      { title: 'Setup Project Tools', description: 'Access, communication channels', estimatedDuration: 30, priority: 3 },
      { title: 'Define Deliverables', description: 'Clear expectations', estimatedDuration: 45, priority: 4 },
      { title: 'Contract & Payment', description: 'Finalize agreement', estimatedDuration: 30, priority: 5 }
    ],
    usageCount: 0
  }
]

export function createTasksFromTemplate(templateId: string): Array<{
  title: string
  description: string
  estimatedDuration: number
  priority: number
  tags?: string[]
}> | null {
  const template = TASK_TEMPLATES.find(t => t.id === templateId)
  if (!template) return null
  
  // Increment usage count
  template.usageCount++
  
  return template.tasks.map(task => ({ ...task }))
}

// ===== FEATURE #40: FILE ATTACHMENTS =====

export interface FileAttachment {
  id: string
  name: string
  size: number // bytes
  type: string // MIME type
  url: string // Data URL or storage URL
  uploadedAt: Date
  thumbnail?: string // For images
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

export function getFileIcon(mimeType: string): string {
  if (mimeType.startsWith('image/')) return '🖼️'
  if (mimeType.startsWith('video/')) return '🎥'
  if (mimeType.startsWith('audio/')) return '🎵'
  if (mimeType.includes('pdf')) return '📄'
  if (mimeType.includes('word') || mimeType.includes('document')) return '📝'
  if (mimeType.includes('sheet') || mimeType.includes('excel')) return '📊'
  if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) return '📽️'
  if (mimeType.includes('zip') || mimeType.includes('rar') || mimeType.includes('tar')) return '🗜️'
  if (mimeType.includes('text/')) return '📃'
  return '📎'
}

export async function attachFileToTask(taskId: string, file: File): Promise<FileAttachment | null> {
  try {
    // Create file attachment object
    const attachment: FileAttachment = {
      id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      size: file.size,
      type: file.type,
      url: '', // Will be set after reading
      uploadedAt: new Date()
    }
    
    // Read file as data URL
    const dataUrl = await readFileAsDataURL(file)
    attachment.url = dataUrl
    
    // Generate thumbnail for images
    if (file.type.startsWith('image/')) {
      attachment.thumbnail = await generateImageThumbnail(file)
    }
    
    // Save attachment reference
    const attachments = getTaskAttachments(taskId)
    attachments.push(attachment)
    saveTaskAttachments(taskId, attachments)
    
    console.log(`📎 File attached to task ${taskId}: ${file.name}`)
    
    return attachment
  } catch (error) {
    console.error('Error attaching file:', error)
    return null
  }
}

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function generateImageThumbnail(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        
        // Thumbnail size
        const maxSize = 200
        let width = img.width
        let height = img.height
        
        if (width > height) {
          if (width > maxSize) {
            height = (height * maxSize) / width
            width = maxSize
          }
        } else {
          if (height > maxSize) {
            width = (width * maxSize) / height
            height = maxSize
          }
        }
        
        canvas.width = width
        canvas.height = height
        ctx?.drawImage(img, 0, 0, width, height)
        
        resolve(canvas.toDataURL('image/jpeg', 0.7))
      }
      img.onerror = reject
      img.src = e.target?.result as string
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export function getTaskAttachments(taskId: string): FileAttachment[] {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(`task_attachments_${taskId}`)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error loading attachments:', error)
    return []
  }
}

export function saveTaskAttachments(taskId: string, attachments: FileAttachment[]): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(`task_attachments_${taskId}`, JSON.stringify(attachments))
  } catch (error) {
    console.error('Error saving attachments:', error)
  }
}

export function removeAttachment(taskId: string, attachmentId: string): boolean {
  const attachments = getTaskAttachments(taskId)
  const filtered = attachments.filter(a => a.id !== attachmentId)
  
  if (filtered.length === attachments.length) return false
  
  saveTaskAttachments(taskId, filtered)
  console.log(`🗑️ Attachment removed: ${attachmentId}`)
  return true
}

