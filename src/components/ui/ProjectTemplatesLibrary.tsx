/**
 * Feature #66: Project Templates Library
 * Pre-built project templates for instant setup
 */

'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Folder, Star, Download, Search, Filter, Plus,
  Code, Briefcase, Rocket, BookOpen, Users, Palette
} from 'lucide-react'

interface ProjectTemplate {
  id: string
  name: string
  description: string
  category: string
  icon: React.ReactNode
  tasks: number
  duration: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  popularity: number
  tags: string[]
  featured: boolean
}

const templates: ProjectTemplate[] = [
  {
    id: 'web-app',
    name: 'Web Application Development',
    description: 'Full-stack web app from planning to deployment',
    category: 'Development',
    icon: <Code className="w-6 h-6" />,
    tasks: 45,
    duration: '8-12 weeks',
    difficulty: 'advanced',
    popularity: 4.8,
    tags: ['frontend', 'backend', 'deployment'],
    featured: true
  },
  {
    id: 'marketing-campaign',
    name: 'Product Launch Campaign',
    description: 'Complete marketing campaign from strategy to execution',
    category: 'Marketing',
    icon: <Rocket className="w-6 h-6" />,
    tasks: 32,
    duration: '4-6 weeks',
    difficulty: 'intermediate',
    popularity: 4.6,
    tags: ['marketing', 'social-media', 'content'],
    featured: true
  },
  {
    id: 'content-creation',
    name: 'Content Creation Workflow',
    description: 'Systematic content creation from ideation to publishing',
    category: 'Content',
    icon: <BookOpen className="w-6 h-6" />,
    tasks: 24,
    duration: '2-4 weeks',
    difficulty: 'beginner',
    popularity: 4.7,
    tags: ['writing', 'editing', 'seo'],
    featured: false
  },
  {
    id: 'team-onboarding',
    name: 'Employee Onboarding',
    description: 'Comprehensive onboarding checklist for new team members',
    category: 'HR',
    icon: <Users className="w-6 h-6" />,
    tasks: 28,
    duration: '2 weeks',
    difficulty: 'beginner',
    popularity: 4.5,
    tags: ['hr', 'training', 'documentation'],
    featured: false
  },
  {
    id: 'design-system',
    name: 'Design System Creation',
    description: 'Build a comprehensive design system with components',
    category: 'Design',
    icon: <Palette className="w-6 h-6" />,
    tasks: 38,
    duration: '6-8 weeks',
    difficulty: 'advanced',
    popularity: 4.4,
    tags: ['design', 'ui', 'components'],
    featured: false
  },
  {
    id: 'business-plan',
    name: 'Business Plan Development',
    description: 'Complete business plan from market research to financial projections',
    category: 'Business',
    icon: <Briefcase className="w-6 h-6" />,
    tasks: 35,
    duration: '4-6 weeks',
    difficulty: 'intermediate',
    popularity: 4.3,
    tags: ['strategy', 'finance', 'research'],
    featured: false
  }
]

interface ProjectTemplatesLibraryProps {
  onTemplateSelect?: (template: ProjectTemplate) => void
}

const ProjectTemplatesLibrary: React.FC<ProjectTemplatesLibraryProps> = ({
  onTemplateSelect
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'popular' | 'recent' | 'name'>('popular')
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)

  const categories = ['all', ...Array.from(new Set(templates.map(t => t.category)))]

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = searchQuery === '' ||
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
    const matchesFeatured = !showFeaturedOnly || template.featured

    return matchesSearch && matchesCategory && matchesFeatured
  })

  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    if (sortBy === 'popular') return b.popularity - a.popularity
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    return 0
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
      case 'intermediate': return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400'
      case 'advanced': return 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
    }
  }

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Folder className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Project Templates
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {sortedTemplates.length} templates available
              </p>
            </div>
          </div>

          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            <Plus className="w-4 h-4" />
            Create Template
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Search */}
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search templates..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'popular' | 'recent' | 'name')}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="popular">Most Popular</option>
            <option value="name">Name</option>
            <option value="recent">Recently Added</option>
          </select>

          {/* Featured Toggle */}
          <button
            onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              showFeaturedOnly
                ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            <Star className="w-4 h-4" />
            Featured
          </button>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedTemplates.map((template) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-shadow relative"
            >
              {template.featured && (
                <div className="absolute top-4 right-4">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg text-indigo-600 dark:text-indigo-400">
                  {template.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {template.name}
                  </h3>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {template.category}
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {template.description}
              </p>

              <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                <span>{template.tasks} tasks</span>
                <span>•</span>
                <span>{template.duration}</span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(template.difficulty)}`}>
                  {template.difficulty}
                </span>
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  ⭐ {template.popularity.toFixed(1)}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {template.tags.slice(0, 3).map(tag => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => onTemplateSelect?.(template)}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Use Template
              </button>
            </motion.div>
          ))}
        </div>

        {sortedTemplates.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <Folder className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>No templates found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectTemplatesLibrary

