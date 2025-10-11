/**
 * Weather Integration
 * WP-CTX-02: Context Intelligence - Weather Awareness
 * 
 * Shows weather conditions for events
 * Goal: Weather-related cancellations 31% → 10% (-70%)
 */

export interface WeatherCondition {
  temperature: number; // Fahrenheit
  feelsLike: number;
  description: string; // "Partly cloudy", "Light rain", etc.
  icon: string; // Weather emoji
  precipitation: number; // Chance of rain (0-100)
  humidity: number; // 0-100
  windSpeed: number; // mph
  severity: 'normal' | 'caution' | 'warning' | 'severe';
  alerts: WeatherAlert[];
  recommendations: string[];
}

export interface WeatherAlert {
  type: 'thunderstorm' | 'snow' | 'heat' | 'wind' | 'fog' | 'freeze';
  title: string;
  description: string;
  severity: 'watch' | 'warning' | 'advisory';
  icon: string;
}

export interface EventLocation {
  address: string;
  lat?: number;
  lng?: number;
}

/**
 * Get weather for an event
 * 
 * NOTE: This is a mock implementation. In production, integrate with:
 * - OpenWeatherMap API
 * - Weather.gov API
 * - Or similar weather service
 */
export async function getWeatherForEvent(
  eventTime: Date,
  location: EventLocation
): Promise<WeatherCondition> {
  // MOCK: Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 150));
  
  // MOCK: Generate semi-realistic weather based on time
  const hour = eventTime.getHours();
  const month = eventTime.getMonth(); // 0-11
  
  const weather = generateMockWeather(hour, month, location);
  
  return weather;
}

/**
 * Generate mock weather data
 * In production: Replace with actual weather API
 */
function generateMockWeather(
  hour: number,
  month: number, // 0-11
  location: EventLocation
): WeatherCondition {
  // Base temperature by season
  const seasonalTemp = getSeasonalTemp(month);
  
  // Daily variation
  const timeOfDayVariation = getTimeOfDayVariation(hour);
  const temperature = Math.round(seasonalTemp + timeOfDayVariation);
  const feelsLike = temperature + (Math.random() > 0.5 ? 2 : -2);
  
  // Random weather condition
  const conditions = getWeatherConditions(month);
  const condition = conditions[Math.floor(Math.random() * conditions.length)];
  
  // Generate alerts if severe weather
  const alerts = generateAlerts(temperature, condition, month);
  
  // Determine severity
  const severity = determineSeverity(temperature, condition, alerts);
  
  // Generate recommendations
  const recommendations = generateRecommendations(temperature, condition, alerts);
  
  return {
    temperature,
    feelsLike,
    description: condition.description,
    icon: condition.icon,
    precipitation: condition.precipChance,
    humidity: 40 + Math.floor(Math.random() * 40), // 40-80%
    windSpeed: 5 + Math.floor(Math.random() * 15), // 5-20 mph
    severity,
    alerts,
    recommendations
  };
}

/**
 * Get base temperature by season
 */
function getSeasonalTemp(month: number): number {
  // 0=Jan, 11=Dec
  if (month >= 11 || month <= 1) return 35; // Winter
  if (month >= 2 && month <= 4) return 55; // Spring
  if (month >= 5 && month <= 8) return 75; // Summer
  return 60; // Fall
}

/**
 * Get temperature variation by time of day
 */
function getTimeOfDayVariation(hour: number): number {
  if (hour >= 6 && hour < 12) return 5; // Morning
  if (hour >= 12 && hour < 18) return 10; // Afternoon (warmest)
  if (hour >= 18 && hour < 22) return 0; // Evening
  return -10; // Night (coolest)
}

/**
 * Get possible weather conditions by season
 */
function getWeatherConditions(month: number): Array<{ description: string; icon: string; precipChance: number }> {
  const winter = [
    { description: 'Clear sky', icon: '☀️', precipChance: 0 },
    { description: 'Partly cloudy', icon: '⛅', precipChance: 10 },
    { description: 'Cloudy', icon: '☁️', precipChance: 20 },
    { description: 'Light snow', icon: '🌨️', precipChance: 60 },
    { description: 'Snow', icon: '❄️', precipChance: 80 }
  ];
  
  const spring = [
    { description: 'Clear sky', icon: '☀️', precipChance: 0 },
    { description: 'Partly cloudy', icon: '⛅', precipChance: 15 },
    { description: 'Cloudy', icon: '☁️', precipChance: 25 },
    { description: 'Light rain', icon: '🌦️', precipChance: 50 },
    { description: 'Rain', icon: '🌧️', precipChance: 70 }
  ];
  
  const summer = [
    { description: 'Clear sky', icon: '☀️', precipChance: 0 },
    { description: 'Partly cloudy', icon: '⛅', precipChance: 10 },
    { description: 'Cloudy', icon: '☁️', precipChance: 20 },
    { description: 'Thunderstorms', icon: '⛈️', precipChance: 60 }
  ];
  
  const fall = [
    { description: 'Clear sky', icon: '☀️', precipChance: 0 },
    { description: 'Partly cloudy', icon: '⛅', precipChance: 15 },
    { description: 'Cloudy', icon: '☁️', precipChance: 30 },
    { description: 'Light rain', icon: '🌦️', precipChance: 45 },
    { description: 'Rain', icon: '🌧️', precipChance: 65 }
  ];
  
  if (month >= 11 || month <= 1) return winter;
  if (month >= 2 && month <= 4) return spring;
  if (month >= 5 && month <= 8) return summer;
  return fall;
}

/**
 * Generate weather alerts
 */
function generateAlerts(
  temp: number,
  condition: { description: string; icon: string; precipChance: number },
  month: number
): WeatherAlert[] {
  const alerts: WeatherAlert[] = [];
  
  // Heat advisory
  if (temp > 95) {
    alerts.push({
      type: 'heat',
      title: 'Extreme Heat Warning',
      description: `Dangerous heat conditions (${temp}°F). Stay hydrated and limit outdoor activity.`,
      severity: 'warning',
      icon: '🌡️'
    });
  } else if (temp > 90) {
    alerts.push({
      type: 'heat',
      title: 'Heat Advisory',
      description: `Hot conditions (${temp}°F). Take precautions if outdoors.`,
      severity: 'advisory',
      icon: '☀️'
    });
  }
  
  // Cold advisory
  if (temp < 20) {
    alerts.push({
      type: 'freeze',
      title: 'Extreme Cold Warning',
      description: `Dangerous cold (${temp}°F). Dress warmly and limit exposure.`,
      severity: 'warning',
      icon: '🥶'
    });
  } else if (temp < 32) {
    alerts.push({
      type: 'freeze',
      title: 'Freeze Advisory',
      description: `Below freezing (${temp}°F). Watch for ice.`,
      severity: 'advisory',
      icon: '❄️'
    });
  }
  
  // Thunderstorm warning
  if (condition.description.toLowerCase().includes('thunderstorm')) {
    alerts.push({
      type: 'thunderstorm',
      title: 'Thunderstorm Warning',
      description: 'Severe thunderstorms expected. Seek shelter if outdoors.',
      severity: 'warning',
      icon: '⛈️'
    });
  }
  
  // Snow warning
  if (condition.description.toLowerCase().includes('snow') && condition.precipChance > 70) {
    alerts.push({
      type: 'snow',
      title: 'Snow Warning',
      description: 'Heavy snow expected. Travel may be difficult.',
      severity: 'warning',
      icon: '❄️'
    });
  }
  
  return alerts;
}

/**
 * Determine overall severity
 */
function determineSeverity(
  temp: number,
  condition: { description: string; icon: string; precipChance: number },
  alerts: WeatherAlert[]
): 'normal' | 'caution' | 'warning' | 'severe' {
  if (alerts.some(a => a.severity === 'warning')) return 'severe';
  if (alerts.some(a => a.severity === 'advisory')) return 'warning';
  if (condition.precipChance > 60 || temp > 85 || temp < 35) return 'caution';
  return 'normal';
}

/**
 * Generate recommendations
 */
function generateRecommendations(
  temp: number,
  condition: { description: string; icon: string; precipChance: number },
  alerts: WeatherAlert[]
): string[] {
  const recommendations: string[] = [];
  
  // Temperature recommendations
  if (temp > 85) {
    recommendations.push('💧 Bring water and stay hydrated');
    recommendations.push('🧢 Wear sun protection');
  } else if (temp < 40) {
    recommendations.push('🧥 Dress warmly in layers');
    if (temp < 32) {
      recommendations.push('🧤 Watch for ice on roads/sidewalks');
    }
  }
  
  // Precipitation recommendations
  if (condition.precipChance > 50) {
    recommendations.push('☂️ Bring an umbrella');
    if (condition.description.toLowerCase().includes('thunder')) {
      recommendations.push('⚠️ Consider rescheduling outdoor activities');
    }
  }
  
  // Alert-based recommendations
  if (alerts.some(a => a.type === 'thunderstorm')) {
    recommendations.push('⛈️ Avoid outdoor activities during storm');
  }
  
  if (alerts.some(a => a.type === 'snow')) {
    recommendations.push('🚗 Allow extra travel time');
    recommendations.push('❄️ Drive carefully if roads are icy');
  }
  
  return recommendations;
}

/**
 * Get weather icon for display
 */
export function getWeatherDisplayIcon(weather: WeatherCondition): string {
  return weather.icon;
}

/**
 * Get color for weather severity
 */
export function getWeatherColor(severity: 'normal' | 'caution' | 'warning' | 'severe'): string {
  switch (severity) {
    case 'normal': return '#10B981'; // Green
    case 'caution': return '#F59E0B'; // Orange
    case 'warning': return '#EF4444'; // Red
    case 'severe': return '#7C2D12'; // Dark red
    default: return '#10B981';
  }
}

/**
 * Format temperature for display
 */
export function formatTemperature(temp: number, feelsLike?: number): string {
  if (feelsLike && Math.abs(temp - feelsLike) > 3) {
    return `${Math.round(temp)}°F (feels like ${Math.round(feelsLike)}°F)`;
  }
  return `${Math.round(temp)}°F`;
}

// Export for testing
export const __test__ = {
  generateMockWeather,
  getSeasonalTemp,
  generateAlerts,
  determineSeverity
};

