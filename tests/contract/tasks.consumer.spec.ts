/**
 * IAOB Contract Tests - Tasks API
 * Consumer (Frontend) defines expectations for Provider (Backend)
 */

import { provider } from './pact-setup';
import { like, eachLike, integer, term } from '@pact-foundation/pact/dsl/matchers';

describe('Tasks API - Consumer Contract', () => {
  beforeAll(() => provider.setup());
  afterEach(() => provider.verify());
  afterAll(() => provider.finalize());

  describe('GET /api/tasks', () => {
    it('returns a list of tasks for authenticated user', async () => {
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
          headers: { 'Content-Type': 'application/json' },
          body: {
            success: true,
            data: {
              tasks: eachLike({
                id: like('task_123'),
                title: like('Complete report'),
                priority: integer(1),
                energy_level: integer(3),
                completed: like(false),
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

      const response = await fetch(`${provider.mockService.baseUrl}/api/tasks`, {
        headers: { Authorization: 'Bearer mock-jwt-token' }
      });

      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(Array.isArray(data.data.tasks)).toBe(true);
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
  });
});

