import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface UXMetric {
  id: string;
  name: string;
  category: 'usability' | 'performance' | 'engagement' | 'satisfaction' | 'conversion';
  value: number;
  target: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
  unit: string;
  description: string;
}

interface UserBehavior {
  id: string;
  userId: string;
  action: string;
  page: string;
  timestamp: Date;
  duration: number;
  success: boolean;
  device: string;
  browser: string;
  location: string;
}

interface UXInsight {
  id: string;
  type: 'opportunity' | 'issue' | 'trend' | 'recommendation';
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  effort: 'low' | 'medium' | 'high';
  priority: number;
  category: string;
}

interface UXHeatmap {
  id: string;
  page: string;
  element: string;
  clicks: number;
  hovers: number;
  scrolls: number;
  engagement: number;
  conversion: number;
}

const UserExperienceAnalytics: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [metrics, setMetrics] = useState<UXMetric[]>([]);
  const [behaviors, setBehaviors] = useState<UserBehavior[]>([]);
  const [insights, setInsights] = useState<UXInsight[]>([]);
  const [heatmaps, setHeatmaps] = useState<UXHeatmap[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState<'1h' | '24h' | '7d' | '30d'>('24h');
  const [selectedPage, setSelectedPage] = useState<string>('all');

  // Generate UX data
  useEffect(() => {
    const generateMetrics = (): UXMetric[] => {
      const metricData = [
        // Usability Metrics
        { name: 'Task Success Rate', category: 'usability', value: 87, target: 90, trend: 'up', change: 3, unit: '%', description: 'Percentage of users completing tasks successfully' },
        { name: 'Time to Complete Task', category: 'usability', value: 2.3, target: 2.0, trend: 'down', change: -0.2, unit: 'min', description: 'Average time to complete primary tasks' },
        { name: 'Error Rate', category: 'usability', value: 5.2, target: 3.0, trend: 'down', change: -1.1, unit: '%', description: 'Percentage of user interactions resulting in errors' },
        { name: 'Learnability Score', category: 'usability', value: 8.4, target: 8.0, trend: 'up', change: 0.3, unit: '/10', description: 'Ease of learning new features' },
        
        // Performance Metrics
        { name: 'Page Load Time', category: 'performance', value: 1.2, target: 1.0, trend: 'down', change: -0.1, unit: 's', description: 'Average page load time' },
        { name: 'First Contentful Paint', category: 'performance', value: 0.8, target: 0.6, trend: 'down', change: -0.05, unit: 's', description: 'Time to first contentful paint' },
        { name: 'Interaction Response', category: 'performance', value: 120, target: 100, trend: 'down', change: -15, unit: 'ms', description: 'Average interaction response time' },
        { name: 'Core Web Vitals', category: 'performance', value: 92, target: 90, trend: 'up', change: 2, unit: '/100', description: 'Google Core Web Vitals score' },
        
        // Engagement Metrics
        { name: 'Session Duration', category: 'engagement', value: 8.5, target: 10.0, trend: 'up', change: 0.8, unit: 'min', description: 'Average session duration' },
        { name: 'Pages per Session', category: 'engagement', value: 4.2, target: 5.0, trend: 'up', change: 0.3, unit: 'pages', description: 'Average pages viewed per session' },
        { name: 'Bounce Rate', category: 'engagement', value: 35, target: 30, trend: 'down', change: -2, unit: '%', description: 'Percentage of single-page sessions' },
        { name: 'Return Visitor Rate', category: 'engagement', value: 68, target: 70, trend: 'up', change: 3, unit: '%', description: 'Percentage of returning users' },
        
        // Satisfaction Metrics
        { name: 'User Satisfaction', category: 'satisfaction', value: 4.3, target: 4.5, trend: 'up', change: 0.2, unit: '/5', description: 'Average user satisfaction rating' },
        { name: 'Net Promoter Score', category: 'satisfaction', value: 42, target: 50, trend: 'up', change: 5, unit: 'NPS', description: 'Net Promoter Score' },
        { name: 'Support Tickets', category: 'satisfaction', value: 12, target: 10, trend: 'down', change: -3, unit: 'tickets', description: 'Average support tickets per day' },
        { name: 'Feature Adoption', category: 'satisfaction', value: 78, target: 80, trend: 'up', change: 4, unit: '%', description: 'Percentage of users adopting new features' },
        
        // Conversion Metrics
        { name: 'Conversion Rate', category: 'conversion', value: 3.2, target: 4.0, trend: 'up', change: 0.3, unit: '%', description: 'Overall conversion rate' },
        { name: 'Funnel Completion', category: 'conversion', value: 65, target: 70, trend: 'up', change: 2, unit: '%', description: 'Funnel completion rate' },
        { name: 'Cart Abandonment', category: 'conversion', value: 68, target: 60, trend: 'down', change: -3, unit: '%', description: 'Shopping cart abandonment rate' },
        { name: 'Feature Usage', category: 'conversion', value: 45, target: 50, trend: 'up', change: 2, unit: '%', description: 'Percentage of users using key features' }
      ];

      return metricData.map((metric, index) => ({
        id: `metric-${index}`,
        ...metric
      }));
    };

    const generateBehaviors = (): UserBehavior[] => {
      const actions = ['click', 'scroll', 'hover', 'form_submit', 'navigation', 'search', 'download'];
      const pages = ['dashboard', 'tasks', 'analytics', 'settings', 'profile', 'help'];
      const devices = ['desktop', 'mobile', 'tablet'];
      const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge'];
      const locations = ['US', 'UK', 'CA', 'AU', 'DE', 'FR'];

      const behaviors: UserBehavior[] = [];
      for (let i = 0; i < 200; i++) {
        const action = actions[Math.floor(Math.random() * actions.length)];
        const page = pages[Math.floor(Math.random() * pages.length)];
        const device = devices[Math.floor(Math.random() * devices.length)];
        const browser = browsers[Math.floor(Math.random() * browsers.length)];
        const location = locations[Math.floor(Math.random() * locations.length)];

        behaviors.push({
          id: `behavior-${i}`,
          userId: `user-${Math.floor(Math.random() * 1000)}`,
          action,
          page,
          timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
          duration: Math.random() * 300 + 10,
          success: Math.random() > 0.2,
          device,
          browser,
          location
        });
      }

      return behaviors.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    };

    const generateInsights = (): UXInsight[] => {
      return [
        {
          id: 'insight-1',
          type: 'opportunity',
          title: 'Mobile Optimization Opportunity',
          description: 'Mobile users show 23% lower task completion rates. Consider improving mobile interface.',
          impact: 'high',
          effort: 'medium',
          priority: 8,
          category: 'usability'
        },
        {
          id: 'insight-2',
          type: 'issue',
          title: 'High Error Rate on Form Submissions',
          description: 'Form submission errors increased by 15% this week. Check validation logic.',
          impact: 'high',
          effort: 'low',
          priority: 9,
          category: 'usability'
        },
        {
          id: 'insight-3',
          type: 'trend',
          title: 'Increasing Session Duration',
          description: 'Average session duration increased by 12% over the past month.',
          impact: 'medium',
          effort: 'low',
          priority: 5,
          category: 'engagement'
        },
        {
          id: 'insight-4',
          type: 'recommendation',
          title: 'Implement Progressive Loading',
          description: 'Implement progressive loading to improve perceived performance.',
          impact: 'medium',
          effort: 'high',
          priority: 6,
          category: 'performance'
        }
      ];
    };

    const generateHeatmaps = (): UXHeatmap[] => {
      const pages = ['dashboard', 'tasks', 'analytics', 'settings'];
      const elements = ['button', 'link', 'form', 'navigation', 'content'];

      const heatmaps: UXHeatmap[] = [];
      for (let i = 0; i < 50; i++) {
        const page = pages[Math.floor(Math.random() * pages.length)];
        const element = elements[Math.floor(Math.random() * elements.length)];

        heatmaps.push({
          id: `heatmap-${i}`,
          page,
          element: `${element}-${i}`,
          clicks: Math.floor(Math.random() * 1000) + 100,
          hovers: Math.floor(Math.random() * 2000) + 200,
          scrolls: Math.floor(Math.random() * 500) + 50,
          engagement: Math.random() * 100,
          conversion: Math.random() * 20
        });
      }

      return heatmaps;
    };

    setMetrics(generateMetrics());
    setBehaviors(generateBehaviors());
    setInsights(generateInsights());
    setHeatmaps(generateHeatmaps());
  }, []);

  const filteredMetrics = metrics.filter(metric => 
    selectedCategory === 'all' || metric.category === selectedCategory
  );

  const filteredBehaviors = behaviors.filter(behavior => 
    selectedPage === 'all' || behavior.page === selectedPage
  );

  const formatDate = (date: Date): string => {
    return date.toLocaleString();
  };

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'usability': return 'bg-blue-100 text-blue-800';
      case 'performance': return 'bg-green-100 text-green-800';
      case 'engagement': return 'bg-purple-100 text-purple-800';
      case 'satisfaction': return 'bg-yellow-100 text-yellow-800';
      case 'conversion': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: string): string => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  };

  const getTrendColor = (trend: string): string => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getInsightTypeColor = (type: string): string => {
    switch (type) {
      case 'opportunity': return 'bg-blue-100 text-blue-800';
      case 'issue': return 'bg-red-100 text-red-800';
      case 'trend': return 'bg-green-100 text-green-800';
      case 'recommendation': return 'bg-purple-100 text-purple-800';
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

  const getEffortColor = (effort: string): string => {
    switch (effort) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMetricScore = (value: number, target: number): number => {
    return Math.min(100, (value / target) * 100);
  };

  const getScoreColor = (score: number): string => {
    if (score >= 90) return '#10b981';
    if (score >= 70) return '#f59e0b';
    if (score >= 50) return '#f97316';
    return '#ef4444';
  };

  const categories = [
    { key: 'all', label: 'All Categories', count: metrics.length },
    { key: 'usability', label: 'Usability', count: metrics.filter(m => m.category === 'usability').length },
    { key: 'performance', label: 'Performance', count: metrics.filter(m => m.category === 'performance').length },
    { key: 'engagement', label: 'Engagement', count: metrics.filter(m => m.category === 'engagement').length },
    { key: 'satisfaction', label: 'Satisfaction', count: metrics.filter(m => m.category === 'satisfaction').length },
    { key: 'conversion', label: 'Conversion', count: metrics.filter(m => m.category === 'conversion').length }
  ];

  const pages = [
    { key: 'all', label: 'All Pages', count: behaviors.length },
    { key: 'dashboard', label: 'Dashboard', count: behaviors.filter(b => b.page === 'dashboard').length },
    { key: 'tasks', label: 'Tasks', count: behaviors.filter(b => b.page === 'tasks').length },
    { key: 'analytics', label: 'Analytics', count: behaviors.filter(b => b.page === 'analytics').length },
    { key: 'settings', label: 'Settings', count: behaviors.filter(b => b.page === 'settings').length }
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
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">📊 User Experience Analytics</h2>
              <p className="text-purple-100 mt-1">UX metrics, user behavior, and insights</p>
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
          {/* UX Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Task Success</p>
                  <p className="text-2xl font-bold text-blue-800">87%</p>
                </div>
                <div className="text-3xl">✅</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Satisfaction</p>
                  <p className="text-2xl font-bold text-green-800">4.3/5</p>
                </div>
                <div className="text-3xl">😊</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Engagement</p>
                  <p className="text-2xl font-bold text-purple-800">8.5m</p>
                </div>
                <div className="text-3xl">⏱️</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Performance</p>
                  <p className="text-2xl font-bold text-orange-800">1.2s</p>
                </div>
                <div className="text-3xl">⚡</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 font-medium">Conversion</p>
                  <p className="text-2xl font-bold text-red-800">3.2%</p>
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
                  <label className="text-sm font-medium text-gray-700">Time Range:</label>
                  <select
                    value={selectedTimeRange}
                    onChange={(e) => setSelectedTimeRange(e.target.value as any)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="1h">Last Hour</option>
                    <option value="24h">Last 24 Hours</option>
                    <option value="7d">Last 7 Days</option>
                    <option value="30d">Last 30 Days</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-gray-700">Page:</label>
                  <select
                    value={selectedPage}
                    onChange={(e) => setSelectedPage(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                  >
                    {pages.map(page => (
                      <option key={page.key} value={page.key}>
                        {page.label} ({page.count})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>

          {/* UX Insights */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">UX Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {insights.map((insight) => (
                <div key={insight.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{insight.title}</h4>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getInsightTypeColor(insight.type)}`}>
                      {insight.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getImpactColor(insight.impact)}`}>
                        Impact: {insight.impact}
                      </span>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getEffortColor(insight.effort)}`}>
                        Effort: {insight.effort}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Priority: {insight.priority}/10
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* UX Metrics */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">UX Metrics ({filteredMetrics.length})</h3>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredMetrics.map((metric) => {
                    const score = getMetricScore(metric.value, metric.target);
                    return (
                      <tr key={metric.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{metric.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(metric.category)}`}>
                            {metric.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {metric.value}{metric.unit}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {metric.target}{metric.unit}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-lg mr-1">{getTrendIcon(metric.trend)}</span>
                            <span className={`text-sm ${getTrendColor(metric.trend)}`}>
                              {metric.change > 0 ? '+' : ''}{metric.change}{metric.unit}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className="h-2 rounded-full"
                                style={{ 
                                  width: `${score}%`,
                                  backgroundColor: getScoreColor(score)
                                }}
                              ></div>
                            </div>
                            <span 
                              className="text-sm font-medium"
                              style={{ color: getScoreColor(score) }}
                            >
                              {score.toFixed(0)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {metric.description}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserExperienceAnalytics;
