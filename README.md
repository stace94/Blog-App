# Blog App
The Blog App is a web application that allows users to create, edit, and view blog posts. It consists of both front-end and back-end components, providing a complete solution for managing blog content.

## Features
- **Create Post:** Users can create new blog posts by providing a title, summary, content, and an optional cover image.
- **Edit Post:** Existing posts can be edited, including updating the title, summary, content, and cover image.
- **View Posts:** Users can view a list of blog posts on the homepage, each displaying the title, summary, author, and creation date.
- **View Single Post:** Clicking on a post allows users to view the full details of that specific blog post.
- **User Authentication:** The application includes user registration and login functionalities, securing user-specific actions.

## Technologies Used
- **Front-end:** React with React Router, Quill for rich text editing.
- **Back-end:** Node.js with Express, MongoDB for data storage, Mongoose for MongoDB object modeling.
- **Authentication:** JWT (JSON Web Tokens) for user authentication.

## Getting Started
Follow these steps to get the Blog App up and running on your local machine:
1. Clone the repository:
  
``` bash
git clone https://github.com/your-username/blog.git
```

2. Navigate to the client directory and install front-end dependencies:
 
```bash
cd server
npm install
```

3.Navigate to the server directory and install back-end dependencies:
Configure environment variables:
Create a .env file in the server directory.
Add the following variables:
 
```env
MONGODB_URI=your_mongodb_connection_string
SECRET_KEY=your_secret_key_for_jwt
```

4. Start the server:

```bash
npm install
```
5. Start the front-end development server:

```bash
cd client
npm start
```
6. Open your browser and go to http://localhost:3000 to view the Blog App.

I would like to thank @CodingwithDawid for the in depth coding tuturial. From this tutrial I understand the basics of MERN stack for full-stack app development. Stay tuned for my very own project!
