import { Context } from "hono";
import { cityService } from "./city.service";

export const listCities = async (c: Context) =>{
    try{
        const limit = Number(c.req.query('limit'))

        const data = await cityService(limit);
        if(data == null || data.length == 0){
            return c.text("City not found", 404)
        }
        return c.json(data, 200);
    } catch(error: any){
        return c.json({error: error?.message}, 400)
    }
}