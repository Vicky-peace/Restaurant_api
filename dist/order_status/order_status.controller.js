"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderStatus = exports.updateOrderStatus = exports.createOrderStatus = exports.getOrderStatus = exports.getAllOrderStatus = void 0;
const order_status_service_1 = require("./order_status.service");
const getAllOrderStatus = async (c) => {
    try {
        //limit the number of OrderStatuss to be returned
        const limit = Number(c.req.query('limit'));
        const data = await (0, order_status_service_1.orderStatusService)(limit);
        if (data == null || data.length == 0) {
            return c.text("OrderStatus not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.getAllOrderStatus = getAllOrderStatus;
const getOrderStatus = async (c) => {
    try {
        const id = Number(c.req.param('id'));
        const data = await (0, order_status_service_1.getOrderStatusService)(id);
        if (data == undefined) {
            return c.text("OrderStatus not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.getOrderStatus = getOrderStatus;
const createOrderStatus = async (c) => {
    try {
        const OrderStatus = await c.req.json();
        const createdOrderStatus = await (0, order_status_service_1.createOrderStatusService)(OrderStatus);
        if (!createdOrderStatus) {
            return c.text("OrderStatus not created", 400);
        }
        return c.json(createdOrderStatus, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createOrderStatus = createOrderStatus;
const updateOrderStatus = async (c) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) {
        return c.text("Invalid OrderStatus id", 400);
    }
    const OrderStatus = await c.req.json();
    try {
        //search
        const searchedOrderStatus = await (0, order_status_service_1.getOrderStatusService)(id);
        if (searchedOrderStatus == undefined) {
            return c.text("OrderStatus not found", 404);
        }
        const res = await (0, order_status_service_1.updateOrderStatusService)(id, OrderStatus);
        //return
        if (!res)
            return c.text("OrderStatus not updated", 400);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateOrderStatus = updateOrderStatus;
const deleteOrderStatus = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        //search for the OrderStatus
        const OrderStatus = await (0, order_status_service_1.getOrderStatusService)(id);
        if (OrderStatus == undefined)
            return c.text("OrderStatus not found", 404);
        //deleting the OrderStatus
        const res = await (0, order_status_service_1.deleteOrderStatusService)(id);
        if (!res)
            return c.text("OrderStatus not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteOrderStatus = deleteOrderStatus;
