export type RecurrenceFrequency = 'none' | 'daily' | 'weekly' | 'monthly';

export interface RecurrenceConfig {
  frequency: RecurrenceFrequency;
  interval: number; // e.g., every 2 days, every 3 weeks
  days_of_week?: number[]; // 0-6 (Sunday-Saturday) for weekly
  day_of_month?: number; // 1-31 for monthly
  end_date?: string; // Optional end date for recurrence
  is_active: boolean; // Can pause/resume
}

/**
 * Calculate next due date based on recurrence config
 */
export const calculateNextDueDate = (
  currentDueDate: string | Date,
  config: RecurrenceConfig
): Date => {
  const current = new Date(currentDueDate);
  const next = new Date(current);

  switch (config.frequency) {
    case 'daily':
      next.setDate(current.getDate() + config.interval);
      break;

    case 'weekly':
      next.setDate(current.getDate() + (7 * config.interval));
      break;

    case 'monthly':
      next.setMonth(current.getMonth() + config.interval);
      // Handle day of month if specified
      if (config.day_of_month) {
        next.setDate(config.day_of_month);
      }
      break;

    default:
      return current;
  }

  return next;
};

/**
 * Check if recurrence should end
 */
export const shouldEndRecurrence = (config: RecurrenceConfig, nextDate: Date): boolean => {
  if (!config.is_active) return true;
  if (!config.end_date) return false;
  
  const endDate = new Date(config.end_date);
  return nextDate > endDate;
};

/**
 * Get recurrence display label
 */
export const getRecurrenceLabel = (config: RecurrenceConfig): string => {
  if (!config || config.frequency === 'none') return '';

  const interval = config.interval > 1 ? `Every ${config.interval} ` : '';
  
  switch (config.frequency) {
    case 'daily':
      return interval ? `${interval}days` : 'Daily';
    
    case 'weekly':
      return interval ? `${interval}weeks` : 'Weekly';
    
    case 'monthly':
      return interval ? `${interval}months` : 'Monthly';
    
    default:
      return '';
  }
};

/**
 * Get recurrence icon
 */
export const getRecurrenceIcon = (): string => {
  return '🔄';
};

/**
 * Create default recurrence config
 */
export const createDefaultRecurrence = (): RecurrenceConfig => {
  return {
    frequency: 'none',
    interval: 1,
    is_active: true
  };
};

/**
 * Validate recurrence config
 */
export const isValidRecurrence = (config: RecurrenceConfig): boolean => {
  if (config.frequency === 'none') return true;
  if (config.interval < 1) return false;
  
  if (config.frequency === 'weekly' && config.days_of_week) {
    if (config.days_of_week.length === 0) return false;
    if (config.days_of_week.some(d => d < 0 || d > 6)) return false;
  }
  
  if (config.frequency === 'monthly' && config.day_of_month) {
    if (config.day_of_month < 1 || config.day_of_month > 31) return false;
  }
  
  return true;
};

