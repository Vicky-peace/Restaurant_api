"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMenuItem = exports.updateMenuItem = exports.createMenuItem = exports.getSingleMenuItem = exports.listMenuItems = void 0;
const menuItem_service_1 = require("./menuItem.service");
const listMenuItems = async (c) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await (0, menuItem_service_1.getMenuItemsService)(limit);
        if (!data || data.length === 0) {
            return c.text('No data found', 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error.message }, 400);
    }
};
exports.listMenuItems = listMenuItems;
const getSingleMenuItem = async (c) => {
    const id = parseInt(c.req.param('id'), 10);
    if (isNaN(id))
        return c.text('Invalid id', 400);
    try {
        const data = await (0, menuItem_service_1.getSingleMenuItemService)(id);
        if (!data) {
            return c.text('No data found', 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error.message }, 400);
    }
};
exports.getSingleMenuItem = getSingleMenuItem;
const createMenuItem = async (c) => {
    try {
        const menuItem = await c.req.json();
        const createdMenuItem = await (0, menuItem_service_1.createMenuItemService)(menuItem);
        if (!createdMenuItem)
            return c.text('Menu item not created', 400);
        return c.json({ msg: createdMenuItem }, 201);
    }
    catch (error) {
        return c.json({ error: error.message }, 400);
    }
};
exports.createMenuItem = createMenuItem;
const updateMenuItem = async (c) => {
    try {
        const id = parseInt(c.req.param('id'), 10);
        if (isNaN(id))
            return c.text('Invalid id', 400);
        const menuItem = await c.req.json();
        const updatedMenuItem = await (0, menuItem_service_1.updateMenuItemService)(id, menuItem);
        if (!updatedMenuItem)
            return c.text('Menu item not updated', 400);
        return c.json({ msg: updatedMenuItem }, 200);
    }
    catch (error) {
        return c.json({ error: error.message }, 400);
    }
};
exports.updateMenuItem = updateMenuItem;
const deleteMenuItem = async (c) => {
    try {
        const id = parseInt(c.req.param('id'), 10);
        if (isNaN(id))
            return c.text('Invalid id', 400);
        const deletedMenuItem = await (0, menuItem_service_1.deleteMenuItemService)(id);
        if (!deletedMenuItem)
            return c.text('Menu item not deleted', 400);
        return c.json({ msg: deletedMenuItem }, 200);
    }
    catch (error) {
        return c.json({ error: error.message }, 400);
    }
};
exports.deleteMenuItem = deleteMenuItem;
