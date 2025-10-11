# ✅ Performance & Core Web Vitals Checklist
**Standard:** Core Web Vitals + Industry Best Practices  
**Version:** 1.0  
**Purpose:** Ensure lightning-fast performance for all features

**NOTE:** This checklist applies to **ALL Work Packages**. No WP ships without passing this.

---

## 🎯 **CORE WEB VITALS (Google)**

### LCP (Largest Contentful Paint)
**Target:** <1.2s (Good: <2.5s, Poor: >4.0s)  
**Current:** 1.4s

- [ ] LCP element identified (usually hero image or main heading)
- [ ] LCP element loads in <1.2s on 3G
- [ ] Critical resources preloaded
- [ ] Above-the-fold content prioritized
- [ ] No render-blocking resources
- [ ] Fonts optimized (preload, font-display: swap)
- [ ] Images optimized (WebP/AVIF, sized correctly)

**Testing:**
```bash
# Lighthouse
npx lighthouse https://your-url --view

# WebPageTest
# 3G, Mobile, Measure LCP
```

---

### INP (Interaction to Next Paint)
**Target:** <200ms (Good: <200ms, Poor: >500ms)  
**Current:** Unknown (need to instrument)

- [ ] All interactions respond in <200ms
- [ ] Heavy calculations moved to Web Workers
- [ ] No long tasks >50ms (blocking main thread)
- [ ] Debounced inputs (search, filters)
- [ ] Optimistic UI updates (no wait for server)
- [ ] Event handlers non-blocking

**Critical Interactions:**
- [ ] Energy logging: <100ms
- [ ] Task creation: <200ms (optimistic)
- [ ] Energy recalibration: <200ms
- [ ] Modal open: <100ms
- [ ] View switching: <200ms

**Testing:**
```bash
# Chrome DevTools
# Performance tab → Measure interactions
# Look for "Long Tasks" (>50ms)
```

---

### CLS (Cumulative Layout Shift)
**Target:** <0.05 (Good: <0.1, Poor: >0.25)  
**Current:** Unknown

- [ ] All elements have defined sizes (width/height)
- [ ] No unsized images (always specify dimensions)
- [ ] Web fonts preloaded (font-display: swap)
- [ ] Ad spaces have fixed size (N/A for SyncScript)
- [ ] Dynamic content: Space reserved
- [ ] No content inserted above fold after load
- [ ] Animations use transform (not top/left)

**Common Culprits:**
- [ ] Weather widget loading shifts layout → FIX: Reserve space
- [ ] Avatar images → FIX: Set width/height
- [ ] Font loading → FIX: Preload, font-display
- [ ] Banners/toasts → FIX: Overlay, don't push content

**Testing:**
```bash
# Lighthouse CLS report
# Chrome DevTools → Performance → Experience section
```

---

## ⚡ **LOADING PERFORMANCE**

### Bundle Size
**Target:** Initial load <300KB (JS + CSS)  
**Current:** 245KB ✅

- [ ] Code splitting implemented
- [ ] Route-based splitting (per page)
- [ ] Component-based splitting (heavy components lazy loaded)
- [ ] Main bundle: <150KB
- [ ] Vendor bundle: <100KB
- [ ] Route bundles: <50KB each

### Resource Optimization
- [ ] Images:
  - [ ] WebP/AVIF format
  - [ ] Responsive sizes (srcset)
  - [ ] Lazy loading (below fold)
  - [ ] Compressed (<100KB each)
- [ ] Fonts:
  - [ ] Subset (only needed characters)
  - [ ] Preloaded (critical fonts)
  - [ ] font-display: swap
  - [ ] WOFF2 format
- [ ] CSS:
  - [ ] Critical CSS inlined (<14KB)
  - [ ] Non-critical deferred
  - [ ] Unused CSS removed
  - [ ] Minified

### JavaScript
- [ ] Tree-shaking enabled
- [ ] Dead code eliminated
- [ ] Polyfills loaded conditionally
- [ ] Analytics lazy loaded
- [ ] Third-party scripts deferred

---

## 🚀 **RUNTIME PERFORMANCE**

### Rendering
- [ ] 60fps animations (no jank)
- [ ] Use `will-change` sparingly
- [ ] GPU-accelerated transforms
- [ ] Avoid layout thrashing
- [ ] RequestAnimationFrame for animations

### Memory
- [ ] No memory leaks (listeners cleaned up)
- [ ] Large lists virtualized (only render visible items)
- [ ] Images garbage collected when off-screen
- [ ] Event listeners: `{ passive: true }` where possible

### Network
- [ ] HTTP/2 or HTTP/3
- [ ] Compression (gzip/brotli)
- [ ] Caching headers set correctly
- [ ] CDN for static assets
- [ ] API calls batched where possible

---

## 📊 **PERFORMANCE BUDGETS**

### Page Load (3G Network)
- [ ] First paint: <1s
- [ ] First Contentful Paint: <1.5s
- [ ] Largest Contentful Paint: <2.5s
- [ ] Time to Interactive: <3.5s
- [ ] Total Blocking Time: <300ms

### API Response Times
- [ ] p50: <200ms
- [ ] p95: <500ms
- [ ] p99: <1s
- [ ] Timeout: 5s

### Database Queries
- [ ] Simple queries: <50ms
- [ ] Complex queries: <200ms
- [ ] Joins: <300ms
- [ ] Full-text search: <500ms

---

## 🎨 **IMAGE OPTIMIZATION**

### Format & Size
- [ ] Use WebP (with JPEG fallback)
- [ ] Use AVIF where supported
- [ ] Compress to <100KB per image
- [ ] Thumbnails: <20KB
- [ ] Icons: SVG (not PNG)

### Responsive Images
```html
<img 
  src="image-800w.webp"
  srcset="image-400w.webp 400w, image-800w.webp 800w, image-1200w.webp 1200w"
  sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
  width="800"
  height="600"
  alt="Description"
  loading="lazy"
/>
```

### Lazy Loading
- [ ] Below-the-fold images lazy loaded
- [ ] Intersection Observer used
- [ ] Placeholder shown while loading
- [ ] Loading="lazy" attribute set

---

## 🔤 **FONT OPTIMIZATION**

### Font Loading Strategy
- [ ] Critical fonts preloaded:
```html
<link rel="preload" href="/fonts/Inter-var.woff2" as="font" type="font/woff2" crossorigin>
```
- [ ] font-display: swap (prevent FOIT)
- [ ] Font subset (Latin only, ~40KB vs 200KB)
- [ ] System font fallback
- [ ] Variable fonts used (one file, multiple weights)

### Font Stack
```css
font-family: 'Inter var', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
```

---

## 📦 **CODE SPLITTING**

### Implemented
- [ ] Route-based: Each page separate bundle
- [ ] Component-based: Heavy components lazy loaded
- [ ] Vendor splitting: React/vendor separate chunk
- [ ] Shared components: Common chunk

### Lazy Loading Components
```javascript
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false // if not needed for SEO
});
```

### Critical Components
- [ ] Must load first: <50KB total
  - Header, Auth, Main layout
- [ ] Lazy load: Everything else
  - Kanban, Gantt, Advanced Analytics, etc.

---

## 🌐 **NETWORK OPTIMIZATION**

### Caching Strategy
- [ ] Static assets: Cache forever (immutable)
- [ ] HTML: Cache 5min (revalidate)
- [ ] API responses: Cache appropriately
- [ ] Service Worker: Cache-first for assets
- [ ] Network-first for API calls

### Request Reduction
- [ ] Combine related API calls (batch)
- [ ] Debounce search inputs (300ms)
- [ ] Use GET for cacheable requests
- [ ] Minimize third-party requests
- [ ] DNS-prefetch for external domains

---

## 📱 **MOBILE PERFORMANCE**

### Mobile-Specific
- [ ] Touch delay: 0 (use touch events)
- [ ] Scrolling: 60fps smooth
- [ ] Tap highlights: Fast feedback
- [ ] Gesture recognition: <100ms
- [ ] No fixed positioning jank

### Device Constraints
- [ ] Works on iPhone SE (older device)
- [ ] Works on low-end Android (2GB RAM)
- [ ] Low-power mode: Reduced animations
- [ ] Slow network: Graceful degradation

---

## 🧪 **PERFORMANCE TESTING**

### Tools
- [ ] Lighthouse (mobile + desktop)
- [ ] WebPageTest (3G, Cable, LTE)
- [ ] Chrome DevTools Performance tab
- [ ] React DevTools Profiler
- [ ] Bundle Analyzer

### Scenarios
- [ ] Cold load (no cache): <3s TTI
- [ ] Warm load (cached): <1s TTI
- [ ] Navigation (SPA): <200ms
- [ ] Back button: Instant (bfcache)

### Real User Monitoring
- [ ] Use Performance API
- [ ] Track Core Web Vitals in production
- [ ] Alert on regressions (>10% slower)
- [ ] p75 metrics (not just average)

---

## 📊 **METRICS & INSTRUMENTATION**

### Performance Events
```javascript
// Page load
track('page_load', { 
  lcp, fcp, ttfb, tti, cls, fid,
  connection: navigator.connection.effectiveType
});

// Interaction timing
track('interaction_timing', {
  action: 'energy_log',
  duration: 87, // ms
  inp: 95 // interaction to next paint
});

// Bundle sizes
track('bundle_loaded', {
  name: 'main',
  size: 147000, // bytes
  duration: 234 // ms
});
```

### Monitoring
- [ ] Real User Monitoring (RUM) setup
- [ ] Synthetic monitoring (hourly)
- [ ] Performance dashboard
- [ ] Alerts on regression

---

## ✅ **ACCEPTANCE CRITERIA**

### Scenario: Dashboard Load (Mobile 3G)
```
GIVEN user on mobile with 3G connection
WHEN they navigate to /dashboard
THEN First Contentful Paint occurs in <1.5s
AND Largest Contentful Paint occurs in <2.5s
AND page is interactive in <3.5s
AND no layout shifts (CLS < 0.1)
AND energy logging button responsive immediately
AND Lighthouse mobile score >90
```

### Scenario: Energy Logging Performance
```
GIVEN user on dashboard
WHEN they tap energy level button (e.g., "3")
THEN button responds visually in <50ms
AND energy saved to state in <100ms
AND emblem charge calculates in <100ms
AND UI updates in <200ms (total INP)
AND no frame drops (60fps maintained)
AND user feels instant feedback
```

### Scenario: View Switching
```
GIVEN user viewing List view
WHEN they switch to Kanban view
THEN transition starts in <100ms
AND Kanban component loads in <500ms
AND animation runs at 60fps
AND no layout shift
AND INP < 200ms
```

---

## 🚫 **FAILURE CONDITIONS**

This checklist FAILS if:
- LCP >2.5s on mobile 3G
- INP >200ms for any interaction
- CLS >0.1 at any point
- Lighthouse score <90
- Any jank (dropped frames) during critical interactions
- Bundle size >300KB (initial load)
- API response p95 >1s

---

## ✅ **SUCCESS CONDITIONS**

This checklist PASSES when:
- All checkboxes checked ✓
- All Core Web Vitals in "Good" range ✓
- Lighthouse score ≥95 (mobile + desktop) ✓
- All interactions <200ms (INP) ✓
- No jank during testing ✓
- Bundle size targets met ✓
- Real user metrics trending green ✓
- CEA + CTP + CPO approve ✓

---

## 📈 **LIGHTHOUSE SCORE BREAKDOWN**

Target: ≥95/100

- **Performance:** ≥90
  - FCP, LCP, TBT, CLS, Speed Index
- **Accessibility:** 100
  - Color contrast, ARIA, semantic HTML
- **Best Practices:** 100
  - HTTPS, no console errors, modern APIs
- **SEO:** 100
  - Meta tags, structured data, mobile-friendly
- **PWA:** 100 (if applicable)
  - Manifest, service worker, installable

---

**Status:** ☐ PASS ☐ FAIL ☐ PENDING  
**Lighthouse Scores:**
- Mobile: ___ / 100
- Desktop: ___ / 100

**Core Web Vitals:**
- LCP: ___s (target: <1.2s)
- INP: ___ms (target: <200ms)
- CLS: ___ (target: <0.05)

**Validated By:** ___________  
**Date:** ___________

<!-- PERF-AUDIT: CEA:___ CTP:___ CPO:___ -->

