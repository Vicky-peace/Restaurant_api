import { Context } from "hono";
import { getOrderMenuItemsService, getSingleOrderMenuItemService, createOrderMenuItemService, updateOrderMenuItemService, deleteOrderMenuItemService } from "./orderMenu.service";

export const listOrderMenuItems = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));

        const data = await getOrderMenuItemsService(limit);
        if (data == null || data.length == 0) {
            return c.text('No data found', 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const getSingleOrderMenuItem = async (c: Context) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.text('Invalid id', 400);
    try {
        const data = await getSingleOrderMenuItemService(id);
        if (data == null) {
            return c.text('No data found', 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const createOrderMenuItem = async (c: Context) => {
    try {
        const orderMenuItem = await c.req.json();
        const createdOrderMenuItem = await createOrderMenuItemService(orderMenuItem);

        if (!createdOrderMenuItem) return c.text('Order menu item not created', 400);
        return c.json({ msg: createdOrderMenuItem }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const updateOrderMenuItem = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'));
        if (isNaN(id)) return c.text('Invalid id', 400);
        const orderMenuItem = await c.req.json();
        const updatedOrderMenuItem = await updateOrderMenuItemService(id, orderMenuItem);

        if (!updatedOrderMenuItem) return c.text('Order menu item not updated', 400);
        return c.json({ msg: updatedOrderMenuItem }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const deleteOrderMenuItem = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'));
        if (isNaN(id)) return c.text('Invalid id', 400);
        const deletedOrderMenuItem = await deleteOrderMenuItemService(id);

        if (!deletedOrderMenuItem) return c.text('Order menu item not deleted', 400);
        return c.json({ msg: deletedOrderMenuItem }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};
