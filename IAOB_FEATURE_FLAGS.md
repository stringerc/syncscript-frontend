# 🚩 IAOB: Feature Flags System

**Progressive Delivery & Risk Mitigation**  
**Owner:** Feature-Flag Orchestrator  
**Technology:** PostHog (recommended)  
**Last Updated:** October 13, 2025

---

## 🎯 PURPOSE

Feature flags enable:
- **Progressive rollout** (1% → 5% → 100%)
- **Instant rollback** (no deployment needed)
- **A/B testing** (compare variants)
- **User targeting** (beta users, specific cohorts)
- **Kill switches** (disable features instantly)

**Philosophy:** Deploy dark, release bright.

---

## 🛠️ TECHNOLOGY SELECTION

### **PostHog (RECOMMENDED)** ✅

**Why PostHog:**
- ✅ Feature flags + analytics in one
- ✅ Free tier (1M events/month)
- ✅ Self-hostable (GDPR compliant)
- ✅ Session replay included
- ✅ A/B testing built-in
- ✅ React/Next.js SDK
- ✅ Real-time flag updates

**Alternatives:**
- LaunchDarkly → Expensive ($$$)
- Unleash → More complex setup
- GrowthBook → Less mature
- Custom → Maintenance burden

**Decision:** PostHog for MVP, can migrate later if needed

---

## 📦 INSTALLATION

### **Frontend Setup**

```bash
cd ~/syncscript-frontend
npm install posthog-js posthog-node
```

**Initialize PostHog:**
```typescript
// lib/posthog.ts
import posthog from 'posthog-js';

export function initPostHog() {
  if (typeof window !== 'undefined') {
    posthog.init(
      process.env.NEXT_PUBLIC_POSTHOG_KEY!,
      {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
        loaded: (posthog) => {
          if (process.env.NODE_ENV === 'development') {
            posthog.debug();
          }
        },
        capture_pageview: false, // We'll do this manually
        capture_pageleave: true,
        autocapture: false, // More control
      }
    );
  }
}

export { posthog };
```

**Wrap App:**
```typescript
// src/app/layout.tsx
import { initPostHog } from '@/lib/posthog';
import { useEffect } from 'react';

export default function RootLayout({ children }) {
  useEffect(() => {
    initPostHog();
  }, []);

  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
}
```

---

### **Backend Setup (Optional)**

```bash
cd ~/syncscript-backend
npm install posthog-node
```

```typescript
// src/lib/posthog.ts
import { PostHog } from 'posthog-node';

export const posthog = new PostHog(
  process.env.POSTHOG_API_KEY!,
  { host: process.env.POSTHOG_HOST || 'https://app.posthog.com' }
);
```

---

## 🚩 FLAG DEFINITIONS

### **Critical Flags for SyncScript**

```typescript
// lib/featureFlags.ts

export enum FeatureFlag {
  // Backend Integration
  BACKEND_INTEGRATION = 'backend_integration',
  TASK_PERSISTENCE = 'task_persistence',
  PROJECT_PERSISTENCE = 'project_persistence',
  ENERGY_TRACKING = 'energy_tracking',
  
  // Real-time Features
  REALTIME_SYNC = 'realtime_sync',
  WEBSOCKET_CONNECTION = 'websocket_connection',
  
  // AI Features
  AI_SUGGESTIONS = 'ai_suggestions',
  AI_COACH = 'ai_coach',
  AI_QUICK_CREATE = 'ai_quick_create',
  
  // Advanced Features
  TEAM_WORKSPACES = 'team_workspaces',
  CALENDAR_INTEGRATION = 'calendar_integration',
  BUDGET_TRACKING = 'budget_tracking',
  
  // Experimental
  VOICE_COMMANDS = 'voice_commands',
  DESKTOP_APP = 'desktop_app',
  MOBILE_APP = 'mobile_app',
  
  // Kill Switches
  EMAIL_NOTIFICATIONS = 'email_notifications',
  PUSH_NOTIFICATIONS = 'push_notifications',
  
  // Performance
  LAZY_LOAD_ANALYTICS = 'lazy_load_analytics',
  OPTIMIZE_IMAGES = 'optimize_images',
}

// Default values (all OFF initially)
export const defaultFlags: Record<FeatureFlag, boolean> = {
  [FeatureFlag.BACKEND_INTEGRATION]: false,
  [FeatureFlag.TASK_PERSISTENCE]: false,
  [FeatureFlag.PROJECT_PERSISTENCE]: false,
  [FeatureFlag.ENERGY_TRACKING]: false,
  [FeatureFlag.REALTIME_SYNC]: false,
  [FeatureFlag.WEBSOCKET_CONNECTION]: false,
  [FeatureFlag.AI_SUGGESTIONS]: false,
  [FeatureFlag.AI_COACH]: false,
  [FeatureFlag.AI_QUICK_CREATE]: false,
  [FeatureFlag.TEAM_WORKSPACES]: false,
  [FeatureFlag.CALENDAR_INTEGRATION]: false,
  [FeatureFlag.BUDGET_TRACKING]: true, // Already built, safe to enable
  [FeatureFlag.VOICE_COMMANDS]: false,
  [FeatureFlag.DESKTOP_APP]: false,
  [FeatureFlag.MOBILE_APP]: false,
  [FeatureFlag.EMAIL_NOTIFICATIONS]: false,
  [FeatureFlag.PUSH_NOTIFICATIONS]: false,
  [FeatureFlag.LAZY_LOAD_ANALYTICS]: true,
  [FeatureFlag.OPTIMIZE_IMAGES]: true,
};
```

---

## 🎣 USAGE HOOKS

### **useFeatureFlag Hook**

```typescript
// hooks/useFeatureFlag.ts
import { usePostHog } from 'posthog-js/react';
import { useEffect, useState } from 'react';
import { FeatureFlag, defaultFlags } from '@/lib/featureFlags';

export function useFeatureFlag(flag: FeatureFlag): boolean {
  const posthog = usePostHog();
  const [isEnabled, setIsEnabled] = useState(defaultFlags[flag]);

  useEffect(() => {
    if (posthog) {
      const enabled = posthog.isFeatureEnabled(flag);
      setIsEnabled(enabled ?? defaultFlags[flag]);

      // Listen for flag changes (real-time updates)
      posthog.onFeatureFlags(() => {
        const updated = posthog.isFeatureEnabled(flag);
        setIsEnabled(updated ?? defaultFlags[flag]);
      });
    }
  }, [posthog, flag]);

  return isEnabled;
}
```

**Usage in Components:**
```typescript
function Dashboard() {
  const backendEnabled = useFeatureFlag(FeatureFlag.BACKEND_INTEGRATION);
  const aiEnabled = useFeatureFlag(FeatureFlag.AI_SUGGESTIONS);

  if (backendEnabled) {
    // Call real backend API
    const tasks = await fetch('/api/tasks');
  } else {
    // Use local storage
    const tasks = getTasksFromLocalStorage();
  }

  return (
    <div>
      {aiEnabled && <AICoach />}
    </div>
  );
}
```

---

## 🎯 TARGETING & ROLLOUT

### **User Targeting**

**By User ID:**
```javascript
// PostHog Dashboard
Flag: backend_integration
Rollout: 0%
Overrides:
  - User: auth0|admin-user → TRUE
  - User: auth0|beta-tester-1 → TRUE
```

**By Property:**
```javascript
// PostHog Dashboard
Flag: ai_suggestions
Rollout: 0%
Targeting:
  - email ends with @syncscript.com → TRUE
  - plan equals "pro" → TRUE
  - created_before "2025-01-01" → FALSE (new users only)
```

**By Percentage:**
```javascript
// Progressive rollout
Week 1: 1% of users
Week 2: 5% of users
Week 3: 15% of users
Week 4: 30% of users
Week 5: 60% of users
Week 6: 100% of users
```

---

### **Rollout Strategies**

**Strategy 1: Canary (Recommended for Backend Integration)**
```
Day 1: Internal team only (10 users)
Day 2: Beta users (50 users)
Day 3: 1% of production (automatic)
Day 4: 5%
Day 5: 15%
Day 6: 30%
Day 7: 60%
Day 8: 100%
```

**Health Gates:**
- Error rate < 0.5%
- p95 latency < 2s
- No user complaints
- SLOs green

**Rollback Trigger:**
- Error rate > 1%
- p95 latency > 3s
- Critical user reports
- SLO breach

**Strategy 2: Ring Deployment**
```
Ring 0: Devs/QA (immediate)
Ring 1: Internal company (day 1)
Ring 2: Beta users (day 3)
Ring 3: Early adopters (day 5)
Ring 4: General users (day 7)
Ring 5: Everyone (day 10)
```

---

## 📊 FEATURE FLAG DASHBOARD

### **PostHog Dashboard Setup**

**Flags to Create:**

| Flag | Description | Default | Rollout |
|------|-------------|---------|---------|
| `backend_integration` | Enable backend API calls | OFF | Canary 1-100% |
| `task_persistence` | Save tasks to database | OFF | After backend_integration |
| `realtime_sync` | WebSocket updates | OFF | Week 3 |
| `ai_suggestions` | AI-powered suggestions | OFF | Beta users first |
| `team_workspaces` | Team collaboration | OFF | Pro users only |
| `calendar_integration` | Google/Outlook calendar | OFF | Opt-in beta |

---

### **Monitoring Flags**

**Track Flag Performance:**
```typescript
posthog.capture('feature_flag_called', {
  flag_name: 'backend_integration',
  flag_value: isEnabled,
  user_id: user.id,
  page: window.location.pathname
});

// Track flag-specific metrics
if (backendEnabled) {
  const startTime = Date.now();
  try {
    const result = await fetch('/api/tasks');
    posthog.capture('backend_api_success', {
      duration_ms: Date.now() - startTime,
      endpoint: '/api/tasks'
    });
  } catch (error) {
    posthog.capture('backend_api_error', {
      error: error.message,
      endpoint: '/api/tasks'
    });
  }
}
```

---

## 🔄 PROGRESSIVE ROLLOUT EXAMPLE

### **Week-by-Week: Backend Integration**

**Week 1: Internal Testing**
```javascript
// PostHog: backend_integration flag
Rollout: 0%
Overrides:
  - email ends with @syncscript.com → TRUE (10 people)
```

**Monitor:**
- Error rate
- API latency
- User feedback (Slack channel)

**Decision:** If green, proceed to Week 2

---

**Week 2: Beta Users**
```javascript
Rollout: 0%
Overrides:
  - user_id in [list of 50 beta testers] → TRUE
```

**Monitor:**
- Same metrics + user satisfaction survey

---

**Week 3: 1% Canary**
```javascript
Rollout: 1% (automatic random selection)
```

**Health Gates:**
- If error_rate > 0.5%: Auto-rollback to 0%
- If p95_latency > 2s: Alert + manual review
- If SLO breach: Instant rollback

---

**Week 4: Progressive Expansion**
```
Monday: 5%
Wednesday: 15%
Friday: 30%
```

**Week 5: Majority**
```
Monday: 60%
Friday: 100%
```

---

## 🚨 ROLLBACK PROCEDURES

### **Instant Rollback**

**PostHog Dashboard:**
1. Navigate to Feature Flags
2. Find `backend_integration`
3. Set rollout to 0%
4. Click "Save"
5. **Takes effect in < 30 seconds**

**No deployment needed!** Flags update in real-time.

---

### **Automated Rollback**

```typescript
// Backend health monitor
setInterval(async () => {
  const metrics = await getMetrics();
  
  if (metrics.errorRate > 0.01) { // 1% error rate
    await posthog.updateFeatureFlag('backend_integration', {
      rollout_percentage: 0
    });
    
    await notifyTeam({
      channel: '#incidents',
      message: '🚨 Auto-rollback: backend_integration disabled due to high error rate'
    });
  }
}, 60000); // Check every minute
```

---

## 🧪 TESTING FLAGS LOCALLY

### **Override Flags in Development**

```typescript
// .env.local
NEXT_PUBLIC_POSTHOG_KEY=phc_your_key
NEXT_PUBLIC_FORCE_FLAGS=backend_integration:true,ai_suggestions:true
```

```typescript
// lib/posthog.ts
if (process.env.NEXT_PUBLIC_FORCE_FLAGS) {
  const overrides = process.env.NEXT_PUBLIC_FORCE_FLAGS.split(',');
  overrides.forEach(override => {
    const [flag, value] = override.split(':');
    posthog.featureFlags.override({
      [flag]: value === 'true'
    });
  });
}
```

---

### **URL Parameter Override**

```typescript
// Enable flag via URL for testing
// https://www.syncscript.app/dashboard?flag_backend_integration=true

useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  params.forEach((value, key) => {
    if (key.startsWith('flag_')) {
      const flagName = key.replace('flag_', '');
      posthog.featureFlags.override({
        [flagName]: value === 'true'
      });
    }
  });
}, []);
```

---

## 📊 FLAG ANALYTICS

### **Track Flag Usage**

**Automatically capture:**
```typescript
// Every time a flag is checked
posthog.onFeatureFlags((flags) => {
  Object.entries(flags).forEach(([flag, enabled]) => {
    posthog.capture('feature_flag_evaluated', {
      flag_name: flag,
      flag_value: enabled,
      page: window.location.pathname
    });
  });
});
```

**Custom tracking:**
```typescript
if (useFeatureFlag(FeatureFlag.AI_SUGGESTIONS)) {
  posthog.capture('ai_suggestions_shown');
  
  // Track performance
  const start = performance.now();
  const suggestions = await getAISuggestions();
  posthog.capture('ai_suggestions_loaded', {
    duration_ms: performance.now() - start,
    count: suggestions.length
  });
}
```

---

## 🎯 MULTIVARIATE TESTING

### **A/B Test: Task Creation UX**

**Setup in PostHog:**
```javascript
Experiment: task_creation_ux
Variants:
  - control: Current form modal
  - variant_a: Inline quick-create
  - variant_b: Command palette style

Rollout: 100%
Split: 33% / 33% / 34%
Goal: task_created event
```

**Usage:**
```typescript
const variant = posthog.getFeatureFlagVariant('task_creation_ux');

switch (variant) {
  case 'variant_a':
    return <InlineQuickCreate />;
  case 'variant_b':
    return <CommandPaletteCreate />;
  default:
    return <ModalCreate />; // control
}
```

**Measure:**
```typescript
posthog.capture('task_created', {
  variant: variant,
  time_to_create_seconds: duration
});
```

**PostHog automatically calculates:**
- Conversion rate per variant
- Statistical significance
- Winning variant
- Recommended action

---

## 🔐 FLAG SECURITY

### **Sensitive Flags**

**Never expose server-side flags to client:**
```typescript
// ❌ DON'T: Expose backend secrets
const databaseMigrationEnabled = useFeatureFlag('database_migration');

// ✅ DO: Server-side only
// Backend checks flag internally, frontend doesn't know
```

**PostHog Bootstrap (Server-Side Rendering):**
```typescript
// Load flags on server, pass to client
export async function getServerSideProps() {
  const posthogClient = new PostHog(process.env.POSTHOG_API_KEY!);
  
  const flags = await posthogClient.getAllFlags(userId);
  
  return {
    props: {
      featureFlags: flags
    }
  };
}
```

---

## 📋 FLAG GOVERNANCE

### **Flag Lifecycle**

```
PROPOSED → APPROVED → CREATED → TESTING → ROLLOUT → STABLE → RETIRED
```

**Stages:**

**1. Proposed**
- Feature team requests flag
- Document purpose, rollout plan
- Estimate duration (temporary vs permanent)

**2. Approved**
- Feature-Flag Orchestrator approves
- Added to flag registry

**3. Created**
- Created in PostHog
- Default: OFF (0% rollout)
- Code deployed with flag checks

**4. Testing**
- Internal team testing
- Beta user testing
- Monitor metrics

**5. Rollout**
- Progressive 1% → 100%
- Health gates active
- Rollback ready

**6. Stable**
- 100% rollout for 30+ days
- No issues
- Flag becomes permanent OR
- Flag removed (code always on)

**7. Retired**
- Flag deleted from PostHog
- Code cleaned up (remove flag checks)
- Deploy cleaned code

---

### **Flag Registry**

**Maintain in PostHog + Documentation:**

| Flag | Owner | Created | Status | Retire By |
|------|-------|---------|--------|-----------|
| backend_integration | Backend Team | 2025-10-13 | Testing | 2025-11-13 |
| ai_suggestions | AI Team | 2025-10-15 | Proposed | TBD |
| team_workspaces | Team Lead | 2025-10-20 | Proposed | TBD |

**Rule:** Temporary flags MUST have retirement date

---

## 🚀 ROLLOUT PLAYBOOK

### **Standard Rollout (Low Risk)**

**Timeline:** 1 week

```
Day 1: 1%
Day 3: 10%
Day 5: 50%
Day 7: 100%
```

**Health Checks:** Every 4 hours

---

### **Cautious Rollout (High Risk)**

**Timeline:** 3-4 weeks

```
Week 1: Internal team only
Week 2: Beta users (100 people)
Week 3: 1% → 5% → 15%
Week 4: 30% → 60% → 100%
```

**Health Checks:** Continuous (every 15 min)

**Automated Rollback:** If error rate > 0.5%

---

### **Instant Deploy (No Risk)**

**Timeline:** Immediate

```
Day 1: 100%
```

**When:** UI-only changes, no backend dependency, thoroughly tested

---

## 🎛️ EXAMPLE IMPLEMENTATION

### **Wrap Backend Calls in Flag**

```typescript
// pages/dashboard.tsx
import { useFeatureFlag } from '@/hooks/useFeatureFlag';
import { FeatureFlag } from '@/lib/featureFlags';

function Dashboard() {
  const backendEnabled = useFeatureFlag(FeatureFlag.BACKEND_INTEGRATION);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (backendEnabled) {
      // Real backend
      authenticatedFetch('/api/tasks')
        .then(r => r.json())
        .then(data => setTasks(data.tasks))
        .catch(err => {
          console.error('Backend failed:', err);
          // Fallback to local
          setTasks(getTasksFromLocalStorage());
        });
    } else {
      // Local storage only
      setTasks(getTasksFromLocalStorage());
    }
  }, [backendEnabled]);

  const createTask = async (taskData) => {
    if (backendEnabled) {
      // Persist to backend
      const response = await authenticatedFetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify(taskData)
      });
      const newTask = await response.json();
      setTasks([...tasks, newTask.data.task]);
    } else {
      // Save locally
      const newTask = { ...taskData, id: uuid(), created_at: new Date() };
      setTasks([...tasks, newTask]);
      localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
    }
  };

  return <TaskList tasks={tasks} onCreate={createTask} />;
}
```

---

## 📈 SUCCESS METRICS

### **Flag Performance Dashboard**

**For Each Flag:**
- Rollout percentage
- Users affected
- Error rate (flagged vs unflagged)
- Latency (flagged vs unflagged)
- Conversion impact (if A/B test)

**Example:**
```
backend_integration:
  Rollout: 15%
  Users: 1,234 of 8,234
  Error Rate: 0.3% (vs 0.2% baseline) ⚠️
  p95 Latency: 1.8s (vs 0.5s baseline) ⚠️
  → RECOMMENDATION: Pause rollout, investigate latency
```

---

## ✅ IMPLEMENTATION CHECKLIST

### **Setup (Day 1)**
- [ ] Create PostHog account
- [ ] Add POSTHOG_KEY to env
- [ ] Install SDK (frontend + backend)
- [ ] Initialize in app layout
- [ ] Create useFeatureFlag hook
- [ ] Define FeatureFlag enum

### **Flag Creation (Day 2)**
- [ ] Create flags in PostHog dashboard
- [ ] Set all to 0% rollout initially
- [ ] Document each flag's purpose
- [ ] Set retirement dates (for temporary flags)

### **Code Integration (Day 3)**
- [ ] Wrap backend calls in backend_integration flag
- [ ] Add fallbacks for flag=OFF state
- [ ] Test locally with flag overrides
- [ ] Deploy to staging

### **Rollout (Week 1)**
- [ ] Enable for internal team
- [ ] Monitor metrics
- [ ] Gather feedback
- [ ] Fix any issues

### **Scale (Weeks 2-4)**
- [ ] Progressive rollout (1% → 100%)
- [ ] Automated health checks
- [ ] Rollback plan tested
- [ ] Final cleanup

---

*Feature Flag Framework Owner: Feature-Flag Orchestrator*  
*Technology: PostHog*  
*Status: Implementation Guide Complete*

