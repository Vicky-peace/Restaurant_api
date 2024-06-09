"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCity = exports.updateCity = exports.createCity = exports.getSingleCity = exports.listCities = void 0;
const city_service_1 = require("./city.service");
const listCities = async (c) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await (0, city_service_1.getCitiesService)(limit);
        if (data == null || data.length == 0) {
            return c.text('No data found', 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listCities = listCities;
const getSingleCity = async (c) => {
    const id = parseInt(c.req.param('id'), 10);
    if (isNaN(id))
        return c.text('Invalid id', 400);
    try {
        const data = await (0, city_service_1.getSingleCityService)(id);
        if (data == null) {
            return c.text('No data found', 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.getSingleCity = getSingleCity;
const createCity = async (c) => {
    try {
        const city = await c.req.json();
        const createdCity = await (0, city_service_1.createCityService)(city);
        if (!createdCity)
            return c.text('City not created', 400);
        return c.json({ msg: createdCity }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createCity = createCity;
const updateCity = async (c) => {
    try {
        const id = parseInt(c.req.param('id'), 10);
        if (isNaN(id))
            return c.text('Invalid id', 400);
        const city = await c.req.json();
        const updatedCity = await (0, city_service_1.updateCityService)(id, city);
        if (!updatedCity)
            return c.text('City not updated', 400);
        return c.json({ msg: updatedCity }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateCity = updateCity;
const deleteCity = async (c) => {
    try {
        const id = parseInt(c.req.param('id'), 10);
        if (isNaN(id))
            return c.text('Invalid id', 400);
        const deletedCity = await (0, city_service_1.deleteCityService)(id);
        if (!deletedCity)
            return c.text('City not deleted', 400);
        return c.json({ msg: deletedCity }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteCity = deleteCity;
