/**
 * Team Collaboration Enhancements
 * Phase 2: Team Features Polish
 * 
 * Real-time presence, energy sharing, collaborative workflows
 */

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  currentEnergy?: number;
  status: 'online' | 'away' | 'busy' | 'offline';
  lastSeen?: Date;
  tasksCompleted: number;
  emblemLevel: number;
}

export interface TeamEnergySnapshot {
  teamId: string;
  timestamp: Date;
  members: TeamMember[];
  averageEnergy: number;
  highEnergyMembers: TeamMember[];
  lowEnergyMembers: TeamMember[];
  recommendations: string[];
}

export interface CollaborativeTask {
  id: string;
  title: string;
  assignedTo: string[]; // User IDs
  watchers: string[]; // User IDs
  collaborators: string[]; // Can edit
  energyRequirement: number;
  status: 'todo' | 'in_progress' | 'blocked' | 'done';
  blockedBy?: string; // User ID
  blockedReason?: string;
}

/**
 * Get team energy snapshot
 */
export function getTeamEnergySnapshot(members: TeamMember[]): TeamEnergySnapshot {
  const onlineMembers = members.filter(m => m.status === 'online' && m.currentEnergy);
  
  const averageEnergy = onlineMembers.reduce((sum, m) => sum + (m.currentEnergy || 0), 0) / (onlineMembers.length || 1);
  
  const highEnergyMembers = onlineMembers.filter(m => (m.currentEnergy || 0) >= 4);
  const lowEnergyMembers = onlineMembers.filter(m => (m.currentEnergy || 0) <= 2);
  
  const recommendations = generateTeamRecommendations(highEnergyMembers, lowEnergyMembers, averageEnergy);
  
  return {
    teamId: 'default',
    timestamp: new Date(),
    members: onlineMembers,
    averageEnergy: Math.round(averageEnergy * 10) / 10,
    highEnergyMembers,
    lowEnergyMembers,
    recommendations
  };
}

/**
 * Generate team recommendations based on energy
 */
function generateTeamRecommendations(
  highEnergy: TeamMember[],
  lowEnergy: TeamMember[],
  average: number
): string[] {
  const recs: string[] = [];
  
  if (highEnergy.length > 0) {
    recs.push(`💪 ${highEnergy.length} team members at high energy - assign complex tasks now!`);
  }
  
  if (lowEnergy.length > 0) {
    recs.push(`😴 ${lowEnergy.length} team members at low energy - consider rescheduling meetings`);
  }
  
  if (average >= 4) {
    recs.push('🔥 Team energy is high - great time for brainstorming or challenging work!');
  } else if (average <= 2.5) {
    recs.push('💤 Team energy is low - schedule admin tasks or breaks');
  }
  
  return recs;
}

/**
 * Suggest task assignment based on energy
 */
export function suggestTaskAssignment(
  task: CollaborativeTask,
  members: TeamMember[]
): TeamMember[] {
  // Filter online members with energy data
  const available = members.filter(m => 
    m.status === 'online' && 
    m.currentEnergy !== undefined &&
    !task.assignedTo.includes(m.id) // Not already assigned
  );
  
  // Find members whose energy matches the task
  const goodMatches = available.filter(m => {
    const energyDiff = Math.abs((m.currentEnergy || 0) - task.energyRequirement);
    return energyDiff <= 1; // Within 1 level
  });
  
  // Sort by closest energy match
  goodMatches.sort((a, b) => {
    const diffA = Math.abs((a.currentEnergy || 0) - task.energyRequirement);
    const diffB = Math.abs((b.currentEnergy || 0) - task.energyRequirement);
    return diffA - diffB;
  });
  
  return goodMatches;
}

/**
 * Check if team member is available for task
 */
export function isAvailableForTask(
  member: TeamMember,
  taskEnergyRequirement: number
): { available: boolean; reason?: string } {
  if (member.status === 'offline') {
    return { available: false, reason: 'Member is offline' };
  }
  
  if (member.status === 'busy') {
    return { available: false, reason: 'Member is busy' };
  }
  
  if (member.currentEnergy === undefined) {
    return { available: true, reason: 'Energy unknown - may or may not be a good fit' };
  }
  
  const energyDiff = Math.abs(member.currentEnergy - taskEnergyRequirement);
  
  if (energyDiff === 0) {
    return { available: true, reason: 'Perfect energy match!' };
  } else if (energyDiff <= 1) {
    return { available: true, reason: 'Good energy match' };
  } else if (energyDiff >= 3) {
    return { available: false, reason: `Energy mismatch (has ${member.currentEnergy}, needs ${taskEnergyRequirement})` };
  }
  
  return { available: true, reason: 'Acceptable energy match' };
}

/**
 * Get team productivity stats
 */
export function getTeamProductivityStats(members: TeamMember[]): {
  totalCompleted: number;
  averageLevel: number;
  topPerformers: TeamMember[];
  needsSupport: TeamMember[];
} {
  const totalCompleted = members.reduce((sum, m) => sum + m.tasksCompleted, 0);
  const averageLevel = members.reduce((sum, m) => sum + m.emblemLevel, 0) / (members.length || 1);
  
  const sorted = [...members].sort((a, b) => b.tasksCompleted - a.tasksCompleted);
  const topPerformers = sorted.slice(0, 3);
  const needsSupport = sorted.slice(-2);
  
  return {
    totalCompleted,
    averageLevel: Math.round(averageLevel * 10) / 10,
    topPerformers,
    needsSupport
  };
}

// Export for testing
export const __test__ = {
  generateTeamRecommendations,
  suggestTaskAssignment,
  isAvailableForTask
};

