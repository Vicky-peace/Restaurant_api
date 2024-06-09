"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRelations = exports.statusCatalogRelations = exports.stateRelations = exports.restaurantOwnerRelations = exports.orderRelations = exports.orderStatusRelations = exports.orderMenuItemRelations = exports.menuItemRelations = exports.driverRelations = exports.commentRelations = exports.categoryRelations = exports.cityRelations = exports.citiesRelations = exports.addressRelations = exports.restaurantRelations = exports.RestaurantOwner = exports.Users = exports.StatusCatalog = exports.State = exports.Orders = exports.OrderStatus = exports.OrderMenuItem = exports.MenuItem = exports.Driver = exports.Comment = exports.City = exports.Category = exports.Address = exports.Restaurant = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
// Restaurant Table
exports.Restaurant = (0, pg_core_1.pgTable)('restaurant', {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.text)("name").notNull(),
    street_address: (0, pg_core_1.varchar)("street_address", { length: 255 }).notNull(),
    zip_code: (0, pg_core_1.varchar)("zip_code", { length: 50 }).notNull(),
    city_id: (0, pg_core_1.integer)("city_id").references(() => exports.City.id, { onDelete: "cascade" }),
    createdAt: (0, pg_core_1.timestamp)("createdAt").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updatedAt").defaultNow(),
});
// Address Table
exports.Address = (0, pg_core_1.pgTable)("address", {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    street_address_1: (0, pg_core_1.varchar)('street_address_1', { length: 255 }).notNull(),
    street_address_2: (0, pg_core_1.varchar)('street_address_2', { length: 255 }),
    zip_code: (0, pg_core_1.varchar)("zip_code", { length: 50 }).notNull(),
    delivery_instructions: (0, pg_core_1.text)("delivery_instructions"),
    user_id: (0, pg_core_1.integer)("user_id").references(() => exports.Users.id, { onDelete: "cascade" }),
    city_id: (0, pg_core_1.integer)("city_id").references(() => exports.City.id, { onDelete: "cascade" }),
    created_at: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updated_at: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
});
// Category Table
exports.Category = (0, pg_core_1.pgTable)('category', {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
});
// City Table
exports.City = (0, pg_core_1.pgTable)('city', {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
    state_id: (0, pg_core_1.integer)("state_id").references(() => exports.State.id, { onDelete: "cascade" }),
});
// Comment Table
exports.Comment = (0, pg_core_1.pgTable)('comment', {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    order_id: (0, pg_core_1.integer)("order_id").references(() => exports.Orders.id, { onDelete: "cascade" }),
    user_id: (0, pg_core_1.integer)("user_id").references(() => exports.Users.id, { onDelete: "cascade" }),
    comment_text: (0, pg_core_1.text)("comment_text").notNull(),
    is_complaint: (0, pg_core_1.boolean)("is_complaint").default(false),
    is_praise: (0, pg_core_1.boolean)("is_praise").default(false),
    created_at: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updated_at: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
});
// Driver Table
exports.Driver = (0, pg_core_1.pgTable)('driver', {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    car_make: (0, pg_core_1.varchar)("car_make", { length: 255 }).notNull(),
    car_model: (0, pg_core_1.varchar)("car_model", { length: 255 }).notNull(),
    car_year: (0, pg_core_1.integer)("car_year").notNull(),
    user_id: (0, pg_core_1.integer)("user_id").references(() => exports.Users.id, { onDelete: "cascade" }),
    online: (0, pg_core_1.boolean)("online").default(false),
    delivering: (0, pg_core_1.boolean)("delivering").default(false),
    created_at: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updated_at: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
});
// MenuItem Table
exports.MenuItem = (0, pg_core_1.pgTable)('menu_item', {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
    restaurant_id: (0, pg_core_1.integer)("restaurant_id").references(() => exports.Restaurant.id, { onDelete: "cascade" }),
    category_id: (0, pg_core_1.integer)("category_id").references(() => exports.Category.id, { onDelete: "cascade" }),
    description: (0, pg_core_1.text)("description").notNull(),
    ingredients: (0, pg_core_1.text)("ingredients").notNull(),
    price: (0, pg_core_1.decimal)("price").notNull(),
    active: (0, pg_core_1.boolean)("active").default(true),
    created_at: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updated_at: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
});
// OrderMenuItem Table
exports.OrderMenuItem = (0, pg_core_1.pgTable)('order_menu_item', {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    order_id: (0, pg_core_1.integer)("order_id").references(() => exports.Orders.id, { onDelete: "cascade" }),
    menu_item_id: (0, pg_core_1.integer)("menu_item_id").references(() => exports.MenuItem.id, { onDelete: "cascade" }),
    quantity: (0, pg_core_1.integer)("quantity").notNull(),
    item_price: (0, pg_core_1.decimal)("item_price").notNull(),
    price: (0, pg_core_1.decimal)("price").notNull(),
    comment: (0, pg_core_1.text)("comment"),
});
// OrderStatus Table
exports.OrderStatus = (0, pg_core_1.pgTable)('order_status', {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    order_id: (0, pg_core_1.integer)("order_id").references(() => exports.Orders.id, { onDelete: "cascade" }),
    status_catalog_id: (0, pg_core_1.integer)("status_catalog_id").references(() => exports.StatusCatalog.id, { onDelete: "cascade" }),
    created_at: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
// Orders Table
exports.Orders = (0, pg_core_1.pgTable)('orders', {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    restaurant_id: (0, pg_core_1.integer)("restaurant_id").references(() => exports.Restaurant.id, { onDelete: "cascade" }),
    estimated_delivery_time: (0, pg_core_1.timestamp)("estimated_delivery_time"),
    actual_delivery_time: (0, pg_core_1.timestamp)("actual_delivery_time"),
    delivery_address_id: (0, pg_core_1.integer)("delivery_address_id").references(() => exports.Address.id, { onDelete: "cascade" }),
    user_id: (0, pg_core_1.integer)("user_id").references(() => exports.Users.id, { onDelete: "cascade" }),
    driver_id: (0, pg_core_1.integer)("driver_id").references(() => exports.Driver.id, { onDelete: "cascade" }),
    price: (0, pg_core_1.decimal)("price").notNull(),
    discount: (0, pg_core_1.decimal)("discount"),
    final_price: (0, pg_core_1.decimal)("final_price").notNull(),
    comment: (0, pg_core_1.text)("comment"),
    created_at: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updated_at: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
});
// State Table
exports.State = (0, pg_core_1.pgTable)('state', {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
    code: (0, pg_core_1.varchar)("code", { length: 10 }).notNull(),
});
// StatusCatalog Table
exports.StatusCatalog = (0, pg_core_1.pgTable)('status_catalog', {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
});
// Users Table
exports.Users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
    contact_phone: (0, pg_core_1.varchar)("contact_phone", { length: 20 }),
    phone_verified: (0, pg_core_1.boolean)("phone_verified").default(false),
    email: (0, pg_core_1.varchar)("email", { length: 255 }).notNull(),
    email_verified: (0, pg_core_1.boolean)("email_verified").default(false),
    confirmation_code: (0, pg_core_1.varchar)("confirmation_code", { length: 6 }),
    password: (0, pg_core_1.varchar)("password", { length: 255 }).notNull(),
    created_at: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updated_at: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
});
// RestaurantOwner Table
exports.RestaurantOwner = (0, pg_core_1.pgTable)('restaurant_owner', {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    restaurant_id: (0, pg_core_1.integer)("restaurant_id").references(() => exports.Restaurant.id, { onDelete: "cascade" }),
    owner_id: (0, pg_core_1.integer)("owner_id").references(() => exports.Users.id, { onDelete: "cascade" }),
});
///////////////////////////////Relationships///////////////////////////////////////////
exports.restaurantRelations = (0, drizzle_orm_1.relations)(exports.Restaurant, ({ many, one }) => ({
    menuItems: many(exports.MenuItem),
    orders: many(exports.Orders),
    city: one(exports.City, {
        fields: [exports.Restaurant.city_id],
        references: [exports.City.id]
    }),
    owners: many(exports.RestaurantOwner)
}));
exports.addressRelations = (0, drizzle_orm_1.relations)(exports.Address, ({ one, many }) => ({
    city: one(exports.City, {
        fields: [exports.Address.city_id],
        references: [exports.City.id]
    }),
    user: one(exports.Users, {
        fields: [exports.Address.user_id],
        references: [exports.Users.id]
    }),
    orders: many(exports.Orders)
}));
// City and Restaurant relationship
exports.citiesRelations = (0, drizzle_orm_1.relations)(exports.City, ({ many }) => ({
    restaurants: many(exports.Restaurant)
}));
exports.cityRelations = (0, drizzle_orm_1.relations)(exports.City, ({ many, one }) => ({
    state: one(exports.State, {
        fields: [exports.City.state_id],
        references: [exports.State.id]
    }),
    addresses: many(exports.Address),
    restaurants: many(exports.Restaurant)
}));
// Category and MenuItem relationship
exports.categoryRelations = (0, drizzle_orm_1.relations)(exports.Category, ({ many }) => ({
    menuItems: many(exports.MenuItem)
}));
exports.commentRelations = (0, drizzle_orm_1.relations)(exports.Comment, ({ one }) => ({
    order: one(exports.Orders, {
        fields: [exports.Comment.order_id],
        references: [exports.Orders.id]
    }),
    user: one(exports.Users, {
        fields: [exports.Comment.user_id],
        references: [exports.Users.id]
    })
}));
exports.driverRelations = (0, drizzle_orm_1.relations)(exports.Driver, ({ one, many }) => ({
    user: one(exports.Users, {
        fields: [exports.Driver.user_id],
        references: [exports.Users.id]
    }),
    orders: many(exports.Orders)
}));
exports.menuItemRelations = (0, drizzle_orm_1.relations)(exports.MenuItem, ({ one, many }) => ({
    restaurant: one(exports.Restaurant, {
        fields: [exports.MenuItem.restaurant_id],
        references: [exports.Restaurant.id]
    }),
    category: one(exports.Category, {
        fields: [exports.MenuItem.category_id],
        references: [exports.Category.id]
    }),
    orderMenuItems: many(exports.OrderMenuItem)
}));
exports.orderMenuItemRelations = (0, drizzle_orm_1.relations)(exports.OrderMenuItem, ({ one }) => ({
    menuItem: one(exports.MenuItem, {
        fields: [exports.OrderMenuItem.menu_item_id],
        references: [exports.MenuItem.id]
    }),
    order: one(exports.Orders, {
        fields: [exports.OrderMenuItem.order_id],
        references: [exports.Orders.id]
    })
}));
exports.orderStatusRelations = (0, drizzle_orm_1.relations)(exports.OrderStatus, ({ one }) => ({
    order: one(exports.Orders, {
        fields: [exports.OrderStatus.order_id],
        references: [exports.Orders.id]
    }),
    statusCatalog: one(exports.StatusCatalog, {
        fields: [exports.OrderStatus.status_catalog_id],
        references: [exports.StatusCatalog.id]
    })
}));
exports.orderRelations = (0, drizzle_orm_1.relations)(exports.Orders, ({ one, many }) => ({
    restaurant: one(exports.Restaurant, {
        fields: [exports.Orders.restaurant_id],
        references: [exports.Restaurant.id]
    }),
    deliveryAddress: one(exports.Address, {
        fields: [exports.Orders.delivery_address_id],
        references: [exports.Address.id]
    }),
    user: one(exports.Users, {
        fields: [exports.Orders.user_id],
        references: [exports.Users.id]
    }),
    driver: one(exports.Driver, {
        fields: [exports.Orders.driver_id],
        references: [exports.Driver.id]
    }),
    comments: many(exports.Comment),
    orderMenuItems: many(exports.OrderMenuItem),
    orderStatuses: many(exports.OrderStatus)
}));
exports.restaurantOwnerRelations = (0, drizzle_orm_1.relations)(exports.RestaurantOwner, ({ one }) => ({
    user: one(exports.Users, {
        fields: [exports.RestaurantOwner.owner_id],
        references: [exports.Users.id]
    }),
    restaurant: one(exports.Restaurant, {
        fields: [exports.RestaurantOwner.restaurant_id],
        references: [exports.Restaurant.id]
    })
}));
exports.stateRelations = (0, drizzle_orm_1.relations)(exports.State, ({ many }) => ({
    cities: many(exports.City)
}));
exports.statusCatalogRelations = (0, drizzle_orm_1.relations)(exports.StatusCatalog, ({ many }) => ({
    orderStatuses: many(exports.OrderStatus)
}));
exports.userRelations = (0, drizzle_orm_1.relations)(exports.Users, ({ many }) => ({
    addresses: many(exports.Address),
    comments: many(exports.Comment),
    drivers: many(exports.Driver),
    orders: many(exports.Orders),
    restaurantOwners: many(exports.RestaurantOwner)
}));
