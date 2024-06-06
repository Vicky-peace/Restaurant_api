import { Context } from "hono";
import { getRestaurantService, getSingleRestaurantService,createRestaurantService, updateRestaurantService } from "./restaurant.service";

export const listRestaurants = async (c: Context) => {
    try{
        const limit = Number(c.req.query('limit'))

        const data = await getRestaurantService(limit);
        if(data == null || data.length == 0){
            return c.text('No data found', 404)
        }
        return c.json(data, 200);
    } catch(error: any){
        return c.json({error: error?.message}, 400)
    }
}

export const getSingleRestaurant = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if(isNaN(id)) return c.text('Invalid id', 400);
    try{
    
        const data = await getSingleRestaurantService(id);
        if(data == null){
            return c.text('No data found', 404)
        }
        return c.json(data, 200);
    } catch(error: any){
        return c.json({error: error?.message}, 400)
    }
}


export const createRestaurant = async (c: Context) => {
    try{
        const restaurant = await c.req.json();
        const createdRestaurant = await createRestaurantService(restaurant);
        
        if(!createdRestaurant)  return c.text('Restaurant not created', 400);
        return c.json({msg: createdRestaurant}, 201)
        
    } catch(error: any){
        return c.json({error: error?.message}, 400)
    }
}

export const updateRestaurant = async (c: Context) => {
    try{
        const id = parseInt(c.req.param("id"));
        if(isNaN(id)) return c.text('Invalid id', 400);
        const restaurant = await c.req.json();
        const updatedRestaurant = await updateRestaurantService(id, restaurant);
        
        if(!updatedRestaurant)  return c.text('Restaurant not updated', 400);
        return c.json({msg: updatedRestaurant}, 200)
        
    } catch(error: any){
        return c.json({error: error?.message}, 400)
    }
}