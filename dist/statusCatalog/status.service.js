"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStatusCatalogService = exports.updateStatusCatalogService = exports.createStatusCatalogService = exports.getSingleStatusCatalogService = exports.getStatusCatalogsService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const getStatusCatalogsService = async (limit) => {
    if (limit) {
        return await db_1.db.query.StatusCatalog.findMany({
            limit: limit
        });
    }
    return await db_1.db.query.StatusCatalog.findMany();
};
exports.getStatusCatalogsService = getStatusCatalogsService;
const getSingleStatusCatalogService = async (id) => {
    const statusCatalog = await db_1.db.query.StatusCatalog.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.StatusCatalog.id, id)
    });
    return statusCatalog ?? null;
};
exports.getSingleStatusCatalogService = getSingleStatusCatalogService;
const createStatusCatalogService = async (statusCatalog) => {
    await db_1.db.insert(schema_1.StatusCatalog).values(statusCatalog);
    return "Status catalog created successfully";
};
exports.createStatusCatalogService = createStatusCatalogService;
const updateStatusCatalogService = async (id, statusCatalog) => {
    await db_1.db.update(schema_1.StatusCatalog).set(statusCatalog).where((0, drizzle_orm_1.eq)(schema_1.StatusCatalog.id, id));
    return "Status catalog updated successfully";
};
exports.updateStatusCatalogService = updateStatusCatalogService;
const deleteStatusCatalogService = async (id) => {
    await db_1.db.delete(schema_1.StatusCatalog).where((0, drizzle_orm_1.eq)(schema_1.StatusCatalog.id, id));
    return "Status catalog deleted successfully";
};
exports.deleteStatusCatalogService = deleteStatusCatalogService;
