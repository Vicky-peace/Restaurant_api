"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRestaurantService = exports.updateRestaurantService = exports.createRestaurantService = exports.getSingleRestaurantService = exports.getRestaurantService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const getRestaurantService = async (limit) => {
    if (limit) {
        return await db_1.db.query.Restaurant.findMany({
            limit: limit
        });
    }
    return await db_1.db.query.Restaurant.findMany();
};
exports.getRestaurantService = getRestaurantService;
//get a single restaurant
const getSingleRestaurantService = async (id) => {
    const restaurant = await db_1.db.query.Restaurant.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.Restaurant.id, id)
    });
    return restaurant ?? null;
};
exports.getSingleRestaurantService = getSingleRestaurantService;
const createRestaurantService = async (restaurant) => {
    await db_1.db.insert(schema_1.Restaurant).values(restaurant);
    return "Restaurant created successfully";
};
exports.createRestaurantService = createRestaurantService;
const updateRestaurantService = async (id, restaurant) => {
    await db_1.db.update(schema_1.Restaurant).set(restaurant).where((0, drizzle_orm_1.eq)(schema_1.Restaurant.id, id));
    return "Restaurant updated successfully";
};
exports.updateRestaurantService = updateRestaurantService;
const deleteRestaurantService = async (id) => {
    await db_1.db.delete(schema_1.Restaurant).where((0, drizzle_orm_1.eq)(schema_1.Restaurant.id, id));
    return "Restaurant deleted successfully";
};
exports.deleteRestaurantService = deleteRestaurantService;
