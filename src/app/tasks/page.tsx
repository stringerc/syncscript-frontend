"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../../components/Navigation';
import TaskList from '../../components/task-management/TaskList';
import EnergyGauge from '../../components/task-management/EnergyGauge';
import TaskCreator from '../../components/task-management/TaskCreator';
import { useRubeAuth } from '../../hooks/useRubeAuth';
import { useRouter } from 'next/navigation';
import { 
  Zap, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Brain,
  Target,
  Loader2
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  energy: 'low' | 'medium' | 'high';
  dueDate?: Date;
  tags: string[];
  assignees: string[];
  status: 'todo' | 'in-progress' | 'completed';
  createdAt: Date;
}

export default function TasksPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useRubeAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentEnergy, setCurrentEnergy] = useState(85);
  const [energyTrend, setEnergyTrend] = useState<'up' | 'down' | 'stable'>('stable');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Mock data for demonstration
  useEffect(() => {
    // For demo mode, load tasks even without user
    // if (user) {
      // Simulate loading tasks
      setTimeout(() => {
        const mockTasks: Task[] = [
          {
            id: '1',
            title: 'Complete Q4 Budget Allocation',
            description: 'Review and finalize the budget allocation for Q4 projects, ensuring all departments have adequate resources.',
            priority: 'urgent',
            energy: 'high',
            dueDate: new Date('2024-01-15T14:00:00'),
            tags: ['budget', 'q4', 'finance'],
            assignees: ['John Doe'],
            status: 'todo',
            createdAt: new Date('2024-01-10T09:00:00')
          },
          {
            id: '2',
            title: 'Review Q3 Marketing Slides',
            description: 'Analyze the performance of Q3 marketing campaigns and prepare slides for the board meeting.',
            priority: 'high',
            energy: 'medium',
            dueDate: new Date('2024-01-20T10:00:00'),
            tags: ['marketing', 'presentation', 'q3'],
            assignees: ['Sarah Chen', 'Mike Johnson'],
            status: 'in-progress',
            createdAt: new Date('2024-01-08T11:30:00')
          },
          {
            id: '3',
            title: 'Transfer money to high-yield savings',
            description: 'Move excess funds to high-yield savings account to maximize returns.',
            priority: 'medium',
            energy: 'low',
            dueDate: new Date('2024-01-25T16:00:00'),
            tags: ['finance', 'savings'],
            assignees: ['Jane Smith'],
            status: 'todo',
            createdAt: new Date('2024-01-12T14:15:00')
          },
          {
            id: '4',
            title: 'Research new marketing tools',
            description: 'Evaluate new marketing automation tools for potential integration into our workflow.',
            priority: 'low',
            energy: 'medium',
            tags: ['research', 'marketing', 'tools'],
            assignees: ['Alex Rodriguez'],
            status: 'completed',
            createdAt: new Date('2024-01-05T08:45:00')
          }
        ];
        setTasks(mockTasks);
        setIsLoading(false);
      }, 1000);
    // }
  }, []);

  useEffect(() => {
    // For demo purposes, show tasks even without authentication
    // In production, uncomment the redirect logic below:
    // if (!authLoading && !user) {
    //   router.push('/login');
    //   return;
    // }
  }, [user, authLoading, router]);

  const handleCreateTask = async (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const handleUpdateTask = async (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const handleDeleteTask = async (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    // Open edit modal or navigate to edit page
    console.log('Edit task:', task);
  };

  const handleEnergyChange = (energy: number) => {
    setCurrentEnergy(energy);
    
    // Update trend based on change
    if (energy > currentEnergy) {
      setEnergyTrend('up');
    } else if (energy < currentEnergy) {
      setEnergyTrend('down');
    } else {
      setEnergyTrend('stable');
    }
  };

  // Calculate task statistics
  const taskStats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    urgent: tasks.filter(t => t.priority === 'urgent' && t.status !== 'completed').length,
    overdue: tasks.filter(t => t.dueDate && new Date() > t.dueDate && t.status !== 'completed').length
  };

  // For demo mode, skip loading states
  // if (authLoading || isLoading) {
  //   return (
  //     <div className="min-h-screen bg-gray-900 flex items-center justify-center">
  //       <div className="text-center">
  //         <Loader2 className="h-12 w-12 animate-spin mx-auto text-blue-600 mb-4" />
  //         <p className="text-gray-400">Loading tasks...</p>
  //       </div>
  //     </div>
  //   );
  // }

  // For demo mode, skip user check
  // if (!user) {
  //   return null; // Will redirect to login
  // }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation />
      
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Task Management</h1>
              <p className="text-gray-400">
                Manage your tasks with AI-powered energy matching
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-gray-400">Current Energy</div>
                <div className="text-2xl font-bold text-green-400">{currentEnergy}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-lg p-4 border border-gray-700"
          >
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <div className="text-xl font-bold text-white">{taskStats.total}</div>
                <div className="text-sm text-gray-400">Total Tasks</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800 rounded-lg p-4 border border-gray-700"
          >
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div className="ml-3">
                <div className="text-xl font-bold text-white">{taskStats.todo}</div>
                <div className="text-sm text-gray-400">To Do</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800 rounded-lg p-4 border border-gray-700"
          >
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Zap className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <div className="text-xl font-bold text-white">{taskStats.inProgress}</div>
                <div className="text-sm text-gray-400">In Progress</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800 rounded-lg p-4 border border-gray-700"
          >
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="ml-3">
                <div className="text-xl font-bold text-white">{taskStats.completed}</div>
                <div className="text-sm text-gray-400">Completed</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800 rounded-lg p-4 border border-gray-700"
          >
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <div className="ml-3">
                <div className="text-xl font-bold text-white">{taskStats.urgent}</div>
                <div className="text-sm text-gray-400">Urgent</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-800 rounded-lg p-4 border border-gray-700"
          >
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Brain className="h-5 w-5 text-orange-600" />
              </div>
              <div className="ml-3">
                <div className="text-xl font-bold text-white">{taskStats.overdue}</div>
                <div className="text-sm text-gray-400">Overdue</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Task List - Takes up 3 columns */}
          <div className="lg:col-span-3">
            <TaskList
              tasks={tasks}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
              onCreateTask={handleCreateTask}
              onEditTask={handleEditTask}
              currentEnergy={currentEnergy}
              onEnergyChange={handleEnergyChange}
            />
          </div>

          {/* Energy Gauge - Takes up 1 column */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <EnergyGauge
                currentEnergy={currentEnergy}
                energyTrend={energyTrend}
                onEnergyChange={handleEnergyChange}
                showSparkline={true}
              />
              
              {/* AI Coach Widget */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-6 bg-gray-800 rounded-xl p-6 border border-gray-700"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Brain className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">AI Coach</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800 mb-2">
                      <strong>Energy Match:</strong> With {currentEnergy}% energy, focus on high-priority tasks.
                    </p>
                    <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 transition-colors">
                      Optimize Tasks
                    </button>
                  </div>
                  
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800 mb-2">
                      <strong>Smart Suggestion:</strong> Complete urgent tasks first for maximum impact.
                    </p>
                    <button className="text-xs bg-green-600 text-white px-3 py-1 rounded-full hover:bg-green-700 transition-colors">
                      View Urgent Tasks
                    </button>
                  </div>
                  
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <p className="text-sm text-purple-800 mb-2">
                      <strong>Schedule Tip:</strong> Take a break in 2 hours to maintain energy.
                    </p>
                    <button className="text-xs bg-purple-600 text-white px-3 py-1 rounded-full hover:bg-purple-700 transition-colors">
                      Set Break Reminder
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
