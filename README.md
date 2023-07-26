# Live link Here :- https://blog-api-ignu.onrender.com/

# My Express App

This is a simple Express.js application for managing users and blogs.

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/Akshay200228/blog-api
    cd your-express-app

2. Install dependencies:
    npm install

3. Set up environment variables:
    Create a .env file in the root directory and add the following:
    MONGO=your_mongodb_connection_string
    Replace your_mongodb_connection_string with your MongoDB connection string.

4. Run the application:
    npm start
    The server will start on http://localhost:5000/.

## API Routes

* GET all users: http://localhost:5000/api/user
* POST signup: http://localhost:5000/api/user/signup
* POST login: http://localhost:5000/api/user/login
* GET all blogs: http://localhost:5000/api/Blogs
* POST add blog: http://localhost:5000/api/Blogs/add
* PUT update blog: http://localhost:5000/api/Blogs/update/:id
* GET blog by ID: http://localhost:5000/api/Blogs/:id
* DELETE blog by ID: http://localhost:5000/api/Blogs/:id
* GET blogs by User ID: http://localhost:5000/api/Blogs/user/:id
