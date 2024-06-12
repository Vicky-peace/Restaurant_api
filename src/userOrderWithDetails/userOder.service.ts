import { db } from '../drizzle/db';
import { Orders, OrderMenuItem, MenuItem, Restaurant } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

export const getUserOrdersWithDetails = async (userId: number) => {
    try {
        const userOrders = await db.select({
            order: Orders,
            orderItems: OrderMenuItem,
            menuItem: MenuItem,
            restaurant: Restaurant
        })
        .from(Orders)
        .innerJoin(OrderMenuItem, eq(Orders.id, OrderMenuItem.order_id))
        .innerJoin(MenuItem, eq(OrderMenuItem.menu_item_id, MenuItem.id))
        .innerJoin(Restaurant, eq(Orders.restaurant_id, Restaurant.id))
        .where(eq(Orders.user_id, userId));

        return userOrders;
    } catch (error) {
        console.error('Failed to fetch user orders:', error);
        throw new Error('Failed to fetch user orders');
    }
};
