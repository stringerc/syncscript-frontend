import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '../src/contexts/ThemeContext';
import GlobalNavigation from '../src/components/ui/GlobalNavigation';
import Head from 'next/head';
import { initPostHog } from '../src/lib/posthog';
import { useEffect } from 'react';
import '../src/design-system/variables.css'; // Design token system
import '../src/styles/z-index-system.css'; // Centralized z-index layers
import '../src/styles/focus-system.css'; // Accessible focus indicators
import '../src/styles/typography-system.css'; // Typography scale (WCAG AA)
import '../src/styles/contrast-system.css'; // Color contrast (WCAG AA)
import '../src/styles/performance-animations.css'; // GPU-accelerated animations
import '../src/styles/animation-curves.css'; // Perfect timing curves (L4)
import '../src/styles/microinteractions.css'; // Delightful microinteractions (L1)
import '../src/styles/illustration-system.css'; // Illustration style guide (L3)
import '../src/styles/rtl-support.css'; // RTL language support (M3)
// Dark mode handled by Tailwind's built-in dark: prefix (darkMode: 'class')
import '../src/styles/responsive-audit-fixes.css'; // Responsive & touch target fixes
import '../src/styles/accessibility.css'; // WCAG 2.1 AA compliance
import '../src/styles/mobile-responsive.css'; // Mobile optimizations
import '../src/styles/motion-system.css'; // Standardized animations
import '../src/styles/button-polish.css'; // Button visibility & spacing fixes
import '../src/styles/tokens.css';
import '../src/styles/globals.css'
import '../src/styles/visual-fixes.css';
import '../src/styles/SmartSuggestions.css';
import '../src/styles/AdvancedAnalytics.css';
import '../src/styles/AchievementGallery.css';
import '../src/styles/AchievementUnlock.css';
import '../src/styles/DailyChallenges.css';
import '../src/styles/CalendarIntegration.css';
import '../src/styles/TaskDependencies.css';
import '../src/styles/TeamDashboard.css';
import '../src/styles/TeamInvitation.css';
import '../src/styles/APIDocs.css';
import '../src/styles/WebhooksManager.css';
import '../src/styles/LearningCenter.css';
import '../src/styles/WhiteLabelSettings.css';
import '../src/styles/MobileAppPromo.css';
import '../src/styles/DesktopAppPromo.css';
import '../src/styles/UnifiedCommandCenter.css';
import '../src/styles/FloatingActionButton.css';
import '../src/styles/GlobalNavigation.css';
import '../src/styles/awe-inspiring-ui.css';
import '../src/styles/stunning-feature-menu.css';
import '../src/styles/QuickSwitcher.css';
import '../src/styles/CompactHeader.css';
import '../src/styles/ViewSwitcher.css';
import '../src/styles/EnhancedWelcomeTour.css';
import '../src/styles/FeatureUsageAnalytics.css';
import '../src/styles/AICoach.css';
import '../src/styles/AdvancedSearch.css';
import '../src/styles/Automations.css';
import '../src/styles/BudgetTracker.css';
import '../src/styles/ClientPortal.css';
import '../src/styles/DailyPlanning.css';
import '../src/styles/DocumentScanner.css';
import '../src/styles/EisenhowerMatrix.css';
import '../src/styles/EmailSettings.css';
import '../src/styles/FocusRooms.css';
import '../src/styles/GanttChart.css';
import '../src/styles/GoalTracker.css';
import '../src/styles/HabitTracker.css';
import '../src/styles/IntegrationHub.css';
import '../src/styles/KanbanBoard.css';
import '../src/styles/MeetingNotes.css';
import '../src/styles/MindMap.css';
import '../src/styles/Onboarding.css';
import '../src/styles/PomodoroPlus.css';
import '../src/styles/QuickCapture.css';
import '../src/styles/ReportingDashboard.css';
import '../src/styles/ShortcutsPanel.css';
import '../src/styles/TaskComments.css';
import '../src/styles/TaskSharing.css';
import '../src/styles/TeamChat.css';
import '../src/styles/TemplatesGallery.css';
import '../src/styles/TimeBlocking.css';
import '../src/styles/TimeTracker.css';
import '../src/styles/VoiceCommands.css';
import '../src/styles/VoiceToTask.css';
import '../src/styles/WeeklyReview.css';
import '../src/styles/WorkloadBalancer.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (renamed from cacheTime)
      retry: (failureCount, error: unknown) => {
        if ((error as { status?: number })?.status === 401) return false;
        return failureCount < 3;
      },
    },
  },
});

interface AppProps {
  Component: React.ComponentType<Record<string, unknown>>;
  pageProps: Record<string, unknown>;
}

function MyApp({ Component, pageProps }: AppProps) {
  // Keyboard navigation detection for accessibility
  React.useEffect(() => {
    const handleKeyDown = () => {
      document.body.classList.add('using-keyboard');
      document.body.classList.remove('using-mouse');
    };
    
    const handleMouseDown = () => {
      document.body.classList.add('using-mouse');
      document.body.classList.remove('using-keyboard');
    };
    
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  // Register service worker for PWA
  React.useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('[PWA] Service Worker registered:', registration);
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('[PWA] New version available! Reload to update.');
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error('[PWA] Service Worker registration failed:', error);
        });
    }
  }, []);

  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover" />
            <meta name="theme-color" content="#4A90E2" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="apple-mobile-web-app-title" content="SyncScript" />
            <meta name="mobile-web-app-capable" content="yes" />
            <link rel="manifest" href="/manifest.json" />
            <link rel="icon" href="/favicon.svg" />
            <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
          </Head>
          <div className="min-h-screen bg-syncscript-cream-50">
            {/* ARIA live region for screen reader announcements */}
            <div
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className="sr-only"
              id="aria-live-region"
            />
            <Component {...pageProps} />
            <GlobalNavigation />
            <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--syncscript-cream-50)',
                color: 'var(--syncscript-charcoal-800)',
                border: '1px solid var(--syncscript-charcoal-100)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                fontSize: '14px',
                fontWeight: '500',
              },
              success: {
                iconTheme: {
                  primary: 'var(--syncscript-green-500)',
                  secondary: 'white',
                },
              },
              error: {
                iconTheme: {
                  primary: 'var(--syncscript-error)',
                  secondary: 'white',
                },
              },
            }}
            // Enable dismiss button for all toasts
            closeButton={true}
          />
          </div>
        </ThemeProvider>
      </QueryClientProvider>
    </UserProvider>
  );
}

export default MyApp;