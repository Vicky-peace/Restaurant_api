import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TSRestaurant,TIRestaurant, Restaurant } from "../drizzle/schema";

export const getRestaurantService = async (limit?: number): Promise<TSRestaurant[]> => {
    if(limit){
        return await db.query.Restaurant.findMany({
           limit: limit
        });

    }
  return await db.query.Restaurant.findMany();
};