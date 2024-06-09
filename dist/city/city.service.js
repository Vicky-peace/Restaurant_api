"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCityService = exports.updateCityService = exports.createCityService = exports.getSingleCityService = exports.getCitiesService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const getCitiesService = async (limit) => {
    if (limit) {
        return await db_1.db.query.City.findMany({
            limit: limit
        });
    }
    return await db_1.db.query.City.findMany();
};
exports.getCitiesService = getCitiesService;
const getSingleCityService = async (id) => {
    const city = await db_1.db.query.City.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.City.id, id)
    });
    return city ?? null;
};
exports.getSingleCityService = getSingleCityService;
const createCityService = async (city) => {
    await db_1.db.insert(schema_1.City).values(city);
    return "City created successfully";
};
exports.createCityService = createCityService;
const updateCityService = async (id, city) => {
    await db_1.db.update(schema_1.City).set(city).where((0, drizzle_orm_1.eq)(schema_1.City.id, id));
    return "City updated successfully";
};
exports.updateCityService = updateCityService;
const deleteCityService = async (id) => {
    await db_1.db.delete(schema_1.City).where((0, drizzle_orm_1.eq)(schema_1.City.id, id));
    return "City deleted successfully";
};
exports.deleteCityService = deleteCityService;
