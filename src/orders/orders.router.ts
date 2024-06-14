import { Hono } from "hono";
import { listAllOrders,getOrder, createOrder,updateOrder,deleteOrder,getDetailedOrderInfoController } from "./orders.controllers";
import { orderSchema } from "../validator";
import { zValidator } from "@hono/zod-validator";

export const ordersRouter = new Hono();

ordersRouter.get("/orders", listAllOrders);
ordersRouter.get("/orders/details", getDetailedOrderInfoController);
ordersRouter.get("/orders/:id", getOrder);
ordersRouter.post('/orders', zValidator('json', orderSchema, (result,c) =>{
    if(!result.success){
        return c.json(result.error, 400)
    }
}), createOrder)

ordersRouter.put('/orders/:id', updateOrder)
ordersRouter.delete('/orders/:id', deleteOrder)