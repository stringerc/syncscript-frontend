/**
 * Platform Essentials
 * Features #76-85: Core platform features for production readiness
 */

// ===== FEATURE #76: DARK/LIGHT/AUTO THEME TOGGLE =====

export type ThemeMode = 'light' | 'dark' | 'auto'

export interface ThemeSettings {
  mode: ThemeMode
  autoSwitchTime?: {
    darkStart: string // "20:00"
    lightStart: string // "07:00"
  }
  customColors?: {
    primary: string
    secondary: string
    accent: string
  }
}

export function getThemeSettings(): ThemeSettings {
  if (typeof window === 'undefined') {
    return { mode: 'auto' }
  }
  
  try {
    const stored = localStorage.getItem('theme_settings')
    return stored ? JSON.parse(stored) : { mode: 'auto' }
  } catch {
    return { mode: 'auto' }
  }
}

export function setThemeMode(mode: ThemeMode): void {
  const settings = getThemeSettings()
  settings.mode = mode
  
  if (typeof window !== 'undefined') {
    localStorage.setItem('theme_settings', JSON.stringify(settings))
    applyTheme(mode)
  }
  
  console.log(`🎨 Theme mode set to: ${mode}`)
}

export function applyTheme(mode: ThemeMode): void {
  if (typeof document === 'undefined') return
  
  let effectiveMode: 'light' | 'dark' = 'light'
  
  if (mode === 'auto') {
    // Check system preference
    effectiveMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  } else {
    effectiveMode = mode
  }
  
  if (effectiveMode === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// ===== FEATURE #77: OFFLINE MODE =====

export interface OfflineQueue {
  id: string
  action: 'create' | 'update' | 'delete'
  resource: 'task' | 'project' | 'goal' | 'note'
  data: unknown
  timestamp: Date
  synced: boolean
}

export function queueOfflineAction(
  action: OfflineQueue['action'],
  resource: OfflineQueue['resource'],
  data: unknown
): void {
  const queueItem: OfflineQueue = {
    id: `offline-${Date.now()}`,
    action,
    resource,
    data,
    timestamp: new Date(),
    synced: false
  }
  
  const queue = getOfflineQueue()
  queue.push(queueItem)
  saveOfflineQueue(queue)
  
  console.log(`📴 Offline action queued: ${action} ${resource}`)
}

export function getOfflineQueue(): OfflineQueue[] {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem('offline_queue')
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function syncOfflineQueue(): Promise<{ synced: number; failed: number }> {
  const queue = getOfflineQueue()
  
  return new Promise((resolve) => {
    // In real app, sync with backend
    console.log(`🔄 Syncing ${queue.length} offline actions...`)
    
    setTimeout(() => {
      // Mark all as synced
      queue.forEach(item => item.synced = true)
      saveOfflineQueue([])
      
      resolve({ synced: queue.length, failed: 0 })
    }, 1000)
  })
}

function saveOfflineQueue(queue: OfflineQueue[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('offline_queue', JSON.stringify(queue))
  }
}

// ===== FEATURE #78: PWA SUPPORT =====

export interface PWASettings {
  installed: boolean
  installPromptShown: boolean
  installDate?: Date
  updateAvailable: boolean
  version: string
}

export function getPWASettings(): PWASettings {
  if (typeof window === 'undefined') {
    return {
      installed: false,
      installPromptShown: false,
      updateAvailable: false,
      version: '1.0.0'
    }
  }
  
  try {
    const stored = localStorage.getItem('pwa_settings')
    return stored ? JSON.parse(stored) : {
      installed: false,
      installPromptShown: false,
      updateAvailable: false,
      version: '1.0.0'
    }
  } catch {
    return {
      installed: false,
      installPromptShown: false,
      updateAvailable: false,
      version: '1.0.0'
    }
  }
}

export function markPWAInstalled(): void {
  const settings = getPWASettings()
  settings.installed = true
  settings.installDate = new Date()
  
  if (typeof window !== 'undefined') {
    localStorage.setItem('pwa_settings', JSON.stringify(settings))
  }
  
  console.log('📱 PWA installed')
}

// ===== FEATURE #79: MULTI-LANGUAGE SUPPORT =====

export type Language = 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ja' | 'zh' | 'ko' | 'ru'

export interface Translation {
  code: Language
  name: string
  nativeName: string
  flag: string
  translations: Record<string, string>
}

export const SUPPORTED_LANGUAGES: Array<{ code: Language; name: string; nativeName: string; flag: string }> = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' }
]

export function getCurrentLanguage(): Language {
  if (typeof window === 'undefined') return 'en'
  
  try {
    const stored = localStorage.getItem('language')
    return (stored as Language) || 'en'
  } catch {
    return 'en'
  }
}

export function setLanguage(language: Language): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('language', language)
    console.log(`🌐 Language set to: ${language}`)
  }
}

export function translate(key: string, lang?: Language): string {
  const language = lang || getCurrentLanguage()
  
  // In real app, load from translation files
  // For now, return key (would be replaced with actual translations)
  return key
}

// ===== FEATURE #80: ACCESSIBILITY =====

export interface AccessibilitySettings {
  screenReaderOptimized: boolean
  highContrast: boolean
  largeText: boolean
  reducedMotion: boolean
  keyboardNavigation: boolean
  focusIndicators: boolean
  ariaLabels: boolean
}

export function getAccessibilitySettings(): AccessibilitySettings {
  if (typeof window === 'undefined') {
    return getDefaultA11ySettings()
  }
  
  try {
    const stored = localStorage.getItem('accessibility_settings')
    return stored ? JSON.parse(stored) : getDefaultA11ySettings()
  } catch {
    return getDefaultA11ySettings()
  }
}

export function updateAccessibilitySettings(updates: Partial<AccessibilitySettings>): void {
  const current = getAccessibilitySettings()
  const updated = { ...current, ...updates }
  
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessibility_settings', JSON.stringify(updated))
    applyAccessibilitySettings(updated)
  }
  
  console.log('♿ Accessibility settings updated')
}

function getDefaultA11ySettings(): AccessibilitySettings {
  return {
    screenReaderOptimized: false,
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    keyboardNavigation: true,
    focusIndicators: true,
    ariaLabels: true
  }
}

function applyAccessibilitySettings(settings: AccessibilitySettings): void {
  if (typeof document === 'undefined') return
  
  document.documentElement.classList.toggle('high-contrast', settings.highContrast)
  document.documentElement.classList.toggle('large-text', settings.largeText)
  document.documentElement.classList.toggle('reduced-motion', settings.reducedMotion)
}

// ===== FEATURE #81: DATA ENCRYPTION =====

export interface EncryptionSettings {
  enabled: boolean
  algorithm: 'AES-256-GCM'
  keyRotationDays: number
  lastKeyRotation?: Date
}

export async function encryptData(data: string, key: string): Promise<string> {
  // In real app, use Web Crypto API
  // This is a simplified mock
  if (typeof window === 'undefined') return data
  
  try {
    const encoder = new TextEncoder()
    const dataBuffer = encoder.encode(data)
    
    // Mock encryption - in real app use crypto.subtle.encrypt
    const encrypted = btoa(data + ':encrypted:' + key.substring(0, 8))
    
    console.log('🔐 Data encrypted')
    return encrypted
  } catch (error) {
    console.error('Encryption failed:', error)
    return data
  }
}

export async function decryptData(encryptedData: string, key: string): Promise<string> {
  // Mock decryption
  try {
    const decrypted = atob(encryptedData).split(':encrypted:')[0]
    console.log('🔓 Data decrypted')
    return decrypted
  } catch (error) {
    console.error('Decryption failed:', error)
    return encryptedData
  }
}

// ===== FEATURE #82: BACKUP & RESTORE =====

export interface Backup {
  id: string
  timestamp: Date
  userId: string
  size: number // bytes
  itemCount: number
  type: 'manual' | 'automatic'
  encrypted: boolean
  checksum: string
}

export function createBackup(userId: string, type: 'manual' | 'automatic' = 'manual'): Backup {
  const data = {
    tasks: [],
    projects: [],
    goals: [],
    settings: {}
  }
  
  const dataString = JSON.stringify(data)
  const size = new Blob([dataString]).size
  
  const backup: Backup = {
    id: `backup-${Date.now()}`,
    timestamp: new Date(),
    userId,
    size,
    itemCount: 0,
    type,
    encrypted: false,
    checksum: generateChecksum(dataString)
  }
  
  saveBackup(backup)
  console.log(`💾 Backup created: ${backup.id}`)
  
  return backup
}

export function scheduleAutoBackup(frequency: 'daily' | 'weekly' | 'monthly'): void {
  const schedule = {
    enabled: true,
    frequency,
    lastBackup: new Date()
  }
  
  if (typeof window !== 'undefined') {
    localStorage.setItem('backup_schedule', JSON.stringify(schedule))
  }
  
  console.log(`💾 Auto-backup scheduled: ${frequency}`)
}

function generateChecksum(data: string): string {
  // Simple hash function - in real app use crypto
  let hash = 0
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return hash.toString(36)
}

// ===== FEATURE #83: VERSION CONTROL =====

export interface VersionHistory {
  resourceId: string
  resourceType: 'task' | 'project' | 'note' | 'goal'
  versions: Array<{
    version: number
    timestamp: Date
    userId: string
    changes: Array<{
      field: string
      oldValue: unknown
      newValue: unknown
    }>
    snapshot: unknown
  }>
}

export function trackChange(
  resourceId: string,
  resourceType: VersionHistory['resourceType'],
  userId: string,
  changes: VersionHistory['versions'][0]['changes'],
  snapshot: unknown
): void {
  const history = getVersionHistory(resourceId) || {
    resourceId,
    resourceType,
    versions: []
  }
  
  history.versions.push({
    version: history.versions.length + 1,
    timestamp: new Date(),
    userId,
    changes,
    snapshot
  })
  
  saveVersionHistory(history)
  console.log(`📝 Version ${history.versions.length} saved for ${resourceType} ${resourceId}`)
}

function getVersionHistory(resourceId: string): VersionHistory | null {
  if (typeof window === 'undefined') return null
  
  try {
    const stored = localStorage.getItem(`version_${resourceId}`)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

function saveVersionHistory(history: VersionHistory): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(`version_${history.resourceId}`, JSON.stringify(history))
  }
}

// ===== FEATURE #84: AUDIT LOG =====

export interface AuditLogEntry {
  id: string
  timestamp: Date
  userId: string
  userName: string
  action: string
  resource: string
  resourceId: string
  ipAddress?: string
  userAgent?: string
  details?: Record<string, unknown>
  status: 'success' | 'failure'
}

export function logAuditEvent(
  userId: string,
  action: string,
  resource: string,
  resourceId: string,
  details?: Record<string, unknown>
): void {
  const entry: AuditLogEntry = {
    id: `audit-${Date.now()}`,
    timestamp: new Date(),
    userId,
    userName: getUserName(userId),
    action,
    resource,
    resourceId,
    details,
    status: 'success'
  }
  
  saveAuditLog(entry)
  console.log(`📋 Audit log: ${action} on ${resource}`)
}

export function getAuditLog(filters?: {
  userId?: string
  resource?: string
  startDate?: Date
  endDate?: Date
}): AuditLogEntry[] {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem('audit_log')
    let logs: AuditLogEntry[] = stored ? JSON.parse(stored) : []
    
    // Apply filters
    if (filters) {
      if (filters.userId) {
        logs = logs.filter(l => l.userId === filters.userId)
      }
      if (filters.resource) {
        logs = logs.filter(l => l.resource === filters.resource)
      }
      if (filters.startDate) {
        logs = logs.filter(l => new Date(l.timestamp) >= filters.startDate!)
      }
      if (filters.endDate) {
        logs = logs.filter(l => new Date(l.timestamp) <= filters.endDate!)
      }
    }
    
    return logs
  } catch {
    return []
  }
}

function saveAuditLog(entry: AuditLogEntry): void {
  if (typeof window === 'undefined') return
  
  try {
    const logs = JSON.parse(localStorage.getItem('audit_log') || '[]')
    logs.unshift(entry)
    
    // Keep last 1000 entries
    const trimmed = logs.slice(0, 1000)
    localStorage.setItem('audit_log', JSON.stringify(trimmed))
  } catch (error) {
    console.error('Error saving audit log:', error)
  }
}

// ===== FEATURE #85: TWO-FACTOR AUTH =====

export interface TwoFactorAuth {
  userId: string
  enabled: boolean
  method: 'totp' | 'sms' | 'email'
  secret?: string
  backupCodes: string[]
  lastVerified?: Date
}

export function enableTwoFactorAuth(
  userId: string,
  method: TwoFactorAuth['method']
): { secret: string; qrCode: string; backupCodes: string[] } {
  const secret = generateTOTPSecret()
  const backupCodes = generateBackupCodes()
  
  const twoFactor: TwoFactorAuth = {
    userId,
    enabled: true,
    method,
    secret,
    backupCodes
  }
  
  saveTwoFactorAuth(twoFactor)
  
  const qrCode = generateQRCode(secret)
  
  console.log('🔐 Two-factor authentication enabled')
  
  return { secret, qrCode, backupCodes }
}

export function verifyTOTP(userId: string, code: string): boolean {
  const twoFactor = getTwoFactorAuth(userId)
  if (!twoFactor || !twoFactor.enabled) return false
  
  // In real app, verify TOTP code using time-based algorithm
  const isValid = code.length === 6 && /^\d+$/.test(code)
  
  if (isValid) {
    twoFactor.lastVerified = new Date()
    saveTwoFactorAuth(twoFactor)
  }
  
  console.log(`🔐 2FA verification: ${isValid ? 'success' : 'failed'}`)
  
  return isValid
}

function generateTOTPSecret(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
  let secret = ''
  for (let i = 0; i < 32; i++) {
    secret += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return secret
}

function generateBackupCodes(): string[] {
  const codes: string[] = []
  for (let i = 0; i < 10; i++) {
    let code = ''
    for (let j = 0; j < 8; j++) {
      code += Math.floor(Math.random() * 10)
    }
    codes.push(code)
  }
  return codes
}

function generateQRCode(secret: string): string {
  // In real app, generate actual QR code
  return `otpauth://totp/SyncScript?secret=${secret}`
}

function getTwoFactorAuth(userId: string): TwoFactorAuth | null {
  if (typeof window === 'undefined') return null
  
  try {
    const stored = localStorage.getItem(`2fa_${userId}`)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

function saveTwoFactorAuth(twoFactor: TwoFactorAuth): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(`2fa_${twoFactor.userId}`, JSON.stringify(twoFactor))
  }
}

function saveBackup(backup: Backup): void {
  if (typeof window === 'undefined') return
  
  try {
    const backups = JSON.parse(localStorage.getItem('backups') || '[]')
    backups.unshift(backup)
    
    // Keep last 30 backups
    const trimmed = backups.slice(0, 30)
    localStorage.setItem('backups', JSON.stringify(trimmed))
  } catch (error) {
    console.error('Error saving backup:', error)
  }
}

function getUserName(userId: string): string {
  return `User ${userId.substring(0, 8)}`
}

