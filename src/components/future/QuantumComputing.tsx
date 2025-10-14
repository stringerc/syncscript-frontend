/**
 * Quantum Computing System Component
 * 
 * Advanced optimization algorithms
 * Includes quantum task scheduling, optimization, and machine learning
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuantumAlgorithm {
  id: string;
  name: string;
  description: string;
  type: 'optimization' | 'scheduling' | 'machine-learning' | 'simulation';
  qubits: number;
  complexity: 'O(1)' | 'O(log n)' | 'O(n)' | 'O(n log n)' | 'O(n²)' | 'O(2ⁿ)';
  status: 'ready' | 'running' | 'completed' | 'error';
  executionTime: number;
  accuracy: number;
  lastRun: string;
  runs: number;
}

interface QuantumOptimization {
  id: string;
  name: string;
  description: string;
  problem: string;
  variables: number;
  constraints: number;
  objective: 'minimize' | 'maximize';
  currentSolution: number;
  optimalSolution: number;
  improvement: number;
  status: 'running' | 'completed' | 'failed';
  runtime: number;
}

interface QuantumSchedule {
  id: string;
  name: string;
  description: string;
  tasks: number;
  resources: number;
  timeSlots: number;
  conflicts: number;
  efficiency: number;
  status: 'generating' | 'optimizing' | 'completed';
  runtime: number;
  quality: 'excellent' | 'good' | 'fair' | 'poor';
}

interface QuantumML {
  id: string;
  name: string;
  description: string;
  model: 'quantum-neural' | 'variational' | 'quantum-kernel' | 'quantum-annealing';
  dataset: string;
  features: number;
  samples: number;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  status: 'training' | 'evaluating' | 'completed';
  runtime: number;
}

interface QuantumComputingProps {
  onClose: () => void;
}

const QuantumComputing: React.FC<QuantumComputingProps> = ({ onClose }) => {
  const [quantumAlgorithms, setQuantumAlgorithms] = useState<QuantumAlgorithm[]>([]);
  const [quantumOptimizations, setQuantumOptimizations] = useState<QuantumOptimization[]>([]);
  const [quantumSchedules, setQuantumSchedules] = useState<QuantumSchedule[]>([]);
  const [quantumML, setQuantumML] = useState<QuantumML[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'algorithms' | 'optimization' | 'scheduling' | 'ml'>('algorithms');
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    loadQuantumData();
  }, []);

  const loadQuantumData = async () => {
    setIsLoading(true);
    
    try {
      // Mock quantum algorithms
      const mockQuantumAlgorithms: QuantumAlgorithm[] = [
        {
          id: 'algo-1',
          name: 'Grover\'s Search',
          description: 'Quantum search algorithm for finding optimal task sequences',
          type: 'optimization',
          qubits: 8,
          complexity: 'O(√n)',
          status: 'ready',
          executionTime: 0.045,
          accuracy: 98.5,
          lastRun: new Date(Date.now() - 3600000).toISOString(),
          runs: 156
        },
        {
          id: 'algo-2',
          name: 'Quantum Approximate Optimization Algorithm (QAOA)',
          description: 'Hybrid quantum-classical algorithm for task scheduling optimization',
          type: 'scheduling',
          qubits: 12,
          complexity: 'O(n log n)',
          status: 'running',
          executionTime: 0.123,
          accuracy: 94.2,
          lastRun: new Date(Date.now() - 1800000).toISOString(),
          runs: 89
        },
        {
          id: 'algo-3',
          name: 'Variational Quantum Eigensolver (VQE)',
          description: 'Quantum algorithm for energy optimization in productivity systems',
          type: 'optimization',
          qubits: 6,
          complexity: 'O(n)',
          status: 'completed',
          executionTime: 0.078,
          accuracy: 96.8,
          lastRun: new Date(Date.now() - 7200000).toISOString(),
          runs: 234
        },
        {
          id: 'algo-4',
          name: 'Quantum Machine Learning Classifier',
          description: 'Quantum neural network for productivity pattern recognition',
          type: 'machine-learning',
          qubits: 10,
          complexity: 'O(log n)',
          status: 'ready',
          executionTime: 0.156,
          accuracy: 92.1,
          lastRun: new Date(Date.now() - 86400000).toISOString(),
          runs: 67
        },
        {
          id: 'algo-5',
          name: 'Quantum Monte Carlo',
          description: 'Quantum simulation for probabilistic task completion modeling',
          type: 'simulation',
          qubits: 14,
          complexity: 'O(n²)',
          status: 'ready',
          executionTime: 0.234,
          accuracy: 89.7,
          lastRun: new Date(Date.now() - 172800000).toISOString(),
          runs: 45
        }
      ];

      // Mock quantum optimizations
      const mockQuantumOptimizations: QuantumOptimization[] = [
        {
          id: 'opt-1',
          name: 'Task Priority Optimization',
          description: 'Optimize task priorities for maximum productivity',
          problem: 'Multi-objective task prioritization',
          variables: 50,
          constraints: 15,
          objective: 'maximize',
          currentSolution: 78.5,
          optimalSolution: 94.2,
          improvement: 20.0,
          status: 'completed',
          runtime: 2.3
        },
        {
          id: 'opt-2',
          name: 'Resource Allocation',
          description: 'Optimize resource allocation across team members',
          problem: 'Resource allocation with constraints',
          variables: 30,
          constraints: 8,
          objective: 'maximize',
          currentSolution: 65.2,
          optimalSolution: 87.8,
          improvement: 34.7,
          status: 'running',
          runtime: 1.8
        },
        {
          id: 'opt-3',
          name: 'Energy Distribution',
          description: 'Optimize energy distribution throughout the day',
          problem: 'Energy optimization with time constraints',
          variables: 24,
          constraints: 12,
          objective: 'maximize',
          currentSolution: 72.1,
          optimalSolution: 91.5,
          improvement: 26.9,
          status: 'completed',
          runtime: 3.1
        },
        {
          id: 'opt-4',
          name: 'Meeting Schedule Optimization',
          description: 'Optimize meeting schedules to minimize conflicts',
          problem: 'Scheduling with availability constraints',
          variables: 20,
          constraints: 6,
          objective: 'minimize',
          currentSolution: 45.3,
          optimalSolution: 23.7,
          improvement: 47.7,
          status: 'failed',
          runtime: 4.2
        }
      ];

      // Mock quantum schedules
      const mockQuantumSchedules: QuantumSchedule[] = [
        {
          id: 'schedule-1',
          name: 'Daily Task Schedule',
          description: 'Optimized daily task schedule using quantum algorithms',
          tasks: 25,
          resources: 8,
          timeSlots: 16,
          conflicts: 3,
          efficiency: 94.2,
          status: 'completed',
          runtime: 1.5,
          quality: 'excellent'
        },
        {
          id: 'schedule-2',
          name: 'Weekly Project Schedule',
          description: 'Weekly project timeline optimization',
          tasks: 45,
          resources: 12,
          timeSlots: 40,
          conflicts: 7,
          efficiency: 87.8,
          status: 'optimizing',
          runtime: 3.2,
          quality: 'good'
        },
        {
          id: 'schedule-3',
          name: 'Team Meeting Schedule',
          description: 'Optimized team meeting schedule',
          tasks: 15,
          resources: 6,
          timeSlots: 20,
          conflicts: 2,
          efficiency: 91.5,
          status: 'generating',
          runtime: 0.8,
          quality: 'excellent'
        },
        {
          id: 'schedule-4',
          name: 'Sprint Planning Schedule',
          description: 'Sprint planning and task distribution',
          tasks: 35,
          resources: 10,
          timeSlots: 30,
          conflicts: 5,
          efficiency: 82.3,
          status: 'completed',
          runtime: 2.7,
          quality: 'good'
        }
      ];

      // Mock quantum ML
      const mockQuantumML: QuantumML[] = [
        {
          id: 'ml-1',
          name: 'Productivity Pattern Recognition',
          description: 'Quantum neural network for productivity pattern analysis',
          model: 'quantum-neural',
          dataset: 'Productivity Patterns',
          features: 128,
          samples: 10000,
          accuracy: 94.2,
          precision: 92.8,
          recall: 95.1,
          f1Score: 93.9,
          status: 'completed',
          runtime: 45.2
        },
        {
          id: 'ml-2',
          name: 'Task Completion Prediction',
          description: 'Variational quantum classifier for task completion prediction',
          model: 'variational',
          dataset: 'Task Completion History',
          features: 64,
          samples: 5000,
          accuracy: 89.7,
          precision: 88.3,
          recall: 91.2,
          f1Score: 89.7,
          status: 'training',
          runtime: 32.1
        },
        {
          id: 'ml-3',
          name: 'Energy Level Forecasting',
          description: 'Quantum kernel method for energy level prediction',
          model: 'quantum-kernel',
          dataset: 'Energy Level Data',
          features: 32,
          samples: 2500,
          accuracy: 91.5,
          precision: 90.1,
          recall: 93.8,
          f1Score: 91.9,
          status: 'evaluating',
          runtime: 28.7
        },
        {
          id: 'ml-4',
          name: 'Team Performance Analysis',
          description: 'Quantum annealing for team performance optimization',
          model: 'quantum-annealing',
          dataset: 'Team Performance Metrics',
          features: 96,
          samples: 7500,
          accuracy: 87.3,
          precision: 85.9,
          recall: 89.2,
          f1Score: 87.5,
          status: 'completed',
          runtime: 52.3
        }
      ];

      setQuantumAlgorithms(mockQuantumAlgorithms);
      setQuantumOptimizations(mockQuantumOptimizations);
      setQuantumSchedules(mockQuantumSchedules);
      setQuantumML(mockQuantumML);
    } catch (error) {
      console.error('Failed to load quantum data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const runAlgorithm = async (algorithmId: string) => {
    setIsRunning(true);
    
    try {
      // Simulate algorithm execution
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setQuantumAlgorithms(prev => prev.map(algorithm => 
        algorithm.id === algorithmId 
          ? { 
              ...algorithm, 
              status: 'completed',
              runs: algorithm.runs + 1,
              lastRun: new Date().toISOString()
            }
          : algorithm
      ));
      
      console.log(`Executed algorithm: ${algorithmId}`);
    } catch (error) {
      console.error('Failed to run algorithm:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'optimization': return '🎯';
      case 'scheduling': return '📅';
      case 'machine-learning': return '🧠';
      case 'simulation': return '🔬';
      default: return '⚛️';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'text-green-600 bg-green-100';
      case 'running': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-purple-600 bg-purple-100';
      case 'error': return 'text-red-600 bg-red-100';
      case 'failed': return 'text-red-600 bg-red-100';
      case 'generating': return 'text-yellow-600 bg-yellow-100';
      case 'optimizing': return 'text-blue-600 bg-blue-100';
      case 'training': return 'text-orange-600 bg-orange-100';
      case 'evaluating': return 'text-indigo-600 bg-indigo-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'fair': return 'text-yellow-600 bg-yellow-100';
      case 'poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'O(1)': return 'text-green-600 bg-green-100';
      case 'O(log n)': return 'text-blue-600 bg-blue-100';
      case 'O(n)': return 'text-yellow-600 bg-yellow-100';
      case 'O(n log n)': return 'text-orange-600 bg-orange-100';
      case 'O(n²)': return 'text-red-600 bg-red-100';
      case 'O(2ⁿ)': return 'text-purple-600 bg-purple-100';
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
            <span className="text-lg font-medium text-gray-700">Loading quantum computing...</span>
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
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Quantum Computing</h2>
              <p className="text-purple-100 mt-1">Advanced optimization algorithms</p>
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-purple-200 text-sm">Algorithms:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {quantumAlgorithms.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-purple-200 text-sm">Optimizations:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {quantumOptimizations.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-purple-200 text-sm">ML Models:</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-medium">
                    {quantumML.length}
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
              { id: 'algorithms', name: 'Algorithms', icon: '⚛️' },
              { id: 'optimization', name: 'Optimization', icon: '🎯' },
              { id: 'scheduling', name: 'Scheduling', icon: '📅' },
              { id: 'ml', name: 'Machine Learning', icon: '🧠' }
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
          {selectedTab === 'algorithms' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Quantum Algorithms</h3>
              
              <div className="space-y-4">
                {quantumAlgorithms.map((algorithm) => (
                  <motion.div
                    key={algorithm.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-4 mb-3">
                      <span className="text-3xl">{getTypeIcon(algorithm.type)}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{algorithm.name}</h4>
                        <p className="text-sm text-gray-600">{algorithm.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(algorithm.status)}`}>
                          {algorithm.status.toUpperCase()}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getComplexityColor(algorithm.complexity)}`}>
                          {algorithm.complexity}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-gray-600">Qubits:</span>
                        <span className="ml-2 text-gray-900">{algorithm.qubits}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Execution Time:</span>
                        <span className="ml-2 text-gray-900">{algorithm.executionTime}s</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Accuracy:</span>
                        <span className="ml-2 text-gray-900">{algorithm.accuracy}%</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Runs:</span>
                        <span className="ml-2 text-gray-900">{algorithm.runs}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {algorithm.status === 'ready' && (
                        <button
                          onClick={() => runAlgorithm(algorithm.id)}
                          disabled={isRunning}
                          className="px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200 transition-all disabled:opacity-50"
                        >
                          {isRunning ? 'Running...' : 'Run'}
                        </button>
                      )}
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200 transition-all">
                        Details
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'optimization' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Quantum Optimizations</h3>
              
              <div className="space-y-4">
                {quantumOptimizations.map((optimization) => (
                  <motion.div
                    key={optimization.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{optimization.name}</h4>
                        <p className="text-sm text-gray-600">{optimization.description}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(optimization.status)}`}>
                        {optimization.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">Problem:</div>
                      <div className="text-sm text-gray-600">{optimization.problem}</div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Variables:</span>
                          <span className="ml-2 text-gray-900">{optimization.variables}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Constraints:</span>
                          <span className="ml-2 text-gray-900">{optimization.constraints}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Current Solution:</span>
                          <span className="ml-2 text-gray-900">{optimization.currentSolution}%</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Optimal Solution:</span>
                          <span className="ml-2 text-gray-900">{optimization.optimalSolution}%</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Improvement:</span>
                        <span className="text-green-600 font-medium">+{optimization.improvement}%</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'scheduling' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Quantum Scheduling</h3>
              
              <div className="space-y-4">
                {quantumSchedules.map((schedule) => (
                  <motion.div
                    key={schedule.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{schedule.name}</h4>
                        <p className="text-sm text-gray-600">{schedule.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(schedule.status)}`}>
                          {schedule.status.toUpperCase()}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getQualityColor(schedule.quality)}`}>
                          {schedule.quality.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-gray-600">Tasks:</span>
                        <span className="ml-2 text-gray-900">{schedule.tasks}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Resources:</span>
                        <span className="ml-2 text-gray-900">{schedule.resources}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Time Slots:</span>
                        <span className="ml-2 text-gray-900">{schedule.timeSlots}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Conflicts:</span>
                        <span className="ml-2 text-gray-900">{schedule.conflicts}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Efficiency:</span>
                        <span className="text-gray-900">{schedule.efficiency}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full transition-all"
                          style={{ width: `${schedule.efficiency}%` }}
                        ></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'ml' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Quantum Machine Learning</h3>
              
              <div className="space-y-4">
                {quantumML.map((ml) => (
                  <motion.div
                    key={ml.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{ml.name}</h4>
                        <p className="text-sm text-gray-600">{ml.description}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(ml.status)}`}>
                        {ml.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-700">Model:</div>
                      <div className="text-sm text-gray-600 capitalize">{ml.model.replace('-', ' ')}</div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Dataset:</span>
                          <span className="ml-2 text-gray-900">{ml.dataset}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Features:</span>
                          <span className="ml-2 text-gray-900">{ml.features}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Samples:</span>
                          <span className="ml-2 text-gray-900">{ml.samples.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Accuracy:</span>
                          <span className="ml-2 text-gray-900">{ml.accuracy}%</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Precision:</span>
                          <span className="ml-2 text-gray-900">{ml.precision}%</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Recall:</span>
                          <span className="ml-2 text-gray-900">{ml.recall}%</span>
                        </div>
                        <div>
                          <span className="text-gray-600">F1 Score:</span>
                          <span className="ml-2 text-gray-900">{ml.f1Score}%</span>
                        </div>
                      </div>
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
            Quantum Computing • {quantumAlgorithms.length} algorithms • {quantumOptimizations.length} optimizations • {quantumML.length} ML models
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
                console.log('Exporting quantum data...');
              }}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all"
            >
              Export Data
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default QuantumComputing;
