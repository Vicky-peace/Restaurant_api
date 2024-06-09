"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRestaurantOwnerService = exports.updateRestaurantOwnerService = exports.createRestaurantOwnerService = exports.getRestaurantOwnerService = exports.restaurantOwnerService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const restaurantOwnerService = async (limit) => {
    if (limit) {
        return await db_1.db.query.RestaurantOwner.findMany({
            limit: limit
        });
    }
    return await db_1.db.query.RestaurantOwner.findMany();
};
exports.restaurantOwnerService = restaurantOwnerService;
const getRestaurantOwnerService = async (id) => {
    return await db_1.db.query.RestaurantOwner.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.RestaurantOwner.id, id)
    });
};
exports.getRestaurantOwnerService = getRestaurantOwnerService;
const createRestaurantOwnerService = async (restaurantOwner) => {
    await db_1.db.insert(schema_1.RestaurantOwner).values(restaurantOwner);
    return "RestaurantOwner created successfully";
};
exports.createRestaurantOwnerService = createRestaurantOwnerService;
const updateRestaurantOwnerService = async (id, restaurantOwner) => {
    await db_1.db.update(schema_1.RestaurantOwner).set(restaurantOwner).where((0, drizzle_orm_1.eq)(schema_1.RestaurantOwner.id, id));
    return "RestaurantOwner updated successfully";
};
exports.updateRestaurantOwnerService = updateRestaurantOwnerService;
const deleteRestaurantOwnerService = async (id) => {
    await db_1.db.delete(schema_1.RestaurantOwner).where((0, drizzle_orm_1.eq)(schema_1.RestaurantOwner.id, id));
    return "RestaurantOwner deleted successfully";
};
exports.deleteRestaurantOwnerService = deleteRestaurantOwnerService;
