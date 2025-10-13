# 🔙 IAOB: Rollback Runbook

**Emergency Procedures & Recovery Protocols**  
**Owner:** Rollback & Shadow-Traffic Engineer  
**Critical:** Must be executable in <5 minutes  
**Last Updated:** October 13, 2025

---

## 🚨 WHEN TO ROLLBACK

**Immediate Rollback Triggers (No Discussion):**
- Error rate > 5%
- Service completely down
- Data corruption detected
- Security breach
- Critical bug affecting all users

**Escalated Rollback (CIS Approval):**
- Error rate 1-5%
- Performance degradation (p95 > 5s)
- Partial outage (>20% users affected)
- Customer complaints flooding in

**Monitor & Hold (No Rollback Yet):**
- Error rate 0.2-1%
- Performance slightly slow (p95 2-3s)
- Minor bugs (<5% users affected)

---

## ⚡ 5-MINUTE ROLLBACK PROCEDURES

### **Rollback Type 1: Feature Flag Disable** (30 seconds)

**When:** New feature causing issues

**Steps:**
```bash
# 1. Open PostHog dashboard
open https://app.posthog.com

# 2. Navigate to Feature Flags

# 3. Find problematic flag (e.g., "backend_integration")

# 4. Set rollout to 0%

# 5. Click "Save"

# ✅ Takes effect in <30 seconds
```

**No deployment needed!**

**Verify:**
```bash
# Check flag status
curl -X POST https://app.posthog.com/decide/ \
  -H "Content-Type: application/json" \
  -d '{"api_key":"YOUR_KEY","distinct_id":"test"}'
```

---

### **Rollback Type 2: Vercel Deployment Revert** (2 minutes)

**When:** Bad frontend deploy

**Steps:**
```bash
# 1. List recent deployments
cd ~/syncscript-frontend
vercel ls

# 2. Find last known-good deployment
# Example: https://syncscript-frontend-abc123.vercel.app (Ready)

# 3. Promote to production
vercel promote https://syncscript-frontend-abc123.vercel.app --yes

# ✅ Takes effect immediately

# 4. Verify
curl -I https://www.syncscript.app
```

**Time:** ~2 minutes

---

### **Rollback Type 3: Render Backend Revert** (3 minutes)

**When:** Bad backend deploy

**Steps:**
```bash
# 1. Access Render dashboard
open https://dashboard.render.com

# 2. Navigate to: syncscript-backend-1

# 3. Go to: Deploys tab

# 4. Find last successful deploy

# 5. Click "..." → "Redeploy"

# ✅ Takes effect in 2-3 minutes (cold start)

# 6. Verify
curl https://syncscript-backend-1.onrender.com/health
```

**Time:** ~3 minutes + build time

---

### **Rollback Type 4: Database Migration Rollback** (5 minutes)

**When:** Bad migration breaks queries

**Steps:**
```bash
# 1. SSH into backend or connect to DB
render ssh syncscript-backend-1

# 2. Check migration status
npm run migrate:status

# 3. Rollback last migration
npm run migrate:down

# 4. Restart backend
# (Render auto-restarts on file change)

# 5. Verify
psql $DATABASE_URL -c "SELECT * FROM tasks LIMIT 1;"
```

**Time:** ~5 minutes

---

## 📋 ROLLBACK DECISION TREE

```
Incident Detected
    ↓
Severity Assessment
    ↓
    ├─ P0 (Critical) → ROLLBACK IMMEDIATELY
    │                   ↓
    │              Execute Type 1, 2, or 3
    │                   ↓
    │              Verify Recovery
    │                   ↓
    │              Notify Team
    │
    ├─ P1 (Major) → Assess Impact
    │                ↓
    │           >20% users affected? → YES → ROLLBACK
    │                ↓
    │           NO → Monitor & Fix Forward
    │
    └─ P2/P3 (Minor) → Fix Forward
                        ↓
                   Deploy hotfix
```

---

## 🔄 ROLLBACK VERIFICATION

### **Post-Rollback Checklist**

**Within 1 Minute:**
- [ ] Service responding (curl /health)
- [ ] Error rate dropped below 1%
- [ ] Users can access site

**Within 5 Minutes:**
- [ ] Metrics back to normal
- [ ] SLOs green
- [ ] User complaints stopped
- [ ] Incident channel updated

**Within 30 Minutes:**
- [ ] Root cause identified
- [ ] Postmortem started
- [ ] Fix plan created
- [ ] Stakeholders notified

---

## 📊 ROLLBACK METRICS

### **Track Rollback Effectiveness**

```
Rollbacks This Month: 2

Rollback 1: Oct 8, 2025
  Trigger: Error rate 8%
  Type: Feature flag disable
  Time to Rollback: 45 seconds ✅
  Time to Recovery: 2 minutes ✅
  Root Cause: Auth0 token validation bug
  Prevention: Better contract tests

Rollback 2: Oct 11, 2025
  Trigger: Performance (p95 6s)
  Type: Vercel deployment revert
  Time to Rollback: 1m 30s ✅
  Time to Recovery: 3 minutes ✅
  Root Cause: Un optimized bundle
  Prevention: Bundle size limits in CI

Avg Time to Rollback: 1m 07s ✅ (target: <5min)
Avg Time to Recovery: 2m 30s ✅ (target: <10min)
```

---

## 🎯 PREVENTIVE MEASURES

### **Reduce Rollback Need:**

1. **Feature Flags** → Disable without deploy
2. **Contract Tests** → Catch breaking changes
3. **Staging Environment** → Test before production
4. **Canary Deploys** → Limit blast radius
5. **Monitoring** → Detect issues early

---

*Runbook Owner: Rollback & Shadow-Traffic Engineer*  
*Test Frequency: Quarterly Drill*  
*Last Drill: TBD*  
*Next Drill: October 20, 2025*

