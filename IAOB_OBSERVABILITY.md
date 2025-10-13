# 📊 IAOB: Observability & SLO Monitoring

**Golden Signals, Dashboards & Alerting**  
**Owner:** Observability & SLO Engineer  
**Stack:** Vercel Analytics + PostHog + Custom Metrics  
**Last Updated:** October 13, 2025

---

## 🎯 GOLDEN SIGNALS

**The Four Signals (Google SRE)**

###  **1. Latency** ⏱️
**How long does it take to serve a request?**

**Metrics:**
- `p50_latency`: 50th percentile (median)
- `p95_latency`: 95th percentile
- `p99_latency`: 99th percentile
- `max_latency`: Worst case

**SLOs:**
| Flow | p50 | p95 | p99 |
|------|-----|-----|-----|
| Homepage Load | <500ms | <1s | <2s |
| Dashboard Load | <800ms | <2s | <3s |
| Login | <400ms | <1s | <2s |
| Create Task | <200ms | <500ms | <1s |
| Load Task List | <300ms | <800ms | <1.5s |

---

### **2. Traffic** 📈
**How much demand is the system handling?**

**Metrics:**
- `requests_per_second`: RPS
- `requests_per_minute`: RPM
- `daily_active_users`: DAU
- `concurrent_users`: Current

**Baselines:**
```
MVP Target:
- 100 DAU
- 10 concurrent users peak
- 50 RPM average

Growth Target (6 months):
- 1,000 DAU
- 100 concurrent users
- 500 RPM average
```

---

### **3. Errors** 🚨
**What is the rate of failing requests?**

**Metrics:**
- `error_rate`: % of requests that fail
- `error_count`: Absolute count
- `errors_by_type`: Breakdown

**SLOs:**
- Overall error rate: <0.2%
- API error rate: <0.5%
- Auth error rate: <0.1%

**Error Classification:**
- **5xx (Server):** Backend bugs, database issues
- **4xx (Client):** Invalid input, auth failures
- **Network:** Timeouts, connection refused

---

### **4. Saturation** 📊
**How full is the system?**

**Metrics:**
- `database_connections`: Active / Max
- `memory_usage`: MB used / Available
- `cpu_usage`: % utilization
- `disk_usage`: GB used / Available

**Thresholds:**
- DB connections: < 80% of pool
- Memory: < 85%
- CPU: < 70% average
- Disk: < 80%

---

## 📐 SERVICE LEVEL OBJECTIVES (SLOs)

### **Availability SLO**

**Target:** 99.9% uptime (8.76 hours downtime/year)

**Measurement:**
```
Availability = (Total Time - Downtime) / Total Time

Example:
30 days = 43,200 minutes
Downtime = 43 minutes
Availability = (43,200 - 43) / 43,200 = 99.9%
```

**Monitoring:**
- Synthetic checks every 1 minute
- Uptime robot pinging `/health`
- Alert if 3 consecutive failures

---

### **Latency SLO**

**Target:** p95 < 2 seconds for dashboard load

**Measurement:**
```typescript
// Track with Vercel Analytics + PostHog
posthog.capture('page_loaded', {
  page: '/dashboard',
  duration_ms: loadTime,
  ttfb: ttfb,
  lcp: lcp,
  cls: cls
});
```

**Violation:** If p95 > 2s for > 5 minutes

---

### **Error Rate SLO**

**Target:** < 0.2% error rate

**Measurement:**
```
Error Rate = (Failed Requests / Total Requests) × 100

Example:
1,000 requests
2 failures
Error Rate = (2 / 1000) × 100 = 0.2%
```

**Violation:** If error rate > 0.5% for > 2 minutes

---

## 📊 DASHBOARDS

### **Dashboard 1: Real-Time Health**

**Metrics (1-minute refresh):**
```
┌─ SyncScript Health ─────────────────────┐
│ Status: ✅ ALL SYSTEMS OPERATIONAL      │
│                                          │
│ Frontend:  ✅ UP (2.1s avg load)        │
│ Backend:   ✅ UP (145ms avg response)   │
│ Database:  ✅ UP (23ms avg query)       │
│ Auth0:     ✅ UP                         │
│                                          │
│ Current Users: 47                        │
│ Requests/min: 234                        │
│ Error Rate: 0.1% ✅                      │
└──────────────────────────────────────────┘
```

---

### **Dashboard 2: Core Web Vitals**

**Vercel Analytics (built-in):**
```
Real User Monitoring (RUM):
  
  LCP (Largest Contentful Paint):
    p50: 1.2s  ✅
    p75: 1.8s  ✅
    p95: 2.3s  ✅
    
  FID (First Input Delay):
    p50: 45ms  ✅
    p75: 89ms  ✅
    p95: 156ms ✅
    
  CLS (Cumulative Layout Shift):
    p50: 0.02  ✅
    p75: 0.05  ✅
    p95: 0.08  ✅
```

**Goal:** All metrics in "Good" range (green)

---

### **Dashboard 3: API Performance**

**Custom Dashboard (PostHog):**
```
API Endpoint Performance:

GET /api/tasks:
  Calls: 1,234 (last hour)
  p50: 120ms
  p95: 340ms
  p99: 890ms
  Error Rate: 0.2%
  
POST /api/tasks:
  Calls: 456 (last hour)
  p50: 180ms
  p95: 420ms
  Error Rate: 0.3%
  
GET /api/projects:
  Calls: 234 (last hour)
  p50: 95ms
  p95: 210ms
  Error Rate: 0.1%
```

---

### **Dashboard 4: User Journey Funnels**

**PostHog Funnels:**
```
Conversion Funnel: Task Creation

1. Visit Dashboard       → 1,000 users (100%)
2. Click "Add Task"      →   650 users (65%)
3. Fill Form             →   580 users (58%)
4. Click "Create"        →   520 users (52%)
5. Task Created Success  →   495 users (49.5%)

Drop-offs:
  Step 1→2: 35% (CTA visibility issue?)
  Step 2→3: 10.7% (Form complexity?)
  Step 3→4: 10.3% (Validation errors?)
  Step 4→5: 4.8% (Backend failures)
```

**Action:** Investigate 4.8% backend failure rate

---

## 🚨 ALERTING STRATEGY

### **Alert Levels**

**P0 - Critical (Page Immediately)**
- Service down (3 consecutive health check failures)
- Error rate > 5%
- Database down
- Auth0 down

**P1 - Urgent (Alert in 5 min)**
- Error rate > 1%
- p95 latency > 5s
- SLO breach sustained > 5 min
- Disk > 90% full

**P2 - Warning (Alert in 30 min)**
- Error rate > 0.5%
- p95 latency > 3s
- Memory > 85%
- Unusual traffic spike

**P3 - Info (Daily digest)**
- SLO approaching threshold
- Performance degradation
- New errors types appearing

---

### **Alert Channels**

**Slack Integration:**
```yaml
# Different channels by severity
P0 → #incidents (@ channel ping)
P1 → #alerts
P2 → #warnings  
P3 → #daily-digest
```

**PagerDuty Integration:**
```yaml
P0 → Page on-call engineer immediately
P1 → Alert on-call (not page)
P2 → Create incident (low urgency)
P3 → Email only
```

**Email:**
```
P0 → CTO, VP Eng, On-call (SMS too)
P1 → Team leads
P2 → Team channel
P3 → Weekly summary
```

---

## 📈 CUSTOM METRICS

### **Track Business Metrics**

```typescript
// Track task creation
posthog.capture('task_created', {
  energy_level: task.energy_level,
  priority: task.priority,
  has_due_date: !!task.due_date,
  has_project: !!task.project_id,
  method: 'manual', // vs 'ai' vs 'template'
});

// Track completions
posthog.capture('task_completed', {
  energy_level: task.energy_level,
  actual_duration: task.actual_duration,
  estimated_duration: task.estimated_duration,
  accuracy: Math.abs(task.actual_duration - task.estimated_duration),
});

// Track energy logs
posthog.capture('energy_logged', {
  level: energy.level,
  time_of_day: getTimeOfDay(),
  day_of_week: getDayOfWeek(),
});
```

---

### **Track Technical Metrics**

```typescript
// API call tracking
const trackAPICall = async (endpoint: string, method: string, fn: Function) => {
  const start = performance.now();
  try {
    const result = await fn();
    posthog.capture('api_call_success', {
      endpoint,
      method,
      duration_ms: performance.now() - start,
      status: 200
    });
    return result;
  } catch (error) {
    posthog.capture('api_call_error', {
      endpoint,
      method,
      duration_ms: performance.now() - start,
      error: error.message,
      status: error.status || 500
    });
    throw error;
  }
};

// Usage
const tasks = await trackAPICall('/api/tasks', 'GET', async () => {
  return await authenticatedFetch('/api/tasks');
});
```

---

## 🔍 INSTRUMENTATION

### **Frontend Instrumentation**

**Performance Observer:**
```typescript
// Track Core Web Vitals
import { onCLS, onFID, onLCP, onFCP, onTTFB } from 'web-vitals';

onCLS((metric) => {
  posthog.capture('web_vital', {
    name: 'CLS',
    value: metric.value,
    rating: metric.rating, // 'good', 'needs-improvement', 'poor'
    page: window.location.pathname
  });
});

onLCP((metric) => {
  posthog.capture('web_vital', {
    name: 'LCP',
    value: metric.value,
    rating: metric.rating,
    page: window.location.pathname
  });
});

// ... same for FID, FCP, TTFB
```

---

### **Backend Instrumentation**

**Express Middleware:**
```typescript
// middleware/metrics.ts
export function metricsMiddleware(req, res, next) {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    
    // Track request
    posthog.capture('api_request', {
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration_ms: duration,
      user_id: req.userId || 'anonymous',
      error: res.statusCode >= 400
    });
    
    // Track SLO compliance
    if (duration > 2000) {
      posthog.capture('slo_breach', {
        metric: 'latency',
        threshold: 2000,
        actual: duration,
        endpoint: req.path
      });
    }
  });
  
  next();
}
```

---

## 📊 SLO DASHBOARD

### **SLO Tracking**

```typescript
// Calculate SLO compliance
interface SLO {
  name: string;
  target: number;      // 99.9 = 99.9%
  window: string;      // '30d', '7d', '24h'
  metric: string;      // 'availability', 'latency', 'error_rate'
  threshold: number;   // For latency/error rate
}

const slos: SLO[] = [
  {
    name: 'Availability',
    target: 99.9,
    window: '30d',
    metric: 'availability',
    threshold: 0 // N/A
  },
  {
    name: 'Dashboard Load Time',
    target: 95, // 95% of requests under threshold
    window: '24h',
    metric: 'latency',
    threshold: 2000 // 2 seconds
  },
  {
    name: 'API Error Rate',
    target: 99.8, // 99.8% success rate = 0.2% error rate
    window: '24h',
    metric: 'error_rate',
    threshold: 0.002
  }
];
```

**Dashboard Display:**
```
SLO Compliance (Last 24 Hours):

✅ Availability: 99.95% (target: 99.9%)
   Uptime: 23h 58m / 24h
   Downtime: 2m

⚠️ Dashboard Load (p95): 2.3s (target: <2s)
   Compliant: 93.5% (target: 95%)
   Action: INVESTIGATE LATENCY

✅ API Error Rate: 0.15% (target: <0.2%)
   Success: 99.85%
   Errors: 12 of 8,234 requests
```

---

## 🎨 MONITORING DASHBOARDS

### **Dashboard A: Executive Overview**

**For:** CTO, VP Engineering, Product

**Metrics:**
- System status (green/yellow/red)
- SLO compliance %
- Active users (real-time)
- Key business metrics:
  - Tasks created today
  - Tasks completed today
  - New user signups
  - Conversion rate

**Update:** Every 5 minutes

---

### **Dashboard B: Engineering Health**

**For:** Engineers, SREs

**Metrics:**
- All 4 golden signals
- Error rate by endpoint
- Latency by endpoint
- Database query time
- Cache hit rate
- API dependency status

**Update:** Every 1 minute

---

### **Dashboard C: User Experience**

**For:** Product, UX

**Metrics:**
- Core Web Vitals (LCP, FID, CLS)
- Page load times
- User journey funnels
- Feature adoption rates
- Session duration
- Bounce rates

**Update:** Real-time

---

## 🚨 ALERT RULES

### **Rule 1: Service Down**

**Trigger:**
```yaml
Condition: Health check fails 3 times in a row
Window: 3 minutes
Action: Page on-call immediately
Channel: PagerDuty + Slack #incidents
Message: "🚨 SyncScript backend is DOWN! Health checks failing."
```

---

### **Rule 2: High Error Rate**

**Trigger:**
```yaml
Condition: Error rate > 1%
Window: 5 minutes
Action: Alert team
Channel: Slack #alerts
Message: "⚠️ High error rate detected: {rate}% (threshold: 1%)"
Auto-action: Capture error samples, create Sentry issue
```

---

### **Rule 3: Slow Performance**

**Trigger:**
```yaml
Condition: p95 latency > 3s
Window: 10 minutes
Action: Warning
Channel: Slack #warnings
Message: "⏱️ Performance degradation: p95 = {latency}s"
Auto-action: Capture slow traces
```

---

### **Rule 4: SLO Burn Rate**

**Trigger:**
```yaml
Condition: Consuming error budget too fast
Calculation: 
  Error budget = (100% - 99.9%) × 30 days = 43.2 minutes
  Burn rate = Current downtime / Expected downtime
  
  If downtime in last hour > 5× expected:
    Alert "Burning through error budget too fast!"
```

**Action:** Investigate and fix before budget exhausted

---

## 🧪 SYNTHETIC MONITORING

### **Setup Uptime Checks**

**Tool:** UptimeRobot, Pingdom, or custom

**Checks:**
```yaml
- Name: Homepage
  URL: https://www.syncscript.app
  Interval: 1 minute
  Expect: 200 OK
  Timeout: 10s
  
- Name: Backend Health
  URL: https://syncscript-backend-1.onrender.com/health
  Interval: 1 minute
  Expect: 200 OK + {"status":"OK"}
  Timeout: 5s
  
- Name: Dashboard (Auth Flow)
  URL: https://www.syncscript.app/dashboard
  Interval: 5 minutes
  Steps:
    1. Visit /dashboard
    2. Redirects to Auth0
    3. Returns 200 (or 302)
```

---

### **Multi-Location Checks**

**Test From:**
- US West (San Francisco)
- US East (New York)
- EU (London)
- Asia (Singapore)

**Track:** Latency by region, availability by region

---

## 📈 CUSTOM METRICS IMPLEMENTATION

### **Install Dependencies**

```bash
npm install @vercel/analytics
npm install posthog-js
npm install @sentry/nextjs
```

---

### **Vercel Analytics (Already Installed)**

**Provides:**
- Core Web Vitals (automatic)
- Page views
- User sessions
- Geographic distribution

**Access:** Vercel Dashboard → Analytics

---

### **PostHog Analytics**

```typescript
// Track custom events
posthog.capture('task_created', {
  energy_level: 3,
  priority: 2,
  source: 'manual'
});

// Track user properties
posthog.identify(user.id, {
  email: user.email,
  plan: user.plan,
  signup_date: user.created_at
});

// Track page views
posthog.capture('$pageview', {
  $current_url: window.location.href
});
```

---

### **Sentry Performance**

```typescript
// Already configured - enhance with transactions
import * as Sentry from '@sentry/nextjs';

// Track transaction
const transaction = Sentry.startTransaction({
  name: 'Create Task Flow',
  op: 'user-interaction'
});

try {
  const span1 = transaction.startChild({ op: 'validate-input' });
  // Validate...
  span1.finish();
  
  const span2 = transaction.startChild({ op: 'api-call', description: 'POST /api/tasks' });
  const result = await fetch('/api/tasks', { ... });
  span2.finish();
  
  transaction.setStatus('ok');
} catch (error) {
  transaction.setStatus('error');
  Sentry.captureException(error);
} finally {
  transaction.finish();
}
```

---

## 📊 METRICS AGGREGATION

### **Daily Rollup**

**Aggregate metrics daily:**
```typescript
// Run daily at midnight
async function generateDailyMetrics() {
  const yesterday = new Date(Date.now() - 86400000);
  
  const metrics = {
    date: yesterday.toISOString().split('T')[0],
    
    users: {
      dau: await countDAU(yesterday),
      new_signups: await countNewUsers(yesterday),
      churned: await countChurnedUsers(yesterday)
    },
    
    tasks: {
      created: await countTasksCreated(yesterday),
      completed: await countTasksCompleted(yesterday),
      completion_rate: await getCompletionRate(yesterday)
    },
    
    performance: {
      avg_load_time: await getAvgLoadTime(yesterday),
      p95_load_time: await getP95LoadTime(yesterday),
      error_rate: await getErrorRate(yesterday)
    },
    
    slos: {
      availability: await getAvailability(yesterday),
      latency_slo_met: await getLatencySLO(yesterday),
      error_slo_met: await getErrorSLO(yesterday)
    }
  };
  
  // Store for historical trending
  await saveMetrics(metrics);
  
  // Send daily report
  await sendDailyReport(metrics);
}
```

---

## ✅ IMPLEMENTATION PLAN

### **Phase 1: Foundation (Week 1)**
- [ ] PostHog account created
- [ ] SDK installed (frontend + backend)
- [ ] Basic event tracking
- [ ] First dashboard created

### **Phase 2: SLOs (Week 2)**
- [ ] Define SLOs for each flow
- [ ] Setup SLO tracking
- [ ] Create SLO dashboard
- [ ] Configure alerts

### **Phase 3: Advanced (Week 3)**
- [ ] Funnels for key journeys
- [ ] A/B test framework
- [ ] Custom metrics
- [ ] Automated reports

### **Phase 4: Optimization (Week 4)**
- [ ] Alert tuning (reduce noise)
- [ ] Dashboard refinement
- [ ] Runbook creation
- [ ] Team training

---

*Observability Owner: Observability & SLO Engineer*  
*Status: Framework Complete*

