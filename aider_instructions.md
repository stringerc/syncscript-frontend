# 🚀 AIDER MISSION BRIEFING
## Triple-AI Attack: Fix API Files (Priority 1)

### 🎯 YOUR MISSION
Fix all API files with syntax errors. Focus on these patterns:

1. **Malformed JSON responses**: `{ error: 'message' },;` → `{ error: 'message' });`
2. **Missing semicolons**: `const var = value,` → `const var = value;`
3. **Extra commas**: `return res.status(405).json({ error: 'Method not allowed' },;` → `return res.status(405).json({ error: 'Method not allowed' });`

### 📁 FILES TO FIX (Your Priority)
```
pages/api/ai/daily-plan.ts
pages/api/ai/energy-insights.ts  
pages/api/ai/meeting-notes.ts
pages/api/ai/parse-task.ts
pages/api/auth/[...auth0].ts
pages/api/auth/debug-callback.ts
pages/api/auth/google/callback.ts
pages/api/auth/google/test-oauth.ts
pages/api/auth/test-login.ts
pages/api/auth/token.ts
pages/api/briefings/settings.ts
pages/api/calendar/connect.ts
pages/api/calendar/events.ts
```

### 🔧 FIX PATTERNS
1. **Fix malformed JSON**: `{ error: 'message' },;` → `{ error: 'message' });`
2. **Fix missing semicolons**: `const var = value,` → `const var = value;`
3. **Fix extra commas**: `return res.status(405).json({ error: 'Method not allowed' },;` → `return res.status(405).json({ error: 'Method not allowed' });`
4. **Fix malformed template literals**: `const url = 'https: //example.com',` → `const url = 'https://example.com';`

### ⚡ EXECUTION ORDER
1. Start with `pages/api/ai/daily-plan.ts`
2. Move through all AI API files
3. Then handle auth API files
4. Finish with calendar/briefings files

### 📊 SUCCESS TARGET
- Fix 15-20 API file errors
- Reduce total errors from 86 to ~66
- Report completion to CURSOR

**READY TO EXECUTE! Start with daily-plan.ts**
- Fix 15-20 API file errors
- Reduce total errors from 86 to ~66
- Report completion to CURSOR

**READY TO EXECUTE! Start with daily-plan.ts**
- Fix 15-20 API file errors
- Reduce total errors from 86 to ~66
- Report completion to CURSOR

**READY TO EXECUTE! Start with daily-plan.ts**

## Target Files with Specific Issues:

### 1. pages/api/ai/breakdown-task.ts (Line 50)
- Fix: Change `};` to `},` in object literals

### 2. pages/api/ai/coach.ts (Line 52) 
- Fix: Change `};` to `},` in object literals

### 3. pages/api/ai/parse-task.ts (Line 59)
- Fix: Change `};` to `},` in object literals

### 4. pages/api/briefings/settings.ts (Line 333)
- Fix: Change `};` to `},` in object literals

## Pattern to Fix:
Replace semicolons with commas in object literals within function calls and object definitions.

Example:
```typescript
// WRONG:
{
  key: value
};

// CORRECT:
{
  key: value
},
```

## Instructions for Aider:
1. Search for all files with `};` patterns
2. Replace `};` with `},` in object literals
3. Be careful not to change `};` that end functions or blocks
4. Focus on object properties and array elements

Apply these fixes systematically across all TypeScript/JSX files.
