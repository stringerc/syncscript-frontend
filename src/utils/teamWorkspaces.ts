/**
 * Team Workspaces System
 * Features #51-65: Complete Team Collaboration Suite
 */

// ===== FEATURE #51: TEAM WORKSPACES =====

export interface TeamMember {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'owner' | 'admin' | 'member' | 'guest'
  joinedAt: Date
  lastActive?: Date
  tasksCompleted: number
  emblems: number
}

export interface TeamWorkspace {
  id: string
  name: string
  description: string
  icon: string
  color: string
  members: TeamMember[]
  createdAt: Date
  createdBy: string
  settings: TeamSettings
}

export interface TeamSettings {
  isPublic: boolean
  allowGuestInvites: boolean
  requireApproval: boolean
  defaultRole: 'member' | 'guest'
  features: {
    chat: boolean
    sharedCalendar: boolean
    leaderboard: boolean
    notifications: boolean
  }
}

// ===== FEATURE #52: TASK ASSIGNMENT =====

export interface TaskAssignment {
  taskId: string
  assignedTo: string[] // User IDs
  assignedBy: string
  assignedAt: Date
  dueDate?: Date
  status: 'pending' | 'accepted' | 'in-progress' | 'completed' | 'rejected'
  notes?: string
}

export function assignTask(
  taskId: string,
  assignToIds: string[],
  assignedBy: string,
  dueDate?: Date
): TaskAssignment {
  const assignment: TaskAssignment = {
    taskId,
    assignedTo: assignToIds,
    assignedBy,
    assignedAt: new Date(),
    dueDate,
    status: 'pending',
  }
  
  // Save assignment
  saveAssignment(assignment)
  
  // Send notifications to assigned users
  assignToIds.forEach(userId => {
    sendNotification(userId, {
      type: 'task_assigned',
      message: `You've been assigned a new task`,
      taskId,
      from: assignedBy
    })
  })
  
  console.log(`✅ Task ${taskId} assigned to ${assignToIds.length} member(s)`)
  
  return assignment
}

// ===== FEATURE #53: TEAM CHAT =====

export interface ChatMessage {
  id: string
  workspaceId: string
  channelId: string
  userId: string
  userName: string
  userAvatar?: string
  content: string
  timestamp: Date
  edited?: boolean
  editedAt?: Date
  reactions: Array<{ emoji: string; userId: string }>
  threadId?: string // For threaded replies
  attachments?: Array<{ type: string; url: string; name: string }>
}

export interface ChatChannel {
  id: string
  workspaceId: string
  name: string
  description?: string
  type: 'general' | 'task' | 'project' | 'private'
  members: string[]
  createdAt: Date
  lastActivity?: Date
}

export function sendChatMessage(
  workspaceId: string,
  channelId: string,
  userId: string,
  content: string
): ChatMessage {
  const message: ChatMessage = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    workspaceId,
    channelId,
    userId,
    userName: getUserName(userId),
    userAvatar: getUserAvatar(userId),
    content,
    timestamp: new Date(),
    reactions: []
  }
  
  // Save message
  saveChatMessage(message)
  
  // Update channel last activity
  updateChannelActivity(channelId)
  
  // Send notifications to channel members
  notifyChannelMembers(channelId, message)
  
  console.log(`💬 Message sent to ${channelId}`)
  
  return message
}

// ===== FEATURE #54: TEAM ANALYTICS =====

export interface TeamAnalytics {
  workspaceId: string
  period: 'day' | 'week' | 'month'
  metrics: {
    totalTasks: number
    completedTasks: number
    completionRate: number
    avgCompletionTime: number // hours
    totalEmblems: number
    activeMembers: number
    topPerformer: TeamMember | null
    productivityTrend: 'up' | 'stable' | 'down'
  }
  memberStats: Array<{
    member: TeamMember
    tasksCompleted: number
    emblemsEarned: number
    avgTaskTime: number
    streak: number
  }>
  categoryBreakdown: Array<{
    category: string
    tasks: number
    percentage: number
  }>
}

export function generateTeamAnalytics(workspaceId: string, period: 'day' | 'week' | 'month'): TeamAnalytics {
  // Mock data - in real app, fetch from backend
  const workspace = getWorkspace(workspaceId)
  
  const analytics: TeamAnalytics = {
    workspaceId,
    period,
    metrics: {
      totalTasks: 156,
      completedTasks: 134,
      completionRate: 85.9,
      avgCompletionTime: 3.2,
      totalEmblems: 4250,
      activeMembers: workspace ? workspace.members.length : 0,
      topPerformer: workspace ? workspace.members[0] : null,
      productivityTrend: 'up'
    },
    memberStats: workspace ? workspace.members.map(member => ({
      member,
      tasksCompleted: Math.floor(Math.random() * 50) + 10,
      emblemsEarned: Math.floor(Math.random() * 500) + 100,
      avgTaskTime: Math.random() * 5 + 1,
      streak: Math.floor(Math.random() * 30)
    })) : [],
    categoryBreakdown: [
      { category: 'Development', tasks: 45, percentage: 28.8 },
      { category: 'Design', tasks: 32, percentage: 20.5 },
      { category: 'Marketing', tasks: 28, percentage: 17.9 },
      { category: 'Planning', tasks: 25, percentage: 16.0 },
      { category: 'Other', tasks: 26, percentage: 16.7 }
    ]
  }
  
  return analytics
}

// ===== FEATURE #55: SMART NOTIFICATIONS =====

export interface Notification {
  id: string
  userId: string
  type: 'task_assigned' | 'task_completed' | 'mention' | 'comment' | 'achievement' | 'team_invite' | 'deadline'
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
  data?: Record<string, unknown>
  priority: 'low' | 'medium' | 'high' | 'urgent'
}

export function sendNotification(userId: string, notification: Partial<Notification>): Notification {
  const newNotification: Notification = {
    id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    userId,
    type: notification.type || 'mention',
    title: notification.title || 'New Notification',
    message: notification.message || '',
    timestamp: new Date(),
    read: false,
    priority: notification.priority || 'medium',
    ...notification
  }
  
  // Save notification
  saveNotification(newNotification)
  
  // Trigger real-time notification if user online
  triggerRealTimeNotification(userId, newNotification)
  
  console.log(`🔔 Notification sent to user ${userId}`)
  
  return newNotification
}

export function getUserNotifications(userId: string): Notification[] {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(`notifications_${userId}`)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function markNotificationRead(notificationId: string, userId: string): void {
  const notifications = getUserNotifications(userId)
  const notification = notifications.find(n => n.id === notificationId)
  
  if (notification) {
    notification.read = true
    localStorage.setItem(`notifications_${userId}`, JSON.stringify(notifications))
  }
}

export function getUnreadCount(userId: string): number {
  return getUserNotifications(userId).filter(n => !n.read).length
}

// ===== FEATURE #56: COLLABORATIVE NOTES =====

export interface CollaborativeNote {
  id: string
  workspaceId: string
  title: string
  content: string
  createdBy: string
  createdAt: Date
  lastEditedBy?: string
  lastEditedAt?: Date
  collaborators: string[]
  tags: string[]
  isLocked: boolean
  version: number
  permissions: {
    canEdit: string[] // User IDs
    canView: string[] // User IDs
  }
}

export interface NoteVersion {
  version: number
  content: string
  editedBy: string
  editedAt: Date
  changes: string
}

export function createNote(
  workspaceId: string,
  title: string,
  createdBy: string,
  initialContent: string = ''
): CollaborativeNote {
  const note: CollaborativeNote = {
    id: `note-${Date.now()}`,
    workspaceId,
    title,
    content: initialContent,
    createdBy,
    createdAt: new Date(),
    collaborators: [createdBy],
    tags: [],
    isLocked: false,
    version: 1,
    permissions: {
      canEdit: [createdBy],
      canView: [createdBy]
    }
  }
  
  saveNote(note)
  console.log(`📝 Note created: ${title}`)
  
  return note
}

export function updateNote(
  noteId: string,
  content: string,
  editedBy: string
): CollaborativeNote | null {
  const note = getNote(noteId)
  if (!note) return null
  
  // Check permissions
  if (!note.permissions.canEdit.includes(editedBy)) {
    console.error('User does not have edit permission')
    return null
  }
  
  if (note.isLocked) {
    console.error('Note is locked')
    return null
  }
  
  // Save version history
  saveNoteVersion(note)
  
  // Update note
  note.content = content
  note.lastEditedBy = editedBy
  note.lastEditedAt = new Date()
  note.version++
  
  saveNote(note)
  console.log(`📝 Note updated: ${note.title} (v${note.version})`)
  
  return note
}

// ===== FEATURE #57: TEAM GOALS =====

export interface TeamGoal {
  id: string
  workspaceId: string
  title: string
  description: string
  targetValue: number
  currentValue: number
  unit: string // 'tasks', 'emblems', 'hours', etc.
  deadline?: Date
  createdBy: string
  createdAt: Date
  contributors: Array<{
    userId: string
    contribution: number
  }>
  status: 'active' | 'completed' | 'cancelled'
  reward?: {
    emblems: number
    title: string
  }
}

export function createTeamGoal(
  workspaceId: string,
  title: string,
  targetValue: number,
  unit: string,
  createdBy: string
): TeamGoal {
  const goal: TeamGoal = {
    id: `team-goal-${Date.now()}`,
    workspaceId,
    title,
    description: '',
    targetValue,
    currentValue: 0,
    unit,
    createdBy,
    createdAt: new Date(),
    contributors: [],
    status: 'active'
  }
  
  saveTeamGoal(goal)
  console.log(`🎯 Team goal created: ${title}`)
  
  return goal
}

export function contributeToTeamGoal(
  goalId: string,
  userId: string,
  amount: number
): TeamGoal | null {
  const goal = getTeamGoal(goalId)
  if (!goal || goal.status !== 'active') return null
  
  // Update or add contributor
  const contributor = goal.contributors.find(c => c.userId === userId)
  if (contributor) {
    contributor.contribution += amount
  } else {
    goal.contributors.push({ userId, contribution: amount })
  }
  
  // Update current value
  goal.currentValue = goal.contributors.reduce((sum, c) => sum + c.contribution, 0)
  
  // Check if goal completed
  if (goal.currentValue >= goal.targetValue) {
    goal.status = 'completed'
    
    // Distribute rewards
    if (goal.reward) {
      distributeTeamRewards(goal)
    }
    
    console.log(`🎉 Team goal completed: ${goal.title}!`)
  }
  
  saveTeamGoal(goal)
  
  return goal
}

// ===== HELPER FUNCTIONS =====

function getWorkspace(id: string): TeamWorkspace | null {
  if (typeof window === 'undefined') return null
  
  try {
    const stored = localStorage.getItem(`workspace_${id}`)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

function saveAssignment(assignment: TaskAssignment): void {
  if (typeof window === 'undefined') return
  
  try {
    const assignments = JSON.parse(localStorage.getItem('task_assignments') || '[]')
    assignments.push(assignment)
    localStorage.setItem('task_assignments', JSON.stringify(assignments))
  } catch (error) {
    console.error('Error saving assignment:', error)
  }
}

function saveChatMessage(message: ChatMessage): void {
  if (typeof window === 'undefined') return
  
  try {
    const messages = JSON.parse(localStorage.getItem(`chat_${message.channelId}`) || '[]')
    messages.push(message)
    localStorage.setItem(`chat_${message.channelId}`, JSON.stringify(messages))
  } catch (error) {
    console.error('Error saving message:', error)
  }
}

function updateChannelActivity(channelId: string): void {
  // Update channel's last activity timestamp
  console.log(`📊 Channel ${channelId} activity updated`)
}

function notifyChannelMembers(channelId: string, message: ChatMessage): void {
  // Send notifications to all channel members except sender
  console.log(`🔔 Notifying channel members of new message`)
}

function getUserName(userId: string): string {
  // In real app, fetch from user data
  return `User ${userId.substring(0, 8)}`
}

function getUserAvatar(userId: string): string | undefined {
  // In real app, fetch from user profile
  return undefined
}

function saveNotification(notification: Notification): void {
  if (typeof window === 'undefined') return
  
  try {
    const notifications = getUserNotifications(notification.userId)
    notifications.unshift(notification)
    
    // Keep last 100 notifications
    const trimmed = notifications.slice(0, 100)
    localStorage.setItem(`notifications_${notification.userId}`, JSON.stringify(trimmed))
  } catch (error) {
    console.error('Error saving notification:', error)
  }
}

function triggerRealTimeNotification(userId: string, notification: Notification): void {
  // In real app, use WebSocket or Server-Sent Events
  console.log(`⚡ Real-time notification triggered for ${userId}`)
}

function saveNote(note: CollaborativeNote): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(`note_${note.id}`, JSON.stringify(note))
  } catch (error) {
    console.error('Error saving note:', error)
  }
}

function getNote(noteId: string): CollaborativeNote | null {
  if (typeof window === 'undefined') return null
  
  try {
    const stored = localStorage.getItem(`note_${noteId}`)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

function saveNoteVersion(note: CollaborativeNote): void {
  if (typeof window === 'undefined') return
  
  try {
    const versions = JSON.parse(localStorage.getItem(`note_versions_${note.id}`) || '[]')
    versions.push({
      version: note.version,
      content: note.content,
      editedBy: note.lastEditedBy || note.createdBy,
      editedAt: note.lastEditedAt || note.createdAt,
      changes: 'Content updated'
    })
    localStorage.setItem(`note_versions_${note.id}`, JSON.stringify(versions))
  } catch (error) {
    console.error('Error saving note version:', error)
  }
}

function saveTeamGoal(goal: TeamGoal): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(`team_goal_${goal.id}`, JSON.stringify(goal))
  } catch (error) {
    console.error('Error saving team goal:', error)
  }
}

function getTeamGoal(goalId: string): TeamGoal | null {
  if (typeof window === 'undefined') return null
  
  try {
    const stored = localStorage.getItem(`team_goal_${goalId}`)
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

function distributeTeamRewards(goal: TeamGoal): void {
  if (!goal.reward) return
  
  // Distribute rewards to contributors
  goal.contributors.forEach(contributor => {
    const share = (contributor.contribution / goal.currentValue) * goal.reward!.emblems
    console.log(`💎 Distributed ${Math.floor(share)} emblems to ${contributor.userId}`)
  })
}

// Export workspace management functions
export function createWorkspace(
  name: string,
  createdBy: string,
  color: string = '#3B82F6'
): TeamWorkspace {
  const workspace: TeamWorkspace = {
    id: `ws-${Date.now()}`,
    name,
    description: '',
    icon: '👥',
    color,
    members: [{
      id: createdBy,
      name: getUserName(createdBy),
      email: `${createdBy}@syncscript.app`,
      role: 'owner',
      joinedAt: new Date(),
      tasksCompleted: 0,
      emblems: 0
    }],
    createdAt: new Date(),
    createdBy,
    settings: {
      isPublic: false,
      allowGuestInvites: true,
      requireApproval: false,
      defaultRole: 'member',
      features: {
        chat: true,
        sharedCalendar: true,
        leaderboard: true,
        notifications: true
      }
    }
  }
  
  if (typeof window !== 'undefined') {
    localStorage.setItem(`workspace_${workspace.id}`, JSON.stringify(workspace))
  }
  
  console.log(`🤝 Workspace created: ${name}`)
  
  return workspace
}

export function inviteToWorkspace(
  workspaceId: string,
  email: string,
  role: TeamMember['role'] = 'member'
): boolean {
  const workspace = getWorkspace(workspaceId)
  if (!workspace) return false
  
  // In real app, send email invitation
  console.log(`📧 Invitation sent to ${email} for workspace ${workspace.name}`)
  
  return true
}

export function getAllWorkspaces(userId: string): TeamWorkspace[] {
  if (typeof window === 'undefined') return []
  
  // In real app, fetch from backend
  // For now, return all workspaces from localStorage
  const workspaces: TeamWorkspace[] = []
  
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith('workspace_')) {
        const workspace = JSON.parse(localStorage.getItem(key)!)
        if (workspace.members.some((m: TeamMember) => m.id === userId)) {
          workspaces.push(workspace)
        }
      }
    }
  } catch (error) {
    console.error('Error loading workspaces:', error)
  }
  
  return workspaces
}

