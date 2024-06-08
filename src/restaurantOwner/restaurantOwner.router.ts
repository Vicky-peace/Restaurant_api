import { Hono } from "hono";
import { getAllRestaurantOwner,getRestaurantOwner,createRestaurantOwner,updateRestaurantOwner,deleteRestaurantOwner } from "./restaurantOwner.controoller";
import { zValidator } from "@hono/zod-validator";
import {restaurantOwnerSchema} from '../validator'

export const restaurantOwnerRouter = new Hono();

restaurantOwnerRouter.get('/restaurantOwner', getAllRestaurantOwner)
restaurantOwnerRouter.get('/restaurantOwner/:id',getRestaurantOwner)
restaurantOwnerRouter.post("/restaurantOwner", zValidator('json', restaurantOwnerSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createRestaurantOwner)

restaurantOwnerRouter.put('/restaurantOwner/:id', updateRestaurantOwner)

restaurantOwnerRouter.delete("/restaurantOwner/:id", deleteRestaurantOwner)