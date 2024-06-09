"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderMenuItem = exports.updateOrderMenuItem = exports.createOrderMenuItem = exports.getSingleOrderMenuItem = exports.listOrderMenuItems = void 0;
const orderMenu_service_1 = require("./orderMenu.service");
const listOrderMenuItems = async (c) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await (0, orderMenu_service_1.getOrderMenuItemsService)(limit);
        if (data == null || data.length == 0) {
            return c.text('No data found', 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listOrderMenuItems = listOrderMenuItems;
const getSingleOrderMenuItem = async (c) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id))
        return c.text('Invalid id', 400);
    try {
        const data = await (0, orderMenu_service_1.getSingleOrderMenuItemService)(id);
        if (data == null) {
            return c.text('No data found', 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.getSingleOrderMenuItem = getSingleOrderMenuItem;
const createOrderMenuItem = async (c) => {
    try {
        const orderMenuItem = await c.req.json();
        const createdOrderMenuItem = await (0, orderMenu_service_1.createOrderMenuItemService)(orderMenuItem);
        if (!createdOrderMenuItem)
            return c.text('Order menu item not created', 400);
        return c.json({ msg: createdOrderMenuItem }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createOrderMenuItem = createOrderMenuItem;
const updateOrderMenuItem = async (c) => {
    try {
        const id = parseInt(c.req.param('id'));
        if (isNaN(id))
            return c.text('Invalid id', 400);
        const orderMenuItem = await c.req.json();
        const updatedOrderMenuItem = await (0, orderMenu_service_1.updateOrderMenuItemService)(id, orderMenuItem);
        if (!updatedOrderMenuItem)
            return c.text('Order menu item not updated', 400);
        return c.json({ msg: updatedOrderMenuItem }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateOrderMenuItem = updateOrderMenuItem;
const deleteOrderMenuItem = async (c) => {
    try {
        const id = parseInt(c.req.param('id'));
        if (isNaN(id))
            return c.text('Invalid id', 400);
        const deletedOrderMenuItem = await (0, orderMenu_service_1.deleteOrderMenuItemService)(id);
        if (!deletedOrderMenuItem)
            return c.text('Order menu item not deleted', 400);
        return c.json({ msg: deletedOrderMenuItem }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteOrderMenuItem = deleteOrderMenuItem;
