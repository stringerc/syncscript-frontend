import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../../styles/Onboarding.css';

interface OnboardingStep {
  title: string;
  description: string;
  icon: string;
  targetElement?: string;
  action?: string;
}

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(() => {
    return !localStorage.getItem('onboardingComplete');
  });

  const steps: OnboardingStep[] = [
    {
      title: 'Welcome to SyncScript! 👋',
      description: 'The world&apos;s first energy-based productivity platform. Let&apos;s get you started!',
      icon: '🚀'
    },
    {
      title: 'Track Your Energy ⚡',
      description: 'Log how you feel throughout the day. We&apos;ll match tasks to your energy levels.',
      icon: '⚡',
      targetElement: '#energy-button',
      action: 'Click "Log Energy" to track your energy'
    },
    {
      title: 'Create Your First Task ✨',
      description: 'Add tasks and we&apos;ll suggest the best time to do them based on your energy.',
      icon: '✨',
      targetElement: '#create-task-button',
      action: 'Click "Create Task" to add your first task'
    },
    {
      title: 'AI-Powered Suggestions 🤖',
      description: 'Get smart recommendations for what to work on based on your current energy.',
      icon: '🤖',
      targetElement: '#smart-suggestions'
    },
    {
      title: 'Keyboard Shortcuts ⌨️',
      description: 'Press Cmd+K for command palette, ? for shortcuts, and Cmd+Shift+A for quick capture.',
      icon: '⌨️'
    },
    {
      title: 'You&apos;re All Set! 🎉',
      description: 'Start being productive with SyncScript. Remember: match tasks to your energy!',
      icon: '🎉'
    }
  ];

  const currentStepData = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    localStorage.setItem('onboardingComplete', 'true');
    setIsActive(false);
    onComplete();
  };

  if (!isActive) return null;

  return (
    <AnimatePresence>
      <div className="onboarding-overlay">
        {currentStepData.targetElement && (
          <div className="onboarding-spotlight" />
        )}
        
        <motion.div
          className="onboarding-tooltip"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
        >
          <div className="tooltip-icon">{currentStepData.icon}</div>
          
          <h3 className="tooltip-title">{currentStepData.title}</h3>
          <p className="tooltip-description">{currentStepData.description}</p>
          
          {currentStepData.action && (
            <div className="tooltip-action">
              💡 {currentStepData.action}
            </div>
          )}

          <div className="tooltip-footer">
            <div className="progress-dots">
              {steps.map((_, idx) => (
                <span
                  key={idx}
                  className={`dot ${idx === currentStep ? 'active' : ''} ${idx < currentStep ? 'completed' : ''}`}
                />
              ))}
            </div>

            <div className="tooltip-actions">
              <button className="btn btn-ghost" onClick={handleSkip}>
                Skip Tour
              </button>
              <button className="btn btn-primary" onClick={handleNext}>
                {currentStep < steps.length - 1 ? 'Next →' : 'Get Started! 🚀'}
              </button>
            </div>
          </div>

          <div className="step-counter">
            {currentStep + 1} / {steps.length}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Onboarding;
