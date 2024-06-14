import { Hono } from "hono";
import { getOrdersByUserIdController } from "./orderController";

export const orderServiceRoute = new Hono();

orderServiceRoute.get("/orderServices/:userId", getOrdersByUserIdController);