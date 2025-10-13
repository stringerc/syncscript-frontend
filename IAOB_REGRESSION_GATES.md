# 🚧 IAOB: Integration Regression Gates

**CI Quality Gates for Integration Testing**  
**Owner:** Integration QA Lead + SDET  
**Last Updated:** October 13, 2025

---

## 🎯 INTEGRATION TEST GATES

### **Gate 1: Contract Tests** ✅ Must Pass

**What:** Pact consumer/provider tests  
**Blocks:** Breaking API changes  
**Runtime:** ~3 minutes

```yaml
- name: Contract Tests
  run: npm run test:contract:consumer && npm run test:contract:provider
  
  # Must pass before merge
  required: true
```

---

### **Gate 2: E2E Integration Tests** ✅ Must Pass

**What:** Playwright tests with real backend  
**Blocks:** Integration flow regressions  
**Runtime:** ~10 minutes

```yaml
- name: E2E Tests
  run: |
    docker-compose up -d postgres redis
    npm run test:e2e:integration
  
  # Tests full auth flow + CRUD operations
```

---

### **Gate 3: Performance Regression** ⚠️ Warning

**What:** Lighthouse CI scores  
**Blocks:** Performance degradation >10%  
**Runtime:** ~5 minutes

```yaml
- name: Performance Budget
  run: npm run lighthouse
  
  # Alert if scores drop, block if >10% regression
```

---

*Regression Gates Owner: Integration QA Lead*  
*Status: Framework Complete*

