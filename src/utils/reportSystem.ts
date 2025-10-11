/**
 * Automated Report System
 * Features #30, #31, #32: Weekly Energy, Monthly Budget, Context Intelligence Reports
 */

export interface EnergyReport {
  period: 'week' | 'month'
  startDate: string
  endDate: string
  avgEnergy: number
  highEnergyDays: number
  lowEnergyDays: number
  mostProductiveDay: string
  leastProductiveDay: string
  energyTrend: 'improving' | 'stable' | 'declining'
  tasksCompleted: number
  emblemsEarned: number
  insights: string[]
  recommendations: string[]
}

export interface BudgetReport {
  period: 'month'
  startDate: string
  endDate: string
  totalBudget: number
  totalSpent: number
  remaining: number
  percentUsed: number
  avgDailySpending: number
  biggestCategory: { name: string; amount: number }
  savingsAchieved: number
  goalProgress: Array<{ name: string; progress: number }>
  insights: string[]
  recommendations: string[]
  comparisonToPrevious?: {
    spent: number
    change: number
    changePercent: number
  }
}

export interface ContextReport {
  period: 'week' | 'month'
  startDate: string
  endDate: string
  totalTasks: number
  onTimeTasks: number
  lateTasks: number
  onTimeRate: number
  avgCompletionTime: number // in hours
  peakProductivityHours: number[]
  contextSwitches: number
  focusScore: number // 0-100
  insights: string[]
  recommendations: string[]
}

/**
 * Generate Weekly Energy Report
 */
export function generateWeeklyEnergyReport(): EnergyReport {
  // Get last 7 days of data
  const endDate = new Date()
  const startDate = new Date(endDate)
  startDate.setDate(startDate.getDate() - 7)
  
  // Mock data - replace with actual data fetching
  const energyLevels = [3, 4, 5, 4, 3, 4, 5] // High = 5, Low = 1
  const tasksPerDay = [5, 7, 10, 8, 4, 6, 9]
  
  const avgEnergy = energyLevels.reduce((a, b) => a + b, 0) / energyLevels.length
  const highEnergyDays = energyLevels.filter(e => e >= 4).length
  const lowEnergyDays = energyLevels.filter(e => e <= 2).length
  
  const maxTasksIndex = tasksPerDay.indexOf(Math.max(...tasksPerDay))
  const minTasksIndex = tasksPerDay.indexOf(Math.min(...tasksPerDay))
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  
  const tasksCompleted = tasksPerDay.reduce((a, b) => a + b, 0)
  const emblemsEarned = tasksCompleted * 3 // Assuming 3 emblems per task average
  
  // Determine trend
  const firstHalf = energyLevels.slice(0, 3).reduce((a, b) => a + b, 0) / 3
  const secondHalf = energyLevels.slice(4).reduce((a, b) => a + b, 0) / 3
  let energyTrend: 'improving' | 'stable' | 'declining' = 'stable'
  if (secondHalf > firstHalf + 0.5) energyTrend = 'improving'
  else if (secondHalf < firstHalf - 0.5) energyTrend = 'declining'
  
  // Generate insights
  const insights: string[] = []
  const recommendations: string[] = []
  
  if (avgEnergy >= 4) {
    insights.push('🌟 Excellent energy levels this week! You\'re operating at peak capacity.')
  } else if (avgEnergy >= 3) {
    insights.push('💪 Good energy management this week with room for optimization.')
  } else {
    insights.push('⚠️ Energy levels were lower than optimal this week.')
  }
  
  if (energyTrend === 'improving') {
    insights.push('📈 Your energy is trending upward - great progress!')
  } else if (energyTrend === 'declining') {
    insights.push('📉 Energy trend is declining - consider more rest and recovery.')
  }
  
  insights.push(`🎯 You completed ${tasksCompleted} tasks and earned ${emblemsEarned} emblems this week.`)
  
  // Recommendations
  if (lowEnergyDays > 2) {
    recommendations.push('💤 Consider scheduling more recovery time and sleep optimization.')
  }
  
  if (highEnergyDays >= 5) {
    recommendations.push('🚀 Your high energy days are strong! Use them for challenging tasks.')
  }
  
  recommendations.push(`⭐ ${days[maxTasksIndex]} was your most productive day - schedule important tasks similarly.`)
  
  if (avgEnergy < 3.5) {
    recommendations.push('🧘 Try meditation, exercise, or nature walks to boost energy levels.')
  }
  
  return {
    period: 'week',
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    avgEnergy,
    highEnergyDays,
    lowEnergyDays,
    mostProductiveDay: days[maxTasksIndex],
    leastProductiveDay: days[minTasksIndex],
    energyTrend,
    tasksCompleted,
    emblemsEarned,
    insights,
    recommendations
  }
}

/**
 * Generate Monthly Budget Report
 */
export function generateMonthlyBudgetReport(): BudgetReport {
  const endDate = new Date()
  const startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1)
  
  // Mock data - replace with actual budget data
  const totalBudget = 3000
  const totalSpent = 2450
  const remaining = totalBudget - totalSpent
  const percentUsed = (totalSpent / totalBudget) * 100
  
  const daysInMonth = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0).getDate()
  const currentDay = endDate.getDate()
  const avgDailySpending = totalSpent / currentDay
  
  const categories = [
    { name: 'Food & Dining', amount: 850 },
    { name: 'Transportation', amount: 350 },
    { name: 'Entertainment', amount: 450 },
    { name: 'Shopping', amount: 600 },
    { name: 'Bills', amount: 200 }
  ]
  
  const biggestCategory = categories.reduce((max, cat) => 
    cat.amount > max.amount ? cat : max
  )
  
  const savingsAchieved = Math.max(0, remaining)
  
  const goalProgress = [
    { name: 'Emergency Fund', progress: 65 },
    { name: 'Vacation', progress: 42 }
  ]
  
  // Insights
  const insights: string[] = []
  const recommendations: string[] = []
  
  if (percentUsed <= 75) {
    insights.push('🎯 Excellent budget management! You\'re well within your limits.')
  } else if (percentUsed <= 90) {
    insights.push('⚠️ You\'re approaching your budget limit - watch spending closely.')
  } else if (percentUsed <= 100) {
    insights.push('🚨 Nearly at budget limit - reduce non-essential spending.')
  } else {
    insights.push('❌ Over budget this month - time to make adjustments.')
  }
  
  insights.push(`💰 Your biggest expense category was ${biggestCategory.name} at $${biggestCategory.amount}.`)
  insights.push(`📊 Average daily spending: $${avgDailySpending.toFixed(2)}`)
  
  // Recommendations
  if (percentUsed > 85) {
    recommendations.push('💡 Consider meal prepping to reduce food costs.')
    recommendations.push('🚗 Use public transportation or carpool to save on travel.')
  }
  
  if (savingsAchieved > 0) {
    recommendations.push(`✨ You saved $${savingsAchieved}! Consider allocating to your goals.`)
  }
  
  recommendations.push(`🎯 Focus on reducing ${biggestCategory.name} expenses for maximum impact.`)
  
  const projectedSpending = avgDailySpending * daysInMonth
  if (projectedSpending > totalBudget) {
    recommendations.push(`⚠️ At current rate, you'll spend $${projectedSpending.toFixed(0)} - adjust spending now!`)
  }
  
  return {
    period: 'month',
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    totalBudget,
    totalSpent,
    remaining,
    percentUsed,
    avgDailySpending,
    biggestCategory,
    savingsAchieved,
    goalProgress,
    insights,
    recommendations
  }
}

/**
 * Generate Context Intelligence Report
 */
export function generateContextReport(period: 'week' | 'month' = 'week'): ContextReport {
  const endDate = new Date()
  const startDate = new Date(endDate)
  if (period === 'week') {
    startDate.setDate(startDate.getDate() - 7)
  } else {
    startDate.setDate(startDate.getDate() - 30)
  }
  
  // Mock data - replace with actual task/context data
  const totalTasks = period === 'week' ? 49 : 187
  const onTimeTasks = period === 'week' ? 42 : 155
  const lateTasks = totalTasks - onTimeTasks
  const onTimeRate = (onTimeTasks / totalTasks) * 100
  
  const avgCompletionTime = 2.3 // hours from creation to completion
  const peakProductivityHours = [9, 10, 14, 15] // Hours of day (24h format)
  const contextSwitches = period === 'week' ? 34 : 142
  
  // Focus score: based on completion rate, on-time rate, and context switches
  const completionFactor = (onTimeTasks / totalTasks) * 40
  const consistencyFactor = (1 - (contextSwitches / totalTasks)) * 30
  const speedFactor = Math.max(0, 30 - (avgCompletionTime * 5))
  const focusScore = Math.min(100, completionFactor + consistencyFactor + speedFactor)
  
  // Insights
  const insights: string[] = []
  const recommendations: string[] = []
  
  if (onTimeRate >= 90) {
    insights.push('🎯 Outstanding! 90%+ on-time completion rate.')
  } else if (onTimeRate >= 75) {
    insights.push('💪 Good on-time rate with room for improvement.')
  } else {
    insights.push('⚠️ On-time completion needs attention - focus on scheduling.')
  }
  
  insights.push(`⚡ You completed ${totalTasks} tasks with ${onTimeTasks} on-time.`)
  insights.push(`🧠 Focus Score: ${focusScore.toFixed(0)}/100`)
  
  const peakHoursStr = peakProductivityHours
    .map(h => `${h}:00`)
    .join(', ')
  insights.push(`📊 Peak productivity hours: ${peakHoursStr}`)
  
  // Recommendations
  if (focusScore < 70) {
    recommendations.push('🎯 Reduce multitasking - focus on one task at a time.')
    recommendations.push('⏰ Use time-blocking to minimize context switches.')
  }
  
  if (contextSwitches / totalTasks > 0.8) {
    recommendations.push('🚨 High context switching detected - group similar tasks together.')
  }
  
  if (lateTasks > totalTasks * 0.25) {
    recommendations.push('📅 Add buffer time to task estimates to improve on-time rate.')
  }
  
  recommendations.push(`⭐ Schedule your most important work during ${peakHoursStr} for best results.`)
  
  if (avgCompletionTime > 3) {
    recommendations.push('⚡ Tasks taking longer than expected - break them into smaller pieces.')
  } else {
    recommendations.push('🚀 Great task completion speed! Keep the momentum going.')
  }
  
  return {
    period,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    totalTasks,
    onTimeTasks,
    lateTasks,
    onTimeRate,
    avgCompletionTime,
    peakProductivityHours,
    contextSwitches,
    focusScore,
    insights,
    recommendations
  }
}

/**
 * Save report to history
 */
export function saveReportToHistory(
  type: 'energy' | 'budget' | 'context',
  report: EnergyReport | BudgetReport | ContextReport
): void {
  if (typeof window === 'undefined') return
  
  try {
    const key = `${type}_report_history`
    const history = JSON.parse(localStorage.getItem(key) || '[]')
    
    history.unshift({
      ...report,
      generatedAt: new Date().toISOString()
    })
    
    // Keep last 12 reports
    const trimmed = history.slice(0, 12)
    localStorage.setItem(key, JSON.stringify(trimmed))
    
    console.log(`📊 ${type.charAt(0).toUpperCase() + type.slice(1)} report saved to history`)
  } catch (error) {
    console.error('Error saving report:', error)
  }
}

/**
 * Get report history
 */
export function getReportHistory(type: 'energy' | 'budget' | 'context'): Array<any> {
  if (typeof window === 'undefined') return []
  
  try {
    const key = `${type}_report_history`
    return JSON.parse(localStorage.getItem(key) || '[]')
  } catch (error) {
    console.error('Error loading report history:', error)
    return []
  }
}

/**
 * Format date range for display
 */
export function formatReportPeriod(startDate: string, endDate: string): string {
  const start = new Date(startDate)
  const end = new Date(endDate)
  
  const startStr = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  const endStr = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  
  return `${startStr} - ${endStr}`
}

/**
 * Generate all reports at once
 */
export function generateAllReports(): {
  energy: EnergyReport
  budget: BudgetReport
  context: ContextReport
} {
  const energy = generateWeeklyEnergyReport()
  const budget = generateMonthlyBudgetReport()
  const context = generateContextReport('week')
  
  // Save to history
  saveReportToHistory('energy', energy)
  saveReportToHistory('budget', budget)
  saveReportToHistory('context', context)
  
  return { energy, budget, context }
}

