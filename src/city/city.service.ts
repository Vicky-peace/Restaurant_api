import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TICity,TSCity , City} from "../drizzle/schema";

export const cityService = async (limit?: number) : Promise<TSCity[] | null> =>{
    if(limit){
        return await db.query.City.findMany({
            limit: limit
        });

    }
    return await db.query.City.findMany();
}

export const getCityByIdService = async (id: number): Promise<TSCity | null> => {
    const city = await db.query.City.findFirst({
        where: eq(City.id, id)
    });
    return city ?? null;
};