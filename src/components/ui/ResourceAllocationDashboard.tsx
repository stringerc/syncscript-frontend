/**
 * Feature #68: Resource Allocation Dashboard
 * Team workload balancing with capacity planning
 */

'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, TrendingUp, AlertTriangle, CheckCircle, 
  Calendar, BarChart3, User, Clock
} from 'lucide-react'

interface TeamMember {
  id: string
  name: string
  role: string
  avatar: string
  capacity: number // hours per week
  skills: string[]
  availability: number // % available
}

interface Assignment {
  id: string
  memberId: string
  taskTitle: string
  hoursAllocated: number
  startDate: Date
  endDate: Date
  status: 'active' | 'completed' | 'planned'
}

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Senior Developer',
    avatar: '👩‍💻',
    capacity: 40,
    skills: ['React', 'TypeScript', 'Node.js'],
    availability: 85
  },
  {
    id: '2',
    name: 'Mike Johnson',
    role: 'UX Designer',
    avatar: '👨‍🎨',
    capacity: 40,
    skills: ['Figma', 'Design Systems', 'User Research'],
    availability: 60
  },
  {
    id: '3',
    name: 'Alex Kumar',
    role: 'Product Manager',
    avatar: '👨‍💼',
    capacity: 40,
    skills: ['Strategy', 'Roadmapping', 'Analytics'],
    availability: 95
  }
]

const assignments: Assignment[] = [
  {
    id: '1',
    memberId: '1',
    taskTitle: 'Build Dashboard Components',
    hoursAllocated: 30,
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    status: 'active'
  },
  {
    id: '2',
    memberId: '2',
    taskTitle: 'Design System Mockups',
    hoursAllocated: 20,
    startDate: new Date(),
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    status: 'active'
  }
]

const ResourceAllocationDashboard: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

  const getMemberUtilization = (member: TeamMember) => {
    const memberAssignments = assignments.filter(a => a.memberId === member.id && a.status === 'active')
    const totalHours = memberAssignments.reduce((sum, a) => sum + a.hoursAllocated, 0)
    return Math.round((totalHours / member.capacity) * 100)
  }

  const getUtilizationColor = (utilization: number) => {
    if (utilization > 100) return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
    if (utilization > 80) return 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20'
    if (utilization > 60) return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20'
    return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
  }

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Resource Allocation
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Team capacity planning & workload balancing
            </p>
          </div>
        </div>

        {/* Team Overview */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {teamMembers.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Team Members</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {Math.round(teamMembers.reduce((sum, m) => sum + getMemberUtilization(m), 0) / teamMembers.length)}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Avg Utilization</div>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {teamMembers.filter(m => getMemberUtilization(m) > 100).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Overloaded</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => {
            const utilization = getMemberUtilization(member)
            const memberTasks = assignments.filter(a => a.memberId === member.id && a.status === 'active')

            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setSelectedMember(member)}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 cursor-pointer hover:shadow-lg transition-shadow"
              >
                {/* Member Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-4xl">{member.avatar}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* Utilization */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Utilization</span>
                    <span className={`text-sm font-bold px-2 py-1 rounded ${getUtilizationColor(utilization)}`}>
                      {utilization}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        utilization > 100 ? 'bg-red-500' :
                        utilization > 80 ? 'bg-orange-500' :
                        utilization > 60 ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${Math.min(100, utilization)}%` }}
                    />
                  </div>
                </div>

                {/* Availability */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Availability</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {member.availability}%
                    </span>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Skills</div>
                  <div className="flex flex-wrap gap-1">
                    {member.skills.map(skill => (
                      <span
                        key={skill}
                        className="text-xs px-2 py-1 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Current Tasks */}
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Current Tasks ({memberTasks.length})
                  </div>
                  <div className="space-y-2">
                    {memberTasks.slice(0, 2).map(task => (
                      <div
                        key={task.id}
                        className="text-xs p-2 bg-gray-50 dark:bg-gray-700 rounded"
                      >
                        <div className="font-medium text-gray-900 dark:text-white truncate">
                          {task.taskTitle}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">
                          {task.hoursAllocated}h allocated
                        </div>
                      </div>
                    ))}
                    {memberTasks.length > 2 && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        +{memberTasks.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ResourceAllocationDashboard

