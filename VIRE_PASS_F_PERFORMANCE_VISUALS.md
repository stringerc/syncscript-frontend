# 📊 VIRE PASS F: Performance-Induced Visuals

**Owner:** Frontend Performance SRE  
**Tools:** Lighthouse, WebPageTest, Chrome DevTools  
**Duration:** 4-6 hours  
**Status:** In Progress

---

## 🎯 OBJECTIVE

Test how visual rendering performs under degraded conditions:
- Slow networks
- Slow CPUs
- Flaky resources
- Offline mode
- Low data mode

**Goal:** Ensure UI remains usable and visually intact even when performance is poor.

---

## 🌐 NETWORK THROTTLING TESTS

### **Slow 3G (400ms RTT, 400kbps)**

**Simulate:**
```
Chrome DevTools → Network tab → Throttling → Slow 3G
```

**Test Pages:**
- Homepage
- Dashboard
- Features page

**Visual Checks:**
- [ ] Loading states appear immediately
- [ ] Skeleton loaders shown while content loads
- [ ] Images load with placeholders
- [ ] No broken image icons (have fallback)
- [ ] Progressive enhancement (critical content first)

**CLS Prevention:**
- [ ] Space reserved for images before load
- [ ] Skeleton matches final dimensions
- [ ] No content jumping as resources load

---

### **Fast 3G (562.5ms RTT, 1.6Mbps)**

**Test:**
- [ ] Acceptable user experience
- [ ] Loading doesn't feel sluggish
- [ ] Animations still smooth
- [ ] Interactive elements responsive

---

### **Offline Mode**

**Test:**
1. Load page while online
2. Disconnect network
3. Navigate to cached pages
4. Attempt non-cached pages

**Service Worker Checks:**
- [ ] Offline page shown for uncached routes
- [ ] Cached pages load from Service Worker
- [ ] Visual indication of offline state
- [ ] Retry button present

**Expected Behavior:**
```
Online → Full experience
Offline (cached) → Cached pages load
Offline (uncached) → Friendly offline page
```

---

## 💻 CPU THROTTLING TESTS

### **4x CPU Slowdown**

**Simulate:**
```
Chrome DevTools → Performance tab → CPU: 4x slowdown
```

**Test Scenarios:**

**1. Animation Performance**
- [ ] Animations still run (may be slower)
- [ ] No freezing
- [ ] User can still interact
- [ ] Loading spinners visible

**2. List Rendering**
- [ ] Large lists don't freeze browser
- [ ] Virtualization working (if implemented)
- [ ] Scroll remains smooth-ish

**3. Modal Open/Close**
- [ ] Transitions complete
- [ ] No UI breaking
- [ ] Focus management works

---

## 🖼️ IMAGE LOADING STRATEGIES

### **Lazy Loading**

**Check:**
- [ ] Images below fold use `loading="lazy"`
- [ ] Above-fold images eager load
- [ ] Intersection Observer polyfill (if needed)

**Visual Validation:**
```html
<!-- Above fold: eager -->
<img src="hero.jpg" loading="eager" />

<!-- Below fold: lazy -->
<img src="feature.jpg" loading="lazy" />
```

---

### **Placeholder Strategy**

**Options:**
1. **Solid Color Placeholder**
   - Pro: Simple, fast
   - Con: Boring

2. **BlurHash/ThumbHash**
   - Pro: Recognizable preview
   - Con: Requires encoding

3. **LQIP (Low Quality Image Placeholder)**
   - Pro: Real image preview
   - Con: Extra bytes

**Current Implementation:**
- [ ] Placeholders prevent layout shift
- [ ] Placeholder color matches image theme
- [ ] Smooth transition placeholder → full image
- [ ] No flash of broken image icon

---

### **Responsive Images**

**srcset Implementation:**
```html
<img 
  src="image-800.jpg"
  srcset="
    image-400.jpg 400w,
    image-800.jpg 800w,
    image-1200.jpg 1200w
  "
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

**Check:**
- [ ] Correct image size loaded for viewport
- [ ] 1x/2x/3x DPR images available
- [ ] WebP/AVIF formats used (with fallback)

---

## ✍️ FONT LOADING STRATEGIES

### **FOIT (Flash of Invisible Text) Prevention**

**Current Strategy:**
```css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter.woff2');
  font-display: swap; /* Shows fallback immediately */
}
```

**Test:**
1. Throttle network to Slow 3G
2. Load page
3. Observe text rendering

**Expected:**
- [ ] Text visible immediately (system font)
- [ ] Smooth switch to custom font when loaded
- [ ] No layout shift on font swap (fallback metrics match)

---

### **Font Subsetting**

**Check:**
- [ ] Only needed characters included
- [ ] Latin, Latin-Extended subsets
- [ ] File sizes optimized (< 50KB per weight)

**Test:**
```bash
# Check font file sizes
ls -lh public/fonts/
```

---

## 📉 FLAKY RESOURCE SIMULATION

### **Image Load Failures**

**Simulate:**
1. Block image CDN in DevTools (Network → Block request URL)
2. Reload page

**Check:**
- [ ] Broken image placeholder shown
- [ ] Alt text displayed
- [ ] Layout doesn't break
- [ ] No console errors flooding

**Graceful Degradation:**
```html
<img 
  src="user-avatar.jpg" 
  alt="John Doe"
  onerror="this.src='/images/default-avatar.png'"
/>
```

---

### **API Timeout Simulation**

**Simulate:**
1. Throttle API calls to 10s delay
2. Load dashboard

**Check:**
- [ ] Loading state shown
- [ ] Timeout message after 30s
- [ ] Retry button present
- [ ] UI doesn't break
- [ ] User can navigate away

---

## 🎨 LOW DATA MODE

### **Browser Data Saver**

**Chrome:** Settings → Data Saver → On

**Expected Behavior:**
- [ ] Lower resolution images loaded
- [ ] Non-critical resources deferred
- [ ] Still functional and readable
- [ ] Visual quality acceptable

---

## 📊 CUMULATIVE LAYOUT SHIFT (CLS)

### **What Causes CLS:**

**Common Culprits:**
1. Images without dimensions
2. Ads/embeds without space reservation
3. Dynamic content insertion above viewport
4. Web fonts causing text reflow
5. Animations that change element size

**Prevention:**
```html
<!-- ❌ BAD: No dimensions -->
<img src="hero.jpg" />

<!-- ✅ GOOD: Dimensions set -->
<img src="hero.jpg" width="1200" height="600" />

<!-- ✅ BEST: Aspect ratio with CSS -->
<div style="aspect-ratio: 16/9">
  <img src="hero.jpg" style="width: 100%; height: auto;" />
</div>
```

---

### **CLS Measurement**

**Tools:**
1. **Lighthouse** - CLS score
2. **WebPageTest** - Filmstrip view
3. **Chrome DevTools** - Performance Insights

**Test:**
1. Load page with network throttling
2. Scroll through entire page
3. Review CLS events

**Target:** CLS < 0.10  
**Ideal:** CLS < 0.05

**Current Score:**
```
To be measured in Pass F execution
```

---

## 🧪 TEST SCENARIOS

### **Scenario 1: Slow Load**

**Steps:**
1. Clear cache
2. Throttle: Slow 3G
3. Load homepage
4. Document visual progression

**Check:**
- [ ] Critical CSS inline (< 14KB)
- [ ] Above-fold content prioritized
- [ ] Loading states immediately visible
- [ ] No FOUC (Flash of Unstyled Content)

---

### **Scenario 2: Font Load Delay**

**Steps:**
1. Block font files in DevTools
2. Load page
3. Wait 5 seconds
4. Unblock fonts

**Check:**
- [ ] Text visible from start (fallback font)
- [ ] Smooth transition to custom font
- [ ] Minimal layout shift (< 0.01 CLS)

---

### **Scenario 3: Image Load Failure**

**Steps:**
1. Block 50% of images randomly
2. Load page

**Check:**
- [ ] Alt text shows for failed images
- [ ] Placeholder/fallback shown
- [ ] Layout integrity maintained
- [ ] No broken UI

---

### **Scenario 4: API Delay/Failure**

**Steps:**
1. Intercept `/api/*` requests
2. Add 5-10s delay
3. Load dashboard

**Check:**
- [ ] Skeleton loaders appropriate
- [ ] "Taking longer than usual..." message (after 3s)
- [ ] Timeout message (after 30s)
- [ ] Retry functionality
- [ ] Error state visual quality

---

## ✅ DELIVERABLE

### **Performance-Visual Report**

**Format:**
```markdown
# Performance-Induced Visual Defects Report

## CLS Incidents

### Incident 1: Homepage Hero Image
- **CLS Value:** 0.15
- **Cause:** Image dimensions not set
- **Fix:** Add width/height attributes
- **Priority:** P1

### Incident 2: Dashboard Task List Load
- **CLS Value:** 0.08
- **Cause:** Skeleton height mismatch
- **Fix:** Match skeleton to average task height
- **Priority:** P2

## FOIT/FOUT Issues

### Issue 1: Custom Font Swap
- **Duration:** 2.3s invisible text
- **Fix:** font-display: swap
- **Status:** ✅ Fixed

## Image Loading

- **Total Images:** 24
- **With Placeholders:** 18 (75%)
- **Missing Dimensions:** 6
- **Action:** Add aspect-ratio to all

## Recommendations

1. Inline critical CSS (< 14KB)
2. Preload above-fold images
3. Add font-display: swap
4. Reserve space for all images
5. Optimize LCP (target < 2.5s)

## Metrics
- LCP: [value]s
- FID: [value]ms
- CLS: [value]
- TTFB: [value]ms
```

---

## ✅ PASS COMPLETION CRITERIA

- [ ] All throttling scenarios tested
- [ ] CLS < 0.10 verified
- [ ] FOIT/FOUT prevented
- [ ] Image loading strategy validated
- [ ] API failure handling graceful
- [ ] Offline mode functional
- [ ] Performance-Visual Report complete
- [ ] All P0/P1 issues documented

---

*Pass F Owner: Frontend Performance SRE*  
*Last Updated: October 13, 2025*

