"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersRouter = void 0;
const hono_1 = require("hono");
const orders_controllers_1 = require("./orders.controllers");
const validator_1 = require("../validator");
const zod_validator_1 = require("@hono/zod-validator");
exports.ordersRouter = new hono_1.Hono();
exports.ordersRouter.get("/orders", orders_controllers_1.listAllOrders);
exports.ordersRouter.get("/orders/:id", orders_controllers_1.getOrder);
exports.ordersRouter.post('/orders', (0, zod_validator_1.zValidator)('json', validator_1.orderSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), orders_controllers_1.createOrder);
exports.ordersRouter.put('/orders/:id', orders_controllers_1.updateOrder);
exports.ordersRouter.delete('/orders/:id', orders_controllers_1.deleteOrder);
