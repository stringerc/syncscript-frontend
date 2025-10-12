/**
 * Feature #78: File Sharing Hub
 * Centralized file management with version control
 */

'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Upload, Download, Folder, Image, FileCode, Grid, List, Search } from 'lucide-react'

interface SharedFile {
  id: string
  name: string
  type: string
  size: number
  uploadedBy: string
  uploadedAt: Date
  folder: string
  downloads: number
  isStarred: boolean
}

const FileSharingHub: React.FC = () => {
  const [files] = useState<SharedFile[]>([
    { id: '1', name: 'Q4-Report.pdf', type: 'pdf', size: 2400000, uploadedBy: 'Sarah', uploadedAt: new Date(), folder: 'Reports', downloads: 12, isStarred: true },
    { id: '2', name: 'Design-Mockup.fig', type: 'figma', size: 8900000, uploadedBy: 'Mike', uploadedAt: new Date(), folder: 'Design', downloads: 8, isStarred: false }
  ])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const getFileIcon = (type: string) => {
    if (type === 'pdf') return <FileText className="w-8 h-8 text-red-500" />
    if (type === 'figma') return <FileCode className="w-8 h-8 text-purple-500" />
    if (type.startsWith('image')) return <Image className="w-8 h-8 text-blue-500" />
    return <FileText className="w-8 h-8 text-gray-500" />
  }

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Folder className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">File Sharing</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 dark:bg-blue-900/20' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 dark:bg-blue-900/20' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          >
            <List className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 ml-2">
            <Upload className="w-4 h-4" />
            Upload
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {files.map(file => (
          <motion.div
            key={file.id}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex items-center justify-center mb-3">
              {getFileIcon(file.type)}
            </div>
            <div className="font-medium text-gray-900 dark:text-white text-sm mb-1 truncate">{file.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">{formatFileSize(file.size)}</div>
            <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
              <span>{file.uploadedBy}</span>
              <span>↓ {file.downloads}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default FileSharingHub

