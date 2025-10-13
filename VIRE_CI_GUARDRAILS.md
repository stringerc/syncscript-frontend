# 🚧 VIRE CI Guardrails

**Automated Quality Gates & Regression Prevention**  
**Last Updated:** October 13, 2025  
**Status:** Framework Ready for Implementation

---

## 🎯 PURPOSE

CI Guardrails prevent visual regressions by:
1. **Blocking** PRs that introduce visual bugs
2. **Enforcing** design system usage
3. **Validating** accessibility compliance
4. **Monitoring** performance metrics

**Philosophy:** Once fixed, stays fixed forever.

---

## 🔒 QUALITY GATES

### **Gate 1: Visual Regression Detection**

**Tool:** Percy, Chromatic, or Applitools

**Configuration:**
```yaml
# .github/workflows/visual-regression.yml
name: Visual Regression Tests

on: [pull_request]

jobs:
  visual-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      
      # Build production bundle
      - run: npm ci
      - run: npm run build
      
      # Run visual tests
      - run: npm run test:visual
      
      # Upload to Percy
      - run: npx percy snapshot ./out
        env:
          PERCY_TOKEN: ${{ secrets.PERCY_TOKEN }}
```

**Thresholds:**
- Pixel difference: < 0.1% acceptable
- New snapshots: Require manual approval
- Critical pages: 0% difference allowed

**Blocks PR if:**
- Visual diff > threshold
- New UI without baseline
- Snapshots not approved

---

### **Gate 2: Accessibility Validation**

**Tool:** axe-core + pa11y

**Configuration:**
```yaml
# .github/workflows/accessibility.yml
name: Accessibility Tests

on: [pull_request]

jobs:
  a11y-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      
      # Axe-core tests
      - run: npm run test:a11y
      
      # Pa11y CI
      - run: npm run pa11y-ci
```

**Test Scripts:**
```json
{
  "scripts": {
    "test:a11y": "jest --config jest.a11y.config.js",
    "pa11y-ci": "pa11y-ci --config pa11y.config.json"
  }
}
```

**Blocks PR if:**
- Critical a11y violations (WCAG A/AA)
- Missing alt text on images
- Form inputs without labels
- Focus management broken
- Contrast ratio < 4.5:1

---

### **Gate 3: Performance Budgets**

**Tool:** Lighthouse CI

**Configuration:**
```json
// lighthouserc.json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "url": [
        "http://localhost:3000/",
        "http://localhost:3000/dashboard",
        "http://localhost:3000/features"
      ]
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.95}],
        "first-contentful-paint": ["error", {"maxNumericValue": 2000}],
        "largest-contentful-paint": ["error", {"maxNumericValue": 2500}],
        "cumulative-layout-shift": ["error", {"maxNumericValue": 0.1}],
        "total-blocking-time": ["error", {"maxNumericValue": 300}]
      }
    }
  }
}
```

**Blocks PR if:**
- Performance score < 90
- LCP > 2.5s
- CLS > 0.10
- FCP > 2.0s
- Accessibility score < 95

---

### **Gate 4: Design Token Enforcement**

**Tool:** Custom ESLint/Stylelint Rules

**Stylelint Configuration:**
```javascript
// stylelint.config.js
module.exports = {
  rules: {
    // No hardcoded colors
    "color-no-hex": true,
    
    // Require CSS variables
    "function-disallowed-list": [
      "rgb", "rgba", "hsl", "hsla"
    ],
    
    // No magic numbers
    "declaration-property-value-disallowed-list": {
      "/^(width|height|margin|padding)/": [
        "/^[0-9]+px$/", // Block direct pixel values
      ]
    },
    
    // Require design system z-index
    "declaration-property-value-allowed-list": {
      "z-index": [
        "/^var\\(--z-/", // Must use token
      ]
    }
  }
};
```

**Blocks PR if:**
- Hardcoded hex colors (use tokens)
- Direct pixel values (use tokens)
- Random z-index numbers
- Non-system fonts

---

### **Gate 5: Bundle Size Budget**

**Tool:** size-limit

**Configuration:**
```json
// .size-limit.json
[
  {
    "name": "Homepage",
    "path": ".next/static/chunks/app/page-*.js",
    "limit": "150 KB"
  },
  {
    "name": "Dashboard",
    "path": ".next/static/chunks/app/dashboard-*.js",
    "limit": "200 KB"
  },
  {
    "name": "Total CSS",
    "path": ".next/static/css/*.css",
    "limit": "50 KB"
  }
]
```

**Blocks PR if:**
- Any bundle exceeds limit
- Total size increases > 10% without justification

---

## 🔄 PR WORKFLOW

### **Step 1: Developer Makes Changes**

```bash
git checkout -b feature/new-component
# ... make changes ...
git commit -m "feat: Add new component"
git push origin feature/new-component
```

---

### **Step 2: Create Pull Request**

PR created → **All CI checks triggered automatically**

```
✓ Build successful
✓ TypeScript type check
✓ ESLint (code quality)
✓ Stylelint (CSS quality) 
⏳ Visual regression (Percy)
⏳ Accessibility tests
⏳ Performance budget
⏳ Lighthouse CI
```

---

### **Step 3: Automated Gates Run**

**Visual Regression:**
- Playwright captures screenshots
- Percy compares to baseline
- Highlights differences
- **If diff > 0.1%:** Requires review
- **If approved:** Baseline updated

**Accessibility:**
- axe-core scans all pages
- pa11y validates WCAG
- **If violations:** PR blocked ❌
- **If clean:** PR approved ✅

**Performance:**
- Lighthouse runs 3 times
- Averages scores
- **If below budget:** PR blocked ❌
- **If passes:** PR approved ✅

**Design Tokens:**
- Stylelint validates CSS
- ESLint validates components
- **If violations:** PR blocked ❌
- **If clean:** PR approved ✅

---

### **Step 4: Manual Review (If Needed)**

**Visual Changes:**
- Reviewer sees before/after screenshots
- Approves or requests changes
- Comments on specific pixels

**Accessibility Changes:**
- Reviewer tests with screen reader
- Validates keyboard navigation
- Approves or requests fixes

---

### **Step 5: Merge (All Gates Green)**

```
✅ Visual regression: Approved
✅ Accessibility: Pass
✅ Performance: Pass
✅ Design tokens: Pass
✅ Code review: Approved

→ MERGE TO MAIN ✅
```

**Result:** Protected main branch, zero regressions

---

## 🛠️ IMPLEMENTATION GUIDE

### **Step 1: Install Tools**

```bash
# Visual regression
npm install --save-dev @percy/cli @percy/playwright

# Accessibility
npm install --save-dev @axe-core/playwright pa11y-ci jest-axe

# Performance
npm install --save-dev @lhci/cli size-limit

# Linting
npm install --save-dev stylelint stylelint-config-standard
```

---

### **Step 2: Configure package.json**

```json
{
  "scripts": {
    "test:visual": "playwright test --config=playwright.config.ts",
    "test:a11y": "jest --config=jest.a11y.config.js",
    "pa11y": "pa11y-ci",
    "lighthouse": "lhci autorun",
    "lint:css": "stylelint '**/*.css'",
    "size": "size-limit"
  }
}
```

---

### **Step 3: Add GitHub Actions**

**File:** `.github/workflows/visual-qa.yml`

```yaml
name: Visual QA Pipeline

on:
  pull_request:
    branches: [main]

jobs:
  visual-regression:
    name: Visual Regression Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Install Playwright browsers
        run: npx playwright install --with-deps
      
      - name: Run visual tests
        run: npm run test:visual
      
      - name: Upload to Percy
        run: npx percy snapshot ./screenshots
        env:
          PERCY_TOKEN: ${{ secrets.PERCY_TOKEN }}

  accessibility:
    name: Accessibility Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run axe tests
        run: npm run test:a11y
      
      - name: Run pa11y
        run: npm run pa11y

  performance:
    name: Performance Budget
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Run Lighthouse CI
        run: npm run lighthouse
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
      
      - name: Check bundle size
        run: npm run size

  design-tokens:
    name: Design Token Enforcement
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      
      - name: Install dependencies
        run: npm ci
      
      - name: Lint CSS
        run: npm run lint:css
      
      - name: Lint JavaScript
        run: npm run lint
```

---

### **Step 4: Configure Branch Protection**

**GitHub → Settings → Branches → Protection Rules:**

```
Branch: main

✅ Require pull request before merging
✅ Require status checks to pass
  Required checks:
  - visual-regression
  - accessibility
  - performance
  - design-tokens
✅ Require conversation resolution
✅ Do not allow bypassing
```

---

## 📊 MONITORING DASHBOARD

### **Post-Merge Monitoring**

**Vercel Analytics:**
- CLS field data (real users)
- LCP field data
- Device/browser breakdown

**Sentry:**
- UI error rate
- Error trends
- User impact

**Custom Dashboard:**
```javascript
// Visual Quality Metrics
{
  "visualRegressions": 0, // Per week
  "a11yViolations": 0,    // Per week
  "perfRegressions": 0,   // Per week
  "designTokenViolations": 0,
  
  "ciBlockRate": "5%",    // PRs blocked by CI
  "falsePositiveRate": "2%", // Incorrect blocks
  "timeToFix": "4.2 hours" // Avg time to fix blocked PR
}
```

---

## ⚠️ HANDLING BLOCKED PRS

### **Visual Regression Blocked**

**Why:** Percy detected pixel differences

**Developer Actions:**
1. Review Percy screenshot comparison
2. **If intentional change:**
   - Document reason in PR
   - Request manual approval from Visual QA Lead
   - Approve new baseline in Percy
3. **If unintentional regression:**
   - Fix the CSS/component
   - Re-run CI
   - Verify green

---

### **Accessibility Blocked**

**Why:** axe-core or pa11y found violations

**Developer Actions:**
1. Review violation report
2. Fix issues:
   - Add missing alt text
   - Add ARIA labels
   - Fix contrast
   - Fix focus management
3. Re-run `npm run test:a11y` locally
4. Push fix, wait for CI

---

### **Performance Blocked**

**Why:** Bundle size exceeded or Lighthouse score < 90

**Developer Actions:**
1. Analyze bundle with `npm run analyze`
2. Optimize:
   - Code-split large dependencies
   - Lazy load non-critical components
   - Remove unused imports
   - Compress images
3. Re-run `npm run build` and `npm run lighthouse`
4. Verify improvements

---

### **Design Token Blocked**

**Why:** Stylelint found hardcoded values

**Developer Actions:**
1. Review Stylelint report
2. Replace hardcoded values:
   ```css
   /* ❌ Before */
   .button {
     padding: 12px 24px;
     color: #3399FF;
   }
   
   /* ✅ After */
   .button {
     padding: var(--space-3) var(--space-6);
     color: var(--color-syncscript-blue-500);
   }
   ```
3. Re-run `npm run lint:css`
4. Push fix

---

## 🎯 GUARDRAIL CONFIGURATION FILES

### **Percy Config**

```javascript
// .percy.yml
version: 2
static:
  files: '**/*.html'
  baseUrl: '/'
snapshot:
  widths: [375, 768, 1440, 1920]
  minHeight: 1024
  enableJavaScript: true
  discovery:
    allowedHostnames:
      - localhost
      - www.syncscript.app
```

---

### **Pa11y Config**

```json
// .pa11yci.json
{
  "defaults": {
    "standard": "WCAG2AA",
    "runners": ["axe", "htmlcs"],
    "ignore": [],
    "chromeLaunchConfig": {
      "args": ["--no-sandbox"]
    }
  },
  "urls": [
    "http://localhost:3000/",
    "http://localhost:3000/features",
    "http://localhost:3000/login",
    "http://localhost:3000/register",
    "http://localhost:3000/about",
    "http://localhost:3000/help"
  ]
}
```

---

### **Lighthouse CI Config**

```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      startServerCommand: 'npm run start',
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/features',
        'http://localhost:3000/dashboard'
      ]
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['error', {minScore: 0.9}],
        'categories:accessibility': ['error', {minScore: 0.95}],
        'categories:best-practices': ['error', {minScore: 0.9}],
        'categories:seo': ['error', {minScore: 0.9}],
        
        'cumulative-layout-shift': ['error', {maxNumericValue: 0.1}],
        'total-blocking-time': ['error', {maxNumericValue: 300}],
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};
```

---

### **Stylelint Config**

```javascript
// stylelint.config.js
module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    // No hardcoded colors
    'color-no-hex': [true, {
      message: 'Use design tokens: var(--color-*)'
    }],
    
    // No magic z-index
    'declaration-property-value-allowed-list': {
      'z-index': ['/^var\\(--z-/'],
    },
    
    // No fixed dimensions on dynamic content
    'declaration-property-value-disallowed-list': {
      'height': ['/^\\d+px$/'],
      'width': ['/^(100%|[0-9]+px)$/']
    },
    
    // Require design system spacing
    'declaration-property-value-allowed-list': {
      '/^(margin|padding)/': [
        '/^var\\(--space-/', // Must use tokens
        '0', 'auto', 'inherit'
      ]
    }
  }
};
```

---

### **Size Limit Config**

```javascript
// .size-limit.js
module.exports = [
  {
    name: 'Homepage Bundle',
    path: '.next/static/chunks/app/page-*.js',
    limit: '150 KB',
    gzip: true
  },
  {
    name: 'Dashboard Bundle',
    path: '.next/static/chunks/app/dashboard/page-*.js',
    limit: '250 KB', // Larger due to features
    gzip: true
  },
  {
    name: 'Vendor Bundle',
    path: '.next/static/chunks/vendor-*.js',
    limit: '300 KB',
    gzip: true
  },
  {
    name: 'Total CSS',
    path: '.next/static/css/*.css',
    limit: '60 KB',
    gzip: true
  }
];
```

---

## 🚨 ALERTS & NOTIFICATIONS

### **Slack Integration**

**Failed CI → Slack Notification:**
```yaml
# In GitHub Actions
- name: Notify Slack on Failure
  if: failure()
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    text: '🚨 Visual QA Failed!'
    fields: repo,message,commit,author
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
```

---

### **Email Digest**

**Weekly Summary Email:**
- PRs blocked this week: X
- Top blocking reasons: Visual regression (60%), A11y (20%), Perf (15%), Tokens (5%)
- Average time to fix: 4.2 hours
- False positive rate: 2%

---

## 📈 METRICS & DASHBOARDS

### **Guardrail Effectiveness**

Track over time:

| Week | PRs Total | Blocked | Block Rate | Regressions Prevented |
|------|-----------|---------|------------|------------------------|
| W1 | 12 | 2 | 17% | 2 visual, 1 a11y |
| W2 | 15 | 1 | 7% | 1 performance |
| W3 | 10 | 0 | 0% | 0 (trend improving!) |

**Success Metric:** Block rate decreases over time (team learns)

---

### **Quality Trend Dashboard**

```
Visual Regressions Over Time:
Week 1: ███ 3 issues
Week 2: ██ 2 issues
Week 3: █ 1 issue
Week 4:  0 issues ✅

A11y Violations Over Time:
Week 1: ██ 2 violations
Week 2: █ 1 violation
Week 3:  0 violations ✅
Week 4:  0 violations ✅

Performance Budget:
Week 1: ████ 4 over budget
Week 2: ██ 2 over budget
Week 3: █ 1 over budget
Week 4:  0 over budget ✅
```

---

## 🎯 ROLLOUT PLAN

### **Phase 1: Advisory Mode (Week 1-2)**

- **Gates:** Report only (don't block)
- **Purpose:** Establish baselines, train team
- **Action:** Developers see warnings, not blockers

---

### **Phase 2: Soft Enforcement (Week 3-4)**

- **Gates:** Block P0 issues only
- **Purpose:** Catch critical regressions
- **Allow:** Manual override with approval

---

### **Phase 3: Full Enforcement (Week 5+)**

- **Gates:** Block all violations
- **Purpose:** Zero regressions
- **Override:** Requires VP Engineering approval

---

## ✅ SUCCESS CRITERIA

**Guardrails are Working When:**

- [ ] Zero visual regressions merge to main
- [ ] Zero a11y violations in production
- [ ] Performance budgets never exceeded
- [ ] Design system used 100%
- [ ] Developer satisfaction > 80% (not too annoying)
- [ ] False positive rate < 5%
- [ ] Fix time < 6 hours average

---

## 🎉 BENEFITS

**For Users:**
- Consistent visual experience
- Always accessible
- Always performant
- Professional quality

**For Developers:**
- Catch issues before code review
- Automated feedback
- Learn best practices
- Confidence in changes

**For Business:**
- Protect brand quality
- Reduce bug fix costs
- Faster releases (fewer rollbacks)
- Lower support burden

---

## 📋 MAINTENANCE

**Monthly:**
- Review false positive rate
- Tune thresholds if needed
- Update baselines for intentional changes
- Review blocked PR patterns

**Quarterly:**
- Audit gate effectiveness
- Survey developer satisfaction
- Optimize slow gates
- Add new checks as needed

---

## ✅ IMPLEMENTATION STATUS

**Current:**
- [ ] Percy/Chromatic account (not set up yet)
- [x] Lighthouse CI config ready ✅
- [ ] Pa11y config ready ✅
- [ ] Stylelint rules defined ✅
- [ ] GitHub Actions workflows created ✅
- [ ] Branch protection configured (pending)

**Next Steps:**
1. Sign up for Percy or Chromatic
2. Add secrets to GitHub (PERCY_TOKEN, etc.)
3. Enable branch protection on main
4. Run first baseline captures
5. Enter advisory mode for 2 weeks
6. Full enforcement after team trained

**ETA to Full Operation:** 2-3 weeks

---

*Guardrails Designed By: Release Captain*  
*Implementation: SDET Lead*  
*Status: Framework Complete, Rollout Pending*

