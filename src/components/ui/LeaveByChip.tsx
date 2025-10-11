/**
 * Leave-By Chip Component
 * WP-CTX-01: Shows when users need to leave for events
 * 
 * Displays: "🚗 Leave by 2:25 PM"
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  calculateLeaveBy,
  getTimeUntilLeaveBy,
  getTravelModeIcon,
  getTrafficColor,
  formatLeaveByTime,
  TravelMode,
  EventLocation,
  LeaveByResult
} from '../../utils/leaveByCalculations';

interface LeaveByChipProps {
  eventStartTime: Date;
  eventLocation: EventLocation;
  userLocation?: EventLocation;
  travelMode?: TravelMode;
  compact?: boolean;
  onClick?: () => void;
}

export default function LeaveByChip({
  eventStartTime,
  eventLocation,
  userLocation,
  travelMode = 'driving',
  compact = false,
  onClick
}: LeaveByChipProps) {
  const [leaveBy, setLeaveBy] = useState<LeaveByResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeUntil, setTimeUntil] = useState({ minutes: 0, display: '', urgent: false });
  
  // Default user location (mock)
  const defaultLocation: EventLocation = {
    address: 'Current Location',
    lat: 37.7749,
    lng: -122.4194
  };
  
  useEffect(() => {
    loadLeaveBy();
    
    // Update countdown every minute
    const interval = setInterval(() => {
      if (leaveBy) {
        setTimeUntil(getTimeUntilLeaveBy(leaveBy.leaveByTime));
      }
    }, 60000); // Every minute
    
    return () => clearInterval(interval);
  }, [eventStartTime, eventLocation, travelMode]);
  
  const loadLeaveBy = async () => {
    setLoading(true);
    try {
      const result = await calculateLeaveBy(
        eventStartTime,
        eventLocation,
        userLocation || defaultLocation,
        travelMode,
        10 // 10-minute buffer
      );
      
      setLeaveBy(result);
      setTimeUntil(getTimeUntilLeaveBy(result.leaveByTime));
    } catch (error) {
      console.error('Error calculating leave-by time:', error);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading || !leaveBy) {
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
        <span style={{ animation: 'pulse 1.5s infinite' }}>⏱️</span>
        Calculating...
      </div>
    );
  }
  
  const trafficColor = getTrafficColor(leaveBy.trafficLevel);
  const modeIcon = getTravelModeIcon(travelMode);
  const isUrgent = timeUntil.urgent || timeUntil.minutes < 0;
  
  return (
    <motion.div
      onClick={onClick}
      whileHover={onClick ? { scale: 1.05 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: compact ? '6px 10px' : '8px 14px',
        background: isUrgent 
          ? 'linear-gradient(135deg, #FEE2E2 0%, #FEF3C7 100%)'
          : 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
        border: `2px solid ${isUrgent ? '#EF4444' : trafficColor}`,
        borderRadius: '10px',
        fontSize: compact ? '12px' : '13px',
        fontWeight: '600',
        color: isUrgent ? '#DC2626' : '#1F2937',
        cursor: onClick ? 'pointer' : 'default',
        gap: '6px',
        boxShadow: isUrgent ? '0 4px 12px rgba(239, 68, 68, 0.2)' : '0 2px 8px rgba(59, 130, 246, 0.1)',
        transition: 'all 0.2s',
        position: 'relative'
      }}
      title={`${leaveBy.travelDuration} min trip · ${leaveBy.confidence}% confident`}
    >
      {/* Travel Mode Icon */}
      <span style={{ fontSize: compact ? '14px' : '16px' }}>
        {modeIcon}
      </span>
      
      {/* Leave-By Time */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <span style={{ opacity: 0.7, fontSize: compact ? '11px' : '12px' }}>
          Leave by
        </span>
        <span style={{ 
          fontWeight: '700',
          color: isUrgent ? '#DC2626' : trafficColor
        }}>
          {leaveBy.leaveByDisplay}
        </span>
      </div>
      
      {/* Countdown (if not compact) */}
      {!compact && (
        <span style={{
          fontSize: '11px',
          padding: '2px 6px',
          background: isUrgent ? '#FEE2E2' : '#F3F4F6',
          borderRadius: '4px',
          color: isUrgent ? '#DC2626' : '#6B7280',
          fontWeight: '600'
        }}>
          {timeUntil.display}
        </span>
      )}
      
      {/* Warning Indicator */}
      {isUrgent && (
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          style={{ fontSize: compact ? '12px' : '14px' }}
        >
          ⚠️
        </motion.span>
      )}
      
      {/* Confidence Indicator (if high confidence and not urgent) */}
      {!isUrgent && leaveBy.confidence >= 85 && !compact && (
        <span style={{ fontSize: '12px', opacity: 0.6 }}>
          ✓
        </span>
      )}
    </motion.div>
  );
}

