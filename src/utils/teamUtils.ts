export interface Team {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  memberCount: number;
  settings: TeamSettings;
}

export interface TeamMember {
  id: string;
  teamId: string;
  userId: string;
  email: string;
  name: string;
  role: TeamRole;
  joinedAt: string;
  lastActiveAt?: string;
  avatar?: string;
  status: 'active' | 'pending' | 'suspended';
}

export interface TeamInvite {
  id: string;
  teamId: string;
  email: string;
  invitedBy: string;
  role: TeamRole;
  token: string;
  expiresAt: string;
  createdAt: string;
  status: 'pending' | 'accepted' | 'expired' | 'cancelled';
}

export interface SharedProject {
  id: string;
  name: string;
  description?: string;
  color: string;
  teamId: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  memberCount: number;
  settings: SharedProjectSettings;
}

export interface TeamSettings {
  allowMemberInvites: boolean;
  defaultMemberRole: TeamRole;
  requireApprovalForTasks: boolean;
  energyInsightsVisible: boolean;
  maxMembers: number;
  timezone: string;
}

export interface SharedProjectSettings {
  allowMemberTaskCreation: boolean;
  allowMemberTaskAssignment: boolean;
  requireApprovalForTasks: boolean;
  showEnergyLevels: boolean;
  autoAssignByEnergy: boolean;
}

export type TeamRole = 'owner' | 'admin' | 'member' | 'viewer';

export interface TeamAnalytics {
  teamId: string;
  period: 'week' | 'month' | 'quarter';
  totalTasks: number;
  completedTasks: number;
  averageEnergy: number;
  productivityScore: number;
  topPerformers: Array<{
    userId: string;
    name: string;
    completedTasks: number;
    energyLevel: number;
  }>;
  energyPatterns: Array<{
    hour: number;
    averageEnergy: number;
    taskCount: number;
  }>;
}

// Team role permissions
export const TEAM_ROLE_PERMISSIONS = {
  owner: {
    canInviteMembers: true,
    canRemoveMembers: true,
    canManageSettings: true,
    canCreateProjects: true,
    canDeleteProjects: true,
    canViewAnalytics: true,
    canAssignTasks: true,
    canCompleteTasks: true,
    canViewEnergyInsights: true
  },
  admin: {
    canInviteMembers: true,
    canRemoveMembers: true,
    canManageSettings: false,
    canCreateProjects: true,
    canDeleteProjects: false,
    canViewAnalytics: true,
    canAssignTasks: true,
    canCompleteTasks: true,
    canViewEnergyInsights: true
  },
  member: {
    canInviteMembers: false,
    canRemoveMembers: false,
    canManageSettings: false,
    canCreateProjects: true,
    canDeleteProjects: false,
    canViewAnalytics: false,
    canAssignTasks: true,
    canCompleteTasks: true,
    canViewEnergyInsights: false
  },
  viewer: {
    canInviteMembers: false,
    canRemoveMembers: false,
    canManageSettings: false,
    canCreateProjects: false,
    canDeleteProjects: false,
    canViewAnalytics: false,
    canAssignTasks: false,
    canCompleteTasks: false,
    canViewEnergyInsights: false
  }
};

// Check if user has permission
export const hasPermission = (userRole: TeamRole, permission: keyof typeof TEAM_ROLE_PERMISSIONS.owner): boolean => {
  return TEAM_ROLE_PERMISSIONS[userRole][permission];
};

// Get role display info
export const getRoleInfo = (role: TeamRole) => {
  const roleInfo = {
    owner: {
      label: 'Owner',
      description: 'Full team control and settings',
      color: '#8B5CF6',
      icon: '👑'
    },
    admin: {
      label: 'Admin',
      description: 'Manage members and projects',
      color: '#F59E0B',
      icon: '🛡️'
    },
    member: {
      label: 'Member',
      description: 'Create and complete tasks',
      color: '#10B981',
      icon: '👤'
    },
    viewer: {
      label: 'Viewer',
      description: 'View-only access',
      color: '#6B7280',
      icon: '👁️'
    }
  };
  
  return roleInfo[role];
};

// Generate team invite token
export const generateInviteToken = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Create team invite
export const createTeamInvite = (
  teamId: string,
  email: string,
  invitedBy: string,
  role: TeamRole = 'member'
): Omit<TeamInvite, 'id' | 'createdAt'> => {
  return {
    teamId,
    email,
    invitedBy,
    role,
    token: generateInviteToken(),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
    status: 'pending'
  };
};

// Validate invite token
export const validateInviteToken = (invite: TeamInvite): boolean => {
  const now = new Date();
  const expiresAt = new Date(invite.expiresAt);
  return invite.status === 'pending' && now < expiresAt;
};

// Get team productivity score
export const calculateTeamProductivityScore = (
  completedTasks: number,
  totalTasks: number,
  averageEnergy: number,
  memberCount: number
): number => {
  if (totalTasks === 0) return 0;
  
  const completionRate = (completedTasks / totalTasks) * 100;
  const energyScore = Math.min(averageEnergy, 100);
  const participationScore = Math.min((completedTasks / memberCount) * 10, 100);
  
  return Math.round((completionRate * 0.5) + (energyScore * 0.3) + (participationScore * 0.2));
};

// Get team energy insights
export const getTeamEnergyInsights = (energyPatterns: Array<{ hour: number; averageEnergy: number; taskCount: number }>) => {
  if (energyPatterns.length === 0) {
    return {
      peakHour: null,
      lowHour: null,
      averageEnergy: 0,
      totalTasks: 0,
      recommendation: 'Complete more tasks to get energy insights'
    };
  }
  
  const sortedByEnergy = [...energyPatterns].sort((a, b) => b.averageEnergy - a.averageEnergy);
  const sortedByTasks = [...energyPatterns].sort((a, b) => b.taskCount - a.taskCount);
  
  const totalEnergy = energyPatterns.reduce((sum, pattern) => sum + pattern.averageEnergy, 0);
  const totalTasks = energyPatterns.reduce((sum, pattern) => sum + pattern.taskCount, 0);
  
  const peakHour = sortedByEnergy[0];
  const lowHour = sortedByEnergy[sortedByEnergy.length - 1];
  const averageEnergy = totalEnergy / energyPatterns.length;
  
  let recommendation = '';
  if (peakHour && lowHour) {
    if (peakHour.averageEnergy - lowHour.averageEnergy > 30) {
      recommendation = `Team is most productive at ${peakHour.hour}:00. Schedule important tasks during peak hours.`;
    } else {
      recommendation = 'Team has consistent energy levels. Great for flexible scheduling!';
    }
  }
  
  return {
    peakHour: peakHour ? { hour: peakHour.hour, energy: peakHour.averageEnergy } : null,
    lowHour: lowHour ? { hour: lowHour.hour, energy: lowHour.averageEnergy } : null,
    averageEnergy: Math.round(averageEnergy),
    totalTasks,
    recommendation
  };
};

// Format team member status
export const formatMemberStatus = (status: TeamMember['status']) => {
  const statusInfo = {
    active: { label: 'Active', color: '#10B981', icon: '✅' },
    pending: { label: 'Pending', color: '#F59E0B', icon: '⏳' },
    suspended: { label: 'Suspended', color: '#EF4444', icon: '🚫' }
  };
  
  return statusInfo[status];
};

// Get team invite link
export const getInviteLink = (token: string, baseUrl: string = window.location.origin): string => {
  return `${baseUrl}/join-team?token=${token}`;
};

// Check if user can manage team member
export const canManageMember = (
  managerRole: TeamRole,
  targetMemberRole: TeamRole,
  isOwner: boolean = false
): boolean => {
  if (isOwner) return true;
  
  const roleHierarchy = { owner: 4, admin: 3, member: 2, viewer: 1 };
  return roleHierarchy[managerRole] > roleHierarchy[targetMemberRole];
};

// Get default team settings
export const getDefaultTeamSettings = (): TeamSettings => {
  return {
    allowMemberInvites: true,
    defaultMemberRole: 'member',
    requireApprovalForTasks: false,
    energyInsightsVisible: true,
    maxMembers: 50,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  };
};

// Get default shared project settings
export const getDefaultSharedProjectSettings = (): SharedProjectSettings => {
  return {
    allowMemberTaskCreation: true,
    allowMemberTaskAssignment: true,
    requireApprovalForTasks: false,
    showEnergyLevels: true,
    autoAssignByEnergy: false
  };
};
