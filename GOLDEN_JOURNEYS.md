# SYNCSCRIPT — GOLDEN JOURNEYS

> **Purpose:** Define and validate critical user paths  
> **Standard:** ≥90% task success rate, ≤3 errors, ≤5 minutes  
> **Status:** 📋 DEFINED | ❌ NOT TESTED

---

## WHAT ARE GOLDEN JOURNEYS?

**Golden Journeys** are the 10 most critical user paths that MUST work flawlessly. If these fail, the product fails.

**Success Criteria for ALL Journeys:**
- ≥ 90% task success rate
- ≤ 3 clicks/taps to complete
- ≤ 5 minutes completion time
- ≤ 1 error encountered
- 100% WCAG AA compliant
- Works on mobile + desktop
- Works offline (degraded but functional)

---

## JOURNEY 1: FIRST-TIME USER ACTIVATION

**Goal:** New user creates their first task within 5 minutes

### Steps

| # | Step | Component | Success Criteria | Current Status |
|---|------|-----------|------------------|----------------|
| 1 | Land on homepage | `/` | Page loads < 2s | ✅ Page exists |
| 2 | Click "Start Free" | CTA button | Navigates to register | ✅ Link works |
| 3 | Register account | `/register` | Account created | ⚠️ Auth0 needs testing |
| 4 | See welcome tour | EnhancedWelcomeTour | 5 steps shown | ✅ Component built |
| 5 | Set initial energy level | Onboarding | Energy saved | ✅ Flow exists |
| 6 | Click "Create Task" | Dashboard | Modal opens | ✅ Modal built |
| 7 | Fill task title | CreateTaskModal | Text entered | ✅ Form works |
| 8 | Set energy level | Energy picker | Selected | ✅ Picker works |
| 9 | Click "Save" | Submit button | Task created | ✅ Local state works |
| 10 | See task in list | TaskList | Task visible | ✅ Renders |
| 11 | See AI suggestion | SmartSuggestions | Suggestion shown | ✅ Component built |

### Acceptance Criteria

- [ ] ≥ 90% of new users complete all steps
- [ ] Median time: ≤ 5 minutes
- [ ] p95 time: ≤ 10 minutes
- [ ] Drop-off rate: < 10% per step
- [ ] Error rate: < 5%
- [ ] Mobile success rate: ≥ 85%
- [ ] Accessibility: 100% keyboard navigable

### Current Status: ❌ NOT TESTED

**Test Plan:**
1. Recruit 10 new users
2. Give task: "Create your first task"
3. Observe (don't help)
4. Measure time, errors, drop-offs
5. Interview about experience
6. Fix top 3 issues
7. Repeat until ≥90% success

---

## JOURNEY 2: COMPLETE TASK → SEE ENERGY + EMBLEM

**Goal:** User completes task and sees immediate energy/emblem feedback

### Steps

| # | Step | Component | Success Criteria | Current Status |
|---|------|-----------|------------------|----------------|
| 1 | Find task to complete | TaskList | Task visible | ✅ Works |
| 2 | Click checkbox | Task checkbox | Marks complete | ✅ Works |
| 3 | See completion animation | Motion system | Smooth feedback | ⚠️ Animation exists |
| 4 | Energy recalculated | Energy system | New level shown | ✅ Logic works |
| 5 | See energy change tooltip | Tooltip | Rationale clear | ✅ Component built |
| 6 | Emblem charge increases | Emblem system | Visual feedback | ✅ Component built |
| 7 | See emblem breakdown | EmblemBreakdownModal | Details shown | ✅ Modal exists |
| 8 | Get next suggestion | SmartSuggestions | Relevant task | ✅ Logic exists |

### Acceptance Criteria

- [ ] 100% of completions trigger updates
- [ ] Latency: < 500ms for all calculations
- [ ] Energy change shown with clear explanation
- [ ] Emblem visual feedback immediate and clear
- [ ] Next suggestion relevant (>60% acceptance)
- [ ] No UI glitches or layout shifts
- [ ] Works offline (queues for sync)

### Current Status: ❌ NOT TESTED

**Test Plan:**
1. Complete 10 tasks
2. Verify energy updates correctly
3. Verify emblem charges
4. Measure latency
5. Check for errors
6. Test offline behavior

---

## JOURNEY 3: AI-POWERED SMART PLANNING

**Goal:** User gets AI suggestion and understands why it was recommended

### Steps

| # | Step | Component | Success Criteria | Current Status |
|---|------|-----------|------------------|----------------|
| 1 | Open dashboard | `/dashboard` | Loads < 2s | ✅ Works |
| 2 | See Smart Suggestions widget | SmartSuggestions | Visible, not empty | ✅ Component built |
| 3 | See top suggestion | Suggestion card | Task + confidence shown | ✅ Logic exists |
| 4 | Click "Why?" button | Explanation trigger | Modal opens | ✅ ExplanationModal built |
| 5 | Read explanation | ExplanationModal | Factors listed | ✅ Content exists |
| 6 | See confidence score | Confidence badge | 0-100 score clear | ✅ Displayed |
| 7 | View alternatives | Alternatives list | 2-3 options shown | ✅ Logic exists |
| 8 | Accept suggestion | Accept button | Task added to list | ✅ Works |

### Acceptance Criteria

- [ ] ≥ 70% understand why task was suggested
- [ ] ≥ 40% accept suggestions (from baseline ~15%)
- [ ] ≥ 25% view explanations
- [ ] Confidence score correlates with acceptance (r > 0.7)
- [ ] Alternative options useful (>50% say yes)
- [ ] Load time: < 1s for suggestions
- [ ] No UI jank when opening modal

### Current Status: ❌ NOT TESTED

---

## JOURNEY 4: BUDGET-AWARE TASK PLANNING

**Goal:** User plans a task considering budget and savings goals

### Steps

| # | Step | Component | Success Criteria | Current Status |
|---|------|-----------|------------------|----------------|
| 1 | Create task with cost | CreateTaskModal | Budget field filled | ✅ Field exists |
| 2 | See budget fit score | Budget fit badge | 0-100 score shown | ✅ Logic exists |
| 3 | See comfort band | Color indicator | Safe/Stretch/Over | ✅ Visual exists |
| 4 | See savings impact | Savings widget | "Italy trip 2 days sooner" | ✅ Logic exists |
| 5 | Adjust task cost | Edit field | Score updates live | ✅ Reactive |
| 6 | Save task | Submit button | Saved with budget | ✅ Works |
| 7 | See budget summary | Budget tracker | Running total | ✅ Component built |

### Acceptance Criteria

- [ ] ≥ 50% of tasks have budget assigned
- [ ] Budget fit score influences decisions (measured)
- [ ] ≥ 75% stay in safe/stretch bands
- [ ] Savings goal adoption: ≥ 35%
- [ ] Budget calculation: < 100ms
- [ ] Users understand comfort bands (>90%)

### Current Status: ❌ NOT TESTED

---

## JOURNEY 5: CONTEXT-AWARE MEETING PLANNING

**Goal:** Schedule meeting with weather, traffic, and budget context

### Steps

| # | Step | Component | Success Criteria | Current Status |
|---|------|-----------|------------------|----------------|
| 1 | Create calendar event | Calendar | Event form opens | ✅ Integration exists |
| 2 | See weather for event time | Weather badge | Shown + accurate | ✅ Component built |
| 3 | See leave-by time | Leave-by chip | Calculated + shown | ✅ Component built |
| 4 | See ETA + reliability | ETA badge | With confidence | ✅ Logic exists |
| 5 | Browse venues | Venue picker | Ranked list shown | ✅ UI exists |
| 6 | See budget fit per venue | Budget indicators | Safe/stretch/over | ✅ Logic exists |
| 7 | Select venue | Venue card | Confirmed | ✅ Works |
| 8 | Get route | Map/directions | Route shown | ⚠️ Needs real API |
| 9 | Save meeting | Submit | Saved with context | ✅ Works |

### Acceptance Criteria

- [ ] Weather shown for 100% of future events
- [ ] Leave-by accuracy: ±5 minutes
- [ ] ETA reliability: >85% within prediction
- [ ] Venue ranking feels right (user survey)
- [ ] ≥ 35% accept leave-by nudges
- [ ] Budget-aware venue selection (measured)
- [ ] Complete flow in ≤ 3 minutes

### Current Status: ❌ NOT TESTED

---

## JOURNEY 6: TEAM COLLABORATION

**Goal:** Invite teammate and share tasks

### Steps

| # | Step | Component | Success Criteria | Current Status |
|---|------|-----------|------------------|----------------|
| 1 | Create team workspace | Team dashboard | Workspace created | ✅ UI exists |
| 2 | Click "Invite" | Invite button | Modal opens | ✅ Component built |
| 3 | Enter email | Invite form | Email valid | ✅ Validation works |
| 4 | Send invite | Submit | Invite sent | ❌ No backend |
| 5 | Teammate receives email | Email service | Email delivered | ❌ No backend |
| 6 | Teammate clicks link | Invite link | Opens app | ✅ Route exists |
| 7 | Teammate accepts | TeamInvitation page | Joins team | ❌ No backend |
| 8 | Share task with team | Task sharing | Task visible to team | ❌ No backend |
| 9 | See real-time update | WebSocket | Updates instantly | ❌ No backend |

### Acceptance Criteria

- [ ] Invite sent: < 2s
- [ ] Email delivered: 100% within 5 min
- [ ] Invite acceptance: > 80%
- [ ] Real-time sync: < 1s latency
- [ ] Permissions respected: 100%
- [ ] Mobile collaboration: works

### Current Status: ❌ BLOCKED (needs backend)

---

## JOURNEY 7: FEATURE DISCOVERY

**Goal:** User discovers and tries 5+ features in first week

### Steps

| # | Step | Component | Success Criteria | Current Status |
|---|------|-----------|------------------|----------------|
| 1 | See feature menu | Navigation | Menu visible | ✅ GlobalNavigation |
| 2 | Browse categories | Feature categories | Organized clearly | ✅ /features page |
| 3 | Search features | Search bar | Finds relevant | ✅ Search works |
| 4 | Read feature description | Feature card | Clear value prop | ✅ Descriptions exist |
| 5 | Try feature | Feature component | Opens/works | ✅ All built |
| 6 | See contextual help | Help tooltip | Guidance shown | ⚠️ Partial |
| 7 | Use feature successfully | Feature flow | Task complete | ❌ Not tested |
| 8 | Feature becomes habit | Repeated use | Used 3+ times/week | ❌ Not measured |

### Acceptance Criteria

- [ ] Users discover ≥ 5 features in week 1
- [ ] Feature discoverability score: ≥ 4/5
- [ ] Search finds features: ≥ 90% success
- [ ] Feature adoption: ≥ 60% try 10+ features in 30d
- [ ] Feature stickiness: ≥ 30% use weekly
- [ ] Help content: available for all features

### Current Status: ⚠️ PARTIAL (discovery built, adoption not measured)

---

## JOURNEY 8: MOBILE EXPERIENCE

**Goal:** Complete core tasks on mobile device

### Steps

| # | Step | Component | Success Criteria | Current Status |
|---|------|-----------|------------------|----------------|
| 1 | Open on mobile | Responsive design | Renders correctly | ✅ Responsive CSS |
| 2 | Navigate menu | Mobile nav | Touch-friendly | ✅ Touch targets |
| 3 | Create task | Mobile form | Keyboard works | ✅ Forms work |
| 4 | Complete task | Checkbox | Touch target ≥44px | ⚠️ Not verified |
| 5 | View analytics | Mobile dashboard | Readable | ✅ Responsive |
| 6 | Use AI features | Mobile AI | Works well | ✅ Components work |
| 7 | Install PWA | Add to home screen | Icon on home screen | ❌ Not tested |

### Acceptance Criteria

- [ ] Mobile task success: ≥ 85% (vs 90% desktop)
- [ ] Touch targets: 100% ≥ 44×44px
- [ ] Text readable: no horizontal scroll
- [ ] Forms: keyboard doesn't hide inputs
- [ ] Performance: LCP < 3s on 4G
- [ ] PWA: Installs and works offline

### Current Status: ⚠️ BUILT (not tested on real devices)

---

## JOURNEY 9: PREMIUM UPGRADE

**Goal:** User sees value and upgrades to premium

### Steps

| # | Step | Component | Success Criteria | Current Status |
|---|------|-----------|------------------|----------------|
| 1 | Hit free limit | Limit detection | Clear message | ❌ No limits enforced |
| 2 | See premium prompt | Upgrade CTA | Value prop clear | ⚠️ Pricing page exists |
| 3 | Browse plans | Pricing table | Compare features | ✅ Pricing section |
| 4 | Select plan | Plan selector | Highlighted | ✅ UI works |
| 5 | Enter payment | Checkout | Secure form | ❌ No payment integration |
| 6 | Confirm purchase | Submit | Processing shown | ❌ No backend |
| 7 | Access premium features | Feature unlock | Immediately available | ❌ No feature gating |
| 8 | See value | Premium dashboard | Enhanced features | ✅ UI exists |

### Acceptance Criteria

- [ ] Free-to-premium conversion: 8.5%
- [ ] Time to conversion: median < 14 days
- [ ] Upgrade funnel completion: ≥ 60%
- [ ] Payment success rate: ≥ 98%
- [ ] Value perceived immediately: ≥ 80%
- [ ] Churn after upgrade: < 5% first month

### Current Status: ❌ BLOCKED (needs payment integration)

---

## JOURNEY 10: GET HELP & SUPPORT

**Goal:** User finds answer to their question quickly

### Steps

| # | Step | Component | Success Criteria | Current Status |
|---|------|-----------|------------------|----------------|
| 1 | Look for help | Help button/link | Visible | ⚠️ Not prominent |
| 2 | Search help docs | Search | Finds relevant | ❌ No help docs |
| 3 | Read article | Help content | Clear answer | ❌ Content missing |
| 4 | Try solution | Feature | Problem solved | ❌ Can't measure |
| 5 | If unsure, contact support | Support form | Form submitted | ❌ No support system |
| 6 | Get response | Support ticket | < 24hr response | ❌ No support |

### Acceptance Criteria

- [ ] ≥ 70% find answer in help docs
- [ ] Search relevance: ≥ 85%
- [ ] Time to answer: median < 2 minutes
- [ ] Support ticket volume: < 10% of users
- [ ] First response time: < 4 hours
- [ ] Resolution time: < 24 hours

### Current Status: ❌ MISSING (no help system)

---

## TESTING PROTOCOL

### For Each Journey

1. **Recruit Participants**
   - 10 users per journey
   - Mix: new + experienced users
   - Diverse: devices, abilities, backgrounds

2. **Prepare Test**
   - Write task scenario
   - Set success criteria
   - Prepare observation sheet
   - Set up recording (with consent)

3. **Conduct Test**
   - Give task, don't help
   - Observe silently
   - Note: errors, confusion, time
   - Record: clicks, taps, navigation

4. **Analyze Results**
   - Calculate success rate
   - Identify common errors
   - Find friction points
   - Measure time

5. **Fix & Retest**
   - Fix top 3 issues
   - Retest with 5 new users
   - Repeat until ≥90% success

6. **Document**
   - Final success rate
   - Common issues found
   - Fixes applied
   - Lessons learned

---

## JOURNEY METRICS DASHBOARD

### Overview

| Journey | Success Rate | Median Time | Error Rate | Status |
|---------|--------------|-------------|------------|--------|
| 1. First Task | ❌ Not tested | - | - | 🔴 NOT TESTED |
| 2. Energy/Emblem | ❌ Not tested | - | - | 🔴 NOT TESTED |
| 3. AI Planning | ❌ Not tested | - | - | 🔴 NOT TESTED |
| 4. Budget Planning | ❌ Not tested | - | - | 🔴 NOT TESTED |
| 5. Context Meeting | ❌ Not tested | - | - | 🔴 NOT TESTED |
| 6. Team Collab | ❌ Not tested | - | - | 🔴 BLOCKED |
| 7. Feature Discovery | ❌ Not tested | - | - | 🔴 NOT TESTED |
| 8. Mobile Experience | ❌ Not tested | - | - | 🔴 NOT TESTED |
| 9. Premium Upgrade | ❌ Not tested | - | - | 🔴 BLOCKED |
| 10. Get Help | ❌ Not tested | - | - | 🔴 MISSING |

**Target:** All green (≥90% success rate)

---

## IMMEDIATE NEXT STEPS

### Week 1: Test Journeys 1-3
- Journey 1: First-time activation
- Journey 2: Energy/emblem feedback
- Journey 3: AI planning

**Why:** Core value prop validation

### Week 2: Test Journeys 4-5
- Journey 4: Budget planning
- Journey 5: Context-aware meeting

**Why:** Differentiator validation

### Week 3: Test Journeys 7-8
- Journey 7: Feature discovery
- Journey 8: Mobile experience

**Why:** Engagement and platform reach

### Week 4: Build Missing Journeys
- Journey 6: Team (needs backend)
- Journey 9: Premium (needs payment)
- Journey 10: Help (needs content)

**Why:** Complete the experience

---

## SUCCESS CRITERIA — LEGENDARY STATUS

To be considered "legendary," ALL journeys must achieve:

✅ ≥ 90% task success rate  
✅ ≤ 5 minutes completion time  
✅ ≤ 1 error per journey  
✅ 100% WCAG AA compliant  
✅ Works on mobile + desktop  
✅ Satisfies users (≥ 4.5/5 rating)

**Current Status:** 0/10 journeys validated

**Target:** 10/10 journeys validated within 30 days

---

*For implementation guidance, see SYNCSCRIPT_LEGENDARY_AUDIT.md*
*For metrics tracking, see METRIC_TREE.md*

