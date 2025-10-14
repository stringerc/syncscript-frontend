import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AccessibilityFeature {
  id: string;
  name: string;
  category: 'visual' | 'motor' | 'cognitive' | 'hearing' | 'speech';
  description: string;
  enabled: boolean;
  level: 'basic' | 'intermediate' | 'advanced';
  wcagLevel: 'A' | 'AA' | 'AAA';
  impact: 'low' | 'medium' | 'high';
}

interface AccessibilitySettings {
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  contrast: 'normal' | 'high' | 'extra-high';
  motion: 'full' | 'reduced' | 'none';
  focus: 'visible' | 'enhanced' | 'high-contrast';
  screenReader: boolean;
  keyboardNavigation: boolean;
  voiceControl: boolean;
  colorBlindness: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
}

interface AccessibilityMetrics {
  wcagCompliance: number;
  accessibilityScore: number;
  featuresEnabled: number;
  totalFeatures: number;
  userSatisfaction: number;
  usageStats: {
    screenReader: number;
    keyboardOnly: number;
    voiceControl: number;
    highContrast: number;
  };
}

const AdvancedAccessibilityFeatures: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [features, setFeatures] = useState<AccessibilityFeature[]>([]);
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 'medium',
    contrast: 'normal',
    motion: 'full',
    focus: 'visible',
    screenReader: false,
    keyboardNavigation: true,
    voiceControl: false,
    colorBlindness: 'none'
  });
  const [metrics, setMetrics] = useState<AccessibilityMetrics>({
    wcagCompliance: 0,
    accessibilityScore: 0,
    featuresEnabled: 0,
    totalFeatures: 0,
    userSatisfaction: 0,
    usageStats: {
      screenReader: 0,
      keyboardOnly: 0,
      voiceControl: 0,
      highContrast: 0
    }
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  // Generate accessibility features
  useEffect(() => {
    const generateFeatures = (): AccessibilityFeature[] => {
      const featureData = [
        // Visual Features
        { name: 'High Contrast Mode', category: 'visual', description: 'Enhanced contrast for better visibility', level: 'basic', wcagLevel: 'AA', impact: 'high' },
        { name: 'Font Size Adjustment', category: 'visual', description: 'Scalable text sizing options', level: 'basic', wcagLevel: 'AA', impact: 'high' },
        { name: 'Color Blind Support', category: 'visual', description: 'Color alternatives for colorblind users', level: 'intermediate', wcagLevel: 'AA', impact: 'medium' },
        { name: 'Focus Indicators', category: 'visual', description: 'Enhanced focus visibility', level: 'basic', wcagLevel: 'AA', impact: 'high' },
        { name: 'Dark Mode', category: 'visual', description: 'Dark theme for reduced eye strain', level: 'basic', wcagLevel: 'AA', impact: 'medium' },
        
        // Motor Features
        { name: 'Keyboard Navigation', category: 'motor', description: 'Full keyboard accessibility', level: 'basic', wcagLevel: 'AA', impact: 'high' },
        { name: 'Voice Control', category: 'motor', description: 'Voice-activated commands', level: 'advanced', wcagLevel: 'AAA', impact: 'high' },
        { name: 'Gesture Alternatives', category: 'motor', description: 'Alternative input methods', level: 'intermediate', wcagLevel: 'AA', impact: 'medium' },
        { name: 'Click Targets', category: 'motor', description: 'Larger clickable areas', level: 'basic', wcagLevel: 'AA', impact: 'high' },
        { name: 'Drag & Drop Alternatives', category: 'motor', description: 'Keyboard alternatives for drag operations', level: 'intermediate', wcagLevel: 'AA', impact: 'medium' },
        
        // Cognitive Features
        { name: 'Simplified Interface', category: 'cognitive', description: 'Reduced complexity mode', level: 'basic', wcagLevel: 'AA', impact: 'high' },
        { name: 'Progress Indicators', category: 'cognitive', description: 'Clear progress feedback', level: 'basic', wcagLevel: 'AA', impact: 'medium' },
        { name: 'Error Prevention', category: 'cognitive', description: 'Helpful error messages and prevention', level: 'intermediate', wcagLevel: 'AA', impact: 'high' },
        { name: 'Consistent Navigation', category: 'cognitive', description: 'Predictable navigation patterns', level: 'basic', wcagLevel: 'AA', impact: 'high' },
        { name: 'Help & Documentation', category: 'cognitive', description: 'Contextual help and guidance', level: 'intermediate', wcagLevel: 'AA', impact: 'medium' },
        
        // Hearing Features
        { name: 'Visual Alerts', category: 'hearing', description: 'Visual alternatives to audio cues', level: 'basic', wcagLevel: 'AA', impact: 'high' },
        { name: 'Caption Support', category: 'hearing', description: 'Closed captions for multimedia', level: 'basic', wcagLevel: 'AA', impact: 'high' },
        { name: 'Volume Controls', category: 'hearing', description: 'Independent volume controls', level: 'basic', wcagLevel: 'AA', impact: 'medium' },
        
        // Speech Features
        { name: 'Screen Reader Support', category: 'speech', description: 'ARIA labels and semantic markup', level: 'basic', wcagLevel: 'AA', impact: 'high' },
        { name: 'Text-to-Speech', category: 'speech', description: 'Audio content reading', level: 'intermediate', wcagLevel: 'AA', impact: 'medium' },
        { name: 'Speech Recognition', category: 'speech', description: 'Voice input capabilities', level: 'advanced', wcagLevel: 'AAA', impact: 'high' }
      ];

      return featureData.map((feature, index) => ({
        id: `feature-${index}`,
        ...feature,
        enabled: Math.random() > 0.3
      }));
    };

    const features = generateFeatures();
    setFeatures(features);

    // Calculate metrics
    const enabledFeatures = features.filter(f => f.enabled).length;
    const wcagCompliance = (enabledFeatures / features.length) * 100;
    const accessibilityScore = Math.min(100, wcagCompliance + (Math.random() * 20));
    const userSatisfaction = Math.random() * 20 + 80;

    setMetrics({
      wcagCompliance,
      accessibilityScore,
      featuresEnabled: enabledFeatures,
      totalFeatures: features.length,
      userSatisfaction,
      usageStats: {
        screenReader: Math.floor(Math.random() * 50) + 10,
        keyboardOnly: Math.floor(Math.random() * 100) + 20,
        voiceControl: Math.floor(Math.random() * 30) + 5,
        highContrast: Math.floor(Math.random() * 80) + 15
      }
    });
  }, []);

  const filteredFeatures = features.filter(feature => 
    (selectedCategory === 'all' || feature.category === selectedCategory) &&
    (selectedLevel === 'all' || feature.level === selectedLevel)
  );

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'visual': return 'bg-blue-100 text-blue-800';
      case 'motor': return 'bg-green-100 text-green-800';
      case 'cognitive': return 'bg-purple-100 text-purple-800';
      case 'hearing': return 'bg-orange-100 text-orange-800';
      case 'speech': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level: string): string => {
    switch (level) {
      case 'basic': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getWCAGColor = (level: string): string => {
    switch (level) {
      case 'A': return 'bg-blue-100 text-blue-800';
      case 'AA': return 'bg-green-100 text-green-800';
      case 'AAA': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactColor = (impact: string): string => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number): string => {
    if (score >= 90) return '#10b981';
    if (score >= 70) return '#f59e0b';
    if (score >= 50) return '#f97316';
    return '#ef4444';
  };

  const toggleFeature = (featureId: string) => {
    setFeatures(prev => prev.map(feature => 
      feature.id === featureId ? { ...feature, enabled: !feature.enabled } : feature
    ));
  };

  const updateSetting = (key: keyof AccessibilitySettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const categories = [
    { key: 'all', label: 'All Categories', count: features.length },
    { key: 'visual', label: 'Visual', count: features.filter(f => f.category === 'visual').length },
    { key: 'motor', label: 'Motor', count: features.filter(f => f.category === 'motor').length },
    { key: 'cognitive', label: 'Cognitive', count: features.filter(f => f.category === 'cognitive').length },
    { key: 'hearing', label: 'Hearing', count: features.filter(f => f.category === 'hearing').length },
    { key: 'speech', label: 'Speech', count: features.filter(f => f.category === 'speech').length }
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
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">♿ Advanced Accessibility Features</h2>
              <p className="text-blue-100 mt-1">WCAG compliance and assistive technology support</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div 
                  className="text-3xl font-bold"
                  style={{ color: getScoreColor(metrics.accessibilityScore) }}
                >
                  {metrics.accessibilityScore.toFixed(0)}
                </div>
                <div className="text-sm text-blue-100">
                  Accessibility Score
                </div>
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
        </div>

        <div className="p-6 h-full overflow-y-auto">
          {/* Accessibility Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">WCAG Compliance</p>
                  <p className="text-2xl font-bold text-blue-800">{metrics.wcagCompliance.toFixed(0)}%</p>
                </div>
                <div className="text-3xl">♿</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Features Enabled</p>
                  <p className="text-2xl font-bold text-green-800">{metrics.featuresEnabled}/{metrics.totalFeatures}</p>
                </div>
                <div className="text-3xl">✅</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">User Satisfaction</p>
                  <p className="text-2xl font-bold text-purple-800">{metrics.userSatisfaction.toFixed(0)}%</p>
                </div>
                <div className="text-3xl">😊</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Screen Reader Users</p>
                  <p className="text-2xl font-bold text-orange-800">{metrics.usageStats.screenReader}</p>
                </div>
                <div className="text-3xl">👁️</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 font-medium">Keyboard Only</p>
                  <p className="text-2xl font-bold text-red-800">{metrics.usageStats.keyboardOnly}</p>
                </div>
                <div className="text-3xl">⌨️</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-indigo-600 font-medium">Voice Control</p>
                  <p className="text-2xl font-bold text-indigo-800">{metrics.usageStats.voiceControl}</p>
                </div>
                <div className="text-3xl">🎤</div>
              </div>
            </div>
          </div>

          {/* Accessibility Settings */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Accessibility Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
                <select
                  value={settings.fontSize}
                  onChange={(e) => updateSetting('fontSize', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="extra-large">Extra Large</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contrast</label>
                <select
                  value={settings.contrast}
                  onChange={(e) => updateSetting('contrast', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="extra-high">Extra High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Motion</label>
                <select
                  value={settings.motion}
                  onChange={(e) => updateSetting('motion', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="full">Full Motion</option>
                  <option value="reduced">Reduced Motion</option>
                  <option value="none">No Motion</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Focus Indicators</label>
                <select
                  value={settings.focus}
                  onChange={(e) => updateSetting('focus', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="visible">Visible</option>
                  <option value="enhanced">Enhanced</option>
                  <option value="high-contrast">High Contrast</option>
                </select>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="screenReader"
                  checked={settings.screenReader}
                  onChange={(e) => updateSetting('screenReader', e.target.checked)}
                  className="rounded mr-2"
                />
                <label htmlFor="screenReader" className="text-sm text-gray-700">Screen Reader Support</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="keyboardNavigation"
                  checked={settings.keyboardNavigation}
                  onChange={(e) => updateSetting('keyboardNavigation', e.target.checked)}
                  className="rounded mr-2"
                />
                <label htmlFor="keyboardNavigation" className="text-sm text-gray-700">Keyboard Navigation</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="voiceControl"
                  checked={settings.voiceControl}
                  onChange={(e) => updateSetting('voiceControl', e.target.checked)}
                  className="rounded mr-2"
                />
                <label htmlFor="voiceControl" className="text-sm text-gray-700">Voice Control</label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Color Blindness</label>
                <select
                  value={settings.colorBlindness}
                  onChange={(e) => updateSetting('colorBlindness', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="none">None</option>
                  <option value="protanopia">Protanopia</option>
                  <option value="deuteranopia">Deuteranopia</option>
                  <option value="tritanopia">Tritanopia</option>
                </select>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Category:</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                  >
                    {categories.map(category => (
                      <option key={category.key} value={category.key}>
                        {category.label} ({category.count})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Level:</label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="all">All Levels</option>
                    <option value="basic">Basic</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>

          {/* Accessibility Features */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Accessibility Features ({filteredFeatures.length})</h3>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">WCAG</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredFeatures.map((feature) => (
                    <tr key={feature.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{feature.name}</div>
                          <div className="text-sm text-gray-500">{feature.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(feature.category)}`}>
                          {feature.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getLevelColor(feature.level)}`}>
                          {feature.level}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getWCAGColor(feature.wcagLevel)}`}>
                          {feature.wcagLevel}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getImpactColor(feature.impact)}`}>
                          {feature.impact}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          feature.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {feature.enabled ? 'Enabled' : 'Disabled'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => toggleFeature(feature.id)}
                          className={`transition-colors ${
                            feature.enabled 
                              ? 'text-red-600 hover:text-red-900' 
                              : 'text-green-600 hover:text-green-900'
                          }`}
                        >
                          {feature.enabled ? 'Disable' : 'Enable'}
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

export default AdvancedAccessibilityFeatures;
