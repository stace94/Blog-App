
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";

export default function CreatePost() {
    // State variables to store post information, including title, summary, content, files, and redirection status
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);
 const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000'; // Default URL if env variable is not set
    // Async function to handle the creation of a new post
    async function createNewPost(e) {
        // Creating a FormData object to send data as a multipart/form-data
        const data = new FormData();
        data.set("title", title);
        data.set("summary", summary);
        data.set("content", content);
        data.set("file", files[0]);

        // Logging the files array to the console
        console.log(files);

        e.preventDefault();

        // Sending a POST request to create a new post
        const response = await fetch(`${API_URL}/post`, {
            method: "POST",
            body: data,
            credentials: 'include',
        });

        // If the post creation is successful, set redirection to true
        if (response.ok) {
            setRedirect(true);
        }
    }

    // Redirecting to the home page if the post creation is successful
    if (redirect) {
        return <Navigate to={'/'} />;
    }

    // JSX for rendering the create post form
    return (
        <form onSubmit={createNewPost}>
            <input
                type="title"
                placeholder={"Title"}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="summary"
                placeholder={"Summary"}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
            />
            <input
                type='file'
                onChange={(e) => setFiles(e.target.files)}
            />
            <Editor value={content} onChange={setContent} />
            <button style={{ marginTop: "5px" }}>Create Post</button>
        </form>
    );
}
