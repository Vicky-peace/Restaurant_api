import { Context } from "hono";
import { getAddressesService, getSingleAddressService, createAddressService, updateAddressService, deleteAddressService } from "./address.service";

export const listAddresses = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));

        const data = await getAddressesService(limit);
        if (data == null || data.length == 0) {
            return c.text('No data found', 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const getSingleAddress = async (c: Context) => {
    const id = parseInt(c.req.param('id'), 10);
    if (isNaN(id)) return c.text('Invalid id', 400);
    try {
        const data = await getSingleAddressService(id);
        if (data == null) {
            return c.text('No data found', 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const createAddress = async (c: Context) => {
    try {
        const address = await c.req.json();
        const createdAddress = await createAddressService(address);

        if (!createdAddress) return c.text('Address not created', 400);
        return c.json({ msg: createdAddress }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const updateAddress = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'), 10);
        if (isNaN(id)) return c.text('Invalid id', 400);
        const address = await c.req.json();
        const updatedAddress = await updateAddressService(id, address);

        if (!updatedAddress) return c.text('Address not updated', 400);
        return c.json({ msg: updatedAddress }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

export const deleteAddress = async (c: Context) => {
    try {
        const id = parseInt(c.req.param('id'), 10);
        if (isNaN(id)) return c.text('Invalid id', 400);
        const deletedAddress = await deleteAddressService(id);

        if (!deletedAddress) return c.text('Address not deleted', 400);
        return c.json({ msg: deletedAddress }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};
