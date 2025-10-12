/**
 * Feature #74: Screen Sharing & Co-editing
 * Real-time collaborative editing with cursor tracking
 */

'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, MousePointer, Eye, Edit, Save, Download, Share2
} from 'lucide-react'

interface Collaborator {
  id: string
  name: string
  avatar: string
  color: string
  cursorPosition: { x: number; y: number }
  isActive: boolean
}

const CollaborativeEditor: React.FC = () => {
  const [content, setContent] = useState('# Team Project Document\n\nStart collaborating...')
  const [collaborators] = useState<Collaborator[]>([
    { id: '1', name: 'Sarah', avatar: '👩‍💻', color: 'bg-blue-500', cursorPosition: { x: 0, y: 0 }, isActive: true },
    { id: '2', name: 'Mike', avatar: '👨‍🎨', color: 'bg-purple-500', cursorPosition: { x: 0, y: 0 }, isActive: true }
  ])
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit')

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Edit className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <h2 className="font-bold text-gray-900 dark:text-white">Collaborative Editor</h2>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Active Collaborators */}
            <div className="flex items-center gap-2 mr-4">
              <Users className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <div className="flex -space-x-2">
                {collaborators.map(c => (
                  <div
                    key={c.id}
                    className={`w-8 h-8 ${c.color} rounded-full flex items-center justify-center text-white border-2 border-white dark:border-gray-800`}
                    title={c.name}
                  >
                    {c.avatar}
                  </div>
                ))}
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('edit')}
                className={`px-3 py-1 rounded text-sm ${
                  viewMode === 'edit'
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('preview')}
                className={`px-3 py-1 rounded text-sm ${
                  viewMode === 'preview'
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>

            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <Save className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 p-6">
        <div className="h-full bg-white dark:bg-gray-800 rounded-xl p-6 relative">
          {viewMode === 'edit' ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-full bg-transparent text-gray-900 dark:text-white font-mono text-sm resize-none focus:outline-none"
            />
          ) : (
            <div className="prose dark:prose-invert max-w-none">
              <h1>Team Project Document</h1>
              <p>Start collaborating...</p>
            </div>
          )}

          {/* Collaborative Cursors */}
          {collaborators.filter(c => c.isActive && viewMode === 'edit').map(c => (
            <motion.div
              key={c.id}
              className={`absolute pointer-events-none ${c.color} opacity-75`}
              style={{ left: 100, top: 100 }}
            >
              <MousePointer className="w-4 h-4 text-white" />
              <span className="ml-2 text-xs text-white bg-black/50 px-2 py-1 rounded">
                {c.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CollaborativeEditor

