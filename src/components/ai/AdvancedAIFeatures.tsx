import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AISuggestion {
  id: string;
  type: 'task' | 'schedule' | 'optimization' | 'insight' | 'recommendation';
  title: string;
  description: string;
  confidence: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  actionable: boolean;
  estimatedImpact: 'low' | 'medium' | 'high';
  timeToImplement: string;
  tags: string[];
  createdAt: Date;
  expiresAt?: Date;
}

interface AIConversation {
  id: string;
  messages: {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    type: 'text' | 'command' | 'suggestion' | 'analysis';
  }[];
  context: {
    currentTask?: string;
    energyLevel?: number;
    timeOfDay?: string;
    userGoals?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

interface AIPrediction {
  id: string;
  type: 'productivity' | 'energy' | 'completion' | 'optimization';
  prediction: string;
  confidence: number;
  timeframe: string;
  factors: string[];
  recommendations: string[];
  accuracy?: number;
  createdAt: Date;
}

interface AILearning {
  id: string;
  pattern: string;
  behavior: string;
  frequency: number;
  confidence: number;
  insights: string[];
  recommendations: string[];
  lastSeen: Date;
}

const AdvancedAIFeatures: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([]);
  const [conversations, setConversations] = useState<AIConversation[]>([]);
  const [predictions, setPredictions] = useState<AIPrediction[]>([]);
  const [learning, setLearning] = useState<AILearning[]>([]);
  const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentConversation, setCurrentConversation] = useState<AIConversation | null>(null);
  const [chatInput, setChatInput] = useState('');

  // Generate AI data
  useEffect(() => {
    const generateSuggestions = (): AISuggestion[] => {
      return [
        {
          id: 'suggestion-1',
          type: 'task',
          title: 'Optimize Morning Routine',
          description: 'Based on your energy patterns, consider scheduling high-energy tasks between 9-11 AM for maximum productivity.',
          confidence: 0.92,
          priority: 'high',
          category: 'Productivity',
          actionable: true,
          estimatedImpact: 'high',
          timeToImplement: '5 minutes',
          tags: ['routine', 'energy', 'optimization'],
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
        },
        {
          id: 'suggestion-2',
          type: 'schedule',
          title: 'Break Down Large Project',
          description: 'Your current project has 15 tasks. AI suggests breaking it into 3 phases with 2-day sprints for better completion rates.',
          confidence: 0.87,
          priority: 'medium',
          category: 'Project Management',
          actionable: true,
          estimatedImpact: 'medium',
          timeToImplement: '15 minutes',
          tags: ['project', 'planning', 'sprints'],
          createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
        },
        {
          id: 'suggestion-3',
          type: 'optimization',
          title: 'Reduce Context Switching',
          description: 'You switched between 8 different tasks in the last hour. Consider time-blocking similar tasks together.',
          confidence: 0.95,
          priority: 'high',
          category: 'Focus',
          actionable: true,
          estimatedImpact: 'high',
          timeToImplement: '10 minutes',
          tags: ['focus', 'time-blocking', 'efficiency'],
          createdAt: new Date(Date.now() - 30 * 60 * 1000)
        },
        {
          id: 'suggestion-4',
          type: 'insight',
          title: 'Energy Peak Analysis',
          description: 'Your productivity peaks at 10 AM and 2 PM. Schedule your most important tasks during these windows.',
          confidence: 0.89,
          priority: 'medium',
          category: 'Analytics',
          actionable: true,
          estimatedImpact: 'medium',
          timeToImplement: '2 minutes',
          tags: ['energy', 'analytics', 'scheduling'],
          createdAt: new Date(Date.now() - 45 * 60 * 1000)
        },
        {
          id: 'suggestion-5',
          type: 'recommendation',
          title: 'Team Collaboration Boost',
          description: 'Your team productivity increases 40% when you have daily standups. Consider implementing this routine.',
          confidence: 0.78,
          priority: 'low',
          category: 'Team',
          actionable: true,
          estimatedImpact: 'high',
          timeToImplement: '30 minutes',
          tags: ['team', 'collaboration', 'meetings'],
          createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000)
        }
      ];
    };

    const generateConversations = (): AIConversation[] => {
      return [
        {
          id: 'conv-1',
          messages: [
            {
              id: 'msg-1',
              role: 'user',
              content: 'I have a big project due next week. How should I approach it?',
              timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
              type: 'text'
            },
            {
              id: 'msg-2',
              role: 'assistant',
              content: 'Based on your productivity patterns, I recommend breaking this into 3 phases: Planning (2 days), Execution (3 days), Review (2 days). Would you like me to create a detailed timeline?',
              timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 30 * 1000),
              type: 'suggestion'
            },
            {
              id: 'msg-3',
              role: 'user',
              content: 'Yes, create a timeline and also suggest the best times to work on it.',
              timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
              type: 'command'
            },
            {
              id: 'msg-4',
              role: 'assistant',
              content: 'Perfect! I\'ve created a timeline and scheduled your work blocks during your peak productivity hours (10 AM and 2 PM). I\'ve also set up automated reminders and progress tracking.',
              timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000 + 45 * 1000),
              type: 'analysis'
            }
          ],
          context: {
            currentTask: 'Project Planning',
            energyLevel: 7,
            timeOfDay: 'morning',
            userGoals: ['productivity', 'time-management']
          },
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
          updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
        }
      ];
    };

    const generatePredictions = (): AIPrediction[] => {
      return [
        {
          id: 'pred-1',
          type: 'productivity',
          prediction: 'You\'ll complete 85% of your planned tasks today',
          confidence: 0.88,
          timeframe: 'Today',
          factors: ['Current energy level', 'Task complexity', 'Historical patterns'],
          recommendations: ['Focus on high-priority tasks first', 'Take breaks every 90 minutes'],
          accuracy: 0.92,
          createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
        },
        {
          id: 'pred-2',
          type: 'energy',
          prediction: 'Your energy will peak at 2 PM and dip at 4 PM',
          confidence: 0.94,
          timeframe: 'Today',
          factors: ['Sleep patterns', 'Meal times', 'Activity levels'],
          recommendations: ['Schedule important work at 2 PM', 'Take a break at 4 PM'],
          accuracy: 0.89,
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
        },
        {
          id: 'pred-3',
          type: 'completion',
          prediction: 'Project deadline risk: Low (15% chance of delay)',
          confidence: 0.76,
          timeframe: 'Next week',
          factors: ['Current progress', 'Team capacity', 'Task dependencies'],
          recommendations: ['Monitor daily progress', 'Prepare contingency plans'],
          accuracy: 0.85,
          createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000)
        }
      ];
    };

    const generateLearning = (): AILearning[] => {
      return [
        {
          id: 'learn-1',
          pattern: 'Morning Productivity',
          behavior: 'Completes 60% more tasks before 11 AM',
          frequency: 0.85,
          confidence: 0.92,
          insights: ['Prefers deep work in mornings', 'Energy levels peak early'],
          recommendations: ['Schedule complex tasks in AM', 'Use PM for meetings'],
          lastSeen: new Date(Date.now() - 1 * 60 * 60 * 1000)
        },
        {
          id: 'learn-2',
          pattern: 'Task Switching',
          behavior: 'Switches tasks every 25 minutes on average',
          frequency: 0.78,
          confidence: 0.88,
          insights: ['Short attention span', 'Prefers variety'],
          recommendations: ['Use Pomodoro technique', 'Group similar tasks'],
          lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000)
        },
        {
          id: 'learn-3',
          pattern: 'Break Patterns',
          behavior: 'Takes breaks every 90 minutes',
          frequency: 0.82,
          confidence: 0.85,
          insights: ['Consistent break schedule', 'Maintains energy well'],
          recommendations: ['Continue current pattern', 'Optimize break activities'],
          lastSeen: new Date(Date.now() - 30 * 60 * 1000)
        }
      ];
    };

    setSuggestions(generateSuggestions());
    setConversations(generateConversations());
    setPredictions(generatePredictions());
    setLearning(generateLearning());
  }, []);

  const formatDate = (date: Date): string => {
    return date.toLocaleString();
  };

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string): string => {
    switch (type) {
      case 'task': return 'bg-blue-100 text-blue-800';
      case 'schedule': return 'bg-green-100 text-green-800';
      case 'optimization': return 'bg-purple-100 text-purple-800';
      case 'insight': return 'bg-yellow-100 text-yellow-800';
      case 'recommendation': return 'bg-pink-100 text-pink-800';
      case 'productivity': return 'bg-blue-100 text-blue-800';
      case 'energy': return 'bg-orange-100 text-orange-800';
      case 'completion': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactColor = (impact: string): string => {
    switch (impact) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const generateNewSuggestions = async () => {
    setIsGeneratingSuggestions(true);
    
    // Simulate AI suggestion generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Add new suggestion
    const newSuggestion: AISuggestion = {
      id: `suggestion-${Date.now()}`,
      type: 'optimization',
      title: 'AI-Generated Optimization',
      description: 'Based on your recent activity patterns, I recommend implementing a new workflow that could increase your productivity by 25%.',
      confidence: 0.91,
      priority: 'high',
      category: 'AI Optimization',
      actionable: true,
      estimatedImpact: 'high',
      timeToImplement: '20 minutes',
      tags: ['ai', 'optimization', 'workflow'],
      createdAt: new Date()
    };
    
    setSuggestions(prev => [newSuggestion, ...prev]);
    setIsGeneratingSuggestions(false);
  };

  const analyzeData = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    setIsAnalyzing(false);
  };

  const sendMessage = async () => {
    if (!chatInput.trim() || !currentConversation) return;

    const userMessage = {
      id: `msg-${Date.now()}`,
      role: 'user' as const,
      content: chatInput,
      timestamp: new Date(),
      type: 'text' as const
    };

    // Add user message
    const updatedConversation = {
      ...currentConversation,
      messages: [...currentConversation.messages, userMessage],
      updatedAt: new Date()
    };

    setCurrentConversation(updatedConversation);
    setChatInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant' as const,
        content: 'I understand your request. Let me analyze your productivity patterns and provide personalized recommendations based on your current energy level and task priorities.',
        timestamp: new Date(),
        type: 'suggestion' as const
      };

      const finalConversation = {
        ...updatedConversation,
        messages: [...updatedConversation.messages, aiMessage],
        updatedAt: new Date()
      };

      setCurrentConversation(finalConversation);
    }, 2000);
  };

  const startNewConversation = () => {
    const newConversation: AIConversation = {
      id: `conv-${Date.now()}`,
      messages: [],
      context: {
        energyLevel: 7,
        timeOfDay: 'morning',
        userGoals: ['productivity', 'optimization']
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setCurrentConversation(newConversation);
    setConversations(prev => [newConversation, ...prev]);
  };

  const totalSuggestions = suggestions.length;
  const highPrioritySuggestions = suggestions.filter(s => s.priority === 'high' || s.priority === 'critical').length;
  const actionableSuggestions = suggestions.filter(s => s.actionable).length;
  const avgConfidence = suggestions.reduce((sum, s) => sum + s.confidence, 0) / suggestions.length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">🤖 Advanced AI Features</h2>
              <p className="text-purple-100 mt-1">Intelligent suggestions, predictions, and AI-powered insights</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 h-full overflow-y-auto">
          {/* AI Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">AI Suggestions</p>
                  <p className="text-2xl font-bold text-purple-800">{totalSuggestions}</p>
                  <p className="text-xs text-purple-600">{actionableSuggestions} actionable</p>
                </div>
                <div className="text-3xl">💡</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">High Priority</p>
                  <p className="text-2xl font-bold text-blue-800">{highPrioritySuggestions}</p>
                  <p className="text-xs text-blue-600">Need attention</p>
                </div>
                <div className="text-3xl">⚡</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">AI Confidence</p>
                  <p className="text-2xl font-bold text-green-800">{(avgConfidence * 100).toFixed(0)}%</p>
                  <p className="text-xs text-green-600">Average accuracy</p>
                </div>
                <div className="text-3xl">🎯</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Predictions</p>
                  <p className="text-2xl font-bold text-orange-800">{predictions.length}</p>
                  <p className="text-xs text-orange-600">Active forecasts</p>
                </div>
                <div className="text-3xl">🔮</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Last AI analysis: {new Date().toLocaleString()}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={generateNewSuggestions}
                  disabled={isGeneratingSuggestions}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 transition-colors"
                >
                  {isGeneratingSuggestions ? '⏳ Generating...' : '💡 Generate Suggestions'}
                </button>
                <button
                  onClick={analyzeData}
                  disabled={isAnalyzing}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                >
                  {isAnalyzing ? '⏳ Analyzing...' : '🔍 Analyze Data'}
                </button>
                <button
                  onClick={startNewConversation}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  💬 New Chat
                </button>
              </div>
            </div>
          </div>

          {/* AI Suggestions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">AI Suggestions ({suggestions.length})</h3>
            <div className="space-y-4">
              {suggestions.map((suggestion) => (
                <div key={suggestion.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{suggestion.title}</h4>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(suggestion.priority)}`}>
                        {suggestion.priority}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(suggestion.type)}`}>
                        {suggestion.type}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">{suggestion.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-sm">
                        <span className="text-gray-600">Confidence:</span>
                        <span className="font-medium text-blue-600 ml-1">{(suggestion.confidence * 100).toFixed(0)}%</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Impact:</span>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getImpactColor(suggestion.estimatedImpact)}`}>
                          {suggestion.estimatedImpact}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Time:</span>
                        <span className="font-medium text-gray-900 ml-1">{suggestion.timeToImplement}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Category:</span>
                        <span className="font-medium text-gray-900 ml-1">{suggestion.category}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mt-2">
                      {suggestion.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Predictions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">AI Predictions ({predictions.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {predictions.map((prediction) => (
                <div key={prediction.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{prediction.prediction}</h4>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(prediction.type)}`}>
                      {prediction.type}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Confidence:</span>
                      <span className="font-medium text-blue-600">{(prediction.confidence * 100).toFixed(0)}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Timeframe:</span>
                      <span className="font-medium text-gray-900">{prediction.timeframe}</span>
                    </div>
                    {prediction.accuracy && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Accuracy:</span>
                        <span className="font-medium text-green-600">{(prediction.accuracy * 100).toFixed(0)}%</span>
                      </div>
                    )}
                    
                    <div className="mt-3">
                      <div className="text-sm font-medium text-gray-700 mb-1">Recommendations:</div>
                      <ul className="text-sm text-gray-600 list-disc list-inside">
                        {prediction.recommendations.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Chat */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">AI Assistant Chat</h3>
            </div>
            
            <div className="h-96 flex flex-col">
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {currentConversation?.messages.map((message) => (
                  <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.role === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">{formatDate(message.timestamp)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Chat Input */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Ask AI anything about your productivity..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!chatInput.trim()}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdvancedAIFeatures;
