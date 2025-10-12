/**
 * Feature #82: AI Writing Assistant
 * Smart content generation with templates and tone adjustment
 */

'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Copy, RefreshCw, Wand2, Check } from 'lucide-react'

const AIWritingAssistant: React.FC = () => {
  const [prompt, setPrompt] = useState('')
  const [tone, setTone] = useState<'professional' | 'casual' | 'friendly' | 'formal'>('professional')
  const [length, setLength] = useState<'short' | 'medium' | 'long'>('medium')
  const [generatedText, setGeneratedText] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const generate = async () => {
    setIsGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedText(`Here is your ${tone} content: ${prompt}...`)
      setIsGenerating(false)
    }, 1500)
  }

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">AI Writing Assistant</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Generate content with AI</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              What do you want to write?
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Write a professional email about project delays..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tone</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value as typeof tone)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="friendly">Friendly</option>
                <option value="formal">Formal</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Length</label>
              <select
                value={length}
                onChange={(e) => setLength(e.target.value as typeof length)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="short">Short</option>
                <option value="medium">Medium</option>
                <option value="long">Long</option>
              </select>
            </div>
          </div>

          <button
            onClick={generate}
            disabled={!prompt || isGenerating}
            className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                Generate
              </>
            )}
          </button>

          {generatedText && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-gray-900 dark:text-white">Generated Content</span>
                <button
                  onClick={() => navigator.clipboard.writeText(generatedText)}
                  className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 hover:underline"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </button>
              </div>
              <p className="text-gray-700 dark:text-gray-300">{generatedText}</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AIWritingAssistant

