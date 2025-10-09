export interface Tag {
  id: string;
  label: string;
  color: string;
}

// Predefined tag colors
export const TAG_COLORS = [
  '#4A90E2', // Blue
  '#7ED321', // Green
  '#F5A623', // Orange
  '#EC4899', // Pink
  '#8B5CF6', // Purple
  '#14B8A6', // Teal
  '#EF4444', // Red
  '#F59E0B', // Amber
];

// Common tag presets
export const COMMON_TAGS = [
  { label: 'work', color: '#4A90E2' },
  { label: 'personal', color: '#7ED321' },
  { label: 'urgent', color: '#EF4444' },
  { label: 'quick', color: '#F5A623' },
  { label: 'important', color: '#8B5CF6' },
];

/**
 * Parse tags from a comma-separated string
 */
export const parseTags = (tagString: string): Tag[] => {
  if (!tagString || !tagString.trim()) {
    return [];
  }

  return tagString
    .split(',')
    .map(t => t.trim())
    .filter(t => t.length > 0)
    .map((label, index) => ({
      id: `${label}-${Date.now()}-${index}`,
      label: label.toLowerCase().replace(/^#/, ''), // Remove # if present
      color: TAG_COLORS[index % TAG_COLORS.length]
    }));
};

/**
 * Convert tags array to comma-separated string
 */
export const tagsToString = (tags: Tag[]): string => {
  return tags.map(t => t.label).join(', ');
};

/**
 * Get or create tag from label
 */
export const getOrCreateTag = (label: string, existingTags: Tag[]): Tag => {
  const normalizedLabel = label.toLowerCase().replace(/^#/, '');
  const existing = existingTags.find(t => t.label === normalizedLabel);
  
  if (existing) {
    return existing;
  }

  return {
    id: `${normalizedLabel}-${Date.now()}`,
    label: normalizedLabel,
    color: TAG_COLORS[existingTags.length % TAG_COLORS.length]
  };
};

/**
 * Get all unique tags from tasks
 */
export const getAllTags = (tasks: Array<{ tags?: Tag[] }>): Tag[] => {
  const tagMap = new Map<string, Tag>();
  
  tasks.forEach(task => {
    task.tags?.forEach(tag => {
      if (!tagMap.has(tag.label)) {
        tagMap.set(tag.label, tag);
      }
    });
  });
  
  return Array.from(tagMap.values());
};

/**
 * Filter tasks by tag
 */
export const filterTasksByTag = <T extends { tags?: Tag[] }>(
  tasks: T[],
  tagLabel: string
): T[] => {
  if (!tagLabel) return tasks;
  
  return tasks.filter(task => 
    task.tags?.some(tag => tag.label === tagLabel)
  );
};

