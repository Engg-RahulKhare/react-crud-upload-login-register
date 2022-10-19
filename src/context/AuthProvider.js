import { createContext, useState } from "react";

const AuthContext = createContext({});

//desturturing the children components
// childern- all the component inside the auth provider 
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;