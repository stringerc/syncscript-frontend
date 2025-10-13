# 🌪️ IAOB: Chaos Testing & Resilience

**Breaking Things to Make Them Stronger**  
**Owner:** Resilience & Chaos Engineer  
**Status:** Framework Ready  
**Last Updated:** October 13, 2025

---

## 🎯 PURPOSE

Chaos testing validates that SyncScript remains functional when things go wrong:
- Backend down/slow
- Database unavailable
- Third-party service failures
- Network issues
- Partial data
- Malformed responses

**Philosophy:** Hope for the best, prepare for the worst.

---

## 🧪 CHAOS SCENARIOS

### **Scenario 1: Backend API Down**

**Simulation:**
```typescript
// Block all backend requests
if (process.env.CHAOS_BACKEND_DOWN === 'true') {
  // Intercept all /api/* calls
  const originalFetch = window.fetch;
  window.fetch = async (url, options) => {
    if (url.includes('/api/')) {
      throw new Error('Network request failed - Backend down (chaos test)');
    }
    return originalFetch(url, options);
  };
}
```

**Expected Behavior:**
- ✅ Dashboard loads (no crash)
- ✅ Toast: "Backend is slow or offline. Loading local demo mode."
- ✅ Empty state shows
- ✅ UI remains functional
- ✅ Can create tasks locally
- ✅ LocalStorage fallback works

**Failure Modes:**
- ❌ Red error overlay
- ❌ Infinite loading
- ❌ Blank white screen
- ❌ Cannot interact with UI

**Status:** ✅ Already implemented (graceful degradation)

---

### **Scenario 2: Slow Backend (Network Latency)**

**Simulation:**
```typescript
// Add 5-second delay to all backend calls
const originalFetch = window.fetch;
window.fetch = async (url, options) => {
  if (url.includes(process.env.NEXT_PUBLIC_API_URL)) {
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
  return originalFetch(url, options);
};
```

**Expected Behavior:**
- ✅ Loading spinners shown
- ✅ Skeleton loaders visible
- ✅ "Taking longer than usual..." message after 3s
- ✅ Timeout after 10s with friendly error
- ✅ Retry button available

**Metrics:**
- User abandonment rate (how many leave?)
- Retry click rate
- Time to give up

---

### **Scenario 3: Partial Backend Failure**

**Simulation:**
```typescript
// 50% of requests fail randomly
window.fetch = async (url, options) => {
  if (url.includes('/api/') && Math.random() < 0.5) {
    return new Response(JSON.stringify({
      error: 'Internal Server Error'
    }), { status: 500 });
  }
  return originalFetch(url, options);
};
```

**Expected Behavior:**
- ✅ Retry logic kicks in (exponential backoff)
- ✅ Some requests succeed, some fail
- ✅ UI shows mix of real + cached data
- ✅ Clear error messages for failed operations
- ✅ No cascading failures

---

### **Scenario 4: Malformed Response**

**Simulation:**
```typescript
// Return invalid JSON
window.fetch = async (url, options) => {
  if (url.includes('/api/tasks')) {
    return new Response('{ invalid json :', { status: 200 });
  }
  return originalFetch(url, options);
};
```

**Expected Behavior:**
- ✅ JSON parse error caught
- ✅ Error logged to Sentry
- ✅ User sees: "Unexpected response from server"
- ✅ Fallback to cached data
- ✅ No crash

---

### **Scenario 5: Database Timeout**

**Simulation (Backend):**
```typescript
// Simulate slow database queries
pool.query = async (sql, params) => {
  await new Promise(resolve => setTimeout(resolve, 10000)); // 10s delay
  throw new Error('Query timeout');
};
```

**Expected Behavior (Backend):**
- ✅ Query timeout after 5s
- ✅ Returns 503 Service Unavailable
- ✅ Error logged
- ✅ Retry-After header set

**Expected Behavior (Frontend):**
- ✅ Receives 503
- ✅ Shows "Service temporarily unavailable"
- ✅ Retry button shown
- ✅ Auto-retry after 30s

---

### **Scenario 6: Auth0 Outage**

**Simulation:**
```typescript
// Block Auth0 domain
// In /etc/hosts:
127.0.0.1 dev-w3z7dv32hd5fqkwx.us.auth0.com
```

**Expected Behavior:**
- ✅ Login button shows "Authentication service unavailable"
- ✅ Already-logged-in users can continue (cached session)
- ✅ New login attempts fail gracefully
- ✅ Clear error message
- ✅ Retry mechanism

---

### **Scenario 7: Flaky Network (Packet Loss)**

**Simulation:**
```bash
# MacOS network conditioning
sudo dnctl pipe 1 config bw 1Mbit/s delay 100 plr 0.1
sudo pfctl -f network-chaos.conf
```

**Or use Chrome DevTools:**
```
Network → Custom profile:
- Download: 1 Mbps
- Upload: 500 Kbps
- Latency: 100ms
- Packet loss: 10%
```

**Expected Behavior:**
- ✅ Requests retry on failure
- ✅ Loading states persist longer
- ✅ Eventually succeeds or times out
- ✅ No infinite retry loops

---

### **Scenario 8: Memory Leak Simulation**

**Simulation:**
```typescript
// Create large arrays that aren't garbage collected
let leak = [];
setInterval(() => {
  leak.push(new Array(1000000).fill('x'));
}, 1000);
```

**Expected Behavior:**
- ✅ Performance degrades gradually
- ✅ No sudden crash
- ✅ Sentry captures high memory usage
- ✅ Service worker manages memory better

**Prevention:**
- Clean up event listeners
- Clear intervals on unmount
- Limit cache sizes
- Use WeakMap for large objects

---

## 🛠️ CHAOS TESTING TOOLS

### **Option 1: Chaos Monkey (Netflix)**

**For:** AWS infrastructure

```bash
# Not applicable - we're on Vercel/Render
```

---

### **Option 2: Toxiproxy**

**For:** Network chaos (latency, timeouts, packet loss)

```bash
docker run -d -p 8474:8474 -p 666:666 ghcr.io/shopify/toxiproxy

# Add proxy for backend
toxiproxy-cli create backend \
  -l 0.0.0.0:666 \
  -u syncscript-backend-1.onrender.com:443

# Add latency
toxiproxy-cli toxic add backend \
  -t latency \
  -a latency=5000 \
  -a jitter=1000

# Add timeout
toxiproxy-cli toxic add backend \
  -t timeout \
  -a timeout=1000
```

**Frontend points to:** `http://localhost:666` (proxied)

---

### **Option 3: MSW (Mock Service Worker)**

**For:** Frontend testing without real backend

```bash
npm install --save-dev msw
```

```typescript
// tests/mocks/handlers.ts
import { rest } from 'msw';

export const handlers = [
  // Simulate slow response
  rest.get('/api/tasks', async (req, res, ctx) => {
    await new Promise(resolve => setTimeout(resolve, 5000));
    return res(ctx.json({ tasks: [] }));
  }),
  
  // Simulate error
  rest.post('/api/tasks', (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ error: 'Database connection failed' })
    );
  }),
  
  // Simulate malformed response
  rest.get('/api/projects', (req, res, ctx) => {
    return res(ctx.text('{ invalid json'));
  }),
];
```

---

### **Option 4: Playwright Network Interception**

**For:** E2E chaos testing

```typescript
// tests/chaos/backend-down.spec.ts
test('Dashboard works when backend is down', async ({ page, context }) => {
  // Block all API calls
  await context.route('**/api/**', route => route.abort());
  
  await page.goto('/dashboard');
  
  // Should still load
  await expect(page.locator('h1')).toContainText('SyncScript');
  
  // Should show error toast
  await expect(page.locator('.toast')).toContainText('Backend is slow or offline');
  
  // Should be able to create task locally
  await page.click('button:has-text("Add Task")');
  await page.fill('input[name="title"]', 'Local task');
  await page.click('button:has-text("Create")');
  
  // Task should appear
  await expect(page.locator('.task-item')).toContainText('Local task');
});
```

---

## 📋 CHAOS TEST SUITE

### **Test 1: Backend Unavailable**

**Duration:** 5 minutes  
**Chaos:** Block all backend API calls

**Assertions:**
- [ ] Frontend loads without crash
- [ ] User sees friendly error message
- [ ] LocalStorage fallback works
- [ ] Can create tasks locally
- [ ] UI remains responsive
- [ ] No console errors

**Acceptance:** 100% pass rate

---

### **Test 2: Intermittent Backend**

**Duration:** 10 minutes  
**Chaos:** 50% of requests fail randomly

**Assertions:**
- [ ] Retry logic works
- [ ] Exponential backoff implemented
- [ ] Max 3 retries
- [ ] Eventually succeeds or fails gracefully
- [ ] No infinite loops

**Acceptance:** 95%+ eventual success rate

---

### **Test 3: Slow Backend**

**Duration:** 10 minutes  
**Chaos:** 5-second delay on all requests

**Assertions:**
- [ ] Loading states shown immediately
- [ ] Skeleton loaders visible
- [ ] "Taking longer..." message after 3s
- [ ] Timeout after 10s
- [ ] User can cancel/navigate away

**Acceptance:** No user frustration (measured by rage clicks)

---

### **Test 4: Database Connection Pool Exhausted**

**Duration:** 5 minutes  
**Chaos:** All DB connections in use

**Backend Expected:**
- [ ] Queue requests
- [ ] Return 503 after 5s
- [ ] Log error to monitoring
- [ ] Include Retry-After header

**Frontend Expected:**
- [ ] Show "Server busy" message
- [ ] Auto-retry after Retry-After seconds
- [ ] Max 3 retries
- [ ] Final fallback to local mode

---

### **Test 5: Auth0 Timeout**

**Duration:** 5 minutes  
**Chaos:** Auth0 login takes 30s

**Assertions:**
- [ ] Loading spinner shown
- [ ] User can cancel
- [ ] Timeout message after 30s
- [ ] Retry option available
- [ ] No session corruption

---

### **Test 6: Partial Data Response**

**Duration:** 5 minutes  
**Chaos:** API returns incomplete data

```json
{
  "success": true,
  "data": {
    "tasks": [
      {
        "id": "task_1",
        "title": "Task 1"
        // Missing: priority, energy_level, etc.
      }
    ]
  }
}
```

**Assertions:**
- [ ] Frontend handles missing fields
- [ ] Default values applied
- [ ] No TypeScript errors
- [ ] No UI breaking
- [ ] Warning logged

---

## 🔄 AUTOMATED CHAOS SCHEDULE

### **Daily Chaos (Non-Production)**

**Run automatically in staging:**

```yaml
# .github/workflows/chaos-tests.yml
name: Daily Chaos Tests

on:
  schedule:
    - cron: '0 3 * * *' # 3 AM daily

jobs:
  chaos:
    runs-on: ubuntu-latest
    steps:
      - name: Run chaos scenarios
        run: npm run test:chaos
      
      - name: Report results
        run: node scripts/chaos-report.js
```

---

### **Pre-Release Chaos**

**Before every major release:**
1. Run full chaos suite
2. All scenarios must pass
3. Document any failures
4. Fix before release

**Gate:** Cannot ship if chaos tests fail

---

## 📊 CHAOS METRICS

### **Track Resilience**

**Metrics:**
- `mtbf`: Mean Time Between Failures
- `mttr`: Mean Time To Recovery
- `chaos_test_pass_rate`: % of chaos tests passing
- `fallback_success_rate`: % of fallbacks that work

**Dashbard:**
```
Resilience Metrics (Last 30 Days):

MTBF: 15.2 days (target: >7 days) ✅
MTTR: 4.3 minutes (target: <10 min) ✅

Chaos Test Results:
  Backend Down: 100% pass ✅
  Slow Backend: 100% pass ✅
  Partial Failure: 95% pass ⚠️
  Database Timeout: 100% pass ✅
  Auth0 Outage: 90% pass ⚠️

Fallback Success:
  LocalStorage: 100% ✅
  Cached Data: 98% ✅
  Default Values: 100% ✅
```

---

## 🎯 RESILIENCE PATTERNS

### **Pattern 1: Circuit Breaker**

```typescript
class CircuitBreaker {
  private failureCount = 0;
  private lastFailureTime = 0;
  private state: 'closed' | 'open' | 'half-open' = 'closed';
  
  async execute<T>(fn: () => Promise<T>): Promise<T> {
    // If circuit open, fail fast
    if (this.state === 'open') {
      if (Date.now() - this.lastFailureTime > 60000) {
        this.state = 'half-open'; // Try again after 1 min
      } else {
        throw new Error('Circuit breaker is OPEN - service unavailable');
      }
    }
    
    try {
      const result = await fn();
      
      // Success - reset circuit
      if (this.state === 'half-open') {
        this.state = 'closed';
        this.failureCount = 0;
      }
      
      return result;
    } catch (error) {
      this.failureCount++;
      this.lastFailureTime = Date.now();
      
      // Trip circuit after 5 failures
      if (this.failureCount >= 5) {
        this.state = 'open';
      }
      
      throw error;
    }
  }
}

// Usage
const backendCircuit = new CircuitBreaker();

const tasks = await backendCircuit.execute(async () => {
  return await authenticatedFetch('/api/tasks');
});
```

---

### **Pattern 2: Retry with Exponential Backoff**

```typescript
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000
): Promise<T> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries) {
        throw error; // Final attempt failed
      }
      
      // Exponential backoff: 1s, 2s, 4s, 8s
      const delay = baseDelay * Math.pow(2, attempt);
      
      console.log(`Retry ${attempt + 1}/${maxRetries} in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw new Error('Max retries exceeded');
}

// Usage
const tasks = await retryWithBackoff(
  () => authenticatedFetch('/api/tasks'),
  3,
  1000
);
```

---

### **Pattern 3: Timeout Wrapper**

```typescript
async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  errorMessage = 'Operation timed out'
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(errorMessage)), timeoutMs)
    )
  ]);
}

// Usage
const tasks = await withTimeout(
  authenticatedFetch('/api/tasks'),
  10000,
  'Backend request timed out after 10 seconds'
);
```

---

### **Pattern 4: Fallback Chain**

```typescript
async function getTasks(): Promise<Task[]> {
  try {
    // Try primary: Backend API
    const response = await authenticatedFetch('/api/tasks');
    const data = await response.json();
    return data.tasks;
  } catch (primaryError) {
    console.warn('Primary failed, trying fallback 1:', primaryError);
    
    try {
      // Fallback 1: LocalStorage cache
      const cached = localStorage.getItem('tasks_cache');
      if (cached) {
        const tasks = JSON.parse(cached);
        if (Date.now() - tasks.timestamp < 3600000) { // <1 hour old
          return tasks.data;
        }
      }
    } catch (cacheError) {
      console.warn('Cache failed, trying fallback 2:', cacheError);
    }
    
    // Fallback 2: Default empty state
    return [];
  }
}
```

---

## 🧪 CHAOS TESTING FRAMEWORK

### **Setup Chaos Test Runner**

```typescript
// tests/chaos/chaos-runner.ts
export class ChaosRunner {
  async runScenario(scenario: ChaosScenario) {
    console.log(`🌪️ Running chaos scenario: ${scenario.name}`);
    
    // Setup chaos
    scenario.setup();
    
    // Run test
    const result = await scenario.test();
    
    // Cleanup
    scenario.teardown();
    
    // Report
    return {
      name: scenario.name,
      passed: result.passed,
      assertions: result.assertions,
      duration: result.duration
    };
  }
}

// Define scenarios
const scenarios: ChaosScenario[] = [
  {
    name: 'Backend Down',
    setup: () => blockBackendRequests(),
    test: async () => testDashboardLoads(),
    teardown: () => restoreBackendRequests(),
    expected: {
      dashboardLoads: true,
      errorToastShown: true,
      uiFunctional: true
    }
  },
  // ... more scenarios
];
```

---

## 📊 CHAOS TEST RESULTS DASHBOARD

**Format:**
```
Chaos Test Results - October 13, 2025

Scenario: Backend Down
  Status: ✅ PASS
  Duration: 45 seconds
  Assertions: 6/6 passed
  Notes: Dashboard loaded, LocalStorage fallback worked

Scenario: Slow Backend (5s latency)
  Status: ✅ PASS
  Duration: 32 seconds
  Assertions: 5/5 passed
  Notes: Skeleton shown, timeout handled

Scenario: Partial Failure (50% fail rate)
  Status: ⚠️ PARTIAL
  Duration: 2m 15s
  Assertions: 4/5 passed
  Notes: Retry worked but slow (need exponential backoff)
  Action: Implement better retry logic

Scenario: Malformed JSON
  Status: ✅ PASS
  Duration: 12 seconds
  Assertions: 4/4 passed
  Notes: Caught and handled gracefully

Overall Pass Rate: 95% (19/20 assertions)
```

---

## ✅ ACCEPTANCE CRITERIA

**Chaos Tests Pass When:**
- [ ] Dashboard loads under all scenarios
- [ ] No crashes/blank screens
- [ ] User-friendly error messages shown
- [ ] Fallbacks work 95%+ of time
- [ ] No data corruption
- [ ] Recovery automatic when service restored
- [ ] All scenarios documented
- [ ] Run automatically in CI
- [ ] Results reported to team

---

## 🚨 FAILURE MODES & MITIGATIONS

| Failure | Impact | Mitigation | Status |
|---------|--------|------------|--------|
| Backend Down | No data persistence | LocalStorage fallback | ✅ Implemented |
| Slow Backend | Poor UX | Skeleton loaders + timeout | ✅ Implemented |
| Database Down | Backend fails | Backend returns cached/empty | ⏳ TODO |
| Auth0 Outage | Can't login | Session persists for logged-in users | ✅ Working |
| Network Flaky | Intermittent failures | Retry with backoff | ⏳ TODO |
| Malformed Data | Parse errors | Try-catch + validation | ✅ Implemented |
| Memory Leak | Browser slow/crash | Cleanup + monitoring | ⏳ TODO |

---

*Chaos Testing Owner: Resilience & Chaos Engineer*  
*Framework Status: Complete*  
*Implementation Status: 60% (core resilience done, refinements pending)*

