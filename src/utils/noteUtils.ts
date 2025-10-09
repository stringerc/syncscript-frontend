export interface TaskNote {
  id: string;
  text: string;
  created_at: string;
}

/**
 * Create a new note
 */
export const createNote = (text: string): TaskNote => {
  return {
    id: `note-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    text: text.trim(),
    created_at: new Date().toISOString()
  };
};

/**
 * Delete a note
 */
export const deleteNote = (notes: TaskNote[], noteId: string): TaskNote[] => {
  return notes.filter(n => n.id !== noteId);
};

/**
 * Format note timestamp for display
 */
export const formatNoteTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
};

/**
 * Update note text
 */
export const updateNoteText = (notes: TaskNote[], noteId: string, newText: string): TaskNote[] => {
  return notes.map(n =>
    n.id === noteId ? { ...n, text: newText.trim() } : n
  );
};

