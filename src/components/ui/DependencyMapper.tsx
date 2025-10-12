/**
 * Feature #67: Dependency Mapping
 * Visual task dependency chains with Gantt-style view
 */

'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  GitBranch, AlertTriangle, CheckCircle, Clock,
  ArrowRight, Target, Zap, Info
} from 'lucide-react'

interface TaskDependency {
  id: string
  title: string
  status: 'not-started' | 'in-progress' | 'completed' | 'blocked'
  startDate: Date
  endDate: Date
  dependencies: string[] // IDs of tasks that must complete first
  assignee: string
  priority: number
  isCriticalPath: boolean
}

const sampleTasks: TaskDependency[] = [
  {
    id: '1',
    title: 'Project Planning & Requirements',
    status: 'completed',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-01-05'),
    dependencies: [],
    assignee: 'John',
    priority: 5,
    isCriticalPath: true
  },
  {
    id: '2',
    title: 'Database Design',
    status: 'completed',
    startDate: new Date('2024-01-06'),
    endDate: new Date('2024-01-12'),
    dependencies: ['1'],
    assignee: 'Sarah',
    priority: 5,
    isCriticalPath: true
  },
  {
    id: '3',
    title: 'UI/UX Design',
    status: 'in-progress',
    startDate: new Date('2024-01-06'),
    endDate: new Date('2024-01-15'),
    dependencies: ['1'],
    assignee: 'Mike',
    priority: 4,
    isCriticalPath: false
  },
  {
    id: '4',
    title: 'Backend API Development',
    status: 'in-progress',
    startDate: new Date('2024-01-13'),
    endDate: new Date('2024-01-25'),
    dependencies: ['2'],
    assignee: 'John',
    priority: 5,
    isCriticalPath: true
  },
  {
    id: '5',
    title: 'Frontend Development',
    status: 'not-started',
    startDate: new Date('2024-01-16'),
    endDate: new Date('2024-01-28'),
    dependencies: ['3', '4'],
    assignee: 'Sarah',
    priority: 5,
    isCriticalPath: true
  },
  {
    id: '6',
    title: 'Testing & QA',
    status: 'not-started',
    startDate: new Date('2024-01-29'),
    endDate: new Date('2024-02-05'),
    dependencies: ['5'],
    assignee: 'Mike',
    priority: 4,
    isCriticalPath: true
  }
]

interface DependencyMapperProps {
  tasks?: TaskDependency[]
  onTaskUpdate?: (taskId: string, updates: Partial<TaskDependency>) => void
}

const DependencyMapper: React.FC<DependencyMapperProps> = ({
  tasks = sampleTasks,
  onTaskUpdate
}) => {
  const [selectedTask, setSelectedTask] = useState<TaskDependency | null>(null)
  const [view, setView] = useState<'gantt' | 'network'>('gantt')

  const getStatusColor = (status: TaskDependency['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-500'
      case 'in-progress': return 'bg-blue-500'
      case 'blocked': return 'bg-red-500'
      default: return 'bg-gray-400'
    }
  }

  const getStatusIcon = (status: TaskDependency['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />
      case 'in-progress': return <Clock className="w-4 h-4 animate-spin" />
      case 'blocked': return <AlertTriangle className="w-4 h-4" />
      default: return <Target className="w-4 h-4" />
    }
  }

  const calculateCriticalPath = () => {
    return tasks.filter(t => t.isCriticalPath)
  }

  const getBlockers = (task: TaskDependency) => {
    return tasks.filter(t => 
      task.dependencies.includes(t.id) && t.status !== 'completed'
    )
  }

  const calculateProjectEnd = () => {
    const latestEnd = tasks.reduce((latest, task) => {
      return task.endDate > latest ? task.endDate : latest
    }, new Date(0))
    return latestEnd
  }

  const criticalPath = calculateCriticalPath()
  const projectEnd = calculateProjectEnd()
  const daysRemaining = Math.ceil((projectEnd.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <GitBranch className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Dependency Mapper
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Critical path analysis & task dependencies
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setView('gantt')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                view === 'gantt'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Gantt View
            </button>
            <button
              onClick={() => setView('network')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                view === 'network'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Network View
            </button>
          </div>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {criticalPath.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Critical Path Tasks
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {tasks.filter(t => t.status === 'in-progress').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              In Progress
            </div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {tasks.filter(t => t.status === 'completed').length}/{tasks.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Completed
            </div>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {daysRemaining}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Days to Completion
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        {view === 'gantt' ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Gantt Chart View</h3>
            <div className="space-y-3">
              {tasks.map((task) => {
                const blockers = getBlockers(task)
                const daysSinceStart = Math.ceil((new Date().getTime() - task.startDate.getTime()) / (1000 * 60 * 60 * 24))
                const totalDays = Math.ceil((task.endDate.getTime() - task.startDate.getTime()) / (1000 * 60 * 60 * 24))
                const progress = task.status === 'completed' ? 100 : 
                                task.status === 'in-progress' ? Math.min(90, (daysSinceStart / totalDays) * 100) : 0

                return (
                  <div
                    key={task.id}
                    onClick={() => setSelectedTask(task)}
                    className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-4 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`${getStatusColor(task.status)} text-white p-1.5 rounded`}>
                        {getStatusIcon(task.status)}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                          {task.title}
                          {task.isCriticalPath && (
                            <Zap className="w-4 h-4 text-orange-500" title="Critical Path" />
                          )}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {task.assignee} • {task.startDate.toLocaleDateString()} - {task.endDate.toLocaleDateString()}
                        </div>
                      </div>
                      {blockers.length > 0 && (
                        <div className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          {blockers.length} blocker{blockers.length !== 1 ? 's' : ''}
                        </div>
                      )}
                    </div>

                    {/* Progress Bar */}
                    <div className="ml-10">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getStatusColor(task.status)}`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      {task.dependencies.length > 0 && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Depends on: {task.dependencies.map(depId => {
                            const dep = tasks.find(t => t.id === depId)
                            return dep?.title
                          }).join(', ')}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Network Diagram</h3>
            <div className="flex flex-col items-center gap-8 py-8">
              {/* Simple network visualization */}
              {tasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 w-full max-w-2xl"
                >
                  <div className={`flex-1 p-4 rounded-lg border-2 ${
                    task.isCriticalPath ? 'border-orange-500' : 'border-gray-300 dark:border-gray-600'
                  } ${task.status === 'completed' ? 'bg-green-50 dark:bg-green-900/20' : 'bg-white dark:bg-gray-800'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`${getStatusColor(task.status)} text-white p-1.5 rounded`}>
                        {getStatusIcon(task.status)}
                      </div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {task.title}
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {task.assignee} • Priority {task.priority}
                    </div>
                  </div>
                  {index < tasks.length - 1 && (
                    <ArrowRight className="w-6 h-6 text-gray-400" />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Critical Path Legend */}
            <div className="mt-6 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
              <div className="flex items-center gap-2 text-orange-700 dark:text-orange-400 mb-2">
                <Zap className="w-5 h-5" />
                <span className="font-medium">Critical Path Highlighted</span>
              </div>
              <p className="text-sm text-orange-600 dark:text-orange-300">
                These tasks directly impact the project completion date. Any delay will push the final deadline.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Selected Task Details */}
      {selectedTask && (
        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-gray-900 dark:text-white">Task Details</h4>
            <button
              onClick={() => setSelectedTask(null)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ✕
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Blockers</div>
              <div className="font-medium text-gray-900 dark:text-white">
                {getBlockers(selectedTask).length > 0 ? (
                  <div className="space-y-1">
                    {getBlockers(selectedTask).map(blocker => (
                      <div key={blocker.id} className="text-sm text-red-600 dark:text-red-400">
                        • {blocker.title}
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-green-600 dark:text-green-400">No blockers</span>
                )}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Impact</div>
              <div className="font-medium text-gray-900 dark:text-white">
                {tasks.filter(t => t.dependencies.includes(selectedTask.id)).length} tasks depend on this
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Timeline</div>
              <div className="font-medium text-gray-900 dark:text-white">
                {Math.ceil((selectedTask.endDate.getTime() - selectedTask.startDate.getTime()) / (1000 * 60 * 60 * 24))} days
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DependencyMapper

