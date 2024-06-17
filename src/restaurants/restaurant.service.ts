import { eq } from "drizzle-orm";
import {db} from "../drizzle/db";
import { TSRestaurant,TIRestaurant, Restaurant,City } from "../drizzle/schema";
import { Context } from "hono"
import { parse } from "path";


export const getRestaurantService = async (limit?: number): Promise<TSRestaurant[]> => {
    if(limit){
        return await db.query.Restaurant.findMany({
           limit: limit
        });

    }
  return await db.query.Restaurant.findMany();
};


//get a single restaurant
export const getSingleRestaurantService = async (id: number): Promise<TSRestaurant | null> => {
    const restaurant =  await db.query.Restaurant.findFirst({
       where: eq(Restaurant.id, id)
    });
    return restaurant ?? null;
};

export const createRestaurantService = async (restaurant: TSRestaurant) =>{
    await db.insert(Restaurant).values(restaurant)
    return "Restaurant created successfully";
}

export const updateRestaurantService = async (id: number, restaurant: TIRestaurant) =>{
    await db.update(Restaurant).set(restaurant).where(eq(Restaurant.id, id))
    return "Restaurant updated successfully";
}

export const deleteRestaurantService = async (id: number) =>{
    await db.delete(Restaurant).where(eq(Restaurant.id, id))
    return "Restaurant deleted successfully";
}

export const searchRestaurantService = async (c: Context) =>{
    try {
        const cityName = c.req.param('city');
        const searchQuery = c.req.query('searchQuery') || '';
        const selectedCuisines = c.req.query('selectedCuisines') || '';
        const sortOption =c.req.query('sortOption') || 'updatedAt';
        const page = parseInt(c.req.query('page') || '1', 10);


        const city = await db.query.City.findFirst({
            where: { name: { $iLike: `%${cityName}%` } } as any
        });
        
        if (!city) {
            return c.json(({
              message: "City not found",
              data: [],
              pagination: {
                total: 0,
                page: 1,
                pages: 1,
              },
            }));
          }

          let queryOptions: any = {
            where: { city_id: city.id },
            orderBy: [{ field: sortOption, direction: 'ASC' }],
            skip: (page - 1) * 10,
            limit: 10,
          };


    if (selectedCuisines) {
        queryOptions.where.cuisines = {
          $all: selectedCuisines.split(',').map((cuisine) => `%${cuisine}%`),
        };
      }
       

      if (searchQuery) {
        queryOptions.where.$or = [
          { name: { $iLike: `%${searchQuery}%` } },
          { cuisines: { $in: selectedCuisines.split(',').map((cuisine) => `%${cuisine}%`) } },
        ];
      }
      const [restaurants] = await Promise.all([
         db.query.Restaurant.findMany(queryOptions),
        
      ]);

      if (restaurants.length === 0) {
        return c.json(({
          data: [],
          pagination: {
            total: 0,
            page,
            pages: 1,
          },
        }));
      }

      const response = {
        data: restaurants,
        pagination: {
          total: restaurants.length,
          page,
            pages: Math.ceil(restaurants.length / 10),
        },
      };
  
      return c.json(response);
    } catch (error) {
        console.error(error);
        return c.json({ message: "Something went wrong" });
    }
}