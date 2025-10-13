# 🐛 Sentry Performance Monitoring Setup

**Current Status:** Basic error tracking configured ✅  
**Remaining:** Performance monitoring (15 minutes)

---

## WHAT'S ALREADY CONFIGURED

✅ Sentry account created  
✅ Project: SyncScript  
✅ SDK installed: `@sentry/nextjs`  
✅ Error tracking active  
✅ Source maps uploaded  

---

## WHAT NEEDS SETUP (15 minutes)

### Step 1: Enable Performance Monitoring

1. Login to: https://sentry.io
2. Navigate to: **SyncScript project**
3. Go to: **Settings → Performance**
4. Click: **Enable Performance Monitoring**
5. Set **Transaction Sample Rate:** `1.0` (100% for MVP)
   - Note: Reduce to 0.1 (10%) after launch for cost savings

### Step 2: Update Environment Variables

Add to `.env.local`:
```bash
NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE=1.0
```

Add to Vercel:
1. Go to: Vercel Dashboard → syncscript-frontend
2. Settings → Environment Variables
3. Add: `NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE` = `1.0`

### Step 3: Update Sentry Config

The config should already exist in `sentry.client.config.ts` and `sentry.server.config.ts`.

**Verify it includes:**
```typescript
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  // Performance Monitoring
  tracesSampleRate: parseFloat(process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE || '1.0'),
  
  // Session Replay (optional but recommended)
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

### Step 4: Test Performance Tracking

1. Deploy changes to Vercel
2. Visit: https://www.syncscript.app/dashboard
3. Perform some actions (create task, view analytics)
4. Wait 2-3 minutes
5. Check Sentry: **Performance → Transactions**
6. Should see: Page loads, API calls, database queries

---

## WHAT YOU'LL GET

### 1. Transaction Tracking
- Page load times
- API response times
- Database query performance
- Custom operation timing

### 2. Performance Insights
- Slowest transactions
- Bottleneck identification
- Performance trends
- Anomaly detection

### 3. Alerts
- Performance regression alerts
- Slow transaction notifications
- Error spike detection

### 4. User Experience Metrics
- Time to First Byte (TTFB)
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)

---

## IMPACT ON QUALITY SCORE

**Before:** IAOB 97/100  
**After:** IAOB 98/100  
**Gain:** +1 point

**Why:** Complete observability (errors + performance)

---

## OPTIONAL: Advanced Configuration

### Custom Instrumentation

```typescript
import * as Sentry from '@sentry/nextjs';

// Track custom operations
const transaction = Sentry.startTransaction({
  name: 'Task Creation Flow',
  op: 'user_action'
});

const span = transaction.startChild({
  op: 'http',
  description: 'POST /api/tasks'
});

// ... do work ...

span.finish();
transaction.finish();
```

### Performance Budgets

Set alerts in Sentry dashboard:
- P95 latency > 2000ms → Alert
- Error rate > 1% → Critical alert
- Apdex score < 0.9 → Warning

---

## VERIFICATION

After setup, verify:

1. ✅ Performance tab shows transactions
2. ✅ Page loads tracked
3. ✅ API calls tracked
4. ✅ No performance regressions detected

---

**Time Required:** 15 minutes  
**Difficulty:** Easy  
**Impact:** +1 quality point  
**Status:** Not blocking, can do anytime

