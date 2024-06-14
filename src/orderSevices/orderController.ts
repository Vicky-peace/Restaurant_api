import { Context } from 'hono';
import { getAllOrdersController } from './orderService';

export const getOrdersByUserIdController = async (c: Context) => {
    const userId = Number(c.req.param('userId')); 
    if (isNaN(userId)) {
        return c.json({ error: 'Invalid user ID' }, 400);
    }

    try {
        const orders = await getAllOrdersController(userId);
        return c.json({ orders }, 200);
    } catch (error) {
        console.error('Failed to fetch orders:', error);
        return c.json({ error: 'Failed to fetch orders' }, 500);
    }
};
