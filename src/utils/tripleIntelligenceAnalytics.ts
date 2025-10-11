/**
 * Triple Intelligence™ Analytics
 * Phase 2: Advanced Analytics for Energy, Budget, Context
 * 
 * Comprehensive analytics for all 3 pillars + overall productivity
 */

export interface EnergyMetrics {
  averageEnergy: number;
  energyMatchRate: number; // % of tasks completed at matched energy
  peakEnergyHours: Array<{ hour: number; avgEnergy: number }>;
  lowEnergyHours: Array<{ hour: number; avgEnergy: number }>;
  energyTrend: 'improving' | 'declining' | 'stable';
  perfectMatchCount: number;
  mismatchCount: number;
}

export interface BudgetMetrics {
  totalSpending: number;
  underBudgetRate: number; // % of expenses within budget
  averageSavings: number; // Per month
  topSpendingCategories: Array<{ category: string; amount: number; percentage: number }>;
  savingsGoalProgress: number; // % towards all goals
  monthlyTrend: 'improving' | 'declining' | 'stable';
}

export interface ContextMetrics {
  onTimeArrivalRate: number; // %
  weatherAdherenceRate: number; // % of times acted on weather warnings
  trafficSavingsMinutes: number; // Total minutes saved by leave-by feature
  cancelledDueToWeather: number;
  averageLeaveByAccuracy: number; // % accuracy of leave-by predictions
}

export interface ProductivityMetrics {
  tasksCompleted: number;
  completionRate: number; // %
  averageTaskDuration: number; // minutes
  streakDays: number;
  emblemLevel: number;
  totalEmblems: number;
  weekOverWeekGrowth: number; // % change
}

export interface TripleIntelligenceReport {
  period: 'day' | 'week' | 'month';
  startDate: Date;
  endDate: Date;
  energy: EnergyMetrics;
  budget: BudgetMetrics;
  context: ContextMetrics;
  productivity: ProductivityMetrics;
  overallScore: number; // 0-100, composite score
  insights: string[];
  recommendations: string[];
}

/**
 * Generate comprehensive Triple Intelligence™ report
 */
export function generateTripleIntelligenceReport(
  period: 'day' | 'week' | 'month' = 'week'
): TripleIntelligenceReport {
  const now = new Date();
  const startDate = getPeriodStart(now, period);
  
  // Mock data - in production, fetch from backend
  const energy: EnergyMetrics = {
    averageEnergy: 3.8,
    energyMatchRate: 87, // Close to 90% target!
    peakEnergyHours: [
      { hour: 9, avgEnergy: 4.5 },
      { hour: 10, avgEnergy: 4.3 },
      { hour: 14, avgEnergy: 4.1 }
    ],
    lowEnergyHours: [
      { hour: 13, avgEnergy: 2.8 },
      { hour: 16, avgEnergy: 3.1 }
    ],
    energyTrend: 'improving',
    perfectMatchCount: 24,
    mismatchCount: 4
  };
  
  const budget: BudgetMetrics = {
    totalSpending: 540,
    underBudgetRate: 78, // Close to 80% target!
    averageSavings: 180,
    topSpendingCategories: [
      { category: 'Dining', amount: 240, percentage: 44 },
      { category: 'Entertainment', amount: 180, percentage: 33 },
      { category: 'Shopping', amount: 120, percentage: 22 }
    ],
    savingsGoalProgress: 35,
    monthlyTrend: 'improving'
  };
  
  const context: ContextMetrics = {
    onTimeArrivalRate: 82, // Close to 85% target!
    weatherAdherenceRate: 90,
    trafficSavingsMinutes: 420, // 7 hours saved!
    cancelledDueToWeather: 2,
    averageLeaveByAccuracy: 88
  };
  
  const productivity: ProductivityMetrics = {
    tasksCompleted: 47,
    completionRate: 76,
    averageTaskDuration: 32,
    streakDays: 12,
    emblemLevel: 5,
    totalEmblems: 2450,
    weekOverWeekGrowth: 12
  };
  
  // Calculate overall score
  const overallScore = calculateOverallScore(energy, budget, context, productivity);
  
  // Generate insights
  const insights = generateInsights(energy, budget, context, productivity);
  
  // Generate recommendations
  const recommendations = generateRecommendations(energy, budget, context, productivity);
  
  return {
    period,
    startDate,
    endDate: now,
    energy,
    budget,
    context,
    productivity,
    overallScore,
    insights,
    recommendations
  };
}

/**
 * Get period start date
 */
function getPeriodStart(now: Date, period: 'day' | 'week' | 'month'): Date {
  const start = new Date(now);
  
  if (period === 'day') {
    start.setHours(0, 0, 0, 0);
  } else if (period === 'week') {
    const day = start.getDay();
    start.setDate(start.getDate() - day);
    start.setHours(0, 0, 0, 0);
  } else if (period === 'month') {
    start.setDate(1);
    start.setHours(0, 0, 0, 0);
  }
  
  return start;
}

/**
 * Calculate overall Triple Intelligence™ score
 */
function calculateOverallScore(
  energy: EnergyMetrics,
  budget: BudgetMetrics,
  context: ContextMetrics,
  productivity: ProductivityMetrics
): number {
  // Weighted average of key metrics
  const energyScore = energy.energyMatchRate;
  const budgetScore = budget.underBudgetRate;
  const contextScore = context.onTimeArrivalRate;
  const productivityScore = productivity.completionRate;
  
  // Equal weighting for all 4 metrics
  const overall = (energyScore + budgetScore + contextScore + productivityScore) / 4;
  
  return Math.round(overall);
}

/**
 * Generate insights from data
 */
function generateInsights(
  energy: EnergyMetrics,
  budget: BudgetMetrics,
  context: ContextMetrics,
  productivity: ProductivityMetrics
): string[] {
  const insights: string[] = [];
  
  // Energy insights
  if (energy.energyMatchRate >= 85) {
    insights.push(`🎯 Excellent! ${energy.energyMatchRate}% of tasks matched your energy (target: 90%)`);
  }
  if (energy.perfectMatchCount > 20) {
    insights.push(`💎 ${energy.perfectMatchCount} perfect energy matches this period!`);
  }
  
  // Budget insights
  if (budget.underBudgetRate >= 75) {
    insights.push(`💰 Great budget discipline! ${budget.underBudgetRate}% under budget (target: 80%)`);
  }
  if (budget.averageSavings > 150) {
    insights.push(`📈 You're saving $${budget.averageSavings}/month - on track for $${budget.averageSavings * 12}/year!`);
  }
  
  // Context insights
  if (context.onTimeArrivalRate >= 80) {
    insights.push(`⏰ ${context.onTimeArrivalRate}% on-time arrival rate - almost at target (85%)!`);
  }
  if (context.trafficSavingsMinutes > 300) {
    insights.push(`🚗 You saved ${Math.round(context.trafficSavingsMinutes / 60)} hours this period with leave-by chips!`);
  }
  
  // Productivity insights
  if (productivity.weekOverWeekGrowth > 10) {
    insights.push(`📊 ${productivity.weekOverWeekGrowth}% productivity increase week-over-week!`);
  }
  if (productivity.streakDays >= 7) {
    insights.push(`🔥 ${productivity.streakDays}-day streak! You're on fire!`);
  }
  
  return insights;
}

/**
 * Generate recommendations
 */
function generateRecommendations(
  energy: EnergyMetrics,
  budget: BudgetMetrics,
  context: ContextMetrics,
  productivity: ProductivityMetrics
): string[] {
  const recommendations: string[] = [];
  
  // Energy recommendations
  if (energy.energyMatchRate < 85) {
    recommendations.push('⚡ Try to match more tasks to your energy level - currently at ' + energy.energyMatchRate + '%');
  }
  if (energy.lowEnergyHours.length > 0) {
    const worstHour = energy.lowEnergyHours[0];
    recommendations.push(`💤 Your energy dips around ${worstHour.hour}:00 - schedule low-energy tasks then`);
  }
  
  // Budget recommendations
  if (budget.underBudgetRate < 80) {
    recommendations.push(`💰 ${100 - budget.underBudgetRate}% of expenses over budget - review comfort bands`);
  }
  if (budget.topSpendingCategories[0].percentage > 50) {
    recommendations.push(`🍽️ ${budget.topSpendingCategories[0].category} is ${budget.topSpendingCategories[0].percentage}% of spending - consider setting tighter limits`);
  }
  
  // Context recommendations
  if (context.onTimeArrivalRate < 85) {
    recommendations.push(`⏰ ${100 - context.onTimeArrivalRate}% late arrivals - try leaving 5 min earlier than suggested`);
  }
  if (context.cancelledDueToWeather > 2) {
    recommendations.push('🌤️ Check weather badges before scheduling outdoor events');
  }
  
  return recommendations;
}

/**
 * Export analytics data (for reports)
 */
export function exportAnalyticsData(report: TripleIntelligenceReport): string {
  return JSON.stringify(report, null, 2);
}

// Export for testing
export const __test__ = {
  calculateOverallScore,
  generateInsights,
  generateRecommendations
};

