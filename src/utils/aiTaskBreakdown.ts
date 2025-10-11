/**
 * AI Task Breakdown System
 * Feature #36: Automatically break down complex tasks into subtasks
 */

export interface SubTask {
  id: string
  title: string
  description: string
  estimatedDuration: number // minutes
  order: number
  completed: boolean
  dependsOn?: string[] // IDs of tasks that must be completed first
}

export interface TaskBreakdown {
  originalTask: string
  subtasks: SubTask[]
  totalEstimatedTime: number
  complexity: 'simple' | 'moderate' | 'complex' | 'very-complex'
  strategy: string
}

/**
 * AI-powered task breakdown engine
 * Uses pattern matching and heuristics to break down tasks
 */
export function breakdownTask(taskTitle: string, taskDescription?: string): TaskBreakdown {
  const fullText = `${taskTitle} ${taskDescription || ''}`.toLowerCase()
  
  // Determine complexity
  const complexity = determineComplexity(fullText)
  
  // Generate subtasks based on task type
  const subtasks = generateSubtasks(taskTitle, taskDescription || '', complexity)
  
  // Calculate total time
  const totalEstimatedTime = subtasks.reduce((sum, task) => sum + task.estimatedDuration, 0)
  
  // Determine strategy
  const strategy = determineStrategy(taskTitle, complexity)
  
  return {
    originalTask: taskTitle,
    subtasks,
    totalEstimatedTime,
    complexity,
    strategy
  }
}

/**
 * Determine task complexity
 */
function determineComplexity(text: string): TaskBreakdown['complexity'] {
  const complexityIndicators = {
    'very-complex': ['launch', 'build entire', 'complete overhaul', 'full implementation', 'end-to-end'],
    'complex': ['implement', 'develop', 'create system', 'design and build', 'full'],
    'moderate': ['update', 'improve', 'refactor', 'optimize', 'enhance'],
    'simple': ['fix', 'change', 'add', 'remove', 'update']
  }
  
  for (const [level, indicators] of Object.entries(complexityIndicators)) {
    if (indicators.some(indicator => text.includes(indicator))) {
      return level as TaskBreakdown['complexity']
    }
  }
  
  // Default based on length
  if (text.length > 200) return 'complex'
  if (text.length > 100) return 'moderate'
  return 'simple'
}

/**
 * Generate subtasks based on patterns
 */
function generateSubtasks(title: string, description: string, complexity: TaskBreakdown['complexity']): SubTask[] {
  const text = `${title} ${description}`.toLowerCase()
  
  // Pattern-based breakdown
  if (text.includes('website') || text.includes('web app') || text.includes('landing page')) {
    return breakdownWebProject(title, complexity)
  }
  
  if (text.includes('presentation') || text.includes('pitch deck') || text.includes('slides')) {
    return breakdownPresentation(title, complexity)
  }
  
  if (text.includes('report') || text.includes('document') || text.includes('analysis')) {
    return breakdownReport(title, complexity)
  }
  
  if (text.includes('event') || text.includes('meeting') || text.includes('workshop')) {
    return breakdownEvent(title, complexity)
  }
  
  if (text.includes('launch') || text.includes('release') || text.includes('deploy')) {
    return breakdownLaunch(title, complexity)
  }
  
  if (text.includes('learn') || text.includes('study') || text.includes('course')) {
    return breakdownLearning(title, complexity)
  }
  
  if (text.includes('write') || text.includes('blog') || text.includes('article')) {
    return breakdownWriting(title, complexity)
  }
  
  // Generic breakdown based on complexity
  return breakdownGeneric(title, complexity)
}

/**
 * Break down web development projects
 */
function breakdownWebProject(title: string, complexity: TaskBreakdown['complexity']): SubTask[] {
  const subtasks: SubTask[] = [
    {
      id: 'web-1',
      title: 'Research & Planning',
      description: 'Define requirements, create wireframes, plan architecture',
      estimatedDuration: complexity === 'very-complex' ? 120 : complexity === 'complex' ? 90 : 60,
      order: 1,
      completed: false
    },
    {
      id: 'web-2',
      title: 'Design Phase',
      description: 'Create mockups, design system, color palette, typography',
      estimatedDuration: complexity === 'very-complex' ? 180 : complexity === 'complex' ? 120 : 90,
      order: 2,
      completed: false,
      dependsOn: ['web-1']
    },
    {
      id: 'web-3',
      title: 'Setup Development Environment',
      description: 'Initialize project, setup dependencies, configure tools',
      estimatedDuration: 30,
      order: 3,
      completed: false,
      dependsOn: ['web-2']
    },
    {
      id: 'web-4',
      title: 'Build Core Structure',
      description: 'Create layout, navigation, routing, basic components',
      estimatedDuration: complexity === 'very-complex' ? 240 : complexity === 'complex' ? 180 : 120,
      order: 4,
      completed: false,
      dependsOn: ['web-3']
    },
    {
      id: 'web-5',
      title: 'Implement Features',
      description: 'Add functionality, forms, interactions, API integration',
      estimatedDuration: complexity === 'very-complex' ? 360 : complexity === 'complex' ? 240 : 180,
      order: 5,
      completed: false,
      dependsOn: ['web-4']
    },
    {
      id: 'web-6',
      title: 'Testing & Debugging',
      description: 'Test all features, fix bugs, cross-browser testing',
      estimatedDuration: complexity === 'very-complex' ? 180 : complexity === 'complex' ? 120 : 90,
      order: 6,
      completed: false,
      dependsOn: ['web-5']
    },
    {
      id: 'web-7',
      title: 'Polish & Optimize',
      description: 'Performance optimization, final design tweaks, SEO',
      estimatedDuration: 90,
      order: 7,
      completed: false,
      dependsOn: ['web-6']
    },
    {
      id: 'web-8',
      title: 'Deploy & Launch',
      description: 'Deploy to hosting, configure domain, final checks',
      estimatedDuration: 60,
      order: 8,
      completed: false,
      dependsOn: ['web-7']
    }
  ]
  
  return complexity === 'simple' ? subtasks.slice(0, 4) : subtasks
}

/**
 * Break down presentation creation
 */
function breakdownPresentation(title: string, complexity: TaskBreakdown['complexity']): SubTask[] {
  return [
    {
      id: 'pres-1',
      title: 'Define Objectives & Audience',
      description: 'Clarify goals, understand audience, key messages',
      estimatedDuration: 30,
      order: 1,
      completed: false
    },
    {
      id: 'pres-2',
      title: 'Outline Structure',
      description: 'Create slide outline, organize flow, key points',
      estimatedDuration: 45,
      order: 2,
      completed: false
    },
    {
      id: 'pres-3',
      title: 'Gather Content & Data',
      description: 'Collect information, statistics, examples, visuals',
      estimatedDuration: 60,
      order: 3,
      completed: false
    },
    {
      id: 'pres-4',
      title: 'Design Template',
      description: 'Choose theme, create consistent design, branding',
      estimatedDuration: 45,
      order: 4,
      completed: false
    },
    {
      id: 'pres-5',
      title: 'Create Slides',
      description: 'Build all slides, add content, format text',
      estimatedDuration: 120,
      order: 5,
      completed: false,
      dependsOn: ['pres-4']
    },
    {
      id: 'pres-6',
      title: 'Add Visuals',
      description: 'Insert images, charts, diagrams, animations',
      estimatedDuration: 60,
      order: 6,
      completed: false,
      dependsOn: ['pres-5']
    },
    {
      id: 'pres-7',
      title: 'Practice & Refine',
      description: 'Rehearse presentation, get feedback, make edits',
      estimatedDuration: 90,
      order: 7,
      completed: false,
      dependsOn: ['pres-6']
    }
  ]
}

/**
 * Break down report writing
 */
function breakdownReport(title: string, complexity: TaskBreakdown['complexity']): SubTask[] {
  return [
    {
      id: 'rep-1',
      title: 'Research & Data Collection',
      description: 'Gather information, sources, statistics, references',
      estimatedDuration: complexity === 'complex' ? 180 : 90,
      order: 1,
      completed: false
    },
    {
      id: 'rep-2',
      title: 'Create Outline',
      description: 'Structure report, organize sections, key points',
      estimatedDuration: 30,
      order: 2,
      completed: false
    },
    {
      id: 'rep-3',
      title: 'Write Introduction',
      description: 'Executive summary, objectives, scope',
      estimatedDuration: 45,
      order: 3,
      completed: false,
      dependsOn: ['rep-2']
    },
    {
      id: 'rep-4',
      title: 'Write Main Content',
      description: 'Develop all sections, analysis, findings',
      estimatedDuration: complexity === 'complex' ? 240 : 120,
      order: 4,
      completed: false,
      dependsOn: ['rep-3']
    },
    {
      id: 'rep-5',
      title: 'Add Visuals & Data',
      description: 'Insert charts, tables, graphs, images',
      estimatedDuration: 60,
      order: 5,
      completed: false,
      dependsOn: ['rep-4']
    },
    {
      id: 'rep-6',
      title: 'Write Conclusion',
      description: 'Summarize findings, recommendations, next steps',
      estimatedDuration: 30,
      order: 6,
      completed: false,
      dependsOn: ['rep-5']
    },
    {
      id: 'rep-7',
      title: 'Review & Edit',
      description: 'Proofread, fact-check, format, citations',
      estimatedDuration: 90,
      order: 7,
      completed: false,
      dependsOn: ['rep-6']
    }
  ]
}

/**
 * Break down event planning
 */
function breakdownEvent(title: string, complexity: TaskBreakdown['complexity']): SubTask[] {
  return [
    {
      id: 'evt-1',
      title: 'Define Event Scope',
      description: 'Purpose, objectives, target audience, date & time',
      estimatedDuration: 30,
      order: 1,
      completed: false
    },
    {
      id: 'evt-2',
      title: 'Budget Planning',
      description: 'Estimate costs, allocate resources, secure funding',
      estimatedDuration: 45,
      order: 2,
      completed: false
    },
    {
      id: 'evt-3',
      title: 'Book Venue',
      description: 'Research locations, compare options, make reservation',
      estimatedDuration: 90,
      order: 3,
      completed: false
    },
    {
      id: 'evt-4',
      title: 'Create Guest List',
      description: 'Identify attendees, collect contact info, send invites',
      estimatedDuration: 60,
      order: 4,
      completed: false
    },
    {
      id: 'evt-5',
      title: 'Plan Agenda',
      description: 'Schedule activities, speakers, breaks, timeline',
      estimatedDuration: 45,
      order: 5,
      completed: false
    },
    {
      id: 'evt-6',
      title: 'Arrange Catering & Logistics',
      description: 'Order food, setup AV, arrange seating, materials',
      estimatedDuration: 120,
      order: 6,
      completed: false,
      dependsOn: ['evt-3']
    },
    {
      id: 'evt-7',
      title: 'Promote Event',
      description: 'Marketing, social media, email campaigns, reminders',
      estimatedDuration: 60,
      order: 7,
      completed: false
    },
    {
      id: 'evt-8',
      title: 'Final Preparations',
      description: 'Confirm RSVPs, finalize details, setup checklist',
      estimatedDuration: 60,
      order: 8,
      completed: false,
      dependsOn: ['evt-4', 'evt-6']
    }
  ]
}

/**
 * Break down launch/release projects
 */
function breakdownLaunch(title: string, complexity: TaskBreakdown['complexity']): SubTask[] {
  return [
    {
      id: 'lnch-1',
      title: 'Pre-Launch Preparation',
      description: 'Final product check, documentation, assets ready',
      estimatedDuration: 120,
      order: 1,
      completed: false
    },
    {
      id: 'lnch-2',
      title: 'Create Launch Plan',
      description: 'Timeline, marketing strategy, channels, messaging',
      estimatedDuration: 90,
      order: 2,
      completed: false
    },
    {
      id: 'lnch-3',
      title: 'Prepare Marketing Materials',
      description: 'Copy, graphics, videos, landing pages, emails',
      estimatedDuration: 180,
      order: 3,
      completed: false
    },
    {
      id: 'lnch-4',
      title: 'Setup Analytics & Tracking',
      description: 'Configure tracking, goals, conversion funnels',
      estimatedDuration: 60,
      order: 4,
      completed: false
    },
    {
      id: 'lnch-5',
      title: 'Soft Launch / Beta',
      description: 'Limited release, gather feedback, fix issues',
      estimatedDuration: 240,
      order: 5,
      completed: false,
      dependsOn: ['lnch-1', 'lnch-4']
    },
    {
      id: 'lnch-6',
      title: 'Execute Launch Campaign',
      description: 'Go live, publish content, email blast, social media',
      estimatedDuration: 120,
      order: 6,
      completed: false,
      dependsOn: ['lnch-5']
    },
    {
      id: 'lnch-7',
      title: 'Monitor & Respond',
      description: 'Track metrics, respond to feedback, fix urgent issues',
      estimatedDuration: 180,
      order: 7,
      completed: false,
      dependsOn: ['lnch-6']
    },
    {
      id: 'lnch-8',
      title: 'Post-Launch Analysis',
      description: 'Review results, document learnings, plan next steps',
      estimatedDuration: 90,
      order: 8,
      completed: false,
      dependsOn: ['lnch-7']
    }
  ]
}

/**
 * Break down learning projects
 */
function breakdownLearning(title: string, complexity: TaskBreakdown['complexity']): SubTask[] {
  return [
    {
      id: 'lrn-1',
      title: 'Define Learning Goals',
      description: 'What to learn, why, success criteria',
      estimatedDuration: 20,
      order: 1,
      completed: false
    },
    {
      id: 'lrn-2',
      title: 'Find Resources',
      description: 'Courses, books, tutorials, documentation',
      estimatedDuration: 45,
      order: 2,
      completed: false
    },
    {
      id: 'lrn-3',
      title: 'Create Study Plan',
      description: 'Schedule learning time, milestones, practice',
      estimatedDuration: 30,
      order: 3,
      completed: false
    },
    {
      id: 'lrn-4',
      title: 'Complete Core Material',
      description: 'Work through lessons, take notes, understand concepts',
      estimatedDuration: complexity === 'complex' ? 480 : 240,
      order: 4,
      completed: false,
      dependsOn: ['lrn-3']
    },
    {
      id: 'lrn-5',
      title: 'Practice & Apply',
      description: 'Hands-on exercises, projects, real-world application',
      estimatedDuration: 180,
      order: 5,
      completed: false,
      dependsOn: ['lrn-4']
    },
    {
      id: 'lrn-6',
      title: 'Review & Test Knowledge',
      description: 'Quiz yourself, review notes, identify gaps',
      estimatedDuration: 90,
      order: 6,
      completed: false,
      dependsOn: ['lrn-5']
    }
  ]
}

/**
 * Break down writing projects
 */
function breakdownWriting(title: string, complexity: TaskBreakdown['complexity']): SubTask[] {
  return [
    {
      id: 'wrt-1',
      title: 'Research & Brainstorm',
      description: 'Gather ideas, sources, inspiration, angles',
      estimatedDuration: 60,
      order: 1,
      completed: false
    },
    {
      id: 'wrt-2',
      title: 'Create Outline',
      description: 'Structure content, organize flow, key points',
      estimatedDuration: 30,
      order: 2,
      completed: false
    },
    {
      id: 'wrt-3',
      title: 'Write First Draft',
      description: 'Get ideas down, don\'t edit yet, complete thoughts',
      estimatedDuration: complexity === 'complex' ? 180 : 90,
      order: 3,
      completed: false,
      dependsOn: ['wrt-2']
    },
    {
      id: 'wrt-4',
      title: 'Revise & Refine',
      description: 'Improve clarity, flow, structure, arguments',
      estimatedDuration: 90,
      order: 4,
      completed: false,
      dependsOn: ['wrt-3']
    },
    {
      id: 'wrt-5',
      title: 'Edit & Proofread',
      description: 'Grammar, spelling, formatting, style',
      estimatedDuration: 45,
      order: 5,
      completed: false,
      dependsOn: ['wrt-4']
    },
    {
      id: 'wrt-6',
      title: 'Get Feedback',
      description: 'Share with others, incorporate suggestions',
      estimatedDuration: 60,
      order: 6,
      completed: false,
      dependsOn: ['wrt-5']
    },
    {
      id: 'wrt-7',
      title: 'Final Polish',
      description: 'Last pass, final tweaks, prepare for publication',
      estimatedDuration: 30,
      order: 7,
      completed: false,
      dependsOn: ['wrt-6']
    }
  ]
}

/**
 * Generic breakdown for any task
 */
function breakdownGeneric(title: string, complexity: TaskBreakdown['complexity']): SubTask[] {
  const subtasks: SubTask[] = [
    {
      id: 'gen-1',
      title: 'Plan & Research',
      description: 'Understand requirements, gather information, create approach',
      estimatedDuration: 45,
      order: 1,
      completed: false
    },
    {
      id: 'gen-2',
      title: 'Setup & Preparation',
      description: 'Gather tools, materials, resources needed',
      estimatedDuration: 30,
      order: 2,
      completed: false
    },
    {
      id: 'gen-3',
      title: 'Execute Main Work',
      description: 'Complete the core task activities',
      estimatedDuration: complexity === 'complex' ? 180 : 90,
      order: 3,
      completed: false,
      dependsOn: ['gen-2']
    },
    {
      id: 'gen-4',
      title: 'Review & Refine',
      description: 'Check quality, make improvements, fix issues',
      estimatedDuration: 60,
      order: 4,
      completed: false,
      dependsOn: ['gen-3']
    },
    {
      id: 'gen-5',
      title: 'Finalize & Complete',
      description: 'Final touches, documentation, handoff',
      estimatedDuration: 30,
      order: 5,
      completed: false,
      dependsOn: ['gen-4']
    }
  ]
  
  return complexity === 'simple' ? subtasks.slice(0, 3) : subtasks
}

/**
 * Determine strategy description
 */
function determineStrategy(title: string, complexity: TaskBreakdown['complexity']): string {
  const strategies = {
    'very-complex': 'Large project requiring systematic planning and execution across multiple phases',
    'complex': 'Substantial task best approached through structured breakdown and sequential completion',
    'moderate': 'Multi-step task benefiting from organized phases and clear milestones',
    'simple': 'Straightforward task with clear steps to completion'
  }
  
  return strategies[complexity]
}

/**
 * Save breakdown for a task
 */
export function saveTaskBreakdown(taskId: string, breakdown: TaskBreakdown): void {
  if (typeof window === 'undefined') return
  
  try {
    const key = `task_breakdown_${taskId}`
    localStorage.setItem(key, JSON.stringify(breakdown))
    console.log(`📋 Task breakdown saved for task: ${taskId}`)
  } catch (error) {
    console.error('Error saving task breakdown:', error)
  }
}

/**
 * Load breakdown for a task
 */
export function loadTaskBreakdown(taskId: string): TaskBreakdown | null {
  if (typeof window === 'undefined') return null
  
  try {
    const key = `task_breakdown_${taskId}`
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : null
  } catch (error) {
    console.error('Error loading task breakdown:', error)
    return null
  }
}

/**
 * Update subtask completion status
 */
export function updateSubtaskStatus(taskId: string, subtaskId: string, completed: boolean): boolean {
  const breakdown = loadTaskBreakdown(taskId)
  if (!breakdown) return false
  
  const subtask = breakdown.subtasks.find(st => st.id === subtaskId)
  if (!subtask) return false
  
  subtask.completed = completed
  saveTaskBreakdown(taskId, breakdown)
  
  console.log(`✓ Subtask ${subtaskId} marked as ${completed ? 'complete' : 'incomplete'}`)
  return true
}

/**
 * Get breakdown progress
 */
export function getBreakdownProgress(taskId: string): {
  total: number
  completed: number
  percentage: number
} | null {
  const breakdown = loadTaskBreakdown(taskId)
  if (!breakdown) return null
  
  const total = breakdown.subtasks.length
  const completed = breakdown.subtasks.filter(st => st.completed).length
  const percentage = (completed / total) * 100
  
  return { total, completed, percentage }
}

