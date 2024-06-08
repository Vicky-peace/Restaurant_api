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