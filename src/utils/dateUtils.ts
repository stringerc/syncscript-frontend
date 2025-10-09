export type UrgencyLevel = 'overdue' | 'due_today' | 'due_this_week' | 'upcoming' | 'none';

export interface TaskUrgency {
  level: UrgencyLevel;
  label: string;
  daysRemaining: number;
  isUrgent: boolean;
}

/**
 * Calculate the urgency level of a task based on its due date
 */
export const getTaskUrgency = (dueDate?: string): TaskUrgency => {
  if (!dueDate) {
    return {
      level: 'none',
      label: '',
      daysRemaining: Infinity,
      isUrgent: false
    };
  }

  const now = new Date();
  now.setHours(0, 0, 0, 0);
  
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  
  const diffTime = due.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Overdue
  if (diffDays < 0) {
    return {
      level: 'overdue',
      label: `Overdue by ${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? 's' : ''}`,
      daysRemaining: diffDays,
      isUrgent: true
    };
  }

  // Due today
  if (diffDays === 0) {
    return {
      level: 'due_today',
      label: 'Due Today',
      daysRemaining: 0,
      isUrgent: true
    };
  }

  // Due tomorrow
  if (diffDays === 1) {
    return {
      level: 'due_this_week',
      label: 'Due Tomorrow',
      daysRemaining: 1,
      isUrgent: true
    };
  }

  // Due this week (2-7 days)
  if (diffDays <= 7) {
    return {
      level: 'due_this_week',
      label: `Due in ${diffDays} days`,
      daysRemaining: diffDays,
      isUrgent: false
    };
  }

  // Upcoming (more than a week)
  return {
    level: 'upcoming',
    label: `Due in ${diffDays} days`,
    daysRemaining: diffDays,
    isUrgent: false
  };
};

/**
 * Get color for urgency level
 */
export const getUrgencyColor = (level: UrgencyLevel): string => {
  switch (level) {
    case 'overdue':
      return 'var(--syncscript-error)';
    case 'due_today':
      return 'var(--syncscript-orange-500)';
    case 'due_this_week':
      return 'var(--syncscript-blue-500)';
    case 'upcoming':
      return 'var(--syncscript-charcoal-400)';
    default:
      return 'transparent';
  }
};

/**
 * Get icon for urgency level
 */
export const getUrgencyIcon = (level: UrgencyLevel): string => {
  switch (level) {
    case 'overdue':
      return '🔴';
    case 'due_today':
      return '⚠️';
    case 'due_this_week':
      return '📅';
    case 'upcoming':
      return '📆';
    default:
      return '';
  }
};

