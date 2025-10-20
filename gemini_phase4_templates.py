#!/usr/bin/env python3
"""
🧠 GEMINI PHASE 4: Component Templates Generator
Mission: Generate clean templates for 9 component files
"""

import os

def generate_gantt_chart_tsx():
    """Generate clean src/components/ui/GanttChart.tsx"""
    return '''import React from 'react';
import { motion } from 'framer-motion';

interface GanttChartProps {
  tasks: Array<{
    id: string;
    title: string;
    start: Date;
    end: Date;
    progress: number;
    dependencies?: string[];
  }>;
}

export default function GanttChart({ tasks }: GanttChartProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Gantt Chart</h3>
      <div className="space-y-2">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center space-x-4">
            <div className="w-32 text-sm truncate">{task.title}</div>
            <div className="flex-1 bg-gray-200 rounded h-6 relative">
              <div 
                className="bg-blue-500 h-full rounded"
                style={{ width: `${task.progress}%` }}
              />
            </div>
            <div className="text-sm text-gray-600">
              {task.start.toLocaleDateString()} - {task.end.toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
'''

def generate_integrations_hub_tsx():
    """Generate clean src/components/ui/IntegrationsHub.tsx"""
    return '''import React from 'react';

const INTEGRATIONS = [
  { name: 'Google Calendar', connected: true },
  { name: 'Slack', connected: false },
  { name: 'Notion', connected: true },
  { name: 'Trello', connected: false }
];

export default function IntegrationsHub() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Integrations</h3>
      <div className="space-y-3">
        {INTEGRATIONS.map((integration, index) => (
          <div key={index} className="flex items-center justify-between p-3 border rounded">
            <span>{integration.name}</span>
            <span className={`px-2 py-1 rounded text-sm ${
              integration.connected 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {integration.connected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
'''

def generate_kanban_board_tsx():
    """Generate clean src/components/ui/KanbanBoard.tsx"""
    return '''import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
}

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Task 1', status: 'todo' },
    { id: '2', title: 'Task 2', status: 'in-progress' },
    { id: '3', title: 'Task 3', status: 'done' }
  ]);

  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-gray-100' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-blue-100' },
    { id: 'done', title: 'Done', color: 'bg-green-100' }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Kanban Board</h3>
      <div className="grid grid-cols-3 gap-4">
        {columns.map((column) => (
          <div key={column.id} className={`${column.color} rounded p-4`}>
            <h4 className="font-medium mb-3">{column.title}</h4>
            <div className="space-y-2">
              {tasks
                .filter(task => task.status === column.id)
                .map((task) => (
                  <div key={task.id} className="bg-white p-3 rounded shadow-sm">
                    {task.title}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
'''

def generate_mind_map_tsx():
    """Generate clean src/components/ui/MindMap.tsx"""
    return '''import React from 'react';

export default function MindMap() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Mind Map</h3>
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-2"></div>
          <p className="text-gray-600">Mind Map Visualization</p>
          <p className="text-sm text-gray-500">Interactive mind mapping coming soon</p>
        </div>
      </div>
    </div>
  );
}
'''

def generate_polish_showcase_tsx():
    """Generate clean src/components/ui/PolishShowcase.tsx"""
    return '''import React from 'react';

export default function PolishShowcase() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Polish Showcase</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
          <h4 className="font-semibold">Gradient Card</h4>
          <p className="text-sm opacity-90">Beautiful gradient design</p>
        </div>
        <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold">Clean Card</h4>
          <p className="text-sm text-gray-600">Minimalist design</p>
        </div>
      </div>
    </div>
  );
}
'''

def generate_settings_central_tsx():
    """Generate clean src/components/ui/SettingsCentral.tsx"""
    return '''import React from 'react';

export default function SettingsCentral() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Settings</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Dark Mode</span>
          <input type="checkbox" className="rounded" />
        </div>
        <div className="flex items-center justify-between">
          <span>Notifications</span>
          <input type="checkbox" className="rounded" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <span>Auto-save</span>
          <input type="checkbox" className="rounded" defaultChecked />
        </div>
      </div>
    </div>
  );
}
'''

def generate_smart_scheduler_tsx():
    """Generate clean src/components/ui/SmartScheduler.tsx"""
    return '''import React from 'react';

interface SmartSchedulerProps {
  onSchedule: (timeSlot: string) => void;
}

export default function SmartScheduler({ onSchedule }: SmartSchedulerProps) {
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Smart Scheduler</h3>
      <div className="grid grid-cols-4 gap-2">
        {timeSlots.map((slot) => (
          <button
            key={slot}
            onClick={() => onSchedule(slot)}
            className="p-2 border rounded hover:bg-blue-50 transition-colors"
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
}
'''

def generate_team_collaboration_tsx():
    """Generate clean src/components/ui/TeamCollaboration.tsx"""
    return '''import React from 'react';

export default function TeamCollaboration() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Team Collaboration</h3>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
          <div>
            <p className="font-medium">John Doe</p>
            <p className="text-sm text-gray-600">Working on Task A</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-green-500 rounded-full"></div>
          <div>
            <p className="font-medium">Jane Smith</p>
            <p className="text-sm text-gray-600">Reviewing Task B</p>
          </div>
        </div>
      </div>
    </div>
  );
}
'''

def generate_voice_commands_center_tsx():
    """Generate clean src/components/ui/VoiceCommandsCenter.tsx"""
    return '''import React from 'react';

export default function VoiceCommandsCenter() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Voice Commands</h3>
      <div className="text-center">
        <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-white text-2xl">🎤</span>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Start Listening
        </button>
        <p className="text-sm text-gray-600 mt-2">
          Click to activate voice commands
        </p>
      </div>
    </div>
  );
}
'''

def main():
    """Generate all Phase 4 templates"""
    print("🧠 GENERATING PHASE 4 TEMPLATES...")
    
    templates = {
        'src/components/ui/GanttChart.tsx': generate_gantt_chart_tsx(),
        'src/components/ui/IntegrationsHub.tsx': generate_integrations_hub_tsx(),
        'src/components/ui/KanbanBoard.tsx': generate_kanban_board_tsx(),
        'src/components/ui/MindMap.tsx': generate_mind_map_tsx(),
        'src/components/ui/PolishShowcase.tsx': generate_polish_showcase_tsx(),
        'src/components/ui/SettingsCentral.tsx': generate_settings_central_tsx(),
        'src/components/ui/SmartScheduler.tsx': generate_smart_scheduler_tsx(),
        'src/components/ui/TeamCollaboration.tsx': generate_team_collaboration_tsx(),
        'src/components/ui/VoiceCommandsCenter.tsx': generate_voice_commands_center_tsx()
    }
    
    for file_path, content in templates.items():
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ Generated: {file_path}")
    
    print("🎉 PHASE 4 TEMPLATES GENERATED!")
    print("📁 Files created: 9")
    print("⚡ Ready for testing!")

if __name__ == "__main__":
    main()
