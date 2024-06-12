import { Hono } from 'hono';
import { getActiveMenuItemsController } from './activeMenuItems.controller';
 
export const restaurantMenuRouter = new Hono();
 
restaurantMenuRouter.get('/restaurant/:restaurantId/activeMenuItems', getActiveMenuItemsController);
 
export default restaurantMenuRouter;