import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
      type: String,
      required: true,
      unique: true,
    },
    image:{
      type: String,
      required: true,
    },
    user:{
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
});

// User model based on the schema
const Blog = mongoose.model("Blog", blogSchema);

export default Blog;