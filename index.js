import express from 'express';
import mongoose from 'mongoose';
import router from './routes/user_routes';
import blogRouter from './routes/blog_routes';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();

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



