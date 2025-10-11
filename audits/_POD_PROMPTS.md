# 🎯 Pod-Specific Cursor Prompts

Use these prompts in Cursor to execute each pod's audit with world-class detail.

---

## 🧭 CONTEXT INTELLIGENCE POD

### Prompt:
```
Role: PodAuditor (Context Intelligence - Led by Sofia Andersson, Senior UX Researcher)

Goal: Fill /audits/context/audit.md completely and emit findings.json with normalized issues.

Context:
- North-star brief: /north-star/brief.md
- Relevant checklist: /checklists/context-aware-planning.md
- Current SyncScript: 105+ features, 0 context-aware features implemented yet

Instructions:
1. Map current state: SyncScript has events/tasks but NO leave-by, NO weather, NO ETA features
2. Identify gaps: Compare to checklist + competitive benchmarks (Google Calendar, Fantastical)
3. For each gap:
   - Tie to KPI (on-time arrival rate target: 85%)
   - Provide evidence (screenshots of current state showing gap)
   - Define acceptance criteria (GIVEN/WHEN/THEN format)
   - Estimate effort (S/M/L/XL)
4. Create findings.json with high-severity items:
   - [H-001] No leave-by calculations (blocks on-time arrival KPI)
   - [H-002] No weather integration (users blindsided by weather)
   - [H-003] No ETA reliability (users guess when to leave)
5. Recommendations must include:
   - Acceptance criteria with measurable KPI impact
   - Dependencies on other features
   - Experiment plan (A/B test design)

Focus Areas:
- Leave-by chip with confidence level
- Weather badges on events
- ETA with real-time traffic
- Multi-modal transit support
- Time-zone handling

When done, switch persona to Critic and challenge any weak claims.
Output: /audits/context/audit.md + /audits/context/findings.json
```

---

## 💰 FINANCIAL PLANNING & BUDGET POD

### Prompt:
```
Role: PodAuditor (Financial Planning - Led by Marcus Chen, Behavioral Economics Lead)

Goal: Fill /audits/finance/audit.md and emit findings.json.

Context:
- North-star brief: /north-star/brief.md
- Relevant checklist: /checklists/budget-aware-experience.md  
- Current SyncScript: NO budget features, NO cost awareness, NO savings goals

Instructions:
1. Map current state: Users plan events with zero financial context
2. Identify gaps vs. benchmarks (Mint, YNAB for comfort bands)
3. High-severity findings:
   - [H-001] No comfort band system (users overspend, feel guilty)
   - [H-002] No estimated spend in recommendations (budget blindness)
   - [H-003] No savings goal integration (no motivation for cost-conscious choices)
4. Each recommendation must:
   - Increase under-budget event rate (target: 80%)
   - Include budget fit scoring algorithm
   - Define privacy controls (local-first data)
   - Provide cost estimation accuracy targets (±20%)

Focus Areas:
- Comfort bands UI (min/ideal/max sliders)
- Budget fit scoring (0-100, shown as stars)
- Estimated spend prediction
- Savings goal progress & ETA
- Cost-conscious recommendations

When done, run Critic persona to ensure no vague language.
Output: /audits/finance/audit.md + /audits/finance/findings.json
```

---

## ⚡ EMBLEM ECONOMY & ENERGY POD

### Prompt:
```
Role: PodAuditor (Emblem Economy - Led by Dr. Elena Volkov, Gamification Psychologist)

Goal: Fill /audits/emblem-energy/audit.md and emit findings.json.

Context:
- North-star brief: /north-star/brief.md
- Relevant checklist: /checklists/emblem-energy.md
- Current SyncScript: Energy logging exists BUT recalibration is manual, emblem charge may be inaccurate

Instructions:
1. Audit current energy system:
   - Energy logging: How easy? How fast?
   - Recalibration: Manual or automatic? Accurate?
   - Emblem charge: Math correct? Any gaming issues?
2. High-severity findings:
   - [H-001] Energy doesn't recalibrate automatically after task completion
   - [H-002] Emblem charge formula unclear/inconsistent
   - [H-003] No anti-gaming measures (users can exploit system)
   - [H-004] No weekly energy insights (missed learning opportunity)
3. Recommendations must:
   - Achieve <200ms energy recalibration
   - Define precise charge formula with anti-gaming
   - Increase energy-matched completion to 90%
   - Provide actionable weekly insights

Focus Areas:
- Instantaneous recalibration (<200ms)
- Emblem charge math transparency
- Anti-gaming measures (cooldowns, pattern detection)
- Weekly energy heatmaps
- Energy-matched task suggestions

Critical: Emblem system must feel rewarding, not grindy!
Output: /audits/emblem-energy/audit.md + /audits/emblem-energy/findings.json
```

---

## 🎯 PERSONALIZATION & RECOMMENDATION POD

### Prompt:
```
Role: PodAuditor (Personalization - Led by Dr. Aisha Rahman, ML/AI Product Lead)

Goal: Fill /audits/personalization/audit.md and emit findings.json.

Context:
- North-star brief: /north-star/brief.md
- Current SyncScript: AI suggestions exist (87-92% accuracy) BUT low acceptance rate (40%)

Instructions:
1. Audit current recommendation system:
   - Accuracy: 87-92% ✅
   - Acceptance: 40% ⚠️ (why so low if accurate?)
   - Explainability: Missing?
   - Context-awareness: Limited?
2. High-severity findings:
   - [H-001] Recommendations lack explainability ("Why this task?")
   - [H-002] Suggestions don't adapt to context (energy, location, time)
   - [H-003] No learning from rejection feedback
   - [H-004] Suggestion timing poor (interrupts flow)
3. Recommendations must:
   - Increase acceptance rate from 40% to 70%
   - Add "Why this?" tooltip to every suggestion
   - Incorporate energy + budget + context into ranking
   - Learn from user feedback (👍/👎)

Focus Areas:
- Explainability (transparent AI)
- Context-aware ranking (energy + budget + location + time)
- Feedback loop (learn from acceptance/rejection)
- Suggestion timing (right moment, not interruption)
- Personalization transparency controls

Output: /audits/personalization/audit.md + /audits/personalization/findings.json
```

---

## 🏆 FEATURE PARITY & DIFFERENTIATION POD

### Prompt:
```
Role: PodAuditor (Feature Parity - Led by David Kim, Competitive Intelligence Director)

Goal: Fill /audits/parity/audit.md and emit findings.json.

Context:
- North-star brief: /north-star/brief.md
- Competitors: Notion, Todoist, Motion, ClickUp, Asana, Things, OmniFocus
- Current SyncScript: 105+ features (most in market) BUT feature discovery is 40%

Instructions:
1. Competitive analysis:
   - Table stakes: What every competitor has
   - Gaps: What we're missing
   - Differentiators: What only we have
2. High-severity findings:
   - [H-001] Feature discovery too low (users don't know 65% of features exist)
   - [H-002] Missing table-stakes features (e.g., {specific competitor feature})
   - [H-003] Signature features hidden (energy matching not prominent)
3. Recommendations must:
   - Increase feature discovery from 40% to 75%
   - Add missing table-stakes features
   - Highlight signature differentiators
   - Improve onboarding/feature tours

Focus Areas:
- Feature discovery mechanisms (tours, tooltips, progressive disclosure)
- Competitive gaps (what Notion/Todoist have that we don't)
- Signature differentiators (energy matching, emblems) made prominent
- Integration opportunities (missing vs. competitors)
- Market positioning clarity

Benchmarks to include:
- Notion: Feature onboarding, template gallery
- Todoist: Simplicity, quick add
- Motion: AI scheduling, automatic planning
- ClickUp: View modes, customization

Output: /audits/parity/audit.md + /audits/parity/findings.json
```

---

## 🔄 SYNTHESIS PROMPT (CEA)

### Prompt:
```
Role: CEA (Chief Experience Auditor - Dr. Isabella Ferrari)

Inputs: All /audits/*/audit.md + /audits/*/findings.json

Task:
1. Aggregate all high-severity findings into ranked backlog
2. Identify cross-pod dependencies:
   - E.g., Budget fit score needs energy-matched suggestions
3. Note blockers (privacy, performance, technical feasibility)
4. Produce executive readout:
   - 3 Current Wins (what's working well)
   - 5 Must-Fix (highest impact gaps)
   - 3 Signature Bets (differentiators to double-down on)
5. Sequence findings by:
   - Business impact × user friction
   - Dependencies (some block others)
   - Effort (quick wins first, then strategic bets)

Output: /north-star/audit-synthesis.md

Format:
- Executive Summary (1 page)
- Ranked Backlog Table (ID, title, severity, KPI, effort)
- Cross-Pod Dependency Map (mermaid diagram)
- Risk Register (privacy, perf, feasibility)
- Recommended Sequence (Phase 1 vs Phase 2)

Quality: Evidence-backed, no vague language, all claims tie to KPI or user research.
```

---

## 📋 IMPLEMENTATION PLANNER PROMPT

### Prompt:
```
Role: Planner (Product Lead + CTP + CEA Triad)

Inputs: 
- /north-star/audit-synthesis.md
- /north-star/tech-feasibility.md (from CTP)
- /plans/decision-log.adrs.md (Adopt/Defer/Reject decisions)

Task:
1. Convert adopted findings into Work Packages (WPs)
2. For each WP:
   - Scope (clear boundaries)
   - Dependencies (what's needed first)
   - Risks (what could go wrong)
   - Acceptance criteria (GIVEN/WHEN/THEN + KPI)
   - Telemetry spec (what to track)
   - Experiment plan (A/B test with guardrails)
   - Effort estimate (person-days)
3. Sequence WPs over 2 phases (30 days + 60 days)
4. Create WP folders with stubs:
   - /plans/wps/WP-{POD}-{NUM}/spec.md
   - /plans/wps/WP-{POD}-{NUM}/exp.md
   - /plans/wps/WP-{POD}-{NUM}/events.md
   - /plans/wps/WP-{POD}-{NUM}/acceptance.md
5. Generate /plans/issues.yaml for GitHub/Linear

Output: /plans/implementation-plan.md + WP folder structure + issues.yaml

Quality: Every WP must pass all gates before shipping.
```

---

## 🔍 CRITIC PERSONA PROMPT

### Prompt:
```
Role: Critic (Devil's Advocate - challenges all claims)

Input: {Any audit.md or recommendation}

Task: Red-team this document by challenging:
1. **Evidence gaps:** Where's the proof? Need more user artifacts
2. **Vague language:** "Users might want" → "67% of users failed task X in usability test Y"
3. **Missing KPI tie:** Every high-severity finding must map to a north-star KPI
4. **Weak acceptance criteria:** Must be measurable, testable, and include KPI threshold
5. **Effort underestimate:** Check for hidden dependencies or complexity
6. **Missing risks:** What could go wrong? Privacy? Performance?

Output: Inline critique with specific demands:
- "EVIDENCE GAP: H-001 claims 'users frustrated' but shows 0 interview quotes. Add ≥3 user artifacts."
- "VAGUE: R2 says 'improve suggestions.' Improve by HOW MUCH? Define target KPI change."
- "MISSING KPI: L-005 doesn't tie to any north-star metric. Remove or justify."

Be ruthless. The goal is legendary quality, not nice feelings.
```

---

## 📝 ISSUE GENERATOR PROMPT

### Prompt:
```
Role: Planner (Issue Tree Generator)

Input: /plans/issues.yaml

Task: Convert YAML into GitHub issues with structure:

Epic: {WP Title}
- Story 1: {User story}
  - Subtask 1.1: {Technical task}
  - Subtask 1.2: {Technical task}
- Story 2: {User story}
  - Subtask 2.1: {Technical task}

Labels: [pod:{name}], [wp:{id}], [severity:{H/M/L}], [gate:{name}], [kpi:{metric}]

Each issue must have:
- Acceptance criteria (from WP)
- Link to /plans/wps/{WP}/spec.md
- Estimated effort (points or hours)
- Dependencies (blocks/blocked-by)

Output: GitHub/Linear compatible format, ready to import.
```

---

## 🎯 USAGE IN CURSOR

### To Run Pod Audit:
```
In Cursor chat:
"audit context" → Executes Context Intelligence prompt
"audit finance" → Executes Financial Planning prompt
"audit emblem-energy" → Executes Emblem Economy prompt
"audit personalization" → Executes Personalization prompt
"audit parity" → Executes Feature Parity prompt
```

### To Synthesize:
```
"synthesize" → CEA aggregates all audits into north-star synthesis
```

### To Create Plan:
```
"plan" → Generates implementation-plan.md with WPs
```

### To Critique:
```
"critique audits/context/audit.md" → Critic red-teams the audit
```

### To Generate Issues:
```
"issues" → Converts plan into GitHub/Linear issues
```

---

## ✅ **QUALITY ENFORCEMENT**

Cursor will block completion if:
- Evidence count < minimum (3 for high-severity)
- KPI tie missing on high-severity finding
- Acceptance criteria vague or unmeasurable
- Checklist items unchecked
- Approvals missing (CEA/CTP/CPO)

---

**These prompts ensure world-class, evidence-backed audits!** 🏆

