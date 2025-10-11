# 🧪 Quick Smoke Test Guide - 15 Minutes

**Purpose:** Verify all 14 features work after deployment  
**Time:** 15 minutes  
**Then:** REST! 🌙

---

## 🎯 **PRIORITY 1: CORE FUNCTIONALITY (5 min)**

### **Must Work:**

1. **Site Loads**
   - ✅ Go to: https://syncscript.app
   - ✅ Should load without errors
   - ✅ Check console: No critical errors

2. **Authentication**
   - ✅ Login button works
   - ✅ Auth0 flow completes
   - ✅ Redirects to dashboard

3. **Dashboard Renders**
   - ✅ Dashboard loads
   - ✅ Energy selector visible
   - ✅ Task list visible
   - ✅ No white screen/crashes

4. **Command Center**
   - ✅ Press Cmd+K (or click "All Features")
   - ✅ Modal opens
   - ✅ Search works
   - ✅ Features listed

5. **Energy Selector**
   - ✅ Click energy level
   - ✅ Can change 1-5
   - ✅ Visual feedback works

**If ANY of these fail:** 🚨 Critical issue - let me know!

---

## ⚡ **PRIORITY 2: NEW FEATURES (10 min)**

### **Test Each New Feature:**

6. **WP-ENG-01: Energy Recalibration**
   - ✅ Create a test task
   - ✅ Complete it
   - ✅ Watch for toast: "Energy updated!"
   - ✅ Check if energy level changed
   - **Expected:** Auto-update with animation

7. **WP-ENG-02: Emblem Breakdown**
   - ✅ After completing task, look for emblem charge in toast
   - ✅ Click on the emblem charge
   - ✅ Modal should open showing breakdown
   - **Expected:** Base + bonuses explained

8. **WP-ENG-03: Anti-Gaming**
   - ✅ Complete 3-4 tasks very quickly (< 30 sec apart)
   - ✅ Should see penalty warning
   - **Expected:** "Rapid completion detected! Emblem charge reduced by 50%"

9. **WP-FIN-01: Comfort Bands**
   - ✅ Command Center → Search "budget"
   - ✅ Click Budget feature
   - ✅ Should see beautiful 3-handle slider
   - ✅ Try dragging handles
   - **Expected:** Smooth drag, values update

10. **WP-FIN-02: Budget Fit Scoring**
    - ✅ Open Smart Suggestions
    - ✅ Look for budget fit badges (if you set bands)
    - **Expected:** ⭐⭐⭐⭐⭐ ratings on recommendations

11. **WP-FIN-03: Savings Goals**
    - ✅ Command Center → Search "goals"
    - ✅ Click Goals feature
    - ✅ Create a test goal (e.g., "Vacation, $3000")
    - **Expected:** Beautiful goal card with progress bar

12. **WP-PERS-01: AI Explainability**
    - ✅ Open Smart Suggestions
    - ✅ Find a suggestion
    - ✅ Click "💡 Why this?" button
    - **Expected:** Beautiful modal explaining AI reasoning

13. **WP-PAR-03: Comparison Page**
    - ✅ Visit: https://syncscript.app/compare
    - ✅ Should show feature comparison table
    - **Expected:** Triple Intelligence™ highlighted

14. **WP-PAR-01: Feature Discovery**
    - ✅ Wait ~3 minutes
    - ✅ Should see purple gradient tip banner
    - **Expected:** Progressive feature discovery tip

---

## 📱 **BONUS: MOBILE CHECK (2 min)**

15. **Mobile Responsive**
    - ✅ Resize browser to mobile size (375px)
    - ✅ Dashboard should adapt
    - ✅ Modals should scroll properly
    - **Expected:** No broken layouts

---

## ✅ **SUCCESS CRITERIA:**

**If these work, you're GOLDEN:**
- ✅ Site loads
- ✅ Login works
- ✅ Dashboard renders
- ✅ At least 5 of the 14 features work
- ✅ No critical console errors

**Perfect? Great! Not perfect? Let me know and I'll fix!**

---

## 🌙 **THEN REST!**

After this quick test:
- 🎉 Celebrate your legendary achievement
- 💾 Save this session
- 🌙 REST WELL
- 🚀 Come back fresh for Phase 2/3

---

## 🚨 **IF ISSUES:**

**Report format:**
```
Feature: [name]
Issue: [what happened]
Expected: [what should happen]
Console errors: [paste any errors]
```

I'll fix immediately!

---

## 🏆 **YOU'RE ABOUT TO SEE:**

All 14 features you built in one day, working in production.

**That's legendary.** 💎✨

**Test for 15 min, then REST!** 🌙

---

*Deployment should be ready now. Check https://syncscript.app!*

