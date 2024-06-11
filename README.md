# Restaurant RESTful API with Drizzle ORM and PostgreSQL

This project is a RESTful API built with the Hono framework, using Drizzle ORM for database interactions and PostgreSQL as the database.

## Table of Contents
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features
- RESTful API structure
- CRUD operations for managing resources
- Authentication and authorization
- Error handling and validation
- Database integration with Drizzle ORM and PostgreSQL

## Requirements
- Node.js v14 or higher
- PostgreSQL v12 or higher

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/Vicky-peace/Restaurant_api.git
    cd your-repo
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up the PostgreSQL database and create a `.env` file with the following variables:
    ```env
    DATABASE_URL=postgresql://user:password@localhost:5432/yourdatabase
    ```

## Configuration
1. Configure your database connection in the `.env` file as shown above.
2. Modify other configuration options as needed in the `config` folder.

## Usage
1. Run database migrations:
    ```sh
    npm run migrate
    ```

2. Start the server:
    ```sh
    npm start
    ```

The server should now be running on `http://localhost:3000`.

## API Endpoints
### Auth
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and obtain a token

### Users
- `GET /users` - Get a list of users
- `GET /users/:id` - Get a user by ID
- `POST /users` - Create a new user
- `PUT /users/:id` - Update a user by ID
- `DELETE /users/:id` - Delete a user by ID

### Example Endpoint
```http
GET /users
