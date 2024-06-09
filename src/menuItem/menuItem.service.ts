import { eq } from "drizzle-orm";
import {db} from '../drizzle/db';
import { TSMenuItem,TIMenuItem,MenuItem } from "../drizzle/schema";

export const getMenuItemsService = async (limit?: number): Promise<TSMenuItem[]> => {
    if (limit) {
        return await db.query.MenuItem.findMany({
            limit: limit
        });
    }
    return await db.query.MenuItem.findMany();
};

export const getSingleMenuItemService = async (id: number): Promise<TSMenuItem | null> => {
    const menuItem = await db.query.MenuItem.findFirst({
        where: eq(MenuItem.id, id)
    });
    return menuItem ?? null;
};

export const createMenuItemService = async (menuItem: TSMenuItem) => {
    await db.insert(MenuItem).values(menuItem);
    return "Menu item created successfully";
};

export const updateMenuItemService = async (id: number, menuItem: TIMenuItem) => {
    await db.update(MenuItem).set(menuItem).where(eq(MenuItem.id, id));
    return "Menu item updated successfully";
};

export const deleteMenuItemService = async (id: number) => {
    await db.delete(MenuItem).where(eq(MenuItem.id, id));
    return "Menu item deleted successfully";
};