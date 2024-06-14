import { Context } from "hono";
import { eq } from "drizzle-orm";
import {db} from "../drizzle/db";
import { TSOrder,TIOrder, Orders } from "../drizzle/schema";

//get all orders
export const OrdersService = async (limit: number): Promise<TSOrder[] | null> => {
    if(limit){
        return await db.query.Orders.findMany({
            
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


export const getDetailedOrderInfo = async () => {
    return await db.query.Orders.findMany({
        columns:{
            created_at: true,
            estimated_delivery_time: true,
            actual_delivery_time: true,
            price: true,
            discount: true,
            final_price: true,
            comment: true,
        },
        with:{
            user:{
                columns:{
                    name: true,
                    contact_phone: true,
                    email: true,
                }
            },
            restaurant:{
                columns:{
                    name: true,
                    street_address: true,
                    zip_code: true,
                }
            },
            driver:{
                columns:{
                    car_make: true,
                    car_model: true,
                    car_year: true,
                }
            }
        }
    })
}