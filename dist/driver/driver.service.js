"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDriverService = exports.updateDriverService = exports.createDriverService = exports.getSingleDriverService = exports.getDriversService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const getDriversService = async (limit) => {
    if (limit) {
        return await db_1.db.query.Driver.findMany({
            limit: limit
        });
    }
    return await db_1.db.query.Driver.findMany();
};
exports.getDriversService = getDriversService;
const getSingleDriverService = async (id) => {
    const driver = await db_1.db.query.Driver.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.Driver.id, id)
    });
    return driver ?? null;
};
exports.getSingleDriverService = getSingleDriverService;
const createDriverService = async (driver) => {
    await db_1.db.insert(schema_1.Driver).values(driver);
    return "Driver created successfully";
};
exports.createDriverService = createDriverService;
const updateDriverService = async (id, driver) => {
    await db_1.db.update(schema_1.Driver).set(driver).where((0, drizzle_orm_1.eq)(schema_1.Driver.id, id));
    return "Driver updated successfully";
};
exports.updateDriverService = updateDriverService;
const deleteDriverService = async (id) => {
    await db_1.db.delete(schema_1.Driver).where((0, drizzle_orm_1.eq)(schema_1.Driver.id, id));
    return "Driver deleted successfully";
};
exports.deleteDriverService = deleteDriverService;
