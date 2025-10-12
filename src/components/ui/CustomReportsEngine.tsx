/**
 * Feature #99: Custom Reports Engine
 * Advanced reporting with custom metrics and scheduling
 */

'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FileBarChart, Plus, Download, Calendar, Filter, BarChart } from 'lucide-react'

const CustomReportsEngine: React.FC = () => {
  const [reports] = useState([
    {
      id: '1',
      name: 'Weekly Productivity Report',
      description: 'Tasks completed, time spent, and efficiency metrics',
      schedule: 'weekly',
      lastRun: new Date(),
      format: 'pdf'
    },
    {
      id: '2',
      name: 'Team Performance Dashboard',
      description: 'Comprehensive team metrics and collaboration stats',
      schedule: 'monthly',
      lastRun: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      format: 'excel'
    }
  ])

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FileBarChart className="w-8 h-8 text-green-600 dark:text-green-400" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Custom Reports</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Advanced reporting engine</p>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            <Plus className="w-4 h-4" />
            New Report
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map(report => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">{report.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{report.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {report.schedule}
                </div>
                <div className="flex items-center gap-1">
                  <BarChart className="w-4 h-4" />
                  {report.format.toUpperCase()}
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                  <Download className="w-4 h-4" />
                  Generate
                </button>
                <button className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
                  <Filter className="w-4 h-4" />
                  Configure
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CustomReportsEngine

