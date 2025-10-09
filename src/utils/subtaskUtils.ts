export interface Subtask {
  id: string;
  text: string;
  completed: boolean;
  created_at: string;
}

/**
 * Create a new subtask
 */
export const createSubtask = (text: string): Subtask => {
  return {
    id: `subtask-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    text: text.trim(),
    completed: false,
    created_at: new Date().toISOString()
  };
};

/**
 * Toggle subtask completion
 */
export const toggleSubtask = (subtasks: Subtask[], subtaskId: string): Subtask[] => {
  return subtasks.map(st =>
    st.id === subtaskId ? { ...st, completed: !st.completed } : st
  );
};

/**
 * Delete a subtask
 */
export const deleteSubtask = (subtasks: Subtask[], subtaskId: string): Subtask[] => {
  return subtasks.filter(st => st.id !== subtaskId);
};

/**
 * Calculate subtask progress
 */
export const getSubtaskProgress = (subtasks: Subtask[]): {
  completed: number;
  total: number;
  percentage: number;
} => {
  const total = subtasks.length;
  const completed = subtasks.filter(st => st.completed).length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return { completed, total, percentage };
};

/**
 * Update subtask text
 */
export const updateSubtaskText = (subtasks: Subtask[], subtaskId: string, newText: string): Subtask[] => {
  return subtasks.map(st =>
    st.id === subtaskId ? { ...st, text: newText.trim() } : st
  );
};

/**
 * Reorder subtasks
 */
export const reorderSubtasks = (subtasks: Subtask[], startIndex: number, endIndex: number): Subtask[] => {
  const result = Array.from(subtasks);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

