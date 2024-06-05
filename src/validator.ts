import { z } from 'zod';

export const userSchema = z.object({
  id: z.number().int().optional(),
  name: z.string().max(255),
  contact_phone: z.string().max(20).optional().nullable(),
  phone_verified: z.boolean().default(false).optional(),
  email: z.string().email().max(255),
  email_verified: z.boolean().default(false).optional(),
  confirmation_code: z.string().length(6).optional().nullable(),
  password: z.string().max(255),
  created_at: z.date().default(new Date()).optional(),
  updated_at: z.date().default(new Date()).optional()
});

// // To use the validator in your controllers
// export const validateUser = (data: any) => {
//   return userSchema.parse(data);
// };
