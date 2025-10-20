"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  SortAsc, 
  SortDesc,
  Calendar,
  Flag,
  Zap,
  CheckCircle,
  Clock,
  Users,
  Tag,
  Grid,
  List,
  Eye,
  EyeOff
} from 'lucide-react';
import TaskCard from './TaskCard';
import TaskCreator from './TaskCreator';

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

interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  onDeleteTask: (id: string) => Promise<void>;
  onCreateTask: (task: Omit<Task, 'id' | 'createdAt'>) => Promise<void>;
  onEditTask: (task: Task) => void;
  currentEnergy: number;
  onEnergyChange: (energy: number) => void;
}

type SortField = 'title' | 'priority' | 'dueDate' | 'createdAt' | 'status';
type SortDirection = 'asc' | 'desc';
type ViewMode = 'list' | 'grid';
type FilterStatus = 'all' | 'todo' | 'in-progress' | 'completed';

export default function TaskList({
  tasks,
  onUpdateTask,
  onDeleteTask,
  onCreateTask,
  onEditTask,
  currentEnergy,
  onEnergyChange
}: TaskListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterEnergy, setFilterEnergy] = useState<string>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showCompleted, setShowCompleted] = useState(false);
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort tasks
  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks.filter(task => {
      // Search filter
      if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !task.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Status filter
      if (filterStatus !== 'all' && task.status !== filterStatus) {
        return false;
      }

      // Priority filter
      if (filterPriority !== 'all' && task.priority !== filterPriority) {
        return false;
      }

      // Energy filter
      if (filterEnergy !== 'all' && task.energy !== filterEnergy) {
        return false;
      }

      // Completed filter
      if (!showCompleted && task.status === 'completed') {
        return false;
      }

      return true;
    });

    // Sort tasks
    filtered.sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (sortField === 'dueDate') {
        aValue = a.dueDate || new Date('2099-12-31');
        bValue = b.dueDate || new Date('2099-12-31');
      }

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [tasks, searchQuery, filterStatus, filterPriority, filterEnergy, showCompleted, sortField, sortDirection]);

  // Group tasks by status for better organization
  const groupedTasks = useMemo(() => {
    const groups = {
      urgent: [] as Task[],
      todo: [] as Task[],
      'in-progress': [] as Task[],
      completed: [] as Task[]
    };

    filteredAndSortedTasks.forEach(task => {
      if (task.priority === 'urgent' && task.status !== 'completed') {
        groups.urgent.push(task);
      } else {
        groups[task.status].push(task);
      }
    });

    return groups;
  }, [filteredAndSortedTasks]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />;
  };

  const getStatusCount = (status: string) => {
    return tasks.filter(task => task.status === status).length;
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Task Management</h1>
            <p className="text-gray-400">
              {filteredAndSortedTasks.length} of {tasks.length} tasks
            </p>
          </div>
          <button
            onClick={() => setIsCreatingTask(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            New Task
          </button>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="todo">To Do ({getStatusCount('todo')})</option>
              <option value="in-progress">In Progress ({getStatusCount('in-progress')})</option>
              <option value="completed">Completed ({getStatusCount('completed')})</option>
            </select>

            {/* Priority Filter */}
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Priorities</option>
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
              <option value="urgent">Urgent</option>
            </select>

            {/* Energy Filter */}
            <select
              value={filterEnergy}
              onChange={(e) => setFilterEnergy(e.target.value)}
              className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Energy Levels</option>
              <option value="low">Low Energy</option>
              <option value="medium">Medium Energy</option>
              <option value="high">High Energy</option>
            </select>

            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSort('title')}
                className="flex items-center gap-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm hover:bg-gray-600 transition-colors"
              >
                <span>Title</span>
                {getSortIcon('title')}
              </button>
              <button
                onClick={() => handleSort('dueDate')}
                className="flex items-center gap-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm hover:bg-gray-600 transition-colors"
              >
                <span>Due Date</span>
                {getSortIcon('dueDate')}
              </button>
              <button
                onClick={() => handleSort('priority')}
                className="flex items-center gap-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm hover:bg-gray-600 transition-colors"
              >
                <span>Priority</span>
                {getSortIcon('priority')}
              </button>
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={() => setShowCompleted(!showCompleted)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-colors ${
                  showCompleted 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {showCompleted ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                Show Completed
              </button>
              
              <div className="flex bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Task Content */}
      <div className="p-6">
        {filteredAndSortedTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <CheckCircle className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No tasks found</h3>
            <p className="text-gray-400 mb-6">
              {searchQuery ? 'Try adjusting your search or filters' : 'Create your first task to get started'}
            </p>
            <button
              onClick={() => setIsCreatingTask(true)}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Create Task
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Urgent Tasks */}
            {groupedTasks.urgent.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Flag className="h-5 w-5 text-red-400" />
                  Urgent Tasks ({groupedTasks.urgent.length})
                </h2>
                <div className={`grid gap-4 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                    : 'grid-cols-1'
                }`}>
                  <AnimatePresence>
                    {groupedTasks.urgent.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onUpdateTask={onUpdateTask}
                        onDeleteTask={onDeleteTask}
                        onEditTask={onEditTask}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* To Do Tasks */}
            {groupedTasks.todo.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-400" />
                  To Do ({groupedTasks.todo.length})
                </h2>
                <div className={`grid gap-4 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                    : 'grid-cols-1'
                }`}>
                  <AnimatePresence>
                    {groupedTasks.todo.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onUpdateTask={onUpdateTask}
                        onDeleteTask={onDeleteTask}
                        onEditTask={onEditTask}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* In Progress Tasks */}
            {groupedTasks['in-progress'].length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  In Progress ({groupedTasks['in-progress'].length})
                </h2>
                <div className={`grid gap-4 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                    : 'grid-cols-1'
                }`}>
                  <AnimatePresence>
                    {groupedTasks['in-progress'].map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onUpdateTask={onUpdateTask}
                        onDeleteTask={onDeleteTask}
                        onEditTask={onEditTask}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* Completed Tasks */}
            {showCompleted && groupedTasks.completed.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  Completed ({groupedTasks.completed.length})
                </h2>
                <div className={`grid gap-4 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                    : 'grid-cols-1'
                }`}>
                  <AnimatePresence>
                    {groupedTasks.completed.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onUpdateTask={onUpdateTask}
                        onDeleteTask={onDeleteTask}
                        onEditTask={onEditTask}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Task Creator Modal */}
      <TaskCreator
        isOpen={isCreatingTask}
        onClose={() => setIsCreatingTask(false)}
        onCreateTask={onCreateTask}
      />
    </div>
  );
}
