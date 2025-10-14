/**
 * Custom Workspace Layout Component
 * 
 * Provides personalized dashboard configurations for users
 * Includes drag-and-drop layout customization, widget management, and theme options
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface WorkspaceWidget {
  id: string;
  type: 'energy-tracker' | 'task-list' | 'analytics' | 'budget' | 'calendar' | 'goals' | 'notes' | 'weather';
  title: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isVisible: boolean;
  settings: Record<string, any>;
}

interface WorkspaceLayout {
  id: string;
  name: string;
  description: string;
  widgets: WorkspaceWidget[];
  theme: 'light' | 'dark' | 'auto';
  layout: 'grid' | 'flex' | 'compact' | 'spacious';
  createdAt: string;
  updatedAt: string;
  isDefault: boolean;
}

interface CustomWorkspaceLayoutProps {
  userId: string;
  onClose: () => void;
}

const AVAILABLE_WIDGETS: Omit<WorkspaceWidget, 'position' | 'size' | 'settings'>[] = [
  { id: 'energy-tracker', type: 'energy-tracker', title: 'Energy Tracker', isVisible: true },
  { id: 'task-list', type: 'task-list', title: 'Task List', isVisible: true },
  { id: 'analytics', type: 'analytics', title: 'Analytics', isVisible: true },
  { id: 'budget', type: 'budget', title: 'Budget Intelligence', isVisible: true },
  { id: 'calendar', type: 'calendar', title: 'Calendar', isVisible: true },
  { id: 'goals', type: 'goals', title: 'Goals & Milestones', isVisible: true },
  { id: 'notes', type: 'notes', title: 'Quick Notes', isVisible: true },
  { id: 'weather', type: 'weather', title: 'Weather', isVisible: true }
];

const LAYOUT_PRESETS = {
  'productivity-focus': {
    name: 'Productivity Focus',
    description: 'Optimized for maximum productivity and task management',
    widgets: ['task-list', 'energy-tracker', 'analytics', 'goals']
  },
  'analytics-heavy': {
    name: 'Analytics Heavy',
    description: 'Data-driven layout with comprehensive insights',
    widgets: ['analytics', 'budget', 'energy-tracker', 'task-list']
  },
  'balanced': {
    name: 'Balanced',
    description: 'Well-rounded layout with all essential widgets',
    widgets: ['task-list', 'energy-tracker', 'analytics', 'budget', 'calendar', 'goals']
  },
  'minimal': {
    name: 'Minimal',
    description: 'Clean and simple layout with core widgets only',
    widgets: ['task-list', 'energy-tracker']
  }
};

interface SortableWidgetProps {
  widget: WorkspaceWidget;
  onToggleVisibility: (widgetId: string) => void;
  onUpdateSettings: (widgetId: string, settings: Record<string, any>) => void;
}

const SortableWidget: React.FC<SortableWidgetProps> = ({ widget, onToggleVisibility, onUpdateSettings }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: widget.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  const getWidgetIcon = (type: string) => {
    switch (type) {
      case 'energy-tracker': return '⚡';
      case 'task-list': return '📋';
      case 'analytics': return '📊';
      case 'budget': return '💰';
      case 'calendar': return '📅';
      case 'goals': return '🎯';
      case 'notes': return '📝';
      case 'weather': return '🌤️';
      default: return '📦';
    }
  };

  const getWidgetColor = (type: string) => {
    switch (type) {
      case 'energy-tracker': return 'from-yellow-400 to-orange-500';
      case 'task-list': return 'from-blue-400 to-cyan-500';
      case 'analytics': return 'from-purple-400 to-pink-500';
      case 'budget': return 'from-green-400 to-emerald-500';
      case 'calendar': return 'from-red-400 to-pink-500';
      case 'goals': return 'from-indigo-400 to-blue-500';
      case 'notes': return 'from-gray-400 to-gray-500';
      case 'weather': return 'from-sky-400 to-blue-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-4 bg-white rounded-xl shadow-lg border-2 border-gray-200 hover:border-gray-300 transition-all cursor-move ${
        widget.isVisible ? 'opacity-100' : 'opacity-50'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${getWidgetColor(widget.type)} flex items-center justify-center text-xl`}>
            {getWidgetIcon(widget.type)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{widget.title}</h3>
            <p className="text-sm text-gray-600">{widget.type}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleVisibility(widget.id);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              widget.isVisible 
                ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
            }`}
          >
            {widget.isVisible ? '👁️' : '🙈'}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              // TODO: Open widget settings
            }}
            className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all flex items-center justify-center"
          >
            ⚙️
          </button>
        </div>
      </div>
      
      <div className="text-xs text-gray-500">
        {widget.isVisible ? 'Visible in workspace' : 'Hidden from workspace'}
      </div>
    </motion.div>
  );
};

const CustomWorkspaceLayout: React.FC<CustomWorkspaceLayoutProps> = ({ userId, onClose }) => {
  const [currentLayout, setCurrentLayout] = useState<WorkspaceLayout | null>(null);
  const [widgets, setWidgets] = useState<WorkspaceWidget[]>([]);
  const [selectedPreset, setSelectedPreset] = useState<string>('');
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('auto');
  const [layoutType, setLayoutType] = useState<'grid' | 'flex' | 'compact' | 'spacious'>('grid');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    loadWorkspaceLayout();
  }, [userId]);

  const loadWorkspaceLayout = async () => {
    setIsLoading(true);
    try {
      // Simulate API call - in real implementation, this would fetch from backend
      const mockLayout: WorkspaceLayout = {
        id: 'default-layout',
        name: 'My Workspace',
        description: 'Custom workspace layout',
        widgets: AVAILABLE_WIDGETS.map((widget, index) => ({
          ...widget,
          position: { x: 0, y: index * 100 },
          size: { width: 300, height: 200 },
          settings: {}
        })),
        theme: 'auto',
        layout: 'grid',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isDefault: true
      };

      setCurrentLayout(mockLayout);
      setWidgets(mockLayout.widgets);
      setTheme(mockLayout.theme);
      setLayoutType(mockLayout.layout);
    } catch (error) {
      console.error('Failed to load workspace layout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setWidgets((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleToggleVisibility = (widgetId: string) => {
    setWidgets(prev => prev.map(widget => 
      widget.id === widgetId 
        ? { ...widget, isVisible: !widget.isVisible }
        : widget
    ));
  };

  const handleUpdateSettings = (widgetId: string, settings: Record<string, any>) => {
    setWidgets(prev => prev.map(widget => 
      widget.id === widgetId 
        ? { ...widget, settings: { ...widget.settings, ...settings } }
        : widget
    ));
  };

  const handleApplyPreset = (presetKey: string) => {
    const preset = LAYOUT_PRESETS[presetKey as keyof typeof LAYOUT_PRESETS];
    if (!preset) return;

    setWidgets(prev => prev.map(widget => ({
      ...widget,
      isVisible: preset.widgets.includes(widget.type)
    })));
    setSelectedPreset(presetKey);
  };

  const handleSaveLayout = async () => {
    setIsSaving(true);
    try {
      // Simulate API call - in real implementation, this would save to backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const updatedLayout: WorkspaceLayout = {
        ...currentLayout!,
        widgets,
        theme,
        layout: layoutType,
        updatedAt: new Date().toISOString()
      };

      setCurrentLayout(updatedLayout);
      console.log('✅ Workspace layout saved successfully');
    } catch (error) {
      console.error('Failed to save workspace layout:', error);
    } finally {
      setIsSaving(false);
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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-lg font-medium text-gray-700">Loading workspace layout...</span>
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
        className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Custom Workspace Layout</h2>
              <p className="text-indigo-100 mt-1">Personalize your dashboard experience</p>
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Widget Management */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Widget Configuration</h3>
                
                {/* Layout Presets */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Presets</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(LAYOUT_PRESETS).map(([key, preset]) => (
                      <motion.button
                        key={key}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleApplyPreset(key)}
                        className={`p-3 border-2 rounded-lg text-left transition-all ${
                          selectedPreset === key
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-medium text-gray-900">{preset.name}</div>
                        <div className="text-sm text-gray-600">{preset.description}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Draggable Widgets */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Arrange Widgets</h4>
                  <p className="text-sm text-gray-600 mb-4">Drag widgets to reorder them in your workspace</p>
                  
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext items={widgets.map(w => w.id)} strategy={verticalListSortingStrategy}>
                      <div className="space-y-3">
                        {widgets.map((widget) => (
                          <SortableWidget
                            key={widget.id}
                            widget={widget}
                            onToggleVisibility={handleToggleVisibility}
                            onUpdateSettings={handleUpdateSettings}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                </div>
              </div>
            </div>

            {/* Settings Panel */}
            <div className="space-y-6">
              {/* Theme Settings */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Theme</h4>
                <div className="space-y-2">
                  {[
                    { value: 'light', label: 'Light', icon: '☀️' },
                    { value: 'dark', label: 'Dark', icon: '🌙' },
                    { value: 'auto', label: 'Auto', icon: '🔄' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setTheme(option.value as any)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg border-2 transition-all ${
                        theme === option.value
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-lg">{option.icon}</span>
                      <span className="font-medium text-gray-900">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Layout Type */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Layout Style</h4>
                <div className="space-y-2">
                  {[
                    { value: 'grid', label: 'Grid', icon: '⊞', description: 'Organized grid layout' },
                    { value: 'flex', label: 'Flexible', icon: '⬌', description: 'Flexible responsive layout' },
                    { value: 'compact', label: 'Compact', icon: '⊡', description: 'Dense, space-efficient' },
                    { value: 'spacious', label: 'Spacious', icon: '⊠', description: 'Open, breathing room' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setLayoutType(option.value as any)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg border-2 transition-all ${
                        layoutType === option.value
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-lg">{option.icon}</span>
                      <div className="text-left">
                        <div className="font-medium text-gray-900">{option.label}</div>
                        <div className="text-xs text-gray-600">{option.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Widget Count */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Widget Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Widgets:</span>
                    <span className="font-medium">{widgets.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Visible:</span>
                    <span className="font-medium text-green-600">{widgets.filter(w => w.isVisible).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hidden:</span>
                    <span className="font-medium text-gray-500">{widgets.filter(w => !w.isVisible).length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Changes will be applied to your workspace immediately
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveLayout}
              disabled={isSaving}
              className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving...' : 'Save Layout'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CustomWorkspaceLayout;
