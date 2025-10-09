import { Tag } from './tagUtils';

export interface TaskTemplate {
  id: string;
  name: string;
  title: string;
  description?: string;
  priority: 1 | 2 | 3 | 4 | 5;
  energy_requirement: 1 | 2 | 3 | 4 | 5;
  estimated_duration?: number;
  project_id?: string;
  tags?: Tag[];
  created_at: string;
}

const TEMPLATES_KEY = 'syncscript_task_templates';

/**
 * Get all templates from localStorage
 */
export const getTemplates = (): TaskTemplate[] => {
  try {
    const stored = localStorage.getItem(TEMPLATES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading templates:', error);
    return [];
  }
};

/**
 * Save a new template
 */
export const saveTemplate = (template: Omit<TaskTemplate, 'id' | 'created_at'>): TaskTemplate => {
  const templates = getTemplates();
  
  const newTemplate: TaskTemplate = {
    ...template,
    id: `template-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    created_at: new Date().toISOString()
  };
  
  templates.push(newTemplate);
  localStorage.setItem(TEMPLATES_KEY, JSON.stringify(templates));
  
  return newTemplate;
};

/**
 * Update an existing template
 */
export const updateTemplate = (id: string, updates: Partial<TaskTemplate>): TaskTemplate | null => {
  const templates = getTemplates();
  const index = templates.findIndex(t => t.id === id);
  
  if (index === -1) return null;
  
  templates[index] = { ...templates[index], ...updates };
  localStorage.setItem(TEMPLATES_KEY, JSON.stringify(templates));
  
  return templates[index];
};

/**
 * Delete a template
 */
export const deleteTemplate = (id: string): boolean => {
  const templates = getTemplates();
  const filtered = templates.filter(t => t.id !== id);
  
  if (filtered.length === templates.length) return false;
  
  localStorage.setItem(TEMPLATES_KEY, JSON.stringify(filtered));
  return true;
};

/**
 * Create task data from template
 */
export const createTaskFromTemplate = (template: TaskTemplate) => {
  return {
    title: template.title,
    description: template.description,
    priority: template.priority,
    energy_requirement: template.energy_requirement,
    estimated_duration: template.estimated_duration,
    project_id: template.project_id,
    tags: template.tags
  };
};

/**
 * Check if template name exists
 */
export const templateNameExists = (name: string, excludeId?: string): boolean => {
  const templates = getTemplates();
  return templates.some(t => 
    t.name.toLowerCase() === name.toLowerCase() && t.id !== excludeId
  );
};

