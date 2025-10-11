/**
 * Budget Fit Scoring System
 * WP-FIN-02: Integrates budget awareness into recommendations
 * 
 * Shows users budget fit BEFORE they commit to activities
 * Goal: Under-budget rate 52% → 80% (+28pp)
 */

import { 
  ComfortBand, 
  calculateBudgetFit, 
  getComfortBand, 
  getStarDisplay,
  BUDGET_CATEGORIES 
} from './budgetComfortBands';

export interface BudgetFitResult {
  score: number; // 0-5 stars
  rating: 'poor' | 'ok' | 'good' | 'great' | 'perfect';
  message: string;
  stars: string; // Display string: "⭐⭐⭐⭐⭐"
  color: string; // CSS color for badge
  icon: string; // Emoji icon
  categoryId: string;
  categoryName: string;
  withinBudget: boolean;
}

export interface BudgetAwareRecommendation {
  id: string;
  title: string;
  description: string;
  estimatedCost?: number;
  categoryId?: string;
  budgetFit?: BudgetFitResult;
  showBudgetWarning?: boolean;
}

/**
 * Calculate budget fit for a recommendation with estimated cost
 */
export function calculateRecommendationBudgetFit(
  estimatedCost: number,
  categoryId: string
): BudgetFitResult {
  const band = getComfortBand(categoryId);
  const fit = calculateBudgetFit(estimatedCost, band);
  const category = BUDGET_CATEGORIES.find(c => c.id === categoryId);
  
  const color = getColorForRating(fit.rating);
  const icon = getIconForRating(fit.rating);
  const withinBudget = estimatedCost <= band.max;
  
  return {
    score: fit.score,
    rating: fit.rating,
    message: fit.message,
    stars: getStarDisplay(fit.score),
    color,
    icon,
    categoryId,
    categoryName: category?.name || 'General',
    withinBudget
  };
}

/**
 * Get color for budget fit rating
 */
function getColorForRating(rating: 'poor' | 'ok' | 'good' | 'great' | 'perfect'): string {
  switch (rating) {
    case 'perfect': return '#10B981'; // Green
    case 'great': return '#34D399'; // Light green
    case 'good': return '#FBBF24'; // Yellow
    case 'ok': return '#F59E0B'; // Orange
    case 'poor': return '#EF4444'; // Red
    default: return '#6B7280'; // Gray
  }
}

/**
 * Get icon for budget fit rating
 */
function getIconForRating(rating: 'poor' | 'ok' | 'good' | 'great' | 'perfect'): string {
  switch (rating) {
    case 'perfect': return '💎';
    case 'great': return '✨';
    case 'good': return '👍';
    case 'ok': return '⚠️';
    case 'poor': return '🚫';
    default: return '💰';
  }
}

/**
 * Filter recommendations by budget constraints
 */
export function filterByBudget(
  recommendations: BudgetAwareRecommendation[],
  maxBudget?: number,
  excludeOverBudget: boolean = false
): BudgetAwareRecommendation[] {
  return recommendations.filter(rec => {
    if (!rec.estimatedCost || !rec.budgetFit) return true;
    
    // Exclude over-budget items if requested
    if (excludeOverBudget && !rec.budgetFit.withinBudget) {
      return false;
    }
    
    // Filter by max budget if specified
    if (maxBudget !== undefined && rec.estimatedCost > maxBudget) {
      return false;
    }
    
    return true;
  });
}

/**
 * Sort recommendations by budget fit (best fit first)
 */
export function sortByBudgetFit(
  recommendations: BudgetAwareRecommendation[]
): BudgetAwareRecommendation[] {
  return [...recommendations].sort((a, b) => {
    // Items with budget fit come first
    if (!a.budgetFit && b.budgetFit) return 1;
    if (a.budgetFit && !b.budgetFit) return -1;
    if (!a.budgetFit && !b.budgetFit) return 0;
    
    // Sort by score (higher is better)
    return (b.budgetFit?.score || 0) - (a.budgetFit?.score || 0);
  });
}

/**
 * Check if user has budget preferences set
 */
export function hasBudgetPreferences(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const stored = localStorage.getItem('budget_comfort_bands');
    if (!stored) return false;
    
    const preferences = JSON.parse(stored);
    return Object.keys(preferences).length > 0;
  } catch (error) {
    return false;
  }
}

/**
 * Get category suggestions based on typical costs
 */
export function suggestCategory(estimatedCost: number): string {
  // Heuristics for common price ranges
  if (estimatedCost < 20) return 'entertainment';
  if (estimatedCost >= 20 && estimatedCost < 50) return 'dining';
  if (estimatedCost >= 50 && estimatedCost < 100) return 'wellness';
  if (estimatedCost >= 100 && estimatedCost < 200) return 'shopping';
  return 'travel';
}

/**
 * Calculate total budget impact for multiple recommendations
 */
export function calculateTotalBudgetImpact(
  recommendations: BudgetAwareRecommendation[]
): {
  total: number;
  breakdown: { [categoryId: string]: number };
  withinBudget: boolean;
} {
  const breakdown: { [categoryId: string]: number } = {};
  let total = 0;
  
  recommendations.forEach(rec => {
    if (rec.estimatedCost && rec.categoryId) {
      total += rec.estimatedCost;
      breakdown[rec.categoryId] = (breakdown[rec.categoryId] || 0) + rec.estimatedCost;
    }
  });
  
  // Check if all categories are within budget
  const withinBudget = Object.entries(breakdown).every(([categoryId, cost]) => {
    const band = getComfortBand(categoryId);
    return cost <= band.max;
  });
  
  return { total, breakdown, withinBudget };
}

/**
 * Generate budget-aware message for user
 */
export function getBudgetAwareMessage(
  recommendations: BudgetAwareRecommendation[]
): string {
  const { total, withinBudget } = calculateTotalBudgetImpact(recommendations);
  
  if (recommendations.length === 0) {
    return "Set your budget preferences to see personalized recommendations!";
  }
  
  if (!hasBudgetPreferences()) {
    return "💡 Tip: Set budget comfort bands to see how recommendations fit your spending goals!";
  }
  
  if (withinBudget) {
    return `✅ All ${recommendations.length} recommendations fit your budget! (Total: $${total.toFixed(0)})`;
  } else {
    const overBudgetCount = recommendations.filter(r => !r.budgetFit?.withinBudget).length;
    return `⚠️ ${overBudgetCount} of ${recommendations.length} recommendations exceed your budget. (Total: $${total.toFixed(0)})`;
  }
}

/**
 * Analytics tracking for budget fit
 */
export function trackBudgetFitInteraction(
  action: 'view' | 'accept' | 'reject',
  recommendation: BudgetAwareRecommendation
): void {
  if (!recommendation.budgetFit) return;
  
  console.log('💰 Budget Fit Interaction:', {
    action,
    recommendationId: recommendation.id,
    estimatedCost: recommendation.estimatedCost,
    budgetFit: recommendation.budgetFit.rating,
    score: recommendation.budgetFit.score,
    withinBudget: recommendation.budgetFit.withinBudget,
    timestamp: new Date().toISOString()
  });
  
  // Future: Send to analytics service
}

// Export for testing
export const __test__ = {
  getColorForRating,
  getIconForRating,
  suggestCategory
};

