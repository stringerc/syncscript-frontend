// Performance Monitoring Component
'use client';

import { useEffect } from 'react';

export function PerformanceMonitor() {
  useEffect(() => {
    // Web Vitals monitoring
    const measureWebVitals = () => {
      // Largest Contentful Paint (LCP)
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        const lcp = lastEntry.startTime;
        
        fetch('/api/monitoring/web-vitals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            metric: 'LCP',
            value: lcp,
            timestamp: new Date().toISOString(),
            url: window.location.href
          })
        }).catch(() => {});
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay (FID)
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          const fid = entry.processingStart - entry.startTime;
          
          fetch('/api/monitoring/web-vitals', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              metric: 'FID',
              value: fid,
              timestamp: new Date().toISOString(),
              url: window.location.href
            })
          }).catch(() => {});
        });
      }).observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        
        fetch('/api/monitoring/web-vitals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            metric: 'CLS',
            value: clsValue,
            timestamp: new Date().toISOString(),
            url: window.location.href
          })
        }).catch(() => {});
      }).observe({ entryTypes: ['layout-shift'] });
    };

    // Page load performance
    const measurePageLoad = () => {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const navigation = performance.getEntriesByType('navigation')[0];
          const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
          const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
          
          fetch('/api/monitoring/page-load', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              loadTime,
              domContentLoaded,
              timestamp: new Date().toISOString(),
              url: window.location.href
            })
          }).catch(() => {});
        }, 0);
      });
    };

    measureWebVitals();
    measurePageLoad();

    // Memory usage monitoring
    const measureMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        fetch('/api/monitoring/memory', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            usedJSHeapSize: memory.usedJSHeapSize,
            totalJSHeapSize: memory.totalJSHeapSize,
            jsHeapSizeLimit: memory.jsHeapSizeLimit,
            timestamp: new Date().toISOString(),
            url: window.location.href
          })
        }).catch(() => {});
      }
    };

    // Measure memory every 30 seconds
    const memoryInterval = setInterval(measureMemory, 30000);

    return () => {
      clearInterval(memoryInterval);
    };
  }, []);

  return null;
}

