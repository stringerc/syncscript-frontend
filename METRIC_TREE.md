# SYNCSCRIPT METRIC TREE

> **North Star:** Energy-Matched Task Completion Rate (EMTCR)  
> **Target:** 55% (from baseline ~30%)  
> **Definition:** % of tasks completed during user's optimal energy windows

---

## METRIC HIERARCHY

```
NORTH STAR: EMTCR (55%)
├── INPUT METRICS (Adoption)
│   ├── Energy System
│   │   ├── % Users Who Log Energy (70% try, 40% habit)
│   │   ├── Energy Logs per User per Day (2.5)
│   │   ├── Energy Recalibration Acceptance Rate (80%)
│   │   └── Energy Peak Window Accuracy (±30 min, 85%)
│   │
│   ├── Budget System
│   │   ├── % Tasks With Budget Assigned (50%)
│   │   ├── Budget Fit Score Usage Rate (60%)
│   │   ├── Savings Goal Adoption (35%)
│   │   └── Budget Comfort Band Adherence (75% in safe/stretch)
│   │
│   ├── Context System (Weather/Traffic/Location)
│   │   ├── % Events With Context Data (80%)
│   │   ├── Weather Alert Precision/Recall (90%/70%)
│   │   ├── ETA Accuracy (±5 min, 85%)
│   │   └── Leave-By Nudge Acceptance (35%)
│   │
│   └── AI Suggestions
│       ├── Suggestion Acceptance Rate (40% → 70%)
│       ├── Explainability View Rate (25%)
│       ├── AI Confidence Correlation (r > 0.7)
│       └── Alternative Options Exploration (15%)
│
├── ENGAGEMENT METRICS (Active Usage)
│   ├── User Activation
│   │   ├── D1 Retention (60%)
│   │   ├── D7 Retention (40%)
│   │   ├── D30 Retention (25%)
│   │   └── Onboarding Completion Rate (75%)
│   │
│   ├── Core Loops
│   │   ├── Tasks Created per User per Week (8)
│   │   ├── Tasks Completed per User per Week (6.5)
│   │   ├── Task Completion Rate (81%)
│   │   └── Time to First Task (< 5 min from signup)
│   │
│   ├── Session Quality
│   │   ├── DAU/MAU Ratio (> 0.35)
│   │   ├── Session Duration (12-18 min sweet spot)
│   │   ├── Sessions per User per Week (4.5)
│   │   └── Bounce Rate (< 40%)
│   │
│   └── Feature Adoption
│       ├── Features Tried per User per Week (5)
│       ├── % Users Trying ≥ 10 Features in 30d (60%)
│       ├── Feature Stickiness (30d retention per feature)
│       └── Cross-Feature Usage (avg features per session: 3)
│
├── DELIGHT METRICS (Love It)
│   ├── Gamification
│   │   ├── % Users Unlocking ≥1 Emblem per 30d (60%)
│   │   ├── Streak Maintenance Rate (40% reach 7 days)
│   │   ├── Achievement Completion Rate (25% of available)
│   │   └── Leaderboard Engagement (20% check weekly)
│   │
│   ├── Satisfaction
│   │   ├── NPS Score (≥ 50)
│   │   ├── CSAT Score (≥ 4.5/5)
│   │   ├── Feature Satisfaction (per feature ≥ 4.0/5)
│   │   └── Support Ticket Volume (< 0.1 per user per month)
│   │
│   └── Advocacy
│       ├── Referral Rate (15% invite others)
│       ├── Social Shares (5% share achievements)
│       ├── Review Rating (≥ 4.5/5 on app stores)
│       └── Word of Mouth (NPS promoters > 50%)
│
├── BUSINESS METRICS (Sustainability)
│   ├── Conversion
│   │   ├── Free to Premium Conversion (8.5%)
│   │   ├── Trial to Paid Conversion (35%)
│   │   ├── Time to Conversion (median < 14 days)
│   │   └── Conversion Funnel Completion (60%)
│   │
│   ├── Revenue
│   │   ├── MRR Growth (15% per month)
│   │   ├── ARPU (Average Revenue Per User)
│   │   ├── LTV (Lifetime Value)
│   │   └── LTV:CAC Ratio (> 3:1)
│   │
│   └── Retention
│       ├── Churn Rate (< 5% per month)
│       ├── Reactivation Rate (20% of churned)
│       ├── Expansion Revenue (30% upgrade/year)
│       └── Contract Value Growth (15%/year)
│
└── QUALITY METRICS (Reliability)
    ├── Technical Quality
    │   ├── Crash-Free Rate (> 99.9%)
    │   ├── Bug Escape Rate (< 0.5 per 1k sessions)
    │   ├── API Error Rate (< 0.1%)
    │   └── Uptime (99.9%)
    │
    ├── Performance (Core Web Vitals - p75)
    │   ├── LCP - Largest Contentful Paint (< 2.0s)
    │   ├── INP - Interaction to Next Paint (< 200ms)
    │   ├── CLS - Cumulative Layout Shift (< 0.1)
    │   └── TTFB - Time to First Byte (< 600ms)
    │
    └── Accessibility
        ├── WCAG 2.2 AA Conformance (100%)
        ├── Keyboard Navigation Success (100%)
        ├── Screen Reader Compatibility (100%)
        └── Touch Target Compliance (100% ≥ 44×44px)
```

---

## METRIC IMPLEMENTATION PRIORITY

### Tier 1: CRITICAL (Implement First)
1. **User Registration** → Measures growth
2. **Task Created/Completed** → Core loop
3. **Energy Logged/Updated** → North Star input
4. **Page Views** → Basic engagement
5. **Errors** → Quality signal

### Tier 2: HIGH (Week 2)
6. **AI Suggestion Shown/Accepted** → AI effectiveness
7. **Budget Fit Calculated** → Budget feature value
8. **Achievement Unlocked** → Gamification success
9. **Feature Used** → Adoption tracking
10. **Session Duration** → Engagement depth

### Tier 3: MEDIUM (Week 3-4)
11. **Onboarding Steps** → Activation funnel
12. **Explainability Viewed** → Trust building
13. **Team Actions** → Collaboration value
14. **Web Vitals** → Performance tracking
15. **Premium Upgrade** → Revenue

---

## DASHBOARDS TO BUILD

### 1. EXECUTIVE DASHBOARD
**Audience:** Founder/Leadership  
**Metrics:**
- EMTCR (North Star)
- DAU/MAU
- Weekly Active Tasks
- Premium Conversion Rate
- NPS Score

**Update:** Real-time

---

### 2. PRODUCT DASHBOARD
**Audience:** Product team  
**Metrics:**
- Feature adoption rates
- Task success rates
- AI suggestion acceptance
- User journey completion
- Drop-off points

**Update:** Daily

---

### 3. ENGINEERING DASHBOARD
**Audience:** Developers  
**Metrics:**
- Core Web Vitals
- Error rates
- API latency
- Build/deploy stats
- Bundle sizes

**Update:** Real-time

---

### 4. GROWTH DASHBOARD
**Audience:** Marketing  
**Metrics:**
- New user registrations
- Activation rate (first task)
- Retention curves (D1/D7/D30)
- Referral rate
- CAC and LTV

**Update:** Daily

---

## SUCCESS CRITERIA

### 3 Months
- EMTCR: 45% (from baseline ~30%)
- DAU/MAU: 0.30
- Premium Conversion: 5%
- NPS: 40

### 6 Months
- EMTCR: 50%
- DAU/MAU: 0.35
- Premium Conversion: 7%
- NPS: 50
- WCAG AA: 100%

### 12 Months (LEGENDARY)
- EMTCR: 55% ⭐
- DAU/MAU: 0.40
- Premium Conversion: 8.5%
- NPS: 60
- All Quality Gates: PASSING

---

*For implementation guidance, see SYNCSCRIPT_LEGENDARY_AUDIT.md*
EOF
