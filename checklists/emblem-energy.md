# ✅ Emblem Economy & Energy Checklist
**Domain:** Gamification & Energy System  
**Version:** 1.0  
**Purpose:** Ensure world-class energy matching and emblem mechanics

---

## ⚡ **RPE (RATE OF PERCEIVED EXERTION) CAPTURE**

### Core Functionality
- [ ] User can log energy level 1-5 anytime
- [ ] Visual scale clear: 1 (exhausted) → 5 (energized)
- [ ] Quick access: FAB, header widget, voice command
- [ ] Prompts at key moments:
  - [ ] Morning (daily energy baseline)
  - [ ] After task completion
  - [ ] Before energy-intensive tasks
  - [ ] When energy significantly changed (detected)
- [ ] Historical energy visible (chart over time)

### UI/UX Requirements
- [ ] Energy picker: Large, tappable buttons (1-5)
- [ ] Visual feedback: Emoji/color for each level
- [ ] One-tap logging (no confirmation needed)
- [ ] Toast confirms: "Energy logged as 3 ⚡"
- [ ] Undo option (5 seconds)
- [ ] Works offline

### Timing
- [ ] Energy log takes <2 seconds start to finish
- [ ] No multi-step process
- [ ] Available from any screen
- [ ] Keyboard shortcut: E key opens energy picker

---

## 🔄 **INSTANTANEOUS ENERGY RECALIBRATION**

### Core Functionality
- [ ] Completing a task updates user's energy instantly
- [ ] Recalibration based on:
  - [ ] Task energy requirement
  - [ ] Task outcome (success/struggle)
  - [ ] Time spent vs. estimated
  - [ ] User's feedback (if provided)
- [ ] New energy level calculated <200ms
- [ ] Next task suggestions update immediately

### Recalibration Math
```
Energy After = min(5, max(1, 
  Current Energy 
  + (Task Outcome Bonus: ±0.5)
  + (Flow State Bonus: +0.5 if completed quickly)
  - (Struggle Penalty: -0.5 if took 2x estimated time)
  - (Depletion: -0.2 per 30min elapsed)
))
```

### UI/UX Requirements
- [ ] Energy change animated (e.g., 3 → 4)
- [ ] Explanation shown: "Task boosted your energy +1"
- [ ] Emblem charge also updates (linked)
- [ ] Feels instant (<200ms total)
- [ ] Works even offline (syncs later)

### Validation
- [ ] Recalibration accurate within ±0.5 for 90% of completions
- [ ] Users trust the recalibration (survey: >80% agree "feels right")
- [ ] No gaming detected (e.g., marking easy tasks to boost energy)

---

## 🏆 **EMBLEM CHARGE MATH & ANTI-GAMING**

### Core Functionality
- [ ] Completing tasks charges emblem by amount based on:
  - [ ] Task priority (1-5)
  - [ ] Task energy requirement (1-5)
  - [ ] Streak multiplier (1x - 3x)
  - [ ] Perfect match bonus (+20% if energy matched)
- [ ] Emblem levels up at thresholds (100, 250, 500, 1000 charge)
- [ ] Visual progress: Charge bar fills, particle effects on completion

### Charge Formula
```
Charge = (
  Base: Priority × 10
  + Energy Match: Requirement × 5
  + Streak Bonus: Current_Streak × 2
  + Perfect Match: +20% if user_energy == requirement
  - Gaming Penalty: -50% if suspicious pattern detected
)
```

### Anti-Gaming Measures
- [ ] Rapid-fire completions (<30s apart): Reduced charge
- [ ] Suspiciously easy tasks (always energy 1): Capped charge
- [ ] Pattern detection: Multiple undo/redo: Flagged
- [ ] Cooldown: Max 10 charges per 5min (prevents spam)
- [ ] Audit trail: All charge events logged for review

### UI/UX Requirements
- [ ] Charge amount shown on completion: "+25⚡ (Level 7: 487/500)"
- [ ] Visual celebration: Particle burst, emblem glows
- [ ] Level-up animation when threshold crossed
- [ ] Emblem visible in header (always)
- [ ] Tap emblem to see:
  - [ ] Current level + next threshold
  - [ ] Charge breakdown (this week)
  - [ ] Comparison to last week

---

## 📈 **WEEKLY ENERGY INSIGHTS**

### Core Functionality
- [ ] Weekly summary every Sunday evening
- [ ] Insights include:
  - [ ] Energy patterns (best time of day: 10am-12pm)
  - [ ] Completion rate by energy level
  - [ ] Energy-matched vs mismatched completions
  - [ ] Productivity score (energy-matched completion rate)
  - [ ] Recommendations for next week
- [ ] Visual: Energy heatmap (day × hour grid)

### UI/UX Requirements
- [ ] Weekly review modal (dismissible)
- [ ] Also accessible from Analytics
- [ ] Shareable image (social proof)
- [ ] Actionable insights: "Schedule high-energy tasks at 10am"
- [ ] Historical comparison: Better/worse than last week

### Privacy
- [ ] Insights stay on device
- [ ] User controls sharing
- [ ] Can disable weekly summaries

---

## 🎯 **ENERGY-MATCHED TASK SUGGESTIONS**

### Core Functionality
- [ ] AI suggests tasks based on current energy
- [ ] Energy 1-2: Suggests low-energy tasks (email, reading)
- [ ] Energy 3: Suggests medium tasks (meetings, planning)
- [ ] Energy 4-5: Suggests high-energy tasks (coding, creative work)
- [ ] Re-suggests when energy changes
- [ ] Learns from user acceptance/rejection

### Suggestion Quality
- [ ] Accuracy: >80% of accepted suggestions match energy
- [ ] Relevance: >70% of suggestions are due today/urgent
- [ ] Diversity: Not just easy tasks when low energy
- [ ] Timing: Refreshes every 30min OR on energy change

### UI/UX Requirements
- [ ] Suggestions shown prominently on dashboard
- [ ] Energy match badge: "Matched to your energy 3"
- [ ] Explain why: "You have medium energy, this task needs medium effort"
- [ ] One-tap accept
- [ ] One-tap reject (with reason: "Not now", "Wrong energy", "Not relevant")
- [ ] Feedback improves future suggestions

---

## 🔒 **PRIVACY & DATA**

### Energy Data
- [ ] Energy logs stored locally (primary)
- [ ] Optional cloud sync (encrypted)
- [ ] User can view all energy history
- [ ] User can delete energy history
- [ ] Export to CSV

### Emblem Data
- [ ] Emblem progress visible
- [ ] Charge history transparent
- [ ] No monetization of emblem system
- [ ] Can't buy levels (earn only)

### Transparency
- [ ] Charge math explained in help docs
- [ ] Anti-gaming rules disclosed
- [ ] Privacy policy clear about energy data

---

## ♿ **ACCESSIBILITY**

### Screen Reader
- [ ] Energy level announced: "Energy level 3 of 5, medium energy"
- [ ] Emblem charge announced: "Task completed, plus 25 charge, level 7, 487 of 500"
- [ ] Weekly insights readable by screen reader
- [ ] Energy picker navigable via keyboard

### Visual
- [ ] Energy levels not color-only (use emoji + text)
- [ ] Emblem progress bar has text percentage
- [ ] High contrast support
- [ ] Charge animations respect prefers-reduced-motion

### Cognitive
- [ ] Energy scale simple (1-5, not 1-10)
- [ ] Emblem levels visible and understandable
- [ ] No complex math required from user
- [ ] Consistent terminology

---

## 📱 **MOBILE OPTIMIZATION**

### Touch Targets
- [ ] Energy buttons: 56px × 56px (extra large for quick logging)
- [ ] Emblem tap target: ≥44px
- [ ] Suggestion accept/reject: ≥44px

### Performance
- [ ] Energy log: <100ms
- [ ] Emblem charge animation: 60fps
- [ ] Recalibration: <200ms
- [ ] Weekly insights: <1s load

### Offline
- [ ] Energy logging works 100% offline
- [ ] Emblem charge calculated offline
- [ ] Syncs when online
- [ ] No data loss

---

## 📊 **METRICS & KPIs**

### Primary KPIs
- **Energy-Matched Completion Rate:** >90%
  - Definition: % tasks completed where user energy matched requirement (±1 level)
  - Current: Unknown
  - Target: 90%

- **Emblem Engagement:** >60% daily active use
  - Definition: % of DAU who interact with emblem system daily
  - Current: Unknown
  - Target: 60%

### Supporting Metrics
- **Energy Log Frequency:** >1.5 logs/day per user
- **Recalibration Accuracy:** ±0.5 energy level for 90% of completions
- **Anti-Gaming Flags:** <2% of charge events flagged
- **Weekly Insights Engagement:** >40% open weekly summary
- **Suggestion Acceptance (Energy-Matched):** >70%

### Instrumentation
```javascript
track('energy_logged', { level, source, previousLevel, timeSinceLast });
track('energy_recalibrated', { before, after, reason, taskId });
track('emblem_charged', { amount, newTotal, level, multipliers });
track('emblem_level_up', { fromLevel, toLevel, timestamp });
track('weekly_insights_viewed', { week, energyPatterns });
track('energy_suggestion_shown', { taskId, userEnergy, taskEnergy, fitScore });
track('energy_suggestion_accepted', { taskId, matched: boolean });
track('anti_gaming_triggered', { pattern, userId, action });
```

---

## ✅ **ACCEPTANCE CRITERIA**

### Scenario: Energy Logging & Recalibration
```
GIVEN user completes a medium-energy task (requirement: 3)
WHEN they mark it complete
THEN energy recalibrates from 3 to 3.5 within 200ms
AND emblem gains +20 charge with visual celebration
AND next task suggestion updates to match new energy 3.5
AND suggestion is accepted
AND energy-matched completion rate increases by 1%
```

### Scenario: Perfect Energy Match Bonus
```
GIVEN user has energy level 4
WHEN they complete a task with energy requirement 4
THEN emblem charge includes +20% perfect match bonus
AND toast shows "Perfect match! +30⚡ (bonus: +5)"
AND user feels rewarded for good task choice
AND repeat match rate increases by 15%
```

### Scenario: Weekly Energy Insights
```
GIVEN user has logged energy for 7 days
WHEN Sunday 8pm arrives
THEN weekly summary modal appears
AND shows energy heatmap revealing "Best productivity: Tuesdays 10am-12pm"
AND suggests "Schedule high-energy tasks on Tuesday mornings"
AND user reschedules next week accordingly
AND energy-matched completion rate increases by 8%
```

---

## 🚫 **FAILURE CONDITIONS**

- Energy recalibration feels arbitrary or wrong (user trust <70%)
- Emblem system feels grindy or pay-to-win
- Gaming detected in >5% of charge events
- Energy logging too slow (>2s) or too many steps
- Weekly insights not actionable
- Performance impact (jank, slowness)

---

## ✅ **SUCCESS CONDITIONS**

- All checkboxes checked ✓
- Energy-matched completion rate >85% ✓
- Emblem engagement >60% DAU ✓
- User testing: 90% trust recalibration ✓
- User testing: 85% find insights helpful ✓
- Anti-gaming: <2% flagged events ✓
- Performance: All actions <200ms ✓
- CEA + CTP + CPO approve ✓

---

**Status:** ☐ PASS ☐ FAIL ☐ PENDING  
**Validated By:** ___________  
**Date:** ___________

<!-- CHECKLIST: CEA:___ CTP:___ CPO:___ -->

