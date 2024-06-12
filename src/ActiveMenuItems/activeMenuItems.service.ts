import {db} from '../drizzle/db';
import { MenuItem, Restaurant, Category } from '../drizzle/schema';
import { and, eq } from 'drizzle-orm';
 
export const getActiveMenuItems = async (restaurantId: number) => {
    try {
        const activeMenuItems = await db.select({
            menuItem: MenuItem,
            category: Category,
        })
        .from(MenuItem)
        .innerJoin(Restaurant, eq(MenuItem.restaurant_id, Restaurant.id))
        .innerJoin(Category, eq(MenuItem.category_id, Category.id))
        .where(and(
            eq(MenuItem.restaurant_id, restaurantId),
            eq(MenuItem.active, true)
        ));
 
        return activeMenuItems;
    } catch (error) {
        console.error('Failed to fetch active menu items:', error);
        throw new Error('Failed to fetch active menu items');
    }
}