import {Hono} from 'hono';
import "dotenv/config";
import { serve } from '@hono/node-server'
import { HTTPException } from 'hono/http-exception';





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


    serve({
        fetch: app.fetch,
        port: Number(process.env.PORT)
    })
console.log(`Server is running on port ${process.env.PORT}`)

