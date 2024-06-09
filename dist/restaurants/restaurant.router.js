"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantRouter = void 0;
const hono_1 = require("hono");
const restaurant_controller_1 = require("./restaurant.controller");
exports.restaurantRouter = new hono_1.Hono();
//get all restaurants
exports.restaurantRouter.get('/restaurants', restaurant_controller_1.listRestaurants);
exports.restaurantRouter.get('/restaurants/:id', restaurant_controller_1.getSingleRestaurant);
exports.restaurantRouter.post('/restaurants', restaurant_controller_1.createRestaurant);
exports.restaurantRouter.put('/restaurants/:id', restaurant_controller_1.updateRestaurant);
exports.restaurantRouter.delete('/restaurants/:id', restaurant_controller_1.deleteRestaurant);
