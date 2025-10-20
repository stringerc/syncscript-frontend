# Feature Inventory Scanner Prompt

## Objective
Scan the SyncScript codebase and produce a comprehensive feature inventory report that maps every route, screen, component, feature flag, and data dependency.

## Output Requirements

### Primary Output: `audits/reports/feature-inventory.csv`
Include the following columns:
- `route`: URL path (e.g., `/home`, `/plan`, `/manage?tab=money`)
- `file_path`: Component file location (e.g., `src/app/home/page.tsx`)
- `screen_component`: Main component name (e.g., `HomeMode`, `PlanMode`)
- `parent_layout`: Layout component (e.g., `DashboardLayout`, `AuthLayout`)
- `guard_flag`: Authentication/feature flags (e.g., `useFlags.home`, `ui.plan.v2`)
- `linked_api_hooks`: Data dependencies (e.g., `useEnergy`, `useTasks|useEnergy`)
- `visible_primary_actions`: Buttons, menu items (e.g., `[Add Task|Ask AI|Start Script]`)
- `auth_required`: Authentication status (`public`, `protected`, `required`)
- `feature_category`: Feature grouping (e.g., `productivity`, `analytics`, `settings`)
- `last_modified`: Last file modification date
- `test_coverage`: Test file existence (`yes`, `no`, `partial`)

### Secondary Output: `audits/reports/feature-inventory-summary.md`
Include:
- Component hierarchy diagram
- Data flow diagrams
- Feature categorization summary
- Authentication flow mapping
- Missing test coverage analysis

## Scanning Targets

### Next.js App Router
- `/app/**/page.tsx` - All page components
- `/app/**/layout.tsx` - Layout components
- `/app/**/loading.tsx` - Loading states
- `/app/**/error.tsx` - Error boundaries
- Dynamic routes: `[param]`, `[...slug]`
- `generateMetadata` functions

### Legacy Routes (if any)
- React Router config files
- `createBrowserRouter` configurations
- Route component definitions

### Component Discovery
- Screen-level components: `*Page.tsx`, `*Screen.tsx`, `*View.tsx`
- Modal components: `*Modal.tsx`, `*Dialog.tsx`
- Form components: `*Form.tsx`, `*Editor.tsx`

### Data Dependencies
- `useQuery` hooks (React Query)
- `useLoaderData` hooks
- `fetch` calls
- GraphQL queries
- WebSocket connections
- Local storage usage

### Feature Flags
- `useFlags` hook usage
- Environment variable flags
- A/B testing configurations
- Feature toggle implementations

## Implementation Steps

1. **Route Discovery**
   ```bash
   find app/ -name "page.tsx" -type f
   find app/ -name "layout.tsx" -type f
   grep -r "export default function.*Page" src/
   ```

2. **Component Analysis**
   ```bash
   grep -r "useQuery\|useLoaderData\|fetch\|useSWR" src/
   grep -r "useFlags\|process.env.*FLAG" src/
   ```

3. **Authentication Mapping**
   ```bash
   grep -r "auth\|login\|protected\|middleware" app/
   grep -r "useAuth\|useUser\|isAuthenticated" src/
   ```

4. **Test Coverage Check**
   ```bash
   find src/ -name "*.test.tsx" -o -name "*.spec.tsx"
   find src/ -name "*.stories.tsx"
   ```

## Quality Checks

### Data Validation
- Ensure all routes have corresponding components
- Verify authentication requirements are consistent
- Check for orphaned components without routes
- Validate feature flag usage

### Completeness
- 100% route coverage
- All major components identified
- Complete data dependency mapping
- Full authentication flow coverage

### Accuracy
- Verify file paths exist
- Confirm component names match exports
- Validate API hook usage
- Check feature flag definitions

## Error Handling

### Missing Data
- Log missing components with suggestions
- Flag routes without authentication guards
- Identify components without data sources
- Report missing test files

### Inconsistencies
- Flag duplicate route definitions
- Report conflicting authentication requirements
- Identify unused feature flags
- Check for circular dependencies

## Success Criteria

- [ ] All routes mapped to components
- [ ] Complete data dependency graph
- [ ] Authentication flow documented
- [ ] Feature flags catalogued
- [ ] Test coverage assessed
- [ ] Report generated successfully
- [ ] No critical errors in scan

## Example Output Format

### CSV Sample
```csv
route,file_path,screen_component,parent_layout,guard_flag,linked_api_hooks,visible_primary_actions,auth_required,feature_category,last_modified,test_coverage
/home,src/app/home/page.tsx,HomeMode,DashboardLayout,useFlags.home,useEnergy,"[Add Task|Ask AI|Start Script]",required,productivity,2024-10-16,yes
/do,src/app/do/page.tsx,DoMode,DashboardLayout,,useTasks|useEnergy,"[Complete|Filter|Start Script]",required,productivity,2024-10-16,partial
/plan,src/app/plan/page.tsx,PlanMode,DashboardLayout,ui.plan.v2,useCalendar|useRouteETA,"[New Event|Export]",required,planning,2024-10-16,no
```

### Markdown Summary Sample
```markdown
# Feature Inventory Summary

## Overview
- Total Routes: 25
- Total Components: 47
- Authentication Required: 18
- Public Routes: 7
- Feature Flags: 12

## Component Hierarchy
- DashboardLayout (18 children)
- AuthLayout (7 children)
- PublicLayout (7 children)

## Data Dependencies
- API Hooks: 23
- Local Storage: 8
- WebSocket: 3
- GraphQL: 2
```
