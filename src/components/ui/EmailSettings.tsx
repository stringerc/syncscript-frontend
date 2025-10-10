import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import '../../styles/EmailSettings.css';

interface EmailSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

interface EmailPreferences {
  email_due_date_reminders: boolean;
  email_daily_summary: boolean;
  email_streak_alerts: boolean;
  email_weekly_report: boolean;
  email_task_suggestions: boolean;
  reminder_hours_before: number;
}

const EmailSettings: React.FC<EmailSettingsProps> = ({ isOpen, onClose }) => {
  const [preferences, setPreferences] = useState<EmailPreferences>({
    email_due_date_reminders: true,
    email_daily_summary: true,
    email_streak_alerts: true,
    email_weekly_report: true,
    email_task_suggestions: true,
    reminder_hours_before: 24
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isSendingTest, setIsSendingTest] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchPreferences();
    }
  }, [isOpen]);

  const fetchPreferences = async () => {
    try {
      const tokenResponse = await fetch('/api/auth/token');
      const { accessToken } = await tokenResponse.json();

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notifications/preferences`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setPreferences(data.data.preferences);
      }
    } catch (error) {
      console.error('Error fetching preferences:', error);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      const tokenResponse = await fetch('/api/auth/token');
      const { accessToken } = await tokenResponse.json();

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notifications/preferences`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(preferences)
      });

      if (response.ok) {
        toast.success('✅ Email preferences saved!');
        onClose();
      } else {
        toast.error('Failed to save preferences');
      }
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast.error('Failed to save preferences');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSendTest = async () => {
    setIsSendingTest(true);

    try {
      const tokenResponse = await fetch('/api/auth/token');
      const { accessToken } = await tokenResponse.json();

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notifications/send-test`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (response.ok) {
        toast.success('📧 Test email sent! Check your inbox');
      } else {
        toast.error('Failed to send test email');
      }
    } catch (error) {
      console.error('Error sending test email:', error);
      toast.error('Failed to send test email');
    } finally {
      setIsSendingTest(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="email-settings-overlay" onClick={onClose}>
          <motion.div
            className="email-settings-modal"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="email-settings-header">
              <div className="header-content">
                <span className="header-icon">📧</span>
                <div>
                  <h2>Email Notifications</h2>
                  <p>Stay updated with your productivity</p>
                </div>
              </div>
              <button className="close-btn" onClick={onClose}>×</button>
            </div>

            {/* Content */}
            <div className="email-settings-content">
              <div className="settings-section">
                <h3>📬 Notification Types</h3>
                
                <label className="setting-item">
                  <div className="setting-info">
                    <div className="setting-title">⏰ Due Date Reminders</div>
                    <div className="setting-description">
                      Get notified before tasks are due
                    </div>
                  </div>
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={preferences.email_due_date_reminders}
                      onChange={(e) => setPreferences({
                        ...preferences,
                        email_due_date_reminders: e.target.checked
                      })}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </label>

                {preferences.email_due_date_reminders && (
                  <div className="setting-sub-option">
                    <label>Remind me</label>
                    <select
                      value={preferences.reminder_hours_before}
                      onChange={(e) => setPreferences({
                        ...preferences,
                        reminder_hours_before: parseInt(e.target.value)
                      })}
                    >
                      <option value="1">1 hour before</option>
                      <option value="3">3 hours before</option>
                      <option value="6">6 hours before</option>
                      <option value="12">12 hours before</option>
                      <option value="24">24 hours before</option>
                      <option value="48">2 days before</option>
                    </select>
                  </div>
                )}

                <label className="setting-item">
                  <div className="setting-info">
                    <div className="setting-title">📊 Daily Summary</div>
                    <div className="setting-description">
                      Get a daily recap of your productivity (8 AM)
                    </div>
                  </div>
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={preferences.email_daily_summary}
                      onChange={(e) => setPreferences({
                        ...preferences,
                        email_daily_summary: e.target.checked
                      })}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </label>

                <label className="setting-item">
                  <div className="setting-info">
                    <div className="setting-title">🔥 Streak Alerts</div>
                    <div className="setting-description">
                      Reminders to maintain your daily streak
                    </div>
                  </div>
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={preferences.email_streak_alerts}
                      onChange={(e) => setPreferences({
                        ...preferences,
                        email_streak_alerts: e.target.checked
                      })}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </label>

                <label className="setting-item">
                  <div className="setting-info">
                    <div className="setting-title">📈 Weekly Report</div>
                    <div className="setting-description">
                      Comprehensive productivity insights (Monday 9 AM)
                    </div>
                  </div>
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={preferences.email_weekly_report}
                      onChange={(e) => setPreferences({
                        ...preferences,
                        email_weekly_report: e.target.checked
                      })}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </label>

                <label className="setting-item">
                  <div className="setting-info">
                    <div className="setting-title">🤖 Smart Suggestions</div>
                    <div className="setting-description">
                      AI-powered task recommendations based on your energy
                    </div>
                  </div>
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={preferences.email_task_suggestions}
                      onChange={(e) => setPreferences({
                        ...preferences,
                        email_task_suggestions: e.target.checked
                      })}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </label>
              </div>

              {/* Test Email */}
              <div className="test-email-section">
                <button 
                  className="btn btn-outline"
                  onClick={handleSendTest}
                  disabled={isSendingTest}
                >
                  {isSendingTest ? (
                    <>
                      <span className="spinner"></span>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>📬</span>
                      <span>Send Test Email</span>
                    </>
                  )}
                </button>
                <p className="test-email-hint">
                  Send a test email to verify your notifications are working
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="email-settings-footer">
              <button className="btn btn-ghost" onClick={onClose}>
                Cancel
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <span className="spinner"></span>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <span>💾</span>
                    <span>Save Preferences</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EmailSettings;
