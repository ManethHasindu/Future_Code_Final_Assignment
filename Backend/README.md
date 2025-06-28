
# Final Assignment Backend (Node.js + MongoDB)

## Features
- User registration and login (no auth middleware)
- Full CRUD for products (name, price, quantity)
- MongoDB using Mongoose
- MVC architecture
- Central error handling

## Setup Instructions

1. Install dependencies
   ```
   npm install
   ```

2. Add a `.env` file:
   ```
   MONGO_URI=<Your MongoDB Connection String>
   PORT=5000
   ```

3. Run the server:
   ```
   npm start
   ```

## API Endpoints

### Users
- POST `/api/users/register`
- POST `/api/users/login`

### Products
- GET `/api/products`
- POST `/api/products`
- GET `/api/products/:id`
- PUT `/api/products/:id`
- DELETE `/api/products/:id`
