/**
 * Feature #77: Knowledge Base Wiki
 * Team documentation hub with version control
 */

'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Search, Plus, Edit, Eye, History, Share2, Bookmark } from 'lucide-react'

interface WikiPage {
  id: string
  title: string
  content: string
  category: string
  author: string
  lastModified: Date
  views: number
  bookmarks: number
  tags: string[]
}

const KnowledgeBaseWiki: React.FC = () => {
  const [pages] = useState<WikiPage[]>([
    {
      id: '1',
      title: 'Onboarding Guide',
      content: 'Complete guide for new team members...',
      category: 'Getting Started',
      author: 'Sarah Chen',
      lastModified: new Date(),
      views: 124,
      bookmarks: 18,
      tags: ['onboarding', 'hr', 'guide']
    },
    {
      id: '2',
      title: 'API Documentation',
      content: 'REST API endpoints and usage examples...',
      category: 'Technical',
      author: 'Mike Johnson',
      lastModified: new Date(Date.now() - 24 * 60 * 60 * 1000),
      views: 89,
      bookmarks: 12,
      tags: ['api', 'technical', 'development']
    }
  ])
  const [selectedPage, setSelectedPage] = useState<WikiPage | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPages = pages.filter(p => 
    searchQuery === '' || 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="h-full flex bg-gray-50 dark:bg-gray-900">
      <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <h2 className="font-bold text-gray-900 dark:text-white">Knowledge Base</h2>
          </div>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search docs..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
            />
          </div>
          <button className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            <Plus className="w-4 h-4" />
            New Page
          </button>
        </div>

        <div className="flex-1 overflow-auto p-2">
          {filteredPages.map(page => (
            <button
              key={page.id}
              onClick={() => setSelectedPage(page)}
              className={`w-full text-left p-3 rounded-lg mb-2 transition-colors ${
                selectedPage?.id === page.id
                  ? 'bg-indigo-50 dark:bg-indigo-900/20'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <div className="font-medium text-gray-900 dark:text-white text-sm mb-1">{page.title}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{page.category}</div>
              <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                <span>👁️ {page.views}</span>
                <span>🔖 {page.bookmarks}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 p-6">
        {selectedPage ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 h-full overflow-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{selectedPage.title}</h1>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <Edit className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <Bookmark className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <p>{selectedPage.content}</p>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            <div className="text-center">
              <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Select a page to view</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default KnowledgeBaseWiki

