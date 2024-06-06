import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TSRestaurant,TIRestaurant, Restaurant } from "../drizzle/schema";
import { Context } from "hono"

export const getRestaurantService = async (limit?: number): Promise<TSRestaurant[]> => {
    if(limit){
        return await db.query.Restaurant.findMany({
           limit: limit
        });

    }
  return await db.query.Restaurant.findMany();
};


//get a single restaurant
export const getSingleRestaurantService = async (id: number): Promise<TSRestaurant | null> => {
    const restaurant =  await db.query.Restaurant.findFirst({
       where: eq(Restaurant.id, id)
    });
    return restaurant ?? null;
};

export const createRestaurantService = async (restaurant: TSRestaurant) =>{
    await db.insert(Restaurant).values(restaurant)
    return "Restaurant created successfully";
}