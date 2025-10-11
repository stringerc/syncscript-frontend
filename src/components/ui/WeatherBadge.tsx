/**
 * Weather Badge Component
 * WP-CTX-02: Shows weather conditions for events
 * 
 * Displays: "🌧️ 65°F, 80% rain"
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getWeatherForEvent,
  getWeatherColor,
  formatTemperature,
  WeatherCondition,
  EventLocation
} from '../../utils/weatherIntegration';

interface WeatherBadgeProps {
  eventTime: Date;
  location: EventLocation;
  compact?: boolean;
  onClick?: () => void;
}

export default function WeatherBadge({
  eventTime,
  location,
  compact = false,
  onClick
}: WeatherBadgeProps) {
  const [weather, setWeather] = useState<WeatherCondition | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  
  useEffect(() => {
    loadWeather();
  }, [eventTime, location]);
  
  const loadWeather = async () => {
    setLoading(true);
    try {
      const result = await getWeatherForEvent(eventTime, location);
      setWeather(result);
    } catch (error) {
      console.error('Error fetching weather:', error);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading || !weather) {
    return (
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: compact ? '4px 8px' : '6px 12px',
        background: '#F3F4F6',
        borderRadius: '8px',
        fontSize: compact ? '11px' : '12px',
        color: '#9CA3AF',
        gap: '4px'
      }}>
        <span style={{ animation: 'pulse 1.5s infinite' }}>☁️</span>
        Loading...
      </div>
    );
  }
  
  const severityColor = getWeatherColor(weather.severity);
  const hasSevereAlert = weather.alerts.length > 0;
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      setShowDetails(!showDetails);
    }
  };
  
  return (
    <>
      <motion.div
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: compact ? '6px 10px' : '8px 14px',
          background: hasSevereAlert
            ? 'linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%)'
            : 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
          border: `2px solid ${hasSevereAlert ? '#EF4444' : severityColor}`,
          borderRadius: '10px',
          fontSize: compact ? '12px' : '13px',
          fontWeight: '600',
          color: hasSevereAlert ? '#DC2626' : '#1F2937',
          cursor: 'pointer',
          gap: '6px',
          boxShadow: hasSevereAlert ? '0 4px 12px rgba(239, 68, 68, 0.2)' : '0 2px 8px rgba(14, 165, 233, 0.1)',
          transition: 'all 0.2s',
          position: 'relative'
        }}
        title={weather.description}
      >
        {/* Weather Icon */}
        <span style={{ fontSize: compact ? '16px' : '18px' }}>
          {weather.icon}
        </span>
        
        {/* Temperature */}
        <span style={{
          fontWeight: '700',
          color: hasSevereAlert ? '#DC2626' : severityColor
        }}>
          {Math.round(weather.temperature)}°F
        </span>
        
        {/* Precipitation (if > 30%) */}
        {weather.precipitation > 30 && !compact && (
          <span style={{
            fontSize: '11px',
            padding: '2px 6px',
            background: hasSevereAlert ? '#FEE2E2' : '#F3F4F6',
            borderRadius: '4px',
            color: hasSevereAlert ? '#DC2626' : '#6B7280',
            fontWeight: '600'
          }}>
            {weather.precipitation}% rain
          </span>
        )}
        
        {/* Alert Indicator */}
        {hasSevereAlert && (
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            style={{ fontSize: compact ? '12px' : '14px' }}
          >
            ⚠️
          </motion.span>
        )}
      </motion.div>
      
      {/* Details Popover */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              marginTop: '8px',
              background: 'white',
              borderRadius: '12px',
              padding: '16px',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
              zIndex: 1000,
              minWidth: '280px',
              border: `2px solid ${severityColor}`
            }}
          >
            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDetails(false);
              }}
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                background: 'none',
                border: 'none',
                fontSize: '18px',
                cursor: 'pointer',
                color: '#6B7280',
                padding: '4px'
              }}
            >
              ×
            </button>
            
            {/* Weather Details */}
            <div style={{ marginBottom: '12px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '12px'
              }}>
                <span style={{ fontSize: '48px' }}>{weather.icon}</span>
                <div>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: severityColor
                  }}>
                    {Math.round(weather.temperature)}°F
                  </div>
                  <div style={{ fontSize: '13px', color: '#6B7280' }}>
                    Feels like {Math.round(weather.feelsLike)}°F
                  </div>
                </div>
              </div>
              
              <div style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#1F2937',
                marginBottom: '8px'
              }}>
                {weather.description}
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '8px',
                fontSize: '12px',
                color: '#6B7280'
              }}>
                <div>💧 {weather.precipitation}% precip</div>
                <div>💨 {weather.windSpeed} mph wind</div>
                <div>💦 {weather.humidity}% humidity</div>
              </div>
            </div>
            
            {/* Alerts */}
            {weather.alerts.length > 0 && (
              <div style={{
                background: '#FEE2E2',
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '12px'
              }}>
                <div style={{
                  fontSize: '13px',
                  fontWeight: '700',
                  color: '#DC2626',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  ⚠️ Weather Alerts
                </div>
                {weather.alerts.map((alert, idx) => (
                  <div key={idx} style={{ marginBottom: '6px' }}>
                    <div style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#991B1B',
                      marginBottom: '2px'
                    }}>
                      {alert.icon} {alert.title}
                    </div>
                    <div style={{ fontSize: '11px', color: '#7F1D1D' }}>
                      {alert.description}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Recommendations */}
            {weather.recommendations.length > 0 && (
              <div>
                <div style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  color: '#4B5563',
                  marginBottom: '6px'
                }}>
                  💡 Recommendations:
                </div>
                {weather.recommendations.map((rec, idx) => (
                  <div
                    key={idx}
                    style={{
                      fontSize: '11px',
                      color: '#6B7280',
                      marginBottom: '4px',
                      paddingLeft: '8px'
                    }}
                  >
                    • {rec}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

