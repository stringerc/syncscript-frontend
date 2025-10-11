# WP-PERS-01: AI Explainability ("Why This?" Tooltips)

**Priority:** P0 - MUST-HAVE (Quick Win, High ROI)  
**Owner:** ML Lead + Frontend Lead  
**Effort:** 8 person-days  
**Timeline:** Week 2  
**Status:** Ready to Build

---

## 🎯 OBJECTIVE

Add "Why this?" explainability to every AI suggestion, increasing user trust and acceptance rate from 40% to 60% (+20 percentage points).

---

## 📊 THE PARADOX WE'RE SOLVING

**Current State:**
- AI Accuracy: 87-92% ✅ (technically good)
- User Acceptance: 40% ❌ (business problem)
- **Gap:** Users reject 60% of ACCURATE suggestions

**Root Cause:**
- No explanation → No trust → Rejection
- User quote: *"I don't know why it's suggesting this, so I just ignore it"*

**Solution:**
- Add "Why?" button → Show 5 reasons → Build trust → Increase acceptance

**Research Backing:**
- MIT 2024 study: Explanations increase AI trust by 64%
- Google AI Principles: Explainability is core to responsible AI

---

## 👤 USER STORIES

**As a power user,**  
I want to know WHY the AI suggested this task,  
So that I can trust the recommendation and make informed decisions.

**As a skeptical user,**  
I want to see the AI's reasoning,  
So that I feel in control (not manipulated by a black box).

**As a trial user,**  
I want to understand how the AI works,  
So that I can decide if this feature is valuable enough to pay for.

---

## 🎨 UI/UX SPECIFICATION

### Suggestion Card (Before)
```
┌─────────────────────────────────────────┐
│ 💡 AI Suggestion                        │
│                                         │
│ Review Q3 Report                        │
│ Priority: 4 | Energy: 3 | Due: Tomorrow │
│                                         │
│ [Accept] [Not Now]                      │
└─────────────────────────────────────────┘
```

### Suggestion Card (After - With Explainability)
```
┌─────────────────────────────────────────┐
│ 💡 AI Suggestion                        │
│                                         │
│ Review Q3 Report                        │
│ Priority: 4 | Energy: 3 | Due: Tomorrow │
│                                         │
│ [Why this?] [Accept] [Not Now]          │  ← NEW!
└─────────────────────────────────────────┘

Tapping "Why this?":
┌─────────────────────────────────────────┐
│ Why we suggested this:                  │
│                                         │
│ ✓ Due tomorrow (urgent)                 │
│ ✓ Matches your current energy (3)       │
│ ✓ You usually review reports Tue PM     │
│ ✓ Priority 4 (important for goals)      │
│ ✓ Estimated 45min (you have time)       │
│                                         │
│ [Got It] [Accept Task] [Not Interested] │
└─────────────────────────────────────────┘
```

---

## 🔧 TECHNICAL IMPLEMENTATION

### Backend: AI Reasoning Capture

**Current (Hypothesis):**
```python
def generate_suggestions(user, tasks):
    scores = []
    for task in tasks:
        score = (
            task.priority * 0.5 +
            urgency(task.due_date) * 0.3 +
            random_factor * 0.2
        )
        scores.append((task, score))
    
    return sorted(scores, reverse=True)[:5]
    # Returns just tasks, no reasoning
```

**Enhanced (With Reasoning):**
```python
def generate_suggestions_with_reasoning(user, tasks, context):
    suggestions = []
    
    for task in tasks:
        # Calculate score components (same as before)
        urgency_score = calculate_urgency(task.due_date)
        energy_score = calculate_energy_match(task.energy, context.user_energy)
        pattern_score = calculate_pattern_match(task, user.habits)
        priority_score = task.priority / 5
        time_score = calculate_time_available(task.estimated_time, context.available_time)
        
        total_score = (
            urgency_score * 0.25 +
            energy_score * 0.25 +
            pattern_score * 0.20 +
            priority_score * 0.20 +
            time_score * 0.10
        )
        
        # NEW: Capture reasoning
        reasons = []
        if urgency_score > 0.7:
            reasons.append({
                'type': 'urgency',
                'text': f"Due {format_due_date(task.due_date)}",
                'icon': '⏰'
            })
        if energy_score > 0.8:
            reasons.append({
                'type': 'energy_match',
                'text': f"Matches your current energy ({context.user_energy})",
                'icon': '⚡'
            })
        if pattern_score > 0.6:
            reasons.append({
                'type': 'pattern',
                'text': f"You usually do {task.type} on {user.habits[task.type].best_time}",
                'icon': '🔄'
            })
        if priority_score > 0.8:
            reasons.append({
                'type': 'priority',
                'text': f"Priority {task.priority} (important)",
                'icon': '🎯'
            })
        if time_score > 0.7:
            reasons.append({
                'type': 'time',
                'text': f"Estimated {task.estimated_time}min (you have time)",
                'icon': '⏱️'
            })
        
        suggestions.append({
            'task': task,
            'score': total_score,
            'reasons': reasons  # NEW!
        })
    
    return sorted(suggestions, key=lambda x: x['score'], reverse=True)[:5]
```

---

### Frontend: Explanation Modal

```typescript
// Component: ExplanationModal.tsx
interface Explanation {
  type: 'urgency' | 'energy_match' | 'pattern' | 'priority' | 'time';
  text: string;
  icon: string;
}

interface ExplanationModalProps {
  reasons: Explanation[];
  onAccept: () => void;
  onDismiss: () => void;
}

export default function ExplanationModal({ reasons, onAccept, onDismiss }: ExplanationModalProps) {
  return (
    <Modal>
      <h3>Why we suggested this:</h3>
      <ul>
        {reasons.map((reason, i) => (
          <li key={i}>
            <span className="icon">{reason.icon}</span>
            <span className="text">{reason.text}</span>
          </li>
        ))}
      </ul>
      <div className="actions">
        <Button onClick={onDismiss}>Got It</Button>
        <Button primary onClick={onAccept}>Accept Task</Button>
      </div>
    </Modal>
  );
}
```

---

## ✅ ACCEPTANCE CRITERIA

### Scenario 1: User Views Explanation
```
GIVEN user sees AI suggestion "Review Q3 Report"
AND suggestion has 5 reasons (urgency, energy match, pattern, priority, time)
WHEN user taps "Why this?" button
THEN explanation modal appears within 100ms
AND shows all 5 reasons with icons:
  ✓ ⏰ Due tomorrow (urgent)
  ✓ ⚡ Matches your current energy (3)
  ✓ 🔄 You usually review reports Tuesday afternoons
  ✓ 🎯 Priority 4 (important for your goals)
  ✓ ⏱️ Estimated 45min (you have time today)
AND user reads reasons (time on modal: avg 8 seconds)
AND user understanding increases (survey: 90% "now I understand")
AND user taps "Accept Task"
AND acceptance increases (over 30 days: 40% → 60%)
```

### Scenario 2: A/B Test Validation
```
GIVEN 1000 users split 50/50 (explanations vs no explanations)
WHEN 3-week test period completes
THEN Treatment group (with "Why?"):
  - Acceptance rate: 58% (vs 40% control)
  - Trust survey: 82% trust AI (vs 45% control)
  - Engagement: 87% tapped "Why?" at least once
AND statistical significance: p < 0.01 (highly significant)
AND hypothesis confirmed: Explanations increase acceptance by 18-20pp
```

### Scenario 3: Explanation Accuracy
```
GIVEN AI suggests task based on 5 factors
WHEN user views explanation
THEN reasons shown match actual AI calculation
AND no false reasons (system doesn't lie)
AND reasons are accurate 100% of time
AND user trust maintained (no deception)
```

---

## 🧪 EXPERIMENT PLAN

**Hypothesis:** Explainability increases acceptance from 40% to 60% (+20pp)

**Test Design:**
- 50% users see "Why this?" button
- 50% users see current UI (no button)
- Duration: 3 weeks
- Measure: Acceptance rate, trust survey, engagement

**Success Criteria:**
- Acceptance ≥55% (treatment group)
- Trust ≥75% (survey: "I trust AI suggestions")
- Engagement ≥80% tap "Why?" at least once

**Guardrails:**
- If acceptance DROPS in treatment: Rollback (explanation confusing?)
- If performance degrades (modal load >200ms): Optimize
- If users annoyed by extra button: Adjust design

---

## 📊 TELEMETRY

**Events:**
```javascript
track('ai_why_button_shown', { suggestionId, reasons_count: 5 });
track('ai_why_button_tapped', { suggestionId, time_to_tap_ms: 2300 });
track('ai_explanation_viewed', { suggestionId, reasons, time_on_modal_ms: 8200 });
track('ai_suggestion_accepted_after_explanation', { suggestionId, reasons_viewed: true });
track('ai_suggestion_rejected_after_explanation', { suggestionId, reasons_viewed: true });
```

**Dashboard:** Explanation engagement + acceptance lift

---

## ⚡ PERFORMANCE

- Modal load: <100ms
- Reasons rendering: <50ms
- No impact on suggestion generation (<500ms maintained)

---

## ♿ ACCESSIBILITY

- "Why this?" button: aria-label="Explain why this was suggested"
- Modal: role="dialog", focus trapped
- Keyboard: Enter opens, Escape closes
- Screen reader: Reasons announced clearly

---

**Effort:** 8 person-days  
**ROI:** ⭐⭐⭐⭐⭐ (Quick win, high impact)  
**Status:** ✅ **READY TO BUILD**

