const mongoose = require('mongoose');

// Extracting the Schema and model objects from the mongoose library
const { Schema, model } = mongoose;

// Defining a mongoose Schema for the User model
const UserSchema = new Schema({
    userName: {
        type: String,           // Data type for the user's username
        required: true,         // Username is a required field
        min: 4,                 // Minimum length of the username
        unique: true            // Ensures that usernames are unique across users
    },
    password: {
        type: String,           // Data type for the user's password
        required: true          // Password is a required field
    }
});

// Creating and exporting mongoose model for the User schema
const UserModel = model('User', UserSchema);
module.exports = UserModel;
