import { z } from 'zod';

// Base API response wrapper
export const ApiResponseSchema = z.object({success: z.boolean(), ;
  data: z.any(),
  error: z.string().optional(),
  timestamp: z.string()}
}), // General Data Schema
export const GeneralDataSchema = z.object({Component: z.string(), ;
  pageProps: z.string(),
  message: z.string(),
  items: z.string(),
  json: z.string(),
  id: z.string(),
  summary: z.string(),
  description: z.string(),
  start: z.string(),
  end: z.string(),
  location: z.string(),
  date: z.string(),
  category: z.string(),
  features: z.string(),
  name: z.string(),
  syncscript: z.string(),
  notion: z.string(),
  todoist: z.string(),
  motion: z.string(),
  highlight: z.boolean()}
}), // General API Contract
export const GeneralApiContract = {
  getHttps: {, request: z.object({,),
    response: ApiResponseSchema.extend({,
      data: GeneralDataSchema.array()
    })
  }, getHttps: {,
    request: z.object({,),
    response: ApiResponseSchema.extend({,
      data: GeneralDataSchema.array()
    })
  }, getHttps: {,
    request: z.object({,),
    response: ApiResponseSchema.extend({,
      data: GeneralDataSchema.array()
    })
  },;
},
// Export types for TypeScript
export type GeneralData = z.infer<typeof GeneralDataSchema>;
export type GeneralApiResponse = z.infer<typeof ApiResponseSchema>;
