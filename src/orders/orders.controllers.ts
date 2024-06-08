import { Context } from "hono";
import { OrdersService, getOrderService,createOrderService } from "./orders.service";

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


export const getOrder = async (c: Context) => {
    try{
        const id = parseInt(c.req.param('id'));
        if(isNaN(id)){
            return c.text("Invalid id", 400)
        }
        const order = await getOrderService(id);
        if(order == undefined){
            return c.text("Order not found", 404)
        }
        return c.json(order, 200)
    } catch (error: any) {
        return c.text(error.message, 400);
    }
}

export const createOrder = async (c: Context) => {
    try{
        const data = await c.req.json();
        const order = await createOrderService(data);
        
        if(!order) return c.text("Order not created", 400)
        return c.text(order, 201)
    } catch (error: any) {
        return c.text(error.message, 400)
    }
}