import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { OrderMenuItem, TSOrderMenuItem, TIOrderMenuItem } from "../drizzle/schema";

export const getOrderMenuItemsService = async (limit?: number): Promise<TSOrderMenuItem[]> => {
    if (limit) {
        return await db.query.OrderMenuItem.findMany({
            limit: limit
        });
    }
    return await db.query.OrderMenuItem.findMany();
};

export const getSingleOrderMenuItemService = async (id: number): Promise<TSOrderMenuItem | null> => {
    const orderMenuItem = await db.query.OrderMenuItem.findFirst({
        where: eq(OrderMenuItem.id, id)
    });
    return orderMenuItem ?? null;
};

export const createOrderMenuItemService = async (orderMenuItem: TSOrderMenuItem) => {
    await db.insert(OrderMenuItem).values(orderMenuItem);
    return "Order menu item created successfully";
};

export const updateOrderMenuItemService = async (id: number, orderMenuItem: TIOrderMenuItem) => {
    await db.update(OrderMenuItem).set(orderMenuItem).where(eq(OrderMenuItem.id, id));
    return "Order menu item updated successfully";
};

export const deleteOrderMenuItemService = async (id: number) => {
    await db.delete(OrderMenuItem).where(eq(OrderMenuItem.id, id));
    return "Order menu item deleted successfully";
};
