import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface TourStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  tip?: string;
  action?: { label: string; onClick: () => void };
}

interface EnhancedWelcomeTourProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const EnhancedWelcomeTour: React.FC<EnhancedWelcomeTourProps> = ({ 
  isOpen, 
  onClose, 
  onComplete 
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: TourStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to SyncScript! 🎉',
      description: 'You\'re about to experience the most advanced productivity platform ever built. With 100+ features, AI-powered insights, and world-class design, SyncScript will transform how you work.',
      icon: '🚀',
      tip: 'This tour takes 2 minutes and will show you the power features'
    },
    {
      id: 'energy',
      title: 'Energy-Based Productivity ⚡',
      description: 'Unlike other apps, SyncScript matches tasks to your energy level. Log your energy (1-5) and we\'ll suggest the perfect tasks for right now.',
      icon: '⚡',
      tip: 'High energy? Tackle hard tasks. Low energy? Do easy wins.',
      action: { label: 'Try logging energy', onClick: () => {} }
    },
    {
      id: 'ai-powered',
      title: 'AI Superpowers 🤖',
      description: 'Our AI Coach analyzes your patterns, breaks down complex tasks, suggests optimal schedules, and gives personalized productivity tips.',
      icon: '🤖',
      tip: 'Just type "Schedule dentist appointment next Tuesday" and AI creates the task!'
    },
    {
      id: 'views',
      title: 'Multiple Task Views 👁️',
      description: 'Switch between List, Kanban, Gantt Chart, Mind Map, Calendar, and Eisenhower Matrix. Same tasks, different perspectives.',
      icon: '📋',
      tip: 'Use Cmd+1 through Cmd+6 to switch views instantly'
    },
    {
      id: 'features',
      title: 'Feature Command Center ✨',
      description: 'With 100+ features, discovery is key. Press the ✨ button (or Cmd+K) to access ALL features instantly with smart search.',
      icon: '✨',
      tip: 'Try searching "team", "ai", or "analytics" - everything\'s organized!'
    },
    {
      id: 'gamification',
      title: 'Level Up Your Productivity 🏆',
      description: 'Earn points for completing tasks, maintain streaks, unlock achievements, and level up. Make productivity fun and rewarding!',
      icon: '🏆',
      tip: 'Your level appears in the header - watch it grow!'
    },
    {
      id: 'team',
      title: 'Team Collaboration 👥',
      description: 'Invite team members, share projects, chat in real-time, and track team analytics. Built for both solo users and teams.',
      icon: '👥',
      tip: 'Perfect for remote teams and async collaboration'
    },
    {
      id: 'shortcuts',
      title: 'Keyboard Shortcuts ⌨️',
      description: 'Master these shortcuts: N (new task), ? (shortcuts panel), Cmd+K (search features), Cmd+Shift+P (quick switcher), and more!',
      icon: '⌨️',
      tip: 'Press ? anytime to see all shortcuts'
    },
    {
      id: 'ready',
      title: 'You\'re Ready! 🎯',
      description: 'You now know the core features. Explore the Command Center (✨) to discover all 100+ features. Remember: log your energy and let AI guide your day!',
      icon: '🎉',
      tip: 'Pro tip: Start by logging your energy, then let Smart Suggestions guide you'
    }
  ];

  const step = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      // Complete tour!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      onComplete();
      onClose();
      localStorage.setItem('tour_completed', 'true');
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleSkip = () => {
    onClose();
    localStorage.setItem('tour_skipped', 'true');
  };

  if (!isOpen) return null;

  return (
    <div className="welcome-tour-overlay" onClick={(e) => e.stopPropagation()}>
      <motion.div
        className="welcome-tour-modal"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: 'spring', damping: 25 }}
      >
        {/* Progress Bar */}
        <div className="tour-progress-bar">
          <motion.div
            className="tour-progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Content */}
        <div className="tour-content">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="tour-step"
          >
            <div className="tour-icon">{step.icon}</div>
            <h2 className="tour-title">{step.title}</h2>
            <p className="tour-description">{step.description}</p>
            
            {step.tip && (
              <div className="tour-tip">
                <span className="tip-icon">💡</span>
                <span className="tip-text">{step.tip}</span>
              </div>
            )}

            {step.action && (
              <button
                className="tour-action-btn"
                onClick={step.action.onClick}
              >
                {step.action.label} →
              </button>
            )}
          </motion.div>
        </div>

        {/* Footer */}
        <div className="tour-footer">
          <div className="tour-step-indicator">
            {steps.map((s, index) => (
              <button
                key={s.id}
                className={`step-dot ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
                onClick={() => setCurrentStep(index)}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>

          <div className="tour-actions">
            <button
              className="btn btn-ghost"
              onClick={handleSkip}
            >
              Skip Tour
            </button>
            <button
              className="btn btn-primary tour-next-btn"
              onClick={handleNext}
            >
              {isLastStep ? '🎉 Get Started!' : 'Next →'}
            </button>
          </div>
        </div>

        {/* Step Counter */}
        <div className="tour-step-counter">
          Step {currentStep + 1} of {steps.length}
        </div>
      </motion.div>
    </div>
  );
};

export default EnhancedWelcomeTour;
