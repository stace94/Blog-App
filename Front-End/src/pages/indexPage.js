import Post from "../post.js";
import { useEffect, useState } from "react";


export default function IndexPage() {
    // State variable to store the array of posts
    const [posts, setPosts] = useState([]);

    // useEffect hook to fetch posts from the server when the component mounts
    useEffect(() => {
        fetch('http://localhost:4000/post').then(response => {
            response.json().then(posts => {
                // Logging the fetched posts to the console
                console.log(posts);

                // Updating the state with the fetched posts
                setPosts(posts);
            });
        });
    }, []);

    // JSX for rendering the Index Page
    return (
        <>
            {/* Conditionally rendering posts if there are any */}
            {posts.length > 0 && posts.map(post => (
                <Post {...post} />
            ))}
        </>
    );
}

