import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PersonalizationRule {
  id: string;
  name: string;
  type: 'content' | 'layout' | 'feature' | 'workflow' | 'notification';
  condition: string;
  action: string;
  priority: number;
  enabled: boolean;
  effectiveness: number;
  userSegment: string;
  lastTriggered: Date;
}

interface UserSegment {
  id: string;
  name: string;
  description: string;
  criteria: string[];
  userCount: number;
  conversionRate: number;
  engagement: number;
  preferences: UserPreferences;
}

interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  layout: 'compact' | 'comfortable' | 'spacious';
  notifications: {
    email: boolean;
    push: boolean;
    inApp: boolean;
    frequency: 'immediate' | 'daily' | 'weekly';
  };
  features: {
    advancedAnalytics: boolean;
    aiSuggestions: boolean;
    automation: boolean;
    integrations: boolean;
  };
  language: string;
  timezone: string;
  dateFormat: string;
  currency: string;
}

interface PersonalizationMetric {
  metric: string;
  value: number;
  improvement: number;
  segment: string;
  period: string;
}

const PersonalizationEngine: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [rules, setRules] = useState<PersonalizationRule[]>([]);
  const [segments, setSegments] = useState<UserSegment[]>([]);
  const [metrics, setMetrics] = useState<PersonalizationMetric[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSegment, setSelectedSegment] = useState<string>('all');
  const [isCreatingRule, setIsCreatingRule] = useState(false);

  // Generate personalization data
  useEffect(() => {
    const generateRules = (): PersonalizationRule[] => {
      const ruleTypes: PersonalizationRule['type'][] = ['content', 'layout', 'feature', 'workflow', 'notification'];
      const segments = ['new_users', 'power_users', 'casual_users', 'enterprise_users', 'mobile_users'];
      
      const ruleData = [
        { name: 'Show Welcome Tour', condition: 'user.first_login', action: 'display_tour', priority: 10 },
        { name: 'Enable Advanced Features', condition: 'user.plan === "premium"', action: 'enable_features', priority: 8 },
        { name: 'Mobile-Optimized Layout', condition: 'device.type === "mobile"', action: 'mobile_layout', priority: 9 },
        { name: 'Personalized Dashboard', condition: 'user.role === "manager"', action: 'manager_dashboard', priority: 7 },
        { name: 'AI Suggestions', condition: 'user.activity_level > 0.7', action: 'show_ai_suggestions', priority: 6 },
        { name: 'Reduced Notifications', condition: 'user.preferences.notifications === "minimal"', action: 'reduce_notifications', priority: 5 },
        { name: 'Dark Mode Auto', condition: 'time.hour > 18 || time.hour < 6', action: 'enable_dark_mode', priority: 4 },
        { name: 'Quick Actions', condition: 'user.efficiency_score > 0.8', action: 'show_quick_actions', priority: 3 }
      ];

      return ruleData.map((rule, index) => {
        const type = ruleTypes[Math.floor(Math.random() * ruleTypes.length)];
        const segment = segments[Math.floor(Math.random() * segments.length)];
        const effectiveness = Math.random() * 100;
        const enabled = Math.random() > 0.2;

        return {
          id: `rule-${index}`,
          name: rule.name,
          type,
          condition: rule.condition,
          action: rule.action,
          priority: rule.priority,
          enabled,
          effectiveness,
          userSegment: segment,
          lastTriggered: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
        };
      });
    };

    const generateSegments = (): UserSegment[] => {
      const segmentData = [
        {
          name: 'New Users',
          description: 'Users who joined in the last 30 days',
          criteria: ['signup_date > 30_days_ago', 'login_count < 10'],
          userCount: 1250,
          conversionRate: 15.2,
          engagement: 3.2
        },
        {
          name: 'Power Users',
          description: 'Highly active users with advanced usage',
          criteria: ['login_frequency > 5_per_week', 'feature_usage > 0.8'],
          userCount: 890,
          conversionRate: 45.6,
          engagement: 8.7
        },
        {
          name: 'Casual Users',
          description: 'Regular users with moderate activity',
          criteria: ['login_frequency > 1_per_week', 'feature_usage < 0.5'],
          userCount: 2100,
          conversionRate: 25.3,
          engagement: 5.1
        },
        {
          name: 'Enterprise Users',
          description: 'Business users with team features',
          criteria: ['plan_type === "enterprise"', 'team_size > 5'],
          userCount: 450,
          conversionRate: 78.9,
          engagement: 9.2
        },
        {
          name: 'Mobile Users',
          description: 'Users primarily accessing via mobile',
          criteria: ['mobile_usage > 0.7', 'device_type === "mobile"'],
          userCount: 1800,
          conversionRate: 22.1,
          engagement: 4.8
        }
      ];

      return segmentData.map((segment, index) => ({
        id: `segment-${index}`,
        ...segment,
        preferences: {
          theme: ['light', 'dark', 'auto'][Math.floor(Math.random() * 3)] as any,
          layout: ['compact', 'comfortable', 'spacious'][Math.floor(Math.random() * 3)] as any,
          notifications: {
            email: Math.random() > 0.3,
            push: Math.random() > 0.5,
            inApp: Math.random() > 0.2,
            frequency: ['immediate', 'daily', 'weekly'][Math.floor(Math.random() * 3)] as any
          },
          features: {
            advancedAnalytics: Math.random() > 0.4,
            aiSuggestions: Math.random() > 0.3,
            automation: Math.random() > 0.5,
            integrations: Math.random() > 0.6
          },
          language: 'en',
          timezone: 'UTC',
          dateFormat: 'MM/DD/YYYY',
          currency: 'USD'
        }
      }));
    };

    const generateMetrics = (): PersonalizationMetric[] => {
      const metrics = [
        { metric: 'Engagement Rate', improvement: 23.5, segment: 'power_users', period: '30d' },
        { metric: 'Conversion Rate', improvement: 18.2, segment: 'new_users', period: '30d' },
        { metric: 'Session Duration', improvement: 15.7, segment: 'casual_users', period: '30d' },
        { metric: 'Feature Adoption', improvement: 31.8, segment: 'enterprise_users', period: '30d' },
        { metric: 'User Satisfaction', improvement: 12.4, segment: 'mobile_users', period: '30d' },
        { metric: 'Task Completion', improvement: 27.3, segment: 'power_users', period: '30d' }
      ];

      return metrics.map((metric, index) => ({
        id: `metric-${index}`,
        ...metric,
        value: Math.random() * 100 + 50
      }));
    };

    setRules(generateRules());
    setSegments(generateSegments());
    setMetrics(generateMetrics());
  }, []);

  const filteredRules = rules.filter(rule => 
    (selectedType === 'all' || rule.type === selectedType) &&
    (selectedSegment === 'all' || rule.userSegment === selectedSegment)
  );

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString();
  };

  const getTypeColor = (type: string): string => {
    switch (type) {
      case 'content': return 'bg-blue-100 text-blue-800';
      case 'layout': return 'bg-green-100 text-green-800';
      case 'feature': return 'bg-purple-100 text-purple-800';
      case 'workflow': return 'bg-orange-100 text-orange-800';
      case 'notification': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: number): string => {
    if (priority >= 8) return 'bg-red-100 text-red-800';
    if (priority >= 5) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const getEffectivenessColor = (effectiveness: number): string => {
    if (effectiveness >= 80) return '#10b981';
    if (effectiveness >= 60) return '#f59e0b';
    if (effectiveness >= 40) return '#f97316';
    return '#ef4444';
  };

  const getImprovementColor = (improvement: number): string => {
    if (improvement > 0) return 'text-green-600';
    if (improvement < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const toggleRule = (ruleId: string) => {
    setRules(prev => prev.map(rule => 
      rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const createNewRule = async () => {
    setIsCreatingRule(true);
    
    // Simulate rule creation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newRule: PersonalizationRule = {
      id: `rule-${Date.now()}`,
      name: 'Custom Rule',
      type: 'content',
      condition: 'user.custom_condition',
      action: 'custom_action',
      priority: 5,
      enabled: true,
      effectiveness: Math.random() * 100,
      userSegment: 'all_users',
      lastTriggered: new Date()
    };

    setRules(prev => [newRule, ...prev]);
    setIsCreatingRule(false);
  };

  const types = [
    { key: 'all', label: 'All Types', count: rules.length },
    { key: 'content', label: 'Content', count: rules.filter(r => r.type === 'content').length },
    { key: 'layout', label: 'Layout', count: rules.filter(r => r.type === 'layout').length },
    { key: 'feature', label: 'Feature', count: rules.filter(r => r.type === 'feature').length },
    { key: 'workflow', label: 'Workflow', count: rules.filter(r => r.type === 'workflow').length },
    { key: 'notification', label: 'Notification', count: rules.filter(r => r.type === 'notification').length }
  ];

  const segmentOptions = [
    { key: 'all', label: 'All Segments', count: rules.length },
    { key: 'new_users', label: 'New Users', count: rules.filter(r => r.userSegment === 'new_users').length },
    { key: 'power_users', label: 'Power Users', count: rules.filter(r => r.userSegment === 'power_users').length },
    { key: 'casual_users', label: 'Casual Users', count: rules.filter(r => r.userSegment === 'casual_users').length },
    { key: 'enterprise_users', label: 'Enterprise Users', count: rules.filter(r => r.userSegment === 'enterprise_users').length },
    { key: 'mobile_users', label: 'Mobile Users', count: rules.filter(r => r.userSegment === 'mobile_users').length }
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
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">🎨 Personalization Engine</h2>
              <p className="text-indigo-100 mt-1">AI-powered user experience customization</p>
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
          {/* Personalization Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Active Rules</p>
                  <p className="text-2xl font-bold text-blue-800">{rules.filter(r => r.enabled).length}</p>
                </div>
                <div className="text-3xl">⚙️</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">User Segments</p>
                  <p className="text-2xl font-bold text-green-800">{segments.length}</p>
                </div>
                <div className="text-3xl">👥</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Avg Effectiveness</p>
                  <p className="text-2xl font-bold text-purple-800">
                    {(rules.reduce((sum, r) => sum + r.effectiveness, 0) / rules.length).toFixed(0)}%
                  </p>
                </div>
                <div className="text-3xl">📈</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Engagement Boost</p>
                  <p className="text-2xl font-bold text-orange-800">+23%</p>
                </div>
                <div className="text-3xl">🚀</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 font-medium">Conversion Lift</p>
                  <p className="text-2xl font-bold text-red-800">+18%</p>
                </div>
                <div className="text-3xl">🎯</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Type:</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                  >
                    {types.map(type => (
                      <option key={type.key} value={type.key}>
                        {type.label} ({type.count})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Segment:</label>
                  <select
                    value={selectedSegment}
                    onChange={(e) => setSelectedSegment(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                  >
                    {segmentOptions.map(segment => (
                      <option key={segment.key} value={segment.key}>
                        {segment.label} ({segment.count})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={createNewRule}
                  disabled={isCreatingRule}
                  className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:opacity-50 transition-colors"
                >
                  {isCreatingRule ? '⏳ Creating...' : '➕ Create Rule'}
                </button>
              </div>
            </div>
          </div>

          {/* User Segments */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">User Segments</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {segments.map((segment) => (
                <div key={segment.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{segment.name}</h4>
                    <span className="text-sm text-gray-500">{segment.userCount} users</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{segment.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Conversion:</span>
                      <span className="font-medium text-green-600">{segment.conversionRate}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Engagement:</span>
                      <span className="font-medium text-blue-600">{segment.engagement}/10</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Criteria: {segment.criteria.join(', ')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Personalization Metrics */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Personalization Impact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {metrics.map((metric) => (
                <div key={metric.id} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">{metric.metric}</h4>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-2xl font-bold text-gray-900">{metric.value.toFixed(1)}</span>
                    <span className={`text-sm font-medium ${getImprovementColor(metric.improvement)}`}>
                      {metric.improvement > 0 ? '+' : ''}{metric.improvement}%
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div>Segment: {metric.segment}</div>
                    <div>Period: {metric.period}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Personalization Rules */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Personalization Rules ({filteredRules.length})</h3>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rule</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Segment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Effectiveness</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRules.map((rule) => (
                    <tr key={rule.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{rule.name}</div>
                          <div className="text-sm text-gray-500">If {rule.condition}</div>
                          <div className="text-sm text-gray-500">Then {rule.action}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(rule.type)}`}>
                          {rule.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(rule.priority)}`}>
                          {rule.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {rule.userSegment.replace('_', ' ')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="h-2 rounded-full"
                              style={{ 
                                width: `${rule.effectiveness}%`,
                                backgroundColor: getEffectivenessColor(rule.effectiveness)
                              }}
                            ></div>
                          </div>
                          <span 
                            className="text-sm font-medium"
                            style={{ color: getEffectivenessColor(rule.effectiveness) }}
                          >
                            {rule.effectiveness.toFixed(0)}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          rule.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {rule.enabled ? 'Enabled' : 'Disabled'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => toggleRule(rule.id)}
                          className={`transition-colors ${
                            rule.enabled 
                              ? 'text-red-600 hover:text-red-900' 
                              : 'text-green-600 hover:text-green-900'
                          }`}
                        >
                          {rule.enabled ? 'Disable' : 'Enable'}
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

export default PersonalizationEngine;
