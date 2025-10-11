# WP-ENG-01: Acceptance Test Suite

**Work Package:** Instantaneous Energy Recalibration  
**Test Types:** User Acceptance + System Acceptance + Performance  
**Coverage Target:** 100% of acceptance criteria

---

## 👤 USER ACCEPTANCE TESTS (Manual)

### UAT-ENG-01-001: Basic Energy Recalibration

**Preconditions:**
- User logged in
- Current energy: 3.0
- Task list has 1 task with energy requirement 3

**Steps:**
1. Navigate to task list
2. Click checkbox on "Review Q3 Report" task
3. Observe energy number in header

**Expected Results:**
- [x] Task marked complete with checkmark animation
- [x] Energy number changes from 3.0 to 3.3 (within 200ms)
- [x] Energy number pulses/highlights briefly
- [x] Toast notification: "Task complete! +20⚡"
- [x] Energy update feels instant (no perceived delay)

**Pass Criteria:** All checkboxes checked

---

### UAT-ENG-01-002: Suggestion Updates with Energy

**Preconditions:**
- Energy: 3.0
- AI suggestions visible (showing energy-3 tasks at top)

**Steps:**
1. Complete a task (energy → 3.5)
2. Observe AI suggestions panel

**Expected Results:**
- [x] Suggestions panel updates (no manual refresh needed)
- [x] New top suggestion matches energy 3.5 (3-4 range tasks)
- [x] Previous energy-3-only tasks move down
- [x] Update happens automatically within 200ms
- [x] No full page reload

**Pass Criteria:** Suggestions stay fresh with energy

---

### UAT-ENG-01-003: Multiple Rapid Completions

**Preconditions:**
- 5 tasks in list
- Energy: 3.0

**Steps:**
1. Complete task 1 (energy → 3.2)
2. Immediately complete task 2 (energy → 3.4)
3. Immediately complete task 3 (energy → 3.6)

**Expected Results:**
- [x] Each completion recalibrates energy
- [x] All updates feel instant (no lag accumulation)
- [x] UI stays responsive (60fps, no jank)
- [x] Final energy: 3.6 (all changes applied)

**Pass Criteria:** Rapid completions don't degrade performance

---

### UAT-ENG-01-004: Energy-Matched Task Completion

**Preconditions:**
- User energy: 4.0
- Task with energy requirement: 4 (perfect match)

**Steps:**
1. Complete the energy-4 task

**Expected Results:**
- [x] Analytics tracks: energy_matched_completion (matched: true)
- [x] User feels "this was the right task for my energy"
- [x] Emblem may get bonus for perfect match

**Pass Criteria:** KPI tracking works

---

## 🤖 SYSTEM ACCEPTANCE TESTS (Automated)

### SAT-ENG-01-001: Recalibration Latency

```javascript
test('Energy recalibration completes in <200ms', async () => {
  const user = { energy: 3.0 };
  const task = { id: '123', energy_requirement: 3, priority: 4 };
  
  const startTime = performance.now();
  await completeTask(task.id);
  const endTime = performance.now();
  
  const latency = endTime - startTime;
  
  expect(latency).toBeLessThan(200);
  expect(user.energy).toBeGreaterThan(3.0); // Changed
});
```

---

### SAT-ENG-01-002: Energy Bounds (1-5)

```javascript
test('Energy stays within bounds after recalibration', () => {
  // Test lower bound
  let energy = 1.2;
  const task = { energy_requirement: 1, priority: 1 };
  energy = recalibrateEnergy(energy, task, 'struggle');
  expect(energy).toBeGreaterThanOrEqual(1.0);
  
  // Test upper bound
  energy = 4.8;
  energy = recalibrateEnergy(energy, { energy_requirement: 5, priority: 5 }, 'success');
  expect(energy).toBeLessThanOrEqual(5.0);
});
```

---

### SAT-ENG-01-003: Suggestion Updates on Energy Change

```javascript
test('Suggestions refresh when energy changes', async () => {
  const initialEnergy = 3.0;
  const suggestions = getSuggestions(initialEnergy);
  
  // Top suggestion should match energy 3
  expect(suggestions[0].energy_requirement).toBeCloseTo(3, 1);
  
  // Energy changes
  const newEnergy = 4.5;
  setEnergy(newEnergy);
  
  // Suggestions should update
  await waitFor(() => {
    const newSuggestions = getSuggestions(newEnergy);
    expect(newSuggestions[0].energy_requirement).toBeCloseTo(4.5, 1);
  });
});
```

---

### SAT-ENG-01-004: KPI Tracking Accuracy

```javascript
test('Energy-matched completion tracked correctly', async () => {
  const user = { energy: 4 };
  const task = { id: '123', energy_requirement: 4 }; // Perfect match
  
  const trackSpy = jest.spyOn(analytics, 'track');
  
  await completeTask(task.id);
  
  expect(trackSpy).toHaveBeenCalledWith('energy_matched_completion', {
    user_energy: 4,
    task_energy: 4,
    matched: true, // Within ±1
    taskId: '123'
  });
});
```

---

## ⚡ PERFORMANCE TESTS

### PERF-ENG-01-001: Recalibration Under Load

```javascript
test('Handles 1000 rapid recalibrations', async () => {
  const startTime = performance.now();
  
  for (let i = 0; i < 1000; i++) {
    recalibrateEnergy(3.0, mockTask, 'success');
  }
  
  const endTime = performance.now();
  const totalTime = endTime - startTime;
  const avgTime = totalTime / 1000;
  
  expect(avgTime).toBeLessThan(10); // <10ms per recalibration
});
```

---

### PERF-ENG-01-002: No Memory Leaks

```javascript
test('No memory leaks after 100 completions', async () => {
  const initialMemory = performance.memory.usedJSHeapSize;
  
  for (let i = 0; i < 100; i++) {
    await completeTask(`task-${i}`);
  }
  
  // Force garbage collection (if available)
  if (global.gc) global.gc();
  
  const finalMemory = performance.memory.usedJSHeapSize;
  const memoryIncrease = finalMemory - initialMemory;
  
  // Should not increase >5MB for 100 completions
  expect(memoryIncrease).toBeLessThan(5 * 1024 * 1024);
});
```

---

## ♿ ACCESSIBILITY TESTS

### A11Y-ENG-01-001: Screen Reader Announces Energy Change

**Test:**
1. Screen reader active (NVDA/VoiceOver)
2. Complete task
3. Verify announcement

**Expected:**
- [x] Screen reader announces: "Task complete. Energy updated to 3.5"
- [x] ARIA live region used (`aria-live="polite"`)
- [x] Not overly verbose

---

### A11Y-ENG-01-002: Reduced Motion Respected

**Test:**
1. Enable system setting: Reduce motion
2. Complete task
3. Observe animation

**Expected:**
- [x] Energy number updates (content changes)
- [x] No pulse animation (respects prefers-reduced-motion)
- [x] Instant replace instead of animated transition

---

## 📱 MOBILE TESTS

### MOB-ENG-01-001: Touch Interaction

**Test:**
1. On mobile device (iPhone/Android)
2. Tap task checkbox to complete

**Expected:**
- [x] Touch registers (no delay)
- [x] Visual feedback immediate
- [x] Energy updates within 200ms
- [x] No jank or frame drops

---

## 🔍 EDGE CASE TESTS

### EDGE-ENG-01-001: Offline Completion

**Test:**
1. Go offline (airplane mode)
2. Complete task

**Expected:**
- [x] Energy recalibrates locally (no API needed)
- [x] Syncs to backend when online again
- [x] No data loss

---

### EDGE-ENG-01-002: Very High/Low Energy

**Test:**
1. Energy at 1.0 (minimum)
2. Complete high-energy task with struggle

**Expected:**
- [x] Energy doesn't go below 1.0 (bounded)
- [x] System handles minimum gracefully

**Test 2:**
1. Energy at 5.0 (maximum)
2. Complete easy task with success

**Expected:**
- [x] Energy doesn't exceed 5.0 (bounded)
- [x] System handles maximum gracefully

---

## ✅ ACCEPTANCE CRITERIA VALIDATION

**All tests must pass before shiproom approval.**

**Test Coverage:**
- User Acceptance: 4 tests ✅
- System Acceptance: 4 tests ✅
- Performance: 2 tests ✅
- Accessibility: 2 tests ✅
- Mobile: 1 test ✅
- Edge Cases: 2 tests ✅

**Total:** 15 tests covering all acceptance criteria

**Status:** ☐ PASS ☐ FAIL ☐ PENDING  
**Tested By:** ___________  
**Date:** ___________

