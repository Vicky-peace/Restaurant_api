import { Context } from "hono";
import { getActiveMenuItems } from './activeMenuItems.service'
 
export const getActiveMenuItemsController = async (c: Context) => {
    try {
        const restaurantId = parseInt(c.req.param("restaurantId"));
        if (isNaN(restaurantId)) return c.text("Invalid restaurant ID", 400);
 
        const menuItems = await getActiveMenuItems(restaurantId);
        if (!menuItems || menuItems.length === 0) {
            return c.text("No active menu items found for this restaurant", 404);
        }
 
        return c.json(menuItems, 200);
    } catch (error: any) {
        return c.json({ error: error.message }, 400);
    }
}
 