import mongoose from "mongoose";
import Blog from "../models/Blog";
import User from "../models/User";

export const getAllBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find();

        if (!blogs || blogs.length === 0) {
            return res.status(404).json({ message: "No Blog Found!" });
        }

        return res.status(200).json({ blogs });
    } catch (err) {
        return res.status(500).json({ message: "Server Error" });
    }
};

export const addBlogs = async (req, res, next) => {
    const { title, description, image, user } = req.body;
    let existingUser;

    try {
        existingUser = await User.findById(user);
    } catch (err) {
        console.error("Error while finding user by ID:", err);
        return res.status(500).json({ message: "Server Error" });
    }
    if (!existingUser) {
        return res.status(400).json({ message: "Unable To Find User By This ID" });
    }

    const blog = new Blog({
        title,
        description,
        image,
        user,
    });

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({ session });
        existingUser.blogs.push(blog);
        await existingUser.save({ session });
        await session.commitTransaction();
        console.log("Blog saved and associated with user:", blog);
    } catch (err) {
        console.error("Error while adding a blog:", err);
        return res.status(500).json({ message: "Server Error" });
    }
    return res.status(200).json({ blog });
};


export const updateBlogs = async (req, res, next) => {
    const { title, description } = req.body;

    const blogId = req.params.id;

    try {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description
        })
        if (!blog) {
            return res.status(500).json({ message: "Unable To Update The Blog!" })
        }
        return res.status(200).json({ blog })
    } catch (err) {
        return res.status(500).json({ message: "Server Error" });
    }
};

export const getById = async (req, res, next) => {
    const id = req.params.id;

    try {
        const blog = await Blog.findById(id);

        if (!blog || blog.length === 0) {
            return res.status(404).json({ message: "No Blog Found!" });
        }

        return res.status(200).json({ blog });
    } catch (err) {
        return res.status(500).json({ message: "Server Error" });
    }
};

export const deleteBlog = async (req, res, next) => {
    const id = req.params.id;
    let blog;

    try {
        blog = await Blog.findByIdAndRemove(id).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    } catch (err) {
        console.log(err);
    }
    if (!blog ) {
        return res.status(500).json({ message: "Unable To Delete!" });
    }

    return res.status(200).json({ message: "Successfully Deleted ❌!" });
}

export const getByUserId = async (req, res, next) => {
    const userId = req.params.id;
    let userBlogs;
    try {
        userBlogs = await User.findById(userId).populate("blog")
    } catch (err) {
        console.log(err);
    }
    if (!userBlogs) {
        return res.status(404).json({ message: "No Blogs Found!" });
    }
    return res.status(200).json({ blogs: userBlogs });
}
