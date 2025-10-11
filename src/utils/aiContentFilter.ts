/**
 * AI Content Filter & Safety System
 * Phase 2: AI Safety Controls
 * 
 * Ensures AI responses are safe, appropriate, and user-controlled
 */

export interface SafetyPreferences {
  contentFilterLevel: 'strict' | 'moderate' | 'permissive';
  blockHarmfulContent: boolean;
  blockPersonalQuestions: boolean;
  blockFinancialAdvice: boolean;
  requireExplainability: boolean;
  enableFeedbackLoop: boolean;
}

export interface ContentAnalysis {
  isSafe: boolean;
  confidence: number;
  flags: string[];
  reasons: string[];
  filteredContent?: string;
}

/**
 * Default safety preferences
 */
export const DEFAULT_SAFETY_PREFS: SafetyPreferences = {
  contentFilterLevel: 'moderate',
  blockHarmfulContent: true,
  blockPersonalQuestions: false,
  blockFinancialAdvice: true,
  requireExplainability: true,
  enableFeedbackLoop: true
};

/**
 * Load user safety preferences
 */
export function loadSafetyPreferences(): SafetyPreferences {
  if (typeof window === 'undefined') return DEFAULT_SAFETY_PREFS;
  
  try {
    const stored = localStorage.getItem('ai_safety_preferences');
    if (!stored) return DEFAULT_SAFETY_PREFS;
    
    return { ...DEFAULT_SAFETY_PREFS, ...JSON.parse(stored) };
  } catch (error) {
    console.error('Error loading safety preferences:', error);
    return DEFAULT_SAFETY_PREFS;
  }
}

/**
 * Save safety preferences
 */
export function saveSafetyPreferences(prefs: SafetyPreferences): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('ai_safety_preferences', JSON.stringify(prefs));
    console.log('🛡️ AI Safety Preferences saved:', prefs);
  } catch (error) {
    console.error('Error saving safety preferences:', error);
  }
}

/**
 * Analyze AI content for safety
 */
export function analyzeContent(
  content: string,
  preferences: SafetyPreferences
): ContentAnalysis {
  const flags: string[] = [];
  const reasons: string[] = [];
  let isSafe = true;
  let confidence = 95;
  
  const lowerContent = content.toLowerCase();
  
  // 1. Harmful content detection
  if (preferences.blockHarmfulContent) {
    const harmfulPatterns = [
      'suicide', 'self-harm', 'violence', 'illegal', 'drugs',
      'hate speech', 'discrimination', 'harassment'
    ];
    
    harmfulPatterns.forEach(pattern => {
      if (lowerContent.includes(pattern)) {
        flags.push('harmful_content');
        reasons.push(`Contains potentially harmful content: "${pattern}"`);
        isSafe = false;
        confidence = 10;
      }
    });
  }
  
  // 2. Personal questions blocking
  if (preferences.blockPersonalQuestions) {
    const personalPatterns = [
      'personal information', 'home address', 'phone number',
      'credit card', 'social security', 'password'
    ];
    
    personalPatterns.forEach(pattern => {
      if (lowerContent.includes(pattern)) {
        flags.push('personal_info');
        reasons.push('Requests personal information');
        isSafe = false;
        confidence = 20;
      }
    });
  }
  
  // 3. Financial advice blocking
  if (preferences.blockFinancialAdvice) {
    const financialPatterns = [
      'invest in', 'buy stock', 'cryptocurrency tip',
      'guaranteed returns', 'financial advice'
    ];
    
    financialPatterns.forEach(pattern => {
      if (lowerContent.includes(pattern)) {
        flags.push('financial_advice');
        reasons.push('Contains financial advice (blocked per your settings)');
        isSafe = false;
        confidence = 30;
      }
    });
  }
  
  // 4. Content quality checks
  if (content.length < 10) {
    flags.push('too_short');
    reasons.push('Response is too short to be useful');
    confidence = 50;
  }
  
  if (content.length > 5000) {
    flags.push('too_long');
    reasons.push('Response is unusually long');
    confidence = 60;
  }
  
  // If blocked, provide filtered message
  let filteredContent: string | undefined;
  if (!isSafe) {
    filteredContent = "⚠️ This AI response was blocked by your safety settings. You can adjust these in Settings → AI Safety.";
  }
  
  return {
    isSafe,
    confidence,
    flags,
    reasons,
    filteredContent
  };
}

/**
 * Get safety level description
 */
export function getSafetyLevelDescription(level: 'strict' | 'moderate' | 'permissive'): string {
  switch (level) {
    case 'strict':
      return 'Maximum safety - Blocks all potentially sensitive content';
    case 'moderate':
      return 'Balanced safety - Blocks harmful content, allows general topics';
    case 'permissive':
      return 'Minimal filtering - Only blocks clearly harmful content';
    default:
      return '';
  }
}

/**
 * Report unsafe content
 */
export function reportUnsafeContent(
  content: string,
  reason: string,
  userId: string
): void {
  console.log('🚨 Unsafe Content Reported:', {
    contentPreview: content.substring(0, 100),
    reason,
    userId,
    timestamp: new Date().toISOString()
  });
  
  // Future: Send to moderation API
}

/**
 * Track safety metrics
 */
export function trackSafetyEvent(
  event: 'content_blocked' | 'content_approved' | 'user_reported' | 'settings_changed',
  details: { [key: string]: unknown }
): void {
  console.log('🛡️ AI Safety Event:', {
    event,
    ...details,
    timestamp: new Date().toISOString()
  });
  
  // Future: Send to analytics
}

// Export for testing
export const __test__ = {
  analyzeContent,
  getSafetyLevelDescription
};

