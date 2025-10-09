export interface Notification {
  id: string;
  type: 'due_date' | 'energy' | 'streak' | 'focus' | 'summary';
  title: string;
  message: string;
  icon: string;
  timestamp: string;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface NotificationPreferences {
  dueDateReminders: boolean;
  energySuggestions: boolean;
  streakAlerts: boolean;
  focusReminders: boolean;
  dailySummaries: boolean;
}

const DEFAULT_PREFERENCES: NotificationPreferences = {
  dueDateReminders: true,
  energySuggestions: true,
  streakAlerts: true,
  focusReminders: true,
  dailySummaries: true
};

export const getNotificationPreferences = (): NotificationPreferences => {
  if (typeof window === 'undefined') return DEFAULT_PREFERENCES;
  
  const saved = localStorage.getItem('syncscript-notification-prefs');
  if (saved) {
    try {
      return { ...DEFAULT_PREFERENCES, ...JSON.parse(saved) };
    } catch (error) {
      console.error('Error loading notification preferences:', error);
    }
  }
  return DEFAULT_PREFERENCES;
};

export const saveNotificationPreferences = (prefs: NotificationPreferences): void => {
  localStorage.setItem('syncscript-notification-prefs', JSON.stringify(prefs));
};

export const getStoredNotifications = (): Notification[] => {
  if (typeof window === 'undefined') return [];
  
  const saved = localStorage.getItem('syncscript-notifications');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  }
  return [];
};

export const saveNotifications = (notifications: Notification[]): void => {
  // Keep only last 50 notifications
  const limited = notifications.slice(0, 50);
  localStorage.setItem('syncscript-notifications', JSON.stringify(limited));
};

export const markNotificationAsRead = (id: string): void => {
  const notifications = getStoredNotifications();
  const updated = notifications.map(n => 
    n.id === id ? { ...n, read: true } : n
  );
  saveNotifications(updated);
};

export const deleteNotification = (id: string): void => {
  const notifications = getStoredNotifications();
  const filtered = notifications.filter(n => n.id !== id);
  saveNotifications(filtered);
};

export const clearAllNotifications = (): void => {
  localStorage.removeItem('syncscript-notifications');
};

export const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'> & { id?: string }): Notification => {
  const notifications = getStoredNotifications();
  
  // If ID provided, check if it already exists to prevent duplicates
  const existingId = notification.id || `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const exists = notifications.some(n => n.id === existingId);
  
  if (exists) {
    return notifications.find(n => n.id === existingId)!;
  }
  
  const newNotification: Notification = {
    type: notification.type,
    title: notification.title,
    message: notification.message,
    icon: notification.icon,
    action: notification.action,
    id: existingId,
    timestamp: new Date().toISOString(),
    read: false
  };
  
  const updated = [newNotification, ...notifications];
  saveNotifications(updated);
  
  return newNotification;
};

