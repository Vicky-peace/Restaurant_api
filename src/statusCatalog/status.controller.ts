import { Context } from "hono";
import { getStatusCatalogsService, getSingleStatusCatalogService, createStatusCatalogService, updateStatusCatalogService, deleteStatusCatalogService } from "./status.service";

export const listStatusCatalogs = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));

        const data = await getStatusCatalogsService(limit);
        if (data == null || data.length == 0) {
            return c.text('No data found', 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const getSingleStatusCatalog = async (c: Context) => {
    const id = parseInt(c.req.param('id'), 10);
    if (isNaN(id)) return c.text('Invalid id', 400);
    try {
        const data = await getSingleStatusCatalogService(id);
        if (data == null) {
            return c.text('No data found', 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const createStatusCatalog = async (c: Context) => {
    try {
        const statusCatalog = await c.req.json();
        const createdStatusCatalog = await createStatusCatalogService(statusCatalog);

        if (!createdStatusCatalog) return c.text('Status catalog not created', 400);
        return c.json({ msg: createdStatusCatalog }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const updateStatusCatalog = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'), 10);
        if (isNaN(id)) return c.text('Invalid id', 400);
        const statusCatalog = await c.req.json();
        const updatedStatusCatalog = await updateStatusCatalogService(id, statusCatalog);

        if (!updatedStatusCatalog) return c.text('Status catalog not updated', 400);
        return c.json({ msg: updatedStatusCatalog }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const deleteStatusCatalog = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'), 10);
        if (isNaN(id)) return c.text('Invalid id', 400);
        const deletedStatusCatalog = await deleteStatusCatalogService(id);

        if (!deletedStatusCatalog) return c.text('Status catalog not deleted', 400);
        return c.json({ msg: deletedStatusCatalog }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};
