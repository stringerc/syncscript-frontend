# 🧪 IAOB: Contract Testing Implementation

**Pact-Based Provider/Consumer Testing**  
**Owner:** Contract-Testing SDET  
**Status:** Framework Ready  
**Last Updated:** October 13, 2025

---

## 🎯 PURPOSE

Contract testing ensures Frontend and Backend stay in sync:
- **Consumer (Frontend)** defines expectations
- **Provider (Backend)** verifies it meets expectations
- **CI Gate:** Blocks PRs that break contracts
- **Prevents:** Runtime integration failures

**Philosophy:** Test contracts, not implementations.

---

## 🛠️ TECHNOLOGY STACK

### **Pact Framework**

**Why Pact:**
- Industry standard for contract testing
- Consumer-driven (frontend defines needs)
- Language-agnostic (TypeScript ↔ TypeScript works great)
- CI/CD integration
- Pact Broker for sharing contracts

**Alternatives Considered:**
- Spring Cloud Contract → Too Java-focused
- Postman Contract Testing → Less robust
- Custom solution → Reinventing wheel

**Decision:** Use Pact ✅

---

## 📦 INSTALLATION

### **Frontend (Consumer)**

```bash
cd ~/syncscript-frontend

npm install --save-dev @pact-foundation/pact
npm install --save-dev @pact-foundation/pact-node
npm install --save-dev jest
```

**package.json:**
```json
{
  "scripts": {
    "test:contract:consumer": "jest --config=jest.pact.config.js",
    "test:contract:publish": "node scripts/publish-pacts.js"
  }
}
```

---

### **Backend (Provider)**

```bash
cd ~/syncscript-backend

npm install --save-dev @pact-foundation/pact
npm install --save-dev @pact-foundation/pact-node
```

**package.json:**
```json
{
  "scripts": {
    "test:contract:provider": "jest --config=jest.pact.provider.config.js"
  }
}
```

---

## 📝 CONSUMER TESTS (Frontend)

### **Setup: Pact Configuration**

```typescript
// tests/contract/pact-setup.ts
import { Pact } from '@pact-foundation/pact';
import path from 'path';

export const provider = new Pact({
  consumer: 'SyncScript Frontend',
  provider: 'SyncScript Backend',
  port: 1234, // Mock server port
  log: path.resolve(process.cwd(), 'logs', 'pact.log'),
  dir: path.resolve(process.cwd(), 'pacts'),
  logLevel: 'info',
  spec: 2,
});
```

---

### **Test: GET /api/tasks**

```typescript
// tests/contract/tasks.consumer.spec.ts
import { provider } from './pact-setup';
import { like, eachLike, term, integer } from '@pact-foundation/pact/dsl/matchers';

describe('Tasks API - Consumer Contract', () => {
  beforeAll(() => provider.setup());
  afterEach(() => provider.verify());
  afterAll(() => provider.finalize());

  describe('GET /api/tasks', () => {
    it('returns a list of tasks', async () => {
      // Define expectation
      await provider.addInteraction({
        state: 'user has 3 tasks',
        uponReceiving: 'a request for tasks',
        withRequest: {
          method: 'GET',
          path: '/api/tasks',
          headers: {
            Authorization: term({
              matcher: 'Bearer .*',
              generate: 'Bearer mock-jwt-token'
            })
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          },
          body: {
            success: true,
            data: {
              tasks: eachLike({
                id: like('task_123'),
                title: like('Complete report'),
                description: like('Detailed analysis'),
                priority: integer(1),
                energy_level: integer(3),
                completed: like(false),
                due_date: like('2025-10-20T17:00:00Z'),
                user_id: like('auth0|123'),
                created_at: like('2025-10-13T04:00:00Z'),
                updated_at: like('2025-10-13T04:00:00Z')
              }, { min: 1 }),
              total: integer(3)
            },
            timestamp: like('2025-10-13T04:30:00Z')
          }
        }
      });

      // Make actual request to mock server
      const response = await fetch('http://localhost:1234/api/tasks', {
        headers: {
          Authorization: 'Bearer mock-jwt-token'
        }
      });

      const data = await response.json();

      // Assertions
      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(Array.isArray(data.data.tasks)).toBe(true);
      expect(data.data.tasks[0]).toHaveProperty('id');
      expect(data.data.tasks[0]).toHaveProperty('title');
      expect(data.data.tasks[0].priority).toBeGreaterThanOrEqual(1);
      expect(data.data.tasks[0].priority).toBeLessThanOrEqual(5);
    });
  });

  describe('POST /api/tasks', () => {
    it('creates a new task', async () => {
      await provider.addInteraction({
        state: 'user is authenticated',
        uponReceiving: 'a request to create a task',
        withRequest: {
          method: 'POST',
          path: '/api/tasks',
          headers: {
            Authorization: term({
              matcher: 'Bearer .*',
              generate: 'Bearer mock-jwt-token'
            }),
            'Content-Type': 'application/json'
          },
          body: {
            title: 'New task',
            priority: 2,
            energy_level: 3
          }
        },
        willRespondWith: {
          status: 201,
          headers: {
            'Content-Type': 'application/json'
          },
          body: {
            success: true,
            data: {
              task: {
                id: like('task_new123'),
                title: 'New task',
                priority: 2,
                energy_level: 3,
                completed: false,
                user_id: like('auth0|123'),
                created_at: like('2025-10-13T04:30:00Z'),
                updated_at: like('2025-10-13T04:30:00Z')
              }
            },
            timestamp: like('2025-10-13T04:30:00Z')
          }
        }
      });

      const response = await fetch('http://localhost:1234/api/tasks', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer mock-jwt-token',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: 'New task',
          priority: 2,
          energy_level: 3
        })
      });

      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
      expect(data.data.task.title).toBe('New task');
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('deletes a task', async () => {
      await provider.addInteraction({
        state: 'task task_123 exists',
        uponReceiving: 'a request to delete a task',
        withRequest: {
          method: 'DELETE',
          path: '/api/tasks/task_123',
          headers: {
            Authorization: term({
              matcher: 'Bearer .*',
              generate: 'Bearer mock-jwt-token'
            })
          }
        },
        willRespondWith: {
          status: 200,
          body: {
            success: true,
            message: like('Task deleted successfully'),
            timestamp: like('2025-10-13T04:30:00Z')
          }
        }
      });

      const response = await fetch('http://localhost:1234/api/tasks/task_123', {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer mock-jwt-token'
        }
      });

      expect(response.status).toBe(200);
    });
  });
});
```

---

## 🔍 PROVIDER VERIFICATION (Backend)

### **Setup: State Handlers**

```typescript
// tests/contract/provider.spec.ts
import { Verifier } from '@pact-foundation/pact';
import path from 'path';
import { app } from '../src/app';
import { seedDatabase, clearDatabase } from './helpers/db-helpers';

describe('SyncScript Backend - Provider Verification', () => {
  const server = app.listen(3001);

  afterAll(() => server.close());

  it('validates the contract', async () => {
    const opts = {
      provider: 'SyncScript Backend',
      
      // Where to find consumer contracts
      pactUrls: [
        path.resolve(__dirname, '../../pacts/syncscript-frontend-syncscript-backend.json')
      ],
      
      // Backend URL to test against
      providerBaseUrl: 'http://localhost:3001',
      
      // State handlers to set up test data
      stateHandlers: {
        'user has 3 tasks': async () => {
          await clearDatabase();
          await seedDatabase([
            {
              id: 'task_1',
              title: 'Task 1',
              priority: 1,
              energy_level: 3,
              completed: false,
              user_id: 'auth0|test-user'
            },
            {
              id: 'task_2',
              title: 'Task 2',
              priority: 2,
              energy_level: 4,
              completed: false,
              user_id: 'auth0|test-user'
            },
            {
              id: 'task_3',
              title: 'Task 3',
              priority: 3,
              energy_level: 2,
              completed: true,
              user_id: 'auth0|test-user'
            }
          ]);
        },
        
        'user is authenticated': async () => {
          // Mock Auth0 JWT validation to accept test token
          process.env.AUTH0_TEST_MODE = 'true';
        },
        
        'task task_123 exists': async () => {
          await seedDatabase([
            {
              id: 'task_123',
              title: 'Existing task',
              priority: 1,
              energy_level: 3,
              user_id: 'auth0|test-user'
            }
          ]);
        }
      },
      
      // Request filters (replace mock token with real validation)
      requestFilter: (req, res, next) => {
        // Replace mock JWT with valid test token
        if (req.headers.authorization?.startsWith('Bearer mock')) {
          req.headers.authorization = 'Bearer ' + generateTestJWT();
        }
        next();
      },
      
      // Publish verification to broker
      publishVerificationResult: process.env.CI === 'true',
      providerVersion: process.env.GIT_COMMIT || '1.0.0'
    };

    await new Verifier(opts).verifyProvider();
  });
});
```

---

## 🔄 CI/CD INTEGRATION

### **Frontend CI (GitHub Actions)**

```yaml
# .github/workflows/contract-tests-consumer.yml
name: Contract Tests (Consumer)

on:
  pull_request:
    branches: [main]

jobs:
  consumer-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run consumer contract tests
        run: npm run test:contract:consumer
      
      - name: Publish contracts to broker
        if: github.ref == 'refs/heads/main'
        run: npm run test:contract:publish
        env:
          PACT_BROKER_BASE_URL: ${{ secrets.PACT_BROKER_URL }}
          PACT_BROKER_TOKEN: ${{ secrets.PACT_BROKER_TOKEN }}
```

---

### **Backend CI (GitHub Actions)**

```yaml
# .github/workflows/contract-tests-provider.yml
name: Contract Tests (Provider)

on:
  pull_request:
    branches: [main]
  # Also run when frontend publishes new contracts
  repository_dispatch:
    types: [pact-changed]

jobs:
  provider-tests:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build backend
        run: npm run build
      
      - name: Run migrations
        run: npm run migrate:test
        env:
          DATABASE_URL: postgresql://postgres:test@localhost:5432/syncscript_test
      
      - name: Run provider verification
        run: npm run test:contract:provider
        env:
          DATABASE_URL: postgresql://postgres:test@localhost:5432/syncscript_test
          PACT_BROKER_BASE_URL: ${{ secrets.PACT_BROKER_URL }}
          PACT_BROKER_TOKEN: ${{ secrets.PACT_BROKER_TOKEN }}
      
      - name: Publish verification result
        run: echo "Verification published to Pact Broker"
```

---

## 📊 PACT BROKER

### **Setup (Hosted Option)**

**PactFlow (Recommended):**
- Hosted Pact Broker
- Free tier: 5 users
- CI/CD webhooks
- Nice UI for contract diffs

**Self-Hosted (Alternative):**
```bash
docker run -d --name pact-broker \
  -e PACT_BROKER_DATABASE_URL=postgresql://... \
  -p 9292:9292 \
  pactfoundation/pact-broker
```

---

### **Publishing Contracts**

```javascript
// scripts/publish-pacts.js
const pact = require('@pact-foundation/pact-node');
const path = require('path');

const opts = {
  pactFilesOrDirs: [path.resolve(__dirname, '../pacts')],
  pactBroker: process.env.PACT_BROKER_BASE_URL,
  pactBrokerToken: process.env.PACT_BROKER_TOKEN,
  consumerVersion: process.env.GIT_COMMIT || '1.0.0',
  tags: [process.env.GIT_BRANCH || 'main']
};

pact.publishPacts(opts)
  .then(() => console.log('✅ Contracts published to broker'))
  .catch(err => {
    console.error('❌ Failed to publish:', err);
    process.exit(1);
  });
```

---

## 🧪 COMPLETE TEST SUITE

### **Task API Consumer Tests**

```typescript
// tests/contract/tasks.consumer.spec.ts
import { provider } from './pact-setup';
import { like, eachLike, integer, boolean, term } from '@pact-foundation/pact/dsl/matchers';

describe('Tasks API Consumer Contract', () => {
  beforeAll(() => provider.setup());
  afterEach(() => provider.verify());
  afterAll(() => provider.finalize());

  // GET /api/tasks - List tasks
  it('GET /api/tasks returns task list', async () => {
    await provider.addInteraction({
      state: 'user has tasks',
      uponReceiving: 'a request to list tasks',
      withRequest: {
        method: 'GET',
        path: '/api/tasks',
        headers: { Authorization: term({ matcher: 'Bearer .*', generate: 'Bearer token' }) }
      },
      willRespondWith: {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: {
          success: true,
          data: {
            tasks: eachLike({
              id: like('task_123'),
              title: like('Task title'),
              priority: integer(1),
              energy_level: integer(3),
              completed: boolean(false)
            }),
            total: integer(3)
          }
        }
      }
    });

    const response = await fetch(`${provider.mockService.baseUrl}/api/tasks`, {
      headers: { Authorization: 'Bearer token' }
    });

    expect(response.status).toBe(200);
  });

  // POST /api/tasks - Create task
  it('POST /api/tasks creates a task', async () => {
    await provider.addInteraction({
      state: 'user is authenticated',
      uponReceiving: 'a request to create a task',
      withRequest: {
        method: 'POST',
        path: '/api/tasks',
        headers: {
          Authorization: term({ matcher: 'Bearer .*', generate: 'Bearer token' }),
          'Content-Type': 'application/json'
        },
        body: {
          title: 'New task',
          priority: 2,
          energy_level: 3
        }
      },
      willRespondWith: {
        status: 201,
        body: {
          success: true,
          data: {
            task: {
              id: like('task_new'),
              title: 'New task',
              priority: 2,
              energy_level: 3,
              completed: false
            }
          }
        }
      }
    });

    const response = await fetch(`${provider.mockService.baseUrl}/api/tasks`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer token',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: 'New task', priority: 2, energy_level: 3 })
    });

    expect(response.status).toBe(201);
  });

  // Error case: Unauthorized
  it('GET /api/tasks returns 401 without token', async () => {
    await provider.addInteraction({
      uponReceiving: 'a request without authentication',
      withRequest: {
        method: 'GET',
        path: '/api/tasks'
        // No Authorization header
      },
      willRespondWith: {
        status: 401,
        body: {
          error: like('Unauthorized'),
          message: like('Invalid or missing authentication token')
        }
      }
    });

    const response = await fetch(`${provider.mockService.baseUrl}/api/tasks`);
    expect(response.status).toBe(401);
  });

  // Error case: Validation
  it('POST /api/tasks returns 400 for invalid data', async () => {
    await provider.addInteraction({
      state: 'user is authenticated',
      uponReceiving: 'a request with invalid task data',
      withRequest: {
        method: 'POST',
        path: '/api/tasks',
        headers: {
          Authorization: term({ matcher: 'Bearer .*', generate: 'Bearer token' }),
          'Content-Type': 'application/json'
        },
        body: {
          title: '', // Invalid: empty
          priority: 2,
          energy_level: 3
        }
      },
      willRespondWith: {
        status: 400,
        body: {
          success: false,
          error: like('Validation failed'),
          message: like('Title is required')
        }
      }
    });

    const response = await fetch(`${provider.mockService.baseUrl}/api/tasks`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer token',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: '', priority: 2, energy_level: 3 })
    });

    expect(response.status).toBe(400);
  });
});
```

---

## 🎯 STATE HANDLERS (Backend)

### **Database Seeding Helpers**

```typescript
// tests/contract/helpers/db-helpers.ts
import { pool } from '../../../src/config/database';

export async function clearDatabase() {
  await pool.query('DELETE FROM tasks');
  await pool.query('DELETE FROM projects');
  await pool.query('DELETE FROM energy_logs');
}

export async function seedDatabase(tasks: any[]) {
  for (const task of tasks) {
    await pool.query(
      `INSERT INTO tasks (id, title, description, priority, energy_level, completed, user_id, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())`,
      [
        task.id,
        task.title,
        task.description || null,
        task.priority,
        task.energy_level,
        task.completed,
        task.user_id
      ]
    );
  }
}

export function generateTestJWT(): string {
  // Generate valid test JWT for Auth0 validation bypass
  const jwt = require('jsonwebtoken');
  return jwt.sign(
    {
      sub: 'auth0|test-user',
      aud: 'https://api.syncscript.app',
      iss: 'https://dev-w3z7dv32hd5fqkwx.us.auth0.com/',
      exp: Math.floor(Date.now() / 1000) + 3600
    },
    process.env.AUTH0_TEST_SECRET || 'test-secret',
    { algorithm: 'HS256' }
  );
}
```

---

## 📈 CONTRACT VERSIONING

### **Semantic Versioning for Contracts**

**Format:** `{consumer}-{provider}-v{major}.{minor}.{patch}`

**Example:** `syncscript-frontend-syncscript-backend-v1.2.0`

**Version Bumping:**
- **Patch (1.0.0 → 1.0.1):** Bug fixes, clarifications
- **Minor (1.0.0 → 1.1.0):** New optional fields, new endpoints
- **Major (1.0.0 → 2.0.0):** Breaking changes (requires coordination)

---

## 🚨 BREAKING CHANGE DETECTION

**Pact Broker automatically detects:**
- Removed fields
- Changed field types
- New required fields
- Endpoint removal

**Workflow:**
1. Frontend publishes new contract (v1.1.0)
2. Backend CI runs verification
3. **If fails:** PR blocked ❌
4. **If passes:** PR approved ✅

---

## ✅ ACCEPTANCE CRITERIA

**Contract Tests Pass When:**
- [ ] All consumer tests pass (frontend)
- [ ] All provider verifications pass (backend)
- [ ] Contracts published to broker
- [ ] CI gates configured
- [ ] 100% coverage of critical endpoints
- [ ] Error cases tested
- [ ] State handlers reliable

**Coverage Required:**
- GET /api/tasks ✅
- POST /api/tasks ✅
- PUT /api/tasks/:id ✅
- DELETE /api/tasks/:id ✅
- POST /api/tasks/:id/complete ✅
- GET /api/projects ✅
- POST /api/projects ✅
- GET /api/energy/latest ✅
- POST /api/energy ✅

---

*Document Owner: Contract-Testing SDET*  
*Implementation Status: Framework Complete, Tests Pending*

