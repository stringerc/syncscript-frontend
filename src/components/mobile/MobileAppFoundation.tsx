/**
 * Mobile App Foundation Component
 * 
 * Provides mobile app preview and foundation structure
 * Includes React Native app architecture and mobile-specific features
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileFeature {
  id: string;
  name: string;
  description: string;
  category: 'core' | 'advanced' | 'premium';
  icon: string;
  color: string;
  isImplemented: boolean;
  priority: 'high' | 'medium' | 'low';
  estimatedDevelopment: string;
}

interface MobileAppFoundationProps {
  userId: string;
  onClose: () => void;
}

const MOBILE_FEATURES: MobileFeature[] = [
  {
    id: 'offline-sync',
    name: 'Offline Sync',
    description: 'Work seamlessly without internet connection',
    category: 'core',
    icon: '📱',
    color: 'from-blue-500 to-cyan-500',
    isImplemented: false,
    priority: 'high',
    estimatedDevelopment: '2-3 weeks'
  },
  {
    id: 'push-notifications',
    name: 'Push Notifications',
    description: 'Real-time alerts and reminders',
    category: 'core',
    icon: '🔔',
    color: 'from-orange-500 to-red-500',
    isImplemented: false,
    priority: 'high',
    estimatedDevelopment: '1-2 weeks'
  },
  {
    id: 'voice-commands',
    name: 'Voice Commands',
    description: 'Control tasks with voice input',
    category: 'advanced',
    icon: '🎤',
    color: 'from-purple-500 to-pink-500',
    isImplemented: false,
    priority: 'medium',
    estimatedDevelopment: '3-4 weeks'
  },
  {
    id: 'camera-integration',
    name: 'Camera Integration',
    description: 'Scan documents and capture notes',
    category: 'advanced',
    icon: '📷',
    color: 'from-green-500 to-emerald-500',
    isImplemented: false,
    priority: 'medium',
    estimatedDevelopment: '2-3 weeks'
  },
  {
    id: 'location-services',
    name: 'Location Services',
    description: 'Location-based task reminders',
    category: 'advanced',
    icon: '📍',
    color: 'from-indigo-500 to-blue-500',
    isImplemented: false,
    priority: 'medium',
    estimatedDevelopment: '2-3 weeks'
  },
  {
    id: 'biometric-auth',
    name: 'Biometric Authentication',
    description: 'Secure login with fingerprint/face ID',
    category: 'core',
    icon: '🔐',
    color: 'from-gray-600 to-gray-800',
    isImplemented: false,
    priority: 'high',
    estimatedDevelopment: '1-2 weeks'
  },
  {
    id: 'widget-support',
    name: 'Home Screen Widgets',
    description: 'Quick access widgets for iOS and Android',
    category: 'advanced',
    icon: '📊',
    color: 'from-yellow-500 to-orange-500',
    isImplemented: false,
    priority: 'medium',
    estimatedDevelopment: '2-3 weeks'
  },
  {
    id: 'dark-mode',
    name: 'Native Dark Mode',
    description: 'System-integrated dark mode support',
    category: 'core',
    icon: '🌙',
    color: 'from-gray-700 to-gray-900',
    isImplemented: false,
    priority: 'medium',
    estimatedDevelopment: '1 week'
  },
  {
    id: 'haptic-feedback',
    name: 'Haptic Feedback',
    description: 'Tactile feedback for interactions',
    category: 'premium',
    icon: '📳',
    color: 'from-pink-500 to-purple-500',
    isImplemented: false,
    priority: 'low',
    estimatedDevelopment: '1 week'
  },
  {
    id: 'apple-watch',
    name: 'Apple Watch Support',
    description: 'Companion app for Apple Watch',
    category: 'premium',
    icon: '⌚',
    color: 'from-gray-500 to-gray-700',
    isImplemented: false,
    priority: 'low',
    estimatedDevelopment: '4-5 weeks'
  }
];

const PLATFORM_FEATURES = {
  ios: {
    name: 'iOS App',
    icon: '🍎',
    features: ['App Store distribution', 'iOS-specific UI components', 'Apple Pay integration', 'Siri Shortcuts'],
    estimatedTime: '6-8 weeks',
    requirements: ['Xcode', 'iOS 14+', 'Apple Developer Account']
  },
  android: {
    name: 'Android App',
    icon: '🤖',
    features: ['Google Play distribution', 'Material Design', 'Google Pay integration', 'Android Auto'],
    estimatedTime: '6-8 weeks',
    requirements: ['Android Studio', 'Android 8+', 'Google Play Console']
  },
  reactNative: {
    name: 'React Native',
    icon: '⚛️',
    features: ['Cross-platform development', 'Shared codebase', 'Hot reload', 'Native performance'],
    estimatedTime: '8-10 weeks',
    requirements: ['Node.js', 'React Native CLI', 'Platform-specific tools']
  }
};

const MobileAppFoundation: React.FC<MobileAppFoundationProps> = ({ userId, onClose }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<'ios' | 'android' | 'reactNative'>('reactNative');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedProject, setGeneratedProject] = useState<any>(null);

  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  const handleGenerateProject = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate project generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const project = {
        platform: selectedPlatform,
        features: selectedFeatures,
        estimatedTime: calculateEstimatedTime(),
        generatedAt: new Date().toISOString()
      };
      
      setGeneratedProject(project);
    } catch (error) {
      console.error('Failed to generate project:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const calculateEstimatedTime = () => {
    const baseTime = PLATFORM_FEATURES[selectedPlatform].estimatedTime;
    const selectedFeatureObjects = MOBILE_FEATURES.filter(f => selectedFeatures.includes(f.id));
    const additionalWeeks = selectedFeatureObjects.reduce((total, feature) => {
      const weeks = parseInt(feature.estimatedDevelopment.split('-')[0]);
      return total + weeks;
    }, 0);
    
    return `${baseTime} + ${additionalWeeks} weeks for features`;
  };

  const getTotalEstimatedTime = () => {
    if (!generatedProject) return '0 weeks';
    return calculateEstimatedTime();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Mobile App Foundation</h2>
              <p className="text-green-100 mt-1">Build native mobile apps for iOS and Android</p>
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

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {!generatedProject ? (
            <div className="space-y-8">
              {/* Platform Selection */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Platform</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(PLATFORM_FEATURES).map(([key, platform]) => (
                    <motion.div
                      key={key}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedPlatform(key as any)}
                      className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                        selectedPlatform === key
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-4xl mb-3">{platform.icon}</div>
                        <h4 className="font-semibold text-gray-900 mb-2">{platform.name}</h4>
                        <p className="text-sm text-gray-600 mb-4">{platform.estimatedTime}</p>
                        
                        <div className="space-y-2">
                          <h5 className="text-sm font-medium text-gray-700">Features:</h5>
                          {platform.features.map((feature, index) => (
                            <div key={index} className="text-xs text-gray-600">• {feature}</div>
                          ))}
                        </div>
                        
                        <div className="mt-4">
                          <h5 className="text-sm font-medium text-gray-700">Requirements:</h5>
                          {platform.requirements.map((req, index) => (
                            <div key={index} className="text-xs text-gray-600">• {req}</div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Feature Selection */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {MOBILE_FEATURES.map((feature) => (
                    <motion.div
                      key={feature.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleFeatureToggle(feature.id)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedFeatures.includes(feature.id)
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center text-xl`}>
                          {feature.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium text-gray-900">{feature.name}</h4>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              feature.category === 'core' ? 'bg-blue-100 text-blue-800' :
                              feature.category === 'advanced' ? 'bg-purple-100 text-purple-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {feature.category}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{feature.description}</p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>Priority: {feature.priority}</span>
                            <span>Est: {feature.estimatedDevelopment}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Platform</h4>
                    <p className="text-sm text-gray-600">{PLATFORM_FEATURES[selectedPlatform].name}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Selected Features</h4>
                    <p className="text-sm text-gray-600">{selectedFeatures.length} features</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Estimated Time</h4>
                    <p className="text-sm text-gray-600">{calculateEstimatedTime()}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Generated Project View */
            <div className="space-y-6">
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="text-6xl mb-4"
                >
                  🎉
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Project Generated!</h3>
                <p className="text-gray-600">Your mobile app foundation is ready for development</p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Project Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium text-gray-700">Platform:</span>
                    <span className="ml-2 text-gray-600">{PLATFORM_FEATURES[generatedProject.platform].name}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Features:</span>
                    <span className="ml-2 text-gray-600">{generatedProject.features.length} selected</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Estimated Time:</span>
                    <span className="ml-2 text-gray-600">{getTotalEstimatedTime()}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Generated:</span>
                    <span className="ml-2 text-gray-600">{new Date(generatedProject.generatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Next Steps</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-4 bg-white border border-gray-200 rounded-lg">
                    <span className="text-2xl">📱</span>
                    <div>
                      <h5 className="font-medium text-gray-900">Set up development environment</h5>
                      <p className="text-sm text-gray-600">Install required tools and dependencies</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-white border border-gray-200 rounded-lg">
                    <span className="text-2xl">🏗️</span>
                    <div>
                      <h5 className="font-medium text-gray-900">Initialize project structure</h5>
                      <p className="text-sm text-gray-600">Create base app architecture and navigation</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-white border border-gray-200 rounded-lg">
                    <span className="text-2xl">🔧</span>
                    <div>
                      <h5 className="font-medium text-gray-900">Implement core features</h5>
                      <p className="text-sm text-gray-600">Build authentication, task management, and sync</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-white border border-gray-200 rounded-lg">
                    <span className="text-2xl">🚀</span>
                    <div>
                      <h5 className="font-medium text-gray-900">Deploy to app stores</h5>
                      <p className="text-sm text-gray-600">Submit for review and publication</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {!generatedProject ? (
              <>
                {selectedFeatures.length} feature{selectedFeatures.length !== 1 ? 's' : ''} selected
              </>
            ) : (
              <>
                Project generated successfully
              </>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              {generatedProject ? 'Close' : 'Cancel'}
            </button>
            {!generatedProject && (
              <button
                onClick={handleGenerateProject}
                disabled={isGenerating || selectedFeatures.length === 0}
                className="px-6 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? 'Generating...' : 'Generate Project'}
              </button>
            )}
            {generatedProject && (
              <button
                onClick={() => {
                  // TODO: Download project files or open in IDE
                  console.log('Opening project in development environment...');
                }}
                className="px-6 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all"
              >
                Open in IDE
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MobileAppFoundation;
