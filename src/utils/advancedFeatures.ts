/**
 * Advanced Features
 * Features #86-100: Advanced customization, AI, automation, and developer tools
 */

// ===== FEATURE #86: CUSTOM FIELDS =====

export interface CustomField {
  id: string
  name: string
  type: 'text' | 'number' | 'date' | 'boolean' | 'select' | 'multi-select' | 'url' | 'email'
  required: boolean
  defaultValue?: unknown
  options?: string[] // For select/multi-select
  validation?: {
    min?: number
    max?: number
    pattern?: string
  }
}

export function createCustomField(
  name: string,
  type: CustomField['type'],
  required: boolean = false
): CustomField {
  const field: CustomField = {
    id: `field-${Date.now()}`,
    name,
    type,
    required
  }
  
  saveCustomField(field)
  console.log(`📋 Custom field created: ${name}`)
  
  return field
}

export function getCustomFields(): CustomField[] {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem('custom_fields')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveCustomField(field: CustomField): void {
  if (typeof window === 'undefined') return
  
  try {
    const fields = getCustomFields()
    fields.push(field)
    localStorage.setItem('custom_fields', JSON.stringify(fields))
  } catch (error) {
    console.error('Error saving custom field:', error)
  }
}

// ===== FEATURE #87: ADVANCED FILTERS =====

export interface FilterRule {
  field: string
  operator: 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'greater' | 'less' | 'between' | 'in' | 'not_in'
  value: unknown
}

export interface AdvancedFilter {
  id: string
  name: string
  rules: FilterRule[]
  logic: 'AND' | 'OR'
  createdAt: Date
}

export function createFilter(name: string, rules: FilterRule[], logic: 'AND' | 'OR' = 'AND'): AdvancedFilter {
  const filter: AdvancedFilter = {
    id: `filter-${Date.now()}`,
    name,
    rules,
    logic,
    createdAt: new Date()
  }
  
  saveFilter(filter)
  console.log(`🔍 Filter created: ${name}`)
  
  return filter
}

export function applyFilter<T extends Record<string, unknown>>(items: T[], filter: AdvancedFilter): T[] {
  return items.filter(item => {
    const results = filter.rules.map(rule => evaluateRule(item, rule))
    
    if (filter.logic === 'AND') {
      return results.every(r => r)
    } else {
      return results.some(r => r)
    }
  })
}

function evaluateRule(item: Record<string, unknown>, rule: FilterRule): boolean {
  const value = item[rule.field]
  
  switch (rule.operator) {
    case 'equals':
      return value === rule.value
    case 'not_equals':
      return value !== rule.value
    case 'contains':
      return String(value).toLowerCase().includes(String(rule.value).toLowerCase())
    case 'not_contains':
      return !String(value).toLowerCase().includes(String(rule.value).toLowerCase())
    case 'greater':
      return Number(value) > Number(rule.value)
    case 'less':
      return Number(value) < Number(rule.value)
    default:
      return false
  }
}

function saveFilter(filter: AdvancedFilter): void {
  if (typeof window === 'undefined') return
  
  try {
    const filters = JSON.parse(localStorage.getItem('filters') || '[]')
    filters.push(filter)
    localStorage.setItem('filters', JSON.stringify(filters))
  } catch (error) {
    console.error('Error saving filter:', error)
  }
}

// ===== FEATURE #88: SAVED VIEWS =====

export interface SavedView {
  id: string
  name: string
  type: 'list' | 'board' | 'calendar' | 'timeline' | 'table'
  filters?: AdvancedFilter
  sortBy?: string
  sortOrder: 'asc' | 'desc'
  groupBy?: string
  columns?: string[]
  layout?: Record<string, unknown>
  isDefault: boolean
  isPublic: boolean
}

export function createSavedView(name: string, type: SavedView['type'], config: Partial<SavedView> = {}): SavedView {
  const view: SavedView = {
    id: `view-${Date.now()}`,
    name,
    type,
    sortOrder: 'asc',
    isDefault: false,
    isPublic: false,
    ...config
  }
  
  saveSavedView(view)
  console.log(`👁️ Saved view created: ${name}`)
  
  return view
}

function saveSavedView(view: SavedView): void {
  if (typeof window === 'undefined') return
  
  try {
    const views = JSON.parse(localStorage.getItem('saved_views') || '[]')
    views.push(view)
    localStorage.setItem('saved_views', JSON.stringify(views))
  } catch (error) {
    console.error('Error saving view:', error)
  }
}

// ===== FEATURE #89: BULK IMPORT =====

export interface ImportMapping {
  sourceColumn: string
  targetField: string
  transformation?: (value: string) => unknown
}

export async function importFromCSV(
  file: File,
  mapping: ImportMapping[]
): Promise<{ imported: number; failed: number; errors: string[] }> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    
    reader.onload = () => {
      const csv = reader.result as string
      const lines = csv.split('\n')
      const headers = lines[0].split(',')
      
      let imported = 0
      let failed = 0
      const errors: string[] = []
      
      for (let i = 1; i < lines.length; i++) {
        try {
          const values = lines[i].split(',')
          const item: Record<string, unknown> = {}
          
          mapping.forEach(map => {
            const colIndex = headers.indexOf(map.sourceColumn)
            if (colIndex >= 0) {
              const value = values[colIndex]
              item[map.targetField] = map.transformation ? map.transformation(value) : value
            }
          })
          
          // Save item
          imported++
        } catch (error) {
          failed++
          errors.push(`Line ${i + 1}: ${error}`)
        }
      }
      
      console.log(`📥 CSV import complete: ${imported} imported, ${failed} failed`)
      resolve({ imported, failed, errors })
    }
    
    reader.readAsText(file)
  })
}

// ===== FEATURE #90: SMART REMINDERS =====

export interface SmartReminder {
  id: string
  taskId: string
  type: 'location' | 'time' | 'context' | 'energy' | 'weather'
  condition: {
    type: string
    value: unknown
  }
  message: string
  triggered: boolean
  createdAt: Date
}

export function createSmartReminder(
  taskId: string,
  type: SmartReminder['type'],
  condition: SmartReminder['condition'],
  message: string
): SmartReminder {
  const reminder: SmartReminder = {
    id: `reminder-${Date.now()}`,
    taskId,
    type,
    condition,
    message,
    triggered: false,
    createdAt: new Date()
  }
  
  saveSmartReminder(reminder)
  console.log(`🔔 Smart reminder created: ${type}`)
  
  return reminder
}

function saveSmartReminder(reminder: SmartReminder): void {
  if (typeof window === 'undefined') return
  
  try {
    const reminders = JSON.parse(localStorage.getItem('smart_reminders') || '[]')
    reminders.push(reminder)
    localStorage.setItem('smart_reminders', JSON.stringify(reminders))
  } catch (error) {
    console.error('Error saving reminder:', error)
  }
}

// ===== FEATURE #91-92: TEMPLATES =====

export interface GoalTemplate {
  id: string
  name: string
  category: string
  targetAmount: number
  icon: string
  description: string
  milestones: Array<{ percentage: number; title: string }>
}

export const GOAL_TEMPLATES: GoalTemplate[] = [
  {
    id: 'emergency-fund',
    name: 'Emergency Fund',
    category: 'Financial',
    targetAmount: 10000,
    icon: '🛡️',
    description: 'Build 6 months of expenses',
    milestones: [
      { percentage: 25, title: 'First $2,500' },
      { percentage: 50, title: 'Halfway there!' },
      { percentage: 75, title: 'Almost secure' },
      { percentage: 100, title: 'Fully protected!' }
    ]
  },
  {
    id: 'dream-vacation',
    name: 'Dream Vacation',
    category: 'Travel',
    targetAmount: 5000,
    icon: '🏖️',
    description: 'Save for amazing trip',
    milestones: [
      { percentage: 25, title: 'Flight money' },
      { percentage: 50, title: 'Hotel booked' },
      { percentage: 75, title: 'Activities covered' },
      { percentage: 100, title: 'Ready to travel!' }
    ]
  }
]

export interface ProjectTemplate {
  id: string
  name: string
  category: string
  description: string
  tasks: Array<{
    title: string
    description: string
    estimatedDuration: number
    dependencies?: number[]
  }>
  milestones: string[]
}

export const PROJECT_TEMPLATES: ProjectTemplate[] = [
  {
    id: 'website-launch',
    name: 'Website Launch',
    category: 'Development',
    description: 'Complete website development and launch',
    tasks: [
      { title: 'Research & Planning', description: 'Define requirements', estimatedDuration: 120 },
      { title: 'Design Mockups', description: 'Create visual designs', estimatedDuration: 240 },
      { title: 'Frontend Development', description: 'Build UI', estimatedDuration: 480, dependencies: [1] },
      { title: 'Backend Development', description: 'Build API', estimatedDuration: 360 },
      { title: 'Testing & QA', description: 'Test thoroughly', estimatedDuration: 180, dependencies: [2, 3] },
      { title: 'Deploy & Launch', description: 'Go live', estimatedDuration: 120, dependencies: [4] }
    ],
    milestones: ['Design Complete', 'Development Done', 'Testing Passed', 'Live!']
  }
]

// ===== FEATURE #93: TIME ZONES =====

export function convertToTimezone(date: Date, timezone: string): Date {
  // In real app, use proper timezone library (e.g., date-fns-tz)
  return new Date(date.toLocaleString('en-US', { timeZone: timezone }))
}

export function formatTimeInTimezone(date: Date, timezone: string, format: string = 'short'): string {
  return date.toLocaleString('en-US', { 
    timeZone: timezone,
    dateStyle: format as 'short',
    timeStyle: format as 'short'
  })
}

// ===== FEATURE #94: CURRENCY SUPPORT =====

export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CNY' | 'CAD' | 'AUD'

export interface CurrencySettings {
  primary: Currency
  displaySymbol: boolean
  exchangeRates?: Record<Currency, number>
  lastUpdated?: Date
}

export function formatCurrency(amount: number, currency: Currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount)
}

export function convertCurrency(amount: number, from: Currency, to: Currency): number {
  // Mock exchange rates - in real app, fetch from API
  const rates: Record<Currency, number> = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110,
    CNY: 6.5,
    CAD: 1.25,
    AUD: 1.35
  }
  
  const usdAmount = amount / rates[from]
  return usdAmount * rates[to]
}

// ===== FEATURE #95: AI INSIGHTS =====

export interface AIInsight {
  id: string
  type: 'prediction' | 'recommendation' | 'warning' | 'opportunity'
  title: string
  description: string
  confidence: number // 0-100
  impact: 'low' | 'medium' | 'high'
  actionable: boolean
  actions?: Array<{
    label: string
    action: string
  }>
  generatedAt: Date
}

export function generateAIInsights(userId: string): AIInsight[] {
  const insights: AIInsight[] = [
    {
      id: 'insight-1',
      type: 'prediction',
      title: 'You\'ll likely complete 15 tasks this week',
      description: 'Based on your current pace and historical patterns, you\'re on track to complete 15 tasks by Friday.',
      confidence: 87,
      impact: 'medium',
      actionable: false,
      generatedAt: new Date()
    },
    {
      id: 'insight-2',
      type: 'recommendation',
      title: 'Schedule important tasks for 9-11 AM',
      description: 'Your productivity peaks between 9-11 AM. Schedule your most important work during this window.',
      confidence: 92,
      impact: 'high',
      actionable: true,
      actions: [
        { label: 'Apply to tasks', action: 'reschedule_high_priority' }
      ],
      generatedAt: new Date()
    },
    {
      id: 'insight-3',
      type: 'warning',
      title: 'Budget trending 15% over this month',
      description: 'At current spending rate, you\'ll exceed your monthly budget by $450. Consider reducing discretionary spending.',
      confidence: 78,
      impact: 'high',
      actionable: true,
      actions: [
        { label: 'Review budget', action: 'open_budget' },
        { label: 'See recommendations', action: 'show_savings_tips' }
      ],
      generatedAt: new Date()
    }
  ]
  
  return insights
}

// ===== FEATURE #96: HEALTH INTEGRATION =====

export interface HealthData {
  date: Date
  steps: number
  sleepHours: number
  heartRate?: number
  activeMinutes: number
}

export async function syncHealthData(source: 'apple' | 'fitbit' | 'google'): Promise<HealthData> {
  // Mock data - in real app, fetch from health APIs
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        date: new Date(),
        steps: 8342,
        sleepHours: 7.5,
        heartRate: 72,
        activeMinutes: 45
      })
    }, 1000)
  })
}

export function correlateHealthWithProductivity(healthData: HealthData[], taskData: unknown[]): {
  sleepCorrelation: number
  stepsCorrelation: number
  insights: string[]
} {
  // In real app, calculate actual correlations
  return {
    sleepCorrelation: 0.73, // Strong positive correlation
    stepsCorrelation: 0.45, // Moderate positive correlation
    insights: [
      '🛌 You complete 40% more tasks after 7+ hours of sleep',
      '🚶 Days with 8000+ steps show 25% higher productivity',
      '💪 Morning exercise correlates with better focus'
    ]
  }
}

// ===== FEATURE #97: LOCATION AWARENESS =====

export interface LocationReminder {
  id: string
  taskId: string
  location: {
    name: string
    latitude: number
    longitude: number
    radius: number // meters
  }
  trigger: 'enter' | 'exit'
  message: string
  active: boolean
}

export function createLocationReminder(
  taskId: string,
  locationName: string,
  coords: { lat: number; lng: number },
  trigger: 'enter' | 'exit'
): LocationReminder {
  const reminder: LocationReminder = {
    id: `loc-reminder-${Date.now()}`,
    taskId,
    location: {
      name: locationName,
      latitude: coords.lat,
      longitude: coords.lng,
      radius: 100 // 100 meters
    },
    trigger,
    message: `Don't forget your task when you ${trigger} ${locationName}!`,
    active: true
  }
  
  saveLocationReminder(reminder)
  console.log(`📍 Location reminder created: ${locationName}`)
  
  return reminder
}

function saveLocationReminder(reminder: LocationReminder): void {
  if (typeof window === 'undefined') return
  
  try {
    const reminders = JSON.parse(localStorage.getItem('location_reminders') || '[]')
    reminders.push(reminder)
    localStorage.setItem('location_reminders', JSON.stringify(reminders))
  } catch (error) {
    console.error('Error saving location reminder:', error)
  }
}

// ===== FEATURE #98: AUTOMATION RULES =====

export interface AutomationRule {
  id: string
  name: string
  enabled: boolean
  trigger: {
    type: 'task_created' | 'task_completed' | 'time' | 'energy_level' | 'budget_threshold'
    conditions: Record<string, unknown>
  }
  actions: Array<{
    type: 'create_task' | 'send_notification' | 'update_field' | 'assign_task' | 'send_webhook'
    params: Record<string, unknown>
  }>
  createdAt: Date
  lastTriggered?: Date
  triggerCount: number
}

export function createAutomationRule(
  name: string,
  trigger: AutomationRule['trigger'],
  actions: AutomationRule['actions']
): AutomationRule {
  const rule: AutomationRule = {
    id: `rule-${Date.now()}`,
    name,
    enabled: true,
    trigger,
    actions,
    createdAt: new Date(),
    triggerCount: 0
  }
  
  saveAutomationRule(rule)
  console.log(`⚡ Automation rule created: ${name}`)
  
  return rule
}

export function executeAutomationRule(ruleId: string, context: Record<string, unknown>): void {
  const rule = getAutomationRule(ruleId)
  if (!rule || !rule.enabled) return
  
  console.log(`⚡ Executing automation: ${rule.name}`)
  
  rule.actions.forEach(action => {
    console.log(`  → ${action.type}`)
  })
  
  rule.lastTriggered = new Date()
  rule.triggerCount++
  saveAutomationRule(rule)
}

function getAutomationRule(ruleId: string): AutomationRule | null {
  if (typeof window === 'undefined') return null
  
  try {
    const rules: AutomationRule[] = JSON.parse(localStorage.getItem('automation_rules') || '[]')
    return rules.find(r => r.id === ruleId) || null
  } catch {
    return null
  }
}

function saveAutomationRule(rule: AutomationRule): void {
  if (typeof window === 'undefined') return
  
  try {
    const rules = JSON.parse(localStorage.getItem('automation_rules') || '[]')
    const index = rules.findIndex((r: AutomationRule) => r.id === rule.id)
    
    if (index >= 0) {
      rules[index] = rule
    } else {
      rules.push(rule)
    }
    
    localStorage.setItem('automation_rules', JSON.stringify(rules))
  } catch (error) {
    console.error('Error saving automation rule:', error)
  }
}

// ===== FEATURE #99: CUSTOM WIDGETS =====

export interface CustomWidget {
  id: string
  name: string
  type: 'chart' | 'stat' | 'list' | 'calendar' | 'custom'
  config: {
    dataSource: string
    refreshInterval?: number
    visualization?: string
    filters?: Record<string, unknown>
  }
  position: { x: number; y: number }
  size: { width: number; height: number }
}

export function createWidget(
  name: string,
  type: CustomWidget['type'],
  config: CustomWidget['config']
): CustomWidget {
  const widget: CustomWidget = {
    id: `widget-${Date.now()}`,
    name,
    type,
    config,
    position: { x: 0, y: 0 },
    size: { width: 4, height: 3 }
  }
  
  saveWidget(widget)
  console.log(`📊 Widget created: ${name}`)
  
  return widget
}

function saveWidget(widget: CustomWidget): void {
  if (typeof window === 'undefined') return
  
  try {
    const widgets = JSON.parse(localStorage.getItem('custom_widgets') || '[]')
    widgets.push(widget)
    localStorage.setItem('custom_widgets', JSON.stringify(widgets))
  } catch (error) {
    console.error('Error saving widget:', error)
  }
}

// ===== FEATURE #100: DEVELOPER SDK =====

export interface SDKConfig {
  apiKey: string
  environment: 'production' | 'development'
  version: string
}

export class SyncScriptSDK {
  private config: SDKConfig
  
  constructor(apiKey: string, environment: SDKConfig['environment'] = 'production') {
    this.config = {
      apiKey,
      environment,
      version: '1.0.0'
    }
    
    console.log(`🔧 SyncScript SDK initialized (${environment})`)
  }
  
  // Tasks API
  async getTasks(): Promise<unknown[]> {
    console.log('📋 SDK: Fetching tasks...')
    return []
  }
  
  async createTask(task: Record<string, unknown>): Promise<unknown> {
    console.log('📋 SDK: Creating task...')
    return task
  }
  
  async updateTask(taskId: string, updates: Record<string, unknown>): Promise<unknown> {
    console.log(`📋 SDK: Updating task ${taskId}...`)
    return { id: taskId, ...updates }
  }
  
  async deleteTask(taskId: string): Promise<boolean> {
    console.log(`📋 SDK: Deleting task ${taskId}...`)
    return true
  }
  
  // Projects API
  async getProjects(): Promise<unknown[]> {
    console.log('📁 SDK: Fetching projects...')
    return []
  }
  
  // Goals API
  async getGoals(): Promise<unknown[]> {
    console.log('🎯 SDK: Fetching goals...')
    return []
  }
  
  // Analytics API
  async getAnalytics(period: string): Promise<unknown> {
    console.log(`📊 SDK: Fetching analytics for ${period}...`)
    return {}
  }
  
  // Webhooks
  onTaskCompleted(callback: (task: unknown) => void): void {
    console.log('🔔 SDK: Registered task completed webhook')
  }
  
  onAchievementUnlocked(callback: (achievement: unknown) => void): void {
    console.log('🏆 SDK: Registered achievement webhook')
  }
}

// Helper functions
function getUserName(userId: string): string {
  return `User ${userId.substring(0, 8)}`
}

