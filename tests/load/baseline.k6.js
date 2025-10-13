/**
 * k6 Load Test - Baseline
 * IAOB Infrastructure - Performance Testing
 * 
 * Simulates 100 concurrent users over 9 minutes
 */

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '2m', target: 50 },   // Ramp up to 50 users
    { duration: '3m', target: 100 },  // Ramp to 100 users
    { duration: '3m', target: 100 },  // Stay at 100
    { duration: '1m', target: 0 },    // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'],  // 95% under 2s
    http_req_failed: ['rate<0.01'],     // <1% errors
    errors: ['rate<0.01'],
  },
};

export default function () {
  const BASE_URL = __ENV.API_URL || 'https://www.syncscript.app';
  
  // Homepage
  let res = http.get(`${BASE_URL}/`);
  check(res, {
    'homepage status 200': (r) => r.status === 200,
    'homepage loads fast': (r) => r.timings.duration < 2000,
  }) || errorRate.add(1);
  
  sleep(1);
  
  // Features page
  res = http.get(`${BASE_URL}/features`);
  check(res, {
    'features status 200': (r) => r.status === 200,
  }) || errorRate.add(1);
  
  sleep(2);
}

export function handleSummary(data) {
  return {
    'load-test-results.json': JSON.stringify(data, null, 2),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}

function textSummary(data) {
  const metrics = data.metrics;
  return `
k6 Load Test Results
====================

HTTP Request Duration:
  p50: ${metrics.http_req_duration.values['p(50)']}ms
  p95: ${metrics.http_req_duration.values['p(95)']}ms
  p99: ${metrics.http_req_duration.values['p(99)']}ms

Error Rate: ${(metrics.http_req_failed.values.rate * 100).toFixed(2)}%

Total Requests: ${metrics.http_reqs.values.count}
Failed Requests: ${metrics.http_req_failed.values.passes}

Status: ${metrics.http_req_duration.values['p(95)'] < 2000 ? '✅ PASS' : '❌ FAIL'}
  `;
}

