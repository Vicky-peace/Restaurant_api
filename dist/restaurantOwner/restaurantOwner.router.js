"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantOwnerRouter = void 0;
const hono_1 = require("hono");
const restaurantOwner_controoller_1 = require("./restaurantOwner.controoller");
const zod_validator_1 = require("@hono/zod-validator");
const validator_1 = require("../validator");
exports.restaurantOwnerRouter = new hono_1.Hono();
exports.restaurantOwnerRouter.get('/restaurantOwner', restaurantOwner_controoller_1.getAllRestaurantOwner);
exports.restaurantOwnerRouter.get('/restaurantOwner/:id', restaurantOwner_controoller_1.getRestaurantOwner);
exports.restaurantOwnerRouter.post("/restaurantOwner", (0, zod_validator_1.zValidator)('json', validator_1.restaurantOwnerSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), restaurantOwner_controoller_1.createRestaurantOwner);
exports.restaurantOwnerRouter.put('/restaurantOwner/:id', restaurantOwner_controoller_1.updateRestaurantOwner);
exports.restaurantOwnerRouter.delete("/restaurantOwner/:id", restaurantOwner_controoller_1.deleteRestaurantOwner);
