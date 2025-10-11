/**
 * Energy Analytics Dashboard
 * Feature #25: Deep insights into energy patterns
 * 
 * Visualizes energy over time with actionable insights
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface EnergyLog {
  level: number;
  timestamp: string;
}

interface EnergyAnalyticsDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  energyLogs: EnergyLog[];
}

export default function EnergyAnalyticsDashboard({
  isOpen,
  onClose,
  energyLogs
}: EnergyAnalyticsDashboardProps) {
  const [period, setPeriod] = useState<'day' | 'week' | 'month'>('week');
  const [insights, setInsights] = useState<string[]>([]);
  
  useEffect(() => {
    if (isOpen && energyLogs.length > 0) {
      generateInsights();
    }
  }, [isOpen, energyLogs, period]);
  
  const generateInsights = () => {
    const insights: string[] = [];
    
    // Calculate average energy
    const avgEnergy = energyLogs.reduce((sum, log) => sum + log.level, 0) / energyLogs.length;
    insights.push(`Your average energy is ${avgEnergy.toFixed(1)} - ${getEnergyLabel(avgEnergy)}`);
    
    // Find peak hours
    const hourMap: { [hour: number]: number[] } = {};
    energyLogs.forEach(log => {
      const hour = new Date(log.timestamp).getHours();
      if (!hourMap[hour]) hourMap[hour] = [];
      hourMap[hour].push(log.level);
    });
    
    const hourAverages = Object.entries(hourMap).map(([hour, levels]) => ({
      hour: parseInt(hour),
      avg: levels.reduce((sum, l) => sum + l, 0) / levels.length
    }));
    
    hourAverages.sort((a, b) => b.avg - a.avg);
    
    if (hourAverages.length > 0) {
      const peakHour = hourAverages[0];
      insights.push(`Your peak energy is around ${formatHour(peakHour.hour)} (${peakHour.avg.toFixed(1)} average)`);
    }
    
    // Find low points
    if (hourAverages.length > 1) {
      const lowHour = hourAverages[hourAverages.length - 1];
      insights.push(`Energy dips around ${formatHour(lowHour.hour)} - schedule low-energy tasks then`);
    }
    
    // Trend analysis
    const recentLogs = energyLogs.slice(-7);
    const oldLogs = energyLogs.slice(0, 7);
    
    if (recentLogs.length > 0 && oldLogs.length > 0) {
      const recentAvg = recentLogs.reduce((sum, log) => sum + log.level, 0) / recentLogs.length;
      const oldAvg = oldLogs.reduce((sum, log) => sum + log.level, 0) / oldLogs.length;
      
      if (recentAvg > oldAvg + 0.3) {
        insights.push(`📈 Energy is trending up! ${((recentAvg - oldAvg) * 100 / oldAvg).toFixed(0)}% increase`);
      } else if (recentAvg < oldAvg - 0.3) {
        insights.push(`📉 Energy is trending down - consider more rest`);
      } else {
        insights.push(`➡️ Energy is stable - consistent patterns!`);
      }
    }
    
    setInsights(insights);
  };
  
  const getEnergyLabel = (level: number) => {
    if (level >= 4.5) return 'Excellent! 🔥';
    if (level >= 3.5) return 'Good 💪';
    if (level >= 2.5) return 'Moderate 👍';
    if (level >= 1.5) return 'Low 😴';
    return 'Very Low 💤';
  };
  
  const formatHour = (hour: number) => {
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}${ampm}`;
  };
  
  if (!isOpen) return null;
  
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(4px)',
        padding: '20px'
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'white',
          borderRadius: '24px',
          maxWidth: '900px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.3)'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '32px',
          borderBottom: '1px solid #E5E7EB'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
              <h2 style={{
                fontSize: '32px',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '8px'
              }}>
                ⚡ Energy Analytics
              </h2>
              <p style={{ fontSize: '16px', color: '#6B7280', margin: 0 }}>
                Deep insights into your energy patterns
              </p>
            </div>
            
            <button
              onClick={onClose}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#F3F4F6',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                color: '#6B7280'
              }}
            >
              ×
            </button>
          </div>
          
          {/* Period Selector */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            {(['day', 'week', 'month'] as const).map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                style={{
                  padding: '10px 24px',
                  background: period === p ? 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)' : '#F9FAFB',
                  color: period === p ? 'white' : '#4B5563',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '32px' }}>
          {/* Key Metrics */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            marginBottom: '32px'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
              padding: '24px',
              borderRadius: '16px',
              border: '2px solid #BFDBFE'
            }}>
              <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '8px', fontWeight: '600' }}>
                Average Energy
              </div>
              <div style={{ fontSize: '36px', fontWeight: '800', color: '#667EEA' }}>
                {energyLogs.length > 0
                  ? (energyLogs.reduce((sum, log) => sum + log.level, 0) / energyLogs.length).toFixed(1)
                  : '0'}
              </div>
            </div>
            
            <div style={{
              background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
              padding: '24px',
              borderRadius: '16px',
              border: '2px solid #A7F3D0'
            }}>
              <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '8px', fontWeight: '600' }}>
                Total Logs
              </div>
              <div style={{ fontSize: '36px', fontWeight: '800', color: '#10B981' }}>
                {energyLogs.length}
              </div>
            </div>
            
            <div style={{
              background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
              padding: '24px',
              borderRadius: '16px',
              border: '2px solid #FCD34D'
            }}>
              <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '8px', fontWeight: '600' }}>
                This {period}
              </div>
              <div style={{ fontSize: '36px', fontWeight: '800', color: '#F59E0B' }}>
                {energyLogs.filter(log => {
                  const logDate = new Date(log.timestamp);
                  const now = new Date();
                  if (period === 'day') {
                    return logDate.toDateString() === now.toDateString();
                  }
                  return true; // Simplified for demo
                }).length}
              </div>
            </div>
          </div>

          {/* Insights */}
          <div style={{
            background: 'linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '32px'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#1F2937',
              marginBottom: '16px'
            }}>
              💡 Key Insights
            </h3>
            
            {insights.length === 0 ? (
              <p style={{ fontSize: '15px', color: '#6B7280' }}>
                Log more energy to see insights!
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {insights.map((insight, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'white',
                      padding: '16px',
                      borderRadius: '12px',
                      border: '1px solid #E5E7EB',
                      fontSize: '15px',
                      color: '#1F2937',
                      lineHeight: '1.6'
                    }}
                  >
                    {insight}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Simple Chart Placeholder */}
          <div style={{
            background: 'white',
            border: '2px solid #E5E7EB',
            borderRadius: '16px',
            padding: '32px',
            textAlign: 'center'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#1F2937',
              marginBottom: '16px'
            }}>
              📈 Energy Over Time
            </h3>
            <p style={{ fontSize: '14px', color: '#6B7280' }}>
              Chart visualization coming in next update!
            </p>
            <div style={{
              marginTop: '24px',
              fontSize: '64px'
            }}>
              📊
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

