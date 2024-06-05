import "dotenv/config";
import db from "./drizzle/db";
import { Restaurant, Address, Category, City, Comment, Driver, MenuItem, OrderMenuItem, OrderStatus, Orders, State, StatusCatalog, Users, RestaurantOwner } from "./drizzle/schema";
import { TIUser, TSUser, TIAddress, TSAddress, TICity, TSCity, TIState, TSState, TIRestaurant, TSRestaurant, TICategory, TSCategory, TIMenuItem, TSMenuItem, TIOrder, TSOrder, TIOrderMenuItem, TSOrderMenuItem, TIOrderStatus, TSOrderStatus, TSStatusCatalog, TIStatusCatalog, TIComment, TSComment, TIDriver, TIRestaurantOwner, TSRestaurantOwner } from "./drizzle/schema";

// Query to get all users
const getUsers = async (): Promise<TSUser[]> => {
    return await db.query.Users.findMany();
}



// Query to get all restaurants with their cities
const getRestaurantsWithCities = async () => {
    return await db.query.Restaurant.findMany({
        with: {
            city: {
                columns: { name: true }
            }
        }
    });
};

// Query to get a city with its restaurants by city


const getCitiesWithRestaurants = async () => {
    return await db.query.City.findMany({
        with: {
            restaurants: {
                columns: { name: true }
            }
        }
    });
};

// 1-n relationship: Restaurant with Menu Items
const getRestaurantsWithMenuItems = async () => {
    return await db.query.Restaurant.findMany({
        with: {
            menuItems: {
                columns: { name: true, price: true }
            }
        }
    });
};



// n-n relationship: Orders with Menu Items via OrderMenuItem


const getOrdersWithMenuItems = async () => {
    return await db.query.Orders.findMany({
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
    return await db.query.MenuItem.findMany({
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
