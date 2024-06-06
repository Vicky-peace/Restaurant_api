import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TICity,TSCity } from "../drizzle/schema";

export const cityService = async (limit?: number) : Promise<TSCity[] | null> =>{
    if(limit){
        return await db.query.City.findMany({
            limit: limit
        });

    }
    return await db.query.City.findMany();
}