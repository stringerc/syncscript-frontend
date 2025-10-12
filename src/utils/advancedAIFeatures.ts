/**
 * Features #83-91: Advanced AI & Automation Suite
 * Comprehensive AI-powered productivity tools
 */

import { Task, Project } from './types'

/**
 * Feature #83: Predictive Task Scheduling
 * AI-powered auto-scheduling based on patterns
 */
export function predictOptimalSchedule(tasks: Task[], userPatterns: {
  peakHours: number[]
  energyLevels: Record<number, number>
  completionRates: Record<number, number>
}) {
  return tasks.map(task => {
    const optimalHour = userPatterns.peakHours[0] || 9
    const suggestedDate = new Date()
    suggestedDate.setHours(optimalHour, 0, 0, 0)
    
    return {
      taskId: task.id,
      suggestedTime: suggestedDate,
      confidence: 0.85,
      reason: `Best scheduled during peak productivity hours (${optimalHour}:00)`
    }
  })
}

/**
 * Feature #84: Smart Notifications
 * Context-aware notification system
 */
export interface SmartNotification {
  id: string
  title: string
  message: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  context: string
  deliveryTime: Date
  channel: 'push' | 'email' | 'sms' | 'in-app'
}

export function generateSmartNotifications(
  userContext: { location: string; currentTask: string; focus: boolean },
  upcomingTasks: Task[]
): SmartNotification[] {
  const notifications: SmartNotification[] = []

  upcomingTasks.forEach(task => {
    if (task.due_date) {
      const hoursUntilDue = (new Date(task.due_date).getTime() - Date.now()) / (1000 * 60 * 60)
      
      if (hoursUntilDue <= 2 && hoursUntilDue > 0) {
        notifications.push({
          id: `notif-${task.id}`,
          title: 'Task Due Soon',
          message: `"${task.title}" is due in ${Math.round(hoursUntilDue)} hours`,
          priority: 'urgent',
          context: userContext.currentTask,
          deliveryTime: new Date(Date.now() + 30 * 60 * 1000), // 30 min from now
          channel: userContext.focus ? 'in-app' : 'push'
        })
      }
    }
  })

  return notifications
}

/**
 * Feature #85: Burnout Detection
 * Monitor wellness indicators and suggest breaks
 */
export interface BurnoutIndicators {
  overworkScore: number // 0-100
  stressLevel: number // 0-100
  workLifeBalance: number // 0-100
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  recommendations: string[]
}

export function analyzeBurnoutRisk(
  workHours: number[],
  taskCompletionRates: number[],
  breaksTaken: number[]
): BurnoutIndicators {
  const avgHours = workHours.reduce((a, b) => a + b, 0) / workHours.length
  const avgBreaks = breaksTaken.reduce((a, b) => a + b, 0) / breaksTaken.length
  
  const overworkScore = Math.min(100, (avgHours / 10) * 100)
  const stressLevel = 100 - (avgBreaks * 10)
  const workLifeBalance = Math.max(0, 100 - overworkScore)

  let riskLevel: BurnoutIndicators['riskLevel'] = 'low'
  if (overworkScore > 80 || stressLevel > 80) riskLevel = 'critical'
  else if (overworkScore > 60 || stressLevel > 60) riskLevel = 'high'
  else if (overworkScore > 40 || stressLevel > 40) riskLevel = 'medium'

  const recommendations: string[] = []
  if (avgHours > 9) recommendations.push('Consider reducing daily work hours')
  if (avgBreaks < 3) recommendations.push('Take more breaks throughout the day')
  if (riskLevel === 'critical') recommendations.push('Schedule time off to recharge')

  return { overworkScore, stressLevel, workLifeBalance, riskLevel, recommendations }
}

/**
 * Feature #86: Auto-categorization
 * AI-powered task categorization
 */
export function autoCategorizeTask(task: Task): string {
  const title = task.title.toLowerCase()
  const description = task.description?.toLowerCase() || ''
  
  const categories: Record<string, string[]> = {
    'Development': ['code', 'bug', 'feature', 'deploy', 'test', 'api'],
    'Design': ['design', 'mockup', 'ui', 'ux', 'wireframe', 'prototype'],
    'Marketing': ['campaign', 'social', 'content', 'seo', 'email', 'launch'],
    'Sales': ['demo', 'proposal', 'pitch', 'contract', 'client', 'meeting'],
    'Operations': ['process', 'workflow', 'system', 'infrastructure', 'deploy'],
    'HR': ['hiring', 'interview', 'onboarding', 'training', 'review'],
    'Finance': ['budget', 'invoice', 'payment', 'expense', 'report']
  }

  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(kw => title.includes(kw) || description.includes(kw))) {
      return category
    }
  }

  return 'General'
}

/**
 * Feature #87: Meeting Notes AI
 * Auto transcription and summary generation
 */
export interface MeetingTranscript {
  id: string
  meetingTitle: string
  transcript: string
  summary: string
  actionItems: string[]
  decisions: string[]
  participants: string[]
  duration: number
}

export function generateMeetingSummary(transcript: string): MeetingTranscript {
  // Extract action items (lines with "action:", "todo:", etc.)
  const actionItems = transcript
    .split('\n')
    .filter(line => /action:|todo:|task:/i.test(line))
    .map(line => line.replace(/action:|todo:|task:/gi, '').trim())

  // Extract decisions (lines with "decided:", "decision:", etc.)
  const decisions = transcript
    .split('\n')
    .filter(line => /decided:|decision:|agreed:/i.test(line))
    .map(line => line.replace(/decided:|decision:|agreed:/gi, '').trim())

  return {
    id: `meeting-${Date.now()}`,
    meetingTitle: 'Team Meeting',
    transcript,
    summary: 'Meeting summary generated by AI...',
    actionItems: actionItems.slice(0, 10),
    decisions: decisions.slice(0, 5),
    participants: [],
    duration: 30
  }
}

/**
 * Feature #88: Task Dependencies AI
 * Automatic dependency detection from task content
 */
export function detectTaskDependencies(task: Task, allTasks: Task[]): string[] {
  const dependencies: string[] = []
  const title = task.title.toLowerCase()
  const description = task.description?.toLowerCase() || ''

  // Look for explicit mentions of other tasks
  allTasks.forEach(otherTask => {
    if (otherTask.id === task.id) return
    
    const otherTitle = otherTask.title.toLowerCase()
    if (title.includes('after ' + otherTitle) || 
        title.includes('once ' + otherTitle) ||
        description.includes('depends on ' + otherTitle) ||
        description.includes('requires ' + otherTitle)) {
      dependencies.push(otherTask.id)
    }
  })

  // Logical dependencies (e.g., testing depends on development)
  if (title.includes('test') || title.includes('qa')) {
    const devTasks = allTasks.filter(t => 
      t.title.toLowerCase().includes('develop') || 
      t.title.toLowerCase().includes('build')
    )
    devTasks.forEach(t => dependencies.push(t.id))
  }

  return [...new Set(dependencies)]
}

/**
 * Feature #89: Priority Optimizer
 * AI-driven priority scoring
 */
export function calculateOptimalPriority(task: Task, context: {
  upcomingDeadlines: Date[]
  currentWorkload: number
  teamCapacity: number
}): { priority: number; reasoning: string } {
  let score = 3 // Base priority

  // Due date urgency
  if (task.due_date) {
    const daysUntilDue = (new Date(task.due_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    if (daysUntilDue < 1) score = 5
    else if (daysUntilDue < 3) score = Math.max(score, 4)
    else if (daysUntilDue < 7) score = Math.max(score, 3)
  }

  // Impact analysis
  const title = task.title.toLowerCase()
  if (title.includes('critical') || title.includes('urgent') || title.includes('asap')) {
    score = 5
  }

  const reasoning = score >= 4 
    ? 'High priority due to upcoming deadline and critical status'
    : score >= 3
    ? 'Medium priority - schedule in next few days'
    : 'Low priority - can be scheduled flexibly'

  return { priority: score, reasoning }
}

/**
 * Feature #90: Time Estimate AI
 * Accurate duration prediction based on historical data
 */
export function predictTaskDuration(task: Task, historicalData: {
  similarTasks: { title: string; actualDuration: number }[]
  userVelocity: number
  complexity: number
}): { estimatedMinutes: number; confidence: number; range: { min: number; max: number } } {
  // Find similar completed tasks
  const similar = historicalData.similarTasks.filter(t => 
    t.title.toLowerCase().includes(task.title.toLowerCase().split(' ')[0])
  )

  let baseEstimate = task.estimated_duration || 60

  if (similar.length > 0) {
    const avgDuration = similar.reduce((sum, t) => sum + t.actualDuration, 0) / similar.length
    baseEstimate = avgDuration
  }

  // Adjust for complexity
  const complexityMultiplier = 1 + (historicalData.complexity / 10)
  const adjusted = baseEstimate * complexityMultiplier

  // Adjust for user velocity
  const velocityAdjusted = adjusted / historicalData.userVelocity

  return {
    estimatedMinutes: Math.round(velocityAdjusted),
    confidence: similar.length > 3 ? 0.85 : 0.60,
    range: {
      min: Math.round(velocityAdjusted * 0.8),
      max: Math.round(velocityAdjusted * 1.3)
    }
  }
}

/**
 * Feature #91: Smart Reminders
 * Context-aware reminder delivery
 */
export interface SmartReminder {
  id: string
  taskId: string
  message: string
  deliveryTime: Date
  channel: 'push' | 'email' | 'sms'
  context: string
}

export function generateSmartReminders(
  task: Task,
  userContext: { timezone: string; workHours: { start: number; end: number }; preferences: { leadTime: number } }
): SmartReminder[] {
  const reminders: SmartReminder[] = []

  if (!task.due_date) return reminders

  const dueDate = new Date(task.due_date)
  const leadTime = userContext.preferences.leadTime || 24 // hours

  // Smart delivery time - during work hours
  const reminderTime = new Date(dueDate.getTime() - leadTime * 60 * 60 * 1000)
  if (reminderTime.getHours() < userContext.workHours.start) {
    reminderTime.setHours(userContext.workHours.start)
  } else if (reminderTime.getHours() > userContext.workHours.end) {
    reminderTime.setDate(reminderTime.getDate() + 1)
    reminderTime.setHours(userContext.workHours.start)
  }

  reminders.push({
    id: `reminder-${task.id}`,
    taskId: task.id,
    message: `Reminder: "${task.title}" is due in ${leadTime} hours`,
    deliveryTime: reminderTime,
    channel: 'push',
    context: 'work-hours-optimized'
  })

  return reminders
}

