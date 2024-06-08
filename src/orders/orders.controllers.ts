import { Context } from "hono";
import { OrdersService, getOrderService,createOrderService,updateOrderService,deleteOrderService } from "./orders.service";

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


export const updateOrder = async (c: Context) => {
    const id = parseInt(c.req.param('id'));
    if(isNaN(id)){
        return c.text("Invalid id", 400)
    }
    const data = await c.req.json();
    try{
        const getOrder = await getOrderService(id);
        if(!getOrder){
            return c.text("Order not found", 404)
        }
        //get the data and update
        const res = await updateOrderService(id, data);
        if(!res) return c.text("Order not updated", 400)

            return c.json({message: "Order updated successfully"}, 200)
    } catch(error: any){
        return c.json({message: error.message}, 400)
    }
}


export const deleteOrder = async (c: Context) => {
    const id = parseInt(c.req.param('id'));
    if(isNaN(id)){
        return c.text("Invalid id", 400)
    }
    try{
        const getOrder = await getOrderService(id);
        if(!getOrder){
            return c.text("Order not found", 404)
        }
        const res = await deleteOrderService(id);
        if(!res) return c.text("Order not deleted", 400)
        return c.json({message: "Order deleted successfully"}, 200)
    } catch(error: any){
        return c.json({message: error.message}, 400)
    }
}