"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryService = exports.updateCategoryService = exports.createCategoryService = exports.getSingleCategoryService = exports.getCategoriesService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const getCategoriesService = async (limit) => {
    if (limit) {
        return await db_1.db.query.Category.findMany({
            limit: limit
        });
    }
    return await db_1.db.query.Category.findMany();
};
exports.getCategoriesService = getCategoriesService;
const getSingleCategoryService = async (id) => {
    const category = await db_1.db.query.Category.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.Category.id, id)
    });
    return category ?? null;
};
exports.getSingleCategoryService = getSingleCategoryService;
const createCategoryService = async (category) => {
    await db_1.db.insert(schema_1.Category).values(category);
    return "Category created successfully";
};
exports.createCategoryService = createCategoryService;
const updateCategoryService = async (id, category) => {
    await db_1.db.update(schema_1.Category).set(category).where((0, drizzle_orm_1.eq)(schema_1.Category.id, id));
    return "Category updated successfully";
};
exports.updateCategoryService = updateCategoryService;
const deleteCategoryService = async (id) => {
    await db_1.db.delete(schema_1.Category).where((0, drizzle_orm_1.eq)(schema_1.Category.id, id));
    return "Category deleted successfully";
};
exports.deleteCategoryService = deleteCategoryService;
