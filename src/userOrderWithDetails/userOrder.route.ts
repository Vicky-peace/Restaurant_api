import { Hono } from 'hono';
import { getUserOrdersController } from './userOrder.controller';

export const userOrderRoute = new Hono();

userOrderRoute.get('/user/:userId/orders', getUserOrdersController);


