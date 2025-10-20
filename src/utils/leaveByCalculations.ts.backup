/**
 * Leave-By Time Calculations
 * WP-CTX-01: Context Intelligence - Travel Time & Leave-By
 * 
 * Calculates when users need to leave to arrive on time
 * Goal: On-time arrival rate 65% → 85% (+20pp)
 */

export type TravelMode = 'driving' | 'transit' | 'walking' | 'bicycling';

export interface LeaveByResult {
  leaveByTime: Date;
  leaveByDisplay: string; // "2:25 PM"
  travelDuration: number; // minutes
  arrivalWindow: {
    earliest: Date;
    latest: Date;
  };
  confidence: number; // 0-100
  trafficLevel: 'light' | 'moderate' | 'heavy' | 'unknown';
  warnings: string[];
  recommendations: string[];
}

export interface EventLocation {
  address: string;
  lat?: number;
  lng?: number;
}

/**
 * Calculate leave-by time for an event
 * 
 * NOTE: This is a mock implementation. In production, integrate with:
 * - Google Maps Distance Matrix API
 * - Real-time traffic data
 * - User's current location (with permission)
 */
export async function calculateLeaveBy(
  eventStartTime: Date,
  eventLocation: EventLocation,
  userLocation: EventLocation,
  travelMode: TravelMode = 'driving',
  bufferMinutes: number = 10
): Promise<LeaveByResult> {
  // MOCK: Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  // MOCK: Calculate basic travel time
  // In production, use Google Maps Distance Matrix API
  const mockTravelDuration = getMockTravelDuration(
    userLocation,
    eventLocation,
    travelMode
  );
  
  // Apply traffic multiplier based on time of day
  const hour = eventStartTime.getHours();
  const trafficLevel = getTrafficLevel(hour);
  const trafficMultiplier = getTrafficMultiplier(trafficLevel);
  const adjustedDuration = Math.round(mockTravelDuration * trafficMultiplier);
  
  // Calculate leave-by time (event time - travel time - buffer)
  const totalMinutesNeeded = adjustedDuration + bufferMinutes;
  const leaveByTime = new Date(eventStartTime.getTime() - (totalMinutesNeeded * 60 * 1000));
  
  // Calculate arrival window (±5 minutes)
  const arrivalWindow = {
    earliest: new Date(eventStartTime.getTime() - (5 * 60 * 1000)),
    latest: new Date(eventStartTime.getTime() + (5 * 60 * 1000))
  };
  
  // Calculate confidence based on traffic and time of day
  const confidence = calculateConfidence(trafficLevel, hour, travelMode);
  
  // Generate warnings
  const warnings = generateWarnings(
    leaveByTime,
    trafficLevel,
    adjustedDuration,
    travelMode
  );
  
  // Generate recommendations
  const recommendations = generateRecommendations(
    trafficLevel,
    adjustedDuration,
    travelMode,
    bufferMinutes
  );
  
  return {
    leaveByTime,
    leaveByDisplay: formatLeaveByTime(leaveByTime),
    travelDuration: adjustedDuration,
    arrivalWindow,
    confidence,
    trafficLevel,
    warnings,
    recommendations
  };
}

/**
 * Mock travel duration calculator
 * In production: Use Google Maps Distance Matrix API
 */
function getMockTravelDuration(
  from: EventLocation,
  to: EventLocation,
  mode: TravelMode
): number {
  // Simple distance estimation (very rough)
  // In production, use actual API
  
  const baseMinutes = {
    driving: 25,
    transit: 35,
    walking: 60,
    bicycling: 40
  };
  
  // Add some randomness to simulate different distances
  const randomFactor = 0.5 + Math.random();
  return Math.round(baseMinutes[mode] * randomFactor);
}

/**
 * Determine traffic level based on time of day
 */
function getTrafficLevel(hour: number): 'light' | 'moderate' | 'heavy' | 'unknown' {
  // Morning rush: 7-9 AM
  if (hour >= 7 && hour < 9) return 'heavy';
  
  // Midday: 9 AM - 4 PM
  if (hour >= 9 && hour < 16) return 'light';
  
  // Evening rush: 4-7 PM
  if (hour >= 16 && hour < 19) return 'heavy';
  
  // Evening: 7-10 PM
  if (hour >= 19 && hour < 22) return 'moderate';
  
  // Night/Early morning
  return 'light';
}

/**
 * Get traffic multiplier for travel time
 */
function getTrafficMultiplier(level: 'light' | 'moderate' | 'heavy' | 'unknown'): number {
  switch (level) {
    case 'heavy': return 1.5; // 50% longer
    case 'moderate': return 1.2; // 20% longer
    case 'light': return 1.0; // No delay
    case 'unknown': return 1.1; // Slight buffer
    default: return 1.1;
  }
}

/**
 * Calculate confidence score for the estimate
 */
function calculateConfidence(
  traffic: 'light' | 'moderate' | 'heavy' | 'unknown',
  hour: number,
  mode: TravelMode
): number {
  let confidence = 85; // Base confidence
  
  // Reduce confidence for heavy traffic
  if (traffic === 'heavy') confidence -= 15;
  if (traffic === 'moderate') confidence -= 5;
  if (traffic === 'unknown') confidence -= 10;
  
  // Transit is less predictable
  if (mode === 'transit') confidence -= 10;
  
  // Walking/biking are more predictable
  if (mode === 'walking' || mode === 'bicycling') confidence += 10;
  
  return Math.max(50, Math.min(95, confidence));
}

/**
 * Generate warnings for the user
 */
function generateWarnings(
  leaveByTime: Date,
  traffic: 'light' | 'moderate' | 'heavy' | 'unknown',
  duration: number,
  mode: TravelMode
): string[] {
  const warnings: string[] = [];
  const now = new Date();
  const minutesUntilLeaveBy = (leaveByTime.getTime() - now.getTime()) / (1000 * 60);
  
  // Urgent warnings
  if (minutesUntilLeaveBy < 0) {
    warnings.push('⚠️ You should have left already! Leave now to minimize lateness.');
  } else if (minutesUntilLeaveBy < 5) {
    warnings.push('🚨 Leave in the next 5 minutes!');
  } else if (minutesUntilLeaveBy < 15) {
    warnings.push('⏰ Leave soon - within 15 minutes');
  }
  
  // Traffic warnings
  if (traffic === 'heavy') {
    warnings.push('🚗 Heavy traffic expected - consider leaving earlier');
  }
  
  // Long duration warnings
  if (duration > 60) {
    warnings.push(`⏱️ Long trip (${duration} min) - plan accordingly`);
  }
  
  return warnings;
}

/**
 * Generate helpful recommendations
 */
function generateRecommendations(
  traffic: 'light' | 'moderate' | 'heavy' | 'unknown',
  duration: number,
  mode: TravelMode,
  buffer: number
): string[] {
  const recommendations: string[] = [];
  
  // Traffic-based recommendations
  if (traffic === 'heavy' && mode === 'driving') {
    recommendations.push('Consider taking transit or leaving 15 minutes earlier');
  }
  
  // Buffer recommendations
  if (buffer < 10 && traffic !== 'light') {
    recommendations.push('Add extra buffer time for peace of mind');
  }
  
  // Mode recommendations
  if (duration < 30 && mode === 'driving') {
    recommendations.push('Walking or biking might be faster during rush hour');
  }
  
  return recommendations;
}

/**
 * Format leave-by time for display
 */
export function formatLeaveByTime(time: Date): string {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes.toString().padStart(2, '0');
  
  return `${displayHours}:${displayMinutes} ${ampm}`;
}

/**
 * Get time until leave-by (for countdowns)
 */
export function getTimeUntilLeaveBy(leaveByTime: Date): {
  minutes: number;
  display: string;
  urgent: boolean;
} {
  const now = new Date();
  const diff = leaveByTime.getTime() - now.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  
  let display: string;
  const urgent = minutes < 15;
  
  if (minutes < 0) {
    display = `${Math.abs(minutes)} min late`;
  } else if (minutes < 60) {
    display = `in ${minutes} min`;
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    display = remainingMinutes > 0 
      ? `in ${hours}h ${remainingMinutes}m`
      : `in ${hours}h`;
  }
  
  return { minutes, display, urgent };
}

/**
 * Get travel mode icon
 */
export function getTravelModeIcon(mode: TravelMode): string {
  switch (mode) {
    case 'driving': return '🚗';
    case 'transit': return '🚇';
    case 'walking': return '🚶';
    case 'bicycling': return '🚴';
    default: return '🚗';
  }
}

/**
 * Get traffic level color
 */
export function getTrafficColor(level: 'light' | 'moderate' | 'heavy' | 'unknown'): string {
  switch (level) {
    case 'light': return '#10B981'; // Green
    case 'moderate': return '#F59E0B'; // Orange
    case 'heavy': return '#EF4444'; // Red
    case 'unknown': return '#6B7280'; // Gray
    default: return '#6B7280';
  }
}

// Export for testing
export const __test__ = {
  getMockTravelDuration,
  getTrafficLevel,
  calculateConfidence,
  generateWarnings
};

