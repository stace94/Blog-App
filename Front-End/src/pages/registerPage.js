import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function RegisterPage() {

    // State variables to store username, password, and redirection status
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
     const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000'; // Default URL if env variable is not set    
    // Async function to handle registration when the form is submitted
    async function register(e) {
        e.preventDefault();

        // Sending a POST request to the server for registration
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            body: JSON.stringify({ userName, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        // Checking the server response for success or failure
        if (response.status === 200) {
            alert("Registration successful");
            setRedirect(true);
        } else {
            alert("Registration failed");
        }
    }

    // Redirecting to the login page if registration is successful
    if (redirect) {
        return <Navigate to={'/login'} />
    }

    // JSX for the Register Page form
    return (
        <form className="register" onSubmit={register}>
            <h1>Register</h1>
            <input
                type="text"
                placeholder="Username"
                value={userName}
                onChange={e => setUserName(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button type="submit">Register</button>
        </form>
    );
}
