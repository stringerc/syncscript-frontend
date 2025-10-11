import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

  // WP-PAR-02: Energy-First Onboarding (Showcases Unique Value)
  const steps: OnboardingStep[] = [
    {
      title: 'Welcome to Something Different 💎',
      description: 'SyncScript is the ONLY productivity app that matches tasks to your ENERGY. Let us show you why this changes everything...',
      icon: '⚡'
    },
    {
      title: 'Here&apos;s The Problem We Solve 🤔',
      description: 'Ever feel drained trying to do high-energy work when you&apos;re tired? Or restless doing boring tasks when you&apos;re energized? Most apps ignore this. We don&apos;t.',
      icon: '💡'
    },
    {
      title: 'Your Energy = Your Superpower ⚡',
      description: 'Try it now: Log your current energy level. SyncScript will ONLY suggest tasks that match how you feel RIGHT NOW. No more fighting yourself.',
      icon: '⚡',
      targetElement: '#energy-button',
      action: 'Log your energy to see the magic ✨'
    },
    {
      title: 'Watch: Energy Matching in Action 🎯',
      description: 'When you complete a task, your energy updates AUTOMATICALLY. Suggestions refresh instantly. You stay in flow, matched to YOUR capacity.',
      icon: '🎯',
      targetElement: '#create-task-button',
      action: 'Create a task to try it!'
    },
    {
      title: 'Why This is Unique 🏆',
      description: 'Notion doesn&apos;t have this. Todoist doesn&apos;t have this. Motion doesn&apos;t have this. ONLY SyncScript matches tasks to your energy + budget + context.',
      icon: '💎'
    },
    {
      title: 'You&apos;re Ready! Start Your Trial ✨',
      description: 'You now understand what makes SyncScript legendary. Try it free for 14 days. Match your energy, hit your goals, and never work against yourself again.',
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
