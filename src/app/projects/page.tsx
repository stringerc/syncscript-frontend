"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../../components/Navigation';
import { useRubeAuth } from '../../hooks/useRubeAuth';
import { useRouter } from 'next/navigation';
import { 
  FolderOpen, 
  Plus, 
  Calendar, 
  Users, 
  Target,
  Clock,
  CheckCircle,
  AlertCircle,
  Pause,
  Play,
  Edit,
  Trash2,
  Filter,
  Search,
  Loader2,
  BarChart3,
  GanttChart,
  Kanban,
  List,
  Grid
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'on-hold' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  startDate: Date;
  endDate: Date;
  progress: number;
  owner: string;
  members: string[];
  tasks: Task[];
  color: string;
}

interface Task {
  id: string;
  name: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  startDate: Date;
  endDate: Date;
  assignee: string;
  dependencies: string[];
  progress: number;
}

interface GanttItem {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  progress: number;
  type: 'project' | 'task';
  color: string;
}

export default function ProjectsPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useRubeAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [ganttData, setGanttData] = useState<GanttItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'list' | 'kanban' | 'gantt' | 'grid'>('list');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        const mockProjects: Project[] = [
          {
            id: '1',
            name: 'Q4 Product Launch',
            description: 'Launch new productivity features for Q4',
            status: 'active',
            priority: 'high',
            startDate: new Date('2024-01-01'),
            endDate: new Date('2024-03-31'),
            progress: 75,
            owner: 'Sarah Chen',
            members: ['Mike Johnson', 'Emily Davis', 'Alex Rodriguez'],
            color: '#3B82F6',
            tasks: [
              {
                id: '1-1',
                name: 'UI Design',
                description: 'Design new user interface',
                status: 'completed',
                priority: 'high',
                startDate: new Date('2024-01-01'),
                endDate: new Date('2024-01-15'),
                assignee: 'Emily Davis',
                dependencies: [],
                progress: 100
              },
              {
                id: '1-2',
                name: 'Backend Development',
                description: 'Develop backend APIs',
                status: 'in-progress',
                priority: 'high',
                startDate: new Date('2024-01-10'),
                endDate: new Date('2024-02-15'),
                assignee: 'Mike Johnson',
                dependencies: ['1-1'],
                progress: 60
              },
              {
                id: '1-3',
                name: 'Testing',
                description: 'Comprehensive testing',
                status: 'todo',
                priority: 'medium',
                startDate: new Date('2024-02-10'),
                endDate: new Date('2024-03-10'),
                assignee: 'Alex Rodriguez',
                dependencies: ['1-2'],
                progress: 0
              }
            ]
          },
          {
            id: '2',
            name: 'Mobile App Redesign',
            description: 'Complete redesign of mobile application',
            status: 'active',
            priority: 'medium',
            startDate: new Date('2024-01-15'),
            endDate: new Date('2024-04-30'),
            progress: 45,
            owner: 'Mike Johnson',
            members: ['Emily Davis', 'Alex Rodriguez'],
            color: '#10B981',
            tasks: [
              {
                id: '2-1',
                name: 'Research',
                description: 'User research and analysis',
                status: 'completed',
                priority: 'medium',
                startDate: new Date('2024-01-15'),
                endDate: new Date('2024-01-25'),
                assignee: 'Emily Davis',
                dependencies: [],
                progress: 100
              },
              {
                id: '2-2',
                name: 'Prototyping',
                description: 'Create interactive prototypes',
                status: 'in-progress',
                priority: 'high',
                startDate: new Date('2024-01-20'),
                endDate: new Date('2024-02-20'),
                assignee: 'Alex Rodriguez',
                dependencies: ['2-1'],
                progress: 30
              }
            ]
          },
          {
            id: '3',
            name: 'User Research Study',
            description: 'Conduct comprehensive user research',
            status: 'completed',
            priority: 'low',
            startDate: new Date('2023-12-01'),
            endDate: new Date('2024-01-20'),
            progress: 100,
            owner: 'Emily Davis',
            members: ['Sarah Chen'],
            color: '#8B5CF6',
            tasks: [
              {
                id: '3-1',
                name: 'Survey Design',
                description: 'Design user survey',
                status: 'completed',
                priority: 'medium',
                startDate: new Date('2023-12-01'),
                endDate: new Date('2023-12-10'),
                assignee: 'Emily Davis',
                dependencies: [],
                progress: 100
              }
            ]
          }
        ];

        // Generate Gantt data
        const ganttItems: GanttItem[] = [];
        mockProjects.forEach(project => {
          ganttItems.push({
            id: project.id,
            name: project.name,
            startDate: project.startDate,
            endDate: project.endDate,
            progress: project.progress,
            type: 'project',
            color: project.color
          });
          
          project.tasks.forEach(task => {
            ganttItems.push({
              id: task.id,
              name: task.name,
              startDate: task.startDate,
              endDate: task.endDate,
              progress: task.progress,
              type: 'task',
              color: project.color + '80'
            });
          });
        });

        setProjects(mockProjects);
        setGanttData(ganttItems);
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

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'planning': return 'bg-yellow-500';
      case 'on-hold': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: Project['status']) => {
    switch (status) {
      case 'active': return <Play className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'planning': return <Clock className="h-4 w-4" />;
      case 'on-hold': return <Pause className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: Project['priority']) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderListView = () => (
    <div className="space-y-4">
      {projects.map((project) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors cursor-pointer"
          onClick={() => setSelectedProject(project)}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: project.color }}
              ></div>
              <h3 className="text-xl font-semibold text-white">{project.name}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                {project.priority}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${getStatusColor(project.status)}`}></div>
              <span className="text-sm text-gray-400 capitalize">{project.status}</span>
            </div>
          </div>
          
          <p className="text-gray-400 mb-4">{project.description}</p>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {project.startDate.toLocaleDateString()} - {project.endDate.toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {project.members.length} members
              </div>
              <div className="flex items-center gap-1">
                <Target className="h-4 w-4" />
                {project.tasks.length} tasks
              </div>
            </div>
            <span className="text-sm text-white font-semibold">{project.progress}%</span>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${project.progress}%`,
                backgroundColor: project.color
              }}
            ></div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderGanttView = () => (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Timeline Header */}
          <div className="flex items-center mb-4">
            <div className="w-48 text-sm font-medium text-gray-400">Project/Task</div>
            <div className="flex-1 flex">
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} className="flex-1 text-center text-xs text-gray-400 border-l border-gray-700 py-2">
                  {new Date(2024, i).toLocaleDateString('en-US', { month: 'short' })}
                </div>
              ))}
            </div>
          </div>
          
          {/* Gantt Items */}
          {ganttData.map((item, index) => {
            const startMonth = item.startDate.getMonth();
            const endMonth = item.endDate.getMonth();
            const duration = endMonth - startMonth + 1;
            
            return (
              <div key={item.id} className="flex items-center mb-2">
                <div className="w-48 text-sm text-white truncate pr-4">
                  {item.type === 'project' ? (
                    <div className="font-semibold">{item.name}</div>
                  ) : (
                    <div className="pl-4 text-gray-300">{item.name}</div>
                  )}
                </div>
                <div className="flex-1 relative h-8 flex items-center">
                  <div 
                    className="absolute h-6 rounded flex items-center px-2 text-xs text-white"
                    style={{
                      left: `${(startMonth / 12) * 100}%`,
                      width: `${(duration / 12) * 100}%`,
                      backgroundColor: item.color,
                      minWidth: '20px'
                    }}
                  >
                    <span className="truncate">{item.name}</span>
                  </div>
                  <div 
                    className="absolute h-6 rounded bg-black bg-opacity-30"
                    style={{
                      left: `${(startMonth / 12) * 100}%`,
                      width: `${(duration / 12) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderKanbanView = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {['planning', 'active', 'on-hold', 'completed'].map((status) => (
        <div key={status} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white capitalize">{status}</h3>
            <span className="text-sm text-gray-400">
              {projects.filter(p => p.status === status).length}
            </span>
          </div>
          <div className="space-y-3">
            {projects.filter(p => p.status === status).map((project) => (
              <div
                key={project.id}
                className="bg-gray-700 rounded-lg p-3 border border-gray-600 cursor-pointer hover:border-gray-500 transition-colors"
                onClick={() => setSelectedProject(project)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: project.color }}
                  ></div>
                  <span className="text-sm font-medium text-white">{project.name}</span>
                </div>
                <div className="text-xs text-gray-400 mb-2">{project.description}</div>
                <div className="w-full bg-gray-600 rounded-full h-1">
                  <div 
                    className="h-1 rounded-full"
                    style={{ 
                      width: `${project.progress}%`,
                      backgroundColor: project.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-blue-600 mb-4" />
          <p className="text-gray-400">Loading projects...</p>
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
              <h1 className="text-3xl font-bold text-white mb-2">Project Management</h1>
              <p className="text-gray-400">
                Manage projects, timelines, and team collaboration
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                New Project
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* View Mode Toggle */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="flex bg-gray-800 rounded-lg p-1 border border-gray-700">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('kanban')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'kanban' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Kanban className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('gantt')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'gantt' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <GanttChart className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                className="bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800">
              <Filter className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FolderOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-white">{projects.length}</div>
                <div className="text-sm text-gray-400">Total Projects</div>
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
                  {projects.filter(p => p.status === 'completed').length}
                </div>
                <div className="text-sm text-gray-400">Completed</div>
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
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-white">
                  {projects.filter(p => p.status === 'active').length}
                </div>
                <div className="text-sm text-gray-400">In Progress</div>
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
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-white">
                  {Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / projects.length)}%
                </div>
                <div className="text-sm text-gray-400">Avg Progress</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        {viewMode === 'list' && renderListView()}
        {viewMode === 'kanban' && renderKanbanView()}
        {viewMode === 'gantt' && renderGanttView()}
        {viewMode === 'grid' && renderListView()} {/* Grid view same as list for now */}

        {/* Selected Project Details */}
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">{selectedProject.name}</h2>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-medium text-white mb-3">Project Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className="text-white capitalize">{selectedProject.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Priority:</span>
                    <span className="text-white capitalize">{selectedProject.priority}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Owner:</span>
                    <span className="text-white">{selectedProject.owner}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Members:</span>
                    <span className="text-white">{selectedProject.members.length}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-white mb-3">Timeline</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Start:</span>
                    <span className="text-white">{selectedProject.startDate.toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">End:</span>
                    <span className="text-white">{selectedProject.endDate.toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Progress:</span>
                    <span className="text-white">{selectedProject.progress}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tasks:</span>
                    <span className="text-white">{selectedProject.tasks.length}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-white mb-3">Team Members</h3>
                <div className="space-y-2">
                  {selectedProject.members.map((member, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white">
                          {member.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="text-sm text-white">{member}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
