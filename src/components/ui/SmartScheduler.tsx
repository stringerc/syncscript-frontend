"use client";

import React from 'react';

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
