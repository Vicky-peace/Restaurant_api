"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const db_1 = require("./db");
// Query to get all users
const getUsers = async () => {
    return await db_1.db.query.Users.findMany();
};
// Query to get all restaurants with their cities
const getRestaurantsWithCities = async () => {
    return await db_1.db.query.Restaurant.findMany({
        with: {
            city: {
                columns: { name: true }
            }
        }
    });
};
// Query to get a city with its restaurants by city
const getCitiesWithRestaurants = async () => {
    return await db_1.db.query.City.findMany({
        with: {
            restaurants: {
                columns: { name: true }
            }
        }
    });
};
// 1-n relationship: Restaurant with Menu Items
const getRestaurantsWithMenuItems = async () => {
    return await db_1.db.query.Restaurant.findMany({
        with: {
            menuItems: {
                columns: { name: true, price: true }
            }
        }
    });
};
// n-n relationship: Orders with Menu Items via OrderMenuItem
const getOrdersWithMenuItems = async () => {
    return await db_1.db.query.Orders.findMany({
        with: {
            orderMenuItems: {
                with: {
                    menuItem: {
                        columns: { name: true, price: true }
                    }
                }
            }
        }
    });
};
// n-n relationship: Menu Items with Orders via OrderMenuItem
const getMenuItemsWithOrders = async () => {
    return await db_1.db.query.MenuItem.findMany({
        with: {
            orderMenuItems: {
                with: {
                    order: {
                        columns: { id: true, price: true }
                    }
                }
            }
        }
    });
};
async function main() {
    // console.log(await getUsers());
    // const restaurantsWithCities = await  getRestaurantsWithCities();
    // console.log("Restaurants with Cities:", restaurantsWithCities);
    // console.log("Cities with Restaurants:", await getCitiesWithRestaurants ());
    // console.log("Restaurants with Menu Items:", await getRestaurantsWithMenuItems());
    // console.log("Cities with Restaurants:", await getOrdersWithMenuItems());
    // console.log("Orders with Menu Items:", await getMenuItemsWithOrders());
    console.log("Menu Items with Orders:", await getOrdersWithMenuItems());
}
main();
