# ANALYTICS IMPLEMENTATION GUIDE

> **Status:** ✅ INSTALLED & CONFIGURED  
> **Provider:** Vercel Analytics + Speed Insights  
> **Web Vitals:** Automatic tracking enabled  
> **Page Views:** Automatic tracking enabled  
> **Errors:** Automatic tracking enabled

---

## WHAT'S ALREADY WORKING

### Automatic Tracking (No Code Required)

✅ **Page Views** - Every page navigation tracked  
✅ **Core Web Vitals** - LCP, INP, CLS, FCP, TTFB  
✅ **JavaScript Errors** - Caught and logged  
✅ **Promise Rejections** - Unhandled promises tracked  
✅ **Speed Insights** - Real user performance data

---

## HOW TO ADD EVENT TRACKING

### Step 1: Import the Analytics Module

```typescript
import { analytics } from '@/lib/analytics'
```

### Step 2: Call Methods When Events Occur

```typescript
// Example: Track task creation
const handleCreateTask = async (task) => {
  // Create the task
  const newTask = await createTask(task)
  
  // Track it
  analytics.taskCreated(
    userId,
    newTask.id,
    {
      priority: task.priority,
      energyLevel: task.energy_level,
      hasBudget: !!task.budget,
      estimatedDuration: task.estimated_duration,
      source: 'manual'
    }
  )
}
```

---

## AVAILABLE ANALYTICS METHODS

### User Lifecycle

```typescript
// User registration
analytics.userRegistered(userId, 'email', 'organic')

// Onboarding completion
analytics.userCompletedOnboarding(userId, 5, 180)
```

### Task Events

```typescript
// Task created
analytics.taskCreated(userId, taskId, {
  priority: 3,
  energyLevel: 4,
  hasBudget: true,
  estimatedDuration: 60,
  source: 'manual'
})

// Task completed
analytics.taskCompleted(userId, taskId, {
  actualDuration: 45,
  energyBefore: 4,
  energyAfter: 3,
  completedDuringPeak: true,
  budgetVariance: -10
})
```

### Energy Events

```typescript
// Energy level updated
analytics.energyLevelUpdated(userId, 3, 4, 'manual', 1.0)

// With auto-recalibration
analytics.energyLevelUpdated(userId, oldLevel, newLevel, 'auto_recalibration', 0.85)
```

### AI Events

```typescript
// AI suggestion shown
analytics.aiSuggestionShown(
  userId,
  suggestionId,
  'task',
  0.92,
  ['energy_high', 'budget_safe', 'weather_good']
)

// User accepted suggestion
analytics.aiSuggestionAccepted(userId, suggestionId, 8)

// User viewed explanation
analytics.aiExplanationViewed(userId, 'smart_suggestions', 'why')
```

### Budget Events

```typescript
// Budget fit calculated
analytics.budgetFitCalculated(userId, taskId, 85, 'safe')

// Savings goal updated
analytics.savingsGoalUpdated(userId, goalId, 125.50, 3)
```

### Gamification Events

```typescript
// Achievement unlocked
analytics.achievementUnlocked(userId, 'first_task', 'First Task', 100)

// Emblem charged
analytics.emblemCharged(userId, 'productivity', 15, 285, 'task_completion')

// Streak milestone
analytics.streakMilestone(userId, 'login', 7)
```

### Feature Usage

```typescript
// Feature discovered
analytics.featureDiscovered(userId, 'ai_coach', 'menu')

// Feature first use
analytics.featureFirstUse(userId, 'budget_tracker')
```

### Conversion Events

```typescript
// Premium upgrade started
analytics.premiumUpgradeStarted(userId, 'professional', 'annual')

// Premium upgrade completed
analytics.premiumUpgradeCompleted(userId, 'professional', 180.00)
```

### Custom Events

```typescript
// Any custom event
analytics.custom('custom_event_name', {
  property1: 'value',
  property2: 123,
  property3: true
})
```

---

## WHERE TO ADD TRACKING

### High Priority (Add First)

1. **Task Creation** (`CreateTaskModal.tsx`)
   ```typescript
   analytics.taskCreated(userId, task.id, { ... })
   ```

2. **Task Completion** (`TaskList.tsx`, `dashboard.tsx`)
   ```typescript
   analytics.taskCompleted(userId, task.id, { ... })
   ```

3. **Energy Updates** (`Energy components`)
   ```typescript
   analytics.energyLevelUpdated(userId, old, new, source)
   ```

4. **AI Suggestions** (`SmartSuggestions.tsx`)
   ```typescript
   analytics.aiSuggestionShown(...)
   analytics.aiSuggestionAccepted(...)
   ```

5. **User Registration** (`/register` page)
   ```typescript
   analytics.userRegistered(userId, method, source)
   ```

### Medium Priority

6. Budget interactions
7. Achievement unlocks
8. Feature discovery
9. Team actions
10. Premium upgrades

### Low Priority

11. Settings changes
12. Theme switches
13. Minor interactions

---

## EXAMPLE IMPLEMENTATIONS

### Example 1: Track Task Completion

```typescript
// In your task completion handler
const handleToggleComplete = async (taskId: string) => {
  const startTime = Date.now()
  
  // Get current energy
  const energyBefore = getCurrentEnergyLevel()
  
  // Complete the task
  await completeTask(taskId)
  
  // Calculate new energy
  const energyAfter = recalculateEnergy()
  const duration = Date.now() - startTime
  
  // Track it!
  analytics.taskCompleted(userId, taskId, {
    actualDuration: duration / 1000 / 60, // Convert to minutes
    energyBefore,
    energyAfter,
    completedDuringPeak: isCurrentlyPeakWindow(),
    budgetVariance: calculateBudgetVariance(taskId)
  })
  
  // Show success toast
  toast.success('Task completed!')
}
```

---

### Example 2: Track AI Suggestion Acceptance

```typescript
// In SmartSuggestions.tsx
const handleAcceptSuggestion = (suggestion: Suggestion) => {
  const timeToDecision = Date.now() - suggestion.shownAt
  
  // Track acceptance
  analytics.aiSuggestionAccepted(
    userId,
    suggestion.id,
    timeToDecision / 1000 // Convert to seconds
  )
  
  // Add task
  addTaskFromSuggestion(suggestion)
}

// When showing suggestions
useEffect(() => {
  if (suggestions.length > 0) {
    suggestions.forEach(suggestion => {
      analytics.aiSuggestionShown(
        userId,
        suggestion.id,
        suggestion.type,
        suggestion.confidence,
        suggestion.contextFactors
      )
    })
  }
}, [suggestions])
```

---

### Example 3: Track Energy Recalibration

```typescript
// When energy is recalibrated
const recalibrateEnergy = (taskCompleted: Task) => {
  const oldLevel = currentEnergyLevel
  const newLevel = calculateNewEnergy(taskCompleted)
  
  setCurrentEnergyLevel(newLevel)
  
  // Track it
  analytics.energyLevelUpdated(
    userId,
    oldLevel,
    newLevel,
    'auto_recalibration',
    0.85 // confidence from model
  )
  
  // Show tooltip
  showEnergyChangeTooltip(oldLevel, newLevel)
}
```

---

## VIEWING YOUR DATA

### Vercel Analytics Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Select your project
3. Click "Analytics" tab
4. See:
   - Page views
   - Top pages
   - Unique visitors
   - Custom events
   - Speed Insights (CWV)

### Raw Event Data

Vercel Analytics provides:
- Real-time event stream
- Event explorer
- Custom dashboards
- Export to CSV
- API access

---

## METRICS DASHBOARD

Once you have data flowing, create dashboards for:

### Executive Dashboard
- Daily/Weekly/Monthly Active Users
- EMTCR (Energy-Matched Task Completion Rate)
- Premium Conversion Rate
- NPS Score (when you collect it)

### Product Dashboard
- Feature adoption rates (which features used most)
- Task creation vs completion
- AI suggestion acceptance rate
- User journey completion rates

### Engineering Dashboard
- Core Web Vitals (LCP, INP, CLS)
- Error rates by type
- Page load times
- Bundle sizes

### Growth Dashboard
- New registrations
- Activation rate (first task created)
- Retention curves (D1, D7, D30)
- Referral sources

---

## PRIVACY & GDPR COMPLIANCE

### What We Track
- User actions (with user_id)
- Page views
- Performance metrics
- Errors

### What We DON'T Track
- ❌ Passwords
- ❌ Payment info
- ❌ Full emails (hash if needed)
- ❌ Personal task content
- ❌ Location (beyond city-level)

### User Controls (To Implement)

```typescript
// Opt-out mechanism
const handleOptOut = () => {
  localStorage.setItem('analytics_opt_out', 'true')
  // Stop tracking
}

// Check opt-out before tracking
const shouldTrack = () => {
  return !localStorage.getItem('analytics_opt_out')
}
```

### Cookie Consent (If EU Users)

If you have EU users, you need:
1. Cookie consent banner
2. Accept/Decline options
3. Respect user choice
4. Document in privacy policy

---

## TESTING ANALYTICS

### Verify Events Are Firing

1. **Open DevTools Console**
2. **Go to Network tab**
3. **Filter by "/_vercel/insights"**
4. **Perform actions** (create task, etc.)
5. **See events** being sent

### Check Event Data

```javascript
// In console, you can manually trigger events
import { analytics } from '@/lib/analytics'

analytics.custom('test_event', {
  test_property: 'test_value'
})
```

---

## NEXT STEPS

### Immediate (Today)
1. ✅ Analytics installed
2. ✅ Providers configured
3. ✅ Web Vitals tracking active
4. ✅ Error tracking active
5. ✅ Page view tracking active

### This Week
1. [ ] Add tracking to CreateTaskModal
2. [ ] Add tracking to task completion
3. [ ] Add tracking to energy updates
4. [ ] Add tracking to AI suggestions
5. [ ] Add tracking to user registration

### Next Week
1. [ ] Create analytics dashboard in Vercel
2. [ ] Set up alerts for key metrics
3. [ ] Review first week of data
4. [ ] Identify top 3 insights
5. [ ] Make data-driven improvements

---

## TROUBLESHOOTING

### Events Not Showing Up?

1. **Check Vercel deployment:** Analytics only works in production
2. **Check console:** Look for errors
3. **Check network tab:** See if requests failing
4. **Verify imports:** Make sure analytics imported correctly
5. **Test in production:** Some features don't work in dev mode

### Performance Impact?

Vercel Analytics is:
- ✅ Lightweight (< 1KB)
- ✅ Non-blocking (async)
- ✅ Fast (< 10ms overhead)
- ✅ Privacy-friendly (no cookies)

---

## SUPPORT & RESOURCES

- **Vercel Analytics Docs:** https://vercel.com/docs/analytics
- **Web Vitals:** https://web.dev/vitals/
- **Event Taxonomy:** See EVENT_TAXONOMY.md
- **Metric Tree:** See METRIC_TREE.md

---

## SUCCESS CRITERIA

**You'll know analytics is working when:**

1. ✅ Events visible in Vercel dashboard
2. ✅ Page views incrementing daily
3. ✅ Core Web Vitals showing data
4. ✅ Custom events appearing
5. ✅ You make decisions based on data

---

**Analytics is now LIVE!** 🎉

Next: Add tracking to your most important user actions.

---

*For complete event list, see EVENT_TAXONOMY.md*
*For metrics definitions, see METRIC_TREE.md*

