// AI Helper utilities for SyncScript
// Uses OpenAI GPT-4 for intelligent task management

export interface AITaskSuggestion {
  title: string;
  description: string;
  priority: 1 | 2 | 3 | 4 | 5;
  energy_requirement: 1 | 2 | 3 | 4 | 5;
  estimated_duration?: number;
  tags?: Array<{ id: string; label: string; color: string }>;
  subtasks?: Array<{ id: string; text: string; completed: boolean }>;
}

export interface AITaskBreakdown {
  mainTask: string;
  subtasks: string[];
  estimatedDuration: number;
  suggestedOrder: number[];
}

export interface AIScheduleSuggestion {
  taskId: string;
  suggestedTime: string;
  reason: string;
  confidence: number;
}

/**
 * Parse natural language into structured task
 * Example: "Call John tomorrow at 2pm about project review" 
 * → { title: "Call John", due_date: "tomorrow 2pm", description: "about project review" }
 */
export async function parseNaturalLanguageToTask(input: string): Promise<AITaskSuggestion> {
  try {
    const response = await fetch('/api/ai/parse-task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input })
    });

    if (!response.ok) {
      throw new Error('Failed to parse task');
    }

    const data = await response.json();
    return data.task;
  } catch (error) {
    console.error('Error parsing task:', error);
    // Fallback: return basic task
    return {
      title: input.substring(0, 100),
      description: '',
      priority: 3,
      energy_requirement: 3
    };
  }
}

/**
 * Break down a complex task into subtasks using AI
 */
export async function breakdownTaskWithAI(taskTitle: string, taskDescription?: string): Promise<AITaskBreakdown> {
  try {
    const response = await fetch('/api/ai/breakdown-task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: taskTitle, description: taskDescription })
    });

    if (!response.ok) {
      throw new Error('Failed to breakdown task');
    }

    const data = await response.json();
    return data.breakdown;
  } catch (error) {
    console.error('Error breaking down task:', error);
    return {
      mainTask: taskTitle,
      subtasks: [],
      estimatedDuration: 60,
      suggestedOrder: []
    };
  }
}

/**
 * Get AI-powered task scheduling suggestions based on energy patterns
 */
export async function getAIScheduleSuggestions(
  tasks: Array<{ id: string; title: string; energy_requirement: number }>,
  energyPatterns: Array<{ hour: number; avgEnergy: number }>
): Promise<AIScheduleSuggestion[]> {
  try {
    const response = await fetch('/api/ai/schedule-suggestions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tasks, energyPatterns })
    });

    if (!response.ok) {
      throw new Error('Failed to get schedule suggestions');
    }

    const data = await response.json();
    return data.suggestions;
  } catch (error) {
    console.error('Error getting schedule suggestions:', error);
    return [];
  }
}

/**
 * Generate task description from brief input using AI
 */
export async function generateTaskDescription(title: string, context?: string): Promise<string> {
  try {
    const response = await fetch('/api/ai/generate-description', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, context })
    });

    if (!response.ok) {
      throw new Error('Failed to generate description');
    }

    const data = await response.json();
    return data.description;
  } catch (error) {
    console.error('Error generating description:', error);
    return '';
  }
}

/**
 * Auto-categorize task and suggest tags
 */
export async function suggestTaskTags(title: string, description?: string): Promise<string[]> {
  try {
    const response = await fetch('/api/ai/suggest-tags', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description })
    });

    if (!response.ok) {
      throw new Error('Failed to suggest tags');
    }

    const data = await response.json();
    return data.tags;
  } catch (error) {
    console.error('Error suggesting tags:', error);
    return [];
  }
}

/**
 * Estimate task completion time using AI
 */
export async function estimateTaskDuration(
  title: string,
  description?: string,
  similarTasks?: Array<{ title: string; estimated_duration?: number; actual_duration?: number }>
): Promise<number> {
  try {
    const response = await fetch('/api/ai/estimate-duration', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, similarTasks })
    });

    if (!response.ok) {
      throw new Error('Failed to estimate duration');
    }

    const data = await response.json();
    return data.duration;
  } catch (error) {
    console.error('Error estimating duration:', error);
    return 60; // Default 1 hour
  }
}
