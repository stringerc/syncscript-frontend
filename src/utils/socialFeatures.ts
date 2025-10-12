/**
 * Social & Engagement Features
 * Features #58-65: Calendars, Leaderboards, Sharing, Branding, Permissions, Profiles
 */

import { TeamMember, TeamWorkspace, TeamGoal, Notification } from './teamWorkspaces'

// ===== FEATURE #58: SHARED CALENDAR =====

export interface CalendarEvent {
  id: string
  workspaceId: string
  title: string
  description?: string
  startTime: Date
  endTime: Date
  allDay: boolean
  type: 'meeting' | 'deadline' | 'milestone' | 'reminder' | 'event'
  createdBy: string
  attendees: string[]
  location?: string
  color: string
  recurrence?: {
    frequency: 'daily' | 'weekly' | 'monthly'
    interval: number
    endDate?: Date
  }
  reminders: Array<{ minutes: number; sent: boolean }>
}

export function createCalendarEvent(
  workspaceId: string,
  title: string,
  startTime: Date,
  endTime: Date,
  createdBy: string
): CalendarEvent {
  const event: CalendarEvent = {
    id: `evt-${Date.now()}`,
    workspaceId,
    title,
    startTime,
    endTime,
    allDay: false,
    type: 'event',
    createdBy,
    attendees: [createdBy],
    color: '#3B82F6',
    reminders: [
      { minutes: 15, sent: false },
      { minutes: 60, sent: false }
    ]
  }
  
  saveCalendarEvent(event)
  console.log(`📅 Calendar event created: ${title}`)
  
  return event
}

export function getTeamCalendarEvents(workspaceId: string, month: Date): CalendarEvent[] {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(`calendar_${workspaceId}`)
    const allEvents: CalendarEvent[] = stored ? JSON.parse(stored) : []
    
    // Filter to current month
    return allEvents.filter(event => {
      const eventDate = new Date(event.startTime)
      return eventDate.getMonth() === month.getMonth() && 
             eventDate.getFullYear() === month.getFullYear()
    })
  } catch {
    return []
  }
}

// ===== FEATURE #59: TEAM LEADERBOARD =====

export interface LeaderboardEntry {
  rank: number
  userId: string
  userName: string
  avatar?: string
  score: number
  tasksCompleted: number
  emblemsEarned: number
  streak: number
  change: number // Position change from previous period
  badge?: string // Special badge
}

export function generateLeaderboard(
  workspaceId: string,
  period: 'day' | 'week' | 'month' | 'all-time' = 'week'
): LeaderboardEntry[] {
  // Mock data - in real app, calculate from actual stats
  const entries: LeaderboardEntry[] = [
    {
      rank: 1,
      userId: 'user-1',
      userName: 'Alex Johnson',
      avatar: '👨‍💼',
      score: 2450,
      tasksCompleted: 47,
      emblemsEarned: 1250,
      streak: 23,
      change: 2,
      badge: '👑'
    },
    {
      rank: 2,
      userId: 'user-2',
      userName: 'Sarah Chen',
      avatar: '👩‍💻',
      score: 2380,
      tasksCompleted: 45,
      emblemsEarned: 1180,
      streak: 19,
      change: -1,
      badge: '🥈'
    },
    {
      rank: 3,
      userId: 'user-3',
      userName: 'Mike Rodriguez',
      avatar: '👨‍🚀',
      score: 2210,
      tasksCompleted: 42,
      emblemsEarned: 1100,
      streak: 15,
      change: 0,
      badge: '🥉'
    }
  ]
  
  return entries
}

// ===== FEATURE #60: PROGRESS SHARING =====

export interface SharedProgress {
  id: string
  userId: string
  userName: string
  type: 'achievement' | 'streak' | 'goal' | 'milestone'
  title: string
  description: string
  timestamp: Date
  visibility: 'public' | 'team' | 'friends'
  likes: string[] // User IDs who liked
  comments: Array<{
    userId: string
    userName: string
    text: string
    timestamp: Date
  }>
  image?: string
}

export function shareProgress(
  userId: string,
  type: SharedProgress['type'],
  title: string,
  description: string,
  visibility: SharedProgress['visibility'] = 'team'
): SharedProgress {
  const share: SharedProgress = {
    id: `share-${Date.now()}`,
    userId,
    userName: getUserName(userId),
    type,
    title,
    description,
    timestamp: new Date(),
    visibility,
    likes: [],
    comments: []
  }
  
  saveSharedProgress(share)
  console.log(`📈 Progress shared: ${title}`)
  
  return share
}

export function likeProgress(shareId: string, userId: string): void {
  const share = getSharedProgress(shareId)
  if (!share) return
  
  if (!share.likes.includes(userId)) {
    share.likes.push(userId)
    saveSharedProgress(share)
    console.log(`❤️ Progress liked by ${userId}`)
  }
}

// ===== FEATURE #61: ACTIVITY FEED =====

export interface ActivityItem {
  id: string
  workspaceId: string
  userId: string
  userName: string
  userAvatar?: string
  type: 'task_completed' | 'achievement_unlocked' | 'goal_reached' | 'member_joined' | 'note_created' | 'milestone_reached'
  action: string
  details?: string
  timestamp: Date
  icon: string
}

export function getActivityFeed(workspaceId: string, limit: number = 50): ActivityItem[] {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(`activity_${workspaceId}`)
    const activities: ActivityItem[] = stored ? JSON.parse(stored) : []
    
    return activities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit)
  } catch {
    return []
  }
}

export function logActivity(
  workspaceId: string,
  userId: string,
  type: ActivityItem['type'],
  action: string,
  details?: string
): void {
  const activity: ActivityItem = {
    id: `act-${Date.now()}`,
    workspaceId,
    userId,
    userName: getUserName(userId),
    userAvatar: getUserAvatar(userId),
    type,
    action,
    details,
    timestamp: new Date(),
    icon: getActivityIcon(type)
  }
  
  saveActivity(activity)
  console.log(`📊 Activity logged: ${action}`)
}

function getActivityIcon(type: ActivityItem['type']): string {
  const icons = {
    'task_completed': '✅',
    'achievement_unlocked': '🏆',
    'goal_reached': '🎯',
    'member_joined': '👋',
    'note_created': '📝',
    'milestone_reached': '🎉'
  }
  return icons[type] || '📊'
}

// ===== FEATURE #62: TEAM BRANDING =====

export interface TeamBranding {
  workspaceId: string
  logo?: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  font: 'inter' | 'roboto' | 'poppins' | 'montserrat'
  theme: 'light' | 'dark' | 'auto'
  customCSS?: string
}

export function updateTeamBranding(
  workspaceId: string,
  branding: Partial<TeamBranding>
): TeamBranding {
  const current = getTeamBranding(workspaceId)
  
  const updated: TeamBranding = {
    ...current,
    ...branding,
    workspaceId
  }
  
  if (typeof window !== 'undefined') {
    localStorage.setItem(`branding_${workspaceId}`, JSON.stringify(updated))
  }
  
  console.log(`🎨 Team branding updated for workspace ${workspaceId}`)
  
  return updated
}

export function getTeamBranding(workspaceId: string): TeamBranding {
  if (typeof window === 'undefined') {
    return getDefaultBranding(workspaceId)
  }
  
  try {
    const stored = localStorage.getItem(`branding_${workspaceId}`)
    return stored ? JSON.parse(stored) : getDefaultBranding(workspaceId)
  } catch {
    return getDefaultBranding(workspaceId)
  }
}

function getDefaultBranding(workspaceId: string): TeamBranding {
  return {
    workspaceId,
    primaryColor: '#3B82F6',
    secondaryColor: '#8B5CF6',
    accentColor: '#10B981',
    font: 'inter',
    theme: 'auto'
  }
}

// ===== FEATURE #63: PERMISSIONS SYSTEM =====

export interface Permission {
  resource: 'tasks' | 'projects' | 'notes' | 'settings' | 'members' | 'calendar'
  action: 'create' | 'read' | 'update' | 'delete' | 'share'
  granted: boolean
}

export const ROLE_PERMISSIONS: Record<TeamMember['role'], Permission[]> = {
  owner: [
    // Full access to everything
    { resource: 'tasks', action: 'create', granted: true },
    { resource: 'tasks', action: 'read', granted: true },
    { resource: 'tasks', action: 'update', granted: true },
    { resource: 'tasks', action: 'delete', granted: true },
    { resource: 'projects', action: 'create', granted: true },
    { resource: 'projects', action: 'read', granted: true },
    { resource: 'projects', action: 'update', granted: true },
    { resource: 'projects', action: 'delete', granted: true },
    { resource: 'notes', action: 'create', granted: true },
    { resource: 'notes', action: 'read', granted: true },
    { resource: 'notes', action: 'update', granted: true },
    { resource: 'notes', action: 'delete', granted: true },
    { resource: 'settings', action: 'update', granted: true },
    { resource: 'members', action: 'create', granted: true },
    { resource: 'members', action: 'delete', granted: true },
    { resource: 'calendar', action: 'create', granted: true },
    { resource: 'calendar', action: 'update', granted: true },
    { resource: 'calendar', action: 'delete', granted: true }
  ],
  admin: [
    // Most access, except some settings
    { resource: 'tasks', action: 'create', granted: true },
    { resource: 'tasks', action: 'read', granted: true },
    { resource: 'tasks', action: 'update', granted: true },
    { resource: 'tasks', action: 'delete', granted: true },
    { resource: 'projects', action: 'create', granted: true },
    { resource: 'projects', action: 'read', granted: true },
    { resource: 'projects', action: 'update', granted: true },
    { resource: 'projects', action: 'delete', granted: true },
    { resource: 'notes', action: 'create', granted: true },
    { resource: 'notes', action: 'read', granted: true },
    { resource: 'notes', action: 'update', granted: true },
    { resource: 'notes', action: 'delete', granted: true },
    { resource: 'members', action: 'create', granted: true },
    { resource: 'calendar', action: 'create', granted: true },
    { resource: 'calendar', action: 'update', granted: true }
  ],
  member: [
    // Standard member access
    { resource: 'tasks', action: 'create', granted: true },
    { resource: 'tasks', action: 'read', granted: true },
    { resource: 'tasks', action: 'update', granted: true },
    { resource: 'projects', action: 'read', granted: true },
    { resource: 'notes', action: 'create', granted: true },
    { resource: 'notes', action: 'read', granted: true },
    { resource: 'notes', action: 'update', granted: true },
    { resource: 'calendar', action: 'read', granted: true },
    { resource: 'calendar', action: 'create', granted: true }
  ],
  guest: [
    // Limited read access
    { resource: 'tasks', action: 'read', granted: true },
    { resource: 'projects', action: 'read', granted: true },
    { resource: 'notes', action: 'read', granted: true },
    { resource: 'calendar', action: 'read', granted: true }
  ]
}

export function hasPermission(
  role: TeamMember['role'],
  resource: Permission['resource'],
  action: Permission['action']
): boolean {
  const permissions = ROLE_PERMISSIONS[role]
  return permissions.some(p => p.resource === resource && p.action === action && p.granted)
}

export function getUserRole(userId: string, workspaceId: string): TeamMember['role'] | null {
  // In real app, fetch from backend
  // For now, mock implementation
  return 'member'
}

// ===== FEATURE #64: EMAIL DIGEST =====

export interface EmailDigest {
  workspaceId: string
  recipientId: string
  period: 'daily' | 'weekly'
  sections: {
    tasksCompleted: number
    newTasks: number
    upcomingDeadlines: Array<{ title: string; dueDate: Date }>
    teamActivity: Array<{ userName: string; action: string }>
    achievements: Array<{ title: string; icon: string }>
    goals: Array<{ title: string; progress: number }>
  }
  generatedAt: Date
}

export function generateEmailDigest(
  workspaceId: string,
  userId: string,
  period: 'daily' | 'weekly'
): EmailDigest {
  // Mock data - in real app, aggregate actual data
  const digest: EmailDigest = {
    workspaceId,
    recipientId: userId,
    period,
    sections: {
      tasksCompleted: 12,
      newTasks: 8,
      upcomingDeadlines: [
        { title: 'Q4 Report', dueDate: new Date(Date.now() + 86400000 * 2) },
        { title: 'Client Presentation', dueDate: new Date(Date.now() + 86400000 * 5) }
      ],
      teamActivity: [
        { userName: 'Sarah Chen', action: 'completed "Website Redesign"' },
        { userName: 'Mike Rodriguez', action: 'unlocked achievement "Week Warrior"' },
        { userName: 'Alex Johnson', action: 'reached goal "Q4 Target"' }
      ],
      achievements: [
        { title: '7-Day Streak', icon: '🔥' },
        { title: 'Early Bird', icon: '🌅' }
      ],
      goals: [
        { title: 'Team Sprint', progress: 75 },
        { title: 'Monthly Targets', progress: 62 }
      ]
    },
    generatedAt: new Date()
  }
  
  return digest
}

export function scheduleEmailDigest(
  workspaceId: string,
  userId: string,
  frequency: 'daily' | 'weekly',
  time: string // Format: "09:00"
): void {
  const schedule = {
    workspaceId,
    userId,
    frequency,
    time,
    enabled: true
  }
  
  if (typeof window !== 'undefined') {
    localStorage.setItem(`email_schedule_${userId}`, JSON.stringify(schedule))
  }
  
  console.log(`📧 Email digest scheduled: ${frequency} at ${time}`)
}

// ===== FEATURE #65: PUBLIC PROFILES =====

export interface PublicProfile {
  userId: string
  username: string
  displayName: string
  avatar?: string
  bio?: string
  location?: string
  website?: string
  socialLinks?: {
    twitter?: string
    linkedin?: string
    github?: string
  }
  stats: {
    totalTasks: number
    completionRate: number
    currentStreak: number
    longestStreak: number
    totalEmblems: number
    achievementsUnlocked: number
  }
  badges: Array<{
    id: string
    title: string
    icon: string
    rarity: string
  }>
  recentActivity: Array<{
    type: string
    description: string
    timestamp: Date
  }>
  privacy: {
    showEmail: boolean
    showStats: boolean
    showActivity: boolean
    showBadges: boolean
  }
}

export function createPublicProfile(userId: string, username: string): PublicProfile {
  const profile: PublicProfile = {
    userId,
    username,
    displayName: username,
    stats: {
      totalTasks: 0,
      completionRate: 0,
      currentStreak: 0,
      longestStreak: 0,
      totalEmblems: 0,
      achievementsUnlocked: 0
    },
    badges: [],
    recentActivity: [],
    privacy: {
      showEmail: false,
      showStats: true,
      showActivity: true,
      showBadges: true
    }
  }
  
  savePublicProfile(profile)
  console.log(`👤 Public profile created: @${username}`)
  
  return profile
}

export function updatePublicProfile(
  userId: string,
  updates: Partial<PublicProfile>
): PublicProfile | null {
  const profile = getPublicProfile(userId)
  if (!profile) return null
  
  const updated = { ...profile, ...updates }
  savePublicProfile(updated)
  
  console.log(`👤 Profile updated: @${profile.username}`)
  
  return updated
}

export function getPublicProfile(userId: string): PublicProfile | null {
  if (typeof window === 'undefined') return null
  
  try {
    const stored = localStorage.getItem(`public_profile_${userId}`)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

export function getProfileByUsername(username: string): PublicProfile | null {
  if (typeof window === 'undefined') return null
  
  // In real app, query backend by username
  // For now, iterate through localStorage (inefficient but works for demo)
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith('public_profile_')) {
        const profile: PublicProfile = JSON.parse(localStorage.getItem(key)!)
        if (profile.username === username) {
          return profile
        }
      }
    }
  } catch {
    return null
  }
  
  return null
}

// ===== HELPER FUNCTIONS =====

function saveCalendarEvent(event: CalendarEvent): void {
  if (typeof window === 'undefined') return
  
  try {
    const events = JSON.parse(localStorage.getItem(`calendar_${event.workspaceId}`) || '[]')
    events.push(event)
    localStorage.setItem(`calendar_${event.workspaceId}`, JSON.stringify(events))
  } catch (error) {
    console.error('Error saving calendar event:', error)
  }
}

function getUserName(userId: string): string {
  // In real app, fetch from user data
  return `User ${userId.substring(0, 8)}`
}

function getUserAvatar(userId: string): string | undefined {
  return undefined
}

function saveSharedProgress(share: SharedProgress): void {
  if (typeof window === 'undefined') return
  
  try {
    const shares = JSON.parse(localStorage.getItem('shared_progress') || '[]')
    const index = shares.findIndex((s: SharedProgress) => s.id === share.id)
    
    if (index >= 0) {
      shares[index] = share
    } else {
      shares.unshift(share)
    }
    
    localStorage.setItem('shared_progress', JSON.stringify(shares))
  } catch (error) {
    console.error('Error saving shared progress:', error)
  }
}

function getSharedProgress(shareId: string): SharedProgress | null {
  if (typeof window === 'undefined') return null
  
  try {
    const shares: SharedProgress[] = JSON.parse(localStorage.getItem('shared_progress') || '[]')
    return shares.find(s => s.id === shareId) || null
  } catch {
    return null
  }
}

function saveActivity(activity: ActivityItem): void {
  if (typeof window === 'undefined') return
  
  try {
    const activities = JSON.parse(localStorage.getItem(`activity_${activity.workspaceId}`) || '[]')
    activities.unshift(activity)
    
    // Keep last 200 activities
    const trimmed = activities.slice(0, 200)
    localStorage.setItem(`activity_${activity.workspaceId}`, JSON.stringify(trimmed))
  } catch (error) {
    console.error('Error saving activity:', error)
  }
}

function savePublicProfile(profile: PublicProfile): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(`public_profile_${profile.userId}`, JSON.stringify(profile))
  } catch (error) {
    console.error('Error saving public profile:', error)
  }
}

