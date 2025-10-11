# WP-ENG-01: Experiment Plan

**Hypothesis:** Instantaneous energy recalibration (<200ms) enables users to achieve 90% energy-matched completion rate by ensuring suggestions are always based on current (not stale) energy levels.

---

## 🧪 EXPERIMENT DESIGN

### Type
**Performance Validation + KPI Measurement** (not A/B test - this is core feature)

### Approach
1. **Baseline:** Measure current state (if recalibration exists)
2. **Optimize:** Ensure <200ms latency
3. **Instrument:** Track energy-matched completion KPI
4. **Validate:** 30-day measurement period
5. **Iterate:** Adjust algorithm based on data

---

## 📊 METRICS

### Primary Metric
**Energy-Matched Completion Rate**
- **Target:** ≥85% within 30 days, 90% within 60 days
- **Measurement:** Daily tracking, 7-day rolling average
- **Dashboard:** Real-time widget showing current rate

### Secondary Metrics
- **Recalibration Latency:** p50, p95, p99 (target: p95 <200ms)
- **User Perception:** Survey "Energy updates instantly" (target: 90% agree)
- **Suggestion Accuracy:** Do suggestions match NEW energy? (target: 95%)

---

## 🎯 SUCCESS CRITERIA

**Must Achieve:**
- [x] p95 latency <200ms
- [x] Energy-matched completion ≥85% within 30 days
- [x] User survey: 90% perceive as "instant"
- [x] Zero performance regression (LCP, INP maintained)

**Nice to Have:**
- p95 latency <150ms
- Energy-matched completion ≥90% within 30 days
- User delight: Quotes about "magical" instant updates

---

## 🚨 GUARDRAILS (Auto-Alert Conditions)

### Performance Guardrails
- **Alert if:** p95 latency >250ms for >24 hours
- **Action:** Optimize immediately
- **Rollback if:** p95 >500ms (unacceptable)

### KPI Guardrails
- **Alert if:** Energy-matched completion <75% after 14 days
- **Action:** Review algorithm, user testing to understand why
- **Adjust if:** Pattern suggests algorithm needs tuning

### User Experience Guardrails
- **Alert if:** User complaints >5 about "energy not updating"
- **Action:** Investigate bugs, improve visual feedback
- **Rollback if:** Critical bugs preventing core functionality

---

## 📈 MEASUREMENT PLAN

### Phase 1: Baseline (Day 1)
- Measure current recalibration latency
- Measure current energy-matched completion (if possible)
- Document: Current implementation details

### Phase 2: Optimization (Day 2-4)
- Implement optimizations
- Test latency: Aim for p95 <150ms (buffer for real-world)
- Code review: Ensure algorithm is correct

### Phase 3: Instrumentation (Day 4-5)
- Add telemetry events
- Set up real-time dashboard
- Configure alerts

### Phase 4: Validation (Day 5-6 + 30 days)
- Ship to 100% of users (core feature, not A/B)
- Monitor latency daily
- Track energy-matched completion rate
- User survey at 14 days and 30 days

---

## 📊 ANALYTICS DASHBOARD

### Real-Time Widgets

**Widget 1: Recalibration Performance**
```
Recalibration Latency (24h)
━━━━━━━━━━━━━━━━━━━━━━━━
p50: 87ms  ✅
p95: 142ms ✅
p99: 198ms ✅
Target: <200ms

[Hourly trend chart]
```

**Widget 2: Energy-Matched Completion**
```
Energy-Matched Completion Rate
━━━━━━━━━━━━━━━━━━━━━━━━
Current: 87.3% ↑
7-day avg: 85.1%
Target: 90%

████████████████░░ 87%

Trending: On track ✅
```

**Widget 3: User Perception**
```
"Energy updates instantly"
━━━━━━━━━━━━━━━━━━━━━━━━
Agree: 92% ✅
Neutral: 6%
Disagree: 2%

Survey responses: 156
```

---

## ⚠️ ROLLBACK PLAN

### Kill Switch
- Feature flag: `ENABLE_AUTO_RECALIBRATION`
- Location: Vercel Environment Variables
- Fallback: Manual energy logging only

### Rollback Triggers
1. **Performance:** p95 latency >500ms for >6 hours
2. **Bugs:** Critical bug preventing task completion
3. **KPI Drop:** Energy-matched completion <70% (worse than baseline)
4. **User Complaints:** >10 complaints in 24 hours

### Rollback Process
1. Toggle feature flag to `false`
2. Redeploy (auto: <5 minutes)
3. Notify users: "Energy auto-update temporarily disabled"
4. Debug and fix
5. Re-enable with improvements

---

## ✅ ACCEPTANCE TESTS

See `/plans/wps/WP-ENG-01/acceptance.md`

---

**Experiment Owner:** CTP (Technical Product Officer)  
**Data Analyst:** Analytics Lead  
**Approvals:** CEA:___ CTP:___ CPO:___

