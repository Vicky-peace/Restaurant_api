import { Context } from "hono";
import { getRestaurantService, getSingleRestaurantService } from "./restaurant.service";

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