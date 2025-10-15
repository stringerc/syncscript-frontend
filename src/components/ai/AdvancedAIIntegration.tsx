import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Brain, MessageSquare, Eye, TrendingUp, Zap, ShieldCheck, Settings, BarChart2, Cpu, Code, Bell, CheckCircle, AlertTriangle, Globe, User, BookOpen, Lightbulb, Target, Layers, GitBranch, Database, Cloud, Server, Activity, Clock, Calendar, Mail, Phone, Video, Mic, Camera, Image, FileText, Link, Share2, Heart, ThumbsUp, ThumbsDown, Smile, Frown, Meh, Laugh, Angry, Surprised, Key, UserCheck, Workflow, Plug, BarChart, ClipboardCheck, Flag, Alert, Info, HelpCircle, ExternalLink, Edit, Trash2, Save, Copy, Paste, Cut, Undo, Redo, Play, Pause, Stop, RefreshCw, RotateCcw, Maximize, Minimize, Filter, Search, Plus, Minus, ArrowUp, ArrowDown, ArrowRight, ArrowLeft } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { toast } from 'react-hot-toast';

// SSR-safe interfaces
interface AIModel {
  id: string;
  name: string;
  type: 'nlp' | 'ml' | 'cv' | 'automation';
  accuracy: number;
  status: 'active' | 'training' | 'offline';
  lastUpdated: string;
  description: string;
}

interface AIInsight {
  id: string;
  type: 'productivity' | 'energy' | 'task' | 'schedule';
  title: string;
  description: string;
  confidence: number;
  actionable: boolean;
  timestamp: string;
}

interface AIAutomation {
  id: string;
  name: string;
  trigger: string;
  action: string;
  status: 'active' | 'paused' | 'error';
  lastRun: string;
  successRate: number;
}

interface AIEthics {
  biasScore: number;
  transparencyScore: number;
  privacyScore: number;
  fairnessScore: number;
  lastAudit: string;
}

const AdvancedAIIntegration: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [aiModels, setAiModels] = useState<AIModel[]>([]);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [aiAutomations, setAiAutomations] = useState<AIAutomation[]>([]);
  const [aiEthics, setAiEthics] = useState<AIEthics | null>(null);

  // SSR-safe data loading
  useEffect(() => {
    const loadAIData = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API call with SSR-safe delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock AI models data
        const mockModels: AIModel[] = [
          {
            id: 'nlp-1',
            name: 'Natural Language Processor',
            type: 'nlp',
            accuracy: 94.2,
            status: 'active',
            lastUpdated: new Date().toISOString(),
            description: 'Processes natural language for task creation and analysis'
          },
          {
            id: 'ml-1',
            name: 'Productivity Predictor',
            type: 'ml',
            accuracy: 89.7,
            status: 'active',
            lastUpdated: new Date().toISOString(),
            description: 'Predicts optimal productivity patterns and energy levels'
          },
          {
            id: 'cv-1',
            name: 'Document Analyzer',
            type: 'cv',
            accuracy: 92.1,
            status: 'training',
            lastUpdated: new Date().toISOString(),
            description: 'Analyzes documents and images for content extraction'
          },
          {
            id: 'auto-1',
            name: 'Workflow Automator',
            type: 'automation',
            accuracy: 96.8,
            status: 'active',
            lastUpdated: new Date().toISOString(),
            description: 'Automates repetitive tasks and workflows'
          }
        ];

        // Mock AI insights data
        const mockInsights: AIInsight[] = [
          {
            id: 'insight-1',
            type: 'productivity',
            title: 'Peak Productivity Window',
            description: 'Your productivity peaks between 9-11 AM. Schedule your most important work during this window.',
            confidence: 0.87,
            actionable: true,
            timestamp: new Date().toISOString()
          },
          {
            id: 'insight-2',
            type: 'energy',
            title: 'Energy Pattern Analysis',
            description: 'Your energy levels drop significantly after 2 PM. Consider scheduling lighter tasks in the afternoon.',
            confidence: 0.92,
            actionable: true,
            timestamp: new Date().toISOString()
          },
          {
            id: 'insight-3',
            type: 'task',
            title: 'Task Completion Prediction',
            description: 'Tasks with deadlines are 3x more likely to be completed on time.',
            confidence: 0.78,
            actionable: true,
            timestamp: new Date().toISOString()
          }
        ];

        // Mock AI automations data
        const mockAutomations: AIAutomation[] = [
          {
            id: 'auto-1',
            name: 'Smart Task Prioritization',
            trigger: 'New task created',
            action: 'Auto-assign priority based on deadline and energy level',
            status: 'active',
            lastRun: new Date().toISOString(),
            successRate: 94.2
          },
          {
            id: 'auto-2',
            name: 'Energy-Based Scheduling',
            trigger: 'Daily planning',
            action: 'Schedule high-energy tasks during peak hours',
            status: 'active',
            lastRun: new Date().toISOString(),
            successRate: 89.7
          },
          {
            id: 'auto-3',
            name: 'Deadline Reminder',
            trigger: 'Task approaching deadline',
            action: 'Send smart reminders based on completion probability',
            status: 'paused',
            lastRun: new Date().toISOString(),
            successRate: 76.3
          }
        ];

        // Mock AI ethics data
        const mockEthics: AIEthics = {
          biasScore: 0.92,
          transparencyScore: 0.88,
          privacyScore: 0.95,
          fairnessScore: 0.90,
          lastAudit: new Date().toISOString()
        };

        setAiModels(mockModels);
        setAiInsights(mockInsights);
        setAiAutomations(mockAutomations);
        setAiEthics(mockEthics);

        toast.success('AI Integration data loaded successfully!');
      } catch (error) {
        console.error('Failed to load AI data:', error);
        toast.error('Failed to load AI integration data');
      } finally {
        setIsLoading(false);
      }
    };

    loadAIData();
  }, []);

  const handleModelToggle = useCallback((modelId: string) => {
    setAiModels(prev => prev.map(model => 
      model.id === modelId 
        ? { ...model, status: model.status === 'active' ? 'offline' : 'active' }
        : model
    ));
    toast.success('AI model status updated');
  }, []);

  const handleAutomationToggle = useCallback((automationId: string) => {
    setAiAutomations(prev => prev.map(auto => 
      auto.id === automationId 
        ? { ...auto, status: auto.status === 'active' ? 'paused' : 'active' }
        : auto
    ));
    toast.success('Automation status updated');
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart2 },
    { id: 'models', label: 'AI Models', icon: Brain },
    { id: 'insights', label: 'Insights', icon: Lightbulb },
    { id: 'automation', label: 'Automation', icon: Zap },
    { id: 'ethics', label: 'AI Ethics', icon: ShieldCheck }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'training': return 'text-blue-600 bg-blue-100';
      case 'paused': return 'text-yellow-600 bg-yellow-100';
      case 'offline': return 'text-gray-600 bg-gray-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'nlp': return MessageSquare;
      case 'ml': return TrendingUp;
      case 'cv': return Eye;
      case 'automation': return Zap;
      default: return Brain;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Advanced AI & Machine Learning Integration</h2>
                <p className="text-purple-100">Intelligent automation and insights powered by AI</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mt-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-white bg-opacity-20 text-white'
                      : 'text-purple-100 hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 h-full overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100">Active AI Models</p>
                          <p className="text-3xl font-bold">{aiModels.filter(m => m.status === 'active').length}</p>
                        </div>
                        <Brain className="w-8 h-8 text-blue-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-100">AI Insights</p>
                          <p className="text-3xl font-bold">{aiInsights.length}</p>
                        </div>
                        <Lightbulb className="w-8 h-8 text-green-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-100">Automations</p>
                          <p className="text-3xl font-bold">{aiAutomations.filter(a => a.status === 'active').length}</p>
                        </div>
                        <Zap className="w-8 h-8 text-purple-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-orange-100">Avg Accuracy</p>
                          <p className="text-3xl font-bold">
                            {aiModels.length > 0 
                              ? (aiModels.reduce((sum, m) => sum + m.accuracy, 0) / aiModels.length).toFixed(1)
                              : '0'
                            }%
                          </p>
                        </div>
                        <Target className="w-8 h-8 text-orange-200" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">AI Model Performance</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={aiModels.map(model => ({
                          name: model.name.split(' ')[0],
                          accuracy: model.accuracy
                        }))}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="accuracy" stroke="#8b5cf6" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">AI Ethics Score</h3>
                      {aiEthics && (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span>Bias Score</span>
                            <span className="font-semibold">{(aiEthics.biasScore * 100).toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${aiEthics.biasScore * 100}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Transparency</span>
                            <span className="font-semibold">{(aiEthics.transparencyScore * 100).toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${aiEthics.transparencyScore * 100}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Privacy</span>
                            <span className="font-semibold">{(aiEthics.privacyScore * 100).toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-purple-500 h-2 rounded-full" 
                              style={{ width: `${aiEthics.privacyScore * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'models' && (
                <motion.div
                  key="models"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {aiModels.map((model) => {
                      const TypeIcon = getTypeIcon(model.type);
                      return (
                        <div key={model.id} className="bg-white border border-gray-200 rounded-xl p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-purple-100 rounded-lg">
                                <TypeIcon className="w-5 h-5 text-purple-600" />
                              </div>
                              <div>
                                <h3 className="font-semibold">{model.name}</h3>
                                <p className="text-sm text-gray-600">{model.type.toUpperCase()}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => handleModelToggle(model.id)}
                              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(model.status)}`}
                            >
                              {model.status}
                            </button>
                          </div>
                          <p className="text-gray-600 mb-4">{model.description}</p>
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-sm text-gray-500">Accuracy</span>
                              <p className="font-semibold">{model.accuracy}%</p>
                            </div>
                            <div>
                              <span className="text-sm text-gray-500">Last Updated</span>
                              <p className="font-semibold text-sm">
                                {new Date(model.lastUpdated).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {activeTab === 'insights' && (
                <motion.div
                  key="insights"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {aiInsights.map((insight) => (
                    <div key={insight.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Lightbulb className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{insight.title}</h3>
                            <p className="text-sm text-gray-600 capitalize">{insight.type} Insight</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">Confidence</span>
                          <span className="font-semibold">{(insight.confidence * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{insight.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {insight.actionable && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              Actionable
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(insight.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'automation' && (
                <motion.div
                  key="automation"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {aiAutomations.map((automation) => (
                    <div key={automation.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <Zap className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{automation.name}</h3>
                            <p className="text-sm text-gray-600">Automation Rule</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleAutomationToggle(automation.id)}
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(automation.status)}`}
                        >
                          {automation.status}
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Trigger</span>
                          <p className="font-medium">{automation.trigger}</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Action</span>
                          <p className="font-medium">{automation.action}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-gray-500">Success Rate</span>
                          <p className="font-semibold">{automation.successRate}%</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Last Run</span>
                          <p className="font-semibold text-sm">
                            {new Date(automation.lastRun).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'ethics' && (
                <motion.div
                  key="ethics"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {aiEthics && (
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <ShieldCheck className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">AI Ethics Dashboard</h3>
                          <p className="text-sm text-gray-600">Comprehensive AI ethics monitoring</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">Bias Score</span>
                              <span className="font-semibold">{(aiEthics.biasScore * 100).toFixed(1)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div 
                                className="bg-green-500 h-3 rounded-full transition-all duration-300" 
                                style={{ width: `${aiEthics.biasScore * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">Transparency</span>
                              <span className="font-semibold">{(aiEthics.transparencyScore * 100).toFixed(1)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div 
                                className="bg-blue-500 h-3 rounded-full transition-all duration-300" 
                                style={{ width: `${aiEthics.transparencyScore * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">Privacy</span>
                              <span className="font-semibold">{(aiEthics.privacyScore * 100).toFixed(1)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div 
                                className="bg-purple-500 h-3 rounded-full transition-all duration-300" 
                                style={{ width: `${aiEthics.privacyScore * 100}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">Fairness</span>
                              <span className="font-semibold">{(aiEthics.fairnessScore * 100).toFixed(1)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div 
                                className="bg-orange-500 h-3 rounded-full transition-all duration-300" 
                                style={{ width: `${aiEthics.fairnessScore * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Last Ethics Audit</span>
                          <span className="font-semibold text-sm">
                            {new Date(aiEthics.lastAudit).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AdvancedAIIntegration;