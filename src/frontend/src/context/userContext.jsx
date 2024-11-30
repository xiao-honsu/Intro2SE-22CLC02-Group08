import React, { createContext, useState} from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userType, setUserType] = useState("guest"); 
    const [userInfo, setUserInfo] = useState(null);
    

    return (
        <UserContext.Provider value={{ userType, setUserType, userInfo, setUserInfo }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;