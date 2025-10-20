"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Flag, 
  Tag, 
  Users,
  Zap,
  CheckCircle,
  Edit,
  Trash2,
  MoreVertical,
  Calendar,
  AlertCircle,
  Play,
  Pause
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

interface TaskCardProps {
  task: Task;
  onUpdateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  onDeleteTask: (id: string) => Promise<void>;
  onEditTask: (task: Task) => void;
  onClick?: () => void;
}

export default function TaskCard({ 
  task, 
  onUpdateTask, 
  onDeleteTask, 
  onEditTask,
  onClick 
}: TaskCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const priorityConfig = {
    low: { 
      color: 'border-green-500 bg-green-50 text-green-800', 
      icon: <Flag className="h-4 w-4" />,
      label: 'Low'
    },
    medium: { 
      color: 'border-yellow-500 bg-yellow-50 text-yellow-800', 
      icon: <Flag className="h-4 w-4" />,
      label: 'Medium'
    },
    high: { 
      color: 'border-orange-500 bg-orange-50 text-orange-800', 
      icon: <Flag className="h-4 w-4" />,
      label: 'High'
    },
    urgent: { 
      color: 'border-red-500 bg-red-50 text-red-800', 
      icon: <AlertCircle className="h-4 w-4" />,
      label: 'Urgent'
    }
  };

  const energyConfig = {
    low: { 
      color: 'bg-blue-100 text-blue-800', 
      icon: <Zap className="h-4 w-4" />,
      label: 'Low Energy'
    },
    medium: { 
      color: 'bg-purple-100 text-purple-800', 
      icon: <Zap className="h-4 w-4" />,
      label: 'Medium Energy'
    },
    high: { 
      color: 'bg-pink-100 text-pink-800', 
      icon: <Zap className="h-4 w-4" />,
      label: 'High Energy'
    }
  };

  const statusConfig = {
    todo: { 
      color: 'bg-gray-100 text-gray-800', 
      icon: <Play className="h-4 w-4" />,
      label: 'To Do'
    },
    'in-progress': { 
      color: 'bg-blue-100 text-blue-800', 
      icon: <Pause className="h-4 w-4" />,
      label: 'In Progress'
    },
    completed: { 
      color: 'bg-green-100 text-green-800', 
      icon: <CheckCircle className="h-4 w-4" />,
      label: 'Completed'
    }
  };

  const handleStatusToggle = async () => {
    setIsUpdating(true);
    try {
      const newStatus = task.status === 'completed' ? 'todo' : 'completed';
      await onUpdateTask(task.id, { status: newStatus });
    } catch (error) {
      console.error('Error updating task status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePriorityChange = async (newPriority: Task['priority']) => {
    setIsUpdating(true);
    try {
      await onUpdateTask(task.id, { priority: newPriority });
    } catch (error) {
      console.error('Error updating task priority:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const isOverdue = task.dueDate && new Date() > task.dueDate && task.status !== 'completed';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`bg-gray-900 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
        isHovered 
          ? 'border-blue-500 shadow-lg shadow-blue-500/20' 
          : priorityConfig[task.priority].color.replace('bg-', 'border-').replace('50', '500')
      }`}
      onClick={onClick}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleStatusToggle();
                }}
                disabled={isUpdating}
                className={`p-1 rounded-full transition-colors ${
                  task.status === 'completed' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-700 text-gray-400 hover:bg-green-600 hover:text-white'
                }`}
              >
                {isUpdating ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <CheckCircle className="h-4 w-4" />
                )}
              </button>
              
              <h3 className={`font-semibold text-lg ${
                task.status === 'completed' ? 'line-through text-gray-400' : 'text-white'
              }`}>
                {task.title}
              </h3>
            </div>
            
            {task.description && (
              <p className="text-gray-300 text-sm mt-1 line-clamp-2">
                {task.description}
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {/* Status Badge */}
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig[task.status].color}`}>
              {statusConfig[task.status].icon}
              {statusConfig[task.status].label}
            </span>
            
            {/* Actions Menu */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowActions(!showActions);
                }}
                className="p-1 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <MoreVertical className="h-4 w-4 text-gray-400" />
              </button>
              
              {showActions && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute right-0 top-8 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10 min-w-[120px]"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditTask(task);
                      setShowActions(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 rounded-t-lg flex items-center gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteTask(task.id);
                      setShowActions(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-gray-700 rounded-b-lg flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Priority and Energy */}
        <div className="flex items-center gap-3">
          {/* Priority */}
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${priorityConfig[task.priority].color}`}>
            {priorityConfig[task.priority].icon}
            {priorityConfig[task.priority].label}
          </span>
          
          {/* Energy */}
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${energyConfig[task.energy].color}`}>
            {energyConfig[task.energy].icon}
            {energyConfig[task.energy].label}
          </span>
        </div>

        {/* Due Date */}
        {task.dueDate && (
          <div className="flex items-center gap-2 text-sm">
            <Calendar className={`h-4 w-4 ${isOverdue ? 'text-red-400' : 'text-gray-400'}`} />
            <span className={isOverdue ? 'text-red-400 font-medium' : 'text-gray-300'}>
              {isOverdue ? 'Overdue: ' : 'Due: '}
              {task.dueDate.toLocaleDateString()} at {task.dueDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        )}

        {/* Tags */}
        {task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {task.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Assignees */}
        {task.assignees.length > 0 && (
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-400" />
            <div className="flex -space-x-2">
              {task.assignees.slice(0, 3).map((assignee, index) => (
                <div
                  key={index}
                  className="w-6 h-6 bg-gray-600 rounded-full border-2 border-gray-900 flex items-center justify-center text-xs text-white font-medium"
                >
                  {assignee.charAt(0).toUpperCase()}
                </div>
              ))}
              {task.assignees.length > 3 && (
                <div className="w-6 h-6 bg-gray-700 rounded-full border-2 border-gray-900 flex items-center justify-center text-xs text-gray-300">
                  +{task.assignees.length - 3}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Created Date */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock className="h-3 w-3" />
          Created {task.createdAt.toLocaleDateString()}
        </div>
      </div>
    </motion.div>
  );
}
