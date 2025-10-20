# Contract Extraction Scanner Prompt

## Objective
For each screen/feature identified in the feature inventory, extract all data dependencies and generate Zod schemas for expected API responses. This creates a foundation for data contracts and adapter patterns.

## Output Requirements

### Primary Output: Individual Schema Files
Create individual schema files in `/audits/contracts/` for each feature:
- `calendar.schema.ts` - Calendar/planning data contracts
- `budget.schema.ts` - Financial data contracts  
- `analytics.schema.ts` - Analytics data contracts
- `team.schema.ts` - Team collaboration contracts
- `user.schema.ts` - User profile contracts
- `tasks.schema.ts` - Task management contracts

### Secondary Output: Contract Summary
Generate `audits/reports/data-contracts-summary.md` with:
- Contract inventory
- Missing schemas analysis
- API endpoint mapping
- Data flow diagrams

## Contract Extraction Process

### 1. Data Dependency Analysis
For each route/component from feature-inventory.csv:

**API Hooks Analysis:**
- `useQuery` calls - Extract query keys and expected response structure
- `useMutation` calls - Extract mutation variables and response types
- `useLoaderData` calls - Extract loader return types
- `fetch` calls - Extract request/response patterns
- `useSWR` calls - Extract data fetching patterns

**Component Props Analysis:**
- Interface definitions
- TypeScript types
- Prop drilling patterns
- Context usage

### 2. Schema Generation Strategy

**Infer from Usage:**
- Analyze how data is consumed in components
- Extract field names and types from JSX
- Identify required vs optional fields
- Determine array vs object structures

**API Response Patterns:**
- Look for response handling code
- Extract error handling patterns
- Identify loading states
- Find data transformation logic

**TypeScript Integration:**
- Convert existing TypeScript interfaces to Zod schemas
- Add runtime validation
- Include error messages
- Support optional fields and defaults

### 3. Schema Structure Template

```typescript
import { z } from 'zod';

// Base response wrapper
export const ApiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any(),
  error: z.string().optional(),
  timestamp: z.string(),
});

// Feature-specific schemas
export const FeatureDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  // ... other fields based on analysis
});

// API endpoint contracts
export const FeatureApiContract = {
  get: {
    request: z.object({}),
    response: ApiResponseSchema.extend({
      data: FeatureDataSchema.array(),
    }),
  },
  create: {
    request: FeatureDataSchema.omit({ id: true }),
    response: ApiResponseSchema.extend({
      data: FeatureDataSchema,
    }),
  },
  // ... other endpoints
};
```

## Implementation Steps

### Step 1: Parse Feature Inventory
```bash
# Read feature-inventory.csv
# Extract routes with API hooks
# Group by feature category
```

### Step 2: Analyze Data Usage
```bash
# For each route with API hooks:
# - Parse component file
# - Extract API calls
# - Analyze data consumption
# - Identify data structures
```

### Step 3: Generate Schemas
```bash
# Create Zod schemas based on analysis
# Include validation rules
# Add error handling
# Export for use in adapters
```

### Step 4: Validate Schemas
```bash
# Test schemas against existing data
# Verify type safety
# Check for missing fields
# Update based on findings
```

## Quality Standards

### Schema Completeness
- All API endpoints must have contracts
- Request and response schemas required
- Error handling schemas included
- Optional fields properly marked

### Type Safety
- Zod schemas match TypeScript types
- Runtime validation enabled
- Type inference working
- No `any` types in production

### Documentation
- Schema purpose documented
- Field descriptions included
- Usage examples provided
- Migration notes added

## Success Criteria

- [ ] All features have data contracts
- [ ] Schemas match actual API usage
- [ ] Runtime validation working
- [ ] Type safety maintained
- [ ] Documentation complete
- [ ] Adapter pattern ready

## Example Output

### calendar.schema.ts
```typescript
import { z } from 'zod';

export const CalendarEventSchema = z.object({
  id: z.string(),
  title: z.string(),
  start: z.string().datetime(),
  end: z.string().datetime(),
  allDay: z.boolean().default(false),
  attendees: z.array(z.string()).default([]),
});

export const CalendarApiContract = {
  getEvents: {
    request: z.object({
      start: z.string().datetime(),
      end: z.string().datetime(),
    }),
    response: z.object({
      success: z.boolean(),
      data: CalendarEventSchema.array(),
      error: z.string().optional(),
    }),
  },
  createEvent: {
    request: CalendarEventSchema.omit({ id: true }),
    response: z.object({
      success: z.boolean(),
      data: CalendarEventSchema,
      error: z.string().optional(),
    }),
  },
};
```

### data-contracts-summary.md
```markdown
# Data Contracts Summary

## Contract Inventory
- Calendar: ✅ Complete
- Budget: ✅ Complete  
- Analytics: ⚠️ Partial
- Team: ❌ Missing
- User: ✅ Complete
- Tasks: ⚠️ Partial

## Missing Schemas
- Team collaboration endpoints
- Analytics real-time data
- Task assignment workflows

## API Endpoint Coverage
- GET endpoints: 85%
- POST endpoints: 70%
- PUT endpoints: 60%
- DELETE endpoints: 40%
```
