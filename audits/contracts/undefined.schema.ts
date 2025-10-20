import { z } from 'zod';

// Base API response wrapper
export const ApiResponseSchema = z.object({success: z.boolean(), ;
  data: z.any(),
  error: z.string().optional(),
  timestamp: z.string()}
}), // Unknown Data Schema
export const UnknownDataSchema = z.object({email: z.string(), ;
  name: z.string(),
  tier: z.string(),
  motivation: z.string(),
  testingFocus: z.array(z.string()),
  energy_log: z.string(),
  points_earned: z.string(),
  tasks: z.string().optional(),
  task: z.string(),
  projects: z.string().optional(),
  ok: z.string(),
  json: z.string(),
  id: z.string(),
  title: z.string(),
  description: z.string(),
  priority: z.string(),
  energy_requirement: z.string(),
  completed: z.boolean(),
  points: z.number(),
  created_at: z.string(),
  due_date: z.string(),
  estimated_duration: z.number(),
  project_id: z.string(),
  project: z.string(),
  color: z.string(),
  updated_at: z.string(),
  archived: z.boolean()}
}), // Unknown API Contract
export const UnknownApiContract={;
}

// Export types for TypeScript
export type UnknownData = z.infer<typeof UnknownDataSchema>;
export type UnknownApiResponse = z.infer<typeof ApiResponseSchema>;
