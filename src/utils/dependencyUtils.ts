export interface TaskDependency {
  id: string;
  taskId: string; // The task that has dependencies
  dependsOnTaskId: string; // The task this depends on
  type: 'blocks' | 'requires' | 'suggests';
  createdAt: string;
}

export interface DependencyChain {
  taskId: string;
  blockedBy: string[];
  blocks: string[];
  chainLength: number;
  isBlocked: boolean;
}

export interface DependencySuggestion {
  taskId: string;
  suggestedDependency: string;
  reason: string;
  confidence: number;
}

// Create a new dependency
export const createDependency = (
  taskId: string,
  dependsOnTaskId: string,
  type: TaskDependency['type'] = 'blocks'
): TaskDependency => {
  return {
    id: `dep-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    taskId,
    dependsOnTaskId,
    type,
    createdAt: new Date().toISOString()
  };
};

// Get all dependencies for a task
export const getTaskDependencies = (
  taskId: string,
  allDependencies: TaskDependency[]
): {
  blocks: TaskDependency[];
  requires: TaskDependency[];
  suggests: TaskDependency[];
} => {
  const taskDeps = allDependencies.filter(dep => dep.taskId === taskId);
  
  return {
    blocks: taskDeps.filter(dep => dep.type === 'blocks'),
    requires: taskDeps.filter(dep => dep.type === 'requires'),
    suggests: taskDeps.filter(dep => dep.type === 'suggests')
  };
};

// Get tasks that this task depends on
export const getDependencyChain = (
  taskId: string,
  allDependencies: TaskDependency[],
  allTasks: Array<{ id: string; title: string; completed: boolean }>
): DependencyChain => {
  const blockedBy: string[] = [];
  const blocks: string[] = [];
  
  // Find tasks that this task depends on (blocked by)
  const dependencies = allDependencies.filter(dep => dep.taskId === taskId);
  dependencies.forEach(dep => {
    const dependsOnTask = allTasks.find(t => t.id === dep.dependsOnTaskId);
    if (dependsOnTask && !dependsOnTask.completed) {
      blockedBy.push(dep.dependsOnTaskId);
    }
  });
  
  // Find tasks that depend on this task (blocks)
  const dependents = allDependencies.filter(dep => dep.dependsOnTaskId === taskId);
  dependents.forEach(dep => {
    const dependentTask = allTasks.find(t => t.id === dep.taskId);
    if (dependentTask && !dependentTask.completed) {
      blocks.push(dep.taskId);
    }
  });
  
  // Calculate chain length (how deep the dependency goes)
  const calculateChainLength = (currentTaskId: string, visited: Set<string> = new Set()): number => {
    if (visited.has(currentTaskId)) return 0; // Prevent infinite loops
    visited.add(currentTaskId);
    
    const directDeps = allDependencies.filter(dep => dep.taskId === currentTaskId);
    if (directDeps.length === 0) return 0;
    
    return Math.max(...directDeps.map(dep => 
      1 + calculateChainLength(dep.dependsOnTaskId, new Set(visited))
    ));
  };
  
  return {
    taskId,
    blockedBy,
    blocks,
    chainLength: calculateChainLength(taskId),
    isBlocked: blockedBy.length > 0
  };
};

// Check if a task can be completed (no blocking dependencies)
export const canCompleteTask = (
  taskId: string,
  allDependencies: TaskDependency[],
  allTasks: Array<{ id: string; title: string; completed: boolean }>
): boolean => {
  const chain = getDependencyChain(taskId, allDependencies, allTasks);
  return !chain.isBlocked;
};

// Get blocking reasons for a task
export const getBlockingReasons = (
  taskId: string,
  allDependencies: TaskDependency[],
  allTasks: Array<{ id: string; title: string; completed: boolean }>
): string[] => {
  const chain = getDependencyChain(taskId, allDependencies, allTasks);
  return chain.blockedBy.map(blockingTaskId => {
    const blockingTask = allTasks.find(t => t.id === blockingTaskId);
    return blockingTask ? `Blocked by "${blockingTask.title}"` : 'Unknown dependency';
  });
};

// Generate dependency suggestions based on task context
export const generateDependencySuggestions = (
  tasks: Array<{ 
    id: string; 
    title: string; 
    description?: string; 
    project_id?: string;
    tags?: Array<{ label: string }>;
    completed: boolean;
  }>,
  existingDependencies: TaskDependency[]
): DependencySuggestion[] => {
  const suggestions: DependencySuggestion[] = [];
  
  // Group tasks by project
  const tasksByProject = tasks.reduce((acc, task) => {
    const projectId = task.project_id || 'no-project';
    if (!acc[projectId]) acc[projectId] = [];
    acc[projectId].push(task);
    return acc;
  }, {} as Record<string, typeof tasks>);
  
  // Generate suggestions within projects
  Object.values(tasksByProject).forEach(projectTasks => {
    projectTasks.forEach(task => {
      if (task.completed) return;
      
      // Find similar tasks that might be dependencies
      const similarTasks = projectTasks.filter(otherTask => {
        if (otherTask.id === task.id || otherTask.completed) return false;
        
        // Check for keyword matches
        const taskKeywords = extractKeywords(task.title, task.description);
        const otherKeywords = extractKeywords(otherTask.title, otherTask.description);
        
        return taskKeywords.some(keyword => otherKeywords.includes(keyword));
      });
      
      similarTasks.forEach(similarTask => {
        // Check if dependency already exists
        const exists = existingDependencies.some(dep => 
          dep.taskId === task.id && dep.dependsOnTaskId === similarTask.id
        );
        
        if (!exists) {
          suggestions.push({
            taskId: task.id,
            suggestedDependency: similarTask.id,
            reason: `Similar context: "${similarTask.title}"`,
            confidence: calculateConfidence(task, similarTask)
          });
        }
      });
    });
  });
  
  return suggestions.sort((a, b) => b.confidence - a.confidence);
};

// Helper function to extract keywords from text
const extractKeywords = (title: string, description?: string): string[] => {
  const text = `${title} ${description || ''}`.toLowerCase();
  const keywords = text.match(/\b\w{3,}\b/g) || [];
  
  // Filter out common words
  const commonWords = ['the', 'and', 'for', 'with', 'this', 'that', 'will', 'can', 'should'];
  return keywords.filter(word => !commonWords.includes(word));
};

// Helper function to calculate confidence score
const calculateConfidence = (
  task: { title: string; description?: string; tags?: Array<{ label: string }> },
  similarTask: { title: string; description?: string; tags?: Array<{ label: string }> }
): number => {
  let score = 0;
  
  // Title similarity
  const taskWords = task.title.toLowerCase().split(' ');
  const similarWords = similarTask.title.toLowerCase().split(' ');
  const commonWords = taskWords.filter(word => similarWords.includes(word));
  score += (commonWords.length / Math.max(taskWords.length, similarWords.length)) * 40;
  
  // Tag similarity
  if (task.tags && similarTask.tags) {
    const taskTags = task.tags.map(t => t.label.toLowerCase());
    const similarTags = similarTask.tags.map(t => t.label.toLowerCase());
    const commonTags = taskTags.filter(tag => similarTags.includes(tag));
    score += (commonTags.length / Math.max(taskTags.length, similarTags.length)) * 30;
  }
  
  // Description similarity
  if (task.description && similarTask.description) {
    const commonKeywords = extractKeywords(task.description).filter(keyword => 
      extractKeywords(similarTask.description || '').includes(keyword)
    );
    score += Math.min(commonKeywords.length * 2, 30);
  }
  
  return Math.min(Math.round(score), 100);
};

// Get dependency visualization data
export const getDependencyVisualization = (
  tasks: Array<{ id: string; title: string; completed: boolean; project_id?: string }>,
  dependencies: TaskDependency[]
) => {
  const nodes = tasks.map(task => ({
    id: task.id,
    label: task.title,
    completed: task.completed,
    projectId: task.project_id,
    isBlocked: getDependencyChain(task.id, dependencies, tasks).isBlocked
  }));
  
  const edges = dependencies.map(dep => ({
    id: dep.id,
    source: dep.dependsOnTaskId,
    target: dep.taskId,
    type: dep.type
  }));
  
  return { nodes, edges };
};

// Validate dependency (prevent circular dependencies)
export const validateDependency = (
  taskId: string,
  dependsOnTaskId: string,
  allDependencies: TaskDependency[]
): { isValid: boolean; reason?: string } => {
  // Can't depend on itself
  if (taskId === dependsOnTaskId) {
    return { isValid: false, reason: 'Task cannot depend on itself' };
  }
  
  // Check for circular dependency
  const wouldCreateCircular = (currentTaskId: string, targetTaskId: string, visited: Set<string> = new Set()): boolean => {
    if (visited.has(currentTaskId)) return false;
    if (currentTaskId === targetTaskId) return true;
    
    visited.add(currentTaskId);
    const deps = allDependencies.filter(dep => dep.taskId === currentTaskId);
    
    return deps.some(dep => wouldCreateCircular(dep.dependsOnTaskId, targetTaskId, new Set(visited)));
  };
  
  if (wouldCreateCircular(dependsOnTaskId, taskId)) {
    return { isValid: false, reason: 'This would create a circular dependency' };
  }
  
  return { isValid: true };
};
