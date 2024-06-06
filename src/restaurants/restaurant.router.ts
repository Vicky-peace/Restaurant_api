import { Hono } from "hono";
import { listRestaurants,getSingleRestaurant,createRestaurant} from "./restaurant.controller";

export const restaurantRouter = new Hono();

//get all restaurants
restaurantRouter.get('/restaurants', listRestaurants)
restaurantRouter.get('/restaurants/:id', getSingleRestaurant)
restaurantRouter.post('/restaurants', createRestaurant)