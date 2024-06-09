import { Hono } from "hono";
import { listOrderMenuItems, getSingleOrderMenuItem, createOrderMenuItem, updateOrderMenuItem, deleteOrderMenuItem } from "./orderMenu.controller";

export const orderMenuItemRouter = new Hono();

orderMenuItemRouter.get('/order-menu-items', listOrderMenuItems);
orderMenuItemRouter.get('/order-menu-items/:id', getSingleOrderMenuItem);
orderMenuItemRouter.post('/order-menu-items', createOrderMenuItem);
orderMenuItemRouter.put('/order-menu-items/:id', updateOrderMenuItem);
orderMenuItemRouter.delete('/order-menu-items/:id', deleteOrderMenuItem);
