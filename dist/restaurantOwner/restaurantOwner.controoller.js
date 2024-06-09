"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRestaurantOwner = exports.updateRestaurantOwner = exports.createRestaurantOwner = exports.getRestaurantOwner = exports.getAllRestaurantOwner = void 0;
const restaurantOwner_service_1 = require("./restaurantOwner.service");
const getAllRestaurantOwner = async (c) => {
    try {
        //limit the number of RestaurantOwners to be returned
        const limit = Number(c.req.query('limit'));
        const data = await (0, restaurantOwner_service_1.restaurantOwnerService)(limit);
        if (data == null || data.length == 0) {
            return c.text("RestaurantOwner not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.getAllRestaurantOwner = getAllRestaurantOwner;
const getRestaurantOwner = async (c) => {
    try {
        const id = Number(c.req.param('id'));
        const data = await (0, restaurantOwner_service_1.getRestaurantOwnerService)(id);
        if (data == undefined) {
            return c.text("RestaurantOwner not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.getRestaurantOwner = getRestaurantOwner;
const createRestaurantOwner = async (c) => {
    try {
        const restaurantOwner = await c.req.json();
        const createdRestaurantOwner = await (0, restaurantOwner_service_1.createRestaurantOwnerService)(restaurantOwner);
        if (!createdRestaurantOwner) {
            return c.text("RestaurantOwner not created", 400);
        }
        return c.json(createdRestaurantOwner, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createRestaurantOwner = createRestaurantOwner;
const updateRestaurantOwner = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const restaurantOwner = await c.req.json();
    try {
        const data = await (0, restaurantOwner_service_1.getRestaurantOwnerService)(id);
        if (data == undefined)
            return c.text("RestaurantOwner not found", 404);
        const res = await (0, restaurantOwner_service_1.updateRestaurantOwnerService)(id, restaurantOwner);
        if (!res)
            return c.text("Restaurant notupdated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateRestaurantOwner = updateRestaurantOwner;
const deleteRestaurantOwner = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        const RestuarantOwner = await (0, restaurantOwner_service_1.getRestaurantOwnerService)(id);
        if (RestuarantOwner == undefined)
            return c.text("RestuarantOwner not found", 404);
        //deleting the RestuarantOwner
        const res = await (0, restaurantOwner_service_1.deleteRestaurantOwnerService)(id);
        if (!res)
            return c.text("RestuarantOwner not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteRestaurantOwner = deleteRestaurantOwner;
