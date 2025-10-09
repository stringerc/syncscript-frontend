import { useState, useEffect, useCallback } from 'react';
import { 
  Notification, 
  NotificationPreferences,
  getStoredNotifications, 
  getNotificationPreferences,
  saveNotificationPreferences,
  markNotificationAsRead,
  deleteNotification,
  clearAllNotifications,
  addNotification
} from '../utils/notificationService';

interface Task {
  id: string;
  title: string;
  due_date?: string;
  completed: boolean;
  energy_requirement: number;
}

interface StreakData {
  loginStreak: number;
  completionStreak: number;
  longestLoginStreak: number;
  longestCompletionStreak: number;
  lastLoginDate: string;
  lastCompletionDate: string;
}

export const useNotifications = (tasks: Task[], currentEnergy: number, streakData: StreakData) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [preferences, setPreferences] = useState<NotificationPreferences>(getNotificationPreferences());

  // Load notifications on mount
  useEffect(() => {
    setNotifications(getStoredNotifications());
  }, []);

  // Check for due date notifications
  const checkDueDateNotifications = useCallback(() => {
    if (!preferences.dueDateReminders) return;

    const now = new Date();
    const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);
    const storedNotifications = getStoredNotifications(); // Get fresh from storage

    tasks.forEach(task => {
      if (task.completed || !task.due_date) return;

      const dueDate = new Date(task.due_date);
      const isOverdue = dueDate < now;
      const isDueSoon = dueDate <= oneHourFromNow && dueDate >= now;

      if (isOverdue) {
        const notifId = `overdue-${task.id}`;
        const exists = storedNotifications.some(n => n.id === notifId);
        if (!exists) {
          addNotification({
            type: 'due_date',
            title: '⚠️ Overdue Task',
            message: `"${task.title}" is overdue!`,
            icon: '⏰',
            id: notifId
          });
        }
      } else if (isDueSoon) {
        const notifId = `due-soon-${task.id}`;
        const exists = storedNotifications.some(n => n.id === notifId);
        if (!exists) {
          addNotification({
            type: 'due_date',
            title: '📅 Task Due Soon',
            message: `"${task.title}" is due in less than 1 hour!`,
            icon: '⏰',
            id: notifId
          });
        }
      }
    });
  }, [tasks, preferences.dueDateReminders]);

  // Check for energy-based suggestions
  const checkEnergySuggestions = useCallback(() => {
    if (!preferences.energySuggestions) return;

    const lastEnergyCheck = localStorage.getItem('last-energy-suggestion');
    const now = Date.now();
    
    // Only suggest once per hour
    if (lastEnergyCheck && now - parseInt(lastEnergyCheck) < 60 * 60 * 1000) {
      return;
    }

    const matchingTasks = tasks.filter(t => 
      !t.completed && t.energy_requirement === currentEnergy
    );

    if (matchingTasks.length > 0 && currentEnergy >= 4) {
      addNotification({
        type: 'energy',
        title: '⚡ High Energy Detected!',
        message: `You have ${matchingTasks.length} task(s) matching your high energy level!`,
        icon: '💪'
      });
      localStorage.setItem('last-energy-suggestion', now.toString());
    } else if (currentEnergy <= 2) {
      const easyTasks = tasks.filter(t => !t.completed && t.energy_requirement <= 2);
      if (easyTasks.length > 0) {
        addNotification({
          type: 'energy',
          title: '🌙 Low Energy Mode',
          message: `Try ${easyTasks.length} easier task(s) that match your energy!`,
          icon: '💤'
        });
        localStorage.setItem('last-energy-suggestion', now.toString());
      }
    }
  }, [tasks, currentEnergy, preferences.energySuggestions]);

  // Check for streak alerts
  const checkStreakAlerts = useCallback(() => {
    if (!preferences.streakAlerts) return;

    const lastStreakCheck = localStorage.getItem('last-streak-check');
    const today = new Date().toDateString();

    if (lastStreakCheck === today) return;

    if (streakData.completionStreak >= 3) {
      const incompleteTasks = tasks.filter(t => !t.completed);
      if (incompleteTasks.length > 0) {
        addNotification({
          type: 'streak',
          title: `🔥 ${streakData.completionStreak}-Day Streak!`,
          message: `Complete a task today to maintain your streak!`,
          icon: '🔥'
        });
      }
    }

    localStorage.setItem('last-streak-check', today);
  }, [streakData, tasks, preferences.streakAlerts]);

  // Check for focus reminders
  const checkFocusReminders = useCallback(() => {
    if (!preferences.focusReminders) return;

    const lastFocusCheck = localStorage.getItem('last-focus-reminder');
    const now = Date.now();

    // Remind every 4 hours
    if (lastFocusCheck && now - parseInt(lastFocusCheck) < 4 * 60 * 60 * 1000) {
      return;
    }

    const lastFocusSession = localStorage.getItem('last-focus-session');
    const todayStart = new Date().setHours(0, 0, 0, 0);

    if (!lastFocusSession || parseInt(lastFocusSession) < todayStart) {
      addNotification({
        type: 'focus',
        title: '🎯 Ready to Focus?',
        message: `You haven't started a focus session today. Try a 25-minute Pomodoro!`,
        icon: '⏱️'
      });
      localStorage.setItem('last-focus-reminder', now.toString());
    }
  }, [preferences.focusReminders]);

  // Run all checks periodically
  useEffect(() => {
    const interval = setInterval(() => {
      checkDueDateNotifications();
      checkEnergySuggestions();
      checkStreakAlerts();
      checkFocusReminders();
      setNotifications(getStoredNotifications());
    }, 5 * 60 * 1000); // Check every 5 minutes (less aggressive)

    // Initial check
    checkDueDateNotifications();
    checkEnergySuggestions();
    checkStreakAlerts();
    checkFocusReminders();

    return () => clearInterval(interval);
  }, [checkDueDateNotifications, checkEnergySuggestions, checkStreakAlerts, checkFocusReminders]);

  const handleMarkAsRead = useCallback((id: string) => {
    markNotificationAsRead(id);
    setNotifications(getStoredNotifications());
  }, []);

  const handleDelete = useCallback((id: string) => {
    deleteNotification(id);
    setNotifications(getStoredNotifications());
  }, []);

  const handleClearAll = useCallback(() => {
    clearAllNotifications();
    setNotifications([]);
  }, []);

  const updatePreferences = useCallback((newPrefs: NotificationPreferences) => {
    saveNotificationPreferences(newPrefs);
    setPreferences(newPrefs);
  }, []);

  return {
    notifications,
    unreadCount: notifications.filter(n => !n.read).length,
    preferences,
    updatePreferences,
    markAsRead: handleMarkAsRead,
    deleteNotification: handleDelete,
    clearAll: handleClearAll
  };
};

