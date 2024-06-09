"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRestaurant = exports.updateRestaurant = exports.createRestaurant = exports.getSingleRestaurant = exports.listRestaurants = void 0;
const restaurant_service_1 = require("./restaurant.service");
const listRestaurants = async (c) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await (0, restaurant_service_1.getRestaurantService)(limit);
        if (data == null || data.length == 0) {
            return c.text('No data found', 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listRestaurants = listRestaurants;
const getSingleRestaurant = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text('Invalid id', 400);
    try {
        const data = await (0, restaurant_service_1.getSingleRestaurantService)(id);
        if (data == null) {
            return c.text('No data found', 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.getSingleRestaurant = getSingleRestaurant;
const createRestaurant = async (c) => {
    try {
        const restaurant = await c.req.json();
        const createdRestaurant = await (0, restaurant_service_1.createRestaurantService)(restaurant);
        if (!createdRestaurant)
            return c.text('Restaurant not created', 400);
        return c.json({ msg: createdRestaurant }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createRestaurant = createRestaurant;
const updateRestaurant = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text('Invalid id', 400);
        const restaurant = await c.req.json();
        const updatedRestaurant = await (0, restaurant_service_1.updateRestaurantService)(id, restaurant);
        if (!updatedRestaurant)
            return c.text('Restaurant not updated', 400);
        return c.json({ msg: updatedRestaurant }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateRestaurant = updateRestaurant;
const deleteRestaurant = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id))
            return c.text('Invalid id', 400);
        const deletedRestaurant = await (0, restaurant_service_1.deleteRestaurantService)(id);
        if (!deletedRestaurant)
            return c.text('Restaurant not deleted', 400);
        return c.json({ msg: deletedRestaurant }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteRestaurant = deleteRestaurant;
