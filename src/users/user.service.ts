import { TIUser, TSUser, TIAddress, TSAddress, TICity, TSCity, TIState, TSState, TIRestaurant, TSRestaurant, TICategory, TSCategory, TIMenuItem, TSMenuItem, TIOrder, TSOrder, TIOrderMenuItem, TSOrderMenuItem, TIOrderStatus, TSOrderStatus, TSStatusCatalog, TIStatusCatalog, TIComment, TSComment, TIDriver, TIRestaurantOwner, TSRestaurantOwner } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import db from "../drizzle/db";

export const userService = async (limit?: number) : Promise<TSUser[] | null> =>{
    if(limit){
        return await db.query.Users.findMany({
            limit: limit
        });
    }
    return await db.query.Users.findMany();
}