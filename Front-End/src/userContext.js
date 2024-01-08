import { createContext, useState } from "react";


export const UserContext = createContext({});

// Functional component for the UserContextProvider
export function UserContextProvider({ children }) {
    // State variable to store user information and a function to update it
    const [userInfo, setUserInfo] = useState({});

    // Rendering the UserContext.Provider with the value of userInfo and setUserInfo
    return (
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
            {/* Rendering the children components */}
            {children}
        </UserContext.Provider>
    );
}
