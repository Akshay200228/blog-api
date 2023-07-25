import Blog from "../models/Blog";

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

    const blog = new Blog({
        title,
        description,
        image,
        user,
    });

    try {
        await blog.save();
    } catch (err) {
        return res.status(500).json({ message: "Server Error" });
    }
    return res.status(200).json({ blog })
}

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

    try {
        const blog = await Blog.findByIdAndRemove(id);

        if (!blog || blog.length === 0) {
            return res.status(500).json({ message: "Unable To Delete!" });
        }

        return res.status(200).json({ message: "Successfully Deleted ❌!" });
    } catch (err) {
        return res.status(500).json({ message: "Server Error" });
    }
}
