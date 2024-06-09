import { eq } from "drizzle-orm";
import {db} from "../drizzle/db";
import { Driver, TSDriver, TIDriver } from "../drizzle/schema";

export const getDriversService = async (limit?: number): Promise<TSDriver[]> => {
    if (limit) {
        return await db.query.Driver.findMany({
            limit: limit
        });
    }
    return await db.query.Driver.findMany();
};

export const getSingleDriverService = async (id: number): Promise<TSDriver | null> => {
    const driver = await db.query.Driver.findFirst({
        where: eq(Driver.id, id)
    });
    return driver ?? null;
};

export const createDriverService = async (driver: TSDriver) => {
    await db.insert(Driver).values(driver);
    return "Driver created successfully";
};

export const updateDriverService = async (id: number, driver: TIDriver) => {
    await db.update(Driver).set(driver).where(eq(Driver.id, id));
    return "Driver updated successfully";
};

export const deleteDriverService = async (id: number) => {
    await db.delete(Driver).where(eq(Driver.id, id));
    return "Driver deleted successfully";
};
