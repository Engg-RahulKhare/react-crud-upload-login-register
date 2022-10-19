import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

//useauth globally in every component
const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;