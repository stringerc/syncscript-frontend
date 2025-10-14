/**
 * Team Creation & Management System Component
 * 
 * Provides comprehensive team workspace creation and management
 * Includes team setup, member invitations, workspace configuration, and billing
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Team {
  id: string;
  name: string;
  description: string;
  domain?: string;
  logo?: string;
  settings: {
    timezone: string;
    workingHours: {
      start: string;
      end: string;
      days: string[];
    };
    notifications: {
      email: boolean;
      inApp: boolean;
      slack: boolean;
    };
    privacy: 'public' | 'private' | 'invite_only';
  };
  billing: {
    plan: 'starter' | 'professional' | 'enterprise';
    memberCount: number;
    memberLimit: number;
    monthlyCost: number;
    nextBillingDate: string;
    paymentMethod: string;
  };
  stats: {
    totalMembers: number;
    activeMembers: number;
    totalProjects: number;
    totalTasks: number;
    completionRate: number;
  };
  createdAt: string;
  updatedAt: string;
  ownerId: string;
}

interface TeamMember {
  id: string;
  userId: string;
  email: string;
  name: string;
  role: 'owner' | 'admin' | 'manager' | 'member' | 'viewer';
  status: 'active' | 'pending' | 'suspended';
  joinedAt: string;
  lastActive: string;
  permissions: string[];
  department?: string;
  title?: string;
}

interface TeamInvitation {
  id: string;
  email: string;
  role: string;
  invitedBy: string;
  invitedAt: string;
  expiresAt: string;
  status: 'pending' | 'accepted' | 'expired' | 'cancelled';
  teamId: string;
}

interface TeamCreationSystemProps {
  userId: string;
  onClose: () => void;
}

const TEAM_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for small teams getting started',
    price: 8,
    memberLimit: 10,
    features: [
      'Up to 10 team members',
      'Unlimited projects and tasks',
      'Basic collaboration tools',
      'Email support',
      'Standard integrations'
    ],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Advanced features for growing teams',
    price: 15,
    memberLimit: 50,
    features: [
      'Up to 50 team members',
      'Advanced project management',
      'Team analytics and insights',
      'Priority support',
      'Advanced integrations',
      'Custom workflows'
    ],
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Full-featured solution for large organizations',
    price: 25,
    memberLimit: -1, // Unlimited
    features: [
      'Unlimited team members',
      'Enterprise SSO integration',
      'Advanced security and compliance',
      'Dedicated account manager',
      'Custom integrations',
      'White-label options',
      'Advanced reporting'
    ],
    color: 'from-indigo-500 to-purple-500'
  }
];

const TeamCreationSystem: React.FC<TeamCreationSystemProps> = ({ userId, onClose }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [pendingInvitations, setPendingInvitations] = useState<TeamInvitation[]>([]);
  const [isCreatingTeam, setIsCreatingTeam] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('professional');
  const [isInvitingMembers, setIsInvitingMembers] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Team creation form state
  const [newTeam, setNewTeam] = useState({
    name: '',
    description: '',
    domain: '',
    timezone: 'America/New_York',
    workingHours: {
      start: '09:00',
      end: '17:00',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
    },
    privacy: 'invite_only' as const
  });

  // Member invitation state
  const [inviteMembers, setInviteMembers] = useState<{
    email: string;
    role: string;
    department?: string;
    title?: string;
  }[]>([]);

  useEffect(() => {
    loadTeamData();
  }, [userId]);

  const loadTeamData = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API calls for team data
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock team data
      const mockTeams: Team[] = [
        {
          id: 'team-1',
          name: 'Acme Corp',
          description: 'Main company workspace',
          domain: 'acme.com',
          settings: {
            timezone: 'America/New_York',
            workingHours: {
              start: '09:00',
              end: '17:00',
              days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
            },
            notifications: {
              email: true,
              inApp: true,
              slack: false
            },
            privacy: 'private'
          },
          billing: {
            plan: 'professional',
            memberCount: 12,
            memberLimit: 50,
            monthlyCost: 180,
            nextBillingDate: '2024-04-01',
            paymentMethod: '**** **** **** 4242'
          },
          stats: {
            totalMembers: 12,
            activeMembers: 10,
            totalProjects: 8,
            totalTasks: 156,
            completionRate: 87
          },
          createdAt: '2024-01-15T00:00:00Z',
          updatedAt: new Date().toISOString(),
          ownerId: userId
        }
      ];

      const mockMembers: TeamMember[] = [
        {
          id: 'member-1',
          userId: userId,
          email: 'admin@acme.com',
          name: 'John Admin',
          role: 'owner',
          status: 'active',
          joinedAt: '2024-01-15T00:00:00Z',
          lastActive: new Date().toISOString(),
          permissions: ['all'],
          department: 'Engineering',
          title: 'CTO'
        },
        {
          id: 'member-2',
          userId: 'user-2',
          email: 'manager@acme.com',
          name: 'Jane Manager',
          role: 'manager',
          status: 'active',
          joinedAt: '2024-01-20T00:00:00Z',
          lastActive: new Date(Date.now() - 3600000).toISOString(),
          permissions: ['tasks.create', 'projects.manage', 'users.invite'],
          department: 'Product',
          title: 'Product Manager'
        }
      ];

      const mockInvitations: TeamInvitation[] = [
        {
          id: 'invite-1',
          email: 'newuser@acme.com',
          role: 'member',
          invitedBy: userId,
          invitedAt: new Date(Date.now() - 86400000).toISOString(),
          expiresAt: new Date(Date.now() + 604800000).toISOString(),
          status: 'pending',
          teamId: 'team-1'
        }
      ];

      setTeams(mockTeams);
      setTeamMembers(mockMembers);
      setPendingInvitations(mockInvitations);
      
      if (mockTeams.length > 0) {
        setSelectedTeam(mockTeams[0]);
      }
    } catch (error) {
      console.error('Failed to load team data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTeam = async () => {
    setIsCreatingTeam(true);
    
    try {
      const plan = TEAM_PLANS.find(p => p.id === selectedPlan);
      if (!plan) return;

      const team: Team = {
        id: `team-${Date.now()}`,
        name: newTeam.name,
        description: newTeam.description,
        domain: newTeam.domain,
        settings: {
          timezone: newTeam.timezone,
          workingHours: newTeam.workingHours,
          notifications: {
            email: true,
            inApp: true,
            slack: false
          },
          privacy: newTeam.privacy
        },
        billing: {
          plan: selectedPlan as any,
          memberCount: 1,
          memberLimit: plan.memberLimit,
          monthlyCost: plan.price,
          nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          paymentMethod: '**** **** **** 4242'
        },
        stats: {
          totalMembers: 1,
          activeMembers: 1,
          totalProjects: 0,
          totalTasks: 0,
          completionRate: 0
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ownerId: userId
      };

      setTeams(prev => [...prev, team]);
      setSelectedTeam(team);
      
      // Reset form
      setNewTeam({
        name: '',
        description: '',
        domain: '',
        timezone: 'America/New_York',
        workingHours: {
          start: '09:00',
          end: '17:00',
          days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
        },
        privacy: 'invite_only'
      });
      
      console.log('✅ Team created successfully');
    } catch (error) {
      console.error('Failed to create team:', error);
    } finally {
      setIsCreatingTeam(false);
    }
  };

  const handleInviteMembers = async () => {
    if (inviteMembers.length === 0) return;
    
    setIsInvitingMembers(true);
    
    try {
      const invitations = inviteMembers.map(invite => ({
        id: `invite-${Date.now()}-${Math.random()}`,
        email: invite.email,
        role: invite.role,
        invitedBy: userId,
        invitedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'pending' as const,
        teamId: selectedTeam?.id || ''
      }));

      setPendingInvitations(prev => [...prev, ...invitations]);
      setInviteMembers([]);
      
      console.log('✅ Member invitations sent successfully');
    } catch (error) {
      console.error('Failed to send invitations:', error);
    } finally {
      setIsInvitingMembers(false);
    }
  };

  const handleAddInviteMember = () => {
    setInviteMembers(prev => [...prev, {
      email: '',
      role: 'member',
      department: '',
      title: ''
    }]);
  };

  const handleRemoveInviteMember = (index: number) => {
    setInviteMembers(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpdateInviteMember = (index: number, field: string, value: string) => {
    setInviteMembers(prev => prev.map((invite, i) => 
      i === index ? { ...invite, [field]: value } : invite
    ));
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner': return 'from-red-500 to-pink-500';
      case 'admin': return 'from-purple-500 to-indigo-500';
      case 'manager': return 'from-blue-500 to-cyan-500';
      case 'member': return 'from-green-500 to-emerald-500';
      case 'viewer': return 'from-gray-500 to-gray-600';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'suspended': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading team data...</span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Team Workspace Management</h2>
              <p className="text-blue-100 mt-1">Create and manage collaborative team workspaces</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Teams:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {teams.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Members:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {teamMembers.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Invitations:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {pendingInvitations.length}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex h-[60vh]">
          {/* Teams List */}
          <div className="w-1/3 border-r border-gray-200 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Teams</h3>
              <button
                onClick={() => setNewTeam({ ...newTeam, name: 'New Team' })}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all text-sm"
              >
                + New Team
              </button>
            </div>

            <div className="space-y-3">
              {teams.map((team) => (
                <motion.div
                  key={team.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedTeam(team)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedTeam?.id === team.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white font-bold">
                        {team.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{team.name}</h4>
                        <p className="text-sm text-gray-600">{team.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{team.stats.totalMembers}</div>
                      <div className="text-xs text-gray-500">members</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="capitalize">{team.billing.plan}</span>
                    <span>${team.billing.monthlyCost}/mo</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Team Details */}
          <div className="w-2/3 p-6 overflow-y-auto">
            {selectedTeam ? (
              <div className="space-y-6">
                {/* Team Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedTeam.name}</h3>
                    <p className="text-gray-600">{selectedTeam.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setInviteMembers([{ email: '', role: 'member' }])}
                      className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all text-sm"
                    >
                      Invite Members
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all text-sm">
                      Settings
                    </button>
                  </div>
                </div>

                {/* Team Stats */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-900">{selectedTeam.stats.totalMembers}</div>
                    <div className="text-blue-600 text-sm">Total Members</div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-900">{selectedTeam.stats.activeMembers}</div>
                    <div className="text-green-600 text-sm">Active Members</div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-900">{selectedTeam.stats.totalProjects}</div>
                    <div className="text-purple-600 text-sm">Projects</div>
                  </div>
                  <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-orange-900">{selectedTeam.stats.totalTasks}</div>
                    <div className="text-orange-600 text-sm">Tasks</div>
                  </div>
                </div>

                {/* Team Members */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Team Members</h4>
                  <div className="space-y-3">
                    {teamMembers.filter(member => member.teamId === selectedTeam.id || !member.teamId).map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white font-bold">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{member.name}</div>
                            <div className="text-sm text-gray-600">{member.email}</div>
                            {member.department && (
                              <div className="text-xs text-gray-500">{member.department} • {member.title}</div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium bg-gradient-to-r ${getRoleColor(member.role)} text-white`}>
                            {member.role.toUpperCase()}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(member.status)}`}>
                            {member.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pending Invitations */}
                {pendingInvitations.filter(invite => invite.teamId === selectedTeam.id).length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Pending Invitations</h4>
                    <div className="space-y-2">
                      {pendingInvitations.filter(invite => invite.teamId === selectedTeam.id).map((invitation) => (
                        <div key={invitation.id} className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">{invitation.email}</div>
                            <div className="text-sm text-gray-600">Invited as {invitation.role}</div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">
                              Expires {new Date(invitation.expiresAt).toLocaleDateString()}
                            </span>
                            <button className="text-red-600 hover:text-red-800 text-sm">
                              Cancel
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">👥</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Teams Selected</h3>
                <p className="text-gray-600">Select a team to view details and manage members</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {teams.length} team{teams.length !== 1 ? 's' : ''} • {teamMembers.length} members
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                // TODO: Export team data
                console.log('Exporting team data...');
              }}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
            >
              Export Data
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TeamCreationSystem;
