# WP-ENG-01: Instantaneous Energy Recalibration (<200ms)

**Priority:** 🚨 **P0 - CRITICAL** (Blocks Primary North-Star KPI)  
**Owner:** Frontend Lead + Backend Lead  
**Effort:** 6 person-days  
**Timeline:** Week 1-2  
**Status:** Ready to Build

---

## 🎯 OBJECTIVE

Ensure energy level recalibrates **automatically** and **instantly** (<200ms) after task completion, enabling accurate energy-matched suggestions and achieving the primary KPI: **90% Energy-Matched Completion Rate**.

---

## 📊 SUCCESS METRICS

### Primary KPI
- **Energy-Matched Completion Rate:** Unknown → **90%**
  - Definition: % of completed tasks where user energy matched requirement ±1 level
  - Current: Not instrumented
  - Target: 90% (primary north-star)

### Supporting Metrics
- **Recalibration Latency:** Current: Unknown → Target: **<200ms** (p95)
- **User Perception:** "Energy updates instantly" → Target: **90% agree**
- **Suggestion Freshness:** Suggestions update with energy → Target: **100%**

---

## 👤 USER STORIES

**As a power user,**  
I want my energy to update automatically when I complete a task,  
So that my next AI suggestion matches my CURRENT energy (not yesterday's).

**As a casual user,**  
I want to see my energy number change when I finish something,  
So that I feel progress and the system feels alive/responsive.

**As a team user,**  
I want accurate energy levels throughout the day,  
So that when I plan my schedule, tasks match how I actually feel.

---

## 🔧 TECHNICAL APPROACH

### Current Implementation (Needs Audit)

**Unknown:**
- Is recalibration automatic or manual?
- What's the current latency?
- What's the algorithm?

**Action Required (Day 1):**
```javascript
// Test current implementation
const startTime = performance.now();
// Complete a task
completeTask(taskId);
// Measure when energy updates
const energyUpdateTime = performance.now();
const latency = energyUpdateTime - startTime;
console.log('Recalibration latency:', latency, 'ms');
// Document: Is it <200ms? Automatic?
```

---

### Target Implementation

**Recalibration Algorithm:**
```javascript
function recalibrateEnergy(currentEnergy, completedTask, outcome) {
  // Base calculation
  let newEnergy = currentEnergy;
  
  // Task completion impact
  if (outcome === 'success' && completedTask.energy_requirement === currentEnergy) {
    // Perfect match: Slight boost
    newEnergy += 0.3;
  } else if (outcome === 'struggle') {
    // Struggled: Slight drain
    newEnergy -= 0.3;
  }
  
  // Time-based depletion
  const hoursElapsed = (Date.now() - lastEnergyLog) / (1000 * 60 * 60);
  newEnergy -= (hoursElapsed * 0.1); // -0.1 per hour
  
  // Bounds: Keep 1-5
  newEnergy = Math.max(1, Math.min(5, newEnergy));
  
  // Round to nearest 0.5
  newEnergy = Math.round(newEnergy * 2) / 2;
  
  return newEnergy;
}
```

**Performance Optimization:**
```javascript
// Use React state update (already fast)
const handleTaskComplete = useCallback((taskId) => {
  const task = tasks.find(t => t.id === taskId);
  
  // 1. Mark task complete (optimistic update)
  setTasks(prev => prev.map(t => 
    t.id === taskId ? { ...t, completed: true } : t
  ));
  
  // 2. Recalibrate energy (synchronous, <10ms)
  const newEnergy = recalibrateEnergy(currentEnergy, task, 'success');
  setEnergy(newEnergy);
  
  // 3. Update emblem (synchronous, <10ms)
  const charge = calculateCharge(task, currentEnergy, streak);
  setEmblem(prev => ({ ...prev, charge: prev.charge + charge }));
  
  // 4. Refresh suggestions (async, non-blocking)
  refreshSuggestions(newEnergy);
  
  // 5. Persist to backend (async, fire-and-forget)
  api.completeTask(taskId, { newEnergy, charge });
  
  // Total synchronous time: <50ms
  // Total perceived time: <200ms (with UI updates)
}, [tasks, currentEnergy, streak]);
```

---

### UI Updates

**Energy Number Animation:**
```css
.energy-number {
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.energy-number.updated {
  animation: energy-pulse 500ms ease-out;
}

@keyframes energy-pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.15); color: var(--color-primary-500); }
  100% { transform: scale(1); }
}
```

**Visual Feedback:**
```javascript
// When energy updates
<AnimatePresence mode="wait">
  <motion.div
    key={energy}
    initial={{ scale: 1.15, color: 'var(--color-primary-500)' }}
    animate={{ scale: 1, color: 'var(--color-text)' }}
    transition={{ duration: 0.3 }}
  >
    {energy.toFixed(1)}⚡
  </motion.div>
</AnimatePresence>
```

---

## ✅ ACCEPTANCE CRITERIA

### Scenario 1: Task Completion with Energy Recalibration
```
GIVEN user at energy level 3.0 viewing task list
AND task "Review Q3 Report" has energy requirement 3
WHEN user clicks checkbox to complete task
THEN within 200ms:
  - Task marked complete with checkmark animation ✅
  - Energy recalibrates from 3.0 to 3.3 (slight boost for match)
  - Energy number in header animates: 3.0 → 3.3 with pulse effect
  - Emblem charge increases: +20⚡ (base for priority 4)
  - Toast appears: "Task complete! +20⚡ Energy: 3.3"
  - AI suggestions panel updates (shows energy-3 tasks at top)
AND user perceives update as "instant" (survey: 90% agree)
AND analytics event fired: { type: 'energy_recalibrated', before: 3.0, after: 3.3, latency: 87ms }
AND suggestion at top matches new energy level (3-4 range)
```

### Scenario 2: Multiple Rapid Completions
```
GIVEN user completes 3 tasks in sequence (30 seconds total)
WHEN each task is completed
THEN energy recalibrates after each:
  - Task 1 (energy 3): 3.0 → 3.3 (87ms)
  - Task 2 (energy 3): 3.3 → 3.5 (92ms)
  - Task 3 (energy 3): 3.5 → 3.7 (89ms)
AND all updates feel instant
AND performance monitoring shows p95 latency <200ms
AND no UI jank (60fps maintained)
```

### Scenario 3: Energy-Matched Completion KPI Tracking
```
GIVEN user completes task with energy requirement 4
AND user's current energy is 4 (perfect match)
WHEN task completed
THEN analytics tracks:
  - user_energy: 4
  - task_energy: 4
  - matched: true (within ±1)
  - energy_matched_completion: true
AND KPI dashboard updates showing current rate
AND after 30 days, dashboard shows: "Energy-Matched Completion: 87%"
AND trending toward 90% target
```

---

## 🧪 EXPERIMENT PLAN

See `/plans/wps/WP-ENG-01/exp.md`

**Summary:**
- **Hypothesis:** <200ms recalibration enables 90% energy-matched completion
- **Measurement:** Latency monitoring, KPI dashboard
- **Success:** p95 <200ms, KPI >85% after 30 days

---

## 📊 TELEMETRY

See `/plans/wps/WP-ENG-01/events.md`

**Key Events:**
```javascript
track('energy_recalibrated', {
  before: 3.0,
  after: 3.3,
  delta: 0.3,
  reason: 'task_completion',
  taskId: 'task-123',
  latency: 87, // ms
  matched: true
});

track('energy_matched_completion', {
  taskId: 'task-123',
  user_energy: 4,
  task_energy: 4,
  matched: true // within ±1
});
```

---

## 🚧 RISKS & MITIGATION

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Recalibration is slow (>500ms) | Medium | Critical | Profile code, optimize hot paths, use Web Workers if needed |
| Algorithm feels arbitrary | Low | High | User testing, formula transparency, adjustment based on feedback |
| Performance regression | Low | Medium | Monitor LCP/INP, optimize if needed, rollback if >10% slower |

---

## 🎯 QUALITY GATES

- [x] Intent: Primary KPI confirmed (Energy-Matched 90%)
- [x] Journey: User flows mapped with evidence
- [x] System: Technical approach defined, performance budget allocated
- [ ] Reality: Usability testing (after implementation)
- [ ] Integrity: Performance maintained, WCAG AA
- [ ] Evidence: Analytics instrumented, monitoring set up

**Approvals Required:** CEA:___ CTP:___ CPO:___

---

## 🔗 DEPENDENCIES

**Blocks:**
- WP-PERS-02 (Context-Aware AI) - Needs real-time energy

**Blocked By:**
- None (foundational feature)

---

**Status:** ✅ **READY TO BUILD**  
**Start Date:** Week 1 (Immediately)

