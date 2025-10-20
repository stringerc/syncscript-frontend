'use client';

import React, { useState } from 'react';
import { Sidebar, DashboardHeader } from './figma-dashboard';
import { AIFocusSection, TodaySection, ResourceHubSection } from './figma-sections';
import { AIInsightsSection } from './figma-insights';

export default function FigmaDashboard() {
  const [isAIInsightsOpen, setIsAIInsightsOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#141619] overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <DashboardHeader 
          isAIInsightsOpen={isAIInsightsOpen}
          onToggleAIInsights={() => setIsAIInsightsOpen(!isAIInsightsOpen)}
        />

        {/* Dashboard Content */}
        <main className={`flex-1 overflow-hidden p-6 transition-all duration-300 ${
          isAIInsightsOpen ? 'mr-80' : 'mr-0'
        }`}>
          <div className="flex gap-6 max-w-[1600px] mx-auto h-full">
            {/* Left Column - AI & FOCUS */}
            <div className="flex-1 h-full overflow-y-auto hide-scrollbar">
              <AIFocusSection />
            </div>

            {/* Middle Column - TODAY'S ORCHESTRATION */}
            <div className="flex-1 h-full overflow-y-auto hide-scrollbar">
              <TodaySection />
            </div>

            {/* Right Column - RESOURCE HUB */}
            <div className="flex-1 h-full overflow-y-auto hide-scrollbar">
              <ResourceHubSection />
            </div>
          </div>
        </main>

        {/* AI Insights Sidebar */}
        <div className={`fixed top-16 right-0 h-[calc(100vh-4rem)] w-80 bg-[#1e2128] border-l border-gray-800 transition-transform duration-300 transform ${
          isAIInsightsOpen ? 'translate-x-0' : 'translate-x-full'
        } overflow-y-auto hide-scrollbar`}>
          <AIInsightsSection />
        </div>
      </div>
    </div>
  );
}

