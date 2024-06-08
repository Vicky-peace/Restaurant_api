import { Context } from "hono";
import { restaurantOwnerService,getRestaurantOwnerService,createRestaurantOwnerService,updateRestaurantOwnerService,deleteRestaurantOwnerService } from "./restaurantOwner.service";

export const getAllRestaurantOwner = async (c: Context) => {
    try {
        //limit the number of RestaurantOwners to be returned

        const limit = Number(c.req.query('limit'))

        const data = await restaurantOwnerService(limit);
        if (data == null || data.length == 0) {
            return c.text("RestaurantOwner not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getRestaurantOwner = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'))
        const data = await getRestaurantOwnerService(id);
        if (data == undefined) {
            return c.text("RestaurantOwner not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const createRestaurantOwner = async (c: Context) => {
    try{
        const restaurantOwner = await c.req.json();
        const createdRestaurantOwner = await createRestaurantOwnerService(restaurantOwner);

        if(!createdRestaurantOwner){
            return c.text("RestaurantOwner not created", 400)
        }  
        return c.json(createdRestaurantOwner, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateRestaurantOwner = async (c: Context) =>{
    const id = parseInt(c.req.param("id"));
    if(isNaN(id)) return c.text("Invalid ID", 400);
    const restaurantOwner = await c.req.json();

    try{
         const data = await getRestaurantOwnerService(id);
         if(data == undefined) return c.text("RestaurantOwner not found", 404);

         const res = await updateRestaurantOwnerService(id, restaurantOwner);
         if(!res) return c.text("Restaurant notupdated", 404);

         return c.json({msg: res}, 201)
    } catch(error: any){
  return c.json({error: error?.message}, 400)
    }
}

export const deleteRestaurantOwner = async(c: Context) =>{
    const id = Number(c.req.param("id"));
    if(isNaN(id)) return c.text("Invalid ID", 400);
    try{
        const RestuarantOwner = await getRestaurantOwnerService(id);
        if (RestuarantOwner == undefined) return c.text("RestuarantOwner not found", 404);
        //deleting the RestuarantOwner
        const res = await deleteRestaurantOwnerService(id);
        if (!res) return c.text("RestuarantOwner not deleted", 404);
        return c.json({ msg: res }, 201);
    }catch(error: any){
        return c.json({error: error?.message}, 400)
    }
}