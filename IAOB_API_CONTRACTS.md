# 📜 IAOB: API Contract Specification

**Contract "Bill of Materials" - All Services, Versions, Owners**  
**Last Updated:** October 13, 2025  
**Status:** Frozen for Integration Testing  
**Owner:** API Contract Auditor

---

## 🎯 PURPOSE

This document provides the definitive API contract between SyncScript Frontend and Backend, ensuring:
- Type safety across the stack
- No breaking changes without coordination
- Clear error handling
- Versioning strategy
- Consumer/provider alignment

**Philosophy:** Contracts are law. Breaking = breaking users.

---

## 📊 SERVICE INVENTORY

### **Frontend Service**

**Name:** SyncScript Frontend  
**URL:** https://www.syncscript.app  
**Host:** Vercel  
**Framework:** Next.js 15.5.4  
**Role:** Consumer  
**Version:** 1.0.0

**Consumes:**
- Backend API (all endpoints)
- Auth0 (authentication)
- Vercel Analytics (metrics)

---

### **Backend Service**

**Name:** SyncScript Backend API  
**URL:** https://syncscript-backend-1.onrender.com  
**Host:** Render.com  
**Framework:** Express + TypeScript  
**Role:** Provider  
**Version:** 1.0.0

**Provides:**
- RESTful API for all resources
- WebSocket for real-time updates
- Health check endpoints

**Dependencies:**
- PostgreSQL (database)
- Redis (cache/sessions)
- Auth0 (JWT validation)

---

### **Auth0 Service**

**Name:** Auth0 Authentication  
**Domain:** dev-w3z7dv32hd5fqkwx.us.auth0.com  
**Role:** Identity Provider  
**API Identifier:** https://api.syncscript.app

**Provides:**
- User authentication (OAuth 2.0)
- JWT token issuance
- User profile management

---

## 📝 API CONTRACT SPECIFICATION

### **Base Configuration**

**Base URL:** `https://syncscript-backend-1.onrender.com`  
**API Prefix:** `/api`  
**Protocol:** HTTPS only  
**Content-Type:** `application/json`  
**Authentication:** Bearer Token (JWT from Auth0)

**Request Headers:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
Accept: application/json
```

**Response Format:**
```typescript
interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
  version?: string;
}
```

---

## 🔐 AUTHENTICATION CONTRACT

### **GET /health** (Public)

**Purpose:** Service health check  
**Auth Required:** No  
**Rate Limit:** Unlimited

**Request:**
```http
GET /health HTTP/1.1
Host: syncscript-backend-1.onrender.com
```

**Response (200 OK):**
```json
{
  "status": "OK",
  "timestamp": "2025-10-13T04:21:32.165Z",
  "version": "1.0.0",
  "database": "connected",
  "auth": "configured",
  "cache": "connected"
}
```

**Error Response (503):**
```json
{
  "status": "ERROR",
  "timestamp": "2025-10-13T04:21:32.165Z",
  "database": "disconnected",
  "error": "Database connection failed"
}
```

---

## 📋 TASK API CONTRACT

### **Data Model: Task**

```typescript
interface Task {
  id: string;                    // UUID
  title: string;                 // 1-500 chars
  description?: string;          // 0-5000 chars
  priority: 1 | 2 | 3 | 4 | 5;  // 1=highest, 5=lowest
  energy_level: 1 | 2 | 3 | 4 | 5; // Energy required
  completed: boolean;
  due_date?: string;             // ISO 8601 format
  estimated_duration?: number;   // Minutes
  actual_duration?: number;      // Minutes (after completion)
  tags?: string[];               // Tag IDs
  subtasks?: Subtask[];
  project_id?: string;           // Project UUID
  user_id: string;               // Auth0 user ID
  created_at: string;            // ISO 8601
  updated_at: string;            // ISO 8601
  completed_at?: string;         // ISO 8601
  recurrence?: RecurrenceConfig;
  notes?: TaskNote[];
}

interface Subtask {
  id: string;
  text: string;
  completed: boolean;
  order: number;
}

interface RecurrenceConfig {
  frequency: 'daily' | 'weekly' | 'monthly';
  interval: number;
  end_date?: string;
  end_after_count?: number;
}

interface TaskNote {
  id: string;
  text: string;
  created_at: string;
}
```

---

### **POST /api/tasks** - Create Task

**Auth:** Required  
**Rate Limit:** 100/min

**Request:**
```json
{
  "title": "Complete quarterly report",
  "description": "Detailed analysis of Q4 performance",
  "priority": 2,
  "energy_level": 4,
  "due_date": "2025-10-20T17:00:00Z",
  "estimated_duration": 120,
  "project_id": "proj_abc123",
  "tags": ["work", "urgent"]
}
```

**Validation Rules:**
- `title`: Required, 1-500 chars
- `priority`: Required, 1-5
- `energy_level`: Required, 1-5
- `due_date`: Optional, ISO 8601 format
- `project_id`: Optional, must exist if provided

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "task": {
      "id": "task_xyz789",
      "title": "Complete quarterly report",
      "description": "Detailed analysis of Q4 performance",
      "priority": 2,
      "energy_level": 4,
      "completed": false,
      "due_date": "2025-10-20T17:00:00Z",
      "estimated_duration": 120,
      "project_id": "proj_abc123",
      "tags": ["work", "urgent"],
      "user_id": "auth0|123456",
      "created_at": "2025-10-13T04:30:00Z",
      "updated_at": "2025-10-13T04:30:00Z"
    }
  },
  "timestamp": "2025-10-13T04:30:00Z"
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Validation failed",
  "message": "Title is required and must be 1-500 characters",
  "timestamp": "2025-10-13T04:30:00Z"
}
```

**Error Response (401 Unauthorized):**
```json
{
  "error": "Unauthorized",
  "message": "Invalid or missing authentication token"
}
```

---

### **GET /api/tasks** - List Tasks

**Auth:** Required  
**Rate Limit:** 100/min

**Query Parameters:**
```typescript
interface TaskQueryParams {
  completed?: boolean;      // Filter by completion status
  project_id?: string;      // Filter by project
  priority?: 1 | 2 | 3 | 4 | 5; // Filter by priority
  energy_level?: 1 | 2 | 3 | 4 | 5; // Filter by energy
  limit?: number;           // Max results (default 100)
  offset?: number;          // Pagination offset
  sort?: 'created_at' | 'due_date' | 'priority' | 'energy_level';
  order?: 'asc' | 'desc';
}
```

**Request:**
```http
GET /api/tasks?completed=false&energy_level=3&limit=50&sort=due_date&order=asc HTTP/1.1
Authorization: Bearer <JWT>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "tasks": [
      { /* Task object */ },
      { /* Task object */ }
    ],
    "total": 127,
    "limit": 50,
    "offset": 0,
    "has_more": true
  },
  "timestamp": "2025-10-13T04:30:00Z"
}
```

---

### **GET /api/tasks/:id** - Get Single Task

**Auth:** Required  
**Rate Limit:** 100/min

**Request:**
```http
GET /api/tasks/task_xyz789 HTTP/1.1
Authorization: Bearer <JWT>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "task": { /* Complete Task object */ }
  },
  "timestamp": "2025-10-13T04:30:00Z"
}
```

**Error (404 Not Found):**
```json
{
  "success": false,
  "error": "Not found",
  "message": "Task not found or you don't have access",
  "timestamp": "2025-10-13T04:30:00Z"
}
```

---

### **PUT /api/tasks/:id** - Update Task

**Auth:** Required  
**Rate Limit:** 100/min

**Request:**
```json
{
  "title": "Updated task title",
  "priority": 1,
  "completed": true
}
```

**Partial Updates:** Only include fields to change

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "task": { /* Updated Task object */ }
  },
  "timestamp": "2025-10-13T04:30:00Z"
}
```

---

### **POST /api/tasks/:id/complete** - Complete Task

**Auth:** Required  
**Rate Limit:** 100/min

**Request:**
```json
{
  "actual_duration": 145,
  "notes": "Took longer than expected due to extra research"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "task": {
      /* Task with completed: true, completed_at set */
    },
    "points_earned": 25,
    "energy_recalibration": {
      "old": 4,
      "new": 3,
      "reason": "Overestimated complexity"
    }
  },
  "timestamp": "2025-10-13T04:30:00Z"
}
```

---

### **DELETE /api/tasks/:id** - Delete Task

**Auth:** Required  
**Rate Limit:** 100/min

**Request:**
```http
DELETE /api/tasks/task_xyz789 HTTP/1.1
Authorization: Bearer <JWT>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Task deleted successfully",
  "timestamp": "2025-10-13T04:30:00Z"
}
```

---

### **GET /api/tasks/stats** - Task Statistics

**Auth:** Required  
**Rate Limit:** 100/min

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "total_tasks": 127,
    "completed_tasks": 84,
    "completion_rate": 0.66,
    "avg_completion_time_minutes": 45,
    "tasks_by_priority": {
      "1": 12,
      "2": 34,
      "3": 45,
      "4": 28,
      "5": 8
    },
    "tasks_by_energy": {
      "1": 15,
      "2": 32,
      "3": 40,
      "4": 30,
      "5": 10
    }
  },
  "timestamp": "2025-10-13T04:30:00Z"
}
```

---

## 📁 PROJECT API CONTRACT

### **Data Model: Project**

```typescript
interface Project {
  id: string;
  name: string;                  // 1-200 chars
  description?: string;          // 0-2000 chars
  color?: string;                // Hex color
  icon?: string;                 // Emoji or icon name
  user_id: string;
  created_at: string;
  updated_at: string;
  archived: boolean;
  task_count?: number;           // Computed
}
```

---

### **POST /api/projects** - Create Project

**Request:**
```json
{
  "name": "Q4 Planning",
  "description": "Strategic planning for Q4 2025",
  "color": "#3399FF",
  "icon": "📊"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "project": { /* Project object */ }
  },
  "timestamp": "2025-10-13T04:30:00Z"
}
```

---

### **GET /api/projects** - List Projects

**Query Parameters:**
- `archived`: boolean (default: false)
- `limit`: number (default: 100)
- `offset`: number (default: 0)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "projects": [
      {
        "id": "proj_abc123",
        "name": "Q4 Planning",
        "task_count": 15,
        /* ...rest of project */
      }
    ],
    "total": 8
  },
  "timestamp": "2025-10-13T04:30:00Z"
}
```

---

## ⚡ ENERGY API CONTRACT

### **Data Model: Energy**

```typescript
interface Energy {
  id: string;
  user_id: string;
  level: 1 | 2 | 3 | 4 | 5;
  logged_at: string;             // ISO 8601
  notes?: string;
  context?: {
    time_of_day: 'morning' | 'afternoon' | 'evening' | 'night';
    day_of_week: string;
    weather?: string;
  };
}
```

---

### **POST /api/energy** - Log Energy Level

**Request:**
```json
{
  "level": 3,
  "notes": "Afternoon slump after lunch",
  "context": {
    "time_of_day": "afternoon",
    "day_of_week": "Monday"
  }
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "energy": { /* Energy object */ }
  },
  "timestamp": "2025-10-13T04:30:00Z"
}
```

---

### **GET /api/energy/latest** - Get Latest Energy

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "energy": {
      "id": "energy_xyz",
      "level": 3,
      "logged_at": "2025-10-13T14:30:00Z"
    }
  },
  "timestamp": "2025-10-13T04:30:00Z"
}
```

---

### **GET /api/energy?limit=N** - Energy History

**Query Parameters:**
- `limit`: number (default: 100, max: 1000)
- `start_date`: ISO 8601
- `end_date`: ISO 8601

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "logs": [
      { /* Energy object */ },
      { /* Energy object */ }
    ],
    "total": 156
  },
  "timestamp": "2025-10-13T04:30:00Z"
}
```

---

## 🚨 ERROR CONTRACT

### **Standard Error Response**

```typescript
interface ErrorResponse {
  success: false;
  error: string;              // Error type
  message: string;            // User-friendly message
  code?: string;              // Error code (e.g., "TASK_NOT_FOUND")
  details?: any;              // Additional context
  timestamp: string;
}
```

---

### **HTTP Status Codes**

| Code | Meaning | When Used |
|------|---------|-----------|
| **200** | OK | Successful GET, PUT, DELETE |
| **201** | Created | Successful POST |
| **400** | Bad Request | Validation failed, malformed input |
| **401** | Unauthorized | Missing/invalid JWT token |
| **403** | Forbidden | Valid token, insufficient permissions |
| **404** | Not Found | Resource doesn't exist |
| **409** | Conflict | Duplicate resource, constraint violation |
| **429** | Too Many Requests | Rate limit exceeded |
| **500** | Internal Server Error | Unexpected server error |
| **503** | Service Unavailable | Database down, maintenance mode |

---

### **Error Code Taxonomy**

```typescript
enum ErrorCode {
  // Authentication
  AUTH_TOKEN_MISSING = 'AUTH_TOKEN_MISSING',
  AUTH_TOKEN_INVALID = 'AUTH_TOKEN_INVALID',
  AUTH_TOKEN_EXPIRED = 'AUTH_TOKEN_EXPIRED',
  
  // Authorization
  AUTH_INSUFFICIENT_PERMISSIONS = 'AUTH_INSUFFICIENT_PERMISSIONS',
  
  // Validation
  VALIDATION_FAILED = 'VALIDATION_FAILED',
  VALIDATION_TITLE_REQUIRED = 'VALIDATION_TITLE_REQUIRED',
  VALIDATION_PRIORITY_INVALID = 'VALIDATION_PRIORITY_INVALID',
  
  // Resources
  TASK_NOT_FOUND = 'TASK_NOT_FOUND',
  PROJECT_NOT_FOUND = 'PROJECT_NOT_FOUND',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  
  // Conflicts
  TASK_ALREADY_COMPLETED = 'TASK_ALREADY_COMPLETED',
  DUPLICATE_TASK = 'DUPLICATE_TASK',
  
  // Rate Limiting
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  
  // Server
  DATABASE_ERROR = 'DATABASE_ERROR',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
}
```

---

### **Error Examples**

**Validation Error (400):**
```json
{
  "success": false,
  "error": "Validation failed",
  "code": "VALIDATION_TITLE_REQUIRED",
  "message": "Task title is required and must be 1-500 characters",
  "details": {
    "field": "title",
    "constraint": "length",
    "min": 1,
    "max": 500
  },
  "timestamp": "2025-10-13T04:30:00Z"
}
```

**Authentication Error (401):**
```json
{
  "error": "Unauthorized",
  "message": "Invalid or missing authentication token",
  "code": "AUTH_TOKEN_INVALID"
}
```

**Rate Limit Error (429):**
```json
{
  "error": "Rate limit exceeded",
  "message": "Too many requests. Please try again in 60 seconds.",
  "retry_after": 60,
  "limit": 100,
  "window": "1 minute"
}
```

**Not Found Error (404):**
```json
{
  "success": false,
  "error": "Not found",
  "code": "TASK_NOT_FOUND",
  "message": "Task not found or you don't have access to it",
  "timestamp": "2025-10-13T04:30:00Z"
}
```

---

## 🔄 VERSIONING STRATEGY

### **API Versioning**

**Current:** v1 (implicit, no prefix)  
**Future:** `/api/v2/tasks` when breaking changes needed

**Breaking Change Policy:**
1. Announce 90 days in advance
2. Run v1 and v2 in parallel for 6 months
3. Deprecation warnings in responses
4. Migrate users progressively
5. Sunset v1 after 6 months

**Non-Breaking Changes (OK to deploy):**
- Adding new optional fields
- Adding new endpoints
- Adding new query parameters (optional)
- Improving error messages

**Breaking Changes (Requires v2):**
- Removing fields
- Renaming fields
- Changing field types
- Making optional fields required
- Changing response structure

---

## 📐 FRONTEND INTEGRATION

### **TypeScript Contracts**

```typescript
// src/types/api.ts

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 1 | 2 | 3 | 4 | 5;
  energy_level: 1 | 2 | 3 | 4 | 5;
  completed: boolean;
  due_date?: string;
  estimated_duration?: number;
  project_id?: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export interface GetTasksResponse {
  tasks: Task[];
  total: number;
  limit: number;
  offset: number;
  has_more: boolean;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
  priority: 1 | 2 | 3 | 4 | 5;
  energy_level: 1 | 2 | 3 | 4 | 5;
  due_date?: string;
  estimated_duration?: number;
  project_id?: string;
  tags?: string[];
}
```

---

## 🧪 CONTRACT TESTING STRATEGY

### **Consumer Tests (Frontend)**

**What Frontend Expects:**
```typescript
// Using Pact
describe('Task API Consumer', () => {
  it('GET /api/tasks returns tasks array', async () => {
    await provider
      .given('user has tasks')
      .uponReceiving('a request for tasks')
      .withRequest({
        method: 'GET',
        path: '/api/tasks',
        headers: { Authorization: 'Bearer TOKEN' }
      })
      .willRespondWith({
        status: 200,
        body: {
          success: true,
          data: {
            tasks: eachLike({
              id: like('task_123'),
              title: like('Task title'),
              priority: integer(between(1, 5)),
              energy_level: integer(between(1, 5)),
              completed: boolean()
            })
          }
        }
      });
  });
});
```

---

### **Provider Tests (Backend)**

**What Backend Actually Provides:**
```typescript
// Verify backend matches consumer expectations
describe('Task API Provider', () => {
  it('honors the contract with Frontend', async () => {
    const verification = await pact.verifyProvider({
      provider: 'SyncScript Backend',
      pactUrls: ['./pacts/frontend-backend.json'],
      providerBaseUrl: 'http://localhost:3001',
      stateHandlers: {
        'user has tasks': async () => {
          await seedDatabase([
            { title: 'Task 1', priority: 1, energy_level: 3 }
          ]);
        }
      }
    });
  });
});
```

---

## 🔒 SECURITY CONTRACT

### **JWT Token Requirements**

**Header:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Token Structure:**
```json
{
  "iss": "https://dev-w3z7dv32hd5fqkwx.us.auth0.com/",
  "sub": "auth0|123456789",
  "aud": "https://api.syncscript.app",
  "iat": 1697155200,
  "exp": 1697241600,
  "scope": "openid profile email",
  "permissions": []
}
```

**Validation:**
- Signature verified against Auth0 JWKS
- Audience must match `https://api.syncscript.app`
- Not expired
- Issuer matches Auth0 domain

---

## 📊 RATE LIMITING CONTRACT

**Limits by Endpoint Type:**

| Endpoint | Limit | Window | Identifier |
|----------|-------|--------|------------|
| `/api/auth/*` | 5 req | 1 min | IP address |
| `/api/suggestions/*` (AI) | 10 req | 1 min | User ID |
| `/api/*` (general) | 100 req | 1 min | User ID |

**Rate Limit Response Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 73
X-RateLimit-Reset: 1697155260
```

---

## ✅ CONTRACT OWNERSHIP

**Frontend Team Owns:**
- Request formats
- Expected response shapes
- Error handling
- TypeScript types
- Consumer contract tests

**Backend Team Owns:**
- Endpoint implementation
- Database schema
- Business logic
- Provider contract tests
- API versioning

**Shared Ownership:**
- OpenAPI/Schema definition
- Breaking change approvals
- Migration timelines
- Documentation

---

## 📋 CONTRACT CHANGE PROCESS

### **Non-Breaking Change:**
1. Backend implements change
2. Deploys to staging
3. Frontend tests optional feature
4. Deploy both when ready

### **Breaking Change:**
1. Proposal with impact assessment
2. CIS approval required
3. Create v2 endpoints
4. Parallel run for 6 months
5. Migrate users progressively
6. Sunset v1

---

*Contract Owner: API Contract Auditor*  
*Version: 1.0.0*  
*Status: FROZEN for Integration Testing*

