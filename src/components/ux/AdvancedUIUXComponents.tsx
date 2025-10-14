import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface UIComponent {
  id: string;
  name: string;
  category: 'navigation' | 'forms' | 'data-display' | 'feedback' | 'layout' | 'media';
  description: string;
  usage: number;
  satisfaction: number;
  accessibility: number;
  performance: number;
  lastUpdated: Date;
  version: string;
  status: 'stable' | 'beta' | 'deprecated';
}

interface DesignSystem {
  id: string;
  name: string;
  type: 'color' | 'typography' | 'spacing' | 'icon' | 'animation';
  value: string;
  usage: number;
  consistency: number;
  accessibility: number;
}

interface UXPattern {
  id: string;
  name: string;
  category: 'interaction' | 'navigation' | 'content' | 'feedback';
  description: string;
  effectiveness: number;
  usage: number;
  bestPractices: string[];
  examples: string[];
}

interface ComponentMetric {
  component: string;
  metric: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  benchmark: number;
}

const AdvancedUIUXComponents: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [components, setComponents] = useState<UIComponent[]>([]);
  const [designSystem, setDesignSystem] = useState<DesignSystem[]>([]);
  const [patterns, setPatterns] = useState<UXPattern[]>([]);
  const [metrics, setMetrics] = useState<ComponentMetric[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isUpdatingComponent, setIsUpdatingComponent] = useState(false);

  // Generate UI/UX data
  useEffect(() => {
    const generateComponents = (): UIComponent[] => {
      const componentData = [
        // Navigation Components
        { name: 'Global Navigation', category: 'navigation', description: 'Main navigation bar with user menu', usage: 95, satisfaction: 4.2, accessibility: 92, performance: 88, version: '2.1.0', status: 'stable' },
        { name: 'Breadcrumb Navigation', category: 'navigation', description: 'Hierarchical navigation breadcrumbs', usage: 78, satisfaction: 4.0, accessibility: 89, performance: 95, version: '1.8.0', status: 'stable' },
        { name: 'Sidebar Navigation', category: 'navigation', description: 'Collapsible sidebar navigation', usage: 82, satisfaction: 4.1, accessibility: 85, performance: 90, version: '2.0.0', status: 'stable' },
        { name: 'Tab Navigation', category: 'navigation', description: 'Tabbed interface navigation', usage: 65, satisfaction: 3.9, accessibility: 87, performance: 92, version: '1.9.0', status: 'stable' },
        
        // Form Components
        { name: 'Smart Form Builder', category: 'forms', description: 'Dynamic form generation with validation', usage: 88, satisfaction: 4.3, accessibility: 94, performance: 85, version: '3.0.0', status: 'stable' },
        { name: 'Auto-complete Input', category: 'forms', description: 'Intelligent input with suggestions', usage: 72, satisfaction: 4.1, accessibility: 91, performance: 88, version: '2.2.0', status: 'stable' },
        { name: 'File Upload', category: 'forms', description: 'Drag-and-drop file upload component', usage: 69, satisfaction: 4.0, accessibility: 86, performance: 82, version: '2.1.0', status: 'stable' },
        { name: 'Date Picker', category: 'forms', description: 'Advanced date selection component', usage: 58, satisfaction: 3.8, accessibility: 89, performance: 90, version: '1.7.0', status: 'stable' },
        
        // Data Display Components
        { name: 'Interactive Charts', category: 'data-display', description: 'Dynamic data visualization charts', usage: 91, satisfaction: 4.4, accessibility: 88, performance: 85, version: '2.3.0', status: 'stable' },
        { name: 'Data Table', category: 'data-display', description: 'Sortable and filterable data table', usage: 94, satisfaction: 4.2, accessibility: 92, performance: 88, version: '2.0.0', status: 'stable' },
        { name: 'Card Grid', category: 'data-display', description: 'Responsive card layout system', usage: 87, satisfaction: 4.1, accessibility: 90, performance: 92, version: '1.9.0', status: 'stable' },
        { name: 'Progress Indicators', category: 'data-display', description: 'Visual progress and loading states', usage: 76, satisfaction: 4.0, accessibility: 93, performance: 95, version: '2.1.0', status: 'stable' },
        
        // Feedback Components
        { name: 'Toast Notifications', category: 'feedback', description: 'Non-intrusive notification system', usage: 89, satisfaction: 4.2, accessibility: 91, performance: 90, version: '2.0.0', status: 'stable' },
        { name: 'Modal Dialogs', category: 'feedback', description: 'Overlay dialogs and confirmations', usage: 83, satisfaction: 4.1, accessibility: 87, performance: 85, version: '1.8.0', status: 'stable' },
        { name: 'Tooltips', category: 'feedback', description: 'Contextual help and information', usage: 71, satisfaction: 3.9, accessibility: 89, performance: 88, version: '1.7.0', status: 'stable' },
        { name: 'Loading States', category: 'feedback', description: 'Skeleton and spinner loading components', usage: 85, satisfaction: 4.0, accessibility: 92, performance: 94, version: '2.1.0', status: 'stable' },
        
        // Layout Components
        { name: 'Responsive Grid', category: 'layout', description: 'Flexible grid layout system', usage: 96, satisfaction: 4.3, accessibility: 94, performance: 92, version: '2.0.0', status: 'stable' },
        { name: 'Flexbox Layout', category: 'layout', description: 'Modern flexbox-based layouts', usage: 88, satisfaction: 4.2, accessibility: 90, performance: 95, version: '1.9.0', status: 'stable' },
        { name: 'Container System', category: 'layout', description: 'Consistent container and spacing', usage: 92, satisfaction: 4.1, accessibility: 93, performance: 96, version: '2.1.0', status: 'stable' },
        
        // Media Components
        { name: 'Image Gallery', category: 'media', description: 'Interactive image gallery with lightbox', usage: 67, satisfaction: 4.0, accessibility: 85, performance: 82, version: '1.8.0', status: 'stable' },
        { name: 'Video Player', category: 'media', description: 'Custom video player with controls', usage: 54, satisfaction: 3.8, accessibility: 88, performance: 78, version: '1.6.0', status: 'stable' },
        { name: 'Audio Player', category: 'media', description: 'Custom audio player component', usage: 43, satisfaction: 3.7, accessibility: 86, performance: 85, version: '1.5.0', status: 'stable' }
      ];

      return componentData.map((component, index) => ({
        id: `component-${index}`,
        ...component,
        lastUpdated: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000)
      }));
    };

    const generateDesignSystem = (): DesignSystem[] => {
      const designData = [
        // Colors
        { name: 'Primary Blue', type: 'color', value: '#3B82F6', usage: 95, consistency: 98, accessibility: 92 },
        { name: 'Success Green', type: 'color', value: '#10B981', usage: 78, consistency: 96, accessibility: 94 },
        { name: 'Warning Orange', type: 'color', value: '#F59E0B', usage: 65, consistency: 94, accessibility: 89 },
        { name: 'Error Red', type: 'color', value: '#EF4444', usage: 72, consistency: 97, accessibility: 91 },
        
        // Typography
        { name: 'Heading Font', type: 'typography', value: 'Inter, sans-serif', usage: 92, consistency: 99, accessibility: 95 },
        { name: 'Body Font', type: 'typography', value: 'Inter, sans-serif', usage: 98, consistency: 99, accessibility: 96 },
        { name: 'Code Font', type: 'typography', value: 'JetBrains Mono, monospace', usage: 45, consistency: 97, accessibility: 88 },
        
        // Spacing
        { name: 'Base Spacing', type: 'spacing', value: '8px', usage: 96, consistency: 98, accessibility: 90 },
        { name: 'Component Spacing', type: 'spacing', value: '16px', usage: 89, consistency: 96, accessibility: 92 },
        { name: 'Section Spacing', type: 'spacing', value: '32px', usage: 85, consistency: 94, accessibility: 88 },
        
        // Icons
        { name: 'Icon Library', type: 'icon', value: 'Heroicons v2', usage: 87, consistency: 95, accessibility: 93 },
        { name: 'Icon Size', type: 'icon', value: '24px', usage: 82, consistency: 97, accessibility: 91 },
        
        // Animations
        { name: 'Ease Transition', type: 'animation', value: 'cubic-bezier(0.4, 0, 0.2, 1)', usage: 78, consistency: 96, accessibility: 85 },
        { name: 'Duration', type: 'animation', value: '200ms', usage: 84, consistency: 98, accessibility: 87 }
      ];

      return designData.map((design, index) => ({
        id: `design-${index}`,
        ...design
      }));
    };

    const generatePatterns = (): UXPattern[] => {
      const patternData = [
        {
          name: 'Progressive Disclosure',
          category: 'interaction',
          description: 'Gradually revealing information to reduce cognitive load',
          effectiveness: 87,
          usage: 78,
          bestPractices: ['Start with essential information', 'Use clear visual hierarchy', 'Provide clear next steps'],
          examples: ['Accordion menus', 'Multi-step forms', 'Expandable cards']
        },
        {
          name: 'Consistent Navigation',
          category: 'navigation',
          description: 'Maintaining consistent navigation patterns across the application',
          effectiveness: 92,
          usage: 95,
          bestPractices: ['Keep navigation in the same location', 'Use consistent labels', 'Maintain visual hierarchy'],
          examples: ['Global navigation bar', 'Breadcrumb trails', 'Sidebar navigation']
        },
        {
          name: 'Contextual Help',
          category: 'content',
          description: 'Providing help and guidance when users need it',
          effectiveness: 81,
          usage: 65,
          bestPractices: ['Provide help at the point of need', 'Use clear, concise language', 'Offer multiple help formats'],
          examples: ['Tooltips', 'Inline help text', 'Contextual tutorials']
        },
        {
          name: 'Immediate Feedback',
          category: 'feedback',
          description: 'Providing instant feedback for user actions',
          effectiveness: 89,
          usage: 82,
          bestPractices: ['Respond to every user action', 'Use appropriate feedback types', 'Keep feedback concise'],
          examples: ['Form validation', 'Button states', 'Loading indicators']
        }
      ];

      return patternData.map((pattern, index) => ({
        id: `pattern-${index}`,
        ...pattern
      }));
    };

    const generateMetrics = (): ComponentMetric[] => {
      const metrics = [
        { component: 'Global Navigation', metric: 'Click-through Rate', value: 78.5, trend: 'up', benchmark: 75 },
        { component: 'Smart Form Builder', metric: 'Completion Rate', value: 89.2, trend: 'up', benchmark: 85 },
        { component: 'Interactive Charts', metric: 'Engagement Time', value: 4.2, trend: 'stable', benchmark: 4.0 },
        { component: 'Toast Notifications', metric: 'Dismissal Rate', value: 15.3, trend: 'down', benchmark: 20 },
        { component: 'Responsive Grid', metric: 'Mobile Usage', value: 67.8, trend: 'up', benchmark: 65 },
        { component: 'Modal Dialogs', metric: 'Task Completion', value: 92.1, trend: 'up', benchmark: 90 }
      ];

      return metrics.map((metric, index) => ({
        id: `metric-${index}`,
        ...metric
      }));
    };

    setComponents(generateComponents());
    setDesignSystem(generateDesignSystem());
    setPatterns(generatePatterns());
    setMetrics(generateMetrics());
  }, []);

  const filteredComponents = components.filter(component => 
    selectedCategory === 'all' || component.category === selectedCategory
  );

  const filteredDesignSystem = designSystem.filter(design => 
    selectedType === 'all' || design.type === selectedType
  );

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString();
  };

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'navigation': return 'bg-blue-100 text-blue-800';
      case 'forms': return 'bg-green-100 text-green-800';
      case 'data-display': return 'bg-purple-100 text-purple-800';
      case 'feedback': return 'bg-orange-100 text-orange-800';
      case 'layout': return 'bg-pink-100 text-pink-800';
      case 'media': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'stable': return 'bg-green-100 text-green-800';
      case 'beta': return 'bg-yellow-100 text-yellow-800';
      case 'deprecated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string): string => {
    switch (type) {
      case 'color': return 'bg-red-100 text-red-800';
      case 'typography': return 'bg-blue-100 text-blue-800';
      case 'spacing': return 'bg-green-100 text-green-800';
      case 'icon': return 'bg-purple-100 text-purple-800';
      case 'animation': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPatternCategoryColor = (category: string): string => {
    switch (category) {
      case 'interaction': return 'bg-blue-100 text-blue-800';
      case 'navigation': return 'bg-green-100 text-green-800';
      case 'content': return 'bg-purple-100 text-purple-800';
      case 'feedback': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number): string => {
    if (score >= 90) return '#10b981';
    if (score >= 70) return '#f59e0b';
    if (score >= 50) return '#f97316';
    return '#ef4444';
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

  const updateComponent = async (componentId: string) => {
    setIsUpdatingComponent(true);
    
    // Simulate component update
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setComponents(prev => prev.map(component => 
      component.id === componentId 
        ? { 
            ...component, 
            lastUpdated: new Date(),
            version: `${component.version.split('.')[0]}.${parseInt(component.version.split('.')[1]) + 1}.0`
          }
        : component
    ));
    
    setIsUpdatingComponent(false);
  };

  const categories = [
    { key: 'all', label: 'All Categories', count: components.length },
    { key: 'navigation', label: 'Navigation', count: components.filter(c => c.category === 'navigation').length },
    { key: 'forms', label: 'Forms', count: components.filter(c => c.category === 'forms').length },
    { key: 'data-display', label: 'Data Display', count: components.filter(c => c.category === 'data-display').length },
    { key: 'feedback', label: 'Feedback', count: components.filter(c => c.category === 'feedback').length },
    { key: 'layout', label: 'Layout', count: components.filter(c => c.category === 'layout').length },
    { key: 'media', label: 'Media', count: components.filter(c => c.category === 'media').length }
  ];

  const types = [
    { key: 'all', label: 'All Types', count: designSystem.length },
    { key: 'color', label: 'Colors', count: designSystem.filter(d => d.type === 'color').length },
    { key: 'typography', label: 'Typography', count: designSystem.filter(d => d.type === 'typography').length },
    { key: 'spacing', label: 'Spacing', count: designSystem.filter(d => d.type === 'spacing').length },
    { key: 'icon', label: 'Icons', count: designSystem.filter(d => d.type === 'icon').length },
    { key: 'animation', label: 'Animations', count: designSystem.filter(d => d.type === 'animation').length }
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
        <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">🎨 Advanced UI/UX Components</h2>
              <p className="text-pink-100 mt-1">Design system and component library</p>
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
          {/* UI/UX Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Components</p>
                  <p className="text-2xl font-bold text-blue-800">{components.length}</p>
                </div>
                <div className="text-3xl">🧩</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Design Tokens</p>
                  <p className="text-2xl font-bold text-green-800">{designSystem.length}</p>
                </div>
                <div className="text-3xl">🎨</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">UX Patterns</p>
                  <p className="text-2xl font-bold text-purple-800">{patterns.length}</p>
                </div>
                <div className="text-3xl">📐</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Avg Satisfaction</p>
                  <p className="text-2xl font-bold text-orange-800">
                    {(components.reduce((sum, c) => sum + c.satisfaction, 0) / components.length).toFixed(1)}
                  </p>
                </div>
                <div className="text-3xl">⭐</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 font-medium">Accessibility</p>
                  <p className="text-2xl font-bold text-red-800">
                    {(components.reduce((sum, c) => sum + c.accessibility, 0) / components.length).toFixed(0)}%
                  </p>
                </div>
                <div className="text-3xl">♿</div>
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
              </div>

              <div className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>

          {/* UX Patterns */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">UX Patterns</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {patterns.map((pattern) => (
                <div key={pattern.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{pattern.name}</h4>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getPatternCategoryColor(pattern.category)}`}>
                      {pattern.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{pattern.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Effectiveness:</span>
                      <span 
                        className="font-medium"
                        style={{ color: getScoreColor(pattern.effectiveness) }}
                      >
                        {pattern.effectiveness}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Usage:</span>
                      <span className="font-medium text-blue-600">{pattern.usage}%</span>
                    </div>
                    
                    <div className="mt-3">
                      <h5 className="text-sm font-medium text-gray-700 mb-1">Best Practices:</h5>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {pattern.bestPractices.map((practice, index) => (
                          <li key={index}>• {practice}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Design System */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Design System ({filteredDesignSystem.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDesignSystem.map((design) => (
                <div key={design.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-800">{design.name}</h4>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(design.type)}`}>
                      {design.type}
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <div className="text-sm text-gray-600 mb-1">Value:</div>
                    <div className="text-sm font-mono bg-white p-2 rounded border">
                      {design.value}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Usage:</span>
                      <span className="font-medium text-blue-600">{design.usage}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Consistency:</span>
                      <span 
                        className="font-medium"
                        style={{ color: getScoreColor(design.consistency) }}
                      >
                        {design.consistency}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Accessibility:</span>
                      <span 
                        className="font-medium"
                        style={{ color: getScoreColor(design.accessibility) }}
                      >
                        {design.accessibility}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Component Metrics */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Component Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {metrics.map((metric) => (
                <div key={metric.id} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">{metric.component}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{metric.metric}:</span>
                      <span className="text-lg font-bold text-gray-900">{metric.value}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Benchmark:</span>
                      <span className="text-sm text-gray-500">{metric.benchmark}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Trend:</span>
                      <div className="flex items-center">
                        <span className="text-lg mr-1">{getTrendIcon(metric.trend)}</span>
                        <span className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                          {metric.trend}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* UI Components */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">UI Components ({filteredComponents.length})</h3>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Component</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Satisfaction</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Accessibility</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredComponents.map((component) => (
                    <tr key={component.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{component.name}</div>
                          <div className="text-sm text-gray-500">{component.description}</div>
                          <div className="text-xs text-gray-400">v{component.version}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(component.category)}`}>
                          {component.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="h-2 rounded-full bg-blue-500"
                              style={{ width: `${component.usage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600">{component.usage}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-900">{component.satisfaction}/5</span>
                          <div className="ml-2 flex">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={`text-xs ${i < Math.floor(component.satisfaction) ? 'text-yellow-400' : 'text-gray-300'}`}>
                                ⭐
                              </span>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="h-2 rounded-full"
                              style={{ 
                                width: `${component.accessibility}%`,
                                backgroundColor: getScoreColor(component.accessibility)
                              }}
                            ></div>
                          </div>
                          <span 
                            className="text-sm font-medium"
                            style={{ color: getScoreColor(component.accessibility) }}
                          >
                            {component.accessibility}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(component.status)}`}>
                          {component.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => updateComponent(component.id)}
                          disabled={isUpdatingComponent}
                          className="text-blue-600 hover:text-blue-900 disabled:opacity-50 transition-colors"
                        >
                          {isUpdatingComponent ? 'Updating...' : 'Update'}
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

export default AdvancedUIUXComponents;
