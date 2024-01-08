import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./userContext";


export default function Header() {
    // Destructuring values from the UserContext
    const { setUserInfo, userInfo } = useContext(UserContext);

    // useEffect hook to fetch user profile information when the component mounts
    useEffect(() => {
        fetch('http://localhost:4000/profile', {
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
            });
        });
    }, []);

    // Function to handle logout
    function logout() {
        fetch('http://localhost:4000/logout', {
            credentials: 'include',
            method: "POST",
        });
        setUserInfo(null);
    }

    // Extracting username from userInfo
    const userName = userInfo?.userName;

    // JSX for the Header
    return (
        <header>
            <Link to="/" className="logo">MyBlog</Link>
            <nav>
                {userName && (
                    <>
                        <span>Hello, {userName}</span>
                        <Link to="/create">Create new post</Link>
                        <a onClick={logout}>Logout</a>
                    </>
                )}
                {!userName && (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
}
