import { Hono } from 'hono';
import { getRestaurantDetailsController } from './cityState.controller';
 
export const restaurantLocationRouter = new Hono();
restaurantLocationRouter.get('/restaurant/:restaurantId/location', getRestaurantDetailsController);
 
export default restaurantLocationRouter;
 