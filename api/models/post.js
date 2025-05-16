// models/post.js
import { Schema, model } from "mongoose";

const postSchema = new Schema({
    title: String,
    summary: String,
    content: String,
    img: String
}, {
    timestamps: true
});

const PostModel = model("Post", postSchema);
export default PostModel;
