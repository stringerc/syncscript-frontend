# WP-ENG-01: Telemetry Events Specification

**Work Package:** Instantaneous Energy Recalibration  
**Event Count:** 3 core events  
**Dashboard:** Real-time performance + KPI monitoring

---

## 📊 EVENT TAXONOMY

### Event 1: `energy_recalibrated`

**When:** After task completion, energy automatically updates

**Properties:**
```javascript
{
  event: 'energy_recalibrated',
  timestamp: '2025-10-11T14:30:22.123Z',
  user_id: 'user-abc123',
  
  // Energy change
  energy_before: 3.0,
  energy_after: 3.3,
  energy_delta: 0.3,
  
  // Trigger
  trigger: 'task_completion',
  task_id: 'task-xyz789',
  task_energy_requirement: 3,
  task_priority: 4,
  
  // Performance
  recalibration_latency_ms: 87,
  
  // Match tracking
  energy_matched: true, // task_energy === user_energy (±1)
  
  // Context
  time_of_day: '14:30',
  day_of_week: 'Tuesday'
}
```

**Usage:**
- Monitor recalibration latency (p50, p95, p99)
- Track energy-matched completion rate
- Analyze patterns (when does energy change most?)

---

### Event 2: `energy_matched_completion`

**When:** Task completed where energy matched requirement

**Properties:**
```javascript
{
  event: 'energy_matched_completion',
  timestamp: '2025-10-11T14:30:22.123Z',
  user_id: 'user-abc123',
  
  // Matching details
  task_id: 'task-xyz789',
  user_energy: 4.0,
  task_energy_requirement: 4,
  energy_delta: 0, // Perfect match
  matched: true, // within ±1
  
  // Task details
  task_priority: 4,
  task_completed_successfully: true,
  time_to_complete_minutes: 45,
  
  // Suggestion source
  suggestion_source: 'ai' | 'user_created' | 'imported'
}
```

**Usage:**
- **PRIMARY KPI:** Calculate energy-matched completion rate
- Goal: 90% of completions have matched=true
- Trend: Daily/weekly/monthly aggregation

---

### Event 3: `suggestion_updated_on_energy_change`

**When:** AI suggestions refresh after energy changes

**Properties:**
```javascript
{
  event: 'suggestion_updated_on_energy_change',
  timestamp: '2025-10-11T14:30:22.200Z',
  user_id: 'user-abc123',
  
  // Energy context
  new_energy: 3.3,
  previous_energy: 3.0,
  
  // Suggestion changes
  previous_top_suggestion: 'task-abc',
  new_top_suggestion: 'task-def',
  suggestions_reranked: true,
  
  // Performance
  rerank_latency_ms: 45
}
```

**Usage:**
- Verify suggestions stay fresh (update with energy)
- Monitor reranking performance
- Validate context-awareness

---

## 📈 DASHBOARDS

### Dashboard 1: Recalibration Performance (Real-Time)

**Widgets:**
1. Latency trend (24h, 7d, 30d)
2. p50/p95/p99 current values
3. Alert status
4. Event volume (recalibrations per hour)

**Alerts:**
- p95 >200ms for >1 hour → Slack alert
- p99 >500ms ever → Page engineer

---

### Dashboard 2: Energy-Matched Completion KPI

**Widgets:**
1. Current rate (real-time)
2. 7-day rolling average
3. Trend toward 90% target
4. Breakdown by:
   - Energy level (is energy 1 harder to match?)
   - Task type
   - Time of day
   - User segment

**Goal Tracking:**
- Green: ≥85% (on track for 90%)
- Yellow: 75-84% (needs attention)
- Red: <75% (investigate immediately)

---

### Dashboard 3: User Perception

**Survey (In-App, After 14 Days):**
```
Quick question about energy updates:

When you complete a task, does your energy 
level update instantly?

○ Yes, feels instant ✅
○ Somewhat, but I notice a delay
○ No, it's slow or doesn't happen
○ Not sure / Don't use this feature

[Submit]
```

**Target:** 90% "Yes, feels instant"

---

## 🔔 ALERT CONFIGURATION

### Performance Alerts

**Critical (Page Engineer):**
- p95 latency >500ms for >30 minutes
- Recalibration failing (error rate >5%)
- Dashboard shows no events for >1 hour (tracking broken)

**Warning (Slack Alert):**
- p95 latency >200ms for >1 hour
- p99 latency >300ms
- Event volume drops >50% (potential bug)

### KPI Alerts

**Warning:**
- Energy-matched completion <80% after 14 days
- Downward trend for 3+ consecutive days
- User survey: <80% perceive as instant

**Action Required:**
- Review algorithm
- User testing (why not matching?)
- Performance optimization

---

## 📝 DATA RETENTION

- **Real-time data:** 7 days
- **Aggregated data:** 90 days
- **KPI metrics:** 1 year
- **User surveys:** Indefinite (anonymized)

---

**Events Defined:** 3  
**Dashboards Designed:** 3  
**Alerts Configured:** 6  
**Status:** ✅ **Ready for Implementation**

