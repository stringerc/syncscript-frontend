/**
 * Extended Load Test - 100 VUs, 9 minutes
 * Tests sustained performance under realistic production load
 */

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('errors');
const pageLoadTime = new Trend('page_load_time');

export const options = {
  stages: [
    { duration: '2m', target: 25 },   // Ramp up to 25 VUs
    { duration: '2m', target: 50 },   // Ramp up to 50 VUs
    { duration: '2m', target: 100 },  // Ramp up to 100 VUs (peak load)
    { duration: '2m', target: 50 },   // Ramp down to 50 VUs
    { duration: '1m', target: 0 },    // Ramp down to 0
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'],  // 95% of requests < 2s
    http_req_failed: ['rate<0.01'],     // <1% error rate
    errors: ['rate<0.01'],              // <1% custom errors
  },
};

const BASE_URL = 'https://www.syncscript.app';

const pages = [
  '/',
  '/features',
  '/pricing',
  '/dashboard',
  '/compare',
];

export default function () {
  // Randomly select a page to test
  const page = pages[Math.floor(Math.random() * pages.length)];
  const url = `${BASE_URL}${page}`;

  // Make request
  const startTime = new Date().getTime();
  const response = http.get(url);
  const endTime = new Date().getTime();
  const duration = endTime - startTime;

  // Check response
  const success = check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 2000ms': () => duration < 2000,
    'has content': (r) => r.body.length > 0,
  });

  // Record metrics
  pageLoadTime.add(duration);
  errorRate.add(!success);

  // Think time: random 1-5 seconds (realistic user behavior)
  sleep(Math.random() * 4 + 1);
}

export function handleSummary(data) {
  return {
    'extended-load-test-results.json': JSON.stringify(data),
    stdout: `
═══════════════════════════════════════════════════════
EXTENDED LOAD TEST RESULTS (100 VUs, 9 minutes)
═══════════════════════════════════════════════════════

Total Requests:       ${data.metrics.http_reqs.values.count}
Request Rate:         ${data.metrics.http_reqs.values.rate.toFixed(2)}/s
Failed Requests:      ${data.metrics.http_req_failed.values.passes || 0}

RESPONSE TIMES:
  p50 (median):       ${data.metrics.http_req_duration.values.med.toFixed(2)}ms
  p95:                ${data.metrics.http_req_duration.values['p(95)'].toFixed(2)}ms
  p99:                ${data.metrics.http_req_duration.values['p(99)'].toFixed(2)}ms
  avg:                ${data.metrics.http_req_duration.values.avg.toFixed(2)}ms

THRESHOLDS:
  p95 < 2000ms:       ${data.metrics.http_req_duration.values['p(95)'] < 2000 ? '✅ PASS' : '❌ FAIL'}
  Error rate < 1%:    ${(data.metrics.http_req_failed.values.rate || 0) < 0.01 ? '✅ PASS' : '❌ FAIL'}

VU STAGES:
  Ramp 0→25:          2 minutes
  Ramp 25→50:         2 minutes
  Ramp 50→100:        2 minutes (peak)
  Ramp 100→50:        2 minutes
  Ramp 50→0:          1 minute

VERDICT: ${
      data.metrics.http_req_duration.values['p(95)'] < 2000 &&
      (data.metrics.http_req_failed.values.rate || 0) < 0.01
        ? '✅ PASS - Sustained performance under load'
        : '❌ FAIL - Performance degradation detected'
    }

═══════════════════════════════════════════════════════
`,
  };
}

