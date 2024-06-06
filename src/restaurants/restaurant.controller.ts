import { Context } from "hono";
import { getRestaurantService } from "./restaurant.service";

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