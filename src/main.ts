import {Hono} from 'hono';
import "dotenv/config";
import { serve } from '@hono/node-server'
import { HTTPException } from 'hono/http-exception';


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
import { authenticateToken } from './middlewares/auth.middleware';

config(); //Load environmment variables from .env file

const app = new Hono().basePath("/api")

//middlewares



const custonTimeoutException = () => 
    new HTTPException(408, {
        message:`Request timeout after waiting for more than 10 seconds`
    });


    //default route
    app.get('ok', (c) =>{
      return c.text('The server is running😀')
    })

    app.get('/timeout', async (c) => {
        await new Promise((resolve) => setTimeout(resolve, 11000))
        return c.text("data after 5 seconds", 200)
    })

    //Mount the auth router
    app.route('/', authRouter);

    // Protect other routers with authentication middleware
app.use('/api/categories', authenticateToken);
app.use('/api/addresses', authenticateToken);
app.use('/api/cities', authenticateToken);

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


    serve({
        fetch: app.fetch,
        port: Number(process.env.PORT)
    })
console.log(`Server is running on port ${process.env.PORT}`)

