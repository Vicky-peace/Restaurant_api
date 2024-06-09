"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantOwnerSchema = exports.orderStatusSchema = exports.orderSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    id: zod_1.z.number().int().optional(),
    name: zod_1.z.string().max(255),
    contact_phone: zod_1.z.string().max(20).optional().nullable(),
    phone_verified: zod_1.z.boolean().default(false).optional(),
    email: zod_1.z.string().email().max(255),
    email_verified: zod_1.z.boolean().default(false).optional(),
    confirmation_code: zod_1.z.string().length(6).optional().nullable(),
    password: zod_1.z.string().max(255),
    created_at: zod_1.z.date().default(new Date()).optional(),
    updated_at: zod_1.z.date().default(new Date()).optional()
});
// // To use the validator in your controllers
// export const validateUser = (data: any) => {
//   return userSchema.parse(data);
// };
exports.orderSchema = zod_1.z.object({
    id: zod_1.z.number().int().optional(),
    restaurant_id: zod_1.z.number().int(),
    estimated_delivery_time: zod_1.z.date().optional(),
    actual_delivery_time: zod_1.z.date().optional(),
    delivery_address_id: zod_1.z.number().int(),
    user_id: zod_1.z.number().int(),
    driver_id: zod_1.z.number().int().optional(),
    price: zod_1.z.number().positive(),
    discount: zod_1.z.number().positive().optional().nullable(),
    final_price: zod_1.z.number().positive(),
    comment: zod_1.z.string().optional().nullable(),
    created_at: zod_1.z.date().default(new Date()).optional(),
    updated_at: zod_1.z.date().default(new Date()).optional()
});
exports.orderStatusSchema = zod_1.z.object({
    id: zod_1.z.number().int().optional(),
    order_id: zod_1.z.number().int(),
    status_catalog_id: zod_1.z.number().int(),
    created_at: zod_1.z.date().default(new Date()).optional(),
});
exports.restaurantOwnerSchema = zod_1.z.object({
    id: zod_1.z.number().int().optional(),
    restaurant_id: zod_1.z.number().int(),
    owner_id: zod_1.z.number().int()
});
