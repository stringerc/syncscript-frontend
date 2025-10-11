# Implementation Plan - {Phase Name}

**Phase:** {1 or 2}  
**Timeline:** {Start Date} - {End Date}  
**Status:** Draft / Active / Complete  
**Approvals:** CEA:___ CTP:___ CPO:___

---

## 📊 **OBJECTIVES & KPIs**

### North-Star Goal
**{Primary KPI}:** Increase from {X} to {Y} by {date}

### Supporting Goals
1. **{KPI 2}:** {X} → {Y}
2. **{KPI 3}:** {X} → {Y}
3. **{KPI 4}:** {X} → {Y}

### Business Impact
- **User Value:** {How users benefit}
- **Revenue Impact:** {Expected revenue change}
- **Differentiation:** {Competitive advantage}

---

## 📦 **WORK PACKAGES (WPs)**

### WP-{POD}-01: {Title}

**Owner:** {Name & Role}  
**Priority:** P0 (Must-Have) / P1 (Should-Have) / P2 (Nice-to-Have)  
**Status:** Not Started / In Progress / In Review / Shipped

**Scope:**
- What: {1-2 sentence description}
- Why: Addresses findings {ID-001, ID-002}
- Impact: Increases {KPI} by {X}%

**Dependencies:**
- Design: {What's needed}
- Tech: {What's needed}  
- Data: {What's needed}
- Blocks: {WP-XXX-YY}
- Blocked by: {WP-XXX-YY}

**Acceptance Criteria:**
```
GIVEN {context}
WHEN {action}
THEN {observable outcome}
AND {measurable KPI change}
```

**Risks:**
- **Risk 1:** {Description}
  - Mitigation: {Plan}
- **Risk 2:** {Description}
  - Mitigation: {Plan}

**Estimated Effort:** {X person-days}
- Design: {X days}
- Frontend: {X days}
- Backend: {X days}
- Testing: {X days}

**Experiment Plan:** See `/plans/wps/WP-{POD}-01/exp.md`  
**Telemetry Spec:** See `/plans/wps/WP-{POD}-01/events.md`  
**Acceptance Tests:** See `/plans/wps/WP-{POD}-01/acceptance.md`

**Gates:**
- [ ] Intent Gate: KPI confirmed
- [ ] Journey Gate: Evidence attached
- [ ] System Gate: Tokens/components ready
- [ ] Reality Gate: Usability ≥90%
- [ ] Integrity Gate: WCAG AA, CWV green
- [ ] Evidence Gate: Experiment designed

---

### WP-{POD}-02: {Title}
{Same structure as WP-01}

---

## 🗓️ **TIMELINE & CADENCE**

### Phase 1 (Weeks 1-4)
**Week 1:**
- WP-CTX-01: {Title} (Discovery + Design)
- WP-FIN-01: {Title} (Discovery + Design)

**Week 2:**
- WP-CTX-01: Implementation
- WP-FIN-01: Implementation
- WP-ENG-01: {Title} (Discovery)

**Week 3:**
- WP-CTX-01: Testing + Shiproom
- WP-FIN-01: Testing + Shiproom
- WP-ENG-01: Implementation

**Week 4:**
- WP-ENG-01: Testing + Shiproom
- WP-PERS-01: {Title} (Discovery + Implementation)

### Dual-Track Model
- **Discovery Track:** Research, design, spec
- **Delivery Track:** Build, test, ship
- **Overlap:** Discovery 1-2 weeks ahead of delivery

---

## 🧪 **TELEMETRY & EXPERIMENTS**

### Event Taxonomy
**Format:** `{domain}_{object}_{action}`

**Examples:**
```javascript
// Context
track('context_leave_by_displayed', { eventId, confidence });
track('context_eta_updated', { eventId, delta });

// Budget
track('budget_comfort_band_set', { category, ideal });
track('budget_fit_score_shown', { venue, score });

// Energy
track('energy_logged', { level, source });
track('energy_recalibrated', { before, after });
```

### Experiment Framework
- **A/B Tests:** 50/50 split, 2-week duration
- **Guardrails:** Auto-rollback if KPI drops >5%
- **Success Metrics:** Pre-defined in exp.md
- **Analysis:** Bayesian stats, >95% confidence

### Rollback Plan
- **Kill Switch:** Feature flag toggle
- **Monitoring:** Real-time dashboard
- **Criteria:** KPI drop >10% OR critical bug
- **Communication:** User notification if needed

---

## 🎯 **QUALITY GATES (Must Pass to Ship)**

### Intent Gate
- [ ] KPIs confirmed and measurable
- [ ] Success metrics aligned to north-star
- [ ] Business case approved (CPO)

### Journey Gate
- [ ] All findings have evidence (3+ artifacts for high-severity)
- [ ] User flows mapped
- [ ] Acceptance criteria defined

### System Gate
- [ ] Design tokens identified
- [ ] Components in design system
- [ ] Performance budget allocated
- [ ] Security/privacy reviewed (CTP)

### Reality Gate
- [ ] Usability test designed
- [ ] Target: ≥90% task success
- [ ] Tested with ≥5 users per segment
- [ ] Results documented

### Integrity Gate
- [ ] WCAG 2.2 AA compliance (aXe: 0 violations)
- [ ] Core Web Vitals: All "Good"
- [ ] DPIA filed (if new data collected)
- [ ] No regressions in existing KPIs

### Evidence Gate
- [ ] Experiment hypothesis stated
- [ ] Telemetry events instrumented
- [ ] Analytics dashboard created
- [ ] Rollback plan documented

---

## 👥 **TEAM & RACI**

| WP | Responsible | Accountable | Consulted | Informed |
|----|-------------|-------------|-----------|----------|
| WP-CTX-01 | Frontend Dev | CTP | CEA, Designer | CPO |
| WP-FIN-01 | Full-Stack | CTP | Data Team | CPO |
| WP-ENG-01 | Frontend Dev | CEA | CTP, UX | CPO |

**Shiproom Attendees:** CEA, CTP, CPO, WP Owner  
**Approval Required:** All 3 (CEA ✓ CTP ✓ CPO ✓)

---

## 📅 **SHIPROOM CADENCE**

### Weekly Shiproom (Every Friday)
**Agenda:**
1. Review completed WPs (gate checks)
2. Review in-progress WPs (blockers)
3. Approve next WPs to start
4. Review KPI dashboard
5. Adjust priorities if needed

**Duration:** 60 minutes  
**Output:** Go/No-Go decisions, next week assignments

---

## 📈 **SUCCESS METRICS**

### Plan Success
- **On-Time Delivery:** >80% of WPs ship on schedule
- **Quality:** 100% pass all gates
- **Impact:** KPIs trending toward targets
- **Velocity:** Avg 4-6 WPs per month

### Phase Success
- **Phase 1 (30 days):** High-severity gaps closed, KPIs improved 30%
- **Phase 2 (60 days):** Medium-severity gaps closed, KPIs improved 60%
- **Overall (90 days):** All targets met or exceeded, legendary status achieved

---

## 📚 **DOCUMENTATION REQUIREMENTS**

### Per WP
- [ ] Functional spec (/plans/wps/WP-XXX/spec.md)
- [ ] Experiment plan (/plans/wps/WP-XXX/exp.md)
- [ ] Telemetry spec (/plans/wps/WP-XXX/events.md)
- [ ] Acceptance tests (/plans/wps/WP-XXX/acceptance.md)

### Overall
- [ ] Decision log (/plans/decision-log.adrs.md)
- [ ] Issues tree (/plans/issues.yaml)
- [ ] KPI dashboard (analytics platform)
- [ ] Retrospectives (after each phase)

---

## 🔄 **ITERATION & FEEDBACK**

### Continuous Improvement
- Weekly KPI reviews
- User feedback integration
- A/B test learnings
- Performance monitoring

### Adaptation
- Defer WPs if KPIs not impacted
- Add WPs if new gaps discovered
- Re-prioritize based on user feedback
- Celebrate wins publicly

---

**Plan Approved By:**
- **CEA:** _____ (Date: _____)
- **CTP:** _____ (Date: _____)
- **CPO:** _____ (Date: _____)

<!-- PLAN-APPROVED: CEA:___ CTP:___ CPO:___ -->

