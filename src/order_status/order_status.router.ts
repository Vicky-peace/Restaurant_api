import { Hono } from "hono";
import { getAllOrderStatus, getOrderStatus, createOrderStatus, updateOrderStatus, deleteOrderStatus } from "./order_status.controller";
const { zValidator } = require("@hono/zod-validator");
import { orderStatusSchema } from "../validator";
import { ZodError } from "zod";

export const orderStatusRouter = new Hono();

orderStatusRouter.get("/orderStatus", getAllOrderStatus);
orderStatusRouter.get("/orderStatus/:id", getOrderStatus);
orderStatusRouter.post("/orderStatus", zValidator('json', orderStatusSchema, (result: { success: boolean, error?: ZodError }, c: any) => {
    if (!result.success) {
        return c.json({ error: result.error }, 400);
    }
}), createOrderStatus);
orderStatusRouter.put("/orderStatus/:id", updateOrderStatus);
orderStatusRouter.delete("/orderStatus/:id", deleteOrderStatus);
