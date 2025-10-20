#!/usr/bin/env python3
"""
🚀 GEMINI CLEAN CODE GENERATOR
Mission: Generate clean, production-ready code templates for file recreation
"""

import os

def generate_clean_app_tsx():
    """Generate clean pages/_app.tsx"""
    return '''import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '../src/contexts/ThemeContext';
import GlobalNavigation from '../src/components/ui/GlobalNavigation';
import Head from 'next/head';
import { initPostHog } from '../src/lib/posthog';
import { useEffect } from 'react';

// Import all CSS files
import '../src/design-system/variables.css';
import '../src/styles/z-index-system.css';
import '../src/styles/focus-system.css';
import '../src/styles/typography-system.css';
import '../src/styles/contrast-system.css';
import '../src/styles/performance-animations.css';
import '../src/styles/animation-curves.css';
import '../src/styles/microinteractions.css';
import '../src/styles/illustration-system.css';
import '../src/styles/rtl-support.css';
import '../src/styles/responsive-audit-fixes.css';
import '../src/styles/accessibility.css';
import '../src/styles/mobile-responsive.css';
import '../src/styles/motion-system.css';
import '../src/styles/button-polish.css';
import '../src/styles/tokens.css';
import '../src/styles/globals.css';
import '../src/styles/visual-fixes.css';
import '../src/styles/SmartSuggestions.css';
import '../src/styles/AdvancedAnalytics.css';
import '../src/styles/EnergyInsights.css';
import '../src/styles/TeamCollaboration.css';
import '../src/styles/Automation.css';
import '../src/styles/CalendarIntegration.css';
import '../src/styles/VoiceCommands.css';
import '../src/styles/AdvancedSearch.css';
import '../src/styles/TimeBlocking.css';
import '../src/styles/FocusMode.css';
import '../src/styles/PomodoroPlus.css';
import '../src/styles/HabitTracker.css';
import '../src/styles/GoalTracker.css';
import '../src/styles/StreakSystem.css';
import '../src/styles/AchievementSystem.css';
import '../src/styles/Gamification.css';
import '../src/styles/TeamDashboard.css';
import '../src/styles/ProjectManagement.css';
import '../src/styles/Analytics.css';
import '../src/styles/Reporting.css';
import '../src/styles/Integrations.css';
import '../src/styles/WhiteLabel.css';
import '../src/styles/Enterprise.css';
import '../src/styles/Security.css';
import '../src/styles/Compliance.css';
import '../src/styles/Performance.css';
import '../src/styles/Mobile.css';
import '../src/styles/PWA.css';
import '../src/styles/Desktop.css';
import '../src/styles/API.css';
import '../src/styles/Marketplace.css';
import '../src/styles/Community.css';
import '../src/styles/Documentation.css';
import '../src/styles/Testing.css';
import '../src/styles/Deployment.css';
import '../src/styles/Optimization.css';
import '../src/styles/AI.css';
import '../src/styles/MachineLearning.css';
import '../src/styles/Blockchain.css';
import '../src/styles/IoT.css';
import '../src/styles/ARVR.css';
import '../src/styles/Quantum.css';
import '../src/styles/AdvancedFeatures.css';
import '../src/styles/FutureFeatures.css';
import '../src/styles/Polish.css';
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
      }
    }
  }
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
            <title>SyncScript - Ultimate Productivity Platform</title>
            <meta name="description" content="Transform your productivity with SyncScript's AI-powered task management, team collaboration, and advanced analytics." />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
            <link rel="manifest" href="/manifest.json" />
            <meta name="theme-color" content="#ffffff" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="apple-mobile-web-app-title" content="SyncScript" />
          </Head>
          <div
            id="aria-live-region"
            aria-live="polite"
            aria-atomic="true"
            className="sr-only"
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
                fontWeight: '500'
              },
              success: {
                iconTheme: {
                  primary: 'var(--syncscript-green-500)',
                  secondary: 'white'
                }
              },
              error: {
                iconTheme: {
                  primary: 'var(--syncscript-error)',
                  secondary: 'white'
                }
              }
            }}
            closeButton={true}
          />
        </ThemeProvider>
      </QueryClientProvider>
    </UserProvider>
  );
}

export default MyApp;
'''

def generate_clean_ai_breakdown_tsx():
    """Generate clean pages/ai-breakdown.tsx"""
    return '''import React from 'react';
import { AdvancedTaskBreakdown } from '@/utils/lazyComponents';

export default function AIBreakdownPage() {
  // Example task for demo
  const exampleTask = {
    id: 'demo-task',
    title: 'Launch New Product Feature',
    description: 'Design, develop, test, and deploy a new user dashboard with analytics',
    complexity: 'complex' as const,
    estimated_duration: 240
  };
  
  return (
    <AdvancedTaskBreakdown 
      task={exampleTask}
      onSubtasksGenerated={(subtasks) => {
        console.log('Generated subtasks:', subtasks);
        alert(`✅ ${subtasks.length} subtasks saved!`);
      }}
    />
  );
}
'''

def generate_clean_api_route(template_name, description, system_prompt, user_prompt_template):
    """Generate clean API route template"""
    return f'''import {{ NextApiRequest, NextApiResponse }} from 'next';
import {{ getSession }} from '@auth0/nextjs-auth0';

export default async function {template_name}(req: NextApiRequest, res: NextApiResponse) {{
  if (req.method !== 'POST') {{
    return res.status(405).json({{ error: 'Method not allowed' }});
  }}
  
  try {{
    const session = await getSession(req, res);
    if (!session || !session.user) {{
      return res.status(401).json({{ error: 'Not authenticated' }});
    }}
    
    const {{ title, description }} = req.body;
    if (!title) {{
      return res.status(400).json({{ error: 'Task title required' }});
    }}
    
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {{
      method: 'POST',
      headers: {{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${{process.env.OPENAI_API_KEY}}`
      }},
      body: JSON.stringify({{
        model: 'gpt-4',
        messages: [
          {{
            role: 'system',
            content: '{system_prompt}'
          }},
          {{
            role: 'user',
            content: `{user_prompt_template}`
          }}
        ],
        max_tokens: 1000,
        temperature: 0.7
      }})
    }});

    if (!openaiResponse.ok) {{
      throw new Error('OpenAI API request failed');
    }}

    const data = await openaiResponse.json();
    const result = data.choices[0]?.message?.content || 'No response generated';

    res.status(200).json({{ result }});
  }} catch (error) {{
    console.error('Error in {template_name}:', error);
    res.status(500).json({{ error: 'Internal server error' }});
  }}
}}
'''

def main():
    """Generate all clean code templates"""
    print("🚀 GENERATING CLEAN CODE TEMPLATES...")
    
    # Generate templates
    app_tsx = generate_clean_app_tsx()
    ai_breakdown_tsx = generate_clean_ai_breakdown_tsx()
    
    # API route templates
    breakdown_task = generate_clean_api_route(
        'breakdownTask',
        'Task breakdown expert',
        'You are a task breakdown expert. Break down complex tasks into smaller, actionable subtasks.',
        'Break down this task into subtasks: Title: ${title}, Description: ${description || "No description provided"}'
    )
    
    coach = generate_clean_api_route(
        'coach',
        'AI productivity coach',
        'You are an AI productivity coach. Provide personalized advice based on user data and goals.',
        'User Stats: ${JSON.stringify(userStats)}, Recent Activity: ${JSON.stringify(recentActivity)}, Goals: ${JSON.stringify(goals)}'
    )
    
    daily_plan = generate_clean_api_route(
        'dailyPlan',
        'AI productivity planner',
        'You are an AI productivity planner. Create optimized daily plans based on user preferences and goals.',
        'Create a daily plan based on: Preferences: ${JSON.stringify(preferences)}, Goals: ${JSON.stringify(goals)}, Schedule: ${JSON.stringify(schedule)}'
    )
    
    energy_insights = generate_clean_api_route(
        'energyInsights',
        'AI energy analyst',
        'You are an AI energy analyst. Provide insights on energy patterns and optimization recommendations.',
        'Analyze energy data: ${JSON.stringify(energyData)}, Patterns: ${JSON.stringify(patterns)}'
    )
    
    meeting_notes = generate_clean_api_route(
        'meetingNotes',
        'AI meeting assistant',
        'You are an AI meeting assistant. Generate structured meeting notes from audio transcripts.',
        'Generate meeting notes from: Transcript: ${audioTranscript}, Context: ${context}'
    )
    
    parse_task = generate_clean_api_route(
        'parseTask',
        'AI task parser',
        'You are an AI task parser. Extract structured task information from natural language text.',
        'Parse this task: ${taskText}'
    )
    
    # Save templates to files
    templates = {
        'pages/_app.tsx': app_tsx,
        'pages/ai-breakdown.tsx': ai_breakdown_tsx,
        'pages/api/ai/breakdown-task.ts': breakdown_task,
        'pages/api/ai/coach.ts': coach,
        'pages/api/ai/daily-plan.ts': daily_plan,
        'pages/api/ai/energy-insights.ts': energy_insights,
        'pages/api/ai/meeting-notes.ts': meeting_notes,
        'pages/api/ai/parse-task.ts': parse_task
    }
    
    for file_path, content in templates.items():
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ Generated: {file_path}")
    
    print("🎉 ALL CLEAN CODE TEMPLATES GENERATED!")
    print("📁 Files created: 8")
    print("⚡ Ready for Aider to use!")

if __name__ == "__main__":
    main()
