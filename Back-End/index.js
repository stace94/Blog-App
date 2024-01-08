// Importing required modules and setting up the Express application
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");
const User = require("./models/user.js");
const Post = require('./models/Post');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleWare = multer({ dest: 'uploads/' });
const fs = require('fs');
require('dotenv').config();


// Middleware to parse JSON data
const salt = bcrypt.genSaltSync(10);
const secret = process.env.SECRET_KEY;
console.log(secret)
const DB_URL = process.env.DB_URL;
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

// Connecting to MongoDB
mongoose.connect(DB_URL);

// Registering a new user endpoint
app.post('/register', async (req, res) => {
   // Extracting username and password from the request body
   const { userName, password } = req.body;
   try {
       // Creating a new user document with hashed password using bcrypt
       const userDoc = await User.create({
           userName,
           password: bcrypt.hashSync(password, salt),
       });
       // Sending the user document as JSON response if registration is successful
       res.json(userDoc);
   } catch (err) {
       // Handling errors and sending a 400 status with the error details
       res.status(400).json(err);
   }
});

// Login endpoint
app.post("/login", async (req, res) => {
   // Extracting username and password from the request body
   const { userName, password } = req.body;

   // Finding the user document by username
   const userDoc = await User.findOne({ userName });

   // Comparing the provided password with the hashed password in the user document
   const passOkay = bcrypt.compareSync(password, userDoc.password);

   if (passOkay) {
       // Creating a JWT token and setting it in a cookie upon successful login
       jwt.sign({ userName, id: userDoc._id }, secret, {}, (err, token) => {
           if (err) throw err;
           res.cookie('token', token).json({
               id: userDoc._id,
               userName,
           });
       });
   } else {
       // Sending a 400 status with an error message for incorrect credentials
       res.status(400).json('wrong credentials');
   }
});

// Profile endpoint
app.get('/profile', (req, res) => {
   // Extracting the JWT token from the request cookies
   const { token } = req.cookies;

   // Verifying the token and decoding the user information
   jwt.verify(token, secret, {}, (err, info) => {
       if (err) throw err;
       // Sending the decoded user information as JSON response
       res.json(info);
   });
});

// Logout endpoint
app.post('/logout', (req, res) => {
   // Clearing the token cookie
   res.cookie('token', '').json('okay');
});

// Create a new post endpoint
app.post('/post', uploadMiddleWare.single('file'), async (req, res) => {
   // Extracting file information from the request
   const { originalname, path } = req.file;
   const parts = originalname.split('.');
   const ext = parts[parts.length - 1];
   const newPath = path + "." + ext;

   // Renaming and updating the file path
   fs.renameSync(path, newPath);

   // Extracting user information from the JWT token
   const { token } = req.cookies;
   jwt.verify(token, secret, {}, async (err, info) => {
       if (err) throw err;

       // Extracting post details from the request body
       const { title, summary, content } = req.body;

       // Creating a new post document in the database
       const postDoc = await Post.create({
           title,
           summary,
           content,
           cover: newPath,
           author: info.id,
       });

       // Responding with the created post document
       res.json(postDoc);
   });
});

// Update a post endpoint
app.put('/post', uploadMiddleWare.single('file'), async (req, res) => {
   // Initializing a variable to store the new file path
   let newPath = null;

   // Checking if a new file is provided in the request
   if (req.file) {
       const { originalname, path } = req.file;
       const parts = originalname.split('.');
       const ext = parts[parts.length - 1];
       newPath = path + '.' + ext;

       // Renaming and updating the file path
       fs.renameSync(path, newPath);
   }

   // Extracting user information from the JWT token
   const { token } = req.cookies;
   jwt.verify(token, secret, {}, async (err, info) => {
       if (err) throw err;

       // Extracting post details from the request body
       const { id, title, summary, content } = req.body;

       // Retrieving the existing post document from the database
       const postDoc = await Post.findById(id);

       // Checking if the user is the author of the post
       const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);

       // If the user is not the author, respond with an error
       if (!isAuthor) {
           return res.status(400).json('you are not the author');
       }

       // Updating the post document with new information
       await postDoc.updateOne({
           title,
           summary,
           content,
           cover: newPath ? newPath : postDoc.cover,
       });

       // Responding with the updated post document
       res.json(postDoc);
   });
});

// Get all posts endpoint
app.get('/post', async (req, res) => {
   // Retrieving and responding with a list of posts
   res.json(
       await Post.find()
           .populate('author', ['userName']) // Populating author details in the response
           .sort({ createdAt: -1 }) // Sorting posts based on creation date in descending order
           .limit(20) // Limiting the number of posts to 20
   );
});

// Get a specific post by ID endpoint
app.get('/post/:id', async (req, res) => {
   // Extracting the post ID from the request parameters
   const { id } = req.params;
   // Retrieving the post document by ID and populating author details
   const postDoc = await Post.findById(id).populate('author', ['userName']);
   // Responding with the retrieved post document
   res.json(postDoc);
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

