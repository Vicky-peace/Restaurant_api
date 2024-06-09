"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrder = exports.createOrder = exports.getOrder = exports.listAllOrders = void 0;
const orders_service_1 = require("./orders.service");
const listAllOrders = async (c) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await (0, orders_service_1.OrdersService)(limit);
        if (data == null || data.length == 0) {
            return c.text("No orders found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.text(error.message, 400);
        console.log(error);
    }
};
exports.listAllOrders = listAllOrders;
const getOrder = async (c) => {
    try {
        const id = parseInt(c.req.param('id'));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const order = await (0, orders_service_1.getOrderService)(id);
        if (order == undefined) {
            return c.text("Order not found", 404);
        }
        return c.json(order, 200);
    }
    catch (error) {
        return c.text(error.message, 400);
    }
};
exports.getOrder = getOrder;
const createOrder = async (c) => {
    try {
        const data = await c.req.json();
        const order = await (0, orders_service_1.createOrderService)(data);
        if (!order)
            return c.text("Order not created", 400);
        return c.text(order, 201);
    }
    catch (error) {
        return c.text(error.message, 400);
    }
};
exports.createOrder = createOrder;
const updateOrder = async (c) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) {
        return c.text("Invalid id", 400);
    }
    const data = await c.req.json();
    try {
        const getOrder = await (0, orders_service_1.getOrderService)(id);
        if (!getOrder) {
            return c.text("Order not found", 404);
        }
        //get the data and update
        const res = await (0, orders_service_1.updateOrderService)(id, data);
        if (!res)
            return c.text("Order not updated", 400);
        return c.json({ message: "Order updated successfully" }, 200);
    }
    catch (error) {
        return c.json({ message: error.message }, 400);
    }
};
exports.updateOrder = updateOrder;
const deleteOrder = async (c) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) {
        return c.text("Invalid id", 400);
    }
    try {
        const getOrder = await (0, orders_service_1.getOrderService)(id);
        if (!getOrder) {
            return c.text("Order not found", 404);
        }
        const res = await (0, orders_service_1.deleteOrderService)(id);
        if (!res)
            return c.text("Order not deleted", 400);
        return c.json({ message: "Order deleted successfully" }, 200);
    }
    catch (error) {
        return c.json({ message: error.message }, 400);
    }
};
exports.deleteOrder = deleteOrder;
