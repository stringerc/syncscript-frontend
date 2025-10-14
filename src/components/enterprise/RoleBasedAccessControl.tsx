/**
 * Role-Based Access Control (RBAC) Component
 * 
 * Provides comprehensive user role management and permission control
 * Includes predefined roles, custom roles, and granular permissions
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Permission {
  id: string;
  name: string;
  description: string;
  category: 'tasks' | 'projects' | 'analytics' | 'users' | 'settings' | 'billing' | 'integrations';
  level: 'read' | 'write' | 'delete' | 'admin';
}

interface Role {
  id: string;
  name: string;
  description: string;
  level: number; // 1-10, higher = more permissions
  permissions: string[]; // Permission IDs
  isDefault: boolean;
  isCustom: boolean;
  userCount: number;
  color: string;
  restrictions: {
    maxProjects?: number;
    maxTasks?: number;
    canInviteUsers: boolean;
    canManageBilling: boolean;
    canAccessAnalytics: boolean;
  };
}

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  status: 'active' | 'pending' | 'suspended';
  lastActive: string;
  permissions: string[];
  teamId?: string;
}

interface RoleBasedAccessControlProps {
  userId: string;
  onClose: () => void;
}

const AVAILABLE_PERMISSIONS: Permission[] = [
  // Tasks
  { id: 'tasks.read', name: 'View Tasks', description: 'View all tasks in the workspace', category: 'tasks', level: 'read' },
  { id: 'tasks.create', name: 'Create Tasks', description: 'Create new tasks', category: 'tasks', level: 'write' },
  { id: 'tasks.edit', name: 'Edit Tasks', description: 'Edit existing tasks', category: 'tasks', level: 'write' },
  { id: 'tasks.delete', name: 'Delete Tasks', description: 'Delete tasks', category: 'tasks', level: 'delete' },
  { id: 'tasks.assign', name: 'Assign Tasks', description: 'Assign tasks to other users', category: 'tasks', level: 'write' },
  
  // Projects
  { id: 'projects.read', name: 'View Projects', description: 'View all projects', category: 'projects', level: 'read' },
  { id: 'projects.create', name: 'Create Projects', description: 'Create new projects', category: 'projects', level: 'write' },
  { id: 'projects.edit', name: 'Edit Projects', description: 'Edit existing projects', category: 'projects', level: 'write' },
  { id: 'projects.delete', name: 'Delete Projects', description: 'Delete projects', category: 'projects', level: 'delete' },
  { id: 'projects.manage', name: 'Manage Projects', description: 'Full project management', category: 'projects', level: 'admin' },
  
  // Analytics
  { id: 'analytics.view', name: 'View Analytics', description: 'View basic analytics and reports', category: 'analytics', level: 'read' },
  { id: 'analytics.advanced', name: 'Advanced Analytics', description: 'Access advanced analytics and insights', category: 'analytics', level: 'write' },
  { id: 'analytics.export', name: 'Export Analytics', description: 'Export analytics data', category: 'analytics', level: 'write' },
  
  // Users
  { id: 'users.view', name: 'View Users', description: 'View user list and basic info', category: 'users', level: 'read' },
  { id: 'users.invite', name: 'Invite Users', description: 'Invite new users to workspace', category: 'users', level: 'write' },
  { id: 'users.edit', name: 'Edit Users', description: 'Edit user profiles and roles', category: 'users', level: 'write' },
  { id: 'users.suspend', name: 'Suspend Users', description: 'Suspend or activate users', category: 'users', level: 'admin' },
  { id: 'users.delete', name: 'Delete Users', description: 'Remove users from workspace', category: 'users', level: 'admin' },
  
  // Settings
  { id: 'settings.view', name: 'View Settings', description: 'View workspace settings', category: 'settings', level: 'read' },
  { id: 'settings.edit', name: 'Edit Settings', description: 'Edit workspace settings', category: 'settings', level: 'write' },
  { id: 'settings.integrations', name: 'Manage Integrations', description: 'Manage third-party integrations', category: 'settings', level: 'write' },
  
  // Billing
  { id: 'billing.view', name: 'View Billing', description: 'View billing information', category: 'billing', level: 'read' },
  { id: 'billing.manage', name: 'Manage Billing', description: 'Manage billing and subscriptions', category: 'billing', level: 'admin' },
  
  // Integrations
  { id: 'integrations.view', name: 'View Integrations', description: 'View available integrations', category: 'integrations', level: 'read' },
  { id: 'integrations.connect', name: 'Connect Integrations', description: 'Connect third-party services', category: 'integrations', level: 'write' },
  { id: 'integrations.manage', name: 'Manage Integrations', description: 'Manage all integrations', category: 'integrations', level: 'admin' }
];

const DEFAULT_ROLES: Role[] = [
  {
    id: 'admin',
    name: 'Administrator',
    description: 'Full access to all features and settings',
    level: 10,
    permissions: AVAILABLE_PERMISSIONS.map(p => p.id),
    isDefault: true,
    isCustom: false,
    userCount: 0,
    color: 'from-red-500 to-pink-500',
    restrictions: {
      canInviteUsers: true,
      canManageBilling: true,
      canAccessAnalytics: true
    }
  },
  {
    id: 'manager',
    name: 'Manager',
    description: 'Manage teams and projects with limited admin access',
    level: 8,
    permissions: [
      'tasks.read', 'tasks.create', 'tasks.edit', 'tasks.assign',
      'projects.read', 'projects.create', 'projects.edit', 'projects.manage',
      'analytics.view', 'analytics.advanced',
      'users.view', 'users.invite', 'users.edit',
      'settings.view', 'integrations.view', 'integrations.connect'
    ],
    isDefault: true,
    isCustom: false,
    userCount: 0,
    color: 'from-blue-500 to-cyan-500',
    restrictions: {
      maxProjects: 50,
      maxTasks: 1000,
      canInviteUsers: true,
      canManageBilling: false,
      canAccessAnalytics: true
    }
  },
  {
    id: 'member',
    name: 'Member',
    description: 'Standard user with task and project access',
    level: 5,
    permissions: [
      'tasks.read', 'tasks.create', 'tasks.edit',
      'projects.read', 'projects.create',
      'analytics.view',
      'users.view',
      'settings.view',
      'integrations.view'
    ],
    isDefault: true,
    isCustom: false,
    userCount: 0,
    color: 'from-green-500 to-emerald-500',
    restrictions: {
      maxProjects: 10,
      maxTasks: 100,
      canInviteUsers: false,
      canManageBilling: false,
      canAccessAnalytics: false
    }
  },
  {
    id: 'viewer',
    name: 'Viewer',
    description: 'Read-only access to tasks and projects',
    level: 2,
    permissions: [
      'tasks.read',
      'projects.read',
      'analytics.view',
      'users.view'
    ],
    isDefault: true,
    isCustom: false,
    userCount: 0,
    color: 'from-gray-500 to-gray-600',
    restrictions: {
      maxProjects: 5,
      maxTasks: 50,
      canInviteUsers: false,
      canManageBilling: false,
      canAccessAnalytics: false
    }
  }
];

const RoleBasedAccessControl: React.FC<RoleBasedAccessControlProps> = ({ userId, onClose }) => {
  const [roles, setRoles] = useState<Role[]>(DEFAULT_ROLES);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isCreatingRole, setIsCreatingRole] = useState(false);
  const [isManagingUsers, setIsManagingUsers] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDescription, setNewRoleDescription] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  useEffect(() => {
    // Simulate loading users
    const mockUsers: User[] = [
      {
        id: 'user-1',
        email: 'admin@company.com',
        name: 'John Admin',
        role: 'admin',
        status: 'active',
        lastActive: new Date().toISOString(),
        permissions: DEFAULT_ROLES[0].permissions
      },
      {
        id: 'user-2',
        email: 'manager@company.com',
        name: 'Jane Manager',
        role: 'manager',
        status: 'active',
        lastActive: new Date(Date.now() - 86400000).toISOString(),
        permissions: DEFAULT_ROLES[1].permissions
      },
      {
        id: 'user-3',
        email: 'member@company.com',
        name: 'Bob Member',
        role: 'member',
        status: 'active',
        lastActive: new Date(Date.now() - 172800000).toISOString(),
        permissions: DEFAULT_ROLES[2].permissions
      }
    ];
    setUsers(mockUsers);
  }, []);

  const handleCreateRole = async () => {
    if (!newRoleName.trim()) return;

    const newRole: Role = {
      id: `custom-${Date.now()}`,
      name: newRoleName,
      description: newRoleDescription,
      level: 6,
      permissions: selectedPermissions,
      isDefault: false,
      isCustom: true,
      userCount: 0,
      color: 'from-purple-500 to-indigo-500',
      restrictions: {
        canInviteUsers: selectedPermissions.includes('users.invite'),
        canManageBilling: selectedPermissions.includes('billing.manage'),
        canAccessAnalytics: selectedPermissions.includes('analytics.advanced')
      }
    };

    setRoles(prev => [...prev, newRole]);
    setNewRoleName('');
    setNewRoleDescription('');
    setSelectedPermissions([]);
    setIsCreatingRole(false);
  };

  const handleAssignRole = async (userId: string, roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    if (!role) return;

    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, role: roleId, permissions: role.permissions }
        : user
    ));

    // Update user count for roles
    setRoles(prev => prev.map(role => ({
      ...role,
      userCount: users.filter(u => u.role === role.id).length
    })));
  };

  const handleTogglePermission = (permissionId: string) => {
    setSelectedPermissions(prev => 
      prev.includes(permissionId)
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const getPermissionCategory = (category: string) => {
    switch (category) {
      case 'tasks': return '📋 Tasks';
      case 'projects': return '📁 Projects';
      case 'analytics': return '📊 Analytics';
      case 'users': return '👥 Users';
      case 'settings': return '⚙️ Settings';
      case 'billing': return '💳 Billing';
      case 'integrations': return '🔗 Integrations';
      default: return '📦 Other';
    }
  };

  const getRoleColor = (roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    return role?.color || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Role-Based Access Control</h2>
              <p className="text-purple-100 mt-1">Manage user roles and permissions</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-purple-200 text-sm">Roles:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {roles.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-purple-200 text-sm">Users:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {users.length}
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
          {/* Roles Panel */}
          <div className="w-1/3 border-r border-gray-200 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Roles</h3>
              <button
                onClick={() => setIsCreatingRole(true)}
                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-all text-sm"
              >
                + New Role
              </button>
            </div>

            <div className="space-y-3">
              {roles.map((role) => (
                <motion.div
                  key={role.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedRole(role)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedRole?.id === role.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${role.color} flex items-center justify-center text-white text-sm font-bold`}>
                        {role.level}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 flex items-center space-x-2">
                          <span>{role.name}</span>
                          {role.isCustom && (
                            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                              Custom
                            </span>
                          )}
                        </h4>
                        <p className="text-sm text-gray-600">{role.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{role.userCount}</div>
                      <div className="text-xs text-gray-500">users</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Level {role.level}/10</span>
                    <span>{role.permissions.length} permissions</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Users Panel */}
          <div className="w-1/3 border-r border-gray-200 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Users</h3>
              <button
                onClick={() => setIsManagingUsers(true)}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all text-sm"
              >
                + Invite User
              </button>
            </div>

            <div className="space-y-3">
              {users.map((user) => (
                <motion.div
                  key={user.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedUser(user)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedUser?.id === user.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white font-bold">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{user.name}</h4>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${
                      user.status === 'active' ? 'bg-green-500' :
                      user.status === 'pending' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded text-xs font-medium bg-gradient-to-r ${getRoleColor(user.role)} text-white`}>
                      {roles.find(r => r.id === user.role)?.name || 'Unknown'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(user.lastActive).toLocaleDateString()}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Details Panel */}
          <div className="w-1/3 p-6 overflow-y-auto">
            {selectedRole ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{selectedRole.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{selectedRole.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm font-medium text-gray-700">Level</div>
                      <div className="text-lg font-bold text-gray-900">{selectedRole.level}/10</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-700">Users</div>
                      <div className="text-lg font-bold text-gray-900">{selectedRole.userCount}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Permissions</h4>
                  <div className="space-y-2">
                    {Object.entries(
                      AVAILABLE_PERMISSIONS
                        .filter(p => selectedRole.permissions.includes(p.id))
                        .reduce((acc, permission) => {
                          if (!acc[permission.category]) {
                            acc[permission.category] = [];
                          }
                          acc[permission.category].push(permission);
                          return acc;
                        }, {} as Record<string, Permission[]>)
                    ).map(([category, permissions]) => (
                      <div key={category}>
                        <div className="text-sm font-medium text-gray-700 mb-1">
                          {getPermissionCategory(category)}
                        </div>
                        <div className="space-y-1">
                          {permissions.map((permission) => (
                            <div key={permission.id} className="text-xs text-gray-600 pl-4">
                              • {permission.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Restrictions</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Max Projects:</span>
                      <span className="font-medium">{selectedRole.restrictions.maxProjects || 'Unlimited'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Max Tasks:</span>
                      <span className="font-medium">{selectedRole.restrictions.maxTasks || 'Unlimited'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Can Invite Users:</span>
                      <span className={`font-medium ${selectedRole.restrictions.canInviteUsers ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedRole.restrictions.canInviteUsers ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Can Manage Billing:</span>
                      <span className={`font-medium ${selectedRole.restrictions.canManageBilling ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedRole.restrictions.canManageBilling ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : selectedUser ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{selectedUser.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{selectedUser.email}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm font-medium text-gray-700">Role</div>
                      <div className="text-lg font-bold text-gray-900">
                        {roles.find(r => r.id === selectedUser.role)?.name || 'Unknown'}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-700">Status</div>
                      <div className={`text-lg font-bold ${
                        selectedUser.status === 'active' ? 'text-green-600' :
                        selectedUser.status === 'pending' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Change Role</h4>
                  <div className="space-y-2">
                    {roles.map((role) => (
                      <button
                        key={role.id}
                        onClick={() => handleAssignRole(selectedUser.id, role.id)}
                        className={`w-full text-left p-3 rounded-lg border transition-all ${
                          selectedUser.role === role.id
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-medium text-gray-900">{role.name}</div>
                        <div className="text-sm text-gray-600">{role.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">👥</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a Role or User</h3>
                <p className="text-gray-600">Choose a role or user to view details and manage permissions</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {roles.length} roles • {users.length} users
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
                // TODO: Export role configuration
                console.log('Exporting role configuration...');
              }}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all"
            >
              Export Config
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RoleBasedAccessControl;
