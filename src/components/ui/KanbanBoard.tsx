"use client";

import React, { useState } from 'react';
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
