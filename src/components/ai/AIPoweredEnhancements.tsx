import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MLModel {
  id: string;
  name: string;
  type: 'classification' | 'regression' | 'clustering' | 'nlp' | 'computer_vision' | 'recommendation';
  purpose: string;
  accuracy: number;
  status: 'training' | 'deployed' | 'testing' | 'deprecated';
  lastUpdated: Date;
  performance: {
    precision: number;
    recall: number;
    f1Score: number;
    auc: number;
  };
  trainingData: {
    size: number;
    features: number;
    lastTraining: Date;
    validationScore: number;
  };
  deployment: {
    endpoint: string;
    version: string;
    latency: number;
    throughput: number;
  };
}

interface PredictiveModel {
  id: string;
  name: string;
  category: 'productivity' | 'energy' | 'task_completion' | 'user_behavior' | 'resource_optimization';
  target: string;
  algorithm: string;
  accuracy: number;
  confidence: number;
  lastPrediction: Date;
  predictions: {
    timestamp: Date;
    value: number;
    confidence: number;
    actual?: number;
    error?: number;
  }[];
  features: string[];
  insights: string[];
  recommendations: string[];
}

interface NLPAnalysis {
  id: string;
  text: string;
  analysis: {
    sentiment: {
      score: number;
      magnitude: number;
      label: 'positive' | 'negative' | 'neutral';
    };
    entities: {
      name: string;
      type: string;
      confidence: number;
    }[];
    categories: {
      name: string;
      confidence: number;
    }[];
    keyPhrases: string[];
    language: string;
    toxicity: number;
  };
  timestamp: Date;
  source: string;
}

interface AIInsight {
  id: string;
  type: 'productivity' | 'efficiency' | 'optimization' | 'prediction' | 'recommendation';
  title: string;
  description: string;
  confidence: number;
  impact: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  timestamp: Date;
  actionable: boolean;
  implementation: string[];
  metrics: {
    before: number;
    after: number;
    improvement: number;
  };
  tags: string[];
}

interface AIWorkflow {
  id: string;
  name: string;
  description: string;
  trigger: {
    type: 'event' | 'schedule' | 'condition' | 'manual';
    condition: string;
    frequency?: string;
  };
  steps: {
    id: string;
    type: 'data_collection' | 'analysis' | 'prediction' | 'action' | 'notification';
    description: string;
    parameters: Record<string, any>;
    status: 'pending' | 'running' | 'completed' | 'failed';
    result?: any;
  }[];
  status: 'active' | 'paused' | 'draft' | 'error';
  lastRun: Date;
  nextRun?: Date;
  successRate: number;
  averageExecutionTime: number;
}

interface AIChatSession {
  id: string;
  messages: {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    confidence?: number;
    sources?: string[];
    actions?: {
      type: string;
      description: string;
      executed: boolean;
    }[];
  }[];
  context: {
    user: string;
    session: string;
    domain: string;
    preferences: Record<string, any>;
  };
  startedAt: Date;
  lastActivity: Date;
  status: 'active' | 'completed' | 'archived';
}

const AIPoweredEnhancements: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [mlModels, setMLModels] = useState<MLModel[]>([]);
  const [predictiveModels, setPredictiveModels] = useState<PredictiveModel[]>([]);
  const [nlpAnalyses, setNlpAnalyses] = useState<NLPAnalysis[]>([]);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [aiWorkflows, setAiWorkflows] = useState<AIWorkflow[]>([]);
  const [aiChatSessions, setAiChatSessions] = useState<AIChatSession[]>([]);
  const [isTrainingModel, setIsTrainingModel] = useState(false);
  const [isRunningPrediction, setIsRunningPrediction] = useState(false);
  const [isAnalyzingText, setIsAnalyzingText] = useState(false);
  const [isExecutingWorkflow, setIsExecutingWorkflow] = useState(false);
  const [selectedModel, setSelectedModel] = useState<MLModel | null>(null);
  const [newChatMessage, setNewChatMessage] = useState('');
  const [currentChatSession, setCurrentChatSession] = useState<AIChatSession | null>(null);

  // Generate AI data
  useEffect(() => {
    const generateMLModels = (): MLModel[] => {
      return [
        {
          id: 'model-1',
          name: 'Task Completion Predictor',
          type: 'regression',
          purpose: 'Predict task completion time based on user behavior and task characteristics',
          accuracy: 0.87,
          status: 'deployed',
          lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          performance: {
            precision: 0.85,
            recall: 0.89,
            f1Score: 0.87,
            auc: 0.91
          },
          trainingData: {
            size: 50000,
            features: 25,
            lastTraining: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            validationScore: 0.86
          },
          deployment: {
            endpoint: '/api/ai/predict-task-completion',
            version: 'v2.1.3',
            latency: 45,
            throughput: 1000
          }
        },
        {
          id: 'model-2',
          name: 'Energy Level Classifier',
          type: 'classification',
          purpose: 'Classify user energy levels based on activity patterns and biometric data',
          accuracy: 0.92,
          status: 'deployed',
          lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          performance: {
            precision: 0.91,
            recall: 0.93,
            f1Score: 0.92,
            auc: 0.94
          },
          trainingData: {
            size: 75000,
            features: 18,
            lastTraining: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            validationScore: 0.91
          },
          deployment: {
            endpoint: '/api/ai/classify-energy-level',
            version: 'v1.8.2',
            latency: 32,
            throughput: 1500
          }
        },
        {
          id: 'model-3',
          name: 'Content Sentiment Analyzer',
          type: 'nlp',
          purpose: 'Analyze sentiment and extract insights from user-generated content',
          accuracy: 0.89,
          status: 'testing',
          lastUpdated: new Date(Date.now() - 6 * 60 * 60 * 1000),
          performance: {
            precision: 0.88,
            recall: 0.90,
            f1Score: 0.89,
            auc: 0.92
          },
          trainingData: {
            size: 100000,
            features: 512,
            lastTraining: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            validationScore: 0.88
          },
          deployment: {
            endpoint: '/api/ai/analyze-sentiment',
            version: 'v3.0.0-beta',
            latency: 120,
            throughput: 500
          }
        }
      ];
    };

    const generatePredictiveModels = (): PredictiveModel[] => {
      return [
        {
          id: 'pred-1',
          name: 'Productivity Forecast',
          category: 'productivity',
          target: 'Daily productivity score',
          algorithm: 'Random Forest Regressor',
          accuracy: 0.84,
          confidence: 0.91,
          lastPrediction: new Date(Date.now() - 30 * 60 * 1000),
          predictions: Array.from({ length: 24 }, (_, i) => ({
            timestamp: new Date(Date.now() - (23 - i) * 60 * 60 * 1000),
            value: 75 + Math.random() * 20,
            confidence: 0.85 + Math.random() * 0.1,
            actual: i > 18 ? 75 + Math.random() * 20 : undefined,
            error: i > 18 ? Math.random() * 5 : undefined
          })),
          features: ['time_of_day', 'task_count', 'energy_level', 'previous_scores', 'calendar_events'],
          insights: [
            'Productivity peaks between 10 AM and 2 PM',
            'Energy level is the strongest predictor',
            'Calendar events have moderate impact on productivity'
          ],
          recommendations: [
            'Schedule high-priority tasks during peak hours',
            'Maintain consistent energy levels through breaks',
            'Limit calendar conflicts during focus time'
          ]
        },
        {
          id: 'pred-2',
          name: 'Task Completion Time',
          category: 'task_completion',
          target: 'Estimated completion time in minutes',
          algorithm: 'Gradient Boosting',
          accuracy: 0.78,
          confidence: 0.86,
          lastPrediction: new Date(Date.now() - 15 * 60 * 1000),
          predictions: Array.from({ length: 12 }, (_, i) => ({
            timestamp: new Date(Date.now() - (11 - i) * 2 * 60 * 60 * 1000),
            value: 45 + Math.random() * 30,
            confidence: 0.80 + Math.random() * 0.1,
            actual: i > 8 ? 45 + Math.random() * 30 : undefined,
            error: i > 8 ? Math.random() * 8 : undefined
          })),
          features: ['task_complexity', 'user_experience', 'energy_level', 'time_of_day', 'interruptions'],
          insights: [
            'Complex tasks take 2-3x longer than estimated',
            'User experience significantly impacts completion time',
            'Afternoon tasks tend to take longer'
          ],
          recommendations: [
            'Break down complex tasks into smaller components',
            'Schedule complex tasks during peak energy hours',
            'Account for experience level in time estimates'
          ]
        }
      ];
    };

    const generateNLPAnalyses = (): NLPAnalysis[] => {
      return [
        {
          id: 'nlp-1',
          text: 'I love using SyncScript! It has really improved my productivity and I feel more organized than ever.',
          analysis: {
            sentiment: {
              score: 0.8,
              magnitude: 0.9,
              label: 'positive'
            },
            entities: [
              { name: 'SyncScript', type: 'PRODUCT', confidence: 0.95 },
              { name: 'productivity', type: 'CONCEPT', confidence: 0.88 }
            ],
            categories: [
              { name: 'Software/Product', confidence: 0.92 },
              { name: 'Personal Experience', confidence: 0.85 }
            ],
            keyPhrases: ['improved my productivity', 'feel more organized', 'love using SyncScript'],
            language: 'en',
            toxicity: 0.01
          },
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          source: 'user_feedback'
        },
        {
          id: 'nlp-2',
          text: 'The interface is confusing and I keep getting lost. Need better navigation.',
          analysis: {
            sentiment: {
              score: -0.3,
              magnitude: 0.6,
              label: 'negative'
            },
            entities: [
              { name: 'interface', type: 'CONCEPT', confidence: 0.90 },
              { name: 'navigation', type: 'CONCEPT', confidence: 0.87 }
            ],
            categories: [
              { name: 'User Interface', confidence: 0.94 },
              { name: 'User Experience', confidence: 0.89 }
            ],
            keyPhrases: ['interface is confusing', 'getting lost', 'better navigation'],
            language: 'en',
            toxicity: 0.05
          },
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
          source: 'support_ticket'
        }
      ];
    };

    const generateAIInsights = (): AIInsight[] => {
      return [
        {
          id: 'insight-1',
          type: 'optimization',
          title: 'Energy-Based Task Scheduling Optimization',
          description: 'Users who schedule high-energy tasks during peak energy hours complete 23% more tasks per day',
          confidence: 0.94,
          impact: 'high',
          category: 'productivity',
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
          actionable: true,
          implementation: [
            'Implement automatic task scheduling based on energy levels',
            'Add energy-based task recommendations',
            'Create energy-aware calendar integration'
          ],
          metrics: {
            before: 12.3,
            after: 15.1,
            improvement: 22.8
          },
          tags: ['energy', 'scheduling', 'productivity', 'optimization']
        },
        {
          id: 'insight-2',
          type: 'prediction',
          title: 'Task Completion Time Prediction',
          description: 'AI can predict task completion times with 87% accuracy, helping users better plan their day',
          confidence: 0.87,
          impact: 'medium',
          category: 'planning',
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
          actionable: true,
          implementation: [
            'Add completion time estimates to all tasks',
            'Implement dynamic deadline adjustments',
            'Create time-blocking recommendations'
          ],
          metrics: {
            before: 65,
            after: 87,
            improvement: 33.8
          },
          tags: ['prediction', 'time-management', 'planning', 'accuracy']
        }
      ];
    };

    const generateAIWorkflows = (): AIWorkflow[] => {
      return [
        {
          id: 'workflow-1',
          name: 'Daily Productivity Optimization',
          description: 'Automatically analyzes daily patterns and suggests optimizations',
          trigger: {
            type: 'schedule',
            condition: 'daily',
            frequency: '0 6 * * *'
          },
          steps: [
            {
              id: 'step-1',
              type: 'data_collection',
              description: 'Collect user activity data',
              parameters: { timeRange: '24h', metrics: ['tasks', 'energy', 'focus'] },
              status: 'completed',
              result: { tasksCompleted: 15, avgEnergy: 7.2, focusTime: 180 }
            },
            {
              id: 'step-2',
              type: 'analysis',
              description: 'Analyze productivity patterns',
              parameters: { algorithm: 'pattern_recognition' },
              status: 'completed',
              result: { peakHours: '10-14', efficiency: 0.85 }
            },
            {
              id: 'step-3',
              type: 'action',
              description: 'Generate optimization recommendations',
              parameters: { maxRecommendations: 5 },
              status: 'completed',
              result: { recommendations: ['Schedule complex tasks at 10 AM', 'Take break at 2 PM'] }
            }
          ],
          status: 'active',
          lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000),
          nextRun: new Date(Date.now() + 22 * 60 * 60 * 1000),
          successRate: 0.94,
          averageExecutionTime: 45
        }
      ];
    };

    const generateAIChatSessions = (): AIChatSession[] => {
      return [
        {
          id: 'chat-1',
          messages: [
            {
              id: 'msg-1',
              role: 'user',
              content: 'How can I improve my productivity today?',
              timestamp: new Date(Date.now() - 30 * 60 * 1000),
              confidence: 1.0
            },
            {
              id: 'msg-2',
              role: 'assistant',
              content: 'Based on your current energy level (7/10) and schedule, I recommend focusing on your high-priority tasks between 10 AM and 2 PM. Would you like me to help you schedule your tasks optimally?',
              timestamp: new Date(Date.now() - 29 * 60 * 1000),
              confidence: 0.92,
              sources: ['energy_analysis', 'schedule_optimization'],
              actions: [
                {
                  type: 'schedule_optimization',
                  description: 'Optimize task scheduling',
                  executed: false
                }
              ]
            }
          ],
          context: {
            user: 'user@syncscript.com',
            session: 'productivity_consultation',
            domain: 'productivity',
            preferences: { notifications: true, automation: true }
          },
          startedAt: new Date(Date.now() - 30 * 60 * 1000),
          lastActivity: new Date(Date.now() - 29 * 60 * 1000),
          status: 'active'
        }
      ];
    };

    setMLModels(generateMLModels());
    setPredictiveModels(generatePredictiveModels());
    setNlpAnalyses(generateNLPAnalyses());
    setAiInsights(generateAIInsights());
    setAiWorkflows(generateAIWorkflows());
    setAiChatSessions(generateAIChatSessions());
    
    // Set current chat session
    const sessions = generateAIChatSessions();
    setCurrentChatSession(sessions[0]);
  }, []);

  const trainModel = async () => {
    setIsTrainingModel(true);
    
    // Simulate model training
    await new Promise(resolve => setTimeout(resolve, 15000));
    
    // Update model status
    setMLModels(prev => prev.map(model => 
      model.status === 'testing' 
        ? { ...model, status: 'deployed' as const, accuracy: model.accuracy + 0.02 }
        : model
    ));
    
    setIsTrainingModel(false);
  };

  const runPrediction = async () => {
    setIsRunningPrediction(true);
    
    // Simulate prediction
    await new Promise(resolve => setTimeout(resolve, 8000));
    
    // Add new prediction
    setPredictiveModels(prev => prev.map(model => ({
      ...model,
      predictions: [
        ...model.predictions.slice(1),
        {
          timestamp: new Date(),
          value: model.predictions[model.predictions.length - 1].value * (0.9 + Math.random() * 0.2),
          confidence: 0.85 + Math.random() * 0.1
        }
      ]
    })));
    
    setIsRunningPrediction(false);
  };

  const analyzeText = async (text: string) => {
    setIsAnalyzingText(true);
    
    // Simulate NLP analysis
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    const newAnalysis: NLPAnalysis = {
      id: `nlp-${Date.now()}`,
      text,
      analysis: {
        sentiment: {
          score: (Math.random() - 0.5) * 2,
          magnitude: Math.random(),
          label: Math.random() > 0.5 ? 'positive' : 'negative'
        },
        entities: [
          { name: 'SyncScript', type: 'PRODUCT', confidence: 0.95 },
          { name: 'productivity', type: 'CONCEPT', confidence: 0.88 }
        ],
        categories: [
          { name: 'User Feedback', confidence: 0.92 }
        ],
        keyPhrases: ['productivity', 'improvement', 'efficiency'],
        language: 'en',
        toxicity: Math.random() * 0.1
      },
      timestamp: new Date(),
      source: 'user_input'
    };
    
    setNlpAnalyses(prev => [newAnalysis, ...prev]);
    setIsAnalyzingText(false);
  };

  const executeWorkflow = async (workflowId: string) => {
    setIsExecutingWorkflow(true);
    
    // Simulate workflow execution
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    // Update workflow
    setAiWorkflows(prev => prev.map(workflow => 
      workflow.id === workflowId 
        ? { 
            ...workflow, 
            lastRun: new Date(),
            successRate: Math.min(1.0, workflow.successRate + 0.01)
          }
        : workflow
    ));
    
    setIsExecutingWorkflow(false);
  };

  const sendChatMessage = async () => {
    if (!newChatMessage.trim() || !currentChatSession) return;

    const userMessage = {
      id: `msg-${Date.now()}`,
      role: 'user' as const,
      content: newChatMessage,
      timestamp: new Date(),
      confidence: 1.0
    };

    // Add user message
    const updatedSession = {
      ...currentChatSession,
      messages: [...currentChatSession.messages, userMessage],
      lastActivity: new Date()
    };

    setCurrentChatSession(updatedSession);
    setNewChatMessage('');

    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 3000));

    const aiMessage = {
      id: `msg-${Date.now() + 1}`,
      role: 'assistant' as const,
      content: `I understand you're asking about "${newChatMessage}". Based on your current productivity patterns and energy levels, here's what I recommend...`,
      timestamp: new Date(),
      confidence: 0.89,
      sources: ['productivity_analysis', 'energy_patterns'],
      actions: [
        {
          type: 'recommendation',
          description: 'Generate personalized recommendations',
          executed: false
        }
      ]
    };

    const finalSession = {
      ...updatedSession,
      messages: [...updatedSession.messages, aiMessage],
      lastActivity: new Date()
    };

    setCurrentChatSession(finalSession);
    setAiChatSessions(prev => prev.map(session => 
      session.id === currentChatSession.id ? finalSession : session
    ));
  };

  const totalModels = mlModels.length;
  const deployedModels = mlModels.filter(m => m.status === 'deployed').length;
  const avgAccuracy = mlModels.reduce((sum, m) => sum + m.accuracy, 0) / totalModels;
  const totalPredictions = predictiveModels.reduce((sum, p) => sum + p.predictions.length, 0);
  const avgConfidence = predictiveModels.reduce((sum, p) => sum + p.confidence, 0) / predictiveModels.length;
  const totalInsights = aiInsights.length;
  const actionableInsights = aiInsights.filter(i => i.actionable).length;
  const activeWorkflows = aiWorkflows.filter(w => w.status === 'active').length;
  const totalChatMessages = aiChatSessions.reduce((sum, s) => sum + s.messages.length, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">🤖 AI-Powered Enhancements</h2>
              <p className="text-purple-100 mt-1">Machine learning models, predictive analytics, NLP, and intelligent automation</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-purple-200 transition-colors"
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
                  <p className="text-sm text-purple-600 font-medium">ML Models</p>
                  <p className="text-2xl font-bold text-purple-800">{deployedModels}/{totalModels}</p>
                  <p className="text-xs text-purple-600">Deployed models</p>
                </div>
                <div className="text-3xl">🧠</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Predictions</p>
                  <p className="text-2xl font-bold text-blue-800">{totalPredictions}</p>
                  <p className="text-xs text-blue-600">Total predictions</p>
                </div>
                <div className="text-3xl">🔮</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">AI Insights</p>
                  <p className="text-2xl font-bold text-green-800">{actionableInsights}</p>
                  <p className="text-xs text-green-600">Actionable insights</p>
                </div>
                <div className="text-3xl">💡</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Active Workflows</p>
                  <p className="text-2xl font-bold text-orange-800">{activeWorkflows}</p>
                  <p className="text-xs text-orange-600">Automated workflows</p>
                </div>
                <div className="text-3xl">⚡</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                AI-powered analysis and automation tools
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={trainModel}
                  disabled={isTrainingModel}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 transition-colors"
                >
                  {isTrainingModel ? '⏳ Training...' : '🧠 Train Model'}
                </button>
                <button
                  onClick={runPrediction}
                  disabled={isRunningPrediction}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                >
                  {isRunningPrediction ? '⏳ Predicting...' : '🔮 Run Prediction'}
                </button>
                <button
                  onClick={() => analyzeText('Sample text for analysis')}
                  disabled={isAnalyzingText}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
                >
                  {isAnalyzingText ? '⏳ Analyzing...' : '📝 Analyze Text'}
                </button>
              </div>
            </div>
          </div>

          {/* AI Chat Assistant */}
          {currentChatSession && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">AI Chat Assistant</h3>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4 max-h-64 overflow-y-auto">
                {currentChatSession.messages.map((message) => (
                  <div key={message.id} className={`mb-3 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.role === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-white text-gray-800 border border-gray-200'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      {message.confidence && (
                        <p className="text-xs opacity-75 mt-1">
                          Confidence: {(message.confidence * 100).toFixed(0)}%
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newChatMessage}
                  onChange={(e) => setNewChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                  placeholder="Ask me anything about productivity, tasks, or optimization..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  onClick={sendChatMessage}
                  disabled={!newChatMessage.trim()}
                  className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          )}

          {/* ML Models */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Machine Learning Models ({mlModels.length})</h3>
            <div className="space-y-4">
              {mlModels.map((model) => (
                <div key={model.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{model.name}</h4>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        model.status === 'deployed' ? 'bg-green-100 text-green-800' :
                        model.status === 'training' ? 'bg-blue-100 text-blue-800' :
                        model.status === 'testing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {model.status}
                      </span>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                        {model.type}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">{model.purpose}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-sm">
                        <span className="text-gray-600">Accuracy:</span>
                        <span className="font-medium text-gray-900 ml-1">{(model.accuracy * 100).toFixed(1)}%</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">F1 Score:</span>
                        <span className="font-medium text-gray-900 ml-1">{model.performance.f1Score.toFixed(3)}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Latency:</span>
                        <span className="font-medium text-gray-900 ml-1">{model.deployment.latency}ms</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Throughput:</span>
                        <span className="font-medium text-gray-900 ml-1">{model.deployment.throughput}/sec</span>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="text-sm font-medium text-gray-700 mb-2">Training Data:</div>
                      <div className="text-sm text-gray-600">
                        {model.trainingData.size.toLocaleString()} samples, {model.trainingData.features} features, 
                        Last trained: {model.trainingData.lastTraining.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">AI Insights ({aiInsights.length})</h3>
            <div className="space-y-4">
              {aiInsights.map((insight) => (
                <div key={insight.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{insight.title}</h4>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        insight.impact === 'critical' ? 'bg-red-100 text-red-800' :
                        insight.impact === 'high' ? 'bg-orange-100 text-orange-800' :
                        insight.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {insight.impact}
                      </span>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {(insight.confidence * 100).toFixed(0)}% confidence
                      </span>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                        {insight.type}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">{insight.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-sm">
                        <span className="text-gray-600">Improvement:</span>
                        <span className="font-medium text-green-600 ml-1">+{insight.metrics.improvement.toFixed(1)}%</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Before:</span>
                        <span className="font-medium text-gray-900 ml-1">{insight.metrics.before}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">After:</span>
                        <span className="font-medium text-gray-900 ml-1">{insight.metrics.after}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-600">Actionable:</span>
                        <span className={`font-medium ml-1 ${insight.actionable ? 'text-green-600' : 'text-gray-600'}`}>
                          {insight.actionable ? 'Yes' : 'No'}
                        </span>
                      </div>
                    </div>
                    
                    {insight.implementation.length > 0 && (
                      <div className="mt-3">
                        <div className="text-sm font-medium text-gray-700 mb-2">Implementation Steps:</div>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {insight.implementation.map((step, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-blue-500 mr-2">•</span>
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="mt-3">
                      <div className="flex flex-wrap gap-1">
                        {insight.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AIPoweredEnhancements;
