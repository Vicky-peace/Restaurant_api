"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderStatusRouter = void 0;
const hono_1 = require("hono");
const order_status_controller_1 = require("./order_status.controller");
const { zValidator } = require("@hono/zod-validator");
const validator_1 = require("../validator");
exports.orderStatusRouter = new hono_1.Hono();
exports.orderStatusRouter.get("/orderStatus", order_status_controller_1.getAllOrderStatus);
exports.orderStatusRouter.get("/orderStatus/:id", order_status_controller_1.getOrderStatus);
exports.orderStatusRouter.post("/orderStatus", zValidator('json', validator_1.orderStatusSchema, (result, c) => {
    if (!result.success) {
        return c.json({ error: result.error }, 400);
    }
}), order_status_controller_1.createOrderStatus);
exports.orderStatusRouter.put("/orderStatus/:id", order_status_controller_1.updateOrderStatus);
exports.orderStatusRouter.delete("/orderStatus/:id", order_status_controller_1.deleteOrderStatus);
