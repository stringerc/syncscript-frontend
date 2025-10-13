/**
 * Observability Dashboard
 * IAOB Infrastructure - Monitoring & SLOs
 */

'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Metrics {
  status: 'healthy' | 'degraded' | 'down';
  availability: number;
  errorRate: number;
  p95Latency: number;
  activeUsers: number;
  requestsPerMinute: number;
}

export function ObservabilityDashboard() {
  const [metrics, setMetrics] = useState<Metrics>({
    status: 'healthy',
    availability: 99.95,
    errorRate: 0.15,
    p95Latency: 1800,
    activeUsers: 47,
    requestsPerMinute: 234,
  });

  useEffect(() => {
    // Fetch real metrics from PostHog/Vercel
    const fetchMetrics = async () => {
      try {
        const res = await fetch('/api/metrics');
        if (res.ok) {
          const data = await response.json();
          setMetrics(data);
        }
      } catch (error) {
        console.error('Failed to fetch metrics:', error);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 60000); // Every minute

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (metrics.status) {
      case 'healthy': return 'bg-green-500';
      case 'degraded': return 'bg-yellow-500';
      case 'down': return 'bg-red-500';
    }
  };

  const getStatusText = () => {
    switch (metrics.status) {
      case 'healthy': return '✅ ALL SYSTEMS OPERATIONAL';
      case 'degraded': return '⚠️ DEGRADED PERFORMANCE';
      case 'down': return '🚨 SERVICE DISRUPTION';
    }
  };

  return (
    <div className="observability-dashboard" style={{ padding: '24px', maxWidth: '1200px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px' }}>
        SyncScript Health Dashboard
      </h1>

      {/* Status Banner */}
      <motion.div
        className={`status-banner ${getStatusColor()}`}
        style={{
          padding: '16px 24px',
          borderRadius: '8px',
          color: 'white',
          fontWeight: 'bold',
          marginBottom: '32px',
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {getStatusText()}
      </motion.div>

      {/* Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
        <MetricCard
          title="Availability"
          value={`${metrics.availability}%`}
          target="99.9%"
          status={metrics.availability >= 99.9 ? 'good' : 'warning'}
        />

        <MetricCard
          title="Error Rate"
          value={`${metrics.errorRate}%`}
          target="<0.2%"
          status={metrics.errorRate < 0.2 ? 'good' : 'warning'}
        />

        <MetricCard
          title="p95 Latency"
          value={`${metrics.p95Latency}ms`}
          target="<2000ms"
          status={metrics.p95Latency < 2000 ? 'good' : 'warning'}
        />

        <MetricCard
          title="Active Users"
          value={metrics.activeUsers.toString()}
          target="N/A"
          status="info"
        />

        <MetricCard
          title="Requests/Min"
          value={metrics.requestsPerMinute.toString()}
          target="N/A"
          status="info"
        />
      </div>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  target: string;
  status: 'good' | 'warning' | 'error' | 'info';
}

function MetricCard({ title, value, target, status }: MetricCardProps) {
  const getColor = () => {
    switch (status) {
      case 'good': return '#38A169';
      case 'warning': return '#DD6B20';
      case 'error': return '#E53E3E';
      case 'info': return '#3182CE';
    }
  };

  return (
    <motion.div
      style={{
        padding: '24px',
        background: 'white',
        borderRadius: '12px',
        border: '1px solid #E5E7EB',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}
      whileHover={{ boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
    >
      <div style={{ color: '#6B7280', fontSize: '14px', marginBottom: '8px' }}>
        {title}
      </div>
      <div style={{ fontSize: '32px', fontWeight: 'bold', color: getColor(), marginBottom: '8px' }}>
        {value}
      </div>
      <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
        Target: {target}
      </div>
    </motion.div>
  );
}

