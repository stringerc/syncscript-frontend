# {POD NAME} Audit

**Pod Lead:** {Name & Title}  
**Audit Date:** {Date}  
**Status:** Draft / Under Review / Approved  
**Approvals:** CEA:___ CTP:___ CPO:___

---

## 1. Scope & Jobs-To-Be-Done

### Primary Jobs
When users interact with this domain, they are trying to:
- Job 1: {specific outcome user wants}
- Job 2: {specific outcome user wants}
- Job 3: {specific outcome user wants}

### User Segments Affected
- **Primary:** {segment name} - {why they care}
- **Secondary:** {segment name} - {why they care}

### Success Metrics (from North-Star)
- **KPI 1:** {metric name} - Current: {X} → Target: {Y}
- **KPI 2:** {metric name} - Current: {X} → Target: {Y}

---

## 2. Current State (What Users See Today)

### User Flows
1. **Flow 1:** {brief description}
   - Steps: {enumerate}
   - Pain points: {observed issues}
   - Evidence: [See /evidence/flow-1-*.png]

2. **Flow 2:** {brief description}
   - Steps: {enumerate}
   - Pain points: {observed issues}
   - Evidence: [See /evidence/flow-2-*.png]

### Current Features
- ✅ Feature A: {what it does}
- ✅ Feature B: {what it does}
- ❌ Missing: {critical gap}

### Evidence Artifacts
Link all screenshots, videos, metrics to `/audits/{pod}/evidence/`
- `evidence/current-flow-*.png` - Current user journey
- `evidence/analytics-*.csv` - Usage metrics
- `evidence/user-interview-*.mp4` - User testing sessions
- `evidence/heatmap-*.png` - Interaction heatmaps

---

## 3. Gaps & Risks (Ranked by Severity)

### 🔴 HIGH SEVERITY

#### [H-001] {Gap Title}
**Impact:** {Which KPI drops, by how much, why it matters}  
**Root Cause:** {Technical/design/data reason}  
**Evidence:**
- `/evidence/gap-h001-screen.png` - Shows {what}
- `/evidence/gap-h001-metric.csv` - Proves {metric drop}
- `/evidence/gap-h001-user-quote.txt` - User said "{quote}"

**User Impact:**
- % affected: {X}%
- Friction cost: {time wasted / confusion / abandonment}
- Business impact: {revenue / churn / NPS effect}

**Ties to KPI:** {KPI name} - Currently {X}, this gap prevents reaching {target}

---

#### [H-002] {Another High-Severity Gap}
{Same structure as H-001}

---

### 🟡 MEDIUM SEVERITY

#### [M-001] {Gap Title}
**Impact:** {Description}  
**Evidence:** {Links}  
**Ties to KPI:** {KPI name}

---

### 🟢 LOW SEVERITY

#### [L-001] {Gap Title}
**Impact:** {Description}  
**Evidence:** {Links}  
**Ties to KPI:** {KPI name}

---

### ⚠️ RISKS (Privacy / A11y / Perf / Security)

#### Privacy Risk: {Title}
- **Risk:** {GDPR/CCPA concern}
- **Mitigation:** {What's needed}
- **Severity:** {H/M/L}

#### Accessibility Risk: {Title}
- **Risk:** {WCAG violation}
- **Mitigation:** {What's needed}
- **Severity:** {H/M/L}

#### Performance Risk: {Title}
- **Risk:** {CWV budget concern}
- **Mitigation:** {What's needed}
- **Severity:** {H/M/L}

---

## 4. Recommendations (Shovel-Ready)

### R1: {Recommendation Title}

**Addresses:** Gaps H-001, M-003  
**KPI Impact:** Increases {KPI} from {X} to {Y} ({Z}% improvement)

**Acceptance Criteria:**
```
GIVEN user is planning their day with energy level 3
WHEN they view task recommendations
THEN they see tasks with energy requirement 2-4 prioritized
AND the recommendation explains "Matched to your current energy"
AND accepting a task increases energy-matched completion rate by 15%
```

**Dependencies:**
- Design: Energy badge component (WP-ENG-01)
- Tech: Real-time energy sync (WP-ENG-02)
- Data: Energy preference learning (WP-PERS-05)

**Estimated Effort:** {S / M / L / XL}
- Design: {X days}
- Frontend: {X days}
- Backend: {X days}
- Testing: {X days}
- **Total:** {X person-days}

**Experiment Plan:**
- **Hypothesis:** Adding energy badges to recommendations will increase acceptance rate from 40% to 60%
- **A/B Test:** 50/50 split for 2 weeks
- **Guardrails:** If acceptance rate drops >5% OR energy-matched completion drops >2%, rollback
- **Success:** Acceptance rate >55% AND user satisfaction >4/5

**Risks:**
- {Technical risk + mitigation}
- {UX risk + mitigation}

---

### R2: {Another Recommendation}
{Same structure as R1}

---

## 5. "What Good Looks Like"

### Benchmark Examples
- **Google Calendar:** Weather integration shows icon + temp in event details
- **Fantastical:** Leave-by time with traffic warning 30min prior
- **YNAB:** Comfort band visualization (min/ideal/max)
- **Motion:** AI task scheduling with explainability

### Our Target (Better Than Benchmark)
- {How we'll exceed the benchmark}
- {Signature differentiator}
- {Unique to SyncScript}

### User Delight Moments
- "Wow, it knew I needed to leave early because of traffic!"
- "The budget fit score helped me choose the right restaurant"
- "My energy updated immediately after I finished that task"

---

## 6. Decision Needed (Review Board)

### For Each Recommendation:

| Rec ID | Title | Decision | Rationale | Phase |
|--------|-------|----------|-----------|-------|
| R1 | {Title} | Adopt / Defer / Reject | {Why} | 1 / 2 / Backlog |
| R2 | {Title} | Adopt / Defer / Reject | {Why} | 1 / 2 / Backlog |

**Decisions made by:** CPO with CEA + CTP input  
**Documented in:** /plans/decision-log.adrs.md

---

## 7. Appendix

### Research Artifacts
- User interviews: {links}
- Analytics dashboards: {links}
- Usability tests: {links}
- Competitor analysis: {links}

### Related Checklists
- /checklists/{relevant-checklist}.md

### Cross-Pod Dependencies
- Depends on {other pod}'s {finding ID}
- Blocks {other pod}'s {finding ID}

---

**Pod Lead Sign-Off:**  
**Name:** _____  
**Date:** _____  

**CEA Review:**  
**Approved:** ☐ Yes ☐ No (reason: _____)  
**Date:** _____

<!-- APPROVED: CEA:___ CTP:___ CPO:___ -->

