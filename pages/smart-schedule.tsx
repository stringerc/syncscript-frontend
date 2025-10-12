import React from 'react'
import SmartScheduler from '@/components/ui/SmartScheduler'

export default function SmartSchedulePage() {
  // Example task for demo
  const exampleTask = {
    id: 'demo-task',
    title: 'Complete quarterly report',
    estimated_duration: 90,
    priority: 2 as const,
    energy_level: 4,
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
  }

  return (
    <SmartScheduler 
      task={exampleTask}
      onSchedule={(timeSlot) => {
        console.log('Scheduled for:', timeSlot)
        alert(`✅ Task scheduled for ${timeSlot.start.toLocaleString()}`)
      }}
    />
  )
}

