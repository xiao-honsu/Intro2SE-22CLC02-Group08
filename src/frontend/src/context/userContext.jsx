import React, { createContext, useState} from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userType, setUserType] = useState("guest"); 

    return (
        <UserContext.Provider value={{ userType, setUserType }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;