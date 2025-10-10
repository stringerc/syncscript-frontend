import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface DailyPlan {
  morning: {
    message: string;
    tasks: string[];
    focusBlock: string;
    energyLevel: string;
  };
  afternoon: {
    message: string;
    tasks: string[];
    focusBlock: string;
    energyLevel: string;
  };
  evening: {
    message: string;
    tasks: string[];
    focusBlock: string | null;
    energyLevel: string;
  };
  tips: string[];
}

interface Task {
  id: string;
  title: string;
  [key: string]: unknown;
}

interface DailyPlanningProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: Task[];
  energyPredictions: Array<Record<string, unknown>>;
}

const DailyPlanning: React.FC<DailyPlanningProps> = ({ isOpen, onClose, tasks, energyPredictions }) => {
  const [plan, setPlan] = useState<DailyPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (isOpen && !plan) {
      generatePlan();
    }
  }, [isOpen]);

  const generatePlan = async () => {
    setIsGenerating(true);

    try {
      const response = await fetch('/api/ai/daily-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tasks, energyPredictions })
      });

      if (response.ok) {
        const data = await response.json();
        setPlan(data.plan);
        toast.success('🌅 Daily plan generated!');
      }
    } catch (error) {
      console.error('Daily planning error:', error);
      toast.error('Failed to generate plan');
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="daily-planning-overlay" onClick={onClose}>
      <motion.div
        className="daily-planning-modal"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="daily-planning-header">
          <div>
            <h2>🌅 Smart Daily Planning</h2>
            <p>AI-optimized schedule for today</p>
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="daily-planning-content">
          {isGenerating ? (
            <div className="generating-state">
              <div className="spinner"></div>
              <p>Generating your optimal daily plan...</p>
            </div>
          ) : plan ? (
            <>
              {/* Morning */}
              <div className="time-block morning">
                <div className="block-header">
                  <h3>🌅 Morning</h3>
                  <span className="energy-badge high">High Energy</span>
                  {plan.morning.focusBlock && (
                    <span className="focus-time">{plan.morning.focusBlock}</span>
                  )}
                </div>
                <p className="block-message">{plan.morning.message}</p>
                <div className="block-tasks">
                  {plan.morning.tasks.map(taskId => {
                    const task = tasks.find(t => t.id === taskId);
                    return task ? (
                      <div key={taskId} className="plan-task">
                        <span className="task-icon">✓</span>
                        <span>{task.title}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>

              {/* Afternoon */}
              <div className="time-block afternoon">
                <div className="block-header">
                  <h3>☀️ Afternoon</h3>
                  <span className="energy-badge medium">Medium Energy</span>
                  {plan.afternoon.focusBlock && (
                    <span className="focus-time">{plan.afternoon.focusBlock}</span>
                  )}
                </div>
                <p className="block-message">{plan.afternoon.message}</p>
                <div className="block-tasks">
                  {plan.afternoon.tasks.map(taskId => {
                    const task = tasks.find(t => t.id === taskId);
                    return task ? (
                      <div key={taskId} className="plan-task">
                        <span className="task-icon">✓</span>
                        <span>{task.title}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>

              {/* Evening */}
              <div className="time-block evening">
                <div className="block-header">
                  <h3>🌙 Evening</h3>
                  <span className="energy-badge low">Low Energy</span>
                </div>
                <p className="block-message">{plan.evening.message}</p>
                <div className="block-tasks">
                  {plan.evening.tasks.map(taskId => {
                    const task = tasks.find(t => t.id === taskId);
                    return task ? (
                      <div key={taskId} className="plan-task">
                        <span className="task-icon">✓</span>
                        <span>{task.title}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>

              {/* Tips */}
              <div className="tips-section">
                <h4>💡 Today&apos;s Tips</h4>
                <ul>
                  {plan.tips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            </>
          ) : null}
        </div>

        <div className="daily-planning-footer">
          <button className="btn btn-ghost" onClick={generatePlan}>
            🔄 Regenerate
          </button>
          <button className="btn btn-primary" onClick={onClose}>
            Let&apos;s Go! 🚀
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DailyPlanning;
