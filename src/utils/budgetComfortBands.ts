/**
 * Budget Comfort Bands System
 * WP-FIN-01: Budget Intelligence Foundation
 * 
 * Manages user spending comfort zones per category
 * Goal: Under-budget rate 52% → 80% (+28pp)
 */

export interface ComfortBand {
  min: number;
  ideal: number;
  max: number;
}

export interface BudgetCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  defaultBand: ComfortBand;
  examples: {
    low: string;
    ideal: string;
    high: string;
  };
}

export interface UserBudgetPreferences {
  [categoryId: string]: ComfortBand;
}

/**
 * Predefined budget categories
 */
export const BUDGET_CATEGORIES: BudgetCategory[] = [
  {
    id: 'dining',
    name: 'Dining Out',
    icon: '🍽️',
    description: 'Restaurants, cafes, food delivery',
    defaultBand: { min: 15, ideal: 35, max: 60 },
    examples: {
      low: 'Fast food ($12-18)',
      ideal: 'Casual dining ($30-45)',
      high: 'Fine dining ($60-100)'
    }
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    icon: '🎬',
    description: 'Movies, concerts, events, streaming',
    defaultBand: { min: 10, ideal: 25, max: 50 },
    examples: {
      low: 'Movie ticket ($12-15)',
      ideal: 'Concert ($25-40)',
      high: 'Premium event ($50-100)'
    }
  },
  {
    id: 'shopping',
    name: 'Shopping',
    icon: '🛍️',
    description: 'Clothing, accessories, non-essentials',
    defaultBand: { min: 20, ideal: 60, max: 150 },
    examples: {
      low: 'Basic items ($20-40)',
      ideal: 'Quality purchases ($50-100)',
      high: 'Premium brands ($150-300)'
    }
  },
  {
    id: 'travel',
    name: 'Travel & Transport',
    icon: '✈️',
    description: 'Flights, hotels, ride-shares',
    defaultBand: { min: 30, ideal: 100, max: 300 },
    examples: {
      low: 'Budget travel ($30-80)',
      ideal: 'Comfortable travel ($100-200)',
      high: 'Premium travel ($300-600)'
    }
  },
  {
    id: 'wellness',
    name: 'Health & Wellness',
    icon: '💆',
    description: 'Gym, spa, fitness classes',
    defaultBand: { min: 15, ideal: 40, max: 100 },
    examples: {
      low: 'Drop-in class ($15-25)',
      ideal: 'Monthly membership ($40-80)',
      high: 'Premium spa ($100-200)'
    }
  },
  {
    id: 'experiences',
    name: 'Experiences',
    icon: '🎯',
    description: 'Activities, classes, workshops',
    defaultBand: { min: 20, ideal: 50, max: 150 },
    examples: {
      low: 'Local activity ($20-35)',
      ideal: 'Class or workshop ($50-80)',
      high: 'Premium experience ($150-300)'
    }
  }
];

/**
 * Save comfort bands to localStorage (local-first, privacy-preserving)
 */
export function saveComfortBands(preferences: UserBudgetPreferences): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('budget_comfort_bands', JSON.stringify(preferences));
    console.log('💰 Budget Comfort Bands saved:', preferences);
  } catch (error) {
    console.error('Error saving comfort bands:', error);
  }
}

/**
 * Load comfort bands from localStorage
 */
export function loadComfortBands(): UserBudgetPreferences {
  if (typeof window === 'undefined') return {};
  
  try {
    const stored = localStorage.getItem('budget_comfort_bands');
    if (!stored) return {};
    
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading comfort bands:', error);
    return {};
  }
}

/**
 * Get comfort band for a category (or default)
 */
export function getComfortBand(categoryId: string): ComfortBand {
  const preferences = loadComfortBands();
  
  if (preferences[categoryId]) {
    return preferences[categoryId];
  }
  
  // Return default for this category
  const category = BUDGET_CATEGORIES.find(c => c.id === categoryId);
  return category?.defaultBand || { min: 20, ideal: 50, max: 100 };
}

/**
 * Calculate budget fit score (0-5 stars)
 * Used for displaying how well a price fits user's budget
 */
export function calculateBudgetFit(price: number, band: ComfortBand): {
  score: number; // 0-5 stars
  rating: 'poor' | 'ok' | 'good' | 'great' | 'perfect';
  message: string;
} {
  if (price < band.min) {
    // Below minimum - might be too cheap, suspicious quality
    return {
      score: 3,
      rating: 'ok',
      message: 'Budget-friendly (below your usual range)'
    };
  } else if (price >= band.min && price <= band.ideal) {
    // Between min and ideal - good value
    const idealness = 1 - Math.abs(price - band.ideal) / (band.ideal - band.min);
    return {
      score: Math.ceil(4 + idealness), // 4-5 stars
      rating: price === band.ideal ? 'perfect' : 'great',
      message: price === band.ideal 
        ? 'Perfect fit for your budget!' 
        : 'Great value, close to your ideal'
    };
  } else if (price > band.ideal && price <= band.max) {
    // Between ideal and max - acceptable but pricey
    const distance = (price - band.ideal) / (band.max - band.ideal);
    return {
      score: Math.ceil(3 - distance), // 2-3 stars
      rating: 'ok',
      message: 'Within budget but on the pricier side'
    };
  } else {
    // Over maximum - too expensive
    const overBy = price - band.max;
    return {
      score: 1,
      rating: 'poor',
      message: `Over budget by $${overBy.toFixed(0)}`
    };
  }
}

/**
 * Get star display string
 */
export function getStarDisplay(score: number): string {
  const fullStars = Math.floor(score);
  const halfStar = score % 1 >= 0.5 ? '½' : '';
  return '⭐'.repeat(fullStars) + (halfStar ? '⭐' : '');
}

/**
 * Validate comfort band (ensure min < ideal < max)
 */
export function validateComfortBand(band: ComfortBand): boolean {
  return band.min < band.ideal && band.ideal < band.max && band.min >= 0;
}

/**
 * Get suggested defaults based on location (future: use geocoding)
 */
export function getSuggestedDefaults(location: string = 'default'): Partial<UserBudgetPreferences> {
  // Future: Adjust defaults based on city cost of living
  // For now, return standard defaults
  const defaults: Partial<UserBudgetPreferences> = {};
  
  BUDGET_CATEGORIES.forEach(category => {
    defaults[category.id] = category.defaultBand;
  });
  
  return defaults;
}

// Export for testing
export const __test__ = {
  calculateBudgetFit,
  validateComfortBand,
  getStarDisplay
};

