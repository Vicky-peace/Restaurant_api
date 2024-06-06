import { Context } from "hono";
import { cityService,getCityByIdService } from "./city.service";

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


export const getCityById = async (c: Context) =>{
    const id = parseInt(c.req.param("id"));
    if(isNaN(id)) return c.text("Invalid ID", 400);

    const city = await getCityByIdService(id);
    if(city == undefined){
        return c.text("City not found", 404);
    }
    return c.json(city, 200);
}