import { Context } from "hono";
import { getStatesService, getSingleStateService, createStateService, updateStateService, deleteStateService } from "./state.service";

export const listStates = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));

        const data = await getStatesService(limit);
        if (data == null || data.length == 0) {
            return c.text('No data found', 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const getSingleState = async (c: Context) => {
    const id = parseInt(c.req.param('id'), 10);
    if (isNaN(id)) return c.text('Invalid id', 400);
    try {
        const data = await getSingleStateService(id);
        if (data == null) {
            return c.text('No data found', 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const createState = async (c: Context) => {
    try {
        const state = await c.req.json();
        const createdState = await createStateService(state);

        if (!createdState) return c.text('State not created', 400);
        return c.json({ msg: createdState }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const updateState = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'), 10);
        if (isNaN(id)) return c.text('Invalid id', 400);
        const state = await c.req.json();
        const updatedState = await updateStateService(id, state);

        if (!updatedState) return c.text('State not updated', 400);
        return c.json({ msg: updatedState }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const deleteState = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'), 10);
        if (isNaN(id)) return c.text('Invalid id', 400);
        const deletedState = await deleteStateService(id);

        if (!deletedState) return c.text('State not deleted', 400);
        return c.json({ msg: deletedState }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};
