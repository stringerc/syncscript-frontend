      {/* Header */}
      <motion.header 
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="header-content">
          {/* Left Side - Title and Welcome */}
          <div className="header-left">
            <h1 className="dashboard-title">
              <span className="title-gradient">SyncScript</span>
            </h1>
            <p className="dashboard-subtitle">
              Welcome back, {user.name || user.email}!
            </p>
          </div>
          
          {/* Center - Cohesive Stats Section */}
          <div className="cohesive-stats-section">
            <div className="stats-grid">
              {/* Points */}
              <div className="stat-card points-card">
                <div className="stat-icon">⚡</div>
                <div className="stat-content">
                  <div className="stat-value">{userPoints}</div>
                  <div className="stat-label">Points</div>
                </div>
              </div>
              
              {/* Level */}
              <div className="stat-card level-card">
                <div className="stat-icon">🎯</div>
                <div className="stat-content">
                  <div className="stat-value">Level {userLevel}</div>
                  <div className="stat-label">Progress</div>
                </div>
              </div>
              
              {/* Completed Tasks */}
              <div className="stat-card completed-card">
                <div className="stat-icon">✅</div>
                <div className="stat-content">
                  <div className="stat-value">{completedTasks.length}</div>
                  <div className="stat-label">Completed</div>
                </div>
              </div>
              
              {/* Login Streak */}
              <div className="stat-card streak-card">
                <div className="stat-icon">🔥</div>
                <div className="stat-content">
                  <div className="stat-value">{streakData.loginStreak}</div>
                  <div className="stat-label">Day Streak</div>
                </div>
              </div>
              
              {/* Daily Tasks */}
              <div className="stat-card daily-card">
                <div className="stat-icon">📋</div>
                <div className="stat-content">
                  <div className="stat-value">{tasks.filter(t => !t.completed).length}</div>
                  <div className="stat-label">Tasks Today</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Actions */}
          <div className="header-actions">
            <button
              className="btn btn-secondary notif-btn"
              onClick={() => setShowNotifications(true)}
              style={{ position: 'relative', overflow: 'visible' }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '16px', height: '16px' }}>
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              {unreadCount > 0 && (
                <span 
                  className="notif-count"
                  style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    minWidth: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#ef4444',
                    color: 'white',
                    borderRadius: '50%',
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '0 5px',
                    zIndex: 9999,
                    boxShadow: '0 2px 8px rgba(239, 68, 68, 0.4)',
                    border: '2px solid white',
                    pointerEvents: 'none'
                  }}
                >
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setShowAnalytics(!showAnalytics)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '16px', height: '16px' }}>
                <line x1="18" y1="20" x2="18" y2="10"/>
                <line x1="12" y1="20" x2="12" y2="4"/>
                <line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
              Analytics
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setShowThemeSettings(true)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '16px', height: '16px' }}>
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
              </svg>
              Theme
            </button>
            <Link href="/api/auth/logout" className="btn btn-secondary">
              <svg className="neural-icon" viewBox="0 0 24 24">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="2" fill="none" />
                <polyline points="16,17 21,12 16,7" stroke="currentColor" strokeWidth="2" fill="none" />
                <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
              Logout
            </Link>
          </div>
        </div>
      </motion.header>
