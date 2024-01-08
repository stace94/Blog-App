const mongoose = require('mongoose');

// Extracting the Schema and model objects from the mongoose library
const { Schema, model } = mongoose;

// Defining a mongoose Schema for the Post model
const PostSchema = new Schema({
    title: String,                    // Title of the post
    summary: String,                  // Summary or brief description of the post
    content: String,                  // Full content of the post
    cover: String,                    // URL or file path for the post cover image
    author: { type: Schema.Types.ObjectId, ref: "User" }   // Reference to the User model for post author
}, {
    timestamps: true,                 // Automatically add createdAt and updatedAt fields to the document
});

// Creating and exporting mongoose model for the Post schema
const PostModel = model("Post", PostSchema);
module.exports = PostModel;
