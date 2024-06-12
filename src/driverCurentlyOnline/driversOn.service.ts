import { db } from '../drizzle/db';
import { Driver } from '../drizzle/schema';
import { eq, and } from 'drizzle-orm';

export const getAvailableDrivers = async () => {
    try {
        const availableDrivers = await db.select()
            .from(Driver)
            .where(and(eq(Driver.online, true), eq(Driver.delivering, false)));

        return availableDrivers;
    } catch (error) {
        console.error('Failed to fetch available drivers:', error);
        throw new Error('Failed to fetch available drivers');
    }
};
