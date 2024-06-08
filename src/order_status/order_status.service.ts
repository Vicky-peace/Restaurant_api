import {eq} from 'drizzle-orm';
import db from "../drizzle/db";
import { TIOrderStatus,TSOrderStatus, OrderStatus } from '../drizzle/schema';

export const orderStatusService = async (limit?: number): Promise<TSOrderStatus[] | null> => {
    if (limit) {
        return await db.query.OrderStatus.findMany({
            limit: limit
        });
    }
    return await db.query.OrderStatus.findMany();
}

export const getOrderStatusService = async (id: number): Promise<TIOrderStatus | undefined> => {
    return await db.query.OrderStatus.findFirst({
        where: eq(OrderStatus.id, id)
    })
}

export const createOrderStatusService = async (order: TIOrderStatus) => {
    await db.insert(OrderStatus).values(order)
    return "OrderStatus created successfully";
}

export const updateOrderStatusService = async (id: number, order: TIOrderStatus) => {
    await db.update(OrderStatus).set(order).where(eq(OrderStatus.id, id))
    return "OrderStatus updated successfully";
}
export const deleteOrderStatusService = async (id: number) => {
    await db.delete(OrderStatus).where(eq(OrderStatus.id, id))
    return "OrderStatus deleted successfully";
}