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

    //custom routes 
    app.route("/", userRouter)
    app.route("/", cityRouter)
    app.route("/", restaurantRouter)
    app.route("/", ordersRouter)
    app.route("/", orderStatusRouter)
    app.route("/", restaurantOwnerRouter)


    serve({
        fetch: app.fetch,
        port: Number(process.env.PORT)
    })
console.log(`Server is running on port ${process.env.PORT}`)

