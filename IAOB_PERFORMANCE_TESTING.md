# ⚡ IAOB: Performance & Load Testing

**Owner:** Performance & Capacity Engineer  
**Tools:** k6, Artillery, Lighthouse CI  
**Last Updated:** October 13, 2025

---

## 🎯 LOAD TEST SCENARIOS

### **Scenario 1: Baseline Load**

**Simulation:**
- 100 concurrent users
- 10 requests/second
- Duration: 5 minutes

**Expected:**
- p95 latency < 2s ✅
- Error rate < 0.2% ✅
- CPU < 70% ✅

---

### **Scenario 2: Peak Load (2x)**

**Simulation:**
- 200 concurrent users
- 20 requests/second
- Duration: 10 minutes

**Expected:**
- p95 latency < 3s
- Error rate < 0.5%
- CPU < 85%
- No crashes

---

### **Scenario 3: Soak Test**

**Simulation:**
- 50 concurrent users
- Constant load
- Duration: 24 hours

**Detect:**
- Memory leaks
- Connection pool exhaustion
- Gradual degradation

---

## 📊 k6 LOAD TEST SCRIPT

```javascript
// tests/load/baseline.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 100 }, // Ramp up to 100 users
    { duration: '5m', target: 100 }, // Stay at 100
    { duration: '2m', target: 0 },   // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% under 2s
    http_req_failed: ['rate<0.01'],    // <1% errors
  },
};

export default function () {
  const token = 'test-jwt-token';
  
  // GET tasks
  let res = http.get('https://syncscript-backend-1.onrender.com/api/tasks', {
    headers: { Authorization: `Bearer ${token}` },
  });
  
  check(res, {
    'status is 200 or 401': (r) => [200, 401].includes(r.status),
    'response time < 2s': (r) => r.timings.duration < 2000,
  });
  
  sleep(1); // 1 second between requests
}
```

**Run:**
```bash
k6 run tests/load/baseline.js
```

---

*Performance Owner: Performance & Capacity Engineer*  
*Load Tests: Quarterly*

