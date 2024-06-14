import {Hono} from 'hono';
import "dotenv/config";
import { serve } from '@hono/node-server'
import { HTTPException } from 'hono/http-exception';
import { html, raw } from 'hono/html'
import rateLimit from 'express-rate-limit';


//Routes imports
import { userRouter } from './users/user.router';
import { cityRouter } from './city/city.route';
import {restaurantRouter} from './restaurants/restaurant.router';
import { ordersRouter } from './orders/orders.router';
import {orderStatusRouter} from "./order_status/order_status.router";
import { restaurantOwnerRouter } from './restaurantOwner/restaurantOwner.router';
import { menuItemRouter } from "./menuItem/menuItem.router";
import {orderMenuItemRouter} from "./orderMenuItem/orderMenu.router";
import {driverRouter} from './driver/driver.router';
import {commentRouter} from './comments/comments.router';
import {addressRouter} from './Address/address.router';
import { categoryRouter } from './category/category.router';
import {statusCatalogRouter} from './statusCatalog/status.router'
import {stateRouter } from './state/state.router'
import { config } from 'dotenv';
import { authRouter } from './auth/auth.router';
import {restaurantLocationRouter} from './CityStateDetails/cityState.router';
import {restaurantMenuRouter} from  './ActiveMenuItems/activeMenuItems.router';
import {userOrderRoute} from './userOrderWithDetails/userOrder.route';
import {driversOn} from './driverCurentlyOnline/driversOn.router';
import { orderServiceRoute } from './orderSevices/orderRouter';
config(); //Load environmment variables from .env file

const app = new Hono().basePath("/api")

// Apply rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.'
});



    //middlewares
    app.use('/api/', limiter);



    // Protect other routers with authentication middleware



const custonTimeoutException = () => 
    new HTTPException(408, {
        message:`Request timeout after waiting for more than 10 seconds`
    });
    app.get('/', (c) => {
        return c.html(
            html`
            <style>
                body, html {
                    height: 100%;
                    margin: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-family: Arial, sans-serif;
                }
                .container {
                    text-align: center;
                    border: 1px solid #ddd;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
                }
                ul {
                    list-style-type: none;
                    padding: 0;
                }
                li {
                    margin-bottom: 10px;
                }
                a {
                    color: #007BFF;
                    text-decoration: none;
                }
                a:hover {
                    text-decoration: underline;
                }
            </style>
            <div class="container">
                <h1>Welcome to the Restaurant Food Delivery API</h1>
                <ul>
                    <li><b>Message:</b> Welcome to my Restaurant API</li>
                    <li><b>Author:</b> Victor Peace Kipkorir</li>
                    <li><b>Version:</b> 1.0</li>
                    <li><b>Description:</b> This is a simple API for a restaurant food delivery system</li>
                    <li><b>GitHub:</b> <a href="https://github.com/Vicky-peace/Restaurant_api">Github link</a></li>
                </ul>
            </div>
            `
        );
    });
   
    //Mount the auth router
    app.route('/', authRouter);


    //custom routes 
    app.route("/", userRouter)
    app.route("/", cityRouter)
    app.route("/", restaurantRouter)
    app.route("/", ordersRouter)
    app.route("/", orderStatusRouter)
    app.route("/", restaurantOwnerRouter)
    app.route("/", menuItemRouter)
    app.route("/", orderMenuItemRouter)
    app.route("/", driverRouter)
    app.route("/", commentRouter)
    app.route("/", addressRouter)
    app.route("/", categoryRouter)
    app.route("/", statusCatalogRouter)
    app.route("/", stateRouter )
    app.route("/", restaurantLocationRouter)
    app.route("/", restaurantMenuRouter)
    app.route("/", userOrderRoute)
    app.route("/", driversOn)
    app.route('/', orderServiceRoute)


    serve({
        fetch: app.fetch,
        port: Number(process.env.PORT)
    })
console.log(`Server is running on port ${process.env.PORT}`)

