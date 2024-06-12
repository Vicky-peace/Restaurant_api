import { Hono } from "hono";
import { listMenuItems, getSingleMenuItem, createMenuItem, updateMenuItem, deleteMenuItem } from "./menuItem.controller";
import { adminRoleAuth, userRoleAuth } from "../middlewares/authorizeRole";

export const menuItemRouter = new Hono();

menuItemRouter.get('/menu-items', listMenuItems);
menuItemRouter.get('/menu-items/:id', getSingleMenuItem);
menuItemRouter.post('/menu-items', createMenuItem);
menuItemRouter.put('/menu-items/:id', updateMenuItem);
menuItemRouter.delete('/menu-items/:id', deleteMenuItem);
