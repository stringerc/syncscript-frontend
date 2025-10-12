/**
 * Feature #65: Email Integration
 * Turn emails into tasks automatically with smart parsing
 */

export interface Email {
  id: string
  from: string
  subject: string
  body: string
  receivedAt: Date
  priority: 'high' | 'medium' | 'low'
  hasAttachments: boolean
  labels: string[]
}

export interface EmailTask {
  id: string
  emailId: string
  title: string
  description: string
  priority: 1 | 2 | 3 | 4 | 5
  dueDate: Date
  estimatedDuration: number
  category: string
}

/**
 * Parse email subject/body to extract task information
 */
export function parseEmailToTask(email: Email): EmailTask {
  const subject = email.subject.toLowerCase()
  const body = email.body.toLowerCase()
  
  // Detect priority
  let priority: 1 | 2 | 3 | 4 | 5 = 3
  if (subject.includes('urgent') || subject.includes('asap') || email.priority === 'high') {
    priority = 5
  } else if (subject.includes('important') || subject.includes('critical')) {
    priority = 4
  } else if (subject.includes('low priority') || subject.includes('fyi')) {
    priority = 1
  }

  // Detect due date
  let dueDate = new Date()
  if (subject.includes('today') || body.includes('by end of day')) {
    dueDate = new Date()
    dueDate.setHours(23, 59, 59, 999)
  } else if (subject.includes('tomorrow')) {
    dueDate = new Date(Date.now() + 24 * 60 * 60 * 1000)
  } else if (subject.includes('this week')) {
    dueDate = new Date()
    dueDate.setDate(dueDate.getDate() + (7 - dueDate.getDay()))
  } else {
    // Default: 3 days from now
    dueDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
  }

  // Estimate duration based on content
  const wordCount = email.body.split(/\s+/).length
  let estimatedDuration = 30 // default 30 min
  if (wordCount > 500 || email.hasAttachments) {
    estimatedDuration = 60
  } else if (wordCount < 100) {
    estimatedDuration = 15
  }

  // Categorize by keywords
  let category = 'general'
  const categories = {
    'meeting': ['schedule', 'calendar', 'invite', 'zoom', 'teams'],
    'review': ['review', 'feedback', 'check', 'look at'],
    'documentation': ['document', 'write', 'report', 'proposal'],
    'development': ['code', 'bug', 'feature', 'deploy', 'build'],
    'communication': ['reply', 'respond', 'answer', 'contact']
  }

  for (const [cat, keywords] of Object.entries(categories)) {
    if (keywords.some(kw => subject.includes(kw) || body.includes(kw))) {
      category = cat
      break
    }
  }

  return {
    id: `email-task-${email.id}`,
    emailId: email.id,
    title: email.subject,
    description: `From: ${email.from}\n\n${email.body.substring(0, 500)}${email.body.length > 500 ? '...' : ''}`,
    priority,
    dueDate,
    estimatedDuration,
    category
  }
}

/**
 * Smart inbox sorting by priority
 */
export function sortInboxByPriority(emails: Email[]): Email[] {
  const priorityMap = { high: 3, medium: 2, low: 1 }
  
  return [...emails].sort((a, b) => {
    // Sort by priority first
    if (a.priority !== b.priority) {
      return priorityMap[b.priority] - priorityMap[a.priority]
    }
    // Then by date
    return b.receivedAt.getTime() - a.receivedAt.getTime()
  })
}

/**
 * Generate smart reply suggestions
 */
export function generateReplySuggestions(email: Email): string[] {
  const subject = email.subject.toLowerCase()
  const body = email.body.toLowerCase()
  
  const suggestions: string[] = []

  // Meeting requests
  if (subject.includes('meeting') || subject.includes('schedule')) {
    suggestions.push('Yes, I\'m available. What time works best for you?')
    suggestions.push('Thanks for reaching out. Let me check my calendar and get back to you.')
    suggestions.push('I\'d prefer to discuss this async. Can you share your thoughts via email?')
  }
  
  // Questions
  if (subject.includes('question') || body.includes('?')) {
    suggestions.push('Great question! Let me get back to you with details shortly.')
    suggestions.push('Thanks for asking. Here\'s what I think...')
    suggestions.push('I\'ll need to research this and follow up within 24 hours.')
  }

  // Requests for review
  if (subject.includes('review') || subject.includes('feedback')) {
    suggestions.push('I\'ll review this by end of day and share my feedback.')
    suggestions.push('Thanks for sharing. I\'ve added this to my review queue.')
    suggestions.push('Looks good overall! I have a few minor suggestions...')
  }

  // Generic polite responses
  if (suggestions.length === 0) {
    suggestions.push('Thanks for your email. I\'ll get back to you shortly.')
    suggestions.push('Received! I\'ll review and respond by tomorrow.')
    suggestions.push('Appreciate you reaching out. Let me take a look at this.')
  }

  return suggestions.slice(0, 3)
}

/**
 * Email templates for common scenarios
 */
export const emailTemplates = {
  'meeting-decline': {
    subject: 'Re: Meeting Request',
    body: `Thank you for the meeting invitation. Unfortunately, I'm not available at that time. 

Could we schedule this for another time, or would an async discussion via email work better?

Best regards`
  },
  'task-delegation': {
    subject: 'Task: [TASK_NAME]',
    body: `Hi [NAME],

I'd like to delegate the following task to you:

Task: [TASK_NAME]
Due Date: [DUE_DATE]
Priority: [PRIORITY]

Details:
[DETAILS]

Let me know if you have any questions!

Best regards`
  },
  'status-update': {
    subject: 'Status Update: [PROJECT_NAME]',
    body: `Hi team,

Here's a quick status update on [PROJECT_NAME]:

✅ Completed:
- [ITEM_1]
- [ITEM_2]

🚧 In Progress:
- [ITEM_3]
- [ITEM_4]

⏭️ Next Steps:
- [ITEM_5]

Let me know if you have questions!

Best regards`
  },
  'follow-up': {
    subject: 'Following up: [TOPIC]',
    body: `Hi [NAME],

I wanted to follow up on [TOPIC] from our previous conversation.

Have you had a chance to [ACTION]?

Let me know if you need any support!

Best regards`
  }
}

/**
 * Schedule email to send later
 */
export interface ScheduledEmail {
  id: string
  to: string[]
  subject: string
  body: string
  scheduledFor: Date
  status: 'scheduled' | 'sent' | 'failed'
}

export function scheduleEmail(
  to: string[],
  subject: string,
  body: string,
  sendAt: Date
): ScheduledEmail {
  return {
    id: `scheduled-${Date.now()}`,
    to,
    subject,
    body,
    scheduledFor: sendAt,
    status: 'scheduled'
  }
}

/**
 * Extract action items from email
 */
export function extractActionItems(email: Email): string[] {
  const actionPatterns = [
    /please\s+(.*?)[.!?\n]/gi,
    /can you\s+(.*?)[.!?\n]/gi,
    /need to\s+(.*?)[.!?\n]/gi,
    /could you\s+(.*?)[.!?\n]/gi,
    /action:\s+(.*?)[.!?\n]/gi,
    /todo:\s+(.*?)[.!?\n]/gi
  ]

  const actions: string[] = []
  
  actionPatterns.forEach(pattern => {
    const matches = [...email.body.matchAll(pattern)]
    matches.forEach(match => {
      if (match[1]) {
        actions.push(match[1].trim())
      }
    })
  })

  return actions.slice(0, 5) // Max 5 action items
}

/**
 * Categorize emails automatically
 */
export function categorizeEmail(email: Email): string {
  const subject = email.subject.toLowerCase()
  const body = email.body.toLowerCase()
  const from = email.from.toLowerCase()

  const categories: Record<string, string[]> = {
    'Meetings': ['meeting', 'calendar', 'invite', 'zoom', 'teams', 'call'],
    'Tasks': ['task', 'action item', 'todo', 'please', 'can you'],
    'Projects': ['project', 'deadline', 'milestone', 'deliverable'],
    'Updates': ['update', 'status', 'progress', 'report', 'fyi'],
    'Approvals': ['approve', 'review', 'feedback', 'sign off'],
    'Urgent': ['urgent', 'asap', 'critical', 'emergency', 'immediate'],
    'Social': ['newsletter', 'announcement', 'invitation', 'event'],
    'Automated': ['noreply', 'do-not-reply', 'automated', 'notification']
  }

  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(kw => subject.includes(kw) || body.includes(kw) || from.includes(kw))) {
      return category
    }
  }

  return 'General'
}

/**
 * Calculate email urgency score
 */
export function calculateEmailUrgency(email: Email): number {
  let score = 50 // Base score

  // Priority level
  if (email.priority === 'high') score += 30
  else if (email.priority === 'low') score -= 20

  // Keywords
  const urgentKeywords = ['urgent', 'asap', 'critical', 'emergency', 'immediate', 'today']
  const subject = email.subject.toLowerCase()
  const body = email.body.toLowerCase()

  urgentKeywords.forEach(keyword => {
    if (subject.includes(keyword)) score += 15
    if (body.includes(keyword)) score += 10
  })

  // Recency
  const hoursSinceReceived = (Date.now() - email.receivedAt.getTime()) / (1000 * 60 * 60)
  if (hoursSinceReceived < 1) score += 20
  else if (hoursSinceReceived > 24) score -= 15

  // Clamp between 0-100
  return Math.max(0, Math.min(100, score))
}

/**
 * Batch email processing - convert multiple emails to tasks
 */
export function batchConvertEmailsToTasks(emails: Email[]): EmailTask[] {
  return emails
    .map(parseEmailToTask)
    .sort((a, b) => b.priority - a.priority)
}

