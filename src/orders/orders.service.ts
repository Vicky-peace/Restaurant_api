import { Context } from "hono";
import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TSOrder,TIOrder, Orders } from "../drizzle/schema";

//get all orders
export const OrdersService = async (limit: number): Promise<TSOrder[] | null> => {
    if(limit){
        return await db.query.Orders.findMany({
            limit: limit
        })
    }
    return await db.query.Orders.findMany();

}

//get a single order
export const getOrderService = async (id: number): Promise<TSOrder | undefined> => {
    return await db.query.Orders.findFirst({
        where: eq(Orders.id, id)
    })
}


//create a new order
export const createOrderService = async (data: TIOrder)=> {
   await db.insert(Orders).values(data)
    return "Order created successfully"
}


//update an order

export const updateOrderService = async (id: number, data: TIOrder) => {
    await db.update(Orders).set(data).where(eq(Orders.id, id))
    return "Order updated successfully"
}

//delete an order
export const deleteOrderService = async (id: number) => {
    await db.delete(Orders).where(eq(Orders.id, id))
    return "Order deleted successfully"
}