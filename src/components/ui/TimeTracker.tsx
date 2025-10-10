import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import '../../styles/TimeTracker.css';

interface TimeTrackerProps {
  taskId: string;
  taskTitle: string;
  estimatedDuration?: number;
  onSaveTime: (minutes: number) => void;
}

const TimeTracker: React.FC<TimeTrackerProps> = ({ taskId, taskTitle, estimatedDuration, onSaveTime }) => {
  const [isTracking, setIsTracking] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    if (!isTracking || !startTime) return;

    const interval = setInterval(() => {
      setElapsed(Date.now() - startTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [isTracking, startTime]);

  const handleStart = () => {
    setStartTime(Date.now() - elapsed);
    setIsTracking(true);
    toast.success(`⏱️ Tracking time for: ${taskTitle}`);
  };

  const handlePause = () => {
    setIsTracking(false);
  };

  const handleStop = () => {
    const minutes = Math.floor(elapsed / 60000);
    onSaveTime(minutes);
    setIsTracking(false);
    setElapsed(0);
    setStartTime(null);
    toast.success(`✅ Logged ${minutes} minutes!`);
  };

  const handleReset = () => {
    setElapsed(0);
    setStartTime(null);
    setIsTracking(false);
  };

  const formatTime = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const elapsedMinutes = Math.floor(elapsed / 60000);
  const isOverEstimate = estimatedDuration && elapsedMinutes > estimatedDuration;

  return (
    <div className="time-tracker">
      <div className="tracker-display">
        <div className={`timer-value ${isOverEstimate ? 'over-estimate' : ''}`}>
          {formatTime(elapsed)}
        </div>
        {estimatedDuration && (
          <div className="estimate-comparison">
            Estimated: {estimatedDuration}min | 
            Actual: {elapsedMinutes}min
            {isOverEstimate && <span className="over-badge">⚠️ Over</span>}
          </div>
        )}
      </div>

      <div className="tracker-controls">
        {!isTracking ? (
          <button className="btn btn-primary" onClick={handleStart}>
            {elapsed > 0 ? '▶️ Resume' : '▶️ Start'}
          </button>
        ) : (
          <button className="btn btn-warning" onClick={handlePause}>
            ⏸️ Pause
          </button>
        )}
        
        {elapsed > 0 && (
          <>
            <button className="btn btn-success" onClick={handleStop}>
              ⏹️ Stop & Save
            </button>
            <button className="btn btn-ghost" onClick={handleReset}>
              🔄 Reset
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TimeTracker;
