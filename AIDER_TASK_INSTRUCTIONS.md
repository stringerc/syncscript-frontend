# 🚀 AIDER TASK INSTRUCTIONS - TRIPLE-AI ATTACK

**Project**: SyncScript Frontend  
**Goal**: Fix 37 syntax errors to achieve clean build  
**Status**: Ready for execution  

---

## 🎯 **PRIMARY TASK**

Fix all 37 syntax errors in the following files. All errors are **"Expected ',', got ';'"** which means semicolons are used where commas should be.

### **Target Files & Error Locations**

1. **pages/api/ai/breakdown-task.ts** (line 50)
2. **pages/api/ai/energy-insights.ts** (line 52) 
3. **pages/api/ai/parse-task.ts** (line 59)
4. **pages/api/briefings/settings.ts** (line 333)
5. **pages/api/calendar/events.ts** (line 46)
6. **pages/beta.tsx** (line 67)
7. **pages/compare.tsx** (line 39)
8. **pages/dashboard.tsx** (line 1038)
9. **pages/dashboard/observability.tsx** (line 19)
10. **pages/dashboard/quality.tsx** (line 27)
11. **pages/landing-v2.tsx** (line 179)
12. **src/app/calendar/page.tsx** (line 79)
13. **src/app/contact/page.tsx** (line 121)

---

## 🔧 **FIX PATTERNS**

### **Pattern 1: Object Literal Syntax**
```typescript
// WRONG (semicolon where comma should be):
} ; {role: 'user',

// CORRECT:
}, {role: 'user',
```

### **Pattern 2: Array/Object Definitions**
```typescript
// WRONG:
} ; {

// CORRECT:
}, {
```

### **Pattern 3: Missing Commas**
```typescript
// WRONG:
{ key: 'value' } {

// CORRECT:
{ key: 'value' }, {
```

---

## 📋 **EXECUTION STEPS**

1. **Read each target file** and locate the specific line number mentioned
2. **Identify the syntax error** - look for semicolons where commas should be
3. **Apply the fix** - replace `} ; {` with `}, {` and similar patterns
4. **Validate the fix** - ensure the syntax is correct
5. **Move to next file** - repeat for all 13 files

---

## 🎯 **SUCCESS CRITERIA**

- **All 37 syntax errors fixed**
- **Build passes**: `npm run build --turbopack` returns 0 errors
- **No new errors introduced**
- **Clean, readable code maintained**

---

## 🚀 **EXPECTED OUTCOME**

After fixing all 37 errors:
- Build status: ✅ **SUCCESS**
- Error count: **0** (down from 37)
- Ready for Phase 2: Manager Integration

---

**Let's make history with the first successful triple-AI coordination!** 🎯
