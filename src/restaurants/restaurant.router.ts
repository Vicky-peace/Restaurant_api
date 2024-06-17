import { Hono } from "hono";
import { listRestaurants,getSingleRestaurant,createRestaurant,updateRestaurant,deleteRestaurant,searchRestaurantController} from "./restaurant.controller";
import { adminRoleAuth, userRoleAuth } from "../middlewares/authorizeRole";

export const restaurantRouter = new Hono();

//get all restaurants
restaurantRouter.get('/restaurants', listRestaurants)
restaurantRouter.get('/restaurants/:id', getSingleRestaurant)
restaurantRouter.post('/restaurants',adminRoleAuth, createRestaurant)
restaurantRouter.put('/restaurants/:id', adminRoleAuth, updateRestaurant)
restaurantRouter.delete('/restaurants/:id',adminRoleAuth, deleteRestaurant)
restaurantRouter.get('/restaurants/search', userRoleAuth, searchRestaurantController)