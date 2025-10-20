# Mock Data Detection Scanner Prompt

## Objective
Search for all mock data sources in the SyncScript codebase and produce a comprehensive mock map that identifies mocking methods, intended real sources, and migration steps.

## Output Requirements

### Primary Output: `audits/reports/mock-map.csv`
Include the following columns:
- `location`: File path (e.g., `src/modes/plan/__mocks__/events.ts`)
- `pattern`: Mocking method (e.g., `msw`, `faker`, `fixtures`, `storyData`)
- `feature_screen_impacted`: Affected functionality (e.g., `Calendar`, `Home Insights`)
- `current_api_hook`: Existing data hook (e.g., `useCalendar`, `useBudget`)
- `intended_real_source`: Target API (e.g., `Google/Outlook`, `Fin API`)
- `risk`: Risk level (`High` = user-visible, `Medium` = admin-only, `Low` = story/dev-only)
- `mock_data_type`: Type of data (e.g., `events`, `budget`, `user-profile`)
- `migration_complexity`: Migration difficulty (`Low`, `Medium`, `High`)
- `dependencies`: Required dependencies for migration
- `estimated_effort`: Time estimate (e.g., `2d`, `1w`, `3d`)

### Secondary Output: `audits/reports/mock-map-summary.md`
Include:
- Mock usage statistics
- Risk assessment summary
- Migration priority matrix
- Code excerpts with context
- Recommended migration strategies

## Detection Patterns

### Mock Libraries
- **MSW (Mock Service Worker)**: `msw`, `setupWorker`, `rest`
- **Faker**: `faker`, `@faker-js/faker`
- **Chance**: `chance`
- **JSON Server**: `json-server`, `json-server-mock`
- **MirageJS**: `miragejs`, `createServer`
- **Axios Mock Adapter**: `axios-mock-adapter`
- **Nock**: `nock`

### File Patterns
- `/__mocks__/` directories
- `*.mock.ts`, `*.mock.js` files
- `fixtures/`, `seeds/`, `sampleData/` directories
- `stub`, `storyData` files
- `mockData`, `testData` variables

### Development Toggles
- `USE_MOCKS` environment variables
- `NEXT_PUBLIC_*_MOCK` flags
- `process.env.MOCK` configurations
- `MOCK_API`, `MOCK_DATA` settings

### Inline Sentinels
- `TODO: wire` comments
- `// mock` comments
- `// temp` comments
- `data: []` defaults that never update
- Hardcoded sample data arrays

## Implementation Steps

1. **Library Detection**
   ```bash
   grep -r "msw\|faker\|mirage\|json-server\|axios-mock-adapter\|nock" src/
   grep -r "setupWorker\|createServer\|mockAdapter" src/
   ```

2. **File Pattern Search**
   ```bash
   find src/ -name "*mock*" -type f
   find src/ -name "__mocks__" -type d
   find src/ -path "*/fixtures/*" -type f
   ```

3. **Environment Variable Scan**
   ```bash
   grep -r "USE_MOCKS\|MOCK\|NEXT_PUBLIC.*MOCK" src/
   grep -r "process.env.*MOCK" src/
   ```

4. **Inline Mock Detection**
   ```bash
   grep -r "TODO.*wire\|// mock\|// temp" src/
   grep -r "data:\s*\[\]" src/
   ```

## Risk Assessment

### High Risk (User-Visible)
- Mock data displayed in production UI
- User-facing features with mock data
- Critical user flows using mocks
- Performance-impacting mock implementations

### Medium Risk (Admin-Only)
- Admin dashboard mock data
- Internal tooling with mocks
- Development-only features
- Non-critical user flows

### Low Risk (Story/Dev-Only)
- Storybook stories with mock data
- Development environment mocks
- Test-only mock implementations
- Documentation examples

## Migration Complexity Assessment

### Low Complexity
- Simple data structure mapping
- Direct API replacement
- Minimal business logic changes
- Well-defined data contracts

### Medium Complexity
- Complex data transformations
- Multiple API dependencies
- Authentication integration
- Error handling requirements

### High Complexity
- Complex business logic
- Multiple data sources
- Real-time data requirements
- Complex state management

## Code Analysis Examples

### MSW Implementation
```typescript
// Location: src/data/budget/mockClient.ts
// Pattern: msw
// Feature: Budget
// Risk: High (user-visible)
// Migration: Replace with real Fin API
```

### Faker Usage
```typescript
// Location: src/modes/home/HomeMode.stories.tsx
// Pattern: faker
// Feature: Home Insights
// Risk: Low (storybook only)
// Migration: Use real analytics data
```

### Inline Mock Data
```typescript
// Location: src/components/calendar/CalendarView.tsx
// Pattern: inline
// Feature: Calendar
// Risk: High (user-visible)
// Migration: Connect to Google/Outlook API
```

## Migration Strategies

### Adapter Pattern
- Create data adapters for each mock source
- Implement gradual migration
- Maintain backward compatibility
- Add feature flags for toggle

### Direct Replacement
- Replace mock with real API
- Update data contracts
- Implement error handling
- Add loading states

### Hybrid Approach
- Use real data with mock fallbacks
- Implement retry mechanisms
- Add offline capabilities
- Graceful degradation

## Quality Checks

### Completeness
- All mock sources identified
- Risk levels properly assessed
- Migration paths defined
- Dependencies documented

### Accuracy
- Mock patterns correctly identified
- Risk assessment validated
- Migration complexity accurate
- Effort estimates realistic

### Actionability
- Clear migration steps
- Defined success criteria
- Resource requirements specified
- Timeline estimates provided

## Success Criteria

- [ ] All mock sources catalogued
- [ ] Risk levels assigned
- [ ] Migration strategies defined
- [ ] Effort estimates provided
- [ ] Dependencies identified
- [ ] Report generated successfully
- [ ] No false positives

## Example Output Format

### CSV Sample
```csv
location,pattern,feature_screen_impacted,current_api_hook,intended_real_source,risk,mock_data_type,migration_complexity,dependencies,estimated_effort
src/modes/plan/__mocks__/events.ts,fixtures,Calendar,useCalendar,Google/Outlook,Medium,events,Medium,OAuth integration,6d
src/modes/home/HomeMode.stories.tsx,storyData,Home Insights,useAnalytics,Analytics API,Low,analytics,Low,API key,2d
src/data/budget/mockClient.ts,msw,Budget,useBudget,Fin API,High,budget,High,API integration + categorization,8d
```

### Markdown Summary Sample
```markdown
# Mock Data Map Summary

## Overview
- Total Mock Sources: 23
- High Risk: 8
- Medium Risk: 10
- Low Risk: 5

## Migration Priority
1. Budget API (High risk, user-visible)
2. Calendar Integration (Medium risk, core feature)
3. Analytics Dashboard (Medium risk, admin tool)

## Estimated Total Effort
- High Priority: 3 weeks
- Medium Priority: 2 weeks
- Low Priority: 1 week
```
