import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '../src/contexts/ThemeContext';
import Head from 'next/head';
import '../src/styles/globals.css';
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
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
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
            <Component {...pageProps} />
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
          />
          </div>
        </ThemeProvider>
      </QueryClientProvider>
    </UserProvider>
  );
}

export default MyApp;