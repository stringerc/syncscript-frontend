"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface EnergyGaugeProps {
  currentEnergy: number; // 0-100
  energyTrend?: 'up' | 'down' | 'stable';
  onEnergyChange?: (energy: number) => void;
  showSparkline?: boolean;
  sparklineData?: number[];
}

export default function EnergyGauge({ 
  currentEnergy, 
  energyTrend = 'stable',
  onEnergyChange,
  showSparkline = true,
  sparklineData = []
}: EnergyGaugeProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  // Generate sparkline data if not provided
  const defaultSparklineData = Array.from({ length: 7 }, (_, i) => 
    Math.max(0, Math.min(100, currentEnergy + (Math.random() - 0.5) * 20))
  );
  const sparkline = sparklineData.length > 0 ? sparklineData : defaultSparklineData;

  const getEnergyColor = (energy: number) => {
    if (energy >= 80) return '#00FF88'; // Vibrant Green
    if (energy >= 60) return '#00D4FF'; // Electric Blue
    if (energy >= 40) return '#FFB347'; // Orange
    return '#FF4444'; // Deep Red
  };

  const getEnergyLabel = (energy: number) => {
    if (energy >= 80) return 'High Energy';
    if (energy >= 60) return 'Good Energy';
    if (energy >= 40) return 'Low Energy';
    return 'Very Low Energy';
  };

  const getEnergyIcon = (energy: number) => {
    if (energy >= 80) return <Zap className="h-6 w-6" />;
    if (energy >= 60) return <Zap className="h-5 w-5" />;
    if (energy >= 40) return <Zap className="h-4 w-4" />;
    return <Zap className="h-3 w-3" />;
  };

  const getTrendIcon = () => {
    switch (energyTrend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-400" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-400" />;
      default:
        return <Minus className="h-4 w-4 text-gray-400" />;
    }
  };

  // Calculate the stroke-dasharray for the circular progress
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (currentEnergy / 100) * circumference;

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, [currentEnergy]);

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Zap className="h-5 w-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-white">Energy Level</h3>
        </div>
        <div className="flex items-center gap-2">
          {getTrendIcon()}
          <span className="text-sm text-gray-400">7-day trend</span>
        </div>
      </div>

      {/* Main Gauge */}
      <div className="relative flex items-center justify-center mb-6">
        <svg width="200" height="200" className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="rgb(55, 65, 81)" // gray-700
            strokeWidth="8"
            fill="none"
          />
          
          {/* Progress circle */}
          <motion.circle
            cx="100"
            cy="100"
            r={radius}
            stroke={getEnergyColor(currentEnergy)}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{
              filter: isAnimating ? 'drop-shadow(0 0 8px rgba(0, 255, 136, 0.3))' : 'none'
            }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center"
          >
            <div className="text-4xl font-bold text-white mb-1">
              {currentEnergy}%
            </div>
            <div className="text-sm text-gray-400">
              {getEnergyLabel(currentEnergy)}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Sparkline Chart */}
      {showSparkline && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Energy Trend</span>
            <span className="text-xs text-gray-500">Last 7 days</span>
          </div>
          <div className="h-12 w-full">
            <svg width="100%" height="100%" className="overflow-visible">
              <motion.path
                d={`M 0,${50 - (sparkline[0] / 100) * 40} ${sparkline.map((value, index) => 
                  `L ${(index / (sparkline.length - 1)) * 100},${50 - (value / 100) * 40}`
                ).join(' ')}`}
                stroke={getEnergyColor(currentEnergy)}
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
              
              {/* Data points */}
              {sparkline.map((value, index) => (
                <motion.circle
                  key={index}
                  cx={(index / (sparkline.length - 1)) * 100}
                  cy={50 - (value / 100) * 40}
                  r="2"
                  fill={getEnergyColor(value)}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                />
              ))}
            </svg>
          </div>
        </div>
      )}

      {/* Energy Insights */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Optimal for:</span>
          <span className="text-white font-medium">
            {currentEnergy >= 80 ? 'Complex tasks' : 
             currentEnergy >= 60 ? 'Creative work' : 
             currentEnergy >= 40 ? 'Simple tasks' : 'Rest & recovery'}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Next break:</span>
          <span className="text-white font-medium">
            {currentEnergy >= 80 ? '2-3 hours' : 
             currentEnergy >= 60 ? '1-2 hours' : 
             currentEnergy >= 40 ? '30-60 min' : 'Now'}
          </span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 flex gap-2">
        <button
          onClick={() => onEnergyChange?.(Math.max(0, currentEnergy - 10))}
          className="flex-1 px-3 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm"
        >
          -10
        </button>
        <button
          onClick={() => onEnergyChange?.(Math.min(100, currentEnergy + 10))}
          className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          +10
        </button>
      </div>
    </div>
  );
}
