"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hono_1 = require("hono");
require("dotenv/config");
const node_server_1 = require("@hono/node-server");
const http_exception_1 = require("hono/http-exception");
//Routes imports
const user_router_1 = require("./users/user.router");
const city_route_1 = require("./city/city.route");
const restaurant_router_1 = require("./restaurants/restaurant.router");
const orders_router_1 = require("./orders/orders.router");
const order_status_router_1 = require("./order_status/order_status.router");
const restaurantOwner_router_1 = require("./restaurantOwner/restaurantOwner.router");
const menuItem_router_1 = require("./menuItem/menuItem.router");
const orderMenu_router_1 = require("./orderMenuItem/orderMenu.router");
const driver_router_1 = require("./driver/driver.router");
const comments_router_1 = require("./comments/comments.router");
const address_router_1 = require("./Address/address.router");
const category_router_1 = require("./category/category.router");
const status_router_1 = require("./statusCatalog/status.router");
const state_router_1 = require("./state/state.router");
const dotenv_1 = require("dotenv");
const auth_router_1 = require("./auth/auth.router");
const auth_middleware_1 = require("./middlewares/auth.middleware");
(0, dotenv_1.config)(); //Load environmment variables from .env file
const app = new hono_1.Hono().basePath("/api");
//middlewares
const custonTimeoutException = () => new http_exception_1.HTTPException(408, {
    message: `Request timeout after waiting for more than 10 seconds`
});
//default route
app.get('ok', (c) => {
    return c.text('The server is running😀');
});
app.get('/timeout', async (c) => {
    await new Promise((resolve) => setTimeout(resolve, 11000));
    return c.text("data after 5 seconds", 200);
});
//Mount the auth router
app.route('/', auth_router_1.authRouter);
// Protect other routers with authentication middleware
app.use('/api/categories', auth_middleware_1.authenticateToken);
app.use('/api/addresses', auth_middleware_1.authenticateToken);
app.use('/api/cities', auth_middleware_1.authenticateToken);
//custom routes 
app.route("/", user_router_1.userRouter);
app.route("/", city_route_1.cityRouter);
app.route("/", restaurant_router_1.restaurantRouter);
app.route("/", orders_router_1.ordersRouter);
app.route("/", order_status_router_1.orderStatusRouter);
app.route("/", restaurantOwner_router_1.restaurantOwnerRouter);
app.route("/", menuItem_router_1.menuItemRouter);
app.route("/", orderMenu_router_1.orderMenuItemRouter);
app.route("/", driver_router_1.driverRouter);
app.route("/", comments_router_1.commentRouter);
app.route("/", address_router_1.addressRouter);
app.route("/", category_router_1.categoryRouter);
app.route("/", status_router_1.statusCatalogRouter);
app.route("/", state_router_1.stateRouter);
(0, node_server_1.serve)({
    fetch: app.fetch,
    port: Number(process.env.PORT)
});
console.log(`Server is running on port ${process.env.PORT}`);
