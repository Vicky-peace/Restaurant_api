import { Hono } from "hono";
import { listAllOrders,getOrder } from "./orders.controllers";
import { orderSchema } from "../validator";
import { zValidator } from "@hono/zod-validator";

export const ordersRouter = new Hono();

ordersRouter.get("/orders", listAllOrders);
ordersRouter.get("/orders/:id", getOrder);