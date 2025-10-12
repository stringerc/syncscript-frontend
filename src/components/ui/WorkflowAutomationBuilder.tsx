/**
 * Feature #70: Workflow Automation Builder
 * No-code automation engine with trigger-action rules
 */

'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Zap, Plus, Play, Pause, Trash2, Copy, Settings,
  ArrowRight, CheckCircle, Clock, Mail, Bell, Calendar
} from 'lucide-react'

interface Trigger {
  id: string
  type: string
  label: string
  icon: React.ReactNode
  config: Record<string, unknown>
}

interface Action {
  id: string
  type: string
  label: string
  icon: React.ReactNode
  config: Record<string, unknown>
}

interface Workflow {
  id: string
  name: string
  description: string
  trigger: Trigger
  actions: Action[]
  enabled: boolean
  lastRun?: Date
  runCount: number
  successRate: number
}

const availableTriggers: Omit<Trigger, 'id' | 'config'>[] = [
  { type: 'task-completed', label: 'Task Completed', icon: <CheckCircle className="w-5 h-5" /> },
  { type: 'task-created', label: 'Task Created', icon: <Plus className="w-5 h-5" /> },
  { type: 'due-date-approaching', label: 'Due Date Approaching', icon: <Clock className="w-5 h-5" /> },
  { type: 'schedule', label: 'On Schedule', icon: <Calendar className="w-5 h-5" /> },
  { type: 'tag-added', label: 'Tag Added', icon: <Zap className="w-5 h-5" /> },
  { type: 'priority-changed', label: 'Priority Changed', icon: <Bell className="w-5 h-5" /> }
]

const availableActions: Omit<Action, 'id' | 'config'>[] = [
  { type: 'send-email', label: 'Send Email', icon: <Mail className="w-5 h-5" /> },
  { type: 'create-task', label: 'Create Task', icon: <Plus className="w-5 h-5" /> },
  { type: 'send-notification', label: 'Send Notification', icon: <Bell className="w-5 h-5" /> },
  { type: 'update-status', label: 'Update Status', icon: <CheckCircle className="w-5 h-5" /> },
  { type: 'assign-task', label: 'Assign Task', icon: <ArrowRight className="w-5 h-5" /> },
  { type: 'add-tag', label: 'Add Tag', icon: <Zap className="w-5 h-5" /> }
]

const WorkflowAutomationBuilder: React.FC = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: '1',
      name: 'Auto-celebrate completions',
      description: 'Send celebration notification when high-priority task completed',
      trigger: {
        id: 't1',
        type: 'task-completed',
        label: 'Task Completed',
        icon: <CheckCircle className="w-5 h-5" />,
        config: { priority: 'high' }
      },
      actions: [
        {
          id: 'a1',
          type: 'send-notification',
          label: 'Send Notification',
          icon: <Bell className="w-5 h-5" />,
          config: { message: '🎉 Great job completing a high-priority task!' }
        }
      ],
      enabled: true,
      lastRun: new Date(),
      runCount: 24,
      successRate: 100
    }
  ])
  const [showBuilder, setShowBuilder] = useState(false)
  const [editingWorkflow, setEditingWorkflow] = useState<Workflow | null>(null)

  const toggleWorkflow = (id: string) => {
    setWorkflows(prev => prev.map(w =>
      w.id === id ? { ...w, enabled: !w.enabled } : w
    ))
  }

  const deleteWorkflow = (id: string) => {
    setWorkflows(prev => prev.filter(w => w.id !== id))
  }

  const duplicateWorkflow = (workflow: Workflow) => {
    const newWorkflow: Workflow = {
      ...workflow,
      id: `workflow-${Date.now()}`,
      name: `${workflow.name} (Copy)`,
      enabled: false,
      runCount: 0
    }
    setWorkflows(prev => [newWorkflow, ...prev])
  }

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Zap className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Workflow Automation
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Automate repetitive tasks with custom rules
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowBuilder(true)}
            className="flex items-center gap-2 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Workflow
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {workflows.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Workflows</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {workflows.filter(w => w.enabled).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Active</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {workflows.reduce((sum, w) => sum + w.runCount, 0)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Runs</div>
          </div>
        </div>
      </div>

      {/* Workflows List */}
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {workflows.map((workflow) => (
            <motion.div
              key={workflow.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                    {workflow.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {workflow.description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleWorkflow(workflow.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      workflow.enabled
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {workflow.enabled ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Workflow Visual */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2">
                  {/* Trigger */}
                  <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-3 py-2 rounded-lg">
                    {workflow.trigger.icon}
                    <span className="text-sm font-medium">{workflow.trigger.label}</span>
                  </div>

                  <ArrowRight className="w-5 h-5 text-gray-400" />

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {workflow.actions.map((action, i) => (
                      <React.Fragment key={action.id}>
                        <div className="flex items-center gap-2 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 px-3 py-2 rounded-lg">
                          {action.icon}
                          <span className="text-sm font-medium">{action.label}</span>
                        </div>
                        {i < workflow.actions.length - 1 && (
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                <span>Runs: {workflow.runCount}</span>
                <span>Success: {workflow.successRate}%</span>
                {workflow.lastRun && (
                  <span>Last: {workflow.lastRun.toLocaleDateString()}</span>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => duplicateWorkflow(workflow)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  Duplicate
                </button>
                <button
                  onClick={() => setEditingWorkflow(workflow)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => deleteWorkflow(workflow.id)}
                  className="px-3 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {workflows.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <Zap className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">No workflows yet</p>
            <p className="text-sm mb-4">Create your first automation to save time!</p>
            <button
              onClick={() => setShowBuilder(true)}
              className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition-colors"
            >
              Create Workflow
            </button>
          </div>
        )}
      </div>

      {/* Quick Templates */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Quick Templates
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {[
            'Auto-assign tasks to team',
            'Daily standup reminder',
            'Overdue task alerts',
            'Completion celebrations'
          ].map(template => (
            <button
              key={template}
              className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors whitespace-nowrap text-sm"
            >
              {template}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WorkflowAutomationBuilder

