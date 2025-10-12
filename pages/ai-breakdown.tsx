import React from 'react'
import { AdvancedTaskBreakdown } from '@/utils/lazyComponents'

export default function AIBreakdownPage() {
  // Example task for demo
  const exampleTask = {
    id: 'demo-task',
    title: 'Launch New Product Feature',
    description: 'Design, develop, test, and deploy a new user dashboard with analytics',
    complexity: 'complex' as const,
    estimated_duration: 240
  }

  return (
    <AdvancedTaskBreakdown 
      task={exampleTask}
      onSubtasksGenerated={(subtasks) => {
        console.log('Generated subtasks:', subtasks)
        alert(`✅ ${subtasks.length} subtasks saved!`)
      }}
    />
  )
}

