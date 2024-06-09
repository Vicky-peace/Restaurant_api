"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAddress = exports.updateAddress = exports.createAddress = exports.getSingleAddress = exports.listAddresses = void 0;
const address_service_1 = require("./address.service");
const listAddresses = async (c) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await (0, address_service_1.getAddressesService)(limit);
        if (data == null || data.length == 0) {
            return c.text('No data found', 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listAddresses = listAddresses;
const getSingleAddress = async (c) => {
    const id = parseInt(c.req.param('id'), 10);
    if (isNaN(id))
        return c.text('Invalid id', 400);
    try {
        const data = await (0, address_service_1.getSingleAddressService)(id);
        if (data == null) {
            return c.text('No data found', 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.getSingleAddress = getSingleAddress;
const createAddress = async (c) => {
    try {
        const address = await c.req.json();
        const createdAddress = await (0, address_service_1.createAddressService)(address);
        if (!createdAddress)
            return c.text('Address not created', 400);
        return c.json({ msg: createdAddress }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createAddress = createAddress;
const updateAddress = async (c) => {
    try {
        const id = parseInt(c.req.param('id'), 10);
        if (isNaN(id))
            return c.text('Invalid id', 400);
        const address = await c.req.json();
        const updatedAddress = await (0, address_service_1.updateAddressService)(id, address);
        if (!updatedAddress)
            return c.text('Address not updated', 400);
        return c.json({ msg: updatedAddress }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateAddress = updateAddress;
const deleteAddress = async (c) => {
    try {
        const id = parseInt(c.req.param('id'), 10);
        if (isNaN(id))
            return c.text('Invalid id', 400);
        const deletedAddress = await (0, address_service_1.deleteAddressService)(id);
        if (!deletedAddress)
            return c.text('Address not deleted', 400);
        return c.json({ msg: deletedAddress }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteAddress = deleteAddress;
