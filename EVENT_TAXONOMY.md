# SYNCSCRIPT EVENT TAXONOMY

> **Purpose:** Complete specification for analytics events  
> **Last Updated:** October 12, 2025  
> **Status:** 📋 SPECIFICATION (Not yet implemented)

---

## EVENT NAMING CONVENTION

**Pattern:** `{object}_{action}` (snake_case)

**Examples:**
- `task_created`
- `energy_level_updated`
- `ai_suggestion_accepted`

**Rules:**
- Use past tense for actions
- Be specific and unambiguous
- Include context in properties, not event names

---

## TIER 1: CRITICAL EVENTS (Implement First)

### User Lifecycle Events

#### `user_registered`
```json
{
  "event": "user_registered",
  "user_id": "uuid",
  "properties": {
    "signup_method": "email|google|github|sso",
    "referral_source": "organic|paid|referral|direct",
    "utm_campaign": "string",
    "timestamp": "ISO8601"
  }
}
```

**Why:** Track growth and attribution

---

#### `user_completed_onboarding`
```json
{
  "event": "user_completed_onboarding",
  "user_id": "uuid",
  "properties": {
    "steps_completed": 5,
    "total_steps": 5,
    "duration_seconds": 180,
    "skipped_steps": ["energy_intro"],
    "timestamp": "ISO8601"
  }
}
```

**Why:** Measure activation funnel

---

### Task Events

#### `task_created`
```json
{
  "event": "task_created",
  "user_id": "uuid",
  "properties": {
    "task_id": "uuid",
    "priority": 1-5,
    "energy_level": 1-5,
    "has_budget": true/false,
    "budget_amount": 0.00,
    "estimated_duration": 60,
    "source": "manual|ai_suggestion|import|template|voice",
    "category": "string",
    "has_due_date": true/false,
    "timestamp": "ISO8601"
  }
}
```

**Why:** Core engagement metric

---

#### `task_completed`
```json
{
  "event": "task_completed",
  "user_id": "uuid",
  "properties": {
    "task_id": "uuid",
    "actual_duration_minutes": 45,
    "estimated_duration_minutes": 60,
    "energy_before": 4,
    "energy_after": 3,
    "completed_during_peak_window": true,
    "peak_window_match_score": 0.85,
    "budget_under_over": "under|on|over",
    "budget_variance_percent": -10.5,
    "emblem_charge_delta": 15,
    "timestamp": "ISO8601"
  }
}
```

**Why:** North Star metric calculation

---

### Energy Events

#### `energy_level_updated`
```json
{
  "event": "energy_level_updated",
  "user_id": "uuid",
  "properties": {
    "old_level": 3,
    "new_level": 4,
    "source": "manual|auto_recalibration|ai_prediction",
    "confidence": 0.85,
    "factors": ["task_completion", "time_of_day"],
    "timestamp": "ISO8601"
  }
}
```

**Why:** Energy system effectiveness

---

#### `energy_peak_window_identified`
```json
{
  "event": "energy_peak_window_identified",
  "user_id": "uuid",
  "properties": {
    "peak_start_hour": 9,
    "peak_end_hour": 11,
    "confidence": 0.75,
    "based_on_days_data": 14,
    "timestamp": "ISO8601"
  }
}
```

**Why:** Personalization accuracy

---

### AI & Suggestion Events

#### `ai_suggestion_shown`
```json
{
  "event": "ai_suggestion_shown",
  "user_id": "uuid",
  "properties": {
    "suggestion_id": "uuid",
    "suggestion_type": "task|schedule|venue|break|reschedule",
    "ai_confidence": 0.92,
    "context_factors": ["energy_high", "budget_safe", "weather_good"],
    "position": 1,
    "total_suggestions": 5,
    "timestamp": "ISO8601"
  }
}
```

---

#### `ai_suggestion_accepted`
```json
{
  "event": "ai_suggestion_accepted",
  "user_id": "uuid",
  "properties": {
    "suggestion_id": "uuid",
    "time_to_decision_seconds": 8,
    "alternative_count": 3,
    "viewed_explanation": true,
    "timestamp": "ISO8601"
  }
}
```

---

#### `ai_explanation_viewed`
```json
{
  "event": "ai_explanation_viewed",
  "user_id": "uuid",
  "properties": {
    "feature": "smart_suggestions|energy_recalibration|budget_fit",
    "explanation_type": "why|how|alternatives|confidence",
    "depth": "summary|details|full_breakdown",
    "timestamp": "ISO8601"
  }
}
```

**Why:** Trust and transparency

---

## TIER 2: HIGH-VALUE EVENTS

### Budget Events

#### `budget_fit_calculated`
```json
{
  "event": "budget_fit_calculated",
  "user_id": "uuid",
  "properties": {
    "task_id": "uuid",
    "fit_score": 85,
    "comfort_band": "safe|stretch|over",
    "estimated_cost": 25.00,
    "budget_limit": 50.00,
    "savings_goal_impact_days": 0.5,
    "timestamp": "ISO8601"
  }
}
```

---

#### `savings_goal_progress_updated`
```json
{
  "event": "savings_goal_progress_updated",
  "user_id": "uuid",
  "properties": {
    "goal_id": "uuid",
    "amount_saved": 125.00,
    "target_amount": 2000.00,
    "days_accelerated": 3,
    "projected_completion_date": "ISO8601",
    "timestamp": "ISO8601"
  }
}
```

---

### Context Events

#### `weather_alert_shown`
```json
{
  "event": "weather_alert_shown",
  "user_id": "uuid",
  "properties": {
    "event_id": "uuid",
    "severity": "low|medium|high|severe",
    "condition": "rain|snow|extreme_heat|extreme_cold|wind",
    "lead_time_hours": 4,
    "user_action": "acknowledged|rescheduled|ignored",
    "timestamp": "ISO8601"
  }
}
```

---

#### `leave_by_nudge_shown`
```json
{
  "event": "leave_by_nudge_shown",
  "user_id": "uuid",
  "properties": {
    "event_id": "uuid",
    "leave_by_time": "ISO8601",
    "current_time": "ISO8601",
    "minutes_until_leave": 15,
    "eta_minutes": 25,
    "reliability_score": 0.85,
    "traffic_level": "light|moderate|heavy",
    "timestamp": "ISO8601"
  }
}
```

---

### Gamification Events

#### `achievement_unlocked`
```json
{
  "event": "achievement_unlocked",
  "user_id": "uuid",
  "properties": {
    "achievement_id": "first_task|week_streak|100_tasks|energy_master",
    "achievement_name": "string",
    "achievement_category": "tasks|energy|budget|team|innovation",
    "points_earned": 100,
    "total_points": 1250,
    "rarity": "common|uncommon|rare|epic|legendary",
    "timestamp": "ISO8601"
  }
}
```

---

#### `emblem_charged`
```json
{
  "event": "emblem_charged",
  "user_id": "uuid",
  "properties": {
    "emblem_id": "productivity|focus|balance|growth|mastery",
    "charge_delta": 15,
    "total_charge": 285,
    "max_charge": 1000,
    "reason": "task_completion|streak|achievement|bonus",
    "overflow": false,
    "timestamp": "ISO8601"
  }
}
```

---

#### `streak_milestone_reached`
```json
{
  "event": "streak_milestone_reached",
  "user_id": "uuid",
  "properties": {
    "streak_type": "login|task_completion|energy_logging",
    "streak_count": 7,
    "milestone_tier": "bronze|silver|gold|platinum",
    "reward_granted": "emblem_charge|achievement|bonus_points",
    "timestamp": "ISO8601"
  }
}
```

---

## TIER 3: SUPPORTING EVENTS

### Team & Collaboration

#### `team_member_invited`
```json
{
  "event": "team_member_invited",
  "user_id": "uuid",
  "properties": {
    "team_id": "uuid",
    "invitee_email": "hash",
    "role": "admin|member|viewer",
    "invitation_method": "email|link",
    "timestamp": "ISO8601"
  }
}
```

---

#### `team_goal_created`
```json
{
  "event": "team_goal_created",
  "user_id": "uuid",
  "properties": {
    "goal_id": "uuid",
    "team_id": "uuid",
    "goal_type": "tasks|budget|energy|custom",
    "target_value": 100,
    "deadline": "ISO8601",
    "team_size": 5,
    "timestamp": "ISO8601"
  }
}
```

---

### Feature Discovery

#### `feature_discovered`
```json
{
  "event": "feature_discovered",
  "user_id": "uuid",
  "properties": {
    "feature_id": "ai_coach|budget_tracker|team_workspace",
    "discovery_method": "onboarding|menu|search|suggestion|tooltip",
    "days_since_signup": 3,
    "timestamp": "ISO8601"
  }
}
```

---

#### `feature_first_use`
```json
{
  "event": "feature_first_use",
  "user_id": "uuid",
  "properties": {
    "feature_id": "string",
    "time_since_discovery_minutes": 120,
    "prompted": true/false,
    "timestamp": "ISO8601"
  }
}
```

---

## PERFORMANCE EVENTS

#### `web_vitals_measured`
```json
{
  "event": "web_vitals_measured",
  "user_id": "uuid",
  "properties": {
    "page_path": "/dashboard",
    "metric": "LCP|INP|CLS|FCP|TTFB",
    "value": 1850,
    "rating": "good|needs-improvement|poor",
    "connection": "4g|3g|2g|slow-2g",
    "device_category": "desktop|mobile|tablet",
    "timestamp": "ISO8601"
  }
}
```

---

#### `error_occurred`
```json
{
  "event": "error_occurred",
  "user_id": "uuid",
  "properties": {
    "error_type": "javascript|network|render|auth",
    "error_message": "string",
    "error_stack": "string",
    "page_path": "string",
    "browser": "string",
    "os": "string",
    "timestamp": "ISO8601"
  }
}
```

---

## CONVERSION EVENTS

#### `premium_upgrade_started`
```json
{
  "event": "premium_upgrade_started",
  "user_id": "uuid",
  "properties": {
    "plan": "starter|professional|enterprise",
    "billing_period": "monthly|annual",
    "price": 19.00,
    "discount_applied": true,
    "trial_days_remaining": 7,
    "timestamp": "ISO8601"
  }
}
```

---

#### `premium_upgrade_completed`
```json
{
  "event": "premium_upgrade_completed",
  "user_id": "uuid",
  "properties": {
    "plan": "professional",
    "billing_period": "annual",
    "amount_paid": 180.00,
    "days_since_signup": 12,
    "features_used_count": 15,
    "tasks_completed_count": 45,
    "timestamp": "ISO8601"
  }
}
```

---

## IMPLEMENTATION GUIDE

### Step 1: Choose Analytics Platform

**Options:**
- **Google Analytics 4** - Free, powerful, good for web
- **Mixpanel** - Great for product analytics, generous free tier
- **Amplitude** - Product-focused, good retention analysis
- **PostHog** - Open source, self-hostable
- **@vercel/analytics** - Simple, integrated with Vercel

**Recommendation:** Start with **@vercel/analytics** (easiest) + **Google Analytics 4** (most comprehensive)

---

### Step 2: Install Libraries

```bash
# Vercel Analytics (easiest)
npm install @vercel/analytics

# OR Google Analytics 4
npm install @next/third-parties

# OR for custom events
npm install mixpanel-browser
```

---

### Step 3: Implement Tracking

```typescript
// lib/analytics.ts
import { track } from '@vercel/analytics'

export const analytics = {
  taskCreated: (taskId: string, properties: object) => {
    track('task_created', {
      task_id: taskId,
      ...properties
    })
  },
  
  taskCompleted: (taskId: string, properties: object) => {
    track('task_completed', {
      task_id: taskId,
      ...properties
    })
  },
  
  // ... more events
}
```

---

### Step 4: Add to Components

```typescript
// In your task completion handler
import { analytics } from '@/lib/analytics'

const handleTaskComplete = async (task) => {
  // Update task
  await completeTask(task.id)
  
  // Track event
  analytics.taskCompleted(task.id, {
    actual_duration: task.duration,
    energy_before: currentEnergy,
    energy_after: newEnergy,
    completed_during_peak: isDuringPeak,
  })
}
```

---

## EVENT VALIDATION RULES

### Required Properties
- Every event MUST have: `user_id`, `timestamp`
- User properties: `user_id` (hashed for privacy)
- Timestamps: ISO8601 format with timezone

### PII Handling
- **NEVER** log: passwords, tokens, full emails, credit cards
- **HASH** before logging: emails, IP addresses
- **AGGREGATE** only: location data (city-level, not GPS)

### Data Types
- IDs: UUID strings
- Timestamps: ISO8601
- Enums: Use pipe-separated options
- Numbers: Actual values, not strings
- Booleans: true/false, not "yes"/"no"

---

## ANALYTICS DASHBOARD QUERIES

### North Star: EMTCR

```sql
SELECT 
  DATE(timestamp) as date,
  COUNT(DISTINCT CASE WHEN completed_during_peak_window = true THEN task_id END) * 100.0 / 
  COUNT(DISTINCT task_id) as emtcr_percent
FROM task_completed
WHERE timestamp >= DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY)
GROUP BY date
ORDER BY date
```

---

### Feature Adoption

```sql
SELECT 
  feature_id,
  COUNT(DISTINCT user_id) as unique_users,
  COUNT(*) as total_uses,
  COUNT(*) * 1.0 / COUNT(DISTINCT user_id) as uses_per_user
FROM feature_first_use
WHERE timestamp >= DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY)
GROUP BY feature_id
ORDER BY unique_users DESC
```

---

### AI Suggestion Acceptance

```sql
SELECT 
  suggestion_type,
  COUNT(DISTINCT suggestion_id) as total_shown,
  COUNT(DISTINCT CASE WHEN accepted THEN suggestion_id END) as total_accepted,
  COUNT(DISTINCT CASE WHEN accepted THEN suggestion_id END) * 100.0 /
  COUNT(DISTINCT suggestion_id) as acceptance_rate_percent
FROM (
  SELECT s.suggestion_id, s.suggestion_type, a.suggestion_id IS NOT NULL as accepted
  FROM ai_suggestion_shown s
  LEFT JOIN ai_suggestion_accepted a ON s.suggestion_id = a.suggestion_id
)
GROUP BY suggestion_type
```

---

## SAMPLE DASHBOARD VIEWS

### Executive View
- EMTCR (current + 30d trend)
- DAU/WAU/MAU
- Premium conversion rate
- NPS score

### Product View
- Feature adoption funnel
- Task completion rates
- AI suggestion acceptance
- Energy system usage

### Engineering View
- Core Web Vitals (p50/p75/p95)
- Error rates by type
- API latencies
- Build/deploy frequency

---

## PRIVACY & COMPLIANCE

### Data Retention
- **User events:** 25 months (regulation requirement)
- **Performance data:** 13 months
- **Error logs:** 90 days
- **PII:** Deleted on account deletion

### User Rights
- **Access:** Users can export their data
- **Deletion:** Users can delete their account + data
- **Opt-out:** Users can disable analytics
- **Transparency:** Privacy policy explains collection

### GDPR Compliance
- [ ] Cookie consent banner
- [ ] Privacy policy with data inventory
- [ ] Data processing agreements
- [ ] Right to be forgotten
- [ ] Data portability

---

## IMPLEMENTATION CHECKLIST

- [ ] Choose analytics platform
- [ ] Install tracking library
- [ ] Create analytics utility module
- [ ] Implement Tier 1 events (10 events)
- [ ] Verify events firing in console
- [ ] Create basic dashboard
- [ ] Document event catalog
- [ ] Add privacy policy
- [ ] Implement cookie consent (if EU)
- [ ] Test event accuracy
- [ ] Set up alerts for critical metrics
- [ ] Train team on analytics

---

## NEXT STEPS

**Recommended:** Implement Google Analytics 4 + Vercel Analytics

**Time Estimate:** 2-3 hours

**Files to Create/Edit:**
1. `src/lib/analytics.ts` - Analytics utility
2. `src/app/layout.tsx` - Add analytics provider
3. `src/components/*` - Add tracking calls
4. `.env.local` - Analytics API keys

**Outcome:** Full visibility into user behavior and platform performance

---

*For audit findings, see SYNCSCRIPT_LEGENDARY_AUDIT.md*
*For metric definitions, see METRIC_TREE.md*

