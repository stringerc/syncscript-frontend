# ✅ Accessibility - WCAG 2.2 AA Checklist
**Standard:** WCAG 2.2 Level AA  
**Version:** 1.0  
**Purpose:** Ensure all features are accessible to all users

**NOTE:** This checklist applies to **ALL Work Packages**. No WP ships without passing this.

---

## 1. PERCEIVABLE

### 1.1 Text Alternatives
- [ ] All images have alt text
- [ ] All icons have aria-label or sr-only text
- [ ] All charts have text alternative or data table
- [ ] Decorative images marked with alt="" or aria-hidden
- [ ] Complex images (graphs) have long descriptions

### 1.2 Time-Based Media
- [ ] Audio descriptions for video content (if any)
- [ ] Captions for audio content (if any)
- [ ] Transcripts available

### 1.3 Adaptable
- [ ] Info/structure/relationships programmatically determinable
- [ ] Meaningful sequence (tab order logical)
- [ ] No reliance on sensory characteristics alone (color/shape/position)
- [ ] Orientation works in portrait AND landscape
- [ ] Autocomplete attributes on inputs (name, email, etc.)
- [ ] Input purpose identified (autocomplete tokens)

### 1.4 Distinguishable

#### Color Contrast
- [ ] Normal text (18px): ≥4.5:1 contrast
- [ ] Large text (24px): ≥3:1 contrast
- [ ] UI components: ≥3:1 contrast
- [ ] Active/focus states: ≥3:1 contrast
- [ ] Graphical objects: ≥3:1 contrast

#### Other Visual Requirements
- [ ] Text resizable to 200% without loss of content/function
- [ ] No images of text (except logos)
- [ ] Reflow works at 320px width (no horizontal scroll)
- [ ] Line height ≥1.5× font size
- [ ] Paragraph spacing ≥2× font size
- [ ] Non-text spacing: User can adjust without loss of function
- [ ] Hover/focus content dismissible without moving pointer

---

## 2. OPERABLE

### 2.1 Keyboard Accessible
- [ ] All functionality available via keyboard
- [ ] No keyboard trap (can escape all components)
- [ ] Keyboard shortcuts documented
- [ ] Character key shortcuts can be turned off/remapped
- [ ] Focus order follows logical sequence
- [ ] Focus visible (outline ≥2px, high contrast)

### 2.2 Enough Time
- [ ] No time limits (or can extend/disable)
- [ ] Can pause/stop/hide moving content
- [ ] Interruptions can be postponed/suppressed
- [ ] Re-authenticating doesn't lose data

### 2.3 Seizures & Physical Reactions
- [ ] No content flashes >3 times per second
- [ ] No bright flash animations
- [ ] Motion can be disabled (prefers-reduced-motion)
- [ ] Parallax/animation optional

### 2.4 Navigable
- [ ] Skip link to main content
- [ ] Page titles descriptive and unique
- [ ] Focus order meaningful
- [ ] Link purpose clear from text or context
- [ ] Multiple ways to find pages (menu, search, sitemap)
- [ ] Headings and labels describe purpose
- [ ] Focus indicator visible (not outline: 0)
- [ ] Focus not obscured by other content (NEW in 2.2)

### 2.5 Input Modalities
- [ ] Touch targets ≥24px (WCAG 2.2: was 44px in 2.1)
- [ ] Pointer gestures have keyboard/single-pointer alternative
- [ ] Accidental activation prevented (mouseup cancels if moved)
- [ ] Label in name (accessible name includes visible label)
- [ ] Dragging has alternative (or can be disabled)
- [ ] Target size: ≥24px × 24px (NEW in 2.2)

---

## 3. UNDERSTANDABLE

### 3.1 Readable
- [ ] Page language identified (<html lang="en">)
- [ ] Parts in other languages marked (lang attribute)
- [ ] Unusual words explained (glossary or inline)
- [ ] Abbreviations expanded on first use
- [ ] Reading level: Grade 9 or lower for primary content

### 3.2 Predictable
- [ ] On focus: No context change (no surprise navigation)
- [ ] On input: No context change (no auto-submit)
- [ ] Navigation consistent across pages
- [ ] Components identified consistently (same names)
- [ ] Changes on request only (explicit user action)
- [ ] Consistent help available (same location)

### 3.3 Input Assistance
- [ ] Input errors identified and described
- [ ] Labels/instructions provided for user input
- [ ] Error suggestions provided
- [ ] Legal/financial/data commitments:
  - [ ] Reversible OR
  - [ ] Checked for errors OR
  - [ ] Confirmed before submit
- [ ] Accessible help available
- [ ] Redundant entry minimized (autocomplete, defaults)
- [ ] Accessible authentication (NEW in 2.2)
  - [ ] No cognitive function test (e.g., puzzles, memorization)
  - [ ] Alternative available (email link, biometric)

---

## 4. ROBUST

### 4.1 Compatible
- [ ] Valid HTML (no parsing errors)
- [ ] Elements have complete start/end tags
- [ ] Elements nested correctly
- [ ] Elements have unique IDs
- [ ] Name, role, value determinable for all UI components
- [ ] Status messages announced (role="status" or aria-live)

---

## 📋 **ARIA BEST PRACTICES**

### Semantic HTML First
- [ ] Use <button> for buttons (not <div onclick>)
- [ ] Use <a> for links (not <span onclick>)
- [ ] Use <input type="checkbox"> not custom divs
- [ ] Use <nav>, <main>, <header>, <footer> landmarks

### ARIA When Needed
- [ ] aria-label on icon-only buttons
- [ ] aria-labelledby for complex labels
- [ ] aria-describedby for hints/errors
- [ ] aria-live for dynamic updates
- [ ] aria-expanded for collapsible sections
- [ ] aria-controls for relationships
- [ ] aria-current for current page/step

### ARIA Roles
- [ ] role="dialog" for modals
- [ ] role="alert" for urgent messages
- [ ] role="status" for non-urgent updates
- [ ] role="progressbar" for progress indicators
- [ ] role="tablist/tab/tabpanel" for tabs

---

## 🎯 **FOCUS MANAGEMENT**

### Modals
- [ ] Focus trapped in modal (can't tab out)
- [ ] First focusable element focused on open
- [ ] Focus returned to trigger on close
- [ ] Escape key closes modal
- [ ] Click outside closes (optional, announced)

### Dynamic Content
- [ ] Focus moved to new content when loaded
- [ ] Screen reader announced: "Section loaded"
- [ ] No orphaned focus (e.g., deleted element)

### Skip Links
- [ ] Skip to main content (first element)
- [ ] Skip to navigation
- [ ] Skip repetitive content

---

## 🎨 **VISUAL DESIGN**

### Color
- [ ] Never use color alone for meaning
- [ ] Error states have icon + text (not just red color)
- [ ] Status indicators have icon + text
- [ ] Charts accessible without color vision

### Typography
- [ ] Font size ≥16px for body text
- [ ] Line height ≥1.5
- [ ] Font stack includes system fonts
- [ ] No italics for long passages
- [ ] Bold used sparingly
- [ ] ALL CAPS avoided (or screenreader friendly)

### Spacing
- [ ] Touch targets: ≥24px (WCAG 2.2)
- [ ] Critical actions: ≥44px (iOS HIG)
- [ ] Whitespace between interactive elements
- [ ] Crowded interfaces avoided

---

## 🎹 **KEYBOARD NAVIGATION**

### Global Shortcuts
- [ ] Documented in help (/shortcuts)
- [ ] Can be disabled/remapped
- [ ] Don't conflict with browser/OS shortcuts
- [ ] Announced to screen reader users

### Component Patterns
- [ ] Dropdowns: Arrow keys navigate, Enter selects
- [ ] Tabs: Arrow keys switch tabs
- [ ] Accordions: Enter/Space toggle
- [ ] Modals: Escape closes
- [ ] Tooltips: Visible on focus (not just hover)

---

## 📢 **SCREEN READER SUPPORT**

### Announcements
- [ ] Task completed: "Task completed, energy updated to level 4"
- [ ] Error occurred: "Error: Task title required"
- [ ] Success: "Project created successfully"
- [ ] Loading: "Loading tasks, please wait"
- [ ] Updates: Use aria-live="polite" (not "assertive")

### Landmarks
- [ ] <header> or role="banner"
- [ ] <nav> or role="navigation"
- [ ] <main> or role="main"
- [ ] <footer> or role="contentinfo"
- [ ] <aside> or role="complementary"

### Headings
- [ ] Hierarchical structure (H1 → H2 → H3)
- [ ] No skipped levels (H1 → H3)
- [ ] Descriptive (not "Click here")

---

## 🧪 **TESTING REQUIREMENTS**

### Automated Tests
- [ ] aXe DevTools: 0 violations
- [ ] Lighthouse Accessibility: 100/100
- [ ] WAVE: 0 errors
- [ ] HTML validator: Valid markup

### Manual Tests
- [ ] Keyboard only navigation (unplug mouse)
- [ ] Screen reader testing (NVDA/JAWS/VoiceOver)
- [ ] Zoom to 200% (no loss of function)
- [ ] High contrast mode (Windows)
- [ ] Reduced motion mode

### User Testing
- [ ] Screen reader user completes core tasks
- [ ] Keyboard-only user completes core tasks
- [ ] Low-vision user with 200% zoom completes tasks
- [ ] Motor disability user with switch control completes tasks
- [ ] Success rate: >90% for all

---

## ✅ **ACCEPTANCE CRITERIA**

```
SCENARIO: Screen reader user creates task
GIVEN screen reader user on dashboard
WHEN they press "C" keyboard shortcut
THEN Create Task modal opens
AND focus moves to "Task title" input
AND screen reader announces "Create Task dialog, task title, edit text"
AND user types title, presses Tab
AND screen reader announces each field clearly
AND user submits with Enter key
AND task created successfully
AND confirmation announced "Task created successfully"
AND focus returns to task list
AND new task announced in list
```

---

## 🚫 **FAILURE CONDITIONS**

This checklist FAILS if:
- Any aXe violations (errors, not warnings)
- Keyboard trap detected
- Focus indicator invisible
- Color contrast <4.5:1 for text
- Missing alt text on informative images
- Form errors not announced to screen readers
- Screen reader testing reveals any blocker issue

---

## ✅ **SUCCESS CONDITIONS**

This checklist PASSES when:
- All checkboxes checked ✓
- aXe DevTools: 0 violations ✓
- Lighthouse Accessibility: 100/100 ✓
- Screen reader user testing: 100% task success ✓
- Keyboard-only user testing: 100% task success ✓
- WCAG 2.2 AA audit: Full compliance ✓
- CEA + CTP + CPO approve ✓

---

**Status:** ☐ PASS ☐ FAIL ☐ PENDING  
**Tested With:**
- [ ] NVDA (Windows)
- [ ] JAWS (Windows)
- [ ] VoiceOver (macOS/iOS)
- [ ] TalkBack (Android)

**Validated By:** ___________  
**Date:** ___________

<!-- A11Y-AUDIT: CEA:___ CTP:___ CPO:___ -->

