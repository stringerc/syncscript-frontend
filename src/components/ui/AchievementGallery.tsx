import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ACHIEVEMENTS, 
  Achievement,
  AchievementCategory,
  AchievementTier,
  AchievementProgress,
  TIER_GRADIENTS,
  TIER_COLORS
} from '../../utils/achievementSystem';

interface AchievementGalleryProps {
  achievementProgress: AchievementProgress[];
  unlockedCount: number;
  totalPoints: number;
  completionPercentage: number;
}

const CATEGORY_INFO: Record<AchievementCategory, { name: string; icon: string; color: string }> = {
  tasks: { name: 'Tasks', icon: '✅', color: '#4A90E2' },
  streaks: { name: 'Streaks', icon: '🔥', color: '#FF6B6B' },
  energy: { name: 'Energy', icon: '⚡', color: '#FFD700' },
  focus: { name: 'Focus', icon: '🎯', color: '#9B59B6' },
  projects: { name: 'Projects', icon: '📁', color: '#3498DB' },
  speed: { name: 'Speed', icon: '⚡', color: '#E74C3C' },
  consistency: { name: 'Consistency', icon: '📊', color: '#2ECC71' }
};

const AchievementGallery: React.FC<AchievementGalleryProps> = ({
  achievementProgress,
  unlockedCount,
  totalPoints,
  completionPercentage
}) => {
  const [selectedCategory, setSelectedCategory] = useState<AchievementCategory | 'all'>('all');
  const [selectedTier, setSelectedTier] = useState<AchievementTier | 'all'>('all');
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  // Filter achievements
  const filteredAchievements = ACHIEVEMENTS.filter(achievement => {
    const categoryMatch = selectedCategory === 'all' || achievement.category === selectedCategory;
    const tierMatch = selectedTier === 'all' || achievement.tier === selectedTier;
    return categoryMatch && tierMatch;
  });

  // Get progress for an achievement
  const getProgress = (achievementId: string): AchievementProgress | undefined => {
    return achievementProgress.find(p => p.achievementId === achievementId);
  };

  return (
    <div className="achievement-gallery">
      {/* Header Stats */}
      <div className="gallery-header">
        <div className="gallery-stats">
          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-content">
              <div className="stat-value">{unlockedCount}/{ACHIEVEMENTS.length}</div>
              <div className="stat-label">Achievements</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">💎</div>
            <div className="stat-content">
              <div className="stat-value">{totalPoints}</div>
              <div className="stat-label">Achievement Points</div>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <div className="stat-value">{Math.round(completionPercentage)}%</div>
              <div className="stat-label">Completion</div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="completion-progress">
          <div className="progress-info">
            <span>Overall Progress</span>
            <span>{Math.round(completionPercentage)}%</span>
          </div>
          <div className="progress-bar-container">
            <motion.div
              className="progress-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="gallery-filters">
        {/* Category Filter */}
        <div className="filter-group">
          <label className="filter-label">Category</label>
          <div className="filter-buttons">
            <button
              className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              All
            </button>
            {Object.entries(CATEGORY_INFO).map(([category, info]) => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category as AchievementCategory)}
              >
                <span>{info.icon}</span>
                <span>{info.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tier Filter */}
        <div className="filter-group">
          <label className="filter-label">Tier</label>
          <div className="filter-buttons">
            <button
              className={`filter-btn ${selectedTier === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedTier('all')}
            >
              All Tiers
            </button>
            {(['bronze', 'silver', 'gold', 'platinum', 'legendary'] as AchievementTier[]).map(tier => (
              <button
                key={tier}
                className={`filter-btn tier-${tier} ${selectedTier === tier ? 'active' : ''}`}
                onClick={() => setSelectedTier(tier)}
              >
                {tier.charAt(0).toUpperCase() + tier.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Achievement Grid */}
      <div className="achievement-grid">
        {filteredAchievements.map((achievement, index) => {
          const progress = getProgress(achievement.id);
          const isUnlocked = progress?.isUnlocked || false;
          const percentage = progress?.percentage || 0;

          return (
            <motion.div
              key={achievement.id}
              className={`achievement-card ${isUnlocked ? 'unlocked' : 'locked'} tier-${achievement.tier}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              onClick={() => setSelectedAchievement(achievement)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div 
                className="achievement-card-bg"
                style={{ background: isUnlocked ? TIER_GRADIENTS[achievement.tier] : 'transparent' }}
              />
              
              <div className="achievement-icon-container">
                <div 
                  className={`achievement-icon ${!isUnlocked ? 'locked-icon' : ''}`}
                  style={{ 
                    filter: isUnlocked ? 'none' : 'grayscale(100%) brightness(0.5)'
                  }}
                >
                  {achievement.icon}
                </div>
                {!isUnlocked && percentage > 0 && (
                  <div className="progress-ring">
                    <svg viewBox="0 0 36 36" className="circular-chart">
                      <path
                        className="circle-bg"
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="circle"
                        strokeDasharray={`${percentage}, 100`}
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className="progress-text">{Math.round(percentage)}%</span>
                  </div>
                )}
              </div>

              <div className="achievement-info">
                <h4 className="achievement-name">{achievement.name}</h4>
                <p className="achievement-description">{achievement.description}</p>
                
                {!isUnlocked && progress && (
                  <div className="achievement-progress-info">
                    <span>{progress.currentValue} / {progress.targetValue}</span>
                  </div>
                )}
                
                {isUnlocked && (
                  <div className="achievement-reward">
                    <span className="reward-points">+{achievement.reward.points} pts</span>
                  </div>
                )}
              </div>

              {isUnlocked && (
                <div className="unlocked-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20,6 9,17 4,12"/>
                  </svg>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Achievement Detail Modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <div className="achievement-modal-overlay" onClick={() => setSelectedAchievement(null)}>
            <motion.div
              className="achievement-modal"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: TIER_GRADIENTS[selectedAchievement.tier]
              }}
            >
              <button 
                className="modal-close-btn"
                onClick={() => setSelectedAchievement(null)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>

              <div className="modal-icon">{selectedAchievement.icon}</div>
              <h2 className="modal-title">{selectedAchievement.name}</h2>
              <div className="modal-tier">{selectedAchievement.tier.toUpperCase()}</div>
              <p className="modal-description">{selectedAchievement.description}</p>
              
              <div className="modal-details">
                <div className="detail-item">
                  <span className="detail-label">Category</span>
                  <span className="detail-value">
                    {CATEGORY_INFO[selectedAchievement.category].icon} {CATEGORY_INFO[selectedAchievement.category].name}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Reward</span>
                  <span className="detail-value">💎 {selectedAchievement.reward.points} points</span>
                </div>
                {selectedAchievement.reward.title && (
                  <div className="detail-item">
                    <span className="detail-label">Title</span>
                    <span className="detail-value">🏅 {selectedAchievement.reward.title}</span>
                  </div>
                )}
              </div>

              {(() => {
                const progress = getProgress(selectedAchievement.id);
                return progress && !progress.isUnlocked ? (
                  <div className="modal-progress">
                    <div className="progress-stats">
                      <span>Progress: {progress.currentValue} / {progress.targetValue}</span>
                      <span>{Math.round(progress.percentage)}%</span>
                    </div>
                    <div className="progress-bar-container">
                      <div 
                        className="progress-bar-fill"
                        style={{ width: `${progress.percentage}%` }}
                      />
                    </div>
                  </div>
                ) : progress?.isUnlocked ? (
                  <div className="modal-unlocked">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20,6 9,17 4,12"/>
                    </svg>
                    <span>Achievement Unlocked!</span>
                  </div>
                ) : null;
              })()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AchievementGallery;

