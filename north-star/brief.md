# SyncScript North-Star Brief
## Project: Legendary UX Audit & Implementation

**Date:** October 11, 2025  
**Status:** Phase A - Audit Sprint Kickoff  
**Owner:** CPO (Chief Product Officer)

---

## Vision

Transform SyncScript from a feature-rich productivity platform into the world's most **intuitive, context-aware, energy-matched productivity companion** that users can't imagine living without.

---

## Strategic Goals

### Primary (Next 90 Days)
1. **Achieve energy-matched completion dominance** - users complete tasks matched to their energy 90% of the time
2. **Become context-aware** - users never miss events due to traffic/weather/timing
3. **Enable budget-conscious planning** - users stay under budget 80% of the time
4. **Perfect energy recalibration** - completing a task instantly and accurately updates user energy

### Secondary (Supporting)
5. **Increase feature discovery** from 40% to 75%
6. **Maintain accessibility leadership** (WCAG 2.1 AA → WCAG 2.2 AA)
7. **Achieve industry-best performance** (maintain 96+ Lighthouse score)

---

## North-Star KPIs

### Primary Metric
**Energy-Matched Completion Rate**
- **Current:** Unknown (not instrumented)
- **Target:** 90% by Q1 2026
- **Definition:** % of completed tasks where user's logged energy matched the task's energy requirement (±1 level)

### Supporting Metrics

| KPI | Current | Target (90d) | Measurement |
|-----|---------|--------------|-------------|
| **On-Time Arrival Rate** | N/A | 85% | % of events where user arrived within planned time window |
| **Under-Budget Event Rate** | N/A | 80% | % of events/purchases that stayed within user's comfort band |
| **Emblem Charge Accuracy** | Unknown | ±5% | % accuracy of emblem charge calculation from task completion |
| **Recommendation Acceptance** | ~40% | 70% | % of AI suggestions user acts on |
| **Feature Discovery Rate** | 40% | 75% | % of users who use 10+ features in first 30 days |
| **WCAG Compliance** | AA | 2.2 AA | Accessibility audit score |
| **Lighthouse Score** | 96/100 | 98/100 | Performance/A11y/Best Practices/SEO |
| **LCP (Largest Contentful Paint)** | 1.4s | <1.2s | Core Web Vital |
| **INP (Interaction to Next Paint)** | Unknown | <200ms | Core Web Vital |
| **CLS (Cumulative Layout Shift)** | Unknown | <0.1 | Core Web Vital |

---

## Scope

### In Scope (Must Audit)

#### Context Intelligence
- Leave-by calculations & ETA reliability
- Weather/traffic impact on events
- Transit/route optimization
- Offline-first reliability
- Time-zone handling

#### Financial Planning & Budget
- Comfort bands (min/ideal/max spend)
- Estimated spend prediction
- Budget fit scoring for recommendations
- Savings goal progress tracking
- Cost-conscious event planning

#### Emblem Economy & Energy
- RPE (Rate of Perceived Exertion) capture
- Instantaneous energy recalibration from completion
- Emblem charge math accuracy & anti-gaming
- Weekly energy insights & patterns
- Energy-matched task suggestions

#### Personalization & Recommendations
- AI suggestion relevance & timing
- Context-aware recommendations
- Learning from user behavior
- Personalization transparency ("why this?")
- Recommendation explainability

#### Feature Parity & Differentiation
- Competitive gap analysis vs. Notion/Todoist/Motion/ClickUp
- Signature differentiators (energy matching, emblems)
- Integration opportunities (Slack, GitHub, Google Calendar)
- Market positioning & messaging
- Feature discoverability

### Out of Scope (Defer)
- Backend infrastructure changes (unless blocking)
- Database migrations (unless required for new features)
- Marketing website redesign
- Mobile native app (focus on PWA for now)
- API v3 (v2 is sufficient)

---

## Success Metrics (Audit Phase)

### Audit Completeness
- ✅ All 5 pods submitted audit.md + findings.json
- ✅ Minimum 3 evidence artifacts per high-severity finding
- ✅ All high-severity findings tie to a north-star KPI
- ✅ All recommendations have acceptance criteria

### Audit Quality
- ✅ CEA approves audit synthesis
- ✅ CTP confirms technical feasibility
- ✅ CPO confirms scope alignment
- ✅ Critic persona challenges passed

### Audit Output
- ✅ Unified north-star/audit-synthesis.md with ranked backlog
- ✅ Clear Adopt/Defer/Reject decisions
- ✅ Sequenced implementation plan with Work Packages
- ✅ Generated issue tree ready for development

---

## User Segments (Prioritization)

### Tier 1 (Primary Focus)
1. **Solo Power Users** - 45% of MAU, highest engagement
   - Uses 15+ features regularly
   - Energy logs daily
   - Wants maximum productivity
   
2. **Team Collaborators** - 30% of MAU, highest revenue
   - Uses team features
   - Pays for Pro/Team plans
   - Needs reliability & integrations

### Tier 2 (Secondary)
3. **Casual Users** - 20% of MAU
   - Uses basic task management
   - Energy logs occasionally
   - Needs simplicity

### Tier 3 (Monitor)
4. **Trial Users** - 5% of MAU
   - Evaluating product
   - High churn risk
   - Needs quick wins

---

## Jobs-To-Be-Done (Core)

### When I...
1. **Plan my day** → I want to know **which tasks match my energy** so I feel productive and accomplished
2. **Add an event** → I want to know **when to leave and what might delay me** so I arrive on time
3. **Plan an outing** → I want to know **estimated cost and budget fit** so I stay financially comfortable
4. **Complete a task** → I want my **energy to update instantly** so the next suggestion is accurate
5. **See AI suggestions** → I want to know **why it's suggested** so I trust the recommendation

---

## Constraints & Guardrails

### Must Not Regress
- ✅ Accessibility (WCAG 2.1 AA minimum)
- ✅ Performance (Lighthouse 96+ minimum)
- ✅ Mobile experience (95/100 minimum)
- ✅ Security (JWT auth, rate limiting)
- ✅ Privacy (GDPR/CCPA compliance)

### Technical Constraints
- Frontend bundle size: <300KB initial load
- API response time: <500ms p95
- Database queries: <100ms p95
- Real-time updates: <1s latency
- Offline support: All core features must work offline

### Resource Constraints
- Audit phase: 8 days (Oct 11-18)
- Implementation Phase 1: 30 days (Oct 19 - Nov 18)
- Implementation Phase 2: 60 days (Nov 19 - Jan 18)
- Team: Existing resources + AI acceleration

---

## Decision Authority (RACI)

| Domain | Responsible | Accountable | Consulted | Informed |
|--------|-------------|-------------|-----------|----------|
| Audit Quality | Pod Auditors | CEA | CTP, CPO | Team |
| Technical Feasibility | CTP | CTP | CEA, Dev Team | CPO |
| Scope & Priorities | CPO | CPO | CEA, CTP | Team |
| Implementation Plan | Planner | CPO | CEA, CTP | Team |
| Experiment Design | Planner | CEA | CTP, Data Team | CPO |
| Gate Approval | CEA, CTP, CPO | CPO | Pod Leads | Team |

**No merge without:** CEA ✓ + CTP ✓ + CPO ✓

---

## Timeline

### Phase A: Audit Sprint (Oct 11-18)
- **Day 0-2:** Setup + Kickoff
- **Day 3-7:** Pod audits (parallel)
- **Day 8:** Synthesis
- **Quality gate:** All audits complete with evidence

### Phase B: Review & Planning (Oct 19-25)
- **Day 9-10:** Review Board
- **Day 11-13:** Implementation Plan
- **Day 14+:** Issue generation
- **Quality gate:** Sequenced WPs with acceptance tests

### Phase C: Implementation Wave 1 (Oct 26 - Nov 18)
- **Focus:** High-severity, high-impact wins
- **Cadence:** Weekly shiproom reviews
- **Quality gate:** All gates pass per WP

### Phase D: Implementation Wave 2 (Nov 19 - Jan 18)
- **Focus:** Medium-severity, differentiators
- **Cadence:** Bi-weekly shiproom reviews
- **Quality gate:** All KPIs trending toward targets

---

## Risks & Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Audits lack evidence | Medium | High | Enforce evidence minimums, Critic persona |
| Scope creep | High | High | CPO must Defer/Reject ruthlessly |
| Technical blockers | Medium | High | CTP feasibility review on Day 8 |
| User research gaps | Medium | Medium | Use existing analytics + quick usability tests |
| Implementation delays | Medium | Medium | Dual-track (Discovery + Delivery) |

---

## Communication Cadence

- **Daily:** Pod standups (async updates)
- **Day 8:** Synthesis review (CEA presents)
- **Day 10:** Review Board (Adopt/Defer/Reject decisions)
- **Weekly (Phase C/D):** Shiproom (gate reviews)
- **Bi-weekly:** KPI dashboard reviews

---

## Success Definition

**This audit succeeds when:**
1. We have a ranked, evidence-backed backlog of UX gaps
2. Every gap ties to a measurable KPI
3. We have a sequenced implementation plan with acceptance tests
4. The first 5 Work Packages are ready to ship
5. All stakeholders (CEA, CTP, CPO) approve

**Implementation succeeds when:**
1. Energy-matched completion rate > 85% (target 90%)
2. On-time arrival rate > 80% (target 85%)
3. Under-budget event rate > 75% (target 80%)
4. All gates pass for shipped WPs
5. No regressions in accessibility, performance, or security

---

## Appendix: Competitive Benchmarks

### Context Awareness
- **Google Calendar:** Traffic warnings 30min before
- **Fantastical:** Weather integration
- **Target:** Match or exceed with energy-aware leave-by

### Financial Planning
- **Mint:** Budget tracking
- **YNAB:** Comfort bands (min/goal/max)
- **Target:** First productivity app with budget-aware recommendations

### Energy/Productivity
- **Motion:** AI task scheduling
- **Todoist:** Priority levels
- **Target:** Only app with real-time energy matching

### Gamification
- **Habitica:** RPG elements
- **Streaks:** Achievement tracking
- **Target:** Emblem system as signature differentiator

---

**Approved by:**  
**CPO:** _____ (initials)  
**Date:** October 11, 2025

---

**Next Step:** Assign pods and begin Day 3-7 audits. 🚀

