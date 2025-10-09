import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface FocusTimerProps {
  taskTitle: string;
  onComplete: () => void;
  onCancel: () => void;
}

const WORK_DURATION = 25 * 60; // 25 minutes in seconds
const BREAK_DURATION = 5 * 60; // 5 minutes in seconds

const FocusTimer: React.FC<FocusTimerProps> = ({ taskTitle, onComplete, onCancel }) => {
  const [isBreak, setIsBreak] = useState(false);
  const [timeLeft, setTimeLeft] = useState(WORK_DURATION);
  const [isRunning, setIsRunning] = useState(true);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Timer finished
          playSound();
          
          if (isBreak) {
            // Break finished, start new work session
            toast.success('Break over! Ready for another session? 💪', {
              duration: 4000,
              icon: '⏰',
            });
            setIsBreak(false);
            return WORK_DURATION;
          } else {
            // Work session finished
            const newSessions = sessionsCompleted + 1;
            setSessionsCompleted(newSessions);
            
            toast.success('Focus session complete! Take a break! 🎉', {
              duration: 4000,
              icon: '✅',
            });
            
            setIsBreak(true);
            return BREAK_DURATION;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, isBreak, sessionsCompleted]);

  const playSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      
      const audioContext = new AudioContextClass();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = (): number => {
    const total = isBreak ? BREAK_DURATION : WORK_DURATION;
    return ((total - timeLeft) / total) * 100;
  };

  return (
    <AnimatePresence>
      <motion.div
        className="focus-timer-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="focus-timer"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Header */}
          <div className="focus-header">
            <h3 className="focus-title">
              {isBreak ? '☕ Break Time' : '🎯 Focus Session'}
            </h3>
            <p className="focus-task">{taskTitle}</p>
            {!isBreak && (
              <p className="pomodoro-info">
                🍅 Pomodoro Technique: 25min focused work → 5min break. 
                This scientifically-proven method maximizes productivity and prevents burnout.
              </p>
            )}
          </div>

          {/* Timer Circle */}
          <div className="timer-circle-container">
            <svg className="timer-circle" viewBox="0 0 200 200">
              <circle
                className="timer-circle-bg"
                cx="100"
                cy="100"
                r="90"
              />
              <circle
                className="timer-circle-progress"
                cx="100"
                cy="100"
                r="90"
                style={{
                  strokeDasharray: `${2 * Math.PI * 90}`,
                  strokeDashoffset: `${2 * Math.PI * 90 * (1 - getProgress() / 100)}`,
                  stroke: isBreak ? 'var(--syncscript-green-500)' : 'var(--syncscript-blue-500)'
                }}
              />
            </svg>
            <div className="timer-text">
              <span className="timer-display">{formatTime(timeLeft)}</span>
              <span className="timer-label">{isBreak ? 'Break' : 'Focus'}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="focus-stats">
            <div className="focus-stat">
              <span className="stat-value">{sessionsCompleted}</span>
              <span className="stat-label">Sessions</span>
            </div>
            <div className="focus-stat">
              <span className="stat-value">{sessionsCompleted * 25}m</span>
              <span className="stat-label">Total Focus</span>
            </div>
          </div>

          {/* Controls */}
          <div className="focus-controls">
            <button
              className="btn btn-ghost"
              onClick={() => setIsRunning(!isRunning)}
            >
              {isRunning ? (
                <>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16"/>
                    <rect x="14" y="4" width="4" height="16"/>
                  </svg>
                  Pause
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                  Resume
                </>
              )}
            </button>
            
            <button
              className="btn btn-primary"
              onClick={onComplete}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 11l3 3L22 4"/>
              </svg>
              Finish
            </button>
            
            <button
              className="btn btn-ghost"
              onClick={onCancel}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              Cancel
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FocusTimer;
