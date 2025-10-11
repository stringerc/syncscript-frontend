# 🔌 SyncScript API v2 - Public API Specification

**90-DAY INNOVATION #4: API v2 Release**

## 📊 **API OVERVIEW**

Base URL: `https://api.syncscript.com/v2`
Authentication: Bearer token (OAuth 2.0)
Rate Limiting: 1000 requests/hour (already implemented!)

## 🔑 **AUTHENTICATION**

```http
POST /auth/token
Content-Type: application/json

{
  "client_id": "your_client_id",
  "client_secret": "your_client_secret",
  "grant_type": "client_credentials"
}

Response:
{
  "access_token": "eyJ...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

## 📋 **ENDPOINTS**

### Tasks
```
GET    /tasks              - List all tasks
POST   /tasks              - Create task
GET    /tasks/:id          - Get task
PATCH  /tasks/:id          - Update task
DELETE /tasks/:id          - Delete task
POST   /tasks/:id/complete - Mark complete
```

### Projects
```
GET    /projects           - List projects
POST   /projects           - Create project
PATCH  /projects/:id       - Update project
DELETE /projects/:id       - Delete project
```

### Energy
```
GET    /energy             - Get energy logs
POST   /energy             - Log energy level
GET    /energy/insights    - Get energy patterns
```

### AI
```
POST   /ai/generate-task   - Generate task from text
POST   /ai/breakdown       - Break down complex task
POST   /ai/suggestions     - Get AI suggestions
```

### Webhooks (Already Implemented!)
```
GET    /webhooks           - List webhooks
POST   /webhooks           - Create webhook
DELETE /webhooks/:id       - Delete webhook
```

## 📚 **DEVELOPER PORTAL**

SDK Libraries:
- JavaScript/TypeScript
- Python
- Go (coming soon)

Documentation: https://docs.syncscript.com
Playground: https://api.syncscript.com/playground

**Status:** API infrastructure ready, documentation complete!

