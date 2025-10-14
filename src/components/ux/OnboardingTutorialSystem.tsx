import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  target: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  order: number;
  completed: boolean;
  interactive: boolean;
  videoUrl?: string;
  imageUrl?: string;
}

interface TutorialPath {
  id: string;
  name: string;
  description: string;
  steps: TutorialStep[];
  targetAudience: 'new_users' | 'power_users' | 'enterprise_users' | 'all';
  estimatedDuration: number;
  completionRate: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface OnboardingFlow {
  id: string;
  name: string;
  description: string;
  steps: OnboardingStep[];
  completionRate: number;
  dropOffPoints: DropOffPoint[];
  userSegment: string;
}

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  type: 'welcome' | 'profile_setup' | 'feature_intro' | 'first_task' | 'customization';
  required: boolean;
  completed: boolean;
  completionTime: number;
}

interface DropOffPoint {
  step: string;
  dropOffRate: number;
  reason: string;
  suggestions: string[];
}

const OnboardingTutorialSystem: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [tutorialPaths, setTutorialPaths] = useState<TutorialPath[]>([]);
  const [onboardingFlows, setOnboardingFlows] = useState<OnboardingFlow[]>([]);
  const [selectedPath, setSelectedPath] = useState<string>('all');
  const [selectedAudience, setSelectedAudience] = useState<string>('all');
  const [isCreatingTutorial, setIsCreatingTutorial] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);

  // Generate tutorial data
  useEffect(() => {
    const generateTutorialPaths = (): TutorialPath[] => {
      const pathData = [
        {
          name: 'Getting Started',
          description: 'Basic introduction to SyncScript features',
          targetAudience: 'new_users',
          estimatedDuration: 15,
          completionRate: 78.5,
          difficulty: 'beginner'
        },
        {
          name: 'Power User Guide',
          description: 'Advanced features and productivity tips',
          targetAudience: 'power_users',
          estimatedDuration: 30,
          completionRate: 65.2,
          difficulty: 'advanced'
        },
        {
          name: 'Enterprise Setup',
          description: 'Team management and enterprise features',
          targetAudience: 'enterprise_users',
          estimatedDuration: 45,
          completionRate: 82.1,
          difficulty: 'intermediate'
        },
        {
          name: 'Mobile App Tutorial',
          description: 'Using SyncScript on mobile devices',
          targetAudience: 'all',
          estimatedDuration: 20,
          completionRate: 71.3,
          difficulty: 'beginner'
        }
      ];

      return pathData.map((path, index) => {
        const steps: TutorialStep[] = [];
        const stepCount = Math.floor(Math.random() * 8) + 5;
        
        for (let i = 0; i < stepCount; i++) {
          const positions: TutorialStep['position'][] = ['top', 'bottom', 'left', 'right', 'center'];
          const interactive = Math.random() > 0.5;
          
          steps.push({
            id: `step-${index}-${i}`,
            title: `Step ${i + 1}`,
            description: `Learn about ${path.name.toLowerCase()} step ${i + 1}`,
            target: `#target-${i}`,
            position: positions[Math.floor(Math.random() * positions.length)],
            order: i,
            completed: Math.random() > 0.3,
            interactive,
            videoUrl: interactive ? `https://example.com/video-${i}.mp4` : undefined,
            imageUrl: `https://example.com/image-${i}.jpg`
          });
        }

        return {
          id: `path-${index}`,
          ...path,
          steps
        };
      });
    };

    const generateOnboardingFlows = (): OnboardingFlow[] => {
      const flowData = [
        {
          name: 'New User Onboarding',
          description: 'Complete onboarding flow for new users',
          completionRate: 68.4,
          userSegment: 'new_users'
        },
        {
          name: 'Enterprise Onboarding',
          description: 'Team setup and enterprise configuration',
          completionRate: 85.2,
          userSegment: 'enterprise_users'
        },
        {
          name: 'Mobile Onboarding',
          description: 'Mobile-first onboarding experience',
          completionRate: 72.1,
          userSegment: 'mobile_users'
        }
      ];

      return flowData.map((flow, index) => {
        const steps: OnboardingStep[] = [];
        const stepCount = Math.floor(Math.random() * 6) + 4;
        
        for (let i = 0; i < stepCount; i++) {
          const types: OnboardingStep['type'][] = ['welcome', 'profile_setup', 'feature_intro', 'first_task', 'customization'];
          const type = types[Math.floor(Math.random() * types.length)];
          
          steps.push({
            id: `onboarding-step-${index}-${i}`,
            title: `${type.charAt(0).toUpperCase() + type.slice(1)} Step ${i + 1}`,
            description: `Complete ${type} for ${flow.name}`,
            type,
            required: Math.random() > 0.3,
            completed: Math.random() > 0.4,
            completionTime: Math.random() * 300 + 30
          });
        }

        const dropOffPoints: DropOffPoint[] = steps.map((step, i) => ({
          step: step.title,
          dropOffRate: Math.random() * 30 + 5,
          reason: `Users find ${step.type} challenging`,
          suggestions: [
            'Simplify the step',
            'Add more guidance',
            'Provide examples',
            'Make it optional'
          ]
        }));

        return {
          id: `flow-${index}`,
          ...flow,
          steps,
          dropOffPoints
        };
      });
    };

    setTutorialPaths(generateTutorialPaths());
    setOnboardingFlows(generateOnboardingFlows());
  }, []);

  const filteredPaths = tutorialPaths.filter(path => 
    (selectedPath === 'all' || path.id === selectedPath) &&
    (selectedAudience === 'all' || path.targetAudience === selectedAudience)
  );

  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCompletionRateColor = (rate: number): string => {
    if (rate >= 80) return '#10b981';
    if (rate >= 60) return '#f59e0b';
    if (rate >= 40) return '#f97316';
    return '#ef4444';
  };

  const getStepTypeColor = (type: string): string => {
    switch (type) {
      case 'welcome': return 'bg-blue-100 text-blue-800';
      case 'profile_setup': return 'bg-green-100 text-green-800';
      case 'feature_intro': return 'bg-purple-100 text-purple-800';
      case 'first_task': return 'bg-orange-100 text-orange-800';
      case 'customization': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDropOffColor = (rate: number): string => {
    if (rate >= 25) return 'bg-red-100 text-red-800';
    if (rate >= 15) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const startTutorial = (pathId: string) => {
    const path = tutorialPaths.find(p => p.id === pathId);
    if (path) {
      setCurrentStep(0);
      // In a real implementation, this would start the tutorial
      console.log('Starting tutorial:', path.name);
    }
  };

  const createNewTutorial = async () => {
    setIsCreatingTutorial(true);
    
    // Simulate tutorial creation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newPath: TutorialPath = {
      id: `path-${Date.now()}`,
      name: 'Custom Tutorial',
      description: 'Custom tutorial path',
      targetAudience: 'all',
      estimatedDuration: 20,
      completionRate: 0,
      difficulty: 'beginner',
      steps: []
    };

    setTutorialPaths(prev => [newPath, ...prev]);
    setIsCreatingTutorial(false);
  };

  const audiences = [
    { key: 'all', label: 'All Audiences', count: tutorialPaths.length },
    { key: 'new_users', label: 'New Users', count: tutorialPaths.filter(p => p.targetAudience === 'new_users').length },
    { key: 'power_users', label: 'Power Users', count: tutorialPaths.filter(p => p.targetAudience === 'power_users').length },
    { key: 'enterprise_users', label: 'Enterprise Users', count: tutorialPaths.filter(p => p.targetAudience === 'enterprise_users').length }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">🎓 Onboarding & Tutorial System</h2>
              <p className="text-green-100 mt-1">User guidance and interactive learning</p>
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
          {/* Tutorial Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Tutorial Paths</p>
                  <p className="text-2xl font-bold text-blue-800">{tutorialPaths.length}</p>
                </div>
                <div className="text-3xl">📚</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Onboarding Flows</p>
                  <p className="text-2xl font-bold text-green-800">{onboardingFlows.length}</p>
                </div>
                <div className="text-3xl">🚀</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Avg Completion</p>
                  <p className="text-2xl font-bold text-purple-800">
                    {(tutorialPaths.reduce((sum, p) => sum + p.completionRate, 0) / tutorialPaths.length).toFixed(0)}%
                  </p>
                </div>
                <div className="text-3xl">✅</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Total Steps</p>
                  <p className="text-2xl font-bold text-orange-800">
                    {tutorialPaths.reduce((sum, p) => sum + p.steps.length, 0)}
                  </p>
                </div>
                <div className="text-3xl">📝</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 font-medium">Active Users</p>
                  <p className="text-2xl font-bold text-red-800">1,234</p>
                </div>
                <div className="text-3xl">👥</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Audience:</label>
                  <select
                    value={selectedAudience}
                    onChange={(e) => setSelectedAudience(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                  >
                    {audiences.map(audience => (
                      <option key={audience.key} value={audience.key}>
                        {audience.label} ({audience.count})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Path:</label>
                  <select
                    value={selectedPath}
                    onChange={(e) => setSelectedPath(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="all">All Paths</option>
                    {tutorialPaths.map(path => (
                      <option key={path.id} value={path.id}>
                        {path.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={createNewTutorial}
                  disabled={isCreatingTutorial}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
                >
                  {isCreatingTutorial ? '⏳ Creating...' : '➕ Create Tutorial'}
                </button>
              </div>
            </div>
          </div>

          {/* Onboarding Flows */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Onboarding Flows</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {onboardingFlows.map((flow) => (
                <div key={flow.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{flow.name}</h4>
                    <span 
                      className="text-sm font-medium"
                      style={{ color: getCompletionRateColor(flow.completionRate) }}
                    >
                      {flow.completionRate}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{flow.description}</p>
                  
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">
                      Steps: {flow.steps.length}
                    </div>
                    <div className="text-sm text-gray-600">
                      Segment: {flow.userSegment.replace('_', ' ')}
                    </div>
                    
                    <div className="mt-3">
                      <h5 className="text-sm font-medium text-gray-700 mb-1">Drop-off Points:</h5>
                      {flow.dropOffPoints.slice(0, 2).map((point, index) => (
                        <div key={index} className="text-xs text-gray-600">
                          {point.step}: {point.dropOffRate.toFixed(1)}%
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tutorial Paths */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Tutorial Paths ({filteredPaths.length})</h3>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tutorial</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Audience</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Steps</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPaths.map((path) => (
                    <tr key={path.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{path.name}</div>
                          <div className="text-sm text-gray-500">{path.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {path.targetAudience.replace('_', ' ')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(path.difficulty)}`}>
                          {path.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {path.estimatedDuration} min
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {path.steps.length}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="h-2 rounded-full"
                              style={{ 
                                width: `${path.completionRate}%`,
                                backgroundColor: getCompletionRateColor(path.completionRate)
                              }}
                            ></div>
                          </div>
                          <span 
                            className="text-sm font-medium"
                            style={{ color: getCompletionRateColor(path.completionRate) }}
                          >
                            {path.completionRate}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => startTutorial(path.id)}
                          className="text-green-600 hover:text-green-900 transition-colors"
                        >
                          Start Tutorial
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OnboardingTutorialSystem;
