import express from "express";
import { getAllBlogs, addBlogs, updateBlogs, getById, deleteBlog } from "../controllers/blog_controller";

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", addBlogs);
blogRouter.put("/update/:id", updateBlogs);
blogRouter.get("/:id", getById);
blogRouter.delete("/:id", deleteBlog);

export default blogRouter;
