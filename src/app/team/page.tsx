"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../../components/Navigation';
import { useRubeAuth } from '../../hooks/useRubeAuth';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  UserPlus, 
  MessageSquare, 
  Video, 
  FileText,
  Calendar,
  Bell,
  Settings,
  Crown,
  Shield,
  CheckCircle,
  Clock,
  Loader2,
  Plus,
  Search,
  Filter
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'owner' | 'admin' | 'member';
  status: 'online' | 'away' | 'offline';
  lastActive: Date;
  tasksAssigned: number;
  tasksCompleted: number;
}

interface TeamProject {
  id: string;
  name: string;
  description: string;
  progress: number;
  deadline: Date;
  members: string[];
  status: 'planning' | 'active' | 'completed' | 'on-hold';
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

interface RecentActivity {
  id: string;
  type: 'task_completed' | 'task_created' | 'comment_added' | 'project_updated' | 'member_joined';
  user: string;
  description: string;
  timestamp: Date;
  project?: string;
}

export default function TeamPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useRubeAuth();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [projects, setProjects] = useState<TeamProject[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        const mockMembers: TeamMember[] = [
          {
            id: '1',
            name: 'Sarah Chen',
            email: 'sarah@syncscript.com',
            role: 'owner',
            status: 'online',
            lastActive: new Date(),
            tasksAssigned: 12,
            tasksCompleted: 8
          },
          {
            id: '2',
            name: 'Mike Johnson',
            email: 'mike@syncscript.com',
            role: 'admin',
            status: 'online',
            lastActive: new Date(Date.now() - 300000),
            tasksAssigned: 8,
            tasksCompleted: 6
          },
          {
            id: '3',
            name: 'Emily Davis',
            email: 'emily@syncscript.com',
            role: 'member',
            status: 'away',
            lastActive: new Date(Date.now() - 1800000),
            tasksAssigned: 5,
            tasksCompleted: 4
          },
          {
            id: '4',
            name: 'Alex Rodriguez',
            email: 'alex@syncscript.com',
            role: 'member',
            status: 'offline',
            lastActive: new Date(Date.now() - 3600000),
            tasksAssigned: 7,
            tasksCompleted: 3
          }
        ];

        const mockProjects: TeamProject[] = [
          {
            id: '1',
            name: 'Q4 Product Launch',
            description: 'Launch new productivity features for Q4',
            progress: 75,
            deadline: new Date('2024-02-15'),
            members: ['1', '2', '3'],
            status: 'active',
            priority: 'high'
          },
          {
            id: '2',
            name: 'Mobile App Redesign',
            description: 'Complete redesign of mobile application',
            progress: 45,
            deadline: new Date('2024-03-01'),
            members: ['2', '4'],
            status: 'active',
            priority: 'medium'
          },
          {
            id: '3',
            name: 'User Research Study',
            description: 'Conduct comprehensive user research',
            progress: 100,
            deadline: new Date('2024-01-20'),
            members: ['1', '3'],
            status: 'completed',
            priority: 'low'
          }
        ];

        const mockActivity: RecentActivity[] = [
          {
            id: '1',
            type: 'task_completed',
            user: 'Sarah Chen',
            description: 'completed "Design new dashboard layout"',
            timestamp: new Date(Date.now() - 300000),
            project: 'Q4 Product Launch'
          },
          {
            id: '2',
            type: 'comment_added',
            user: 'Mike Johnson',
            description: 'added a comment on "Mobile App Redesign"',
            timestamp: new Date(Date.now() - 600000),
            project: 'Mobile App Redesign'
          },
          {
            id: '3',
            type: 'task_created',
            user: 'Emily Davis',
            description: 'created "User testing session"',
            timestamp: new Date(Date.now() - 900000),
            project: 'Q4 Product Launch'
          },
          {
            id: '4',
            type: 'member_joined',
            user: 'Alex Rodriguez',
            description: 'joined the team',
            timestamp: new Date(Date.now() - 1200000)
          }
        ];

        setMembers(mockMembers);
        setProjects(mockProjects);
        setRecentActivity(mockActivity);
        setIsLoading(false);
      }, 1000);
    }
  }, [user]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }
  }, [user, authLoading, router]);

  const getStatusColor = (status: TeamMember['status']) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getRoleIcon = (role: TeamMember['role']) => {
    switch (role) {
      case 'owner': return <Crown className="h-4 w-4 text-purple-600" />;
      case 'admin': return <Shield className="h-4 w-4 text-blue-600" />;
      case 'member': return <Users className="h-4 w-4 text-gray-600" />;
      default: return <Users className="h-4 w-4 text-gray-600" />;
    }
  };

  const getProjectStatusColor = (status: TeamProject['status']) => {
    switch (status) {
      case 'active': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'planning': return 'bg-yellow-500';
      case 'on-hold': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: TeamProject['priority']) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-blue-600 mb-4" />
          <p className="text-gray-400">Loading team workspace...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Team Collaboration</h1>
              <p className="text-gray-400">
                Manage your team, projects, and collaboration in real-time
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowInviteModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <UserPlus className="h-4 w-4" />
                Invite Member
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-white">{members.length}</div>
                <div className="text-sm text-gray-400">Team Members</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-white">
                  {members.reduce((acc, member) => acc + member.tasksCompleted, 0)}
                </div>
                <div className="text-sm text-gray-400">Tasks Completed</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-white">{projects.length}</div>
                <div className="text-sm text-gray-400">Active Projects</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-white">
                  {projects.filter(p => p.status === 'active').length}
                </div>
                <div className="text-sm text-gray-400">In Progress</div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Team Members */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-800 rounded-lg shadow border border-gray-700"
            >
              <div className="px-6 py-4 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-white">Team Members</h2>
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-gray-400" />
                    <Filter className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {members.map((member) => (
                    <div
                      key={member.id}
                      className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                        selectedMember?.id === member.id
                          ? 'border-blue-500 bg-blue-50 bg-opacity-10'
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                      onClick={() => setSelectedMember(
                        selectedMember?.id === member.id ? null : member
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="relative">
                            <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-800 ${getStatusColor(member.status)}`}></div>
                          </div>
                          <div className="ml-3">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-white">{member.name}</h3>
                              {getRoleIcon(member.role)}
                            </div>
                            <p className="text-sm text-gray-400">{member.email}</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-sm">
                        <span className="text-gray-400">
                          {member.tasksCompleted}/{member.tasksAssigned} tasks
                        </span>
                        <span className="text-gray-500">
                          {member.status === 'online' ? 'Online' : 
                           member.status === 'away' ? 'Away' : 'Offline'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Projects & Activity */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {/* Active Projects */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gray-800 rounded-lg shadow border border-gray-700"
              >
                <div className="px-6 py-4 border-b border-gray-700">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-white">Active Projects</h2>
                    <button className="text-blue-400 hover:text-blue-300 flex items-center gap-1">
                      <Plus className="h-4 w-4" />
                      New Project
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {projects.map((project) => (
                      <div key={project.id} className="p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-white">{project.name}</h3>
                            <p className="text-sm text-gray-400">{project.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                              {project.priority}
                            </span>
                            <div className={`w-3 h-3 rounded-full ${getProjectStatusColor(project.status)}`}></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-400">Progress</span>
                          <span className="text-sm text-white">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex items-center justify-between mt-3 text-sm text-gray-400">
                          <span>Due: {project.deadline.toLocaleDateString()}</span>
                          <span>{project.members.length} members</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gray-800 rounded-lg shadow border border-gray-700"
              >
                <div className="px-6 py-4 border-b border-gray-700">
                  <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                            {activity.type === 'task_completed' && <CheckCircle className="h-4 w-4 text-green-500" />}
                            {activity.type === 'task_created' && <Plus className="h-4 w-4 text-blue-500" />}
                            {activity.type === 'comment_added' && <MessageSquare className="h-4 w-4 text-yellow-500" />}
                            {activity.type === 'project_updated' && <FileText className="h-4 w-4 text-purple-500" />}
                            {activity.type === 'member_joined' && <UserPlus className="h-4 w-4 text-green-500" />}
                          </div>
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="text-sm text-white">
                            <span className="font-medium">{activity.user}</span> {activity.description}
                          </p>
                          {activity.project && (
                            <p className="text-xs text-blue-400 mt-1">in {activity.project}</p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">
                            {activity.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Selected Member Details */}
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-gray-800 rounded-lg shadow border border-gray-700"
          >
            <div className="px-6 py-4 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-white">
                {selectedMember.name} - Details
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-medium text-white mb-3">Performance</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Tasks Assigned:</span>
                      <span className="text-white">{selectedMember.tasksAssigned}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Tasks Completed:</span>
                      <span className="text-white">{selectedMember.tasksCompleted}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Completion Rate:</span>
                      <span className="text-green-400">
                        {Math.round((selectedMember.tasksCompleted / selectedMember.tasksAssigned) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-white mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-md">
                      <MessageSquare className="h-4 w-4 inline mr-2" />
                      Send Message
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-md">
                      <Video className="h-4 w-4 inline mr-2" />
                      Start Video Call
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-md">
                      <FileText className="h-4 w-4 inline mr-2" />
                      View Tasks
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-white mb-3">Status & Role</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Role:</span>
                      <span className="text-white capitalize">{selectedMember.role}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Status:</span>
                      <span className={`capitalize ${
                        selectedMember.status === 'online' ? 'text-green-400' :
                        selectedMember.status === 'away' ? 'text-yellow-400' : 'text-gray-400'
                      }`}>
                        {selectedMember.status}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Last Active:</span>
                      <span className="text-white">
                        {selectedMember.lastActive.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
