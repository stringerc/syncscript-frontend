import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Brain, Cpu, Database, Server, Cloud, Zap, Shield, Activity, TrendingUp, Target, Calendar, DollarSign, Building, Phone, Mail, MessageCircle, FileText, Award, Clock, CheckCircle, AlertTriangle, Plus, Edit, Trash2, Save, Copy, ExternalLink, ArrowUp, ArrowDown, ArrowRight, ArrowLeft, Star, Activity as ActivityIcon, MapPin, Share2, Video, Briefcase, PieChart, LineChart, Brain as BrainIcon, Cpu as CpuIcon, Database as DatabaseIcon, Server as ServerIcon, Cloud as CloudIcon, Wifi, Signal, Battery, WifiOff, Eye, EyeOff, Lock, Unlock, Key, Settings, Bell, Filter, Search, Download, Upload, RefreshCw, Monitor, Smartphone, Tablet, Laptop, Globe, Map, Flag, Building2, Home, Work, School, Coffee, Gamepad2, Music, Book, Code, Paintbrush, Calculator, Lightbulb, Target as TargetIcon, TrendingDown, Zap as ZapIcon, Shield as ShieldIcon, Star as StarIcon, Heart, ThumbsUp, ThumbsDown, Smile, Frown, Meh, UserCheck, UserX, UserPlus, UserMinus, UserCog, UserSettings, UserStar, UserHeart, UserShield, UserZap, UserTarget, UserTrendingUp, UserTrendingDown, UserActivity, UserMonitor, UserSmartphone, UserTablet, UserLaptop, UserGlobe, UserMap, UserFlag, UserBuilding, UserHome, UserWork, UserSchool, UserCoffee, UserGamepad, UserMusic, UserBook, UserCode, UserPaintbrush, UserCalculator, UserLightbulb, UserBell, UserFilter, UserSearch, UserDownload, UserUpload, UserRefresh, UserSettings as UserSettingsIcon, UserCog as UserCogIcon, UserStar as UserStarIcon, UserHeart as UserHeartIcon, UserShield as UserShieldIcon, UserZap as UserZapIcon, UserTarget as UserTargetIcon, UserTrendingUp as UserTrendingUpIcon, UserTrendingDown as UserTrendingDownIcon, UserActivity as UserActivityIcon, UserMonitor as UserMonitorIcon, UserSmartphone as UserSmartphoneIcon, UserTablet as UserTabletIcon, UserLaptop as UserLaptopIcon, UserGlobe as UserGlobeIcon, UserMap as UserMapIcon, UserFlag as UserFlagIcon, UserBuilding as UserBuildingIcon, UserHome as UserHomeIcon, UserWork as UserWorkIcon, UserSchool as UserSchoolIcon, UserCoffee as UserCoffeeIcon, UserGamepad as UserGamepadIcon, UserMusic as UserMusicIcon, UserBook as UserBookIcon, UserCode as UserCodeIcon, UserPaintbrush as UserPaintbrushIcon, UserCalculator as UserCalculatorIcon, UserLightbulb as UserLightbulbIcon, UserBell as UserBellIcon, UserFilter as UserFilterIcon, UserSearch as UserSearchIcon, UserDownload as UserDownloadIcon, UserUpload as UserUploadIcon, UserRefresh as UserRefreshIcon, Bot, Network, Microscope, Layers, GitBranch, GitCommit, GitMerge, GitPullRequest, GitCompare, GitBranchPlus, GitCommitHorizontal, GitMergeVertical, GitPullRequestArrow, GitCompareArrows } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, AreaChart, Area, ScatterChart, Scatter, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ComposedChart, ReferenceLine, Legend } from 'recharts';
import { toast } from 'react-hot-toast';

// Advanced AI & Machine Learning interfaces
interface MLModel {
  id: string;
  name: string;
  type: 'classification' | 'regression' | 'clustering' | 'recommendation' | 'nlp' | 'computer_vision' | 'timeseries' | 'reinforcement';
  category: 'predictive' | 'analytical' | 'recommendation' | 'automation';
  status: 'training' | 'active' | 'paused' | 'error' | 'deployed';
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  lastTrained: string;
  trainingData: string;
  features: string[];
  hyperparameters: Record<string, any>;
  performance: ModelPerformance;
  deployment: ModelDeployment;
  createdAt: string;
}

interface ModelPerformance {
  trainingAccuracy: number;
  validationAccuracy: number;
  testAccuracy: number;
  trainingLoss: number;
  validationLoss: number;
  confusionMatrix: number[][];
  rocCurve: { fpr: number; tpr: number }[];
  featureImportance: { feature: string; importance: number }[];
}

interface ModelDeployment {
  environment: 'development' | 'staging' | 'production';
  endpoint: string;
  version: string;
  replicas: number;
  resources: {
    cpu: string;
    memory: string;
    gpu: string;
  };
  monitoring: boolean;
  autoScaling: boolean;
}

interface AIGeneratedInsight {
  id: string;
  title: string;
  category: 'prediction' | 'recommendation' | 'anomaly' | 'pattern' | 'optimization';
  description: string;
  confidence: number;
  impact: 'low' | 'medium' | 'high' | 'critical';
  priority: 'low' | 'medium' | 'high';
  status: 'new' | 'validating' | 'implemented' | 'dismissed';
  dataSource: string[];
  models: string[];
  recommendations: string[];
  tags: string[];
  createdAt: string;
}

interface NaturalLanguageProcessing {
  id: string;
  name: string;
  type: 'sentiment' | 'classification' | 'extraction' | 'summarization' | 'translation' | 'generation';
  status: 'active' | 'processing' | 'error';
  language: string;
  model: string;
  accuracy: number;
  inputText: string;
  output: NLPOutput;
  processingTime: number;
  createdAt: string;
}

interface NLPOutput {
  sentiment?: {
    label: string;
    score: number;
  };
  entities?: { text: string; label: string; confidence: number }[];
  categories?: { category: string; confidence: number }[];
  summary?: string;
  translation?: string;
  generatedText?: string;
}

interface PersonalizationEngine {
  id: string;
  userId: string;
  strategy: 'collaborative' | 'content_based' | 'hybrid' | 'demographic';
  preferences: UserPreferences;
  recommendations: Recommendation[];
  performance: PersonalizationPerformance;
  lastUpdated: string;
  createdAt: string;
}

interface UserPreferences {
  categories: string[];
  interests: string[];
  behavior: Record<string, number>;
  demographics: Record<string, string>;
  interactions: UserInteraction[];
}

interface UserInteraction {
  type: string;
  item: string;
  rating: number;
  timestamp: string;
}

interface Recommendation {
  itemId: string;
  itemType: string;
  score: number;
  reason: string;
  category: string;
}

interface PersonalizationPerformance {
  clickThroughRate: number;
  conversionRate: number;
  engagementScore: number;
  satisfactionScore: number;
  diversityScore: number;
}

interface AutoMLPipeline {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'running' | 'completed' | 'failed' | 'paused';
  dataSource: string;
  targetColumn: string;
  problemType: 'classification' | 'regression' | 'time_series';
  algorithms: string[];
  evaluation: AutoMLEvaluation;
  bestModel?: string;
  createdAt: string;
}

interface AutoMLEvaluation {
  crossValidationScore: number;
  testScore: number;
  featureImportance: { feature: string; importance: number }[];
  modelComparison: ModelComparison[];
  recommendations: string[];
}

interface ModelComparison {
  algorithm: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  trainingTime: number;
}

interface AIEthics {
  id: string;
  principle: string;
  description: string;
  compliance: boolean;
  assessment: EthicsAssessment;
  actions: EthicsAction[];
  lastAudit: string;
  createdAt: string;
}

interface EthicsAssessment {
  fairness: number;
  transparency: number;
  privacy: number;
  accountability: number;
  overall: number;
  issues: string[];
  recommendations: string[];
}

interface EthicsAction {
  action: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
}

interface PredictiveModel {
  id: string;
  name: string;
  description: string;
  type: 'forecasting' | 'classification' | 'regression' | 'anomaly_detection';
  target: string;
  features: string[];
  status: 'training' | 'active' | 'retired';
  accuracy: number;
  predictions: Prediction[];
  performance: PredictivePerformance;
  createdAt: string;
}

interface Prediction {
  id: string;
  input: Record<string, any>;
  output: any;
  confidence: number;
  timestamp: string;
}

interface PredictivePerformance {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  mae: number;
  mse: number;
  rmse: number;
}

interface RecommendationSystem {
  id: string;
  name: string;
  type: 'collaborative' | 'content_based' | 'hybrid' | 'contextual';
  status: 'active' | 'training' | 'retired';
  performance: RecommendationPerformance;
  algorithms: RecommendationAlgorithm[];
  users: number;
  items: number;
  interactions: number;
  lastUpdated: string;
  createdAt: string;
}

interface RecommendationPerformance {
  precisionAtK: number;
  recallAtK: number;
  ndcg: number;
  diversity: number;
  novelty: number;
  coverage: number;
}

interface RecommendationAlgorithm {
  name: string;
  weight: number;
  performance: {
    precision: number;
    recall: number;
    ndcg: number;
  };
}

interface ComputerVision {
  id: string;
  name: string;
  task: 'classification' | 'detection' | 'segmentation' | 'recognition' | 'generation';
  status: 'training' | 'active' | 'error';
  model: string;
  accuracy: number;
  dataset: string;
  classes: string[];
  performance: CVPerformance;
  createdAt: string;
}

interface CVPerformance {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  iou: number;
  map: number;
}

interface AITrainingPipeline {
  id: string;
  name: string;
  description: string;
  status: 'scheduled' | 'running' | 'completed' | 'failed' | 'cancelled';
  modelType: string;
  dataset: string;
  configuration: TrainingConfiguration;
  progress: TrainingProgress;
  metrics: TrainingMetrics;
  createdAt: string;
}

interface TrainingConfiguration {
  epochs: number;
  batchSize: number;
  learningRate: number;
  optimizer: string;
  lossFunction: string;
  regularization: Record<string, any>;
}

interface TrainingProgress {
  currentEpoch: number;
  totalEpochs: number;
  currentBatch: number;
  totalBatches: number;
  estimatedTimeRemaining: number;
}

interface TrainingMetrics {
  trainingLoss: number[];
  validationLoss: number[];
  trainingAccuracy: number[];
  validationAccuracy: number[];
  learningRate: number[];
}

interface AIMonitoring {
  id: string;
  modelId: string;
  metric: string;
  value: number;
  threshold: number;
  status: 'healthy' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  alerts: Alert[];
  lastUpdated: string;
}

interface Alert {
  id: string;
  type: 'performance' | 'drift' | 'bias' | 'availability';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: string;
  resolved: boolean;
}

const AdvancedAIMachineLearning: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [mlModels, setMlModels] = useState<MLModel[]>([]);
  const [aiInsights, setAiInsights] = useState<AIGeneratedInsight[]>([]);
  const [nlp, setNlp] = useState<NaturalLanguageProcessing[]>([]);
  const [personalization, setPersonalization] = useState<PersonalizationEngine[]>([]);
  const [autoML, setAutoML] = useState<AutoMLPipeline[]>([]);
  const [aiEthics, setAiEthics] = useState<AIEthics[]>([]);
  const [predictiveModels, setPredictiveModels] = useState<PredictiveModel[]>([]);
  const [recommendationSystems, setRecommendationSystems] = useState<RecommendationSystem[]>([]);
  const [computerVision, setComputerVision] = useState<ComputerVision[]>([]);
  const [trainingPipelines, setTrainingPipelines] = useState<AITrainingPipeline[]>([]);
  const [aiMonitoring, setAiMonitoring] = useState<AIMonitoring[]>([]);

  // SSR-safe data loading
  useEffect(() => {
    const loadAIMLData = async () => {
      setIsLoading(true);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock ML models
        const mockMLModels: MLModel[] = [
          {
            id: 'model-1',
            name: 'Customer Churn Predictor',
            type: 'classification',
            category: 'predictive',
            status: 'active',
            accuracy: 0.94,
            precision: 0.91,
            recall: 0.88,
            f1Score: 0.89,
            lastTrained: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            trainingData: 'customer_behavior_dataset_v2',
            features: ['usage_frequency', 'support_tickets', 'payment_history', 'engagement_score'],
            hyperparameters: {
              learningRate: 0.001,
              batchSize: 32,
              epochs: 100,
              optimizer: 'adam'
            },
            performance: {
              trainingAccuracy: 0.96,
              validationAccuracy: 0.94,
              testAccuracy: 0.93,
              trainingLoss: 0.12,
              validationLoss: 0.18,
              confusionMatrix: [[85, 8], [7, 147]],
              rocCurve: [],
              featureImportance: [
                { feature: 'usage_frequency', importance: 0.35 },
                { feature: 'engagement_score', importance: 0.28 },
                { feature: 'support_tickets', importance: 0.22 },
                { feature: 'payment_history', importance: 0.15 }
              ]
            },
            deployment: {
              environment: 'production',
              endpoint: 'https://api.syncscript.app/ml/churn-predictor',
              version: 'v2.1.0',
              replicas: 3,
              resources: {
                cpu: '2 cores',
                memory: '4GB',
                gpu: 'none'
              },
              monitoring: true,
              autoScaling: true
            },
            createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 'model-2',
            name: 'Revenue Forecasting Model',
            type: 'timeseries',
            category: 'predictive',
            status: 'active',
            accuracy: 0.87,
            precision: 0.85,
            recall: 0.89,
            f1Score: 0.87,
            lastTrained: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
            trainingData: 'revenue_time_series_dataset',
            features: ['seasonal_patterns', 'market_trends', 'customer_growth', 'product_launches'],
            hyperparameters: {
              sequenceLength: 12,
              hiddenUnits: 128,
              dropout: 0.2,
              epochs: 200
            },
            performance: {
              trainingAccuracy: 0.89,
              validationAccuracy: 0.87,
              testAccuracy: 0.86,
              trainingLoss: 0.08,
              validationLoss: 0.12,
              confusionMatrix: [],
              rocCurve: [],
              featureImportance: [
                { feature: 'customer_growth', importance: 0.42 },
                { feature: 'seasonal_patterns', importance: 0.31 },
                { feature: 'market_trends', importance: 0.18 },
                { feature: 'product_launches', importance: 0.09 }
              ]
            },
            deployment: {
              environment: 'production',
              endpoint: 'https://api.syncscript.app/ml/revenue-forecast',
              version: 'v1.8.2',
              replicas: 2,
              resources: {
                cpu: '4 cores',
                memory: '8GB',
                gpu: 'none'
              },
              monitoring: true,
              autoScaling: false
            },
            createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock AI insights
        const mockAIInsights: AIGeneratedInsight[] = [
          {
            id: 'insight-1',
            title: 'Customer Segmentation Insights',
            category: 'pattern',
            description: 'AI analysis identified 4 distinct customer segments with different engagement patterns and churn risks.',
            confidence: 94,
            impact: 'high',
            priority: 'high',
            status: 'new',
            dataSource: ['customer_behavior', 'usage_analytics', 'transaction_history'],
            models: ['Customer Churn Predictor', 'Behavior Clustering Model'],
            recommendations: [
              'Implement targeted campaigns for high-value segments',
              'Adjust retention strategies for at-risk segments',
              'Optimize onboarding for new customer patterns'
            ],
            tags: ['segmentation', 'clustering', 'customer_behavior'],
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 'insight-2',
            title: 'Feature Usage Optimization',
            category: 'recommendation',
            description: 'ML analysis suggests that customers who complete onboarding steps 3-5 have 73% higher retention rates.',
            confidence: 89,
            impact: 'medium',
            priority: 'medium',
            status: 'validating',
            dataSource: ['feature_usage', 'onboarding_analytics', 'retention_metrics'],
            models: ['Onboarding Optimization Model'],
            recommendations: [
              'Redesign onboarding flow to emphasize steps 3-5',
              'Add progress indicators and gamification',
              'Create automated nudges for incomplete steps'
            ],
            tags: ['onboarding', 'optimization', 'retention'],
            createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock NLP
        const mockNLP: NaturalLanguageProcessing[] = [
          {
            id: 'nlp-1',
            name: 'Customer Sentiment Analysis',
            type: 'sentiment',
            status: 'active',
            language: 'en',
            model: 'BERT-base-sentiment',
            accuracy: 0.92,
            inputText: 'I love the new features but the UI could be better',
            output: {
              sentiment: {
                label: 'mixed',
                score: 0.68
              },
              entities: [],
              categories: [
                { category: 'positive_feedback', confidence: 0.76 },
                { category: 'improvement_request', confidence: 0.82 }
              ]
            },
            processingTime: 0.15,
            createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock AI ethics
        const mockAIEthics: AIEthics[] = [
          {
            id: 'ethics-1',
            principle: 'Algorithmic Fairness',
            description: 'Ensure ML models do not discriminate based on protected attributes',
            compliance: true,
            assessment: {
              fairness: 95,
              transparency: 88,
              privacy: 92,
              accountability: 90,
              overall: 91,
              issues: [],
              recommendations: [
                'Continue regular bias testing',
                'Implement fairness metrics monitoring'
              ]
            },
            actions: [
              {
                action: 'Monthly bias audit',
                status: 'completed',
                priority: 'high',
                dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
              }
            ],
            lastAudit: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];

        // Mock AI monitoring
        const mockAIMonitoring: AIMonitoring[] = [
          {
            id: 'monitor-1',
            modelId: 'model-1',
            metric: 'accuracy',
            value: 0.94,
            threshold: 0.85,
            status: 'healthy',
            trend: 'stable',
            alerts: [],
            lastUpdated: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
          },
          {
            id: 'monitor-2',
            modelId: 'model-2',
            metric: 'response_time',
            value: 0.45,
            threshold: 1.0,
            status: 'healthy',
            trend: 'down',
            alerts: [],
            lastUpdated: new Date(Date.now() - 30 * 60 * 1000).toISOString()
          }
        ];

        setMlModels(mockMLModels);
        setAiInsights(mockAIInsights);
        setNlp(mockNLP);
        setAiEthics(mockAIEthics);
        setAiMonitoring(mockAIMonitoring);

        toast.success('Advanced AI & ML data loaded successfully!');
      } catch (error) {
        console.error('Failed to load AI ML data:', error);
        toast.error('Failed to load advanced AI & ML data');
      } finally {
        setIsLoading(false);
      }
    };

    loadAIMLData();
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Brain },
    { id: 'models', label: 'Models', icon: Cpu },
    { id: 'insights', label: 'Insights', icon: Lightbulb },
    { id: 'nlp', label: 'NLP', icon: MessageCircle },
    { id: 'personalization', label: 'Personalization', icon: UserSettings },
    { id: 'automl', label: 'AutoML', icon: Zap },
    { id: 'ethics', label: 'Ethics', icon: Shield },
    { id: 'predictions', label: 'Predictions', icon: TrendingUp },
    { id: 'recommendations', label: 'Recommendations', icon: Target },
    { id: 'cv', label: 'Computer Vision', icon: Eye },
    { id: 'training', label: 'Training', icon: GitBranch },
    { id: 'monitoring', label: 'Monitoring', icon: Activity }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'training': return 'text-blue-600 bg-blue-100';
      case 'paused': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      case 'deployed': return 'text-purple-600 bg-purple-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'failed': return 'text-red-600 bg-red-100';
      case 'running': return 'text-blue-600 bg-blue-100';
      case 'healthy': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      case 'new': return 'text-blue-600 bg-blue-100';
      case 'validating': return 'text-yellow-600 bg-yellow-100';
      case 'implemented': return 'text-green-600 bg-green-100';
      case 'dismissed': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-gray-600';
      default: return 'text-gray-600';
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
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Advanced AI & ML</h2>
                <p className="text-purple-100">Machine learning models and AI-powered insights</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="text-sm">Active</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mt-6 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
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
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
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
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-100">ML Models</p>
                          <p className="text-3xl font-bold">{mlModels.length}</p>
                        </div>
                        <Cpu className="w-8 h-8 text-purple-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100">AI Insights</p>
                          <p className="text-3xl font-bold">{aiInsights.length}</p>
                        </div>
                        <Lightbulb className="w-8 h-8 text-blue-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-100">NLP Tasks</p>
                          <p className="text-3xl font-bold">{nlp.length}</p>
                        </div>
                        <MessageCircle className="w-8 h-8 text-green-200" />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-orange-100">Monitoring</p>
                          <p className="text-3xl font-bold">{aiMonitoring.length}</p>
                        </div>
                        <Activity className="w-8 h-8 text-orange-200" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">Model Performance Overview</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <RechartsBarChart data={mlModels.map(model => ({
                          name: model.name.split(' ')[0],
                          accuracy: model.accuracy * 100,
                          precision: model.precision * 100,
                          recall: model.recall * 100
                        }))}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="accuracy" fill="#8b5cf6" />
                          <Bar dataKey="precision" fill="#3b82f6" />
                          <Bar dataKey="recall" fill="#10b981" />
                        </RechartsBarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">AI Insights by Category</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <RechartsPieChart>
                          <Pie
                            data={[
                              { name: 'Prediction', value: aiInsights.filter(i => i.category === 'prediction').length },
                              { name: 'Recommendation', value: aiInsights.filter(i => i.category === 'recommendation').length },
                              { name: 'Anomaly', value: aiInsights.filter(i => i.category === 'anomaly').length },
                              { name: 'Pattern', value: aiInsights.filter(i => i.category === 'pattern').length },
                              { name: 'Optimization', value: aiInsights.filter(i => i.category === 'optimization').length }
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${((percent as number) * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            <Cell fill="#8b5cf6" />
                            <Cell fill="#3b82f6" />
                            <Cell fill="#ef4444" />
                            <Cell fill="#f59e0b" />
                            <Cell fill="#10b981" />
                          </Pie>
                          <Tooltip />
                        </RechartsPieChart>
                      </ResponsiveContainer>
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
                  {mlModels.map((model) => (
                    <div key={model.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <Cpu className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{model.name}</h3>
                            <p className="text-sm text-gray-600">{model.type} • {model.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(model.status)}`}>
                            {model.status}
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                            {model.deployment.environment}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <span className="text-sm text-gray-500">Accuracy</span>
                          <p className="font-semibold">{(model.accuracy * 100).toFixed(1)}%</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Precision</span>
                          <p className="font-semibold">{(model.precision * 100).toFixed(1)}%</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Recall</span>
                          <p className="font-semibold">{(model.recall * 100).toFixed(1)}%</p>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Last Trained</span>
                          <p className="font-semibold text-sm">
                            {new Date(model.lastTrained).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="mb-4">
                        <span className="text-sm text-gray-500">Features:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {model.features.map((feature, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mb-4">
                        <span className="text-sm text-gray-500">Top Feature Importance:</span>
                        <div className="space-y-2 mt-2">
                          {model.performance.featureImportance.slice(0, 3).map((feature, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-sm">{feature.feature}</span>
                              <div className="flex items-center space-x-2">
                                <div className="w-20 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-purple-500 h-2 rounded-full" 
                                    style={{ width: `${feature.importance * 100}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm text-gray-600">{(feature.importance * 100).toFixed(1)}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                          View Details
                        </button>
                        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                          Retrain
                        </button>
                        <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                          Deploy
                        </button>
                      </div>
                    </div>
                  ))}
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
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Lightbulb className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{insight.title}</h3>
                            <p className="text-sm text-gray-600">{insight.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(insight.status)}`}>
                            {insight.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getImpactColor(insight.impact)}`}>
                            {insight.impact} impact
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded">
                            {insight.confidence}% confidence
                          </span>
                        </div>
                      </div>
                      <div className="mb-4">
                        <span className="text-sm text-gray-500">Description:</span>
                        <p className="text-gray-700">{insight.description}</p>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Recommendations:</h4>
                        <div className="flex flex-wrap gap-2">
                          {insight.recommendations.map((recommendation, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                              {recommendation}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Models Used:</h4>
                        <div className="flex flex-wrap gap-2">
                          {insight.models.map((model, index) => (
                            <span key={index} className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                              {model}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <h4 className="font-medium">Tags:</h4>
                        <div className="flex flex-wrap gap-2">
                          {insight.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                          Validate
                        </button>
                        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                          Implement
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'monitoring' && (
                <motion.div
                  key="monitoring"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {aiMonitoring.map((monitor) => {
                    const model = mlModels.find(m => m.id === monitor.modelId);
                    return (
                      <div key={monitor.id} className="bg-white border border-gray-200 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                              <Activity className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{model?.name || 'Unknown Model'}</h3>
                              <p className="text-sm text-gray-600">{monitor.metric}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(monitor.status)}`}>
                              {monitor.status}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-sm font-medium ${getTrendColor(monitor.trend)}`}>
                              {monitor.trend === 'up' ? '↗' : monitor.trend === 'down' ? '↘' : '→'}
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <span className="text-sm text-gray-500">Current Value</span>
                            <p className="font-semibold">{monitor.value.toFixed(3)}</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Threshold</span>
                            <p className="font-semibold">{monitor.threshold.toFixed(3)}</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Last Updated</span>
                            <p className="font-semibold text-sm">
                              {new Date(monitor.lastUpdated).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        {monitor.alerts.length > 0 && (
                          <div className="mb-4">
                            <h4 className="font-medium mb-2">Active Alerts:</h4>
                            <div className="space-y-2">
                              {monitor.alerts.map((alert, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-red-50 rounded">
                                  <div>
                                    <p className="text-sm font-medium">{alert.message}</p>
                                    <p className="text-xs text-gray-600">{alert.type} • {alert.severity}</p>
                                  </div>
                                  <span className="text-xs text-gray-500">
                                    {new Date(alert.timestamp).toLocaleString()}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AdvancedAIMachineLearning;