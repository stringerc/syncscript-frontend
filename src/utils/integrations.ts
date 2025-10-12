/**
 * Advanced Integrations
 * Features #66-75: Third-party integrations, API, OAuth, Data portability
 */

// ===== FEATURE #66: SLACK INTEGRATION =====

export interface SlackIntegration {
  workspaceId: string
  slackWorkspaceId: string
  slackWorkspaceName: string
  accessToken: string
  botToken: string
  channels: Array<{
    id: string
    name: string
    syncTasks: boolean
    syncNotifications: boolean
  }>
  settings: {
    syncTasksToSlack: boolean
    syncSlackMessagesToTasks: boolean
    notifyOnTaskComplete: boolean
    slashCommandsEnabled: boolean
  }
}

export function connectSlack(
  workspaceId: string,
  authCode: string
): Promise<SlackIntegration> {
  // In real app, exchange auth code for tokens with Slack API
  return new Promise((resolve) => {
    setTimeout(() => {
      const integration: SlackIntegration = {
        workspaceId,
        slackWorkspaceId: 'T123456',
        slackWorkspaceName: 'My Slack Workspace',
        accessToken: 'xoxp-mock-token',
        botToken: 'xoxb-mock-bot-token',
        channels: [],
        settings: {
          syncTasksToSlack: true,
          syncSlackMessagesToTasks: false,
          notifyOnTaskComplete: true,
          slashCommandsEnabled: true
        }
      }
      
      saveIntegration('slack', integration)
      console.log('✅ Slack integration connected')
      resolve(integration)
    }, 1000)
  })
}

export function syncTaskToSlack(taskId: string, taskTitle: string, channelId: string): void {
  // In real app, post to Slack API
  console.log(`📤 Task synced to Slack: "${taskTitle}" → #${channelId}`)
}

// ===== FEATURE #67: GOOGLE CALENDAR SYNC =====

export interface GoogleCalendarSync {
  userId: string
  calendarId: string
  calendarName: string
  accessToken: string
  refreshToken: string
  syncDirection: 'one-way' | 'two-way'
  lastSyncTime?: Date
  settings: {
    syncTaskDeadlines: boolean
    syncEvents: boolean
    createTasksFromEvents: boolean
    colorCode: boolean
  }
}

export function connectGoogleCalendar(
  userId: string,
  authCode: string
): Promise<GoogleCalendarSync> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const sync: GoogleCalendarSync = {
        userId,
        calendarId: 'primary',
        calendarName: 'Primary Calendar',
        accessToken: 'ya29.mock-token',
        refreshToken: 'refresh-token',
        syncDirection: 'two-way',
        settings: {
          syncTaskDeadlines: true,
          syncEvents: true,
          createTasksFromEvents: false,
          colorCode: true
        }
      }
      
      saveIntegration('google_calendar', sync)
      console.log('✅ Google Calendar connected')
      resolve(sync)
    }, 1000)
  })
}

export function syncToGoogleCalendar(): void {
  console.log('🔄 Syncing to Google Calendar...')
  // In real app, sync with Google Calendar API
}

// ===== FEATURE #68: TRELLO IMPORT =====

export interface TrelloBoard {
  id: string
  name: string
  lists: Array<{
    id: string
    name: string
    cards: Array<{
      id: string
      name: string
      description?: string
      due?: string
      labels: Array<{name: string; color: string}>
      members: string[]
    }>
  }>
}

export async function importFromTrello(boardUrl: string): Promise<{
  success: boolean
  tasksImported: number
  projectsCreated: number
}> {
  // In real app, use Trello API
  console.log(`📥 Importing from Trello: ${boardUrl}`)
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        tasksImported: 34,
        projectsCreated: 5
      })
    }, 2000)
  })
}

// ===== FEATURE #69: NOTION INTEGRATION =====

export interface NotionDatabase {
  id: string
  name: string
  properties: Record<string, { type: string }>
}

export async function connectNotion(authCode: string): Promise<{
  databases: NotionDatabase[]
}> {
  // In real app, authenticate with Notion API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        databases: [
          {
            id: 'db-1',
            name: 'Tasks Database',
            properties: {
              'Name': { type: 'title' },
              'Status': { type: 'select' },
              'Due Date': { type: 'date' }
            }
          }
        ]
      })
    }, 1000)
  })
}

export function syncNotionDatabase(databaseId: string): void {
  console.log(`🔄 Syncing Notion database: ${databaseId}`)
}

// ===== FEATURE #70: GITHUB INTEGRATION =====

export interface GitHubIntegration {
  userId: string
  username: string
  accessToken: string
  repositories: Array<{
    id: string
    name: string
    fullName: string
    syncIssues: boolean
    syncPRs: boolean
  }>
  settings: {
    createTasksFromIssues: boolean
    trackCommits: boolean
    trackPRs: boolean
    syncLabels: boolean
  }
}

export async function connectGitHub(authCode: string): Promise<GitHubIntegration> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const integration: GitHubIntegration = {
        userId: 'current-user',
        username: 'johndoe',
        accessToken: 'ghp_mock_token',
        repositories: [],
        settings: {
          createTasksFromIssues: true,
          trackCommits: true,
          trackPRs: true,
          syncLabels: true
        }
      }
      
      saveIntegration('github', integration)
      console.log('✅ GitHub integration connected')
      resolve(integration)
    }, 1000)
  })
}

export function trackGitHubActivity(repoId: string): void {
  console.log(`📊 Tracking GitHub activity for repo: ${repoId}`)
}

// ===== FEATURE #71: ZAPIER WEBHOOKS =====

export interface WebhookEndpoint {
  id: string
  name: string
  url: string
  secret: string
  events: Array<'task.created' | 'task.completed' | 'goal.reached' | 'achievement.unlocked'>
  active: boolean
  createdAt: Date
  lastTriggered?: Date
  successCount: number
  failureCount: number
}

export function createWebhook(
  name: string,
  url: string,
  events: WebhookEndpoint['events']
): WebhookEndpoint {
  const webhook: WebhookEndpoint = {
    id: `webhook-${Date.now()}`,
    name,
    url,
    secret: generateWebhookSecret(),
    events,
    active: true,
    createdAt: new Date(),
    successCount: 0,
    failureCount: 0
  }
  
  saveWebhook(webhook)
  console.log(`🔗 Webhook created: ${name}`)
  
  return webhook
}

export function triggerWebhook(
  webhookId: string,
  eventType: string,
  data: Record<string, unknown>
): void {
  const webhook = getWebhook(webhookId)
  if (!webhook || !webhook.active) return
  
  // In real app, make HTTP POST to webhook URL
  console.log(`🔔 Webhook triggered: ${webhook.name} (${eventType})`)
  
  webhook.lastTriggered = new Date()
  webhook.successCount++
  saveWebhook(webhook)
}

function generateWebhookSecret(): string {
  return `whsec_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
}

// ===== FEATURE #72: API ACCESS =====

export interface APIKey {
  id: string
  userId: string
  name: string
  key: string
  permissions: Array<'read' | 'write' | 'delete'>
  rateLimit: number // requests per hour
  createdAt: Date
  lastUsed?: Date
  expiresAt?: Date
  active: boolean
}

export function createAPIKey(
  userId: string,
  name: string,
  permissions: APIKey['permissions']
): APIKey {
  const apiKey: APIKey = {
    id: `key-${Date.now()}`,
    userId,
    name,
    key: `sk_${generateSecureToken()}`,
    permissions,
    rateLimit: 1000,
    createdAt: new Date(),
    active: true
  }
  
  saveAPIKey(apiKey)
  console.log(`🔑 API key created: ${name}`)
  
  return apiKey
}

export function validateAPIKey(key: string): APIKey | null {
  if (typeof window === 'undefined') return null
  
  try {
    const keys: APIKey[] = JSON.parse(localStorage.getItem('api_keys') || '[]')
    const apiKey = keys.find(k => k.key === key && k.active)
    
    if (!apiKey) return null
    
    // Check expiration
    if (apiKey.expiresAt && new Date(apiKey.expiresAt) < new Date()) {
      return null
    }
    
    // Update last used
    apiKey.lastUsed = new Date()
    localStorage.setItem('api_keys', JSON.stringify(keys))
    
    return apiKey
  } catch {
    return null
  }
}

function generateSecureToken(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let token = ''
  for (let i = 0; i < 32; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return token
}

// ===== FEATURE #73: OAUTH PROVIDER =====

export interface OAuthClient {
  clientId: string
  clientSecret: string
  name: string
  redirectUris: string[]
  scopes: string[]
  createdBy: string
  createdAt: Date
}

export function registerOAuthClient(
  name: string,
  redirectUris: string[],
  createdBy: string
): OAuthClient {
  const client: OAuthClient = {
    clientId: `client_${generateSecureToken().substring(0, 16)}`,
    clientSecret: `secret_${generateSecureToken()}`,
    name,
    redirectUris,
    scopes: ['read:tasks', 'write:tasks', 'read:user', 'write:user'],
    createdBy,
    createdAt: new Date()
  }
  
  saveOAuthClient(client)
  console.log(`🔐 OAuth client registered: ${name}`)
  
  return client
}

// ===== FEATURE #74: EXPORT/IMPORT =====

export interface DataExport {
  version: string
  exportedAt: Date
  userId: string
  data: {
    tasks: unknown[]
    projects: unknown[]
    goals: unknown[]
    notes: unknown[]
    achievements: unknown[]
    settings: unknown
  }
}

export function exportAllData(userId: string): DataExport {
  const exportData: DataExport = {
    version: '1.0.0',
    exportedAt: new Date(),
    userId,
    data: {
      tasks: getAllTasks(userId),
      projects: getAllProjects(userId),
      goals: getAllGoals(userId),
      notes: getAllNotes(userId),
      achievements: getAllAchievements(userId),
      settings: getUserSettings(userId)
    }
  }
  
  console.log(`📦 Data exported for user ${userId}`)
  
  return exportData
}

export async function importData(
  userId: string,
  exportData: DataExport
): Promise<{ success: boolean; imported: number; skipped: number }> {
  console.log(`📥 Importing data for user ${userId}...`)
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // In real app, validate and import data
      resolve({
        success: true,
        imported: 145,
        skipped: 3
      })
    }, 2000)
  })
}

export function downloadDataAsJSON(data: DataExport): void {
  const json = JSON.stringify(data, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  
  const a = document.createElement('a')
  a.href = url
  a.download = `syncscript-export-${Date.now()}.json`
  a.click()
  
  URL.revokeObjectURL(url)
  console.log('💾 Data downloaded as JSON')
}

// ===== FEATURE #75: BROWSER EXTENSION =====

export interface ExtensionSettings {
  quickCaptureShortcut: string
  defaultProject?: string
  autoSync: boolean
  showBadge: boolean
  badgeType: 'tasks' | 'notifications' | 'emblems'
  contextMenuEnabled: boolean
}

export function getExtensionSettings(): ExtensionSettings {
  if (typeof window === 'undefined') {
    return getDefaultExtensionSettings()
  }
  
  try {
    const stored = localStorage.getItem('extension_settings')
    return stored ? JSON.parse(stored) : getDefaultExtensionSettings()
  } catch {
    return getDefaultExtensionSettings()
  }
}

export function updateExtensionSettings(updates: Partial<ExtensionSettings>): ExtensionSettings {
  const current = getExtensionSettings()
  const updated = { ...current, ...updates }
  
  if (typeof window !== 'undefined') {
    localStorage.setItem('extension_settings', JSON.stringify(updated))
  }
  
  console.log('🧩 Extension settings updated')
  
  return updated
}

function getDefaultExtensionSettings(): ExtensionSettings {
  return {
    quickCaptureShortcut: 'Ctrl+Shift+A',
    autoSync: true,
    showBadge: true,
    badgeType: 'tasks',
    contextMenuEnabled: true
  }
}

export function captureFromExtension(text: string, url?: string, selection?: string): void {
  const capture = {
    id: `ext-capture-${Date.now()}`,
    text,
    url,
    selection,
    timestamp: new Date()
  }
  
  // Save to quick capture queue
  const captures = JSON.parse(localStorage.getItem('extension_captures') || '[]')
  captures.push(capture)
  localStorage.setItem('extension_captures', JSON.stringify(captures))
  
  console.log(`🧩 Captured from extension: "${text.substring(0, 50)}..."`)
}

// ===== HELPER FUNCTIONS =====

function saveIntegration(type: string, data: unknown): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(`integration_${type}`, JSON.stringify(data))
  } catch (error) {
    console.error(`Error saving ${type} integration:`, error)
  }
}

function saveWebhook(webhook: WebhookEndpoint): void {
  if (typeof window === 'undefined') return
  
  try {
    const webhooks = JSON.parse(localStorage.getItem('webhooks') || '[]')
    const index = webhooks.findIndex((w: WebhookEndpoint) => w.id === webhook.id)
    
    if (index >= 0) {
      webhooks[index] = webhook
    } else {
      webhooks.push(webhook)
    }
    
    localStorage.setItem('webhooks', JSON.stringify(webhooks))
  } catch (error) {
    console.error('Error saving webhook:', error)
  }
}

function getWebhook(webhookId: string): WebhookEndpoint | null {
  if (typeof window === 'undefined') return null
  
  try {
    const webhooks: WebhookEndpoint[] = JSON.parse(localStorage.getItem('webhooks') || '[]')
    return webhooks.find(w => w.id === webhookId) || null
  } catch {
    return null
  }
}

function saveAPIKey(apiKey: APIKey): void {
  if (typeof window === 'undefined') return
  
  try {
    const keys = JSON.parse(localStorage.getItem('api_keys') || '[]')
    keys.push(apiKey)
    localStorage.setItem('api_keys', JSON.stringify(keys))
  } catch (error) {
    console.error('Error saving API key:', error)
  }
}

function saveOAuthClient(client: OAuthClient): void {
  if (typeof window === 'undefined') return
  
  try {
    const clients = JSON.parse(localStorage.getItem('oauth_clients') || '[]')
    clients.push(client)
    localStorage.setItem('oauth_clients', JSON.stringify(clients))
  } catch (error) {
    console.error('Error saving OAuth client:', error)
  }
}

function getAllTasks(userId: string): unknown[] {
  // In real app, fetch all user tasks
  return []
}

function getAllProjects(userId: string): unknown[] {
  return []
}

function getAllGoals(userId: string): unknown[] {
  return []
}

function getAllNotes(userId: string): unknown[] {
  return []
}

function getAllAchievements(userId: string): unknown[] {
  return []
}

function getUserSettings(userId: string): unknown {
  return {}
}

// Export getters
export function getIntegration(type: string): unknown | null {
  if (typeof window === 'undefined') return null
  
  try {
    const stored = localStorage.getItem(`integration_${type}`)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

export function disconnectIntegration(type: string): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(`integration_${type}`)
    console.log(`🔌 ${type} integration disconnected`)
  }
}

export function getAllWebhooks(): WebhookEndpoint[] {
  if (typeof window === 'undefined') return []
  
  try {
    return JSON.parse(localStorage.getItem('webhooks') || '[]')
  } catch {
    return []
  }
}

export function getAllAPIKeys(userId: string): APIKey[] {
  if (typeof window === 'undefined') return []
  
  try {
    const keys: APIKey[] = JSON.parse(localStorage.getItem('api_keys') || '[]')
    return keys.filter(k => k.userId === userId)
  } catch {
    return []
  }
}

export function revokeAPIKey(keyId: string): void {
  if (typeof window === 'undefined') return
  
  try {
    const keys: APIKey[] = JSON.parse(localStorage.getItem('api_keys') || '[]')
    const key = keys.find(k => k.id === keyId)
    
    if (key) {
      key.active = false
      localStorage.setItem('api_keys', JSON.stringify(keys))
      console.log(`🔑 API key revoked: ${key.name}`)
    }
  } catch (error) {
    console.error('Error revoking API key:', error)
  }
}

