import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import '../../styles/PomodoroPlus.css';

interface Preset {
  name: string;
  work: number;
  break: number;
  longBreak: number;
  sessionsUntilLongBreak: number;
}

interface PomoroPlusProps {
  isOpen: boolean;
  onClose: () => void;
}

const PomodoroPlus: React.FC<PomoroPlusProps> = ({ isOpen, onClose }) => {
  const presets: Record<string, Preset> = {
    classic: { name: 'Classic', work: 25, break: 5, longBreak: 15, sessionsUntilLongBreak: 4 },
    deep: { name: 'Deep Work', work: 50, break: 10, longBreak: 20, sessionsUntilLongBreak: 3 },
    quick: { name: 'Quick Sprint', work: 15, break: 3, longBreak: 10, sessionsUntilLongBreak: 6 },
    custom: { name: 'Custom', work: 30, break: 7, longBreak: 18, sessionsUntilLongBreak: 4 }
  };

  const [selectedPreset, setSelectedPreset] = useState<string>('classic');
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(presets.classic.work * 60);
  const [currentPhase, setCurrentPhase] = useState<'work' | 'break' | 'longBreak'>('work');
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [todaysSessions, setTodaysSessions] = useState<Array<{ timestamp: string; duration: number }>>([]);

  const currentPreset = presets[selectedPreset];

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handlePhaseComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, currentPhase]);

  const handlePhaseComplete = () => {
    setIsActive(false);

    if (currentPhase === 'work') {
      const newSessionCount = sessionsCompleted + 1;
      setSessionsCompleted(newSessionCount);
      
      // Add to history
      setTodaysSessions([...todaysSessions, {
        timestamp: new Date().toISOString(),
        duration: currentPreset.work
      }]);

      toast.success(`🎉 Work session complete! (${newSessionCount}/${currentPreset.sessionsUntilLongBreak})`);

      // Determine break type
      if (newSessionCount % currentPreset.sessionsUntilLongBreak === 0) {
        setCurrentPhase('longBreak');
        setTimeLeft(currentPreset.longBreak * 60);
        toast.success(`☕ Time for a long break! (${currentPreset.longBreak} min)`);
      } else {
        setCurrentPhase('break');
        setTimeLeft(currentPreset.break * 60);
        toast.success(`☕ Short break time! (${currentPreset.break} min)`);
      }
    } else {
      toast.success('✅ Break complete! Ready for another session?');
      setCurrentPhase('work');
      setTimeLeft(currentPreset.work * 60);
    }
  };

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setCurrentPhase('work');
    setTimeLeft(currentPreset.work * 60);
  };

  const handlePresetChange = (presetKey: string) => {
    setSelectedPreset(presetKey);
    setCurrentPhase('work');
    setTimeLeft(presets[presetKey].work * 60);
    setIsActive(false);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalMinutesToday = todaysSessions.reduce((sum, s) => sum + s.duration, 0);

  if (!isOpen) return null;

  return (
    <div className="pomodoro-plus-overlay" onClick={onClose}>
      <motion.div
        className="pomodoro-plus-modal"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pomodoro-header">
          <h2>🍅 Pomodoro++</h2>
          <p>Enhanced focus sessions with presets</p>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="pomodoro-content">
          {/* Preset Selector */}
          <div className="preset-selector">
            {Object.entries(presets).map(([key, preset]) => (
              <button
                key={key}
                className={`preset-btn ${selectedPreset === key ? 'active' : ''}`}
                onClick={() => handlePresetChange(key)}
              >
                <div className="preset-name">{preset.name}</div>
                <div className="preset-config">{preset.work}m / {preset.break}m</div>
              </button>
            ))}
          </div>

          {/* Timer Display */}
          <div className="timer-display">
            <div className="phase-indicator">
              {currentPhase === 'work' && '💼 Work Time'}
              {currentPhase === 'break' && '☕ Short Break'}
              {currentPhase === 'longBreak' && '🌟 Long Break'}
            </div>
            <div className={`timer-value ${isActive ? 'active' : ''}`}>
              {formatTime(timeLeft)}
            </div>
            <div className="session-counter">
              Session {sessionsCompleted + 1} / {currentPreset.sessionsUntilLongBreak}
            </div>
          </div>

          {/* Controls */}
          <div className="timer-controls">
            {!isActive ? (
              <button className="btn btn-primary btn-lg" onClick={handleStart}>
                ▶️ Start
              </button>
            ) : (
              <button className="btn btn-warning btn-lg" onClick={handlePause}>
                ⏸️ Pause
              </button>
            )}
            <button className="btn btn-ghost" onClick={handleReset}>
              🔄 Reset
            </button>
          </div>

          {/* Today's Stats */}
          <div className="today-stats">
            <h4>📊 Today&apos;s Progress</h4>
            <div className="stats-grid">
              <div className="stat">
                <div className="stat-value">{todaysSessions.length}</div>
                <div className="stat-label">Sessions</div>
              </div>
              <div className="stat">
                <div className="stat-value">{totalMinutesToday}</div>
                <div className="stat-label">Minutes</div>
              </div>
              <div className="stat">
                <div className="stat-value">{Math.floor(totalMinutesToday / 60)}h {totalMinutesToday % 60}m</div>
                <div className="stat-label">Total Time</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PomodoroPlus;
