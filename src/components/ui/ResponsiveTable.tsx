'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface Column<T> {
  key: keyof T | string
  label: string
  render?: (item: T) => React.ReactNode
  sortable?: boolean
  width?: string
}

interface ResponsiveTableProps<T> {
  data: T[]
  columns: Column<T>[]
  keyField: keyof T
  onRowClick?: (item: T) => void
  className?: string
  emptyMessage?: string
  mobileCardRender?: (item: T) => React.ReactNode
}

export default function ResponsiveTable<T extends Record<string, any>>({
  data,
  columns,
  keyField,
  onRowClick,
  className = '',
  emptyMessage = 'No data available',
  mobileCardRender
}: ResponsiveTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        <div className="text-6xl mb-4">📭</div>
        <p className="text-lg">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className={`w-full ${className}`}>
          <thead className="bg-gray-50 dark:bg-gray-800 border-b-2 border-gray-200 dark:border-gray-700">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300"
                  style={{ width: column.width }}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {data.map((item, index) => (
              <motion.tr
                key={String(item[keyField])}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.02 }}
                onClick={() => onRowClick?.(item)}
                className={`bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                  onRowClick ? 'cursor-pointer' : ''
                }`}
              >
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100"
                  >
                    {column.render 
                      ? column.render(item)
                      : String(item[column.key as keyof T] || '-')
                    }
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {data.map((item, index) => (
          <motion.div
            key={String(item[keyField])}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onRowClick?.(item)}
            className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg ${
              onRowClick ? 'cursor-pointer active:scale-98' : ''
            }`}
          >
            {mobileCardRender ? (
              mobileCardRender(item)
            ) : (
              <div className="space-y-3">
                {columns.map((column) => (
                  <div key={String(column.key)} className="flex justify-between items-start">
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 mr-4">
                      {column.label}:
                    </span>
                    <span className="text-sm text-gray-900 dark:text-gray-100 text-right flex-1">
                      {column.render 
                        ? column.render(item)
                        : String(item[column.key as keyof T] || '-')
                      }
                    </span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </>
  )
}

