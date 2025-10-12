/**
 * Feature #95: Audit Logs
 * Security and compliance tracking
 */

'use client'

import React, { useState } from 'react'
import { FileText, Search, Download, Filter, AlertCircle } from 'lucide-react'
import { AuditLogEntry } from '../../utils/enterpriseFeatures'

const AuditLogsViewer: React.FC = () => {
  const [logs] = useState<AuditLogEntry[]>([
    {
      id: '1',
      timestamp: new Date(),
      userId: '1',
      userName: 'Sarah Chen',
      action: 'UPDATE',
      resource: 'project',
      resourceId: 'proj-123',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0...',
      status: 'success'
    }
  ])

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Audit Logs</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Security & compliance tracking</p>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300">Resource</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {logs.map(log => (
                <tr key={log.id} className="border-t border-gray-200 dark:border-gray-700">
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {log.timestamp.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{log.userName}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{log.action}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{log.resource}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      log.status === 'success'
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                        : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AuditLogsViewer

