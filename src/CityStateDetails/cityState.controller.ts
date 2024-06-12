import { Context } from "hono";
import { getRestaurantDetails } from './cityState.service';
 
export const getRestaurantDetailsController = async (c: Context) => {
    try {
        const restaurantId = parseInt(c.req.param("restaurantId"));
        if (isNaN(restaurantId)) return c.text("Invalid restaurant ID", 400);
 
        const restaurantDetails = await getRestaurantDetails(restaurantId);
        if (!restaurantDetails) {
            return c.text("Restaurant not found", 404);
        }
 
        return c.json(restaurantDetails, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
}
 