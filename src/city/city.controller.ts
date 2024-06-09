import { Context } from "hono";
import { getCitiesService, getSingleCityService, createCityService, updateCityService, deleteCityService } from "./city.service";

export const listCities = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));

        const data = await getCitiesService(limit);
        if (data == null || data.length == 0) {
            return c.text('No data found', 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const getSingleCity = async (c: Context) => {
    const id = parseInt(c.req.param('id'), 10);
    if (isNaN(id)) return c.text('Invalid id', 400);
    try {
        const data = await getSingleCityService(id);
        if (data == null) {
            return c.text('No data found', 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const createCity = async (c: Context) => {
    try {
        const city = await c.req.json();
        const createdCity = await createCityService(city);

        if (!createdCity) return c.text('City not created', 400);
        return c.json({ msg: createdCity }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const updateCity = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'), 10);
        if (isNaN(id)) return c.text('Invalid id', 400);
        const city = await c.req.json();
        const updatedCity = await updateCityService(id, city);

        if (!updatedCity) return c.text('City not updated', 400);
        return c.json({ msg: updatedCity }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const deleteCity = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'), 10);
        if (isNaN(id)) return c.text('Invalid id', 400);
        const deletedCity = await deleteCityService(id);

        if (!deletedCity) return c.text('City not deleted', 400);
        return c.json({ msg: deletedCity }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};
