"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderMenuItemRouter = void 0;
const hono_1 = require("hono");
const orderMenu_controller_1 = require("./orderMenu.controller");
exports.orderMenuItemRouter = new hono_1.Hono();
exports.orderMenuItemRouter.get('/order-menu-items', orderMenu_controller_1.listOrderMenuItems);
exports.orderMenuItemRouter.get('/order-menu-items/:id', orderMenu_controller_1.getSingleOrderMenuItem);
exports.orderMenuItemRouter.post('/order-menu-items', orderMenu_controller_1.createOrderMenuItem);
exports.orderMenuItemRouter.put('/order-menu-items/:id', orderMenu_controller_1.updateOrderMenuItem);
exports.orderMenuItemRouter.delete('/order-menu-items/:id', orderMenu_controller_1.deleteOrderMenuItem);
