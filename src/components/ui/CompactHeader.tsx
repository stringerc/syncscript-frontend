import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface CompactHeaderProps {
  userName: string;
  userLevel: number;
  userPoints: number;
  levelProgress: number; // 0-100
  streak: number;
  tasksToday: { completed: number; total: number };
  currentEnergy: number;
  unreadNotifications: number;
  onOpenNotifications: () => void;
  onOpenAnalytics: () => void;
  onOpenThemes: () => void;
  onOpenAchievements: () => void;
  onOpenLearning: () => void;
  onOpenSettings: () => void;
}

const CompactHeader: React.FC<CompactHeaderProps> = ({
  userName,
  userLevel,
  userPoints,
  levelProgress,
  streak,
  tasksToday,
  currentEnergy,
  unreadNotifications,
  onOpenNotifications,
  onOpenAnalytics,
  onOpenThemes,
  onOpenAchievements,
  onOpenLearning,
  onOpenSettings
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const menuItems = [
    { id: 'analytics', label: 'Analytics', icon: '📊', onClick: onOpenAnalytics },
    { id: 'achievements', label: 'Achievements', icon: '🏆', onClick: onOpenAchievements },
    { id: 'themes', label: 'Themes', icon: '🎨', onClick: onOpenThemes },
    { id: 'learning', label: 'Learning Center', icon: '🎓', onClick: onOpenLearning },
    { id: 'settings', label: 'Settings', icon: '⚙️', onClick: onOpenSettings },
  ];

  return (
    <motion.header 
      className="compact-header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="compact-header-content">
        {/* Left: Logo & Welcome */}
        <div className="header-left">
          <h1 className="header-logo">
            <span className="logo-gradient">SyncScript</span>
          </h1>
          <div className="header-welcome">
            Welcome back, {userName}!
          </div>
        </div>

        {/* Center: Level Progress */}
        <div className="header-center">
          <div className="level-display">
            <span className="level-label">Level {userLevel}</span>
            <div className="level-bar">
              <motion.div 
                className="level-progress"
                initial={{ width: 0 }}
                animate={{ width: `${levelProgress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            <span className="level-percentage">{levelProgress}%</span>
          </div>
        </div>

        {/* Right: Compact Stats + Menu */}
        <div className="header-right">
          {/* Compact Stats Row */}
          <div className="compact-stats">
            <div className="stat-item" title={`Current Energy: ${currentEnergy}/5`}>
              <span className="stat-icon">⚡</span>
              <span className="stat-value">{currentEnergy}/5</span>
            </div>
            <div className="stat-divider">•</div>
            <div className="stat-item" title={`${streak} day streak`}>
              <span className="stat-icon">🔥</span>
              <span className="stat-value">{streak}</span>
            </div>
            <div className="stat-divider">•</div>
            <div className="stat-item" title={`${userPoints} total points`}>
              <span className="stat-icon">⭐</span>
              <span className="stat-value">{userPoints.toLocaleString()}</span>
            </div>
            <div className="stat-divider">•</div>
            <div className="stat-item" title={`Tasks: ${tasksToday.completed}/${tasksToday.total} today`}>
              <span className="stat-icon">✓</span>
              <span className="stat-value">{tasksToday.completed}/{tasksToday.total}</span>
            </div>
          </div>

          {/* Notifications */}
          <button 
            className="header-icon-btn"
            onClick={onOpenNotifications}
            title="Notifications"
          >
            <span className="icon-wrapper">
              🔔
              {unreadNotifications > 0 && (
                <span className="notification-badge-compact">
                  {unreadNotifications > 99 ? '99+' : unreadNotifications}
                </span>
              )}
            </span>
          </button>

          {/* User Menu */}
          <div className="user-menu-container">
            <button
              className="user-menu-trigger"
              onClick={() => setShowMenu(!showMenu)}
            >
              <span className="user-avatar">
                {userName.charAt(0).toUpperCase()}
              </span>
              <span className="menu-icon">⋮⋮⋮</span>
            </button>

            <AnimatePresence>
              {showMenu && (
                <>
                  <div 
                    className="menu-backdrop" 
                    onClick={() => setShowMenu(false)}
                  />
                  <motion.div
                    className="user-menu-dropdown"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {menuItems.map(item => (
                      <button
                        key={item.id}
                        className="menu-item"
                        onClick={() => {
                          item.onClick();
                          setShowMenu(false);
                        }}
                      >
                        <span className="menu-item-icon">{item.icon}</span>
                        <span>{item.label}</span>
                      </button>
                    ))}
                    <div className="menu-divider" />
                    <Link href="/api/auth/logout" className="menu-item logout">
                      <span className="menu-item-icon">🚪</span>
                      <span>Logout</span>
                    </Link>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default CompactHeader;
