# 🔧 VIRE Layout & Token Remediation Guide

**Visual Defect Prevention & Pattern Library**  
**Last Updated:** October 13, 2025

---

## 🎯 PURPOSE

This guide provides:
1. **Concrete fixes** for identified visual defects
2. **Anti-patterns** to avoid
3. **Best practices** for visual consistency
4. **Prevention strategies** to stop regressions

---

## ✅ APPROVED PATTERNS (Use These)

### **Pattern 1: Responsive Card Grid**

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: var(--space-6); /* 24px from design system */
  padding: var(--space-4);
}

/* Ensures cards never smaller than 280px, wraps gracefully */
```

**Why:** Auto-responsive, consistent gaps, no breakpoint needed

---

### **Pattern 2: Dynamic Text Container**

```css
.task-title {
  /* ✅ Allow growth, prevent overflow */
  min-height: 44px; /* Minimum touch target */
  max-height: 200px; /* Reasonable limit */
  overflow-y: auto; /* Scroll if needed */
  word-break: break-word; /* Long words wrap */
  hyphens: auto; /* Hyphenate long words */
  
  /* ✅ Visual polish */
  padding: var(--space-3);
  line-height: 1.5;
}
```

**Why:** Handles any text length gracefully

---

### **Pattern 3: Number Display with Abbreviation**

```typescript
function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toLocaleString();
}

// Usage
<span className="points">{formatNumber(999999)}</span>
// Renders: 1.0M (fits in small containers)
```

**Why:** Prevents overflow, maintains readability

---

### **Pattern 4: Loading State with Skeleton**

```tsx
{isLoading ? (
  <div className="skeleton" style={{
    width: '100%',
    height: '120px', /* Match expected content height */
    borderRadius: 'var(--radius-md)',
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
  }} />
) : (
  <ActualContent />
)}
```

```css
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

**Why:** Reserves space, prevents CLS, smooth transition

---

### **Pattern 5: Focus Indicator (WCAG AA)**

```css
.interactive-element:focus-visible {
  outline: 2px solid var(--color-focus); /* High contrast blue */
  outline-offset: 2px; /* Space from element */
  border-radius: var(--radius-sm);
}

/* Remove default outline */
.interactive-element:focus:not(:focus-visible) {
  outline: none;
}
```

**Why:** Keyboard users always see focus, mouse users don't see outline on click

---

### **Pattern 6: Smooth Animation with GPU Acceleration**

```css
.modal {
  /* ✅ GPU-accelerated properties only */
  transform: scale(0.95);
  opacity: 0;
  transition: transform 300ms ease-out, opacity 300ms ease-out;
  will-change: transform, opacity;
}

.modal.open {
  transform: scale(1);
  opacity: 1;
}

/* ✅ Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .modal {
    transition-duration: 0.01ms;
  }
}
```

**Why:** 60fps smooth, accessible, no layout shift

---

### **Pattern 7: Responsive Images with Placeholder**

```tsx
<div style={{ position: 'relative', aspectRatio: '16/9' }}>
  {!imageLoaded && (
    <div style={{
      position: 'absolute',
      inset: 0,
      background: '#e5e7eb', /* Placeholder color */
      borderRadius: 'inherit',
    }} />
  )}
  <img
    src={src}
    alt={alt}
    loading="lazy"
    onLoad={() => setImageLoaded(true)}
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    }}
  />
</div>
```

**Why:** No CLS, smooth load, space reserved

---

## ❌ ANTI-PATTERNS (Avoid These)

### **Anti-Pattern 1: Fixed Height on Dynamic Content**

```css
/* ❌ DON'T */
.task-card {
  height: 100px; /* Content might be 120px! */
  overflow: hidden; /* Cuts off content */
}

/* ✅ DO */
.task-card {
  min-height: 100px; /* Baseline, allows growth */
}
```

**Problem:** Content gets cut off, invisible  
**Fix:** Use `min-height`, not `height`

---

### **Anti-Pattern 2: Percentage Width Without Container**

```css
/* ❌ DON'T */
.modal {
  position: absolute;
  width: 50%; /* 50% of what? Unknown! */
  left: 25%;
}

/* ✅ DO */
.modal-container {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  width: 90%;
  max-width: 600px; /* Absolute max */
}
```

---

### **Anti-Pattern 3: Magic Z-Index Numbers**

```css
/* ❌ DON'T */
.dropdown {
  z-index: 999999; /* Random high number */
}

.tooltip {
  z-index: 9999; /* Another random number */
}

/* ✅ DO */
:root {
  --z-dropdown: 1000;
  --z-tooltip: 1100;
  --z-modal: 2000;
  --z-toast: 3000;
}

.dropdown {
  z-index: var(--z-dropdown);
}
```

**Problem:** Z-index conflicts, hard to debug  
**Fix:** Use design system z-index scale

---

### **Anti-Pattern 4: Animating Layout Properties**

```css
/* ❌ DON'T (causes layout thrashing) */
.card:hover {
  transition: width 300ms;
  width: 350px; /* Triggers layout */
}

/* ✅ DO (GPU-accelerated) */
.card:hover {
  transition: transform 300ms;
  transform: scale(1.05); /* GPU layer */
}
```

**Problem:** Jank, dropped frames, poor performance  
**Fix:** Animate `transform` and `opacity` only

---

### **Anti-Pattern 5: Hardcoded Breakpoints**

```css
/* ❌ DON'T (brittle) */
@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
}

@media (max-width: 767px) {
  .content {
    width: 100%;
  }
}

/* ✅ DO (use design system tokens) */
@media (max-width: var(--breakpoint-md)) {
  .sidebar {
    display: none;
  }
  
  .content {
    width: 100%;
  }
}
```

**Problem:** Inconsistent breakpoints across app  
**Fix:** Use design system breakpoint tokens

---

### **Anti-Pattern 6: Missing Alt Text**

```tsx
{/* ❌ DON'T */}
<img src="user-avatar.jpg" />

{/* ✅ DO */}
<img src="user-avatar.jpg" alt="John Doe profile picture" />

{/* ✅ Decorative images */}
<img src="decoration.svg" alt="" aria-hidden="true" />
```

**Problem:** Screen reader can't describe image  
**Fix:** Always provide alt text, use alt="" for decorative only

---

## 🔍 COMMON DEFECT FIXES

### **Fix 1: Text Overflow**

**Symptom:** Long text breaks layout

**Debug:**
```javascript
// Find overflowing elements
document.querySelectorAll('*').forEach(el => {
  if (el.scrollWidth > el.clientWidth) {
    console.log('Overflow:', el);
  }
});
```

**Fix:**
```css
.text-container {
  overflow-wrap: break-word;
  word-break: break-word;
  hyphens: auto;
  max-width: 100%;
}
```

---

### **Fix 2: Horizontal Scroll on Mobile**

**Symptom:** Page wider than viewport

**Debug:**
```javascript
// Find wide elements
document.querySelectorAll('*').forEach(el => {
  if (el.scrollWidth > window.innerWidth) {
    console.log('Too wide:', el, el.scrollWidth);
  }
});
```

**Fix:**
```css
body, html {
  overflow-x: hidden; /* Last resort */
}

* {
  max-width: 100%; /* Prevent any element from exceeding viewport */
  box-sizing: border-box;
}
```

---

### **Fix 3: Modal Not Centered**

**Symptom:** Modal appears off-center or cut off

**Fix:**
```css
.modal-backdrop {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-4);
  overflow: auto;
}

.modal {
  position: relative; /* Not absolute! */
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}
```

---

### **Fix 4: Button Text Wrapping**

**Symptom:** Button text wraps to multiple lines

**Fix:**
```css
.button {
  white-space: nowrap; /* Single line */
  padding: var(--space-3) var(--space-6);
  min-width: fit-content;
}

/* OR allow wrap but maintain shape */
.button {
  padding: var(--space-3) var(--space-6);
  min-height: 44px;
  line-height: 1.2;
}
```

---

### **Fix 5: Invisible Focus Indicator**

**Symptom:** Can't see where keyboard focus is

**Fix:**
```css
*:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

/* Ensure good contrast in both themes */
:root {
  --color-focus: #0066FF;
}

[data-theme="dark"] {
  --color-focus: #66B3FF;
}
```

---

## 🎨 DESIGN SYSTEM REFERENCE

### **Spacing Scale (8px rhythm)**

```css
:root {
  --space-1: 4px;   /* 0.5 unit */
  --space-2: 8px;   /* 1 unit */
  --space-3: 12px;  /* 1.5 units */
  --space-4: 16px;  /* 2 units */
  --space-5: 20px;  /* 2.5 units */
  --space-6: 24px;  /* 3 units */
  --space-8: 32px;  /* 4 units */
  --space-10: 40px; /* 5 units */
  --space-12: 48px; /* 6 units */
  --space-16: 64px; /* 8 units */
  --space-20: 80px; /* 10 units */
  --space-24: 96px; /* 12 units */
}
```

**Rule:** Always use these tokens, never random numbers

---

### **Typography Scale**

```css
:root {
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-md: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 20px;
  --font-size-2xl: 24px;
  --font-size-3xl: 32px;
  --font-size-4xl: 48px;
  --font-size-5xl: 64px;
}
```

---

### **Color Palette**

```css
:root {
  /* Primary */
  --color-syncscript-blue-500: #3399FF;
  --color-syncscript-purple-500: #9966FF;
  
  /* Neutrals */
  --color-neutral-50: #F9FAFB;
  --color-neutral-100: #F3F4F6;
  --color-neutral-200: #E5E7EB;
  --color-neutral-600: #4B5563;
  --color-neutral-900: #111827;
  
  /* Semantic */
  --color-success: #38A169;
  --color-error: #E53E3E;
  --color-warning: #DD6B20;
  --color-info: #3182CE;
}
```

**Rule:** Never use hex codes directly, always use tokens

---

### **Border Radius**

```css
:root {
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-full: 9999px;
}
```

---

### **Shadows**

```css
:root {
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
  --shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.25);
}
```

---

### **Z-Index Layers**

```css
:root {
  --z-base: 1;
  --z-dropdown: 1000;
  --z-sticky: 1100;
  --z-fixed: 1200;
  --z-modal-backdrop: 2000;
  --z-modal: 2100;
  --z-popover: 2200;
  --z-toast: 3000;
  --z-tooltip: 3100;
  --z-debug: 9999;
}
```

---

## 🐛 DEFECT-SPECIFIC REMEDIATIONS

### **VIRE-001: Feature Grid Gap at 1024px**

**Current Code:**
```css
.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  padding: 32px;
}
```

**Problem:**
At 1024px, container width minus padding doesn't divide evenly by 3, causing uneven gaps.

**Fix:**
```css
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: var(--space-6); /* 24px */
  padding: var(--space-8);
  justify-content: center; /* Centers grid if items don't fill row */
}

@media (min-width: 1024px) and (max-width: 1279px) {
  .feature-grid {
    padding: var(--space-6) max(var(--space-6), calc((100vw - 960px) / 2));
  }
}
```

**Result:** Perfect gaps at all breakpoints

---

### **VIRE-002: Emblem Pulse Performance**

**Current Code:**
```tsx
<motion.div
  animate={{ scale: [1, 1.1, 1] }}
  transition={{ duration: 2, repeat: Infinity }}
  style={{
    background: `conic-gradient(...)` /* Recalculated every frame! */
  }}
/>
```

**Problem:**
Conic-gradient recalculation during animation causes slowdown on low-end devices.

**Fix Option 1: will-change hint**
```tsx
<motion.div
  animate={{ scale: [1, 1.1, 1] }}
  transition={{ duration: 2, repeat: Infinity }}
  style={{
    background: `conic-gradient(...)`,
    willChange: 'transform', /* Hint browser to optimize */
  }}
/>
```

**Fix Option 2: Separate layers**
```tsx
{/* Background (static) */}
<div className="emblem-bg" style={{ background: `conic-gradient(...)` }} />

{/* Pulse overlay (animated) */}
<motion.div 
  className="emblem-pulse"
  animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
/>
```

**Result:** 60fps even on slow devices

---

### **VIRE-003: Calendar Tight at 320px**

**Current Code:**
```css
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}
```

**Problem:**
At 320px: (320 - 32 padding - 48 gaps) / 7 columns = ~34px per cell. Tight.

**Fix:**
```css
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

@media (max-width: 340px) {
  .calendar-grid {
    gap: 6px; /* Acceptable compromise at tiny screens */
    font-size: 13px; /* Slightly smaller, more breathing room */
  }
  
  .calendar-day {
    padding: 6px 4px; /* Reduce internal padding */
  }
}
```

**Result:** Still functional and legible at 320px

---

## 🛡️ REGRESSION PREVENTION

### **Rule 1: Never Commit Without Visual Check**

**Before Every Commit:**
1. Run `npm run build`
2. Open local build in browser
3. Check affected pages at 3 breakpoints (375/768/1440)
4. Test both light and dark mode
5. Verify no visual regressions

---

### **Rule 2: Use Linters**

**Stylelint Configuration:**
```json
{
  "rules": {
    "declaration-property-value-disallowed-list": {
      "/.*/": ["/^\\d+px$/"], // Force use of design tokens
    },
    "selector-max-specificity": "0,4,0", // Prevent specificity wars
    "no-descending-specificity": true
  }
}
```

---

### **Rule 3: Component Checklist**

**Before Marking PR as Ready:**
- [ ] Responsive (tested 375/768/1440)
- [ ] Dark mode works
- [ ] Focus indicator visible
- [ ] Touch targets ≥44px
- [ ] Uses design tokens (no hardcoded values)
- [ ] Animations smooth (60fps)
- [ ] No layout shift
- [ ] Accessibility: labels, roles, keyboard nav

---

## ✅ QUICK REFERENCE

### **When You See... Fix With...**

| Symptom | Likely Cause | Quick Fix |
|---------|--------------|-----------|
| Text overflow | Fixed width | `word-break: break-word` |
| Horizontal scroll | Wide element | Find with DevTools, add `max-width: 100%` |
| Modal off-center | Absolute positioning | Use flexbox centering |
| Hover not working | Missing `:hover` | Add `transition` and `:hover` state |
| Focus invisible | Missing outline | Add `:focus-visible { outline: ... }` |
| Animation janky | Animating width/height | Animate `transform`/`opacity` only |
| Layout shift | Missing dimensions | Add `width`/`height` or `aspect-ratio` |
| Dark mode broken | Hardcoded colors | Use CSS variables |

---

## 📚 RESOURCES

**Design System:**
- `src/design-system/variables.css` - All tokens
- `src/styles/tokens.css` - Semantic tokens

**Helper Utilities:**
- `src/styles/typography-system.css`
- `src/styles/spacing-utilities.css`
- `src/styles/focus-system.css`

**Documentation:**
- `DESIGN_SYSTEM.md` (if exists)
- `COMPONENT_LIBRARY.md` (if exists)

---

*Guide Maintained By: Design Systems Guardian*  
*Last Updated: October 13, 2025*

