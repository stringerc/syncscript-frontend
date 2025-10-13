# 🌐 IAOB: Edge/CDN & Caching Strategy

**Owner:** Edge/CDN & Caching Specialist  
**Platform:** Vercel Edge Network  
**Last Updated:** October 13, 2025

---

## 🎯 CACHING STRATEGY

### **Static Assets**

**Cache:** 1 year (immutable)
```
/_next/static/** → Cache-Control: public, max-age=31536000, immutable
```

**Files:**
- JavaScript bundles
- CSS files
- Images
- Fonts

---

### **Dynamic Pages**

**Homepage:**
```
/ → Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400
```
- Cache for 1 hour
- Serve stale for 24 hours while revalidating

**Dashboard:**
```
/dashboard → Cache-Control: private, no-cache
```
- Never cached (personalized)

---

### **API Responses**

**Backend (Render):**
```http
Cache-Control: private, no-store
```
- Task data is user-specific
- Never cache API responses
- Always fresh

---

## 🔄 CDN PURGE STRATEGY

**When to Purge:**
1. New deployment
2. Content update
3. Emergency (bug fix)

**Vercel Auto-Purges:** On deployment ✅

---

*Edge Owner: Edge/CDN Specialist*  
*CDN: Vercel Global Edge Network*

