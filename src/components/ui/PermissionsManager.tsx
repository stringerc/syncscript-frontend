/**
 * Feature #92: Advanced Permissions
 * Role-based access control management
 */

'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Users, Lock, Check, X, Plus } from 'lucide-react'
import { defaultRoles, Role } from '../../utils/enterpriseFeatures'

const PermissionsManager: React.FC = () => {
  const [roles] = useState<Role[]>(defaultRoles)
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Permissions Manager</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Role-based access control</p>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            New Role
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map(role => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setSelectedRole(role)}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{role.name}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{role.userCount} users</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{role.description}</p>
              <div className="text-xs text-gray-500 dark:text-gray-500">
                {role.permissions.length} permissions
              </div>
            </motion.div>
          ))}
        </div>

        {selectedRole && (
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">
              {selectedRole.name} Permissions
            </h3>
            <div className="space-y-2">
              {selectedRole.permissions.map((perm, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    {perm.granted ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <X className="w-4 h-4 text-red-500" />
                    )}
                    <span className="text-sm text-gray-900 dark:text-white">
                      {perm.action} on {perm.resource}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PermissionsManager

