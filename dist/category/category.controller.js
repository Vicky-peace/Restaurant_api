"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getSingleCategory = exports.listCategories = void 0;
const category_service_1 = require("./category.service");
const listCategories = async (c) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await (0, category_service_1.getCategoriesService)(limit);
        if (data == null || data.length == 0) {
            return c.text('No data found', 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listCategories = listCategories;
const getSingleCategory = async (c) => {
    const id = parseInt(c.req.param('id'), 10);
    if (isNaN(id))
        return c.text('Invalid id', 400);
    try {
        const data = await (0, category_service_1.getSingleCategoryService)(id);
        if (data == null) {
            return c.text('No data found', 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.getSingleCategory = getSingleCategory;
const createCategory = async (c) => {
    try {
        const category = await c.req.json();
        const createdCategory = await (0, category_service_1.createCategoryService)(category);
        if (!createdCategory)
            return c.text('Category not created', 400);
        return c.json({ msg: createdCategory }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createCategory = createCategory;
const updateCategory = async (c) => {
    try {
        const id = parseInt(c.req.param('id'), 10);
        if (isNaN(id))
            return c.text('Invalid id', 400);
        const category = await c.req.json();
        const updatedCategory = await (0, category_service_1.updateCategoryService)(id, category);
        if (!updatedCategory)
            return c.text('Category not updated', 400);
        return c.json({ msg: updatedCategory }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (c) => {
    try {
        const id = parseInt(c.req.param('id'), 10);
        if (isNaN(id))
            return c.text('Invalid id', 400);
        const deletedCategory = await (0, category_service_1.deleteCategoryService)(id);
        if (!deletedCategory)
            return c.text('Category not deleted', 400);
        return c.json({ msg: deletedCategory }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteCategory = deleteCategory;
