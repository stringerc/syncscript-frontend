/**
 * AI Scheduling Utilities
 * Smart time suggestions based on user patterns and preferences
 */

export interface EnergyPattern {
  hour: number
  energyLevel: number // 1-5
  productivity: number // 0-100
}

export function suggestOptimalTime(task: {
  estimated_duration: number
  priority: number
  energy_level?: number
  deadline?: string
}): Date {
  const now = new Date()
  const optimalHour = task.energy_level && task.energy_level >= 4 ? 9 : 14
  
  const suggestedTime = new Date(now)
  suggestedTime.setHours(optimalHour, 0, 0, 0)
  
  // If time has passed today, suggest tomorrow
  if (suggestedTime < now) {
    suggestedTime.setDate(suggestedTime.getDate() + 1)
  }
  
  return suggestedTime
}

export function analyzeEnergyPatterns(): EnergyPattern[] {
  const patterns: EnergyPattern[] = []
  
  // Generate mock energy patterns for demonstration
  for (let hour = 0; hour < 24; hour++) {
    let energyLevel = 3
    let productivity = 50
    
    // Morning peak (8-11)
    if (hour >= 8 && hour <= 11) {
      energyLevel = 5
      productivity = 90
    }
    // Afternoon dip (12-14)
    else if (hour >= 12 && hour <= 14) {
      energyLevel = 2
      productivity = 40
    }
    // Afternoon recovery (15-17)
    else if (hour >= 15 && hour <= 17) {
      energyLevel = 4
      productivity = 75
    }
    // Evening decline (18-22)
    else if (hour >= 18 && hour <= 22) {
      energyLevel = 3
      productivity = 60
    }
    // Night (23-7)
    else {
      energyLevel = 1
      productivity = 20
    }
    
    patterns.push({ hour, energyLevel, productivity })
  }
  
  return patterns
}

export function findBestTimeSlots(
  task: {
    estimated_duration: number
    priority: number
    energy_level?: number
  },
  availableDays: number = 7
): Array<{ start: Date; end: Date; score: number }> {
  const slots: Array<{ start: Date; end: Date; score: number }> = []
  const now = new Date()
  const energyPatterns = analyzeEnergyPatterns()
  
  for (let day = 0; day < availableDays; day++) {
    for (const pattern of energyPatterns) {
      if (pattern.energyLevel >= 3) {
        const slotStart = new Date(now)
        slotStart.setDate(slotStart.getDate() + day)
        slotStart.setHours(pattern.hour, 0, 0, 0)
        
        if (slotStart > now) {
          const slotEnd = new Date(slotStart)
          slotEnd.setMinutes(slotEnd.getMinutes() + task.estimated_duration)
          
          const score = calculateSlotScore(pattern, task)
          
          slots.push({ start: slotStart, end: slotEnd, score })
        }
      }
    }
  }
  
  return slots.sort((a, b) => b.score - a.score).slice(0, 10)
}

function calculateSlotScore(
  pattern: EnergyPattern,
  task: { estimated_duration: number; priority: number; energy_level?: number }
): number {
  let score = pattern.productivity
  
  // Boost for matching energy levels
  if (task.energy_level && Math.abs(pattern.energyLevel - task.energy_level) <= 1) {
    score += 20
  }
  
  // Priority boost
  score += (6 - task.priority) * 5
  
  return Math.min(100, score)
}

