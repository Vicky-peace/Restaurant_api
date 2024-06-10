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
  updated_at: z.date().default(new Date()).optional(),
  role: z.enum(['user', 'admin'])
});

// // To use the validator in your controllers
// export const validateUser = (data: any) => {
//   return userSchema.parse(data);
// };

export const orderSchema = z.object({
  id: z.number().int().optional(),
  restaurant_id: z.number().int(),
  estimated_delivery_time: z.date().optional(),
  actual_delivery_time: z.date().optional(),
  delivery_address_id: z.number().int(),
  user_id: z.number().int(),
  driver_id: z.number().int().optional(),
  price: z.number().positive(),
  discount: z.number().positive().optional().nullable(),
  final_price: z.number().positive(),
  comment: z.string().optional().nullable(),
  created_at: z.date().default(new Date()).optional(),
  updated_at: z.date().default(new Date()).optional(),
  
});


export const orderStatusSchema = z.object({
  id: z.number().int().optional(),
  order_id: z.number().int(),
  status_catalog_id: z.number().int(),
  created_at: z.date().default(new Date()).optional(),
});
export const restaurantOwnerSchema = z.object({
  id: z.number().int().optional(),
  restaurant_id: z.number().int(),
  owner_id: z.number().int()
});

// AuthOnUsersTable schema
export const authOnUsersSchema = z.object({
  id: z.number().int().optional(),
  userId: z.number().int().optional(),
  password: z.string().max(255),
  email: z.string().email().max(255),
  role: z.enum(['user', 'admin']).optional(),
});


export const loginSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().max(255),
});