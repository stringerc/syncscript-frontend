/**
 * AI Content Generation Component
 * 
 * Smart templates, automated documentation, and AI-powered content creation
 * Includes template generation, content suggestions, and automated writing
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContentTemplate {
  id: string;
  name: string;
  description: string;
  category: 'task' | 'meeting' | 'report' | 'email' | 'documentation' | 'presentation';
  template: string;
  variables: string[];
  usage: number;
  rating: number;
}

interface GeneratedContent {
  id: string;
  type: string;
  title: string;
  content: string;
  generatedAt: string;
  template?: string;
  variables?: Record<string, string>;
  quality: number;
}

interface ContentSuggestion {
  id: string;
  type: 'improvement' | 'completion' | 'alternative' | 'expansion';
  originalText: string;
  suggestion: string;
  confidence: number;
  reason: string;
}

interface AIContentGenerationProps {
  onClose: () => void;
}

const AIContentGeneration: React.FC<AIContentGenerationProps> = ({ onClose }) => {
  const [templates, setTemplates] = useState<ContentTemplate[]>([]);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>([]);
  const [suggestions, setSuggestions] = useState<ContentSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'templates' | 'generator' | 'suggestions' | 'history'>('templates');
  const [isGenerating, setIsGenerating] = useState(false);
  const [inputText, setInputText] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  useEffect(() => {
    loadContentData();
  }, []);

  const loadContentData = async () => {
    setIsLoading(true);
    
    try {
      // Mock content templates
      const mockTemplates: ContentTemplate[] = [
        {
          id: 'template-1',
          name: 'Project Status Report',
          description: 'Generate comprehensive project status reports',
          category: 'report',
          template: 'Project: {{project_name}}\nStatus: {{status}}\nProgress: {{progress}}%\nNext Steps: {{next_steps}}\nBlockers: {{blockers}}',
          variables: ['project_name', 'status', 'progress', 'next_steps', 'blockers'],
          usage: 156,
          rating: 4.8
        },
        {
          id: 'template-2',
          name: 'Meeting Agenda',
          description: 'Create structured meeting agendas',
          category: 'meeting',
          template: 'Meeting: {{meeting_title}}\nDate: {{date}}\nAttendees: {{attendees}}\n\nAgenda:\n1. {{agenda_item_1}}\n2. {{agenda_item_2}}\n3. {{agenda_item_3}}\n\nObjectives: {{objectives}}',
          variables: ['meeting_title', 'date', 'attendees', 'agenda_item_1', 'agenda_item_2', 'agenda_item_3', 'objectives'],
          usage: 203,
          rating: 4.9
        },
        {
          id: 'template-3',
          name: 'Task Description',
          description: 'Generate detailed task descriptions',
          category: 'task',
          template: 'Task: {{task_title}}\nDescription: {{description}}\nPriority: {{priority}}\nEstimated Time: {{estimated_time}}\nDependencies: {{dependencies}}\nAcceptance Criteria: {{acceptance_criteria}}',
          variables: ['task_title', 'description', 'priority', 'estimated_time', 'dependencies', 'acceptance_criteria'],
          usage: 89,
          rating: 4.6
        },
        {
          id: 'template-4',
          name: 'Email Follow-up',
          description: 'Professional email follow-up templates',
          category: 'email',
          template: 'Subject: Follow-up on {{topic}}\n\nHi {{recipient_name}},\n\nI wanted to follow up on our discussion about {{topic}}.\n\n{{main_content}}\n\nPlease let me know if you have any questions.\n\nBest regards,\n{{sender_name}}',
          variables: ['topic', 'recipient_name', 'main_content', 'sender_name'],
          usage: 134,
          rating: 4.7
        }
      ];

      // Mock generated content
      const mockGenerated: GeneratedContent[] = [
        {
          id: 'content-1',
          type: 'report',
          title: 'Q4 Project Status Report',
          content: 'Project: Website Redesign\nStatus: On Track\nProgress: 75%\nNext Steps: Complete testing phase\nBlockers: None',
          generatedAt: new Date(Date.now() - 3600000).toISOString(),
          template: 'Project Status Report',
          variables: { project_name: 'Website Redesign', status: 'On Track', progress: '75' },
          quality: 0.92
        },
        {
          id: 'content-2',
          type: 'meeting',
          title: 'Weekly Team Sync Agenda',
          content: 'Meeting: Weekly Team Sync\nDate: 2024-01-15\nAttendees: John, Jane, Bob\n\nAgenda:\n1. Review last week\'s progress\n2. Discuss current blockers\n3. Plan next week\'s priorities\n\nObjectives: Align team priorities and resolve blockers',
          generatedAt: new Date(Date.now() - 7200000).toISOString(),
          template: 'Meeting Agenda',
          variables: { meeting_title: 'Weekly Team Sync', date: '2024-01-15' },
          quality: 0.88
        }
      ];

      // Mock content suggestions
      const mockSuggestions: ContentSuggestion[] = [
        {
          id: 'suggestion-1',
          type: 'improvement',
          originalText: 'The project is going well',
          suggestion: 'The project is progressing smoothly with 75% completion and all milestones on track',
          confidence: 0.91,
          reason: 'More specific and quantifiable language'
        },
        {
          id: 'suggestion-2',
          type: 'completion',
          originalText: 'We need to finish the',
          suggestion: 'We need to finish the user authentication module by Friday to stay on schedule',
          confidence: 0.87,
          reason: 'Completes the thought with specific details'
        },
        {
          id: 'suggestion-3',
          type: 'alternative',
          originalText: 'This is bad',
          suggestion: 'This presents a challenge that requires immediate attention and resolution',
          reason: 'More professional and constructive language'
        }
      ];

      setTemplates(mockTemplates);
      setGeneratedContent(mockGenerated);
      setSuggestions(mockSuggestions);
    } catch (error) {
      console.error('Failed to load content data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateContent = async (templateId: string, variables: Record<string, string>) => {
    setIsGenerating(true);
    
    try {
      const template = templates.find(t => t.id === templateId);
      if (!template) return;
      
      // Simulate AI content generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      let content = template.template;
      Object.entries(variables).forEach(([key, value]) => {
        content = content.replace(new RegExp(`{{${key}}}`, 'g'), value);
      });
      
      const newContent: GeneratedContent = {
        id: `content_${Date.now()}`,
        type: template.category,
        title: `Generated ${template.name}`,
        content,
        generatedAt: new Date().toISOString(),
        template: template.name,
        variables,
        quality: 0.85 + Math.random() * 0.15
      };
      
      setGeneratedContent(prev => [newContent, ...prev]);
    } catch (error) {
      console.error('Failed to generate content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateFromText = async (text: string) => {
    setIsGenerating(true);
    
    try {
      // Simulate AI text processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const enhancedText = `Enhanced: ${text}\n\nThis content has been improved with:\n• Better structure\n• Clearer language\n• Professional tone\n• Specific details`;
      
      const newContent: GeneratedContent = {
        id: `content_${Date.now()}`,
        type: 'enhanced',
        title: 'AI-Enhanced Content',
        content: enhancedText,
        generatedAt: new Date().toISOString(),
        quality: 0.88
      };
      
      setGeneratedContent(prev => [newContent, ...prev]);
    } catch (error) {
      console.error('Failed to enhance text:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'task': return '📝';
      case 'meeting': return '🤝';
      case 'report': return '📊';
      case 'email': return '📧';
      case 'documentation': return '📚';
      case 'presentation': return '🎯';
      default: return '📄';
    }
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'improvement': return '✨';
      case 'completion': return '✅';
      case 'alternative': return '🔄';
      case 'expansion': return '📈';
      default: return '💡';
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading AI content generator...</span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">AI Content Generation</h2>
              <p className="text-orange-100 mt-1">Smart templates, automated documentation, and AI-powered content creation</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-orange-200 text-sm">Templates:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {templates.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-orange-200 text-sm">Generated:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {generatedContent.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-orange-200 text-sm">Suggestions:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {suggestions.length}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'templates', name: 'Templates', icon: '📋' },
              { id: 'generator', name: 'Generator', icon: '🤖' },
              { id: 'suggestions', name: 'Suggestions', icon: '💡' },
              { id: 'history', name: 'History', icon: '📚' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all ${
                  selectedTab === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {selectedTab === 'templates' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Content Templates</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {templates.map((template) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-3xl">{getCategoryIcon(template.category)}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{template.name}</h4>
                        <p className="text-sm text-gray-600">{template.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Usage:</span>
                        <span className="text-sm font-medium text-gray-900">{template.usage} times</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Rating:</span>
                        <span className="text-sm font-medium text-gray-900">⭐ {template.rating}/5</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-1">Variables:</div>
                        <div className="text-xs text-gray-600">{template.variables.join(', ')}</div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedTemplate(template.id);
                          setSelectedTab('generator');
                        }}
                        className="px-3 py-1 bg-orange-100 text-orange-700 rounded text-sm hover:bg-orange-200 transition-all"
                      >
                        Use Template
                      </button>
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                        Preview
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'generator' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">AI Content Generator</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Text Input</label>
                    <textarea
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      rows={6}
                      placeholder="Enter your text here for AI enhancement..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  
                  <button
                    onClick={() => generateFromText(inputText)}
                    disabled={isGenerating || !inputText.trim()}
                    className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50"
                  >
                    {isGenerating ? 'Generating...' : 'Enhance with AI'}
                  </button>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Generated Content</label>
                  <div className="bg-gray-50 p-4 rounded-lg min-h-[200px] border border-gray-200">
                    {generatedContent.length > 0 ? (
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-gray-900">
                          {generatedContent[0].title}
                        </div>
                        <div className="text-sm text-gray-700 whitespace-pre-line">
                          {generatedContent[0].content}
                        </div>
                        <div className="text-xs text-gray-500">
                          Quality: {Math.round(generatedContent[0].quality * 100)}%
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-500 italic">Generated content will appear here...</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'suggestions' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Content Suggestions</h3>
              
              <div className="space-y-4">
                {suggestions.map((suggestion) => (
                  <motion.div
                    key={suggestion.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-2xl">{getSuggestionIcon(suggestion.type)}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 capitalize">{suggestion.type} Suggestion</h4>
                        <p className="text-sm text-gray-600">{suggestion.reason}</p>
                      </div>
                      <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        {Math.round(suggestion.confidence * 100)}% confidence
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-1">Original:</div>
                        <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{suggestion.originalText}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-700 mb-1">Suggestion:</div>
                        <div className="text-sm text-gray-600 bg-green-50 p-2 rounded">{suggestion.suggestion}</div>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center space-x-2">
                      <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 transition-all">
                        Accept
                      </button>
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                        Modify
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'history' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Generation History</h3>
              
              <div className="space-y-4">
                {generatedContent.map((content) => (
                  <motion.div
                    key={content.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{content.title}</h4>
                        <p className="text-sm text-gray-600">
                          {content.template && `Template: ${content.template}`}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(content.generatedAt).toLocaleString()}
                        </p>
                      </div>
                      <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                        {Math.round(content.quality * 100)}% quality
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded whitespace-pre-line">
                      {content.content}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            AI Content Generation • {templates.length} templates • {generatedContent.length} generated • {suggestions.length} suggestions
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                console.log('Exporting content data...');
              }}
              className="px-6 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 transition-all"
            >
              Export Data
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AIContentGeneration;
