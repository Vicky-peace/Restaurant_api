import { Context } from 'hono';
import { getAvailableDrivers } from './driversOn.service';

export const getAvailableDriversController = async (c: Context) => {
    try {
        const drivers = await getAvailableDrivers();
        return c.json({ drivers }, 201);
    } catch (error) {
        console.error('Error in getAvailableDriversController:', error);
        return c.json({ error: 'Failed to fetch available drivers' }, 400);
    }
};
