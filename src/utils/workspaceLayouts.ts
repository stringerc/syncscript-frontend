/**
 * Custom Workspace Layouts
 * Phase 3: 90-Day Innovation - Feature 1
 * 
 * Drag-drop customization, saved layouts, widget system
 */

export interface Widget {
  id: string;
  type: 'tasks' | 'calendar' | 'energy' | 'goals' | 'analytics' | 'weather' | 'budget';
  position: { x: number; y: number };
  size: { width: number; height: number };
  settings?: { [key: string]: unknown };
}

export interface WorkspaceLayout {
  id: string;
  name: string;
  description: string;
  icon: string;
  widgets: Widget[];
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Predefined layout templates
 */
export const LAYOUT_TEMPLATES: Omit<WorkspaceLayout, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: 'Focus Mode',
    description: 'Minimal layout for deep work',
    icon: '🎯',
    isDefault: false,
    widgets: [
      { id: 'tasks-1', type: 'tasks', position: { x: 0, y: 0 }, size: { width: 8, height: 12 } },
      { id: 'energy-1', type: 'energy', position: { x: 8, y: 0 }, size: { width: 4, height: 4 } }
    ]
  },
  {
    name: 'Command Center',
    description: 'Full dashboard with all widgets',
    icon: '🎛️',
    isDefault: true,
    widgets: [
      { id: 'tasks-1', type: 'tasks', position: { x: 0, y: 0 }, size: { width: 6, height: 8 } },
      { id: 'calendar-1', type: 'calendar', position: { x: 6, y: 0 }, size: { width: 6, height: 8 } },
      { id: 'energy-1', type: 'energy', position: { x: 0, y: 8 }, size: { width: 4, height: 4 } },
      { id: 'goals-1', type: 'goals', position: { x: 4, y: 8 }, size: { width: 4, height: 4 } },
      { id: 'analytics-1', type: 'analytics', position: { x: 8, y: 8 }, size: { width: 4, height: 4 } }
    ]
  },
  {
    name: 'Energy Optimizer',
    description: 'Energy-first layout',
    icon: '⚡',
    isDefault: false,
    widgets: [
      { id: 'energy-1', type: 'energy', position: { x: 0, y: 0 }, size: { width: 6, height: 6 } },
      { id: 'tasks-1', type: 'tasks', position: { x: 6, y: 0 }, size: { width: 6, height: 12 } },
      { id: 'analytics-1', type: 'analytics', position: { x: 0, y: 6 }, size: { width: 6, height: 6 } }
    ]
  },
  {
    name: 'Budget Tracker',
    description: 'Budget-focused layout',
    icon: '💰',
    isDefault: false,
    widgets: [
      { id: 'budget-1', type: 'budget', position: { x: 0, y: 0 }, size: { width: 6, height: 8 } },
      { id: 'goals-1', type: 'goals', position: { x: 6, y: 0 }, size: { width: 6, height: 8 } },
      { id: 'tasks-1', type: 'tasks', position: { x: 0, y: 8 }, size: { width: 12, height: 6 } }
    ]
  },
  {
    name: 'Context Aware',
    description: 'Travel & weather focus',
    icon: '🌍',
    isDefault: false,
    widgets: [
      { id: 'calendar-1', type: 'calendar', position: { x: 0, y: 0 }, size: { width: 8, height: 10 } },
      { id: 'weather-1', type: 'weather', position: { x: 8, y: 0 }, size: { width: 4, height: 5 } },
      { id: 'tasks-1', type: 'tasks', position: { x: 8, y: 5 }, size: { width: 4, height: 5 } }
    ]
  }
];

/**
 * Save layouts to localStorage
 */
export function saveLayouts(layouts: WorkspaceLayout[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('workspace_layouts', JSON.stringify(layouts));
    console.log('🎨 Workspace Layouts saved:', layouts.length);
  } catch (error) {
    console.error('Error saving layouts:', error);
  }
}

/**
 * Load layouts from localStorage
 */
export function loadLayouts(): WorkspaceLayout[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem('workspace_layouts');
    if (!stored) {
      // Return default templates on first load
      return LAYOUT_TEMPLATES.map((template, idx) => ({
        ...template,
        id: `layout-${idx}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));
    }
    
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading layouts:', error);
    return [];
  }
}

/**
 * Get active layout
 */
export function getActiveLayout(): WorkspaceLayout | null {
  const layouts = loadLayouts();
  
  // Check for saved active layout ID
  const activeId = localStorage.getItem('active_layout_id');
  if (activeId) {
    const layout = layouts.find(l => l.id === activeId);
    if (layout) return layout;
  }
  
  // Return default layout
  const defaultLayout = layouts.find(l => l.isDefault);
  return defaultLayout || layouts[0] || null;
}

/**
 * Set active layout
 */
export function setActiveLayout(layoutId: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('active_layout_id', layoutId);
  console.log('🎨 Active Layout changed:', layoutId);
}

/**
 * Create custom layout
 */
export function createCustomLayout(
  name: string,
  description: string,
  widgets: Widget[]
): WorkspaceLayout {
  const newLayout: WorkspaceLayout = {
    id: `layout-${Date.now()}`,
    name,
    description,
    icon: '🎨',
    widgets,
    isDefault: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  const layouts = loadLayouts();
  layouts.push(newLayout);
  saveLayouts(layouts);
  
  return newLayout;
}

/**
 * Update layout
 */
export function updateLayout(layoutId: string, widgets: Widget[]): void {
  const layouts = loadLayouts();
  const layout = layouts.find(l => l.id === layoutId);
  
  if (layout) {
    layout.widgets = widgets;
    layout.updatedAt = new Date().toISOString();
    saveLayouts(layouts);
  }
}

/**
 * Delete layout
 */
export function deleteLayout(layoutId: string): void {
  const layouts = loadLayouts();
  const filtered = layouts.filter(l => l.id !== layoutId);
  saveLayouts(filtered);
}

/**
 * Get widget config
 */
export function getWidgetConfig(type: Widget['type']): {
  title: string;
  icon: string;
  minSize: { width: number; height: number };
  defaultSize: { width: number; height: number };
} {
  const configs = {
    tasks: { title: 'Tasks', icon: '✅', minSize: { width: 4, height: 4 }, defaultSize: { width: 6, height: 8 } },
    calendar: { title: 'Calendar', icon: '📅', minSize: { width: 4, height: 6 }, defaultSize: { width: 6, height: 8 } },
    energy: { title: 'Energy', icon: '⚡', minSize: { width: 3, height: 3 }, defaultSize: { width: 4, height: 4 } },
    goals: { title: 'Goals', icon: '🎯', minSize: { width: 3, height: 4 }, defaultSize: { width: 4, height: 6 } },
    analytics: { title: 'Analytics', icon: '📊', minSize: { width: 4, height: 4 }, defaultSize: { width: 6, height: 6 } },
    weather: { title: 'Weather', icon: '🌤️', minSize: { width: 3, height: 3 }, defaultSize: { width: 4, height: 4 } },
    budget: { title: 'Budget', icon: '💰', minSize: { width: 4, height: 6 }, defaultSize: { width: 6, height: 8 } }
  };
  
  return configs[type];
}

// Export for testing
export const __test__ = {
  getActiveLayout,
  createCustomLayout
};

