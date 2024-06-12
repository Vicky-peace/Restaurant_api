import { Context } from 'hono';
import { getUserOrdersWithDetails } from './userOder.service';

export const getUserOrdersController = async (c: Context) => {
    const userId = parseInt(c.req.param('userId'), 10);

    if (isNaN(userId)) {
        return c.json({ error: 'Invalid user ID' }, 400);
    }

    try {
        const orders = await getUserOrdersWithDetails(userId);
        return c.json({ orders }, 200);
    } catch (error) {
        console.error('Error in getUserOrdersController:', error);
        return c.json({ error: 'Failed to fetch user orders' }, 500);
    }
};
