/**
 * Team Member Management Component
 * 
 * Comprehensive team member management with RBAC integration
 * Includes member roles, permissions, department management, and activity tracking
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TeamMember {
  id: string;
  userId: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'owner' | 'admin' | 'manager' | 'member' | 'viewer';
  status: 'active' | 'pending' | 'suspended' | 'inactive';
  joinedAt: string;
  lastActive: string;
  permissions: Permission[];
  department?: string;
  title?: string;
  phone?: string;
  timezone: string;
  notifications: {
    email: boolean;
    inApp: boolean;
    sms: boolean;
    slack: boolean;
  };
  activity: {
    tasksCompleted: number;
    projectsContributed: number;
    loginCount: number;
    averageSessionTime: number;
    productivityScore: number;
  };
  teamId: string;
}

interface Permission {
  id: string;
  name: string;
  description: string;
  category: 'tasks' | 'projects' | 'users' | 'settings' | 'analytics' | 'integrations';
  level: 'read' | 'write' | 'delete' | 'admin';
}

interface Department {
  id: string;
  name: string;
  description: string;
  color: string;
  memberCount: number;
  managerId?: string;
  permissions: string[];
}

interface TeamMemberManagementProps {
  teamId: string;
  onClose: () => void;
}

const ROLE_DEFINITIONS = [
  {
    id: 'owner',
    name: 'Owner',
    description: 'Full system access and billing control',
    color: 'from-red-500 to-pink-500',
    permissions: ['all'],
    restrictions: []
  },
  {
    id: 'admin',
    name: 'Administrator',
    description: 'Full team management and configuration',
    color: 'from-purple-500 to-indigo-500',
    permissions: [
      'tasks.all', 'projects.all', 'users.manage', 'settings.all',
      'analytics.all', 'integrations.all'
    ],
    restrictions: ['billing']
  },
  {
    id: 'manager',
    name: 'Manager',
    description: 'Team leadership and project oversight',
    color: 'from-blue-500 to-cyan-500',
    permissions: [
      'tasks.create', 'tasks.assign', 'projects.manage', 'users.view',
      'analytics.view', 'integrations.basic'
    ],
    restrictions: ['user_management', 'billing', 'settings']
  },
  {
    id: 'member',
    name: 'Member',
    description: 'Standard team member with task access',
    color: 'from-green-500 to-emerald-500',
    permissions: [
      'tasks.create', 'tasks.view', 'projects.view', 'analytics.basic'
    ],
    restrictions: ['user_management', 'billing', 'settings', 'project_management']
  },
  {
    id: 'viewer',
    name: 'Viewer',
    description: 'Read-only access to team data',
    color: 'from-gray-500 to-gray-600',
    permissions: ['tasks.view', 'projects.view'],
    restrictions: ['all_write_operations']
  }
];

const AVAILABLE_PERMISSIONS: Permission[] = [
  // Tasks
  { id: 'tasks.create', name: 'Create Tasks', description: 'Create new tasks', category: 'tasks', level: 'write' },
  { id: 'tasks.view', name: 'View Tasks', description: 'View all tasks', category: 'tasks', level: 'read' },
  { id: 'tasks.edit', name: 'Edit Tasks', description: 'Edit task details', category: 'tasks', level: 'write' },
  { id: 'tasks.delete', name: 'Delete Tasks', description: 'Delete tasks', category: 'tasks', level: 'delete' },
  { id: 'tasks.assign', name: 'Assign Tasks', description: 'Assign tasks to team members', category: 'tasks', level: 'write' },
  
  // Projects
  { id: 'projects.create', name: 'Create Projects', description: 'Create new projects', category: 'projects', level: 'write' },
  { id: 'projects.view', name: 'View Projects', description: 'View all projects', category: 'projects', level: 'read' },
  { id: 'projects.edit', name: 'Edit Projects', description: 'Edit project details', category: 'projects', level: 'write' },
  { id: 'projects.delete', name: 'Delete Projects', description: 'Delete projects', category: 'projects', level: 'delete' },
  { id: 'projects.manage', name: 'Manage Projects', description: 'Full project management', category: 'projects', level: 'admin' },
  
  // Users
  { id: 'users.view', name: 'View Users', description: 'View team members', category: 'users', level: 'read' },
  { id: 'users.invite', name: 'Invite Users', description: 'Invite new team members', category: 'users', level: 'write' },
  { id: 'users.edit', name: 'Edit Users', description: 'Edit user profiles', category: 'users', level: 'write' },
  { id: 'users.remove', name: 'Remove Users', description: 'Remove team members', category: 'users', level: 'delete' },
  { id: 'users.manage', name: 'Manage Users', description: 'Full user management', category: 'users', level: 'admin' },
  
  // Settings
  { id: 'settings.view', name: 'View Settings', description: 'View team settings', category: 'settings', level: 'read' },
  { id: 'settings.edit', name: 'Edit Settings', description: 'Edit team settings', category: 'settings', level: 'write' },
  { id: 'settings.all', name: 'All Settings', description: 'Full settings access', category: 'settings', level: 'admin' },
  
  // Analytics
  { id: 'analytics.view', name: 'View Analytics', description: 'View team analytics', category: 'analytics', level: 'read' },
  { id: 'analytics.export', name: 'Export Analytics', description: 'Export analytics data', category: 'analytics', level: 'write' },
  { id: 'analytics.all', name: 'All Analytics', description: 'Full analytics access', category: 'analytics', level: 'admin' },
  
  // Integrations
  { id: 'integrations.view', name: 'View Integrations', description: 'View integrations', category: 'integrations', level: 'read' },
  { id: 'integrations.manage', name: 'Manage Integrations', description: 'Manage integrations', category: 'integrations', level: 'write' },
  { id: 'integrations.all', name: 'All Integrations', description: 'Full integration access', category: 'integrations', level: 'admin' }
];

const TeamMemberManagement: React.FC<TeamMemberManagementProps> = ({ teamId, onClose }) => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // New member form state
  const [newMember, setNewMember] = useState({
    email: '',
    role: 'member',
    department: '',
    title: '',
    phone: '',
    timezone: 'America/New_York'
  });

  useEffect(() => {
    loadMemberData();
  }, [teamId]);

  const loadMemberData = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock member data
      const mockMembers: TeamMember[] = [
        {
          id: 'member-1',
          userId: 'user-1',
          email: 'admin@team.com',
          name: 'John Admin',
          role: 'owner',
          status: 'active',
          joinedAt: '2024-01-15T00:00:00Z',
          lastActive: new Date().toISOString(),
          permissions: AVAILABLE_PERMISSIONS,
          department: 'Engineering',
          title: 'CTO',
          phone: '+1 (555) 123-4567',
          timezone: 'America/New_York',
          notifications: {
            email: true,
            inApp: true,
            sms: false,
            slack: true
          },
          activity: {
            tasksCompleted: 45,
            projectsContributed: 8,
            loginCount: 156,
            averageSessionTime: 2.5,
            productivityScore: 94
          },
          teamId
        },
        {
          id: 'member-2',
          userId: 'user-2',
          email: 'manager@team.com',
          name: 'Jane Manager',
          role: 'manager',
          status: 'active',
          joinedAt: '2024-01-20T00:00:00Z',
          lastActive: new Date(Date.now() - 3600000).toISOString(),
          permissions: AVAILABLE_PERMISSIONS.filter(p => 
            ['tasks.create', 'tasks.assign', 'projects.manage', 'users.view', 'analytics.view'].includes(p.id)
          ),
          department: 'Product',
          title: 'Product Manager',
          phone: '+1 (555) 234-5678',
          timezone: 'America/Los_Angeles',
          notifications: {
            email: true,
            inApp: true,
            sms: true,
            slack: false
          },
          activity: {
            tasksCompleted: 32,
            projectsContributed: 5,
            loginCount: 89,
            averageSessionTime: 3.2,
            productivityScore: 87
          },
          teamId
        },
        {
          id: 'member-3',
          userId: 'user-3',
          email: 'member@team.com',
          name: 'Bob Member',
          role: 'member',
          status: 'active',
          joinedAt: '2024-02-01T00:00:00Z',
          lastActive: new Date(Date.now() - 7200000).toISOString(),
          permissions: AVAILABLE_PERMISSIONS.filter(p => 
            ['tasks.create', 'tasks.view', 'projects.view', 'analytics.basic'].includes(p.id)
          ),
          department: 'Engineering',
          title: 'Software Engineer',
          timezone: 'America/Chicago',
          notifications: {
            email: true,
            inApp: true,
            sms: false,
            slack: false
          },
          activity: {
            tasksCompleted: 28,
            projectsContributed: 3,
            loginCount: 67,
            averageSessionTime: 2.1,
            productivityScore: 82
          },
          teamId
        },
        {
          id: 'member-4',
          userId: 'user-4',
          email: 'pending@team.com',
          name: 'Pending User',
          role: 'member',
          status: 'pending',
          joinedAt: '2024-03-01T00:00:00Z',
          lastActive: new Date(Date.now() - 86400000).toISOString(),
          permissions: [],
          department: 'Design',
          title: 'UX Designer',
          timezone: 'America/New_York',
          notifications: {
            email: true,
            inApp: false,
            sms: false,
            slack: false
          },
          activity: {
            tasksCompleted: 0,
            projectsContributed: 0,
            loginCount: 5,
            averageSessionTime: 0.8,
            productivityScore: 0
          },
          teamId
        }
      ];

      // Mock departments
      const mockDepartments: Department[] = [
        {
          id: 'dept-1',
          name: 'Engineering',
          description: 'Software development and technical implementation',
          color: 'from-blue-500 to-cyan-500',
          memberCount: 8,
          managerId: 'member-1',
          permissions: ['tasks.all', 'projects.manage', 'integrations.manage']
        },
        {
          id: 'dept-2',
          name: 'Product',
          description: 'Product strategy and roadmap management',
          color: 'from-purple-500 to-pink-500',
          memberCount: 3,
          managerId: 'member-2',
          permissions: ['projects.all', 'analytics.all', 'tasks.assign']
        },
        {
          id: 'dept-3',
          name: 'Design',
          description: 'User experience and visual design',
          color: 'from-green-500 to-emerald-500',
          memberCount: 2,
          permissions: ['tasks.view', 'projects.view', 'analytics.view']
        },
        {
          id: 'dept-4',
          name: 'Marketing',
          description: 'Brand promotion and customer acquisition',
          color: 'from-orange-500 to-red-500',
          memberCount: 4,
          permissions: ['tasks.view', 'analytics.view', 'integrations.view']
        }
      ];

      setMembers(mockMembers);
      setDepartments(mockDepartments);
    } catch (error) {
      console.error('Failed to load member data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInviteMember = async () => {
    try {
      const newMemberData: TeamMember = {
        id: `member-${Date.now()}`,
        userId: `user-${Date.now()}`,
        email: newMember.email,
        name: newMember.email.split('@')[0],
        role: newMember.role as any,
        status: 'pending',
        joinedAt: new Date().toISOString(),
        lastActive: new Date().toISOString(),
        permissions: ROLE_DEFINITIONS.find(r => r.id === newMember.role)?.permissions.map(p => 
          AVAILABLE_PERMISSIONS.find(perm => perm.id === p)
        ).filter(Boolean) as Permission[] || [],
        department: newMember.department,
        title: newMember.title,
        phone: newMember.phone,
        timezone: newMember.timezone,
        notifications: {
          email: true,
          inApp: true,
          sms: false,
          slack: false
        },
        activity: {
          tasksCompleted: 0,
          projectsContributed: 0,
          loginCount: 0,
          averageSessionTime: 0,
          productivityScore: 0
        },
        teamId
      };

      setMembers(prev => [...prev, newMemberData]);
      setNewMember({
        email: '',
        role: 'member',
        department: '',
        title: '',
        phone: '',
        timezone: 'America/New_York'
      });
      
      console.log('✅ Member invited successfully');
    } catch (error) {
      console.error('Failed to invite member:', error);
    }
  };

  const handleUpdateMember = async (memberId: string, updates: Partial<TeamMember>) => {
    try {
      setMembers(prev => prev.map(member => 
        member.id === memberId ? { ...member, ...updates } : member
      ));
      console.log('✅ Member updated successfully');
    } catch (error) {
      console.error('Failed to update member:', error);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    try {
      setMembers(prev => prev.filter(member => member.id !== memberId));
      if (selectedMember?.id === memberId) {
        setSelectedMember(null);
      }
      console.log('✅ Member removed successfully');
    } catch (error) {
      console.error('Failed to remove member:', error);
    }
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || member.role === filterRole;
    const matchesStatus = filterStatus === 'all' || member.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleColor = (role: string) => {
    const roleDef = ROLE_DEFINITIONS.find(r => r.id === role);
    return roleDef?.color || 'from-gray-400 to-gray-500';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'suspended': return 'text-red-600 bg-red-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading team members...</span>
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
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Team Member Management</h2>
              <p className="text-green-100 mt-1">Manage team roles, permissions, and departments</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-green-200 text-sm">Members:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {members.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-200 text-sm">Active:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {members.filter(m => m.status === 'active').length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-200 text-sm">Departments:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {departments.length}
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

        <div className="flex h-[60vh]">
          {/* Members List */}
          <div className="w-1/2 border-r border-gray-200 p-6 overflow-y-auto">
            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <div className="flex space-x-4">
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="all">All Roles</option>
                  {ROLE_DEFINITIONS.map(role => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  ))}
                </select>
                
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspended</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Members List */}
            <div className="space-y-3">
              {filteredMembers.map((member) => (
                <motion.div
                  key={member.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedMember(member)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedMember?.id === member.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white font-bold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{member.name}</h4>
                        <p className="text-sm text-gray-600">{member.email}</p>
                        {member.department && (
                          <p className="text-xs text-gray-500">{member.department} • {member.title}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded text-xs font-medium bg-gradient-to-r ${getRoleColor(member.role)} text-white`}>
                        {member.role.toUpperCase()}
                      </span>
                      <div className="mt-1">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(member.status)}`}>
                          {member.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Joined {new Date(member.joinedAt).toLocaleDateString()}</span>
                    <span>Score: {member.activity.productivityScore}%</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Invite New Member */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Invite New Member</h4>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Email address"
                  value={newMember.email}
                  onChange={(e) => setNewMember(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
                <div className="grid grid-cols-2 gap-3">
                  <select
                    value={newMember.role}
                    onChange={(e) => setNewMember(prev => ({ ...prev, role: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    {ROLE_DEFINITIONS.map(role => (
                      <option key={role.id} value={role.id}>{role.name}</option>
                    ))}
                  </select>
                  <select
                    value={newMember.department}
                    onChange={(e) => setNewMember(prev => ({ ...prev, department: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept.id} value={dept.name}>{dept.name}</option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={handleInviteMember}
                  disabled={!newMember.email}
                  className="w-full px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Send Invitation
                </button>
              </div>
            </div>
          </div>

          {/* Member Details */}
          <div className="w-1/2 p-6 overflow-y-auto">
            {selectedMember ? (
              <div className="space-y-6">
                {/* Member Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {selectedMember.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{selectedMember.name}</h3>
                      <p className="text-gray-600">{selectedMember.email}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-1 rounded text-xs font-medium bg-gradient-to-r ${getRoleColor(selectedMember.role)} text-white`}>
                          {selectedMember.role.toUpperCase()}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedMember.status)}`}>
                          {selectedMember.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all text-sm"
                    >
                      {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                    <button
                      onClick={() => handleRemoveMember(selectedMember.id)}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* Activity Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-900">{selectedMember.activity.tasksCompleted}</div>
                    <div className="text-blue-600 text-sm">Tasks Completed</div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-900">{selectedMember.activity.projectsContributed}</div>
                    <div className="text-green-600 text-sm">Projects</div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-900">{selectedMember.activity.loginCount}</div>
                    <div className="text-purple-600 text-sm">Logins</div>
                  </div>
                  <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-orange-900">{selectedMember.activity.productivityScore}%</div>
                    <div className="text-orange-600 text-sm">Score</div>
                  </div>
                </div>

                {/* Permissions */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Permissions</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {AVAILABLE_PERMISSIONS.map((permission) => {
                      const hasPermission = selectedMember.permissions.some(p => p.id === permission.id);
                      return (
                        <div key={permission.id} className={`p-3 rounded-lg border ${
                          hasPermission ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                        }`}>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-gray-900">{permission.name}</div>
                              <div className="text-sm text-gray-600">{permission.description}</div>
                            </div>
                            <div className={`w-4 h-4 rounded-full ${
                              hasPermission ? 'bg-green-500' : 'bg-gray-300'
                            }`}></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Notifications */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(selectedMember.notifications).map(([type, enabled]) => (
                      <div key={type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-900 capitalize">{type}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={enabled}
                            onChange={(e) => handleUpdateMember(selectedMember.id, {
                              notifications: {
                                ...selectedMember.notifications,
                                [type]: e.target.checked
                              }
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">👥</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Member Selected</h3>
                <p className="text-gray-600">Select a team member to view details and manage permissions</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {members.length} members • {departments.length} departments
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
                console.log('Exporting member data...');
              }}
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all"
            >
              Export Data
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TeamMemberManagement;
