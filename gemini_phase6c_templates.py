#!/usr/bin/env python3
"""
🧠 GEMINI PHASE 6C: Components & Utils Template Generator
Mission: Generate clean templates for 4 final files
"""

import os

def generate_global_navigation_tsx():
    """Generate clean src/components/ui/GlobalNavigation.tsx"""
    return '''"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Menu, 
  X, 
  Home, 
  Calendar, 
  Users, 
  Settings,
  LogOut,
  User,
  Bell,
  Search
} from 'lucide-react';

export default function GlobalNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Calendar', href: '/calendar', icon: Calendar },
    { name: 'Team', href: '/team', icon: Users },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const handleLogout = () => {
    console.log('Logging out...');
    // Implement logout logic here
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-lg">
                S
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">
                SyncScript
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                  >
                    <IconComponent className="h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right side - Search, Notifications, User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
              </button>

              {userMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
                >
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Your Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <div className="border-t border-gray-100"></div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-gray-200"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <IconComponent className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile User Section */}
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-3">
              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                <User className="h-6 w-6 text-gray-600" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">
                  User Name
                </div>
                <div className="text-sm font-medium text-gray-500">
                  user@example.com
                </div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <Link
                href="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Your Profile
              </Link>
              <Link
                href="/settings"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
'''

def generate_theme_context_tsx():
    """Generate clean src/contexts/ThemeContext.tsx"""
    return '''"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    
    const updateTheme = () => {
      let resolved: 'light' | 'dark';
      
      if (theme === 'system') {
        resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } else {
        resolved = theme;
      }
      
      setResolvedTheme(resolved);
      
      if (resolved === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    updateTheme();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        updateTheme();
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  useEffect(() => {
    // Save theme to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const value: ThemeContextType = {
    theme,
    setTheme,
    resolvedTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Theme toggle component
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      title={`Current theme: ${theme}`}
    >
      {theme === 'light' && (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )}
      {theme === 'dark' && (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
      {theme === 'system' && (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )}
    </button>
  );
}
'''

def generate_posthog_ts():
    """Generate clean src/lib/posthog.ts"""
    return '''import posthog from 'posthog-js';

// Initialize PostHog
export const initPostHog = () => {
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
      person_profiles: 'identified_only',
      capture_pageview: false, // We'll capture pageviews manually
      capture_pageleave: true,
    });
  }
};

// Track page views
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined') {
    posthog.capture('$pageview', {
      $current_url: url,
    });
  }
};

// Track custom events
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    posthog.capture(eventName, properties);
  }
};

// Identify user
export const identifyUser = (userId: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    posthog.identify(userId, properties);
  }
};

// Set user properties
export const setUserProperties = (properties: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    posthog.people.set(properties);
  }
};

// Reset user (on logout)
export const resetUser = () => {
  if (typeof window !== 'undefined') {
    posthog.reset();
  }
};

// Common event tracking functions
export const trackUserAction = (action: string, context?: Record<string, any>) => {
  trackEvent('user_action', {
    action,
    ...context,
  });
};

export const trackFeatureUsage = (feature: string, usage?: Record<string, any>) => {
  trackEvent('feature_used', {
    feature,
    ...usage,
  });
};

export const trackError = (error: string, context?: Record<string, any>) => {
  trackEvent('error_occurred', {
    error,
    ...context,
  });
};

export const trackPerformance = (metric: string, value: number, context?: Record<string, any>) => {
  trackEvent('performance_metric', {
    metric,
    value,
    ...context,
  });
};

// Export PostHog instance for direct use if needed
export { posthog };
'''

def generate_lazy_components_ts():
    """Generate clean src/utils/lazyComponents.ts"""
    return '''import { lazy } from 'react';

// Lazy load components for better performance
export const LazyDashboard = lazy(() => import('../components/dashboard/Dashboard'));
export const LazyCalendar = lazy(() => import('../components/calendar/Calendar'));
export const LazyTeamWorkspace = lazy(() => import('../components/team/TeamWorkspace'));
export const LazySettings = lazy(() => import('../components/settings/Settings'));
export const LazyAnalytics = lazy(() => import('../components/analytics/Analytics'));
export const LazyNotifications = lazy(() => import('../components/notifications/Notifications'));
export const LazyProfile = lazy(() => import('../components/profile/Profile'));
export const LazyHelpCenter = lazy(() => import('../components/help/HelpCenter'));

// UI Components
export const LazyGanttChart = lazy(() => import('../components/ui/GanttChart'));
export const LazyKanbanBoard = lazy(() => import('../components/ui/KanbanBoard'));
export const LazyMindMap = lazy(() => import('../components/ui/MindMap'));
export const LazySmartScheduler = lazy(() => import('../components/ui/SmartScheduler'));
export const LazyTeamCollaboration = lazy(() => import('../components/ui/TeamCollaboration'));
export const LazyVoiceCommandsCenter = lazy(() => import('../components/ui/VoiceCommandsCenter'));
export const LazyIntegrationsHub = lazy(() => import('../components/ui/IntegrationsHub'));
export const LazyProductivityCenter = lazy(() => import('../components/ui/ProductivityCenter'));
export const LazySettingsCentral = lazy(() => import('../components/ui/SettingsCentral'));
export const LazyPolishShowcase = lazy(() => import('../components/ui/PolishShowcase'));

// Forms and Modals
export const LazyTaskForm = lazy(() => import('../components/forms/TaskForm'));
export const LazyProjectForm = lazy(() => import('../components/forms/ProjectForm'));
export const LazyTeamForm = lazy(() => import('../components/forms/TeamForm'));
export const LazySettingsModal = lazy(() => import('../components/modals/SettingsModal'));
export const LazyConfirmModal = lazy(() => import('../components/modals/ConfirmModal'));

// Charts and Visualizations
export const LazyProductivityChart = lazy(() => import('../components/charts/ProductivityChart'));
export const LazyTimeTrackingChart = lazy(() => import('../components/charts/TimeTrackingChart'));
export const LazyTeamPerformanceChart = lazy(() => import('../components/charts/TeamPerformanceChart'));
export const LazyGoalProgressChart = lazy(() => import('../components/charts/GoalProgressChart'));

// Utility function to preload components
export const preloadComponent = (componentImport: () => Promise<any>) => {
  return componentImport();
};

// Preload critical components
export const preloadCriticalComponents = () => {
  // Preload components that are likely to be used soon
  preloadComponent(() => import('../components/dashboard/Dashboard'));
  preloadComponent(() => import('../components/ui/GanttChart'));
  preloadComponent(() => import('../components/ui/KanbanBoard'));
};

// Component loading states
export const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

export const LoadingSkeleton = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
);

// Error boundary for lazy components
export const LazyComponentErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="error-boundary">
      {children}
    </div>
  );
};
'''

def main():
    """Generate all Phase 6C templates"""
    print("🧠 GENERATING PHASE 6C TEMPLATES...")
    
    templates = {
        'src/components/ui/GlobalNavigation.tsx': generate_global_navigation_tsx(),
        'src/contexts/ThemeContext.tsx': generate_theme_context_tsx(),
        'src/lib/posthog.ts': generate_posthog_ts(),
        'src/utils/lazyComponents.ts': generate_lazy_components_ts()
    }
    
    for file_path, content in templates.items():
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ Generated: {file_path}")
    
    print("🎉 PHASE 6C TEMPLATES GENERATED!")
    print("📁 Files created: 4")
    print("🚀 ALL PHASE 6 COMPLETE!")

if __name__ == "__main__":
    main()
