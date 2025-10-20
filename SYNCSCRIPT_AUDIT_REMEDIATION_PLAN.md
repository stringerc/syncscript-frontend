# SyncScript Audit & Remediation Plan (Cursor-Ready)

## Executive Summary

This comprehensive audit and remediation plan will systematically validate every feature, route, component, and data flow in the SyncScript platform. The plan ensures zero dead buttons, eliminates mock-only surfaces, and establishes robust CI/CD quality gates to prevent regression.

## Deliverables Overview

### 📊 **Feature Inventory Report** (markdown/CSV)
- Every route, screen, component, feature flag, and data dependency
- Complete mapping of user-facing functionality
- Authentication requirements and access controls

### 🎭 **Mock Data Map** (markdown/CSV)
- Location of all mock data sources
- Mocking methods and intended real sources
- Migration steps and risk assessment

### 📈 **Live Data Readiness Matrix** (CSV)
- Per-feature status: Mocked / Partially Live / Live
- Data contracts, environment variables, owners, ETAs
- Specific gaps and remediation steps

### 🚫 **Dead-End Map** (JSON/CSV)
- Routes that 404 or show blank content
- Components without data sources
- Buttons with no effect or functionality

### 🔧 **Remediation Plan** (Ordered Backlog)
- Prioritized PRs with owners and CI checks
- Prevention mechanisms to avoid recurrence
- Success criteria and validation gates

---

## Phase 0 — One-time Scaffolding (1 day)

### Repository Structure Additions

```
/audits/
├── playwright/              # E2E & crawlers
│   ├── crawler.spec.ts      # Main route crawler
│   ├── dead-button-detector.spec.ts
│   ├── auth-helper.ts       # Authentication utilities
│   └── fixtures/            # Test data and screenshots
├── static-analysis/         # Code scanners
│   ├── route-scanner.js     # Route discovery
│   ├── component-scanner.js # Component mapping
│   └── mock-detector.js     # Mock data detection
├── contracts/               # API schemas
│   ├── calendar.schema.ts   # Calendar API contract
│   ├── budget.schema.ts     # Budget API contract
│   ├── energy.schema.ts     # Energy API contract
│   └── tasks.schema.ts      # Tasks API contract
└── reports/                 # Generated reports
    ├── feature-inventory.csv
    ├── mock-map.csv
    ├── live-data-matrix.csv
    ├── dead-ends.json
    └── screenshots/

/system/
└── cursor/
    ├── rules.md             # Cursor operation guidelines
    └── prompts/            # Prewritten prompts
        ├── feature-inventory.md
        ├── mock-scan.md
        ├── crawler.md
        ├── contract-extract.md
        └── readiness-matrix.md
```

### CI Gates (New)

**PR to main:**
- Full audit job execution
- Build fails if: new dead buttons detected, new mock-only surfaces added without migration ticket, routes without data contracts

**Nightly on develop:**
- Complete feature inventory update
- Mock data detection scan
- Dead-end route detection
- Performance regression checks

---

## Phase 1 — Discover & Enumerate (2–3 days)

### 1) Build the Feature Inventory

**Static Scan Targets:**
- Next.js: `/app/**/page.tsx`, `/app/**/layout.tsx`, dynamic routes `[param]`, `generateMetadata`
- Legacy: React Router config, `createBrowserRouter`, Route components
- Component scan for "screen-level" components (naming heuristics: `*Page.tsx`, `*Screen.tsx`, `*View.tsx`)
- Storybook scrape: list components/stories—mocks often live in stories

**Cursor Prompt** (`/system/cursor/prompts/feature-inventory.md`):
```markdown
Scan the codebase and produce audits/reports/feature-inventory.csv with:
- route: URL path
- file_path: component file location
- screen_component: main component name
- parent_layout: layout component
- guard_flag: authentication/feature flags
- linked_api_hooks: data dependencies (e.g., useQuery('...'))
- visible_primary_actions: buttons, menu items
- auth_required: public/protected status

Output CSV + markdown summary with component hierarchy and data flow diagrams.
```

### 2) Detect Mock Data

**Common Patterns to Search:**
- Libraries: `msw`, `faker`, `chance`, `json-server`, `miragejs`, `axios-mock-adapter`, `nock`
- Filenames: `/__mocks__/`, `*.mock.ts`, `fixtures/`, `seeds/`, `sampleData`, `stub`, `storyData`
- Dev toggles: `USE_MOCKS`, `NEXT_PUBLIC_*_MOCK`, `process.env.MOCK`
- Inline sentinel: `TODO: wire`, `// mock`, `// temp`, `data: []` defaults that never update

**Cursor Prompt** (`/system/cursor/prompts/mock-scan.md`):
```markdown
Search for mocks and produce audits/reports/mock-map.csv with columns:
- location: file path
- pattern: msw/faker/etc.
- feature_screen_impacted: affected functionality
- current_api_hook: existing data hook (if any)
- intended_real_source: target API (if referenced)
- risk: High (user-visible), Medium (admin-only), Low (story/dev-only)

Generate markdown Mock Map with code excerpts and migration recommendations.
```

### 3) Crawl the App → Dead Routes & Dead Buttons

**Playwright Spider Configuration:**
- Authenticated & unauthenticated sessions
- Three breakpoints: mobile (375px), tablet (768px), desktop (1920px)
- Light/dark theme testing
- Console error collection
- 404/500 error detection
- Blank content area identification
- Infinite loader detection

**Clickable Audit Process:**
- Click every button, `a[href]`, and `[role="button"]` once per screen
- Flag if no DOM change, no navigation, no network call, no aria/state change within 2s
- Record screenshots before/after each interaction

**Cursor Prompt** (`/system/cursor/prompts/crawler.md`):
```markdown
Create Playwright scripts in audits/playwright to:
(a) Traverse all routes from sitemap/route config
(b) Snapshot each state
(c) Click visible buttons/links once
(d) Record whether navigation, modal open, or network call occurred

Emit audits/reports/dead-ends.json and dead-buttons.csv.
Place screenshots in audits/reports/screens/.
```

---

## Phase 2 — Contracts & Real Data Plan (2–4 days)

### 4) Contract Extraction

**Data Dependency Analysis:**
- Parse `useQuery`, `useLoaderData`, `fetch` calls, GraphQL documents
- If no typed schema: infer with Zod/TypeBox from usage
- Store per-endpoint contract in `/audits/contracts`

**Cursor Prompt** (`/system/cursor/prompts/contract-extract.md`):
```markdown
For each screen in feature-inventory.csv, list all data dependencies (hooks, fetches).
Generate a Zod schema for the expected response (based on usage) and save to audits/contracts/<feature>.schema.ts.
Note missing schemas and provide implementation recommendations.
```

### 5) Live Data Readiness Matrix

**Matrix Components:**
- Feature name and route
- Data source and contract status
- Environment variables required
- Current state (Mocked/Partial/Live)
- Specific gaps and blockers
- Owner assignment and ETA

**Cursor Prompt** (`/system/cursor/prompts/readiness-matrix.md`):
```markdown
Join feature-inventory.csv, mock-map.csv, and extracted contracts to produce audits/reports/live-data-matrix.csv with:
- feature: feature name
- route: URL path
- data_source: API endpoint
- contract: schema file
- env_vars: required environment variables
- current_state: Mocked/Partial/Live
- gaps: specific blockers
- owner: responsible team member
- eta: completion date
```

### 6) Adapter Pattern Plan

**Data Adapter Architecture:**
- Create per-feature data adapters in `/src/data/<domain>/adapter.ts`
- Adapters translate API → UI contracts
- Screens only consume adapters, not raw API calls
- Unit-tested with comprehensive coverage
- ESLint rule forbids direct fetch/axios from screen components

---

## Phase 3 — Remediate & Lock It Down (1–3 weeks, incremental)

### 7) Fix Dead Ends & Dead Buttons First

**Auto-Generated Tickets:**
- Generate tickets from `dead-ends.json` with suggested actions:
  - Wire functionality
  - Remove unused elements
  - Hide behind feature flag
  - Replace with explainer text

**No-Op Click Guard:**
- Any interactive element must trigger:
  - `aria-live` announcement
  - `disabled` → `loading` state
  - Modal open
  - Route change
  - Network call
- Lint rule fails if none of these occur

### 8) Replace Mocks with Real Data (Adapter-First)

**Order of Operations per Feature:**
1. Contract agreed (documented in `/audits/contracts`)
2. Environment set (dev/stage/prod keys; secrets rotated)
3. Adapter implemented with retry & fallback rules
4. Loader skeletons/empty/error states added (no blank screens)
5. Playwright E2E updated to assert live data flows
6. Visual regression baselined (Chromatic/Percy)
7. Flip flag: `mock=false` for that feature in staging, then prod (gradual)

### 9) CI Quality Bars (Can't Regress)

**Required CI Checks:**
- Playwright "click audit" must show 0 new dead buttons
- Lighthouse CI budgets for LCP/INP/CLS (mock removal often changes payloads)
- Axe a11y: no new violations
- Contract tests (Pact or Zod validation): fail if API breaks the schema
- Coverage: adapters and loaders ≥ 90% branch coverage

---

## Implementation Scripts (Ready-to-Use)

### Static Analysis (TS/JS)

**Route Discovery Script:**
```bash
# Find all routes and components
grep -r "page.tsx\|layout.tsx" app/ --include="*.tsx"
grep -r "Route path=" src/ --include="*.tsx"
grep -r "export default function.*Page" src/ --include="*.tsx"
```

**Mock Detection Script:**
```bash
# Find mock libraries and patterns
grep -r "msw\|faker\|mirage\|__mocks__\|fixtures\|json-server\|axios-mock-adapter" src/
grep -r "process.env.*MOCK\|USE_MOCKS\|NEXT_PUBLIC.*MOCK" src/
```

### Playwright Crawler Essentials

**Authentication Helper:**
```typescript
// audits/playwright/auth-helper.ts
export class AuthHelper {
  async loginAsUser(page: Page) {
    // Auth0 dev account login
  }
  
  async loginAsAdmin(page: Page) {
    // Admin account login
  }
}
```

**Route Discovery:**
```typescript
// audits/playwright/route-discovery.ts
export class RouteDiscovery {
  async discoverRoutes(): Promise<string[]> {
    // Extract from sitemap or explore top nav + all links up to depth 3
  }
}
```

**Click Audit:**
```typescript
// audits/playwright/click-audit.ts
export class ClickAuditor {
  async auditClicks(page: Page, route: string) {
    // After each click, wait for one of:
    // - URL change
    // - network idle with XHR present
    // - aria-modal=true
    // - DOM mutation observer firing
  }
}
```

### Schema Extractor

**TypeScript Type Parser:**
```typescript
// audits/static-analysis/schema-extractor.ts
export class SchemaExtractor {
  parseAPIHooks(filePath: string): APIContract[] {
    // Parse TS types from API hooks
    // If missing, infer with Zod (optional fields allowed)
    // Save and import in adapter tests
  }
}
```

---

## Example Report Slices

### Feature Inventory (Excerpt)
```csv
route,screen,actions,dataHooks,flag,auth
/home,HomeMode,"[Add Task|Ask AI|Start Script]",useEnergy,useFlags.home,required
/do,DoMode,"[Complete|Filter|Start Script]",useTasks|useEnergy,,required
/plan,PlanMode,"[New Event|Export]",useCalendar|useRouteETA,ui.plan.v2,required
/manage?tab=money,MoneyTab,"[Add Expense|Set Budget]",useBudget,,required
```

### Mock Map (Excerpt)
```csv
location,pattern,feature,intended-source,risk
src/modes/plan/__mocks__/events.ts,fixtures,Calendar,Google/Outlook,Medium
src/modes/home/HomeMode.stories.tsx,storyData,Home Insights,Analytics,Low
src/data/budget/mockClient.ts,msw,Budget,Fin API,High
```

### Live Data Matrix (Excerpt)
```csv
feature,route,contract,status,gaps,owner,ETA
Calendar,/plan,contracts/calendar.schema.ts,Partial,"OAuth scope + rate-limit handling",FE Integrations,6d
Budget,/manage?tab=money,contracts/budget.schema.ts,Mocked,"API key + categorization mapper",Finance Eng,8d
Energy,/home|/do,contracts/energy.schema.ts,Live,none,Data Eng,done
```

### Dead Buttons (Excerpt)
```csv
route,selector,visibleText,issue
/plan,.btn-export,Export,"No network/navigation/modal after click (2s)"
/do,[data-testid="quick-script"],Morning Routine,"No-op (aria/state unchanged)"
```

---

## Prioritized Remediation Order

### 1. Dead Buttons / Blank Screens (User-Facing Papercuts)
- **Priority**: Critical
- **Impact**: User trust and experience
- **Timeline**: 1-2 days

### 2. Mocked Features Surfaced in Top Nav (Visibility High)
- **Priority**: High
- **Impact**: User perception of platform completeness
- **Timeline**: 3-5 days

### 3. Data Contracts for Remaining Mocks
- **Priority**: Medium
- **Impact**: Development velocity
- **Timeline**: 1 week

### 4. Adapters + Skeleton/Empty/Error States
- **Priority**: Medium
- **Impact**: User experience consistency
- **Timeline**: 1-2 weeks

### 5. Perf/A11y Passes After Data Goes Live
- **Priority**: Low
- **Impact**: Platform quality and accessibility
- **Timeline**: Ongoing

---

## Team Roles & Responsibilities

### Audit Tech Lead
- **Role**: Runs the entire process; accepts reports
- **Skills**: Full-stack, testing, CI/CD
- **Time**: 40% allocation

### Static Analysis Engineer
- **Role**: Builds scanners; owns inventory/mock map
- **Skills**: AST parsing, TypeScript, automation
- **Time**: 30% allocation

### E2E Lead (Playwright)
- **Role**: Owns crawler & dead-click detector
- **Skills**: Playwright, testing automation, browser APIs
- **Time**: 30% allocation

### Contracts & Adapters Engineer
- **Role**: Extracts schemas, builds adapters
- **Skills**: API design, Zod/TypeBox, data modeling
- **Time**: 25% allocation

### Integrations Engineer(s)
- **Role**: Wires OAuth/keys, quotas, retries
- **Skills**: API integration, authentication, rate limiting
- **Time**: 20% allocation

### Data PM
- **Role**: Prioritizes features to de-mock; tracks matrix
- **Skills**: Product management, data analysis, project coordination
- **Time**: 15% allocation

### QA Lead
- **Role**: Codifies CI gates, visual regression, a11y, perf budgets
- **Skills**: Quality assurance, CI/CD, performance testing
- **Time**: 20% allocation

---

## Success Criteria (Objective, Measurable)

### Phase 1 Completion
- [ ] Feature inventory covers 100% of routes and components
- [ ] Mock map identifies all mock data sources
- [ ] Dead-end detection script runs successfully
- [ ] Initial reports generated and reviewed

### Phase 2 Completion
- [ ] Data contracts defined for all features
- [ ] Live data readiness matrix completed
- [ ] Adapter pattern implemented for top 3 features
- [ ] CI gates configured and passing

### Phase 3 Completion
- [ ] 0 dead buttons, 0 dead routes in reports
- [ ] 100% of top-nav features in Live or Partial (no Mocked)
- [ ] All screens have contract + adapter + skeleton/empty/error states
- [ ] CI green: Playwright, Axe, Lighthouse budgets, contract tests
- [ ] No new mocks without a migration ticket auto-created

### Ongoing Success Metrics
- [ ] Zero regression in dead button detection
- [ ] 95%+ uptime for all live data endpoints
- [ ] <2s average response time for all user interactions
- [ ] 100% accessibility compliance (WCAG 2.1 AA)
- [ ] 90%+ test coverage for all adapters and data layers

---

## Implementation Timeline

### Week 1: Phase 0 + Phase 1 Start
- **Day 1**: Repository structure setup, CI gates configuration
- **Day 2-3**: Feature inventory and mock detection
- **Day 4-5**: Initial crawler setup and dead-end detection

### Week 2: Phase 1 Complete + Phase 2 Start
- **Day 1-2**: Complete crawler implementation and testing
- **Day 3-4**: Contract extraction and schema definition
- **Day 5**: Live data readiness matrix creation

### Week 3-4: Phase 2 Complete + Phase 3 Start
- **Week 3**: Adapter pattern implementation for priority features
- **Week 4**: Dead button fixes and mock replacement for top features

### Week 5-6: Phase 3 Completion
- **Week 5**: Complete mock replacement and CI quality bars
- **Week 6**: Final validation and documentation

---

## Risk Mitigation

### Technical Risks
- **Mock removal breaks UI**: Mitigated by adapter pattern and gradual rollout
- **Performance degradation**: Mitigated by Lighthouse CI budgets and monitoring
- **Data inconsistency**: Mitigated by contract testing and validation

### Process Risks
- **Scope creep**: Mitigated by strict success criteria and timeline
- **Resource constraints**: Mitigated by clear role definitions and time allocations
- **Quality regression**: Mitigated by comprehensive CI gates and automated testing

### Business Risks
- **User experience disruption**: Mitigated by gradual rollout and fallback mechanisms
- **Feature availability**: Mitigated by staged deployment and monitoring
- **Data security**: Mitigated by proper authentication and authorization checks

---

## Next Steps

1. **Immediate Actions** (Today):
   - Create repository structure (`/audits`, `/system/cursor`)
   - Set up initial CI gates
   - Begin feature inventory scan

2. **This Week**:
   - Complete Phase 0 scaffolding
   - Start Phase 1 discovery and enumeration
   - Generate initial reports

3. **Next Week**:
   - Complete Phase 1
   - Begin Phase 2 contracts and data planning
   - Start adapter pattern implementation

4. **Ongoing**:
   - Regular progress reviews
   - CI gate monitoring
   - Quality metric tracking

This comprehensive plan ensures systematic validation of the entire SyncScript platform while maintaining quality and preventing regression. The phased approach allows for incremental progress with clear success criteria and measurable outcomes.
