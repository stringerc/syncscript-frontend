/**
 * Interactive Tutorial System
 * Phase 2: Onboarding Optimization
 * 
 * Guides users through features with interactive tours
 */

export interface TutorialStep {
  id: string;
  title: string;
  description: string;
  targetElement: string; // CSS selector
  position: 'top' | 'bottom' | 'left' | 'right';
  action?: string; // "Click here to...", "Try selecting..."
  completionTrigger?: string; // Event that marks step complete
  skippable: boolean;
}

export interface Tutorial {
  id: string;
  name: string;
  category: 'getting-started' | 'energy' | 'budget' | 'context' | 'advanced';
  steps: TutorialStep[];
  estimatedDuration: number; // minutes
  priority: number; // 1-5, higher = more important
}

export interface TutorialProgress {
  completedTutorials: string[];
  currentTutorial?: string;
  currentStep?: number;
  dismissedTutorials: string[];
  lastShown?: string;
}

/**
 * All available tutorials
 */
export const TUTORIALS: Tutorial[] = [
  {
    id: 'getting-started',
    name: 'Getting Started with SyncScript',
    category: 'getting-started',
    priority: 5,
    estimatedDuration: 5,
    steps: [
      {
        id: 'welcome',
        title: 'Welcome to SyncScript! 👋',
        description: 'Let us show you around in 5 minutes. You can skip anytime.',
        targetElement: '#main-content',
        position: 'bottom',
        skippable: true
      },
      {
        id: 'energy-selector',
        title: 'Log Your Energy ⚡',
        description: 'Click here to log how you feel right now (1-5). This is the foundation of everything!',
        targetElement: '#energy-button',
        position: 'bottom',
        action: 'Click to log your energy',
        completionTrigger: 'energy_logged',
        skippable: false
      },
      {
        id: 'create-task',
        title: 'Create Your First Task ✨',
        description: 'Add a task with an energy requirement. We\'ll match it to your current energy!',
        targetElement: '#create-task-button',
        position: 'bottom',
        action: 'Click to create a task',
        completionTrigger: 'task_created',
        skippable: false
      },
      {
        id: 'smart-suggestions',
        title: 'See AI Suggestions 🤖',
        description: 'Open Smart Suggestions to see what we recommend based on your energy!',
        targetElement: '#smart-suggestions',
        position: 'left',
        action: 'Click to see suggestions',
        skippable: true
      },
      {
        id: 'command-center',
        title: 'Command Center (Cmd+K) ⌨️',
        description: 'Press Cmd+K anytime to access all features instantly!',
        targetElement: '#command-center',
        position: 'bottom',
        action: 'Try pressing Cmd+K',
        skippable: true
      }
    ]
  },
  {
    id: 'energy-mastery',
    name: 'Energy Intelligence Mastery',
    category: 'energy',
    priority: 4,
    estimatedDuration: 3,
    steps: [
      {
        id: 'energy-matching',
        title: 'Energy Matching 🎯',
        description: 'Complete tasks that match your current energy for maximum efficiency and bonus emblems!',
        targetElement: '#task-list',
        position: 'right',
        skippable: true
      },
      {
        id: 'emblem-system',
        title: 'Emblem Economy 💎',
        description: 'Earn emblems for completing tasks. Perfect energy matches give bonus emblems!',
        targetElement: '#emblem-display',
        position: 'bottom',
        skippable: true
      }
    ]
  },
  {
    id: 'budget-setup',
    name: 'Set Up Budget Intelligence',
    category: 'budget',
    priority: 3,
    estimatedDuration: 4,
    steps: [
      {
        id: 'comfort-bands',
        title: 'Set Your Comfort Bands 💰',
        description: 'Define your min/ideal/max spending per category to see budget fit on recommendations.',
        targetElement: '#budget-feature',
        position: 'bottom',
        action: 'Click Budget to set your bands',
        skippable: true
      },
      {
        id: 'savings-goal',
        title: 'Create a Savings Goal 🎯',
        description: 'Link your budget to a dream! See \"Skip this = $X closer to vacation\" on over-budget items.',
        targetElement: '#goals-feature',
        position: 'bottom',
        action: 'Click Goals to create your first goal',
        skippable: true
      }
    ]
  }
];

/**
 * Load tutorial progress
 */
export function loadTutorialProgress(): TutorialProgress {
  if (typeof window === 'undefined') {
    return {
      completedTutorials: [],
      dismissedTutorials: []
    };
  }
  
  try {
    const stored = localStorage.getItem('tutorial_progress');
    if (!stored) {
      return {
        completedTutorials: [],
        dismissedTutorials: []
      };
    }
    
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading tutorial progress:', error);
    return {
      completedTutorials: [],
      dismissedTutorials: []
    };
  }
}

/**
 * Save tutorial progress
 */
export function saveTutorialProgress(progress: TutorialProgress): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('tutorial_progress', JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving tutorial progress:', error);
  }
}

/**
 * Mark tutorial as complete
 */
export function completeTutorial(tutorialId: string): void {
  const progress = loadTutorialProgress();
  
  if (!progress.completedTutorials.includes(tutorialId)) {
    progress.completedTutorials.push(tutorialId);
    progress.currentTutorial = undefined;
    progress.currentStep = undefined;
    saveTutorialProgress(progress);
    
    console.log(`✅ Tutorial Completed: ${tutorialId}`);
  }
}

/**
 * Dismiss tutorial
 */
export function dismissTutorial(tutorialId: string): void {
  const progress = loadTutorialProgress();
  
  if (!progress.dismissedTutorials.includes(tutorialId)) {
    progress.dismissedTutorials.push(tutorialId);
    progress.currentTutorial = undefined;
    progress.currentStep = undefined;
    saveTutorialProgress(progress);
  }
}

/**
 * Get next tutorial to show
 */
export function getNextTutorial(): Tutorial | null {
  const progress = loadTutorialProgress();
  
  // Filter out completed and dismissed
  const available = TUTORIALS.filter(t => 
    !progress.completedTutorials.includes(t.id) &&
    !progress.dismissedTutorials.includes(t.id)
  );
  
  if (available.length === 0) return null;
  
  // Sort by priority
  available.sort((a, b) => b.priority - a.priority);
  
  return available[0];
}

/**
 * Start a tutorial
 */
export function startTutorial(tutorialId: string): void {
  const progress = loadTutorialProgress();
  progress.currentTutorial = tutorialId;
  progress.currentStep = 0;
  saveTutorialProgress(progress);
}

/**
 * Advance to next step
 */
export function nextTutorialStep(): void {
  const progress = loadTutorialProgress();
  
  if (!progress.currentTutorial || progress.currentStep === undefined) return;
  
  const tutorial = TUTORIALS.find(t => t.id === progress.currentTutorial);
  if (!tutorial) return;
  
  if (progress.currentStep < tutorial.steps.length - 1) {
    progress.currentStep++;
    saveTutorialProgress(progress);
  } else {
    completeTutorial(progress.currentTutorial);
  }
}

/**
 * Get tutorial completion stats
 */
export function getTutorialStats(): {
  completed: number;
  total: number;
  percentage: number;
  nextRecommended: Tutorial | null;
} {
  const progress = loadTutorialProgress();
  const total = TUTORIALS.length;
  const completed = progress.completedTutorials.length;
  const percentage = Math.round((completed / total) * 100);
  const nextRecommended = getNextTutorial();
  
  return {
    completed,
    total,
    percentage,
    nextRecommended
  };
}

// Export for testing
export const __test__ = {
  getNextTutorial,
  getTutorialStats
};

