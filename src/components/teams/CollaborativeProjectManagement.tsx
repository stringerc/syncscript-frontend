/**
 * Collaborative Project Management Component
 * 
 * Advanced project collaboration with shared workspaces, task assignments,
 * real-time updates, and team coordination features
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  progress: number;
  startDate: string;
  dueDate?: string;
  completedDate?: string;
  teamId: string;
  ownerId: string;
  members: ProjectMember[];
  tags: string[];
  attachments: ProjectAttachment[];
  milestones: Milestone[];
  tasks: ProjectTask[];
  comments: ProjectComment[];
  createdAt: string;
  updatedAt: string;
}

interface ProjectMember {
  id: string;
  userId: string;
  email: string;
  name: string;
  role: 'owner' | 'manager' | 'contributor' | 'reviewer';
  permissions: string[];
  joinedAt: string;
  avatar?: string;
}

interface ProjectTask {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assigneeId?: string;
  assigneeName?: string;
  dueDate?: string;
  estimatedHours?: number;
  actualHours?: number;
  progress: number;
  subtasks: ProjectTask[];
  dependencies: string[];
  tags: string[];
  comments: TaskComment[];
  createdAt: string;
  updatedAt: string;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completedDate?: string;
  status: 'upcoming' | 'current' | 'completed' | 'overdue';
  progress: number;
  tasks: string[];
  ownerId: string;
}

interface ProjectComment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  type: 'comment' | 'update' | 'decision';
  timestamp: string;
  mentions: string[];
}

interface TaskComment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: string;
}

interface ProjectAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedBy: string;
  uploadedAt: string;
}

interface CollaborativeProjectManagementProps {
  teamId: string;
  onClose: () => void;
}

const PROJECT_STATUSES = [
  { id: 'planning', name: 'Planning', color: 'from-blue-500 to-cyan-500', icon: '📋' },
  { id: 'active', name: 'Active', color: 'from-green-500 to-emerald-500', icon: '🚀' },
  { id: 'on_hold', name: 'On Hold', color: 'from-yellow-500 to-orange-500', icon: '⏸️' },
  { id: 'completed', name: 'Completed', color: 'from-purple-500 to-indigo-500', icon: '✅' },
  { id: 'cancelled', name: 'Cancelled', color: 'from-red-500 to-pink-500', icon: '❌' }
];

const PRIORITY_LEVELS = [
  { id: 'low', name: 'Low', color: 'from-gray-400 to-gray-500', icon: '🟢' },
  { id: 'medium', name: 'Medium', color: 'from-blue-400 to-blue-500', icon: '🟡' },
  { id: 'high', name: 'High', color: 'from-orange-400 to-orange-500', icon: '🟠' },
  { id: 'urgent', name: 'Urgent', color: 'from-red-400 to-red-500', icon: '🔴' }
];

const CollaborativeProjectManagement: React.FC<CollaborativeProjectManagementProps> = ({ teamId, onClose }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'kanban' | 'timeline'>('grid');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [isAddingTask, setIsAddingTask] = useState(false);

  // New project form
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    priority: 'medium',
    startDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    tags: [] as string[]
  });

  // New task form
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    assigneeId: '',
    dueDate: '',
    estimatedHours: 0,
    tags: [] as string[]
  });

  useEffect(() => {
    loadProjects();
  }, [teamId]);

  const loadProjects = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API calls
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock project data
      const mockProjects: Project[] = [
        {
          id: 'project-1',
          name: 'SyncScript Mobile App',
          description: 'Native mobile application for iOS and Android platforms',
          status: 'active',
          priority: 'high',
          progress: 65,
          startDate: '2024-01-15',
          dueDate: '2024-06-30',
          teamId,
          ownerId: 'user-1',
          members: [
            {
              id: 'member-1',
              userId: 'user-1',
              email: 'admin@team.com',
              name: 'John Admin',
              role: 'owner',
              permissions: ['all'],
              joinedAt: '2024-01-15T00:00:00Z'
            },
            {
              id: 'member-2',
              userId: 'user-2',
              email: 'developer@team.com',
              name: 'Jane Developer',
              role: 'manager',
              permissions: ['tasks.manage', 'projects.edit'],
              joinedAt: '2024-01-20T00:00:00Z'
            }
          ],
          tags: ['mobile', 'react-native', 'ios', 'android'],
          attachments: [],
          milestones: [
            {
              id: 'milestone-1',
              title: 'Design Phase Complete',
              description: 'UI/UX design and wireframes finalized',
              dueDate: '2024-02-15',
              completedDate: '2024-02-10',
              status: 'completed',
              progress: 100,
              tasks: ['task-1', 'task-2'],
              ownerId: 'user-2'
            },
            {
              id: 'milestone-2',
              title: 'Development Phase',
              description: 'Core functionality implementation',
              dueDate: '2024-04-30',
              status: 'current',
              progress: 65,
              tasks: ['task-3', 'task-4', 'task-5'],
              ownerId: 'user-1'
            }
          ],
          tasks: [
            {
              id: 'task-1',
              title: 'Setup React Native project',
              description: 'Initialize React Native project with necessary dependencies',
              status: 'completed',
              priority: 'high',
              assigneeId: 'user-2',
              assigneeName: 'Jane Developer',
              dueDate: '2024-01-30',
              estimatedHours: 8,
              actualHours: 10,
              progress: 100,
              subtasks: [],
              dependencies: [],
              tags: ['setup', 'react-native'],
              comments: [],
              createdAt: '2024-01-15T00:00:00Z',
              updatedAt: '2024-01-30T00:00:00Z'
            },
            {
              id: 'task-2',
              title: 'Implement authentication',
              description: 'Add Auth0 authentication to mobile app',
              status: 'in_progress',
              priority: 'high',
              assigneeId: 'user-2',
              assigneeName: 'Jane Developer',
              dueDate: '2024-03-15',
              estimatedHours: 16,
              actualHours: 12,
              progress: 75,
              subtasks: [],
              dependencies: ['task-1'],
              tags: ['auth', 'auth0'],
              comments: [],
              createdAt: '2024-01-20T00:00:00Z',
              updatedAt: new Date().toISOString()
            }
          ],
          comments: [],
          createdAt: '2024-01-15T00:00:00Z',
          updatedAt: new Date().toISOString()
        },
        {
          id: 'project-2',
          name: 'API v2 Development',
          description: 'Next generation API with enhanced features and performance',
          status: 'planning',
          priority: 'medium',
          progress: 15,
          startDate: '2024-03-01',
          dueDate: '2024-08-31',
          teamId,
          ownerId: 'user-1',
          members: [
            {
              id: 'member-1',
              userId: 'user-1',
              email: 'admin@team.com',
              name: 'John Admin',
              role: 'owner',
              permissions: ['all'],
              joinedAt: '2024-01-15T00:00:00Z'
            }
          ],
          tags: ['api', 'backend', 'node.js'],
          attachments: [],
          milestones: [
            {
              id: 'milestone-3',
              title: 'API Design',
              description: 'Design API endpoints and data models',
              dueDate: '2024-03-31',
              status: 'current',
              progress: 15,
              tasks: ['task-6'],
              ownerId: 'user-1'
            }
          ],
          tasks: [
            {
              id: 'task-6',
              title: 'Design API endpoints',
              description: 'Define REST API endpoints and request/response schemas',
              status: 'in_progress',
              priority: 'medium',
              assigneeId: 'user-1',
              assigneeName: 'John Admin',
              dueDate: '2024-03-31',
              estimatedHours: 20,
              actualHours: 3,
              progress: 15,
              subtasks: [],
              dependencies: [],
              tags: ['design', 'api'],
              comments: [],
              createdAt: '2024-03-01T00:00:00Z',
              updatedAt: new Date().toISOString()
            }
          ],
          comments: [],
          createdAt: '2024-03-01T00:00:00Z',
          updatedAt: new Date().toISOString()
        }
      ];

      setProjects(mockProjects);
    } catch (error) {
      console.error('Failed to load projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProject = async () => {
    try {
      const project: Project = {
        id: `project-${Date.now()}`,
        name: newProject.name,
        description: newProject.description,
        status: 'planning',
        priority: newProject.priority as any,
        progress: 0,
        startDate: newProject.startDate,
        dueDate: newProject.dueDate || undefined,
        teamId,
        ownerId: 'current-user',
        members: [],
        tags: newProject.tags,
        attachments: [],
        milestones: [],
        tasks: [],
        comments: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setProjects(prev => [...prev, project]);
      setSelectedProject(project);
      
      // Reset form
      setNewProject({
        name: '',
        description: '',
        priority: 'medium',
        startDate: new Date().toISOString().split('T')[0],
        dueDate: '',
        tags: []
      });
      
      console.log('✅ Project created successfully');
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  const handleAddTask = async () => {
    if (!selectedProject) return;
    
    try {
      const task: ProjectTask = {
        id: `task-${Date.now()}`,
        title: newTask.title,
        description: newTask.description,
        status: 'todo',
        priority: newTask.priority as any,
        assigneeId: newTask.assigneeId || undefined,
        assigneeName: newTask.assigneeId ? 'Selected User' : undefined,
        dueDate: newTask.dueDate || undefined,
        estimatedHours: newTask.estimatedHours || undefined,
        progress: 0,
        subtasks: [],
        dependencies: [],
        tags: newTask.tags,
        comments: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setProjects(prev => prev.map(project => 
        project.id === selectedProject.id
          ? { ...project, tasks: [...project.tasks, task] }
          : project
      ));
      
      setSelectedProject(prev => prev ? { ...prev, tasks: [...prev.tasks, task] } : null);
      
      // Reset form
      setNewTask({
        title: '',
        description: '',
        priority: 'medium',
        assigneeId: '',
        dueDate: '',
        estimatedHours: 0,
        tags: []
      });
      
      console.log('✅ Task added successfully');
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  const handleUpdateTaskStatus = (projectId: string, taskId: string, status: ProjectTask['status']) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId
        ? {
            ...project,
            tasks: project.tasks.map(task =>
              task.id === taskId ? { ...task, status, updatedAt: new Date().toISOString() } : task
            )
          }
        : project
    ));
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || project.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusConfig = (status: string) => {
    return PROJECT_STATUSES.find(s => s.id === status) || PROJECT_STATUSES[0];
  };

  const getPriorityConfig = (priority: string) => {
    return PRIORITY_LEVELS.find(p => p.id === priority) || PRIORITY_LEVELS[1];
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'todo': return 'bg-gray-100 text-gray-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
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
            <span className="text-lg font-medium text-gray-700">Loading projects...</span>
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
              <h2 className="text-2xl font-bold">Collaborative Project Management</h2>
              <p className="text-blue-100 mt-1">Advanced project collaboration and team coordination</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Projects:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {projects.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Tasks:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {projects.reduce((total, project) => total + project.tasks.length, 0)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-200 text-sm">Milestones:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {projects.reduce((total, project) => total + project.milestones.length, 0)}
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
          {/* Projects List */}
          <div className="w-1/2 border-r border-gray-200 p-6 overflow-y-auto">
            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="relative flex-1 mr-4">
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <button
                  onClick={() => setIsCreatingProject(true)}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all"
                >
                  + New Project
                </button>
              </div>
              
              <div className="flex space-x-4">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  {PROJECT_STATUSES.map(status => (
                    <option key={status.id} value={status.id}>{status.name}</option>
                  ))}
                </select>
                
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Priority</option>
                  {PRIORITY_LEVELS.map(priority => (
                    <option key={priority.id} value={priority.id}>{priority.name}</option>
                  ))}
                </select>

                <select
                  value={viewMode}
                  onChange={(e) => setViewMode(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="grid">Grid View</option>
                  <option value="list">List View</option>
                  <option value="kanban">Kanban View</option>
                  <option value="timeline">Timeline View</option>
                </select>
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 gap-4">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedProject(project)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedProject?.id === project.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{project.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                      
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium bg-gradient-to-r ${getStatusConfig(project.status).color} text-white`}>
                          {getStatusConfig(project.status).icon} {getStatusConfig(project.status).name}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium bg-gradient-to-r ${getPriorityConfig(project.priority).color} text-white`}>
                          {getPriorityConfig(project.priority).icon} {getPriorityConfig(project.priority).name}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">{project.progress}%</div>
                      <div className="text-xs text-gray-500">progress</div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{project.tasks.length} tasks • {project.milestones.length} milestones</span>
                    <span>Due {project.dueDate ? new Date(project.dueDate).toLocaleDateString() : 'TBD'}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Project Details */}
          <div className="w-1/2 p-6 overflow-y-auto">
            {selectedProject ? (
              <div className="space-y-6">
                {/* Project Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedProject.name}</h3>
                    <p className="text-gray-600">{selectedProject.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setIsAddingTask(true)}
                      className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all text-sm"
                    >
                      Add Task
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all text-sm">
                      Settings
                    </button>
                  </div>
                </div>

                {/* Project Stats */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-900">{selectedProject.tasks.length}</div>
                    <div className="text-blue-600 text-sm">Total Tasks</div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-900">
                      {selectedProject.tasks.filter(t => t.status === 'completed').length}
                    </div>
                    <div className="text-green-600 text-sm">Completed</div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-900">{selectedProject.milestones.length}</div>
                    <div className="text-purple-600 text-sm">Milestones</div>
                  </div>
                  <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-orange-900">{selectedProject.members.length}</div>
                    <div className="text-orange-600 text-sm">Members</div>
                  </div>
                </div>

                {/* Tasks */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Tasks</h4>
                  <div className="space-y-3">
                    {selectedProject.tasks.map((task) => (
                      <div key={task.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <h5 className="font-medium text-gray-900">{task.title}</h5>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getTaskStatusColor(task.status)}`}>
                              {task.status.replace('_', ' ').toUpperCase()}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-900">{task.progress}%</div>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center space-x-4">
                            {task.assigneeName && (
                              <span>👤 {task.assigneeName}</span>
                            )}
                            {task.dueDate && (
                              <span>📅 Due {new Date(task.dueDate).toLocaleDateString()}</span>
                            )}
                            {task.estimatedHours && (
                              <span>⏱️ {task.estimatedHours}h estimated</span>
                            )}
                          </div>
                          <div className="flex space-x-1">
                            {['todo', 'in_progress', 'review', 'completed'].map(status => (
                              <button
                                key={status}
                                onClick={() => handleUpdateTaskStatus(selectedProject.id, task.id, status as any)}
                                className={`px-2 py-1 rounded text-xs ${
                                  task.status === status
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                              >
                                {status.replace('_', ' ')}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Milestones */}
                {selectedProject.milestones.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Milestones</h4>
                    <div className="space-y-3">
                      {selectedProject.milestones.map((milestone) => (
                        <div key={milestone.id} className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-gray-900">{milestone.title}</h5>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              milestone.status === 'completed' ? 'bg-green-100 text-green-800' :
                              milestone.status === 'current' ? 'bg-blue-100 text-blue-800' :
                              milestone.status === 'overdue' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {milestone.status.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>Due {new Date(milestone.dueDate).toLocaleDateString()}</span>
                            <span>{milestone.progress}% complete</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Project Selected</h3>
                <p className="text-gray-600">Select a project to view details and manage tasks</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {projects.length} projects • {projects.reduce((total, project) => total + project.tasks.length, 0)} tasks
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
                console.log('Exporting project data...');
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

export default CollaborativeProjectManagement;
