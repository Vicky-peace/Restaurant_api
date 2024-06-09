"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDriver = exports.updateDriver = exports.createDriver = exports.getSingleDriver = exports.listDrivers = void 0;
const driver_service_1 = require("./driver.service");
const listDrivers = async (c) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await (0, driver_service_1.getDriversService)(limit);
        if (data == null || data.length == 0) {
            return c.text('No data found', 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listDrivers = listDrivers;
const getSingleDriver = async (c) => {
    const id = parseInt(c.req.param('id'), 10);
    if (isNaN(id))
        return c.text('Invalid id', 400);
    try {
        const data = await (0, driver_service_1.getSingleDriverService)(id);
        if (data == null) {
            return c.text('No data found', 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.getSingleDriver = getSingleDriver;
const createDriver = async (c) => {
    try {
        const driver = await c.req.json();
        const createdDriver = await (0, driver_service_1.createDriverService)(driver);
        if (!createdDriver)
            return c.text('Driver not created', 400);
        return c.json({ msg: createdDriver }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createDriver = createDriver;
const updateDriver = async (c) => {
    try {
        const id = parseInt(c.req.param('id'), 10);
        if (isNaN(id))
            return c.text('Invalid id', 400);
        const driver = await c.req.json();
        const updatedDriver = await (0, driver_service_1.updateDriverService)(id, driver);
        if (!updatedDriver)
            return c.text('Driver not updated', 400);
        return c.json({ msg: updatedDriver }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateDriver = updateDriver;
const deleteDriver = async (c) => {
    try {
        const id = parseInt(c.req.param('id'), 10);
        if (isNaN(id))
            return c.text('Invalid id', 400);
        const deletedDriver = await (0, driver_service_1.deleteDriverService)(id);
        if (!deletedDriver)
            return c.text('Driver not deleted', 400);
        return c.json({ msg: deletedDriver }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteDriver = deleteDriver;
