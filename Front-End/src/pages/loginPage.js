import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../userContext";


export default function LoginPage() {
    // State variables to store username, password, redirection status, and user information
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    // Using the useContext hook to access the UserContext and setUserInfo function
    const { setUserInfo } = useContext(UserContext);

    // Async function to handle login when the form is submitted
    async function login(ev) {
        ev.preventDefault();

        // Sending a POST request to the server for login
        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify({ userName, password }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        // Checking the server response for success or failure
        if (response.ok) {
            // Parsing the response JSON to get user information
            response.json().then(userInfo => {
                // Setting user information in the UserContext
                setUserInfo(userInfo);
                // Redirecting to the home page
                setRedirect(true);
            });
        } else {
            // Alerting the user for wrong credentials
            alert('Wrong credentials');
        }
    }

    // Redirecting to the home page if login is successful
    if (redirect) {
        return <Navigate to={'/'} />
    }

    // JSX for the Login Page form
    return (
        <form className="login" onSubmit={login}>
            <h1>Login</h1>
            <input
                type="text"
                placeholder="Username"
                value={userName}
                onChange={ev => setUserName(ev.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={ev => setPassword(ev.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    );
}
