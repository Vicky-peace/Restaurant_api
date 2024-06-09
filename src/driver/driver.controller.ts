import { Context } from "hono";
import { getDriversService, getSingleDriverService, createDriverService, updateDriverService, deleteDriverService } from "./driver.service";

export const listDrivers = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));

        const data = await getDriversService(limit);
        if (data == null || data.length == 0) {
            return c.text('No data found', 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const getSingleDriver = async (c: Context) => {
    const id = parseInt(c.req.param('id'), 10);
    if (isNaN(id)) return c.text('Invalid id', 400);
    try {
        const data = await getSingleDriverService(id);
        if (data == null) {
            return c.text('No data found', 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const createDriver = async (c: Context) => {
    try {
        const driver = await c.req.json();
        const createdDriver = await createDriverService(driver);

        if (!createdDriver) return c.text('Driver not created', 400);
        return c.json({ msg: createdDriver }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const updateDriver = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'), 10);
        if (isNaN(id)) return c.text('Invalid id', 400);
        const driver = await c.req.json();
        const updatedDriver = await updateDriverService(id, driver);

        if (!updatedDriver) return c.text('Driver not updated', 400);
        return c.json({ msg: updatedDriver }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const deleteDriver = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'), 10);
        if (isNaN(id)) return c.text('Invalid id', 400);
        const deletedDriver = await deleteDriverService(id);

        if (!deletedDriver) return c.text('Driver not deleted', 400);
        return c.json({ msg: deletedDriver }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};
