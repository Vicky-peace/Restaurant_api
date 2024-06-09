import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { City, TSCity, TICity } from "../drizzle/schema";

export const getCitiesService = async (limit?: number): Promise<TSCity[]> => {
    if (limit) {
        return await db.query.City.findMany({
            limit: limit
        });
    }
    return await db.query.City.findMany();
};

export const getSingleCityService = async (id: number): Promise<TSCity | null> => {
    const city = await db.query.City.findFirst({
        where: eq(City.id, id)
    });
    return city ?? null;
};

export const createCityService = async (city: TSCity) => {
    await db.insert(City).values(city);
    return "City created successfully";
};

export const updateCityService = async (id: number, city: TICity) => {
    await db.update(City).set(city).where(eq(City.id, id));
    return "City updated successfully";
};

export const deleteCityService = async (id: number) => {
    await db.delete(City).where(eq(City.id, id));
    return "City deleted successfully";
};
