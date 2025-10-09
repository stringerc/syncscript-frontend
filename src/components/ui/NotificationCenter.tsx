import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Notification, NotificationPreferences } from '../../utils/notificationService';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  unreadCount: number;
  preferences: NotificationPreferences;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
  onUpdatePreferences: (prefs: NotificationPreferences) => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  notifications,
  unreadCount,
  preferences,
  onMarkAsRead,
  onDelete,
  onClearAll,
  onUpdatePreferences
}) => {
  const [showSettings, setShowSettings] = React.useState(false);

  const formatTime = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const getNotificationColor = (type: string): string => {
    switch (type) {
      case 'due_date': return 'var(--syncscript-error)';
      case 'energy': return 'var(--syncscript-blue-500)';
      case 'streak': return 'var(--syncscript-orange-500)';
      case 'focus': return 'var(--syncscript-purple-500)';
      case 'summary': return 'var(--syncscript-green-500)';
      default: return 'var(--syncscript-charcoal-500)';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="notification-center"
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="notif-header">
              <div className="notif-title-row">
                <h2 className="notif-title">🔔 Notifications</h2>
                {unreadCount > 0 && (
                  <span className="notif-badge">{unreadCount}</span>
                )}
              </div>
              <div className="notif-actions">
                <button
                  className="notif-icon-btn"
                  onClick={() => setShowSettings(!showSettings)}
                  title="Settings"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/>
                  </svg>
                </button>
                <button className="notif-icon-btn" onClick={onClose}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Settings Panel */}
            {showSettings && (
              <motion.div
                className="notif-settings"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <h3>Notification Preferences</h3>
                <label className="notif-pref">
                  <input
                    type="checkbox"
                    checked={preferences.dueDateReminders}
                    onChange={(e) => onUpdatePreferences({ ...preferences, dueDateReminders: e.target.checked })}
                  />
                  <span>📅 Due Date Reminders</span>
                </label>
                <label className="notif-pref">
                  <input
                    type="checkbox"
                    checked={preferences.energySuggestions}
                    onChange={(e) => onUpdatePreferences({ ...preferences, energySuggestions: e.target.checked })}
                  />
                  <span>⚡ Energy Suggestions</span>
                </label>
                <label className="notif-pref">
                  <input
                    type="checkbox"
                    checked={preferences.streakAlerts}
                    onChange={(e) => onUpdatePreferences({ ...preferences, streakAlerts: e.target.checked })}
                  />
                  <span>🔥 Streak Alerts</span>
                </label>
                <label className="notif-pref">
                  <input
                    type="checkbox"
                    checked={preferences.focusReminders}
                    onChange={(e) => onUpdatePreferences({ ...preferences, focusReminders: e.target.checked })}
                  />
                  <span>🎯 Focus Reminders</span>
                </label>
                <label className="notif-pref">
                  <input
                    type="checkbox"
                    checked={preferences.dailySummaries}
                    onChange={(e) => onUpdatePreferences({ ...preferences, dailySummaries: e.target.checked })}
                  />
                  <span>📊 Daily Summaries</span>
                </label>
              </motion.div>
            )}

            {/* Notifications List */}
            <div className="notif-list">
              {notifications.length === 0 ? (
                <div className="notif-empty">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                  </svg>
                  <p>No notifications yet</p>
                </div>
              ) : (
                <>
                  {notifications.length > 0 && (
                    <button className="btn btn-sm btn-ghost clear-all-btn" onClick={onClearAll}>
                      Clear All
                    </button>
                  )}
                  {notifications.map((notif) => (
                    <motion.div
                      key={notif.id}
                      className={`notif-item ${notif.read ? 'read' : 'unread'}`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      style={{ borderLeftColor: getNotificationColor(notif.type) }}
                    >
                      <div className="notif-content">
                        <div className="notif-icon" style={{ background: getNotificationColor(notif.type) }}>
                          {notif.icon}
                        </div>
                        <div className="notif-text">
                          <h4 className="notif-item-title">{notif.title}</h4>
                          <p className="notif-message">{notif.message}</p>
                          <span className="notif-time">{formatTime(notif.timestamp)}</span>
                        </div>
                      </div>
                      <div className="notif-item-actions">
                        {!notif.read && (
                          <button
                            className="notif-action-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              onMarkAsRead(notif.id);
                            }}
                            title="Mark as read"
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="20,6 9,17 4,12"/>
                            </svg>
                          </button>
                        )}
                        <button
                          className="notif-action-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(notif.id);
                          }}
                          title="Delete"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3,6 5,6 21,6"/>
                            <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/>
                          </svg>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationCenter;

