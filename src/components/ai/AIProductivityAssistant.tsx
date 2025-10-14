/**
 * AI-Powered Productivity Assistant Component
 * 
 * Natural language task creation, smart scheduling, and intelligent recommendations
 * Includes voice commands, conversational interface, and predictive task management
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AITask {
  id: string;
  title: string;
  description: string;
  priority: 1 | 2 | 3 | 4 | 5;
  energyLevel: number;
  estimatedDuration: number;
  category: string;
  dueDate?: string;
  aiGenerated: boolean;
  confidence: number;
  suggestions: string[];
}

interface AIInsight {
  id: string;
  type: 'productivity' | 'schedule' | 'energy' | 'focus' | 'optimization';
  title: string;
  description: string;
  confidence: number;
  actionable: boolean;
  impact: 'low' | 'medium' | 'high';
  category: string;
}

interface VoiceCommand {
  id: string;
  command: string;
  action: string;
  parameters: Record<string, any>;
  executed: boolean;
  timestamp: string;
}

interface AIProductivityAssistantProps {
  onClose: () => void;
}

const AIProductivityAssistant: React.FC<AIProductivityAssistantProps> = ({ onClose }) => {
  const [aiTasks, setAiTasks] = useState<AITask[]>([]);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [voiceCommands, setVoiceCommands] = useState<VoiceCommand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'assistant' | 'tasks' | 'insights' | 'voice'>('assistant');
  const [isListening, setIsListening] = useState(false);
  const [naturalLanguageInput, setNaturalLanguageInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  useEffect(() => {
    loadAIData();
  }, []);

  const loadAIData = async () => {
    setIsLoading(true);
    
    try {
      // Mock AI tasks
      const mockTasks: AITask[] = [
        {
          id: 'ai-task-1',
          title: 'Review quarterly budget report',
          description: 'Analyze Q4 budget performance and prepare recommendations for next quarter',
          priority: 4,
          energyLevel: 7,
          estimatedDuration: 120,
          category: 'Finance',
          dueDate: new Date(Date.now() + 86400000).toISOString(),
          aiGenerated: true,
          confidence: 0.92,
          suggestions: ['Schedule for morning when energy is high', 'Block 2 hours of focused time', 'Prepare data beforehand']
        },
        {
          id: 'ai-task-2',
          title: 'Team standup meeting',
          description: 'Daily team synchronization and progress updates',
          priority: 3,
          energyLevel: 5,
          estimatedDuration: 30,
          category: 'Meetings',
          dueDate: new Date(Date.now() + 3600000).toISOString(),
          aiGenerated: true,
          confidence: 0.88,
          suggestions: ['Prepare agenda items', 'Review yesterday\'s action items', 'Set up video call']
        },
        {
          id: 'ai-task-3',
          title: 'Code review for new feature',
          description: 'Review pull request for user authentication improvements',
          priority: 3,
          energyLevel: 6,
          estimatedDuration: 45,
          category: 'Development',
          dueDate: new Date(Date.now() + 7200000).toISOString(),
          aiGenerated: true,
          confidence: 0.85,
          suggestions: ['Test authentication flows', 'Check security implications', 'Verify edge cases']
        }
      ];

      // Mock AI insights
      const mockInsights: AIInsight[] = [
        {
          id: 'insight-1',
          type: 'productivity',
          title: 'Peak Productivity Window',
          description: 'You are most productive between 10-11 AM. Consider scheduling your most important tasks during this time.',
          confidence: 0.94,
          actionable: true,
          impact: 'high',
          category: 'Schedule Optimization'
        },
        {
          id: 'insight-2',
          type: 'energy',
          title: 'Energy Level Pattern',
          description: 'Your energy levels drop significantly after 2 PM. Consider lighter tasks or breaks during this period.',
          confidence: 0.87,
          actionable: true,
          impact: 'medium',
          category: 'Energy Management'
        },
        {
          id: 'insight-3',
          type: 'focus',
          title: 'Focus Time Optimization',
          description: 'You complete tasks 23% faster when working in 45-minute focused blocks with 15-minute breaks.',
          confidence: 0.91,
          actionable: true,
          impact: 'high',
          category: 'Focus Enhancement'
        }
      ];

      // Mock voice commands
      const mockCommands: VoiceCommand[] = [
        {
          id: 'cmd-1',
          command: 'Create a task to review the budget report',
          action: 'create_task',
          parameters: { title: 'Review budget report', priority: 4, category: 'Finance' },
          executed: true,
          timestamp: new Date(Date.now() - 300000).toISOString()
        },
        {
          id: 'cmd-2',
          command: 'Schedule a meeting for tomorrow at 2 PM',
          action: 'schedule_meeting',
          parameters: { time: '2:00 PM', date: 'tomorrow', duration: 60 },
          executed: true,
          timestamp: new Date(Date.now() - 600000).toISOString()
        },
        {
          id: 'cmd-3',
          command: 'What are my priorities for today?',
          action: 'get_priorities',
          parameters: { date: 'today' },
          executed: true,
          timestamp: new Date(Date.now() - 900000).toISOString()
        }
      ];

      setAiTasks(mockTasks);
      setAiInsights(mockInsights);
      setVoiceCommands(mockCommands);
    } catch (error) {
      console.error('Failed to load AI data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const processNaturalLanguage = async (input: string) => {
    try {
      // Simulate AI processing
      setAiResponse('Processing your request...');
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock AI response based on input
      if (input.toLowerCase().includes('create') && input.toLowerCase().includes('task')) {
        const newTask: AITask = {
          id: `ai-task-${Date.now()}`,
          title: 'AI Generated Task',
          description: `Task created from: "${input}"`,
          priority: 3,
          energyLevel: 5,
          estimatedDuration: 60,
          category: 'AI Generated',
          aiGenerated: true,
          confidence: 0.85,
          suggestions: ['Review and adjust priority', 'Set appropriate due date', 'Add detailed description']
        };
        
        setAiTasks(prev => [newTask, ...prev]);
        setAiResponse(`✅ Task created successfully! I've generated a task based on your request. You can review and modify it as needed.`);
      } else if (input.toLowerCase().includes('schedule') || input.toLowerCase().includes('meeting')) {
        setAiResponse(`📅 I can help you schedule meetings! Please provide more details like the time, date, and attendees.`);
      } else if (input.toLowerCase().includes('priority') || input.toLowerCase().includes('important')) {
        setAiResponse(`🎯 Based on your current tasks, here are your top priorities:\n\n1. Review quarterly budget report (High Priority)\n2. Team standup meeting (Medium Priority)\n3. Code review for new feature (Medium Priority)`);
      } else {
        setAiResponse(`🤖 I understand you said: "${input}". I can help you with:\n\n• Creating tasks\n• Scheduling meetings\n• Getting priorities\n• Analyzing productivity patterns\n\nTry asking me to "create a task" or "what are my priorities today?"`);
      }
      
    } catch (error) {
      console.error('Failed to process natural language:', error);
      setAiResponse('Sorry, I encountered an error processing your request. Please try again.');
    }
  };

  const startVoiceListening = () => {
    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false);
      const mockVoiceInput = 'Create a task to review the project proposal';
      setNaturalLanguageInput(mockVoiceInput);
      processNaturalLanguage(mockVoiceInput);
    }, 3000);
  };

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 5: return 'text-red-600 bg-red-100';
      case 4: return 'text-orange-600 bg-orange-100';
      case 3: return 'text-yellow-600 bg-yellow-100';
      case 2: return 'text-blue-600 bg-blue-100';
      case 1: return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'productivity': return '📈';
      case 'schedule': return '📅';
      case 'energy': return '⚡';
      case 'focus': return '🎯';
      case 'optimization': return '🔧';
      default: return '💡';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading AI Assistant...</span>
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
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">AI-Powered Productivity Assistant</h2>
              <p className="text-purple-100 mt-1">Natural language task creation, smart scheduling, and intelligent insights</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-purple-200 text-sm">AI Tasks:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {aiTasks.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-purple-200 text-sm">Insights:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {aiInsights.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-purple-200 text-sm">Voice Commands:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {voiceCommands.length}
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
              { id: 'assistant', name: 'AI Assistant', icon: '🤖' },
              { id: 'tasks', name: 'AI Tasks', icon: '📝' },
              { id: 'insights', name: 'AI Insights', icon: '💡' },
              { id: 'voice', name: 'Voice Commands', icon: '🎤' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all ${
                  selectedTab === tab.id
                    ? 'border-purple-500 text-purple-600'
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
          {selectedTab === 'assistant' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">AI Assistant</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Natural Language Input</label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={naturalLanguageInput}
                        onChange={(e) => setNaturalLanguageInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && processNaturalLanguage(naturalLanguageInput)}
                        placeholder="Try: 'Create a task to review the budget' or 'What are my priorities today?'"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                      <button
                        onClick={() => processNaturalLanguage(naturalLanguageInput)}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        Send
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={startVoiceListening}
                      disabled={isListening}
                      className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                        isListening 
                          ? 'bg-red-600 text-white animate-pulse' 
                          : 'bg-gray-600 text-white hover:bg-gray-700'
                      }`}
                    >
                      <span>🎤</span>
                      <span>{isListening ? 'Listening...' : 'Voice Input'}</span>
                    </button>
                    
                    <div className="text-sm text-gray-600">
                      <div>💡 Try saying:</div>
                      <div>• "Create a task to..."</div>
                      <div>• "Schedule a meeting..."</div>
                      <div>• "What are my priorities?"</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">AI Response</label>
                  <div className="bg-gray-50 p-4 rounded-lg min-h-[200px] border border-gray-200">
                    {aiResponse ? (
                      <div className="text-gray-800 whitespace-pre-line">{aiResponse}</div>
                    ) : (
                      <div className="text-gray-500 italic">AI responses will appear here...</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'tasks' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">AI-Generated Tasks</h3>
              
              <div className="space-y-4">
                {aiTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{task.title}</h4>
                        <p className="text-sm text-gray-600">{task.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span>⚡ Energy: {task.energyLevel}/10</span>
                          <span>⏱️ Duration: {task.estimatedDuration}min</span>
                          <span>📅 Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(task.priority)}`}>
                          Priority {task.priority}
                        </span>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-800">
                          AI Generated
                        </span>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                          {Math.round(task.confidence * 100)}% confidence
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">AI Suggestions:</div>
                      <div className="space-y-1">
                        {task.suggestions.map((suggestion, index) => (
                          <div key={index} className="text-sm text-gray-600 flex items-center gap-2">
                            <span className="w-1 h-1 bg-purple-400 rounded-full"></span>
                            {suggestion}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'insights' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">AI Insights & Recommendations</h3>
              
              <div className="space-y-4">
                {aiInsights.map((insight) => (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-2xl">{getInsightIcon(insight.type)}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{insight.title}</h4>
                        <p className="text-sm text-gray-600">{insight.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getImpactColor(insight.impact)}`}>
                          {insight.impact.toUpperCase()} IMPACT
                        </span>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          {Math.round(insight.confidence * 100)}% confidence
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Category:</span>
                        <span className="ml-2 text-gray-900">{insight.category}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Actionable:</span>
                        <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
                          insight.actionable ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {insight.actionable ? 'YES' : 'NO'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'voice' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Voice Commands</h3>
              
              <div className="space-y-4">
                {voiceCommands.map((command) => (
                  <motion.div
                    key={command.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">"{command.command}"</h4>
                        <p className="text-sm text-gray-600">Action: {command.action}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(command.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        command.executed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {command.executed ? 'EXECUTED' : 'PENDING'}
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                      <div className="font-medium mb-1">Parameters:</div>
                      <pre className="text-xs text-gray-600">
                        {JSON.stringify(command.parameters, null, 2)}
                      </pre>
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
            AI-Powered Productivity Assistant • {aiTasks.length} AI tasks • {aiInsights.length} insights • {voiceCommands.length} voice commands
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
                console.log('Exporting AI data...');
              }}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              Export Data
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AIProductivityAssistant;
