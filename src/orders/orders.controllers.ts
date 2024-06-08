import { Context } from "hono";
import { OrdersService } from "./orders.service";

export const listAllOrders= async (c: Context) => {
    try{
        const limit =  Number(c.req.query('limit'))

        const data = await OrdersService(limit);
        if(data == null || data.length == 0){
            return c.text("No orders found", 404)
    }
    return c.json(data, 200)
} catch (error: any) {
    return c.text(error.message, 400)
    console.log(error)
}
}