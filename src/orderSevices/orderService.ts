import { db } from '../drizzle/db';
import { Orders, Users, Restaurant, Driver } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

export const getAllOrdersController = async (userId: number) => {
    const ordersWithDetails = await db
        .select({
            orderId: Orders.id,
            estimatedDeliveryTime: Orders.estimated_delivery_time,
            actualDeliveryTime: Orders.actual_delivery_time,
            price: Orders.price,
            discount: Orders.discount,
            finalPrice: Orders.final_price,
            comment: Orders.comment,
            user: {
                userId: Users.id,
                name: Users.name,
                contactPhone: Users.contact_phone,
                email: Users.email,
                phoneVerified: Users.phone_verified,
                emailVerified: Users.email_verified,
                confirmationCode: Users.confirmation_code,
            },
            restaurant: {
                restaurantId: Restaurant.id,
                name: Restaurant.name,
                streetAddress: Restaurant.street_address,
                zipCode: Restaurant.zip_code,
            },
            driver: {
                driverId: Driver.id,
                carMake: Driver.car_make,
                carModel: Driver.car_model,
                carYear: Driver.car_year,
                online: Driver.online,
                delivering: Driver.delivering,
            },
        })
        .from(Orders)
        .innerJoin(Users, eq(Orders.user_id, Users.id))
        .innerJoin(Restaurant, eq(Orders.restaurant_id, Restaurant.id))
        .leftJoin(Driver, eq(Orders.driver_id, Driver.id))
        .where(eq(Orders.user_id, userId));
    
    // Format the result to have a single array of objects with nested details
    const formattedOrders = ordersWithDetails.map(row => ({
        orderId: row.orderId,
        estimatedDeliveryTime: row.estimatedDeliveryTime,
        actualDeliveryTime: row.actualDeliveryTime,
        price: row.price,
        discount: row.discount,
        finalPrice: row.finalPrice,
        comment: row.comment,
        user: row.user,
        restaurant: row.restaurant,
    }));

    return formattedOrders;
};
