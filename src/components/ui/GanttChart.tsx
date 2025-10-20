"use client";

import React from 'react';
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
