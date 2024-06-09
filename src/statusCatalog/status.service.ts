import { eq } from "drizzle-orm";
import {db} from "../drizzle/db";
import { StatusCatalog, TSStatusCatalog, TIStatusCatalog } from "../drizzle/schema";

export const getStatusCatalogsService = async (limit?: number): Promise<TSStatusCatalog[]> => {
    if (limit) {
        return await db.query.StatusCatalog.findMany({
            limit: limit
        });
    }
    return await db.query.StatusCatalog.findMany();
};

export const getSingleStatusCatalogService = async (id: number): Promise<TSStatusCatalog | null> => {
    const statusCatalog = await db.query.StatusCatalog.findFirst({
        where: eq(StatusCatalog.id, id)
    });
    return statusCatalog ?? null;
};

export const createStatusCatalogService = async (statusCatalog: TSStatusCatalog) => {
    await db.insert(StatusCatalog).values(statusCatalog);
    return "Status catalog created successfully";
};

export const updateStatusCatalogService = async (id: number, statusCatalog: TIStatusCatalog) => {
    await db.update(StatusCatalog).set(statusCatalog).where(eq(StatusCatalog.id, id));
    return "Status catalog updated successfully";
};

export const deleteStatusCatalogService = async (id: number) => {
    await db.delete(StatusCatalog).where(eq(StatusCatalog.id, id));
    return "Status catalog deleted successfully";
};
