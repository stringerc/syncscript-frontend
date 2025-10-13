# 🎨 VIRE PASS B: Manual Expert Visual Review

**Owner:** Principal Visual QA Director  
**Team:** Layout Forensics + Typography + Color Specialists  
**Duration:** 4-6 hours  
**Status:** In Progress

---

## 🎯 OBJECTIVE

Expert human review of critical pages and components to catch visual issues that automated tools miss:
- Subtle alignment problems
- Spacing inconsistencies
- Typography issues
- Color/contrast problems
- Interaction state bugs

---

## 📋 CRITICAL PAGES CHECKLIST

###  **1. HOMEPAGE (/) - All Breakpoints**

**Desktop (1440px+):**
- [ ] Hero section centered and balanced
- [ ] CTA buttons properly sized and aligned
- [ ] Navigation menu evenly spaced
- [ ] Footer columns aligned
- [ ] All gradients rendering smoothly
- [ ] Scroll animations trigger correctly

**Tablet (768-1023px):**
- [ ] Layout adapts gracefully
- [ ] No awkward column breaks
- [ ] Touch targets ≥44px
- [ ] Text remains readable

**Mobile (320-767px):**
- [ ] Single column layout
- [ ] Hamburger menu (if present) works
- [ ] Text wraps properly
- [ ] No horizontal scroll
- [ ] Images scale correctly

**States to Test:**
- Light mode ✅
- Dark mode ✅
- Hover on CTA ✅
- Focus on nav links ✅
- Scrolled past fold ✅

---

### **2. DASHBOARD (/dashboard) - Authenticated**

**Layout Structure:**
- [ ] Header sticks to top
- [ ] Sidebar (if present) proper width
- [ ] Main content area doesn't overlap
- [ ] Footer visible and accessible

**Level & Progress:**
- [ ] "Level X" badge clearly visible
- [ ] Progress bar under level visible
- [ ] Progress percentage accurate
- [ ] "X pts to next level" text shown
- [ ] **Pulsing emblem next to level** ✅
- [ ] Emblem animation smooth (2s pulse)
- [ ] Emblem clickable with hover effect
- [ ] Conic gradient shows progress

**Compact Stats:**
- [ ] All stat icons visible
- [ ] Numbers don't overflow
- [ ] Proper spacing between stats
- [ ] Tooltips appear on hover

**Task Cards:**
- [ ] Consistent spacing
- [ ] No overlapping content
- [ ] Action buttons visible
- [ ] Priority colors distinct
- [ ] Energy indicators clear

**Modals & Overlays:**
- [ ] Centered properly
- [ ] Backdrop dims background
- [ ] Close button accessible
- [ ] Content doesn't overflow
- [ ] Scrollable if needed

---

### **3. LOGIN & REGISTER PAGES**

**Form Elements:**
- [ ] Input fields properly sized
- [ ] Labels above inputs
- [ ] Focus states visible
- [ ] Error states clear
- [ ] Submit button prominent

**Auth0 Redirect:**
- [ ] Loading state shown
- [ ] No flash of unstyled content
- [ ] Smooth transition

---

### **4. FEATURES PAGE (/features)**

**Feature Grid:**
- [ ] Cards equal height
- [ ] Consistent spacing
- [ ] Icons aligned
- [ ] Text doesn't overflow
- [ ] Hover effects smooth

---

### **5. CALENDAR PAGE (/calendar)**

**Calendar Grid:**
- [ ] Days properly aligned
- [ ] Current day highlighted
- [ ] Events don't overlap
- [ ] Time slots visible
- [ ] Responsive on mobile

---

## 🔍 HEURISTIC SWEEPS

### **Alignment Grid (8px Rhythm)**

**Check:**
- All spacing uses 8px increments (8, 16, 24, 32, 40, 48...)
- Elements align to invisible grid
- No 5px, 7px, 13px random values

**How to Verify:**
- Use browser dev tools grid overlay
- Measure gaps between elements
- Check CSS spacing values

---

### **Spacing Consistency**

**Vertical Rhythm:**
- Headings: 32-48px margin-bottom
- Paragraphs: 16-24px margin-bottom
- Sections: 48-96px padding

**Horizontal Spacing:**
- Container padding: 16-24px mobile, 32-48px desktop
- Card padding: 24-32px
- Button padding: 12-16px vertical, 24-32px horizontal

---

### **Tap Targets (WCAG 2.5.5)**

**Minimum Size:** 44×44px

**Check:**
- All buttons ≥44×44px
- All links ≥44×44px
- Icon buttons have adequate padding
- Mobile: no tiny close buttons

**How to Verify:**
```javascript
// Run in console
document.querySelectorAll('button, a').forEach(el => {
  const rect = el.getBoundingBox();
  if (rect.width < 44 || rect.height < 44) {
    console.warn('Small target:', el, `${rect.width}×${rect.height}`);
  }
});
```

---

### **Icon Legibility**

**Check:**
- Icons visible at all sizes
- SVG icons crisp (not blurry)
- Icon colors have sufficient contrast
- Icons match design system

**Critical Icons:**
- Navigation icons
- Status indicators
- Action buttons
- Social media icons

---

### **State Variations**

**Every Interactive Element Should Have:**

**Hover:**
- Visual feedback (color/scale/shadow change)
- Smooth transition (0.2-0.3s)
- Cursor changes to pointer

**Focus:**
- Visible focus ring (2-4px)
- High contrast color
- Not relying on color alone
- Respects system preferences

**Active (Click):**
- Immediate visual feedback
- Slight scale/position shift
- Different from hover state

**Disabled:**
- Reduced opacity (0.5-0.6)
- Cursor: not-allowed
- No hover effects
- Clear it's not clickable

**Loading:**
- Spinner or skeleton
- Button text changes
- Disabled during load
- No double-click possible

---

## 🎨 VISUAL QUALITY CHECKS

### **Typography**

**Hierarchy:**
- H1: Largest, bold, distinctive
- H2-H3: Clear size difference
- Body: Comfortable reading size (16-18px)
- Small text: Still legible (≥12px)

**Line Length:**
- Ideal: 50-75 characters per line
- Max: 90 characters
- Mobile: Adjust for narrow screens

**Line Height:**
- Body text: 1.5-1.75
- Headings: 1.1-1.3
- UI text: 1.4

**Font Weight:**
- Headings: 600-700 (semi-bold/bold)
- Body: 400 (regular)
- Emphasis: 500-600 (medium/semi-bold)

---

### **Color & Contrast**

**WCAG AA Requirements:**
- Normal text (< 18px): 4.5:1 contrast
- Large text (≥ 18px or 14px bold): 3:1 contrast
- UI components: 3:1 contrast

**Check:**
- Light mode: Dark text on light backgrounds
- Dark mode: Light text on dark backgrounds
- Links: Distinguishable from text (color + underline)
- Focus indicators: High contrast

**Tools:**
- Chrome DevTools: Lighthouse accessibility audit
- WebAIM Contrast Checker
- WAVE browser extension

---

### **Layout & Spacing**

**Container Rules:**
- Max-width for readability (1200-1440px)
- Centered on larger screens
- Padding on mobile (16-24px)

**Card Grid:**
- Equal heights in same row
- Consistent gaps
- No orphaned cards
- Responsive columns (1/2/3/4)

**Z-Index Layers:**
- Page content: 1-10
- Sticky headers: 50
- Dropdowns/tooltips: 1000
- Modals: 2000
- Toasts: 3000
- Debug tools: 9999

**Check:**
- No elements behind when they should be in front
- Dropdowns don't get cut off
- Modals always on top

---

### **Animations & Transitions**

**Timing:**
- Micro-interactions: 100-200ms
- Standard transitions: 200-300ms
- Complex animations: 300-500ms
- Page transitions: 400-600ms

**Easing:**
- Ease-out: Elements entering
- Ease-in: Elements exiting
- Ease-in-out: Looping/reversing

**Reduced Motion:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Check:**
- Animations respect user preferences
- No jarring movements
- Smooth 60fps performance
- No content shifting

---

## 📸 SCREENSHOT CHECKLIST

**For Each Critical Page:**

1. **Above the Fold**
   - Light mode
   - Dark mode
   - 1440px width
   - 100% zoom

2. **Full Page**
   - Scrolled to bottom
   - All sections visible
   - Both themes

3. **Mobile View**
   - 375px width
   - Both themes
   - Portrait orientation

4. **Interaction States**
   - Hover on primary CTA
   - Focus on first input/link
   - Menu open (if applicable)
   - Modal open (if applicable)

5. **Edge Cases**
   - Empty states
   - Loading states
   - Error states
   - Extremely long content

---

## 🐛 COMMON ISSUES TO LOOK FOR

### **Layout Problems**

- [ ] Text overflowing containers
- [ ] Images not loading/broken
- [ ] Overlapping elements
- [ ] Misaligned columns
- [ ] Inconsistent spacing
- [ ] Elements cut off at viewport edges
- [ ] Horizontal scrollbar (unintended)
- [ ] White space gaps (unintended)

### **Typography Issues**

- [ ] Text too small to read
- [ ] Lines too long (> 90 characters)
- [ ] Poor line height (cramped or too loose)
- [ ] Inconsistent font sizes
- [ ] Orphaned words/widows
- [ ] Text truncated with no ...
- [ ] Mixed fonts (should be system font stack)

### **Color & Contrast**

- [ ] Poor contrast (text hard to read)
- [ ] Links not visually distinct
- [ ] Disabled states unclear
- [ ] Dark mode colors incorrect
- [ ] Gradients banding/stepping
- [ ] Transparent elements illegible

### **Interactive States**

- [ ] No hover feedback
- [ ] Focus indicator invisible
- [ ] Active state same as default
- [ ] Disabled looks clickable
- [ ] Loading state unclear
- [ ] Error state not red/prominent

### **Responsive Issues**

- [ ] Mobile menu doesn't work
- [ ] Touch targets too small
- [ ] Horizontal scroll on mobile
- [ ] Content squished/overlapping
- [ ] Images not scaling
- [ ] Tables not responsive

---

## ✅ SIGN-OFF CRITERIA

**Before Moving to Pass C:**

1. ✅ All critical pages reviewed at 3 breakpoints minimum
2. ✅ All interactive states verified
3. ✅ Annotations captured for all issues found
4. ✅ Severity assigned (P0/P1/P2/P3)
5. ✅ Screenshots attached to all findings
6. ✅ Initial remediation guidance provided

---

## 📊 OUTPUT FORMAT

### **Issue Template**

```markdown
## [P1] Homepage - CTA Button Too Small on Mobile

**Page:** /  
**Breakpoint:** 375px  
**Theme:** Light  
**State:** Default

**Issue:**
"Start Free Trial" button is 38×38px on mobile (below 44px minimum)

**Expected:**
Minimum 44×44px for touch targets (WCAG 2.5.5)

**Screenshot:**
[Attach before screenshot]

**Root Cause:**
Button padding insufficient at mobile breakpoint

**Recommendation:**
```css
@media (max-width: 767px) {
  .cta-button {
    padding: 16px 24px; /* Ensures ≥44px height */
  }
}
```

**Severity:** P1 (ship-blocker)
**Assignee:** Layout Forensics Lead
```

---

*Pass B Owner: Principal Visual QA Director*  
*Last Updated: October 13, 2025*

