import { useEffect } from 'react';

interface KeyboardShortcutHandlers {
  onNewTask?: () => void;
  onNewProject?: () => void;
  onFocusSearch?: () => void;
  onEscapePressed?: () => void;
  onQuickEnergy?: (level: 1 | 2 | 3 | 4 | 5) => void;
  onOpenAchievements?: () => void;
  onOpenAnalytics?: () => void;
  onOpenSuggestions?: () => void;
  onOpenTheme?: () => void;
}

/**
 * Custom hook for keyboard shortcuts
 * Provides power user functionality with minimal effort
 */
export const useKeyboardShortcuts = (handlers: KeyboardShortcutHandlers) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Ignore if user is typing in an input/textarea
      const target = event.target as HTMLElement;
      const isTyping = target.tagName === 'INPUT' || 
                       target.tagName === 'TEXTAREA' || 
                       target.isContentEditable;

      // ESC - Always works (close modals)
      if (event.key === 'Escape' && handlers.onEscapePressed) {
        handlers.onEscapePressed();
        return;
      }

      // Don't trigger shortcuts while typing
      if (isTyping) return;

      // Prevent default for our shortcuts
      const shouldPreventDefault = ['n', 'p', '/', '1', '2', '3', '4', '5', 'a', 's', 't'].includes(event.key.toLowerCase());
      if (shouldPreventDefault && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
      }

      switch (event.key.toLowerCase()) {
        case 'n':
          // N - New Task
          if (handlers.onNewTask) {
            handlers.onNewTask();
          }
          break;

        case 'p':
          // P - New Project
          if (handlers.onNewProject) {
            handlers.onNewProject();
          }
          break;

        case '/':
          // / - Focus Search
          if (handlers.onFocusSearch) {
            handlers.onFocusSearch();
          }
          break;

        case 'a':
          // A - Achievements
          if (handlers.onOpenAchievements) {
            handlers.onOpenAchievements();
          }
          break;

        case 's':
          // S - Smart Suggestions
          if (handlers.onOpenSuggestions) {
            handlers.onOpenSuggestions();
          }
          break;

        case 't':
          // T - Theme Settings
          if (handlers.onOpenTheme) {
            handlers.onOpenTheme();
          }
          break;

        case 'd':
          // D - Dashboard Analytics (with Shift)
          if (event.shiftKey && handlers.onOpenAnalytics) {
            handlers.onOpenAnalytics();
          }
          break;

        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
          // 1-5 - Quick Energy Selection
          if (handlers.onQuickEnergy) {
            const level = parseInt(event.key) as 1 | 2 | 3 | 4 | 5;
            handlers.onQuickEnergy(level);
          }
          break;

        case '?':
          // ? - Show shortcuts help (future feature)
          // Can be implemented later
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handlers]);
};

/**
 * Get list of available shortcuts for help display
 */
export const getShortcutsList = () => [
  { key: 'N', description: 'Create new task', category: 'Actions' },
  { key: 'P', description: 'Create new project', category: 'Actions' },
  { key: 'A', description: 'Open achievements', category: 'Navigation' },
  { key: 'S', description: 'Open smart suggestions', category: 'Navigation' },
  { key: 'T', description: 'Open theme settings', category: 'Navigation' },
  { key: 'Shift+D', description: 'Toggle analytics dashboard', category: 'Navigation' },
  { key: '/', description: 'Focus search bar', category: 'Navigation' },
  { key: 'ESC', description: 'Close modals/dialogs', category: 'Navigation' },
  { key: '1-5', description: 'Quick energy level selection', category: 'Energy' },
  { key: '?', description: 'Show keyboard shortcuts (coming soon)', category: 'Help' }
];

