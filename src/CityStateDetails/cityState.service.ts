import {db} from '../drizzle/db';
import { Restaurant, City, State } from '../drizzle/schema';
import { eq } from 'drizzle-orm';


 export const getRestaurantDetails = async (restaurantId: number) => {
    try {
        const restaurantDetails = await db.select({
            restaurant: Restaurant,
            city: City,
            state: State,
        })
        .from(Restaurant)
        .innerJoin(City, eq(Restaurant.city_id, City.id))
        .innerJoin(State, eq(City.state_id, State.id))
        .where(eq(Restaurant.id, restaurantId));
 
        return restaurantDetails;
    } catch (error) {
        console.error('Failed to fetch restaurant details:', error);
        throw new Error('Failed to fetch restaurant details');
    }
}
 
