# 🎬 VIRE PASS E: Motion & Interaction Dynamics

**Owner:** Motion & Micro-Interaction QA Lead  
**Duration:** 3-4 hours  
**Status:** In Progress

---

## 🎯 OBJECTIVE

Validate that all animations, transitions, and micro-interactions are:
- **Smooth:** 60fps, no jank
- **Purposeful:** Enhance UX, not distract
- **Accessible:** Respect reduced-motion preferences
- **Performant:** GPU-accelerated, minimal reflows

---

## 🎨 ANIMATION INVENTORY

### **Page-Level Animations**

**1. Page Transitions**
- Route changes (page A → page B)
- **Duration:** 400-600ms
- **Easing:** ease-in-out
- **Check:** No flash, smooth fade/slide

**2. Section Entrances**
- Hero section fade-in
- **Duration:** 500-800ms
- **Easing:** ease-out
- **Stagger:** 100-200ms between elements

**3. Scroll Animations**
- Elements fade/slide in on scroll
- **Trigger:** IntersectionObserver
- **Check:** Triggers once, no re-trigger on scroll up

---

### **Component-Level Animations**

**1. Modal/Dialog**
- **Open:** Scale(0.95 → 1) + Fade(0 → 1), 300ms
- **Close:** Scale(1 → 0.95) + Fade(1 → 0), 200ms
- **Backdrop:** Fade(0 → 1), 300ms
- **Check:** 
  - [ ] No layout shift
  - [ ] Backdrop dims properly
  - [ ] Escape key works during animation

**2. Dropdown/Popover**
- **Open:** Slide down + Fade, 200ms
- **Close:** Slide up + Fade, 150ms
- **Check:**
  - [ ] Stays within viewport
  - [ ] No overflow clipping
  - [ ] Positioning correct at all viewport sizes

**3. Toast Notifications**
- **Enter:** Slide in from right + Fade, 300ms
- **Exit:** Slide out to right + Fade, 200ms
- **Stack:** Multiple toasts stack vertically
- **Check:**
  - [ ] No overlap
  - [ ] Auto-dismiss after 3-5s
  - [ ] Hover pauses auto-dismiss

**4. Button/Link Hover**
- **Transition:** Color/shadow change, 200ms
- **Easing:** ease-out
- **Check:**
  - [ ] Immediate visual feedback
  - [ ] Smooth, not jarring
  - [ ] Returns to default on mouse out

**5. Loading Spinners**
- **Rotation:** 1-2s per revolution
- **Easing:** linear (constant speed)
- **Check:**
  - [ ] Smooth rotation (no stutter)
  - [ ] Centered in container
  - [ ] Size appropriate to context

**6. Progress Bars**
- **Fill:** Animated from 0 → target%, 800ms
- **Easing:** ease-out
- **Check:**
  - [ ] Smooth fill animation
  - [ ] No jumps or snaps
  - [ ] Percentage updates sync with visual

**7. Skeleton Loaders**
- **Pulse:** Opacity 0.4 → 0.8 → 0.4, 1.5s loop
- **Check:**
  - [ ] Matches final content dimensions
  - [ ] Smooth transition to real content
  - [ ] No layout shift on load

---

### **Micro-Interactions**

**1. Checkbox/Toggle**
- **Check:** Scale(1 → 1.1 → 1), 200ms
- **Checkmark:** Draw animation, 300ms
- **Check:**
  - [ ] Immediate visual feedback
  - [ ] Accessible via keyboard (Space)

**2. Input Focus**
- **Focus:** Border color change + ring, 150ms
- **Ring:** 0 0 0 4px rgba(blue, 0.2)
- **Check:**
  - [ ] Always visible
  - [ ] High contrast
  - [ ] No jumpy layout

**3. Card Hover (Dashboard)**
- **Hover:** Elevate (shadow), 200ms
- **Check:**
  - [ ] Subtle, not distracting
  - [ ] All cards same behavior
  - [ ] No performance issues with many cards

**4. Drag & Drop**
- **Grab:** Scale(1 → 1.05), cursor change
- **Drag:** Follow mouse smoothly
- **Drop:** Scale back, snap to position
- **Check:**
  - [ ] Visual feedback during drag
  - [ ] Drop zones highlighted
  - [ ] Snap animation smooth

---

## ⚡ PERFORMANCE VALIDATION

### **60 FPS Check**

**Tool:** Chrome DevTools Performance Tab

**Test:**
1. Record performance while triggering animation
2. Check FPS in timeline
3. Look for dropped frames (red bars)
4. Verify GPU acceleration (green bars)

**Animations That MUST be GPU-Accelerated:**
- `transform` (translate, scale, rotate)
- `opacity`
- `filter` (blur, saturate)

**Avoid Animating (causes layout/paint):**
- `width`, `height`
- `top`, `left`, `right`, `bottom`
- `margin`, `padding`
- `font-size`

---

### **Layout Shift Prevention**

**During Animation:**
- [ ] Element dimensions reserved before load
- [ ] Skeleton matches final content size
- [ ] Absolute-positioned elements don't push content
- [ ] Animations use `transform`, not `margin`/`width`

**Measure CLS:**
```javascript
// Layout Shift Observer
new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.log('Layout shift:', entry.value);
  });
}).observe({ entryTypes: ['layout-shift'] });
```

**Target:** CLS < 0.10

---

## 📱 GESTURE & TOUCH

### **Mobile Interactions**

**Swipe:**
- [ ] Swipe to dismiss (toasts, cards)
- [ ] Swipe navigation (carousels)
- [ ] No conflict with browser swipe-back

**Pull-to-Refresh:**
- [ ] Visual indicator during pull
- [ ] Threshold reasonable (60-80px)
- [ ] Smooth snap-back if cancelled

**Long Press:**
- [ ] Context menu appears
- [ ] Visual feedback during press
- [ ] Cancellable if dragged away

**Pinch-to-Zoom:**
- [ ] Allowed on images/maps
- [ ] Prevented on UI (viewport meta tag)
- [ ] Smooth, responsive

---

## 🎭 REDUCED MOTION

### **Respect User Preferences**

**System Setting:**
```
macOS: System Preferences → Accessibility → Display → Reduce motion
Windows: Settings → Ease of Access → Display → Show animations
```

**CSS Implementation:**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Test:**
1. Enable "Reduce Motion" in OS
2. Navigate site
3. Verify:
   - [ ] Animations still convey state changes
   - [ ] No jarring instant changes
   - [ ] Crossfades become instant opacity changes
   - [ ] Slides become instant visibility toggles
   - [ ] Essential motion (loading spinners) still present

---

## 📋 MOTION CATALOGUE

### **Approved Animations**

| Element | Animation | Duration | Easing | Reduced Motion |
|---------|-----------|----------|--------|----------------|
| **Modal Open** | Scale + Fade | 300ms | ease-out | Fade only (10ms) |
| **Toast Enter** | Slide + Fade | 300ms | ease-out | Fade only |
| **Page Section** | Fade up | 500ms | ease-out | Fade only |
| **Button Hover** | Shadow grow | 200ms | ease-out | Instant |
| **Loading Spinner** | Rotate | 1000ms | linear | Keep (essential) |
| **Progress Fill** | Width grow | 800ms | ease-out | Instant fill |
| **Checkbox Check** | Scale + Draw | 200ms | ease-out | Instant |
| **Dropdown Open** | Slide down | 200ms | ease-out | Instant |

---

## 🧪 TEST EXECUTION

### **For Each Animation:**

1. **Visual Inspection**
   - Record video (60fps)
   - Watch in slow motion
   - Look for stuttering/jank

2. **Performance Profile**
   - Chrome DevTools → Performance
   - Record animation
   - Verify 60fps (16.67ms/frame)
   - Check for layout thrashing

3. **Reduced Motion Test**
   - Enable OS setting
   - Verify fallback behavior
   - Ensure still functional

4. **Device Testing**
   - Test on low-end device (if possible)
   - Verify still smooth
   - Check for slowdown

---

## 🎯 PASS CRITERIA

**All Animations Must:**
- [ ] Run at 60fps
- [ ] Use GPU acceleration (transform/opacity)
- [ ] Respect reduced-motion
- [ ] Not cause layout shift
- [ ] Have appropriate timing (not too fast/slow)
- [ ] Use design-system easing curves
- [ ] Enhance UX (not distract)

**All Interactions Must:**
- [ ] Provide immediate feedback (< 100ms)
- [ ] Work on both pointer and touch
- [ ] Be cancellable
- [ ] Recover from interrupted state

---

## ✅ SIGN-OFF

Before Pass F:
- [ ] All critical animations catalogued
- [ ] Performance verified (60fps)
- [ ] Reduced-motion parity confirmed
- [ ] Touch/gesture handling validated
- [ ] No layout shift during motion
- [ ] Motion Catalogue document complete

---

*Pass E Owner: Motion & Micro-Interaction QA Lead*  
*Last Updated: October 13, 2025*

