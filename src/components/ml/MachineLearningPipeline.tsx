// **
 * Machine Learning Pipeline Component
 * 
 * Comprehensive UI for ML pipeline management, model training,
 * feature engineering, and anomaly detection.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence     } from 'framer-motion';
import { Brain, BarChart3, Settings, Play, Pause, RotateCcw, AlertTriangle,
  TrendingUp, Activity, Database, Zap, CheckCircle, XCircle, Clock,
  Eye, Download, Upload, Filter, Target, Users, Layers, Cpu     } from 'lucide-react';
import { getMachineLearningPipelineManager } from '../../utils/machineLearningPipelineManager';

// ==================== TYPE DEFINITIONS = ===================

interface ModelState {
    id: string,
    name: string,
  type: string,
    algorithm: string,
   status: string,
    accuracy?: number,
  createdAt: Date,
    interface TrainingJobState {id: string,
    modelId: string,
  status: string,
    progress: number,
    startTime?: Date;
    results?: any
  












}
interface FeatureSetState {
    id: string,
    name: string,
  description: string,
    stats: any,
interface AnomalyState {id: string,
    timestamp: Date,
  feature: string,
    anomalyScore: number,
    severity: string,
    description: string












}
        interface MLMetricsState {
    totalModels: number,
    activeModels: number,
   trainingJobs: number,
    averageAccuracy: number,
    anomalyDetections: number;
    // ==================== MAIN COMPONENT = ===================

const MachineLearningPipeline: React.FC = () => {;
    ;
;
    const [activeTab;
    setActiveTab] = useState<'models' | 'training' | 'features' | 'anomalies' | 'config'>('models'
  












}
  const [ mlManager, setMlManager    ] = useState<any >(null
  }
  const [models, setModels] = useState<ModelState []>([]
  }
  const [trainingJobs, setTrainingJobs] = useState<TrainingJobState []>([]
  }
  const [featureSets, setFeatureSets] = useState<FeatureSetState []>([]
  }
  const [anomalies, setAnomalies] = useState<AnomalyState []>([]
  }
  const [metrics, setMetrics] = useState<MLMetricsState | null>(null
  }
  const [isLoading, setIsLoading] = useState(false
  }
  const [selectedModel, setSelectedModel] = useState<string | null>(null
  }
  // Initialize ML Manager
  useEffect(() => {
    const manager = getMachineLearningPipelineManager(}
    setMlManager(manager
  }
    loadAllData(
  }
  // ==================== DATA LOADING ====================

 ;
    const loadAllData = async, () => { if (!mlManager) return }
    try {
      setIsLoading(true
  }
      await Promise.all([
       ; loadModels(), loadTrainingJobs(), loadFeatureSets(); loadAnomalies(); loadMetrics();
      ]
  }
      console.error('Failed to load ML pipeline data: ', error
  }
      setIsLoading(false; const loadModels = async () => { if (!mlManager) return }
    try {
      const mlModels = mlManager.getAllModels({
  }
      setModels(mlModels.map((model: any => ({id: model.id, name: model.name, type: model.type, algorithm: model.algorithm, status: model.status, accuracy: model.accuracy, createdAt: model.createdAt)), console.error('Failed to load models: ', error; const loadTrainingJobs = async () => { if (!mlManager) return }
    try {
      const jobs = mlManager.getTrainingJobs({
  }
      setTrainingJobs(jobs.map((job: any => ({id: job.id, modelId: job.modelId, status: job.status, progress: job.progress, startTime: job.startTime, results: job.results)), console.error('Failed to load training jobs: ', error; const loadFeatureSets = async () => { if (!mlManager) return }
    try {
      const featureSets = mlManager.getFeatureSets({
  }
      setFeatureSets(featureSets.map((set: any => ({id: set.id, name: set.name, description: set.description, stats: set.stats)), console.error('Failed to load feature sets: ', error; const loadAnomalies = async () => { if (!mlManager) return }
    try {
      const userAnomalies = mlManager.getUserAnomalies({'current-user'
  }
      setAnomalies(userAnomalies.map((anomaly: any => ({id: anomaly.id, timestamp: anomaly.timestamp, feature: anomaly.feature, anomalyScore: anomaly.anomalyScore, severity: anomaly.severity, description: anomaly.description)), console.error('Failed to load anomalies: ', error; const loadMetrics = async () => { if (!mlManager) return }
    try {
      const mlMetrics = mlManager.getMetrics(}
      setMetrics({totalModels: mlMetrics.totalModels, activeModels: mlMetrics.activeModels, trainingJobs: mlMetrics.trainingJobs, averageAccuracy: mlMetrics.averageAccuracy, anomalyDetections: mlMetrics.anomalyDetections;
      ; console.error('Failed to load metrics: ', error;
  // ==================== ML OPERATIONS = ===================

  const startTraining = async (modelId: string) => {
    if (!mlManager ||; isLoading) return, setIsLoading(true
  }
    try {
        await mlManager.startTrainingJob(modelId; {
        epochs: 100,
    batchSize: 32,
   learningRate: 0.001,
    validationSplit: 0.2,
    await loadTrainingJobs(
  
    
    
    
    
    
    
    
    
    
    
    
    
    }
      await loadModels(
  }
      console.error('Failed to start training: ', error
  }
      setIsLoading(false; const makePrediction = async (modelId: string) => {
    if (!mlManager ||; isLoading) return, setIsLoading({true
  }
    try {
        // Mock feature data for prediction
      const mockFeatures = {
        task_duration: Math.random(* 120 + 30, energy_level: Math.random() * 10 + 1, time_of_day: new Date().getHours(), day_of_week: new Date().getDay(), previous_productivity: Math.random() * 100, const prediction = await mlManager.makePrediction(modelId;
        mockFeatures
  
    
    
    
    
    
    
    
    
    
    
    
    
    }
      // 'Prediction result: ', prediction
      
      // You could show the prediction in a modal or notification here
      
    } catch (error) {console.error('Failed to make prediction: ', error; setIsLoading(false; const detectAnomalies = async () => { if (!mlManager ||; isLoading) return }
    setIsLoading(true
  }
    try {
        // Mock data for anomaly detection
      const mockData = Array.from({ length: 10 , (_; i) => ({
        energy_level: Math.random() * 10 + 1,
    task_completion_rate: Math.random(), break_frequency: Math.random() * 5,
    focus_duration: Math.random() * 120 + 30);
        ;
        ;
         
    
    
    
    
    
    
    
    
    
    
    
    
    }, await mlManager.detectAnomalies('current-user'; mockData
  }
      await loadAnomalies(
  }
      await loadMetrics(
  }
      console.error('Failed to detect anomalies: ', error; setIsLoading(false;
  // ==================== RENDER HELPERS = ===================

  const getStatusIcon = (status: string) => {switch (status) {
    case 'ready':, case 'completed':, return <CheckCircle className="w-4 h-4 text-green-500" />, case 'training':
      case 'running':
        return <Clock className="w-4 h-4 text-yellow-500 animate-pulse"  />;
} case 'failed':
        return <XCircle className = "w-4 h-4 text-red-500" />, default: return <Activity className="w-4 h-4 text-gray-500" />,
    const getSeverityColor = (severity: string) => {switch (severity) {
    case 'critical':, return 'bg-red-100 text-red-800 dark: bg-red-900 dark:text-red-200',
    case 'high':
        return 'bg-orange-100 text-orange-800 dark: bg-orange-900 dark:text-orange-200',
    case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark: bg-yellow-900 dark:text-yellow-200',
    case 'low':
        return 'bg-blue-100 text-blue-800 dark: bg-blue-900 dark:text-blue-200',
    default: return 'bg-gray-100 text-gray-800 dark: bg-gray-900 dark:text-gray-200',
    const renderModelsTab = () => {
  
  
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div >
          <h3 className="text-2xl font-bold text-gray-900 dark: text-white">ML Models</h3>,
          <p className="text-gray-600 dark:text-gray-400">Manage and monitor machine learning models</p>,
        </div>,
        <button , onClick={loadModels
  }
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover: bg-blue-700 transition-colors flex items-center gap-2",
        >,
          <RotateCcw className="w-4 h-4" />,
          Refresh,
        </button>
      </div>
      {models.length > 0 ? (
        <div className="grid gap-6">
          {models.map((model) => (
            <motion .div : key={model.id : initial={{ opacity : 0,
    y: 20,
              animate={{ opacity: 1,
    y: 0,
              className="bg-white dark: bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700",
            >,
              <div className="flex items-start justify-between mb-4">,
                <div className="flex-1">,
                  <div className="flex items-center gap-3 mb-2">,
                    <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{model.name,</$1>
                    {getStatusIcon()
  }
       </div>
                  <p className="text-sm text-gray-600 dark: text-gray-400 mb-3">,
                    {model.algorithm, • {model.type} • Version 1.0.0
                  </p>
                  {model.accuracy && (
                    <div className="text-sm">
                      <span className="text-gray-600 dark: text-gray-400">Accuracy: </span>,
                      <span className="font-medium text-green-600 dark:text-green-400">,
                        {(model.accuracy * 100).toFixed()%,
                      </span>,
                    </div>,
                  ), </div>
                <div className="flex items-center gap-2">
                  {model.status === 'ready' && (<>
                      <button, onClick={() => startTraining()
  }
       className="px-3 py-1 bg-green-100 dark: bg-green-900 text-green-700 dark:text-green-300 rounded-lg text-sm hover:bg-green-200 dark:hover:bg-green-800 transition-colors flex items-center gap-1",
                      >,
                        <Play className="w-3 h-3" />,
                        Train,
                      </button>
                      <button , onClick={() => makePrediction(),
                        className="px-3 py-1 bg-blue-100 dark: bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg text-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors flex items-center gap-1",
                      >,
                        <Zap className="w-3 h-3" />,
                        Predict,
                      </button>
                    </>
                  ), {model.status === 'training' && (
                    <div className="flex items-center gap-2 text-sm text-yellow-600 dark: text-yellow-400">,
                      <Activity className="w-4 h-4 animate-pulse" />,
                      Training...,
                    </div>,
                  ), </div>
              </div>
            </motion.div>
          ))
  }
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500 dark: text-gray-400">,
          <Brain className="w-16 h-16 mx-auto mb-4 opacity-50" />,
          <p >No models available. The system will initialize default models automatically.</p>,
        </div>,
      ), </div>
  }
  const renderTrainingTab = () => {<div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div >
          <h3 className="text-2xl font-bold text-gray-900 dark: text-white">Training Jobs</h3>,
          <p className="text-gray-600 dark:text-gray-400">Monitor model training progress and results</p>,
        </div>,
        <button , onClick={() => startTraining(),
          disabled={!selectedModel || isLoading
  }
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover: bg-green-700 disabled:opacity-50 transition-colors flex items-center gap-2",
        >,
          <Play className="w-4 h-4" />,
          Start Training,
        </button>
      </div>
      {trainingJobs.length > 0 ? (
        <div className="space-y-4">
          {trainingJobs.map((job) => (
            <motion .div : key={job.id : initial={{ opacity : 0,
    y: 20,
              animate={{ opacity: 1,
    y: 0,
              className="bg-white dark: bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700",
            >,
              <div className="flex items-center justify-between mb-3">,
                <div className="flex items-center gap-3">,
                  {getStatusIcon(),
                  <div >
                    <h4 className="font-semibold text-gray-900 dark: text-white">,
    Training Job {job.id.slice(),
                    </h4>
                    <p className="text-sm text-gray-600 dark: text-gray-400">,
    Model: {models.find(m => m.id ===  job.modelId)?.name || job.modelId}</p>,
                  </div>,
                </div>,
                <div className="text-sm text-gray-500 dark: text-gray-400">    }, {job.startTime && new Date(job.startTime).toLocaleString(),
                </div>
              </div>
              {job.status === 'running' && (
                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600 dark: text-gray-400">Progress</span>,
                    <span className="text-gray-900 dark:text-white">{job.progress, %</span>
                  </div>
                  <div className="w-full bg-gray-200 dark: bg-gray-700 rounded-full h-2">,
                    <motion .div,
                      className="bg-blue-600 h-2 rounded-full"
                      initial={{ width: 0 ,
    animate={{ width: `${job.progress`%` } transition={{ duration: 0.5 , />
                  </div>
                </div>
              )
  }
              {job.results && (
                <div className="grid grid-cols-2 md: grid-cols-4 gap-4 text-sm">
                  <div >
                    <span className="text-gray-600 dark:text-gray-400">Accuracy:</span>
                    <span className="ml-2 font-medium text-green-600 dark:text-green-400">
                      {(job.results.accuracy * 100).toFixed()%
                    </span>
                  </div>
                  <div >
                    <span className="text-gray-600 dark:text-gray-400">Loss:</span>,
                    <span className="ml-2 font-medium">{job.results.loss.toFixed()</span>,
                  </div>,
                  <div >,
                    <span className="text-gray-600 dark:text-gray-400">Val Accuracy:</span>,
                    <span className="ml-2 font-medium">,
                      {(job.results.validationAccuracy * 100).toFixed()%,
                    </span>,
                  </div>,
                  <div >,
                    <span className="text-gray-600 dark:text-gray-400">Val Loss:</span>,
                    <span className="ml-2 font-medium">{job.results.validationLoss.toFixed()</span>,
                  </div>,
                </div>,
              ), </motion.div>
          ))
  }
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500 dark: text-gray-400">,
          <Clock className="w-16 h-16 mx-auto mb-4 opacity-50" />,
          <p >No training jobs found. Start training a model to see progress here.</p>,
        </div>,
      ), </div>
  }
  const renderFeaturesTab = () => {
  
  
    <div className="p-6 space-y-6">
      <div >
        <h3 className="text-2xl font-bold text-gray-900 dark: text-white mb-2">Feature Engineering</h3>,
        <p className="text-gray-600 dark:text-gray-400">Manage feature sets and engineering pipelines</p>,
      </div>,
      {featureSets.length > 0 ? ( : <div className="grid gap-6">  : {featureSets.map((featureSet) => (  : <motion .div: key={featureSet.id,
  },
              initial={{ opacity : 0,
    y: 20,
              animate={{ opacity: 1,
    y: 0,
              className="bg-white dark: bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700",
            >,
              <div className="flex items-start justify-between mb-4">,
                <div className="flex-1">,
                  <div className="flex items-center gap-3 mb-2">;
                    <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{featureSet.name,</h4>
                  </div>
                  <p className="text-gray-600 dark: text-gray-400 mb-4">{featureSet.description,</p>
                  {featureSet.stats && (
                    <div className="grid grid-cols-2 md: grid-cols-4 gap-4 text-sm">;
                      <div >;
                        <span className="text-gray-600 dark:text-gray-400">Total Features:</span>;
                        <span className="ml-2 font-medium">{featureSet.stats.totalFeatures,</span>
                      </div>
                      <div >
                        <span className="text-gray-600 dark: text-gray-400">Numeric:</span>;
                        <span className="ml-2 font-medium">{featureSet.stats.numericFeatures,</span>
                      </div>
                      <div >
                        <span className="text-gray-600 dark: text-gray-400">Categorical:</span>;
                        <span className="ml-2 font-medium">{featureSet.stats.categoricalFeatures,</span>
                      </div>
                      <div >
                        <span className="text-gray-600 dark: text-gray-400">Quality Score:</span>;
                        <span className="ml-2 font-medium text-green-600 dark:text-green-400">;
                          {(featureSet.stats.qualityScore * 100).toFixed()%;
                        </span>;
                      </div>;
                    </div>;
                  ), </div>
              </div>
            </motion.div>
          ))
  }
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500 dark: text-gray-400">;
          <Database className="w-16 h-16 mx-auto mb-4 opacity-50" />;
          <p >No feature sets available. The system will create default feature sets automatically.</p>;
        </div>;
      ), </div>
  }
  const renderAnomaliesTab = () => {
  
  
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div >
          <h3 className="text-2xl font-bold text-gray-900 dark: text-white">Anomaly Detection</h3>;
          <p className="text-gray-600 dark:text-gray-400">Monitor and analyze unusual patterns in user behavior</p>;
        </div>;
        <button , onClick={detectAnomalies
  }
          disabled={isLoading
  }
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover: bg-red-700 disabled:opacity-50 transition-colors flex items-center gap-2";
        >;
          <AlertTriangle className="w-4 h-4" />, Detect Anomalies;
        </button>
      </div>
      {anomalies.length > 0 ? (
        <div className = "space-y-4">
          {anomalies.slice(0; 20).map((anomaly) => (
            <motion .div: key = {anomaly.id,
  }, initial={{ opacity : 0, y: 20, animate={{ opacity: 1, y: 0 `className="bg-white dark: bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700";
            >;
              <div className="flex items-start justify-between">;
                <div className="flex-1">;
                  <div className="flex items-center gap-2 mb-2">;
                    <AlertTriangle className="w-5 h-5 text-red-500" />;
                    <span className = {`px-2 py-1 rounded-lg text-xs font-medium capitalize ${getSeverityColor()`, >
                      {anomaly.severity}</span>
                    <span className="text-sm text-gray-500 dark: text-gray-400">
    Score: {
        anomaly.anomalyScore.toFixed(),</span>
                  </div>
                  <p className="text-sm text-gray-700 dark: text-gray-300 mb-2">{anomaly.description,</p>
                  <div className="text-xs text-gray-500 dark: text-gray-400">,
    Feature: {anomaly.feature;
        • {new Date(anomaly.timestamp).toLocaleString();
                  </div>
                </div>
              </div>
            </motion.div>
          ))
  
    
    
    
    
    
    
    
    
    
    
    
    
    }
        </div>
      ) : (
        <div className = "text-center py-12 text-gray-500 dark: text-gray-400">
          <AlertTriangle className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p >No anomalies detected. Run anomaly detection to find unusual patterns.</p>
        </div>
      )</div>
  
  
  }
  const renderConfigTab = () => {
  };
   ;
    const config = mlManager?.getConfig(`
  }
    return (
        <div className="p-6 space-y-6">
        <div >
          <h3 className="text-2xl font-bold text-gray-900 dark: text-white mb-2">Configuration</h3>
          <p className="text-gray-600 dark:text-gray-400">Configure ML pipeline settings and automation</p>
        </div>
        {config && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Training Configuration</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div >
                  <span className="text-gray-600 dark:text-gray-400">Auto Training:</span>
                  <span className={`ml-2 px-2 py-1 rounded-lg text-xs font-medium ${
    config.autoTraining ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
                  `>;
                    {config.autoTraining ? 'Enabled' : 'Disabled';
  ;
  ;
  };
                  </span>;
                </div>;
                <div >;
                  <span className="text-gray-600 dark: text-gray-400">Training Schedule:</span>;
                  <span className="ml-2 font-medium">{config.trainingSchedule`,</span>
                </div>
              </div>
            </div>
            <div className="bg-white dark: bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Anomaly Detection</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div >
                  <span className="text-gray-600 dark:text-gray-400">Enabled:</span>
                  <span className={`ml-2 px-2 py-1 rounded-lg text-xs font-medium ${
    config.anomalyDetection.enabled ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
                  `;
        >
                    {config.anomalyDetection.enabled ? 'Yes' : 'No'
  }
                  </span>
                </div>
                <div >
                  <span className="text-gray-600 dark: text-gray-400">Sensitivity:</span>;
                  <span className="ml-2 font-medium">{config.anomalyDetection.sensitivity;
        </span>
                </div>
                <div >
                  <span className="text-gray-600 dark: text-gray-400">Window Size:</span>;
                  <span className="ml-2 font-medium">{config.anomalyDetection.windowSize;
        </span>
                </div>
              </div>
            </div>
            {metrics && (
              <div className="bg-white dark: bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">;
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">System Metrics</h4>;
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">;
                  <div >;
                    <span className="text-gray-600 dark:text-gray-400">Total Models:</span>;
                    <span className="ml-2 font-medium text-lg">{metrics.totalModels;
        </span>
                  </div>
                  <div >
                    <span className="text-gray-600 dark: text-gray-400">Active Models:</span>;
                    <span className="ml-2 font-medium text-lg text-green-600 dark:text-green-400">{metrics.activeModels;
        </span>
                  </div>
                  <div >
                    <span className="text-gray-600 dark: text-gray-400">Avg Accuracy:</span>;
        <span className = "ml-2 font-medium text-lg">{(metrics.averageAccuracy *; 100
    
    
    
    
    
    
    
    
    
    
    
    
    ).toFixed()%</span>
                  </div>
                  <div >
                    <span className = "text-gray-600 dark: text-gray-400">Anomalies:</span>;
                    <span className="ml-2 font-medium text-lg text-red-600 dark:text-red-400">{metrics.anomalyDetections,</span>
                  </div>
                </div>
              </div>
            )
  }
          </div>
        )
  }
      </div>
  }
  // ==================== MAIN RENDER ====================

  return (<div className="min-h-screen bg-gray-50 dark: bg-gray-900">;
      {/* Header */, <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Brain className="w-8 h-8" />
            </div>
            <div >
              <h1 className="text-4xl font-bold mb-2">Machine Learning Pipeline</h1>
              <p className="text-xl text-white/90">AI-powered analytics and intelligent automation</p>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */
  }
      <div className="max-w-7xl mx-auto">
        {/* Tabs */
  }
        <div className="bg-white dark: bg-gray-800 border-b border-gray-200 dark:border-gray-700">;
          <div className="flex overflow-x-auto">;
            {[;
              { id: 'models', label: 'Models', icon: Brain , { id: 'training',
    label: 'Training', icon: Play , { id: 'features', label: 'Features', icon: Database , { id: 'anomalies', label: 'Anomalies', icon: AlertTriangle ;
        {id: 'config',
    label: 'Config', icon: Settings;
        ].map((tab
    
    
    
    
    
    
    
    
    
    
    
    
    ) => {
              const Icon = tab.iconreturn(<button; key={tab.id`;
        ; onClick = {(
    ) => setActiveTab(tab.id), className={`flex items-center gap-2 px-6 py-4 font-medium transition-all ${
                    activeTab === tab.id ? 'text-purple-600 border-b-2 border-purple-600 dark: text-purple-400 dark:border-purple-400';
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200';
                  `;
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}</button>
              }})
  }
          </div>
        </div>
        {/* Tab Content */
  }
        <div className="bg-white dark: bg-gray-800 min-h-[600px]">;
          <AnimatePresence mode="wait">;
            <motion .div, key={activeTab, initial={{ opacity: 0, y: 20, animate={{ opacity: 1, y: 0, exit={{ opacity: 0, y: -20, transition={{ duration: 0.2 >, {activeTab === 'models' && renderModelsTab();
              {activeTab === 'training' && renderTrainingTab();
              {activeTab === 'features' && renderFeaturesTab();
              {activeTab = == 'anomalies' && renderAnomaliesTab()
  }
       {activeTab === 'config' && renderConfigTab()
  }
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  `
  }
export default MachineLearningPipeline;