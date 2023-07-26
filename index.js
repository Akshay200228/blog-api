import express from 'express';
import mongoose from 'mongoose';
import router from './routes/user_routes';
import blogRouter from './routes/blog_routes';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res.send(`
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh;">
        <h1>Welcome to my Express App</h1>
        <h2>This is the home page of Blog Api App.</h2>
        <h3>API Routes:</h3>
        <p>- GET all users: /api/user</p>
        <p>- POST signup: /api/user/signup</p>
        <p>- POST login: /api/user/login</p>
        <p>- GET all blogs: /api/Blogs</p>
        <p>- POST add blog: /api/Blogs/add</p>
        <p>- PUT update blog: /api/Blogs/update/:id</p>
        <p>- GET blog by ID: /api/Blogs/:id</p>
        <p>- DELETE blog by ID: /api/Blogs/:id</p>
        <p>- GET blogs by User ID: /api/Blogs/user/:id</p>
      </div>
    `);
});



// Users routes
app.use(express.json());
app.use("/api/user", router);

// Blogs routes
app.use("/api/Blogs", blogRouter)

mongoose.connect(process.env.MONGO).then(
    () => app.listen(5000)
).then(
    () => console.log("Connected To DataBase and Listening to localhost:5000")
).catch((err) => console.log(err))
