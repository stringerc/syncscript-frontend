# 🔌 SYNCSCRIPT API V2 - PUBLIC DEVELOPER API

**Status:** ✅ **COMPLETE - Specification Ready**  
**Version:** 2.0.0  
**Launch:** Q1 2026  

---

## 🎯 VISION

**Make SyncScript the productivity platform for developers.**

Enable third-party apps, integrations, and extensions through a robust public API.

---

## 📚 API ARCHITECTURE

### **Base URL:**
```
https://api.syncscript.app/v2
```

### **Authentication:**
```
Authorization: Bearer {API_KEY}
```

### **Rate Limits:**
- Free tier: 100 requests/hour
- Pro tier: 1,000 requests/hour
- Enterprise: 10,000 requests/hour

### **Response Format:**
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "timestamp": "2025-10-11T19:00:00Z",
    "rateLimit": {
      "limit": 1000,
      "remaining": 987,
      "reset": 1697041200
    }
  }
}
```

---

## 🔑 AUTHENTICATION

### **API Key Management:**

**Generate API Key:**
```http
POST /v2/auth/keys
Authorization: Bearer {USER_JWT}

Response:
{
  "apiKey": "sk_live_abc123...",
  "name": "My Integration",
  "scopes": ["tasks:read", "tasks:write"],
  "createdAt": "2025-10-11T19:00:00Z"
}
```

**Scopes Available:**
- `tasks:read` - Read tasks
- `tasks:write` - Create/update/delete tasks
- `energy:read` - Read energy logs
- `energy:write` - Log energy
- `budget:read` - Read budget data
- `analytics:read` - Read analytics
- `webhooks:manage` - Manage webhooks

---

## 📋 CORE ENDPOINTS

### **TASKS**

**List Tasks:**
```http
GET /v2/tasks
Query params:
  - completed: boolean
  - energy_min: 1-5
  - energy_max: 1-5
  - project_id: string
  - limit: number (default: 50)
  - offset: number

Response:
{
  "data": [
    {
      "id": "task_123",
      "title": "Complete API docs",
      "description": "...",
      "priority": 4,
      "energy_requirement": 3,
      "completed": false,
      "due_date": "2025-10-15",
      "created_at": "2025-10-11T19:00:00Z",
      "project": { "id": "proj_1", "name": "Development" }
    }
  ],
  "meta": { "total": 47, "limit": 50, "offset": 0 }
}
```

**Create Task:**
```http
POST /v2/tasks
Body:
{
  "title": "New task",
  "description": "...",
  "priority": 3,
  "energy_requirement": 3,
  "due_date": "2025-10-15",
  "project_id": "proj_1"
}
```

**Update Task:**
```http
PATCH /v2/tasks/{task_id}
Body: { "completed": true }
```

**Delete Task:**
```http
DELETE /v2/tasks/{task_id}
```

---

### **ENERGY**

**Log Energy:**
```http
POST /v2/energy/logs
Body:
{
  "level": 4,
  "notes": "Feeling great after coffee",
  "timestamp": "2025-10-11T19:00:00Z"
}
```

**Get Energy History:**
```http
GET /v2/energy/logs
Query: start_date, end_date, limit
```

**Get Energy Insights:**
```http
GET /v2/energy/insights
Response:
{
  "averageEnergy": 3.8,
  "peakHours": [9, 10, 14],
  "lowHours": [13, 16],
  "energyMatchRate": 87
}
```

---

### **BUDGET**

**Get Budget Summary:**
```http
GET /v2/budget/summary
Response:
{
  "totalSpending": 540,
  "underBudgetRate": 78,
  "topCategories": [...]
}
```

**Get Comfort Bands:**
```http
GET /v2/budget/comfort-bands
```

**Update Comfort Band:**
```http
PUT /v2/budget/comfort-bands/{category_id}
Body: { "min": 15, "ideal": 35, "max": 60 }
```

---

### **CONTEXT**

**Calculate Leave-By:**
```http
POST /v2/context/leave-by
Body:
{
  "eventTime": "2025-10-11T15:00:00Z",
  "location": "123 Main St",
  "travelMode": "driving"
}

Response:
{
  "leaveByTime": "2025-10-11T14:25:00Z",
  "travelDuration": 25,
  "confidence": 85,
  "trafficLevel": "moderate"
}
```

**Get Weather:**
```http
GET /v2/context/weather
Query: location, datetime
```

---

### **ANALYTICS**

**Get Triple Intelligence™ Report:**
```http
GET /v2/analytics/triple-intelligence
Query: period=week

Response:
{
  "energy": { "averageEnergy": 3.8, "energyMatchRate": 87 },
  "budget": { "underBudgetRate": 78, "averageSavings": 180 },
  "context": { "onTimeArrivalRate": 82 },
  "productivity": { "tasksCompleted": 47, "streakDays": 12 },
  "overallScore": 82
}
```

---

## 🪝 WEBHOOKS

**Create Webhook:**
```http
POST /v2/webhooks
Body:
{
  "url": "https://your-app.com/webhook",
  "events": ["task.completed", "energy.logged"],
  "secret": "your_secret_key"
}
```

**Webhook Events:**
- `task.created`
- `task.updated`
- `task.completed`
- `task.deleted`
- `energy.logged`
- `goal.achieved`
- `streak.milestone`
- `emblem.earned`

**Webhook Payload:**
```json
{
  "event": "task.completed",
  "timestamp": "2025-10-11T19:00:00Z",
  "data": {
    "taskId": "task_123",
    "title": "Complete API docs",
    "energyMatch": true,
    "emblemEarned": 35
  },
  "signature": "sha256=..."
}
```

---

## 📖 DEVELOPER PORTAL

### **Documentation Site:**
- **URL:** https://developers.syncscript.app
- **Sections:**
  - Getting Started
  - Authentication
  - API Reference
  - Webhooks
  - SDKs
  - Examples
  - Changelog

### **Interactive API Explorer:**
- Try endpoints in browser
- See request/response examples
- Generate code snippets
- Test with your API key

### **SDKs Provided:**
- JavaScript/TypeScript
- Python
- Ruby
- Go
- PHP

---

## 🚀 LAUNCH PLAN

### **Beta (Month 1):**
- 50 developer invites
- Private API access
- Feedback collection
- Documentation refinement

### **Public Launch (Month 2):**
- Open API to all users
- Developer portal live
- SDKs released
- Showcase integrations

### **Post-Launch:**
- Developer community
- Integration marketplace
- Featured integrations
- Developer success stories

---

## 📊 API KPIS

**Adoption:**
- Developer signups: Target 500 in first month
- Active integrations: Target 100
- API calls/day: Target 100,000

**Quality:**
- API uptime: 99.9%
- Response time p95: < 200ms
- Error rate: < 0.1%

**Developer Experience:**
- Time to first API call: < 5 minutes
- Documentation satisfaction: > 90%
- SDK usage: > 60% of developers

---

## 🏆 STATUS

**Phase 3, Feature 4:** ✅ **COMPLETE - API V2 SPECIFICATION READY!**

**Complete API specification defined!**  
**Ready for implementation!**

---

**Phase 3 Progress:** 4/5 Features (80%) ✅  
**Overall:** 23/24 Features (96%) 🚀  
**1 FINAL FEATURE TO 100%!** 🏆

---

*API v2 spec complete. Final feature: White-Label System...*

