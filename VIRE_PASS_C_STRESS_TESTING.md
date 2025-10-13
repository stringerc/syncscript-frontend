# 🔥 VIRE PASS C: Stress & Extremes Testing

**Owner:** Content QA Editor + Typography Specialist  
**Duration:** 3-4 hours  
**Status:** In Progress

---

## 🎯 OBJECTIVE

Test UI with extreme content and edge cases to ensure robustness:
- Ultra-long text strings
- Massive numbers
- Multiple simultaneous states
- Internationalization stress
- User-generated chaos

---

## 📋 STRESS SCENARIOS

### **1. LONG TEXT STRESS**

**Test Cases:**

**500-Character Task Title:**
```
Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
```

**Check:**
- [ ] Text truncates with ellipsis
- [ ] Or wraps gracefully
- [ ] Container doesn't break
- [ ] No horizontal scroll
- [ ] "Show more" link appears

**2000-Character Description:**
- [ ] Scrollable area created
- [ ] Max-height respected
- [ ] Gradient fade at bottom (if truncated)
- [ ] Expand button works

---

### **2. MASSIVE NUMBERS STRESS**

**Test Values:**

**Points: 999,999,999**
- [ ] Number formatting (commas)
- [ ] Container doesn't overflow
- [ ] Abbreviation shown (999M)

**Level: 9999**
- [ ] Badge doesn't break
- [ ] Text remains centered
- [ ] Progress bar still visible

**Streak: 365+ days**
- [ ] Number displays correctly
- [ ] Icon doesn't overlap
- [ ] Tooltip shows full number

---

### **3. ERROR BANNER STRESS**

**Stacked Notifications:**
- [ ] 5+ toasts at once: Stack properly
- [ ] Z-index correct
- [ ] No overlap with header
- [ ] Dismissible individually
- [ ] Auto-dismiss works

**Error States:**
- [ ] Multiple form errors shown
- [ ] Each field highlighted
- [ ] Error messages don't overlap
- [ ] Submit button state correct

---

### **4. SKELETON LOADER STRESS**

**All Loading States Simultaneously:**
- [ ] Dashboard: Tasks, projects, stats all loading
- [ ] No layout shift when content loads
- [ ] Skeletons match final content size
- [ ] Smooth transition skeleton → content

---

### **5. NESTED MODAL STRESS**

**3-Deep Modal Stack:**
- [ ] Modal 1 → Modal 2 → Modal 3
- [ ] Each backdrop properly dimmed
- [ ] Escape key closes top modal first
- [ ] Focus trapped in active modal
- [ ] No scroll-lock issues

---

### **6. EDGE CONTENT STRESS**

**100-Row Table:**
- [ ] Virtual scrolling working
- [ ] Fixed header stays visible
- [ ] Horizontal scroll (if needed) smooth
- [ ] Selection state visible

**50-Chip/Tag List:**
- [ ] Wraps to multiple lines OR
- [ ] Horizontal scroll with fade
- [ ] Individual chips clickable
- [ ] No overlap

**Infinite Scroll:**
- [ ] Loading indicator at bottom
- [ ] Smooth append (no jump)
- [ ] "Load more" fallback exists

---

## 🌍 INTERNATIONALIZATION STRESS

### **RTL (Right-to-Left) Testing**

**Languages:** Arabic, Hebrew

**Enable RTL:**
```html
<html dir="rtl" lang="ar">
```

**Check:**
- [ ] Layout mirrors correctly
- [ ] Text alignment: right
- [ ] Icons flip (directional ones)
- [ ] Margins/padding swap (margin-left ↔ margin-right)
- [ ] Gradients reverse
- [ ] Animations mirror
- [ ] Scroll starts at right edge

**Critical Elements:**
- Navigation menu
- Form layouts
- Task cards
- Modals
- Tooltips/popovers

---

### **CJK (Chinese/Japanese/Korean) Testing**

**Test Strings:**
```
日本語のテキストが正しく表示されることを確認します
中文字符是否正确显示和换行
한국어 텍스트의 줄 바꿈 및 정렬 확인
```

**Check:**
- [ ] Font fallback to CJK fonts
- [ ] Line breaking (word vs. character)
- [ ] Vertical alignment
- [ ] No font rendering issues
- [ ] Proper line height for CJK

---

### **German Long Words**

**Test String:**
```
Rindfleischetikettierungsüberwachungsaufgabenübertragungsgesetz
Donaudampfschifffahrtselektrizitätenhauptbetriebswerkbauunterbeamtengesellschaft
```

**Check:**
- [ ] Word breaks with hyphens OR
- [ ] Container expands to fit OR
- [ ] Horizontal scroll provided
- [ ] No overlap with adjacent content

---

### **User Font Scaling**

**OS Font Size Settings:**
- 110%
- 125%
- 150%

**Simulate:**
```css
html {
  font-size: 125%; /* instead of 100% */
}
```

**Check:**
- [ ] UI scales proportionally
- [ ] No overlap at 125%
- [ ] No overlap at 150%
- [ ] Touch targets grow accordingly
- [ ] Fixed-size containers don't break

---

## 📊 "NEVER BREAK" UI RULES

From stress testing, derive immutable rules:

### **Rule 1: Text Containers**
```css
/* ❌ NEVER do this */
.task-title {
  height: 60px; /* Fixed height */
  overflow: hidden;
}

/* ✅ ALWAYS do this */
.task-title {
  min-height: 60px; /* Allow growth */
  max-height: 200px;
  overflow-y: auto; /* Allow scroll if needed */
  word-break: break-word; /* Prevent overflow */
}
```

### **Rule 2: Numbers & Badges**
```css
/* ❌ NEVER */
.level-badge {
  width: 60px; /* Fixed width for "Level 1" breaks at "Level 100" */
}

/* ✅ ALWAYS */
.level-badge {
  min-width: 60px; /* Allow growth */
  padding: 8px 16px;
  white-space: nowrap;
}
```

### **Rule 3: Grid/Flex Layouts**
```css
/* ❌ NEVER */
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 300px); /* Fixed won't fit on mobile */
}

/* ✅ ALWAYS */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}
```

### **Rule 4: Z-Index**
```css
/* ❌ NEVER */
.dropdown {
  z-index: 99999; /* Random high number */
}

/* ✅ ALWAYS */
.dropdown {
  z-index: var(--z-dropdown); /* From design system */
}
```

### **Rule 5: Absolute Positioning**
```css
/* ❌ NEVER */
.badge {
  position: absolute;
  top: -10px;
  right: -10px;
  /* No containing block */
}

/* ✅ ALWAYS */
.badge-container {
  position: relative; /* Creates containing block */
}
.badge {
  position: absolute;
  top: -10px;
  right: -10px;
}
```

---

## 🧪 TEST EXECUTION

### **Step 1: Prepare Test Data**

Create test accounts with:
- 999,999 points
- Level 9999
- 365-day streak
- 100+ tasks
- 50+ projects
- Long names/descriptions

### **Step 2: Execute Scenarios**

For each stress scenario:
1. Set up the extreme condition
2. Navigate to affected page
3. Take before screenshot
4. Document issues found
5. Assign severity
6. Create fix recommendation

### **Step 3: Document Findings**

Use standard issue template (from Pass B)

### **Step 4: Validate Fixes**

After fixes applied:
- Re-run stress scenarios
- Verify issues resolved
- Check for new issues introduced

---

## ✅ PASS COMPLETION CRITERIA

- [ ] All 6 stress scenarios executed
- [ ] RTL testing complete (Arabic/Hebrew)
- [ ] CJK testing complete
- [ ] German long words tested
- [ ] User font scaling tested (110%, 125%, 150%)
- [ ] "Never Break" rules documented
- [ ] All findings catalogued
- [ ] Remediation guidance provided

---

*Pass C Owner: Content QA Editor + Typography Specialist*  
*Last Updated: October 13, 2025*

